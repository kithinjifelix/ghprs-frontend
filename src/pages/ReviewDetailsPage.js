import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Page from 'components/Page';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Table,
} from 'reactstrap';
import { viewById } from "../actions/upload";
import PageSpinner from '../components/PageSpinner';

const ReviewDetailsPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [dataIndex, setDataIndex] = useState(0);
    const [sheet, setSheet] = useState(0);


    useEffect(() => {
        setLoading(true);
        const { match: { params } } = props;
        props.fetchUpload(params.id);
    }, []);

    const fetchWorkSheets = (index) => {
        setSheet(index);
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
                title="Upload Details"
                hidden={loading}
            >
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardBody>
                                <Link to="/review">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className=" float-right mr-1"
                                    >
                                        <span style={{ textTransform: "capitalize" }}>Go Back</span>
                                    </Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {!loading && (<Row>
                    <Col lg="12" md="12" sm="12" xs="12">
                        <Card>
                            <CardHeader>Work Sheets</CardHeader>
                            <CardBody>
                                <ButtonGroup>
                                    {props.data.map(({ workSheet }, index) => (
                                        <Button
                                            key={`Button-Worksheet-${index}`}
                                            color="primary"
                                            onClick={() => fetchWorkSheets(index)}
                                            active={sheet === index}
                                        >
                                            {workSheet}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>)}
                {!loading && (<Row>
                    <Col lg="12" md="12" sm="12" xs="12">
                        <Card>
                            <CardHeader>Data</CardHeader>
                            <CardBody>
                                <Table bordered responsive>
                                    <thead>
                                        <tr>{props.data.length > 0 && (Object.keys(props.data[dataIndex].data[0]).map(col => <th key={`header-${col}`}>{col}</th>))}</tr>
                                    </thead>
                                    <tbody>
                                        {props.data.length > 0 && (Object.values(props.data[dataIndex].data).map((row, index) =>
                                            <tr key={`${row[index]}-row`}>
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
