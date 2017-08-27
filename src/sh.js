var cursor = document.getElementById("cursor"),
    input  = document.getElementById("term-input"),
    output = document.getElementsByClassName("prompt")[0];

cursor.classList.add("blink");

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
		var pre   = document.createElement("pre");

		pre.innerHTML = "$ ";
		pre.classList.add("prompt");
		input.value = "";
		output.classList.remove("prompt");
		output.classList.add("prompt-history");
		output = pre;
		document.body.insertBefore(pre, cursor);
	}
}

input.oninput = function (e) {
	output.innerHTML = "$ " + this.value;
}
