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

    var r = new baja.BatchResolve(["station:|slot:/Services/AlarmService/gen_CorteSuprema",
        "station:|slot:/Services/AlarmService/transformador_corteSuprema",
        "station:|slot:/Services/AlarmService/panelIncendioBombas_corteSuprema",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelBombaIncendio_CorteSuprema/Variables/Presion_PanelBombaIncendio",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/Generador_CorteSuprema/Variables/Modo_gen_CorteSuprema"
    
    ]);

    r.resolve({
        each: function() {
             update(this);
        },
        subscriber: sub
    });

    function update(property) {
        switch (property.getName()) {
            case "Presion_PanelBombaIncendio":
                 $("#dash01").html("<i class='indi-presion'></i>"+Math.round(property.getOut().getValue())+"<span>psi</span>"); break;
                break;
            
          case "Modo_gen_CorteSuprema": 
               $("#dash02").html("<img src='"+imageSelector(property.getOut().getValue().getOrdinal())+"'>");$("#stateGen").removeClass('iconAuto iconManual iconStop'); $('#stateGen').addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "gen_CorteSuprema":
                (property.getInAlarmCount()) > 0 ? $('#alarmGen').addClass('iconAlarm') : $('#alarmGen').removeClass('iconAlarm');
                break;
            case "transformador_corteSuprema":
                (property.getInAlarmCount()) > 0 ? $('#alarmTransformador').addClass('iconAlarm') : $('#alarmTransformador').removeClass('iconAlarm');
                break;
            case "panelIncendioBombas_corteSuprema":
                (property.getInAlarmCount()) > 0 ? $('#alarmPanelIncendio').addClass('iconAlarm') : $('#alarmPanelIncendio').removeClass('iconAlarm');
                break;
       
           
            default:
                $("#dash01").html(property.getOut().getValue());
                break;
        }

    }


    function stateSelector(id) {
        let url;
        switch (id) {
            case 0:
                url = "iconStop";
                break;
            case 1:
                url = "iconManual";
                break;
            case 2:
                url = "iconAuto";
                break;
            default:
                url = "/file/images/iconos/estado_std-front.png";
                break;
        }

        return url
    }

    function imageSelector(id) {
       let url;
        switch (id){
         case 0:
                url = "/file/images/botones/btn_gen-apagado-on.png";
                break;
            case 1:
                url = "/file/images/botones/btn_gen-manual-on.png";
                break;
            case 2:
                url = "/file/images/botones/btn_gen-auto-on.png";
                break;
            default:
                url = "/file/images/botones/estado_std-front.png";
                break;
        }

        return url
    }



});