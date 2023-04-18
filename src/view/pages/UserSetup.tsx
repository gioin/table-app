import classNames from "classnames";
import { useFormik } from "formik";
import UserIcon from "../../assets/icons/UserIcon";
import Accordion from "../components/Accordion";
import { Button } from "../components/Button";
import { DropDown } from "../components/inputs/Dropdown";
import Switch from "../components/inputs/Switch";
import TextInput from "../components/inputs/Text";
import { roles } from "../../config/config";
import useUserSetup from "../../hooks/pages/useUserSetup";
import KeyIcon from "../../assets/icons/key.svg";

export interface initialValuesProps {
  firstName: string;
  lastName: string;
  role: string;
  status: boolean;
  permissions: any;
}

const UserSetup = () => {
  const {
    data,
    isLoading,
    isError,
    updateUser,
    handleGroupToggle,
    handleSubPermissionToggle
  } = useUserSetup();

  const formik = useFormik<initialValuesProps>({
    initialValues: {
      firstName: data?.firstName ?? "",
      lastName: data?.lastName ?? "",
      role: data?.role ?? "",
      status: data?.status!,
      permissions: data?.permissions ?? {}
    },
    validate: (values) => {
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
    enableReinitialize: true,
    onSubmit: (values) => {
      updateUser.mutate({ ...data!, ...values });
    }
  });

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="flex gap-[200px]">
      <div className="flex flex-col items-center mt-10">
        <div className="flex mb-16 relative">
          <div className="scale-[4]">
            <UserIcon />
          </div>
          {data?.role === "admin" && (
            <div className="bg-[#7E7EF1] w-[48px] h-[32px] rounded-[30px] flex justify-center items-center mr-6 z-[2] absolute right-[-90px] top-10">
              <img src={KeyIcon} alt="key" />
            </div>
          )}
        </div>
        <div
          className={classNames(" text-center", {
            "opacity-[0.5] pointer-events-none": !formik.values.status
          })}
        >
          <small className="text-gray-400">upload photo</small>

          <div className="flex flex-col mt-4 text-center">
            <div className="text-lg font-bold">{data?.firstName}</div>
            <div className="text-lg font-bold mt-[-14px]">
              {data?.lastName}
            </div>
          </div>
          <small className="text-gray-500">{data?.email}</small>
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
                      <>{formik.errors.firstName}</>
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
                      <>{formik.errors.lastName}</>
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
                    {formik.errors.role ? <>{formik.errors.role}</> : null}
                  </small>
                </div>
              </div>
              <Button className="bg-[#7E7EF1]" variant="plain" type="submit">
                Update
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
                                handleGroupToggle(
                                  formik,
                                  group,
                                  e.target.checked
                                )
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
                                  formik,
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
};

export default UserSetup;
