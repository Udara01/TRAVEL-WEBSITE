document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    signupForm.onsubmit = async function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const signup_username = document.getElementById('signup_username').value;
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const signUp_password = document.getElementById('signUp_password').value;
        //const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        fetch('http://localhost:3002/addData', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ signup_username, fullName, email, signUp_password}) // Send hashed password
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.message);
            // Show success message
            alert(data.message);
            // Redirect to a success page or show a success message
            setTimeout(() => {
                window.open('index.html', '_blank');

                // Close the current window
                window.close();
            }, 2000); // 2000 milliseconds = 2 seconds
        })
        .catch(err => console.error(err));
    };
});




