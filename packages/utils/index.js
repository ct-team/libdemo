const looseEqual = function(a, b) {
    const isObject = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };
    const isObjectA = isObject(a);
    const isObjectB = isObject(b);

    if (isObjectA && isObjectB) {
        return JSON.stringify(a) === JSON.stringify(b);
    } else if (!isObjectA && !isObjectB) {
        return String(a) === String(b);
    }
    return false;
};
const arrayEquals = function(arrayA, arrayB) {
    arrayA = arrayA || [];
    arrayB = arrayB || [];

    if (arrayA.length !== arrayB.length) {
        return false;
    }

    for (let i = 0; i < arrayA.length; i++) {
        if (!looseEqual(arrayA[i], arrayB[i])) {
            return false;
        }
    }

    return true;
};

export default {
    isArray(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    },
    isString(value) {
        return Object.prototype.toString.call(value) === '[object String]';
    },
    isFunction(value) {
        return Object.prototype.toString.call(value) === '[object Function]';
    },
    isNumber(value) {
        return Object.prototype.toString.call(value) === '[object Number]';
    },
    isObject(value) {
        return Object.prototype.toString.call(value) === '[object Object]';
    },
    isNull(value) {
        return Object.prototype.toString.call(value) === '[object Null]';
    },
    isUndefined(value) {
        return Object.prototype.toString.call(value) === '[object Undefined]';
    },
    isBoolean(value) {
        return Object.prototype.toString.call(value) === '[object Boolean]';
    },
    valueEquals(a, b) {
        if (a === b) return true;
        if (!(a instanceof Array)) return false;
        if (!(b instanceof Array)) return false;
        if (a.length !== b.length) return false;
        for (let i = 0; i !== a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    },
    objToArray(obj) {
        if (Array.isArray(obj)) {
            return obj;
        }
        return this.isEmpty(obj) ? [] : [obj];
    },
    isEmpty(val) {
        // null or undefined
        if (val == null) return true;

        if (typeof val === 'boolean') return false;

        if (typeof val === 'number') return !val;

        if (val instanceof Error) return val.message === '';

        switch (Object.prototype.toString.call(val)) {
            // String or Array
            case '[object String]':
            case '[object Array]':
                return !val.length;

            // Map or Set or File
            case '[object File]':
            case '[object Map]':
            case '[object Set]': {
                return !val.size;
            }
            // Plain Object
            case '[object Object]': {
                return !Object.keys(val).length;
            }
        }

        return false;
    },
    isEquals(value1, value2) {
        if (Array.isArray(value1) && Array.isArray(value2)) {
            return arrayEquals(value1, value2);
        }
        return looseEqual(value1, value2);
    }
};
