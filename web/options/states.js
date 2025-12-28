export const AppState = {
  currentPage: "landing",
  isLoggedIn: true
};

export const userprofile = {
  first_name: "",
  middle_name: "",
  last_name: "",
  full_name: "",
  email: "",
  phone_number: "",
  address_line_1: "",
  city: "",
  state: "",
  gender: "",
  country: "",
  postal_code: "",
  address: "",
  country_phone_code: "",
  dob: "",
  current_employer: "",
  current_salary: "",
  expected_salary: "",
  experiance: "",
  linkedin: "",
  portfolio: "",
  github: "",
  skills: [],
  education: [{ institution: "", degree: "", field_of_study: "", graduation_date: "", start_date: "", grade: "",}],
  experiance: [{company:"",role:"",location:"",start_date: "",end_date:"",notper:""}]
}

export function setPage(page) {
  AppState.currentPage = page;
}
