import styles from '../styles/Sidebar.module.scss';

function SideBarItem({ activeTab, setPinnedItem, setActiveTab, name, icon, id = 1, pinnedItem }) {
  if (pinnedItem === id) return (
      <div 
        onClick={() => setActiveTab(id)} 
        className={`${styles.itemWr} ${activeTab === id ? styles.active : ''}`}
        data-id={name}
      >
        <img src={icon} alt={name} />
      </div>
    )
  return (
    <div 
      onClick={() => setActiveTab(id)} 
      className={`${styles.itemWr} ${activeTab === id ? styles.active : ''}`}
      data-id={name}
    >
      <img src={icon} alt={name} />
      <span>{name}</span>
    </div>
  );
}

export default SideBarItem;
