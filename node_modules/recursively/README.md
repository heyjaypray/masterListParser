Recursively JavaScript
==========

[![Build Status](https://travis-ci.org/EdgarsZagorskis/recursively.svg?branch=master)](https://travis-ci.org/EdgarsZagorskis/recursively) [![Coverage Status](https://coveralls.io/repos/github/EdgarsZagorskis/recursively/badge.svg)](https://coveralls.io/github/EdgarsZagorskis/recursively)

Recursively run JavaScript callback function on each item in an array.

Recursion happens if the item is also an array - for example, as in 2D arrays.

Other example for a recursion are arrays of objects with nested objects - for example a menu with submenus.

## Installation
 
    npm install recursively -S
    
## Usage    
   
    var recursively = require('recursively');
    
    
    /**
     * Recursively run callback on items in a Javascript array
     * @param arr               An array that can be iterated
     * @param callback          Callback will receive following arguments:
     *                          item = value or item in the collection
     *                          index = index of this item in the array
     *                          arr = original array. So one can change the original value if needed
     * @param childProperty     Optional child property. If iterated item is an object, recursion will dive into this property
     * @return void | any       If callback returns a value, it is rewriting the value in array or else it is left intact
     */
    recursively(input: array, callback: (item?:any, index?:number, childProperty?:array) => void|any)
    
### Example 1 - populating 3x3 array with incremental integers from 1 to 9

    var recursively = require('recursively');
    
    var data = [new Array(3).fill(), new Array(3).fill(), new Array(3).fill()];
    var i = 1;
    recursively(data, function () {
        return i++;
    }           
    
    // data will be [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        
### Example 2 - populate array of 9 items with fibonacci numbers by referring to the previous item in collection

    var recursively = require('recursively');
    
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
    
    // data will be [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    
### Example 3 - enabling all objects in flat array

    var recursively = require('recursively');
    
    var data = [{enabled: false}, {enabled: false}];
    recursively(data, function(item){
        item.enabled = true;
    });
    
    // data will be [{enabled: true}, {enabled: true}];
        
### Example 4 - enabling first child of each submenu

    var recursively = require('recursively');
    
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
    
    function enableFirstChild(item, index) {
        if (index === 0) {
            item.enabled = true;
        }
    }

    recursively(menu, enableFirstChild, 'submenu');
    
    // menu[0].enabled==true;
    // menu[0].submenu[0].enabled==true;
    // menu[0].submenu[0].submenu[0].enabled==true;
    // menu[0].submenu[1].submenu[0].enabled==true;

    
## Test

    npm test
    
## Contributions

welcomed.... Just make a test.