import {
    getEmails,
    getEmailContent
} from './fetch.js';

document.addEventListener("DOMContentLoaded", () => {
    const emailList = document.getElementById("emailList");
    const emailContentDiv = document.getElementById("emailContent");

    getEmails()
        .then(emails => {
            emails.forEach(email => {
                const listItem = document.createElement("li");
                listItem.textContent = email.subject;
                listItem.dataset.emailId = email.id;
                listItem.addEventListener("click", () => {
                    fetchAndDisplayEmailContent(email.id);
                    emailContentDiv.style.display = "block";
                });
                emailList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching emails:", error));

    function fetchAndDisplayEmailContent(emailId) {
        getEmailContent(emailId)
            .then(response => {
                if (response && response.content) {
                    renderEmailContent(response.content);
                } else {
                    throw new Error('Invalid or empty response');
                }
            })
            .catch(error => console.error("Error fetching email content:", error));
    }

    function renderEmailContent(emailContent) {
        const emailSubject = document.getElementById("emailSubject");
        const emailFrom = document.getElementById("emailFrom");
        const emailSentDate = document.getElementById("emailSentDate");
        const contentDiv = document.getElementById("emailContentText");
        const attachmentsDiv = document.getElementById("emailContentAttachments");

        emailSubject.textContent = `Subject: ${emailContent.subject}`;
        emailFrom.textContent = `From: ${emailContent.fromAddress}`;
        emailSentDate.textContent = `Sent Date: ${new Date(emailContent.sentDate).toLocaleString()}`;
        contentDiv.innerHTML = `Email Content: 
        ${emailContent.content}`;

        renderAttachments(emailContent.attachments, attachmentsDiv);
    }

    function renderAttachments(attachments, attachmentsDiv) {
        if (attachments && attachments.length > 0) {
            attachmentsDiv.innerHTML = "<strong>Attachments:</strong>";
            attachments.forEach((attachment, index) => {
                const attachmentLink = document.createElement("a");
                if (attachment.contentType.startsWith("image")) {
                    const imgElement = document.createElement("img");
                    imgElement.src = `data:${attachment.contentType};base64,${attachment.data}`;
                    attachmentLink.appendChild(imgElement);
                } else {
                    attachmentLink.textContent = attachment.fileName || `Attachment ${index + 1}`;
                    attachmentLink.href = `data:${attachment.contentType};base64,${attachment.data}`;
                    attachmentLink.target = "_blank";
                }
                attachmentsDiv.appendChild(attachmentLink);
                attachmentsDiv.appendChild(document.createElement("br"));
            });
        } else {
            attachmentsDiv.innerHTML = "<strong>No Attachments</strong>";
        }
    }
});

//----GO BACK WITH DOUBLE CLICK
document.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = "controlpanel.html"
})