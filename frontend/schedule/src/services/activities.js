import { apiUrl } from "./config";


export const fetchTodaysActivities = async (token) => {
const endPoint = '/activities/today';
const fullUrl = apiUrl + endPoint;


const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch today\'s activities');
  }

  return response.json();
};



export const fetchActivities = async () => {
const endPoint = '/activities';
const fullUrl = apiUrl + endPoint;


  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('No authorization token found');
  }

  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch activities');
  }

  return response.json();
};



export const saveActivity = async (activityData) => {
const endPoint = '/activities';
const fullUrl = apiUrl + endPoint;
const token = localStorage.getItem('authToken');
let postData = JSON.stringify(activityData);

  if (!token) {
    throw new Error('No authorization token found');
  }
  try {
      const response = await fetch(fullUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(activityData),
      });

      // * console.log(postData); *

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      return responseData;

  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
};

export const deleteActivity = async (activityId, token) => {

  const endPoint = '/activities/${activityId}';
  const fullUrl = apiUrl + endPoint;
  29
  
  try {
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete activity');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in deleteActivity:', error);
    throw error;
  }
};
