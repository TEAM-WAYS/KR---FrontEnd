import {
    postData
} from "./fetch";

const textInput = document.getElementById("text-input")
const response = document.getElementById("response")
const saveBtn = document.getElementById("save-btn")




saveBtn.addEventListener('click',()=>{
const application = {
    text : textInput
    }
    const resp = postData("application",application)
    if(resp.status === 'OK'){
        textInput.innerText = ""
         response.innerText= "SAVED"
    }else {
        response.innerText="error, try again"
    }

})

//----GO BACK WITH DOUBLE CLICK
document.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = "controlpanel.html"
})