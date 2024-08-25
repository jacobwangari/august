import React, { useState } from 'react';

const BlockButton = () => {
    const [activityName, setActivityName] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [activityDate, setActivityDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
  

    const handleSaveChanges = async () => {
        const requestData = {
            title: "Daily Workout",
            activities: [
                {
                    name: activityName,
                    description: activityDescription,
                    startTime: new Date(`${activityDate}T${startTime}:00Z`).toISOString(),
                    endTime: new Date(`${activityDate}T${endTime}:00Z`).toISOString()
                }
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        try {
            const response = await fetch('localhost:5000/api/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Success:', responseData);

            // Close the modal or show success message here
        } catch (error) {
            console.error('Error:', error);
            // Handle error here
        }
    };

    return (
        <>
            <button type="button" className="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#activityModal">
                Add Activity
            </button>
            
            <div className="modal fade" id="activityModal" tabIndex="-1" role="dialog" aria-labelledby="activityModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="activityModalLabel">Add Activity</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="activityDate">Activity Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="activityDate"
                                        value={activityDate}
                                        onChange={(e) => setActivityDate(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="activityName">Activity Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="activityName"
                                        placeholder="Enter activity name"
                                        value={activityName}
                                        onChange={(e) => setActivityName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="activityDescription">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="activityDescription"
                                        rows="3"
                                        placeholder="Enter description"
                                        value={activityDescription}
                                        onChange={(e) => setActivityDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startTime">Start Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="startTime"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endTime">End Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="endTime"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSaveChanges}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlockButton;
