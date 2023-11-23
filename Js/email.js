import {
    getEmails,
    getEmailById,
    getEmailContent
} from './fetch.js';

document.addEventListener("DOMContentLoaded", () => {
    getEmails()
        .then(emails => {
            const emailList = document.getElementById("emailList");
            emailList.innerHTML = "";

            emails.forEach(email => {
                const listItem = document.createElement("li");
                listItem.textContent = email.subject;
                listItem.dataset.emailId = email.id;
                listItem.addEventListener("click", () => fetchEmailContent(email.id));
                emailList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching emails:", error));
});

function fetchEmailContent(emailId) {
    getEmailContent(emailId)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Error fetching email content. Status: ${response.status}, ${response.statusText}`);
            }
        })
        .then(content => {
            console.log("Response Content:", content);
            document.getElementById("emailContentText").innerHTML = `Content: ${content}`;
        })
        .catch(error => {
            console.error("Error fetching email content:", error);
            throw error;
        });
}