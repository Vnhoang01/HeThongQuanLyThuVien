package com.example.demo.Exceptions;

/**
 * Lỗi nghiệp vụ khi người dùng thao tác không hợp lệ với dữ liệu đang liên kết.
 * Ví dụ: xóa admin mà admin đó còn phiếu mượn đã duyệt, xóa sách mà còn bản ghi sách...
 * Không đụng vào khóa ngoại trong DB (FK vẫn là NO ACTION), chỉ chặn ở tầng ứng dụng
 * để trả về thông báo rõ ràng cho người dùng.
 */
public class DeleteRestrictedException extends RuntimeException {

    public DeleteRestrictedException(String message) {
        super(message);
    }
}
