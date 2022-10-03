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
        'datetime-moment': '/file/HtmlVersion/assets/js/plugins/datetime-moment'



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
        "datetime-moment": {
            "deps": ["datatable", "moment"]
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


require(["baja!", "jquery", "bootstrap", "moment", "pdfmaker", "vfs_font", "dateDropper", "scrollbar", "pcoded", "bootstrapTable", "responsiveBootstrap", "buttonsBootstrap", "buttonsHtml", "datetime-moment"], function(baja, $, bootstrap, moment) {

    var t;
    

    $(document).ready(function() {


        $("#user2").html(baja.getUserName());
        // variable que almacena el datatable
        var sub = new baja.Subscriber();
        moment.locale('es');
        $.fn.dataTable.moment('MMM D, YY HH:mm:ss', 'es');
        tempArr = {};
        arr = [];


        sub.attach('changed', function(prop) {

            switch (prop.getName()) {
                case "unackedAlarmCount":
                case "inAlarmCount":
                    tempArr = {};
                    arr = [];
                    arr['setAck'] = function(uid) {
                        var a = {};
                        a.ids = [uid.toString()];
                        baja.Ord.make("alarm:").get({
                            ok: function(e) {
                                this.ackAlarms(a);
                            },
                            fail: function(e) {
                                console.log("El error es: " + e)
                            },
                        })
                    }
                    baja.Ord.make("alarm:").get({}).then(function(a) {

                        a.queryAlarmDatabase("12:00AM - 12:00PM").then(function(as) {
                            t.clear().draw();
                            
                            as.r.forEach(alarm => {
                               
                                tempArr.d = (transString(alarm.d));
                                tempArr.s = (transArr(alarm.s));
                                
                                if (typeof tempArr.s.alarmData.enterprise !== 'undefined' && tempArr.d.ackState == 'Acked') {
                                    tempArr.state = 1;
                                    
                                } else if ((typeof tempArr.s.normalTime === 'undefined') && tempArr.d.ackState == 'Acked') {
                                    tempArr.state = 4 //color amarillo
                                } else if (typeof tempArr.s.normalTime === 'undefined') {
                                    tempArr.state = 3 //color rojo
                                } else if (typeof tempArr.s.normalTime !== 'undefined' && tempArr.d.ackState == 'Unacked') {
                                    tempArr.state = 2 //color verde
                                } else {
                                    tempArr.state = 1
                                }

                                if (tempArr.d.ackState == 'Acked') {
                                    tempArr.reconocer = '<span class="text-success"><i class="icon feather icon-check-circle m-r-5"></i>ack</span>'
                                } else {
                                    tempArr.reconocer = '<button class="btn btn-round btn-danger" onclick="arr.setAck(\'' + tempArr.s.uuid + '\')"><i class="icon feather icon-check m-r-5"></i>ack</button>'
                                }
                                if (tempArr.state != 1) {
                                    t.row.add({
                                        id: tempArr.s.uuid,
                                        alarmClass: tempArr.d.alarmClass,
                                        timestamp: moment(Date.parse(tempArr.s.timestamp)).format('MMM D, YY HH:mm:ss', 'es'),
                                        lastUpdate: moment(Date.parse(tempArr.s.lastUpdate)).format('MMM D, YY HH:mm:ss', 'es'),
                                        msgText: checkUndefined(tempArr.s.alarmData),
                                        ackState: '<span style=color:' + colorPriority(tempArr.state) + '><i class="fas fa-bell fa-lg"></i></span>',
                                        ack: tempArr.d.ackState,
                                        reconocer: tempArr.reconocer

                                    }).draw();
                                }

                            });

                        })
                    });
                    break;

            }


        });

        //Subscribe todas las clases al metodo sub
        baja.Ord.make("service:alarm:AlarmService").get({
            ok: function(a) {
                var c = 0;
                a.getSlots().is("alarm:AlarmClass").each(function(e) {

                    var cl = a.get(e).getNavOrd().relativizeToSession().toString();
                    baja.Ord.make(cl).get({
                        lease: !0,
                        subscriber: sub
                    })

                });

            },
            fail: function() {
                resolve({
                    errorMessage: Ie.FAILED_RESOLVE + " ALARMOTA"
                })
            },
            lease: !0
        });

        arr['setAck'] = function(uid) {
            var a = {};
            a.ids = [uid.toString()];
            baja.Ord.make("alarm:").get({
                ok: function(e) {
                    this.ackAlarms(a);
                },
                fail: function(e) {
                    console.log("El error es: " + e)
                },
            })
        }


        $('#dates').on('change', function() {
            alert(this.value);
            switch (this.value) {
                case "7days":
                    startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7);
                    endDate = new Date();
                    baja.AbsTime.make({ jsDate: startDate });


                    break;
            }

        });
     
        callDatabase(); // llama a la funcion para llenar la tabla


        function callDatabase() {
            baja.Ord.make("alarm:").get({}).then(function(a) {

                a.queryAlarmDatabase("12:00AM - 12:00PM").then(function(as) {
                    as.r.forEach(alarm => {
                        tempArr.d = (transString(alarm.d));
                        tempArr.s = (transArr(alarm.s));
                        // (typeof tempArr.s.normalTime === 'undefined')? tempArr.state=3: tempArr.state=2;
                        // (tempArr.d.ackState=='Acked')?tempArr.state=1: null;
                       


                        if (typeof tempArr.s.alarmData.enterprise !== 'undefined' && tempArr.d.ackState == 'Acked') {
                            tempArr.state = 1;
                        } else if ((typeof tempArr.s.normalTime === 'undefined') && tempArr.d.ackState == 'Acked') {
                           
                            tempArr.state = 4 //color amarillo
                        } else if (typeof tempArr.s.normalTime === 'undefined') {
                            tempArr.state = 3 //color rojo
                        } else if (typeof tempArr.s.normalTime !== 'undefined' && tempArr.d.ackState == 'Unacked') {
                            tempArr.state = 2 //color verde
                        } else {
                            tempArr.state = 1
                        }

                        if (tempArr.d.ackState == 'Acked') {
                            tempArr.reconocer = '<span class="text-success"><i class="icon feather icon-check-circle m-r-5"></i>ack</span>'
                        } else {
                            tempArr.reconocer = '<button class="btn btn-round btn-danger" onclick="arr.setAck(\'' + tempArr.s.uuid + '\')"><i class="icon feather icon-check m-r-5"></i>ack</button>'
                        }
                        if (tempArr.state != 1) {
                           

                            arr.push({
                                id: tempArr.s.uuid,
                                alarmClass: tempArr.d.alarmClass,
                                timestamp: moment(Date.parse(tempArr.s.timestamp)).format('MMM D, YY HH:mm:ss', 'es'),
                                lastUpdate: moment(Date.parse(tempArr.s.lastUpdate)).format('MMM D, YY HH:mm:ss', 'es'),
                                msgText: checkUndefined(tempArr.s.alarmData),
                                ackState: '<span style=color:' + colorPriority(tempArr.state) + '><i class="fas fa-bell fa-lg"></i></span>',
                                ack: tempArr.d.ackState,
                                reconocer: tempArr.reconocer

                            });
                        }
                    })
                }).then(function() {
                    console.log(arr);
                    createTable(arr);
                })
            });
        }



    });





    function createTable(arr) {
        t = $("#tableAlarm").DataTable({
            "language": {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "No hay alarmas presentes",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad"
                }
            },
            "fnInitComplete": function() {
                document.querySelector(".conta").style.display = 'none';
                document.querySelector(".pcoded-content").style.display = 'block';

            },
            "processing": true,
            // "serverSide": true,
            "columns": [{
                    "data": "ackState"
                },
                {
                    "data": "alarmClass"
                },
                {
                    "data": "timestamp"
                },
                {
                    "data": "lastUpdate"
                },
                {
                    "data": "msgText"
                },

                { "data": "reconocer" }
            ],

            "data": arr,
            "order": [
                [2, "desc"]
            ],
            "columnDefs": [{
                targets: [0, 5],
                type: 'html',
                "ordering": false,
            }],
            //dom: 'Blfrtip',
            //dom: "<'row'<'col-md-2'l><'col-md-2'B><'col-md-8'f>r>t<'row'<'col-md-4'i><'col-md-8'p>>",
            dom: "<'#colvis row'><'row'<'col-md-9'><'col-md-3'B>><'row'<'col-md-8'l><'col-md-4'f>r>t<'row'<'col-md-4'i><'col-md-8'p>>",
            buttons: [{
                text: '<i class="fas fa-check-double m-r-5"></i>Reconocer todas las alarmas',
                "className": 'btn btn-danger btn-round',
                action: function(e, dt, node, config) {
                    ackAlarms();
                }
            }]



        });
    }

    function checkUndefined(arr) {
        let ret;
     
        ($.type(arr.msgText) === "undefined") ? ret = arr.lgpSysEventDescription: ret = arr.msgText;
        ($.type(ret) === "undefined") ? ret = "undefined": ret;
        return ret;
    }


    function ackAlarms() {
        a = {};
        a.ids = [];
        t.rows().every(function(rowIdx, tableLoop, rowLoop) {
            (this.data().ack == 'Unacked') ? a.ids.push(this.data().id): null
        })
        baja.Ord.make("alarm:").get({
            ok: function(e) {
                this.ackAlarms(a);
            },
            fail: function(e) {
                console.log("El error es: " + e)
            },
        })
    }

    function transArr(arr) {
        var obj = {};
        for (i = 0; i < arr.length; i++) {
            (arr[i].n == "alarmData") ? obj[arr[i].n] = transString(arr[i].d): obj[arr[i].n] = arr[i].v;

        }
        return obj;
    }

    function transString(str) {
        var obj = {}
        var arr = str.split(',');
        for (k = 0; k < arr.length - 1; k++) {
            if (arr[k] != " ") {
                (arr[k].includes("=")) ? ge = arr[k].split("="): null;

                obj[ge[0].toString().trim()] = ge[1].toString().trim();
            }


        }
        return obj
    }

    function colorPriority(priority) {
        var p = parseInt(priority);
        var r;
        if (p == 1) {
            r = 'gray';
        } else if (p == 2) {
            r = '#20c997'
        } else if (p == 3) {
            r = '#E74C3C'
        } else {
            r = '#FFB64D'
        }

        return r;
    }


});