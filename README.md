# Toasting

Toasting - is a javascript library for notifications. There is no dependencies need.

## Installing

### There is no npm or cdn is available yet. by now the only way is download code from folder dist.

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
    var toast = toasting.create(options);
```

## Options
There are the avilable config option for making toast. Only `title` is required. toast will default if config property is not specified.

```javascript
{
    // `title` is to set as title. This property is required or it will set to default one 'Default Title'.
    title: "this is title",

    // `text` is subtitle.
    text: "this is description.",
    
    // `type` is the toast type, there are 5 type that is available for now:
    // default if this key is not specified, 'success', 'warning', 'error' and 'info'.
    // By specified type, will set the background of toast.
    // You can modify color in src/scss/style/scss file.
    type: "info",

    // Enable toast to hover to pause. this key is true by default.
    isHoverToPause: true,

    // tell toast to hide itself after timeout. this key is true by default.
    autoHide: true,
    
    // Tell if you need to hide progress bar. this key is false by default.
    hideProgressBar: false,

    // set the type of the progress bar. there are 5 type are available by now:
    // default if this key is not specified, 'success', 'warning', 'error', 'info' and 'rainbow'.

    progressBarType: "rainbow",

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