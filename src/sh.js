const PROMPT = "$ ";

var cursor = document.getElementById("cursor"),
    input  = document.getElementById("term-input"),
    output = document.getElementsByClassName("prompt")[0],
    terminal = document.getElementById("term");

cursor.classList.add("blink");

function helpMe() {
	var helpText = document.createElement("pre");
	
	helpText.innerHTML = "JS Shell 0.1 - Manuel Nila<br>available commands:<br><br>ls<br>help<br>man<br>clear";
	terminal.appendChild(helpText);
}

function commandNotFound(command) {
	var errorElem = document.createElement("pre");
	
	errorElem.innerHTML = command + ": command not found";
	terminal.appendChild(errorElem);
}

function createNewPrompt() {
	cursor.remove();	
	cursor = document.createElement("div");

	var promptElem = document.createElement("pre");

	promptElem.innerHTML = PROMPT;
	promptElem.classList.add("prompt");
	input.value = "";
	output.classList.remove("prompt");
	output.classList.add("prompt-history");
	output = promptElem;
	cursor.id = "cursor";
	terminal.appendChild(promptElem);
	terminal.appendChild(cursor);
}

document.onclick = function (e) {
	input.focus();
}

document.onkeydown = function (e) {
	cursor.classList.remove("blink");
}

document.onkeyup = function (e) {
	cursor.classList.add("blink");
}

input.onkeydown = function (e) {
	if (e && e.keyCode == 13) {
		switch (this.value) {
			case "help":
				helpMe();	
				break;	
			case "clear":
				terminal.innerHTML = "";
				break;
			case "ls":
				break;
			case "":
				break;
			default:
				commandNotFound(this.value);
				break;
		}
		createNewPrompt();
	}
	window.scrollTo(0, document.body.offsetHeight);
}

input.oninput = function (e) {
	output.innerHTML = PROMPT + this.value;
}
