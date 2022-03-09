import React from "react";

function SingleProject({ title, description,link }) {
  return (
    <div className="Project row">
      <div className="col-md-4">
        <div className="card" style="width: 18rem;">
          <img className="card-img-top" src="..." alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">{link}</p>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProject;
