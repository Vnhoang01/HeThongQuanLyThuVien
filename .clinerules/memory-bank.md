# QUY TẮC TÍCH HỢP MEMORY BANK

## 1. PHẠM VI ÁP DỤNG

- Các quy tắc này chỉ áp dụng cho dự án HeThongQuanLyThuVien.
- Thư mục Memory Bank nằm tại `memory-bank/`.
- Giữ nguyên cấu trúc Memory Bank hiện có.
- Không tự ý tạo thêm file Memory Bank nếu chưa được người dùng phê duyệt.
- Tuân thủ đồng thời các Global Rules và Workspace Rules hiện có.

## 2. QUY TRÌNH KHI BẮT ĐẦU NEW TASK

Khi bắt đầu mỗi New Task, bắt buộc thực hiện:

1. Đọc `memory-bank/activeContext.md` để nắm ngữ cảnh và nhiệm vụ hiện tại.
2. Đọc `memory-bank/progress.md` để nắm trạng thái tiến độ dự án.
3. Xác định các tài liệu Memory Bank khác có liên quan đến nhiệm vụ.
4. Chỉ đọc những tài liệu liên quan, không mặc định đọc toàn bộ Memory Bank.
5. Kiểm tra code nguồn và cấu hình thực tế khi cần xác minh thông tin kỹ thuật.

Không được mặc định thông tin trong Memory Bank luôn phản ánh chính xác trạng thái code hiện tại.

Nếu không thể đọc file cần thiết, phải thông báo rõ. Tuyệt đối không được giả vờ đã đọc file.

## 3. QUY TRÌNH KHI TIẾP TỤC TASK

- Tiếp tục sử dụng ngữ cảnh hiện tại nếu thông tin vẫn đầy đủ và đáng tin cậy.
- Đọc lại các tài liệu Memory Bank liên quan khi ngữ cảnh bị thiếu, lỗi thời, không đầy đủ hoặc có dấu hiệu mâu thuẫn.
- Không đọc lại toàn bộ Memory Bank một cách máy móc nếu không cần thiết.

## 4. QUY TẮC CẬP NHẬT MEMORY BANK

Chỉ được cập nhật các file Memory Bank nằm trong phạm vi nhiệm vụ đã được người dùng phê duyệt.

### 4.1. activeContext.md

- Chỉ cập nhật khi nhiệm vụ hoặc ngữ cảnh dự án thay đổi đáng kể.
- Không cập nhật sau những câu hỏi đơn giản hoặc nội dung không liên quan đến tiến độ dự án.
- Luôn sử dụng ngày thực tế tại thời điểm cập nhật.

### 4.2. progress.md

- Chỉ cập nhật khi trạng thái công việc thực sự thay đổi và có bằng chứng xác nhận.
- Giữ nguyên chính xác 5 trạng thái đã thống nhất:

  1. Đã đọc code
  2. Đã triển khai, chưa kiểm thử
  3. Đã kiểm thử thành công
  4. Đang phát triển
  5. Chưa xác minh

- Mỗi trạng thái phải có bằng chứng phù hợp.
- Không được đánh dấu "Đã kiểm thử thành công" nếu chưa thực hiện kiểm thử thực tế.
- Không suy đoán tiến độ dựa trên kế hoạch hoặc báo cáo chưa được xác minh.

### 4.3. decisions/

- Chỉ ghi nhận các quyết định kỹ thuật đã được người dùng chấp thuận.
- Không tự biến đề xuất, giả định hoặc nhận định của AI thành quyết định chính thức.
- Không tự ý thay đổi các quyết định đã được phê duyệt.

### 4.4. knowledge/

- Chỉ lưu trữ thông tin đã được xác minh.
- Mỗi kiến thức cần có nguồn hoặc bằng chứng.
- Chỉ lưu thông tin có giá trị tái sử dụng trong tương lai.
- Không lưu suy đoán, thông tin chưa xác minh hoặc dữ liệu nhạy cảm.

### 4.5. Kiểm soát phạm vi cập nhật

- Nếu muốn cập nhật file nằm ngoài phạm vi nhiệm vụ đã được phê duyệt, phải đề xuất và chờ người dùng xác nhận.
- Không tự ý cập nhật nhiều file chỉ vì cho rằng việc đó hữu ích.
- Không sửa nội dung Memory Bank để che giấu lỗi hoặc sự khác biệt giữa tài liệu và code thực tế.

## 5. XỬ LÝ MÂU THUẪN THÔNG TIN

Phân biệt rõ ba nguồn thông tin:

- **Code và cấu hình thực tế:** Phản ánh hành vi hiện tại của hệ thống.
- **Quyết định đã được người dùng phê duyệt:** Phản ánh thiết kế và định hướng mong muốn.
- **Memory Bank:** Lưu trữ ngữ cảnh, kiến thức và thông tin tiến độ đã được ghi nhận.

Khi phát hiện thông tin mâu thuẫn:

1. Báo cáo nội dung mâu thuẫn.
2. Kiểm tra và xác minh bằng chứng liên quan.
3. Phân tích ảnh hưởng của sự khác biệt.
4. Trình bày phương án xử lý.
5. Chờ người dùng quyết định.

Không tự ý sửa code hoặc Memory Bank để giải quyết mâu thuẫn khi chưa được phê duyệt.

## 6. AN TOÀN VÀ KIỂM SOÁT THAY ĐỔI

- Luôn tuân thủ các Global Rules và Workspace Rules hiện có.
- Không tự ý sửa các file Rules hiện tại.
- Không tiết lộ, sao chép hoặc ghi lại mật khẩu, API Key, JWT Secret, token và thông tin nhạy cảm.
- Không thực hiện thao tác xóa dữ liệu, thay đổi cấu trúc cơ sở dữ liệu hoặc thay đổi có tính phá hủy nếu chưa được người dùng phê duyệt.
- Ưu tiên thay đổi nhỏ nhất, đúng phạm vi yêu cầu.
- Không tự ý tạo, sửa, đổi tên hoặc xóa các file không liên quan.
- Nếu phát hiện yêu cầu vượt quá phạm vi đã được phê duyệt, phải dừng lại và hỏi người dùng.

## 7. BÁO CÁO KHI THỰC HIỆN NHIỆM VỤ

### 7.1. Khi bắt đầu New Task

Thông báo ngắn gọn:

- Đã đọc hay chưa đọc `activeContext.md`.
- Đã đọc hay chưa đọc `progress.md`.
- Danh sách tài liệu Memory Bank bổ sung đã đọc.
- Các thông tin không thể truy cập hoặc có dấu hiệu mâu thuẫn.

Không cần trình bày lại toàn bộ nội dung Memory Bank.

### 7.2. Khi kết thúc nhiệm vụ

Báo cáo riêng biệt:

- Các file code đã thay đổi.
- Các file Memory Bank đã thay đổi.
- Nguyên nhân và mục đích thay đổi.
- Kết quả kiểm thử thực tế.
- Các vấn đề chưa xác minh hoặc còn tồn tại.

Nếu không thay đổi Memory Bank, phải ghi rõ không có file Memory Bank nào được cập nhật.

## 8. NGUYÊN TẮC ƯU TIÊN

- Memory Bank hỗ trợ duy trì ngữ cảnh giữa các nhiệm vụ, không thay thế việc kiểm tra code thực tế.
- Không đánh đổi tính an toàn để duy trì tính liên tục của Memory Bank.
- Không tự suy diễn thông tin còn thiếu.
- Không tự ý mở rộng phạm vi nhiệm vụ.
- Khi không chắc chắn, hãy báo cáo và hỏi người dùng trước khi hành động.