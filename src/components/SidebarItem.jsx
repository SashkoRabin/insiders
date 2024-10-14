import styles from '../styles/Sidebar.module.scss';

function SideBarItem({ 
  activeTab, setActiveTab, name, icon, id = 1, pin,
  dragStartHandler, dragLeaveHandler, dragEndHandler, dragOverHandler, dropHandler,
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
      {pin ? <></> : <span data-id={id}>{name}</span>}
    </div>
  );
}

export default SideBarItem;
