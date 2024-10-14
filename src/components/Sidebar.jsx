import styles from '../App.css';
import { sidebarList } from '../constants/common';
import SideBarItem from './SidebarItem'

function SideBar() {
  return (
    <div className={styles.sidebarWr}>
      {sidebarList.map((item) => (
        <SideBarItem name={item.name} icon={item.icon} isPinned />
      ))}
    </div>
  );
}

export default SideBar;
