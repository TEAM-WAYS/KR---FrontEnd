import {
    postData
} from "./fetch";

const userName = document.getElementById("username");
const pwd = document.getElementById("password");
const pwdRe = document.getElementById("re-password");
const registerBtn = document.getElementById("register");
const responseMess = document.getElementById("response");

userName.innerText = "your username"
pwd.innerText = "your password"
pwdRe.innerText = "confirm your password"

registerBtn.addEventListener('click',()=>{
    const user = {
        userName : userName,
        pwd : pwd,
        role: "ROLE_ADMIN"
    }
    postData(user).then((resp)=> {
        responseMess.innerText = resp.body.innerText
    })

    window.location.href = "welcomepage.html"


})

