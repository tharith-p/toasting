
/*! toasting v0.1 | MIT License | https://github.com/tharith-p/toasting */
(function (root, factory) {
    try {
        // commonjs
        if (typeof exports === 'object') {
            module.exports = factory();
            // global
        } else {
            root.toasting = factory();
        }
    } catch (error) {
        console.log('Isomorphic compatibility is not supported at this time for toasting.')
    }
})(this, function () {

    // We need DOM to be ready
    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('DOMContentLoaded', init);
    }

    // Create toasting object
    toasting = {
        // In case toasting creation is attempted before dom has finished loading!
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
        // toasting container
        var container = document.createElement('div');
        container.id = 'tg-container';
        document.body.appendChild(container);

        // @Override
        // Replace create method when DOM has finished loading
        toasting.create = function (options) {
            var timeout = 4000;

            if (options.timeout) {
                timeout = options.timeout;
            }

            var toasting = document.createElement('div');
            toasting.id = ++autoincrement;
            toasting.id = 'toast-' + toasting.id;
            toasting.className = 'tg-toast';

            var wrapper = document.createElement('div');

            // title
            try {
                var 
                    h4              = document.createElement('h4');
                    h4.className    = 'tg-title';
                    h4.innerHTML    = !options.title ? 'Default Title' : options.title;

            } catch (error) {
                h4.innerHTML = '';
                console.error(error);
            }
            wrapper.appendChild(h4);

            // text
            if (options.text) {
                var p = document.createElement('p');
                p.className = 'tg-text';
                p.innerHTML = options.text;
                wrapper.appendChild(p);
            }

            // icon
            if (options.icon) {
                var img = document.createElement('img');
                img.src = options.icon;
                img.className = 'tg-icon';
                wrapper.appendChild(img);
            }

            if (
                (typeof options.hideProgressBar === 'boolean' && !options.hideProgressBar) ||
                !(options.hideProgressBar)
                ) {

                var cssAnimation = document.createElement('style');
                cssAnimation.id = `style-${toasting.id}`
                cssAnimation.type = 'text/css';
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

                var progressBar = document.createElement('div');
                progressBar.classList = 'progress-bar';
                progressBar.style.animationName = `animate-${autoincrement}`;
                progressBar.style.animationDuration = `${timeout / 1000}s`;
                progressBar.style.animationTimingFunction = 'linear';
                progressBar.style.animationFillMode = 'forwards';


                if (typeof options.progressBarType !== 'undefined') {
                    progressBar.classList += ' ' + options.progressBarType;                    
                }

                wrapper.appendChild(progressBar);
            }

            // click callback
            if (typeof options.callback === 'function') {
                toasting.addEventListener('click', options.callback);
            }

            // toasting api
            toasting.hide = function () {
                toasting.className += ' tg-fadeOut';
                toasting.addEventListener('animationend', removeToast, false);

            };
            if (typeof options.autoHide === 'undefined') {
                setTimeout(toasting.hide, timeout + 200);
            } else if (typeof options.autoHide === 'boolean' && options.autoHide) {
                setTimeout(toasting.hide, timeout + 200);
            }

            if (options.type) {
                wrapper.className += ' tg-' + options.type;
            } else {
                wrapper.className += ' tg-' + 'default';
            }

            toasting.addEventListener('click', toasting.hide);


            function removeToast() {
                document.getElementById('tg-container').removeChild(toasting);
                let style = document.querySelector(`#style-${toasting.id}`);
                if (style) {
                    style.remove();
                }
            }

            toasting.appendChild(wrapper);

            document.getElementById('tg-container').appendChild(toasting);
            return toasting;
        }
    }
    return toasting;
});

