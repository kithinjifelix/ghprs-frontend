import { connect } from "react-redux";
import React from "react";
import Page from 'components/Page';
import {
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import { MdShowChart } from 'react-icons/md';
import { IconWidget } from 'components/Widget';

const HomePage = (props) => {

  return (
    <Page
      className="DashboardPage"
      title="Home"
    >
      <Row>
        <Col lg="12" md="12" sm="12" xs="12">
          <Card>
            <CardBody>
              <Row>
                {props.dashboards.map(({ url, name, number, key }, index) => (
                  <Col key={index} lg={4} md={6} sm={6} xs={12} className="mb-3">
                    <a href={`/dashboard?url=${url}&key=${key}&number=${number}`}>
                      <IconWidget
                        bgColor='light'
                        icon={MdShowChart}
                        title={name}
                        inverse={false}
                      />
                    </a>
                  </Col>
                )
                )}
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

export default connect(mapStateToProps, mapActionToProps)(HomePage);
