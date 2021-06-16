import { connect } from "react-redux";
import { url } from "../api";
import React, { useEffect, useState } from "react";
import Page from 'components/Page';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  NavLink as BSNavLink,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";
import { MdFileDownload, MdModeEdit, MdRemoveRedEye } from "react-icons/md";
import { getByStatus, getById, review } from "../actions/upload";
import MaterialTable from 'material-table'
import moment from 'moment';
import useForm from '../functions/UseForm';
import PageSpinner from '../components/PageSpinner';

const reviewForm = {
  comments: '',
  status: 0
};

const reviewStatus = [
  { id: 1, name: 'Approve' },
  { id: 2, name: 'Deny' },
];

let userId = 0;

const ReviewUploadsPage = (props) => {
  const [modal, setModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(0);
  const [loading, SetLoading] = useState(false);

  useEffect(() => {
    props.fetchUploads(uploadStatus);
  }, []);

  const { values, handleInputChange, resetForm } = useForm(
    reviewForm
  );

  const fetchData = (s) => {
    setUploadStatus(s)
    props.fetchUploads(s);
  };

  const toggleReview = (id) => {
    userId = id;
    setModal(!modal);
    if (!modal) {
      props.getUpload(id);
    }
  };

  const handleReview = event => {
    event.preventDefault();
    SetLoading(true);
    const onSuccess = () => {
      SetLoading(false);
      toast.success("Reviewed Successfully");
      resetForm();
      props.fetchUploads(uploadStatus);
    };
    const onError = () => {
      SetLoading(false);
      toast.error("Something went wrong");
    };
    props.review(userId, values, onSuccess, onError);
  };

  return (
    <>
      <Page
        className="DashboardPage"
        title="Review"
        hidden={loading}
      >
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardBody>
                <ButtonGroup>
                  <Button
                    color="primary"
                    onClick={() => fetchData(0)}
                    active={uploadStatus === 0}
                  >
                    Pending
                </Button>
                  <Button
                    color="primary"
                    onClick={() => fetchData(1)}
                    active={uploadStatus === 1}
                  >
                    Approved
                </Button>
                  <Button
                    color="primary"
                    onClick={() => fetchData(2)}
                    active={uploadStatus === 2}
                  >
                    Denied
                </Button>
                  <Button
                    color="primary"
                    onClick={() => fetchData(3)}
                    active={uploadStatus === 3}
                  >
                    Over-Written
                </Button>
                </ButtonGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <MaterialTable
              columns={[
                { title: 'Name', field: 'name' },
                { title: 'User', field: 'user' },
                { title: 'Submission Date', field: 'date' },
                { title: 'Period', field: 'period' },
                { title: 'Comments', field: 'comments' },
                { title: 'Actions', field: 'actions' }
              ]}
              data={props.uploads.map((row) => ({
                name: row.name,
                user: row.user.userName,
                date: moment(row.createdAt).format('YYYY-MMM-DD'),
                period: `${moment(row.startDate).format('YYYY-MMM-DD') === '0001-Jan-01' ? '' : moment(row.startDate).format('YYYY-MMM-DD')} - ${moment(row.startDate).format('YYYY-MMM-DD') === '0001-Jan-01' ? '' : moment(row.endDate).format('YYYY-MMM-DD')}`,
                comments: row.comments,
                actions: (
                  <div>
                    <BSNavLink
                      id={`review-details${row.id}`}
                      tag={NavLink}
                      to={`/review-details/${row.id}`}
                      activeClassName="active"
                      exact={true}
                    >
                      <MdRemoveRedEye size="15" />{" "}
                      <span style={{ color: "#000" }}>View</span>
                    </BSNavLink>
                    <a
                      href={`${url}uploads/download/${row.id}`} target="_blank" rel="noopener noreferrer"
                      id={`navItem-${row.name}-${row.id}`}
                    >
                      <MdFileDownload size="15" />{" "}
                      <span style={{ color: "#000" }}>Download</span>
                    </a>
                    {(row.status === 0) && (<Button
                      size="sm"
                      color="link"
                      onClick={() => toggleReview(row.id)}
                    >
                      <MdModeEdit size="15" />{" "}
                      <span style={{ color: "#000" }}>Review </span>
                    </Button>)}
                  </div>
                ),
              }))}
              title="Users"
            />
          </Col>
        </Row>
        <Modal isOpen={modal} backdrop={true}>
          <Form onSubmit={handleReview}>
            <ModalHeader>Review</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  placeholder="status"
                  value={values.status}
                  onChange={handleInputChange}
                >
                  <option value=""> </option>
                  {reviewStatus.map(({ name, id }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="comments">Comments</Label>
                <Input
                  type="text"
                  name="comments"
                  placeholder="comments"
                  value={values.comments}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                onClick={() => toggleReview(userId)}
              >
                Save
            </Button>
              <Button
                onClick={() => toggleReview(userId)}
              >
                <span style={{ textTransform: "capitalize" }}>
                  Cancel
                      </span>
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Page>
      {(loading) && <PageSpinner />}
    </>

  );
}

const mapStateToProps = (state) => {
  return {
    uploads: state.uploads.list,
  };
};

const mapActionToProps = {
  fetchUploads: getByStatus,
  getUpload: getById,
  review: review,
};

export default connect(mapStateToProps, mapActionToProps)(ReviewUploadsPage);
