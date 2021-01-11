import { connect } from "react-redux";
import { url } from "../api";
import React, { useEffect, useState } from "react";
import Page from 'components/Page';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Col,
  Row,
} from 'reactstrap';
import { toast } from "react-toastify";
import { MdFileDownload, MdModeEdit } from "react-icons/md";
import { fetchAll, getById, review } from "../actions/upload";
import MaterialTable from 'material-table'
import useForm from '../functions/UseForm';

const reviewForm = {
  comments: '',
  status: 0
};

const status = [
  { id: 0, name: 'Pending' },
  { id: 1, name: 'Approved' },
  { id: 2, name: 'Denied' },
]

let userId = 0;

const ReviewUploadsPage = (props) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.fetchUploads();
  }, []);

  const { values, handleInputChange, resetForm } = useForm(
    reviewForm
  );

  const toggleReview = (id) => {
    userId = id;
    setModal(!modal);
    if (!modal) {
      props.getUpload(id);
    }
  };

  const handleReview = event => {
    event.preventDefault();
    const onSuccess = () => {
      toast.success("Template Initialized");
      resetForm();
      props.fetchUploads();
    };
    const onError = () => {
      toast.error("Something went wrong");
    };
    props.review(userId, values, onSuccess, onError);
  };

  return (
    <Page
      className="DashboardPage"
      title="Review"
      breadcrumbs={[{ name: 'Review', active: true }]}
    >
      <Row>
        <Col lg="12" md="12" sm="12" xs="12">
          <MaterialTable
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'Status', field: 'status' },
              { title: 'Comments', field: 'comments' },
              { title: 'Actions', field: 'actions' }
            ]}
            data={props.uploads.map((row) => ({
              name: row.name,
              status: status.find(o => o.id === row.status).name,
              comments: row.comments,
              actions: (
                <div>
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
                {status.map(({ name, id }) => (
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

  );
}

const mapStateToProps = (state) => {
  return {
    uploads: state.uploads.list,
  };
};

const mapActionToProps = {
  fetchUploads: fetchAll,
  getUpload: getById,
  review: review,
};

export default connect(mapStateToProps, mapActionToProps)(ReviewUploadsPage);
