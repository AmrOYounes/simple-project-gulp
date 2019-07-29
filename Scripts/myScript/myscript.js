var isscroll=true;
var itemss = [];
var alldata=[];
var t = 0, i = 0, j = 0;
$(window).on('load',  ()=> {
    //preloader 
    $('#status').fadeOut();
    $('#preloader').fadeOut(300);
});

$( document ).ready(()=> {

    var cards = document.querySelector('#infinte-list');
    $("#iframeloading").show();
        $("#iframeloading").fadeOut(500);
        addfirst();
        
        $(window).scroll( function () {
            var scrollTop = $(document).scrollTop();
            var windowHeight = $(window).height();
            var bodyHeight = $(document).height() - windowHeight;
            var scrollPercentage = (scrollTop / bodyHeight);
            if (scrollPercentage>=0.75&& isscroll) 
            {
                isscroll=false;
                // when detect scroll add 5 card 

               getDta();
                setTimeout(function() {
                    isscroll=true;
                    
                }, 350);

         
            }
             
        });
        $('#sort-cards').on('click',  ()=> {
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
            sortt();
        
        });
        
        $('#sort-date').on('click',  ()=> {
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
            
            sortt();
        });
        
        
});

function sortt(){
    // itemss=alldata;
   
    for( i;i<alldata.length;i++){
        var firstName = alldata[i].name.first;
        var lastName = alldata[i].name.last;
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
        '<button class="social-button" id="name' + i + '"' + '><i class="fas fa-user-circle fa-2x"></i></i></button>' +
        '<button class="social-button" id="letter' + i + '"' + '><i class="fas fa-envelope fa-2x"></i></button>' +
        '<button class="social-button" id="location' + i + '"' + '><i class="fas fa-map-marker-alt fa-2x"></i></button>' +
        '<button class="social-button" id="date' + i + '"' + '><i class="far fa-calendar-alt fa-2x"></i></button>' +
        '<button class="social-button" id="pass' + i + '"' + '><i class="fas fa-lock fa-2x"></i></button>' +
        '</div>' +
        '</div></li>');

    }
    
    var item = document.querySelectorAll('#infinte-list li button');
    for (var k = 0; k < item.length; k++) {
        item[k].addEventListener('click',  (event)=> {
            var idd = event.target.id;
            var hint = "" + this.id;
            var index = parseInt(hint.slice(-1));
            var newStr = hint.substring(0, hint.length - 1);
            switch (newStr) {
                case "name": var editcard = this.parentNode.parentNode;
                    var x = editcard.querySelector('.person-info');
                    var fname, lname, fulname, tittle;

                    fname = itemss[index].name.first;
                    lname = itemss[index].name.last;
                    fulname = fname + " " + lname;
                    tittle = "My Name";

                    var gg = x.querySelector('#key');
                    var textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = fulname;
        
                    break;
                case "letter":
                     editcard = this.parentNode.parentNode;
                     x = editcard.querySelector('.person-info');
                    var email;
                    email = itemss[index].email;
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
                    city = itemss[index].location.city;
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
                    datee = itemss[index].dob.date;
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
                    pass = itemss[index].login.password;
                    tittle = "Password";

                     gg = x.querySelector('#key');
                     textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = pass;
                 
                    break;



            }


        });

    }
}


function addfirst(){
    $.getJSON("https://randomuser.me/api/?results=10&nat=us",(data)=>{
        itemss=data.results;
        for( i;i<itemss.length;i++){
            var firstName = itemss[i].name.first;
            var lastName = itemss[i].name.last;
            var fullname = firstName + " " + lastName;
            var pic = itemss[i].picture.large;
            alldata.push(itemss[i]);
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
            '<button class="social-button" id="name' + i + '"' + '><i class="fas fa-user-circle fa-2x"></i></i></button>' +
            '<button class="social-button" id="letter' + i + '"' + '><i class="fas fa-envelope fa-2x"></i></button>' +
            '<button class="social-button" id="location' + i + '"' + '><i class="fas fa-map-marker-alt fa-2x"></i></button>' +
            '<button class="social-button" id="date' + i + '"' + '><i class="far fa-calendar-alt fa-2x"></i></button>' +
            '<button class="social-button" id="pass' + i + '"' + '><i class="fas fa-lock fa-2x"></i></button>' +
            '</div>' +
            '</div></li>');

        }
        var item = document.querySelectorAll('#infinte-list li button');
        for (var k = 0; k < item.length; k++) {
            item[k].addEventListener('click',  (event)=> {
                var idd = event.target.id;
                var hint = "" + this.id;
                var index = parseInt(hint.slice(-1));
                var newStr = hint.substring(0, hint.length - 1);
                console.log(hint);
                console.log(newStr);
                switch (newStr) {
                    case "name": var editcard = this.parentNode.parentNode;
                        var x = editcard.querySelector('.person-info');
                        var fname, lname, fulname, tittle;
    
                        fname = itemss[index].name.first;
                        lname = itemss[index].name.last;
                        fulname = fname + " " + lname;
                        tittle = "My Name";
    
                        var gg = x.querySelector('#key');
                        var textval = x.querySelector('#value');
                        gg.innerHTML = tittle;
                        textval.innerHTML = fulname;
            
                        break;
                    case "letter":
                         editcard = this.parentNode.parentNode;
                         x = editcard.querySelector('.person-info');
                        var email;
                        email = itemss[index].email;
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
                        city = itemss[index].location.city;
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
                        datee = itemss[index].dob.date;
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
                        pass = itemss[index].login.password;
                        tittle = "Password";
    
                         gg = x.querySelector('#key');
                         textval = x.querySelector('#value');
                        gg.innerHTML = tittle;
                        textval.innerHTML = pass;
                     
                        break;
    
    
    
                }
    
    
            });
    
        }
            // i+=5;
            // t+=25;
    
    });
}

function getDta(){
    
    $.getJSON("https://randomuser.me/api/?results=5&nat=us",(data)=>{
       var arr=data.results;
       console.log(arr);
        
        for( var m=0;m<5;m++){
            var firstName = arr[m].name.first;
            var lastName = arr[m].name.last;
            var fullname = firstName + " " + lastName;
            var pic = arr[m].picture.large;
            alldata.push(arr[m]);
            console.log(fullname);
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
            '<button class="social-button" id="name' + i + '"' + '><i class="fas fa-user-circle fa-2x"></i></i></button>' +
            '<button class="social-button" id="letter' + i + '"' + '><i class="fas fa-envelope fa-2x"></i></button>' +
            '<button class="social-button" id="location' + i + '"' + '><i class="fas fa-map-marker-alt fa-2x"></i></button>' +
            '<button class="social-button" id="date' + i + '"' + '><i class="far fa-calendar-alt fa-2x"></i></button>' +
            '<button class="social-button" id="pass' + i + '"' + '><i class="fas fa-lock fa-2x"></i></button>' +
            '</div>' +
            '</div></li>');
            i++;

        }
        var item = document.querySelectorAll('#infinte-list li button');
    for (var k = 50+t; k < item.length; k++) {
        item[k].addEventListener('click',  (event)=> {
            var idd = event.target.id;
            var hint = "" + this.id;
            var index = parseInt(hint.slice(-1));
            var newStr = hint.substring(0, hint.length - 2);
            console.log(hint);
            console.log(newStr);
            switch (newStr) {
                case "name": var editcard = this.parentNode.parentNode;
                    var x = editcard.querySelector('.person-info');
                    var fname, lname, fulname, tittle;

                    fname = itemss[index].name.first;
                    lname = itemss[index].name.last;
                    fulname = fname + " " + lname;
                    tittle = "My Name";

                    var gg = x.querySelector('#key');
                    var textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = fulname;
        
                    break;
                case "letter":
                    var editcard = this.parentNode.parentNode;
                    var x = editcard.querySelector('.person-info');
                    var email, tittle;
                    email = itemss[index].email;
                    tittle = "My Email";

                    var gg = x.querySelector('#key');
                    var textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = email;
           
                    break;

                case "location":
                    var editcard = this.parentNode.parentNode;
                    var x = editcard.querySelector('.person-info');
                    var city, tittle;
                    city = itemss[index].location.city;
                    tittle = "City Location";

                    var gg = x.querySelector('#key');
                    var textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = city;
                   
                    break;
                case "date":
                    var editcard = this.parentNode.parentNode;
                    var x = editcard.querySelector('.person-info');
                    var datee, tittle;
                    datee = itemss[index].dob.date;
                    tittle = "Date";

                    var gg = x.querySelector('#key');
                    var textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = datee;
                  
                    break;

                case "pass":
                    var editcard = this.parentNode.parentNode;
                    var x = editcard.querySelector('.person-info');
                    var pass, tittle;
                    pass = itemss[index].login.password;
                    tittle = "Password";

                    var gg = x.querySelector('#key');
                    var textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = pass;
                 
                    break;



            }


        });

    }
        i+=5;
        t+=25;


    });
}
 
function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
}
function compareDate(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (a < b) ? 1 : (a > b) ? -1 : 0;
}

