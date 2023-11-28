import {
    postData
} from './fetch.js';




const userName = document.getElementById("username");
const pwd = document.getElementById("password");
const pwdRe = document.getElementById("re-password");
const registerBtn = document.getElementById("register");
const responseMess = document.getElementById("response");

userName.innerText = "wright a username"
pwd.innerText = "wright a password"
pwdRe.innerText = "reenter password"

registerBtn.addEventListener('click',()=>{
    const user = {
        userName : userName,
        pwd : pwd,
        role: "ROLE_ADMIN"
    }
    postData("new-user",user).then((resp)=> {
        console.log("response :"+resp)
        responseMess.innerText = resp.body.innerText
    })

    //window.location.href = "welcomepage.html"


})





//----GO BACK WITH DOUBLE CLICK
document.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = "controlpanel.html"
})

