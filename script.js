// Big Goblins Clan - enhanced JS interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Update footer year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Fetch and display stats with error handling
    fetch('data/stats.json')
        .then(response => response.json())
        .then(stats => {
            document.getElementById('total-members').textContent = stats.totalMembers || '–';
            document.getElementById('avg-level').textContent = stats.averageTotalLevel || '–';
            document.getElementById('maxed-percent').textContent = stats.maxedPercent ? stats.maxedPercent + '%' : '–';
            const infernalElement = document.getElementById('infernal-cape') || document.getElementById('infernal-capers');
            if (infernalElement) {
                infernalElement.textContent = stats.infernalCapers || '–';
            }
        })
        .catch(error => {
            console.log('Stats data not available yet');
            // Keep default placeholder values
        });

    // Fetch collection logs with error handling
    fetch('data/logs.json')
        .then(response => response.json())
        .then(logs => {
            const list = document.getElementById('recent-logs');
            if (list) {
                if (logs && logs.length > 0) {
                    list.innerHTML = ''; // Clear existing content
                    logs.forEach(log => {
                        const li = document.createElement('li');
                        li.innerHTML = `<i class="fas ${log.icon}"></i> ${log.player} - ${log.item} (${log.date})`;
                        list.appendChild(li);
                    });
                } else {
                    list.innerHTML = '<li class="table-row"><!-- No collection logs available yet --></li>';
                }
            }
        })
        .catch(error => {
            console.log('Collection logs data not available yet');
        });

    // Fetch achievements with error handling
    fetch('data/achievements.json')
        .then(res => res.json())
        .then(achievements => {
            const list = document.getElementById('recent-achievements');
            if (list) {
                if (achievements && achievements.length > 0) {
                    list.innerHTML = ''; // Clear existing content
                    achievements.forEach(a => {
                        const li = document.createElement('li');
                        li.textContent = `${a.player} - ${a.achievement} (${a.date})`;
                        list.appendChild(li);
                    });
                } else {
                    list.innerHTML = '<li class="table-row"><!-- No achievements available yet --></li>';
                }
            }
        })
        .catch(error => {
            console.log('Achievements data not available yet');
        });

    // Fetch earners with error handling
    fetch('data/earners.json')
        .then(res => res.json())
        .then(earners => {
            const container = document.getElementById('top-earners');
            if (container) {
                if (earners && earners.length > 0) {
                    container.innerHTML = ''; // Clear existing content
                    earners.forEach(e => {
                        const div = document.createElement('div');
                        div.className = 'earner';
                        div.innerHTML = `<strong>${e.name}</strong><span>${e.points} pts</span>`;
                        container.appendChild(div);
                    });
                } else {
                    container.innerHTML = '<!-- No earners data available yet -->';
                }
            }
        })
        .catch(error => {
            console.log('Earners data not available yet');
        });

    // Fetch events with error handling
    fetch('data/events.json')
        .then(res => res.json())
        .then(events => {
            const container = document.getElementById('upcoming-events');
            if (container) {
                if (events && events.length > 0) {
                    container.innerHTML = ''; // Clear existing content
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
                } else {
                    container.innerHTML = '<!-- No upcoming events available yet -->';
                }
            }
        })
        .catch(error => {
            console.log('Events data not available yet');
        });

    // Fetch newsletter preview with error handling (display latest)
    fetch('data/newsletters.json')
        .then(res => res.json())
        .then(news => {
            const preview = document.getElementById('newsletter-preview');
            if (preview) {
                if (news && news.length > 0) {
                    const latest = news[0];
                    preview.innerHTML = `
                        <h2 class="section-title">Newsletter</h2>
                        <p><strong>Issue ${latest.issue}: ${latest.title}</strong></p>
                        <p>${latest.description}</p>
                        <a href="${latest.link}" class="btn secondary">Read more</a>
                    `;
                } else {
                    preview.innerHTML = `
                        <h2 class="section-title">Newsletter</h2>
                        <p><!-- No newsletters available yet --></p>
                    `;
                }
            }
        })
        .catch(error => {
            console.log('Newsletter data not available yet');
        });

    // Load newsletter listing for newsletter page
    const newslettersList = document.getElementById('newsletters-list');
    if (newslettersList) {
        fetch('data/newsletters.json')
            .then(res => res.json())
            .then(newsletters => {
                if (newsletters && newsletters.length > 0) {
                    newsletters.forEach(newsletter => {
                        const preview = document.createElement('div');
                        preview.className = 'newsletter-preview';
                        preview.id = `issue-${newsletter.issue}`;
                        preview.innerHTML = `
                            <div class="newsletter-image">
                                <i class="fas fa-newspaper"></i>
                            </div>
                            <div class="newsletter-content">
                                <h3>${newsletter.title}</h3>
                                <p>${newsletter.description}</p>
                                <a href="${newsletter.link}" class="btn tertiary">Download PDF</a>
                            </div>
                        `;
                        newslettersList.appendChild(preview);
                    });
                } else {
                    newslettersList.innerHTML = '<!-- No newsletters available yet -->';
                }
            })
            .catch(error => {
                console.log('Newsletter data not available yet');
            });
    }

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
