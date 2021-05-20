import { connect } from "react-redux";
import React, { useEffect } from "react";
import Page from 'components/Page';
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  NavLink as BSNavLink,
} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import { fetchAll } from "../actions/users";
import MaterialTable from 'material-table'
import axios from "axios";
import { url } from "../api";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
const UsersPage = (props) => {

  useEffect(() => {
    props.fetchUsers();
  }, []);
const currentUsername =  JSON.parse(localStorage.getItem('currentUser')) ? jwt_decode(JSON.parse(localStorage.getItem('currentUser')).token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] : '';
function deleteUser(e){
    if(e.currentTarget.name === currentUsername){
        toast.error("Could not delete User "+e.currentTarget.name+". User "+e.currentTarget.name+" is the current logged in user.");
    }else{
            try{
              axios.delete(`${url}users/`+e.currentTarget.id  )
              .then((response) => {
                toast.success("User "+e.currentTarget.name+" Successfully Deleted");
                setTimeout(()=>{
                    props.fetchUsers();
                }, 2500);
              });
            }catch(e){
                toast.error("Could not delete User");
                console.error(e);
            }
    }
}
  return (
    <Page
      className="DashboardPage"
      title="Users"
      breadcrumbs={[{ name: 'Users', active: true }]}
    >
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardBody>
              <Link to="/register">
                <Button
                  variant="contained"
                  color="primary"
                  className=" float-right mr-1"
                >
                  <span style={{ textTransform: "capitalize" }}>Add User</span>
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12" xs="12">
          <MaterialTable
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'User Name', field: 'username' },
              { title: 'Email', field: 'email' },
              { title: 'Organization', field: 'organization' },
              { title: 'Actions', field: 'actions' }
            ]}
            data={props.users.map((row) => ({
              name: row.person.name,
              username: row.userName,
              email: row.email,
              organization: row.organization.shortName,
              actions: (
              <>
                  <BSNavLink
                    id={`profile${row.id}`}
                    tag={NavLink}
                    to={`/profile/${row.id}`}
                    activeClassName="active"
                    exact={true}
                  >
                    <MdAccountCircle size="15" />{" "}
                    <span style={{ color: "#000" }}>View Profile  </span>
                  </BSNavLink>
                        <Button
                          variant="contained"
                          color="primary"
                          className=" float-right mr-1"
                          onClick={deleteUser}
                          id={row.id}
                          name={row.userName}
                        >
                          <span style={{ textTransform: "capitalize" }}>Delete User </span>
                        </Button>
              </>

              ),
            }))}
            title="Users"
          />
        </Col>
      </Row>
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
};

export default connect(mapStateToProps, mapActionToProps)(UsersPage);