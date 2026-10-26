package com.example.demo.Utils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //Lấy header authorization
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String email = null;
        String role = null;

        //Kiểm tra header có chứa token chuẩn không
        if (authHeader != null && authHeader.startsWith("Bearer ")){
            token = authHeader.substring(7);
            try {
                email = jwtUtil.extractEmail(token);
                //Lấy role (ADMIN / LIBRARIAN) đã lưu trong token khi đăng nhập
                role = jwtUtil.extractRole(token);
            } catch (Exception e){
                System.out.println("Lỗi token");
            }
        }

        //Kiểm tra có email chưa, Spring Secure chưa ghi nhân đăng nhập
        if(email != null && SecurityContextHolder.getContext().getAuthentication() == null){
            if(jwtUtil.validateToken(token)){
                //Chuyển role trong token thành quyền của Spring Security (ROLE_ADMIN / ROLE_LIBRARIAN)
                List<GrantedAuthority> authorities = new ArrayList<>();
                if(role != null && !role.isEmpty()){
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
                }

                //Cấp certificate (kèm quyền theo role)
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null, authorities);
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                //Đăng ký cho admin/thủ thư vào hệ thống
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        //Cho phép đi tiếp vào trong hệ thống
        filterChain.doFilter(request, response);
    }
}