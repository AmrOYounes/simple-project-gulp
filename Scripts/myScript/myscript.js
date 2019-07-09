let isscroll=true;
let itemss = [];
let alldata=[];
let t = 0, i = 0, j = 0;
$(window).on('load', function () {
    //preloader 
    $('#status').fadeOut();
    $('#preloader').fadeOut(300);
});

$( document ).ready(function() {

    let cards = document.querySelector('#infinte-list');
    $("#iframeloading").show();
        $("#iframeloading").fadeOut(500);
        addfirst();
        
        $(window).scroll( function () {
            let scrollTop = $(document).scrollTop();
            let windowHeight = $(window).height();
            let bodyHeight = $(document).height() - windowHeight;
            let scrollPercentage = (scrollTop / bodyHeight);
            if (scrollPercentage>=0.75&&isscroll) 
            {
                isscroll=false;
                // when detect scroll add 5 card 

               getDta();
                setTimeout(function() {
                    isscroll=true;
                    
                }, 350);

         
            }
             
        });
        $('#sort-cards').on('click', function () {
            let list = document.getElementById('infinte-list');

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
        
        $('#sort-date').on('click', function () {
            let list = document.getElementById('infinte-list');
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
        let firstName = alldata[i].name.first;
        let lastName = alldata[i].name.last;
        let fullname = firstName + " " + lastName;
        let pic = alldata[i].picture.large;
      
        
        
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
    
    let item = document.querySelectorAll('#infinte-list li button');
    for (let k = 0; k < item.length; k++) {
        item[k].addEventListener('click', function (event) {
            let idd = event.target.id;
            let hint = "" + this.id;
            let index = parseInt(hint.slice(-1));
            let newStr = hint.substring(0, hint.length - 1);
            switch (newStr) {
                case "name": let editcard = this.parentNode.parentNode;
                    let x = editcard.querySelector('.person-info');
                    let fname, lname, fulname, tittle;

                    fname = itemss[index].name.first;
                    lname = itemss[index].name.last;
                    fulname = fname + " " + lname;
                    tittle = "My Name";

                    let gg = x.querySelector('#key');
                    let textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = fulname;
        
                    break;
                case "letter":
                     editcard = this.parentNode.parentNode;
                     x = editcard.querySelector('.person-info');
                    let email;
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
                    let city;
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
                    let datee;
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
                    let pass;
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
    $.getJSON("https://randomuser.me/api/?results=10&nat=us",function(data){
        itemss=data.results;
        for( i;i<itemss.length;i++){
            let firstName = itemss[i].name.first;
            let lastName = itemss[i].name.last;
            let fullname = firstName + " " + lastName;
            let pic = itemss[i].picture.large;
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
        let item = document.querySelectorAll('#infinte-list li button');
        for (let k = 0; k < item.length; k++) {
            item[k].addEventListener('click', function (event) {
                let idd = event.target.id;
                let hint = "" + this.id;
                let index = parseInt(hint.slice(-1));
                let newStr = hint.substring(0, hint.length - 1);
                switch (newStr) {
                    case "name": let editcard = this.parentNode.parentNode;
                        let x = editcard.querySelector('.person-info');
                        let fname, lname, fulname, tittle;
    
                        fname = itemss[index].name.first;
                        lname = itemss[index].name.last;
                        fulname = fname + " " + lname;
                        tittle = "My Name";
    
                        let gg = x.querySelector('#key');
                        let textval = x.querySelector('#value');
                        gg.innerHTML = tittle;
                        textval.innerHTML = fulname;
            
                        break;
                    case "letter":
                         editcard = this.parentNode.parentNode;
                         x = editcard.querySelector('.person-info');
                        let email;
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
                        let city;
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
                        let datee;
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
    
    $.getJSON("https://randomuser.me/api/?results=5&nat=us",function(data){
       let arr=data.results;
       console.log(arr);
        
        for( let m=0;m<5;m++){
            let firstName = arr[m].name.first;
            let lastName = arr[m].name.last;
            let fullname = firstName + " " + lastName;
            let pic = arr[m].picture.large;
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
        let item = document.querySelectorAll('#infinte-list li button');
    for (let k = 50+t; k < item.length; k++) {
        item[k].addEventListener('click', function (event) {
            let idd = event.target.id;
            let hint = "" + this.id;
            let index = parseInt(hint.slice(-1));
            let newStr = hint.substring(0, hint.length - 2);
            switch (newStr) {
                case "name": let editcard = this.parentNode.parentNode;
                    let x = editcard.querySelector('.person-info');
                    let fname, lname, fulname, tittle;

                    fname = itemss[index].name.first;
                    lname = itemss[index].name.last;
                    fulname = fname + " " + lname;
                    tittle = "My Name";

                    let gg = x.querySelector('#key');
                    let textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = fulname;
        
                    break;
                case "letter":
                    let editcard = this.parentNode.parentNode;
                    let x = editcard.querySelector('.person-info');
                    let email, tittle;
                    email = itemss[index].email;
                    tittle = "My Email";

                    let gg = x.querySelector('#key');
                    let textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = email;
           
                    break;

                case "location":
                    let editcard = this.parentNode.parentNode;
                    let x = editcard.querySelector('.person-info');
                    let city, tittle;
                    city = itemss[index].location.city;
                    tittle = "City Location";

                    let gg = x.querySelector('#key');
                    let textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = city;
                   
                    break;
                case "date":
                    let editcard = this.parentNode.parentNode;
                    let x = editcard.querySelector('.person-info');
                    let datee, tittle;
                    datee = itemss[index].dob.date;
                    tittle = "Date";

                    let gg = x.querySelector('#key');
                    let textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = datee;
                  
                    break;

                case "pass":
                    let editcard = this.parentNode.parentNode;
                    let x = editcard.querySelector('.person-info');
                    let pass, tittle;
                    pass = itemss[index].login.password;
                    tittle = "Password";

                    let gg = x.querySelector('#key');
                    let textval = x.querySelector('#value');
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

