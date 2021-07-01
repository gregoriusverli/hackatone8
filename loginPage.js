const dataLogin = [
  {
      username: 'admin',
      password: 'admin'
    }
]


const usernameLogin = document.getElementById('username')

const passwordLogin = document.getElementById('password')

const buttonLogin = document.getElementById('loginButton')

const incorrectPassword = document.getElementById("checkerpsw")

loginButton.addEventListener ('click', (e) => {
    e.preventDefault();

    // checker apakah username dan password sudah sesuai dengan database

    let output;

    for (let i = 0; i < dataLogin.length; i++) {
        if (dataLogin[i].username === usernameLogin.value) {
            if (passwordLogin.value === dataLogin[i].password) {
                output = true
            } else {
                output = false
            }
        } else if (dataLogin[i].password === passwordLogin.value) {
            if (usernameLogin.value === dataLogin[i].username) {
                output = true
            } else {
                output = false
            }
        } else {
            output = false
        }
    }
        console.log(output)
        
    if (output === true) {
        return window.location.replace("/homepage.html")
    } else {
        return incorrectPassword.innerHTML = `Incorrect username or password`
    }
})

var fields = document.querySelectorAll(".textb input");
var btn = document.querySelector(".btn");
function check(){
    if(fields[0].value != "" && fields[1].value != "")
    btn.disabled = false;
    else
    btn.disabled = true;  
}

fields[0].addEventListener("keyup", check);
fields[1].addEventListener("keyup", check);

document.querySelector(".show-password").addEventListener("click", function() {
    if (this.classList[2] == "fa-eye-slash") {
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");
        fields[1].type = "text";
    } else {
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");
        fields[1].type = "password";
    }
});


