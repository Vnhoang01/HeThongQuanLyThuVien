import { Card, Row, Col } from 'react-bootstrap';

import { getEmail, getRole, hasAnyRole } from '../Utils/auth';

//Nhãn hiển thị cho từng role
const ROLE_LABELS = {
  ADMIN: 'Quản trị viên',
  LIBRARIAN: 'Thủ thư'
};

//Các chức năng trong hệ thống (tương ứng các danh mục trong cột menu bên trái)
//roles: mảng role được phép thấy thẻ chức năng này, để trống thì mọi vai trò đều thấy
const MENU = [
  { title: 'Thể loại', description: 'Quản lý thể loại sách', icon: '🗂️', path: '/categories', roles: ['ADMIN'] },
  { title: 'Tác giả', description: 'Quản lý tác giả', icon: '✍️', path: '/authors', roles: ['ADMIN'] },
  { title: 'Nhà xuất bản', description: 'Quản lý nhà xuất bản', icon: '🏢', path: '/publishers', roles: ['ADMIN'] },
  { title: 'Khách hàng', description: 'Quản lý khách hàng của thư viện', icon: '👤', path: '/customers', roles: ['ADMIN'] },
  { title: 'Tài khoản admin', description: 'Quản lý tài khoản quản trị', icon: '🔑', path: '/admins', roles: ['ADMIN'] },
  { title: 'Lỗi sách', description: 'Danh mục lỗi và tiền phạt', icon: '⚠️', path: '/errors', roles: ['ADMIN', 'LIBRARIAN'] }
];

function HomePage() {

  //Chỉ hiển thị chức năng mà vai trò hiện tại được phép dùng
  const visibleMenu = MENU.filter((item) => hasAnyRole(item.roles));

  return (
    <>

      <h2 className="mb-3">🏠 Trang chủ</h2>

      <p className="text-muted">
        Xin chào <strong>{getEmail() || 'Admin'}</strong> ({ROLE_LABELS[getRole()] || getRole()})! Bạn đang đăng nhập hệ thống quản lý thư viện.
      </p>

      <div className="alert alert-info">
        💡 Chọn chức năng ở <strong>cột menu bên trái</strong> (nhấn <strong>❌ Ẩn menu</strong> / <strong>☰ Hiện menu</strong> trên thanh trên cùng để ẩn hoặc hiện cột menu này).
      </div>

      <h5 className="mb-3">Các chức năng chính trong hệ thống</h5>

      <Row>

        {visibleMenu.map((item) => (

          <Col md={4} key={item.path} className="mb-4">

            <Card className="h-100">

              <Card.Body>

                <h5>
                  {item.icon} {item.title}
                </h5>

                <p className="text-muted mb-0">
                  {item.description}
                </p>

              </Card.Body>

            </Card>

          </Col>

        ))}

      </Row>

    </>
  );
}

export default HomePage;
