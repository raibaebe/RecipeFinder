

document.getElementById('signInForm').addEventListener('submit', function (event) {
    
    event.preventDefault();
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    if (email === "" || password === "") {
        document.getElementById("alarmMessage").innerHTML = "All fields are required.";
        document.getElementById("alarmMessage").style.color = 'rgb(237,73,86)';
        return;
    }
    if (!validateEmail(email)) {
        document.getElementById("alarmMessage").innerHTML = ("Please enter a valid email address.");
        document.getElementById("alarmMessage").style.color = 'rgb(237,73,86)';
        return;
    }
    if (password.length < 6) {
        document.getElementById("alarmMessage").innerHTML = "Password must be at least 6 characters long.";
        document.getElementById("alarmMessage").style.color = 'rgb(237,73,86)';
        return;
    }
    if (email && password) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);

        document.getElementById("alarmMessage").style.color = '#13795b';
        document.getElementById("alarmMessage").innerHTML = "Sign In successful! Go to the Login page!";
    }
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});