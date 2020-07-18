namespace general{


    window.onload=function(){
        document.getElementById("bAlta").addEventListener("click",contenedorAlta);
        document.getElementById("bCerrar").addEventListener("click",contenedorCerrar);
        document.getElementById("search_input").addEventListener("keyup",searchByMarca);
        document.getElementById("btnGuardar").addEventListener("click",guardar);
        document.getElementById("Vehiculo").addEventListener("change",contenedorTipo);
        document.getElementById("btnPromedio").addEventListener("click",promedio);
    };
    var listVehiculos:Array<Vehiculo> = new Array<Vehiculo>();
    var tipe;
    function contenedorAlta(){
        if(listVehiculos != null)
        {
            
        }
        document.getElementById("container").hidden =false;
        
    }
    function contenedorCerrar(){
        document.getElementById("container").hidden =true;
    }


    export function guardar(){

            let listIds:Array<number>=listVehiculos.map(x=>x.getId());
            var miId:number = listIds.length > 0 ? listIds.reduce(function(previous, current){
                return current + 1;
            }) : 1;

        var inputMarca=<HTMLInputElement>document.getElementById("Marca");
        var miMarca:string=inputMarca.value;

        var inputModelo=<HTMLInputElement>document.getElementById("Modelo");
        var miModelo:string=inputModelo.value;

        var inputPrecio=<HTMLInputElement>document.getElementById("Precio");
        var miPrecio:number=parseInt(inputPrecio.value);

         tipe = <HTMLInputElement>document.getElementById("Vehiculo");
        var miAuto:Auto ;
        var miCamio:Camioneta;

        switch(tipe.value){
            case "Camioneta":{
                let esCuatro=true;//document.getElementById("verdadero").checked;
                miCamio=new Camioneta(miId,miMarca,miModelo,miPrecio,esCuatro);
                listVehiculos.push(miCamio);
                armarGrilla(listVehiculos);
                //agregar a la tabla
                break;
                }
            case "Auto":{                
                let cantRuedas=<HTMLInputElement>document.getElementById("cantRuedas");
                miAuto=new Auto(miId,miMarca,miModelo,miPrecio,parseInt(cantRuedas.value));
                listVehiculos.push(miAuto);
                armarGrilla(listVehiculos);
                break;
                 }
            }
        }

        export function contenedorTipo(){
            var tipe = <HTMLInputElement>document.getElementById("Vehiculo");
            switch(tipe.value){
                case "Camioneta":{
                    document.getElementById("contenedorCamioneta").hidden=false;
                    document.getElementById("contenedorAuto").hidden=true;
                    break;
                }
                case "Auto":{                
                    document.getElementById("contenedorCamioneta").hidden=true;
                    document.getElementById("contenedorAuto").hidden=false;
                    break;
                }
                default :{
                    document.getElementById("contenedorCamioneta").hidden=true;
                    document.getElementById("contenedorAuto").hidden=true;
                }
            }
        }

        export function agregarObjeto(objeto){
        
            var tCuerpo = document.getElementById("tCuerpo");
            var tr =document.createElement("tr");
            //Agrega una row
           
            if(objeto instanceof Auto)      
            {       
                var td2 =document.createElement("td");
                var nodoTexto2 = document.createTextNode(objeto.getId().toString());
                td2.appendChild(nodoTexto2);
                tr.appendChild(td2); //agrego la row a la tabla 

                var td3 =document.createElement("td");
                var nodoTexto3 = document.createTextNode(objeto.getMarca());
                td3.appendChild(nodoTexto3);
                tr.appendChild(td3); //agrego la row a la tabla 

                var td4 =document.createElement("td");
                var nodoTexto4 = document.createTextNode(objeto.getModelo());
                td4.appendChild(nodoTexto4);
                tr.appendChild(td4);

                var td5 =document.createElement("td");
                var nodoTexto5 = document.createTextNode(objeto.getPrecio().toString());
                td5.appendChild(nodoTexto5);
                tr.appendChild(td5);

                var td6 =document.createElement("td");
                var button = document.createElement("button");
                button.textContent="Eliminar";
                button.className="error";
                button.addEventListener("click",eliminar);
                td6.appendChild(button);
                tr.appendChild(td6); //agrego la row a la tabla 

            //tr.addEventListener("dblclick",clickGrilla);
          }
            else if (objeto instanceof Camioneta)
            {

                var td2 =document.createElement("td");
                var nodoTexto2 = document.createTextNode(objeto.getId().toString());
                td2.appendChild(nodoTexto2);
                tr.appendChild(td2); //agrego la row a la tabla 

                var td3 =document.createElement("td");
                var nodoTexto3 = document.createTextNode(objeto.getMarca());
                td3.appendChild(nodoTexto3);
                tr.appendChild(td3); //agrego la row a la tabla 

                var td4 =document.createElement("td");
                var nodoTexto4 = document.createTextNode(objeto.getModelo());
                td4.appendChild(nodoTexto4);
                tr.appendChild(td4);

                var td5 =document.createElement("td");
                var nodoTexto5 = document.createTextNode(objeto.getPrecio().toString());
                td5.appendChild(nodoTexto5);
                tr.appendChild(td5);

                var td6 =document.createElement("td");
                var button = document.createElement("button");
                button.textContent="Eliminar";
                button.className="error";
                button.addEventListener("click",eliminar);
                td6.appendChild(button);
                tr.appendChild(td6); //agrego la row a la tabla 
            }
            tCuerpo.appendChild(tr);
        }
    
        export function armarGrilla(obj){
            document.getElementById("tCuerpo").innerHTML="";
            for(var i=0;i<obj.length;i++){
                agregarObjeto(obj[i])
            }
        }

        export function searchByMarca(){
            var listFilt:Array<Vehiculo> = new Array<Vehiculo>();
            var searchInput = <HTMLInputElement>document.getElementById("search_input");
            var valor = searchInput.value.toLowerCase();
            // listFilt= listMascotas.filter(mascota=>{
            //     if(mascota.getNombre().includes(valor))
            //     {
            //         return mascota;
            //     }       
            // });
            // listFilt=listMascotas.filter(mascota => mascota.getNombre().toLowerCase().includes(valor));
            listFilt=listVehiculos.filter(mascota =>mascota.getMarca().toLowerCase().indexOf(valor) > -1);
            armarGrilla(listFilt);
                
        }
        export function eliminar(e){
            var trClick= e.target.parentNode.parentNode;
            var seleccionado = listVehiculos.find(item=>item.getId() == +trClick.childNodes[0].textContent);
            listVehiculos.splice(listVehiculos.indexOf(seleccionado),1);
            trClick.remove();
        }
    
       function promedio(){
           var list:Array<number> = listVehiculos.map(item=> item.getPrecio());

           var promedio = list.reduce(function(total,current){
               total+=current;
               var cantidadDePrecios = list.length;
                return total/cantidadDePrecios;
           })
           var sumatoriaObjeto = list.reduce(function(acumulador, siguienteValor){
            return {
              precio: acumulador.precio + siguienteValor
            };
          }, {precio: 0}); //Si no hay nada, regresamos un objeto con edad = 0. No hay necesidad de devolver el nombre, pues no es necesario
          
          var promedioPrecio = sumatoriaObjeto.precio / list.length;
          alert(promedio);
       }
}