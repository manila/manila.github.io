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
	    TYPE_SPEED = 40,
	    PAUSE_BETWEEN_COMMANDS = 1200;

	var typeTimer = setInterval(function () {
		if (i <= command.length) {
			freezeCursor(cursor);
			output.innerHTML = PROMPT + command.substr(0, i);
		} else {
			unfreezeCursor(cursor);
			clearInterval(typeTimer);
			if (callback) {
				setTimeout(callback, PAUSE_BETWEEN_COMMANDS);
			}
		}
		i++;
	}, TYPE_SPEED);
}

typeCommands(["echo Hello There", "cowsay Hello!", "help", "echo JK Im all good dont help me"]);
