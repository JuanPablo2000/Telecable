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
        'Handlebars': '/module/js/rc/handlebars/handlebars.min-v4.0.6',
        'underscore': '/module/js/rc/underscore/underscore.min',
        'datatable': '/file/HtmlVersion/assets/dataTables/tables/js/jquery.dataTables.min',
        'bootstrap': '/file/HtmlVersion/assets/js/plugins/bootstrap.bundle.min',
        'bootstrapTable': '/file/HtmlVersion/assets/dataTables/tables/js/dataTables.bootstrap4.min',
        'pcoded': '/file/HtmlVersion/assets/js/pcoded',
        'dateDropper': '/file/HtmlVersion/assets/js/plugins/datedropper.pro.min',
        'scrollbar': '/file/HtmlVersion/assets/js/perfect-scrollbar',
        'datetime': '/file/HtmlVersion/assets/dataTables/tables/js/datetime-moment',
        'responsive': '/file/HtmlVersion/assets/dataTables/Responsive-2.2.3/js/dataTables.responsive.min',
        'responsiveBootstrap': '/file/HtmlVersion/assets/dataTables/Responsive-2.2.3/js/responsive.bootstrap4',
        'pdfmaker': '/file/HtmlVersion/assets/dataTables/pdfmake-0.1.36/pdfmake',
        'vfs_font': '/file/HtmlVersion/assets/dataTables/pdfmake-0.1.36/vfs_fonts',
        'dataTablesButtons': '/file/HtmlVersion/assets/dataTables/Buttons-1.6.1/js/dataTables.buttons',
        'buttonsBootstrap': '/file/HtmlVersion/assets/dataTables/Buttons-1.6.1/js/buttons.bootstrap4.min',
        'buttonsHtml': '/file/HtmlVersion/assets/dataTables/Buttons-1.6.1/js/buttons.html5.min',




    },
    shim: {
        "moment": {
            "deps": ['jquery']
        },
        "datatable": ["jquery", "bootstrap"],
        "dateDropper": ["jquery"],
        "bootstrap": {
            "deps": ['jquery']
        },
        "pcoded": ["jquery"],

        "bootstrapTable": ["datatable"],
        "datetime": {
            "deps": ['jquery']
        },
        "responsive": {
            "deps": ['jquery']
        },
        "responsiveBootstrap": {
            "deps": ['responsive']
        },

        "dataTablesButtons": ['datatable'],

        "buttonsBootstrap": {
            "deps": ['datatable', 'dataTablesButtons']
        },

        "vfs_font": ["pdfmaker"]


    },

    map: {
        '*': {
            'datatables.net': 'datatable',
            'datatables.net-responsive': 'responsive',
            'datatables.net-bs4': 'bootstrapTable',
            'datatables.net-buttons': 'dataTablesButtons'
        }
    },
    hbs: {
        disableI18n: true
    },
    waitSeconds: 0
});

var flagLoadHistories=false;
var k = 0;

Array.prototype.last = function(){
        return this[this.length - 1];
    };
    
Array.prototype.unique = function() {
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}

require(["baja!", "jquery", "bootstrap", "momentsLocales", "pdfmaker", "vfs_font", "dateDropper", "scrollbar", "pcoded", "bootstrapTable", "responsiveBootstrap", "buttonsBootstrap", "buttonsHtml"], function(baja, $, bootstrap, moment) {
    baja.Ord.make("station:|slot:/Drivers|bql:select parent.slotPath from history:HistoryExt").get({
            lease: false
        })
        .then(function(devices) {
            devices.cursor({
                before: function() {
                    arrPaths = [];
                   
                },
                each: function() {
                  
                 (this.get('parent$2eslotPath').split("/").slice(3)[0]=="points")?path = this.get('parent$2eslotPath').split("/").slice(1, -2):path = this.get('parent$2eslotPath').split("/").slice(1, -2)
                 arrPaths.push('slot:/' + path.join('/'));

                },
                after: function() {
                    arrPaths = arrPaths.unique();
                    for (i = 0; i < arrPaths.length; i++) {
                        var str=arrPaths[i].split('/').last()
                        $("#devices").append('<option value="' + arrPaths[i] + '">' + arrPaths[i].split('/').last().toString().replace(/[^a-z0-9\s]/gi, '').replace(/2d/g,"-") + '</option>');
                    }
                    $("#devices").val(arrPaths[0]);
                    loadHistories(arrPaths[0]);
                    //alert(arrPaths[0]);
                },
                limit: 200
            });
        })
        .catch(function(err) {
            baja.error('ORD failed to resolve: ' + err);
        });
        
   var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    $('#endDate').val(months[new Date().getMonth()] + '/' + new Date().getDate() + '/' + new Date().getFullYear());
    var date = new Date();
    var lastMonth = new Date(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
    $('#startDate').val(months[lastMonth.getMonth()] + '/' + lastMonth.getDate() + '/' + lastMonth.getFullYear());
    $('#buttonReport').click(function() {
        $('.alarmsConta').css('display','block');
        $('#main-chart').css('display','none');
        makeTrend($('#histories').val(), $('#startDate').val(), $('#endDate').val(),k);
        k=k+1;

    });


  


    // Funcion que se activa cuando se selecciona un device
   
$('#devices').change(function(){
  var selectedDevice=$('#devices').val();
 loadHistories(selectedDevice);
  
});


 var timeoutLoading = setInterval(function() { //cuando ya hay datos desaparece el loading page
            if(flagLoadHistories) {
              clearInterval(timeoutLoading);
              document.querySelector(".conta").style.display = 'none';
              document.querySelector(".pcoded-content").style.display = 'block';
              }else {
              }
            }, 1000);
        

  
function loadHistories(selectedDevice){
  var str="$2d";
   baja.Ord.make("station:|" + selectedDevice + "|bql:select resolveHistoryName, toPathString  from history:HistoryExt").get({
                lease: true
            })
            .then(function(histories) {
                histories.cursor({
                    before: function() {
                        $("#histories").empty();
                    },
                    each: function() {
                       client= (this.get('toPathString').split('/').slice(1,4).last());
                        $("#histories").append('<option value="history:/'+client+'/' + this.get('resolveHistoryName') + '">' + this.get('resolveHistoryName').toString().replace(str, '-').replace(str, '-') + '</option>');
                        path = this.get('resolveHistoryName');
                    },
                    after: function() {
                          flagLoadHistories = true;
                      
                    },
                    limit: 200
                });
            })
            .catch(function(err) {
                baja.error('ORD failed to resolve: ' + err);
            });
}


function makeTrend (device,startDate,endDate,index){
  var array=[];
  var unit='';
  var symbol='';
  
  baja.Ord.make(device+"?period=timeRange;start="+lastMonth.toISOString()+";end="+date.toISOString()+"|bql: select timestamp, value").get({
                lease: true
            })
            .then(function(histories) {
                histories.cursor({
                    before: function() {
                        //$("#histories").empty();
                  
                       
                    },
                    each: function() {
                      
                      array.push([(this.get("timestamp").getJsDate().getTime())-21600000,this.get("value")]);
                       // $("#histories").append('<option value="history:/BMS_Electrotecnica/' + this.get('resolveHistoryName') + '">' + this.get('resolveHistoryName') + '</option>');
                        //path = this.get('resolveHistoryName');
                        
                    },
                    after: function() {
                        unit=histories.getColumns(1)[1].getFacets().get('units').getUnitName();
                        symbol=histories.getColumns(1)[1].getFacets().get('units').getSymbol();

                    },
                    limit: 100000
                });
            })
            .catch(function(err) {
                baja.error('ORD failed to resolve: ' + err);
            });
  var str="$d2" 
  var options = {
          series: [{
          name: unit,
          data: array
        }],
          chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        title: {
          text: device.split('/').last().toString().replace(str, '-').replace(str, '-'),
          align: 'left',
          style:{
            color:'#C0C0C0',
          }
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
        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toFixed(2)+" "+symbol;
            },
            style:{
              color:'#C0C0C0',
            }
          },
          title: {
            text: unit
          },
        },
        xaxis: {
          type: 'datetime',
          labels:{
            style:{
              colors:'#C0C0C0'
            }
          }
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return unit+":"+val.toFixed(2)+" "+symbol;
            }
          }
        },
        theme: {
          mode: 'dark',
        }
        };



var chart = new ApexCharts(document.querySelector("#main-chart"), options);
        
if (index>0){
  chart.render();
   var timeout = setInterval(function() {
            if(array.length>0 ) {
              clearInterval(timeout);
              chart.updateSeries([{
                data: array,
              }]).then(function(){
                $('.alarmsConta').css('display','none');
                $('#main-chart').css('display','block');
              })

              }else {
              }
            }, 1000);
  

 }else{
   
   chart.render();
   $('.alarmsConta').css('display','none');
   $('#main-chart').css('display','block');
 }
}
 
   



});