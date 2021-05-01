var body = document.querySelector('body');
// var multy_note;



// local storage start
// creat an empty list if no data on the browser saved or call it if it existe


var options = {
    background: `url(../images/back1.jpg)`,
    push_multy_note: 1,
    reset_defaul_options() {
        this.background = `url(../images/back1.jpg)`;
        this.push_multy_note = 1;
    },
}
console.log(options)

if (localStorage.length === 0) {
    // no local storage so:
    var notes_list = [];
    // creat local storage when add a note with local_storage_update()

}

else {
    // there is a local Storage data:
    var notes_list = JSON.parse(localStorage.getItem('notes_list_local'));
    var local_storage_options = JSON.parse(localStorage.getItem('options_list_local'));

    options.background = local_storage_options.background;
    options.push_multy_note = local_storage_options.push_multy_note;

}
first_style();



// update the local storage note_list avery time add or remove a item to list 
function local_storage_options_update() {
    // because local storage acsepte sof strings;
    localStorage.setItem('options_list_local', JSON.stringify(options));
}
local_storage_options_update();
function local_storage_update() {
    // because local storage acsepte sof strings;
    localStorage.setItem('notes_list_local', JSON.stringify(notes_list));

}
// local storage end
// #################################################################################
// adding the notes form local storage to the UI when page load
// with colling a function bellow:
var widget_content = document.querySelector('.widget_content');
add_notes_to_list()
// #################################################################################

let scroll = document.querySelector('.scroll');
let footer = document.querySelector('#widget footer');
let header = document.querySelector('#widget header');







let time_x = 0;
// add a delay to all notes when page load (to make animation when removing items)
function add_delay_all_notes() {
    var note_items = document.querySelectorAll('.note_item');

    note_items.forEach(item => {
        item.style.transitionDelay = `${0.3 * time_x}s`;
        time_x += 1;

    });
    time_x = 0;
}
// add_delay_all_notes();
// #################################################################################




// scroll effect start
// Setup isScrolling variable
let isScrolling;

// Listen for scroll events
scroll.addEventListener('scroll', function (event) {

    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);
    footer.style.boxShadow = '0px -8px 14px -13px #cccccc';
    header.style.boxShadow = '0px 8px 14px -13px #cccccc';
    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function () {

        // Run the callback
        footer.style.boxShadow = 'none';
        header.style.boxShadow = 'none';

    }, 200);

}, false);

// scroll effect end
// ###############################################################



// clear all notes start []==0
let clear_all = document.getElementById('clear_all');
clear_all.onclick = function () {
    // re call delay function to add dellay to current items in UI
    // not when the page load 
    // because we can remove items or add other notes 
    // so we have to add delay to it befor we decide to clear it 
    // sory for the bad english;
    add_delay_all_notes();
    // note items is list contains all notes of ui
    var note_items = document.querySelectorAll('.note_item');
    let x_time = 1;
    // add style to every item in the note_itmes when clear all items

    note_items.forEach(item => {
        item.style.transform = `translateY(${1000 * x_time}%) rotate(55deg)`;
        item.style.opacity = '0.2'
        x_time++;
        setTimeout(() => {
            item.style.display = 'none';
            // remove form html
            widget_content.removeChild(item);
        }, 1500);
    });

    // delet all obj form list of notes
    notes_list = [];

    note_items = [];
    // clear all items form the local storage
    // localStorage.clear();
    local_storage_update();

    // verify if no items in Ui so show message : "no itmes yet"
    // in this function the message will be visible surely
    no_items_to_list();
}

// clear all notes end

// ###################################







// show more function start
// click on the litle arrow in visible part of the note 
// to show the hidden part (description) 
function show_more_func() {
    // show more (show the hidden part of the note 'description');
    let show_more_but = document.querySelectorAll('.show_more')
    let discription_part = document.querySelectorAll('.hidden_part');
    is_open = []; // you can with this open multy discription
    // in the same time without problems
    show_more_but.forEach((but, index) => {

        is_open.push(0);
        but.onclick = () => {

            if (is_open[index] === 0) {
                discription_part[index].style.maxHeight = '300px';
                but.style.transform = 'rotate(180deg)';
                is_open[index] = 1;
            }
            else {
                discription_part[index].style.maxHeight = '0px';
                but.style.transform = 'rotate(0deg)';
                is_open[index] = 0;
            }



        }
    });
}
show_more_func(); // to call function when loading

// show more function end

// ###################################




// the Note class start
class Note {
    constructor(title, discription, is_done) {
        this.title = title;
        this.discription = discription;
        this.is_done = false; // by default is false

    }
}
// the Note class end
// ###################################





let add_note_ok = document.getElementById('add_the_note');
// list of objects (creat the note list)
// ###################################

var note_add_status = document.querySelector('.note_add_status');
// message when creating new note (red or green)
// to tell user if the note has been added successfully or not
// note ==> if he didn't enter a title to the note at least
function note_status_style(staus, color, message) {
    // satus : 1=> active  0=>disible
    // 1=> show  0=>hid
    note_add_status.textContent = message;
    note_add_status.style.color = color;
    note_add_status.style.visibility = 'visible';
    note_add_status.style.opacity = '1';



    if (status == 0) {
        setTimeout(() => {
            note_add_status.style.visibility = 'hidden';
            note_add_status.style.opacity = '0';
        }, 2000);
    }
}
// ###################################

// click on add the note ok to add note in the back end (not UI)
add_note_ok.onclick = add_note_ok_func;
let new_note_title_inp = document.getElementById('new_note_title');
let new_note_desc_inp = document.getElementById('new_note_desc');

// function to allow user when click Entre add new note
function entre_press_func(event) {

    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        add_note_ok_func();
    }

}

// the event listener listen to enter key press on note title field
new_note_title_inp.addEventListener('keypress', entre_press_func);


// add new note to list (back end)
function add_note_ok_func() {
    let new_note_title = document.getElementById('new_note_title').value;
    let new_note_desc = document.getElementById('new_note_desc').value;
    if (/\S/.test(new_note_title)) {
        // string is not empty and not just whitespace
        note_status_style(0, 'greenyellow', 'the note is now in the list');

        // add note to list[] of object no vue 
        notes_list.push(new Note(new_note_title, `${new_note_desc != '' ? new_note_desc : 'no description'}`));

        // update the Local Storage whith new changes (notes)
        local_storage_update() // updates local storage
        add_notes_to_list(); // add notes to the vue
        show_more_func(); // to show more (description)
        note_done(); // add line throw the note when click ok check box
        remove(); // to add remove event to new notes and allow to remove it with same function
        no_items_to_list(); //se if there are no items in the list

        // make title field empty when creation of new note done!
        document.getElementById('new_note_title').value = '';

        // make description field empty when creation of new note done!
        document.getElementById('new_note_desc').value = '';
    }
    else {
        note_status_style(1, 'red', 'you must add the title at least');
    }

    // make the form close after 1s if multy note seting is on
    // multy_note commes by default with the function:
    // first style()    
    if (options.push_multy_note == 0) {
        setTimeout(() => {
            new_note_form_style(0);
            balck_over_lay(0);
        }, 1000);
    }





}
// add notes to vue UI
function add_notes_to_list() {
    widget_content.innerHTML = ''
    let id_num = 1; // to seperate ids of check boxs
    notes_list.forEach((note, index) => {

        var the_new_note_item = `


        <div class="show_part">
            <form note_done_but action="#">
                <p>
                    <input checked='${note.is_done}' class="inp_check" type="checkbox" id="${id_num}"  />
                    <label for="${id_num}"></label>
                </p>

            </form>
            <span class="remove_note_but icon-trash-o icon"></span>


            <p class="note_title">${note.title}</p>
            <div class="show_more">
                <span class="icon-chevron-down"></span>
            </div> <!-- ./show_more icon -->
        </div> <!-- ./show_part -->
        <div class="hidden_part scroll">
            <p class="description">${note.discription}</p>
        </div><!-- ./hidden_part -->


            `;
        // creating div and the var (add the_new_note_item) to it
        // then add it to html inside widget_content 
        var new_div = document.createElement("div");
        new_div.className = 'note_item';
        new_div.innerHTML = the_new_note_item;
        widget_content.appendChild(new_div);

        //  make the ceck bbox like note list (fix a bug in the creation of the input)
        // note.is done ==> refer to state of obj (current note)
        document.getElementById(id_num).checked = note.is_done;
        id_num++;
        // call function that add ligne throw the note title when click on check_box

        note_done();
        let note_title_ss = document.querySelectorAll('.note_title');
        //  add line throw the title when creating the ui
        if (note.is_done == true) {
            note_title_ss[index].style.textDecoration = 'line-through';
        }
        // new_div.style.transform = 'translateX(0)';
    });

}




// ########################################
// balck_over_lay function start
// add over lay to widget when open new note form
function balck_over_lay(open_it) {
    if (open_it == 1) {
        over_lay_black.style.visibility = 'visible'
        over_lay_black.style.opacity = 1;

    } else {
        over_lay_black.style.visibility = 'hidden'
        over_lay_black.style.opacity = 0;
    }

}
// balck_over_lay function end
// ########################################


let new_note_form = document.getElementById('new_note_form');
let add_note_but = document.getElementById('plus');
let over_lay_black = document.querySelector('.over_lay_black');
// new_note_form_style function start:

// desplay the new_note_form when clicking the plus but in the ui
function new_note_form_style(status) {
    // status mean:      1 == show || 0 == hid
    if (status === 1) {
        new_note_form.style.visibility = 'visible';
        new_note_form.style.opacity = 1;
        new_note_form.style.top = '50%';

    } else {
        new_note_form.style.visibility = 'hidden';
        new_note_form.style.opacity = 0;
        new_note_form.style.top = '100%';

    }



}
// new_note_form_style function end:
// #########################################################


// onclick event listener of plus but 
// call 2 function : new_note_form_style(1) && balck_over_lay(2)
// to disply new note form and add over lay to window:
plus.onclick = () => {

    // style of new_note form
    new_note_form_style(1)
    // style of over lay
    balck_over_lay(1);

}


// #########################################################
//  exit from the new note form start
let exit = document.getElementById('exit');
exit.onclick = close_new_form;
// close form start :
// and hid balc over lay 
function close_new_form() {
    // style of new_note form
    new_note_form_style(0);
    // style of over lay
    balck_over_lay(0);


    no_items_to_list(); //se if there are no items in the list
}

//  exit from the new note form end






// ########################################
// add_line_throw note title function start
function add_line_throw(yes_or_no, title) {
    if (yes_or_no == 1) {
        title.style.textDecoration = 'line-through';
        title.style.color = '#cccccc';
    } else {
        title.style.textDecoration = 'none';
        title.style.color = 'white';
    }

}
// add_line_throw note title function end
// ########################################


// add a line throw the title note when click on the check box and update note list
// and local Storage  ;
//note_done function start
function note_done() {
    let note_titles = document.querySelectorAll('.note_title');
    let inp_check = document.querySelectorAll('.inp_check');
    inp_check.forEach((check_box, index) => {

        check_box.onchange = function (ch) {
            if (check_box.checked == true) {
                notes_list[index].is_done = true;
                local_storage_update()
                add_line_throw(1, note_titles[index])

            }
            else {
                notes_list[index].is_done = false;
                local_storage_update()
                add_line_throw(0, note_titles[index])


            }

        }

    });
}
//note_done function end

//call note done function when page loading
note_done();



// ########################################
// no_items_to_list function start
var no_note_mess = document.getElementById('no_notes_mess');
function no_items_to_list() {
    if (notes_list.length === 0) {
        no_note_mess.style.opacity = '1';
        no_note_mess.style.visibility = 'visible';

    } else {
        no_note_mess.style.opacity = '0';
        no_note_mess.style.visibility = 'hidden';
    }


}
// no_items_to_list function end

// call the function when load if ther is no item to list 
// when page load done!
no_items_to_list();


// ########################################
// remove function start
// remove an note item forom the list and ui and local storage
function remove() {
    local_storage_update()
    var note_items = document.querySelectorAll('.note_item');
    var remove_note_but = document.querySelectorAll('.remove_note_but');
    remove_note_but.forEach((but, index) => {
        but.onclick = function () {
            notes_list.splice(index, 1);

            note_items[index].style.maxHeight = `0px`;
            note_items[index].style.padding = `0px`;


            note_items[index].style.transform = ` rotate(15deg) translate(20px,100vh)`;
            note_items[index].style.opacity = `0`;

            setTimeout(() => {
                widget_content.removeChild(note_items[index]);
                remove();
            }, 1000);

            // recall the func to re set index s 
            remove();

        }
    });
    no_items_to_list()// se if there are no item in the list
}
// remove function end
// call the function because the function add event listenr to remove but
//so you need to call it
remove();



// ######################################
// options start:
// ##########################################
// options when load page:
// this is the options style that applied when the page load
function first_style() {
    body.style.backgroundImage = `url(${options.background})`;
    document.getElementById('multy_notes_ckeck').checked = options.push_multy_note;


}

// ##########################################


let option_form = document.querySelector('.option_form');

let option_is_open = 0;
let option_but = document.getElementById('widge_option_btn');
// open open_option_form()  function 
// to show the hidden option window
function open_option_form() {
    if (option_is_open === 0) {
        balck_over_lay(1);
        option_form.style.right = '0px';
        option_but.style.transform = 'rotate(-90deg)';
        option_is_open = 1;

    } else {
        balck_over_lay(0);
        option_form.style.right = '-60vw';
        option_but.style.transform = 'rotate(90deg)';

        option_is_open = 0;

    }



}
// listen for a click on the option_but button then call the function 
option_but.onclick = open_option_form;
// ###########################################################

// show more (hidden part)
let hidden_part_all = document.querySelectorAll('.option_content .hidden_part');
let option_more_option = []; // par default
let option_show_more_btns = document.querySelectorAll('.option_show_more');
option_show_more_btns.forEach((btn, index) => {
    option_more_option.push(0);
    btn.onclick = function () {
        if (option_more_option[index] == 0) {
            option_show_more_btns[index].style.transform = 'rotate(180deg)'
            hidden_part_all[index].style.maxHeight = '200px';
            option_more_option[index] = 1;
        } else {
            option_show_more_btns[index].style.transform = 'none'
            hidden_part_all[index].style.maxHeight = '0px';
            option_more_option[index] = 0;
        }
    }
});


// ###########################################################
// change body background img:
var change_back_inp = document.getElementById('change_back_inp');
function change_backgound() {
    let back_url_inp = document.getElementById('back_url_inp').value;
    if (back_url_inp != '') {
        body.style.backgroundImage = `url(${back_url_inp})`;
        options.background = back_url_inp;
        local_storage_options_update();
    }


}
change_back_inp.onclick = change_backgound;

// ###########################################################

// add multy note or note:
// mean if (add 1 note in time and close new note form )
// else (you can add multy note until user click close but)
// to close the new note form

let multy_notes_ckecker = document.getElementById('multy_notes_ckeck');

function multy_note_push() {
    let checker_status = document.getElementById('checker_status');
    let multy_notes_ckecker = document.getElementById('multy_notes_ckeck');
    if (multy_notes_ckecker.checked == true) {
        checker_status.textContent = `status: active`;
        options.push_multy_note = 1;

    } else {
        checker_status.textContent = `status: not active`;
        options.push_multy_note = 0;

    }
    local_storage_options_update();

}
multy_notes_ckecker.onclick = multy_note_push;
// ###########################################################


// reset the default settings
// mean reset all option to first state 
function rest_default_option_func() {
    body.style.backgroundImage = `url(../images/back1.jpg)`;
    multy_notes_ckecker.checked = 'true';
    document.getElementById('back_url_inp').value = '';
    options.reset_defaul_options();
    local_storage_options_update();


}
let reset_defaul_btn = document.getElementById('reset_defaul_btn');

reset_defaul_btn.onclick = rest_default_option_func;


// ###########################################################




// option end












