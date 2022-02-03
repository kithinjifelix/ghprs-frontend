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
import { Link } from 'react-router-dom';
import { MdArrowBack } from "react-icons/md";
import { add, getById, edit } from "../actions/links";
import useForm from "../functions/UseForm";
import { toast } from "react-toastify";
import PageSpinner from '../components/PageSpinner';
import axios from "axios";
import { url } from "../api";

const AddLinkPage = (props) => {
    const initialValues = {
        name: "",
        url: "",
        linkType: 0,
        number: 0,
        key: "",
        description: "",
    };

    const [title, setTitle] = useState('');
    const [edit, setEdit] = useState(false);
    const [loading, SetLoading] = useState(false);

    const { values, handleInputChange, resetForm, setValues } = useForm(
        initialValues
    );

    useEffect(() => {
        const { match: { params } } = props;
        if (params.id) {
            const fetchLink = async () => {
                try {
                    const response = await axios.get(`${url}links/` + params.id);
                    if (response.status == 200) {
                        const linksValues = {
                            createdAt: response.data.createdAt,
                            description: response.data.description,
                            id: response.data.id,
                            key: response.data.key,
                            linkType: response.data.linkType,
                            name: response.data.name,
                            number: response.data.number,
                            updatedAt: response.data.updatedAt,
                            url: response.data.url
                        };
                        setValues(linksValues);
                    }
                } catch (e) {
                    toast.error("Something went wrong");
                }
            };
            fetchLink();
            const onSuccess = () => {
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
        SetLoading(true);
        if (edit) {
            const onSuccess = () => {
                SetLoading(false);
                toast.success("Link Updated Successfully");
                resetForm();
                props.history.push("/links");
            };
            const onError = () => {
                SetLoading(false);
                toast.error("Something went wrong");
            };
            props.edit(values.id, values, onSuccess, onError);
        } else {
            const onSuccess = () => {
                SetLoading(false);
                toast.success("Link Added Successfully");
                resetForm();
                props.history.push("/links");
            };
            const onError = () => {
                SetLoading(false);
                toast.error("Something went wrong");
            };
            props.add(values, onSuccess, onError);
        }
    };

    return (
        <>
            <Page
                hidden={loading}
            >
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xl={12} lg={12} md={12}>
                            <Card>
                                <CardHeader>{title} <Link to="/links">
                                    <Button
                                        variant="contained"
                                        color="link"
                                        className=" float-right mr-1"
                                    >
                                        <MdArrowBack size="15" />{" "}
                                        <span style={{ textTransform: "capitalize" }}>Back</span>
                                    </Button>
                                </Link></CardHeader>
                                <CardBody>
                                    Fill details to {title}.
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12} lg={12} md={12}>
                            <Card>
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
                                                <Label for="name">Description</Label>
                                                <Input
                                                    type="text"
                                                    name="description"
                                                    placeholder="Description"
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
                                                    value={values.key}
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
            {(loading) && <PageSpinner />}
        </>
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
    edit: edit,
    fetchLink: getById,
};

export default connect(mapStateToProps, mapActionToProps)(AddLinkPage);
