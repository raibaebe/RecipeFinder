document.getElementById('logInForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('logInEmail').value;
    const password = document.getElementById('logInPassword').value;

    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'MainPage.html';
        
    } else {
        document.getElementById("alarmMessage").innerHTML = "Incorrect email or password.";
    }
});