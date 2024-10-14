import styles from '../styles/Sidebar.module.scss';
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
