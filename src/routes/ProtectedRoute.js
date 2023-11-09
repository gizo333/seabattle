import { handleCheckToken } from '../server/view_token';
// проверка токена
const ProtectedRoute = ({ children }) => {
    const isTokenValid = handleCheckToken();
  
    if(isTokenValid) {
      console.log("Token is valid");
    } else {
      console.log("Token is invalid or does not exist");
    }
  
    // Всегда возвращаем children, чтобы пользователь мог перейти на любую страницу.
    return children;
  };
  

export default ProtectedRoute;
