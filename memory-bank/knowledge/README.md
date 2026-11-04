# Quy Tắc Lưu Kiến Thức

- **Chỉ lưu kiến thức** khi đã có bằng chứng rõ ràng (Ví dụ: Đã đọc annotation `@ManyToOne`/`@OneToMany` từ file Entity, hoặc đã kiểm tra JSON response API thực tế).
- **Không lưu sơ đồ quan hệ (ERD)** hoặc API request/response giả định nếu chưa được xác minh từ code thực tế.
- **Không ghi lại** giá trị bí mật hoặc nội dung nhạy cảm nào trong bộ kiến thức này.
- **Phân biệt rõ** phiên bản khai báo (trong file config) và version chạy thực tế.