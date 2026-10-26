package com.example.demo.DTO;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Dữ liệu hiển thị cho 1 phiếu mượn, gồm thông tin phiếu, khách hàng, admin duyệt
 * và danh sách sách mượn kèm lỗi sách.
 * Dùng DTO thay vì trả entity trực tiếp để tránh vòng lặp khi chuyển sang JSON.
 */
public class LoanSlipView {

    private Long Id;

    private LocalDate StartDate;

    private LocalDate ReturnDate;

    private LocalDate EndDate;

    private Integer TotalQuantity;

    private Double TotalFine;

    private String Status;

    // Khách hàng mượn sách
    private Long CustomerId;

    private String CustomerName;

    // Admin duyệt phiếu mượn
    private Long AdminId;

    private String AdminName;

    private String AdminEmail;

    // Danh sách sách mượn trong phiếu
    private List<Detail> Details = new ArrayList<>();

    // Một dòng chi tiết: sách mượn + các lỗi sách kèm theo
    public static class Detail {

        private Long Id;

        private Long BookDetailId;

        private String Barcode;

        private String BookName;

        private String Status;

        private List<ErrorItem> Errors = new ArrayList<>();

        public Long getId() {
            return Id;
        }

        public void setId(Long id) {
            Id = id;
        }

        public Long getBookDetailId() {
            return BookDetailId;
        }

        public void setBookDetailId(Long bookDetailId) {
            BookDetailId = bookDetailId;
        }

        public String getBarcode() {
            return Barcode;
        }

        public void setBarcode(String barcode) {
            Barcode = barcode;
        }

        public String getBookName() {
            return BookName;
        }

        public void setBookName(String bookName) {
            BookName = bookName;
        }

        public String getStatus() {
            return Status;
        }

        public void setStatus(String status) {
            Status = status;
        }

        public List<ErrorItem> getErrors() {
            return Errors;
        }

        public void setErrors(List<ErrorItem> errors) {
            Errors = errors;
        }
    }

    // Một lỗi sách gắn với chi tiết phiếu mượn
    public static class ErrorItem {

        private Long Id;

        private Long ErrorId;

        private String ErrorName;

        private Double FineAmount;

        public Long getId() {
            return Id;
        }

        public void setId(Long id) {
            Id = id;
        }

        public Long getErrorId() {
            return ErrorId;
        }

        public void setErrorId(Long errorId) {
            ErrorId = errorId;
        }

        public String getErrorName() {
            return ErrorName;
        }

        public void setErrorName(String errorName) {
            ErrorName = errorName;
        }

        public Double getFineAmount() {
            return FineAmount;
        }

        public void setFineAmount(Double fineAmount) {
            FineAmount = fineAmount;
        }
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public LocalDate getStartDate() {
        return StartDate;
    }

    public void setStartDate(LocalDate startDate) {
        StartDate = startDate;
    }

    public LocalDate getReturnDate() {
        return ReturnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        ReturnDate = returnDate;
    }

    public LocalDate getEndDate() {
        return EndDate;
    }

    public void setEndDate(LocalDate endDate) {
        EndDate = endDate;
    }

    public Integer getTotalQuantity() {
        return TotalQuantity;
    }

    public void setTotalQuantity(Integer totalQuantity) {
        TotalQuantity = totalQuantity;
    }

    public Double getTotalFine() {
        return TotalFine;
    }

    public void setTotalFine(Double totalFine) {
        TotalFine = totalFine;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public Long getCustomerId() {
        return CustomerId;
    }

    public void setCustomerId(Long customerId) {
        CustomerId = customerId;
    }

    public String getCustomerName() {
        return CustomerName;
    }

    public void setCustomerName(String customerName) {
        CustomerName = customerName;
    }

    public Long getAdminId() {
        return AdminId;
    }

    public void setAdminId(Long adminId) {
        AdminId = adminId;
    }

    public String getAdminName() {
        return AdminName;
    }

    public void setAdminName(String adminName) {
        AdminName = adminName;
    }

    public String getAdminEmail() {
        return AdminEmail;
    }

    public void setAdminEmail(String adminEmail) {
        AdminEmail = adminEmail;
    }

    public List<Detail> getDetails() {
        return Details;
    }

    public void setDetails(List<Detail> details) {
        Details = details;
    }
}
