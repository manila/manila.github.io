const PROMPT = "$ ";

var cursor = document.getElementById("cursor"),
    input  = document.getElementById("character-buffer"),
    output = document.getElementsByClassName("prompt")[0],
    terminal = document.getElementById("term");

cursor.classList.add("blink");

function runCommand() {
	switch (parseCommand(input.value.toString())) {
		case "help":
			help();	
			break;	
		case "clear":
			clear();
			break;
		case "ls":
			ls(parseArgs(input.value));
			break;
		case "man":
			break;
		case "echo":
			print(parseArgs(input.value));
			break;
		case "cowsay":
			cowsay(parseArgs(input.value));
			break;
		case "pwd":
			print(window.location.href);
			break;
		case "cat":
			cat(parseArgs(input.value));
			break;
		case "cd"
			cd(parseArgs(input.value));
			break;
		case "":
			break;
		default:
			commandNotFound(parseCommand(input.value));
			break;
	}
	createNewPrompt();
	window.scrollTo(0, document.body.offsetHeight);
}

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
		return ""; }
}

function cat(args) {
	switch (args) {
		case "whoami.txt":
			terminal.appendChild(copyElement(document.getElementById("cat-whoami")));
			break;
		default:
			print('usage: cat filename');
			break;
	}	
}

function print(str) {
	var pre = document.createElement("pre");
	
	pre.innerHTML = str;
	terminal.appendChild(pre);
}

function cd(args) {
	switch (args) {
		case "":
			break;
		case "blog":
			print("redirecting...");
			setTimeout(function () {window.location.replace(args)}, 2000); }
			break;
		default:
			print("cd: " + args + ": No such file or directory");
			break;
	}
}

function ls(args) {
	switch (args) {
		case "links":
			terminal.appendChild(copyElement(document.getElementById("cat-links")));
			break;
		case "":
			print('<pre>about.txt <span class="highlight">links</span> whoami.txt</pre>');
			break;
		default:
			break;
	}
}

function help() {
	print(`<pre>available commands:
cat	print file to standard output
clear	clear the terminal screen
echo	display a line of text
help	ask for help (lol recursion)
ls	list directory contents
pwd	print name of working directory</pre>`);
}

function clear() {
	terminal.innerHTML = "";
}

function commandNotFound(command) {
	print(command + ": command not found\ntype help for a list of commands");
}

function cowsay(text) {
	if (text == "") {
		print("usage: cowsay exampletext");
	} else {
		print(text + "<br>  \\   ^__^<br>   \\  (oo)\\_______<br>      (__)\\       )\\/\\<br>          ||----w |<br>          ||     ||");
	}
}

function createNewPrompt() {
	var promptElem = document.createElement("pre");

	promptElem.innerHTML = PROMPT;
	promptElem.classList.add("prompt");
	input.value = "";
	output.classList.remove("prompt");
	output.classList.add("prompt-history");
	output = promptElem;
	terminal.appendChild(promptElem);
	terminal.appendChild(cursor);
}

function copyElement(elem) {
	var newElem = document.createElement(elem.tagName);
	newElem.innerHTML = elem.innerHTML;
	return newElem;
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
		runCommand();
	}
}

input.oninput = function (e) {
	output.innerHTML = PROMPT + this.value;
}
