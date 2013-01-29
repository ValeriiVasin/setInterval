;(function () {
    'use strict';

    var timerCallback,
        id;

    beforeEach(function () {
        timerCallback = jasmine.createSpy('timerCallback');
        jasmine.Clock.useMock();
    });

    describe('Originals', function () {
        it('should save originals', function () {
            expect(window._setInterval).toBeDefined();
            expect(window._clearInterval).toBeDefined();
        });
    });

    describe('setInterval()', function () {
        it('basic functionality', function () {
            setInterval(timerCallback, 100);
            jasmine.Clock.tick(500);
            expect(timerCallback.callCount).toBe(5);
        });

        it('with immediate option', function () {
            setInterval(timerCallback, 100, true);
            jasmine.Clock.tick(500);
            expect(timerCallback.callCount).toBe(6);
        });
    });

    describe('clearInterval()', function () {
        it('basic functionality', function () {
            id = setInterval(timerCallback, 100);
            jasmine.Clock.tick(500);
            clearInterval(id);
            jasmine.Clock.tick(500);
            expect(timerCallback.callCount).toBe(5);
        });

        it('with immediate option', function () {
            id = setInterval(timerCallback, 100, true);
            jasmine.Clock.tick(500);
            clearInterval(id);
            jasmine.Clock.tick(500);
            expect(timerCallback.callCount).toBe(6);
        });

        it('should provide fallback for intervals, that could be set through original setInterval', function () {
            id = window._setInterval(timerCallback, 20);
            spyOn(window, '_clearInterval').andCallThrough();

            jasmine.Clock.tick(100);
            expect(timerCallback.callCount).toBe(5);

            clearInterval(id);
            jasmine.Clock.tick(100);
            expect(timerCallback.callCount).toBe(5);
        });
    });
}());
