define(["module"], function(module) {
    return {
        inject: function(domLocation, config, andThen) {
            var modulePath = module.id.substr(0, module.id.lastIndexOf('/'))
            var ifr = document.createElement("iframe");
            ifr.setAttribute("src", "JavaScript:''");
            config.jqs_amd.id = config.jqs_amd.id || "jquerysheet-" + Math.random().toString().replace('0.', '');
            ifr.setAttribute("id", config.jqs_amd.id);
            domLocation.appendChild(ifr);
            require([modulePath + "/iframe!" + modulePath + "/jqs@" + config.jqs_amd.id], function(jqs) {
                jqs.inject(ifr.contentWindow.document.body, config, andThen);
            });
        }
    };
});
