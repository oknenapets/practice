import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from 'shared/constants';

const RequiredAuth = () => {
  const location = useLocation();
  const { isAuth } = useSelector((state) => state.auth);

  if (!isAuth) return <Navigate to={ROUTES.login} state={{ from: location }} />;
  return <Outlet />;
};

export default RequiredAuth;
