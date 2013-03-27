# jquery.sheet AMD
Using Asynchronous Module Definition to include jquery.sheet in your project.

    This is not complete, it's still in a proof of concept stage, tinkering will be needed.

Type `./do` and the scripts will be linted and grouped into a common zip file.

## How to include it.

This is it, get a checkout and try opening example.html for yourself.

**NOTE:** You will need to copy jquery in to the jqs directory or provide a different path.

    <html>
    <head>
    <!-- Require.js, the only script which needs to be pulled in manually -->
    <script type="text/javascript" src="require.js"></script>
    <script type="text/javascript">
    require.config({
          paths: {
              "jquery": "./jqs/jquery.min"
          }
    });
    </script>
    </head>
    <body>

    <div id="injectSheetHere"></div>

    <style>
    #injectSheetHere > iframe {
        width:837px;
        height:410px;
        border:none;
    </style>
    <script type="text/javascript">

    // Require and ye shall recieve
    require([
        "jquery",
        "./jqs/main",
        "./jqs/emptysheet"
    ], function($, sheet, data) {
        sheet.inject($("#injectSheetHere")[0], {
            title: '',
            inlineMenu: undefined,
            buildSheet: true,
            editable: true,
            autoFiller: true,
            urlMenu: false,
            jqs_amd: {
                scrollTo: true,
                jQueryUI: true,
                raphaelJs: true,
                colorPicker: true,
                elastic: true,
                advancedMath: true,
                finance: true
            }
        }, function(thisSheet, jSheet) {
            // And when it's done loading, do this (open an empty sheet)
            thisSheet.openSheet(jSheet.makeTable.json(data.sheet));
        });
    });
    </script>
    </body>
    </html>
