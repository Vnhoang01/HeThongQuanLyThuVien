package com.example.demo.Configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import com.example.demo.Utils.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecureConfig {
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    //Cho phép frontend (localhost:3000) gọi sang mọi endpoint, kể cả /auth/login
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth ->
                    //Nhóm cho phép không cần đăng nhập: chỉ đăng ký/đăng nhập
                    auth.requestMatchers("/auth/**").permitAll()

                            //Nhóm chỉ ADMIN: quản lý tài khoản admin, sách, thể loại, tác giả, nhà xuất bản
                            .requestMatchers("/admins/**", "/books/**", "/book-details/**",
                                    "/categories/**", "/authors/**", "/publishers/**").hasRole("ADMIN")

                            //Xem danh sách khách hàng: ADMIN và LIBRARIAN (thủ thư cần chọn khách hàng khi lập phiếu mượn)
                            .requestMatchers(HttpMethod.GET, "/customers/**").hasAnyRole("ADMIN", "LIBRARIAN")

                            //Chỉ ADMIN được reset mật khẩu khách hàng về mặc định
                            .requestMatchers(HttpMethod.POST, "/customers/*/reset-password").hasRole("ADMIN")

                            //Khách hàng tự quản lý thông tin của chính mình: không endpoint nào của admin được sửa/xóa khách hàng
                            .requestMatchers(HttpMethod.POST, "/customers/**").denyAll()
                            .requestMatchers(HttpMethod.PUT, "/customers/**").denyAll()
                            .requestMatchers(HttpMethod.DELETE, "/customers/**").denyAll()

                            //Nhóm ADMIN và LIBRARIAN: quản lý phiếu mượn và lỗi sách
                            .requestMatchers("/loan-slips/**", "/loan-slip-details/**",
                                    "/loan-slip-detail-errors/**", "/errors/**").hasAnyRole("ADMIN", "LIBRARIAN")

                            .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }
}