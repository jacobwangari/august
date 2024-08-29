import React, { useState, useEffect } from 'react';
import { deleteActivity, fetchTodaysActivities } from '../services/activities';
import BlockButton from './BlockButton';
import { formatDate } from '../services/dateFormatter';

function Activity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const todayDate = formatDate(new Date().toISOString());


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

  const handleEdit = (activity) => {

    console.log('Editing activity:', activity);
  
  };

 
  const handleDelete = async (activity) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }

        await deleteActivity(activity._id, token);  
        setActivities(activities.filter(act => act._id !== activity._id));  
      } catch (error) {
        console.error('Error deleting activity:', error);
        setError('Failed to delete the activity');
      }
    }
  };

  return (
    <div className='container'>
      <BlockButton/>
      <h2>{todayDate}</h2>
<br />
{loading ? (
  <p>Loading...</p>
) : error ? (
  <p>Error: {error}</p>
) : (
  <>
    <h4>Upcoming</h4>
    <br />
    {activities.map(activity => (
      <div key={activity._id} className='mb-4'>
        {activity.activities.map(act => (
          <div key={act.startTime} className='d-flex justify-content-between align-items-center mb-3'>
            <div className='d-flex align-items-center'>
              <i className='fas fa-clock me-2'></i>
              <div>
                <h5 className='mb-1'>{act.name}</h5>
                <p className='mb-0 text-muted'>{new Date(act.startTime).toLocaleTimeString()} - {new Date(act.endTime).toLocaleTimeString()}</p>
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <button className='btn btn-link text-primary p-0 me-3' onClick={() => handleEdit(act)}>
                <i className='fas fa-edit'></i>
              </button>
              <button className='btn btn-link text-danger p-0' onClick={() => handleDelete(act)}>
                <i className='fas fa-trash'></i>
              </button>
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
