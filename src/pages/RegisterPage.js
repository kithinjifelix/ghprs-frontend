import Page from 'components/Page';
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { url } from "../api";
import * as ACTION_TYPES from "../actions/types";
import { lookup } from "../actions/lookups";
import { fetchAll } from "../actions/organizations";
import { register, getById } from "../actions/users";
import useForm from "../functions/UseForm";
import { toast } from "react-toastify";
import axios from "axios";
import PageSpinner from '../components/PageSpinner';

let Title = '';
const userRegistration = {
  password: "",
  email: "",
  phoneNumber: "",
  roleId: 0,
  organizationId: 1,
  name: "",
};

let name = "";
let email = "";
let organizationId = "";


const RegisterPage = (props) => {

  const { values, resetForm, setValues } = useForm(
    userRegistration
  );

  const [loading, SetLoading] = useState(false);

  useEffect(() => {
    const { match: { params } } = props;
    if (params.id) {
      const onSuccess = () => {
        toast.success("User Loaded");
        const profileValues = {
          password: "",
          email: "",
          phoneNumber: "",
          roleId: 0,
          organizationId: 1,
          name: "",
        };
        setValues(profileValues);
      };
      const onError = () => {
        toast.error("Could not fetch user");
      };
      props.fetchUser(params.id, onSuccess, onError);

      Title = 'Profile';
    } else {
      Title = 'Register';
    }
  }, []);

  useEffect(() => {
    props.fetchGenders("gender", ACTION_TYPES.LOOKUP_GENDER);
  }, []);

  useEffect(() => {
    props.getOrganizations();
  }, []);


  useEffect(() => {
    const { match: { params } } = props;
    if (params.id) {
      async function fetchData() {
        try {
          axios.get(`${url}users/` + params.id)
            .then((response) => {
              email = response.data.email;
              name = response.data.person.name;
              organizationId = response.data.organization.id;
            });
        } catch (e) {
          console.error(e);
        }
      }
      fetchData();
    }

  }, []);

  useEffect(() => {
    if (document.getElementById("email").value === "" && email !== "") {

      const profileValues = {
        password: "",
        email: email,
        roleId: 0,
        organizationId: organizationId,
        name: name
      };
      setValues(profileValues);
      document.getElementById("name").value = name;
      document.getElementById("email").value = email;
      document.getElementById("organizationId").value = organizationId;
      document.getElementById('email').setAttribute("disabled", "disabled");
      email = "";
    }
  })


  useEffect(() => {
    props.fetchMaritalStatus(
      "maritalStatus",
      ACTION_TYPES.LOOKUP_MARITAL_STATUS,
    );
  }, []);



  const role = [
    { name: 'Administrator', id: 0 },
    { name: 'User', id: 1 },
  ];

  function inputChange(e) {
    const profileValues = {
      password: document.getElementById("password").value,
      email: document.getElementById("email").value,
      roleId: document.getElementById("roleId").value,
      organizationId: document.getElementById("organizationId").value,
      name: document.getElementById("name").value
    };
    setValues(profileValues);
  }

  const handleSubmit = event => {
    event.preventDefault();
    SetLoading(true);
    const onSuccess = () => {
      SetLoading(false);
      toast.success("User registered Successfully");
      resetForm();
      props.history.push("/users");
    };
    const onError = () => {
      SetLoading(false);
      toast.error("Something went wrong");
    };
    props.register(values, onSuccess, onError);

  };


  return (
    <>
      <Page title={Title} hidden={loading}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xl={12} lg={12} md={12}>
              <Card>
                <CardHeader>User Details</CardHeader>
                <CardBody>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="name">Name *</Label>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Name"
                          //pattern="[A-Za-z]{3}"
                          onChange={inputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="organizationId">Organization *</Label>
                        <Input
                          type="select"
                          name="organizationId"
                          id="organizationId"
                          placeholder="Select Organization"
                          value={values.organizationId}
                          onChange={inputChange}
                        >
                          <option value=""> </option>
                          {props.organizations.map(({ name, id }) => (
                            <option key={id} value={id}>
                              {name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          type="text"
                          name="email"
                          id="email"
                          placeholder="email"
                          onChange={inputChange}
                        />
                        <FormText color="muted">
                          Must be a valid email address format 'example@email.com'.
                      </FormText>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="password">Password *</Label>
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="password"
                          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$"
                          onChange={inputChange}
                        />
                        <FormText color="muted">
                          Passwords must be at least 6 characters. Passwords must have at least one digit ('0'-'9'). Passwords must have at least one lowercase ('a'-'z'). Passwords must have at least one uppercase ('A'-'Z'). Passwords must have at least one special character ("*.!@#$%^&(){ }[]:,.?/~_+-=|\")
                      </FormText>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="roleId">Role *</Label>
                        <Input
                          type="select"
                          name="roleId"
                          id="roleId"
                          placeholder="Select Role"
                          value={values.roleId}
                          onChange={inputChange}
                        >
                          <option value=""> </option>
                          {role.map(({ name, id }) => (
                            <option key={id} value={id}>
                              {name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label></Label>
                        <FormText color="muted">
                          * Required Fields
                      </FormText>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={12} lg={12} md={12}>
              <Row form>
                <Col md={6}>
                  <FormGroup check row>
                    <Col lg={{ size: 30, offset: 2 }}>
                      <Button onClick={resetForm}>Cancel</Button>
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup check row>
                    <Col lg={{ size: 30, offset: 2 }}>
                      <Button>Submit</Button>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Page>
      {(loading) && <PageSpinner />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    registred: state.users.registred,
    user: state.users.user,
    gender: state.lookups.genders,
    organizations: state.organizations.list,
    maritalStatus: state.lookups.maritalStatuses,
  };
};

const mapActionToProps = {
  register: register,
  fetchGenders: lookup,
  fetchMaritalStatus: lookup,
  fetchUser: getById,
  getOrganizations: fetchAll,
};

export default connect(mapStateToProps, mapActionToProps)(RegisterPage);
