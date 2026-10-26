package com.example.demo.Services;

import com.example.demo.entities.Customer;
import com.example.demo.Repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    public CustomerRepository customerRepository;

    // Phương thức lấy tất cả bản ghi
    public List<Customer> getAllCustomer() {
        return customerRepository.findAll();
    }

    // Phương thức lấy 1 bản ghi theo id
    public Customer getCustomerById(Long Id) {
        return customerRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không có customer phù hợp"));
    }

    // Phương thức lưu dữ liệu
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    // Phương thức sửa dữ liệu
    public Customer updateCustomer(Long Id, Customer customer) {

        Customer existingCustomer = this.getCustomerById(Id);

        existingCustomer.setName(customer.getName());
        existingCustomer.setDateOfBirth(customer.getDateOfBirth());
        existingCustomer.setGender(customer.getGender());
        existingCustomer.setEmail(customer.getEmail());
        existingCustomer.setPhoneNumber(customer.getPhoneNumber());

        //Chỉ đổi mật khẩu khi người dùng có nhập mật khẩu mới, nếu không giữ nguyên mật khẩu cũ
        if (customer.getPassword() != null && !customer.getPassword().isEmpty()) {
            existingCustomer.setPassword(customer.getPassword());
        }

        existingCustomer.setAddress(customer.getAddress());
        existingCustomer.setStatus(customer.getStatus());

        return customerRepository.save(existingCustomer);
    }

    // Phương thức xóa dữ liệu
    public Customer deleteCustomer(Long Id) {

        Customer existingCustomer = this.getCustomerById(Id);

        customerRepository.deleteById(Id);

        return existingCustomer;
    }

    // Mật khẩu mặc định dùng khi admin reset mật khẩu cho khách hàng
    public static final String DEFAULT_PASSWORD = "12345678";

    // Phương thức reset mật khẩu khách hàng về mặc định 12345678 (chỉ ADMIN được gọi, do controller phan quyen)
    public Customer resetPassword(Long Id) {

        Customer existingCustomer = this.getCustomerById(Id);

        //Mật khẩu khách hàng hiện lưu plain text (chưa có màn hình đăng nhập khách hàng), giữ nguyên cách lưu này
        existingCustomer.setPassword(DEFAULT_PASSWORD);

        return customerRepository.save(existingCustomer);
    }
}