import { useState } from 'react';
import { Pin } from '../images'
import styles from '../styles/ContextMenu.module.scss';

function ContextMenu({ position }) {
  return (
    <div 
      className={styles.contextMenu}
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <img src={Pin} alt="Pin" />
      <span>Tab anpinnen</span>
    </div>
  );
}

export default ContextMenu;
