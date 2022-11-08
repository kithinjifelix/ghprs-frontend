import { connect } from "react-redux";
import React, { useEffect, useCallback, useState } from 'react';
import Page from 'components/Page';
import {
  Card,
  CardBody,
  Col, Form, FormGroup, Input, Label,
  Row,
} from 'reactstrap';
import CardHeader from "reactstrap/lib/CardHeader";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { url } from '../api';
import { toast } from 'react-toastify';

const HomePage = (props) => {
  const [dashboardData, setDashboardData]= useState([]);
  const [mechanisms, setMechanisms]= useState([]);
  const [periods, setPeriods]= useState([]);
  const [regions, setRegions]= useState([]);
  const [indicators, setIndicators]= useState([]);

  const [mechanismId, setMechanismId]= useState('');
  const [periodId, setPeriodId]= useState('');
  const [regionId, setRegionId]= useState('');
  const [indicatorId, setIndicatorId]= useState('');

  const loadDashboardData = useCallback(async (mechanism, period, region, indicator) => {
    try {
      const response = await axios.get(`${url}Dashboard?mechanism=${mechanism}&periodId=${period}&regionId=${region}&indicatorId=${indicator}`);
      setDashboardData(response.data);
    } catch (e) {
      toast.error("An error occured while fetching dashboard data !", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }, []);

  const loadMechanisms = useCallback(async () => {
    try {
      const response = await axios.get(`${url}Downloads/GetMechanisms`);
      setMechanisms(response.data);
    } catch (e) {
      toast.error("An error occured while fetching mechanisms !", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }, []);

  const loadPeriods = useCallback(async () => {
    try {
      const response = await axios.get(`${url}Downloads/GetPeriods`);
      setPeriods(response.data);
    } catch (e) {
      toast.error("An error occured while fetching periods !", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }, []);

  const loadRegions = useCallback(async () => {
    try {
      const response = await axios.get(`${url}Downloads/GetRegions`);
      setRegions(response.data);
    } catch (e) {
      toast.error("An error occured while fetching regions !", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }, []);

  const loadIndicators = useCallback(async () => {
    try {
      const response = await axios.get(`${url}Dashboard/GetMeasureIndicators`);
      setIndicators(response.data);
    } catch (e) {
      toast.error("An error occured while fetching indicators !", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
    loadMechanisms();
    loadPeriods();
    loadRegions();
    loadIndicators();
  }, [loadDashboardData, loadMechanisms, loadPeriods, loadRegions, loadIndicators]);

  const handleMechanismChange = (e) => {
    if (e.target.value) {
      setMechanismId(e.target.value);
      loadDashboardData(e.target.value, periodId, regionId, indicatorId);
    }
  };

  const handleYearChange = (e) => {
    if (e.target.value) {
      setPeriodId(e.target.value);
      loadDashboardData(mechanismId, e.target.value, regionId, indicatorId);
    }
  };

  const handleRegionChange = (e) => {
    if (e.target.value) {
      setRegionId(e.target.value);
      loadDashboardData(mechanismId, periodId, e.target.value, indicatorId);
    }
  };

  const handleIndicatorChange = (e) => {
    if (e.target.value) {
      setIndicatorId(e.target.value);
      loadDashboardData(mechanismId, periodId, regionId, e.target.value);
    }
  };

  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Facilities Reporting'
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: dashboardData.map(obj => obj.fiscal_year),
      crosshair: true
    },
    yAxis: {
      title: {
        useHTML: true,
        text: 'Number Of Facilities'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Facilities Reporting',
      data: dashboardData.map(obj => obj.count)
    }]
  };

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
              <Card>
                <CardBody>
                  <Row>
                    <Col md={12} sm={12} lg={12} xl={12}>
                      <Form>
                        <Row>
                          <Col md={3} sm={3} lg={3} xl={3}>
                            <FormGroup>
                              <Label for="mechanismName">Mechanism Name</Label>
                              <Input
                                type="select"
                                name="mechanismName"
                                id="mechanismName"
                                placeholder="Select Mechanism Name"
                                onChange={(e) => handleMechanismChange(e)}
                              >
                                <option value=""> </option>
                                {mechanisms.map(({ mech_name, id }) => (
                                  <option key={id} value={id}>
                                    {mech_name}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md={3} sm={3} lg={3} xl={3}>
                            <FormGroup>
                              <Label for="year">Year</Label>
                              <Input
                                type="select"
                                name="year"
                                id="year"
                                placeholder="Select Year"
                                // value={values.frequency}
                                // onChange={handleInputChange}
                                onChange={(e) => handleYearChange(e)}
                              >
                                <option value=""> </option>
                                {periods.map(({ fiscal_year, period_id, period, calendar_year }) => (
                                  <option key={period_id} value={period_id}>
                                    {period} {calendar_year} ({fiscal_year})
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md={3} sm={3} lg={3} xl={3}>
                            <FormGroup>
                              <Label for="region">Region</Label>
                              <Input
                                type="select"
                                name="region"
                                id="region"
                                placeholder="Select Region"
                                // value={values.frequency}
                                // onChange={handleInputChange}
                                onChange={(e) => handleRegionChange(e)}
                              >
                                <option value=""> </option>
                                {regions.map(({ name, id }) => (
                                  <option key={id} value={id}>
                                    {name}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md={3} sm={3} lg={3} xl={3}>
                            <FormGroup>
                              <Label for="indicator">Indicator</Label>
                              <Input
                                type="select"
                                name="indicator"
                                id="indicator"
                                placeholder="Select Indicator"
                                // value={values.frequency}
                                // onChange={handleInputChange}
                                onChange={(e) => handleIndicatorChange(e)}
                              >
                                <option value=""> </option>
                                {indicators.map(({ indicator }) => (
                                  <option key={indicator} value={indicator}>
                                    {indicator}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} sm={12} lg={12} xl={12}>
                      <HighchartsReact highcharts={Highcharts} options={options} />
                    </Col>
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
