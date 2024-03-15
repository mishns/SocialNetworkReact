import React from "react";
import { Loader } from "@components/Loader";
import { PostListView } from "@components/PostListView";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@api/QueryClient";
import { fetchPostList } from "@api/Post";

export const FetchPostListView = () => {
  const postListQuery = useQuery(
    {
      queryFn: fetchPostList,
      queryKey: ["posts"],
    },
    queryClient,
  );

  switch (postListQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return <PostListView postList={postListQuery.data.list} />;
    case "error":
      return (
        <div>
          <span>Произошла ошибка</span>
          <span>{JSON.stringify(postListQuery.error)}</span>
          <button onClick={() => postListQuery.refetch}>
            Повторить запрос
          </button>
        </div>
      );
  }
};
