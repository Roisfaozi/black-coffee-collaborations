import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthUser } = useSelector((s) => s.users);

  if (!isAuthUser) {
    return <Navigate to="/" />;
  }

  return children;
};

export const PrivateRouteAdmin = ({ children }) => {
  const { isAuthAdmin } = useSelector((s) => s.users);

  if (!isAuthAdmin) {
    return <Navigate to="/product" />;
  }

  return children;
};

export default PrivateRoute;
