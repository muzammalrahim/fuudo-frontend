import LoaderCard from "components/SharedUI/Loader";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import get from "../../helper/subAdminApi";

const ViewUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role:""
  });
  const { id } = useParams();
  const [loading, isLoading] = useState(false)
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    isLoading(true)
    try {
      const res = await get(`/subadmin/getUser/${id}`);
      isLoading(false)
      setUser(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  return loading ? (
    <LoaderCard/>
  ) : (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/subadmin/users">
        back to Home
      </Link>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Name: {user.name}</li>
        <li className="list-group-item">Email: {user.email}</li>
      </ul>
    </div>
  );
};

export default ViewUser;
