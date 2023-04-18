import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import { FormikProps } from "formik";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/api";
import { Users } from "../../props/global/props";
import { initialValuesProps } from "../../view/pages/UserSetup";

interface useUserSetupProps {
  updateUser: UseMutationResult<Response, unknown, Users, unknown>;
  handleGroupToggle: (formik: any, group: any, checked: any) => void;
  handleSubPermissionToggle: (
    formik: FormikProps<initialValuesProps>,
    group: any,
    permission: any,
    checked: boolean
  ) => void;
  isLoading: boolean;
  data: Users | undefined;
  isError: boolean
}

const useUserSetup = (): useUserSetupProps => {
  const routeParams = useParams();

  const { data, isLoading, isError } = useQuery<{ data: Users }>({
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
        toast.success("Updated successfully!");
      },
      onError: () => {
        toast.error("Error!");
      }
    }
  );

  const handleGroupToggle = (formik: any, group: any, checked: any) => {
    formik.setValues((prevValues: any) => {
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
    formik: any,
    group: any,
    permission: any,
    checked: boolean
  ) => {
    formik.setValues((prevValues: any) => {
      const updatedGroup = {
        ...prevValues.permissions[group],
        [permission]: checked
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

  return {
    updateUser,
    handleGroupToggle,
    handleSubPermissionToggle,
    isLoading,
    isError,
    data: data?.data
  };
};

export default useUserSetup;
