let isscroll = true;
let alldata = [];
let flag = false;
let j = 0; //counter  to generate different id for buutons

//preloader
$(window).on('load', () => {
    $('#status').fadeOut();
    $('#preloader').fadeOut(300);
});


$(document).ready(() => {
    let cards = document.querySelector('#infinte-list');
    $("#iframeloading").show();
    $("#iframeloading").fadeOut(500);
    addCards(10, flag); //add 10 cards initially 
    $(window).scroll(() => { //scrol event  on 75% of window
        let scrollTop = $(document).scrollTop();
        let windowHeight = $(window).height();
        let bodyHeight = $(document).height() - windowHeight;
        let scrollPercentage = (scrollTop / bodyHeight);
        if (scrollPercentage >= 0.75 && isscroll) {
            isscroll = false;
            addCards(5, flag); //add 5 cards on every scroll detection
            setTimeout(() => { //add delay for debounce scroll 
                isscroll = true;

            }, 350);

        }

    });

    //sort cards by first name ascending order 
    $('#sort-asc').on('click', () => {
        let list = document.getElementById('infinte-list');

        //remove all cards
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        alldata.sort((a, b) => {
            return compareStringsASC(a.name.first, b.name.first); // using sort+ compare function to sort
        });

        flag = true;
        isscroll = false;
        addCards(alldata.length, flag);

    });

    //sort cards by first name descending order 

    $('#sort-desc').on('click', () => {
        let list = document.getElementById('infinte-list');
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        alldata.sort((a, b) => {
            return compareStringsDESC(a.name.first, b.name.first);
        });

        flag = true;
        isscroll = false;
        addCards(alldata.length, flag);
    });


});

var addCards = (numm, flag) => {
    $.getJSON("https://randomuser.me/api/?results=" + numm + "&nat=us", (data) => { //get data from server using ajax
        let firstName, lastName, fullname, pic, allbuttons, tittle, index, buttonCategory, buttonId, tittleValue, editcard;

        let personInfoContainer;
        let personInfoTitleInput;

        if (!flag) {
            for (let personInfo of data.results) { //using es6 for of loop 
                alldata.push(personInfo);
                firstName = personInfo.name.first;
                lastName = personInfo.name.last;
                fullname = firstName + " " + lastName;
                pic = personInfo.picture.large;

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
                    '<button class="social-button" id="letter' + j + '"' + '><i class="fas fa-envelope fa-2x"></i></button>' +
                    '<button class="social-button" id="location' + j + '"' + '><i class="fas fa-map-marker-alt fa-2x"></i></button>' +
                    '<button class="social-button" id="date' + j + '"' + '><i class="far fa-calendar-alt fa-2x"></i></button>' +
                    '<button class="social-button" id="pass' + j + '"' + '><i class="fas fa-lock fa-2x"></i></button>' +
                    '</div>' +
                    '</div></li>');
                j++;

            }
        } else {

            for (let personInffo of alldata) {
                firstName = personInffo.name.first;
                lastName = personInffo.name.last;
                fullname = firstName + " " + lastName;
                pic = personInffo.picture.large;

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
                    '<button class="social-button" id="letter' + j + '"' + '><i class="fas fa-envelope fa-2x"></i></button>' +
                    '<button class="social-button" id="location' + j + '"' + '><i class="fas fa-map-marker-alt fa-2x"></i></button>' +
                    '<button class="social-button" id="date' + j + '"' + '><i class="far fa-calendar-alt fa-2x"></i></button>' +
                    '<button class="social-button" id="pass' + j + '"' + '><i class="fas fa-lock fa-2x"></i></button>' +
                    '</div>' +
                    '</div></li>');
                j++;

            }

        }




        allbuttons = document.querySelectorAll('#infinte-list li button');

        for (let cardButton of allbuttons) {
            cardButton.addEventListener('click', function (event) { //add event listner for all buutons

                // idd = event.target.id;
                buttonId = "" + this.id;
                let thenum = buttonId.replace(/^\D+/g, ''); //get number from string 
                console.log(thenum);
                index = parseInt(thenum);
                buttonCategory = buttonId.replace(/[0-9]/g, ''); //remove umber from sting
                editcard = this.parentNode.parentNode;
                personInfoContainer=editcard.querySelector('.person-info');
                switch (buttonCategory) {
                    case "name":
                    
                        firstName = alldata[index].name.first;
                        lastName = alldata[index].name.last;
                        fullname = firstName + " " + lastName;
                        tittle = "My Name";
                        personInfoTitleInput = personInfoContainer.querySelector('#key');
                        tittleValue = personInfoContainer.querySelector('#value');
                        personInfoTitleInput.innerHTML = tittle;
                        tittleValue.innerHTML = fullname;
                        break;
                    case "letter":
                        let email;
                        email = alldata[index].email;
                        tittle = "My Email";
                        personInfoTitleInput = personInfoContainer.querySelector('#key');
                        tittleValue = personInfoContainer.querySelector('#value');
                        personInfoTitleInput.innerHTML = tittle;
                        tittleValue.innerHTML = email;
                        break;
                    case "location":
                        let city;
                        city = alldata[index].location.city;
                        tittle = "City Location";
                        personInfoTitleInput = personInfoContainer.querySelector('#key');
                        tittleValue = personInfoContainer.querySelector('#value');
                        personInfoTitleInput.innerHTML = tittle;
                        tittleValue.innerHTML = city;
                        break;
                    case "date":
                        let datee;
                        datee = alldata[index].dob.date;
                        tittle = "Date";
                        personInfoTitleInput = personInfoContainer.querySelector('#key');
                        tittleValue = personInfoContainer.querySelector('#value');
                        personInfoTitleInput.innerHTML = tittle;
                        tittleValue.innerHTML = datee;
                        break;
                    case "pass":
                        let pass;
                        pass = alldata[index].login.password;
                        tittle = "Password";
                        personInfoTitleInput = personInfoContainer.querySelector('#key');
                        tittleValue = personInfoContainer.querySelector('#value');
                        personInfoTitleInput.innerHTML = tittle;
                        tittleValue.innerHTML = pass;
                        break;

                }
            });
        }
    });
};

var compareStringsASC = (a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
};
var compareStringsDESC = (a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (a < b) ? 1 : (a > b) ? -1 : 0;
};
