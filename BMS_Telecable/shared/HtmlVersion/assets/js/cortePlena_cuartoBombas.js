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
    var subData = new baja.Subscriber(); // desclarar subscriptor datos dashboard
    var flagLoadHistories = false;

    var temps = [];
    var data = [];

    subData.attach('changed added', function(prop) {
        update(this);
    });

    var d = new baja.BatchResolve(["station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/BombaAgua01_CorteSuprema/Variables/estado_bomba01",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/BombaAgua02_CorteSuprema/Variables/estado_bomba02",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/BombaAgua03_CorteSuprema/Variables/estado_bomba03",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/BombaAgua01_CorteSuprema/Variables/presion_bomba01",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/BombaAgua02_CorteSuprema/Variables/presion_bomba02",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/BombaAgua03_CorteSuprema/Variables/presion_bomba03",
        "station:|slot:/Services/AlarmService/bombaAgua_01_corteSuprema",
        "station:|slot:/Services/AlarmService/bombaAgua_02_corteSuprema",
        "station:|slot:/Services/AlarmService/bombaAgua_03_corteSuprema"
    ]);

    d.resolve({
        each: function() {
            update(this);
        },
        subscriber: subData

    }).then(function() {
        flagLoadHistories = true;
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





    function update(property) {

        switch (property.getName()) {
            case "estado_bomba01":
                $("#dash01").html("<img src='" + imageSelector(property.getOut().getValue().getOrdinal()) + "'>");
                console.log(property.getOut().getValue().getOrdinal());
                break;
            case "estado_bomba02":
                $("#dash02").html("<img src='" + imageSelector(property.getOut().getValue().getOrdinal()) + "'>");
                break;
            case "estado_bomba03":
                $("#dash03").html("<img src='" + imageSelector(property.getOut().getValue().getOrdinal()) + "'>");
                break;
            case "presion_bomba01":
                $('#dash01-01').html("<i class='indi-presion'></i>" + property.getOut().getValue().toFixed(1) + "<span>psi</span>");
                break;
            case "presion_bomba02":
                $('#dash02-01').html("<i class='indi-presion'></i>" + property.getOut().getValue().toFixed(1) + "<span>psi</span>");
                break;
            case "presion_bomba03":
                $('#dash03-01').html("<i class='indi-presion'></i>" + property.getOut().getValue().toFixed(1) + "<span>psi</span>");
                break;
            case "bombaAgua_01_corteSuprema":
                (property.getInAlarmCount()) > 0 ? $('#alarmBomba01').addClass('iconAlarm') : $('#alarmBomba01').removeClass('iconAlarm');
                break;
            case "bombaAgua_02_corteSuprema":
                (property.getInAlarmCount()) > 0 ? $('#alarmBomba02').addClass('iconAlarm') : $('#alarmBomba02').removeClass('iconAlarm');
                break;
            case "bombaAgua_03_corteSuprema":
                (property.getInAlarmCount()) > 0 ? $('#alarmBomba03').addClass('iconAlarm') : $('#alarmBomba03').removeClass('iconAlarm');
                break;
            default:
                $("#dash04").html(property.getOut().getValue());
                break;
        }

    }

    function imageSelector(id) {
        let url;
        switch (id) {
            case 1:
                url = "/file/images/botones/estado_bomba-front_offline.png";
                break;
            case 2:
                url = "/file/images/botones/estado_bomba-front_preparando.png";
                break;
            case 3:
                url = "/file/images/botones/estado_bomba-front_deshabilitado.png";
                break;
            case 4:
                url = "/file/images/botones/estado_bomba-front_paro.png";
                break;
            case 5:
                url = "/file/images/botones/estado_bomba-front_running.png";
                break;
            case 6:
                url = "/file/images/botones/estado_bomba-front_solorunning.png";
                break;
            case 7:
                url = "/file/images/botones/estado_bomba-front_fallo.png";
                break;
            default:
                url = "/file/images/botones/estado_bomba-front_offline.png";
                break;
        }

        return url
    }







});