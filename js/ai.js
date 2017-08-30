function freezeCursor(cursorElement) {
	cursorElement.classList.remove("blink");
}

function unfreezeCursor(cursorElement) {
	cursorElement.classList.add("blink");
}

function typeCommands(commands) {
	if (commands.length > 0) {
		typeCommand(commands[0], function () {
			commands.shift();
			typeCommands(commands);
		});
	}
}

function typeCommand(command, callback) {
	var i = 0,
	    TYPE_SPEED = 64,
	    PAUSE_BETWEEN_COMMANDS = 1000;

	var typeTimer = setInterval(function () {
		if (i <= command.length) {
			freezeCursor(cursor);
			output.innerHTML = PROMPT + command.substr(0, i);
		} else {
			unfreezeCursor(cursor);
			input.value = command.substr(0, i);
			clearInterval(typeTimer);
			runCommand();
			if (callback) {
				setTimeout(callback, PAUSE_BETWEEN_COMMANDS);
			}
		}
		i++;
	}, TYPE_SPEED);
}

typeCommands(["echo Hello There!", "cowsay Nice to meet you!", "help", "ls"]);
