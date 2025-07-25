// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));


  if (!token || !user) {
    return <Navigate to="/" />;
  }

  if (role && user.role.name!== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
