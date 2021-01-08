import { connect } from "react-redux";
import React, { } from "react";
import Page from 'components/Page';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import Iframe from 'react-iframe'

const DashboardPage = (props) => {

  return (
    <Page
      className="DashboardPage"
      title="Dashboard"
      breadcrumbs={[{ name: 'Dashboard', active: true }]}
    >
      <Row>
        <Col lg="12" md="12" sm="12" xs="12">
          <Card>
            <CardHeader>
              Dashboards
            </CardHeader>
            <CardBody>
              <Iframe url="http://52.251.58.64:3000/browse/3"
                width="100%"
                height="100%"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative" />
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

export default connect(mapStateToProps, mapActionToProps)(DashboardPage);
