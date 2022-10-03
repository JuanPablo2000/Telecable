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
        'Handlebars': '/module/js/rc/handlebars/handlebars.min-v4.0.6',
        'underscore': '/module/js/rc/underscore/underscore.min',
        'bootstrap': '/file/HtmlVersion/assets/js/plugins/bootstrap.bundle.min',
        'pcoded': '/file/HtmlVersion/assets/js/pcoded',
        'scrollbar': '/file/HtmlVersion/assets/js/perfect-scrollbar',
        'imageMaps': '/file/HtmlVersion/assets/js/jquery.rwdImageMaps',
        'mapLight': '/file/HtmlVersion/assets/js/jquery.maphilight'





    },

    shim: {
        "moment": {
            "deps": ['jquery']
        },

        "bootstrap": {
            "deps": ['jquery']
        },

        "pcoded": ["jquery"],

        "imageMaps": {
            deps: ["jquery"]
        },

        "mapLight": {
            deps: ["jquery"]
        }


    },





});


require(["baja!", "jquery", "bootstrap", "momentsLocales", "scrollbar", "pcoded", "imageMaps", "mapLight"], function(baja, $, bootstrap, moment, scrollbar) {


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

    function coordinadas() {
        alert('ckick');
        var x = event.clientX; // Get the horizontal coordinate
        var y = event.clientY; // Get the vertical coordinate
        var coor = "X coords: " + x + ", Y coords: " + y;
        console.log(coor);
    }

    /*Declaracion de datos para el gauge*/
    var optsGaugeSemi = {
        lines: 12, // The number of lines to draw
        angle: 0, // The span of the gauge arc
        lineWidth: 0.25, // The line thickness
        radiusScale: 0.5,
        pointer: {
            length: 0.68, // The radius of the inner circle
            strokeWidth: 0, // The thickness
            color: '#82949e' // Fill color
        },
        limitMax: true, // If true, the pointer will not go past the end of the gauge
        colorStart: '#82949e', // Colors
        colorStop: '#82949e', // just experiment with them
        strokeColor: '#303841',
        // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true,
    }

    var sub = new baja.Subscriber(); // desclarar subscriptor

    sub.attach('changed', function(prop) {
        update(this);
    });

    var r = new baja.BatchResolve(["station:|slot:/Services/AlarmService/AlarmasCortePlena","station:|slot:/Services/AlarmService/AlarmasOIJ",
        "station:|slot:/Services/AlarmService/alarmAnexoA","station:|slot:/Services/AlarmService/alarmAnexoB",
        "station:|slot:/Services/AlarmService/alarmAnexoA","station:|slot:/Services/AlarmService/alarmAnexoA",
        "station:|slot:/Services/AlarmService/alarmAnexoA","station:|slot:/Services/AlarmService/AlarmasCortePlena"
    ]);

    r.resolve({
        each: function() {
             update(this);
        },
        subscriber: sub
    });

    function update(property) {
        switch (property.getName()) {
            
            case "AlarmasCortePlena":
                (property.getOut().getValue()) ? $('#alarmCortePlena').addClass('iconAlarm'): $('#alarmCortePlena').removeClass('iconAlarm');
                break;
            case "alarmAnexoA":
                    (property.getOut().getValue()) ? $('#alarmAnexoA').addClass('iconAlarm'): $('#alarmAnexoA').removeClass('iconAlarm');
                    break;
            case "alarmAnexoB":
                        (property.getOut().getValue()) ? $('#alarmAnexoB').addClass('iconAlarm'): $('#alarmAnexoB').removeClass('iconAlarm');
                        break;
            case "AlarmasOIJ":
                (property.getOut().getValue()) ? $('#alarmOIJ').addClass('iconAlarm') : $('#alarmOIJ').removeClass('iconAlarm');
                break;   
           
            default:
                $("#dash04").html(property.getOut().getValue());
                break;
        }

    }






});