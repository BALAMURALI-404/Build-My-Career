import { AppState, userprofile } from "./states.js";


//routing buttons
const hero = document.getElementById("herosection");
const login = document.getElementById("loginsection");
const signup = document.getElementById("signupsection");
const profile = document.getElementById("profilesection");
const main = document.getElementById("main");

const lin = document.getElementById("lin-btn");
const lin1 = document.getElementById("lin-btn1");
const pf = document.getElementById("pf-btn");
const lout = document.getElementById("lout-btn");
const sup = document.getElementById("sup-btn");
const sup1 = document.getElementById("sup-btn1");
const navlogo = document.getElementById("nav-logo");
const getstarted = document.getElementById("get-started");

lin.addEventListener('click', activatelogin);
lin1.addEventListener('click', activatelogin);
lout.addEventListener('click', activatelogout);
pf.addEventListener('click', activateprofile);
navlogo.addEventListener('click', activatehero);
sup.addEventListener('click', activatesignup);
sup1.addEventListener('click', activatesignup);
getstarted.addEventListener('click',!AppState.isLoggedIn?activatelogin:activateprofile);


//routing
function activatehero(){
    hero.style.display="flex";
    login.style.display="none";
    signup.style.display="none";
    profile.style.display="none";
    main.style.height="90vh";
    AppState.currentPage="hero";
}
function activatelogin(){
    hero.style.display="none";
    login.style.display="flex";
    signup.style.display="none";
    profile.style.display="none";
    main.style.height="90vh";
    AppState.currentPage="login";
}
function activatesignup(){
    hero.style.display="none";
    login.style.display="none";
    signup.style.display="flex";
    profile.style.display="none";
    main.style.height="90vh";
    AppState.currentPage="signup";
}
function activateprofile(){
    hero.style.display="none";
    login.style.display="none";
    signup.style.display="none";
    profile.style.display="flex";
    main.style.height="90%";
    AppState.currentPage="profile";
}
function activatelogout(){
    AppState.isLoggedIn=false;
}
function showProfileLogoutBtn(){
    if(AppState.isLoggedIn){
        pf.style.display="block";
        lout.style.display="block";
    }
    else{
        pf.style.display="none";
        lout.style.display="none";
    }
}
function showLoginSignupBtn(){
    if(AppState.isLoggedIn){
        sup.style.display="none";
        lin.style.display="none";
    }
    else{
        sup.style.display="block";
        lin.style.display="block";
    }
}
showProfileLogoutBtn();
showLoginSignupBtn();


//adding Education
const edulist = document.getElementById("education-list");
const addedu = document.getElementById("add-education");

function renderEducation() {
  edulist.innerHTML = "";

  userprofile.education.forEach((edu, index) => {
    const div = document.createElement("div");
    div.className = "edu-item";

    div.innerHTML = `
      <div>
        <label for="eduinst">School/Institution:</label>
        <input placeholder="Institution" id="eduinst" value="${edu.institution || ""}" data-field="institution" />
      </div>
      <div>
        <label for="edudeg">Degree:</label>
        <input placeholder="Degree" id="edudeg" value="${edu.degree || ""}" data-field="degree" />
      </div>
      <div>
        <label for="edufield">Field Of Study:</label>
        <input placeholder="Field" id="edufield" value="${edu.field_of_study || ""}" data-field="field" />
      </div>
      <div>
        <label for="edusy">Starting Date:</label>
        <input type="date" placeholder="Start Year" id="edusy" value="${edu.start_date || ""}" data-field="startYear" />
      </div>
      <div>
        <label for="eduey" >Graduation Date:</label>
        <input type="date" placeholder="End Year" id="eduey" value="${edu.graduation_date || ""}" data-field="endYear" />
      </div>
      <div>
        <label for="edugrade">Grade/Percentage:</label>
        <input type="number" placeholder="Grade" id="edugrade" value="${edu.grade || ""}" data-field="grade" />
      </div>
      <div>
        <button data-remove="${index}">Delete</button>
      </div>
    `;

    div.querySelectorAll("input").forEach(input => {
      input.addEventListener("input", e => {
        const field = e.target.dataset.field;
        userprofile.education[index][field] = e.target.value;
      });
    });

    div.querySelector("[data-remove]").addEventListener("click", () => {
      userprofile.education.splice(index, 1);
      renderEducation();
    });

    edulist.appendChild(div);
  });
}

document.getElementById("add-education").addEventListener("click", () => {
  userprofile.education.push({
    institution: "",
    degree: "",
    field_of_study: "",
    start_date: "",
    graduation_date: "",
    grade:""
  });

  renderEducation();
});

renderEducation();


//adding Experiance
const explist = document.getElementById("experiance-list");
const addexp = document.getElementById("add-experiance");

function renderExperiance() {
  explist.innerHTML = "";

  userprofile.experiance.forEach((exp, index) => {
    const div = document.createElement("div");
    div.className = "edu-item";

    div.innerHTML = `
      <div>
        <label for="expinst">Company/Organisation:</label>
        <input placeholder="Company/Organisation" id="expinst" value="${exp.company || ""}" data-field="institution" />
      </div>
      <div>
        <label for="expdeg">Role:</label>
        <input placeholder="Role" id="expdeg" value="${exp.role || ""}" data-field="degree" />
      </div>
      <div>
        <label for="expfield">Location:</label>
        <input placeholder="Location" id="expfield" value="${exp.location || ""}" data-field="field" />
      </div>
      <div>
        <label for="expsy">Starting Date:</label>
        <input type="date" placeholder="Start Year" id="expsy" value="${exp.start_date || ""}" data-field="startYear" />
      </div>
      <div>
        <label for="expey" >Ending Date:</label>
        <input type="date" placeholder="End Year" id="expey" value="${exp.end_date || ""}" data-field="endYear" />
      </div>
      <div>
        <label for="expgrade">Notice Period (in days):</label>
        <input type="number" placeholder="Notice Period (in days)" id="expgrade" value="${exp.notper || ""}" data-field="grade" />
      </div>
      <div>
        <button data-remove="${index}">Delete</button>
      </div>
    `;

    div.querySelectorAll("input").forEach(input => {
      input.addEventListener("input", e => {
        const field = e.target.dataset.field;
        userprofile.experiance[index][field] = e.target.value;
      });
    });

    div.querySelector("[data-remove]").addEventListener("click", () => {
      userprofile.experiance.splice(index, 1);
      renderExperiance();
    });

    explist.appendChild(div);
  });
}

document.getElementById("add-experiance").addEventListener("click", () => {
  userprofile.experiance.push({
    company: "",
    role: "",
    location: "",
    start_date: "",
    graduation_date: "",
    notper:""
  });

  renderExperiance();
});

renderExperiance();