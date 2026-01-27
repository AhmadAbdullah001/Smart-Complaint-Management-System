import React, { useState, useEffect,useContext } from "react";
import FunctionContext from "../API_Functions/Context";

import Loader from "../Loader";
function RaiseComplaint() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [img, setimg] = useState(null);
  const [loading, setloading] = useState(false);
  const [converted, setconverted] = useState(false);
  const context=useContext(FunctionContext);
  const {RaiseComplain}=context;
  // Load Puter.js dynamically
  useEffect(() => {
    if (!window.puter && !document.getElementById("puter-script")) {
      const script = document.createElement("script");
      script.src = "https://js.puter.com/v2/";
      script.id = "puter-script"; // unique id to avoid duplicate
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Cloudinary Upload
  const PicChange = async (pic) => {
    if (!pic) return alert("Please Select an Image");
    if (["image/jpeg", "image/png", "image/jpg"].includes(pic.type)) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "Chat_App");
      data.append("cloud_name", "dblktyg0t");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dblktyg0t/image/upload",
          { method: "POST", body: data }
        );
        const data1 = await res.json();
        setimg(data1.url.toString());
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  // Convert title & description to formal
  const convertToFormal = async () => {
    if (!window.puter) {
      alert("Puter.js not loaded yet!");
      return;
    }

    setloading(true);

    try {
      // Convert title
      const titleRes = await window.puter.ai.chat([
        {
          role: "system",
          content:
            "Convert the following text into a short, polite, formal complaint title suitable for official forms.",
        },
        { role: "user", content: title },
      ]);

      // Convert description
      const descRes = await window.puter.ai.chat([
        {
          role: "system",
          content: `Convert the following text into a clear, polite, and formal complaint statement suitable for college or organizational authorities.The Category of the complaint is ${category} Do not change the meaning.Do not includer personal details or contact information. Do not make it too long ,Keep it simple,short and to the point. Keep in mind that this complaint is from a student to college authorities. Do not add name at the end instead add a general position like "A Concerned Student".`,
        },
        { role: "user", content: description },
      ]);
      setTitle(titleRes.message.content);
      setDescription(descRes.message.content);
      console.log("Title Conversion:", titleRes.message.content);
      console.log("Description Conversion:", descRes.message.content);
      // setTitle(titleRes.message.content[0].text);
      // setDescription(descRes.message.content[0].text);
    } catch (err) {
      console.error("Error with Puter:", err);
      alert("AI Conversion failed. Please try again.");
    } finally {
      setloading(false);
    }
  };

  const handleConvert = async (e) => {
    if(title.length===0 || category.length===0 || description.length===0){
      alert("Please fill all the fields");
      return;
    }
    e.preventDefault();
    await convertToFormal();
    alert("Complaint converted to formal tone!");
    setconverted(true);
    console.log({ title, category, description, img });
    // Send to backend API here
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!converted){
      alert("Please convert the complaint to formal format before submitting.");
      return;
    }
    try {
      await RaiseComplain(title,category,description,img,sessionStorage.getItem('token'));
      // alert(res.message)
      window.location.href="/studenthome";
        } catch (error) {
      alert("Error submitting complaint: "+error.message)
    }
  }
  return (
    <div className="container " >
      <div className="text-center mb-4" style={{padding:"0pc"}}>
        <h2 className="fw-bold text-primary">Raise a New Complaint</h2>
        <p className="text-muted">
          Write your complaint naturally — it will be auto-formatted into formal
          language.
        </p>
      </div>

      <div className="  p-4 mx-auto" style={{ maxWidth: "600px",backgroundColor:"transparent" }}>
        <form>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-bold">Complaint Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter a short title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label fw-bold">Category</label>
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
              <option value="others">Others</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Describe your issue"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* File Upload */}
          <div className="mb-3 d-flex" style={{ alignItems: "center" }}>
            <label className="form-label fw-bold">Attach File (optional)</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => PicChange(e.target.files[0])}
            />
          </div>

          {/* Loader */}
          {loading && (
            <div className="text-center my-3">
              <Loader />
              <p className="text-muted mt-2">
                Converting to formal language...
              </p>
            </div>
          )}

          {/* Submit */}
          <div className="d-grid">
            <button
              onClick={handleConvert}
              style={{ marginBottom: "10px" }}
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? "Processing..." : "Convert to formal format"}
            </button>
          </div>
          <div className="d-grid">
            <button onClick={handleSubmit} className="btn btn-primary">Submit Complaint</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RaiseComplaint;
