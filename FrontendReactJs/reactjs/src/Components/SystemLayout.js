import { useState, useEffect, useRef, useCallback } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';

import { Navbar, Nav, Button, Offcanvas, Container } from 'react-bootstrap';

import { getEmail, getRole, hasAnyRole, clearAuth } from '../Utils/auth';

//Nhãn hiển thị cho từng role
const ROLE_LABELS = {
  ADMIN: 'Quản trị viên',
  LIBRARIAN: 'Thủ thư'
};

//Danh sách các danh mục của hệ thống, hiển thị thành cột menu bên trái
//roles: mảng role được phép thấy menu này, để trống thì mọi vai trò đều thấy
const MENU = [
  {
    title: 'Thể loại',
    description: 'Quản lý thể loại sách',
    icon: '🗂️',
    path: '/categories',
    roles: ['ADMIN']
  },
  {
    title: 'Tác giả',
    description: 'Quản lý tác giả',
    icon: '✍️',
    path: '/authors',
    roles: ['ADMIN']
  },
  {
    title: 'Nhà xuất bản',
    description: 'Quản lý nhà xuất bản',
    icon: '🏢',
    path: '/publishers',
    roles: ['ADMIN']
  },
  {
    title: 'Khách hàng',
    description: 'Quản lý khách hàng của thư viện',
    icon: '👤',
    path: '/customers',
    roles: ['ADMIN']
  },
  {
    title: 'Tài khoản admin',
    description: 'Quản lý tài khoản quản trị',
    icon: '🔑',
    path: '/admins',
    roles: ['ADMIN']
  },
  {
    title: 'Lỗi sách',
    description: 'Danh mục lỗi và tiền phạt',
    icon: '⚠️',
    path: '/errors',
    roles: ['ADMIN', 'LIBRARIAN']
  }
];

//Chiều rộng cột menu khi hiển thị đầy đủ (cùng với .system-sidebar trong App.css)
const SIDEBAR_WIDTH = 272;

//Chiều rộng tối thiểu khi ẩn menu
const COLLAPSED_WIDTH = 0;

//Thời gian chạy hoạt ảnh ẩn/hiện menu (ms)
const ANIM_DURATION = 320;

//Hàm tăng tốc / giảm tốc, giúp chuyển động mượt hơn
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

//Nội dung cột menu, dùng chung cho màn hình lớn và màn hình nhỏ
function SidebarContent({ location, onNavigate, innerRef, navRef }) {

  //Kiểm tra đường dẫn hiện tại có thuộc danh mục nào để tô đậm menu đang mở
  const isActive = (path) => location.pathname === path || location.pathname === path + '/create';

  //Chỉ hiển thị menu mà vai trò hiện tại được phép xem (VD: thủ thư không thấy Thể loại, Khách hàng...)
  const visibleMenu = MENU.filter((item) => hasAnyRole(item.roles));

  return (
    <div className="sidebar-content" ref={innerRef}>

      {/* Tiêu đề menu, cùng màu với thanh tiêu đề Hệ thống Quản lý Thư viện */}
      <div className="sidebar-title">
        <span className="sidebar-title-text">
          📚 Quản lý Thư viện
        </span>
      </div>

      {/* Nhãn phân vùng danh sách chức năng */}
      <div className="sidebar-section-title">
        Chức năng hệ thống
      </div>

      <Nav ref={navRef} className="flex-column sidebar-nav">

        <Nav.Link
          as={NavLink}
          to="/"
          end
          onClick={onNavigate}
          className={'sidebar-link' + (location.pathname === '/' ? ' active' : '')}
        >
          🏠 Trang chủ
        </Nav.Link>

        {visibleMenu.map((item) => (
          <Nav.Link
            key={item.path}
            as={NavLink}
            to={item.path}
            onClick={onNavigate}
            className={'sidebar-link' + (isActive(item.path) ? ' active' : '')}
          >
            {item.icon} {item.title}
          </Nav.Link>
        ))}

      </Nav>

      <div className="sidebar-footer">
        Có {visibleMenu.length} danh mục trong hệ thống
      </div>

    </div>
  );
}

//Layout chung cho mọi trang bên trong hệ thống: cột menu trái + navbar + nội dung
function SystemLayout() {

  const navigate = useNavigate();
  const location = useLocation();

  //Màn hình nhỏ (< 992px) thì menu trượt ra, màn hình lớn thì menu là cột cố định
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  //Trạng thái ẩn/hiện của cột menu, mặc định mở trên màn hình lớn
  const [showMenu, setShowMenu] = useState(window.innerWidth >= 992);

  //Lưu trạng thái vào ref để dùng trong useEffect mà không phụ thuộc vào state
  const showMenuRef = useRef(showMenu);
  showMenuRef.current = showMenu;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarRef = useRef(null);
  const sidebarContentRef = useRef(null);
  const sidebarNavRef = useRef(null);
  const frameRef = useRef(0);

  //Chạy hoạt ảnh ẩn/hiện cột menu bằng requestAnimationFrame
  const animateSidebar = useCallback((open) => {
    const sidebar = sidebarRef.current;
    const content = sidebarContentRef.current;
    const nav = sidebarNavRef.current;

    if (!sidebar) {
      return;
    }

    //Hủy hoạt ảnh đang chạy dở trước khi bắt đầu hoạt ảnh mới
    cancelAnimationFrame(frameRef.current);

    //Chiều rộng hiện tại và chiều rộng đích
    const startWidth = sidebar.getBoundingClientRect().width;
    const endWidth = open ? SIDEBAR_WIDTH : COLLAPSED_WIDTH;
    const startTime = performance.now();

    //Trong lúc thu/giãn menu thì không cho bấm nhầm vào menu
    if (content) {
      content.style.pointerEvents = 'none';
    }

    const step = (now) => {
      //Tỷ lệ tiến trình chạy từ 0 đến 1
      const t = Math.min(1, (now - startTime) / ANIM_DURATION);

      //Áp dụng đường cong giảm tốc cho mượt
      const e = easeInOutCubic(t);

      //Thu/giãn chiều rộng cột menu
      sidebar.style.width = `${startWidth + (endWidth - startWidth) * e}px`;

      //Danh sách menu mờ dần khi ẩn, hiện dần khi mở
      if (nav) {
        nav.style.opacity = open ? e : 1 - e;
      }

      if (t < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        if (nav) {
          nav.style.opacity = '1';
        }

        if (content) {
          content.style.pointerEvents = 'auto';
        }

        frameRef.current = 0;
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, []);

  //Đặt chiều rộng ban đầu của menu theo trạng thái hiện tại
  useEffect(() => {
    const sidebar = sidebarRef.current;

    if (sidebar) {
      //Màn hình nhỏ thì menu dùng offcanvas, cột cố định được ẩn bằng CSS
      const width = isMobile || showMenuRef.current ? SIDEBAR_WIDTH : COLLAPSED_WIDTH;
      sidebar.style.width = width + 'px';
    }
  }, [isMobile]);

  //Dọn hoạt ảnh khi rời khỏi layout
  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  //Bấm nút ẩn/hiện menu
  const handleToggleMenu = () => {
    setShowMenu(!showMenu);

    //Trên màn hình lớn chạy hoạt ảnh, trên màn hình nhỏ offcanvas tự lo
    if (!isMobile) {
      animateSidebar(!showMenu);
    }
  };

  //Đăng xuất: xóa token và quay về trang đăng nhập
  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  //Sau khi chọn 1 danh mục thì đóng menu (áp dụng cho màn hình nhỏ)
  const handleNavigate = () => {
    if (isMobile) {
      setShowMenu(false);
    }
  };

  return (
    <div className="d-flex min-vh-100">

      {/* Cột menu cố định bên trái, dùng cho màn hình lớn */}
      <aside ref={sidebarRef} className="system-sidebar">
        <SidebarContent
          location={location}
          onNavigate={handleNavigate}
          innerRef={sidebarContentRef}
          navRef={sidebarNavRef}
        />
      </aside>

      {/* Menu trượt ra dạng offcanvas, dùng cho màn hình nhỏ */}
      <Offcanvas
        show={isMobile && showMenu}
        onHide={() => setShowMenu(false)}
        placement="start"
        className="system-sidebar-mobile"
      >

        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">📚 Quản lý Thư viện</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="p-0">
          <SidebarContent location={location} onNavigate={handleNavigate} />
        </Offcanvas.Body>

      </Offcanvas>

      {/* Nội dung bên phải: navbar + trang con */}
      <div className="flex-grow-1 d-flex flex-column">

        <Navbar bg="dark" variant="dark" className="system-navbar">
          {/* Nút ☰ ẩn/hiện cột menu, luôn dùng biểu tượng ☰ */}
          <Button
            variant="primary"
            size="sm"
            className="me-2"
            title={showMenu ? 'Ẩn menu' : 'Hiện menu'}
            aria-label={showMenu ? 'Ẩn menu' : 'Hiện menu'}
            onClick={handleToggleMenu}
          >
            ☰
          </Button>

          <Navbar.Brand as={NavLink} to="/">
            📚 Hệ thống Quản lý Thư viện
          </Navbar.Brand>

          <div className="ms-auto d-flex align-items-center gap-3">
            <span className="text-light small">
              👤 {getEmail() || 'Admin'} ({ROLE_LABELS[getRole()] || getRole()})
            </span>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        </Navbar>

        <Container fluid className="flex-grow-1 py-3">
          <Outlet />
        </Container>

      </div>

    </div>
  );
}

export default SystemLayout;
