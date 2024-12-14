import React from "react";
import { Spinner } from "react-bootstrap-v5";

type Props = {
  color?: string;
};

const Loading: React.FC<Props> = ({ color }) => {
  return (
    <Spinner
      className={`text-${color || "white"} ms-2`}
      animation="border"
      size="sm"
    />
  );
};

export default Loading;
