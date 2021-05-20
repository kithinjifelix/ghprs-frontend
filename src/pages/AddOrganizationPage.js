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
    Input,
    Label,
    Row,
} from 'reactstrap';
import { register, getById } from "../actions/organizations";
import useForm from "../functions/UseForm";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../api";

let Title = '';

const addOrganization = {
    name: "",
    shortName: "",
    organizationType: 0,
    description: "",
};

let name="";
let shortname="";
let description="";
let orgId="";

const AddOrganizationPage = (props) => {

    const { values, handleInputChange, resetForm, setValues } = useForm(
        addOrganization
    );

    useEffect(() => {
        const { match: { params } } = props;
        if (params.id) {
            props.fetchOrganization(params.id);
            Title = 'Edit Organization';
        } else {
            Title = 'Add Organization';
        }
    }, []);

useEffect(()=>{
    const { match: { params } } = props;
    if(params.id){
        async function fetchData(){
            try{
              axios.get(`${url}organizations/`+params.id)
              .then((response) => {
                console.log("started");
                name=response.data.name;
                shortname=response.data.name;
                description=response.data.description;
                orgId=params.id;
                console.log(response.data);
                console.log("end");
              });
            }catch(e){
                console.log("error");
                console.error(e);
                console.log("error");
            }
        }
        fetchData();
    }

},[]);

useEffect(()=>{
    if(document.getElementById("name").value === "" && name !== ""  ){

        const profileValues = {
          name: name,
          description: description,
          shortName: shortname,
          id: orgId,
        };
        setValues(profileValues);
        document.getElementById("name").value=name;
        document.getElementById("shortname").value=shortname;
        document.getElementById("description").value=description;
        name="";
    }
})

    const handleSubmit = event => {
        event.preventDefault();
        const onSuccess = () => {
            toast.success("Organization Added Successfully");
            resetForm();
            console.log(props);
            props.history.push("/organizations");
        };
        const onError = () => {
            toast.error("Something went wrong");
        };
        props.add(values, onSuccess, onError);

    };

    return (
        <Page title={Title} breadcrumbs={[{ name: 'Add Organization', active: true }]}>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardHeader>Organization Details</CardHeader>
                            <CardBody>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="name">Name</Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Name"
                                                value={values.name}
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="shortName">Short Name</Label>
                                            <Input
                                                type="text"
                                                name="shortName"
                                                id="shortname"
                                                placeholder="Short Name"
                                                value={values.shortName}
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="description">Description</Label>
                                            <Input
                                                type="textarea"
                                                name="description"
                                                id="description"
                                                placeholder="Description"
                                                value={values.description}
                                                onChange={handleInputChange}
                                            />
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
        added: state.organizations.organization,
        organization: state.organizations.organization,
    };
};

const mapActionToProps = {
    add: register,
    fetchOrganization: getById,
};

export default connect(mapStateToProps, mapActionToProps)(AddOrganizationPage);
