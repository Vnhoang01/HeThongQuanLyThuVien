package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Repositories.AdminRepository;
import com.example.demo.Utils.JwtUtil;
import com.example.demo.entities.Admin;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> accountRegister){
        //Lấy email, pwd của admin đang đăng ký
        String email = accountRegister.get("email");
        String password = accountRegister.get("password");

        if(adminRepository.findByEmail(email).isPresent()){
            return ResponseEntity.badRequest().body("Email đã tồn tại");
        }

        Admin newAdmin = new Admin();
        newAdmin.setEmail(email);
        newAdmin.setPassword(passwordEncoder.encode(password));

        //Chuẩn hóa role: bỏ khoảng trắng, viết hoa (tránh trường hợp dữ liệu cũ gõ tay "Admin", "admin" làm phân quyền fail)
        String role = accountRegister.getOrDefault("role", "ADMIN");
        if(role == null || role.trim().isEmpty()){
            role = "ADMIN";
        }
        role = role.trim().toUpperCase();

        if(!role.equals("ADMIN") && !role.equals("LIBRARIAN")){
            return ResponseEntity.badRequest().body("Role không hợp lệ (ADMIN hoặc LIBRARIAN)");
        }
        newAdmin.setRole(role);

        adminRepository.save(newAdmin);
        return ResponseEntity.ok("Đăng ký thành công");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> account){
        //Lấy email, pwd của admin đang đăng nhập
        String email = account.get("email");
        String password = account.get("password");

        Optional<Admin> optionalAdmin = adminRepository.findByEmail(email);
        //Kiểm tra tồn tại không
        if(optionalAdmin.isPresent() && passwordEncoder.matches(password, optionalAdmin.get().getPassword())){
            //Lấy role của tài khoản, chuẩn hóa (trim + viết hoa) để dữ liệu cũ như "Admin", "admin" vẫn phân quyền đúng
            //Chưa set role thì mặc định ADMIN, role lạ (không phải ADMIN/LIBRARIAN) thì từ chối đăng nhập
            String role = optionalAdmin.get().getRole();
            if(role == null || role.trim().isEmpty()){
                role = "ADMIN";
            } else {
                role = role.trim().toUpperCase();
            }

            if(!role.equals("ADMIN") && !role.equals("LIBRARIAN")){
                return ResponseEntity.badRequest().body("Tài khoản có role không hợp lệ, chỉ ADMIN hoặc LIBRARIAN");
            }

            //Token chứa cả email và role để phân quyền khi gọi API
            String token = jwtUtil.generateToken(email, role);

            return ResponseEntity.ok(Map.of(
                    "message", "Đăng nhập thành công",
                    "token", token,
                    "role", role
            ));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tài khoản sai");
    }

    @GetMapping("/personal")
    public ResponseEntity<?> getCurrentAdmin(@RequestHeader(value = "Authorization", required = false) String authHeader){
        //Kiểm tra header authorization tồn tại và đúng định dạng Bearer
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Lỗi token");
        }

        String token = authHeader.substring(7);

        //Xác thực token
        if(jwtUtil.validateToken(token)){
            String email = jwtUtil.extractEmail(token);
            return ResponseEntity.ok("Xác thực thành công");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Xác thực thất bại");
    }
}