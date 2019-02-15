function buildUrl(domain, path, searchUrl) {
    // Keep same protocol as searchUrl
    // This fixes a bug when we want to unset 'secure' property in an https domain
    var secure = searchUrl.indexOf("https://") === 0;

    if (domain.substr(0, 1) === '.')
        domain = domain.substring(1);

    return "http" + ((secure) ? "s" : "") + "://" + domain + path;
}

function deleteAll(cookieList, searchUrl) {
    for (var i = 0; i < cookieList.length; i++) {
        var curr = cookieList[i];
        var url = buildUrl(curr.domain, curr.path, searchUrl);
        deleteCookie(url, curr.name, curr.storeId);
    }
}

function deleteCookie(url, name, store, callback) {
    chrome.cookies.remove({
        'url': url,
        'name': name,
        'storeId': store
    }, function (details) {
        if (typeof callback === "undefined")
            return;
        if (details === "null" || details === undefined || details === "undefined") {
            callback(false);
        } else {
            callback(true);
        }
    })
}

function Filter() {
    var filter = {};

    this.setUrl = function (url) {
        filter.url = url;
    };

    this.setDomain = function (domain) {
        filter.domain = domain;
    };
    this.setName = function (name) {
        filter.name = name;
    };
    this.setSecure = function (secure) {
        filter.secure = secure;
    };
    this.setSession = function (session) {
        filter.session = session;
    };
    this.getFilter = function (session) {
        return filter;
    };
}

function cookieForCreationFromFullCookie(fullCookie) {
    var newCookie = {};
    //If no real url is available use: "https://" : "http://" + domain + path
    newCookie.url = "http" + ((fullCookie.secure) ? "s" : "") + "://" + fullCookie.domain + fullCookie.path;
    newCookie.name = fullCookie.name;
    newCookie.value = fullCookie.value;
    if (!fullCookie.hostOnly)
        newCookie.domain = fullCookie.domain;
    newCookie.path = fullCookie.path;
    newCookie.secure = fullCookie.secure;
    newCookie.httpOnly = fullCookie.httpOnly;
    if (!fullCookie.session)
        newCookie.expirationDate = fullCookie.expirationDate;
    newCookie.storeId = fullCookie.storeId;
    return newCookie;
}

function compareCookies(b, a) {
    try {
        if (b.name !== a.name)
            return false;
        if (b.value !== a.value)
            return false;
        if (b.path !== a.path)
            return false;
        if (b.secure !== a.secure)
            return false;
        if (b.httpOnly !== a.httpOnly)
            return false;

        var aHostOnly = !!(a.hostOnly || a.domain === undefined);
        var bHostOnly = !!(b.hostOnly || b.domain === undefined);
        if (aHostOnly !== bHostOnly)
            return false;
        if (!aHostOnly && b.domain !== a.domain)
            return false;

        var aSession = !!(a.session || a.expirationDate === undefined);
        var bSession = !!(b.session || b.expirationDate === undefined);
        if (aSession !== bSession)
            return false;
        if (aSession === false && b.expirationDate !== a.expirationDate)
            return false;
    } catch (e) {
        console.error(e.message);
        return false;
    }
    return true;
}



function cookiesToJson(cookies) {
    var string = "";
    string += "[\n";
    for (var i = 0; i < cookies.length; i++) {
        cookie = cookies[i];
        cookie.id = i + 1;
        string += JSON.stringify(cookie, null, 4);
        if (i < cookies.length - 1)
            string += ",\n";
    }
    string += "\n]";
    return string;
}


//获取制定 Tab 的 Cookies
function getCookiesJson(currentTabID, currentTabURL, fun) {

    var filter = new Filter();
    if (/^https?:\/\/.+$/.test(currentTabURL)) {
        filter.setUrl(currentTabURL);
    } else {
        filter.setDomain(currentTabURL);
    }

    var filters = filter.getFilter();
    if (filters === null)
        filters = {};

    var filteredCookies = [];
    var filterURL = {};


    if (filters.url !== undefined)
        filterURL.url = filters.url;
    if (filters.domain !== undefined)
        filterURL.domain = filters.domain;

    chrome.cookies.getAllCookieStores(function (cookieStores) {
        for (let x = 0; x < cookieStores.length; x++) {
            if (cookieStores[x].tabIds.indexOf(currentTabID) !== -1) {
                filterURL.storeId = cookieStores[x].id;
                break;
            }
        }

        chrome.cookies.getAll(filterURL, function (cks) {
            var currentC;
            for (var i = 0; i < cks.length; i++) {
                currentC = cks[i];

                if (filters.name !== undefined && currentC.name.toLowerCase().indexOf(filters.name.toLowerCase()) === -1)
                    continue;
                if (filters.domain !== undefined && currentC.domain.toLowerCase().indexOf(filters.domain.toLowerCase()) === -1)
                    continue;
                if (filters.secure !== undefined && currentC.secure.toLowerCase().indexOf(filters.secure.toLowerCase()) === -1)
                    continue;
                if (filters.session !== undefined && currentC.session.toLowerCase().indexOf(filters.session.toLowerCase()) === -1)
                    continue;

                filteredCookies.push(currentC);
            }

            let text = cookiesToJson(filteredCookies);

            if (fun !== undefined) {
                fun(text)
            }
        });
    });
}

// 导入 Cookies
function importCookies(cookiesJson) {
    try {
        var cookieArray = $.parseJSON(cookiesJson);
        if (Object.prototype.toString.apply(cookieArray) === "[object Object]")
            cookieArray = [cookieArray];
        for (var i = 0; i < cookieArray.length; i++) {
            try {
                var cJSON = cookieArray[i];
                var cookie = cookieForCreationFromFullCookie(cJSON);
                chrome.cookies.set(cookie);
            } catch (e) {
                console.error(e.message);
                return;
            }
        }
    } catch (e) {
        console.error(e.message);
        return;
    }
    return;
}

