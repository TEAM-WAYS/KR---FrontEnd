import {
    postData
} from './fetch.js';

const userName = document.getElementById("username");
const pwd = document.getElementById("password");
const loginBtn = document.getElementById("login");
const responseMess = document.getElementById("response");

loginBtn.addEventListener("click", () => {
    const user = {
        userName: userName.value,
        pwd: pwd.value
    };

    postData("login-user", user).then((resp) => {
        responseMess.innerText = resp.body;
        if (resp.success) {
            sessionStorage.setItem("securitytoken", resp.token); // Assuming your response contains a token
            window.location.href = "frontpage.js";
        }
    });
});





//----GO BACK WITH DOUBLE CLICK
document.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = "controlpanel.html"
})

