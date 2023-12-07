import {
    getEmails,
    getEmailContent
} from './fetch.js';

document.addEventListener("DOMContentLoaded", () => {
    const toggleThemeButton = document.getElementById("toggleTheme");
    const body = document.body;

    toggleThemeButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        updateToggleIcon();
    });

    function updateToggleIcon() {
        const darkModeActive = body.classList.contains("dark-mode");
        const iconClass = darkModeActive ? 'fa-toggle-on' : 'fa-toggle-off';

        toggleThemeButton.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
        toggleThemeButton.style.color = darkModeActive ? 'white' : '#333';
    }

    updateToggleIcon();

    // Function til at updatere button icon baseret på soorting order
    function updateSortButtonIcon() {
        const iconClass = sortByNewest ? 'fa-arrow-down-1-9' : 'fa-arrow-up-9-1';
        sortButton.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
    }


    const sortButton = document.getElementById("sortButton");
    let sortByNewest = true; // tracker currrent sorting order

    sortButton.addEventListener("click", () => {
        sortByNewest = !sortByNewest; // Toggle sorting ordere
        updateSortButtonIcon();
        sortEmails(sortByNewest);
    });

    getEmails()
        .then(emails => {
            const emailList = document.getElementById("emailList");
            emailList.innerHTML = "";

            emails.forEach(email => {
                const listItem = document.createElement("li");

                const iconClass = email.seen ? 'fa-envelope-open' : 'fa-envelope';
                listItem.innerHTML = `<i class="fa-regular ${iconClass} icon-browner"></i> ${email.subject}`;

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

async function sortEmails(sortByNewest) {
    try {
        const emails = await getEmails();

        const sortedEmails = emails.slice();

        // Sorter emails med sentDate
        sortedEmails.sort((a, b) => {
            const dateA = new Date(a.sentDate);
            const dateB = new Date(b.sentDate);

            if (sortByNewest) {
                return dateB - dateA; // Sorte from newest to oldest
            } else {
                return dateA - dateB; // Sort from oldesst to newst
            }
        });

        // Updater listen med den opdaterede liste af emails
        const emailList = document.getElementById("emailList");
        emailList.innerHTML = "";

        sortedEmails.forEach(email => {
            const listItem = document.createElement("li");

            const iconClass = email.seen ? 'fa-envelope-open' : 'fa-envelope';
            listItem.innerHTML = `<i class="fa-regular ${iconClass} icon-browner"></i> ${email.subject}`;

            listItem.dataset.emailId = email.id;
            listItem.addEventListener("click", () => fetchEmailContent(email.id));
            emailList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching and sorting emails:", error);
    }
}

document.addEventListener("dblclick", () => {
    console.log("clicked");
    window.location.href = "controlpanel.html";
});
