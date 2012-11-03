// custom namespace
var LJ = {};

(function (NS) {
    'use strict';

    /**
     * Normalized setInterval function, based on setTimout
     * @param {Function} fn           Function that will be executed
     * @param {Number}   timeout      The interval (in milliseconds) on how often to execute the code
     * @param {Boolean}  [immediate]  Flag that will show do we need execute function immediately (first time)
     */
    NS.setInterval = function (fn, timeout, immediate) {
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
    };

    NS.clearInterval = function (uid) {
        clearTimeout(uid.id);
        delete uid.id;
    };

}(LJ));
