import { useState, useEffect } from 'react';
import styles from '../styles/Sidebar.module.scss';
import { sidebarList } from '../constants/common';
import ContextMenu from './ContextMenu';
import SideBarItem from './SidebarItem';

function SideBar() {
  const [activeTab, setActiveTab] = useState(1);
  const [pinnedItem, setPinnedItem] = useState(1);
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({ x: event.pageX, y: event.pageY })
  }

  const handleClick = () => {
    setContextMenu(null);
  }

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.sidebarWr} onContextMenu={handleContextMenu}>
      {sidebarList.map((item) => (
        <SideBarItem 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          name={item.name} id={item.id} 
          icon={item.icon} 
          pinnedItem={pinnedItem} 
          setPinnedItem={setPinnedItem}
        />
      ))}
      {contextMenu && (
        <ContextMenu position={contextMenu} />
        )}
    </div>
  );
}

export default SideBar;
