;(function (window) {
    'use strict';

    var _setInterval = window.setInterval,
        _clearInterval = window.clearInterval;

    /**
     * Normalized setInterval function, based on setTimout
     * @param {Function} fn           Function that will be executed
     * @param {Number}   timeout      The interval (in milliseconds) on how often to execute the code
     * @param {Boolean}  [immediate]  Flag that will show do we need execute function immediately (first time)
     */
    function setInterval(fn, timeout, immediate) {
            /**
             * Uniq id object, that will be a result of setInterval execution
             * Notice: initial id value is needed, cuz detection of next iteration
             *         is based on its presence
             * @type {Object}
             */
        var uid = { id: true };

        // repeatedly execute function
        (function invoke() {
            if ( immediate ) {
                fn();
            }

            // presence of uid.id means that we're going to continue
            if ( typeof uid.id !== 'undefined' ) {
                uid.id = setTimeout(invoke, timeout);
            }
        }());
        immediate = true;

        return uid;
    }

    /**
     * Clear interval that has been set before
     * @param  {Object} uid Uniq interval identifier
     */
    function clearInterval(uid) {
        if (typeof uid === 'number') {
            _clearInterval(uid);
        } else {
            clearTimeout(uid.id);
            delete uid.id;
        }
    }

    // export
    window._setInterval = _setInterval;
    window._clearInterval = _clearInterval;
    window.setInterval = setInterval;
    window.clearInterval = clearInterval;
}(this));
