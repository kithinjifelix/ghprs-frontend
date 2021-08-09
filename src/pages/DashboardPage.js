import { connect } from "react-redux";
import React, { } from "react";
import Page from 'components/Page';
import {
    Card,
    CardBody,
    CardHeader,
    CardText,
    Col,
    Row,
} from 'reactstrap';
import IframeResizer from 'iframe-resizer-react'
import { authentication } from '../_services/authentication';
var jwt = require("jsonwebtoken");

const DashboardPage = (props) => {

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const url = params.get('url');
    const key = params.get('key');
    const name = params.get('name');
    const number = parseInt(params.get('number'), 10);

    var METABASE_SITE_URL = url;
    var METABASE_SECRET_KEY = key;
    var filters = authentication.currentRole === 'User' ? { "partner": props.currentUser.organization.name } : {}
    var payload = {
        resource: { dashboard: number },
        params: filters,
        exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
    };
    let token = ''

    if (key) {
        token = jwt.sign(payload, METABASE_SECRET_KEY);
    }

    const iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=false&titled=true";

    return (
        <Page
            className="DashboardPage"
        >
            <Row>
                <Col xl={12} lg={12} md={12}>
                    <Card>
                        <CardHeader>
                            {name}
                        </CardHeader>
                        <CardBody>
                            The dashboards contain service delivery performance data as reported by the respective USAID implementing partners. The performance information contained in the dashboards is meant to gauge project performance, aid decision making and subsequently improve program design for better health outcomes. Consult the Data Portal User Guide for more information on the dashboards.
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg="12" md="12" sm="12" xs="12">
                    <Card>
                        <CardBody>
                            {(METABASE_SITE_URL) && (
                                <IframeResizer
                                    src={iframeUrl}
                                    style={{ width: '1px', minWidth: '100%' }}
                                />
                            )}
                            {!(METABASE_SITE_URL) && (
                                <Card>
                                    <CardHeader>
                                        404
                                </CardHeader>
                                    <CardBody>
                                        <CardText>
                                            Dashboard not available.
                                  </CardText>
                                    </CardBody>
                                </Card>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Page>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser,
    };
};

const mapActionToProps = {

};

export default connect(mapStateToProps, mapActionToProps)(DashboardPage);
