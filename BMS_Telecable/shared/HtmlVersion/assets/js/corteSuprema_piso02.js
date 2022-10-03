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


    $('#botonRefrigeracion').click(function() {
        $("h2", this).addClass('text-selected');
        $('h6', this).addClass('text-selected');
        var sib = $(this).parent().siblings().children(".bottom-menu");
        $("h2", sib).removeClass('text-selected').addClass('text-white');
        $("h6", sib).removeClass('text-selected').addClass('text-white');
        $('#vistaRefrigeracion').show();
        $('#vistaPresurizacion').hide();
    });
    $('#botonPresurizacion').click(function() {
        $("h2", this).addClass('text-selected');
        $('h6', this).addClass('text-selected');
        var sib = $(this).parent().siblings().children(".bottom-menu");
        $("h2", sib).removeClass('text-selected').addClass('text-white');
        $("h6", sib).removeClass('text-selected').addClass('text-white');
        $('#vistaRefrigeracion').hide();
        $('#vistaPresurizacion').show();
    });


    var sub = new baja.Subscriber(); // desclarar subscriptor

    sub.attach('changed', function(prop) {
        update(this);
    });

    var r = new baja.BatchResolve(["station:|slot:/Drivers/NiagaraNetwork/SJCOSP02JAC01/points/Cassettes_corteSuprema/cassette_01",
        "station:|slot:/Drivers/NiagaraNetwork/SJCOSP02JAC01/points/Cassettes_corteSuprema/cassette_02",
        "station:|slot:/Drivers/NiagaraNetwork/SJCOSP02JAC01/points/Cassettes_corteSuprema/cassette_03",
        "station:|slot:/Drivers/NiagaraNetwork/SJCOSP02JAC01/points/AHU/AHU_2/Fan_AHU2",
        "station:|slot:/Drivers/NiagaraNetwork/SJCOSP02JAC01/points/AHU/AHU_1/Fan_AHU1",
        "station:|slot:/Drivers/NiagaraNetwork/SJCOSP02JAC01/points/AHU/AHU_2_2/Fan_AHU2_2",
        "station:|slot:/Drivers/NiagaraNetwork/SJCOSP02JAC01/points/AHU/AHU_1_1/Fan_AHU1_1",
        "station:|slot:/Drivers/NiagaraNetwork/SJCOSP02JAC01/points/Chiller_corteSuprema/temperatura_cortePlena_COS",
        "station:|slot:/Drivers/NiagaraNetwork/SJCOSP02JAC01/points/Chiller_corteSuprema/humedad_cortePlena_COS",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D018",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D017",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D025",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D026",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D027",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D028",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D089",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D090",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D056",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D057",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D054",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D052",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D050",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D049",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D044",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D038",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D092",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D086",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D087",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D047",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001D048",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M062",
        "station:|slot:/Drivers/NiagaraNetwork/Station_CP_P00_Jace01/points/PanelPresurizacion_CorteSuprema/L001M063",

        // "station:|slot:/Drivers/NiagaraNetwork/SJCOSP02JAC01/points/Cassettes/valvula_p2_COS",
        // "station:|slot:/Drivers/NiagaraNetwork/SJCOSP02JAC01/points/Cassettes/sensorFlujo_p2_COS"
    ]);

    r.resolve({
        each: function() {
            update(this);
        },
        subscriber: sub
    });

    function update(property) {
        switch (property.getName()) {
            case "cassette_01":
                property.getOut().getValue() ? $('#dash01').html("<img src='/file/images/botones/btn_energia-out.png'>") : $('#dash01').html("<img src='/file/images/botones/btn_energia-in.png'>");
                break;
            case "cassette_02":
                property.getOut().getValue() ? $('#dash02').html("<img src='/file/images/botones/btn_energia-out.png'>") : $('#dash02').html("<img src='/file/images/botones/btn_energia-in.png'>");
                break;
            case "cassette_03":
                property.getOut().getValue() ? $('#dash03').html("<img src='/file/images/botones/btn_energia-out.png'>") : $('#dash03').html("<img src='/file/images/botones/btn_energia-in.png'>");
                break;
            case "temperatura_cortePlena_COS":

                $('#dash06').html("<i class='indi-temperatura'></i>" + property.getOut().getValue().toFixed(1) + "<span>C</span>");
                break;
            case "humedad_cortePlena_COS":

                $('#dash07').html(property.getOut().getValue().toFixed(1) + "<span>%rH</span>");
                break;

            case "Fan_AHU2":
                $("#stateUMA03").removeClass('iconAuto iconStop');
                (property.getOut().getValue()) ? $('#stateUMA03').addClass('iconAuto'): $('#stateUMA03').addClass('iconStop')
                break;
            case "Fan_AHU2_2":
                $("#stateUMA04").removeClass('iconAuto iconStop');
                (property.getOut().getValue()) ? $('#stateUMA04').addClass('iconAuto'): $('#stateUMA04').addClass('iconStop')
                break;
            case "Fan_AHU1_1":
                $("#stateUMA02").removeClass('iconAuto iconStop');
                (property.getOut().getValue()) ? $('#stateUMA02').addClass('iconAuto'): $('#stateUMA02').addClass('iconStop')
                break;
            case "Fan_AHU1":
                $("#stateUMA01").removeClass('iconAuto iconStop');
                (property.getOut().getValue()) ? $('#stateUMA01').addClass('iconAuto'): $('#stateUMA01').addClass('iconStop')
                break;
            case "L001D017":
                $(".tool_corteSuprema_DH017").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH017").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D018":
                $(".tool_corteSuprema_DH018").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH018").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D025":
                $(".tool_corteSuprema_DH025").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH025").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D026":
                $(".tool_corteSuprema_DH026").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH026").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D027":
                $(".tool_corteSuprema_DH027").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH027").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D028":
                $(".tool_corteSuprema_DH028").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH028").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D089":
                $(".tool_corteSuprema_DH089").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH089").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D090":
                $(".tool_corteSuprema_DH090").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH090").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D056":
                $(".tool_corteSuprema_DH056").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH056").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D057":
                $(".tool_corteSuprema_DH057").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH057").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D054":
                $(".tool_corteSuprema_DH054").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH054").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D052":
                $(".tool_corteSuprema_DH052").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH052").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D050":
                $(".tool_corteSuprema_DH050").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH050").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D049":
                $(".tool_corteSuprema_DH049").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH049").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D044":
                $(".tool_corteSuprema_DH044").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH044").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D038":
                $(".tool_corteSuprema_DH038").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH038").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D092":
                $(".tool_corteSuprema_DH092").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH092").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D086":
                $(".tool_corteSuprema_DH086").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH086").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D087":
                $(".tool_corteSuprema_DH087").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH087").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D047":
                $(".tool_corteSuprema_DH047").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH047").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001D048":
                $(".tool_corteSuprema_DH048").removeClass('tooltipSensorNormal tooltipSensorPreAlarm tooltipFireAlarm tooltipFault');
                $(".tool_corteSuprema_DH048").addClass(stateSelector(property.getOut().getValue().getOrdinal()));
                break;
            case "L001M062":
                (property.getOut().getValue().getOrdinal() > 0) ? $('#dash04').html("<img src='/file/images/botones/btn_estadoValvula-close.png'>"): $('#dash04').html("<img src='/file/images/botones/btn_estadoValvula-open.png'>");
                $(".tool_corteSuprema_VAA017").removeClass('tooltipSensorVAANormal tooltipSensorVAAPreAlarm tooltipSensorVAAAlarm tooltipSensorVAAFault');
                $(".tool_corteSuprema_VAA017").addClass(stateVal(property.getOut().getValue().getOrdinal()));
                break;
            case "L001M063":
                (property.getOut().getValue().getOrdinal() > 0) ? $('#dash05').html("<img src='/file/images/indicadores/indicador_flujoincendio-flujo.png'>"): $('#dash05').html("<img src='/file/images/indicadores/indicador_flujoincendio-sinflujo.png'>");
                break;
            case "L001M016":
                $(".tool_corteSuprema_EM018").removeClass('tooltipSensorEMNormal tooltipSensorEMPreAlarm tooltipSensorEMAlarm tooltipSensorEMFault');
                $(".tool_corteSuprema_EM018").addClass(stateStation(property.getOut().getValue().getOrdinal()));
                break;
            case "L001M019":
                $(".tool_corteSuprema_EM017").removeClass('tooltipSensorEMNormal tooltipSensorEMPreAlarm tooltipSensorEMAlarm tooltipSensorEMFault');
                $(".tool_corteSuprema_EM017").addClass(stateStation(property.getOut().getValue().getOrdinal()));
                break;
            default:
                $("#dash01").html("<img src='/file/images/botones/btn_energia-in.png'>");
                break;
        }

    }

    //Onclick control aires
    $('#dash01').click(function() {
        if (confirm('Esta seguro que desea cambiar el estado del cassette?')) {
            baja.Ord.make('station:|slot:/Drivers/NiagaraNetwork/SJCOSP02JAC01/points/Cassettes_corteSuprema/cassette_01').get({
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
    $('#dash02').click(function() {
        if (confirm('Esta seguro que desea cambiar el estado del cassette?')) {
            baja.Ord.make('station:|slot:/Drivers/NiagaraNetwork/SJCOSP02JAC01/points/Cassettes_corteSuprema/cassette_02').get({
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
    $('#dash03').click(function() {
        if (confirm('Esta seguro que desea cambiar el estado del cassette?')) {
            baja.Ord.make('station:|slot:/Drivers/NiagaraNetwork/SJCOSP02JAC01/points/Cassettes_corteSuprema/cassette_03').get({
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



    function imageSelector(id) {
        let url;

        switch (id) {
            case 0:
                url = "/file/images/botones/btn_energia-in.png";
                break;
            case 1:
                url = "/file/images/botones/btn_energia-out.png";
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