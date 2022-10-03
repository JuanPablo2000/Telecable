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


    $('#botonElectromecanico').click(function() {
        $("h2", this).addClass('text-selected');
        $('h6', this).addClass('text-selected');
        var sib = $(this).parent().siblings().children(".bottom-menu");
        $("h2", sib).removeClass('text-selected').addClass('text-white');
        $("h6", sib).removeClass('text-selected').addClass('text-white');
        $('#vistaElectromecanica').show();
        $('#vistaPresurizacion').hide();
    });
    $('#botonPresurizacion').click(function() {
        $("h2", this).addClass('text-selected');
        $('h6', this).addClass('text-selected');
        var sib = $(this).parent().siblings().children(".bottom-menu");
        $("h2", sib).removeClass('text-selected').addClass('text-white');
        $("h6", sib).removeClass('text-selected').addClass('text-white');
        $('#vistaElectromecanica').hide();
        $('#vistaPresurizacion').show();
    });

    var sub = new baja.Subscriber(); // desclarar subscriptor

    sub.attach('changed', function(prop) {
        update(this);
    });

    var r = new baja.BatchResolve([
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D126",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D124",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D123",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D122",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D121",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M058",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M059",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M119",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M120"

    ]);

    r.resolve({
        each: function() {
            update(this);
        },
        subscriber: sub
    });

    function update(property) {
        switch (property.getName()) {

            case "L001M058":
                (property.getOut().getValue().getOrdinal() > 0) ? $('#dash04').html("<img src='/file/images/botones/btn_estadoValvula-close.png'>"): $('#dash04').html("<img src='/file/images/botones/btn_estadoValvula-open.png'>");
                $(".tool_corteSuprema_VAA121").removeClass('tooltipSensorVAANormal tooltipSensorVAAPreAlarm tooltipSensorVAAAlarm tooltipSensorVAAFault');
                $(".tool_corteSuprema_VAA121").addClass(stateVal(property.getOut().getValue().getOrdinal()));
                break;
            case "L001M059":
                (property.getOut().getValue().getOrdinal() > 0) ? $('#dash05').html("<img src='/file/images/indicadores/indicador_flujoincendio-flujo.png'>"): $('#dash05').html("<img src='/file/images/indicadores/indicador_flujoincendio-sinflujo.png'>");
                break;
            case "L001D121":
                console.log(property.getProxyExt());
                $(".tool_corteSuprema_DH121").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH121").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D122":
                $(".tool_corteSuprema_DH122").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH122").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D123":
                $(".tool_corteSuprema_DH123").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH123").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D124":
                $(".tool_corteSuprema_DH124").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH124").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;

            case "L001M119":
                $(".tool_corteSuprema_EM121").removeClass('tooltipSensorEMNormal tooltipSensorEMPreAlarm tooltipSensorEMAlarm tooltipSensorEMFault');
                $(".tool_corteSuprema_EM121").addClass(stateStation(property.getOut().getValue().getOrdinal()));
                break;

            case "L001M120":
                $(".tool_corteSuprema_EM122").removeClass('tooltipSensorEMNormal tooltipSensorEMPreAlarm tooltipSensorEMAlarm tooltipSensorEMFault');
                $(".tool_corteSuprema_EM122").addClass(stateStation(property.getOut().getValue().getOrdinal()));
                break;

            case "L001D126":
                $(".tool_corteSuprema_DH126").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH126").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
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

        return url
    }






});