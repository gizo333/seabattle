import Sidebar from "../component/sidbar";
import "./myStat.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface UserData {
  username: string;
  score: number;
}

interface MyStatPageProps {
  dataFromDB: UserData[] | null;
}

const MyStatPage: React.FC<MyStatPageProps> = ({ dataFromDB }) => {
  const [userData, setUserData] = useState<UserData[] | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      axios.post("http://85.193.80.60:4000/user-data", { token }).then((response) => {
        console.log('Ответ от сервера:', response.data); // Выводим ответ сервера в консоль
  
        // Проверяем, что ответ содержит данные и это массив
        if (response.data && Array.isArray(response.data)) {
          setUserData(response.data);
        } else {
          // Другая обработка, если данные не соответствуют ожидаемому формату
          console.error("Некорректный формат данных от сервера");
        }
      });
    }
  }, []);
  

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="container-wrapper">
        <p className="welcome-p">Hello</p>
        <div className="wrapper__links">
          {userData ? (
            <table>
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Счет</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.username}</td>
                    <td>{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Данных нет</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyStatPage;
