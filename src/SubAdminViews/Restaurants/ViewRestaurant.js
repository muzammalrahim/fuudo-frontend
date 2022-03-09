import LoaderCard from "components/SharedUI/Loader";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import get from "../../helper/subAdminApi"

const ViewPartner = () => {
  const [partner, setPartner] = useState({
    name: "",
    description: "",
    phoneNo: "",
    address: "",
    role: ""
  });
  const { id } = useParams();
  const [loading, isLoading] = useState(false);
  console.log("id3", id);
  useEffect(() => {
    loadPartner();
  }, []);
  const loadPartner = async () => {
    isLoading(true)
    try {
      const res = await get(`/subadmin/getRestaurant/${id}`);
      isLoading(false)
      setPartner(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  return loading ? (
    <LoaderCard/>
  ) : (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/subadmin/restaurants">
        back to Home
      </Link>
      <hr />
      {console.log("sda",partner)}
      <ul className="list-group w-50">
        <li className="list-group-item">Title: {partner.name}</li>
        <li className="list-group-item">Descripton: {partner.description}</li>
        <li className="list-group-item">PhoneNo: {partner.phoneNo}</li>
        <li className="list-group-item">Address: {partner.address}</li>
      </ul>
    </div>
  );
};

export default ViewPartner;
