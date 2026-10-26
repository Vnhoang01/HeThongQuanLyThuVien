package com.example.demo.Repositories;

import com.example.demo.entities.LoanSlip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LoanSlipRepository extends JpaRepository<LoanSlip, Long> {

    //Đếm số phiếu mượn do 1 admin duyệt (dùng để chặn xóa admin khi còn phiếu mượn liên kết)
    @Query("SELECT COUNT(l) FROM LoanSlip l WHERE l.admin.id = :adminId")
    long countByAdminId(@Param("adminId") Long adminId);

    //Đếm số phiếu mượn của 1 khách hàng (dùng để chặn xóa khách hàng khi còn phiếu mượn)
    @Query("SELECT COUNT(l) FROM LoanSlip l WHERE l.customer.id = :customerId")
    long countByCustomerId(@Param("customerId") Long customerId);
}