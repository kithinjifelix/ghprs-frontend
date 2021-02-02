import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import Page from 'components/Page';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from 'reactstrap';
import { viewById } from "../actions/upload";

const ReviewDetailsPage = (props) => {

    useEffect(() => {
        const { match: { params } } = props;
        props.fetchUpload(params.id);
    }, []);

    const [loading] = useState(false);
    const [sheet, setSheet] = useState(0);
    const [columns, setColumns] = useState([]);



    const getWorkSheetColumns = (index) => {
        const c = props.workSheets[index].columns;
        setColumns(c);
    };

    useEffect(() => {
        if (props.workSheets.length > 0) {
            getWorkSheetColumns(0);
        }
    }, []);

    const fetchColumns = (index) => {
        setSheet(index);
        getWorkSheetColumns(index);
    };


    return (
        <Page
            className="DashboardPage"
            title="Upload Details"
            breadcrumbs={[{ name: 'Review/Upload Details', active: true }]}
        >
                <Row>
                    <Col lg="3" md="3" sm="3" xs="3">
                        <Card>
                            <CardHeader>Work Sheets</CardHeader>
                            <CardBody>
                                <ButtonGroup vertical>
                                    {props.workSheets.map(({ name }, index) => (
                                        <Button
                                            key={`Button-Worksheet-${index}`}
                                            color="primary"
                                            onClick={() => fetchColumns(index)}
                                            active={sheet === index}
                                        >
                                            {name}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="9" md="9" sm="9" xs="9">
                        <Card>
                            <CardHeader>Data</CardHeader>
                            <CardBody>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
        </Page>
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
