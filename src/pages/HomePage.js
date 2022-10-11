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
import CardHeader from "reactstrap/lib/CardHeader";

const HomePage = (props) => {

  return (
    <Page
      className="Home"
    >
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>Home</CardHeader>
            <CardBody>
              <Row>
                <p>The <b>USAID Tanzania Data Portal</b> contains data on USAID supported health activities as reported by the implementing partners. This includes data on maternal and child health, family planning and reproductive health, malaria, HIV/AIDS, and related treatment and care. This data is available in easy-to-use dashboards that can be exported or displayed in multiple formats.</p>
                <p>The portal also acts as a repository for all quarterly reports and manuscripts submitted by implementing partners. It also contains links to relevant resources published by USAID and other bilateral agencies.</p>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
            <Col lg="12" md="12" sm="12" xs="12">
              <Card color="primary">
                <CardHeader>Pinned Dashboards</CardHeader>
                <CardBody>
                  <Row>
                    {props.dashboards.map(({ url, name, number, key }, index) => (
                      <Col key={index} lg={4} md={6} sm={6} xs={12} className="mb-3">
                        <a href={`/dashboard?url=${url}&key=${key}&number=${number}&name=${name}`}>
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
