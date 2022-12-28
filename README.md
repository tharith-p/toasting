# Toasting
Toasting - is a javascript library for notifications. There is no dependencies needed.

## I created this just to test my coding skill and not well testd on production. If you use it on production you use it at your own risk.

## Installing


1. Link toasting.css
```html
<link href="./dist/css/toasting.css" rel="stylesheet"/>
```

2. Link toasting.js
```html
<script src="./dist/js/toasting.js"></script>
```

3. After DOM is loaded, the toasting is available as global variable
```js
    // Displing the default toast with default config.
    toasting.create();
    // or with custom config
    toasting.create([options]);
```

## Options
These are the avilable config option for making toast.
Remember these all are optional.
```javascript
{
    // `title` is to set as title. Default value is 'Default Title'.
    title: "this is title",

    // `text` is subtitle.
    text: "this is description.",
    
    // `type` is the toast type, there are 5 type that is available for now:
    // default if this key is not specified, 'success', 'warning', 'error' and 'info'.
    // By specified type, it will set the background of toast.
    // You can modify color in src/scss/style/scss file.
    type: ["info"|"success"|"warning"|"error"|"info"],

    // Enable toast to hover to pause. this key is true by default.
    isHoverToPause: [true|false],

    // tell toast to hide itself after timeout. this key is true by default.
    autoHide: [true|false],
    
    // Tell if you need to hide progress bar. this key is false by default.
    hideProgressBar: [false|true],

    // set the type of the progress bar. there are 6 type are available by now:
    // default if this key is not specified, 'success', 'warning', 'error', 'info' and 'rainbow'.
    progressBarType: ["rainbow"|"success"|"warning"|"error"|"info"],

    // set the timeout in milisecond for toast to hide itself. this key is 4000ms by default.
    timeout: 4000
}
```

## Callback

### onHide

Add event listener to run while toast is being close
```javascript
    var toast = toasting.create(options);
    toast.addEventListener('onHide', e => {
        console.log('This will confole when toast is prepare to hide.');
    });
```

### onHidden

Add event listener to run when toast is completly hidden
```javascript
    var toast = toasting.create(options);
    toast.addEventListener('onHidden', e => {
        console.log('This will confole when toast is been hidden.');
    });
```

## Methods

### hide
Hide toast immediately

```javascript
    var toast = toasting.create(options);
    toast.hide();
```