# manila.github.io

## What is this?

Why I'm glad you asked!

This is my website, evidence of my passion, and maybe even inspiration for your own project
## What's going on here

It may be unoriginal or even cliche to imitate the terminal, But I don't care dammit!
This has been a fun project with plenty of fun problems to solve along the way.

## Okay, Okay. Tell me more

### My goals for this project

- Pure Javascript, CSS, and HTML.  No frameworks!
- Learn me some ECMA Script 6
- Be detailed and convicing
- Have fun (told you this was cliche)

### Capturing Input

we use a hidden input on the page with autofocus set to capture keyboard input.  This lets us abstract the input away from where we "print" the output.

I quickly discovered that the "onchange" method doesn't fire for every keystroke but rather each time the input loses focus. Fortunatly the "oninput" event method is perfect for making sure every keystroke results in a function call to update the view.

G
```JavaScript

input.oninput = function (e) {
        output.innerHTML = PROMPT + this.value;
}

```

In order to keep things in focus we add an "onclick" event listener to body in order to call focus 
