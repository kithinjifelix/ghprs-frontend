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
var jwt = require("jsonwebtoken");

var METABASE_SITE_URL = "http://52.251.58.64:3000";
var METABASE_SECRET_KEY = "80334b54cc4c696b67e0d20c2bc461b9d867781b4234af3819030209cbde6751";

var payload = {
  resource: { dashboard: 9 },
  params: {},
  exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
};
var token = jwt.sign(payload, METABASE_SECRET_KEY);

var iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";

const HomePage = (props) => {

  return (
    <Page
      className="DashboardPage"
      title="Home"
      breadcrumbs={[{ name: 'Home', active: true }]}
    >
      <Row>
        <Col lg="12" md="12" sm="12" xs="12">
          <Card>
            <CardHeader>
              Home
            </CardHeader>
            <CardBody>
              <Iframe url={iframeUrl}
                width="100%"
                height="600px"
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

export default connect(mapStateToProps, mapActionToProps)(HomePage);
