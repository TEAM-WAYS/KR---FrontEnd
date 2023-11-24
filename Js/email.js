import {
    getEmails,
    getEmailById,
    getEmailContent,
    banEmail
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
                <button onclick="banEmailHandler('${emailContent.fromAddress}')">Ban Email</button>
            `;
        } else {
            throw new Error('Invalid or empty response');
        }
    } catch (error) {
        console.error("Error fetching email content:", error);
        throw error;
    }
}

async function banEmailHandler(emailAddress) {
    try {
        const hashedEmail = hashEmail(emailAddress);
        await banEmail(hashedEmail);
        console.log(`Email ${emailAddress} banned successfully.`);
    } catch (error) {
        console.error("Error banning email:", error);
    }
}

function hashEmail(email) {

    const hashedEmail = sha256(email);
    return hashedEmail;
}

async function sha256(input) {

    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedString = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashedString;
}
