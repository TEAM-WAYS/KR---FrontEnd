function showEmployeeCandidates() {
    fetch('/api/candidates/employees')
        .then(response => response.json())
        .then(data => displayEmployeeCandidates(data))
        .catch(error => console.error('Error fetching employee candidates:', error));
}

function showEmployeesWithHiredDate() {
    fetch('/api/candidates/employees-with-hired-date')
        .then(response => response.json())
        .then(data => displayEmployeeCandidates(data))
        .catch(error => console.error('Error fetching employees with hired date:', error));
}

function displayEmployeeCandidates(data) {
    const employeeTable = document.getElementById('employeeTable');
    employeeTable.innerHTML = '';

    // Create table headers
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Name</th><th>Email</th><th>Hired Date</th><th>Action</th>';
    employeeTable.appendChild(headerRow);

    // Loop through employee candidates and display each row
    data.forEach(candidate => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${candidate.name}</td><td>${candidate.email}</td><td>${candidate.hiredDate}</td><td>Action Button</td>`;
        employeeTable.appendChild(row);
    });
}

// Test data
candidates = [
    { name: "Victoria Zhang", email: "victoria@example.com", phone: "88888888", resumeUrl: "https://example.com/resume" },
    { name: "Will Smith", email: "will@example.com", phone: "9999999", resumeUrl: "https://example.com/will_resume" },
];
