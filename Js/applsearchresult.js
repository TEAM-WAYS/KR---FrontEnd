import {
    applicationList
} from './searchmail.js';
import {
    getData
} from "./fetch";


const resultTable = document.getElementById("result-table")
function runApplResult() {
    applicationList.forEach((appl) => {
        const row = resultTable.insertRow(resultTable.length);
        const cell1 = row.insertCell(0)

        cell1.innerText = appl.reason
        cell1.insertAdjacentHTML('afterend', <button>Pick this One</button>)
    })
}

export {
    runApplResult
}