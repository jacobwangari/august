import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';

const Activity = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [title, setTitle] = useState("");
  const [activities, setActivities] = useState([
    { name: "", description: "", startTime: "", endTime: "" },
  ]);

  const handleActivityChange = (index, field, value) => {
    const newActivities = [...activities];
    newActivities[index][field] = value;
    setActivities(newActivities);
  };

  const addActivity = () => {
    setActivities([...activities, { name: "", description: "", startTime: "", endTime: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, activities };

    axios.post("YOUR_API_ENDPOINT_HERE", data)
      .then(response => {
        console.log("Activity added successfully", response.data);
        handleClose(); // Close the modal after submission
      })
      .catch(error => {
        console.error("There was an error adding the activity!", error);
      });
  };

  return (
    <>
      {/* Your existing activity rendering code */}
      <button
        className="fab"
        onClick={handleShow}
      >
        <FaPlus />
      </button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            {activities.map((activity, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Activity Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={activity.name}
                      onChange={(e) => handleActivityChange(index, "name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={activity.description}
                      onChange={(e) => handleActivityChange(index, "description", e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Start Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={activity.startTime}
                      onChange={(e) => handleActivityChange(index, "startTime", e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">End Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={activity.endTime}
                      onChange={(e) => handleActivityChange(index, "endTime", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="secondary" onClick={addActivity}>
              Add Another Activity
            </Button>
            <Button type="submit" variant="primary" className="mt-3">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Activity;
