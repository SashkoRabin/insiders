import styles from '../App.css';

function SideBarItem({ name, icon, isPinned = false }) {
  return (
    <div className={styles.sidebarWr}>
      <img src={icon} alt={name} />
      <span>{name}</span>
      <span>{isPinned}</span>
    </div>
  );
}

export default SideBarItem;
