
(function (root, factory) {
    try {
        // commonjs
        if (typeof exports === 'object') {
            module.exports = factory();
            // global
        } else {
            root.toast = factory();
        }
    } catch (error) {
        console.log('Isomorphic compatibility is not supported at this time for toast.')
    }
})(this, function () {
    
    // We need DOM to be ready
    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('DOMContentLoaded', init);
    }
    
    // Create toast object
    toast = {
        // In case toast creation is attempted before dom has finished loading!
        create: function () {
            console.error([
                'DOM has not finished loading.',
                '\tInvoke create method when DOM\s readyState is complete'
            ].join('\n'))
        }
    };
    var autoincrement = 0;
    
    // Initialize library
    function init() {
        // Toast container
        var container = document.createElement('div');
        container.id = 'toasting-container';
        document.body.appendChild(container);
        
        // @Override
        // Replace create method when DOM has finished loading
        toast.create = function (options) {
            var timeout = 4000;

            if (options.timeout) {
                timeout = options.timeout;
            }

            var toast = document.createElement('div');
            toast.id = ++autoincrement;
            toast.id = 'toast-' + toast.id;
            toast.className = 'cooltoast-toast';


            var wrapper = document.createElement('div');
            
            
            // title
            if (options.title) {
                var h4 = document.createElement('h4');
                h4.className = 'cooltoast-title';
                h4.innerHTML = options.title;
                wrapper.appendChild(h4);
            }
            
            // text
            if (options.text) {
                var p = document.createElement('p');
                p.className = 'cooltoast-text';
                p.innerHTML = options.text;
                wrapper.appendChild(p);
            }
            
            // icon
            if (options.icon) {
                var img = document.createElement('img');
                img.src = options.icon;
                img.className = 'cooltoast-icon';
                wrapper.appendChild(img);
            }

            if (typeof options.hideProgressBar === 'boolean' && !options.hideProgressBar) {

                var cssAnimation    = document.createElement('style');
                cssAnimation.id     = `style-${toast.id}`
                cssAnimation.type   = 'text/css';
                var rules = document.createTextNode(`
                    @keyframes animate-${autoincrement} {
                        0% {
                            width: 100%
                        }
                        100% {
                            width: 0%;
                        }
                    }
                `);
                cssAnimation.appendChild(rules);
                document.getElementsByTagName('head')[0].appendChild(cssAnimation);

                var progressBar                             = document.createElement('div');
                progressBar.classList                       = 'progress-bar';
                progressBar.style.animationName             = `animate-${autoincrement}`;
                progressBar.style.animationDuration         = `${timeout/1000}s`;
                progressBar.style.animationTimingFunction   = 'linear';
                progressBar.style.animationFillMode         = 'forwards';

                wrapper.appendChild(progressBar);
            }
            
            // click callback
            if (typeof options.callback === 'function') {
                toast.addEventListener('click', options.callback);
            }
            
            // toast api
            toast.hide = function () {
                toast.className += ' cooltoast-fadeOut';
                toast.addEventListener('animationend', removeToast, false);

            };
            if(typeof options.autoHide === 'undefined') {
                setTimeout(toast.hide, timeout + 200);
            } else if (typeof options.autoHide === 'boolean' && options.autoHide) {
                setTimeout(toast.hide, timeout + 200);
            }
            
            if (options.type) {
                toast.className += ' cooltoast-' + options.type;
            }
            
            toast.addEventListener('click', toast.hide);
            
            
            function removeToast() {
                document.getElementById('toasting-container').removeChild(toast);
                let style = document.querySelector(`#style-${toast.id}`);
                if (style) {
                    style.remove();
                }
            }

            toast.appendChild(wrapper);
            
            document.getElementById('toasting-container').appendChild(toast);
            return toast;
            
        }
    }
    
    return toast;
    
});

let 
    title   = '',
    text    = '';


function show() {
    toast.create({
        title           : title === '' ? 'Default Title': title,
        text            : text,
        hideProgressBar : false,
        timeout         : 4000,
        autoHide        : false,
    });
};

    let btn = document.querySelector('#btn');

    btn.addEventListener('click', () => {
        title   = document.querySelector('#title').value,
        text    = document.querySelector('#text').value;
        show(title, text);
    });
