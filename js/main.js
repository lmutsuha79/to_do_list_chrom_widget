let scroll = document.querySelector('.scroll');
let footer = document.querySelector('#widget footer');
let header = document.querySelector('#widget header');
let multy_note = 1; // by default se to 1 so you can add multy notes
let body = document.querySelector('body');

let time_x = 0;
// add delay to all notes 
// var note_items = document.querySelectorAll('.note_item');

function add_delay_all_notes() {
    var note_items = document.querySelectorAll('.note_item');

    note_items.forEach(item => {
        item.style.transitionDelay = `${0.3 * time_x}s`;
        time_x += 1;

    });
}
add_delay_all_notes();




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
    add_delay_all_notes();

    let x_time = 1;
    var note_items = document.querySelectorAll('.note_item');
    note_items.forEach(item => {
        // item.style.transition = `${1 * x_time}s`;
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
    // see_if_no_items();
    no_items_to_list();

}



// clear all notes end

// ###################################







// show more function
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

// ###################################





class Note {
    constructor(title, discription) {
        this.title = title;
        this.discription = discription;

    }
}



let add_note_ok = document.getElementById('add_the_note');
// list of objects
var notes_list = [];
var note_add_status = document.querySelector('.note_add_status');

function note_status_style(staus, color, message) {


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
// click on add the note ok
add_note_ok.onclick = add_note_ok_func;
function add_note_ok_func() {
    let new_note_title = document.getElementById('new_note_title').value;
    let new_note_desc = document.getElementById('new_note_desc').value;
    if (new_note_title == '') {
        note_status_style(1, 'red', 'you must add the title at least');
    } else {
        note_status_style(0, 'greenyellow', 'the note is now in the list');



        // add note to list of object no vue
        notes_list.push(new Note(new_note_title, `${new_note_desc != '' ? new_note_desc : 'no description'}`));

        add_notes_to_list(); // add notes to the vue
        show_more_func(); // to show more (description)
        note_done(); // add line throw the note when click ok check box
        // trash_func();
        // see_if_no_items();
        remove();
        no_items_to_list(); //se if there are no items in the list
        // make title field empty when creation of new note done!
        document.getElementById('new_note_title').value = '';

        // make description field empty when creation of new note done!
        document.getElementById('new_note_desc').value = '';

    }

    // hear
    if (multy_note == 0) {
        setTimeout(() => {
            new_note_form_style(0);
            balck_over_lay(0);
        }, 1000);
    }






}
var widget_content = document.querySelector('.widget_content');
// add notes to vue
function add_notes_to_list() {
    widget_content.innerHTML = ''
    let id_num = 1; // to seperate ids of check boxs

    notes_list.forEach(note => {


        var the_new_note_item = `


        <div class="show_part">
            <form note_done_but action="#">
                <p>
                    <input class="inp_check" type="checkbox" id="${id_num}" />
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

        var new_div = document.createElement("div");
        new_div.className = 'note_item';
        new_div.innerHTML = the_new_note_item;


        widget_content.appendChild(new_div);
        id_num++;


    });

}




// ########################################
function balck_over_lay(open_it) {
    if (open_it == 1) {
        over_lay_black.style.visibility = 'visible'
        over_lay_black.style.opacity = 1;

    } else {
        over_lay_black.style.visibility = 'hidden'
        over_lay_black.style.opacity = 0;
    }

}
let new_note_form = document.getElementById('new_note_form');
let add_note_but = document.getElementById('plus');
let over_lay_black = document.querySelector('.over_lay_black');
// desplay the new_nte_form when clicking the plus but in the ui
function new_note_form_style(status) {
    // status mean 1 == show 0 == hidde
    if (status === 1) {
        new_note_form.style.visibility = 'visible';
        new_note_form.style.opacity = 1;
    } else {
        new_note_form.style.visibility = 'hidden';
        new_note_form.style.opacity = 0;
    }
}
plus.onclick = () => {

    // style of new_note form
    new_note_form_style(1)
    // style of over lay
    balck_over_lay(1);

}

//  exit from the new note form
let exit = document.getElementById('exit');
exit.onclick = () => {
    // style of new_note form
    new_note_form_style(0);
    // style of over lay
    balck_over_lay(0);


    no_items_to_list(); //se if there are no items in the list
}








// ########################################

// add a line throw the title note when click on the check box ;
function note_done() {
    let note_titles = document.querySelectorAll('.note_title');
    let inp_check = document.querySelectorAll('.inp_check');

    inp_check.forEach((check_box, index) => {

        check_box.onchange = function (ch) {
            if (check_box.checked == true) {
                note_titles[index].style.textDecoration = 'line-through';
                note_titles[index].style.color = '#cccccc';

            }
            else {
                note_titles[index].style.textDecoration = 'none';
                note_titles[index].style.color = 'white';


            }

        }

    });
}

note_done();



// ########################################

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
no_items_to_list();
function remove() {
    var note_items = document.querySelectorAll('.note_item');
    var remove_note_but = document.querySelectorAll('.remove_note_but');
    remove_note_but.forEach((but, index) => {
        but.onclick = function () {
            notes_list.splice(index, 1);



            note_items[index].style.maxHeight = `0px`;

            note_items[index].style.transform = ` rotate(15deg) translate(20px,100vh)`;
            note_items[index].style.opacity = `0`;

            setTimeout(() => {
                widget_content.removeChild(note_items[index]);
                remove();
            }, 300);

            // recall the func to re set index s 
            remove();

        }
    });
    no_items_to_list()// se if there are no item in the list
}
remove();

// ######################################
// options start
let option_form = document.querySelector('.option_form');

let option_is_open = 0;
let option_but = document.getElementById('widge_option_btn');
function open_option_form() {
    if (option_is_open === 0) {
        balck_over_lay(1);
        option_form.style.right = '0px'
        option_but.style.transform = 'rotate(-90deg)'
        option_is_open = 1;

    } else {
        balck_over_lay(0);
        option_form.style.right = '-60vw'
        option_but.style.transform = 'rotate(90deg)'

        option_is_open = 0;

    }



}
let change_back_inp = document.getElementById('change_back_inp');

function change_backgound() {
    let back_url_inp = document.getElementById('back_url_inp').value;
    // let back_url_inp = document.getElementById('back_url_inp').value
    if (back_url_inp != '') {
        body.style.backgroundImage = `url(${back_url_inp})`;

    }

    // re do it with local storage
}


option_but.onclick = open_option_form;
change_back_inp.onclick = change_backgound;

let multy_notes_ckecker = document.getElementById('multy_notes_ckeck');

function multy_note_push() {
    let checker_status = document.getElementById('checker_status');
    let multy_notes_ckecker = document.getElementById('multy_notes_ckeck');
    if (multy_notes_ckecker.checked == true) {
        checker_status.textContent = `status: active`;
        multy_note = 1;

    } else {
        checker_status.textContent = `status: not active`;
        multy_note = 0;

    }
}
multy_notes_ckecker.onclick = multy_note_push;

function rest_default_option_func() {
    body.style.backgroundImage = `url(../images/back1.jpg)`
    console.log('reset ok');
    multy_notes_ckecker.checked = 'true';
    document.getElementById('back_url_inp').value = '';

}
let reset_defaul_btn = document.getElementById('reset_defaul_btn');

reset_defaul_btn.onclick = rest_default_option_func;
// show more (hidden part)
let hidden_part_all = document.querySelectorAll('.option_content .hidden_part');
let option_more_option = []; // par default
let option_show_more_btns = document.querySelectorAll('.option_show_more');
option_show_more_btns.forEach((btn, index) => {
    option_more_option.push(0);
    btn.onclick = function () {
        if (option_more_option[index] == 0) {
            option_show_more_btns[index].style.transform = 'rotate(180deg)'
            hidden_part_all[index].style.maxHeight = '120px';
            option_more_option[index] = 1;
        } else {
            option_show_more_btns[index].style.transform = 'none'
            hidden_part_all[index].style.maxHeight = '0px';
            option_more_option[index] = 0;
        }
    }
});

// option end
















