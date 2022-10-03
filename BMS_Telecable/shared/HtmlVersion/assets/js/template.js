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
        'datatable': '/file/HtmlVersion2/assets/dataTables/tables/js/jquery.dataTables.min',
        'bootstrap': '/file/HtmlVersion2/assets/js/plugins/bootstrap.bundle.min',
        'bootstrapTable': '/file/HtmlVersion2/assets/dataTables/tables/js/dataTables.bootstrap4.min',
        'pcoded': '/file/HtmlVersion2/assets/js/pcoded',
        'dateDropper': '/file/HtmlVersion2/assets/js/plugins/datedropper.pro.min',
        'scrollbar': '/file/HtmlVersion2/assets/js/perfect-scrollbar',
        'datetime': '/file/HtmlVersion2/assets/dataTables/tables/js/datetime-moment',
        'responsive': '/file/HtmlVersion2/assets/dataTables/Responsive-2.2.3/js/dataTables.responsive.min',
        'responsiveBootstrap': '/file/HtmlVersion2/assets/dataTables/Responsive-2.2.3/js/responsive.bootstrap4',
        'pdfmaker': '/file/HtmlVersion2/assets/dataTables/pdfmake-0.1.36/pdfmake',
        'vfs_font': '/file/HtmlVersion2/assets/dataTables/pdfmake-0.1.36/vfs_fonts',
        'dataTablesButtons': '/file/HtmlVersion2/assets/dataTables/Buttons-1.6.1/js/dataTables.buttons',
        'buttonsBootstrap': '/file/HtmlVersion2/assets/dataTables/Buttons-1.6.1/js/buttons.bootstrap4.min',
        'buttonsHtml': '/file/HtmlVersion2/assets/dataTables/Buttons-1.6.1/js/buttons.html5.min',




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


  require(["baja!", "jquery", "bootstrap", "momentsLocales", "pdfmaker", "vfs_font", "dateDropper", "scrollbar", "pcoded", "bootstrapTable", "responsiveBootstrap", "buttonsBootstrap", "buttonsHtml"], function(baja, $, bootstrap, moment) {

  
 ords = [];
 


   baja.Ord.make("station:|slot:/|bql: select from baja:User where toDataValue='"+baja.getUserName()+"'").get({
            lease: false
        })
        .then(function(users) {
            users.cursor({
                before: function() {
                    console.log('adentro');
                   
                },
                each: function() {
                   console.log(this.get('roles'));
                },
                after: function() {

                  
                },
                limit: 200
            });
        })
        .catch(function(err) {
            baja.error('ORD failed to resolve: ' + err);
        });
 
 
   
  
   
  
 
   



});