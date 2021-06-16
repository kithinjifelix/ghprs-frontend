import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
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
import { upload } from "../actions/upload";
import { fetchAll } from "../actions/template";
import { toast } from "react-toastify";
import { authentication } from '../_services/authentication';
import useForm from '../functions/UseForm';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import PageSpinner from '../components/PageSpinner'

const uploadTemplate = {
    file: '',
    templateId: 0,
    currentUser: '',
    startDate: '',
    endDate: '',
};

const TemplateUploadPage = (props) => {

    const [file, setFile] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [loading, SetLoading] = useState(false);
    const saveFile = e => {
        setFile(e.target.files[0]);
    };

    const handleCallback = (start, end) => {
        setStartDate(start.format('YYYY-MM-DD'))
        setEndDate(end.format('YYYY-MM-DD'));
    }

    useEffect(() => {
        props.fetchTemplates();
    }, []);

    const { values, handleInputChange, resetForm } = useForm(
        uploadTemplate
    );

    const handleSubmit = event => {
        SetLoading(true);
        event.preventDefault();
        values.file = file;

        values.startDate = startDate ? startDate: '0001-JAN-01';
        values.endDate = endDate ? endDate : '0001-JAN-01';
        values.currentUser = authentication.currentUsername
        const onSuccess = () => {
            toast.success("Template uploaded successfully");
            resetForm();
            SetLoading(false);
            props.history.push("/submissions");
        };
        const onError = () => {
            toast.error("Something went wrong");
            SetLoading(false);
        };
        props.upload(values, onSuccess, onError);
    };

    return (
        <>
        <Page
            className="DashboardPage"
            title="Upload Template"
            hidden={loading}
        >
            <Row>
                <Col lg="12" md="12" sm="12" xs="12">
                    <Card>
                        <CardHeader>
                            Template Upload
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md={6}>
                                    <Form onSubmit={handleSubmit}>
                                        <FormGroup>
                                            <Label for="templateId">Template</Label>
                                            <Input
                                                type="select"
                                                name="templateId"
                                                id="templateId"
                                                placeholder="Template"
                                                value={values.template}
                                                onChange={handleInputChange}
                                            >
                                                <option value=""> </option>
                                                {props.templates.map(({ name, id }) => (
                                                    <option key={id} value={id}>
                                                        {name}
                                                    </option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="period">Period</Label>
                                            <DateRangePicker
                                                initialSettings={{ startDate: new Date(), endDate: new Date() }}
                                                onCallback={handleCallback}
                                            >
                                                <input type="text" className="form-control" />
                                            </DateRangePicker>
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
        {(loading) &&<PageSpinner />}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        upload: state.uploads.upload,
        templates: state.templates.list
    };
};

const mapActionToProps = {
    upload: upload,
    fetchTemplates: fetchAll,
};

export default connect(mapStateToProps, mapActionToProps)(TemplateUploadPage);
