import { useAlert as useReactAlert } from "react-alert";
import { AxiosError } from "axios";

export const useAlert = () => {
  const { error, ...rest } = useReactAlert();
  return {
    ...rest,
    error: (err: any) => {
      if (typeof err === "string") {
        error(err);
      } else {
        if (err instanceof AxiosError) {
          error(err.response?.data?.message || err.response?.statusText);
        } else {
          error(err.reason || err.message);
        }
      }
    },
  };
};
