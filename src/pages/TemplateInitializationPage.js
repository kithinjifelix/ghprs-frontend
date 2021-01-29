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
    version: 1,
    frequency: 0,
    file: '',
};

const TemplateInitializationPage = props => {
    const [file, setFile] = useState();

    const saveFile = e => {
        setFile(e.target.files[0]);
    };

    const frequency = [
        { name: 'Weekly', id: 0 },
        { name: 'Monthly', id: 1 },
        { name: 'Quarterly', id: 2 },
        { name: 'Yearly', id: 3 },
        { name: 'Adhoc', id: 4 },
    ];

    const { values, handleInputChange, resetForm } = useForm(initializeTemplate);

    const handleSubmit = event => {
        event.preventDefault();
        values.file = file;
        const onSuccess = () => {
            toast.success("Template Initialized");
            resetForm();
            props.history.push("/data-types");
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
                                            <Label for="version">Version</Label>
                                            <Input
                                                type="number"
                                                name="version"
                                                placeholder="Version"
                                                defaultValue={values.version}
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="frequency">Frequency</Label>
                                            <Input
                                                type="select"
                                                name="frequency"
                                                id="frequency"
                                                placeholder="Select Frequency"
                                                value={values.frequency}
                                                onChange={handleInputChange}
                                            >
                                                <option value=""> </option>
                                                {frequency.map(({ name, id }) => (
                                                    <option key={id} value={id}>
                                                        {name}
                                                    </option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="excelFile">File</Label>
                                            <Input
                                                type="file"
                                                name="file"
                                                placeholder="File"
                                                defaultValue={values.file}
                                                onChange={saveFile}
                                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
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
