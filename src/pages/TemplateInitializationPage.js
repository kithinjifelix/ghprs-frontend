import { connect } from 'react-redux';
import React, { useState } from 'react';
import Page from 'components/Page';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Label,
    Input,
    Form,
    FormGroup,
    FormText,
    Row,
} from 'reactstrap';
import { initialize } from "../actions/template";
import { toast } from "react-toastify";
import useForm from '../functions/UseForm';

const initializeTemplate = {
    name: '',
    description: '',
    file: '',
};

const TemplateInitializationPage = props => {
    const [file, setFile] = useState();

    const saveFile = e => {
        setFile(e.target.files[0]);
    };

    const { values, handleInputChange, resetForm } = useForm(initializeTemplate);

    const handleSubmit = event => {
        event.preventDefault();
        values.file = file;
        const onSuccess = () => {
            toast.success("Template Initialized");
            resetForm();
            props.history.push("/initialized");
        };
        const onError = () => {
            toast.error("Something went wrong");
        };
        props.initialize(values, onSuccess, onError);
    };

    return (
        <Page
            className="DashboardPage"
            title="Template"
            breadcrumbs={[{ name: 'Dashboard', active: true }]}
        >
            <Row>
                <Col lg="12" md="12" sm="12" xs="12">
                    <Card>
                        <CardHeader>Initialize Template</CardHeader>
                        <CardBody>
                            <Row>
                                <Col md={6}>
                                    <Form onSubmit={handleSubmit}>
                                        <FormGroup>
                                            <Label for="name">Name</Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                defaultValue={values.name}
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="description">Description</Label>
                                            <Input
                                                type="text"
                                                name="description"
                                                placeholder="Description"
                                                defaultValue={values.description}
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="excelFile">File</Label>
                                            <Input
                                                type="file"
                                                name="file"
                                                placeholder="File"
                                                defaultValue={values.file}
                                                onChange={saveFile}
                                            />
                                            <FormText color="muted">
                                                Upload filled out excel template
                                            </FormText>
                                        </FormGroup>
                                        <FormGroup check row>
                                            <Button>Save</Button>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Page>
    );
};

const mapStateToProps = state => {
    return {
        template: state.templates.template,
    };
};

const mapActionToProps = {
    initialize: initialize,
};

export default connect(
    mapStateToProps,
    mapActionToProps,
)(TemplateInitializationPage);
