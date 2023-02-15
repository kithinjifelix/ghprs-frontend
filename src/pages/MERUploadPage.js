import { connect } from "react-redux";
import React, { useCallback, useEffect, useState } from 'react';
import Page from '../components/Page';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form, FormGroup, Input, Label, Modal,
  ModalBody, ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import { uploadMERData, ProcessBlob } from '../actions/upload';
import { HubConnectionBuilder } from "@microsoft/signalr";
import MaterialTable from 'material-table';
import { FcProcess } from 'react-icons/fc';
import { toast } from 'react-toastify';
import useForm from '../functions/UseForm';
import { hubUrl } from '../api';

const processForm = {
  fileType: ''
};

const MERUploadPage = (props) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState();
  const [progress, setProgress] = useState(new Map());
  const { values, handleInputChange, resetForm } = useForm(
    processForm
  );


  const loadConnection = useCallback(async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(`${hubUrl}progressHub`, { withCredentials: false })
        .withAutomaticReconnect()
        .build();
      connection
        .start()
        .then(() => {
          connection.on("Progress", (value) => {
            setProgress((prevList) => {
              console.log(value);
              const nextMap = new Map(prevList);
              nextMap.set(value.name, value.value);
              return nextMap;
            });
          });
        })
        .catch((error) => console.log(error));
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    props.fetchMerFiles();
    loadConnection();
  }, [loadConnection]);

  const toggleProcess = (name) => {
    setName(name);
    setModal(!modal);
  };

  const handleProcess = event => {
    event.preventDefault();
    const onSuccess = () => {
      toast.success("Successfully Submitted For Processing");
      resetForm();
    };
    const onError = () => {
      toast.error("Something went wrong");
    };
    console.log(values);
    props.ProcessBlob(name, values, onSuccess, onError);
  };

  function getProgress(map1, name) {
    console.log(map1);
    if (map1 && map1.get(name)) {
      return map1.get(name);
    }
  }

  return (
    <>
      <Page className="DashboardPage">
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardHeader>Submit</CardHeader>
              <CardBody>
                List MER and PLHIV data file
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Card>
              <CardBody>
                <MaterialTable
                  columns={[
                    {
                      headerName: 'Name',
                      field: 'name',
                      render: (params) => (
                        <>
                          {params.name} {getProgress(progress, params.name) ? "  progress: " + getProgress(progress, params.name): ""}
                        </>
                      ),
                    },
                    { title: 'Action', field: 'actions' },
                  ]}
                  data={props.merfiles.length > 0 ? props.merfiles.map((row) => ({
                    name: row,
                    actions: (
                      <div>
                        <Button
                          size="sm"
                          color="link"
                          onClick={() => toggleProcess(row)}
                        >
                          <FcProcess size="15" />{" "}
                          <span style={{ color: "#000" }}>Process</span>
                        </Button>
                      </div>
                    ),
                  })) : []}
                  title="Data Submissions"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} backdrop={true}>
          <Form onSubmit={handleProcess}>
            <ModalHeader>Process</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="fileType">File Type</Label>
                <Input
                  type="select"
                  name="fileType"
                  id="fileType"
                  placeholder="File Type"
                  value={values.fileType}
                  onChange={handleInputChange}
                >
                  <option value=""> </option>
                  <option value="1">MER</option>
                  <option value="2">PLHIV</option>
                </Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                onClick={() => toggleProcess(name)}
              >
                Save
              </Button>
              <Button
                onClick={() => toggleProcess(name)}
              >
                <span style={{ textTransform: "capitalize" }}>
                  Cancel
                      </span>
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Page>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    merfiles: state.uploads.merfiles,
  };
};

const mapActionToProps = {
  fetchMerFiles: uploadMERData,
  ProcessBlob: ProcessBlob,
};

export default connect(mapStateToProps, mapActionToProps)(MERUploadPage);
