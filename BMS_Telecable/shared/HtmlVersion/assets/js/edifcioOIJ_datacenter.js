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

   var r = new baja.BatchResolve(["station:|slot:/Drivers/NiagaraNetwork/SJOIJP05JAC01/points/Datacenter_OIJ/Variables/flujoCassete2_DC",
        "station:|slot:/Drivers/NiagaraNetwork/SJOIJP05JAC01/points/Datacenter_OIJ/Variables/flujoCassete1_DC",
        "station:|slot:/Drivers/NiagaraNetwork/SJOIJP05JAC01/points/Datacenter_OIJ/Variables/flujoTorre1_DC",
        "station:|slot:/Drivers/NiagaraNetwork/SJOIJP05JAC01/points/Datacenter_OIJ/Variables/flujoTorre2_DC",
        "station:|slot:/Drivers/NiagaraNetwork/SJOIJP05JAC01/points/Datacenter_OIJ/Variables/flujoTorre3_DC",
        "station:|slot:/Drivers/NiagaraNetwork/SJOIJP05JAC01/points/Datacenter_OIJ/Variables/flujoTorre4_DC",
        "station:|slot:/Drivers/NiagaraNetwork/SJOIJP05JAC01/points/Datacenter_OIJ/Variables/estadoTorre1_DC",
        "station:|slot:/Drivers/NiagaraNetwork/SJOIJP05JAC01/points/Datacenter_OIJ/Variables/estadoTorre2_DC",
        "station:|slot:/Drivers/NiagaraNetwork/SJOIJP05JAC01/points/Datacenter_OIJ/Variables/estadoTorre3_DC",
        "station:|slot:/Drivers/NiagaraNetwork/SJOIJP05JAC01/points/Datacenter_OIJ/Variables/estadoTorre4_DC",
        "station:|slot:/Drivers/NiagaraNetwork/SJOIJP05JAC01/points/Datacenter_OIJ/Variables/estadoCassete1_DC",
        "station:|slot:/Drivers/NiagaraNetwork/SJOIJP05JAC01/points/Datacenter_OIJ/Variables/estadoCassete2_DC",
        "station:|slot:/Drivers/NiagaraNetwork/SJOIJP05JAC01/points/Datacenter_OIJ/Variables/temp_DC"

    ]);

    r.resolve({
        each: function() {
             update(this);
        },
        subscriber: sub
    });

    function update(property) {
        switch (property.getName()) {
        
            case "flujoTorre1_DC": $('#dash01').html("<i class='indi-presion'></i>"+property.getOut().getValue().toFixed(2)+"<span>gpm</span>");break;
            case "temp_DC": $('#dash07').html(property.getOut().getValue().toFixed(2)+"<span>C°</span>");break;
            case "flujoTorre2_DC": $('#dash02').html("<i class='indi-presion'></i>"+property.getOut().getValue().toFixed(2)+"<span>gpm</span>");break;
            case "flujoTorre3_DC": $('#dash03').html("<i class='indi-presion'></i>"+property.getOut().getValue().toFixed(2)+"<span>gpm</span>");break;
            case "flujoTorre4_DC": $('#dash04').html("<i class='indi-presion'></i>"+property.getOut().getValue().toFixed(2)+"<span>gpm</span>");break;
            case "flujoCassete1_DC": $('#dash05').html("<i class='indi-presion'></i>"+property.getOut().getValue().toFixed(2)+"<span>gpm</span>");break;
            case "flujoCassete2_DC": $('#dash06').html("<i class='indi-presion'></i>"+property.getOut().getValue().toFixed(2)+"<span>gpm</span>");break;
            case "estadoTorre1_DC": property.getOut().getValue()?$('#dash01-01').html("<img src='/file/images/botones/btn_aires-encendido.png'>"):$('#dash01-01').html("<img src='/file/images/botones/btn_aires-apagado.png'>"); break;
            case "estadoTorre2_DC": property.getOut().getValue()?$('#dash02-01').html("<img src='/file/images/botones/btn_aires-encendido.png'>"):$('#dash02-01').html("<img src='/file/images/botones/btn_aires-apagado.png'>"); break;
            case "estadoTorre3_DC": property.getOut().getValue()?$('#dash03-01').html("<img src='/file/images/botones/btn_aires-encendido.png'>"):$('#dash03-01').html("<img src='/file/images/botones/btn_aires-apagado.png'>"); break;
            case "estadoTorre4_DC": property.getOut().getValue()?$('#dash04-01').html("<img src='/file/images/botones/btn_aires-encendido.png'>"):$('#dash04-01').html("<img src='/file/images/botones/btn_aires-apagado.png'>"); break;   
            case "estadoCassete1_DC": property.getOut().getValue()?$('#dash05-01').html("<img src='/file/images/botones/btn_aires-encendido.png'>"):$('#dash05-01').html("<img src='/file/images/botones/btn_aires-apagado.png'>"); break;
            case "estadoCassete2_DC": property.getOut().getValue()?$('#dash06-01').html("<img src='/file/images/botones/btn_aires-encendido.png'>"):$('#dash06-01').html("<img src='/file/images/botones/btn_aires-apagado.png'>"); break;
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