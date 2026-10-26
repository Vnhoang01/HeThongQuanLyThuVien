package com.example.demo.Repositories;

import com.example.demo.entities.LoanSlipDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LoanSlipDetailRepository extends JpaRepository<LoanSlipDetail, Long> {

    //Lấy các chi tiết (sách mượn) của 1 phiếu mượn
    @Query("SELECT d FROM LoanSlipDetail d WHERE d.loanSlip.id = :loanSlipId")
    List<LoanSlipDetail> findByLoanSlipId(@Param("loanSlipId") Long loanSlipId);
}