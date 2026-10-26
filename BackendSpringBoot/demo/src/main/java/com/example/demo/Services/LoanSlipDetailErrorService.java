package com.example.demo.Services;

import com.example.demo.entities.LoanSlipDetailError;
import com.example.demo.Repositories.LoanSlipDetailErrorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanSlipDetailErrorService {

    @Autowired
    public LoanSlipDetailErrorRepository loanSlipDetailErrorRepository;

    // Phương thức lấy tất cả bản ghi
    public List<LoanSlipDetailError> getAllLoanSlipDetailError() {
        return loanSlipDetailErrorRepository.findAll();
    }

    // Phương thức lấy 1 bản ghi theo id
    public LoanSlipDetailError getLoanSlipDetailErrorById(Long Id) {
        return loanSlipDetailErrorRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không có loan slip detail error phù hợp"));
    }

    // Phương thức lưu dữ liệu
    public LoanSlipDetailError createLoanSlipDetailError(LoanSlipDetailError loanSlipDetailError) {
        return loanSlipDetailErrorRepository.save(loanSlipDetailError);
    }

    // Phương thức sửa dữ liệu
    public LoanSlipDetailError updateLoanSlipDetailError(Long Id, LoanSlipDetailError loanSlipDetailError) {

        LoanSlipDetailError existingLoanSlipDetailError = this.getLoanSlipDetailErrorById(Id);

        existingLoanSlipDetailError.setFineAmount(loanSlipDetailError.getFineAmount());
        existingLoanSlipDetailError.setLoanSlipDetail(loanSlipDetailError.getLoanSlipDetail());
        existingLoanSlipDetailError.setError(loanSlipDetailError.getError());

        return loanSlipDetailErrorRepository.save(existingLoanSlipDetailError);
    }

    // Phương thức xóa dữ liệu
    public LoanSlipDetailError deleteLoanSlipDetailError(Long Id) {

        LoanSlipDetailError existingLoanSlipDetailError = this.getLoanSlipDetailErrorById(Id);

        loanSlipDetailErrorRepository.deleteById(Id);

        return existingLoanSlipDetailError;
    }
}