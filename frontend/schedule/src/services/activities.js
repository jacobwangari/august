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
