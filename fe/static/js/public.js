// polyfill localStorage
function createCookie(key, value, exp) {
    var date = new Date()
    date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000))
    var expires = '; expires=' + date.toGMTString()
    document.cookie = key + '=' + value + expires + '; path=/'
}

function readCookie(key) {
    var nameEQ = key + '='
    var ca = document.cookie.split(';')
    for (var i = 0, max = ca.length; i < max; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length)
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length)
        }
    }
    return null
}

// 公共的js方法
export default {
    getQueryStr(key) {
        var queryString = window.location.search.match(new RegExp('[?&]' + key + '=([^&]*)(&?)', 'i')),
            val = (queryString && queryString.length > 1 && queryString[1]) || ''
        return val
    },
    setItem(key, value) {
        if (window.localStorage) {
            window.localStorage.setItem(key, value)
        } else {
            createCookie(key, value, 30)
        }
    },
    getItem(key) {
        if (window.localStorage) {
            return window.localStorage.getItem(key)
        } else {
            return readCookie(key)
        }
    },
    removeItem(key) {
        if (window.localStorage) {
            window.localStorage.removeItem(key)
        } else {
            createCookie(key, '', -1)
        }
    }
}
