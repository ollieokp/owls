'use strict';

function make_data() {

	var now = Date.now()
	var data = {
		"owlets": owlets,
		"owl_food": owl_food,
		"all_time_food": all_time_food,
		"owls": owls,
		"pet_stores": pet_stores,
		"factories": factories,
		"banks": banks,
		"wizards": wizards,
		"portals": portals,
		"time_machines": time_machines,
		"owlet_cost": owlet_cost,
		"owl_cost": owl_cost,
		"pet_store_cost": pet_store_cost,
		"factory_cost": factory_cost,
		"bank_cost": bank_cost,
		"wizard_cost": wizard_cost,
		"portal_cost": portal_cost,
		"time_machine_cost": time_machine_cost,
   		"warping_bonus": warping_bonus,  

		"now": now
	};	
	return data;
}


function save() {
	var d = make_data();
	localStorage.game_data = JSON.stringify(d);
	Swal.fire({
	    position: 'top-end',
	    icon: 'success',
	    title: 'Your game has been saved',
	    showConfirmButton: false,
	    timer:1500
	})
}

		
function load_data(data) {
	if (data) {
		data = JSON.parse(data);

		owlets = data["owlets"];
		owl_food = data["owl_food"];
		all_time_food = data["all_time_food"];
		owls = data["owls"];
		pet_stores = data["pet_stores"];
		owlet_cost = data["owlet_cost"];
		owl_cost = data["owl_cost"];
		pet_store_cost = data["pet_store_cost"];
		factories = data["factories"];
		banks = data ["banks"];
		factory_cost = data["factory_cost"];
		bank_cost = data ["bank_cost"];
		wizards = data ["wizards"];
		wizard_cost = data["wizard_cost"];
		portals = data["portals"];
        if (isNaN(data["portal_cost"])) {
            data["portal_cost"] = 100000000;
        }
		portal_cost = data["portal_cost"];
		time_machines = data["time_machines"];
		time_machine_cost = data["time_machine_cost"];
    		warping_bonus = data["warping_bonus"];

		var now = data["now"];
		catch_up_time = (Date.now()-now)/1000;

		console.log(all_time_food);

		Swal.fire({
		    position: 'top-end',
            icon: 'success',
		    title: 'Your game has been loaded',
	 	    //text: "You Gained " + (format_number(catch_up_time * food_prod)) + " owl food while you were gone"),
		    showConfirmButton: false,
		    timer: 1500,
		})
	}
}
function load() {	
	var data = localStorage.game_data;
	load_data(data);
}

function _export() {
	var d = make_data();
	console.log(d);
	var d_json = JSON.stringify(d);
	console.log(d_json);
	btoa(d_json);
	swal(btoa(d_json));
	//btoa(JSON.stringify(d));
	console.log()
}

async function _import() {
    const { value: code } = await Swal.fire({
//    code = Swal.fire({
        title: 'Submit your exported save code',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Import',
    });
    console.log(code)
    var data = (atob(code))
    load_data(data)
    // call atob, passing it code. save this in a new variable
    // call load_data, passing it the new variable
}

function clearStorage() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reset!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Reset!',
                    'You have successfully reset your progress.',
                    'success'
                )
                owl_food = 100;
                all_time_food = 0;

                owlet_cost = 100;
                owlets = 0;

                owl_cost = 1000;
                owls = 0;

                pet_store_cost = 10000;
                pet_stores = 0;

                factories = 0;
                factory_cost = 100000;

                banks = 0;
                bank_cost = 1000000;

                wizards = 0;
                wizard_cost = 10000000;

                portals = 0;
                portal_cost = 100000000;

                time_machines = 0;
                time_machine_cost = 1000000000;

                warping_bonus = 0;

                save();

            }
        })
}


var  saveInterval = setInterval(function() { save() }, 50000);
