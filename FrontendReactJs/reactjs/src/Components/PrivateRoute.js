import { Navigate, Outlet } from 'react-router-dom';

import { isLoggedIn, hasAnyRole } from '../Utils/auth';

//Chặn truy cập: chưa đăng nhập thì về trang đăng nhập
//Nếu truyền props roles (mảng role được phép) thì kiểm tra thêm quyền, sai vai trò thì về trang chủ
function PrivateRoute({ roles }) {

    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    //Tài khoản không có quyền thì không cho vào trang này
    if (!hasAnyRole(roles)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default PrivateRoute;
