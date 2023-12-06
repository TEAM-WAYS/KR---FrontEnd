
const loginBtn = document.getElementById("login")
const newUserBtn = document.getElementById("new-user")

loginBtn.addEventListener('click',()=>{
    window.location.href ="login.html"
})
newUserBtn.addEventListener('click',()=>{
    window.location.href ="newuser.html"
})


//----GO BACK WITH DOUBLE CLICK
document.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = "controlpanel.html"
})