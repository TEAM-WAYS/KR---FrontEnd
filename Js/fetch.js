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
async function sync(token) {
    return fetchFromApi('emails/sync', {}, token);
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
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
    }, token);
}

async function getData(endpoint, token) {
    return fetchFromApi(endpoint, {method: 'GET'}, token);
}
async function getDataById(endpoint, token) {
    return fetchFromApi(endpoint, {
        method: 'GET'

    }, token);
}



export {
    fetchFromApi,
    postData,
    getData,
    getEmails,
    getEmailById,
    getEmailContent,
    login,
    getDataById,
    sync
};