# Technology Context

## Backend
- **Spring Boot**: Phụ thuộc `spring-boot-starter-parent` version **4.1.0** (khai báo trong `pom.xml`). **Version runtime**: **Chưa xác minh**.
- **Java**: Phiên bản **21** (khai báo `<java.version>21</java.version>` trong `pom.xml` properties). **JDK thực tế**: Chưa xác minh.
- **Build Tool**: Maven (mvnw wrapper).

## Frontend
- **React**: Phiên bản **19.2.5** (khai báo trong `package.json`).
- **react-router (Core)**: Phiên bản **7.18.4** (khai báo trong `package.json`).
- **react-router-dom (Web Bindings)**: Phiên bản **7.17.0** (khai báo trong `package.json`).
- **Bootstrap CSS**: Phiên bản **5.3.8** (khai báo trong `package.json`).
- **React Bootstrap**: Phiên bản **2.10.10** (khai báo trong `package.json`).

## Khối lượng bí mật
*Không ghi bất kỳ giá trị JWT Secret, API Key, mật khẩu hay token nào trong file này.*
*Vị trí cấu hình JWT: `application.properties` (`app.jwt.secret`, `app.jwt.expiration-time`).*