package com.example.demo.Services;

import com.example.demo.DTO.LoanSlipRequest;
import com.example.demo.DTO.LoanSlipView;
import com.example.demo.entities.Admin;
import com.example.demo.entities.Book;
import com.example.demo.entities.BookDetail;
import com.example.demo.entities.BookError;
import com.example.demo.entities.Customer;
import com.example.demo.entities.LoanSlip;
import com.example.demo.entities.LoanSlipDetail;
import com.example.demo.entities.LoanSlipDetailError;
import com.example.demo.Exceptions.DeleteRestrictedException;
import com.example.demo.Repositories.AdminRepository;
import com.example.demo.Repositories.BookDetailRepository;
import com.example.demo.Repositories.BookErrorRepository;
import com.example.demo.Repositories.BookRepository;
import com.example.demo.Repositories.CustomerRepository;
import com.example.demo.Repositories.LoanSlipDetailErrorRepository;
import com.example.demo.Repositories.LoanSlipDetailRepository;
import com.example.demo.Repositories.LoanSlipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LoanSlipService {

    @Autowired
    public LoanSlipRepository loanSlipRepository;

    @Autowired
    public LoanSlipDetailRepository loanSlipDetailRepository;

    @Autowired
    public LoanSlipDetailErrorRepository loanSlipDetailErrorRepository;

    @Autowired
    public CustomerRepository customerRepository;

    @Autowired
    public AdminRepository adminRepository;

    @Autowired
    public BookDetailRepository bookDetailRepository;

    @Autowired
    public BookRepository bookRepository;

    @Autowired
    public BookErrorRepository bookErrorRepository;

    // Phương thức lấy tất cả bản ghi
    public List<LoanSlip> getAllLoanSlip() {
        return loanSlipRepository.findAll();
    }

    // Phương thức lấy 1 bản ghi theo id
    public LoanSlip getLoanSlipById(Long Id) {
        return loanSlipRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không có loan slip phù hợp"));
    }

    // Lấy danh sách phiếu mượn kèm chi tiết sách và lỗi sách (dạng DTO để tránh vòng lặp JSON)
    public List<LoanSlipView> getAllLoanSlipView() {

        List<LoanSlipView> result = new java.util.ArrayList<>();

        for (LoanSlip loanSlip : loanSlipRepository.findAll()) {
            result.add(toView(loanSlip));
        }

        return result;
    }

    // Lấy 1 phiếu mượn kèm chi tiết (dạng DTO)
    public LoanSlipView getLoanSlipViewById(Long Id) {
        return toView(this.getLoanSlipById(Id));
    }

    // Chuyển entity phiếu mượn sang DTO hiển thị
    private LoanSlipView toView(LoanSlip loanSlip) {

        LoanSlipView view = new LoanSlipView();

        view.setId(loanSlip.getId());
        view.setStartDate(loanSlip.getStartDate());
        view.setReturnDate(loanSlip.getReturnDate());
        view.setEndDate(loanSlip.getEndDate());
        view.setTotalQuantity(loanSlip.getTotalQuantity());
        view.setTotalFine(loanSlip.getTotalFine());
        view.setStatus(loanSlip.getStatus());

        if (loanSlip.getCustomer() != null) {
            view.setCustomerId(loanSlip.getCustomer().getId());
            view.setCustomerName(loanSlip.getCustomer().getName());
        }

        if (loanSlip.getAdmin() != null) {
            view.setAdminId(loanSlip.getAdmin().getId());
            view.setAdminName(loanSlip.getAdmin().getName());
            view.setAdminEmail(loanSlip.getAdmin().getEmail());
        }

        for (LoanSlipDetail detail : loanSlipDetailRepository.findByLoanSlipId(loanSlip.getId())) {

            LoanSlipView.Detail detailView = new LoanSlipView.Detail();
            detailView.setId(detail.getId());
            detailView.setStatus(detail.getStatus());

            if (detail.getBookDetail() != null) {
                detailView.setBookDetailId(detail.getBookDetail().getId());
                detailView.setBarcode(detail.getBookDetail().getBarcode());
                detailView.setBookName(detail.getBookDetail().getName());
            }

            for (LoanSlipDetailError error : loanSlipDetailErrorRepository.findByLoanSlipDetailId(detail.getId())) {

                LoanSlipView.ErrorItem errorView = new LoanSlipView.ErrorItem();
                errorView.setId(error.getId());
                errorView.setFineAmount(error.getFineAmount());

                if (error.getError() != null) {
                    errorView.setErrorId(error.getError().getId());
                    errorView.setErrorName(error.getError().getName());
                }

                detailView.getErrors().add(errorView);
            }

            view.getDetails().add(detailView);
        }

        return view;
    }

    // Phương thức lưu dữ liệu (giữ nguyên hành vi cũ: lưu 1 phiếu mượn đơn giản)
    public LoanSlip createLoanSlip(LoanSlip loanSlip) {
        return loanSlipRepository.save(loanSlip);
    }

    // Tạo phiếu mượn kèm danh sách sách mượn và lỗi sách
    @Transactional
    public LoanSlip createLoanSlip(LoanSlipRequest request) {

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Không có khách hàng phù hợp"));

        Admin admin = adminRepository.findById(request.getAdminId())
                .orElseThrow(() -> new RuntimeException("Không có admin phù hợp"));

        LoanSlip loanSlip = new LoanSlip();
        loanSlip.setCustomer(customer);
        loanSlip.setAdmin(admin);
        loanSlip.setStartDate(request.getStartDate());
        loanSlip.setReturnDate(request.getReturnDate());
        loanSlip.setEndDate(request.getEndDate());
        loanSlip.setStatus(resolveStatus(request.getStatus()));

        double tongTienPhat = 0;
        int tongSoLuong = 0;

        for (LoanSlipRequest.Detail detailRequest : request.getDetails()) {

            BookDetail bookDetail = bookDetailRepository.findById(detailRequest.getBookDetailId())
                    .orElseThrow(() -> new RuntimeException("Không có bản ghi sách phù hợp"));

            // Chỉ cho mượn bản ghi sách đang sẵn sàng
            if (!"Available".equalsIgnoreCase(bookDetail.getStatus())) {
                throw new DeleteRestrictedException("Bản ghi sách \"" + bookDetail.getBarcode()
                        + "\" hiện không sẵn sàng để mượn (trạng thái: " + bookDetail.getStatus() + ")");
            }

            LoanSlipDetail loanSlipDetail = new LoanSlipDetail();
            loanSlipDetail.setLoanSlip(loanSlip);
            loanSlipDetail.setBookDetail(bookDetail);
            loanSlipDetail.setStatus(resolveDetailStatus(detailRequest.getStatus(), loanSlip.getStatus()));

            LoanSlipDetail savedDetail = loanSlipDetailRepository.save(loanSlipDetail);

            // Đánh dấu bản ghi sách đang được mượn
            bookDetail.setStatus("Borrowed");
            bookDetailRepository.save(bookDetail);

            tongSoLuong++;

            // Thêm các lỗi sách kèm theo
            for (LoanSlipRequest.ErrorItem errorItem : detailRequest.getErrors()) {

                BookError bookError = bookErrorRepository.findById(errorItem.getErrorId())
                        .orElseThrow(() -> new RuntimeException("Không có loại lỗi sách phù hợp"));

                LoanSlipDetailError detailError = new LoanSlipDetailError();
                detailError.setLoanSlipDetail(savedDetail);
                detailError.setError(bookError);

                // Tiền phạt: ưu tiên giá gửi lên, không có thì lấy theo loại lỗi sách
                double fineAmount = errorItem.getFineAmount() != null
                        ? errorItem.getFineAmount()
                        : (bookError.getFineAmount() != null ? bookError.getFineAmount() : 0);

                detailError.setFineAmount(fineAmount);
                loanSlipDetailErrorRepository.save(detailError);

                tongTienPhat += fineAmount;
            }
        }

        // Tổng số lượng và tổng tiền phạt
        loanSlip.setTotalQuantity(request.getTotalQuantity() != null ? request.getTotalQuantity() : tongSoLuong);
        loanSlip.setTotalFine(request.getTotalFine() != null ? request.getTotalFine() : tongTienPhat);

        LoanSlip savedLoanSlip = loanSlipRepository.save(loanSlip);

        // Cập nhật số lượng sẵn có của cuốn sách
        capNhatSoLuongSach();

        return savedLoanSlip;
    }

    // Phương thức sửa dữ liệu (cách cũ: chỉ sửa thông tin phiếu)
    public LoanSlip updateLoanSlip(Long Id, LoanSlip loanSlip) {

        LoanSlip existingLoanSlip = this.getLoanSlipById(Id);

        existingLoanSlip.setStartDate(loanSlip.getStartDate());
        existingLoanSlip.setReturnDate(loanSlip.getReturnDate());
        existingLoanSlip.setEndDate(loanSlip.getEndDate());
        existingLoanSlip.setTotalQuantity(loanSlip.getTotalQuantity());
        existingLoanSlip.setTotalFine(loanSlip.getTotalFine());
        existingLoanSlip.setStatus(loanSlip.getStatus());
        existingLoanSlip.setCustomer(loanSlip.getCustomer());
        existingLoanSlip.setAdmin(loanSlip.getAdmin());

        return loanSlipRepository.save(existingLoanSlip);
    }

    // Sửa phiếu mượn kèm danh sách sách mượn: thay toàn bộ chi tiết cũ bằng chi tiết mới
    @Transactional
    public LoanSlip updateLoanSlip(Long Id, LoanSlipRequest request) {

        LoanSlip existingLoanSlip = this.getLoanSlipById(Id);

        // Xóa chi tiết cũ (kèm lỗi sách) và trả lại trạng thái bản ghi sách
        for (LoanSlipDetail oldDetail : loanSlipDetailRepository.findByLoanSlipId(Id)) {
            traLaiTrangThaiBanSach(oldDetail);
            loanSlipDetailErrorRepository.deleteAll(loanSlipDetailErrorRepository.findByLoanSlipDetailId(oldDetail.getId()));
            loanSlipDetailRepository.delete(oldDetail);
        }

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Không có khách hàng phù hợp"));

        Admin admin = adminRepository.findById(request.getAdminId())
                .orElseThrow(() -> new RuntimeException("Không có admin phù hợp"));

        existingLoanSlip.setCustomer(customer);
        existingLoanSlip.setAdmin(admin);
        existingLoanSlip.setStartDate(request.getStartDate());
        existingLoanSlip.setReturnDate(request.getReturnDate());
        existingLoanSlip.setEndDate(request.getEndDate());
        existingLoanSlip.setStatus(resolveStatus(request.getStatus()));

        double tongTienPhat = 0;
        int tongSoLuong = 0;

        for (LoanSlipRequest.Detail detailRequest : request.getDetails()) {

            BookDetail bookDetail = bookDetailRepository.findById(detailRequest.getBookDetailId())
                    .orElseThrow(() -> new RuntimeException("Không có bản ghi sách phù hợp"));

            LoanSlipDetail loanSlipDetail = new LoanSlipDetail();
            loanSlipDetail.setLoanSlip(existingLoanSlip);
            loanSlipDetail.setBookDetail(bookDetail);
            loanSlipDetail.setStatus(resolveDetailStatus(detailRequest.getStatus(), existingLoanSlip.getStatus()));

            LoanSlipDetail savedDetail = loanSlipDetailRepository.save(loanSlipDetail);

            bookDetail.setStatus("Borrowed");
            bookDetailRepository.save(bookDetail);

            tongSoLuong++;

            for (LoanSlipRequest.ErrorItem errorItem : detailRequest.getErrors()) {

                BookError bookError = bookErrorRepository.findById(errorItem.getErrorId())
                        .orElseThrow(() -> new RuntimeException("Không có loại lỗi sách phù hợp"));

                LoanSlipDetailError detailError = new LoanSlipDetailError();
                detailError.setLoanSlipDetail(savedDetail);
                detailError.setError(bookError);

                double fineAmount = errorItem.getFineAmount() != null
                        ? errorItem.getFineAmount()
                        : (bookError.getFineAmount() != null ? bookError.getFineAmount() : 0);

                detailError.setFineAmount(fineAmount);
                loanSlipDetailErrorRepository.save(detailError);

                tongTienPhat += fineAmount;
            }
        }

        existingLoanSlip.setTotalQuantity(request.getTotalQuantity() != null ? request.getTotalQuantity() : tongSoLuong);
        existingLoanSlip.setTotalFine(request.getTotalFine() != null ? request.getTotalFine() : tongTienPhat);

        LoanSlip saved = loanSlipRepository.save(existingLoanSlip);

        capNhatSoLuongSach();

        return saved;
    }

    // Phương thức xóa dữ liệu
    // Xóa kèm chi tiết phiếu mượn và lỗi sách, đồng thời trả lại trạng thái bản ghi sách
    @Transactional
    public LoanSlip deleteLoanSlip(Long Id) {

        LoanSlip existingLoanSlip = this.getLoanSlipById(Id);

        for (LoanSlipDetail detail : loanSlipDetailRepository.findByLoanSlipId(Id)) {
            traLaiTrangThaiBanSach(detail);
            loanSlipDetailErrorRepository.deleteAll(loanSlipDetailErrorRepository.findByLoanSlipDetailId(detail.getId()));
            loanSlipDetailRepository.delete(detail);
        }

        loanSlipRepository.deleteById(Id);

        capNhatSoLuongSach();

        return existingLoanSlip;
    }

    // Trả lại trạng thái "Available" cho bản ghi sách khi trả sách hoặc xóa phiếu
    private void traLaiTrangThaiBanSach(LoanSlipDetail detail) {

        if (detail.getBookDetail() == null) {
            return;
        }

        BookDetail bookDetail = detail.getBookDetail();

        // Chỉ trả lại nếu bản ghi sách đang ở trạng thái đang mượn
        if ("Borrowed".equalsIgnoreCase(bookDetail.getStatus())) {
            bookDetail.setStatus("Available");
            bookDetailRepository.save(bookDetail);
        }
    }

    // Tính lại tổng số bản và số lượng sẵn có của từng cuốn sách
    private void capNhatSoLuongSach() {

        List<BookDetail> allDetails = bookDetailRepository.findAll();

        for (Book book : bookRepository.findAll()) {

            final Long bookId = book.getId();

            int tongBanSach = 0;
            int soDangMuon = 0;

            for (BookDetail detail : allDetails) {
                if (detail.getBook() == null || !detail.getBook().getId().equals(bookId)) {
                    continue;
                }

                tongBanSach++;

                if ("Borrowed".equalsIgnoreCase(detail.getStatus())) {
                    soDangMuon++;
                }
            }

            int soConLai = tongBanSach - soDangMuon;

            boolean coThayDoi = false;

            if (book.getTotalQuantity() == null || book.getTotalQuantity() != tongBanSach) {
                book.setTotalQuantity(tongBanSach);
                coThayDoi = true;
            }

            if (book.getAvailableQuantity() == null || book.getAvailableQuantity() != soConLai) {
                book.setAvailableQuantity(soConLai);
                coThayDoi = true;
            }

            if (coThayDoi) {
                bookRepository.save(book);
            }
        }
    }

    // Chuẩn hóa trạng thái phiếu mượn
    private String resolveStatus(String status) {

        if (status == null || status.trim().isEmpty()) {
            return "Borrowing";
        }

        return status.trim();
    }

    // Chuẩn hóa trạng thái chi tiết phiếu mượn
    private String resolveDetailStatus(String detailStatus, String loanSlipStatus) {

        if (detailStatus != null && !detailStatus.trim().isEmpty()) {
            return detailStatus.trim();
        }

        // Nếu phiếu đã trả thì chi tiết cũng đã trả
        if (loanSlipStatus != null && loanSlipStatus.toLowerCase().contains("return")) {
            return "Returned";
        }

        return "Borrowed";
    }
}