import styles from '../styles/Sidebar.module.scss';
import { Cancel } from '../images'

function SideBarItem({ 
  activeTab, setActiveTab, name, icon, id = 1, pin,
  dragStartHandler, dragLeaveHandler, dragEndHandler, dragOverHandler, dropHandler,
  hasDelete = false, deleteHandler = () => {},
}) {  

  return (
    <div 
      onClick={() => setActiveTab(id)} 
      className={`${styles.itemWr} ${activeTab === id ? styles.active : ''}`}
      data-id={id}
      onDragStart={(e) => dragStartHandler (e, id)}
      onDragLeave={(e) => dragLeaveHandler (e)}
      onDragEnd={(e) => dragEndHandler (e)}
      onDrop={(e) => dropHandler(e, id)}
      onDragOver={(e) => dragOverHandler (e)}
      draggable={true}
    >
      <img data-id={id} src={icon} alt={name} />
      <span data-id={id} className={`${styles.name} ${pin ? styles.pinned : ''}`}>{name}</span>
      { hasDelete && <img className={styles.cancelBtn} onClick={() => deleteHandler(id)} src={Cancel} alt="" /> }
    </div>
  );
}

export default SideBarItem;
