import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { hasAnyRole } from '../Utils/auth';

const BOOK_PATHS = ['/books', '/categories', '/authors', '/publishers'];

const MENU = [
  {
    type: 'group',
    key: 'books',
    title: 'Sách',
    icon: '📖',
    parentPath: '/books',
    roles: ['ADMIN'],
    children: [
      { key: 'books', title: 'Quản lý Sách', path: '/books', icon: '📖' },
      { key: 'categories', title: 'Thể loại', path: '/categories', icon: '📋' },
      { key: 'authors', title: 'Tác giả', path: '/authors', icon: '✍️' },
      { key: 'publishers', title: 'Nhà xuất bản', path: '/publishers', icon: '🏢' },
    ],
  },
  {
    type: 'item',
    key: 'customers',
    title: 'Khách hàng',
    icon: '👤',
    path: '/customers',
    roles: ['ADMIN'],
  },
  {
    type: 'item',
    key: 'loans',
    title: 'Phiếu mượn',
    icon: '📋',
    path: '/loans',
    roles: ['ADMIN', 'LIBRARIAN'],
  },
  {
    type: 'item',
    key: 'errors',
    title: 'Lỗi sách',
    icon: '⚠️',
    path: '/errors',
    roles: ['ADMIN', 'LIBRARIAN'],
  },
  {
    type: 'item',
    key: 'admins',
    title: 'Tài khoản admin',
    icon: '🔑',
    path: '/admins',
    roles: ['ADMIN'],
  },
];

function SidebarContent({ location, onNavigate, innerRef, navRef }) {
  const [openBooks, setOpenBooks] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;

    const hasBookActive =
      BOOK_PATHS.some(
        (path) => currentPath === path || currentPath === path + '/create'
      ) ||
      BOOK_PATHS.some((path) => currentPath.startsWith(path + '/'));

    setOpenBooks(hasBookActive);
  }, [location.pathname]);

  const toggleBooks = () => {
    setOpenBooks((prev) => !prev);
  };

  const isActive = (path) => {
    return (
      location.pathname === path ||
      location.pathname === path + '/create' ||
      location.pathname.startsWith(path + '/')
    );
  };

  const visibleMenu = MENU.filter((item) => hasAnyRole(item.roles));

  return (
    <div className="sidebar-content" ref={innerRef}>
      <div className="sidebar-title">
        <span className="sidebar-title-text">📚 Quản lý Thư viện</span>
      </div>

      <div className="sidebar-section-title">
        Chức năng hệ thống
      </div>

      <Nav ref={navRef} className="flex-column sidebar-nav">
        <RouterNavLink
          to="/"
          end
          onClick={onNavigate}
          className={'nav-link sidebar-link' + (location.pathname === '/' ? ' active' : '')}
        >
          🏠 Trang chủ
        </RouterNavLink>

        {visibleMenu.map((item) => {
          if (item.type === 'group') {
            const open =
              openBooks || item.children.some((child) => isActive(child.path));
            const isGroupActive = item.children.some((child) => isActive(child.path));

            return (
              <div key={item.key} className="d-flex flex-column gap-1">
                <RouterNavLink
                  to={item.parentPath}
                  className={
                    'nav-link sidebar-link' +
                    (isGroupActive ? ' active' : '') +
                    (open ? ' open' : '')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    toggleBooks();
                  }}
                >
                  <span className="me-2">{item.icon}</span>
                  <span className="align-middle">{item.title}</span>
                  <span className="toggle-icon ms-auto align-middle">▾</span>
                </RouterNavLink>

                <div className={`sidebar-group-children ${open ? '' : 'd-none'}`}>
                  <Nav>
                    {item.children.map((child) => (
                      <RouterNavLink
                        key={child.key}
                        to={child.path}
                        onClick={onNavigate}
                        className={
                          'nav-link sidebar-link' + (isActive(child.path) ? ' active' : '')
                        }
                      >
                        <span className="me-2">{child.icon}</span>
                        <span>{child.title}</span>
                      </RouterNavLink>
                    ))}
                  </Nav>
                </div>
              </div>
            );
          }

          return (
            <RouterNavLink
              key={item.key}
              to={item.path}
              onClick={onNavigate}
              className={'nav-link sidebar-link' + (isActive(item.path) ? ' active' : '')}
            >
              <span className="me-2">{item.icon}</span>
              <span>{item.title}</span>
            </RouterNavLink>
          );
        })}
      </Nav>

      <div className="sidebar-footer">
        Có {visibleMenu.length} mục trong hệ thống
      </div>
    </div>
  );
}

export default SidebarContent;