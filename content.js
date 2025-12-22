
const profile = window.BuildMyCareerProfile;
const negativeNameContexts = window.NEGATIVE_NAME_CONTEXT;

function classy(element){
    const signature = (element.type+" "+element.name+" "+element.id+" "+element.placeholder+" "+element.getAttribute("aria-label")).toLowerCase();


    if(signature.includes("email") || signature.includes("e-mail")) return "email";
    if(signature.includes("password")) return "password";
    if(signature.includes("linkedin")) return "linkedin";
    if(signature.includes("portfolio") || signature.includes("website")) return "portfolio";
    if(signature.includes("github")) return "github";

    if(signature.includes("gender") || signature.includes("sex")) return "gender";
    if(signature.includes("dob") || signature.includes("dateofbirth") || signature.includes("birthdate") || signature.includes("date of birth")) return "dob";

    if(signature.includes("postalcode")) return "postal_code";
    if(signature.includes("country")|| signature.includes("nationality")) return "country";
    if(signature.includes("state")) return "state";
    if(signature.includes("city")) return "city";
    if(signature.includes("street")) return "street";
    if(signature.includes("addressline1")) return "address_line_1";
    if(signature.includes("address")) return "address";

    if(signature.includes("countryphonecode")) return "country_phone_code";
    if(signature.includes("phonenumber") && signature.includes("extension")) return "phone_extension";
    if(signature.includes("phonenumber")) return "phone_number";
    if(signature.includes("phone") || signature.includes("mobile") || signature.includes("contact number"))return "phone_number";

    if(signature.includes("currentemployer") || signature.includes("current company") || signature.includes("current organisation")) return "current_employer";
    if(signature.includes("currentsalary") || signature.includes("current package") || signature.includes("current ctc")) return "current_salary";
    if(signature.includes("expectedsalary") || signature.includes("expected package") || signature.includes("expected ctc")) return "expected_salary";
    if(signature.includes("experience") || signature.includes("experiance") || signature.includes("total experience")) return "experiance";

    if(signature.includes("school") || signature.includes("university")) return "education_institution";
    if(signature.includes("degree") || signature.includes("qualification")) return "education_degree";
    if(signature.includes("field of study") || signature.includes("major") || signature.includes("fieldofstudy")) return "education_field_of_study";
    if(signature.includes("graduation year") || signature.includes("graduationyear") || signature.includes("year of passing") || signature.includes("yearofpassing") || signature.includes("lastyearattended")) return "education_graduation_year";
    if(signature.includes("start year") || signature.includes("startyear") || signature.includes("year of joining") || signature.includes("yearofjoining") || signature.includes("firstyearattended")) return "education_start_year";
    if(signature.includes("grade") || signature.includes("percentage") || signature.includes("cgpa")) return "education_grade";


    if(signature.includes("first name") || signature.includes("firstname") || signature.includes("given name")) return "first_name";
    if(signature.includes("middle name") || signature.includes("middlename")) return "middle_name";
    if(signature.includes("last name") || signature.includes("lastname") || signature.includes("surname") || signature.includes("family name")) return "last_name";
    if(signature.includes("name") && !negativeNameContexts.some(context => signature.includes(context))) return "full_name";
    if(signature.includes("full name") || signature.includes("fullname")) return "full_name";

    if(signature.includes("skill") && signature.includes("skills")) return "skills";

    return "unknown";
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getInputs(){
    console.log("Scanning Pages for inputs...");

    const inputs = document.querySelectorAll("input, textarea");
    console.log(`Found ${inputs.length} input fields.`);
    return inputs;
}

async function getSelects(){
    console.log("Scanning Pages for selects...");

    const inputs = document.querySelectorAll("select");
    console.log(`Found ${inputs.length} select fields.`);
    return inputs;
}

function processInputs(inputs){
    inputs.forEach((input, index) => {
        const fieldType = classy(input);
        console.log(`Processing input ${index + 1}/${inputs.length}: Detected as ${fieldType}`);
        if(fieldType !== "unknown" && profile.hasOwnProperty(fieldType)){
            autofillinput(input, fieldType);
        }
        if (fieldType === "skills" && !window.__skillsFilled) {
            window.__skillsFilled = true;
            fillSkills(profile.skills);
        }
    });
}

function processSelects(selects){
    selects.forEach((select, index) => {
        const fieldType = classy(select);
        console.log(`Processing select ${index + 1}/${selects.length}: Detected as ${fieldType}`);
        if(fieldType !== "unknown" && profile.hasOwnProperty(fieldType)){
            autofillselects(select, fieldType);
        }
    });
}

function autofillinput(input, fieldType) {
  if (!profile[fieldType]) return;

  if (input.value && input.value.trim() !== "") return;

  input.value = profile[fieldType];
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));

  console.log(`✔ Autofilled ${fieldType}`);
}

function autofillselects(select, fieldType) {
    const targetValue = profile[fieldType];
    if (!targetValue) return;

    if (select.selectedIndex > 0) return;
    if (select.querySelector("option[selected]")) return;
    if (select.classList.contains("select2-hidden-accessible")) return;

    const options = Array.from(select.options);

    const normalize = str => str.toLowerCase().replace(/[^a-z1-9+]/g,"");

    const normalizedTarget = normalize(targetValue);
    let matchedOption = null;

    for(const option of options){
        const optiontext = normalize(option.text);
        const optionvalue = normalize(option.value);

        if(optiontext.includes(normalizedTarget) || optionvalue.includes(normalizedTarget)){
            matchedOption = option;
            break;
        }
    }
    if(!matchedOption) {
        options.forEach(option => {
            const optiontext = normalize(option.text);
            const optionvalue = normalize(option.value);
            if(optiontext === "other" || optionvalue === "other"){
                matchedOption = option;
            }
        })
    }
    if(!matchedOption) return;

    select.value = matchedOption.value;
    select.dispatchEvent(new Event("change", { bubbles: true }));

}

async function fillSkills(skills){
    if (!Array.isArray(skills) || skills.length === 0) return;
    function normalize(str) {
        return str.toLowerCase().replace(/\(.*?\)/g, "").replace(/[^a-z0-9+#.]/g, "").trim();
    }
    const skillInput = document.activeElement;
    if (!skillInput || skillInput.tagName !== "INPUT") {
        console.log("❌ Skill input not focused. Click the skill field once.");
        return;
    }
    for (let skill of skills) {
        skillInput.value = skill;
        skillInput.dispatchEvent(new Event("input", { bubbles: true }));

        await sleep(700);
        const options = document.querySelectorAll(
            "[data-automation-id='promptOption']"
        );

        let found = false;
        const wanted = normalize(skill);

        for (const option of options) {
            const label =
                option.dataset.automationLabel ||
                option.innerText ||
                option.textContent;

            if (!label) continue;

            if (normalize(label) === wanted) {
                option.click();
                console.log(`✔ Added skill: ${skill}`);
                found = true;
                break;
            }
        }

        if (!found) {
            console.log(`✘ Skill not found: ${skill}`);
        }

        await sleep(800);
    }
}

async function main(){
    console.log("BuildMyCareer is running 🚀");
    const inputs = await getInputs();
    processInputs(inputs);
    const selects = await getSelects();
    processSelects(selects);
    setTimeout(main, 5000);
}

main();