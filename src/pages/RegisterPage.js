import Page from 'components/Page';
import { connect } from "react-redux";
import React, { useEffect } from "react";
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
import * as ACTION_TYPES from "../actions/types";
import { lookup } from "../actions/lookups";
import { fetchAll } from "../actions/organizations";
import { register, getById } from "../actions/users";
import useForm from "../functions/UseForm";
import { toast } from "react-toastify";

let Title = '';
const userRegistration = {
  password: "",
  email: "",
  phoneNumber: "",
  roleId: 0,
  organizationId: 1,
  name: "",
};

const RegisterPage = (props) => {

  const { values, handleInputChange, resetForm } = useForm(
    userRegistration
  );

  useEffect(() => {
    const { match: { params } } = props;
    if (params.id) {
      const onSuccess = () => {
        toast.success("User Loaded");
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
    props.fetchMaritalStatus(
      "maritalStatus",
      ACTION_TYPES.LOOKUP_MARITAL_STATUS,
    );
  }, []);

  const role = [
    { name: 'Administrator', id: 0 },
    { name: 'User', id: 1 },
  ];


  const handleSubmit = event => {
    event.preventDefault();
    const onSuccess = () => {
      toast.success("User registered Successfully");
      resetForm();
      props.history.push("/users");
    };
    const onError = () => {
      toast.error("Something went wrong");
    };
    props.register(values, onSuccess, onError);

  };

  return (
    <Page title={Title} breadcrumbs={[{ name: 'User', active: true }]}>
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
                        placeholder="Name"
                        value={values.name}
                        onChange={handleInputChange}
                      />
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
                        onChange={handleInputChange}
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
                      <Label for="email">Email *</Label>
                      <Input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={values.email}
                        onChange={handleInputChange}
                      />
                      <FormText color="muted">
                        Must be a valid email address format 'example@email.com'
                      </FormText>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="password">Password *</Label>
                      <Input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={values.password}
                        onChange={handleInputChange}
                      />
                      <FormText color="muted">
                        Passwords must be at least 6 characters. Passwords must have at least one digit ('0'-'9'). Passwords must have at least one lowercase ('a'-'z'). Passwords must have at least one uppercase ('A'-'Z').
                      </FormText>
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
                        onChange={handleInputChange}
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
