import { connect } from "react-redux";
import React, { useState } from "react";
import Page from 'components/Page';
import {
  Button,
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

const columns = [
  { columnName: 'date', type: 'VARCHAR' },
  { columnName: 'orgunit', type: 'VARCHAR' },
  { columnName: 'orgunituid', type: 'VARCHAR' },
  { columnName: 'mechanismid', type: 'VARCHAR' },
  { columnName: 'partner', type: 'VARCHAR' },
  { columnName: 'operatingunit', type: 'VARCHAR' },
  { columnName: 'psnu', type: 'VARCHAR' },
  { columnName: 'hts_tst.u15.f', type: 'VARCHAR' },
  { columnName: 'hts_tst.u15.m', type: 'VARCHAR' },
  { columnName: 'hts_tst.o15.f', type: 'VARCHAR' },
  { columnName: 'hts_tst.o15.m', type: 'VARCHAR' },
  { columnName: 'hts_tst_pos.u15.f', type: 'VARCHAR' },
];

const dataTypes = [
  { name: 'TEXT', value: 'VARCHAR' },
  { name: 'DATE', value: 'Date' },
  { name: 'NUMBER', value: 'NUMERIC' },
];

const InitializationSuccessPage = (props) => {
  const [loading] = useState(false);

  const handleInputChange = e => {

  };

  const handleSubmit = event => {
    event.preventDefault();
    props.history.push("/");
  };

  return (
    <Page
      className="DashboardPage"
      title="Template Configuration"
      breadcrumbs={[{ name: 'Dashboard', active: true }]}
    >
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Column Data Types</CardHeader>
              <CardBody>
                {!loading && (
                  <FormGroup>
                    {columns.map(({ type, columnName }, index) => (
                      <Row key={`Row-${index}`} >
                        <Col md={4}>
                          <Label for={`ghprs-${index}`}>{columnName}</Label>
                        </Col>
                        <Col md={4}>
                          <Input
                            type="select"
                            name="typeId"
                            id="typeId"
                            placeholder="Select Type"
                            onChange={handleInputChange}
                            defaultValue="VARCHAR"
                          >
                            <option value=""> </option>
                            {dataTypes.map(({ name, value }) => (
                              <option key={value} value={value}>
                                {name}
                              </option>
                            ))}
                          </Input>
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
                            <Button>Submit</Button>
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
      </Form>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapActionToProps = {

};

export default connect(mapStateToProps, mapActionToProps)(InitializationSuccessPage);
