import { connect } from "react-redux";
import React, { } from "react";
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
import useForm from "../functions/UseForm";

const uploadTemplate = {
    fileName: '',
    description: '',
};

const category = [
    { name: 'Category 1', id: 1},
    { name: 'Category 2', id: 2},
    { name: 'Category 3', id: 3},
  ];

const TemplateUploadPage = (props) => {

    const { values, handleInputChange } = useForm(
        uploadTemplate
    );

    const handleSubmit = event => {
        event.preventDefault();

        console.log(values);
        props.history.push("/uploaded");
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
                        <CardHeader>
                            Template Upload
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md={6}>
                                    <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                            <Label for="category">Category</Label>
                                            <Input
                                                type="select"
                                                name="category"
                                                id="category"
                                                placeholder="Category"
                                                value={values.category}
                                                onChange={handleInputChange}
                                            >
                                                <option value=""> </option>
                                                {category.map(({ name, id }) => (
                                                    <option key={id} value={id}>
                                                        {name}
                                                    </option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="excelFile">File</Label>
                                            <Input type="file" name="file" />
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
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapActionToProps = {

};

export default connect(mapStateToProps, mapActionToProps)(TemplateUploadPage);
