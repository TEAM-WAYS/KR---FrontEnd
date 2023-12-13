import {
    getData,
    postData,
    getApplicationTest
} from './fetch.js';


//sessionStorage.setItem('', newJwtToken);
//const jwtToken = sessionStorage.getItem('jwtToken')

const searchBtn = document.getElementById("searchBtn")
const inquiry  = document.getElementById("inquiry")
const resultTable = document.getElementById("result-table")
let applicationList;
searchBtn.addEventListener("click", async () => {
    console.log("search button pushed")

    const inq = inquiry.value
    console.log(inq)
    console.log("Running connection tests:")

    getApplicationTest().then((answer)=>{
        console.log(answer)
    })
    postData("application/testConnection").then((answer)=>{
        console.log(answer)
    })
    postData("application/testJSON").then((answer)=>{
        console.log(answer.name)
        console.log(answer.age)
    })
    postData("application/testJSONArray").then((answer)=>{
        answer.forEach((object)=>{
            console.log(object.name)
            console.log(object.age)
        })
    })

    console.log("Searching Applications")


        postData ("application/search",inq).then((applications)=>{
            applications.forEach((appl)=>{
                console.log(appl.applicationId)
                console.log(appl.points)
                console.log(appl.reason)
            })
            applicationList = applications

            applicationList.forEach((appl) => {
                const row = resultTable.insertRow(resultTable.length);
                const cell1 = row.insertCell(0)

                cell1.innerText = appl.reason
                //cell1.insertAdjacentHTML('afterend', <button>Pick this One</button>)
            })


        })

    })
//-----search result






//----GO BACK WITH DOUBLE CLICK
    document.addEventListener("dblclick", () => {
        console.log("clicked")
        window.location.href = "controlpanel.html"
    })

    export {
        applicationList
    }
