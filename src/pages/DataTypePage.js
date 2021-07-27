import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import Page from 'components/Page';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink as BSNavLink,
  Row,
} from 'reactstrap';
import * as ACTION_TYPES from "../actions/types";
import { lookup } from "../actions/lookups";
import { updateDataType, updateDataTypeInput, createWorkSheetTables, configure } from "../actions/template";
import { toast } from "react-toastify";
import PageSpinner from '../components/PageSpinner';
import classnames from 'classnames';

const DataTypePage = (props) => {
  let columns = [];
  const [sheet, setSheet] = useState(0);
  const [dataIndex, setDataIndex] = useState(0);
  const [loading, SetLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [configId, setConfigId] = useState(null);
  const [dataTypes, setDataTypes] = useState([]);

  useEffect(() => {
    const { match: { params } } = props;
    if (params.id) {
      props.fetch(params.id);
      setConfigId(params.id);
    }
  }, []);

  useEffect(() => {
    props.fetchDataTypes("dataType", ACTION_TYPES.LOOKUP_DATA_TYPE);
  }, []);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    if (props.workSheets.length > 0) {
      getWorkSheetColumns(0);
    }
  }, []);

  const getWorkSheetColumns = (index) => {
    const c = props.workSheets[index].columns;
    columns = c;
  };

  const fetchColumns = (index) => {
    setDataIndex(index);
    const onSuccess = () => {
      setSheet(index);
      getWorkSheetColumns(index);
    };
    const onError = () => {
      toast.error("Something went wrong");
    };
    props.fetch(configId, onSuccess, onError);
  };

  const handleInputChange = e => {
    const { name, value } = e.target
    let column = columns[name];
    if (column && column.type) {
      column.type = value;
      props.updateInput(sheet, column);
    } else {
      getWorkSheetColumns(dataIndex);
      column = columns[name];
      column.type = value;
      props.updateInput(sheet, column);
    }

  };

  const handleSubmit = event => {
    console.log(props.workSheets[sheet].columns);
    event.preventDefault();
    //SetLoading(true);
    const onSuccess = () => {
      SetLoading(false);
      toast.success("Updated Successfully");
    };
    const onError = () => {
      SetLoading(false);
      toast.error("Something went wrong");
    };

    // props.update(props.workSheets[sheet].id, props.workSheets[sheet].columns, onSuccess, onError);
  };

  const handleFinish = event => {
    SetLoading(true);
    const onSuccess = () => {
      toast.success("Tables Created Successfully");
      SetLoading(false);
      props.history.push("/download-Template");
    };
    const onError = () => {
      SetLoading(false);
      toast.error("Something went wrong");
    };
    props.finish(props.workSheets, onSuccess, onError);
  };

  return (
    <>
      <Page
        className="DashboardPage"
        hidden={loading}
      >
        {props.workSheets.length > 0 && (<Form onSubmit={handleSubmit}>
          <Row>
            <Col lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardHeader>
                  Template Configuration
                </CardHeader>
                <CardBody>
                  Cycle through all the tabs selecting the data types for the different fields then click on Update. When done with all the tabs and the data types are filled correctly click on Finish to complete the template configuration.
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="12" md="12" sm="12" xs="12">
              <Nav tabs>
                {props.workSheets.map(({ name }, index) => (
                  <NavItem key={`nav-Worksheet-${index}`} className="nav-tab-details">
                    <BSNavLink
                      id="nav-details"
                      className={classnames({ active: activeTab === index })}
                      onClick={() => { toggle(index); fetchColumns(index); }}
                    >
                      {name}
                    </BSNavLink>
                  </NavItem>
                ))}
              </Nav>
              <Card>
                <CardHeader>
                  Column Data Types
                  <Button
                    className=" float-right mr-1"
                    onClick={() => handleFinish()}
                  >
                  Finish
                </Button>
                </CardHeader>
                <CardBody>
                  <CardTitle>
                    <Row>
                      <Col md={6}>
                        <Label><b>Column</b></Label>
                      </Col>
                      <Col md={6}>
                        <Label><b>Data Type</b></Label>
                      </Col>
                    </Row>
                  </CardTitle>
                  {!loading && (
                    <FormGroup>
                      {props.workSheets[dataIndex].columns.map(({ type, name }, index) => (
                        <Row key={`Row-${index}`} >
                          <Col md={6}>
                            <Label for={`ghprs-${index}`}>{name}</Label>
                          </Col>
                          <Col md={6}>
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
      {(loading) && <PageSpinner />}
    </>
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
