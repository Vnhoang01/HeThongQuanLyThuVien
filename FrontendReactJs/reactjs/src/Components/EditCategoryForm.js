import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';

//Form sửa dữ liệu Thể loại
const EditCategoryForm = () => {

    const navigate = useNavigate();
    const { id } = useParams(); //Id bản ghi cần sửa

    //Dữ liệu trên form
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    //Trạng thái tải và lưu
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    //Tải dữ liệu hiện tại của bản ghi khi mở form
    useEffect(() => {
        fetch(`http://localhost:8080/categories/${id}`, { headers: { ...authHeaders() } })
            .then(response => {
                if (!response.ok) {
                    throw new Error();
                }
                return response.json();
            })
            .then(data => {
                setName(data.Name ?? '');
                setDescription(data.Description ?? '');
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
        fetch(`http://localhost:8080/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                ...authHeaders(),
            },
            body: JSON.stringify({ Name: name, Description: description })
        })
            .then(response => {
                if (response.ok) {
                    alert('Sửa thành công');
                    navigate('/categories');
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
                    <h3 className="page-title">🗂️ Sửa thể loại</h3>
                    <p className="page-subtitle">Cập nhật thông tin thể loại #{id}</p>
                </div>
                <Link to="/categories" className="btn btn-outline-secondary">← Quay lại</Link>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="form-label">
                            Tên thể loại <span className="required-star">*</span>
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
                        <label className="form-label">Mô tả</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={saving}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            {saving ? 'Đang lưu...' : '💾 Lưu thay đổi'}
                        </button>
                        <Link to="/categories" className="btn btn-outline-secondary">Hủy</Link>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default EditCategoryForm;
