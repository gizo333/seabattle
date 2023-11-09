
const jwt = require('jsonwebtoken');
// создание токена и запихивание чего захотим
function createToken(user) {
  const tokenPayload = {
    id: user.user_id, 
    username: user.username, 
    
  };

  const secretKey = 'your-secret-key'; 
  const expiresInMinutes = 10; 

  const token = jwt.sign(tokenPayload, secretKey, {
    expiresIn: `${expiresInMinutes}m`,
  });

  return token;
}

module.exports = createToken;
