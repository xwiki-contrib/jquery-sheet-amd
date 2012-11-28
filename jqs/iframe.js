define({
    load: function(name, require, load, config) {
        var iframeWindow = document.getElementById(name.split('@')[1]).contentWindow;
        var ifrDoc = iframeWindow.document;
        var ifrHead = ifrDoc.getElementsByTagName('head')[0];
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var src = scripts[i].getAttribute("src");
            if (src && src.indexOf("require.js") == src.length - 10) {
                var requireScript = ifrDoc.createElement('script');
                requireScript.setAttribute("type", "text/javascript");
                requireScript.setAttribute("src", src);
                ifrHead.appendChild(requireScript);

                requireScript.onload = function() {
                    iframeWindow.requirejs.config(config);
                    iframeWindow.require([name.split('@')[0]], function(value) {
                        load(value);
                    });
                };
                return;
            }
        }
        load.error("failed to find the iframe with id='" + name.split('@')[0] + "'");
    }
});
