'use strict';

var expect = require('chai').expect;
var recursively = require('../index');

function multiply(item) {
    return item * 2;
}

function multiplyOdd(item) {
    return (item % 2 === 0) ? item * 2 : item;
}

function enable(item) {
    item.enabled = true;
}

function enableFirstChild(item, index) {
    if (index === 0) {
        item.enabled = true;
    }
}

describe('recursively', function () {

    describe('handling the unhandables', function () {
        it('should move on null', function () {
            var data = null;
            recursively(data, function () {

            });
            expect(data).to.equal(null);
        });
        it('should move on boolean', function () {
            var data = false;
            recursively(data, function () {

            });
            expect(data).to.equal(false);
        });
        it('should move on string', function () {
            var data = 'a';
            recursively(data, function () {

            });
            expect(data).to.equal('a');
        });
        it('should move on object', function () {
            var data = {foo: 'bar'};
            recursively(data, function () {

            });
            expect(data.foo).to.equal('bar');
        });
    });

    describe('on array', function () {

        it('should multiply items in flat array', function () {
            var input = [1, 2];
            recursively(input, multiply);
            expect(input[0]).to.equal(2);
            expect(input[1]).to.equal(4);
        });

        it('should multiply odd items in flat array', function () {
            var input = [1, 2, 3, 4];
            recursively(input, multiplyOdd);
            expect(input[0]).to.equal(1);
            expect(input[1]).to.equal(4);
            expect(input[2]).to.equal(3);
            expect(input[3]).to.equal(8);
        });

        it('should multiply items in nested array', function () {
            var input = [1, 2, [3, 4]];
            recursively(input, multiply);
            expect(input[0]).to.equal(2);
            expect(input[1]).to.equal(4);
            expect(input[2][0]).to.equal(6);
            expect(input[2][1]).to.equal(8);
        });

        it('should populate array of 9 items with fibonacci numbers by refering to the previous item in collection', function () {
            var data = new Array(9).fill();
            recursively(data, function (item, index, collection) {
                if (index === 0) {
                    return 0;
                } else if (index === 1) {
                    return 1;
                } else {
                    return collection[index - 2] + collection[index - 1];
                }
            });
            expect(data[0]).to.equal(0);
            expect(data[1]).to.equal(1);
            expect(data[2]).to.equal(1);
            expect(data[3]).to.equal(2);
            expect(data[4]).to.equal(3);
            expect(data[5]).to.equal(5);
            expect(data[6]).to.equal(8);
            expect(data[7]).to.equal(13);
            expect(data[8]).to.equal(21);
        });

        it('should populate 3x3 array with increasing number from 1 to 9', function () {
            var data = [new Array(3).fill(), new Array(3).fill(), new Array(3).fill()];
            var i = 1;
            recursively(data, function () {
                return i++;
            });
            expect(data[0][0]).to.equal(1);
            expect(data[0][1]).to.equal(2);
            expect(data[0][2]).to.equal(3);
            expect(data[1][0]).to.equal(4);
            expect(data[1][1]).to.equal(5);
            expect(data[1][2]).to.equal(6);
            expect(data[2][0]).to.equal(7);
            expect(data[2][1]).to.equal(8);
            expect(data[2][2]).to.equal(9);
        });

    });

    describe('on object', function () {

        it('should enable all objects in flat array', function () {
            var input = [{enabled: false}, {enabled: false}];
            recursively(input, enable);
            expect(input[0].enabled).to.equal(true);
            expect(input[1].enabled).to.equal(true);
        });

    });

    describe('real life scenario - menu', function () {

        it('should enable first child', function () {
            var data = [{
                name: 'Item1', enabled: false, children: [
                    {name: 'Item2', enabled: false},
                    {name: 'Item3', enabled: false}
                ]
            }];

            recursively(data, enableFirstChild, "children");
            expect(data[0].enabled).to.equal(true);
            expect(data[0].children[0].enabled).to.equal(true);
            expect(data[0].children[1].enabled).to.equal(false);

        });

        it('should enable every first child', function () {
            var menu = [{
                title: 'Level 1',
                enabled: false,
                submenu: [
                    {
                        title: 'Level2 a',
                        enabled: false,
                        submenu: [
                            {
                                title: 'Level3 aa',
                                enabled: false
                            },
                            {
                                title: 'Level3 ab',
                                enabled: false
                            }]
                    }, {
                        title: 'Level2 b',
                        enabled: false,
                        submenu: [
                            {
                                title: 'Level2 ba',
                                enabled: false
                            },
                            {
                                title: 'Level2 bb',
                                enabled: false
                            }]
                    }]
            }];
            recursively(menu, enableFirstChild, 'submenu');
            expect(menu[0].enabled).to.equal(true);
            expect(menu[0].submenu[0].enabled).to.equal(true);
            expect(menu[0].submenu[1].enabled).to.equal(false);
            expect(menu[0].submenu[0].submenu[0].enabled).to.equal(true);
            expect(menu[0].submenu[0].submenu[1].enabled).to.equal(false);
            expect(menu[0].submenu[1].submenu[0].enabled).to.equal(true);
            expect(menu[0].submenu[1].submenu[1].enabled).to.equal(false);

        });


    })

});