var general;
(function (general) {
    window.onload = function () {
        document.getElementById("bAlta").addEventListener("click", contenedorAlta);
        document.getElementById("bCerrar").addEventListener("click", contenedorCerrar);
        document.getElementById("search_input").addEventListener("keyup", searchByMarca);
        document.getElementById("btnGuardar").addEventListener("click", guardar);
        document.getElementById("Vehiculo").addEventListener("change", contenedorTipo);
        document.getElementById("btnPromedio").addEventListener("click", promedio);
    };
    var listVehiculos = new Array();
    var tipe;
    function contenedorAlta() {
        if (listVehiculos != null) {
        }
        document.getElementById("container").hidden = false;
    }
    function contenedorCerrar() {
        document.getElementById("container").hidden = true;
    }
    function guardar() {
        var listIds = listVehiculos.map(function (x) { return x.getId(); });
        var miId = listIds.length > 0 ? listIds.reduce(function (previous, current) {
            return current + 1;
        }) : 1;
        var inputMarca = document.getElementById("Marca");
        var miMarca = inputMarca.value;
        var inputModelo = document.getElementById("Modelo");
        var miModelo = inputModelo.value;
        var inputPrecio = document.getElementById("Precio");
        var miPrecio = parseInt(inputPrecio.value);
        tipe = document.getElementById("Vehiculo");
        var miAuto;
        var miCamio;
        switch (tipe.value) {
            case "Camioneta": {
                var esCuatro = true; //document.getElementById("verdadero").checked;
                miCamio = new general.Camioneta(miId, miMarca, miModelo, miPrecio, esCuatro);
                listVehiculos.push(miCamio);
                armarGrilla(listVehiculos);
                //agregar a la tabla
                break;
            }
            case "Auto": {
                var cantRuedas = document.getElementById("cantRuedas");
                miAuto = new general.Auto(miId, miMarca, miModelo, miPrecio, parseInt(cantRuedas.value));
                listVehiculos.push(miAuto);
                armarGrilla(listVehiculos);
                break;
            }
        }
    }
    general.guardar = guardar;
    function contenedorTipo() {
        var tipe = document.getElementById("Vehiculo");
        switch (tipe.value) {
            case "Camioneta": {
                document.getElementById("contenedorCamioneta").hidden = false;
                document.getElementById("contenedorAuto").hidden = true;
                break;
            }
            case "Auto": {
                document.getElementById("contenedorCamioneta").hidden = true;
                document.getElementById("contenedorAuto").hidden = false;
                break;
            }
            default: {
                document.getElementById("contenedorCamioneta").hidden = true;
                document.getElementById("contenedorAuto").hidden = true;
            }
        }
    }
    general.contenedorTipo = contenedorTipo;
    function agregarObjeto(objeto) {
        var tCuerpo = document.getElementById("tCuerpo");
        var tr = document.createElement("tr");
        //Agrega una row
        if (objeto instanceof general.Auto) {
            var td2 = document.createElement("td");
            var nodoTexto2 = document.createTextNode(objeto.getId().toString());
            td2.appendChild(nodoTexto2);
            tr.appendChild(td2); //agrego la row a la tabla 
            var td3 = document.createElement("td");
            var nodoTexto3 = document.createTextNode(objeto.getMarca());
            td3.appendChild(nodoTexto3);
            tr.appendChild(td3); //agrego la row a la tabla 
            var td4 = document.createElement("td");
            var nodoTexto4 = document.createTextNode(objeto.getModelo());
            td4.appendChild(nodoTexto4);
            tr.appendChild(td4);
            var td5 = document.createElement("td");
            var nodoTexto5 = document.createTextNode(objeto.getPrecio().toString());
            td5.appendChild(nodoTexto5);
            tr.appendChild(td5);
            var td6 = document.createElement("td");
            var button = document.createElement("button");
            button.textContent = "Eliminar";
            button.className = "error";
            button.addEventListener("click", eliminar);
            td6.appendChild(button);
            tr.appendChild(td6); //agrego la row a la tabla 
            //tr.addEventListener("dblclick",clickGrilla);
        }
        else if (objeto instanceof general.Camioneta) {
            var td2 = document.createElement("td");
            var nodoTexto2 = document.createTextNode(objeto.getId().toString());
            td2.appendChild(nodoTexto2);
            tr.appendChild(td2); //agrego la row a la tabla 
            var td3 = document.createElement("td");
            var nodoTexto3 = document.createTextNode(objeto.getMarca());
            td3.appendChild(nodoTexto3);
            tr.appendChild(td3); //agrego la row a la tabla 
            var td4 = document.createElement("td");
            var nodoTexto4 = document.createTextNode(objeto.getModelo());
            td4.appendChild(nodoTexto4);
            tr.appendChild(td4);
            var td5 = document.createElement("td");
            var nodoTexto5 = document.createTextNode(objeto.getPrecio().toString());
            td5.appendChild(nodoTexto5);
            tr.appendChild(td5);
            var td6 = document.createElement("td");
            var button = document.createElement("button");
            button.textContent = "Eliminar";
            button.className = "error";
            button.addEventListener("click", eliminar);
            td6.appendChild(button);
            tr.appendChild(td6); //agrego la row a la tabla 
        }
        tCuerpo.appendChild(tr);
    }
    general.agregarObjeto = agregarObjeto;
    function armarGrilla(obj) {
        document.getElementById("tCuerpo").innerHTML = "";
        for (var i = 0; i < obj.length; i++) {
            agregarObjeto(obj[i]);
        }
    }
    general.armarGrilla = armarGrilla;
    function searchByMarca() {
        var listFilt = new Array();
        var searchInput = document.getElementById("search_input");
        var valor = searchInput.value.toLowerCase();
        // listFilt= listMascotas.filter(mascota=>{
        //     if(mascota.getNombre().includes(valor))
        //     {
        //         return mascota;
        //     }       
        // });
        // listFilt=listMascotas.filter(mascota => mascota.getNombre().toLowerCase().includes(valor));
        listFilt = listVehiculos.filter(function (mascota) { return mascota.getMarca().toLowerCase().indexOf(valor) > -1; });
        armarGrilla(listFilt);
    }
    general.searchByMarca = searchByMarca;
    function eliminar(e) {
        var trClick = e.target.parentNode.parentNode;
        var seleccionado = listVehiculos.find(function (item) { return item.getId() == +trClick.childNodes[0].textContent; });
        listVehiculos.splice(listVehiculos.indexOf(seleccionado), 1);
        trClick.remove();
    }
    general.eliminar = eliminar;
    function promedio() {
        var list = listVehiculos.map(function (item) { return item.getPrecio(); });
        var promedio = list.reduce(function (total, current) {
            total += current;
            var cantidadDePrecios = list.length;
            return total / cantidadDePrecios;
        });
        var sumatoriaObjeto = list.reduce(function (acumulador, siguienteValor) {
            return {
                precio: acumulador.precio + siguienteValor
            };
        }, { precio: 0 }); //Si no hay nada, regresamos un objeto con edad = 0. No hay necesidad de devolver el nombre, pues no es necesario
        var promedioPrecio = sumatoriaObjeto.precio / list.length;
        alert(promedio);
    }
})(general || (general = {}));
