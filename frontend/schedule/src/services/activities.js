import { apiUrl } from "./config";

const endPoint = '/activities';
const fullUrl = apiUrl + endPoint;

export const fetchActivities = async () => {
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
