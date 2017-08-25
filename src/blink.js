var cursor = document.getElementById("cursor");

setInterval(function () {
	if (cursor.style.opacity == 0)
	{
		cursor.style.opacity = 1;
	}
	else
	{
		cursor.style.opacity = 0;
	}
}, 800);
