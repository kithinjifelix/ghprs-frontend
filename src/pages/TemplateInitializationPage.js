import { connect } from 'react-redux';
import React, { useState } from 'react';
import Page from 'components/Page';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Col,
    Label,
    Input,
    Form,
    FormGroup,
    FormText,
    Row,
} from 'reactstrap';
import { exists, initialize } from "../actions/template";
import { toast } from "react-toastify";
import useForm from '../functions/UseForm';
import PageSpinner from '../components/PageSpinner';

const initializeTemplate = {
    name: '',
    description: '',
    version: 1,
    frequency: 0,
    file: '',
};

const TemplateInitializationPage = props => {
    const [file, setFile] = useState();
    const [loading, SetLoading] = useState(false);
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

    const handleNameChange = e => {
        handleInputChange(e);
        props.exists(e.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        SetLoading(true);
        values.file = file;
        const onSuccess = () => {
            SetLoading(false);
            toast.success("Template Initialized");
            resetForm();
            props.history.push("/configure");
        };
        const onError = () => {
            //SetLoading(false);
            toast.error("Something went wrong");
        };
        props.initialize(values, onSuccess, onError);
    };

    return (
        <>
            <Page
                className="DashboardPage"
                hidden={loading}
            >
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                        <CardHeader>
                            Initialize
                        </CardHeader>
                            <CardBody>
                                Create new templates to allow data upload
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" md="12" sm="12" xs="12">
                        <Card>
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
                                                    onChange={handleNameChange}
                                                />
                                                <FormText color="muted">
                                                    {props.version.item1 ? `Template version ${props.version.item2} exists. Version ${props.version.item2 + 1} will be created` : `Version : ${props.version.item2 ? props.version.item2 : 1}`}
                                                </FormText>
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
                                                Upload filled-out Excel template.
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
            {(loading) && <PageSpinner />}
        </>
    );
};

const mapStateToProps = state => {
    return {
        template: state.templates.template,
        version: state.templates.exists,
    };
};

const mapActionToProps = {
    initialize: initialize,
    exists: exists,

};

export default connect(
    mapStateToProps,
    mapActionToProps,
)(TemplateInitializationPage);
