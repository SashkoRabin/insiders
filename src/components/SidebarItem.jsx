import styles from '../styles/Sidebar.module.scss';

function SideBarItem({ name, icon, isPinned = false }) {
  return (
    <div className={styles.itemWr}>
      <img src={icon} alt={name} />
      <span>{name}</span>
      <span>{isPinned}</span>
    </div>
  );
}

export default SideBarItem;
