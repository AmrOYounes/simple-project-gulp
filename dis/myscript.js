var isscroll=true;
var alldata=[];
var uu=false;
var firstAddition=true;
var t = 0, i = 0, j = 0;
var k=0;
$(window).on('load', function () {
    $('#status').fadeOut();
    $('#preloader').fadeOut(300);
});
$( document ).ready(function() {
    var cards = document.querySelector('#infinte-list');
    $("#iframeloading").show();
        $("#iframeloading").fadeOut(500);
        addfirst(10,uu);
        $(window).scroll( function () {
            var scrollTop = $(document).scrollTop();
            var windowHeight = $(window).height();
            var bodyHeight = $(document).height() - windowHeight;
            var scrollPercentage = (scrollTop / bodyHeight);
            if (scrollPercentage>=0.75&&isscroll) 
            {
                isscroll=false;
                
                 addfirst(5,uu);
                setTimeout(function() {
                    isscroll=true;
                    
                }, 350);

            }
             
        });
        $('#sort-cards').on('click', function () {
            var list = document.getElementById('infinte-list');

            //remove all cards
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
        
            alldata.sort(function (a, b) {
         return compareStrings(a.name.first, b.name.first);
            });
            i = 0;
            j = 0;
            t = 0;
            uu=true;
            isscroll=false;
            addfirst(alldata.length,uu);
        
        });
        
        $('#sort-date').on('click', function () {
            var list = document.getElementById('infinte-list');
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
            alldata.sort(function (a, b) {
             return compareDate(a.name.first, b.name.first);
            });
            i = 0;
            j = 0;
            t = 0;
            uu=true;
            isscroll=false;
            addfirst(alldata.length,uu);
        });
        
        
});




function addfirst(numm,uu){
    $.getJSON("https://randomuser.me/api/?results="+numm+"&nat=us",function(data){
        // itemss=data.results;
        if(!uu){ 
        for( i;i<data.results.length;i++){
            alldata.push(data.results[i]);
            var firstName = data.results[i].name.first;
            var lastName = data.results[i].name.last;
            var fullname = firstName + " " + lastName;
            var pic = data.results[i].picture.large;
           
            $('#infinte-list').append('<li><div class="card">' +
            '<div class="person-photo">' +
            '<img src="' + pic + '"' + 'class="image" >' +
            '</div>' +
            '<div class="person-info">' +
            '<p id="key">MY Name</p>' +
            '<P id="value">' + fullname + '</P>' +
            '<br>' +
            '</div>' +
            '<div class="social-media">' +
            '<button class="social-button" id="name' + j + '"' + '><i class="fas fa-user-circle fa-2x"></i></i></button>' +
            '<button class="social-button" id="varter' + j + '"' + '><i class="fas fa-envelope fa-2x"></i></button>' +
            '<button class="social-button" id="location' + j + '"' + '><i class="fas fa-map-marker-alt fa-2x"></i></button>' +
            '<button class="social-button" id="date' + j + '"' + '><i class="far fa-calendar-alt fa-2x"></i></button>' +
            '<button class="social-button" id="pass' + j + '"' + '><i class="fas fa-lock fa-2x"></i></button>' +
            '</div>' +
            '</div></li>');
            j++;

        }
    }
        else{
            i=0;
            for( i;i<alldata.length;i++){
                var firstName = alldata[i].name.first;
                var lastName =  alldata[i].name.last;
                var fullname = firstName + " " + lastName;
                var pic = alldata[i].picture.large;
               
                $('#infinte-list').append('<li><div class="card">' +
                '<div class="person-photo">' +
                '<img src="' + pic + '"' + 'class="image" >' +
                '</div>' +
                '<div class="person-info">' +
                '<p id="key">MY Name</p>' +
                '<P id="value">' + fullname + '</P>' +
                '<br>' +
                '</div>' +
                '<div class="social-media">' +
                '<button class="social-button" id="name' + j + '"' + '><i class="fas fa-user-circle fa-2x"></i></i></button>' +
                '<button class="social-button" id="varter' + j + '"' + '><i class="fas fa-envelope fa-2x"></i></button>' +
                '<button class="social-button" id="location' + j + '"' + '><i class="fas fa-map-marker-alt fa-2x"></i></button>' +
                '<button class="social-button" id="date' + j + '"' + '><i class="far fa-calendar-alt fa-2x"></i></button>' +
                '<button class="social-button" id="pass' + j + '"' + '><i class="fas fa-lock fa-2x"></i></button>' +
                '</div>' +
                '</div></li>');
                j++;
    
            }

        }
    
    i=0;
        var item = document.querySelectorAll('#infinte-list li button');
        
        for ( k ; k < item.length; k++) {
            item[k].addEventListener('click', function (event) {
                var idd,hint,index,newStr;
                idd = event.target.id;
                hint = "" + this.id;
                var thenum = hint.replace( /^\D+/g, ''); 
                console.log(thenum);
                   index = parseInt(thenum);
              newStr = hint.replace(/[0-9]/g, '');
                switch (newStr) {
                    case "name": 
                        var editcard = this.parentNode.parentNode;
                        var x = editcard.querySelector('.person-info');
                        var fname, lname, fulname, tittle;
                        fname = alldata[index].name.first;
                        lname = alldata[index].name.last;
                        fulname = fname + " " + lname;
                        tittle = "My Name";
                        var gg = x.querySelector('#key');
                        var textval = x.querySelector('#value');
                        gg.innerHTML = tittle;
                        textval.innerHTML = fulname;
                        break;
                    case "varter":
                         editcard = this.parentNode.parentNode;
                         x = editcard.querySelector('.person-info');
                        var email;
                        email = alldata[index].email;
                        tittle = "My Email";
                         gg = x.querySelector('#key');
                         textval = x.querySelector('#value');
                        gg.innerHTML = tittle;
                        textval.innerHTML = email;
                        break;
                    case "location":
                         editcard = this.parentNode.parentNode;
                         x = editcard.querySelector('.person-info');
                        var city;
                        city = alldata[index].location.city;
                        tittle = "City Location";
                         gg = x.querySelector('#key');
                        textval = x.querySelector('#value');
                        gg.innerHTML = tittle;
                        textval.innerHTML = city;
                        break;
                    case "date":
                         editcard = this.parentNode.parentNode;
                         x = editcard.querySelector('.person-info');
                        var datee;
                        datee = alldata[index].dob.date;
                        tittle = "Date";
                         gg = x.querySelector('#key');
                         textval = x.querySelector('#value');
                        gg.innerHTML = tittle;
                        textval.innerHTML = datee;
                        break;
                    case "pass":
                       editcard = this.parentNode.parentNode;
                         x = editcard.querySelector('.person-info');
                        var pass;
                        pass = alldata[index].login.password;
                        tittle = "Password";
                         gg = x.querySelector('#key');
                         textval = x.querySelector('#value');
                        gg.innerHTML = tittle;
                        textval.innerHTML = pass;
                     
                        break;
    
                }
            });
        }
    });
}

function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
}
function compareDate(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (a < b) ? 1 : (a > b) ? -1 : 0;
}
