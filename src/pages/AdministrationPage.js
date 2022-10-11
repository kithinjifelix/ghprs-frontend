import { connect } from "react-redux";
import React from "react";
import Page from 'components/Page';
import {
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import { MdLocationCity, MdFace, MdLink } from 'react-icons/md';
import { IconWidget } from 'components/Widget';
import CardHeader from "reactstrap/lib/CardHeader";

const AdminPage = (props) => {

  return (
    <Page
      className="DashboardPage"
    >
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>Administration</CardHeader>
            <CardBody>
              <Row>
              Manage users and other system functions
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
            <Col lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardBody>
                  <Row>
                      <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
                        <a href="/organizations">
                          <IconWidget
                            bgColor='light'
                            icon={MdLocationCity}
                            title="Organizations"
                            inverse={false}
                          />
                        </a>
                      </Col>
                      <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
                        <a href="/users">
                          <IconWidget
                            bgColor='light'
                            icon={MdFace}
                            title="Users"
                            inverse={false}
                          />
                        </a>
                      </Col>
                      <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
                        <a href="/links">
                          <IconWidget
                            bgColor='light'
                            icon={MdLink}
                            title="Links"
                            inverse={false}
                          />
                        </a>
                      </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
      </Row>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    dashboards: state.links.dashboards,
  };
};

const mapActionToProps = {

};

export default connect(mapStateToProps, mapActionToProps)(AdminPage);
