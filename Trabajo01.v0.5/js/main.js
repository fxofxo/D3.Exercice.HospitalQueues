

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//  VISUALIZACION
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

R = 5
c_defcon0 = "green"
c_defcon1 = "orange"
c_defcon2 = "red"
l_defcon0 = 50
l_defcon1 = 100


// global counters
nAttended = 0;
nIncoming = 0;


// this function will be called for each attended patient.
// it will do the visualization staff moving circles from
// unattended queue to attended queude.

function moveAttended(svg, patient, current_color)
{
 g = svg.select(".attended")
 g.call(tip2)	
  g.append('circle')
   .attr("r",R)            // create new circle in the starting poing
   
   .attr("id", patient.ID)
   .attr("name", patient.name +  " " + patient.surname) 
   .attr("cx", (d,i) => { return 20 + 10 * ( ( patient.ID-1) % hPatients ) })
   .attr("cy", (d,i) => { return 10 +  y_scale( ( (patient.ID-1) / hPatients )>> 0 + (nAttended / hPatients) >> 0) }) 
   .style("fill",  current_color )
   .on('mouseover', tip2.show)
   .on('mouseout', tip2.hide) 
   .transition()
   .duration(1500)
   .delay(200)
   .ease(d3.easeBack)
   .attr("cy", (d,i) => { return h - 200 + randomNumber(1,4) * 20 } )
   .attr("cx", 120)
   .transition()
   .style("fill",  "grey" )
   .ease(d3.easeExp)
   .duration(1000)
   .attr("cx",  160 + 10 * ( ( patient.ID-1) % hPatients ))
   .attr("cy",  10 +  y_scale( ((patient.ID-1) / hPatients )>> 0 ) ) 
   

   nAttended += 1;
 
 }


// updateVisualization se llama cada vez que un nuevo paciente entra o que un paciente es atendido
function updateVisualization(patients) {

	//console.log(patients)  




  var c_patients=g_onqueue.selectAll(".patient")
	.data(patients,function(d){return d.ID});   // Be carefull !! need function definition!!

//UPDATE

  moveDownStr= "translate(" + ( margin.left + 10 ) + "," + ( h - margin.bottom - y_scale( (nAttended / hPatients)  >> 0 ))  + ")"
  g_onqueue.attr("transform", moveDownStr);

  blink = false;
  if ( ( nIncoming - nAttended) < l_defcon0)
	color = c_defcon0;
  else if ( (nIncoming - nAttended) < l_defcon1)
	color = c_defcon1
// else if ( (nIncoming - nAttended) < l_defcon2)
   else  color = c_defcon2;
 

// Change circles bar color
  c_patients.style("fill",color)
   .on('mouseover', tip.show)
   .on('mouseout', tip.hide)


//ENTER

// do the visualization staff moving circles from
// the outside (hospital) to unattended queue 

  new_patients = c_patients.enter()
  nProcessed = 0
  new_patients.append('circle')
   	.attr("class","patient")
	.style("fill", "grey")
	.attr("r", R )
	.attr("id",  function(d,i) {nIncoming +=1; return d.ID})
	.attr("cx", hSize + 10)  // start outsite canvas
	.attr("cy", h - 200 ) 
	.transition()
	.attr("cx", 120)
	.attr("cy", (d,i) => {  return 30 + 10 * ( d.ID %3) - (h - y_scale( (nAttended / hPatients)  >> 0 )) }) // compensate group displacement.
	.duration(1000)
	.delay(500)
	.transition()
	.duration(1500)
	.attr("cx", function(d,i){ return 10 + 10 * ( (d.ID-1) % hPatients ) })
	.attr("cy", function(d,i){ return 10 + y_scale( ((d.ID-1) / hPatients )>> 0 ) })

    //    .merge(c_patients)   // Is not necesary??

// EXIT 
  c_patients.exit()
    .style("fill", (d,i) => {  moveAttended(svg,d,color); return "steelblue"})
    .remove()
// update Counters..and colors
  svg.select(".qCounter").text((nIncoming - nAttended).toString().padStart(3, "0")).style("fill",color)
  svg.select(".aCounter").text(nAttended.toString().padStart(3, "0"))
 




}
