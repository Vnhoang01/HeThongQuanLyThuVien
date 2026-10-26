package com.example.demo.Controller;

import com.example.demo.entities.Customer;
import com.example.demo.Services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    public CustomerService customerService;

    // Phương thức lấy toàn bộ dữ liệu
    @GetMapping
    public List<Customer> getAllCustomer() {
        return customerService.getAllCustomer();
    }

    // Phương thức lấy 1 bản ghi
    @GetMapping("/{Id}")
    public Customer getCustomerById(@PathVariable Long Id) {
        return customerService.getCustomerById(Id);
    }

    // Phương thức để thêm dữ liệu
    @PostMapping("/create")
    public String createCustomer(@RequestBody Customer customer) {
        customerService.createCustomer(customer);
        return "Thêm thành công";
    }

    // Phương thức để sửa dữ liệu
    @PutMapping("/{Id}")
    public String updateCustomer(
            @PathVariable Long Id,
            @RequestBody Customer customer) {

        customerService.updateCustomer(Id, customer);

        return "Sửa thành công";
    }

    // Phương thức để xóa dữ liệu
    @DeleteMapping("/{Id}")
    public String deleteCustomer(@PathVariable Long Id) {

        customerService.deleteCustomer(Id);

        return "Xóa thành công";
    }

    // Admin reset mật khẩu khách hàng về mặc định 12345678 (khách hàng tự quản lý thông tin của mình, admin không sửa được)
    @PostMapping("/{Id}/reset-password")
    public ResponseEntity<?> resetPassword(@PathVariable Long Id) {
        customerService.resetPassword(Id);

        return ResponseEntity.ok("Reset mật khẩu thành công, mật khẩu mặc định: " + CustomerService.DEFAULT_PASSWORD);
    }
}