import CustomTable from "../components/CustomTable";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import Modal from "../components/Modal";
import AddUser from "./AddUser";
import { useState } from "react";
import { Users } from "../../props/global/props";
import useProjectAccessData from "../../hooks/pages/useProjectAccess";

const ProjectAccess = ()=> {
  const {
    tableData,
    isLoading,
    isError,
    setcurrentUser,
    currentUser,
    addUser,
    deleteUser
  } = useProjectAccessData();

  let navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

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
        {<AddUser addUser={addUser} setIsModalOpen={setIsModalOpen} />}
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
            deleteUser.mutate(currentUser?.id!);
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
