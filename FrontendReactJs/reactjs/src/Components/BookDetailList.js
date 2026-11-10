import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authHeaders } from "../Utils/auth";
import { apiFetch } from "../Utils/api";
import { toVietnamese } from "../Utils/format";

const BookDetailList = () => {
  const navigate = useNavigate();

  // Lấy ID sách từ URL
  const { bookId } = useParams();

  // State lưu danh sách bản ghi sách
  const [bookDetails, setBookDetails] = useState([]);

  // State quản lý trạng thái tải dữ liệu
  const [loading, setLoading] = useState(true);

  // Gọi API lấy danh sách bản ghi thuộc sách được chọn
  useEffect(() => {
    apiFetch(`http://localhost:8080/book-details/book/${bookId}`, {
      headers: { ...authHeaders() },
    })
      .then((data) => {
        setBookDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi tải bản ghi sách", error);
        setLoading(false);
      });
  }, [bookId]);

  return (
    <div className="list-page">

        {/* Đầu trang */}
        <div className="page-header">
            <div>
                <h3 className="page-title">📚 Bản ghi sách</h3>
                <p className="page-subtitle">
                    Danh sách các bản ghi thuộc cuốn sách ID: {bookId}
                </p>
            </div>

            <button
                className="btn btn-secondary"
                onClick={() => navigate('/books')}
            >
                ← Quay lại danh sách sách
            </button>
        </div>

        {/* Bảng danh sách */}
        <div className="table-card">

            <div className="table-card-header">
                <span>Danh sách bản ghi sách</span>
                <span className="badge text-bg-primary">
                    {bookDetails.length}
                </span>
            </div>

            {loading ? (
                <div className="loading-box">
                    <div className="spinner-border text-primary" role="status"></div>
                    <span>Đang tải dữ liệu...</span>
                </div>
            ) : bookDetails.length === 0 ? (
                <div className="table-empty">
                    <div className="empty-icon">📚</div>
                    <p>Cuốn sách này chưa có bản ghi nào.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table list-table align-middle mb-0">
                        <thead>
                            <tr>
                                <th className="stt-cell">STT</th>
                                <th>Mã bản ghi</th>
                                <th>Tên bản ghi</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookDetails.map((detail, index) => (
                                <tr key={detail.Id}>
                                    <td className="stt-cell">{index + 1}</td>
                                    <td>
                                        <span className="id-badge">
                                            {detail.Barcode}
                                        </span>
                                    </td>
                                    <td className="cell-strong">
                                        {toVietnamese(detail.Name, true)}
                                    </td>
                                    <td>{detail.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>

    </div>
);
};

export default BookDetailList;
