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

    var r = new baja.BatchResolve(["station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D030",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D035",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M066",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M067",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M029",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M031"
    ]);

    r.resolve({
        each: function() {
            update(this);
        },
        subscriber: sub
    });

    function update(property) {
        switch (property.getName()) {
            case "L001D030":
                $(".tool_corteSuprema_DH030").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipSensorFault');
                $(".tool_corteSuprema_DH030").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D035":
                $(".tool_corteSuprema_DH035").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipSensorFault');
                $(".tool_corteSuprema_DH035").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001M029":
                $(".tool_corteSuprema_EM035").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipSensorFault');
                $(".tool_corteSuprema_EM035").addClass(stateStation(property.getOut().getValue().getOrdinal()));
                break;
            case "L001M031":
                $(".tool_corteSuprema_EM030").removeClass('tooltipSensorEMNormal tooltipSensorEMPreAlarm tooltipSensorEMAlarm tooltipSensorEMFault');
                $(".tool_corteSuprema_EM030").addClass(stateStation(property.getOut().getValue().getOrdinal()));
                break;

            case "L001M066":
                (property.getOut().getValue().getOrdinal() > 0) ? $('#dash01').html("<img src='/file/images/botones/btn_estadoValvula-close.png'>"): $('#dash01').html("<img src='/file/images/botones/btn_estadoValvula-open.png'>");
                $(".tool_corteSuprema_VAA030").removeClass('tooltipSensorVAANormal tooltipSensorVAAPreAlarm tooltipSensorVAAAlarm tooltipSensorVAAFault');
                $(".tool_corteSuprema_VAA030").addClass(stateVal(property.getOut().getValue().getOrdinal()));
                break;
            case "L001M067":
                (property.getOut().getValue().getOrdinal() > 0) ? $('#dash02').html("<img src='/file/images/indicadores/indicador_flujoincendio-flujo.png'>"): $('#dash02').html("<img src='/file/images/indicadores/indicador_flujoincendio-sinflujo.png'>");
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