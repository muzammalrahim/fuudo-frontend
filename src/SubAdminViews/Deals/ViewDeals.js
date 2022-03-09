import LoaderCard from "components/SharedUI/Loader";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import get from "../../helper/subAdminApi"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const ViewProject = (props) => {
  
  const [user, setUser] = useState({
    name: "",
    quantity: "",
    originalPrice: "",
    discountPrice: "",
    description: ""
  });
  const { id } = useParams();
  const [loading, isLoading] = useState(false)
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    isLoading(true)
    try {
      const res = await get(`/subadmin/getDeal/${id}`);
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
      <Link className="btn btn-primary" to="/subadmin/deals">
        back to Home
      </Link>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Name: {user.name}</li>
        <li className="list-group-item">Quantity: {user.quantity}</li>
        <li className="list-group-item">Original Price: {user.originalPrice}</li>
        <li className="list-group-item">Discount Price: {user.discountPrice}</li>
        <li className="list-group-item">Description: {ReactHtmlParser(user.description)}</li>
          <li className="list-group-item"><img width="300" height="300" src={user.image }/></li>
      </ul>
    </div>
  );
};

export default ViewProject;
