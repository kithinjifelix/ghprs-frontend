import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Page from 'components/Page';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Nav,
    NavItem,
    NavLink as BSNavLink,
    Row,
    Table,
} from 'reactstrap';
import { viewById } from "../actions/upload";
import PageSpinner from '../components/PageSpinner';
import classnames from 'classnames';

const ReviewDetailsPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [dataIndex, setDataIndex] = useState(0);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        setLoading(true);
        const { match: { params } } = props;
        props.fetchUpload(params.id);
    }, []);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
      };

    const fetchWorkSheets = (index) => {
        setDataIndex(index);
    };

    if (props.data.length > 0) {
        if (loading) {
            setLoading(false);
        }
    };

    return (
        <>
            <Page
                className="DashboardPage"
                hidden={loading}
            >
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardHeader>
                                Upload Details
                            <Link to="/review">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className=" float-right mr-1"
                                    >
                                        <span style={{ textTransform: "capitalize" }}>Back</span>
                                    </Button>
                                </Link>
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>
                {!loading && (<Row>
                    <Col lg="12" md="12" sm="12" xs="12">
                        <Card>
                            <CardHeader>Data</CardHeader>
                            <CardBody>
                                <Nav tabs>
                                    {props.data.map(({ workSheet }, index) => (
                                        <NavItem key={`nav-Worksheet-${index}`} className="nav-tab-details">
                                        <BSNavLink
                                            id="nav-details"
                                            className={classnames({ active: activeTab === index })}
                                            onClick={() => { toggle(index); fetchWorkSheets(index); }}
                                        >
                                            {workSheet}
                                    </BSNavLink>
                                    </NavItem>
                                    ))}
                                </Nav>
                                <Table bordered responsive>
                                    <thead>
                                        <tr>{props.data.length > 0 && props.data[dataIndex] && props.data[dataIndex].data[0] && (Object.keys(props.data[dataIndex].data[0]).map(col => <th key={`header-${col}`}>{col}</th>))}</tr>
                                    </thead>
                                    <tbody>
                                        {props.data.length > 0 && (Object.values(props.data[dataIndex].data).map((row, index) =>
                                            <tr key={`${row[index]}-${index}`}>
                                                {Object.entries(row).map(([key, value]) => <td key={`${key}`}>{value}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>)}
            </Page>
            {(loading) && <PageSpinner />}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        data: state.uploads.view
    };
};

const mapActionToProps = {
    fetchUpload: viewById

};

export default connect(mapStateToProps, mapActionToProps)(ReviewDetailsPage);
