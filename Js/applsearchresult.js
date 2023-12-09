import {
    candidateList
} from './searchmail.js';
import {
    getData
} from "./fetch";


const resultTable = document.getElementById("result-table")

candidateList.forEach((o)=>{
    const row = resultTable.insertRow(resultTable.length);
    const cell1 = row.insertCell(0)

    cell1.innerText = o.reson
    cell1.insertAdjacentHTML('afterend',<button >Pick this One</button>  )
})