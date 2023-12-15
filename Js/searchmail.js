import {
    getData,
    postData,
    getApplicationTest,
    getApplicationsFromInq
} from './fetch.js';


//sessionStorage.setItem('', newJwtToken);
//const jwtToken = sessionStorage.getItem('jwtToken')

const searchBtn = document.getElementById("searchBtn")
const inquiry  = document.getElementById("inquiry")
const resultTable = document.getElementById("result-table")
const id = document.getElementById("id")
const name = document.getElementById("name")
const summary = document.getElementById("summary")
const email = document.getElementById("email")
let applicationList;
searchBtn.addEventListener("click", async () => {
    console.log("search button pushed")

    const inq = inquiry.value
    console.log(inq)
    console.log("Running connection tests:")


    //getApplicationsFromInq(inquiry.value).then((array)=>{
    getApplicationTest().then((array)=>{

        array.forEach((object)=>{
            console.log(object.id)
            console.log(object.points)
            console.log(object.reason)

        })
        array.forEach((object) => {
            const row = resultTable.insertRow(resultTable.length);
            const cell1 = row.insertCell(row.length)
            cell1.classList.add('cell1')

            cell1.innerHTML = object.reason
            cell1.addEventListener("click", (object)=>{
                id.innerHTML=object.id
            })
        })
    })


    /*console.log("Searching Applications")


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


        })*/

    })
//-----search result






//----GO BACK WITH DOUBLE CLICK
    document.addEventListener("dblclick", () => {
        console.log("clicked")
        window.location.href = "controlpanel.html"
    })


