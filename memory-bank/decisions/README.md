# Quy Tắc Ghi Nhận Quyết Định

- **Chỉ ghi nhận quyết định** có bằng chứng từ code nguồn hoặc file cấu hình (`pom.xml`, `SecureConfig.java`, `application.properties`).
- **Không tự suy đoán** thành luận kỹ thuật (Ví dụ: Không khẳng định "Dùng JWT là vì..." nếu không có lý do kỹ thuật đã ghi nhận).
- **Không ghi kết luận** về chức năng nếu không có bằng chứng thực tế (test chạy hoặc kiểm tra API).
- **Không lưu trữ** bí mật (JWT Secret, API Key, mật khẩu) trong nội quyết định.