package com.example.demo.Utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

//Class để tạo token mới, giải mã token cũ
@Component
public class JwtUtil {
    @Value("${app.jwt.secret}")
    private String privateKey;

    @Value("${app.jwt.exparation-time}")
    private Long keyLifeTime;

    //Tạo key hmac
    private Key getSigningKey(){
        return Keys.hmacShaKeyFor(privateKey.getBytes(StandardCharsets.UTF_8));
    }

    //Tạo jwt (kèm role để phân quyền ADMIN hoặc LIBRARIAN)
    public String generateToken(String Email, String Role){
        return Jwts.builder()
                .setSubject(Email) //Thêm email vào token
                .claim("role", Role) //Thêm role vào token
                .setIssuedAt(new Date()) // Thời gian tạo token
                .setExpiration(new Date(System.currentTimeMillis() + keyLifeTime)) // Mốc token die
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Thuật toán mã hóa
                .compact();
    }

    //Lấy admin từ jwt (dung parseClaimsJws vi token duoc ky HS256, parseClaimsJwt chi dung cho token khong ky)
    public String extractEmail(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    //Lấy role (ADMIN / LIBRARIAN) từ jwt
    public String extractRole(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }

    //Validate token
    public boolean validateToken(String token){
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (Exception e){
            return false;
        }
    }
}