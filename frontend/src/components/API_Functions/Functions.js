import React from "react";
import FunctionContext from "./Context";

function Functions(props) {
  const backendURL="https://smart-complaint-management-system-jnq3.onrender.com/"
  const Signup = async (name, ID, password, role,category,email) => {
    const res = await fetch(`${backendURL}api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, ID, password, role,category,email}),
    });
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      return { error: error.message };
    }
  };

  const Login = async (ID, password) => {
    const res = await fetch(`${backendURL}api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // ✅ fixed typo
      body: JSON.stringify({ ID, password }),
    });
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      return { error: error.message };
    }
  };
  const fetchUser = async (authToken) => {
    try {
      const res = await fetch(`${backendURL}api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken, // agar fetchuser middleware me token check hai
        },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Fetch user error:", error);
      return { error: error.message };
    }
  };
  const fetchUserById = async (id, authToken) => {
    try {
      const res = await fetch(`${backendURL}api/auth/fetchuserwithid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken, // agar fetchuser middleware me token check hai
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      return data;
    }
    catch (error) {
      console.error("Fetch user by ID error:", error);
      return { error: error.message };
    }
  };
  //Complain function
  const RaiseComplain = async (
    title,
    category,
    description,
    img,
    authToken
  ) => {
    try {
      const res = await fetch(
        `${backendURL}api/complain/addcomplain`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
          body: JSON.stringify({ title, category, description, img }),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return { error: error.message };
    }
  };

  const FetchComplains = async (id, authToken) => {
    const res = await fetch(`${backendURL}api/complain/mycomplains`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({ id }),
    });
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      return { error: error.message };
    }
  };

  const CategoryComplains = async (category, authToken) => {
    const res=await fetch(`${backendURL}api/complain/categorycomplains`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "auth-token":authToken
      },
      body:JSON.stringify({category})
    })
    try {
      const data=await res.json()
      return data;
    } catch (error) {
      return {error:error.message}
    }
  }



  const UpdateComplainStatus = async (id, status, authToken, resolution = "",complaintMail,complaint) => {
  const res = await fetch(
    `${backendURL}api/complain/updatecomplainstatus`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({ id, status, resolution,complaintMail,complaint }), // Add resolution here
    }
  );
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

  return (
    <FunctionContext.Provider
      value={{ Signup, Login, fetchUser,fetchUserById, RaiseComplain, FetchComplains ,CategoryComplains,UpdateComplainStatus}}
    >
      {props.children}
    </FunctionContext.Provider>
  );
}

export default Functions;
