import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import TvIcon from '@mui/icons-material/Tv';
import DoneIcon from '@mui/icons-material/Done';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar({ username, onClickLogOut, onClickHome }) {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`sidebar ${isToggled ? 'sidebar-collapsed' : ''}`}
      onClick={handleToggle}
    >
      <div className='app-name' onClick={stopPropagation}>
        MOVIETRACK
      </div>
      <div className='account-section'>
        <div className='top' onClick={stopPropagation}>
          <PersonIcon style={{ fontSize: 40 }} />
          <span>{username}</span>
        </div>
        <Link to='/home' onClick={stopPropagation}>
          <HomeIcon style={{ fontSize: 40 }} />
          <span>Home</span>
        </Link>
        <Link to='/to-watch' onClick={stopPropagation}>
          <TvIcon style={{ fontSize: 40 }} />
          <span>To Watch</span>
        </Link>
        <Link to='/watched' onClick={stopPropagation}>
          <DoneIcon style={{ fontSize: 40 }} />
          <span>Watched</span>
        </Link>
        <Link
          to='/'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <LogoutIcon style={{ fontSize: 40 }} />
          <span>Log Out</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
