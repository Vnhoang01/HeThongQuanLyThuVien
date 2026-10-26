package com.example.demo.Services;

import com.example.demo.entities.Admin;
import com.example.demo.Exceptions.DeleteRestrictedException;
import com.example.demo.Repositories.AdminRepository;
import com.example.demo.Repositories.LoanSlipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    public AdminRepository adminRepository;

    //Dùng để kiểm tra admin còn đang được gắn vào phiếu mượn nào không
    @Autowired
    public LoanSlipRepository loanSlipRepository;

    //Dùng để mã hóa mật khẩu bằng BCrypt
    @Autowired
    public PasswordEncoder passwordEncoder;

    // Phương thức lấy tất cả bản ghi
    public List<Admin> getAllAdmin() {
        return adminRepository.findAll();
    }

    // Phương thức lấy 1 bản ghi theo id
    public Admin getAdminById(Long Id) {
        return adminRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không có admin phù hợp"));
    }

    // Phương thức lưu dữ liệu
    public Admin createAdmin(Admin admin) {

        //Mã hóa mật khẩu trước khi lưu vào DB
        admin.setPassword(encodePassword(admin.getPassword()));

        //Chuẩn hóa role trước khi lưu: bỏ khoảng trắng, viết hoa, rỗng thì mặc định ADMIN
        admin.setRole(normalizeRole(admin.getRole()));

        return adminRepository.save(admin);
    }

    // Phương thức sửa dữ liệu
    public Admin updateAdmin(Long Id, Admin admin) {

        Admin existingAdmin = this.getAdminById(Id);

        existingAdmin.setName(admin.getName());
        existingAdmin.setEmail(admin.getEmail());

        //Chỉ đổi mật khẩu khi người dùng có nhập mật khẩu mới, nếu không giữ nguyên mật khẩu cũ đã mã hóa
        if (admin.getPassword() != null && !admin.getPassword().isEmpty()) {
            existingAdmin.setPassword(encodePassword(admin.getPassword()));
        }

        existingAdmin.setPhoneNumber(admin.getPhoneNumber());

        //Chuẩn hóa role trước khi lưu: bỏ khoảng trắng, viết hoa, rỗng thì mặc định ADMIN
        existingAdmin.setRole(normalizeRole(admin.getRole()));

        return adminRepository.save(existingAdmin);
    }

    // Phương thức xóa dữ liệu
    // Admin còn phiếu mượn đã duyệt thì không được xóa (giữ nguyên quan hệ duyệt phiếu mượn)
    public Admin deleteAdmin(Long Id) {

        Admin existingAdmin = this.getAdminById(Id);

        //Kiểm tra admin còn đang duyệt phiếu mượn nào không
        long soPhieuMượn = loanSlipRepository.countByAdminId(Id);

        if (soPhieuMượn > 0) {
            throw new DeleteRestrictedException("Không thể xóa tài khoản \"" + existingAdmin.getEmail()
                    + "\" vì còn " + soPhieuMượn + " phiếu mượn đã được duyệt. "
                    + "Vui lòng xóa hoặc chuyển các phiếu mượn này trước.");
        }

        adminRepository.deleteById(Id);

        return existingAdmin;
    }

    // Phương thức mã hóa mật khẩu bằng BCrypt
    // Bỏ qua nếu mật khẩu rỗng hoặc đã là chuỗi BCrypt (bắt đầu bằng $2) để tránh mã hóa 2 lần
    private String encodePassword(String password) {

        if (password == null || password.isEmpty() || password.startsWith("$2")) {
            return password;
        }

        return passwordEncoder.encode(password);
    }

    //Chuẩn hóa role: bỏ khoảng trắng, viết hoa để đúng chuẩn "ADMIN" / "LIBRARIAN" mà Spring Security so sánh
    //Rỗng thì lấy ADMIN (mặc định), giá trị lạ giữ nguyên để controller báo lỗi thay vì âm thầm gán sai quyền
    private String normalizeRole(String role) {

        if (role == null || role.trim().isEmpty()) {
            return "ADMIN";
        }

        return role.trim().toUpperCase();
    }
}