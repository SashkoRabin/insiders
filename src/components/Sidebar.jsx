import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Sidebar.module.scss';
import { sidebarList } from '../constants/common';
import ContextMenu from './ContextMenu';
import DropDownMenu from './DropDownMenu'
import SideBarItem from './SidebarItem';
import { Expand } from '../images'

function SideBar() {
  const [activeTab, setActiveTab] = useState(1);
  const [sidebarArr, setSidebarArr] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [isDropDown, setIsDropDown] = useState(false);
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

  const deleteHandler = (id) => {
    setSidebarArr([...sidebarArr].filter((item) => item.id !== id));
  }

  const toggleDropDown = () => {
    setIsDropDown((prev) => !prev);
  }

  const dragStartHandler = (e, id) => {
    setCurrentItem(id);
    e.target.background = '#7F858D'
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
        const currentIndex = newArr.findIndex((item) => item.id === currentItem);
        if (newArr[idIndex].pin === true && newArr[currentIndex].pin !== true) return newArr;
        if (newArr[currentIndex].pin === true) {
          newArr[currentIndex].pin = false;
        }
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
      if (arr?.length > 0) {
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
            deleteHandler={deleteHandler}
          />
        ))}
        {isOverflow && <div className={styles.dropDown} onClick={toggleDropDown}>
          <img src={Expand} alt="expand" />
          {isDropDown && 
          <DropDownMenu 
            options={optionsList}
            dropHandler={dropHandler}
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            dragOverHandler={dragOverHandler}
            dragEndHandler={dragEndHandler}
            dragStartHandler={dragStartHandler}
            dragLeaveHandler={dragLeaveHandler}
            deleteHandler={deleteHandler}
          />}
        </div>}
        {contextMenu && (
          <ContextMenu position={contextMenu} pinHandler={pinHandler} />
          )}
      </div>
  );
}

export default SideBar;
