package com.example.demo.Controller;

import com.example.demo.DTO.LoanSlipRequest;
import com.example.demo.DTO.LoanSlipView;
import com.example.demo.entities.LoanSlip;
import com.example.demo.Services.LoanSlipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// Định nghĩa API
@RequestMapping("/loan-slips")
@CrossOrigin(origins = "*")
public class LoanSlipController {

    @Autowired
    public LoanSlipService loanSlipService;

    // Phương thức lấy toàn bộ dữ liệu (kèm chi tiết sách mượn và lỗi sách)
    @GetMapping
    public List<LoanSlipView> getAllLoanSlip() {
        return loanSlipService.getAllLoanSlipView();
    }

    // Phương thức lấy 1 bản ghi (kèm chi tiết sách mượn và lỗi sách)
    @GetMapping("/{Id}")
    public LoanSlipView getLoanSlipById(@PathVariable Long Id) {
        return loanSlipService.getLoanSlipViewById(Id);
    }

    // Phương thức để thêm dữ liệu: tạo phiếu mượn kèm danh sách sách mượn
    @PostMapping("/create")
    public LoanSlip createLoanSlip(@RequestBody LoanSlipRequest request) {
        return loanSlipService.createLoanSlip(request);
    }

    // Phương thức để sửa dữ liệu: thay toàn bộ danh sách sách mượn của phiếu
    @PutMapping("/{Id}")
    public LoanSlip updateLoanSlip(
            @PathVariable Long Id,
            @RequestBody LoanSlipRequest request) {

        return loanSlipService.updateLoanSlip(Id, request);
    }

    // Phương thức để xóa dữ liệu
    @DeleteMapping("/{Id}")
    public String deleteLoanSlip(@PathVariable Long Id) {

        loanSlipService.deleteLoanSlip(Id);

        return "Xóa thành công";
    }
}