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
var jwt = require("jsonwebtoken");

const DashboardPage = (props) => {

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const url = params.get('url');
    const key = params.get('key');
    const number = parseInt(params.get('number'), 10);

    var METABASE_SITE_URL = url;
    var METABASE_SECRET_KEY = key;

    var payload = {
        resource: { dashboard: number },
        params: {},
        exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
    };
    let token = ''

    if (key) {
        token = jwt.sign(payload, METABASE_SECRET_KEY);
    }


    const iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";

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
                            Dashboard
                        </CardHeader>
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

    };
};

const mapActionToProps = {

};

export default connect(mapStateToProps, mapActionToProps)(DashboardPage);
