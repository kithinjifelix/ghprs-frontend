import { connect } from "react-redux";
import React, { useEffect } from "react";
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
import { getByNumber } from "../actions/links";
import PageSpinner from '../components/PageSpinner';
var jwt = require("jsonwebtoken");

const DashboardPage = (props) => {

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const url = params.get('url');
    const key = params.get('key');
    const name = params.get('name');
    const number = parseInt(params.get('number'), 10);

    useEffect(() => {
        props.getDashboard(number);
      }, []);
    
    const getIframeUrl = () => {
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
    
        return METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=false&titled=true";
    };

    return (
        <>
        {(props.currentUser.organization) && <Page
            className="DashboardPage"
        >
            <Row>
                <Col xl={12} lg={12} md={12}>
                    <Card>
                        <CardHeader>
                            {name}
                        </CardHeader>
                        <CardBody>
                            {props.dashboard.description}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg="12" md="12" sm="12" xs="12">
                    <Card>
                        <CardBody>
                            {(url) && (
                                <IframeResizer
                                    src={getIframeUrl()}
                                    style={{ width: '1px', minWidth: '100%' }}
                                />
                            )}
                            {!(url) && (
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
        </Page>}
        {(!props.currentUser.organization) && <PageSpinner />}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser,
        dashboard: state.links.dashboard
    };
};

const mapActionToProps = {
    getDashboard : getByNumber
};

export default connect(mapStateToProps, mapActionToProps)(DashboardPage);
