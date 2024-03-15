import { default as React, FC } from "react";
import { PostView } from "../PostView";
import styles from "./PostListView.css";
import { PostList } from "@api/Post";

interface PostListViewProps {
  postList: PostList;
}

export const PostListView: FC<PostListViewProps> = ({ postList }) => {
  return (
    <ul className={styles.postList}>
      {postList.map(post => (
        <li key={post.id} className={styles.postList__item}>
          <PostView post={post} />
        </li>
      ))}
    </ul>
  );
};
