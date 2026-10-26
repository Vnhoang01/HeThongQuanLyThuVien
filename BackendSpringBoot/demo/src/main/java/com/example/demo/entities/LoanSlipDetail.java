package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "loan_slip_details")
public class LoanSlipDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String Status;

    // Nhiều chi tiết thuộc 1 phiếu mượn
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loan_slip_id")
    private LoanSlip loanSlip;

    // Nhiều chi tiết thuộc 1 sách
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_detail_id")
    private BookDetail bookDetail;

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public LoanSlip getLoanSlip() {
        return loanSlip;
    }

    public void setLoanSlip(LoanSlip loanSlip) {
        this.loanSlip = loanSlip;
    }

    public BookDetail getBookDetail() {
        return bookDetail;
    }

    public void setBookDetail(BookDetail bookDetail) {
        this.bookDetail = bookDetail;
    }
}