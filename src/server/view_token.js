// функции для теста



export const secondsToDhms = (seconds) => {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor(seconds % (3600*24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d > 0 ? d + (d === 1 ? " день, " : " дней, ") : "";
    const hDisplay = h > 0 ? h + (h === 1 ? " час, " : " часов, ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " минута, " : " минут, ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " секунда" : " секунд") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay; 
}


export const checkTokenExpiration = (token) => {
    if (!token) {
        console.log("Токен отсутствует.");
        return;
    }
  
    const currentTime = new Date().getTime() / 1000;
    const tokenExpirationTime = token.exp;

    console.log('Токен до удаления:', localStorage.getItem('token'));
  
    if (tokenExpirationTime > currentTime) {
        const timeUntilExpiration = tokenExpirationTime - currentTime;
        console.log(`Оставшееся время до истечения токена: ${secondsToDhms(timeUntilExpiration)}`);
        return true;
    } else {
        console.log("Токен истек.");
        localStorage.removeItem('token');
        console.log('Токен после удаления:', localStorage.getItem('token'));
        return false;
    }
}


export const parseJwt = (token) => {
    try {
        const payloadEnc = token.split('.')[1];
        const payloadDec = atob(payloadEnc);
        const payload = JSON.parse(payloadDec);
        return payload;
    } catch (e) {
        console.error("Ошибка при парсинге токена: ", e);
        return null;
    }
}

export const handleCheckToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.log("Токен отсутствует.");
        return false;
    }

    const parsedToken = parseJwt(token);
    return checkTokenExpiration(parsedToken);
};


// достаем из локала
export const isTokenPresent = () => {
    const token = localStorage.getItem('token'); 
    return token != null;
}

// удаляем из локала
export const removeTokenFromLocalStorage =() => {
    localStorage.removeItem('token');
    window.location.reload();
}
