import React, { useState, useEffect } from 'react';
import { fetchTodaysActivities } from '../services/activities';
import BlockButton from './BlockButton';

function Activity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }

        const data = await fetchTodaysActivities(token);
        setActivities(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className='container'>
      <BlockButton />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <h2>Today</h2>
          <br />
          <h4>Upcoming</h4>
          <br />
          {activities.map(activity => (
            <div key={activity._id} className='mb-4'>
              {activity.activities.map(act => (
                <div key={act.startTime} className='d-flex align-items-center mb-3'>
                  <i className='fas fa-clock me-2'></i>
                  <div>
                    <h5 className='mb-1'>{act.name}</h5>
                    <p className='mb-0 text-muted'>{new Date(act.startTime).toLocaleTimeString()} - {new Date(act.endTime).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Activity;
