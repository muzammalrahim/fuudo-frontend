import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import get from "../../helper/api"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import LoaderCard from "components/SharedUI/Loader";

const ViewDeal = (props) => {
  
  const [loading, isLoading] = useState(false);
  const [deal, setDeal] = useState({
    name: "",
    originalPrice: "",
    discountPrice: "",
    description: ""
  });
  const { id } = useParams();

  useEffect(() => {
    loadDeal();
  }, []);

  const loadDeal = async () => {
    isLoading(true)
    try {
      const res = await get(`/admin/getDeal/${id}`);
      isLoading(false)
      setDeal(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <LoaderCard/> ) : (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/admin/deals">
        back to Home
      </Link>
      <hr />
      <ul className="list-group w-50">
        
        <li className="list-group-item">Name: {deal.name}</li>
        <li className="list-group-item">Original Price: {deal.originalPrice}</li>
        <li className="list-group-item">Discount Price: {deal.discountPrice}</li>
        <li className="list-group-item">Description: {ReactHtmlParser(deal.description)}</li>
        <li className="list-group-item"><img width="300" height= "300" src={ deal.image}/></li>
      </ul>
    </div>
  );
};

export default ViewDeal;
