import React from "react";
import { globalVariables } from "data/globalVariables";
const LoaderCard = () => {
  return (

    <div className="d-flex justify-content-center">
      <div style={{ minWidth: "300px" }}>
        <div className="mx-auto mb-4 text-center" style={{ padding: 30 }}>
        <div class="spinner-border text-primary" style={{width: "3rem", height: "3rem"}} role="status">
            <span class="sr-only">Loading...</span>
        </div>

          <p>{globalVariables.LoaderMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default LoaderCard;
