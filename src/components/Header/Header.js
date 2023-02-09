import React from 'react';
import styles from "./Header.module.css";
import { useParams } from 'react-router-dom';

function Header() {
    const {page} = useParams();

  return (
    <div className={styles.headerContainer}>
        <div className={styles.headerText}>
            Home { page }
        </div> 
    </div>
  )
}

export default Header;