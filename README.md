# manila.github.io

## What is this?



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

### Directory structure
```
/root
        index.html
        js/
                sh.js
                no.js
                ai.js
        css/
                screen.css
                port.css
                blink.css
 ```
### Capturing Input

we use a hidden input on the page with autofocus set to capture keyboard input.  This lets us abstract the input away from where we "print" the output.

I quickly discovered that the "onchange" method doesn't fire for every keystroke but rather each time the input loses focus. Fortunatly the "oninput" event method is perfect for making sure every keystroke results in a function call to update the view.

```JavaScript

input.oninput = function (e) {
        output.innerHTML = PROMPT + this.value;
}

```
In order to keep things in focus we add an "onclick" event listener to the document in order to call the focus method on the input.

```Javascript
document.onclick = function (e) {
        input.focus();
}
```
### Auto typing!

This was my favorite part, in the file ```ai.js``` we start with a function to type a single command into the terminal input, this is the typeCommand function, you'll notice that this takes a callback function as a paremeter to signal that it's finished typing.
Next we need to type a list of commands one right after another, this is the typeCommands function.

### Detecting JavaScript compatibility

In the js file ```no.js``` we use an onload event listener attatched to the body inorder to *hide* elements that would be visibile if JavaScript was enabled.  This keeps the website functional even in cases where JavaScript is not.

Why not ```<noscript>```? 

Elements in the ```<noscript>``` arn't loaded into the DOM if the conditions aren't met (e.g. JavaScript turned off).  This is problomatic because I use these as "template" elements for producing output on the terminal, for the sake of efficientcy I chose to only implement these elements once.  

When there is no JS the "no-js" div can't be disabled (this is done in the no.js file).  When there is JavaScript, the content is hidden and the elements are then, displayed with the nifty Auto Typing animation.


