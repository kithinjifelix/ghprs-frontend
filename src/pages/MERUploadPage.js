import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import Page from '../components/Page';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap';
import { uploadMERData } from '../actions/upload';
import PageSpinner from '../components/PageSpinner';
import useForm from '../functions/UseForm';
import { toast } from 'react-toastify';

const uploadTemplate = {
  file: '',
  currentUser: '',
  uploadTypeId: 0
};

const MERUploadPage = (props) => {
  const [file, setFile] = useState();
  const [loading, SetLoading] = useState(false);
  const [fileType, setFileType] = useState(".txt");
  const saveFile = e => {
    setFile(e.target.files[0]);
  };

  const typeOfUploadChange = e => {
    if (e.target.value) {
      if (Number(e.target.value) === 1) {
        setFileType(".txt");
        uploadTemplate.uploadTypeId = 1;
      } else if (Number(e.target.value) === 2) {
        setFileType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel");
        uploadTemplate.uploadTypeId = 2;
      }
    }
  };

  const { values, handleInputChange, resetForm } = useForm(
    uploadTemplate
  );

  const handleSubmit = event => {
    SetLoading(true);
    event.preventDefault();
    values.file = file;

    const onSuccess = () => {
      toast.success("Template uploaded successfully");
      resetForm();
      SetLoading(false);
      props.history.push("/files-upload");
    };
    const onError = () => {
      toast.error("Something went wrong");
      SetLoading(false);
    };
    props.uploadMERData(values, onSuccess, onError);
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
              <CardHeader>Submit</CardHeader>
              <CardBody>
                Upload a MER data file
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Card>
              <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                        <Label for="">Upload Type</Label>
                        <Input
                          type="select"
                          name="uploadTypeId"
                          id="uploadTypeId"
                          placeholder="Upload Type"
                          onChange={typeOfUploadChange}>
                            <option value=""></option>
                            <option key="1" value="1">MER DATA UPLOAD</option>
                            <option key="2" value="2">FACILITY & COMMUNITY DATA UPLOAD</option>
                        </Input>
                      </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="excelFile">File</Label>
                      <Input
                        type="file"
                        name="file"
                        placeholder="File"
                        onChange={saveFile}
                        accept={fileType}
                      />
                      <FormText color="muted">
                        Upload a MER data file
                      </FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label>&nbsp;</Label>
                      <Button>Upload</Button>
                    </FormGroup>
                  </Col>
                </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
      {(loading) &&<PageSpinner />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    uploadMERData: state.uploads.uploadMERData,
    currentUser: state.users.currentUser
  };
};

const mapActionToProps = {
  uploadMERData: uploadMERData
};

export default connect(mapStateToProps, mapActionToProps)(MERUploadPage);
