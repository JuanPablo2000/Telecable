require.config({
    config: {
        lex: {},
        baja: {},
    },
    paths: {
        'moment': '/file/HtmlVersion2/assets/js/plugins/moment',
        'momentsLocales': '/file/HtmlVersion2/assets/js/plugins/moment-with-locales',
        'nmodule': '/module',
        'bajaScript': '/module/bajaScript/rc',
        'bajaux': '/module/bajaux/rc',
        'jquery': '/file/HtmlVersion2/assets/js/plugins/jquery-3.4.1.min',
        'Promise': '/module/js/rc/bluebird/bluebird.min',
        'dialogs': '/module/js/rc/dialogs/dialogs.built.min',
        'lex': '/module/js/rc/lex/lexplugin',
        'css': '/module/js/com/tridium/js/ext/require/css',
        'baja': '/module/bajaScript/rc/plugin/baja',
        'hbs': '/module/js/rc/require-handlebars-plugin/hbs',
        'Handlebars': '/module/js/rc/handlebars/handlebars.min-v4.0.6',
        'underscore': '/module/js/rc/underscore/underscore.min',
        'bootstrap': '/file/HtmlVersion2/assets/js/plugins/bootstrap.bundle.min',
        'pcoded': '/file/HtmlVersion2/assets/js/pcoded',
        'scrollbar': '/file/HtmlVersion2/assets/js/perfect-scrollbar',
        'imageMaps': '/file/HtmlVersion2/assets/js/jquery.rwdImageMaps',
        'mapLight': '/file/HtmlVersion2/assets/js/jquery.maphilight'





    },
    
    shim: {
        "moment": {
            "deps": ['jquery']
        },
   
        "bootstrap": {
            "deps": ['jquery']
        },
        
        "pcoded": ["jquery"],
        
        "imageMaps":{
           deps:["jquery"]
        },
        
        "mapLight":{
           deps:["jquery"]
        }


    },

    
  


});


 require(["baja!", "jquery", "bootstrap", "momentsLocales", "scrollbar", "pcoded", "imageMaps", "mapLight"], function(baja, $, bootstrap, moment, scrollbar) {

  $("#user2").html(baja.getUserName());

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

var sub = new baja.Subscriber();// desclarar subscriptor

sub.attach('changed', function (prop) {
          update(this); 
      });

var r = new baja.BatchResolve(["station:|slot:/Drivers/BacnetNetwork/Panel_Incendio/points/Alarmas/problemaPanel",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/PUE",
"station:|slot:/Drivers/BacnetNetwork/Panel_Incendio/points/Alarmas/sensorIncendio_Electrico",
"station:|slot:/Drivers/BacnetNetwork/Panel_Incendio/points/Alarmas/estacionManual_Electrico"]);

    r.resolve({
      each: function () {
      update(this);
      },
       subscriber: sub
    });

    function update (property){
      switch(property.getName()){
        case "sensorIncendio_Electrico": (property.getOut().getValue())?$(".sensor-04").addClass('tooltipSensorAlarmado'):$(".sensor-04").removeClass('tooltipSensorAlarmado'); break;
        case "estacionManual_Electrico": (property.getOut().getValue())?$(".sensor-06").addClass('tooltipSensorAlarmado'):$(".sensor-06").removeClass('tooltipSensorAlarmado'); break;
        case "PUE": $("#dash01").html(property.getOut().getValue().toFixed(1)); break;
        case "problemaPanel": (property.getOut().getValue()>0)?$("#dash02").html("<img src='/file/images/indicadores/estado_fire-larmado.png'>"):$("#dash02").html("<img src='/file/images/indicadores/estado_fire-noalarmado.png'>"); break;
        default: $("#dash04").html(property.getOut().getValue()); break;
      }
     
     }


   


});