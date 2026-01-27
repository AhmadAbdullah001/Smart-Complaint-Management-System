import React, { useState, useContext } from "react";
import Alert from "../Alert";
import FunctionContext from "../API_Functions/Context";
import "./Auth.css";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState("Student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [alert, setAlert] = useState({ show: false, theme: "", message: "" });

  const { Login, Signup } = useContext(FunctionContext);

  function capitalizeAlphabets(str) {
    return str.replace(/[a-zA-Z]+/g, (match) => match.toUpperCase());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newID = capitalizeAlphabets(ID);

    if (isSignUp) {
      const res = await Signup(name, newID, password, role, category,email);
      if (res.authToken) {
        setAlert({ show: true, theme: "success", message: "Account Created Successfully" });
        sessionStorage.setItem("token", res.authToken);
        sessionStorage.setItem("ID", newID);
        window.location.href = role === "Student" ? "/studenthome" : "/teacherhome";
      } else {
        setAlert({ show: true, theme: "danger", message: res.error });
      }
    } else {
      const res = await Login(newID, password);
      if (res.authToken) {
        setAlert({ show: true, theme: "success", message: "Login Successful" });
        sessionStorage.setItem("token", res.authToken);
        sessionStorage.setItem("ID", newID);
        if (res.exist.role === "Student") window.location.href = "/studenthome";
        else window.location.href = "/teacherhome";
      } else {
        setAlert({ show: true, theme: "danger", message: res.error });
      }
    }
  };

  return (
    <div className="vh-100 d-flex">
      {/* Left Side */}
      <div className="d-none d-md-flex col-md-6 justify-content-center align-items-center text-white Leftbox">
        <div className="text-center p-4">
          <h1 className="fw-bold">“From Complaint to Solution"</h1>
          <h3 className="fw-bold">"Track, Resolve, and Trust the System.”</h3>
        </div>
      </div>

      {/* Right Side */}
      <div className="col-12 col-md-6 d-flex justify-content-center align-items-center bg-light">
        <div className=" -lg p-4 w-100" style={{ maxWidth: "420px" }}>
          <div className="text-center mb-3">
            <img src="/ICON.png" alt="logo" width="50" className="mb-2" />
            <h3 className="fw-bold">{isSignUp ? "Create Account" : "Welcome Back"}</h3>
            <p className="text-muted small">
              {isSignUp
                ? "Sign up to start your journey"
                : "Welcome back — Continue your journey"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            {isSignUp && <div className="mb-3">
              <label className="form-label">
                <b>Email</b>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={`Enter your Email ID`}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>}
            <div className="mb-3">
              <label className="form-label">
                <b>{role === "Student" ? "College ID" : "Faculty ID"}</b>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={`Enter your ${role === "Student" ? "college" : "faculty"} ID`}
                value={ID}
                onChange={(e) => setID(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label"><b>Password</b></label>
              <input
                type="password"
                className="form-control"
                placeholder={isSignUp ? "Create a password" : "Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {role === "Teacher" && isSignUp && (
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  <option value="academic">Academic</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="hostel">Hostel</option>
                  <option value="security">Security</option>
                  <option value="harassment">Harassment and Ragging</option>
                  <option value="All Complaints">All Complaints</option>
                </select>
              </div>
            )}

            {isSignUp && (
              <div className="mb-3">
                <label className="form-label">I am a</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      value="Student"
                      checked={role === "Student"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label className="form-check-label">Student</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      value="Teacher"
                      checked={role === "Teacher"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label className="form-check-label">Teacher</label>
                  </div>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-between mb-3">
              {!isSignUp && (
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
              )}
              {!isSignUp && (
                <a href="#" className="small text-primary text-decoration-none">
                  Forgot password?
                </a>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-3">
            <small>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                className="text-primary fw-bold"
                style={{ cursor: "pointer" }}
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* Alert */}
      {alert.show && <Alert theme={alert.theme} message={alert.message} />}
    </div>
  );
}

export default AuthPage;
