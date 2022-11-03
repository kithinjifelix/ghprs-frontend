import { connect } from "react-redux";
import React, { useEffect, useState } from 'react';
import Page from 'components/Page';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  NavLink as BSNavLink, Form, ModalHeader, ModalBody, FormGroup, Label, Input, FormText, ModalFooter, Modal,
} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { MdAccountCircle, MdDelete, MdAdd, MdArrowBack, MdVerifiedUser } from 'react-icons/md';
import { fetchAll, resetPassword } from "../actions/users";
import MaterialTable from 'material-table'
import axios from "axios";
import { url } from "../api";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import useForm from '../functions/UseForm';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import store from '../store';
const UsersPage = (props) => {
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [person, setPerson] = useState(null);
  const [userName, setUserName] = useState(null);
  const [open, setOpen] = useState(false);
  const { values, handleInputChange, resetForm } = useForm({password: null});

  useEffect(() => {
    props.fetchUsers();
  }, []);
  const currentUsername = JSON.parse(localStorage.getItem('currentUser')) ? jwt_decode(JSON.parse(localStorage.getItem('currentUser')).token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] : '';

  const deleteUser = (e) => {
    if (e.currentTarget.name === currentUsername) {
      toast.error("Could not delete User " + e.currentTarget.name + ". User " + e.currentTarget.name + " is the current logged in user.");
    } else {
      try {
        axios.delete(`${url}users/` + e.currentTarget.id)
          .then((response) => {
            toast.success("User " + e.currentTarget.name + " Successfully Deleted");
            setTimeout(() => {
              props.fetchUsers();
            }, 2500);
          });
      } catch (e) {
        toast.error("Could not delete User");
        console.error(e);
      }
    }
  };

  const disableUser = (personId, userName) => {
    if (userName === currentUsername) {
      toast.error("Could not disable User " + userName + ". User " + userName + " is the current logged in user.");
    } else {
      try {
        axios.get(`${url}users/DisableUser/` + personId)
          .then((response) => {
            toast.success("User " + userName + " Successfully Disabled");
            setTimeout(() => {
              props.fetchUsers();
            }, 2500);
          })
          .catch((error) => {
            toast.error("Could not disable User");
          });
      } catch (e) {
        toast.error("Could not disable User");
        console.error(e);
      }
    }
  };

  const resetUserPassword = (id) => {
    setUserId(id);
    setResetPasswordModal(!resetPasswordModal);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      toast.success("User Password Reset Successfully");
    };
    const onError = () => {
      toast.error(store.getState().users.errorMessage);
    };
    const passwordValues = {
      Password: values.password
    };
    props.resetPassword(userId, passwordValues, onSuccess, onError);
  };

  const handleClickOpen = (user) => {
    setUserId(user.id);
    setUserName(user.userName);
    setPerson(user.person);
    setOpen(true);
  };

  const handleClose = (answer) => {
    if (answer === "Yes") {
      disableUser(userId, userName);
    }
    setOpen(false);
  };

  return (
    <Page className="DashboardPage">
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
          <CardHeader>
              Users
              <Link to="/administration">
            <Button
              variant="contained"
              color="link"
              className=" float-right mr-1"
            >
              <MdArrowBack size="15" />{" "}
              <span style={{ textTransform: "capitalize" }}>Back</span>
            </Button>
          </Link>
            </CardHeader>
            <CardBody>
              Manage user access to the portal. Users are either normal users or admins which controls what features they have access to in the system
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12" xs="12">
          <MaterialTable
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'Email', field: 'email' },
              { title: 'Role', field: 'roleId' },
              { title: 'Organization', field: 'organization' },
              { title: 'Actions', field: 'actions' }
            ]}
            data={props.users.map((row) => ({
              name: row.user.person.name,
              email: row.user.email,
              roleId: row.roles[0],
              organization: row.user.organization.shortName,
              actions: (
                <>
                <BSNavLink
                    id={`profile${row.user.id}`}
                    tag={NavLink}
                    to={`/profile/${row.user.id}`}
                    activeClassName="active"
                    exact={true}
                  >
                    <MdAccountCircle size="15" />{" "}
                    <span style={{ color: "#000" }}>View Profile</span>
                  </BSNavLink>
                  <Button
                    color="link"
                    onClick={() => handleClickOpen(row.user)}
                    id={row.user.id}
                    name={row.userName}
                  >
                    <MdDelete size="15" />{" "}
                    <span style={{ color: "#000" }}>Disable User</span>
                  </Button>
                  <br />
                  <Button
                  color="link"
                  onClick={() => resetUserPassword(row.user.id)}
                  id={row.user.id}
                  name={row.userName}
                  style={{ "text-align": "left" }}>
                    <MdVerifiedUser size={"15"} />
                    {" "}
                    <span style={{ color: "#000" }}>Reset User Password</span>
                  </Button>
                </>
              ),
            }))}
            components={{
              Header: props => {
                return (
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="left">Email</TableCell>
                      <TableCell align="left">Role</TableCell>
                      <TableCell align="left">Organization</TableCell>
                      <TableCell align="left" colSpan={2}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                );
              },
              Row: ({ data }) => {
                return (
                  <TableRow>
                    <TableCell align="left">{data.name}</TableCell>
                    <TableCell align="left">{data.email}</TableCell>
                    <TableCell align="left">{data.roleId}</TableCell>
                    <TableCell align="left">{data.organization}</TableCell>
                    <TableCell align="left" colSpan={2}>{data.actions}</TableCell>
                  </TableRow>
                );
              }
            }}
            title={<Link to="/register">
            <Button
              variant="contained"
              color="link"
              className=" float-right mr-1"
            >
              <MdAdd size="15" />{" "}
              <span style={{ textTransform: "capitalize" }}>Add User</span>
            </Button>
          </Link>}
          />
        </Col>
      </Row>
      <Modal isOpen={resetPasswordModal} backdrop={true}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="password">Password *</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$"
                defaultValue={values.password}
                onChange={handleInputChange}
              />
              <FormText color="muted">
                Passwords must be at least 6 characters. Passwords must have at least one digit ('0'-'9'). Passwords must have at least one lowercase ('a'-'z'). Passwords must have at least one uppercase ('A'-'Z'). Passwords must have at least one special character ("*.!@#$%^&(){ }[]:,.?/~_+-=|\")
              </FormText>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              onClick={() => resetUserPassword(userId)}
            >
              Save
            </Button>
            <Button
              onClick={() => resetUserPassword(userId)}>
              <span style={{ textTransform: "capitalize" }}>
                Cancel
              </span>
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Dialog
        open={open}
        onClose={() => handleClose("No")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Disable User</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to disable { person ? person.name : "" }?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("No")} color="primary">
            No
          </Button>
          <Button onClick={() => handleClose("Yes")} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users.list,
  };
};

const mapActionToProps = {
  fetchUsers: fetchAll,
  resetPassword: resetPassword
};

export default connect(mapStateToProps, mapActionToProps)(UsersPage);
