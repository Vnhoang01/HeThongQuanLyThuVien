# Workspace Rules - Fullstack Project

## 1. Phạm vi dự án
- Dự án gồm BackendSpringBoot (Java, Spring Boot, REST API, MySQL) và FrontendReactJS (React, JavaScript hoặc TypeScript tùy cấu hình thực tế).
- Đọc cấu trúc, phiên bản và công nghệ hiện có trước khi sửa.
- Tuân thủ Global Rules và các quy ước của từng phần.
- Không tự ý thay đổi kiến trúc hoặc công nghệ của dự án.

## 2. Phân biệt Backend và Frontend
- Xác định rõ file thuộc backend hay frontend trước khi thay đổi.
- Backend xử lý nghiệp vụ, xác thực, phân quyền, validation và truy cập dữ liệu.
- Frontend xử lý giao diện, state, form, điều hướng và giao tiếp với API.
- Không đưa logic truy cập database trực tiếp vào frontend.
- Không coi việc ẩn giao diện là cơ chế bảo mật thay cho backend.

## 3. Quy tắc BackendSpringBoot
- Kiểm tra pom.xml hoặc build.gradle, phiên bản Java, Spring Boot và cấu trúc package trước khi sửa.
- Tuân thủ kiến trúc hiện có; khi phù hợp, phân chia trách nhiệm giữa Controller, Service, Repository, Entity và DTO.
- Kiểm tra HTTP method, endpoint, request body, response và status code.
- Xử lý validation, lỗi nghiệp vụ, dữ liệu không tồn tại và dữ liệu trùng lặp.
- Kiểm tra quan hệ Entity, khóa ngoại và ràng buộc database khi có liên quan.
- Kiểm tra cấu hình Spring Security, JWT, authentication và authorization khi sửa chức năng bảo mật.
- Không vô hiệu hóa bảo mật chỉ để làm API hoạt động.
- Không tự ý thay đổi hợp đồng API mà frontend đang sử dụng.
- Không tự ý reset database, xóa dữ liệu hoặc chạy migration có nguy cơ mất dữ liệu.

## 4. Quy tắc FrontendReactJS
- Kiểm tra package.json, phiên bản React, công cụ build và cấu trúc src trước khi sửa.
- Giữ nguyên quy ước component, routing, state management và thư viện hiện có.
- Tuân thủ Rules of Hooks; không gọi Hooks có điều kiện hoặc trong vòng lặp.
- Xử lý loading, success, empty state và lỗi API khi phù hợp.
- Kiểm tra form validation, dữ liệu đầu vào và thông báo lỗi.
- Giữ giao diện và hành vi hiện có nếu không được yêu cầu thay đổi.
- Không tự ý thay thư viện UI, đổi cấu trúc component hoặc thêm dependency không cần thiết.
- Không tự ý thay đổi luồng đăng nhập, lưu token hoặc cơ chế bảo vệ route.

## 5. Quy tắc tích hợp Frontend và Backend
- Kiểm tra luồng dữ liệu từ component đến API và từ API về giao diện trước khi sửa lỗi tích hợp.
- Xác minh base URL, endpoint, HTTP method, request headers, request body và response.
- Kiểm tra cấu hình CORS và Spring Security khi request bị chặn.
- Phân biệt lỗi mạng, lỗi CORS, lỗi xác thực, lỗi phân quyền và lỗi nghiệp vụ.
- Khi thay đổi API, kiểm tra mọi component hoặc service frontend sử dụng API đó.
- Không tự ý đổi tên trường JSON hoặc định dạng dữ liệu giữa hai phía.
- Không xử lý lỗi bằng cách vô hiệu hóa xác thực hoặc bỏ qua kiểm tra dữ liệu.
- Không giả định frontend hoặc backend bị lỗi khi chưa kiểm tra bằng chứng.

## 6. Quy trình sửa lỗi
- Đọc code liên quan ở cả frontend và backend trước khi kết luận lỗi nằm ở đâu.
- Với lỗi đơn giản, sửa phần nhỏ nhất có thể.
- Với tính năng mới hoặc thay đổi nhiều file, lập kế hoạch trong Plan mode trước khi chuyển sang Act mode.
- Nêu rõ nguyên nhân dự kiến và cách xác minh.
- Không sửa các file không liên quan đến yêu cầu.

## 7. Kiểm thử
- Backend: chạy test hoặc build phù hợp; kiểm tra API, validation, quyền truy cập và xử lý lỗi khi liên quan.
- Frontend: chạy test hoặc build phù hợp; kiểm tra giao diện, form, routing và trạng thái API khi liên quan.
- Tích hợp: kiểm tra request thực tế, status code và dữ liệu trả về giữa frontend và backend.
- Không tuyên bố kiểm thử thành công nếu chưa chạy hoặc chưa có bằng chứng.
- Không tự ý sử dụng dữ liệu thật hoặc phá hủy dữ liệu để kiểm thử.

## 8. Báo cáo kết quả
- Liệt kê các file backend và frontend đã tạo, sửa hoặc xóa.
- Giải thích nguyên nhân và cách sửa.
- Nêu API hoặc luồng giao tiếp bị ảnh hưởng.
- Báo kết quả test/build thực tế và các lỗi còn tồn tại.
- Nếu không thể chạy kiểm thử, giải thích lý do và hướng dẫn cách kiểm tra tiếp.