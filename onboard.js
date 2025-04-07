document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const exploreBtn = document.querySelector('.btn[href="index.html"]');
  
    // Form submission handler
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
     // 2 interests are 
     const checkedInterests = document.querySelectorAll('input[name="interests"]:checked');
     if (checkedInterests.length < 2) {
       alert('Please select at least 2 interests');
       return;
     }    
  
      // Get form data
      const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        interests: Array.from(checkedInterests).map(cb => cb.value)
      };
  
      // Save to localStorage 
      localStorage.setItem('userProfile', JSON.stringify(formData));
      
      // Show success and enable explore button
      alert('Profile saved successfully!');
      exploreBtn.style.opacity = '1';
      exploreBtn.style.pointerEvents = 'auto';
    });
  
    // Disable explore button if profile is incomplete
    exploreBtn.style.opacity = '0.5';
    exploreBtn.style.pointerEvents = 'none';
  });

  document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const exploreBtn = document.getElementById('explore-btn');
    const mentorSection = document.getElementById('mentor-assignment');
  
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validate form
      const checkedInterests = document.querySelectorAll('input[name="interests"]:checked');
      if (checkedInterests.length < 2) {
        alert('Please select at least 2 interests');
        return;
      }
       // Get form data
       const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        interests: Array.from(checkedInterests).map(cb => cb.value)
      };
  
      // Save to localStorage 
      localStorage.setItem('userProfile', JSON.stringify(formData));
      
  
     
      try {
        // Fetch mentors and assign
        const response =await fetch('https://json-server-vercel-three-ecru.vercel.app/mentors');
        const mentors = await response.json();
        const assignedMentor = assignMentor(mentors, formData.interests);
        displayMentor(assignedMentor);
  
        // Show success
        alert('Profile saved successfully!');
        mentorSection.style.display = 'block';
        exploreBtn.style.opacity = '1';
        exploreBtn.style.pointerEvents = 'auto';
      } catch (error) {
        console.error('Error assigning mentor:', error);
        alert('Profile saved, mentor assigned.');
      }
    });
  
    function assignMentor(mentors, interests) {
        const matchedMentor = mentors.find((mentor) => {
          return interests.some((interest) => {
            return mentor.category.toLowerCase().includes(interest.toLowerCase());
          });
        });
      
        return matchedMentor || mentors[0];
      }
  
    function displayMentor(mentor) {
      document.getElementById('mentor-name').textContent = mentor.name;
      document.getElementById('mentor-expertise').textContent = mentor.expertise;
      document.getElementById('mentor-category').textContent = mentor.category;
      //console.log("works")
      //document.getElementById('mentor-avatar').textContent = mentor.image;
      //console.log("done")
      
      // Generate avatar initials
      const initials = mentor.name.split(' ').map(n => n[0]).join('');
      document.getElementById('mentor-initials').textContent = initials;
      
      // Save mentor to localStorage
      localStorage.setItem('userMentor', JSON.stringify(mentor));
    }
  
    // Contact mentor button
    document.getElementById('contact-mentor').addEventListener('click', () => {
      const mentor = JSON.parse(localStorage.getItem('userMentor'));
      alert(`Contact ${mentor.name} at: ${mentor.name.replace(/\s/g, '').toLowerCase()}@mindsetuni.edu`);
    });
  });