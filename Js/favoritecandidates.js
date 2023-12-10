
let candidates = [];

function addToFavorites(candidateId) {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate && !favoriteCandidates.some(fav => fav.id === candidate.id)) {
        favoriteCandidates.push(candidate);
        displayFavoriteCandidates();
    }
}

function removeFromFavorites(candidateId) {
    favoriteCandidates = favoriteCandidates.filter(fav => fav.id !== candidateId);
    displayFavoriteCandidates();
}

function displayFavoriteCandidates() {
    const favoriteList = document.getElementById("favoriteCandidates");
    favoriteList.innerHTML = "";

    favoriteCandidates.forEach(candidate => {
        const li = document.createElement("li");
        li.textContent = `${candidate.name} (${candidate.email}) `;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove from Favorites";
        removeButton.onclick = function() {
            removeFromFavorites(candidate.id);
        };
        li.appendChild(removeButton);
        favoriteList.appendChild(li);
    });
}
