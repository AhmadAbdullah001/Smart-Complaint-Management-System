import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, Button, Modal, Alert, Form } from "react-bootstrap";
import { BsInfoCircle, BsCheckCircle, BsClock, BsImage } from "react-icons/bs";
import FunctionContext from "../API_Functions/Context";

const ComplaintList = ({
  _id,
  title,
  date,
  description,
  status,
  category,
  resolution,
  user,
  img,
}) => {
  const [details, setdetails] = useState({});
  const [newdate, setnewdate] = useState(date);
  const [reason, setreason] = useState("");
  const [currentStatusForModal, setCurrentStatusForModal] = useState("");

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });

  const context = useContext(FunctionContext);
  const { fetchUserById, UpdateComplainStatus } = context;

  const getStatusIcon = () => {
    switch (status) {
      case "Pending":
        return <BsInfoCircle className="me-1 text-primary" />;
      case "In Progress":
        return <BsClock className="me-1 text-warning" />;
      case "Resolved":
        return <BsCheckCircle className="me-1 text-success" />;
      default:
        return <BsInfoCircle className="me-1 text-secondary" />;
    }
  };

  useEffect(() => {
    const getdetails = async () => {
      const data = await fetchUserById(user, sessionStorage.getItem("token"));
      setdetails(data);
      const formattedDate = new Date(date).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });
      setnewdate(formattedDate);
    };
    getdetails();
  }, [user, date, fetchUserById]);

  const ChangeStatus = async (currentstatus, resmsg) => {
    let newstatus = "";

    if (currentstatus === "Pending") newstatus = "In Progress";
    else if (currentstatus === "In Progress") newstatus = "Resolved";

    try {
      const data = await UpdateComplainStatus(
        _id,
        currentstatus,
        sessionStorage.getItem("token"),
        resmsg,
        details.email,
        { title, description }
      );

      if (data) {
        setAlert({
          show: true,
          variant: "success",
          message: `Complaint marked as ${newstatus}!`,
        });
        setTimeout(() => setAlert({ show: false }), 3000);
        setInterval(() => {
          window.location.reload();
        }, 2000);
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      setAlert({
        show: true,
        variant: "danger",
        message: "Error updating complaint status.",
      });
      setTimeout(() => setAlert({ show: false }), 3000);
    }

    setCurrentStatusForModal("");
    setreason("");
  };

  return (
    <>
      {alert.show && (
        <Alert
          variant={alert.variant}
          className="position-fixed top-0 end-0 m-3 shadow"
          style={{ zIndex: 9999, width: "auto" }}
        >
          {alert.message}
        </Alert>
      )}

      <div className="card shadow-sm mb-4 rounded-4 border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h5 className="fw-semibold mb-1">{title}</h5>
              <small className="text-muted">
                {getStatusIcon()} {status} • {category}
              </small>
            </div>
            <Badge bg="light" text="dark" className="text-capitalize">
              {details?.name || "Loading..."}
            </Badge>
          </div>

          <div className="text-muted small mb-2">
            📧 {details?.email || "—"} • {newdate}
          </div>

          <p className="mb-3 text-secondary" style={{ lineHeight: "1.5" }}>
            {description?.length > 180
              ? description.slice(0, 180) + "..."
              : description}
          </p>

          <div className="d-flex flex-wrap gap-2 mb-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowDetailsModal(true)}
            >
              <BsInfoCircle className="me-1" />
              View Details
            </Button>

            {img && (
              <Button
                variant="success"
                size="sm"
                onClick={() => setShowImageModal(true)}
              >
                <BsImage className="me-1" />
                View Image
              </Button>
            )}

            {/* ---- STATUS BUTTONS ---- */}

            {status === "Pending" && (
              <>
                {/* Only this button in Pending */}
                <Button
                  onClick={() => ChangeStatus("Pending", "")}
                  variant="outline-warning"
                  size="sm"
                >
                  Start Review
                </Button>
              </>
            )}

            {status === "In Progress" && (
              <>
                {/* In Progress → Resolved */}
                <Button
                  onClick={() => setCurrentStatusForModal("In Progress")}
                  variant="outline-success"
                  size="sm"
                >
                  Mark Resolved
                </Button>
              </>
            )}
          </div>

          {status === "Resolved" && resolution && (
            <div
              className="p-3 rounded-3 border border-success bg-light d-flex align-items-start"
              style={{ borderLeft: "5px solid #198754" }}
            >
              <BsCheckCircle className="text-success me-2 mt-1" />
              <div>
                <strong className="text-success d-block mb-1">
                  Resolution Notes
                </strong>
                <span className="text-secondary">{resolution}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ----- DETAILS MODAL ----- */}
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Complaint Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="fw-semibold mb-3">{title}</h5>
          <p>
            <strong>Date:</strong> {newdate}
          </p>
          <p>
            <strong>User:</strong> {details?.name} ({details?.email})
          </p>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p>{description}</p>
          {resolution && (
            <p>
              <strong>Resolution:</strong> {resolution}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ----- RESOLUTION MODAL ----- */}
      <Modal
        show={!!currentStatusForModal}
        onHide={() => setCurrentStatusForModal("")}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Resolution Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Write resolution or remarks..."
            value={reason}
            onChange={(e) => setreason(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setCurrentStatusForModal("")}
          >
            Cancel
          </Button>
          <Button
            disabled={reason.trim().length === 0}
            variant="success"
            onClick={() => ChangeStatus(currentStatusForModal, reason)}
          >
            Submit & Mark Resolved
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ----- IMAGE MODAL ----- */}
      <Modal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Complaint Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={img}
            alt="Complaint"
            className="img-fluid rounded-3 shadow-sm"
            style={{ maxHeight: "70vh", objectFit: "contain" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ComplaintList;
