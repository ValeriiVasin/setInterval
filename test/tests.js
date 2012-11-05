/*globals asyncTest,deepEqual,equal,expect,module,notDeepEqual,notEqual,
  notStrictEqual,ok,QUnit,raises,start,stop,strictEqual,test */

(function () {
    'use strict';

    asyncTest('clearInterval() inside of fn', function () {
        var i = 0,
            id;

        id = LJ.setInterval(function () {
            i += 1;
            if (i === 3) {
                LJ.clearInterval(id);
            }
        }, 1000);

        setTimeout(function () {
            equal(i, 3, 'stop when i is equal 3');
            start();
        }, 5000);
    });

    asyncTest('Behave as native setInterval', function () {
        var c1 = 0,
            c2 = 0,
            id1 = null,
            id2 = null;

        id1 = setInterval(function () {
            c1 += 1;
        }, 300);

        id2 = LJ.setInterval(function () {
            c2 += 1;
        }, 300);

        setTimeout(function () {
            clearInterval(id1);
            LJ.clearInterval(id2);
            // result sync delay
            equal(c1, c2, 'counters equality');
            start();
        }, 2000);

    });

    asyncTest('Immediate argument should work correct', function () {
        var c1 = 0,
            c2 = 0,
            id1 = null,
            id2 = null;

        id1 = LJ.setInterval(function () {
            c1 += 1;
        }, 1000);
        LJ.clearInterval(id1);
        equal(c1, 0);

        id2 = LJ.setInterval(function () {
            c2 += 1;
        }, 1000, true);
        LJ.clearInterval(id2);
        equal(c2, 1);

        setTimeout(function () {
            equal(c1, 0);
            equal(c2, 1);
            start();
        }, 1500);
    });

}());
