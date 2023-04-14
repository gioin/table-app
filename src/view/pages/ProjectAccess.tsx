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
// import { Users } from "../props/global/props";
import { Users } from "../props/global/props";

function ProjectAccess() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("/users"),
    refetchOnWindowFocus: false
  });
  let navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setcurrentUser] = useState<any>(null);

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
            onChange={(val) => {
              currentUser.status = val.target.checked;
              updateUser.mutate(currentUser);
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
  }, [data?.data, updateUser]);

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
          { key: "status", label: "Status", width: "300px" }
        ]}
        pageSize={4}
        onView={(e) => {
          navigate(`/user/${e.id}`);
        }}
        onDelete={(e) => {
          setIsDeleteModalOpen(true);
          setcurrentUser(e);
        }}
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
      <Modal
        isModalOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        width="546px"
        height="400px"
      >
        <div className=" font-semibold text-[30px] px-10">Delete User</div>

        {currentUser && (
          <div className="flex w-full justify-around my-[40px] py-[40px] border-b border-b-gray-200">
            <div>
              {currentUser.firstName} {currentUser.lastName!}
            </div>
            <div className="text-blueLight font-semibold">
              {currentUser.status.props.checked
                ? "Active User"
                : "Not Active User"}
            </div>
          </div>
        )}

        <Button
          variant={"plain"}
          className="bg-rose-400 ml-12"
          onClick={() => {
            deleteUser.mutate(currentUser.id!);
            setIsDeleteModalOpen(false);
          }}
        >
          Delete
        </Button>
      </Modal>
    </>
  );
}

export default ProjectAccess;
