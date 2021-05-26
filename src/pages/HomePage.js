import { connect } from "react-redux";
import React, { } from "react";
import Page from 'components/Page';
import {
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import { MdShowChart } from 'react-icons/md';
import { IconWidget } from 'components/Widget';
import { authentication } from '../_services/authentication';

const homeUserWidgets = [
  {
    url: '/upload-Template',
    title: 'Submit Data',
  },
  {
    url: '/submissions',
    title: 'View Submissions',
  },
  {
    url: '/download-Template',
    title: 'Downloads',
  },
]

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
              {(authentication.currentRole === 'Administrator') && (<Row>
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
              </Row>)}
              {(authentication.currentRole === 'User') && (<Row>
                {homeUserWidgets.map(({ url, title}, index) => (
                  <Col key={index} lg={4} md={6} sm={6} xs={12} className="mb-3">
                    <a href={url}>
                      <IconWidget
                        bgColor='light'
                        icon={MdShowChart}
                        title={title}
                        inverse={false}
                      />
                    </a>
                  </Col>
                )
                )}
              </Row>)}
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
