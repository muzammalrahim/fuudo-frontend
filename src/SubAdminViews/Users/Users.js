import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"
import get,{del} from "../../helper/subAdminApi"
import { makeStyles } from "@material-ui/core/styles";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import View from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import LoaderCard from "components/SharedUI/Loader";

const useStyles = makeStyles(styles);

const Users = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, isLoading] = useState(false)

  const classes = useStyles();
  useEffect(() => {
    loadPortfolio();
  }, []);

  const deletePortfolio = (id) => {
    isLoading(true)
    del(`/subadmin/deleteUser/${id}`).then((res) => {
      loadPortfolio();
    }).catch(error => {
    });
  };

  const loadPortfolio = async () => {
    isLoading(true)
    try {
      const res = await get("/subadmin/getUsers?role=user");
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
          <h1>User Page</h1>

          <table className="table border shadow">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {portfolios?.map((portfolio, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{portfolio.name}</td>
                  <td>{portfolio.email}</td>
                  <td>
                    <Tooltip
                      id="tooltip-top"
                      title="View"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link to={`/subadmin/view-user/${portfolio._id}`}>
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
                      <Link to={`/subadmin/edit-user/${portfolio._id}`}>
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
                      <Link to="users" onClick={(e) => deletePortfolio(portfolio._id)}>
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

export default Users;
