import { useState, useEffect } from 'react';
import styles from '../styles/Sidebar.module.scss';
import { sidebarList } from '../constants/common';
import ContextMenu from './ContextMenu';
import SideBarItem from './SidebarItem';

function SideBar() {
  const [activeTab, setActiveTab] = useState(1);
  const [sidebarArr, setSidebarArr] = useState(sidebarList);
  const [pinnedItem, setPinnedItem] = useState(1);
  const [contextMenu, setContextMenu] = useState(null);
  const [currentItem, setCurrentItem] = useState(0);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({ x: event.pageX, y: event.pageY })
  }

  const dragStartHandler = (e, id) => {
    setCurrentItem(id);
  }

  const dragLeaveHandler = (e) => {

  }

  const dragEndHandler = (e) => {
    e.target.background = '#FFF';
  }

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.background = '#F1F5F8';
  }

  const dropHandler = (e, id) => {
    e.preventDefault();

    if (currentItem > 0) {
      setSidebarArr((prev) => {
        const newArr = [...prev];
        const idIndex = newArr.findIndex((item) => item.id === id)
        const currentIndex = newArr.findIndex((item) => item.id === currentItem)
        const temp = newArr[idIndex];
        newArr[idIndex]= newArr[currentIndex];
        newArr[currentIndex] = temp;

        return newArr;
      })
      setCurrentItem(0);
    }
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
        {sidebarArr.map((item) => (
          <SideBarItem 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            name={item.name} id={item.id} 
            icon={item.icon} 
            pinnedItem={pinnedItem} 
            setPinnedItem={setPinnedItem}
            dropHandler={dropHandler}
            dragOverHandler={dragOverHandler}
            dragEndHandler={dragEndHandler}
            dragStartHandler={dragStartHandler}
            dragLeaveHandler={dragLeaveHandler}
          />
        ))}
        {contextMenu && (
          <ContextMenu position={contextMenu} />
          )}
      </div>
  );
}

export default SideBar;
