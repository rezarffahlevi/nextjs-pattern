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

  if (isError) return error ?? <ErrorBuilder/>;

  return children;
};

export const ErrorBuilder = () => {
  return (
    <div className="m-2 my-4">
      <Alert status="error" className="font-body">
        <AlertIcon />
        There was an error processing your request
      </Alert>
    </div>
  );
};
