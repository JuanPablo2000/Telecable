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
        'underscore': '/module/js/rc/underscore/underscore.min'




    },



});


require(["baja!", "jquery"], function(baja, $) {

    (baja.getUserName() == "admin" || baja.getUserName() == "fcastillov") ? $('.tabAdministracion').css("visibility", "visible"): $('.tabAdministracion').css("visibility", "hidden");
    console.log(baja.getUserName());

    $("#user").html(baja.getUserName());
    var sub = new baja.Subscriber();
    sub.attach('changed added', function(prop) {
        switch (prop.getName()) {
            case "unackedAlarmCount":
            case "inAlarmCount":

                changeBadge();
                changeAlarms();

        }


    });

    aInfo = [];
    aInfo.setAck = function(uid) {
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


    changeBadge();
    changeAlarms();

    function changeAlarms() {

        w = 0;
        baja.Ord.make("alarm:|bql:select TOP 5 where alarmClass !='defaultAlarmClass' order by timestamp desc ").get({
            cursor: {

                before: function(a) {
                    $('#notifications').html(" ");
                },

                each: function(a) {
                    aInfo[w] = {};
                    var ar = { alarmClass: a.get("alarmClass"), timestamp: a.get("timestamp"), ackState: a.$map.$map.ackState.$display, alarmData: a.get("alarmData"), uuid: a.get("uuid").toString() }
                    aInfo[w]['alarmClass'] = ar.alarmClass;
                    aInfo[w]['ackState'] = ar.ackState;
                    aInfo[w].alarmData = ar.alarmData.$map.$map;
                    aInfo[w].uuid = ar.uuid;
                    d = new Date(ar.timestamp.getJsDate());
                    var months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
                    aInfo[w].d = d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
                    (aInfo[w].ackState.equals('Unacked')) ?
                    $('#notifications').append('<li class="notification"><div class="media"><div class="media-body"><p><strong>' + aInfo[w].alarmClass + '</strong><span class="n-hour text-muted"><i class="icon feather icon-clock  m-r-5 m-l-10"></i>' + aInfo[w].d + '</span></p><p>' + checkUndefined(aInfo[w].alarmData) + '<span class="n-btn-ack"><button class="btn btn-sm btn-round btn-outline-danger" onclick="aInfo.setAck(\'' + aInfo[w].uuid + '\'); $(\'#notificationMenu\').addClass(\'show\')" ><i class="icon feather icon-check-circle m-r-5"></i>ack</button></span></p></div></div></li>'):
                        $('#notifications').append('<li class="notification"><div class="media"><div class="media-body"><p><strong>' + aInfo[w].alarmClass + '</strong><span class="n-hour text-muted"><i class="icon feather icon-clock  m-r-5 m-l-10"></i>' + aInfo[w].d + '</span></p><p>' + checkUndefined(aInfo[w].alarmData) + '<span class="n-ack text-success"><i class="icon feather icon-check-circle m-r-5"></i>ack</span></p></div></div></li>');
                    w++;
                }



            }
        });



    }


    function changeBadge() {

        baja.Ord.make("service:alarm:AlarmService").get({
            ok: function(a) {
                var c = 0;
                a.getSlots().is("alarm:AlarmClass").each(function(e) {
                    var t = a.get(e).getNavOrd().relativizeToSession().toString();

                    baja.Ord.make(t).get({
                        ok: function(l) {
                            if (l.$propInParent.$slotName != "defaultAlarmClass") {
                                var x = document.getElementById("myAudio");
                                c > 0 ? x.play() : x.pause();
                                c = c + l.getUnackedAlarmCount();
                                l.getUnackedAlarmCount() > 0? console.log(l): null;
                                (c > 0) ? $('#badge-alarm').addClass("badge"): $('#badge-alarm').removeClass("badge");
                            }


                        },
                        fail: function() {

                        },

                        lease: !0,
                        subscriber: sub
                    })

                });

            },
            fail: function() {
                resolve({
                    errorMessage: Ie.FAILED_RESOLVE + " alarm service"
                })
            },
            //subscriber: sub,
            lease: !0
        })

    }



    function checkUndefined(arr) {
        let ret;
        ($.type(arr.msgText) === "undefined") ? ret = arr.lgpSysEventDescription: ret = arr.msgText;
        ($.type(ret) === "undefined") ? ret = "undefined": ret;
        return ret;
    }



    function transArr(arr) {
        var obj = {};
        for (i = 0; i < arr.length; i++) {
            (arr[i].n == "alarmData") ? obj[arr[i].n] = arr[i].d: obj[arr[i].n] = arr[i].v;
        }
        return obj;
    }

    function transString(str) {
        var obj = {}
        var arr = str.split(',');
        for (k = 0; k < arr.length - 1; k++) {
            ge = arr[k].split("=");
            obj[ge[0]] = ge[1];

        }
        return obj
    }




    // baja.Ord.make("station:|slot:/Services/AlarmService|bql:select SUM(unackedAlarmCount) from alarm:AlarmClass").get({ SUM$28unackedAlarmCount$29

});