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

const initializeTemplate = {
    fileName: '',
    description: '',
};

const category = [
    { name: 'Category 1', id: 1},
    { name: 'Category 2', id: 2},
    { name: 'Category 3', id: 3},
  ];

const TemplateInitializationPage = (props) => {

    const { values, handleInputChange } = useForm(
        initializeTemplate
    );

    const handleSubmit = event => {
        event.preventDefault();

        console.log(values);
        props.history.push("/initialized");
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
                            Initialize Template
            </CardHeader>
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
                                                value={values.name}
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="description">Description</Label>
                                            <Input
                                                type="text"
                                                name="description"
                                                placeholder="Description"
                                                value={values.description}
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
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
                                        <FormGroup>
                                            <Label for="read">Sheets To Be Read</Label>
                                            <Input
                                                type="text"
                                                name="read"
                                                placeholder="Sheets To Be Read"
                                                value={values.read}
                                                onChange={handleInputChange}
                                            />
                                            <FormText color="muted">
                                                Separate with commas
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

export default connect(mapStateToProps, mapActionToProps)(TemplateInitializationPage);
