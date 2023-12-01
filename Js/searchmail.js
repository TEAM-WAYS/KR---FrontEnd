import {
    postData
} from './fetch';

const searchBtn = document.getElementById("searchBtn")
const inquiry  = document.getElementById("inquiry")
let candidates = {}

searchBtn.addEventListener("click", function (){
    console.log(inquiry.innerText)
    let inq = inquiry.innerText
    candidates = postData("email/search", inq)




})











//----GO BACK WITH DOUBLE CLICK
document.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = "controlpanel.html"
})