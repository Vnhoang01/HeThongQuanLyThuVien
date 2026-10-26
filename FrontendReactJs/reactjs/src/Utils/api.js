//Các hàm gọi API dùng chung, giúp xử lý lỗi thống nhất cho toàn hệ thống:
//- Server trả về { "message": "..." } khi có lỗi nghiệp vụ (VD: không xóa được admin còn phiếu mượn)
//- Frontend hiển thị đúng thông báo đó thay vì câu "Xóa thất bại" chung chung

import { authHeaders } from './auth';

//Gọi API và tự động parse JSON, ném ra Error với message của server nếu có lỗi
export const apiFetch = async (url, options = {}) => {

    const response = await fetch(url, options);

    //Đọc nội dung trả về (có thể là JSON hoặc chuỗi)
    const raw = await response.text();
    let data = null;

    if (raw) {
        try {
            data = JSON.parse(raw);
        } catch (error) {
            data = raw;
        }
    }

    if (!response.ok) {
        //Lấy message từ server, không có thì dùng thông báo mặc định
        const message = (data && data.message)
            ? data.message
            : (typeof data === 'string' && data ? data : 'Đã xảy ra lỗi');

        const error = new Error(message);
        error.status = response.status;

        throw error;
    }

    return data;
};

//Header JSON + token đăng nhập
export const jsonHeaders = () => {
    return {
        'Content-type': 'application/json',
        ...authHeaders()
    };
};
