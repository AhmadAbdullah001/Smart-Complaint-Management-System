import React, { useContext, useEffect, useState } from "react";
import "./MyComplaints.css";
import FunctionContext from "../API_Functions/Context";

function MyComplaints() {
  const context = useContext(FunctionContext);
  const { FetchComplains } = context;
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = sessionStorage.getItem("id");
        const token = sessionStorage.getItem("token");

        if (!id || !token) {
          console.error("Missing user credentials in sessionStorage");
          return;
        }

        const res = await FetchComplains(id, token);
        if (Array.isArray(res)) {
          setComplaints(res);
        } else {
          console.error("Invalid response format:", res);
          setComplaints([]);
        }
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setComplaints([]);
      }
    };

    fetchData();
  }, [FetchComplains]);

  return (
    <div className="mycomplaints-container">
      <h2 className="mycomplaints-header">My Complaints</h2>

      {complaints.length === 0 ? (
        <p className="no-complaints-text">No complaints found.</p>
      ) : (
        <div className="mycomplaints-grid">
          {complaints.map((c) => (
            <div key={c._id} className="mycomplaints-card">
              <h5 className="complaint-title">{c.title}</h5>
              <p className="complaint-category">
                <strong>Category:</strong> {c.category}
              </p>
              <p className="complaint-desc">
                {c.description.split("\n").map((line, idx) => (
                  <span key={`${c._id}-${idx}`}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <p className="complaint-status">
                <strong>Status: </strong>
                <span
                  className={`status ${c.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {c.status}
                </span>
              </p>

              {/* ✅ Image preview and link */}
              {c.img && (
                <div className="complaint-image-container">
                  <a
                    href={c.img}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View image
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyComplaints;
