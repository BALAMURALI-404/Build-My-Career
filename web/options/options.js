const saveBtn = document.getElementById("save");
const status = document.getElementById("status");

saveBtn.addEventListener("click", () => {
  const profile = {
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value
  };

  chrome.storage.local.set({ profile }, () => {
    status.textContent = "Saved successfully ✔";
    setTimeout(() => status.textContent = "", 2000);
  });
});
