const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const debug = require('debug')('server');
const { User, sequelize } = require('../models/user');
const createToken = require('./create_jwt'); // Замените на правильный путь


const app = express();
const port = 4000;
 
// Промежуточное ПО для обработки тела запроса в формате JSON
app.use(bodyParser.json());

app.use(cors({ origin: '*' }));
 


// Регистрация нового пользователя
app.post('/register', async (req, res) => {
  debug('Запрос на регистрацию пользователя:', req.body);
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    debug('Ответ сервера:', newUser);
    
    const token = createToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    res.status(400).json({ error: 'Ошибка регистрации пользователя' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      if (user.password === password) {
        const token = createToken(user);
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
      }
    } else {
      res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
    }
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).json({ error: 'Ошибка входа' });
  }
});



(async () => {
  await sequelize.sync(); // Синхронизация с базой данных (выполняет миграции)
  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
})();

