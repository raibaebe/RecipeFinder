document.getElementById('logInForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('logInEmail').value;
    const password = document.getElementById('logInPassword').value;

    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'account.html'; // Redirect to the account page
    } else {
        document.getElementById("alarmMessage").innerHTML = "Incorrect email or password.";
    }
});
if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'account.html';
  accountLink.style.display = 'block'; // Show the "Account" link
    logoutButton.style.display = 'block'; // Show the "Logout" button
}
const accountLink = document.getElementById('account');