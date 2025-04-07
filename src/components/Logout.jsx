import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import styles from './Logout.module.css';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout failed: ', err.message);
    }
  };

  return (
    <div onClick={handleLogout} className={styles.logoutBtn} title="Logout">
      <FiLogOut size={24} />
      <span className={styles.logoutText}>Logout</span>
    </div>
  );
};

export default LogoutButton;
