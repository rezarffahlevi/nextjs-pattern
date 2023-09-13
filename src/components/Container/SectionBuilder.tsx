import { Alert, AlertIcon } from "@chakra-ui/react";
import React, { ReactNode } from "react";
interface Props {
  children: ReactNode[] | JSX.Element;
  loading: ReactNode[] | JSX.Element;
  error?: ReactNode[] | JSX.Element;
  isLoading?: boolean;
  isError?: boolean;
}
export const SectionBuilder = ({
  children,
  loading,
  error,
  isError = false,
  isLoading = true,
}: Props) => {
  if (isLoading) return loading;

  if (isError) return error ?? <ErrorBuilder />;

  return children;
};

export const ErrorBuilder = ({ message }: { message?: string | null | undefined }) => {
  return (
    <div className="m-2 my-4">
      <div className="alert alert-colored alert-danger alert-icon">
        <i className="p-icon-face-bad"></i>
        <h5 className="alert-title">
          {message ?? `There was an error processing your request`}</h5>
        {/* <button type="button" className="btn btn-link btn-close bg-trasparent">
          <i className="p-icon-close"></i>
        </button> */}
      </div>
    </div>
  );
};
