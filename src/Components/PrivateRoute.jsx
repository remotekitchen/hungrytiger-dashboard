import { useSelector } from "react-redux";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

function PrivateRoute({ children }) {
  const { user_info: user } = useSelector((state) => state.auth);
  let location = useLocation();
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;
