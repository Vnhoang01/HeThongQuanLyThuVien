# Progress Tracker

## Trạng Thái Kiểm Tra

| Nội dung | Trạng thái | Bằng chứng |
| :--- | :---: | :--- |
| Version React, react-router, react-router-dom | Đã đọc code | `package.json` |
| Version Java và Parent POM | Đã đọc code | `pom.xml` |
| CORS Config | Đã đọc code | `SecureConfig.java` |
| Role ADMIN | Đã đọc code | `SecureConfig.java` |
| Cấu hình Jackson (UPPER_CAMEL_CASE) | Đã đọc code | `application.properties` |
| Quan hệ Entity (Annotation) | Chưa xác minh | Chưa đọc annotation file Entity |
| JSON Response API thực tế | Chưa xác minh | Chưa gọi API GET và đối chiếu |
| Logic Xóa LoanSlip | Chưa xác minh | Chưa xác minh đầy đủ flow Controller-Service-Repository-Entity |

## Tiến Độ Nhiệm Vụ Sửa Phân Quyền App.js

| Nội dung | Trạng thái | Bằng chứng |
| :--- | :---: | :--- |
| Đọc và phân tích cấu trúc Routes | Đã đọc code | Nội dung `App.js` đã được kiểm tra trong nhiệm vụ |
| Điều chỉnh phân quyền Routes | Đã triển khai, chưa kiểm thử | Báo cáo thay đổi `App.js`; cần đối chiếu mã nguồn cuối cùng |
| Build Frontend | Đã kiểm thử thành công | Báo cáo `npm run build` thành công; còn 5 cảnh báo ESLint và 1 cảnh báo Browserslist |
| Kiểm thử quyền ADMIN | Chưa xác minh | Cần lưu hoặc đối chiếu bằng chứng kiểm thử thực tế |
| Kiểm thử quyền LIBRARIAN | Chưa xác minh | Cần lưu hoặc đối chiếu bằng chứng kiểm thử thực tế |
| Git staging | Chưa xác minh | Chưa chạy `git add` |
| Git commit | Chưa xác minh | Chưa tạo commit |
| Git push | Chưa xác minh | Chưa push |

## Ghi Chú Về 5 Trạng Thái Chính Thức

1. **Đã đọc code**: Chỉ xác nhận đã đọc file nguồn, không đồng nghĩa chức năng đã triển khai hoặc kiểm thử thành công.
2. **Đã triển khai, chưa kiểm thử**: Đã thực hiện thay đổi code nhưng chưa có bằng chứng kiểm thử thực tế.
3. **Đã kiểm thử thành công**: Chỉ sử dụng khi có bằng chứng chạy test hoặc kiểm thử thực tế.
4. **Đang phát triển**: Công việc hiện vẫn đang được thực hiện.
5. **Chưa xác minh**: Chưa có đủ bằng chứng để xác nhận.

## Ghi Chú Khác

- Build thành công không đồng nghĩa với kiểm thử phân quyền thành công.
- Không tự ý chuyển trạng thái nếu chưa có bằng chứng.
- Không tự ý staging, commit hoặc push.
- Giữ nguyên lịch sử tiến độ trước đó khi cập nhật các nhiệm vụ tiếp theo.