import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';

//Form sửa dữ liệu Nhà xuất bản
const EditPublisherForm = () => {

    const navigate = useNavigate();
    const { id } = useParams(); //Id bản ghi cần sửa

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    //Tải dữ liệu hiện tại của bản ghi khi mở form
    useEffect(() => {
        fetch(`http://localhost:8080/publishers/${id}`, { headers: { ...authHeaders() } })
            .then(response => {
                if (!response.ok) {
                    throw new Error();
                }
                return response.json();
            })
            .then(data => {
                setName(data.Name ?? '');
                setAddress(data.Address ?? '');
                setPhoneNumber(data.PhoneNumber ?? '');
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

        setSaving(true);

        //Gọi API cập nhật (PUT)
        fetch(`http://localhost:8080/publishers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                ...authHeaders(),
            },
            body: JSON.stringify({ Name: name, Address: address, PhoneNumber: phoneNumber })
        })
            .then(response => {
                if (response.ok) {
                    alert('Sửa thành công');
                    navigate('/publishers');
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
                    <h3 className="page-title">🏢 Sửa nhà xuất bản</h3>
                    <p className="page-subtitle">Cập nhật thông tin nhà xuất bản #{id}</p>
                </div>
                <Link to="/publishers" className="btn btn-outline-secondary">← Quay lại</Link>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="form-label">
                            Tên nhà xuất bản <span className="required-star">*</span>
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={saving}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Địa chỉ</label>
                        <input
                            className="form-control"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={saving}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Số điện thoại</label>
                        <input
                            className="form-control"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            disabled={saving}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            {saving ? 'Đang lưu...' : '💾 Lưu thay đổi'}
                        </button>
                        <Link to="/publishers" className="btn btn-outline-secondary">Hủy</Link>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default EditPublisherForm;
