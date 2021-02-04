import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import Page from 'components/Page';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import * as ACTION_TYPES from "../actions/types";
import { lookup } from "../actions/lookups";
import { updateDataType, updateDataTypeInput, createWorkSheetTables, configure } from "../actions/template";
import { toast } from "react-toastify";

const DataTypePage = (props) => {

  const [loading] = useState(false);
  const [sheet, setSheet] = useState(0);
  const [columns, setColumns] = useState([]);
  const [dataIndex, setDataIndex] = useState(0);

  useEffect(() => {
    const { match: { params } } = props;
    if (params.id) {
      props.fetch(params.id);
    }
  }, []);

  useEffect(() => {
    props.fetchDataTypes("dataType", ACTION_TYPES.LOOKUP_DATA_TYPE);
  }, []);

  const getWorkSheetColumns = (index) => {
    setDataIndex(index);
    const c = props.workSheets[index].columns;
    setColumns(c);
  };

  useEffect(() => {
    if (props.workSheets.length > 0) {
      getWorkSheetColumns(0);
    }
  }, []);

  const fetchColumns = (index) => {
    setSheet(index);
    getWorkSheetColumns(index);
  };

  const handleInputChange = e => {
    const { name, value } = e.target
    let column = columns[name];
    column.type = value;
    props.updateInput(sheet, column);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const onSuccess = () => {
      toast.success("Updated Successfully");
    };
    const onError = () => {
      toast.error("Something went wrong");
    };

    props.update(props.workSheets[sheet].id, props.workSheets[sheet].columns, onSuccess, onError);
  };

  const handleFinish = event => {
    const onSuccess = () => {
      toast.success("Updated Successfully");
      props.history.push("/");
    };
    const onError = () => {
      toast.error("Something went wrong");
    };

    props.finish(props.workSheets, onSuccess, onError);
  };

  return (
    <Page
      className="DashboardPage"
      title="Template Configuration"
      breadcrumbs={[{ name: 'Dashboard', active: true }]}
    >
      {props.workSheets.length > 0 && (<Form onSubmit={handleSubmit}>
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Work Sheets</CardHeader>
              <CardBody>
                <ButtonGroup
                  style={{ margin: "10px" }}
                >
                  {props.workSheets.map(({ name }, index) => (
                    <Button
                      key={`Button-Worksheet-${index}`}
                      color="primary"
                      onClick={() => fetchColumns(index)}
                      active={sheet === index}
                    >
                      {name}
                    </Button>
                  ))}
                </ButtonGroup>
                <Button
                  style={{ margin: "10px" }}
                  onClick={() => handleFinish()}
                >
                  Finish
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Column Data Types</CardHeader>
              <CardBody>
                {!loading && (
                  <FormGroup>
                    {props.workSheets[dataIndex].columns.map(({ type, name }, index) => (
                      <Row key={`Row-${index}`} >
                        <Col md={4}>
                          <Label for={`ghprs-${index}`}>{name}</Label>
                        </Col>
                        <Col md={4}>
                          {props.dataTypes && (<Input
                            type="select"
                            name={index}
                            id={index}
                            placeholder="Select Type"
                            onChange={handleInputChange}
                            defaultValue={type}
                          >
                            <option value=""> </option>
                            {props.dataTypes.map(({ name, value }) => (
                              <option key={value} value={value}>
                                {name}
                              </option>
                            ))}
                          </Input>)}
                        </Col>
                        <Col md={4}></Col>
                      </Row>
                    ))}
                  </FormGroup>
                )}
                <Row>
                  <Col xl={12} lg={12} md={12}>
                    <Row form>
                      <Col md={12}>
                        <FormGroup check row>
                          <Col lg={{ size: 30, offset: 2 }}>
                            <Button>Update</Button>
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Form>)}
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    dataTypes: state.lookups.dataTypes,
    workSheets: state.templates.workSheets,
  };
};

const mapActionToProps = {
  fetch: configure,
  fetchDataTypes: lookup,
  update: updateDataType,
  updateInput: updateDataTypeInput,
  finish: createWorkSheetTables,
};

export default connect(mapStateToProps, mapActionToProps)(DataTypePage);
