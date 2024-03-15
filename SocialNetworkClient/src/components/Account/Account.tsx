import React from "react";
import styles from "./account.css";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@api/QueryClient";
import { fetchMe } from "@api/User";
import { Loader } from "@components/Loader";
import { PostForm } from "@components/PostForm";
import { AuthForm } from "@components/AuthForm";

export const Account = () => {
  const meQuery = useQuery(
    {
      queryFn: () => fetchMe(),
      queryKey: ["users", "me"],
    },
    queryClient,
  );

  switch (meQuery.status) {
    case "pending":
      return <Loader />;
    case "error":
      return <AuthForm />;
    case "success":
      return <PostForm />;
  }
};
