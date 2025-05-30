// Helper to get IMDB ID from URL
function getImdbId() {
    const match = window.location.pathname.match(/\/title\/(tt\d+)/);
    return match ? match[1] : null;
}

// Helper to determine if it's a series (episodes page or has 'TV Series' in metadata)
function isSeries() {
    // Check if URL contains /episodes or /season or /tv
    if (/\/episodes|\/season|\/tv/.test(window.location.pathname)) return true;
    // Fallback: check for 'TV Series' in the page
    const meta = document.querySelector('meta[property="og:type"]');
    if (meta && meta.content === 'video.tv_show') return true;
    return false;
}

function addPilayButton() {
    // Avoid adding the button multiple times
    if (document.getElementById('pilay-btn')) return;

    // Find the title element (h1)
    const titleHeader = document.querySelector('h1');
    if (!titleHeader) return;

    // Create the button
    const btn = document.createElement('button');
    btn.id = 'pilay-btn';
    btn.innerText = 'PILAY';
    btn.style.background = '#f5c518'; // IMDB yellow
    btn.style.color = '#000';
    btn.style.fontWeight = 'bold';
    btn.style.border = 'none';
    btn.style.borderRadius = '4px';
    btn.style.marginLeft = '12px';
    btn.style.padding = '6px 14px';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '1rem';
    btn.style.verticalAlign = 'middle';
    btn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';

    // On click, open the correct URL
    btn.onclick = function() {
        const imdbId = getImdbId();
        if (!imdbId) return;
        let url;
        if (isSeries()) {
            url = `https://player.smashy.stream/tv/${imdbId}?s=1&e=1`;
        } else {
            url = `https://player.smashy.stream/movie/${imdbId}`;
        }
        window.open(url, '_blank');
    };

    // Insert the button next to the title
    titleHeader.appendChild(btn);
}

// Wait for DOM to be ready and try to add the button
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addPilayButton);
} else {
    addPilayButton();
}

// Add PILAY buttons to episode list on /episodes/ page
function addPilayButtonsToEpisodes() {
    if (!/\/episodes/.test(window.location.pathname)) return;
    const imdbId = getImdbId();
    if (!imdbId) return;
    // Select all episode title divs
    const episodeTitles = document.querySelectorAll('div.ipc-title__text.ipc-title__text--reduced');
    episodeTitles.forEach(titleDiv => {
        // Avoid adding multiple buttons
        if (titleDiv.parentElement.querySelector('.pilay-episode-btn')) return;
        // Extract S1.E1 (season and episode)
        const match = titleDiv.textContent.match(/S(\d+)\.E(\d+)/i);
        if (!match) return;
        const season = match[1];
        const episode = match[2];
        // Create button
        const btn = document.createElement('button');
        btn.className = 'pilay-episode-btn';
        btn.innerText = 'PILAY';
        btn.style.background = '#f5c518';
        btn.style.color = '#000';
        btn.style.fontWeight = 'bold';
        btn.style.border = 'none';
        btn.style.borderRadius = '4px';
        btn.style.marginLeft = '12px';
        btn.style.padding = '4px 10px';
        btn.style.cursor = 'pointer';
        btn.style.fontSize = '0.95rem';
        btn.style.verticalAlign = 'middle';
        btn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
        btn.onclick = function(e) {
            e.stopPropagation();
            const url = `https://player.smashy.stream/tv/${imdbId}?s=${season}&e=${episode}`;
            window.open(url, '_blank');
        };
        // Insert button after the title text
        titleDiv.parentElement.appendChild(btn);
    });
}

// Also observe for SPA navigation (IMDB uses client-side routing)
const observer = new MutationObserver(() => {
    addPilayButton();
    addPilayButtonsToEpisodes();
});
observer.observe(document.body, { childList: true, subtree: true });

// Also run once on load
addPilayButtonsToEpisodes(); 