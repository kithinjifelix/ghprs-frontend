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
import { add, getById } from "../actions/links";
import useForm from "../functions/UseForm";
import { toast } from "react-toastify";

const AddLinkPage = (props) => {
    const initialValues = {
        name: "",
        url: "",
        linkType: 0,
        number: 0,
        key: "",
    };

    const [title, setTitle] = useState('');
    const [edit, setEdit] = useState(false);

    const { values, handleInputChange, resetForm } = useForm(
        initialValues
    );

    useEffect(() => {
        const { match: { params } } = props;
        if (params.id) {
            const onSuccess = () => {
                console.log(props)
                
            };
            const onError = () => {
                toast.error("Something went wrong");
            };
            props.fetchLink(params.id, onSuccess, onError);
            setTitle('Edit Link');
            setEdit(true);
        } else {
            setTitle('Add Link');
        }
    }, []);

    const linkType = [
        { name: 'Dashboard', id: 0 },
        { name: 'Report', id: 1 },
        { name: 'Table', id: 2 },
        { name: 'External', id: 3 },
    ];


    const handleSubmit = event => {
        event.preventDefault();
        if (edit) {
            console.log(values);
        } else {
            const onSuccess = () => {
                toast.success("Link Added Successfully");
                resetForm();
                props.history.push("/links");
            };
            const onError = () => {
                toast.error("Something went wrong");
            };
            props.add(values, onSuccess, onError);
        }
    };

    return (
        <Page title={title}>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardHeader>Link Details</CardHeader>
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
                                            <Label for="url">URL *</Label>
                                            <Input
                                                type="text"
                                                name="url"
                                                placeholder="URL"
                                                value={values.url}
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="linkTypeId">Link Type *</Label>
                                            <Input
                                                type="select"
                                                name="linkType"
                                                id="linkType"
                                                placeholder="Select Link Type"
                                                value={values.linkType}
                                                onChange={handleInputChange}
                                            >
                                                <option value=""> </option>
                                                {linkType.map(({ name, id }) => (
                                                    <option key={id} value={id}>
                                                        {name}
                                                    </option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="number">Number</Label>
                                            <Input
                                                type="text"
                                                name="number"
                                                placeholder="Number"
                                                value={values.number}
                                                onChange={handleInputChange}
                                            />
                                            <FormText color="muted">
                                                Metabase Dashboard Number
                                            </FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="key">Key</Label>
                                            <Input
                                                type="text"
                                                name="key"
                                                placeholder="Key"
                                                value={values.phoneNumber}
                                                onChange={handleInputChange}
                                            />
                                            <FormText color="muted">
                                                Add key where needed for token generation
                                            </FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
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
        added: state.links.link,
        link: state.links.link,
    };
};

const mapActionToProps = {
    add: add,
    fetchLink: getById,
};

export default connect(mapStateToProps, mapActionToProps)(AddLinkPage);
