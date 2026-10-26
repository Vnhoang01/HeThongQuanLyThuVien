package com.example.demo.Controller;

import com.example.demo.entities.LoanSlipDetailError;
import com.example.demo.Services.LoanSlipDetailErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// Định nghĩa API
@RequestMapping("/loan-slip-detail-errors")
@CrossOrigin(origins = "*")
public class LoanSlipDetailErrorController {

    @Autowired
    public LoanSlipDetailErrorService loanSlipDetailErrorService;

    // Phương thức lấy toàn bộ dữ liệu
    @GetMapping
    public List<LoanSlipDetailError> getAllLoanSlipDetailError() {
        return loanSlipDetailErrorService.getAllLoanSlipDetailError();
    }

    // Phương thức lấy 1 bản ghi
    @GetMapping("/{Id}")
    public LoanSlipDetailError getLoanSlipDetailErrorById(@PathVariable Long Id) {
        return loanSlipDetailErrorService.getLoanSlipDetailErrorById(Id);
    }

    // Phương thức để thêm dữ liệu
    @PostMapping("/create")
    public String createLoanSlipDetailError(@RequestBody LoanSlipDetailError loanSlipDetailError) {
        loanSlipDetailErrorService.createLoanSlipDetailError(loanSlipDetailError);
        return "Thêm thành công";
    }

    // Phương thức để sửa dữ liệu
    @PutMapping("/{Id}")
    public String updateLoanSlipDetailError(
            @PathVariable Long Id,
            @RequestBody LoanSlipDetailError loanSlipDetailError) {

        loanSlipDetailErrorService.updateLoanSlipDetailError(Id, loanSlipDetailError);

        return "Sửa thành công";
    }

    // Phương thức để xóa dữ liệu
    @DeleteMapping("/{Id}")
    public String deleteLoanSlipDetailError(@PathVariable Long Id) {

        loanSlipDetailErrorService.deleteLoanSlipDetailError(Id);

        return "Xóa thành công";
    }
}