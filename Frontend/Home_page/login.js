// login.js
/*document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    loginForm.onsubmit = function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:3002/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Redirect to a dashboard page or show a success message
        })
        .catch(err => {
            console.error(err);
            // Show an error message to the user
        });
    };
});
*/

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    loginForm.onsubmit = async function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:3002/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.message === 'Login successful') {
                // Set a flag in localStorage to indicate the user is logged in
                localStorage.setItem('isLoggedIn', 'true');

                // Redirect to a success page
                window.open('index.html', '_blank');

                // Close the current window
                window.close();
            } else {
                // Show an error message
                alert('Invalid username or password');
            }
        })
        .catch(err => {
            console.error(err);
            alert('Invalid username or password');
        });
    };
});
