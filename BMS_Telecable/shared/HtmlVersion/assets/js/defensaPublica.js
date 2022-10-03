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

    $("#user2").html(baja.getUserName());

    $(document).ready(function(e) {
        $('img[usemap]').rwdImageMaps();
        $('img[usemap]').maphilight({});

        $(function() {
            $('.bottom-menu').hover(function() {
                $("h2", this).addClass('text-warning');
                $('h6', this).addClass('text-warning')
            }, function() {
                // on mouseout, reset the background colour
                $("h2", this).removeClass('text-warning');
                $('h6', this).removeClass('text-warning')
            });
        });


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

    var r = new baja.BatchResolve(["station:|slot:/Drivers/NiagaraNetwork/SJDPUS01JAC01/points/modoSistema",
        "station:|slot:/Services/AlarmService/SBTG_DPU"
    
    ]);

    r.resolve({
        each: function() {
            update(this);
        },
        subscriber: sub
    });

    function update(property) {
        switch (property.getName()) { 
            case "modoSistema": 
                $("#dash01").html(property.getOut().getValueDisplay());
                break;

            case "SBTG_DPU": 
            (property.getInAlarmCount())>0 ? $('#alarmSotano').addClass('iconAlarm') : $('#alarmSotano').removeClass('iconAlarm');
            (property.getInAlarmCount())>0 ? $('#alarmAzotea').addClass('iconAlarm') : $('#alarmAzotea').removeClass('iconAlarm');
                break;


            default:
                $("#label_gravedad").html("ERROR");
                break;
        }

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


    var optsGaugeCircle = {
            lines: 1,
            angle: -0.5,
            lineWidth: 0.2,
            pointer: {
                length: 0.9,
                strokeWidth: 0,
                color: '#82949e'
            },

            limitMax: 'false',
            colorStart: '#82949e', // Colors
            colorStop: '#82949e', // just experiment with them
            strokeColor: '#303841',

        }
        //var targetSemi = document.getElementById('gaugeSemi'); // your canvas element
    var targetCircle1 = document.getElementById('gaugeCircle1');
    var targetCircle2 = document.getElementById('gaugeCircle2');
    //var gaugeSemi = new Gauge(targetSemi).setOptions(optsGaugeSemi); // create sexy gauge!
    var gaugeCircle1 = new Gauge(targetCircle1).setOptions(optsGaugeSemi);
    var gaugeCircle2 = new Gauge(targetCircle2).setOptions(optsGaugeSemi);
    //gaugeSemi.animationSpeed = 50; // set animation speed (32 is default value)
    //gaugeSemi.maxValue=100;
    //gaugeSemi.set(25);
    gaugeCircle1.animationSpeed = 50;
    gaugeCircle1.maxValue = 250;
    gaugeCircle1.set(75);
    gaugeCircle2.animationSpeed = 50;
    gaugeCircle2.maxValue = 100;
  


});