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

    var sub = new baja.Subscriber(); // desclarar subscriptor

    sub.attach('changed', function(prop) {
        update(this);
    });

    var r = new baja.BatchResolve(["station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/SistemaBombeo_CorteSuprema/flujo_sistemaBombeo_COS",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/SistemaBombeo_CorteSuprema/temperatura_sistemaBombeo_COS",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/SistemaBombeo_CorteSuprema/presion_sistemaBombeo_COS",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/SistemaBombeo_CorteSuprema/controlValvula_sistemaBombeo_COS",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/SistemaBombeo_CorteSuprema/control_bomba01_COS",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/SistemaBombeo_CorteSuprema/control_bomba02_COS",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/SistemaBombeo_CorteSuprema/control_bomba03_COS",
        "station:|slot:/Services/AlarmService/bombaAgua_01_corteSuprema",
        "station:|slot:/Services/AlarmService/bombaAgua_02_corteSuprema",
        "station:|slot:/Services/AlarmService/bombaAgua_03_corteSuprema"
    ]);

    r.resolve({
        each: function() {
            update(this);
        },
        subscriber: sub
    });

    function update(property) {
        switch (property.getName()) {

            case "controlValvula_sistemaBombeo_COS":
                property.getOut().getValue() ? $('#dash01').html("<img src='/file/images/botones/btn_valvula-close.png'> <span>Cerrada</span>") : $('#dash01').html("<img src='/file/images/botones/btn_valvula-open.png'> <span>Abierta</span>");
                break;
            case "flujo_sistemaBombeo_COS":
                $('#dash02').html("<i class='indi-flujo'></i>" + property.getOut().getValue().toFixed(1) + "<span>gpm</span>");
                break;
            case "temperatura_sistemaBombeo_COS":
                $('#dash03').html("<i class='indi-temperatura'></i>" + Math.round(property.getOut().getValue()) + "<span>C</span>");
                break;
            case "presion_sistemaBombeo_COS":
                $('#dash04').html("<i class='indi-presion'></i>" + property.getOut().getValue().toFixed(1) + "<span>psi</span>");
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
            case "control_bomba01_COS":
                property.getOut().getValue() ? $('#dash05').html("<img src='/file/images/botones/btn_energia-in.png'>") : $('#dash05').html("<img src='/file/images/botones/btn_energia-out.png'>");
                break;

            case "control_bomba02_COS":
                property.getOut().getValue() ? $('#dash06').html("<img src='/file/images/botones/btn_energia-in.png'>") : $('#dash06').html("<img src='/file/images/botones/btn_energia-out.png'>");
                break;

            case "control_bomba03_COS":
                property.getOut().getValue() ? $('#dash07').html("<img src='/file/images/botones/btn_energia-in.png'>") : $('#dash07').html("<img src='/file/images/botones/btn_energia-out.png'>");
                break;



            default:
                $("#dash01").html(property.getOut().getValue());
                break;
        }



    }

    $('#dash01').click(function() {
        if (confirm('Esta seguro que desea cambiar el estado de la valvula?')) {
            baja.Ord.make('station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/SistemaBombeo_CorteSuprema/controlValvula_sistemaBombeo_COS').get({
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

    $('#dash05').click(function() {
        if (confirm('Esta seguro que desea cambiar el estado de la bomba 1?')) {
            baja.Ord.make('station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/SistemaBombeo_CorteSuprema/control_bomba01_COS').get({
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

    $('#dash06').click(function() {
        if (confirm('Esta seguro que desea cambiar el estado de la bomba 2??')) {
            baja.Ord.make('station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/SistemaBombeo_CorteSuprema/control_bomba02_COS').get({
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
    $('#dash07').click(function() {
        if (confirm('Esta seguro que desea cambiar el estado de la bomba 3??')) {
            baja.Ord.make('station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/SistemaBombeo_CorteSuprema/control_bomba03_COS').get({
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










});