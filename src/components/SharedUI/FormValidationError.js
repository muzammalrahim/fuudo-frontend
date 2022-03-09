import React from "react";

export default function FormValidationError(props) {
  const { errorMessage } = props;
  return (
    <div
      style={{
        textAlign: "left",
        fontSize: "smaller",
        color: "red",
      }}
    >
      {errorMessage}
    </div>
  );
}