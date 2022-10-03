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

var flagLoadHistories=false;
var subData = new baja.Subscriber(); // desclarar subscriptor datos dashboard

subData.attach('changed added', function (prop) {
  update(this); 
});


var d= new baja.BatchResolve(["station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/TempCuartoServidores",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/HumCuartoServidores",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/PUE",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/potencia_Racks_Servidores",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/carga_Racks_servidores",
"station:|slot:/Services/AlarmService/EDA_03",
"station:|slot:/Services/AlarmService/EDA_04",
"station:|slot:/Services/AlarmService/EDA_05",
"station:|slot:/Services/AlarmService/EDA_07",
"station:|slot:/Services/AlarmService/EDA_08_PDU01",
"station:|slot:/Services/AlarmService/EDA_09",
"station:|slot:/Services/AlarmService/HDA_01",
"station:|slot:/Services/AlarmService/HDA_02",
"station:|slot:/Services/AlarmService/MDA_A",
"station:|slot:/Services/AlarmService/MDA_B",
"station:|slot:/Services/AlarmService/AAP_01",
"station:|slot:/Services/AlarmService/AAP_02",
"station:|slot:/Services/AlarmService/TA_UPS_A",
"station:|slot:/Services/AlarmService/TA_UPS_B",
"station:|slot:/Services/AlarmService/panel_incendio"]);

d.resolve({
  each: function(){
      update(this);    
  },
  subscriber:subData

}).then(function(){
  flagLoadHistories= true;
});  


function update (property){
       
  switch(property.getName()){
    case "TempCuartoServidores":  $("#dash03").html("<i class='indi-temperatura'></i>"+property.getOut().getValue()+"<span>C°</span>"); break;
    case "HumCuartoServidores": $("#dataGauge02").html(property.getOut().getValue()+" rh%"); gaugeCircle2.set(property.getOut().getValue()); break;
    case "PUE": $("#dash01").html(property.getOut().getValue().toFixed(1)); break;
    case "potencia_Racks_Servidores": $("#dash02").html("<i class='indi-electrico'></i>"+property.getOut().getValue().toFixed(1)+"<span> kW</span>"); break;
    case "carga_Racks_servidores": $("#dataGauge01").html(property.getOut().getValue().toFixed(1)+" %"); gaugeCircle2.set(property.getOut().getValue()); break;
    case "estado_unidad_AAP_02": $("#dash06").html("<img src='"+imageSelector(property.getOut().getValue().getOrdinal())+"'>"); break;
    case "AAP_02": (property.getInAlarmCount())>0?$('#alarmAAP2').addClass('iconAlarm'):$('#alarmAAP2').removeClass('iconAlarm'); break;
    case "AAP_01": (property.getInAlarmCount())>0?$('#alarmAAP1').addClass('iconAlarm'):$('#alarmAAP1').removeClass('iconAlarm'); break;
    case "EDA_03": (property.getInAlarmCount())>0?$('#alarmEDA03').addClass('iconAlarm'):$('#alarmEDA03').removeClass('iconAlarm'); break;
    case "EDA_04": (property.getInAlarmCount())>0?$('#alarmEDA04').addClass('iconAlarm'):$('#alarmEDA04').removeClass('iconAlarm'); break;
    case "EDA_05": (property.getInAlarmCount())>0?$('#alarmEDA05').addClass('iconAlarm'):$('#alarmEDA05').removeClass('iconAlarm'); break;
    case "EDA_07": (property.getInAlarmCount())>0?$('#alarmEDA07').addClass('iconAlarm'):$('#alarmEDA07').removeClass('iconAlarm'); break;
    case "EDA_08_PDU01": (property.getInAlarmCount())>0?$('#alarmEDA08').addClass('iconAlarm'):$('#alarmEDA08').removeClass('iconAlarm'); break;
    case "EDA_09": (property.getInAlarmCount())>0?$('#alarmEDA09').addClass('iconAlarm'):$('#alarmEDA09').removeClass('iconAlarm'); break;
    case "MDA_A": (property.getInAlarmCount())>0?$('#alarmMDAA').addClass('iconAlarm'):$('#alarmMDAA').removeClass('iconAlarm'); break;
    case "MDA_B": (property.getInAlarmCount())>0?$('#alarmMDAB').addClass('iconAlarm'):$('#alarmMDAB').removeClass('iconAlarm'); break;
    case "HDA_01": (property.getInAlarmCount())>0?$('#alarmHDA01').addClass('iconAlarm'):$('#alarmHDA01').removeClass('iconAlarm'); break;
    case "HDA_02": (property.getInAlarmCount())>0?$('#alarmHDA02').addClass('iconAlarm'):$('#alarmHDA02').removeClass('iconAlarm'); break;
    case "TA_UPS_A": (property.getInAlarmCount())>0?$('#alarmTAUPSA').addClass('iconAlarm'):$('#alarmTAUPSA').removeClass('iconAlarm'); break;
    case "TA_UPS_B": (property.getInAlarmCount())>0?$('#alarmTAUPSB').addClass('iconAlarm'):$('#alarmTAUPSB').removeClass('iconAlarm'); break;
    case "panel_incendio": (property.getInAlarmCount())>0?$('#alarmPanelIncendio').addClass('iconAlarm'):$('#alarmPanelIncendio').removeClass('iconAlarm'); break;
    default: console.log(property.getName());
  }
 
 }
  
       /*Declaracion de datos para el gauge*/
        var optsGaugeSemi = {
          lines: 12, // The number of lines to draw
          angle: 0, // The span of the gauge arc
          lineWidth: 0.25, // The line thickness
          radiusScale:0.5,
          pointer: {
            length: 0.68, // The radius of the inner circle
            strokeWidth: 0, // The thickness
            color: '#82949e' // Fill color
          },
          limitMax: true,     // If true, the pointer will not go past the end of the gauge
          colorStart: '#82949e',   // Colors
          colorStop: '#82949e',    // just experiment with them
          strokeColor: '#303841',
            // to see which ones work best for you
          generateGradient: true,
          highDpiSupport: true,
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
var targetCircle2 = document.getElementById('gaugeCircle2');
//var gaugeSemi = new Gauge(targetSemi).setOptions(optsGaugeSemi); // create sexy gauge!
var gaugeCircle1 = new Gauge(targetCircle1).setOptions(optsGaugeSemi);
var gaugeCircle2 = new Gauge(targetCircle2).setOptions(optsGaugeCircle);
//gaugeSemi.animationSpeed = 50; // set animation speed (32 is default value)
//gaugeSemi.maxValue=100;
//gaugeSemi.set(25);
gaugeCircle1.animationSpeed = 50; 
gaugeCircle1.maxValue=100;

gaugeCircle2.animationSpeed = 50; 
gaugeCircle2.maxValue=100;


});