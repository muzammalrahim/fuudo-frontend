import LoaderCard from "components/SharedUI/Loader";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import get from "../../helper/api"
import { toast } from 'react-toastify';

const ViewService = () => {
  const [service, setService] = useState({
    name: "",
    email: "",
    role: ""
  });

  const [loading, isLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    loadService();
  }, []);
  const loadService = async () => {
    isLoading(true)
    try {
      const res = await get(`/admin/getSubAdmin/${id}`);
      toast.success("View record successfully")
      isLoading(false)
      setService(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  return loading ? (
    <LoaderCard/> ) : (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/admin/subAdmin">
        back to Home
      </Link>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Title: {service.name}</li>
        <li className="list-group-item">Email: {service.email}</li>
      </ul>
    </div>
  );
};

export default ViewService;
