import styles from '../styles/DropDownMenu.module.scss';
import SideBarItem from './SidebarItem';

function DropDownMenu({ options, dropHandler, dragOverHandler, 
  dragEndHandler, dragStartHandler, dragLeaveHandler, activeTab, setActiveTab,
  deleteHandler,
}) {
  return (
    <div className={styles.ddWrapper}>
      {options.map((item) => (
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
            hasDelete
            deleteHandler={deleteHandler}
          />
        ))}
    </div>
  );
}

export default DropDownMenu;
