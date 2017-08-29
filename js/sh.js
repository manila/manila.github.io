const PROMPT = "$ ";

var cursor = document.getElementById("cursor"),
    input  = document.getElementById("term-input"),
    output = document.getElementsByClassName("prompt")[0],
    terminal = document.getElementById("term");

cursor.classList.add("blink");

function parseCommand(str) {
	if (str.indexOf(" ") > 0) {
		return str.slice(0, str.indexOf(" "));
	} else {
		return str;
	}
}

function parseArgs(str) {
	if (str.indexOf(" ") > 0) {
		return str.slice(str.indexOf(" ") + 1);
	} else {
		return "";
	}
}

function print(str) {
	var pre = document.createElement("pre");
	
	pre.innerHTML = str;
	terminal.appendChild(pre);
}

function ls(args) {
	switch (args) {
		case "links":
			print('not ready yet');
			break;
		case "posts":
			print('not ready yet');
			break;
		case "":
			print('about.txt <span class="highlight">links</span> <span class="highlight">posts</span>');
			break;
		default:
			break;
	}
}

function help() {
	print("JS Shell 0.1 - Manuel Nila 2017<br>available commands:<br><br>ls<br>help<br>man<br>clear");
}

function clear() {
	terminal.innerHTML = "";
}

function commandNotFound(command) {
	print(command + ": command not found");
}

function cowsay(text) {
	if (text == "") {
		print("usage: cowsay exampletext");
	} else {
		print(text + "<br>  \\   ^__^<br>   \\  (oo)\\_______<br>      (__)\\       )\\/\\<br>          ||----w |<br>          ||     ||");
	}
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
		switch (parseCommand(this.value)) {
			case "help":
				help();	
				break;	
			case "clear":
				clear();
				break;
			case "ls":
				ls(parseArgs(this.value));
				break;
			case "man":
				break;
			case "echo":
				print(parseArgs(this.value));
				break;
			case "cowsay":
				cowsay(parseArgs(this.value));
				break;
			case "":
				break;
			default:
				commandNotFound(parseCommand(this.value));
				break;
		}
		createNewPrompt();
	}
	window.scrollTo(0, document.body.offsetHeight);
}

input.oninput = function (e) {
	output.innerHTML = PROMPT + this.value;
}