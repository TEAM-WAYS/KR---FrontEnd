import {
    postData
} from './fetch.js';

document.addEventListener('DOMContentLoaded', function () {

    const registerBtn = document.getElementById("register");

    registerBtn.addEventListener('click', () => {

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const pwdRe = document.getElementById("re-password").value;
        const responseMess = document.getElementById("response");

        if (password !== pwdRe) {
            responseMess.innerText = "Passwords do not match.";
            return;
        }

        const user = {
            userName: username,
            pwd: password,
            role: "ROLE_ADMIN"
        };

        postData("new-user", user)
            .then((data) => {
                console.log("response :", data);
                responseMess.innerText = data.message;
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                responseMess.innerText = error.message;
            });
    });
});