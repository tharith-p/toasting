let 
    title           = '',
    text            = '',
    type            = 'default',
    progressBarType = 'rainbow',
    autoHide        = false,
    isHoverToPause  = true,
    hideProgressBar = false,
    duration        = 0;
    object          = {};

let toast;
function show() {
    toast = toasting.create(object);
};

let inputEvt = () => {
    title           = document.querySelector('#title').value;
    text            = document.querySelector('#text').value;
    type            = document.querySelector('input[name="type"]:checked').value;
    progressBarType = document.querySelector('input[name="pType"]:checked').value;
    autoHide        = document.querySelector('#autoHide').checked;
    isHoverToPause  = document.querySelector('#isHoverToPause').checked;
    hideProgressBar = document.querySelector('#hideProgressBar').checked;
    duration        = parseInt(document.querySelector('#duration').value);

    object = {}

    if (title !== '') {
        object['title'] = title;
    }

    if (text !== '') {
        object['text'] = text;
    }

    if (type !== 'default') {
        object['type'] = type;
    }

    if (!isHoverToPause) {
        object['isHoverToPause'] = false;
    }

    if (!autoHide) {
        object['autoHide'] = false;
    }

    if (hideProgressBar) {
        object['hideProgressBar'] = hideProgressBar;
    }

    if (progressBarType !== 'default') {
        object['progressBarType'] = progressBarType;
    }

    if (!isNaN(duration) && duration > 0) {
        object['timeout'] = duration;
    }
    document.querySelector('#ew').innerHTML = JSON.stringify(object, null, ' ');
}

document.querySelector('#btn').addEventListener('click', () => {
    show(title, text);
});

document.querySelectorAll('input').forEach(x => {
    x.addEventListener('input', e => {
        inputEvt();
    })
})
inputEvt();