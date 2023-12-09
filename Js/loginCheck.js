function checkLogin() {
    const jwtToken = sessionStorage.getItem('jwtToken');
    if (!jwtToken) {
        console.log('User is not logged in. Redirecting to notLoggedIn.html.');
        window.location.href = 'notLoggedIn.html';
    } else {
        console.log('User is logged in.');
    }
}

export {
    checkLogin
};