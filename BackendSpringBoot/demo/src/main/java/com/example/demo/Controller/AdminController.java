package com.example.demo.Controller;

import com.example.demo.entities.Admin;
import com.example.demo.Services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    public AdminService adminService;

    // Phương thức lấy toàn bộ dữ liệu
    @GetMapping
    public List<Admin> getAllAdmin() {
        return adminService.getAllAdmin();
    }

    // Phương thức lấy 1 bản ghi
    @GetMapping("/{Id}")
    public Admin getAdminById(@PathVariable Long Id) {
        return adminService.getAdminById(Id);
    }

    // Phương thức để thêm dữ liệu
    @PostMapping("/create")
    public String createAdmin(@RequestBody Admin admin) {
        adminService.createAdmin(admin);
        return "Thêm thành công";
    }

    // Phương thức để sửa dữ liệu
    @PutMapping("/{Id}")
    public String updateAdmin(
            @PathVariable Long Id,
            @RequestBody Admin admin) {

        adminService.updateAdmin(Id, admin);

        return "Sửa thành công";
    }

    // Phương thức để xóa dữ liệu
    @DeleteMapping("/{Id}")
    public String deleteAdmin(@PathVariable Long Id) {

        adminService.deleteAdmin(Id);

        return "Xóa thành công";
    }
}