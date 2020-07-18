namespace general{
    export class Auto extends Vehiculo  
    {
        private cantidadPuertas:number;
         promedio:number;

        constructor(id:number,marca:string,modelo:string,precio:number,cantidadPuertas:number){
            super(id,marca,modelo,precio);
            this.cantidadPuertas=cantidadPuertas;
        }

        public getPuertas():number{  
            return this.cantidadPuertas;
        }   
        public setPuertas(cantidadPuertas:number){  
            this.cantidadPuertas=cantidadPuertas;
        }
    
        
    }
}