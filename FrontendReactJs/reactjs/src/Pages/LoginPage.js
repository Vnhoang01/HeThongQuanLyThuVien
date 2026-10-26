import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner
} from 'react-bootstrap';

import { saveAuth } from '../Utils/auth';

//Số ký tự tối thiểu của mật khẩu
const MIN_PASSWORD_LENGTH = 8;

function LoginPage() {

  const navigate = useNavigate();

  //Dữ liệu người dùng nhập
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  //Thông báo và trạng thái gọi API
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  //Kiểm tra dữ liệu trước khi gọi API
  const validate = () => {
    if (email.trim() === '') {
      return 'Vui lòng nhập email';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return 'Email không đúng định dạng';
    }

    if (password === '') {
      return 'Vui lòng nhập mật khẩu';
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return `Mật khẩu phải có tối thiểu ${MIN_PASSWORD_LENGTH} ký tự`;
    }

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    //Kiểm tra dữ liệu nhập vào
    const message = validate();
    if (message !== '') {
      setError(message);
      return;
    }

    setLoading(true);

    //Gọi API đăng nhập, backend so sánh mật khẩu nhập vào với mật khẩu đã mã hóa BCrypt trong DB
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password
      })
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          //Lưu token, email và role (ADMIN hoặc LIBRARIAN) để dùng cho các request cần xác thực
          saveAuth(data.token, email.trim(), data.role);

          setSuccess(data.message || 'Đăng nhập thành công');

          //Chuyển về trang chủ sau khi hiện thông báo thành công
          setTimeout(() => navigate('/'), 1200);

        } else if (response.status === 401) {
          setError(data.message || 'Email hoặc mật khẩu không đúng');
        } else if (response.status === 400) {
          setError(data.message || 'Dữ liệu nhập vào không hợp lệ');
        } else {
          setError(data.message || `Đăng nhập thất bại (HTTP ${response.status})`);
        }
      })
      .catch(() => {
        setError('Không kết nối được tới server');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container className="mt-5">

      <Row className="justify-content-md-center">

        <Col md={6} lg={5}>

          <Card>

            <Card.Body>

              <h3 className="text-center mb-4">
                🔐 Đăng nhập hệ thống
              </h3>

              {/* Thông báo đăng nhập thành công */}
              {success !== '' && (
                <Alert variant="success">
                  ✅ {success}
                </Alert>
              )}

              {/* Thông báo lỗi */}
              {error !== '' && (
                <Alert variant="danger">
                  ⚠️ {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Mật khẩu (tối thiểu {MIN_PASSWORD_LENGTH} ký tự)
                  </Form.Label>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Hiện mật khẩu"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Đang đăng nhập...
                      </>
                    ) : (
                      'Đăng nhập'
                    )}
                  </Button>
                </div>

              </Form>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>
  );
}

export default LoginPage;