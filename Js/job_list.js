document.addEventListener("DOMContentLoaded", function () {


    // Hent joblisten fra serveren og vis den
    fetchJobList();

    function fetchJobList() {
        // Hent joblisten fra serveren
        fetch('http://localhost:8080/jobadvertisement/list') //
            .then(response => response.json())
            .then(data => {
                // Opdater HTML med joblisten
                updateJobList(data);
            })
            .catch(error => console.error('Error fetching job list:', error));
    }

    function updateJobList(jobList) {
        const jobListContainer = document.getElementById('jobList');

        // Tøm indholdet af joblisten, hvis der er noget
        jobListContainer.innerHTML = '';

        // fra jobliste tilføj hver jobannonce til HTMLen
        jobList.forEach(job => {
            const listItem = document.createElement('li');
            listItem.textContent = `${job.title}: ${job.description}`;
            jobListContainer.appendChild(listItem);
        });
    }
});
