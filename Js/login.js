import {
    getData
} from "./fetch";

const userName = document.getElementById("username");
const pwd = document.getElementById("password");
const loginBtn = document.getElementById("login");
const responseMess = document.getElementById("response");

userName.innerText = "username"
pwd.innerText = "password"

loginBtn.addEventListener("click",()=>{
    const  user ={
        userName : userName,
        pwd : pwd
    }
    getData("user",user).then((resp)=>{
        responseMess.innerText = resp.body
        if(resp.accept){
            sessionStorage.setItem("securitytoken",)
            window.location.href = "frontpage.js"
        }
    })

})

