$(document).on('ready', function() { 
	localStorageAbrir();
	$("#btnCrear").on('click',newRowTable);

	$("loans_tablaMovimientoCliente").on('click','#btnEliminar',eliminarFila);

	$("body").on('click','#btnEliminar',eliminarFila);
});

let aMovimientos = [];
let cont = 0;
function newRowTable () {
	let nombreM = document.getElementById("nombreMovimiento").value;
	let tipoM = document.getElementById("tipoMovimiento").value;
	let valorM = document.getElementById("valorMovimiento").value;
	//Obtener fecha actual
	let fecha = new Date();
	let mes = fecha.getMonth() + 1;
	//convertir a String
	let fechaR = fecha.getDate()+"/"+mes+"/"+fecha.getFullYear();
	
	//Objeto que se va a almacenar en el localStorage
	let guardarMovimiento = {
		nombreGM: nombreM,
		tipoGM: tipoM,
		valorGM: valorM,
		fechaGM: fechaR
	}
	mostrarElemtos(guardarMovimiento);
	aMovimientos.push(guardarMovimiento);
	localStorage.setItem("movimiento",JSON.stringify(aMovimientos));
}

function eliminarFila () {
	let _this = this;
	let aFila = getRowSelected(_this);
	$(this).parent().parent().fadeOut("slow",function(){
		$(this).remove();
	});

	if (localStorage.getItem("movimiento")) {
		aMovimientos = JSON.parse(localStorage.getItem("movimiento"));
		let cont = aMovimientos.length;
		for (let i=0;i<cont;i++){
			let aux = aMovimientos[i];
			if (aux.nombreGM === aFila.nom) {
				if (aux.tipoGM === aFila.tip) {
					if (aux.fechaGM === aFila.fech) {
						aMovimientos.splice(i,1);
						localStorage.setItem("movimiento",JSON.stringify(aMovimientos));
					}
				}
			}
		}
	}
	console.log(aFila);
}

function getRowSelected (objetoPres) {
	//Obtener la linea que se esta eliminando
	let a = objetoPres.parentNode.parentNode;
	 let nombre = a.getElementsByTagName("td")[0].getElementsByTagName("p")[0].innerHTML;
	 let tipo= a.getElementsByTagName("td")[1].getElementsByTagName("p")[0].innerHTML;
	 let valor= a.getElementsByTagName("td")[2].getElementsByTagName("p")[0].innerHTML;
	 let fecha= a.getElementsByTagName("td")[3].getElementsByTagName("p")[0].innerHTML;

	 let Movimiento = {
	 	nom: nombre,
	 	tip: tipo,
	 	val: valor,
	 	fech: fecha
	 }
	 return Movimiento;
}


function mostrarElemtos (movimiento) {
	let nombreM = movimiento.nombreGM;
	let tipoM = movimiento.tipoGM;
	let valorM = movimiento.valorGM;
	let fechaR = movimiento.fechaGM;

	let movimientoTabla = document.getElementById("tablaMovimientoCliente");
	let fila = movimientoTabla.insertRow(0+1);

	let celda0 = fila.insertCell(0);
	let celda1 = fila.insertCell(1);
	let celda2 = fila.insertCell(2);
	let celda3 = fila.insertCell(3);
	let celda4 = fila.insertCell(4);

	celda0.innerHTML = '<p name="nombreM[]" class="tab-margin">'+nombreM+'</p>';
	celda1.innerHTML = '<p name="tipoM[]" class="tab-margin">'+tipoM+'</p>';
	celda2.innerHTML = '<p name="valorM[]" class="tab-margin">'+valorM+'</p>';
	celda3.innerHTML = '<p name="fechaR[]" class="tab-margin">'+fechaR+'</p>';
	celda4.innerHTML = '<input type="button" type="submit" id="btnEliminar" class="btnE" value="Eliminar">';
}

function localStorageAbrir () {
	if (localStorage.getItem("movimiento")) {
		aMovimientos = JSON.parse(localStorage.getItem("movimiento"));
		let cont = aMovimientos.length;

		for (let i=0;i<cont;i++){
			let aux = aMovimientos[i];
			mostrarElemtos(aux);
		}
	}
}	
