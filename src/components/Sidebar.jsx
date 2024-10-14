import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Sidebar.module.scss';
import { sidebarList } from '../constants/common';
import ContextMenu from './ContextMenu';
import SideBarItem from './SidebarItem';

function SideBar() {
  const [activeTab, setActiveTab] = useState(1);
  const [sidebarArr, setSidebarArr] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [currentItem, setCurrentItem] = useState(0);
  const [isOverflow, setIsOverflow] = useState(false);
  const [optionsList, setOptionsList] = useState([]);
  const listRef = useRef(null);

  const pinHandler = (id) => {
    const newArr = [...sidebarArr];
    const index = newArr.findIndex((item) => item.id === id);
    newArr[index].pin = !newArr[index].pin;
    setSidebarArr(newArr);
  }

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({ x: event.pageX, y: event.pageY, id: Number(event.target.getAttribute('data-id')) })
  }

  const dragStartHandler = (e, id) => {
    setCurrentItem(id);
  }

  const dragLeaveHandler = (e) => {
    e.preventDefault();
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

  const calculateOverflow = () => {
    const container = listRef.current;
    const itemWidth = container.scrollWidth / sidebarArr.length;
    if (container?.scrollWidth > container?.clientWidth) {
      setIsOverflow(true);
      const visibleCount = Math.floor(container.clientWidth / itemWidth) + 1;
      const overflowItems = sidebarArr.slice(visibleCount);
      setOptionsList(overflowItems);
    } else {
      setIsOverflow(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (sidebarArr.length === 0) {
      const arr = JSON.parse(localStorage.getItem('array'));
      if (arr.length > 0) {
        setSidebarArr(arr);
      } else {
        setSidebarArr(sidebarList);
      }
    }
    if (sidebarArr.length > 0) {
      localStorage.setItem('array', JSON.stringify(sidebarArr));
    }
    calculateOverflow();

  }, [sidebarArr]);

  return (
      <div className={styles.sidebarWr} ref={listRef} onContextMenu={handleContextMenu}>
        {sidebarArr.map((item) => (
          <SideBarItem
            key={item.name + item.id}
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            name={item.name} id={item.id} pin={item.pin}
            icon={item.icon} 
            dropHandler={dropHandler}
            dragOverHandler={dragOverHandler}
            dragEndHandler={dragEndHandler}
            dragStartHandler={dragStartHandler}
            dragLeaveHandler={dragLeaveHandler}
          />
        ))}
        {isOverflow && (
          <select className={styles.dropDownWr}>
            { optionsList.map((option, index) => (
                <option key={option.name + option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
          </select>
        )}
        {contextMenu && (
          <ContextMenu position={contextMenu} pinHandler={pinHandler} />
          )}
      </div>
  );
}

export default SideBar;
