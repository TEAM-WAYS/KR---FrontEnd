import {
    getData,
    postData
} from './fetch.js';
import {
    runApplResult
} from "./applsearchresult";

//sessionStorage.setItem('', newJwtToken);
const jwtToken = sessionStorage.getItem('jwtToken')

const searchBtn = document.getElementById("searchBtn")
const inquiry  = document.getElementById("inquiry")
let applicationList;
searchBtn.addEventListener("click", async () => {
    console.log("search button pushed")

    const inq = inquiry.value
    console.log(inq)
    console.log("token: " + jwtToken)
    console.log("Transforming mails")
    /*const answer = getData("emails/transform",jwtToken).then(()=>{
        console.log("response: "+answer)

        insert function here

    })*/

        postData ("application/search",inq,jwtToken).then((applications)=>{
            applications.forEach((appl)=>{
                console.log(appl.applicationId)
                console.log(appl.points)
                console.log(appl.reason)
            })
            applicationList = applications


        })

    })
//-----search result
const resultTable = document.getElementById("result-table")
function runApplResult() {
    applicationList.forEach((appl) => {
        const row = resultTable.insertRow(resultTable.length);
        const cell1 = row.insertCell(0)

        cell1.innerText = appl.reason
        cell1.insertAdjacentHTML('afterend', <button>Pick this One</button>)
    })
}



//----GO BACK WITH DOUBLE CLICK
    document.addEventListener("dblclick", () => {
        console.log("clicked")
        window.location.href = "controlpanel.html"
    })

    export {
        applicationList
    }
