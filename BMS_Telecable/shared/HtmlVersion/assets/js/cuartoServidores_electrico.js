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

var flagLoadHistories=false;
var subData = new baja.Subscriber(); // desclarar subscriptor datos dashboard

subData.attach('changed added', function (prop) {
  update(this); 
});


var d= new baja.BatchResolve(["station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/potencia_EDA_07",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/potencia_EDA_08",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/potencia_EDA_09",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/potencia_EDA_03",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/potencia_EDA_04",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/potencia_EDA_05",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/potencia_HDA_01",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/potencia_HDA_02",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/potencia_MDA_A",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/potencia_MDA_B",
"station:|slot:/Drivers/ModbusTcpNetwork/Promedios/Points/Variables/PUE",
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
"station:|slot:/Services/AlarmService/TA_UPS_A",
"station:|slot:/Services/AlarmService/TA_UPS_B"]);

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
    case "potencia_EDA_07":  $("#dataGaugeEDA07").html(property.getOut().getValue().toFixed(2)+" kW"); gaugeCircle8.set(property.getOut().getValue()); break;
    case "potencia_EDA_08":  $("#dataGaugeEDA08").html(property.getOut().getValue().toFixed(2)+" kW"); gaugeCircle9.set(property.getOut().getValue()); break;
    case "potencia_EDA_09":  $("#dataGaugeEDA09").html(property.getOut().getValue().toFixed(2)+" kW"); gaugeCircle10.set(property.getOut().getValue()); break;
    case "potencia_EDA_03":  $("#dataGaugeEDA03").html(property.getOut().getValue().toFixed(2)+" kW"); gaugeCircle5.set(property.getOut().getValue()); break;
    case "potencia_EDA_04":  $("#dataGaugeEDA04").html(property.getOut().getValue().toFixed(2)+" kW"); gaugeCircle6.set(property.getOut().getValue()); break;
    case "potencia_EDA_05":  $("#dataGaugeEDA05").html(property.getOut().getValue().toFixed(2)+" kW"); gaugeCircle7.set(property.getOut().getValue()); break;
    case "potencia_HDA_01":  $("#dataGaugeHDA01").html(property.getOut().getValue().toFixed(2)+" kW"); gaugeCircle3.set(property.getOut().getValue()); break;
    case "potencia_HDA_02":  $("#dataGaugeHDA02").html(property.getOut().getValue().toFixed(2)+" kW"); gaugeCircle4.set(property.getOut().getValue()); break;
    case "potencia_MDA_A":  $("#dataGaugeMDAA").html(property.getOut().getValue().toFixed(2)+" kW"); gaugeCircle1.set(property.getOut().getValue()); break;
    case "potencia_MDA_B":  $("#dataGaugeMDAB").html(property.getOut().getValue().toFixed(2)+" kW"); gaugeCircle2.set(property.getOut().getValue()); break;
    case "PUE": $("#dash01").html(property.getOut().getValue().toFixed(1)); break;
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
//var gaugeSemi = new Gauge(targetSemi).setOptions(optsGaugeSemi); // create sexy gauge!
var gaugeCircle1 = new Gauge(document.getElementById('gaugeCircleMDA01')).setOptions(optsGaugeCircle);
var gaugeCircle2 = new Gauge(document.getElementById('gaugeCircleMDA02')).setOptions(optsGaugeCircle);
var gaugeCircle3 = new Gauge(document.getElementById('gaugeCircleHDA01')).setOptions(optsGaugeCircle);
var gaugeCircle4 = new Gauge(document.getElementById('gaugeCircleHDA02')).setOptions(optsGaugeCircle);
var gaugeCircle5 = new Gauge(document.getElementById('gaugeCircleEDA03')).setOptions(optsGaugeCircle);
var gaugeCircle6 = new Gauge(document.getElementById('gaugeCircleEDA04')).setOptions(optsGaugeCircle);
var gaugeCircle7 = new Gauge(document.getElementById('gaugeCircleEDA05')).setOptions(optsGaugeCircle);
var gaugeCircle8 = new Gauge(document.getElementById('gaugeCircleEDA07')).setOptions(optsGaugeCircle);
var gaugeCircle9 = new Gauge(document.getElementById('gaugeCircleEDA08')).setOptions(optsGaugeCircle);
var gaugeCircle10 = new Gauge(document.getElementById('gaugeCircleEDA09')).setOptions(optsGaugeCircle);
//gaugeSemi.animationSpeed = 50; // set animation speed (32 is default value)
//gaugeSemi.maxValue=100;
//gaugeSemi.set(25);
gaugeCircle1.animationSpeed = 50; 
gaugeCircle1.maxValue=3;
gaugeCircle1.set(75);
gaugeCircle2.animationSpeed = 50; 
gaugeCircle2.maxValue=3;
gaugeCircle2.set(43);
gaugeCircle3.animationSpeed = 50; 
gaugeCircle3.maxValue=3;
gaugeCircle3.set(65);
gaugeCircle4.animationSpeed = 50; 
gaugeCircle4.maxValue=3;
gaugeCircle4.set(62);
gaugeCircle5.animationSpeed = 50; 
gaugeCircle5.maxValue=3;
gaugeCircle5.set(68);
gaugeCircle6.animationSpeed = 50; 
gaugeCircle6.maxValue=3;
gaugeCircle6.set(10);
gaugeCircle7.animationSpeed = 50; 
gaugeCircle7.maxValue=3;
gaugeCircle7.set(30);
gaugeCircle8.animationSpeed = 50; 
gaugeCircle8.maxValue=3;
gaugeCircle8.set(18);
gaugeCircle9.animationSpeed = 50; 
gaugeCircle9.maxValue=3;
gaugeCircle9.set(50);
gaugeCircle10.animationSpeed = 50; 
gaugeCircle10.maxValue=3;
gaugeCircle10.set(46);


});