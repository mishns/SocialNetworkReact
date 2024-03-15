import { queryClient } from "@api/QueryClient";
import { fetchUser } from "@api/User";
import { Loader } from "@components/Loader";
import { UserView } from "@components/UserView/UserView";
import { useQuery } from "@tanstack/react-query";
import { default as React, FC } from "react";

interface FetchUserViewProps {
  id: string;
}

export const FetchUserView: FC<FetchUserViewProps> = ({ id }) => {
  const userQuery = useQuery(
    { queryFn: () => fetchUser(id), queryKey: ["user", id] },
    queryClient,
  );

  switch (userQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return <UserView user={userQuery.data} />;
    case "error":
      return (
        <div>
          <span>Прозошла ошибка</span>
          <button onClick={() => userQuery.refetch}>Повторить запрос</button>
        </div>
      );
  }
};
