import LoaderCard from "components/SharedUI/Loader";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import get from "../../helper/api";

const ViewPartner = () => {
  const [partner, setPartner] = useState({
    name: "",
    description: "",
    phoneNo: "",
    address: "",
    role: ""
 
  });

  const [loading, isLoading] = useState(false)
  const { id } = useParams();
  console.log("id3", id);
  useEffect(() => {
    loadPartner();
  }, []);
  const loadPartner = async () => {
    isLoading(true)
    try {
      const res = await get(`/admin/getRestaurant/${id}`);
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
      <Link className="btn btn-primary" to="/admin/restaurants">
        back to Home
      </Link>
      <hr />
      {console.log("sda",partner)}
      <ul className="list-group w-50">
        <li className="list-group-item">Title: {partner.name}</li>
        <li className="list-group-item">Descripton: {partner.description}</li>
        <li className="list-group-item">PhoneNo: {partner.phoneNo}</li>
          <li className="list-group-item">Address: {partner.address}</li>
          <li className="list-group-item"><img width="300" height="300" src={partner.image } alt="not found"/></li>
      </ul>
    </div>
  );
};

export default ViewPartner;
