// Assume this variable is set to true when the user logs in and false when they log out
let isLoggedIn = false;

// Function to check if the user is logged in
function checkLoginStatus() {
    if (!isLoggedIn) {
        // Redirect to the login page if not logged in
        window.location.href = '/Frontend/Home_page/index.html'; // Replace 'login.html' with your actual login page
    }
}

// Example usage
checkLoginStatus();


// Function to update the login button based on login status
function updateLoginButton() {
    const loginButton = document.getElementById('login-btn');
    const usernameDisplay = document.getElementById('usernameDisplay');
    
    if (isLoggedIn) {
        loginButton.textContent = 'Logout';
        usernameDisplay.textContent = 'Welcome, [username]'; // Replace [username] with the actual username
    } else {
        loginButton.textContent = 'Login';
        usernameDisplay.textContent = '';
    }
}

// Function to handle logout
function logout() {
    isLoggedIn = false;
    updateLoginButton();
}

// Example usage
updateLoginButton();