import React from "react";
import styles from "./App.css";
import { FetchPostListView } from "@components/PostListView/FetchPostListView";
import { Account } from "@components/Account";

function App() {
  return (
    <div className={styles.app}>
      <Account />
      <FetchPostListView />
    </div>
  );
}

export default App;
