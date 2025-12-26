const hero = document.getElementById("herosection");
const login = document.getElementById("loginsection");
const signup = document.getElementById("signupsection");
const profile = document.getElementById("profilesection");
const main = document.getElementById("main");

function activatehero(){
    hero.style.display="flex";
    login.style.display="none";
    signup.style.display="none";
    profile.style.display="none";
    main.style.height="90vh";
}
function activatelogin(){
    hero.style.display="none";
    login.style.display="flex";
    signup.style.display="none";
    profile.style.display="none";
    main.style.height="90vh";
}
function activatesignup(){
    hero.style.display="none";
    login.style.display="none";
    signup.style.display="flex";
    profile.style.display="none";
    main.style.height="90vh";
}
function activateprofile(){
    hero.style.display="none";
    login.style.display="none";
    signup.style.display="none";
    profile.style.display="flex";
    main.style.height="90%";
}

