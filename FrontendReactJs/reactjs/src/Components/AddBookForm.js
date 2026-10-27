import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';
import { apiFetch } from '../Utils/api';

const AddBookForm = () => {

    // Các biến nhập dữ liệu từ form
    const [name, setName] = useState('');
    const [yearOfPublication, setYearOfPublication] = useState('');
    const [totalQuantity, setTotalQuantity] = useState('0');
    const [availableQuantity, setAvailableQuantity] = useState('0');
    const [status, setStatus] = useState('Available');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [publisherId, setPublisherId] = useState('');

    // Danh sách thể loại / tác giả / nhà xuất bản để chọn
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);

    const navigate = useNavigate();

    // Tải danh sách thể loại, tác giả, nhà xuất bản
    useEffect(() => {
        Promise.all([
            apiFetch('http://localhost:8080/categories', { headers: { ...authHeaders() } }),
            apiFetch('http://localhost:8080/authors', { headers: { ...authHeaders() } }),
            apiFetch('http://localhost:8080/publishers', { headers: { ...authHeaders() } })
        ]).then(([categoryData, authorData, publisherData]) => {
            setCategories(categoryData);
            setAuthors(authorData);
            setPublishers(publisherData);
        }).catch(error => console.error('Lỗi tải dữ liệu', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra đã nhập Name hay chưa
        if (name.trim() === '') {
            alert("Không được để trống");
            return;
        }

        // Tạo biến mới để lưu
        const newBook = {
            Name: name,
            YearOfPublication: yearOfPublication === '' ? null : Number(yearOfPublication),
            TotalQuantity: Number(totalQuantity),
            AvailableQuantity: Number(availableQuantity),
            Status: status,
            Description: description,
            category: categoryId ? { Id: Number(categoryId) } : null,
            author: authorId ? { Id: Number(authorId) } : null,
            publisher: publisherId ? { Id: Number(publisherId) } : null
        };

        // Gọi API lưu
        apiFetch('http://localhost:8080/books/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                ...authHeaders(),
            },
            body: JSON.stringify(newBook)
        })
            .then(() => {
                alert("Thêm thành công");
                navigate('/books');
            })
            .catch(error => {
                console.error("Lỗi ", error);
                //Hiển thị đúng thông báo do server trả về
                alert(error.message || "Đã xảy ra lỗi");
            });

    return (
        <div className="list-page">

            <div className="page-header">
                <div>
                    <h3 className="page-title">📖 Thêm sách</h3>
                    <p className="page-subtitle">Tạo mới một cuốn sách trong thư viện</p>
                </div>
                <Link to="/books" className="btn btn-outline-secondary">← Quay lại</Link>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="form-label">Tên sách <span className="required-star">*</span></label>
                        <input className="form-control" type="text" placeholder="VD: De Men phieu luu ky" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Năm xuất bản</label>
                        <input className="form-control" type="number" placeholder="VD: 1941" value={yearOfPublication}
                            onChange={(e) => setYearOfPublication(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Tổng số lượng</label>
                        <input className="form-control" type="number" min="0" value={totalQuantity}
                            onChange={(e) => setTotalQuantity(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Số lượng sẵn có</label>
                        <input className="form-control" type="number" min="0" value={availableQuantity}
                            onChange={(e) => setAvailableQuantity(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Trạng thái</label>
                        <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Available">Hoạt động</option>
                            <option value="Inactive">Ngừng hoạt động</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Thể loại</label>
                        <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                            <option value="">-- Chọn thể loại --</option>
                            {categories.map(category => (
                                <option key={category.Id} value={category.Id}>{category.Name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Tác giả</label>
                        <select className="form-control" value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
                            <option value="">-- Chọn tác giả --</option>
                            {authors.map(author => (
                                <option key={author.Id} value={author.Id}>{author.Name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Nhà xuất bản</label>
                        <select className="form-control" value={publisherId} onChange={(e) => setPublisherId(e.target.value)}>
                            <option value="">-- Chọn nhà xuất bản --</option>
                            {publishers.map(publisher => (
                                <option key={publisher.Id} value={publisher.Id}>{publisher.Name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Mô tả</label>
                        <textarea className="form-control" rows="3" placeholder="Mô tả ngắn về cuốn sách"
                            value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">➕ Thêm mới</button>
                        <Link to="/books" className="btn btn-outline-secondary">Hủy</Link>
                    </div>

                </form>
            </div>

        </div>
    );
};

}
export default AddBookForm;