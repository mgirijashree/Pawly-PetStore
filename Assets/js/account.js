document.addEventListener('DOMContentLoaded', () => {
    // 1. Select the form and the save button
    const accountForm = document.getElementById('accountForm');
    const saveBtn = accountForm.querySelector('button[type="submit"]');

    // 2. Define the input fields (matching the structure of your HTML)
    const fields = {
        fullName: accountForm.querySelector('input[type="text"]:nth-of-type(1)'),
        email: accountForm.querySelector('input[type="email"]'),
        phone: accountForm.querySelector('input[type="text"]:nth-of-type(2)'),
        prefName: accountForm.querySelector('input[type="text"]:nth-of-type(3)'),
        bio: accountForm.querySelector('textarea')
    };

    // --- FUNCTION: Load data from LocalStorage ---
    const loadSettings = () => {
        const savedData = localStorage.getItem('pawly_user_settings');
        
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // Map the saved JSON keys back to the input values
            if (data.fullName) fields.fullName.value = data.fullName;
            if (data.email) fields.email.value = data.email;
            if (data.phone) fields.phone.value = data.phone;
            if (data.prefName) fields.prefName.value = data.prefName;
            if (data.bio) fields.bio.value = data.bio;
            
            console.log("Settings restored from local storage.");
        }
    };

    // --- FUNCTION: Save data to LocalStorage ---
    accountForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page from refreshing

        // Collect current values
        const userData = {
            fullName: fields.fullName.value,
            email: fields.email.value,
            phone: fields.phone.value,
            prefName: fields.prefName.value,
            bio: fields.bio.value,
            lastUpdated: new Date().toISOString()
        };

        // Save to localStorage as a String
        localStorage.setItem('pawly_user_settings', JSON.stringify(userData));

        // Visual Feedback for the user
        const originalContent = saveBtn.innerHTML;
        saveBtn.innerHTML = `Saved! <i class="bi bi-check-lg"></i>`;
        saveBtn.classList.replace('from-[#D84D57]', 'from-green-500');
        saveBtn.classList.replace('to-[#FF6A63]', 'to-green-400');

        // Reset button after 2 seconds
        setTimeout(() => {
            saveBtn.innerHTML = originalContent;
            saveBtn.classList.replace('from-green-500', 'from-[#D84D57]');
            saveBtn.classList.replace('to-green-400', 'to-[#FF6A63]');
        }, 2000);
    });

    // Run the load function immediately on page start
    loadSettings();
});