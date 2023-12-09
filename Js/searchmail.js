import {
    getData,
    postData
} from './fetch.js';

//sessionStorage.setItem('', newJwtToken);
const jwtToken = sessionStorage.getItem('jwtToken')

const searchBtn = document.getElementById("searchBtn")
const inquiry  = document.getElementById("inquiry")
let candidateList

searchBtn.addEventListener("click", ()=>{
    console.log("search button pushed")

    const inq = inquiry.value
    console.log(inq)
    console.log("token: "+jwtToken)
    console.log("Transforming mails")
    /*const answer = getData("emails/transform",jwtToken).then(()=>{
        console.log("response: "+answer)

        insert function here

    })*/

    const answer = postData("application/search",inq,jwtToken).then(()=>{
            console.log("###candidates: "+answer)
            candidateList = JSON.parse(answer)
            console.log(answer)
        })

    })



//----GO BACK WITH DOUBLE CLICK
document.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = "controlpanel.html"
})

export {
    candidateList
}