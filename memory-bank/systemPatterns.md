# System Patterns

## Kiến Trúc Backend
- **Kiến trúc tầng (Layered Architecture)**: Controller → Service → Repository → Entity.
- **Kết nối Cơ sở Dữ Liệu**: Sử dụng Spring Data JPA/Hibernate kết nối với MySQL.
- **Xác Thực**: JWT (JSON Web Token) Stateless.

## Kiến Trúc Frontend
- **Thư viện**: React 19.2.5, React Router 7.18.4 (Core) và React Router DOM 7.17.0 (Web Bindings).
- **Routing**: Sử dụng `BrowserRouter`, `Routes`, `Route` từ `react-router-dom`.
- **Phân quyền**: Sử dụng `PrivateRoute` để kiểm tra role (ADMIN/LIBRARIAN).

## Phụ thuộc (Dependencies)
- **Bootstrap**: `bootstrap` (CSS/Core, version 5.3.8) và `react-bootstrap` (React wrappers, version 2.10.10).
- **HTTP Client**: Sử dụng `fetch` API thông qua util `apiFetch`.
- **State Management**: Sử dụng React Hooks (`useState`, `useEffect`).

## Quan Hệ Entity
*Chưa có sơ đồ quan hệ (ERD) chính thức do chưa đọc annotation `@ManyToOne`, `@OneToMany` từ file Entity Java.*