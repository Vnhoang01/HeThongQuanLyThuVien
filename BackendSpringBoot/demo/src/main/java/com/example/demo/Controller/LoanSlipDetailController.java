package com.example.demo.Controller;

import com.example.demo.entities.LoanSlipDetail;
import com.example.demo.Services.LoanSlipDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// Định nghĩa API
@RequestMapping("/loan-slip-details")
@CrossOrigin(origins = "*")
public class LoanSlipDetailController {

    @Autowired
    public LoanSlipDetailService loanSlipDetailService;

    // Phương thức lấy toàn bộ dữ liệu
    @GetMapping
    public List<LoanSlipDetail> getAllLoanSlipDetail() {
        return loanSlipDetailService.getAllLoanSlipDetail();
    }

    // Phương thức lấy 1 bản ghi
    @GetMapping("/{Id}")
    public LoanSlipDetail getLoanSlipDetailById(@PathVariable Long Id) {
        return loanSlipDetailService.getLoanSlipDetailById(Id);
    }

    // Phương thức để thêm dữ liệu
    @PostMapping("/create")
    public String createLoanSlipDetail(@RequestBody LoanSlipDetail loanSlipDetail) {
        loanSlipDetailService.createLoanSlipDetail(loanSlipDetail);
        return "Thêm thành công";
    }

    // Phương thức để sửa dữ liệu
    @PutMapping("/{Id}")
    public String updateLoanSlipDetail(
            @PathVariable Long Id,
            @RequestBody LoanSlipDetail loanSlipDetail) {

        loanSlipDetailService.updateLoanSlipDetail(Id, loanSlipDetail);

        return "Sửa thành công";
    }

    // Phương thức để xóa dữ liệu
    @DeleteMapping("/{Id}")
    public String deleteLoanSlipDetail(@PathVariable Long Id) {

        loanSlipDetailService.deleteLoanSlipDetail(Id);

        return "Xóa thành công";
    }
}