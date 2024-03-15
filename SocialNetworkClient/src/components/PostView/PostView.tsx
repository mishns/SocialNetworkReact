import { default as React, FC } from "react";
import styles from "./PostView.css";
import { Post } from "@api/Post";
import { FetchUserView } from "@components/UserView/FetchUserView";

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, {
    timeStyle: "medium",
  })}`;
}

interface PostViewProps {
  post: Post;
}

export const PostView: FC<PostViewProps> = ({ post }) => {
  return (
    <div>
      <div className={styles.postView}>
        <FetchUserView id={post.authorId} />
        <p className={styles.postView__text}>{post.text}</p>

        <time className={styles.postView__time}>
          {formatDate(post.createdAt)}
        </time>
      </div>
    </div>
  );
};
