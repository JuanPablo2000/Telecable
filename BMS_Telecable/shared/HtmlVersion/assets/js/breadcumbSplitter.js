var result = new Array();

function logOut() {
  var loc = "https://" + window.location.host + "/logoutConfirm";
  location.href = loc;
}

function loadBreadcrumb() {
  $('#notificationMenu').hide();
  var page = document.getElementById('page').getAttribute('data').split("|")[0];
  var pagination = new Array();
  path(pagination, page, breadcrumb, 0);
  construct(pagination);

}

function load_page(page) {

  $("#page").attr("data", page + '|view:?fullScreen=true');


}




function errorFunction() {
  document.getElementById("body").innerHTML = '<object id="page" type="text/html" data="accessDenied.html|view:?fullScreen=true" onerror="errorFunction()" style="width:100%; height:850px;" allowfullscreen="true" ></object>';
}

function construct(pagination) {
  $(".breadcrumb").html('');
  for (i = 0; i < pagination.length; i++) {
    if (i == 0) {
      $(".breadcrumb").append(`<li class="breadcrumb-item"><a onclick="load_page('${pagination[i]}')"><i class="feather icon-home"></i> ${(pagination[i][0].toUpperCase() + pagination[i].slice(1)).split(".")[0]}</a></li>`);
    } else {
      newSplit = pagination[i].split("/");

      if (newSplit.length > 10) {
        $(".breadcrumb").append(`<li class="breadcrumb-item"><a onclick="load_page('${pagination[i]}')">${(newSplit[newSplit.length-1].split("%")[0])}</a></li>`);
      } else if (newSplit.length > 1) {
        $(".breadcrumb").append(`<li class="breadcrumb-item"><a onclick="load_page('${pagination[i]}')">${(newSplit[newSplit.length-1].split(".")[0])}</a></li>`);
      } else {
        $(".breadcrumb").append(`<li class="breadcrumb-item"><a onclick="load_page('${pagination[i]}')">${pagination[i].split(".")[0]}</a></li>`);
      }


    }
  }
}











function showNotification() {
  $('#notificationMenu').toggle('slide');
}




function path(pagination, page, object, h) {

  if (object.hasOwnProperty(page)) {
        result.splice(h, result.length); // delete trash elements in the array
        //pagination.splice(0.pagination.length);
        for (var o in result) {
          pagination[o] = result[o];

        }
        pagination.push(page);
      } else {
        h++;
        if (Object.keys(object).length > 0) {
          for (var i in object) {
            result[h - 1] = i;
            path(pagination, page, object[i], h);
          }

        }
      }
    }

    ! function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://weatherwidget.io/js/widget.min.js';
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, 'script', 'weatherwidget-io-js');
