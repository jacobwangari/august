import React, { useEffect, useState } from "react";
import { fetchActivities } from "../services/activities";
import 'bootstrap/dist/css/bootstrap.min.css';


const Activity = () => {
  const [workoutData, setWorkoutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities()
      .then((data) => {
        setWorkoutData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-light">Loading...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    < div className = "container-md">
    

      <div className="card">
        {workoutData.map((workout, index) => (
          <div
            key={index}
            className=""
          >
            <h1 className="">{workout.title}</h1>
            <ul className="list-group">
              {workout.activities.map((activity, index) => (
                <li
                  key={index}
                  className="list-group-item"
                >
                  <h2 className="text-primary">{activity.name}</h2>
                  <p>{activity.description}</p>
                  <p>
                    <strong>Start:</strong>{" "}
                    {new Date(activity.startTime).toLocaleTimeString()} -
                    <strong> End:</strong>{" "}
                    {new Date(activity.endTime).toLocaleTimeString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
