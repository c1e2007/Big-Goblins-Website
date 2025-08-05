// Big Goblins Clan - enhanced JS interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Update footer year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Fetch and display stats
    fetch('data/stats.json')
        .then(response => response.json())
        .then(stats => {
            document.getElementById('total-members').textContent = stats.totalMembers;
            document.getElementById('avg-level').textContent = stats.averageTotalLevel;
            document.getElementById('maxed-percent').textContent = stats.maxedPercent + '%';
            document.getElementById('infernal-capers').textContent = stats.infernalCapers;
        });

    // Fetch collection logs
    fetch('data/logs.json')
        .then(response => response.json())
        .then(logs => {
            const list = document.getElementById('recent-logs');
            logs.forEach(log => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas ${log.icon}"></i> ${log.player} - ${log.item} (${log.date})`;
                list.appendChild(li);
            });
        });

    // Fetch achievements
    fetch('data/achievements.json')
        .then(res => res.json())
        .then(achievements => {
            const list = document.getElementById('recent-achievements');
            achievements.forEach(a => {
                const li = document.createElement('li');
                li.textContent = `${a.player} - ${a.description} (${a.date})`;
                list.appendChild(li);
            });
        });

    // Fetch earners
    fetch('data/earners.json')
        .then(res => res.json())
        .then(earners => {
            const container = document.getElementById('top-earners');
            earners.forEach(e => {
                const div = document.createElement('div');
                div.className = 'earner';
                div.innerHTML = `<strong>${e.name}</strong><span>${e.points} pts</span>`;
                container.appendChild(div);
            });
        });

    // Fetch events
    fetch('data/events.json')
        .then(res => res.json())
        .then(events => {
            const container = document.getElementById('upcoming-events');
            events.forEach(ev => {
                const card = document.createElement('div');
                card.className = 'event-card';
                card.innerHTML = `
                    <h3>${ev.title}</h3>
                    <p><strong>${ev.date}</strong> at <strong>${ev.time}</strong></p>
                    <p>${ev.description}</p>
                `;
                container.appendChild(card);
            });
        });

    // Fetch newsletter preview (display latest)
    fetch('data/newsletters.json')
        .then(res => res.json())
        .then(news => {
            const preview = document.getElementById('newsletter-preview');
            if (news.length) {
                const latest = news[0];
                preview.innerHTML = `
                    <h2 class="section-title">Newsletter</h2>
                    <p><strong>Issue ${latest.issue}: ${latest.title}</strong></p>
                    <p>${latest.description}</p>
                    <a href="${latest.link}" class="btn secondary">Read more</a>
                `;
            }
        });

    // Rank checker
    const rankForm = document.getElementById('rank-form');
    if (rankForm) {
        rankForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const rsnInput = document.getElementById('rsn');
            const resultEl = document.getElementById('rank-result');
            const name = rsnInput.value.trim();
            if (!name) {
                resultEl.textContent = 'Please enter a valid RSN.';
                return;
            }
            let rank;
            if (name.length >= 10) {
                rank = 'Goblin General';
            } else if (name.length >= 8) {
                rank = 'Goblin Shaman';
            } else if (name.length >= 6) {
                rank = 'Goblin Guard';
            } else {
                rank = 'Goblin Scavenger';
            }
            resultEl.textContent = `Your rank is: ${rank}`;
        });
    }
});
