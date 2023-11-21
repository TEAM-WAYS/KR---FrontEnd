const BASE_URL = 'http://localhost:8080';

async function fetchFromApi(endpoint, options = {}) {
    const url = `${BASE_URL}/${endpoint}`;
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error fetching data from ${endpoint}. Status: ${response.status}, ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function postData(endpiont, postData) {
    return fetchFromApi(endpiont, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
}async function getData(endpiont, getData) {
    return fetchFromApi(endpiont, {
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
    getData
}