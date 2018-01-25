'use strict';

/**
 * Recursively run callback on items in a Javascript array
 * @param arr               An array that can be iterated
 * @param callback          Callback will receive following arguments:
 *                          item = value or item in the collection
 *                          index = index in array
 *                          arr = original array. So one can change the original value if needed
 * @param childProperty     Optional child property. If iterated item is an object, recursion will dive into this property
 * @return void | any       If callback returns a value, it is rewriting the value in array or else it is left intact
 */
function recursively(arr, callback, childProperty) {
    if (Array.isArray(arr)) {
        arr.forEach(function (item, index) {
            if (Array.isArray(item)) {
                recursively(item, callback, childProperty);
            } else {
                var cbResult = callback(item, index, arr);
                if (typeof cbResult !== 'undefined') {
                    arr[index] = cbResult;
                }
                if (item && Array.isArray(item[childProperty])) {
                    recursively(item[childProperty], callback, childProperty);
                }
            }
        });
    }
}

module.exports = recursively;
