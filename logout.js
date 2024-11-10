window.addEventListener('load', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const accountLink = document.getElementById('account');
    const signInButton = document.getElementById('signInButton');
    const logInButton = document.getElementById('logInButton');
    const logoutButton = document.getElementById('logoutButton');
    const userEmail = localStorage.getItem('userEmail');
    
    if (isLoggedIn === 'true') {
        accountLink.style.display = 'inline-block'; // Show the "Account" link
        signInButton.style.display = 'none';
        logInButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';
        document.getElementById('userEmailDisplay').innerHTML = "User: " + userEmail;
    } else {
        accountLink.style.display = 'none'; // Hide the "Account" link
        logoutButton.style.display = 'none';
        document.getElementById('userEmailDisplay').innerHTML = "";
    }

    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
        accountLink.style.display = 'none'; // Hide the "Account" link on logout
        signInButton.style.display = 'inline-block';
        logInButton.style.display = 'inline-block';
        window.location.href = 'login.html'; // Redirect to login page
    });
});
