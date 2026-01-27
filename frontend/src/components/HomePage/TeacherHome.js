import React, { useState, useEffect, useContext } from "react";
import "./TeacherHome.css";
import ComplaintList from "./ComplaintList";
import FunctionContext from "../API_Functions/Context";

function TeacherHome() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [details,setdetails]=useState({});
  const context = useContext(FunctionContext);
  const { CategoryComplains,fetchUser } = context;

  const authToken = sessionStorage.getItem("token");

  // Fetch complaints from backend
  useEffect(() => {
    
    const loadComplaints = async () => {
      try {
        setLoading(true);
        
        const data=await CategoryComplains(details.category,authToken)
        console.log(data);
        if (data && Array.isArray(data)) {
          setComplaints(data);
        } else {
          setComplaints([]);
        }
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setComplaints([]);
      } finally {
        setLoading(false);
      }
    };
    if(details.category)
    loadComplaints();
  }, [authToken,details]);
  useEffect(()=>{
    const getuserdetails=async()=>{
          const temp= await fetchUser(authToken);
          setdetails(temp);
          // console.log("These are the details",temp);
        }
        getuserdetails();
        // console.log("These are the ",details);
  },[])
  const filteredComplaints =
    selectedTab === "All"
      ? complaints
      : complaints.filter((c) => c.status === selectedTab);
  // Empty state component
  const renderEmptyState = () => {
    const messages = {
      All: "No complaints available at the moment",
      New: "No Pending complaints at the moment",
      "In Progress": "No in progress complaints at the moment",
      Resolved: "No resolved complaints at the moment",
    };

    return (
      <div className="empty-state text-center p-5 mt-3 border rounded-3 bg-light-subtle major">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="none"
          stroke="#9e9e9e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-3"
          viewBox="0 0 24 24"
        >
          <path d="M3 7h5l2 3h11v11H3z" />
          <path d="M3 7V3h5l2 3h11v4" />
        </svg>
        <h5 className="fw-semibold text-secondary">No complaints found</h5>
        <p className="text-muted small m-0">{messages[selectedTab]}</p>
      </div>
    );
  };

  // Counts
  const total = complaints.length;
  const newCount = complaints.filter((c) => c.status === "Pending").length;
  const progressCount = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;
  const resolvedCount = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;
  const Logout=()=>{
    sessionStorage.removeItem("token");
    window.location.href="/auth"
  }
  return (
    <div className="major">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <svg
              width="40px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3V7M17 5H21M19 17V21M17 19H21M10 5L8.53 8.73C8.34 9.2 8.25 9.44 8.1 9.64C7.98 9.82 7.82 9.98 7.64 10.1C7.44 10.25 7.2 10.34 6.73 10.53L3 12L6.73 13.47C7.2 13.66 7.44 13.75 7.64 13.9C7.82 14.02 7.98 14.18 8.1 14.36C8.25 14.56 8.34 14.8 8.53 15.27L10 19L11.47 15.27C11.66 14.8 11.75 14.56 11.9 14.36C12.02 14.18 12.18 14.02 12.36 13.9C12.56 13.75 12.8 13.66 13.27 13.47L17 12L13.27 10.53C12.8 10.34 12.56 10.25 12.36 10.1C12.18 9.98 12.02 9.82 11.9 9.64C11.75 9.44 11.66 9.2 11.47 8.73L10 5Z"
                stroke="#5039fe"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <div className="welcome ms-2">
              <h1 className="navbar-brand heading" style={{ fontSize: "28px" }}>
                Teacher Dashboard
              </h1>
              <p>Welcome back, {details.name}</p>
            </div>
          </div>
          <div className="logout">
            <button className="btn btn-outline-danger" onClick={()=>Logout()} type="submit">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Stats Cards */}
      <div className="row g-4 mt-2 superbox d-flex flex-wrap px-3">
        <div className="col-md-3 col-sm-6 box">
          <div className="stat-card blue-border">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="stat-title">Total Complaints</div>
                <div className="stat-number text-dark">{total}</div>
                <div className="stat-subtext">All submissions</div>
              </div>
              <i className="bi bi-folder stat-icon text-dark"></i>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6 box">
          <div className="stat-card">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="stat-title">Pending Complaints</div>
                <div className="stat-number text-dark">{newCount}</div>
                <div className="stat-subtext">Needs attention</div>
              </div>
              <i className="bi bi-exclamation-circle stat-icon text-dark"></i>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6 box">
          <div className="stat-card blue-border">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="stat-title">In Progress</div>
                <div className="stat-number text-dark">{progressCount}</div>
                <div className="stat-subtext">Being reviewed</div>
              </div>
              <i className="bi bi-clock stat-icon text-dark"></i>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6 box">
          <div className="stat-card">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="stat-title">Resolved</div>
                <div className="stat-number text-dark">{resolvedCount}</div>
                <div className="stat-subtext">Completed</div>
              </div>
              <i className="bi bi-check-circle stat-icon text-dark"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Complaints Section */}
      <div className="mt-5 px-4">
        <div className="d-flex align-items-center mb-3">
          <svg
            fill="#000000"
            viewBox="0 0 24 24"
            width="30px"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            style={{ marginRight: "10px" }}
          >
            <polyline
              points="21 6 14 13 11 10 3 18"
              fill="none"
              stroke="#5039fe"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
            <polyline
              points="21 10 21 6 17 6"
              fill="none"
              stroke="#5039fe"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          <h2>Manage Complaints</h2>
        </div>
        <p style={{ color: "grey" }}>Review and resolve student issues</p>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          {["All", "Pending", "In Progress", "Resolved"].map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${
                  selectedTab === tab ? "active fw-bold" : ""
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab} (
                {
                  (tab === "All"
                    ? complaints
                    : complaints.filter((c) => c.status === tab)
                  ).length
                }
                )
              </button>
            </li>
          ))}
        </ul>

        {/* Complaints Display */}
        <div className="container-fluid mt-4">
          {loading ? (
            <p className="text-center text-secondary">Loading complaints...</p>
          ) : filteredComplaints.length > 0 ? (
            filteredComplaints.map((c, index) => (
              <ComplaintList  key={index} {...c} />
            ))
          ) : (
            renderEmptyState()
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherHome;
