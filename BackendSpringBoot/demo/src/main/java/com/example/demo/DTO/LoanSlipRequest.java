package com.example.demo.DTO;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Dữ liệu gửi lên khi tạo / sửa phiếu mượn.
 * Gồm thông tin phiếu mượn và danh sách sách mượn kèm lỗi sách (nếu có).
 */
public class LoanSlipRequest {

    // Khách hàng mượn sách
    private Long CustomerId;

    // Admin duyệt phiếu mượn
    private Long AdminId;

    private LocalDate StartDate;

    private LocalDate ReturnDate;

    private LocalDate EndDate;

    // Tổng số lượng sách mượn (để trống thì tính theo số dòng chi tiết)
    private Integer TotalQuantity;

    // Tổng tiền phạt (để trống thì tính theo tổng tiền phạt của các lỗi sách)
    private Double TotalFine;

    // Trạng thái phiếu mượn: Borrowing (đang mượn) / Returned (đã trả)
    private String Status;

    // Danh sách sách mượn trong phiếu
    private List<Detail> Details = new ArrayList<>();

    // Một dòng chi tiết: 1 bản ghi sách + các lỗi sách kèm theo
    public static class Detail {

        // Id bản ghi sách (book_details) được mượn
        private Long BookDetailId;

        // Trạng thái chi tiết: Borrowed (đang mượn) / Returned (đã trả)
        private String Status;

        // Danh sách lỗi sách kèm theo
        private List<ErrorItem> Errors = new ArrayList<>();

        public Long getBookDetailId() {
            return BookDetailId;
        }

        public void setBookDetailId(Long bookDetailId) {
            BookDetailId = bookDetailId;
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

    // Một lỗi sách kèm theo chi tiết phiếu mượn
    public static class ErrorItem {

        // Id loại lỗi sách (errors)
        private Long ErrorId;

        // Tiền phạt riêng cho lỗi này (để trống thì lấy theo loại lỗi sách)
        private Double FineAmount;

        public Long getErrorId() {
            return ErrorId;
        }

        public void setErrorId(Long errorId) {
            ErrorId = errorId;
        }

        public Double getFineAmount() {
            return FineAmount;
        }

        public void setFineAmount(Double fineAmount) {
            FineAmount = fineAmount;
        }
    }

    public Long getCustomerId() {
        return CustomerId;
    }

    public void setCustomerId(Long customerId) {
        CustomerId = customerId;
    }

    public Long getAdminId() {
        return AdminId;
    }

    public void setAdminId(Long adminId) {
        AdminId = adminId;
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

    public List<Detail> getDetails() {
        return Details;
    }

    public void setDetails(List<Detail> details) {
        Details = details;
    }
}
