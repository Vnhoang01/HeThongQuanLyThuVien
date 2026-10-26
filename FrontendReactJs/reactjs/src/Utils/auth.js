//Các hàm tiện ích dùng chung cho việc đăng nhập
const TOKEN_KEY = 'qltt_token';
const EMAIL_KEY = 'qltt_email';
const ROLE_KEY = 'qltt_role';

//Lưu token, email và role (ADMIN hoặc LIBRARIAN) sau khi đăng nhập thành công
export const saveAuth = (token, email, role) => {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    if (email) {
        localStorage.setItem(EMAIL_KEY, email);
    }

    if (role) {
        localStorage.setItem(ROLE_KEY, role);
    }
};

//Lấy token đang lưu
export const getToken = () => localStorage.getItem(TOKEN_KEY);

//Lấy email của admin đang đăng nhập
export const getEmail = () => localStorage.getItem(EMAIL_KEY);

//Lấy role của tài khoản đang đăng nhập (ADMIN hoặc LIBRARIAN), mặc định ADMIN
//Chuẩn hóa trim + viết hoa để dữ liệu cũ lưu "Admin", "admin" vẫn so sánh đúng
export const getRole = () => {
    const role = localStorage.getItem(ROLE_KEY);
    return role ? role.trim().toUpperCase() : 'ADMIN';
};

//Kiểm tra tài khoản đang đăng nhập có nằm trong danh sách role được phép không
export const hasAnyRole = (roles) => {
    if (!roles || roles.length === 0) {
        return true;
    }

    return roles.includes(getRole());
};

//Xóa token khi đăng xuất
export const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(ROLE_KEY);
};

//Kiểm tra đã đăng nhập hay chưa
export const isLoggedIn = () => getToken() !== null;

//Header Authorization để gửi kèm các request cần xác thực
export const authHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};
