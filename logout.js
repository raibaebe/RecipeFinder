window.addEventListener('load', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const signInButton = document.getElementById('signInButton');
    const logInButton = document.getElementById('logInButton');
    const logoutButton = document.getElementById('logoutButton');
    const userEmail = localStorage.getItem('userEmail');
    
    if (isLoggedIn === 'true') {
        signInButton.style.display = 'none';
        logInButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';
        document.getElementById('userEmailDisplay').innerHTML = "User: " + userEmail;
    } else {
        logoutButton.style.display = 'none';
        document.getElementById('userEmailDisplay').innerHTML = "";
    }

    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'Login.html';
    });
});