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
        return await response.json();
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

async function getEmailById(emailId, token) {
    return fetchFromApi(`emails/${emailId}`, {}, token);
}

async function getEmailContent(emailId, token) {
    return fetchFromApi(`emails/content/${emailId}`, {}, token);
}
async function getApplicationTest(token) {
    return fetchFromApi(`application/testString`, {}, token);
}
async function getApplicationsFromInq(inq,token) {
    return fetchFromApi(`application/search/${inq}`, {}, token
    );
}

async function postData(endpoint, postData) {
    return fetchFromApi(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
    });
}

async function getData(endpoint) {
    return fetchFromApi(endpoint, {method: 'GET'});
}
async function getDataById(endpoint) {
    return fetchFromApi(endpoint, {
        method: 'GET'

    });
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
    getApplicationTest,
    getApplicationsFromInq
};