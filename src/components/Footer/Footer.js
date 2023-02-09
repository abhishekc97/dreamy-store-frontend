import React from 'react'
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footerContainer}>
        <div className={styles.footerText}>
            &copy; 2023 <span className={styles.greentext}>Dreamy Store.</span>  All rights reserved.  Abhishek Choudhari 
        </div>
    </div>
  )
}

export default Footer;