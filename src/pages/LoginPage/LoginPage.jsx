import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Nếu đã đăng nhập, chuyển về trang chủ
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(form);
      navigate('/home', { replace: true });
    } catch (err) {
      console.error(err);
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-700 mb-2">Đăng nhập</h1>
          <p className="text-sm text-slate-500">Nhập thông tin để truy cập hệ thống</p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Tên đăng nhập
          </label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập tên đăng nhập"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập mật khẩu"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Đang xử lý...
            </div>
          ) : (
            'Đăng nhập'
          )}
        </button>
      </form>
    </div>
  );
}