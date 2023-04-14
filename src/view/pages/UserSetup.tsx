import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../api/api";

function UserSetup() {
  const routeParams = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["users", routeParams.id],
    queryFn: () => api.get(`/users/${routeParams.id}`),
    refetchOnWindowFocus: false
  });
  const queryClient = useQueryClient();
  // const newData = queryClient.getQueryData(['users'])

  //   console.log("usersSetup", data);
  //@ts-ignore
  return <div>{data?.data.id}</div>;
}

export default UserSetup;
