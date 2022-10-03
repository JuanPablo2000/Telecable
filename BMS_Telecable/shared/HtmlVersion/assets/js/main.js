
require.config({
      config: {
        lex: {},
        baja: {},
      },
      paths: {
        'nmodule': '/module',
        'bajaScript': '/module/bajaScript/rc',
        'bajaux': '/module/bajaux/rc',
        'jquery': '/module/js/rc/jquery/jquery-3.2.0.min',
        'Promise': '/module/js/rc/bluebird/bluebird.min',
        'dialogs': '/module/js/rc/dialogs/dialogs.built.min',
        'lex': '/module/js/rc/lex/lexplugin',
        'css': '/module/js/com/tridium/js/ext/require/css',
        'baja': '/module/bajaScript/rc/plugin/baja',
         'hbs': '/module/js/rc/require-handlebars-plugin/hbs',
        'Handlebars': '/module/js/rc/handlebars/handlebars.min-v4.0.6',
        'underscore': '/module/js/rc/underscore/underscore.min',
        'vendor': 'vendor-all.min',
        'bootstrap': 'plugins/bootstrap.min' ,
        'pcoded': 'pcoded.min',
   
      },
      hbs: {
        disableI18n: true
      },
      waitSeconds: 0
    });
    
  require(["baja!","jquery"],function(baja,$){
   
     /* Llamados de instancias para subscribers*/
     var sub = new baja.Subscriber();
     var subHistoryUPS = new baja.Subscriber();
     var subHistoryPUE = new baja.Subscriber();
     var subHistoryTempAires = new baja.Subscriber();
     var subAlarm = new baja.Subscriber();
     
  /* Declaración de variables globales */   
      var arrMonthly=new Array(); //Array que contiene el promedio de consumo de potencia diario de UPS
      var arrMonthlyPUE= new Array();//Array que contiene los valores diarias del PUE
      var trendTemp1= new Array(); //Array que contiene la temperatura del aire1 del centro de datos
      var trendTemp2= new Array(); //Array que contiene la temperatura del aire2 del centro de datos
      var series=new Array();// Array que contiene las alarmas por equipo
      var arrDevices=new Array();//Array que contiene las lista de los equipos que se han alarmado 
      var arrDatesPUE=new Array();//Array que contiene las fechas del pue
      var arrDatesUPS=new Array(); //Array que contiene las fechas de la potencia de UPS
      

    
  /* Asignación de eventos para cada instancia de los subscribers*/   
   
   
      
      subHistoryUPS.attach('changed added', function (prop) {
          updatTableUPS(this); 
      });
      
       subHistoryPUE.attach('changed added', function (prop) {
          updatTablePUE(this); 
      });
      
        subHistoryTempAires.attach('changed added', function (prop) {
          updatTableTempAires(this); 
      })
      
      
  /* Llamado de todas las variables que se muestran en el dashboard*/
    var r = new baja.BatchResolve(["station:|slot:/Drivers/NiagaraNetwork/Jace1_Electrotecnica/points/SistemaFotovoltaico/ACPotenciaKW_PanelSolar",
    "station:|slot:/Drivers/NiagaraNetwork/Jace1_Electrotecnica/points/SistemaFotovoltaico/PotenciaRealHoraDia_PS",
    "station:|slot:/Drivers/NiagaraNetwork/Jace1_Electrotecnica/points/SistemaFotovoltaico/TotalMesActual_PS",
    "station:|slot:/Drivers/NiagaraNetwork/Jace1_Electrotecnica/points/Promedios/SumUPSKW",
    "station:|slot:/Drivers/NiagaraNetwork/Jace1_Electrotecnica/points/Promedios/PorcentajeCarga_UPSA",
    "station:|slot:/Drivers/NiagaraNetwork/Jace1_Electrotecnica/points/Promedios/PorcentajeCarga_UPSB",
    "station:|slot:/Drivers/NiagaraNetwork/Jace1_Electrotecnica/points/SistemaFotovoltaico/PotenciaKWHMesActual_PS",  
    "station:|slot:/Drivers/control/PUE_UPS",
    "station:|slot:/Drivers/control/Facility",
    "station:|slot:/Drivers/NiagaraNetwork/Jace1_Electrotecnica/points/SistemaFotovoltaico/PotenciaKWHMesAnt_PS",
    "station:|slot:/Drivers/NiagaraNetwork/Jace1_Electrotecnica/points/CW1/HumedadRetorno_CW1"]);

    r.resolve({
      each: function () {
       update(this);},
       subscriber: sub
    });
    
   
   
  /* Calculo de fechas y horas para generar el querys BQL*/ 
  var date= new Date();
  var firstDay= new Date(date.getFullYear(), date.getMonth(),1);
  var lastMonth= new Date(new Date().getFullYear(),new Date().getMonth()-1, new Date().getDate());
  var lastTwoMonths= new Date(date.getFullYear(), date.getMonth()-2,1);
  //lastMonth.setDate(date.getDate());
  
  var ordHistoryUPS= "history:|bql:select timestamp, value from /BMS_Electrotecnica/SumUPSKW where timestamp>='"+lastMonth.toISOString()+"'";
  var ordHistoryPUE= "history:|bql:select timestamp, value from /BMS_Electrotecnica/PUE_UPS where timestamp>='"+lastMonth.toISOString()+"'";
  var ordHistoryTempAire1= "history:/BMS_Electrotecnica/temp_return_CW3_COV?period=timeRange;start="+lastMonth.toISOString()+";end="+date.toISOString()+"|bql: select timestamp, value";
  var ordHistoryTempAire2= "history:/BMS_Electrotecnica/temp_return_CW4_COV?period=timeRange;start="+lastMonth.toISOString()+";end="+date.toISOString()+"|bql: select timestamp, value";
  var ordHistoryAlarms=  "alarm:/|bql:select timestamp, alarmClass where timestamp>='"+lastTwoMonths.toISOString()+"' order by timestamp";



 /* Llamado de funciones para mostrar tendencia de datos*/
  callTableUPS(ordHistoryUPS);
  callTablePUE(ordHistoryPUE);
  callTableTempAires(ordHistoryTempAire1,ordHistoryTempAire2);
  callAlarms(ordHistoryAlarms);

  
  




/* Funciones */

     function callAlarms(ord){
        baja.Ord.make(ord).get({ subscriber: function(){
          subAlarm.attach('changed added', function(prop){
          })
        }})
          .then(function (table) {
            updateAlarms(table);
            
        });

      }


      function callHum(hum){// Función que setea el valor del gauge de humedad
        gauge.set(hum);
  
      }

      function callTableTempAires(ord1,ord2){
       var r = new baja.BatchResolve([ord1,ord2]);
       var index=0;

        r.resolve({
      each: function () {
        if (index==0){
          updateTableTempAires(this,trendTemp1);
        } else{
          updateTableTempAires(this,trendTemp2);
        }
       
        index++;
      },
       subscriber: subHistoryTempAires
    });

      }

      function callTablePUE(ord){
        baja.Ord.make(ord).get({ subscriber: subHistoryPUE })
          .then(function (numeric) {
            updateTablePUE(numeric);
        });

      }


      function callTableUPS(ord){
       baja.Ord.make(ord).get({ subscriber: subHistoryUPS })
          .then(function (numeric) {
            updateTableUPS(numeric);
        });

      }
      
      function updateAlarms(table){
        var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        var arrAlarms=[];
        var arrMonths=[];
        var index=0;
        var indexSeries=0;
        
        table.cursor({
          each: function(){
            if (index==0){
              arrMonths.push(months[this.get("timestamp").getJsDate().getMonth()]);
              arrDevices.push(this.get("alarmClass"));
              series[indexSeries]=new Object({name:months[this.get("timestamp").getJsDate().getMonth()], data:[1]});
              index++;
            }else if(index>0){
              if(months[this.get("timestamp").getJsDate().getMonth()]==arrMonths[arrMonths.length-1]){
                if(arrDevices.indexOf(this.get("alarmClass"))!=-1){
                  if(series[indexSeries].data[arrDevices.indexOf(this.get("alarmClass"))]===undefined){
                    series[indexSeries].data[arrDevices.indexOf(this.get("alarmClass"))]=0;
                  }
                   series[indexSeries].data[arrDevices.indexOf(this.get("alarmClass"))]=series[indexSeries].data[arrDevices.indexOf(this.get("alarmClass"))]+1;
                   index++;
                }else{
                  arrDevices.push(this.get("alarmClass"));
                  series[indexSeries].data[arrDevices.indexOf(this.get("alarmClass"))]=0;
                  series[indexSeries].data[arrDevices.indexOf(this.get("alarmClass"))]=series[indexSeries].data[arrDevices.indexOf(this.get("alarmClass"))]+1;
                  index++;
                }
              }else if(arrDevices.indexOf(this.get("alarmClass"))!=-1){
                arrMonths.push(months[this.get("timestamp").getJsDate().getMonth()]);
                indexSeries++;
                series[indexSeries]=new Object({name:months[this.get("timestamp").getJsDate().getMonth()], data:[]});
                series[indexSeries].data[arrDevices.indexOf(this.get("alarmClass"))]=0;
                series[indexSeries].data[arrDevices.indexOf(this.get("alarmClass"))]=series[indexSeries].data[arrDevices.indexOf(this.get("alarmClass"))]+1;
                index++;
              }else{
                indexSeries++;
                arrMonths.push(months[this.get("timestamp").getJsDate().getMonth()]);
                arrDevices.push(this.get("alarmClass"));
                series[indexSeries]=new Object({name:months[this.get("timestamp").getJsDate().getMonth()], data:[]});
                series[indexSeries].data[arrDevices.indexOf(this.get("alarmClass"))]=0;
                series[indexSeries].data[arrDevices.indexOf(this.get("alarmClass"))]=series[indexSeries].data[arrDevices.indexOf(this.get("alarmClass"))]+1;
                index++;
              }
            }
          },
          after: function(){
              series.forEach(function(obj){
                  for (i=0; i<arrDevices.length; i++){
                    if(obj.data[i]===undefined){
                      obj.data[i]=0;
                      
                    }
                  }
          
              });
            
          },
          limit: 1000,
        })
      }
      
      
      
      function updateTableUPS(table){
        var arrValues=[];
        var actualDay;
        var index=0;
        var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']; 

        table.cursor({
          before: function(){
            arrMonthly=[];
          },
          each: function () {
            if (index==0){
             // arrMonthly=[];
              actualDay=parseInt(this.get("timestamp").getJsDate().getDay());
              arrDatesUPS.push(this.get("timestamp").getJsDate().getDate()+" de "+months[this.get("timestamp").getJsDate().getMonth()]);
              arrValues.push(this.get("value"))
              index++;
            }else if (index>0){
              if(actualDay==parseInt(this.get("timestamp").getJsDate().getDay())){
                arrValues.push(this.get("value"));
                index++;
              }else{
                arrMonthly.push(averageNonRound(arrValues));
                arrDatesUPS.push(this.get("timestamp").getJsDate().getDate()+" de "+months[this.get("timestamp").getJsDate().getMonth()]);
                actualDay=parseInt(this.get("timestamp").getJsDate().getDay());
                arrValues=[];
                arrValues.push(this.get("value"));
                index++;
              }
            }

         },
         after: function(){
         
         }, 
         limit:100000,
        })
        .then(function (cursor) {
          
        })
        .catch(function (err) {
          // Called if any errors in getting data
        });
        
        
      }
      
    
     function average (numbers) {
        let sum = 0;
        for (let i = 0; i < numbers.length; i++){
           sum += numbers[i];
         }
        return parseInt(sum / numbers.length);
      }
      
       function updateTablePUE(table){
        var arrValues=[];
        var actualDay;
        var index=0;
        var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']; 

        table.cursor({
          before: function(){
            arrMonthlyPUE=[];
          },
          each: function () {
            if (index==0){
             // arrMonthly=[];
              actualDay=parseInt(this.get("timestamp").getJsDate().getDay());
              arrDatesPUE.push(this.get("timestamp").getJsDate().getDate()+" de "+months[this.get("timestamp").getJsDate().getMonth()]);
              arrValues.push(this.get("value"));
              index++;
            }else if (index>0){
              if(actualDay==parseInt(this.get("timestamp").getJsDate().getDay())){
                arrValues.push(this.get("value"));
                index++;
              }else{
                arrMonthlyPUE.push(averageNonRound(arrValues));
                arrDatesPUE.push(this.get("timestamp").getJsDate().getDate()+" de "+months[this.get("timestamp").getJsDate().getMonth()]);
                actualDay=parseInt(this.get("timestamp").getJsDate().getDay());
                arrValues=[];
                arrValues.push(this.get("value"));
                index++;
              }
            }

         },
         after: function(){
         
         }, 
         limit:100000,
        })
        .then(function (cursor) {
          
        })
        .catch(function (err) {
          // Called if any errors in getting data
        });
        
      }
      
      
      function averageNonRound (numbers) {
        let sum = 0;
        for (let i = 0; i < numbers.length; i++){
          if(!isNaN(numbers[i]))
           sum += numbers[i];
         }
        return parseFloat((sum / numbers.length).toFixed(2));
      }
      
     
      function updateTableTempAires(tables,array){
        tables.cursor({
          each: function(){
            // console.log(new Date("2020-01-22T11:11:29.087-06:00"));
             //console.log(this.get("timestamp").getJsDate().getTime());
              array.push([(this.get("timestamp").getJsDate().getTime())-21600000,this.get("value")])
             
          
          },
          limit:1000000,
        })
      }

      function update (property){
       
       switch(property.getName()){
         case "ACPotenciaKW_PanelSolar": $("#dash01").html(Math.round(property.getOut().getValue())); break;
         case "PotenciaRealHoraDia_PS": $("#dash01_1").html(property.getOut().getValue().toFixed(2)); break;
         case "PotenciaKWHMesActual_PS": $("#dash01_2").html(property.getOut().getValue().toFixed(2)); break;
         case "PotenciaKWHMesAnt_PS": $("#dash01_3").html(property.getOut().getValue().toFixed(2)); break;
         case "TotalMesActual_PS": $("#dash01_4").html("₡"+Math.round(property.getOut().getValue()).toLocaleString()); break;
         case "SumUPSKW": $("#dash02").html(property.getOut().getValue()); $("#dash03_2").html(property.getOut().getValue()); break;
         case "PorcentajeCarga_UPSA": $("#dash02_1").html(property.getOut().getValue().toFixed(2)); break; 
         case "PorcentajeCarga_UPSB": $("#dash02_2").html(property.getOut().getValue().toFixed(2)); break;
         case "PUE_UPS": $("#dash03").html(property.getOut().getValue().toFixed(2)); break;
         case "Facility": $("#dash03_1").html(property.getOut().getValue().toFixed(2)); break;
         case "HumedadRetorno_CW1": $("#semicircle_01").html((property.getOut().getValue().toFixed(1))+" Rh%"); callHum(property.getOut().getValue().toFixed(0)); break;
         default: $("#dash04").html(property.getOut().getValue()); break;
       }
      
      }
      
      
      
  
      
/*Declaracion de datos para los trends y gauge*/
var optsGauge = {
          lines: 12, // The number of lines to draw
          angle: 0, // The span of the gauge arc
          lineWidth: 0.25, // The line thickness
          radiusScale:0.6,
          pointer: {
            length: 0.68, // The radius of the inner circle
            strokeWidth: 0.035, // The thickness
            color: '#424242' // Fill color
          },
          limitMax: false,     // If true, the pointer will not go past the end of the gauge
          colorStart: '#363636',   // Colors
          colorStop: '#03A9F4',    // just experiment with them
          strokeColor: '#f5f5f5',
            // to see which ones work best for you
          generateGradient: true,
          highDpiSupport: true,
          percentColors : [[0.0, "#ff0000"],[0.25, "#f9c802"],[0.45, "#87d70b" ],[0.65, "#f9c802"],[0.80, "#ff0000"]]// High resolution support
        }
var optionsChar01 = {
  chart: {
    type: 'line',
    height: 150,
    toolbar:{
      show:false
    }
  },
  series: [{
    name: 'Energía kWh mes actual',
    data: [50,54,23,76,43,57,19,45,23,45,45,67,42,65],
    type: 'column'
  },{
    name: 'Energía kWh mes anterior',
    type: 'line',
     data: [30,40,35,50,49,60,70,91,125,50,53,54,22,60,80,70,62,64,62,56,78,32,78,56,45,34,24,76,77,75,65],
  }],
  xaxis: {
    categories: ["Día 1","Día 2","Día 3","Día 4","Día 5","Día 6","Día 7","Día 8","Día 9","Día 10","Día 11","Día 12","Día 13","Día 14","Día 15","Día 16","Día 17","Día 18","Día 19","Día 20","Día 21","Día 22","Día 23","Día 24","Día 25","Día 26","Día 27","Día 28","Día 29","Día 30","Día 31"],
    labels:{
      show: false
    },
    axisBorder: {
      show:false
    },
    axisTicks: {
      show:false
    },
    tooltip:{
      enabled:false
    },
  
  },
  
    legend:{
      show:false
    },

  yaxis:{
    show:false
  },
  responsive:[{
    breakpoint: undefined,
  }],
  grid:{
    show:false
  },
  stroke:{
    curve: 'straight',
    dashArray:[0,8],
    width:2
  },
  
  theme:{
    palette:'palette6',
  },
  dataLabels:{
    enabled: false
  }
  
}
var optionsChar02 = {
  chart: {
    type: 'line',
    height: 150,
    toolbar:{
      show:false
    },
    dynamicAnimation:{
      enabled: true,
    }
  },
  series: [{
    name: 'Potencia mes actual',
    data: arrMonthly,
    type: 'line'
  },{
    name: 'Potencia mes anterior',
    type: 'line',
     data: [],
  }],
  xaxis: {
    categories: arrDatesUPS,
    labels:{
      show: false
    },
    axisBorder: {
      show:false
    },
    axisTicks: {
      show:false
    },
    tooltip:{
      enabled:false
    },
  
  },
  
    legend:{
      show:false
    },

  yaxis:{
    show:false
  },
  responsive:[{
    breakpoint: undefined,
  }],
  grid:{
    show:false
  },
  stroke:{
    curve: 'straight',
    dashArray:[0,8],
    width:2
  },
  
  theme:{
    palette:'palette4',
  
  },
  dataLabels:{
    enabled: false
  },
  
   tooltip: {
          theme:"dark",
          y: [
            {
              title: {
                formatter: function (val) {
                  return "Potencia promedio mes actual: "; 
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val; 
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                }
              }
            }
          ]
        },
  
}
var optionsChar03 = {
  chart: {
    type: 'line',
    height: 150,
    toolbar:{
      show:false
    }
  },

    theme:{
    palette:'palette6',
  },
  series: [{
    name: 'PUE',
    data: []
  }],
  xaxis: {
    categories:arrDatesPUE,
    labels:{
      show: false
    },
    type:'category',
    axisBorder: {
      show:false
    },
    axisTicks: {
      show:false
    },
    tooltip:{
      enabled:false
    }
  },
  
     tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val; 
                }
              }
            }]},

  yaxis:{
    show:false
  },
  responsive:[{
    breakpoint: undefined,
  }],
  grid:{
    show:false
  },
  stroke:{
    curve: 'smooth',
    width:2
  }
  
}
var optionsChar04 = {
  chart: {
    type: 'area',
    height: 390,
    toolbar:{
      show:true
    },
    dynamicAnimation:{
      enabled: true,
    },
    zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
  },
  series: [{
    name: 'Temperatura AAP 01',
    data: trendTemp1,
    type: 'area'
  },{
    name: 'Temperatura AAP 02',
    type: 'area',
    data: trendTemp2,
  }],
  xaxis: {
    labels:{
      show: true,
      style:{
        colors:'#ffffff',
      }
    },
    type: 'datetime'

  },
  
   yaxis:{
    labels:{
      show: true,
      style:{
        color:'#ffffff',
      },
      formatter:(value) => { return value.toFixed(2)+" C" },
    },
  },
 
  
    legend:{
      show:true,
      position: 'top',
      labels: {
        colors: "#ffffff"
      }
    },

  responsive:[{
    breakpoint: undefined,
  }],
  grid:{
    show:true,
     yaxis: {
        lines: {
            show: false
        }
    }, 
  },
  stroke:{
    curve: 'smooth',
    dashArray:[0,0],
   /// colors: ['#03A9F4','#FEB019'],
    width:2
  },
  
  theme:{
    palette:'palette10',
  },
  dataLabels:{
    enabled: false
  },
  
  fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
  },
  
   tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val; 
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val; 
                }
              }
            }
          ]
        },
  
}


 var optionsChar05 = {
          series: series,
          chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        
        theme:{
          mode:"dark"
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
            },
            plotOptions:{
              bar:{
                horizontal: false,
              }
            },

          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          type: 'categories',
          categories: arrDevices,
          labels:{
            show: true,
            style: { colors:'#DCDCDC'},
          },
        },
        yaxis:{
          labels:{
           style:{
             color:'#DCDCDC',
          }
          }
        },
        legend:{
      show:true,
      position: 'right',
      offsetY:40,
      labels: {
        colors: "#DCDCDC"
      }
    },
        fill: {
          opacity: 1
        },
      
        };


var chart01 = new ApexCharts(document.querySelector("#power-card-chart1"), optionsChar01);
var chart02 = new ApexCharts(document.querySelector("#power-card-chart2"), optionsChar02);
var chart03 = new ApexCharts(document.querySelector("#power-card-chart3"), optionsChar03);
var chart04 = new ApexCharts(document.querySelector("#main-chart"), optionsChar04);
var chart05 = new ApexCharts(document.querySelector("#chartAlarmsByDevice"), optionsChar05);

/* Creación del gauge */
var target = document.getElementById('gaugeHum'); // your canvas element
var gauge = new Gauge(target).setOptions(optsGauge); // create sexy gauge!
gauge.animationSpeed = 50; // set animation speed (32 is default value)
gauge.maxValue=100;

chart01.render();
chart02.render();
chart03.render();
chart04.render();
chart05.render();


  var timeout = setInterval(function() {
            if(arrMonthly.length>0) {
              clearInterval(timeout);
              chart02.appendData([{
                data: arrMonthly
              }, {
                data: [30,40,35,50,49,60,70,91,125,50,53,54,22,60,80,70,62,64,62,56,78,32,78,56,45,34,24,76,77,75,65]
              }]);
              chart02.updateOptions({
                xaxis:{
                  categories:arrDatesUPS
                }
              })

              }else {
              }
            }, 100);
  var timeoutPUE = setInterval(function() {
            if(arrMonthlyPUE.length>0) {
              clearInterval(timeoutPUE);
              chart03.appendData([{
                data: arrMonthlyPUE
              }]);
              chart03.updateOptions({
                xaxis:{
                  categories: arrDatesPUE
                }
              })

              }else {
              }
            }, 1000);
            
  var timeoutAires = setInterval(function() {
            if(trendTemp2.length>0 && trendTemp1.length>0) {
              clearInterval(timeoutAires);
              chart04.updateSeries([{
                name: 'Temperatura AAP 01',
                data: trendTemp1,
              },{
                 name: 'Temperatura AAP 02',
                data: trendTemp2,
              }])

              }else {
              }
            }, 1000);
            
  var timeoutAlarms = setInterval(function() {
            if(arrDevices.length>0) {
              clearInterval(timeoutAlarms);
              chart05.updateSeries(series);
              }else {
              }
            }, 1000);


  setInterval(function() {
    callTableUPS(ordHistoryUPS);
    setTimeout(3000);
    var diaActual=arrMonthly.length
    if(diaActual<arrMonthly.length)
    {
     chart02.updateSeries([{
                data: arrMonthly
              }, {
                data: [30,40,35,50,49,60,70,91,125,50,53,54,22,60,80,70,62,64,62,56,78,32,78,56,45,34,24,76,77,75,65]
              }])
      };
    }, 3600 * 1000);
      
    
      $("#linkHome").on("click", function() {
        alert("click");
        $("#body").html();
        $("#body").load("HtmlFile.html");
    });
       

     
    
  });

