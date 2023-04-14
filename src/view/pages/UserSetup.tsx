import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
// import KeyIcon from "../assets/icons/KeyIcon";
import UserIcon from "../assets/icons/UserIcon";
import Accordion from "../components/Accordion";
import { Button } from "../components/Button";
import { DropDown } from "../components/inputs/Dropdown";
import Switch from "../components/inputs/Switch";
import TextInput from "../components/inputs/Text";
import { roles } from "../config/config";
import { Users } from "../props/global/props";
import { InitialValueProps } from "./AddUser";

function UserSetup() {
  const routeParams = useParams();

  const { data, isLoading } = useQuery<{ data: Users }>({
    queryKey: ["users", routeParams.id],
    queryFn: () => api.get(`/users/${routeParams.id}`),
    refetchOnWindowFocus: false
  });
  const queryClient = useQueryClient();

  const updateUser = useMutation<Response, unknown, Users>(
    async (val) => api.put(`/users/${data?.data.id}`, val),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      }
    }
  );

  console.log("status", data?.data.status);

  const formik = useFormik({
    initialValues: {
      firstName: data?.data.firstName ?? "",
      lastName: data?.data.lastName ?? "",
      role: data?.data.role ?? "",
      status: data?.data.status!,
      permissions: data?.data.permissions ?? {}
    },
    validate: (values) => {
      console.log("values", values);

      const errors: any = {};

      if (values.firstName.length === 0) {
        errors.firstName = "First Name is Required";
      }
      if (values.lastName.length === 0) {
        errors.lastName = "Last Name is Required";
      }
      if (values.role.length === 0) {
        errors.role = "Role is Required";
      }

      return errors;
    },
    // validateOnBlur: false,
    // validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      //@ts-ignore
      updateUser.mutate({ ...data?.data, ...values });
    }
  });

  console.log("formik.values.status", formik.values.status);

  const handleGroupToggle = (group: any, checked: any) => {
    formik.setValues((prevValues) => {
      const updatedGroup = {
        ...prevValues.permissions[group],
        ...(checked
          ? Object.fromEntries(
              Object.keys(prevValues.permissions[group]).map((p) => [p, true])
            )
          : Object.fromEntries(
              Object.keys(prevValues.permissions[group]).map((p) => [p, false])
            ))
      };
      return {
        ...prevValues,
        permissions: {
          ...prevValues.permissions,
          [group]: updatedGroup
        }
      };
    });
  };

  const handleSubPermissionToggle = (
    group: any,
    permission: any,
    checked: boolean
  ) => {
    formik.setValues((prevValues) => {
      const updatedGroup = {
        ...prevValues.permissions[group],
        [permission]: checked
      };
      const allPermissionsChecked = Object.values(updatedGroup).every(Boolean);
      return {
        ...prevValues,
        permissions: {
          ...prevValues.permissions,
          [group]: updatedGroup
        }
      };
    });
  };

  if (isLoading) return <div>isLoading</div>;

  //@ts-ignore
  return (
    <div className="flex gap-[200px]">
      <div className="flex flex-col items-center mt-10">
        <div className="flex mb-11">
          <div className="scale-[3]">
            <UserIcon />
          </div>
          {/* <div className="absolute">
            <KeyIcon />
          </div> */}
        </div>
        <div
          className={classNames(" text-center", {
            "opacity-[0.5] pointer-events-none": !formik.values.status
          })}
        >
          <small className="text-gray-400">upload photo</small>

          <div className="flex flex-col mt-4 text-center">
            <div className="text-lg font-bold">{data?.data.firstName}</div>
            <div className="text-lg font-bold mt-[-14px]">
              {data?.data.lastName}
            </div>
          </div>
          <small className="text-gray-500">{data?.data.email}</small>
        </div>
      </div>

      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex  gap-[200px]">
            <div className="w-[300px]">
              <div className="text-lg font-bold">Details</div>
              <div className="flex mt-6">
                {
                  <Switch
                    name="status"
                    id="status"
                    onChange={formik.handleChange}
                    checked={formik.values.status}
                    type="checkbox"
                  />
                }
                {formik.values.status ? (
                  <div className="font-semibold text-green-600">Active</div>
                ) : (
                  <div className="font-semibold text-rose-500">Not Active</div>
                )}
              </div>
              <div
                className={classNames("py-10", {
                  "opacity-[0.5] pointer-events-none": !formik.values.status
                })}
              >
                <div>
                  <TextInput
                    label="First Name"
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
                <div className="my-4">
                  <TextInput
                    label="Last Name"
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
                <div className="my-4">
                  <DropDown
                    id={"role"}
                    label="Role"
                    placeholder="Role"
                    options={[...roles]}
                    value={formik.values.role}
                    defaultValue={formik.values.role}
                    onChange={formik.handleChange}
                  />
                  <small className="text-red">
                    {formik.errors.role ? (
                      <div>{formik.errors.role}</div>
                    ) : null}
                  </small>
                </div>
              </div>
              <Button
                className="bg-[#7E7EF1]"
                variant="plain"
                type="submit"
              >
                Send Invitation
              </Button>
            </div>
            <div>
              <div className="text-lg font-bold mb-[30px]">Permissions</div>

              <div
                className={classNames("", {
                  "opacity-[0.5] pointer-events-none": !formik.values.status
                })}
              >
                {Object.keys(formik.values.permissions).map((group) => {
                  const groupPermissions = formik.values.permissions[group];
                  const allPermissionsChecked =
                    Object.values(groupPermissions).every(Boolean);

                  console.log("allPermissionsChecked", allPermissionsChecked);

                  return (
                    <Accordion
                      key={group}
                      title={
                        <div className="flex relative font-semibold">
                          <div>{group}</div>
                          <div className="absolute right-0 z-10">
                            <Switch
                              disabled={!formik.values.status}
                              checked={allPermissionsChecked}
                              onChange={(e) =>
                                handleGroupToggle(group, e.target.checked)
                              }
                            />
                          </div>
                        </div>
                      }
                      content={Object.keys(
                        formik.values.permissions[group]
                      ).map((permission) => (
                        <div
                          key={permission}
                          className="flex py-1 justify-between mr-[21px]"
                        >
                          {permission}
                          <div>
                            <Switch
                              disabled={!formik.values.status}
                              checked={
                                formik.values.permissions[group][permission]
                              }
                              onChange={(e) =>
                                handleSubPermissionToggle(
                                  group,
                                  permission,
                                  e.target.checked
                                )
                              }
                            />
                          </div>
                        </div>
                      ))}
                      id={"12"}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  );
}

export default UserSetup;
