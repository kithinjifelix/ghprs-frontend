import { connect } from "react-redux";
import React from "react";
import Page from 'components/Page';
import {
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import CardHeader from "reactstrap/lib/CardHeader";

const ResourcesPage = (props) => {

  return (
    <Page
      className="DashboardPage"
    >
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>Resources</CardHeader>
            <CardBody>
              <Row>
                This is a listing of useful external resources.
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
              {props.links && props.links.map(({ url, name, key }, index) => (<div class="col-6">
                  <div key={`${key}-${index}`} class="list-group" id="list-tab" role="tablist">
                    <a class="list-group-item list-group-item-action" id={`list-${name}`} data-toggle="list" rel="noopener noreferrer" target="_blank" href={url} role="tab" aria-controls={name}>{name}</a>
                  </div>
                </div>))}
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
    links: state.links.external,
  };
};

const mapActionToProps = {

};

export default connect(mapStateToProps, mapActionToProps)(ResourcesPage);
