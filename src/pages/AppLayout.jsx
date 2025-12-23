import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <>
      <User />
      <div className={styles.app}>
        <Sidebar />
        <Map />
      </div>
    </>
  );
}

export default AppLayout;
