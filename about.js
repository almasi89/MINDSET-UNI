document.addEventListener('DOMContentLoaded', () => {
    // Team Data
    const teamMembers = [
        {
            name: "Dr. Jane Muthoni",
            role: "Founder & Psychologist",
            bio: "Specializes in student mental health interventions.",
            img: "assets/jane.jpg" // Replace with actual path
        },
        {
            name: "John Kamau",
            role: "Tech Lead",
            bio: "Develops the platform to ensure seamless user experience.",
            img: "assets/john.jpg"
        },
        {
            name: "Amina Said",
            role: "Community Manager",
            bio: "Facilitates peer support networks and workshops.",
            img: "assets/amina.jpg"
        }
    ];

    // Dynamically Load Team
    const teamContainer = document.getElementById('teamContainer');
    if (teamContainer) {
        teamMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'team-member';
            memberCard.innerHTML = `
                <img src="${member.img}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p><strong>${member.role}</strong></p>
                <p>${member.bio}</p>
            `;
            teamContainer.appendChild(memberCard);
        });
    }
});