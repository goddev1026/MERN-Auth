import React from "react";
import { Button } from "react-bootstrap-v5";

import Loading from "../Loading";

type Props = {
  isWaiting?: boolean;
  disabled?: boolean;
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  [k: string]: any;
};

const ActionButton: React.FC<Props> = ({
  isWaiting,
  disabled,
  children,
  ...props
}) => {
  return (
    <Button disabled={isWaiting || disabled} {...props}>
      {children}
      {isWaiting && <Loading />}
    </Button>
  );
};

export default ActionButton;
