import { default as React, FC, ReactNode } from "react";

import styles from "./SegmentedSwitch.css";

export interface ISegmentedSwitchProps {
  children: ReactNode;
}

export const SegmentedSwitch: FC<ISegmentedSwitchProps> = ({ children }) => {
  return <div className={styles.segmentedSwitch}>{children}</div>;
};
