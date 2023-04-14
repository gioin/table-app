import {
  UseMutationResult,
} from "@tanstack/react-query";
import { useFormik } from "formik";
import { Button } from "../components/Button";
import { DropDown } from "../components/inputs/Dropdown";
import TextInput from "../components/inputs/Text";
import { adminPermissions, roles, userPermissions } from "../config/config";
import { Users } from "../props/global/props";

export interface InitialValueProps {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AddUserProps {
  addUser: () => UseMutationResult<Response, unknown, Users, unknown>;
  setIsModalOpen: (state: boolean) => void;
}

function AddUser({ addUser, setIsModalOpen }: AddUserProps) {
  const formik = useFormik<InitialValueProps>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: ""
    },
    validate: (values) => {
      const errors: any = {};

      if (values.firstName.length === 0) {
        errors.firstName = "First Name is Required";
      }
      if (values.lastName.length === 0) {
        errors.lastName = "Last Name is Required";
      }
      if (values.email.length === 0) {
        errors.email = "Email is Required";
      }
      if (values.role.length === 0) {
        errors.role = "Role is Required";
      }

      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      setIsModalOpen(false);
      if (values.role === "admin") {
        //@ts-ignore
        addUser.mutate({ ...values, ...adminPermissions });
      } else if (values.role === "user") {
        //@ts-ignore
        addUser.mutate({ ...values, ...userPermissions });
      }
    }
  });

  return (
    <div className="px-[80px] pb-16">
      <div className=" font-semibold text-[30px] mb-[80px]">
        Invite New User
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <TextInput
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            <small className="text-red">
              {formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
              ) : null}
            </small>
          </div>
          <div>
            <TextInput
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            <small className="text-red">
              {formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
              ) : null}
            </small>
          </div>
        </div>
        <div className="mb-6">
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <small className="text-red">
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
          </small>
        </div>
        <div className="mb-6">
          <DropDown
            id={"role"}
            placeholder="Role"
            options={[...roles]}
            onChange={formik.handleChange}
          />
          <small className="text-red">
            {formik.errors.role ? <div>{formik.errors.role}</div> : null}
          </small>
        </div>
        <Button className="bg-gray-400" variant="plain" type="submit">
          Send Invitation
        </Button>
      </form>
    </div>
  );
}

export default AddUser;
