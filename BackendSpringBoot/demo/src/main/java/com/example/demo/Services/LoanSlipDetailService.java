package com.example.demo.Services;

import com.example.demo.entities.LoanSlipDetail;
import com.example.demo.Repositories.LoanSlipDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanSlipDetailService {

    @Autowired
    public LoanSlipDetailRepository loanSlipDetailRepository;

    // Phương thức lấy tất cả bản ghi
    public List<LoanSlipDetail> getAllLoanSlipDetail() {
        return loanSlipDetailRepository.findAll();
    }

    // Phương thức lấy 1 bản ghi theo id
    public LoanSlipDetail getLoanSlipDetailById(Long Id) {
        return loanSlipDetailRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không có loan slip detail phù hợp"));
    }

    // Phương thức lưu dữ liệu
    public LoanSlipDetail createLoanSlipDetail(LoanSlipDetail loanSlipDetail) {
        return loanSlipDetailRepository.save(loanSlipDetail);
    }

    // Phương thức sửa dữ liệu
    public LoanSlipDetail updateLoanSlipDetail(Long Id, LoanSlipDetail loanSlipDetail) {

        LoanSlipDetail existingLoanSlipDetail = this.getLoanSlipDetailById(Id);

        existingLoanSlipDetail.setStatus(loanSlipDetail.getStatus());
        existingLoanSlipDetail.setLoanSlip(loanSlipDetail.getLoanSlip());
        existingLoanSlipDetail.setBookDetail(loanSlipDetail.getBookDetail());

        return loanSlipDetailRepository.save(existingLoanSlipDetail);
    }

    // Phương thức xóa dữ liệu
    public LoanSlipDetail deleteLoanSlipDetail(Long Id) {

        LoanSlipDetail existingLoanSlipDetail = this.getLoanSlipDetailById(Id);

        loanSlipDetailRepository.deleteById(Id);

        return existingLoanSlipDetail;
    }
}