import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import Page from '../components/Page';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap';
import { authentication } from '../_services/authentication';
import { uploadMERData } from '../actions/upload';
import PageSpinner from '../components/PageSpinner';
import useForm from '../functions/UseForm';
import { toast } from 'react-toastify';

const uploadTemplate = {
  file: '',
  templateId: 0,
  currentUser: '',
  startDate: '',
  endDate: '',
  organizationId: 0
};

const MERUploadPage = (props) => {
  const [file, setFile] = useState();
  const [loading, SetLoading] = useState(false);
  const saveFile = e => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {

  }, []);

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
                <Row>
                  <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label for="excelFile">File</Label>
                        <Input
                          type="file"
                          name="file"
                          placeholder="File"
                          defaultValue={values.file}
                          onChange={saveFile}
                          accept=".txt"
                        />
                        <FormText color="muted">
                          Upload a MER data file
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
