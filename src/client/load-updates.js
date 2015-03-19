var m,
    queryString,
    hashString,
    queryParams,
    hashParams,
    host,
    ajaxCall;

/**
 * Parse the parameters and find the fastLiveReloadHost string.
 */
m = /^.*?(\?(.*?))?(\#(.*))?$/.exec( document.location.href );
queryString = m[2];
hashString = m[4];

queryParams = new ParameterParser(queryString);
hashParams =  new ParameterParser(hashString);

host = window.fastLiveReloadHost ? window.fastLiveReloadHost : "localhost:9001";
host = queryParams.get("fastLiveReloadHost", host);
host = hashParams.get("fastLiveReloadHost", host);

/**
 * Do the actual ajax call.
 */
function loadUpdates() {
    ajaxCall = new AjaxCall("http://" + host + "/?_cache=" + new Date().getTime());
    ajaxCall.execute(function(data) {
        // reload page.
        document.location.reload();
    }, function() {
        // wait a bit so we don't always update in case the stuff is
        // down.
        setTimeout(loadUpdates, 500);
        return true;
    });
}

loadUpdates();
