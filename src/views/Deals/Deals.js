import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import get, { del } from "../../helper/api";
import "./projects.css";
import { makeStyles } from "@material-ui/core/styles";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import View from "@material-ui/icons/Visibility"
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import LoaderCard from "components/SharedUI/Loader";


const useStyles = makeStyles(styles);
const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, isLoading] = useState(false)
  const classes = useStyles();
  useEffect(() => {
    loadDeals();
  }, []);

  // const deletePortfolio = (id) => {
  //   del(`user/remove-user/${id}`);
  //   setPortfolios([])
  //   loadPortfolio([]);
  // };

  const deleteDeal = (id) => {
    isLoading(true)
    del(`/admin/deleteDeal/${id}`)
      .then((res) => {
        loadDeals()
      })
      .catch((error) => {});
  };

  const loadDeals = async () => {
    isLoading(true)
    try {
      const res = await get("/admin/getDeals");
      console.log("images", res.data?.data);
      isLoading(false)
      setDeals(res.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <LoaderCard/> ) : (
    <div>
      <Navbar />
      <div className="container">
        <div className="py-4">
          <h1>Deal Page</h1>
          <table className="table border shadow">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Name</th>
                <th scope="col">Original price</th>
                <th scope="col">Discount price</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {deals?.map((deal, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{deal.restaurantId?.name}</td>
                  <td>{deal.name}</td>
                  <td>{deal.originalPrice}</td>
                  <td>{deal.discountPrice}</td>
                  <td>{ ReactHtmlParser(deal.description)}</td>
                  <td><img width="50px" height="50px" src={deal.image}/></td>

                  <td>
                    
                    <Tooltip
                      id="tooltip-top"
                      title="View"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link to={`/admin/view-deal/${deal?._id}`}>
                        <IconButton
                          aria-label="View"
                          className={classes.tableActionButton}
                        >
                          <View
                            className={
                              classes.tableActionButtonIcon + " " + classes.view
                            }
                          />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top"
                      title="Edit"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link to={`/admin/edit-deal/${deal._id}`}>
                        <IconButton
                          aria-label="Edit"
                          className={classes.tableActionButton}
                        >
                          <Edit
                            className={
                              classes.tableActionButtonIcon + " " + classes.edit
                            }
                          />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Remove"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link to="deals" onClick={() => deleteDeal(deal._id)}>
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                        >
                          <Close
                            className={
                              classes.tableActionButtonIcon +
                              " " +
                              classes.close
                            }
                          />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
  );
};

export default Deals;
