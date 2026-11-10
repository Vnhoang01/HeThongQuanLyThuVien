import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import BookList from "./Components/BookList";
import BookDetailList from "./Components/BookDetailList";
import AddBookForm from "./Components/AddBookForm";
import EditBookForm from "./Components/EditBookForm";

import LoanSlipList from "./Components/LoanSlipList";
import AddLoanSlipForm from "./Components/AddLoanSlipForm";
import EditLoanSlipForm from "./Components/EditLoanSlipForm";

import CategoryList from "./Components/CategoryList";
import AddCategoryForm from "./Components/AddCategoryForm";
import EditCategoryForm from "./Components/EditCategoryForm";

import AuthorList from "./Components/AuthorList";
import AddAuthorForm from "./Components/AddAuthorForm";
import EditAuthorForm from "./Components/EditAuthorForm";

import PublisherList from "./Components/PublisherList";
import AddPublisherForm from "./Components/AddPublisherForm";
import EditPublisherForm from "./Components/EditPublisherForm";

import CustomerList from "./Components/CustomerList";
import AddCustomerForm from "./Components/AddCustomerForm";
import EditCustomerForm from "./Components/EditCustomerForm";

import AdminList from "./Components/AdminList";
import AddAdminForm from "./Components/AddAdminForm";
import EditAdminForm from "./Components/EditAdminForm";

import BookErrorList from "./Components/BookErrorList";
import AddBookErrorForm from "./Components/AddBookErrorForm";
import EditBookErrorForm from "./Components/EditBookErrorForm";

import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";

import PrivateRoute from "./Components/PrivateRoute";
import SystemLayout from "./Components/SystemLayout";

// Quy tắc khi trang web được tải:
// - Tải lại trang (F5) -> giữ nguyên trang đang xem.
// - Mở trang mới hoặc quay lại trang từ lịch sử
//   -> về trang đăng nhập trước.
// Chỉ chạy một lần khi trang web được tải.
function ForceLoginPageOnStart() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let navigationType = "navigate";

    try {
      const entries = performance.getEntriesByType("navigation");

      if (entries.length > 0) {
        navigationType = entries[0].type;
      }
    } catch (error) {
      navigationType = "navigate";
    }

    // Chỉ khi tải lại trang (F5) thì giữ nguyên trang hiện tại.
    if (navigationType === "reload") {
      return;
    }

    // Mở trang mới thì về trang đăng nhập trước.
    if (location.pathname !== "/login") {
      navigate("/login", { replace: true });
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
        {/* Đăng nhập */}
        <Route path="/login" element={<LoginPage />} />

        {/* Trang chủ: ADMIN và LIBRARIAN */}
        <Route element={<PrivateRoute />}>
          <Route element={<SystemLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Route>

        {/* Phiếu mượn và lỗi sách: ADMIN và LIBRARIAN */}
        <Route element={<PrivateRoute roles={["ADMIN", "LIBRARIAN"]} />}>
          <Route element={<SystemLayout />}>
            {/* Lỗi sách */}
            <Route path="/errors" element={<BookErrorList />} />
            <Route path="/errors/create" element={<AddBookErrorForm />} />
            <Route path="/errors/edit/:id" element={<EditBookErrorForm />} />

            {/* Phiếu mượn */}
            <Route path="/loans" element={<LoanSlipList />} />
            <Route path="/loans/create" element={<AddLoanSlipForm />} />
            <Route path="/loans/edit/:id" element={<EditLoanSlipForm />} />
          </Route>
        </Route>

        {/* Quản lý sách, thể loại, tác giả, nhà xuất bản:
            ADMIN và LIBRARIAN đều được truy cập */}
        <Route element={<PrivateRoute roles={["ADMIN", "LIBRARIAN"]} />}>
          <Route element={<SystemLayout />}>
            {/* Danh mục */}
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/create" element={<AddCategoryForm />} />
            <Route path="/categories/edit/:id" element={<EditCategoryForm />} />

            {/* Tác giả */}
            <Route path="/authors" element={<AuthorList />} />
            <Route path="/authors/create" element={<AddAuthorForm />} />
            <Route path="/authors/edit/:id" element={<EditAuthorForm />} />

            {/* Nhà xuất bản */}
            <Route path="/publishers" element={<PublisherList />} />
            <Route path="/publishers/create" element={<AddPublisherForm />} />
            <Route
              path="/publishers/edit/:id"
              element={<EditPublisherForm />}
            />

            {/* Sách */}
            <Route path="/books" element={<BookList />} />
            <Route path="/books/create" element={<AddBookForm />} />
            <Route path="/books/edit/:id" element={<EditBookForm />} />
            <Route path="/books/:bookId/details" element={<BookDetailList />} />
          </Route>
        </Route>

        {/* Các chức năng chỉ ADMIN được truy cập */}
        <Route element={<PrivateRoute roles={["ADMIN"]} />}>
          <Route element={<SystemLayout />}>
            {/* Khách hàng */}
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/create" element={<AddCustomerForm />} />
            <Route path="/customers/edit/:id" element={<EditCustomerForm />} />

            {/* Quản trị viên */}
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
