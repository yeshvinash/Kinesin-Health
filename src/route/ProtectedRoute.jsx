import React, { useEffect, useState } from 'react';
import {  useNavigate  } from 'react-router-dom';


// const PrivateRoute = ({ component: Component, requiredRole, ...rest }) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const userRole = useSelector((state) => state.auth.user?.role);
//   const navigate = useNavigate()

// //   if (!isAuthenticated || userRole !== requiredRole) {
// //     navigate('/login'); // Redirect to the login page if not authenticated or doesn't have the required role
// //     return null; // Render nothing
// //   }

//   return isAuthenticated ? <Outlet/>:<Navigate to="/login" />
//     // <Route {...rest} element={<Component />} />
  
// };
const PrivateRoute = (props) => {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
      const userToken = sessionStorage.getItem('accessToken');
      if (!userToken || userToken === 'undefined') {
          setIsLoggedIn(false);
          return navigate('/login');
      }
      setIsLoggedIn(true);
  }

  useEffect(() => {
      checkUserToken();
  }, [isLoggedIn]);

  return (
      <React.Fragment>
          {
              isLoggedIn ? props.children : null
          }
      </React.Fragment>
  );
}



export default PrivateRoute;
