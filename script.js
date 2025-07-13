// DOM Elements
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const registrationForm = document.getElementById('registrationForm');
const teamsList = document.getElementById('teamsList');
const teamSearch = document.getElementById('teamSearch');
const teamFilter = document.getElementById('teamFilter');
const teamsContainer = document.getElementById('teamsContainer');
const viewAllBtn = document.getElementById('viewAll');
const viewTop10Btn = document.getElementById('viewTop10');
const leaderboardBody = document.getElementById('leaderboardBody');
const lastUpdated = document.getElementById('lastUpdated');
const totalTeams = document.getElementById('totalTeams');
const matchesPlayed = document.getElementById('matchesPlayed');
const totalKills = document.getElementById('totalKills');
const avgPoints = document.getElementById('avgPoints');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const upcomingMatches = document.getElementById('upcomingMatches');
const completedMatches = document.getElementById('completedMatches');
const allMatches = document.getElementById('allMatches');

// Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
    document.body.setAttribute('data-theme', 
        document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    darkModeToggle.innerHTML = document.body.getAttribute('data-theme') === 'dark' ? 
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Save preference to localStorage
    localStorage.setItem('theme', document.body.getAttribute('data-theme'));
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Countdown Timer
function updateCountdown() {
    const tournamentDate = new Date('2023-12-15T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = tournamentDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    if (document.getElementById('days')) {
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    if (distance < 0) {
        clearInterval(countdownTimer);
        if (document.getElementById('days')) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
}

const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();

// Sample Teams Data
let teams = JSON.parse(localStorage.getItem('teams')) || [
    {
        id: 1,
        name: 'Alpha Squad',
        logo: 'https://via.placeholder.com/150',
        players: ['Player1', 'Player2', 'Player3', 'Player4'],
        email: 'alpha@example.com',
        phone: '1234567890',
        status: 'active',
        matches: 5,
        wins: 3,
        kills: 42,
        points: 120
    },
    {
        id: 2,
        name: 'Beta Warriors',
        logo: 'https://via.placeholder.com/150',
        players: ['PlayerA', 'PlayerB', 'PlayerC'],
        email: 'beta@example.com',
        phone: '9876543210',
        status: 'active',
        matches: 5,
        wins: 2,
        kills: 38,
        points: 95
    },
    {
        id: 3,
        name: 'Gamma Strikers',
        logo: 'https://via.placeholder.com/150',
        players: ['PlayerX', 'PlayerY', 'PlayerZ', 'PlayerW'],
        email: 'gamma@example.com',
        phone: '5551234567',
        status: 'pending',
        matches: 0,
        wins: 0,
        kills: 0,
        points: 0
    }
];

// Sample Matches Data
const matches = [
    {
        id: 1,
        team1: 'Alpha Squad',
        team2: 'Beta Warriors',
        team1Logo: 'https://via.placeholder.com/150',
        team2Logo: 'https://via.placeholder.com/150',
        date: '2023-11-15',
        time: '18:00',
        status: 'completed',
        winner: 'Alpha Squad',
        score: '12-8'
    },
    {
        id: 2,
        team1: 'Gamma Strikers',
        team2: 'Delta Force',
        team1Logo: 'https://via.placeholder.com/150',
        team2Logo: 'https://via.placeholder.com/150',
        date: '2023-11-22',
        time: '19:30',
        status: 'upcoming'
    },
    {
        id: 3,
        team1: 'Beta Warriors',
        team2: 'Echo Team',
        team1Logo: 'https://via.placeholder.com/150',
        team2Logo: 'https://via.placeholder.com/150',
        date: '2023-11-29',
        time: '20:00',
        status: 'upcoming'
    },
    {
        id: 4,
        team1: 'Alpha Squad',
        team2: 'Gamma Strikers',
        team1Logo: 'https://via.placeholder.com/150',
        team2Logo: 'https://via.placeholder.com/150',
        date: '2023-12-06',
        time: '18:30',
        status: 'upcoming'
    },
    {
        id: 5,
        team1: 'Delta Force',
        team2: 'Echo Team',
        team1Logo: 'https://via.placeholder.com/150',
        team2Logo: 'https://via.placeholder.com/150',
        date: '2023-11-08',
        time: '17:00',
        status: 'completed',
        winner: 'Delta Force',
        score: '15-5'
    }
];

// Registration Form
if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const teamName = document.getElementById('teamName').value.trim();
        const player1 = document.getElementById('player1').value.trim();
        const player2 = document.getElementById('player2').value.trim();
        const player3 = document.getElementById('player3').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const terms = document.getElementById('terms').checked;
        
        if (!teamName || !player1 || !player2 || !player3 || !email || !phone || !terms) {
            alert('Please fill all required fields and agree to the terms.');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Create new team
        const newTeam = {
            id: teams.length > 0 ? Math.max(...teams.map(t => t.id)) + 1 : 1,
            name: teamName,
            logo: document.getElementById('teamLogo').value.trim() || 'https://via.placeholder.com/150',
            players: [player1, player2, player3],
            email: email,
            phone: phone,
            status: 'pending',
            matches: 0,
            wins: 0,
            kills: 0,
            points: 0
        };
        
        // Add optional player 4 if provided
        const player4 = document.getElementById('player4').value.trim();
        if (player4) {
            newTeam.players.push(player4);
        }
        
        // Add to teams array
        teams.push(newTeam);
        
        // Save to localStorage
        localStorage.setItem('teams', JSON.stringify(teams));
        
        // Reset form
        registrationForm.reset();
        
        // Display registered teams
        displayRegisteredTeams();
        
        alert('Team registered successfully!');
    });
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Display registered teams on registration page
function displayRegisteredTeams() {
    if (!teamsList) return;
    
    teamsList.innerHTML = '';
    
    teams.forEach(team => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.innerHTML = `
            <h3>
                <img src="${team.logo}" alt="${team.name}">
                ${team.name}
            </h3>
            <div class="team-members">
                <p>${team.players[0]} (Leader)</p>
                ${team.players.slice(1).map(player => `<p>${player}</p>`).join('')}
            </div>
            <div class="team-contact">
                <p>Email: ${team.email}</p>
                <p>Phone: ${team.phone}</p>
            </div>
        `;
        teamsList.appendChild(teamCard);
    });
}

// Display teams on teams page
function displayTeams(filter = 'all', searchTerm = '') {
    if (!teamsContainer) return;
    
    let filteredTeams = [...teams];
    
    // Apply filter
    if (filter !== 'all') {
        filteredTeams = filteredTeams.filter(team => team.status === filter);
    }
    
    // Apply search
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredTeams = filteredTeams.filter(team => 
            team.name.toLowerCase().includes(term) || 
            team.players.some(player => player.toLowerCase().includes(term))
    }
    
    teamsContainer.innerHTML = '';
    
    if (filteredTeams.length === 0) {
        teamsContainer.innerHTML = '<p class="no-teams">No teams found matching your criteria.</p>';
        return;
    }
    
    filteredTeams.forEach(team => {
        const teamItem = document.createElement('div');
        teamItem.className = 'team-item';
        
        // Determine status class
        let statusClass = '';
        if (team.status === 'active') statusClass = 'status-active';
        else if (team.status === 'pending') statusClass = 'status-pending';
        else if (team.status === 'disqualified') statusClass = 'status-disqualified';
        
        teamItem.innerHTML = `
            <div class="team-header">
                <img src="${team.logo}" alt="${team.name}">
                <h3>${team.name}</h3>
            </div>
            <div class="team-body">
                <div class="team-meta">
                    <span>ID: #${team.id.toString().padStart(3, '0')}</span>
                    <span class="team-status ${statusClass}">${team.status}</span>
                </div>
                <div class="team-players">
                    <h4>Players (${team.players.length})</h4>
                    <ul>
                        ${team.players.map(player => `<li>${player}</li>`).join('')}
                    </ul>
                </div>
                <div class="team-contact">
                    <p>Email: ${team.email}</p>
                    <p>Phone: ${team.phone}</p>
                </div>
            </div>
        `;
        
        teamsContainer.appendChild(teamItem);
    });
}

// Display leaderboard
function displayLeaderboard(limit = null) {
    if (!leaderboardBody) return;
    
    // Sort teams by points (descending)
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
    
    // Apply limit if specified
    const displayTeams = limit ? sortedTeams.slice(0, limit) : sortedTeams;
    
    leaderboardBody.innerHTML = '';
    
    displayTeams.forEach((team, index) => {
        const row = document.createElement('tr');
        
        // Determine status class
        let statusClass = '';
        if (team.status === 'active') statusClass = 'status-active';
        else if (team.status === 'pending') statusClass = 'status-pending';
        else if (team.status === 'disqualified') statusClass = 'status-disqualified';
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td class="team-cell">
                <img src="${team.logo}" alt="${team.name}">
                ${team.name}
            </td>
            <td>${team.matches}</td>
            <td>${team.wins}</td>
            <td>${team.kills}</td>
            <td>${team.points}</td>
            <td><span class="team-status ${statusClass}">${team.status}</span></td>
        `;
        
        leaderboardBody.appendChild(row);
    });
    
    // Update stats
    if (totalTeams) {
        totalTeams.textContent = teams.length;
    }
    
    if (matchesPlayed) {
        const totalMatches = teams.reduce((sum, team) => sum + team.matches, 0);
        matchesPlayed.textContent = totalMatches;
    }
    
    if (totalKills) {
        const kills = teams.reduce((sum, team) => sum + team.kills, 0);
        totalKills.textContent = kills;
    }
    
    if (avgPoints) {
        const avg = teams.length > 0 ? 
            Math.round(teams.reduce((sum, team) => sum + team.points, 0) / teams.length : 0;
        avgPoints.textContent = avg.toFixed(1);
    }
    
    // Update last updated time
    if (lastUpdated) {
        const now = new Date();
        lastUpdated.textContent = now.toLocaleTimeString();
    }
}

// Display matches
function displayMatches() {
    if (!upcomingMatches || !completedMatches || !allMatches) return;
    
    const now = new Date();
    
    // Separate upcoming and completed matches
    const upcoming = matches.filter(match => match.status === 'upcoming');
    const completed = matches.filter(match => match.status === 'completed');
    
    // Display upcoming matches
    upcomingMatches.innerHTML = '';
    if (upcoming.length === 0) {
        upcomingMatches.innerHTML = '<p class="no-matches">No upcoming matches scheduled.</p>';
    } else {
        upcoming.forEach(match => {
            const matchCard = createMatchCard(match);
            upcomingMatches.appendChild(matchCard);
        });
    }
    
    // Display completed matches
    completedMatches.innerHTML = '';
    if (completed.length === 0) {
        completedMatches.innerHTML = '<p class="no-matches">No matches completed yet.</p>';
    } else {
        completed.forEach(match => {
            const matchCard = createMatchCard(match);
            completedMatches.appendChild(matchCard);
        });
    }
    
    // Display all matches
    allMatches.innerHTML = '';
    if (matches.length === 0) {
        allMatches.innerHTML = '<p class="no-matches">No matches scheduled yet.</p>';
    } else {
        matches.forEach(match => {
            const matchCard = createMatchCard(match);
            allMatches.appendChild(matchCard);
        });
    }
}

// Create match card element
function createMatchCard(match) {
    const matchCard = document.createElement('div');
    matchCard.className = 'match-card';
    
    // Determine status class
    let statusClass = '';
    if (match.status === 'upcoming') statusClass = 'status-upcoming';
    else if (match.status === 'completed') statusClass = 'status-completed';
    else if (match.status === 'live') statusClass = 'status-live';
    
    matchCard.innerHTML = `
        <div class="match-header">
            <span>${match.date} • ${match.time}</span>
            <span class="match-status ${statusClass}">${match.status}</span>
        </div>
        <div class="match-body">
            <div class="match-teams">
                <div class="team">
                    <img src="${match.team1Logo}" alt="${match.team1}">
                    <h4>${match.team1}</h4>
                </div>
                <div class="vs">VS</div>
                <div class="team">
                    <img src="${match.team2Logo}" alt="${match.team2}">
                    <h4>${match.team2}</h4>
                </div>
            </div>
    `;
    
    // Add result if match is completed
    if (match.status === 'completed') {
        matchCard.innerHTML += `
            <div class="match-result">${match.winner} won ${match.score}</div>
        `;
    }
    
    matchCard.innerHTML += `
            <div class="match-meta">
                <span>Match #${match.id}</span>
                <span>Best of 3</span>
            </div>
        </div>
    `;
    
    return matchCard;
}

// Tab functionality
if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Search and filter teams
if (teamSearch) {
    teamSearch.addEventListener('input', () => {
        const filterValue = teamFilter.value;
        const searchTerm = teamSearch.value;
        displayTeams(filterValue, searchTerm);
    });
}

if (teamFilter) {
    teamFilter.addEventListener('change', () => {
        const filterValue = teamFilter.value;
        const searchTerm = teamSearch.value;
        displayTeams(filterValue, searchTerm);
    });
}

// Leaderboard view options
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
        viewAllBtn.classList.add('active');
        viewTop10Btn.classList.remove('active');
        displayLeaderboard();
    });
}

if (viewTop10Btn) {
    viewTop10Btn.addEventListener('click', () => {
        viewTop10Btn.classList.add('active');
        viewAllBtn.classList.remove('active');
        displayLeaderboard(10);
    });
}

// Initialize displays based on current page
if (teamsList) {
    displayRegisteredTeams();
}

if (teamsContainer) {
    displayTeams();
}

if (leaderboardBody) {
    displayLeaderboard();
}

if (upcomingMatches) {
    displayMatches();
}

// Simulate live updates for leaderboard (every 30 seconds)
if (leaderboardBody) {
    setInterval(() => {
        // Randomly update some team stats for demo purposes
        teams.forEach(team => {
            if (team.status === 'active' && Math.random() > 0.7) {
                team.matches += 1;
                if (Math.random() > 0.5) team.wins += 1;
                team.kills += Math.floor(Math.random() * 10) + 5;
                team.points += Math.floor(Math.random() * 20) + 10;
            }
        });
        
        // Save updated teams
        localStorage.setItem('teams', JSON.stringify(teams));
        
        // Refresh leaderboard
        displayLeaderboard(viewTop10Btn.classList.contains('active') ? 10 : null);
    }, 30000);
}