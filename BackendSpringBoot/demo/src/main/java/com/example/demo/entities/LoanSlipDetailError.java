package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "loan_slip_detail_error")
public class LoanSlipDetailError {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private Double FineAmount;

    // Nhiều LoanSlipDetailError thuộc về 1 LoanSlipDetail
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loan_slip_detail_id")
    private LoanSlipDetail loanSlipDetail;

    // Nhiều LoanSlipDetailError thuộc về 1 Error
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "error_id")
    private BookError error;

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public Double getFineAmount() {
        return FineAmount;
    }

    public void setFineAmount(Double fineAmount) {
        FineAmount = fineAmount;
    }

    public LoanSlipDetail getLoanSlipDetail() {
        return loanSlipDetail;
    }

    public void setLoanSlipDetail(LoanSlipDetail loanSlipDetail) {
        this.loanSlipDetail = loanSlipDetail;
    }

    public BookError getError() {
        return error;
    }

    public void setError(BookError error) {
        this.error = error;
    }
}
