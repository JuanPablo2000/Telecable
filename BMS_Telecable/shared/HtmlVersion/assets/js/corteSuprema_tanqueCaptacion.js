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

    var r = new baja.BatchResolve(["station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/TanqueCaptacion_CorteSuprema/nivel_tanqueCaptacion_COS",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/TanqueCaptacion_CorteSuprema/flujo_tanqueCaptacion_COS",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/TanqueCaptacion_CorteSuprema/temperatura_tanqueCaptacion_COS",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/TanqueCaptacion_CorteSuprema/presion_tanqueCaptacion_COS",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/TanqueCaptacion_CorteSuprema/controlValvula_tanqueCaptacion_COS"
    ]);

    r.resolve({
        each: function() {
            update(this);
        },
        subscriber: sub
    });
    $('#dash01').click(function() {
        if (confirm('Esta seguro que desea cambiar el estado de la valvula ??')) {
            baja.Ord.make('station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/TanqueCaptacion_CorteSuprema/controlValvula_tanqueCaptacion_COS').get({
                lease: true
            }).then(function(cassette) {
                cassette.invoke({
                  slot: "set",
                  value: !cassette.getOut().getValue()
                });  
              })
            .catch(function(err) {
                console.log('ORD failed to resolve: ' + err);
            });
        }
    });

    function update(property) {
        switch (property.getName()) {
            case "nivel_tanqueCaptacion_COS":
                console.log(property.getOut().getValue());
                $("#background").html("<img src='" + imageSelector(property.getOut().getValue()) + "'>");
                $('#dash05').html("<i class='indi-nivel'></i>" + property.getOut().getValue().toFixed(1) + "<span>%</span>");

                break;

            case "controlValvula_tanqueCaptacion_COS":
              
                property.getOut().getValue() ? $('#dash01').html("<img src='/file/images/botones/btn_valvula-close.png'>") : $('#dash01').html("<img src='/file/images/botones/btn_valvula-open.png'>");
                break;
            case "flujo_tanqueCaptacion_COS":
                $('#dash02').html("<i class='indi-flujo'></i>" + property.getOut().getValue().toFixed(1) + "<span>gpm</span>");
                break;
            case "temperatura_tanqueCaptacion_COS":
                $('#dash03').html("<i class='indi-temperatura'></i>" + Math.round(property.getOut().getValue()) + "<span>C</span>");
                break;
            case "presion_tanqueCaptacion_COS":
                $('#dash04').html("<i class='indi-presion'></i>" + property.getOut().getValue().toFixed(1) + "<span>psi</span>");
                break;


            default:
                $("#dash01").html(property.getOut().getValue());
                break;
        }

        function imageSelector(level) {
            let url;

            if (0 <= level && level <= 10) {
                url = "assets/images/vistas/corteSuprema_tanque_01.png";
            } else if (10 < level && level <= 20) {
                url = "assets/images/vistas/corteSuprema_tanque_02.png";
            } else if (20 < level && level <= 30) {
                url = "assets/images/vistas/corteSuprema_tanque_03.png";
            } else if (30 < level && level <= 40) {
                url = "assets/images/vistas/corteSuprema_tanque_04.png";
            } else if (40 < level && level <= 50) {
                url = "assets/images/vistas/corteSuprema_tanque_05.png";
            } else if (50 < level && level <= 60) {
                url = "assets/images/vistas/corteSuprema_tanque_06.png";
            } else if (60 < level && level <= 70) {
                url = "assets/images/vistas/corteSuprema_tanque_07.png";
            } else if (70 < level && level <= 80) {
                url = "assets/images/vistas/corteSuprema_tanque_08.png";
            } else if (80 < level && level <= 92.9) {
                url = "assets/images/vistas/corteSuprema_tanque_09.png";
            } else if (93 < level && level <= 100) {
                url = "assets/images/vistas/corteSuprema_tanque_10.png";
            }



            return url
        }

    }









});