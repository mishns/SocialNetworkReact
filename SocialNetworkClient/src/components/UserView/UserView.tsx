import { default as React, FC } from "react";
import {
  getColorIndexByUsername,
  getColorByIndex,
  getGradientByIndex,
} from "./getColorByUsername";
import styles from "./UserView.css";
import { User } from "@api/User";

interface UserViewProps {
  user: User;
}

export const UserView: FC<UserViewProps> = ({ user }) => {
  const colorIndex = getColorIndexByUsername(user.username);

  return (
    <div className={styles.userView}>
      <div
        className={styles.userView__avatar}
        style={{ background: getGradientByIndex(colorIndex) }}
      >
        {user.username.slice(0, 1).toUpperCase()}
      </div>

      <span
        className={styles.userView__username}
        style={{ color: getColorByIndex(colorIndex) }}
      >
        {user.username}
      </span>
    </div>
  );
};
