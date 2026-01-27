import React from "react";
import "./MyNotifications.css";

function MyNotifications() {
  const notifications = [
    {
      id: 1,
      title: "Complaint Resolved",
      message:
        "Your complaint about 'Water Leakage in Hostel Room' has been marked as resolved by the maintenance department.",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      title: "Status Update",
      message:
        "Your complaint 'WiFi Connectivity Issues in Hostel' has been updated to 'In Progress'.",
      time: "5 hours ago",
      type: "info",
    },
    {
      id: 3,
      title: "Admin Notice",
      message:
        "The hostel mess will be undergoing cleaning tomorrow. Meals will be served in the old dining hall.",
      time: "1 day ago",
      type: "warning",
    },
    {
      id: 4,
      title: "Complaint Received",
      message:
        "Your complaint 'Broken Fan in Classroom' has been successfully submitted.",
      time: "2 days ago",
      type: "primary",
    },
  ];

  return (
    <div className="notifications-container">
      <h2 className="notifications-header">My Notifications</h2>

      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications found.</p>
      ) : (
        <div className="list-group notifications-list">
          {notifications.map((note) => (
            <div
              key={note.id}
              className={`list-group-item list-group-item-action notification-item border-0 shadow-sm mb-3 rounded-4 list-group-item-${note.type}`}
            >
              <div className="d-flex w-100 justify-content-between align-items-center">
                <h5 className="mb-1 notification-title">{note.title}</h5>
                <small className="text-muted">{note.time}</small>
              </div>
              <p className="mb-1 notification-message">{note.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyNotifications;
