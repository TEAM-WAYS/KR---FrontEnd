import {
    candidates
} from './searchmail.js';
let candidateList ={
    id: null,
    name: null,
    summery: null,
    age: null,
    phone: null,
    title: null,
    profession: null
}
candidateList = JSON.parse(candidates)
const resultTable = document.getElementById("result-table")

candidateList.forEach((application)=>{
    const row = resultTable.insertRow(resultTable.length);
    const cell1 = row.insertCell(0)
    //const cell2 = row.insertCell(1)
    cell1.innerText = application.summery
    cell1.insertAdjacentHTML('afterend',<button >Pick this One</button>  )
})