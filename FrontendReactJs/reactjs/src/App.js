import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { useEffect } from "react";

import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import BookList from "./Components/BookList";
import AddBookForm from "./Components/AddBookForm";
import LoanSlipList from "./Components/LoanSlipList";
import AddLoanSlipForm from "./Components/AddLoanSlipForm";
import EditLoanSlipForm from "./Components/EditLoanSlipForm";

import CategoryList from './Components/CategoryList';
import AddCategoryForm from './Components/AddCategoryForm';
import EditCategoryForm from './Components/EditCategoryForm';

import AuthorList from './Components/AuthorList';
import AddAuthorForm from './Components/AddAuthorForm';
import EditAuthorForm from './Components/EditAuthorForm';

import PublisherList from './Components/PublisherList';
import AddPublisherForm from './Components/AddPublisherForm';
import EditPublisherForm from './Components/EditPublisherForm';
import EditBookForm from './Components/EditBookForm';

import CustomerList from './Components/CustomerList';
import AddCustomerForm from './Components/AddCustomerForm';
import EditCustomerForm from './Components/EditCustomerForm';

import AdminList from './Components/AdminList';
import AddAdminForm from './Components/AddAdminForm';
import EditAdminForm from './Components/EditAdminForm';

import BookErrorList from './Components/BookErrorList';
import AddBookErrorForm from './Components/AddBookErrorForm';
import EditBookErrorForm from './Components/EditBookErrorForm';

import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';

import PrivateRoute from './Components/PrivateRoute';
import SystemLayout from './Components/SystemLayout';

//Quy tắc khi trang web được tải:
//- Tải lại trang (F5) -> giữ nguyên trang đang xem
//- Mở trang mới hoặc quay lại trang từ lịch sử (đóng trang hệ thống đi rồi bật lại)
//  -> về trang đăng nhập trước, kể cả khi vẫn còn token trong máy
//Chỉ chạy 1 lần khi trang web được tải, không ảnh hưởng khi di chuyển trong hệ thống
function ForceLoginPageOnStart() {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //Xác định loại tải trang: reload (F5), navigate (mở mới), back_forward (nút lịch sử)
    let navigationType = 'navigate';

    try {
      const entries = performance.getEntriesByType('navigation');

      if (entries.length > 0) {
        navigationType = entries[0].type;
      }
    } catch (error) {
      //Trình duyệt không hỗ trợ thì mặc định là mở trang mới
      navigationType = 'navigate';
    }

    //Chỉ khi tải lại trang (F5) thì giữ nguyên trang hiện tại
    if (navigationType === 'reload') {
      return;
    }

    //Mở trang mới thì về trang đăng nhập trước
    if (location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

function App() {
  return (
    <BrowserRouter>

        <ForceLoginPageOnStart />

        <Routes>
          {/* Đăng nhập: vào hệ thống trước tiên */}
          <Route path="/login" element={<LoginPage />} />

          {/* Các trang bên trong hệ thống: phải đăng nhập mới vào được */}

          {/* Trang chung: cả ADMIN và LIBRARIAN đều vào được */}
          <Route element={<PrivateRoute />}>
            <Route element={<SystemLayout />}>

              {/* Trang chủ hệ thống */}
              <Route path="/" element={<HomePage />} />

            </Route>
          </Route>

          {/* Trang của ADMIN và LIBRARIAN: phiếu mượn và lỗi sách */}
          <Route element={<PrivateRoute roles={['ADMIN', 'LIBRARIAN']} />}>
            <Route element={<SystemLayout />}>

            {/* BookError */}
            <Route path="/errors" element={<BookErrorList />} />
            <Route path="/errors/create" element={<AddBookErrorForm />} />
            <Route path="/errors/edit/:id" element={<EditBookErrorForm />} />

            </Route>
          </Route>

          {/* Trang chỉ ADMIN được vào: thể loại, tác giả, nhà xuất bản, khách hàng, tài khoản admin */}
          <Route element={<PrivateRoute roles={['ADMIN']} />}>
            <Route element={<SystemLayout />}>

            {/* Category */}
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/create" element={<AddCategoryForm />} />
            <Route path="/categories/edit/:id" element={<EditCategoryForm />} />

            {/* Author */}
            <Route path="/authors" element={<AuthorList />} />
            <Route path="/authors/create" element={<AddAuthorForm />} />
            <Route path="/authors/edit/:id" element={<EditAuthorForm />} />

            {/* Publisher */}
            <Route path="/publishers" element={<PublisherList />} />
            <Route path="/publishers/create" element={<AddPublisherForm />} />
            <Route path="/publishers/edit/:id" element={<EditPublisherForm />} />

            {/* Customer */}
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/create" element={<AddCustomerForm />} />
            <Route path="/customers/edit/:id" element={<EditCustomerForm />} />

            {/* Book */}
            <Route path="/books" element={<BookList />} />
            <Route path="/books/create" element={<AddBookForm />} />
            <Route path="/books/edit/:id" element={<EditBookForm />} />

            {/* Loan Slip */}
            <Route path="/loans" element={<LoanSlipList />} />
            <Route path="/loans/create" element={<AddLoanSlipForm />} />
            <Route path="/loans/edit/:id" element={<EditLoanSlipForm />} />

            {/* Admin */}
            <Route path="/admins" element={<AdminList />} />
            <Route path="/admins/create" element={<AddAdminForm />} />
            <Route path="/admins/edit/:id" element={<EditAdminForm />} />

            </Route>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;