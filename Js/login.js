import {
    postData,
    postDataH,
    getData
} from './fetch.js';



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
    const base64Credentials = btoa(userName+":"+pwd)
    postDataH("login-user",user,base64Credentials).then((resp)=>{
        responseMess.innerText = resp.body
        if(resp.accept){
            sessionStorage.setItem("securitytoken",)
            window.location.href = "frontpage.js"
        }
    })

})


//----GO BACK WITH DOUBLE CLICK
document.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = "controlpanel.html"
})

