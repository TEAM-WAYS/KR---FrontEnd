import {
    login
} from './fetch.js';

const userName = document.getElementById("username");
const pwd = document.getElementById("password");
const loginBtn = document.getElementById("login");
const responseMess = document.getElementById("response");
const newUserBtn = document.getElementById('goToNewUser');

newUserBtn.addEventListener("click", () =>{
    window.location.href = 'newuser.html';
});

loginBtn.addEventListener("click", () => {
    const user = {
        userName: userName.value,
        pwd: pwd.value
    };

    login(user)
        .then((resp) => {
            console.log('JSON Body:', resp);
            responseMess.innerText = resp.message;

            setTimeout(() => {
                window.location.href = "controlpanel.html";
            }, 3000);
        })
        .catch((error) => {
            console.error('Error during login:', error);
            responseMess.innerText = "wrong username or password";
        });
});