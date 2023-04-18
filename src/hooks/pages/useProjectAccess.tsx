import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/api";
import { useState, useMemo } from "react";
import { Users } from "../../props/global/props";
import Switch from "../../view/components/inputs/Switch";
import KeyIcon from "../../assets/icons/KeyIcon";
import React from "react";
import { toast } from "react-toastify";

interface useProjectAccessDataProps {
  tableData: any;
  isLoading: boolean;
  isError: boolean;
  setcurrentUser: React.Dispatch<any>;
  currentUser: {[key: string]: any} | null;
  addUser: UseMutationResult<Response, unknown, Users, unknown>;
  deleteUser: UseMutationResult<Response, unknown, Users, unknown>;
}

const useProjectAccessData = (): useProjectAccessDataProps => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<{data: Users[]}>({
    queryKey: ["users"],
    queryFn: () => api.get("/users"),
    refetchOnWindowFocus: false
  });
  const [currentUser, setcurrentUser] = useState<{[key: string]: any} | null>(null);

  const updateStatus = useMutation<Response, unknown, Users>(
    async (data) => api.put(`/users/${data.id}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        toast.success("Updated successfully!");
      },
      onError: () => {
        toast.error("Error!");
      }
    }
  );

  const addUser = useMutation<Response, unknown, Users>(
    (data) => api.post("/users", data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        toast.success("Added successfully!");
      },
      onError: () => {
        toast.error("Error!");
      }
    }
  );

  const deleteUser = useMutation<Response, unknown, Users>(
    (id) => api.delete(`/users/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        toast.success("Deleted successfully!");
      },
      onError: () => {
        toast.error("Error!");
      }
    }
  );

  const tableData = useMemo(() => {
    return data?.data.map((user: Users) => {
      const currentUser = user;
      return {
        ...user,
        status: (
          <Switch
            checked={user.status}
            onChange={(val) => {
              currentUser.status = val.target.checked;
              updateStatus.mutate(currentUser);
            }}
          />
        ),
        user: user.firstName,
        roleDisplay:
          user.role === "admin" ? (
            <div className="flex w-[120px] justify-end">
              <KeyIcon />
              {user.role}
            </div>
          ) : (
            <div className="flex w-[120px] justify-end">{user.role} </div>
          )
      };
    });
  }, [data?.data, updateStatus]);

  return {
    tableData,
    isLoading,
    isError,
    setcurrentUser,
    currentUser,
    addUser,
    deleteUser
  };
};

export default useProjectAccessData;
