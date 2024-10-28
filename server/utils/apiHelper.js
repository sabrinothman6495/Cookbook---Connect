import axios from 'axios';
// Todo: Create an axios instance with default settings
const apiClient = axios.create({
    //baseURL: 'https://api.example.com',
    //replace with  API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to handle GET requests
const get = async (url, params = {}) => {
    try {
        const response = await apiClient.get(url, { params });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Function to handle POST requests
const post = async (url, data) => {
    try {
        const response = await apiClient.post(url, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Function to handle PUT requests
const put = async (url, data) => {
    try {
        const response = await apiClient.put(url, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Function to handle DELETE requests
const del = async (url) => {
    try {
        const response = await apiClient.delete(url);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Function to handle errors
const handleError = (error) => {
    if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error response:', error.response.data);
    } else if (error.request) {
        // Request was made but no response received
        console.error('Error request:', error.request);
    } else {
        // Something else happened
        console.error('Error message:', error.message);
    }
    throw error;
};

// Export the functions
module.exports = {
    get,
    post,
    put,
    del,
};