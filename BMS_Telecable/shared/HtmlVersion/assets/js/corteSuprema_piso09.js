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

    var r = new baja.BatchResolve(["station:|slot:/Drivers/NiagaraNetwork/SJCOSAZOEDG01/points/inyectorNorte_azotea_COS",
        "station:|slot:/Drivers/NiagaraNetwork/SJCOSAZOEDG01/points/inyectorSur_azotea_COS",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D108",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D110",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D107",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M076",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M105",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M106",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M077"
    ]);

    r.resolve({
        each: function() {
            update(this);
        },
        subscriber: sub
    });

    function update(property) {
        switch (property.getName()) {
            case "L001D108":
                $(".tool_corteSuprema_DH108").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH108").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D110":
                $(".tool_corteSuprema_DH110").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH110").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D107":
                $(".tool_corteSuprema_DH107").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH107").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;

                case "L001M105":
                    $(".tool_corteSuprema_EM105").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipSensorFault');
                    $(".tool_corteSuprema_EM105").addClass(stateStation(property.getOut().getValue().getOrdinal()));
                    break;
                case "L001M106":
                    $(".tool_corteSuprema_EM106").removeClass('tooltipSensorEMNormal tooltipSensorEMPreAlarm tooltipSensorEMAlarm tooltipSensorEMFault');
                    $(".tool_corteSuprema_EM106").addClass(stateStation(property.getOut().getValue().getOrdinal()));
                    break;

            case "L001M076":
                (property.getOut().getValue().getOrdinal() > 0) ? $('#dash01').html("<img src='/file/images/botones/btn_estadoValvula-close.png'>"): $('#dash01').html("<img src='/file/images/botones/btn_estadoValvula-open.png'>");
                break;
            case "L001M077":
                (property.getOut().getValue().getOrdinal() > 0) ? $('#dash02').html("<img src='/file/images/indicadores/indicador_flujoincendio-flujo.png'>"): $('#dash02').html("<img src='/file/images/indicadores/indicador_flujoincendio-sinflujo.png'>");
                break;
            case "inyectorNorte_azotea_COS":
                property.getOut().getValue() ? $('#dash03').html("<img src='/file/images/botones/btn_inyector-encendido.png'>") : $('#dash03').html("<img src='/file/images/botones/btn_inyectorOff.png'>");
                break;
            case "inyectorSur_azotea_COS":
                property.getOut().getValue() ? $('#dash04').html("<img src='/file/images/botones/btn_inyector-encendido.png'>") : $('#dash04').html("<img src='/file/images/botones/btn_inyectorOff.png'>");
                break;


            default:
                $("#dash01").html(property.getOut().getValue());
                break;
        }

    }


    function stateSelector(id) {
        let url;
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