import React from "react";
import './Home.css'
// Utility component for the Feature Cards
const FeatureCard = ({ icon, title, description }) => (
  <div className="card h-100 p-4 border-0 rounded-4 shadow-sm text-center">
    <div className="card-body d-flex flex-column align-items-center">
      <div
        className="d-flex align-items-center justify-content-center mb-3 p-3 rounded-circle"
        style={{ backgroundColor: "#eef2ff" }}
      >
        <svg
          className="text-indigo"
          style={{ width: "2rem", height: "2rem" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {icon}
        </svg>
      </div>
      <h3 className="h5 fw-semibold text-dark mb-2">{title}</h3>
      <p className="text-muted small">{description}</p>
    </div>
  </div>
);

// Utility component for the How It Works section items
const HowItWorksItem = ({ step, title, description }) => (
  <div className="d-flex align-items-start p-3">
    <div
      className="flex-shrink-0 d-flex align-items-center justify-content-center bg-primary text-white fw-bold me-3 rounded-circle"
      style={{ width: "2rem", height: "2rem" }}
    >
      {step}
    </div>
    <div>
      <h4 className="fw-semibold text-dark h6">{title}</h4>
      <p className="text-muted small mb-0">{description}</p>
    </div>
  </div>
);

const Home = () => {
  return (
    <div
      className="app-bg pb-5"
      style={{
        background: "linear-gradient(180deg, #f7f9fd 0%, #f0f4fc 100%)",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header/Navbar */}
      <header className="py-4 border-bottom border-light">
        <div className="container d-flex justify-content-between align-items-center">
          <div
            className="d-flex align-items-center fw-bold fs-5"
            style={{ color: "#4f46e5" }}
          >
            <svg
              style={{ width: "1.5rem", height: "1.5rem" }}
              className="me-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Smart Complaint Box</span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="container pt-5">
        {/* Hero Section */}
        <div className="text-center pt-5 pb-5">
          <h1 className="display-4 fw-bolder text-dark mb-3">
            AI-Powered Complaint
            <span className="d-block" style={{ color: "#4f46e5" }}>
              Management System
            </span>
          </h1>
          <p
            className="lead text-muted mx-auto mb-4"
            style={{ maxWidth: "600px" }}
          >
            Submit, track, and resolve complaints efficiently with intelligent
            categorization and real-time notifications.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button
            onClick={()=>{window.location.href='/auth'}}
              className="btn btn-primary btn-lg fw-medium rounded-pill shadow-sm px-5"
              id="btn1">  
              Get Started
            </button>
            <button
            onClick={()=>{window.location.href='/auth'}}
            id="btn2"
              className="btn btn-outline-primary btn-lg fw-medium rounded-pill px-5"
              // style={{
              //   color: "#4f46e5",
              //   borderColor: "#a5b4fc",
              // }}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="row justify-content-center my-5 g-4">
          <div className="col-lg-3 col-md-4 col-sm-6">
            <FeatureCard
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1l-.75-3M3 17h18M5 17h14l-1.5-3H6.5L5 17zM6 14L4 9l1-3h14l1 3-2 5M7 6h10"
                />
              }
              title="AI-Powered Analysis"
              description="Automatic categorization and priority detection using advanced AI."
            />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <FeatureCard
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.405L4 17h5m6 0v2a2 2 0 11-4 0v-2m4 0H9"
                />
              }
              title="Real-Time Updates"
              description="Get instant notifications when your complaint status changes."
            />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <FeatureCard
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6-6h6m6 0h-6m-6 4h6m6 0h-6m-6 4h6m6 0h-6M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"
                />
              }
              title="Secure & Private"
              description="Your complaints are protected with enterprise-grade security."
            />
          </div>
        </div>

        {/* How It Works Section */}
        <div
          className="card shadow-lg p-3 p-md-5 mx-auto border-0 rounded-4"
          style={{ maxWidth: "850px" }}
        >
          <h2 className="text-center fw-bold text-dark mb-4">How it works</h2>
          <div className="row g-0 border rounded-3 bg-light">
            <div className="col-sm-6 border-end border-light-subtle">
              <HowItWorksItem
                step="1"
                title="For Students"
                description="Submit complaints easily, track their progress, and receive notifications when resolved."
              />
            </div>
            <div className="col-sm-6">
              <HowItWorksItem
                step="2"
                title="For Educators"
                description="Review all categorized complaints, update status, and resolve issues efficiently."
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-muted small py-4 mt-5">
        &copy; 2025 Smart Complaint Box. Powered by AI.
      </footer>
    </div>
  );
};

export default Home;
