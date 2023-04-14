import CustomTable from "../components/CustomTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { Button } from "../components/Button";
import Modal from "../components/Modal";
import AddUser from "./AddUser";
import { useState, useMemo } from "react";
import Switch from "../components/inputs/Switch";
import KeyIcon from "../assets/icons/KeyIcon";

export interface Users {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: boolean;
  permissions: any;
}

function ProjectAccess() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("/users"),
    refetchOnWindowFocus: false
  });
  let navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateUser = useMutation<Response, unknown, Users>(
    async (data) => api.put(`/users/${data.id}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      }
    }
  );

  const tableData = useMemo(() => {
    return data?.data.map((user: Users) => {
      const currentUser = user;
      console.log("updateUser.isLoading", updateUser.isLoading);

      return {
        ...user,
        status: (
          <Switch
            checked={user.status}
            onCheck={(val) => {
              currentUser.status = val;
              updateUser.mutate(currentUser);
            }}
          />
        ),          
          user: user.firstName,
          roleDisplay: user.role === "admin" ? (
            <div className="flex w-[120px] justify-end">
              <div className="bg-[#7E7EF1] w-[48px] h-[32px] rounded-[30px] flex justify-center items-center mr-6">
                <KeyIcon />
              </div>
              {user.role}
            </div>
          ) : (
            <div className="flex w-[120px] justify-end">{user.role} </div>
          ),
      };
    });
  }, [data?.data, updateUser]);

  console.log("tableData", tableData);

  const addUser = useMutation<Response, unknown, Users>(
    (data) => api.post("/users", data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      }
    }
  );

  const deleteUser = useMutation<Response, unknown, Users>(
    (id) => api.delete(`/users/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      }
    }
  );

  return (
    <>
      <div className="absolute top-[-30px] left-[80px]">
        <Button
          variant="circle"
          className="bg-blue"
          onClick={(d) => setIsModalOpen(true)}
        />
      </div>
      <CustomTable
        data={tableData as Users[]}
        isLoading={isLoading}
        columns={[
          { key: "user", label: "User", width: "600px" },
          { key: "role", label: "role", width: "400px" },
          { key: "status", label: "Status", width: "300px" },
        ]}
        pageSize={4}
        onView={(e) => {
          navigate(`/user/${e.id}`);
        }}
        onDelete={(e) => void deleteUser.mutate(e.id)}
      />
      <Modal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="646px"
      >
        {
          //@ts-ignore
          <AddUser addUser={addUser} setIsModalOpen={setIsModalOpen} />
        }
      </Modal>
    </>
  );
}

export default ProjectAccess;
