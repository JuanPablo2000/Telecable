require.config({
    config: {
        lex: {},
        baja: {},
    },
    paths: {
        'moment': '/file/HtmlVersion/assets/js/plugins/moment',
        'momentsLocales': '/file/HtmlVersion/assets/js/plugins/moment-with-locales',
        'nmodule': '/module',
        'bajaScript': '/module/bajaScript/rc',
        'bajaux': '/module/bajaux/rc',
        'jquery': '/file/HtmlVersion/assets/js/plugins/jquery-3.4.1.min',
        'Promise': '/module/js/rc/bluebird/bluebird.min',
        'dialogs': '/module/js/rc/dialogs/dialogs.built.min',
        'lex': '/module/js/rc/lex/lexplugin',
        'css': '/module/js/com/tridium/js/ext/require/css',
        'baja': '/module/bajaScript/rc/plugin/baja',
        'hbs': '/module/js/rc/require-handlebars-plugin/hbs',
        //'popper':'https://unpkg.com/@popperjs/core@2'
        'Handlebars': '/module/js/rc/handlebars/handlebars.min-v4.0.6',
        'underscore': '/module/js/rc/underscore/underscore.min',
        'bootstrap': '/file/HtmlVersion/assets/js/plugins/bootstrap.bundle.min',
        'popper': '/file/HtmlVersion/assets/js/plugins/popper',
        'pcoded': '/file/HtmlVersion/assets/js/pcoded',
        'scrollbar': '/file/HtmlVersion/assets/js/perfect-scrollbar',
        'imageMaps': '/file/HtmlVersion/assets/js/jquery.rwdImageMaps',
        'mapLight': '/file/HtmlVersion/assets/js/jquery.maphilight',
        'resizeMap': '/file/HtmlVersion/assets/js/imageMapResizer.min'





    },

    shim: {
        "moment": {
            "deps": ['jquery']
        },

        "pcoded": ["jquery"],

        "imageMaps": {
            deps: ["jquery"]
        },

        "mapLight": {
            deps: ["jquery"]
        },
        // 'popper': {
        //      'deps': ['jquery'],
        //      'exports': 'Popper'
        //  },
        'bootstrap': {
            'deps': ['jquery']
        }


    },







});


require(["baja!", "jquery", "bootstrap", "momentsLocales", "scrollbar", "pcoded", "mapLight", "imageMaps"], function(baja, $, bootstrap, moment, scrollbar) {

    $("#user2").html(baja.getUserName());

    $(document).ready(function(e) {
        $('img[usemap]').rwdImageMaps();
        $('img[usemap]').maphilight({});

    });
    jQuery(window).bind('resize orientationchange', function(e) {
        var windowWidth = $(window).width();
        jQuery(window).resize(function() {
            jQuery('img[usemap]').maphilight({});
            if (windowWidth != $(window).width()) {
                location.reload();
                return;
            }
        })
    });

    var sub = new baja.Subscriber(); // desclarar subscriptor

    sub.attach('changed', function(prop) {
        update(this);
    });

    var r = new baja.BatchResolve(["station:|slot:/Drivers/NiagaraNetwork/SJDPUS01JAC01/points/NivelRealAzotea"
    ]);

    r.resolve({
        each: function() {
            update(this);
        },
        subscriber: sub
    });

    function update(property) {
        switch (property.getName()) {
             case "NivelRealAzotea": 
                $("#dash01").html("<i class='indi-presion'></i>"+property.getOut().getValue().toFixed(2)+"<span>%</span>");
                break;
            


            default:
                $("#dash01").html(property.getOut().getValue());
                break;
        }

    }


    function stateSelector(id) {
        let url;
        console.log(id);
        switch (id) {
            case 1:
                url = "tooltipSensorNormal";
                break;

            case 2:
                url = "tooltipSensorPreAlarm";
                break;
            case 3:
                url = "tooltipSensorFireAlarm";
                break;
            case 4:
                url = "tooltipSensorFault";
                break;
            default:
                url = "tooltipSensorFault";
                break;
        }

        return url
    }

    function stateStation(id) {
        let url;
        switch (id) {
            case 0:
                url = "tooltipSensorEMNormal";
                break;

            case 1:
                url = "tooltipSensorEMAlarm";
                break;
            case 2:
                url = "tooltipSensorEMFault";

            default:
                url = "tooltipSensorEMFault";
                break;
        }

        return url
    }

    function stateVal(id) {
        let url;

        switch (id) {
            case 0:
                url = "tooltipSensorVAANormal";
                break;

            case 1:
                url = "tooltipSensorVAAAlarm";
                break;
            case 2:
                url = "tooltipSensorVAAFault";

            default:
                url = "tooltipSensorVAAFault";
                break;
        }
        return url;


    }






});