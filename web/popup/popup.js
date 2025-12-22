const toggle = document.getElementById('toggle-button');
const openOptions = document.getElementById('open-options');

chrome.storage.sync.get(['enabled'],(res) => {
    toggle.checked = res.enabled;
})

toggle.addEventListener('change', (e) => {
    chrome.storage.sync.set({enabled: e.target.checked})
})

openOptions.addEventListener('click',() => {
    chrome.runtime.openOptionsPage();
})