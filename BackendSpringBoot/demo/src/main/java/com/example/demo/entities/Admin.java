package com.example.demo.entities;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

//Định nghĩa Admin là 1 entity tương ứng với bảng trong db
@Entity

//Cấu hình cho class này tương ứng với bảng có tên là admins trong db
@Table(name = "admins")
public class Admin {
    //Pk, Auto_increment
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String Name;

    @Column(unique = true)
    private String Email;

    @Column
    //Mật khẩu đã mã hóa BCrypt, không trả ra trong JSON (vẫn nhận được khi client gửi lên)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String Password;

    @Column
    private String PhoneNumber;

    @Column
    private String Role;
    
    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getPhoneNumber() {
        return PhoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        PhoneNumber = phoneNumber;
    }

    public String getRole() {
        return Role;
    }

    public void setRole(String role) {
        Role = role;
    }
}