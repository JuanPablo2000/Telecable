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

    var r = new baja.BatchResolve(["station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D011",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D012",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D101",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D102",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D103",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D104",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D015",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D111",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D112",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D113",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D114",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D115",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D116",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D117",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D118",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M013",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M014",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M061",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M128",
        "station:|slot:/Drivers/NiagaraNetwork/SJCOSP02JAC01/points/presurizacion_corteSuprema/presion_valvulaGaleria_COS",
        "station:|slot:/Services/AlarmService/panelPresurizacion_CorteSuprema"
    ]);

    r.resolve({
        each: function() {
            update(this);
        },
        subscriber: sub
    });

    function update(property) {
        switch (property.getName()) {
            case "L001D012":
                $(".tool_corteSuprema_DH012").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH012").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D101":
                    $(".tool_corteSuprema_DH101").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                    $(".tool_corteSuprema_DH101").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D102":
                $(".tool_corteSuprema_DH102").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH102").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D103":
                    $(".tool_corteSuprema_DH103").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                    $(".tool_corteSuprema_DH103").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D104":
                    $(".tool_corteSuprema_DH104").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                    $(".tool_corteSuprema_DH104").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D011":
                $(".tool_corteSuprema_DH011").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH011").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D015":
                $(".tool_corteSuprema_DH015").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH015").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D111":
                $(".tool_corteSuprema_DTGaleria111").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DTGaleria111").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D112":
                $(".tool_corteSuprema_DTGaleria112").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DTGaleria112").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D113":
                $(".tool_corteSuprema_DTGaleria113").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DTGaleria113").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D114":
                $(".tool_corteSuprema_DTGaleria114").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DTGaleria114").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D115":
                $(".tool_corteSuprema_DTGaleria115").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DTGaleria115").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D116":
                $(".tool_corteSuprema_DTGaleria116").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DTGaleria116").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D117":
                $(".tool_corteSuprema_DTGaleria117").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DTGaleria117").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D118":
                $(".tool_corteSuprema_DTGaleria118").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DTGaleria118").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001M013":
                    $(".tool_corteSuprema_EM011").removeClass('tooltipSensorEMNormal tooltipSensorEMPreAlarm tooltipSensorEMAlarm tooltipSensorEMFault');
                    $(".tool_corteSuprema_EM011").addClass(stateStation(property.getOut().getValue().getOrdinal()));
                    break;
            case "L001M014":
                        $(".tool_corteSuprema_EM012").removeClass('tooltipSensorEMNormal tooltipSensorEMPreAlarm tooltipSensorEMAlarm tooltipSensorEMFault');
                        $(".tool_corteSuprema_EM012").addClass(stateStation(property.getOut().getValue().getOrdinal()));
                        break;
            case "panelPresurizacion_CorteSuprema":
                (property.getInAlarmCount()>0) ? $('#alarmPanel').addClass('iconAlarm'): $('#alarmPanel').removeClass('iconAlarm');
                break;

                case "L001M061":
                    (property.getOut().getValue().getOrdinal() > 0) ? $('#dash01').html("<img src='/file/images/botones/btn_estadoValvula-close.png'>"): $('#dash01').html("<img src='/file/images/botones/btn_estadoValvula-open.png'>");
               
                    break;
                case "L001M128":
                    (property.getOut().getValue().getOrdinal() > 0) ? $('#dash02').html("<img src='/file/images/indicadores/indicador_flujoincendio-flujo.png'>"): $('#dash02').html("<img src='/file/images/indicadores/indicador_flujoincendio-sinflujo.png'>");
                    break;
            case "presion_valvulaGaleria_COS": $("#dash03").html(property.getOut().getValue().toFixed(1)+" psi"); break;
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



});