//BASE DE DATOS
	const IVA = 0.16;
	var uniUser;
pro=[
				{"nombre":"Durazno","imagen":"ima/producto/durasno.jpg","precio":"69","stock":"6"},
				{"nombre":"Fresa","imagen":"ima/producto/fresa.jpg","precio":"36","stock":"8"},
				{"nombre":"Naranja","imagen":"ima/producto/naranja.jpg","precio":"60","stock":"3"},
				{"nombre":"Zarzamora","imagen":"ima/producto/zarzamora.jpg","precio":"25","stock":"9"},
				{"nombre":"Cereza",	"imagen":"ima/producto/cereza.jpg","precio":"40","stock":"4"},
				{"nombre":"Pera","imagen":"ima/producto/pera.jpg","precio":"35","stock":"3"},
				{"nombre":"Manzana","imagen":"ima/producto/manzana.jpg","precio":"66","stock":"5"},
								{"nombre":"Sandia","imagen":"ima/producto/sandia.jpg","precio":"40","stock":"6"},
				{"nombre":"Mel&oacute;n","imagen":"ima/producto/melon.jpg","precio":"25","stock":"2"},
				{"nombre":"Guayaba","imagen":"ima/producto/guayaba.jpg","precio":"20","stock":"6"},
				{"nombre":"Lim&oacute;n","imagen":"ima/producto/limon.jpg","precio":"15","stock":"4"},
				{"nombre":"Tomate","imagen":"ima/producto/tomate.jpg","precio":"22","stock":"2"},
				{"nombre":"Cebolla","imagen":"ima/producto/cebolla.jpg","precio":"18","stock":"5"},
				{"nombre":"Chayote","imagen":"ima/producto/chayote.jpg","precio":"25","stock":"3"},
				{"nombre":"Aguacate","imagen":"ima/producto/aguacate.jpg","precio":"33","stock":"5"}

		];
	window.onload = function(){
		//Se cargan los productos dentro del HTML de forna dinamica haciendo uso de los datos de la base de datos, como si de un PHP se tratase:
		var DIVS = document.getElementById("listaPro");

		for (i in pro){
			DIVS.innerHTML = DIVS.innerHTML + '<div class=" col-xl-2 card card-deck text-center mt-2 ml-5 pl-1"><b><span id="pro'+i+'">' +pro[i].nombre+ '<br/></span><img id="imgP'+i+'" class="rounded-circle" src="' +pro[i].imagen+ '"><br/>Precio:$<span id="pre'+i+'">' +pro[i].precio+ '</span><div class="stock">Hay disponible <span id="uni'+i+'">' +pro[i].stock+ '</span> unidades<br/>Cuantas quiere?:<br/><input class="uniBien" type="number" "id="uniUser'+i+'" name="uniUser" value="0" size="3"/></div></div>';
	}
		//Botones que llevaran a cabo la ejecucion de determinadas secuencias de codigo JavaScript:
		document.getElementById("botonTotal").onclick = validaUnidades;
    document.getElementById("TERMINAR").onclick = terminar;
	}
//FUNCION DE VALIDACION DE UNIDADES:
	function validaUnidades(elEvento){
		var todoBien = true;
		uniUser = document.getElementsByName("uniUser");

		for (i in pro){
			if ( uniUser[i].value == "" || uniUser[i].value > pro[i].stock || uniUser[i].value < 0 ){
				todoBien = false;
				uniUser[i].className= "uniMal";
				alert("YA NO EXISTE PRODUCTO");
				document.getElementById("divTotal").className= "divsNo";
				return;
			}
			else{
				todoBien = true;
				uniUser[i].className = "uniBien";
			}
		}
		//Si no ha habido ni un solo error, se ejecuta la siguiente funcion de cargar el carro de la compra:
		if (todoBien){
			calculaElTotal();
		}}
//FUNCION QUE MUSTRA EL CARRO DE LA COMPRA:
	function calculaElTotal(elEvento) {
		//Añade el encabezado de la tabla
		document.getElementById("tablaTotal").innerHTML='<tr><td class="ima"><b>Imagen</b></td><td class="pro"><b>Producto</b></td><td class="uni"><b>Unidades</b></td><td class="preUni"><b>Precio Unidad</b></td><td class="preTotal"><b>Total</b></td></tr>';
		//Inicializacion de las variables para esta funcion:
		var carroTotal = 0;
		//Muestra el carrito de la compra
		for (i in pro){
			var tablaTotal = document.getElementById("tablaTotal").innerHTML;
			var preTotal = 0;
			//Cuenta el numero de productos
			if (uniUser[i].value != 0){
				//Calcula el totalUnidades y rellena el carro de la compra
				preTotal = pro[i].precio * uniUser[i].value;
				carroTotal = carroTotal + preTotal;
				document.getElementById("tablaTotal").innerHTML = tablaTotal + '<tr class="proCarrito"><td><img class="rounded" src="'+pro[i].imagen+ '" alt="'+pro[i]+'"></td><td>' +pro[i].nombre+ '</td><td>' +uniUser[i].value+ '</td><td>' +pro[i].precio+ '</td><td id="preTotal' +i+'" name="preTotal">' +preTotal+ '</td></tr>';
			}	}
		//Se obtiene el subTotal
		if(carroTotal>0){
			var totalIVA = (carroTotal * IVA);
			var totalAPagar = carroTotal + totalIVA;
		}
		totalIVA=totalIVA*100;
		totalIVA=Math.floor(totalIVA);
		totalIVA=totalIVA/100;

		totalAPagar=totalAPagar*100;
		totalAPagar=Math.floor(totalAPagar);
		totalAPagar=totalAPagar/100;
		//Se añade a la tabla el TOTAL que suma el carrito:
		tablaTotal = document.getElementById("tablaTotal").innerHTML;
		document.getElementById("tablaTotal").innerHTML = tablaTotal + '<tr><td>&nbsp;</td>&nbsp;<td></td><td></td><td class="preUni"><b>Subtotal: </b></td><td class="preTotal"><b>' +"$ "+carroTotal+ '</b></td></tr>' +'<tr><td>&nbsp;</td>&nbsp;<td></td><td></td><td class="preUni"><b>IVA ('+(IVA*100)+'%): </b></td><td class="preTotal"><b>' +"$ "+totalIVA+ '</b></td></tr>'  + '<tr><td>&nbsp;</td>&nbsp;<td></td><td></td><td class="preUni"><b>Total: </b></td><td class="preTotal" id="totalAPagar"><b>'+"$ "+totalAPagar+ '</b></td></tr>';
	}
	function terminar(elEvento) {
		var carroTotal = 0;
		//Muestra el carrito de la compra
		for (i in pro){
			var preTotal = 0;
				//Calcula el totalUnidades y rellena el carro de la compra
				preTotal = pro[i].precio * uniUser[i].value;
				carroTotal = carroTotal + preTotal;
					}

		//Se obtiene el subTotal
			var totalIVA = (carroTotal * IVA);
			var totalAPagar = carroTotal + totalIVA;

			totalAPagar=totalAPagar*100;
			totalAPagar=Math.floor(totalAPagar);
			totalAPagar=totalAPagar/100;
		alert("Gracias por su compra...\n \nSu compra fue de:" +"$ " + totalAPagar);
		window.location.reload()
	}
