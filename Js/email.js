import {
    getEmails,
    getEmailContent,
    markEmailAsForbidden  // Add this import for the new function
} from './fetch.js';

document.addEventListener("DOMContentLoaded", () => {
    getEmails()
        .then(emails => {
            const emailList = document.getElementById("emailList");
            emailList.innerHTML = "";

            emails.forEach(email => {
                const listItem = document.createElement("li");

                const iconClass = email.seen ? 'fa-envelope-open' : 'fa-envelope';
                listItem.innerHTML = `<i class="fa-regular ${iconClass} icon-browner"></i> ${email.subject}`;

                listItem.dataset.emailId = email.id;
                listItem.addEventListener("click", () => {
                    fetchEmailContent(email.id);
                    markEmailAsForbidden(email.id); // Add this line to mark the email as forbidden
                });

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

            // ÅBEN MAIL
            const emailList = document.getElementById("emailList");
            const listItem = emailList.querySelector(`[data-email-id="${emailId}"]`);
            if (listItem) {
                listItem.innerHTML = `<i class="fa-regular fa-envelope-open icon-browner"></i> ${emailContent.subject}`;
            }
        } else {
            throw new Error('Invalid or empty response');
        }
    } catch (error) {
        console.error("Error fetching email content:", error);
        throw error;
    }
}

// GO BACK WITH DOUBLE CLICK
document.addEventListener("dblclick", () => {
    console.log("clicked");
    window.location.href = "controlpanel.html";
});