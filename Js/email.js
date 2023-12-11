import {
    getEmails,
    getEmailContent
} from './fetch.js';

const emailContentHeading = document.getElementById("emailContent");

emailContentHeading.style.display = "none";

function showEmailContent() {
    emailContentHeading.style.display = "block";
}

function hideEmailContent() {
    emailContentHeading.style.display = "none";
}

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
                            <p><i <i class="fa-solid fa-highlighter"></i> ${emailContent.subject}</p>
             <p><i class="fa-solid fa-user"></i> ${emailContent.fromAddress}</p>
                <p><i class="fa-regular fa-calendar"></i> ${new Date(emailContent.sentDate).toLocaleString()}</p>
                  <p><i class="fa-solid fa-file-lines"></i> ${emailContent.content}</p>

            `;

            const emailList = document.getElementById("emailList");
            const listItem = emailList.querySelector(`[data-email-id="${emailId}"]`);
            if (listItem) {
                listItem.innerHTML = `<i class="fa-regular fa-envelope-open icon-browner"></i> ${emailContent.subject}`;
                showEmailContent();
            }
        } else {
            throw new Error('Invalid or empty response');
        }
    } catch (error) {
        console.error("Error fetching email content:", error);
        hideEmailContent();
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

        //arrays with emails
        const thisWeekEmails = [];
        const olderEmails = [];

        // Updater listen med den opdaterede liste af emails
        const emailList = document.getElementById("emailList");
        emailList.innerHTML = "";

        sortedEmails.forEach(email => {
            const sentDate = new Date(email.sentDate);

            if (isSameWeek(sentDate, new Date())) {
                thisWeekEmails.push(email);
            } else {
                olderEmails.push(email);
            }
        });

        if (thisWeekEmails.length > 0) {
            const weekHeader = document.createElement("li");
            weekHeader.innerHTML = `<strong>This Week</strong>`;
            emailList.appendChild(weekHeader);

            thisWeekEmails.forEach(email => {
                const listItem = document.createElement("li");
                const iconClass = email.seen ? 'fa-envelope-open' : 'fa-envelope';
                listItem.innerHTML = `<i class="fa-regular ${iconClass} icon-browner"></i> ${email.subject}`;
                listItem.dataset.emailId = email.id;
                listItem.addEventListener("click", () => fetchEmailContent(email.id));
                emailList.appendChild(listItem);
            });
        }

        if (olderEmails.length > 0) {
            const oldHeader = document.createElement("li");
            oldHeader.innerHTML = `<strong>Older Emails</strong>`;
            emailList.appendChild(oldHeader);

            olderEmails.forEach(email => {
                const listItem = document.createElement("li");
                const iconClass = email.seen ? 'fa-envelope-open' : 'fa-envelope';
                listItem.innerHTML = `<i class="fa-regular ${iconClass} icon-browner"></i> ${email.subject}`;
                listItem.dataset.emailId = email.id;
                listItem.addEventListener("click", () => fetchEmailContent(email.id));
                emailList.appendChild(listItem);
            });
        }
    } catch (error) {
        console.error("Error fetching and sorting emails:", error);
    }
}

function isSameWeek(date1, date2) {
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // 1 uge
    const diff = Math.abs(date1 - date2);
    return diff < oneWeek && date1.getDay() <= date2.getDay();
}