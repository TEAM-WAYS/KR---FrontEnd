const BASE_URL = 'http://localhost:8080';

async function fetchFromApi(endpoint, options = {}) {
    const url = `${BASE_URL}/${endpoint}`;
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error fetching data from ${endpoint}`);
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
async function getEmails() {
    return fetchFromApi('emails');
}

async function getEmailById(emailId) {
    return fetchFromApi(`emails/${emailId}`);
}

async function getEmailContent(emailId) {
    return fetchFromApi(`emails/content/${emailId}`);
}

async function postData(endpoint, postData) {
    return fetchFromApi(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
}
async function postDataH(endpoint, postData, base64Credentials) {

    return fetchFromApi(endpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${base64Credentials}`
        },
        body: JSON.stringify(postData),
    });
}

async function getData(endpoint, getData) {
    return fetchFromApi(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(getData),
    });
}

export {
    fetchFromApi,
    postData,
    postDataH,
    getData,
    getEmails,
    getEmailById,
    getEmailContent
};