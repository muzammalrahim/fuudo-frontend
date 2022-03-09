import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar"
import get,{del} from "../../helper/api"
import { makeStyles } from "@material-ui/core/styles";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import View from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

const Items = () => {
    
    const [items, setItems] = useState([]);
    // const [restaurantDropdown, setRestaurantDropdown] = useState([]);
  
  const { id } = useParams();

    const classes = useStyles();
    useEffect(() => {
        // RestaurantsDropdown();
        loadItems();
    }, []);

    const loadItems =() => {
        get(`/admin/getItem/${id}`)
       .then((res) => {
         var data = res.data?.data
         console.log("items",data)
         setItems(data);
       })
       .catch(() => {});   
    };

    // const RestaurantsDropdown = () => {
    //     get(`/admin/getRestaurantsDropdown/${id}`)
    //     .then((res) => {
    //         var data = res.data?.data
    //         console.log("itemsdropdown", data)
    //         setRestaurantDropdown(data)
    //         restaurantDropdown.map((ele) => {
    //             return (
    //                 console.log('ele',ele)
    //             )
    //         })
    //         console.log("itemsdropdown",data[0]._id)
    //     })
    //     .catch(() => {});  
    // }
  
  return (
    <div>
      {/* <Navbar /> */}
      <div className="container">
        <div className="py-4">
          <h1>Items Page</h1>

          <table className="table border shadow">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
            {items?.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Items;
