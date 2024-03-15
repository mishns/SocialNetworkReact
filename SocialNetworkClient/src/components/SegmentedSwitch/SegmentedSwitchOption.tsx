import { default as React, FC, MouseEventHandler } from "react";

import styles from "./SegmentedSwitchOption.css";

export interface ISegmentedSwitchOptionProps {
  isActive: boolean;
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const SegmentedSwitchOption: FC<ISegmentedSwitchOptionProps> = ({
  isActive,
  title,
  onClick,
}) => {
  return (
    <button
      className={styles.segmentedSwitchOption}
      data-active={isActive}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
