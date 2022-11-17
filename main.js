"use strict"

const openBtn = document.getElementById("open-btn");
const fileBrowser = document.getElementById("file-browser");
const saveBtn = document.getElementById("save-btn");
const textbox = document.getElementById("textbox");

openBtn.addEventListener("click", () => {fileBrowser.click()});
fileBrowser.addEventListener("change", openFile);
saveBtn.addEventListener("click", downloadFile);
document.addEventListener("keydown", (e) => {
	if (e.ctrlKey && e.key === 'o') {
    e.preventDefault();
    fileBrowser.click();
  }
	else if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    downloadFile();
  }
});

function openFile(e) {
  const file = e.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
  	const text = e.target.result;
  	textbox.value = text;
	}
  reader.readAsText(file);
}

function downloadFile() {
  const filename = prompt("Enter filename:");

  if(filename === null || filename === "")
    return;

	const element = document.createElement("a");
	const text = textbox.value;
  const file = new Blob([text], {
    type: "text/plain"
  });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
}