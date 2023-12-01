import {
    getEmails,
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

async function fetchEmailContent(emailId) {
    try {
        const response = await getEmailContent(emailId);

        if (response && response.content) {
            const emailContent = response.content;
            const contentDiv = document.getElementById("emailContentText");

            contentDiv.innerHTML = `
                <p><strong>ID:</strong> ${emailContent.id}</p>
                <p><strong>Subject:</strong> ${emailContent.subject}</p>
                <p><strong>From:</strong> ${emailContent.fromAddress}</p>
                <p><strong>Sent Date:</strong> ${new Date(emailContent.sentDate).toLocaleString()}</p>
                <p><strong>Email Content:</strong> ${emailContent.content}</p>
            `;
        } else {
            throw new Error('Invalid or empty response');
        }
    } catch (error) {
        console.error("Error fetching email content:", error);
        throw error;
    }
}