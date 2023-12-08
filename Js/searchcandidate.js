function searchCandidates() {
    const searchQuery = document.getElementById("searchQuery").value.toLowerCase();

    const filteredCandidates = candidates.filter(candidate => {

        return candidate.name.toLowerCase().includes(searchQuery) ||
            candidate.email.toLowerCase().includes(searchQuery) ||
            candidate.phone.toLowerCase().includes(searchQuery) ||
            candidate.resumfunction.searchCandidates()
        {
            const searchQuery = document.getElementById("searchQuery").value.toLowerCase();

            const filteredCandidates = candidates.filter(candidate => {

                return candidate.name.toLowerCase().includes(searchQuery) ||
                    candidate.email.toLowerCase().includes(searchQuery) ||
                    candidate.phone.toLowerCase().includes(searchQuery) ||
                    candidate.resumeUrl.toLowerCase().includes(searchQuery);
            });

            displayCandidates(filteredCandidates);
        }eUrl.toLowerCase().includes(searchQuery);
    });

    displayCandidates(filteredCandidates);
}
function goToCandidatePage() {
    // Navigate to the "Candidate" page
    window.location.href = 'candidate.html';
}