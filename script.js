// Big Goblins Clan – JavaScript interactivity

// Update footer year
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// Rank checker functionality
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
    // Simple mock rank checker: assign ranks based on length of name for demo purposes
    let rank;
    if (name.length >= 10) {
      rank = 'Elder Goblin';
    } else if (name.length >= 7) {
      rank = 'Chief Goblin';
    } else if (name.length >= 5) {
      rank = 'Scout Goblin';
    } else {
      rank = 'Novice Goblin';
    }
    resultEl.textContent = `${name}, your clan rank is: ${rank}`;
  });
}