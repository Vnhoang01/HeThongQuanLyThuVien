package com.example.demo.Exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Bắt lỗi chung của toàn hệ thống và trả về JSON dạng { "message": "..." }
 * để frontend hiển thị đúng thông báo thay vì "Xóa thất bại" chung chung.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Lỗi nghiệp vụ khi dữ liệu đang được tham chiếu (không xóa được)
    @ExceptionHandler(DeleteRestrictedException.class)
    public ResponseEntity<Map<String, Object>> handleDeleteRestricted(DeleteRestrictedException e) {
        return build(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    // Không tìm thấy bản ghi theo id
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntime(RuntimeException e) {
        String message = e.getMessage();

        // Thông báo "Không có xxx phù hợp" là lỗi không tìm thấy bản ghi
        if (message != null && message.startsWith("Không có")) {
            return build(HttpStatus.NOT_FOUND, message);
        }

        return build(HttpStatus.BAD_REQUEST, message != null ? message : "Đã xảy ra lỗi");
    }

    // Lỗi khiến dữ liệu vi phạm ràng buộc khóa ngoại (dự phòng)
    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> handleIntegrity(org.springframework.dao.DataIntegrityViolationException e) {
        return build(HttpStatus.BAD_REQUEST,
                "Dữ liệu đang được tham chiếu ở bảng khác nên không thể thực hiện thao tác này");
    }

    // Gom body thành JSON { "message": "..." }
    private ResponseEntity<Map<String, Object>> build(HttpStatus status, String message) {
        Map<String, Object> body = new HashMap<>();
        body.put("message", message);

        return ResponseEntity.status(status).body(body);
    }
}
