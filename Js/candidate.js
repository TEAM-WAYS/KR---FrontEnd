
let candidates = [];

function displayCandidates() {
    const candidateList = document.getElementById("candidateList");
    candidateList.innerHTML = "";

    candidates.forEach((candidate, index) => {
        const row = candidateList.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${candidate.name}</td>
            <td>${candidate.email}</td>
            <td>${candidate.phone}</td>
            <td>${candidate.resumeUrl}</td>
        `;
    });
}

function clearForm() {
    const candidateForm = document.getElementById("candidateForm");
    candidateForm.reset();
}

// Test data
candidates = [
    { name: "Victoria Zhang", email: "victoria@example.com", phone: "88888888", resumeUrl: "https://example.com/resume" },
    { name: "Will Smith", email: "will@example.com", phone: "9999999", resumeUrl: "https://example.com/will_resume" },
];

displayCandidates();
