import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';

//Form sửa dữ liệu Khách hàng
const EditCustomerForm = () => {

    const navigate = useNavigate();
    const { id } = useParams(); //Id bản ghi cần sửa

    //Dữ liệu trên form
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('');

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    //Tải dữ liệu hiện tại của bản ghi khi mở form
    useEffect(() => {
        fetch(`http://localhost:8080/customers/${id}`, { headers: { ...authHeaders() } })
            .then(response => {
                if (!response.ok) {
                    throw new Error();
                }
                return response.json();
            })
            .then(data => {
                setName(data.Name ?? '');
                //Ngày sinh dạng 2004-05-12T00:00:00 -> cắt về 2004-05-12 cho input date
                setDateOfBirth(data.DateOfBirth ? String(data.DateOfBirth).slice(0, 10) : '');
                setGender(data.Gender ?? '');
                setEmail(data.Email ?? '');
                setPhoneNumber(data.PhoneNumber ?? '');
                setAddress(data.Address ?? '');
                setStatus(data.Status ?? '');
                //Mật khẩu không trả về từ server, để trống nếu không muốn đổi
                setPassword('');
            })
            .catch(() => alert('Không tải được dữ liệu bản ghi'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            alert('Không được để trống');
            return;
        }

        //Dữ liệu gửi lên
        const payload = {
            Name: name,
            DateOfBirth: dateOfBirth,
            Gender: gender,
            Email: email,
            PhoneNumber: phoneNumber,
            Address: address,
            Status: status
        };

        //Chỉ gửi mật khẩu khi người dùng nhập mật khẩu mới
        if (password !== '') {
            payload.Password = password;
        }

        setSaving(true);

        //Gọi API cập nhật (PUT)
        fetch(`http://localhost:8080/customers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                ...authHeaders(),
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (response.ok) {
                    alert('Sửa thành công');
                    navigate('/customers');
                } else {
                    alert('Sửa thất bại');
                }
            })
            .catch(() => alert('Đã xảy ra lỗi'))
            .finally(() => setSaving(false));
    };

    if (loading) {
        return (
            <div className="loading-box">
                <div className="spinner-border text-primary" role="status"></div>
                <span>Đang tải dữ liệu...</span>
            </div>
        );
    }

    return (
        <div className="list-page">
            <div className="page-header">
                <div>
                    <h3 className="page-title">👤 Sửa khách hàng</h3>
                    <p className="page-subtitle">Cập nhật thông tin khách hàng #{id}</p>
                </div>
                <Link to="/customers" className="btn btn-outline-secondary">← Quay lại</Link>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="form-label">Họ tên <span className="required-star">*</span></label>
                        <input className="form-control" type="text" value={name}
                            onChange={(e) => setName(e.target.value)} disabled={saving} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Ngày sinh <span className="required-star">*</span></label>
                        <input className="form-control" type="date" value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)} disabled={saving} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Giới tính</label>
                        <input className="form-control" type="text" placeholder="VD: Nam hoặc Nữ" value={gender}
                            onChange={(e) => setGender(e.target.value)} disabled={saving} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input className="form-control" type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} disabled={saving} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Số điện thoại</label>
                        <input className="form-control" type="text" value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} disabled={saving} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Mật khẩu mới</label>
                        <input className="form-control" type="password" placeholder="Để trống nếu không đổi mật khẩu" value={password}
                            onChange={(e) => setPassword(e.target.value)} disabled={saving} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Địa chỉ</label>
                        <input className="form-control" type="text" value={address}
                            onChange={(e) => setAddress(e.target.value)} disabled={saving} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Trạng thái</label>
                        <input className="form-control" type="text" placeholder="VD: Hoạt động" value={status}
                            onChange={(e) => setStatus(e.target.value)} disabled={saving} />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            {saving ? 'Đang lưu...' : '💾 Lưu thay đổi'}
                        </button>
                        <Link to="/customers" className="btn btn-outline-secondary">Hủy</Link>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default EditCustomerForm;
