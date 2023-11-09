import React from 'react';
import ImageLoader from './imageLoader';
import './sidebar.css';
import { NavLink } from 'react-router-dom';
import { isTokenPresent } from '../server/view_token';
import { removeTokenFromLocalStorage } from '../server/view_token'; 


function Sidebar() {
  

  const token = isTokenPresent();

  const handleLogout = () => {
    removeTokenFromLocalStorage();
  }

  
  
    
    return (
      <div className="sidebar" >
        <div className="sidebar-header">
        <ImageLoader imageUrl="http://85.193.80.60:4000/image/ship-logo.svg" alt="Логотип коробля" className="logo_ship" />


          <div className="text-container">
          </div>
        </div>
        <ul className="list-group">
        {!token && (
          <NavLink className='link' to="/">
            <li className="list-group-item">
              <span> Регистрация</span>
            </li>
          </NavLink>
        )}

        {token && (
          
  
          <NavLink className='link' to="/game">
            <li className="list-group-item">
              <span> Начать игру</span>
            </li>
          </NavLink>
          
           )}


    {token && ( 
           <NavLink  className='link' to="/myStats"> 
          <li className="list-group-item">
          {/* <img src={home} alt="table" className='logo_home' />  */}
          <span> Ваша статистика</span>
          </li>
           </NavLink > 
          )}
 
          <NavLink  className='link' to="/bestPlayers">
          <li className="list-group-item">
          {/* <img src={home} alt="table" className='logo_home' />  */}
          <span> Рейтинг лучших</span>
          </li>
          </NavLink >
        </ul>
        {token ? (
      <button className='footer' onClick={handleLogout}>
        {/* <img src={logout} alt="exit" className='logo_exit' /> */}
        <ImageLoader imageUrl="http://85.193.80.60:4000/image/logout.svg" alt="exit" className="logo_exit" /> 
        </button>
        ) : (
          <button className='footer'>
            <NavLink to="/auth">
        {/* <img src={login} alt="login" className='logo_exit' /> */}
        <ImageLoader imageUrl="http://85.193.80.60:4000/image/login.svg" alt="exit" className="logo_exit" /> 
        </NavLink>
        </button>
        )}
      </div>
    );
  }
  

export default Sidebar;