import React, { useContext, useEffect, useState } from "react";
import Alert from "../Alert";
import FunctionContext from "../API_Functions/Context";
import RaiseComplaint from "../StudentFeatures/RaiseNewComplaint";

function StudentHome() {
  const [showalert, setshowalert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const context = useContext(FunctionContext);
  const { fetchUser, FetchComplains } = context;
  const [details, setdetails] = useState({});
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      setshowalert(true);
      setTimeout(() => {
        window.location.href = "/studentlogin";
      }, 2000);
    }

    const fetchDetails = async () => {
      try {
        const authToken = sessionStorage.getItem("token");
        const res = await fetchUser(authToken);
        setdetails(res);
        sessionStorage.setItem("id", res._id);

        const complaintData = await FetchComplains(res._id, authToken);
        setComplaints(complaintData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDetails();
  }, []);

  const Logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    window.location.href = "/auth";
  };

  // Stats
  const totalComplaints = complaints.length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const urgent = complaints.filter((c) => c.priority === "High").length;

  // Filter + Search
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesStatus =
      filterStatus === "All" || complaint.status === filterStatus;
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setShowDetailModal(true);
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Alert */}
      {showalert && (
        <div className="text-center">
          <Alert theme="danger" message="Login Required - NO AUTHTOKEN FOUND" />
        </div>
      )}

      {/* Navbar */}
     <nav className="navbar navbar-light bg-white shadow-sm px-4 py-2 sticky-top">
  <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">
    
    {/* Left Section - Title + Welcome */}
    <div>
      <h3
        className="fw-bold mb-0"
        style={{
          background: "linear-gradient(90deg, #3b82f6, #a855f7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        <i className="bi bi-shield-lock-fill me-2"></i> Student Portal
      </h3>
      <small className="text-muted ms-1">
        Welcome back, <strong>{details.name || "Student"}</strong> 👋
      </small>
    </div>

    {/* Right Section - Logout Button */}
    <button
      className="btn btn-outline-danger btn-sm fw-semibold d-flex align-items-center mt-2 mt-md-0"
      onClick={Logout}
      style={{
        borderRadius: "8px",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "#dc3545", e.currentTarget.style.color = "#fff")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent", e.currentTarget.style.color = "#dc3545")
      }
    >
      <i className="bi bi-box-arrow-right me-1"></i> Logout
    </button>

  </div>
</nav>


      {/* Quick Actions */}
      <div className="container mt-4" >
        <div className="card border-0 shadow-sm p-3" style={{background: "linear-gradient(135deg,  hsl(221 83% 53% / 0.1) 0%, hsl(260 60% 65% / 0.05) 50%,hsl(220 25% 97%) 100%"}}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold">
                <i className="bi bi-lightning-charge-fill text-primary me-2"></i>
                Quick Actions
              </h6>
              <small className="text-muted">
                Submit and track your complaints easily
              </small>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus-circle me-1"></i> New Complaint
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container my-4">
        <div className="row g-3">
          {[
            {
              icon: "bi-file-earmark-text",
              color: "text-primary",
              label: "Total",
              value: totalComplaints,
            },
            {
              icon: "bi-check-circle",
              color: "text-success",
              label: "Resolved",
              value: resolved,
            },
            {
              icon: "bi-hourglass-split",
              color: "text-warning",
              label: "Pending",
              value: pending,
            },
            {
              icon: "bi-exclamation-triangle",
              color: "text-danger",
              label: "Urgent",
              value: urgent,
            },
          ].map((card, index) => (
            <div key={index} className="col-md-3">
              <div className="card shadow-sm border-0 text-center py-3">
                <div className={`${card.color} fs-2 mb-2`}>
                  <i className={`bi ${card.icon}`}></i>
                </div>
                <h6 className="text-muted">{card.label}</h6>
                <h4 className="fw-bold">{card.value}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search + Filter */}
      <div className="container mb-3 d-flex flex-wrap align-items-center">
        <input
          type="text"
          className="form-control mb-2 mb-md-0"
          style={{ width: "89.7%" }}
          placeholder="Search complaints..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-select ms-md-3"
          style={{ width: "max-content" }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* My Complaints */}
      <div className="container mb-5 flex-grow-1">
        <h5 className="fw-bold">My Complaints</h5>
        <p className="text-muted">Track and manage all your complaints</p>

        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((complaint) => (
            <div
              key={complaint._id}
              className="card border-0 shadow-sm mb-3 hover-shadow-sm"
            >
              <div className="card-body d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="fw-bold mb-1 text-dark">{complaint.title}</h6>
                  <p className="mb-1 text-muted small">
                    <strong>Category:</strong> {complaint.category.toUpperCase()}
                  </p>
                  <p className="mb-0 text-muted small">
                    <strong>Submitted on :</strong>{" "}
                    {new Date(complaint.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-end">
                  <span
                    className={`badge mb-2 ${
                      complaint.status === "Resolved"
                        ? "bg-success"
                        : complaint.status === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {complaint.status}
                  </span>
                  <br />
                  <button
                    className="btn btn-outline-primary btn-sm mt-1"
                    onClick={() => handleViewDetails(complaint)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No complaints found.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-sm py-3 mt-auto text-center text-muted small">
        <i className="bi bi-shield-lock text-primary me-1"></i>
        Smart Complaint Management System © 2025 | Designed for Students 
      </footer>

      {/* Modal for New Complaint */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered d-flex justify-content-center">
            <div className="modal-content border-0 shadow-lg" style={{width:"max-content"}}>
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div
                className="modal-body"
                style={{ maxHeight: "70vh", overflowY: "auto" }}
              >
                <RaiseComplaint />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Complaint Details */}
      {showDetailModal && selectedComplaint && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-info-circle me-2"></i>Complaint Details
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDetailModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <h6 className="fw-bold">{selectedComplaint.title}</h6>
                <p className="text-muted small mb-2">
                  <strong>Category:</strong> {selectedComplaint.category.toUpperCase()}
                </p>
                <p className="text-muted small mb-2">
                  <strong>Submitted on :</strong>{" "}
                  {new Date(selectedComplaint.date).toLocaleDateString()}
                </p>
                <p className="text-dark mt-3">
                  {selectedComplaint.description || "No description provided."}
                </p>
                <hr />
                <h6 className="fw-bold text-success">
                  Resolution:
                </h6>
                <p className="text-muted">
                  {selectedComplaint.resolution || "Not resolved yet."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentHome;
