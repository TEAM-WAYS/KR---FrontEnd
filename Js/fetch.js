const BASE_URL = 'http://localhost:8080';
async function fetchFromApi(endpoint, options = {}) {
    const url = `${BASE_URL}/${endpoint}`;
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        const jwtToken = sessionStorage.getItem('jwtToken');
        if (jwtToken) {
            headers['Authorization'] = `${jwtToken}`;
        }

        const response = await fetch(url, { ...options, headers });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error fetching data from ${endpoint}: ${errorText}`);
        }

        const authorizationHeader = response.headers.get('Authorization');
        if (authorizationHeader) {
            const newJwtToken = authorizationHeader.replace('Bearer ', '');
            sessionStorage.setItem('jwtToken', newJwtToken);
            console.log('JWT Token:', newJwtToken);
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function markEmailAsForbidden(emailId) {
    try {
        const response = await postData('emails/forbid', { emailId });
        if (response && response.success) {
            console.log('Email marked as forbidden successfully.');
        } else {
            throw new Error('Failed to mark email as forbidden.');
        }
    } catch (error) {
        console.error('Error marking email as forbidden:', error);
        throw error;
    }
}

async function login(loginData) {
    return fetchFromApi('login-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });
}

async function getEmails(token) {
    return fetchFromApi('emails', {}, token);
}

async function getEmailById(emailId, token) {
    return fetchFromApi(`emails/${emailId}`, {}, token);
}

async function getEmailContent(emailId, token) {
    return fetchFromApi(`emails/content/${emailId}`, {}, token);
}

async function postData(endpoint, postData, token) {
    return fetchFromApi(endpoint, {
        method: 'POST',
        body: JSON.stringify(postData),
    }, token);
}

async function getData(endpoint, getData, token) {
    return fetchFromApi(endpoint, {
        method: 'GET',
        body: JSON.stringify(getData),
    }, token);
}

export {
    fetchFromApi,
    postData,
    getData,
    getEmails,
    getEmailById,
    getEmailContent,
    markEmailAsForbidden,
    login
};