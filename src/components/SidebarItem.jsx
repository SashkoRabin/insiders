import { useDrag } from 'react-dnd';
import styles from '../styles/Sidebar.module.scss';

function SideBarItem({ 
  activeTab, setPinnedItem, setActiveTab, name, icon, id = 1, pinnedItem,
  dragStartHandler, dragLeaveHandler, dragEndHandler, dragOverHandler, dropHandler,
}) {  
  return (
    <div 
      onClick={() => setActiveTab(id)} 
      className={`${styles.itemWr} ${activeTab === id ? styles.active : ''}`}
      data-id={name}
      onDragStart={(e) => dragStartHandler (e, id)}
      onDragLeave={(e) => dragLeaveHandler (e)}
      onDragEnd={(e) => dragEndHandler (e)}
      onDrop={(e) => dropHandler(e, id)}
      onDragOver={(e) => dragOverHandler (e)}
      draggable={true}
    >
      <img src={icon} alt={name} />
      {pinnedItem === id ? <></> : <span>{name}</span>}
    </div>
  );
}

export default SideBarItem;
