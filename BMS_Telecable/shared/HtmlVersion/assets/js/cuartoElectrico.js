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
jQuery(window).bind('resize orientationchange', function(e) {
	var windowWidth = $(window).width();
	jQuery(window).resize(function(){
		jQuery('img[usemap]').maphilight({});
		if(windowWidth != $(window).width()){
			location.reload();
			return;
		}
	})
});
  
var sub = new baja.Subscriber();// desclarar subscriptor

sub.attach('changed', function (prop) {
          update(this); 
      });

var r = new baja.BatchResolve(["station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/TempCuartoElectrico",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/HumedadCuartoElectrico",
"station:|slot:/Drivers/ModbusTcpNetwork/TA$2dEM$2dA/points/Variables/PotenciaTotal_TA$2dEM$2dA",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/PUE",
"station:|slot:/Drivers/ModbusTcpNetwork/TA$2dEM$2dB/points/Variables/PotenciaTotal_TA$2dEM$2dB",
"station:|slot:/Services/AlarmService/UPS_A",
"station:|slot:/Services/AlarmService/UPS_B",
"station:|slot:/Services/AlarmService/TA_EM_A",
"station:|slot:/Services/AlarmService/TA_EM_B",
"station:|slot:/Services/AlarmService/BAT_A",
"station:|slot:/Services/AlarmService/BAT_B",
"station:|slot:/Services/AlarmService/AAP_04",
"station:|slot:/Services/AlarmService/AAP_05"]);

    r.resolve({
      each: function () {
       update(this);},
       subscriber: sub
    });

    function update (property){
      switch(property.getName()){
        case "TempCuartoElectrico": $("#dash-05").html("<i class='indi-temperatura'></i>"+Math.round(property.getOut().getValue())+"<span>C°</span>"); break;
        case "HumedadCuartoElectrico": $("#dash-04").html(Math.round(property.getOut().getValue())+" rh%"); gaugeCircle1.set(property.getOut().getValue()); break;
        case "PotenciaTotal_TA$2dEM$2dA": $("#dash-02").html("<i class='indi-electrico'></i>"+Math.round(property.getOut().getValue())+"<span>kW</span>"); break;
        case "PUE": $("#dash-01").html(property.getOut().getValue().toFixed(1)); break;
        case "PotenciaTotal_TA$2dEM$2dB": $("#dash-03").html("<i class='indi-electrico'></i>"+Math.round(property.getOut().getValue())+"<span>kW</span>"); break;
        case "AAP_04": (property.getInAlarmCount())>0?$('#alarmAAP04').addClass('iconAlarm'):$('#alarmAAP04').removeClass('iconAlarm'); break;
        case "AAP_05": (property.getInAlarmCount())>0?$('#alarmAAP05').addClass('iconAlarm'):$('#alarmAAP05').removeClass('iconAlarm'); break;
        case "UPS_A": (property.getInAlarmCount())>0?$('#alarmUPSA').addClass('iconAlarm'):$('#alarmUPSA').removeClass('iconAlarm'); break;
        case "UPS_B": (property.getInAlarmCount())>0?$('#alarmUPSB').addClass('iconAlarm'):$('#alarmUPSB').removeClass('iconAlarm'); break;
        case "BAT_A": (property.getInAlarmCount())>0?$('#alarmBATA').addClass('iconAlarm'):$('#alarmBATA').removeClass('iconAlarm'); break;
        case "BAT_B": (property.getInAlarmCount())>0?$('#alarmBATB').addClass('iconAlarm'):$('#alarmBATB').removeClass('iconAlarm'); break;
        case "TA_EM_A": (property.getInAlarmCount())>0?$('#alarmTAEMA').addClass('iconAlarm'):$('#alarmTAEMA').removeClass('iconAlarm'); break;
        case "TA_EM_B": (property.getInAlarmCount())>0?$('#alarmTAEMB').addClass('iconAlarm'):$('#alarmTAEMB').removeClass('iconAlarm'); break;
        default: $("#dash04").html(property.getOut().getValue()); break;
      }
     
     }
		
        
var optsGaugeCircle = {
  lines: 1,
  angle: -0.5,
  lineWidth: 0.2,
  pointer: {
    length: 0.9,
    strokeWidth: 0,
    color: '#82949e'
  },

  limitMax: 'false',
  colorStart: '#82949e',   // Colors
  colorStop: '#82949e',    // just experiment with them
  strokeColor: '#303841',
  
        }
//var targetSemi = document.getElementById('gaugeSemi'); // your canvas element
var targetCircle1 = document.getElementById('gaugeCircle1');
//var targetCircle2 = document.getElementById('gaugeCircle2');
//var gaugeSemi = new Gauge(targetSemi).setOptions(optsGaugeSemi); // create sexy gauge!
var gaugeCircle1 = new Gauge(targetCircle1).setOptions(optsGaugeCircle);
//var gaugeCircle2 = new Gauge(targetCircle2).setOptions(optsGaugeCircle);
//gaugeSemi.animationSpeed = 50; // set animation speed (32 is default value)
//gaugeSemi.maxValue=100;
//gaugeSemi.set(25);
gaugeCircle1.animationSpeed = 50; 
gaugeCircle1.maxValue=100;
gaugeCircle1.set(75);



});