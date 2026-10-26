package com.example.demo.Repositories;

import com.example.demo.entities.LoanSlipDetailError;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LoanSlipDetailErrorRepository extends JpaRepository<LoanSlipDetailError, Long> {

    //Lấy các lỗi sách gắn với 1 chi tiết phiếu mượn
    @Query("SELECT e FROM LoanSlipDetailError e WHERE e.loanSlipDetail.id = :loanSlipDetailId")
    List<LoanSlipDetailError> findByLoanSlipDetailId(@Param("loanSlipDetailId") Long loanSlipDetailId);
}