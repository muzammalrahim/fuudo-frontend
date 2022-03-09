import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import get, { del } from "../../helper/subAdminApi";
import "./projects.css";
import { makeStyles } from "@material-ui/core/styles";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import View from "@material-ui/icons/Visibility"
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import LoaderCard from "components/SharedUI/Loader";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const useStyles = makeStyles(styles);
const Projects = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, isLoading] = useState(false)
  const classes = useStyles();
  useEffect(() => {
    loadPortfolio();
  }, []);

  // const deletePortfolio = (id) => {
  //   del(`user/remove-user/${id}`);
  //   setPortfolios([])
  //   loadPortfolio([]);
  // };

  const deletePortfolio = (id) => {
    isLoading(true)
    del(`/subadmin/deleteDeal/${id}`)
      .then((res) => {
        loadPortfolio();
      })
      .catch((error) => {});
  };

  const loadPortfolio = async () => {
    isLoading(true)
    try {
      const res = await get("/subadmin/getDeals");
      isLoading(false)
      setPortfolios(res.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <LoaderCard/>
  ) : (
    
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
                <th scope="col">Quantity</th>
                <th scope="col">Original price</th>
                <th scope="col">Discount price</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {portfolios?.map((portfolio, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{portfolio.restaurantId?.name}</td>
                  <td>{portfolio.name}</td>
                  <td>{portfolio.quantity}</td>
                  <td>{portfolio.originalPrice}</td>
                  <td>{portfolio.discountPrice}</td>
                  <td>{ReactHtmlParser(portfolio.description)}</td>
                  <td><img width="50" height="50" src={portfolio.image }/></td>

                  <td>
                    
                    <Tooltip
                      id="tooltip-top"
                      title="View"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link to={`/subadmin/view-deal/${portfolio?._id}`}>
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
                      <Link to={`/subadmin/edit-deal/${portfolio._id}`}>
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
                      <Link to="deals" onClick={() => deletePortfolio(portfolio._id)}>
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

export default Projects;
