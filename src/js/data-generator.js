
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//   GENERACION DE DATOS
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

var patients = [];
var names = ["Julian", "Laura", "Perkins", "Crustaceo", "Rambo", "Elsa", "Ana", "Albert", "Jack", "Phil","Justin","Dirck","Patrict","Jannick","Jeron","Carol","Olivia","Aron"];
var surnames = ["Pow","Havilan","Pataki","Flouver","Coustou","Collins","Viver","Tower","Marsalis","Shephard"];

var counter = 0;
var maxPatients = 100;


newPatient();
setTimeout(attendPatient, 10000);


function newPatient() {
	for(var i = 0; i < randomNumber(1,3); i++) {

		var patient = new Object();			
		patient.ID = ++counter;
		
		
		// TODO: cambiar el generador de nombres para que nunca se repitan?
		// Esto es absolutamente opcional y no tiene nada que ver con la visualización
		// Hay apis públicas que devuelven nombres inventados (y otros campos como mail, etc)
		// que se podrían usar en lugar de una lista estática de pocos elementos
		// Por ejemplo esta URL cada vez que se llama devuelve un json distinto
		// con información de un:
		//  https://randomuser.me/

		// FS.Added: Increased name list, and add surname list.
		patient.name = names[Math.floor(Math.random()*names.length)];
		patient.status  = "waiting";
		patient.surname = surnames[Math.floor(Math.random()*surnames.length)];
		patients.push(patient);
		
	}


	
	updateVisualization(patients);
  	setTimeout(newPatient, randomNumber(500,2000));
}

function attendPatient() {
       
	if( patients.length >= maxPatients )
	{	console.log("**** maxPatients return")
		return;
	}
	// Now we don't use status to split attended patients, once 
	// attended it is deleted from the list. 
	// We will detect the state change in visualization function  
	// taking the advantages of (enter,update, exit) parading.

	var deleted = patients.shift()
	

	updateVisualization(patients);
	setTimeout(attendPatient, randomNumber(500,3000));
}



function randomNumber(start,end) {
	return Math.floor(Math.random() * end) + start;
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//   VISUALIZACION
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
