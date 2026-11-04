# Product Context

## Người Dùng
- **ADMIN**: Quyền được xác minh từ `SecureConfig.java` qua `@RequestMapping(...).hasRole("ADMIN")` cho các endpoint: `/admins/**`, `/books/**`, `/categories/**`, `/authors/**`, `/publishers/**`, `/customers/*/reset-password` (POST).
- **LIBRARIAN**: Thông tin chi tiết về quyền hạn chưa được suy diễn trong bộ kiểm kê này.

## Quy Trình Nghề Vụ
1. **Đăng nhập**: Người dùng nhập email/mật khẩu tại trang `/login`.
2. **Xác thực**: Backend so sánh mật khẩu (mã hóa BCrypt) và phát hành JWT token chứa email và role.
3. **Gọi API**: Frontend gửi kèm header `Authorization: Bearer {token}`.
4. **Phân quyền**: Backend (`SecureConfig.java`) kiểm tra role trước khi xử lý yêu cầu.