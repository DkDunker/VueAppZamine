export default {
    methods: {
        insertarCeroFecha(date) {
            var dateArray = date.split("/");
            var fechaFomateada = ''; 
            dateArray.forEach((element,index) => {
                var elemento_formateado = '';
                if(parseInt(element, 10) < 10){
                    elemento_formateado =  "0"+ element.toString()
                }else{
                    elemento_formateado = element
                }
                if(index < dateArray.length - 1){
                    fechaFomateada += elemento_formateado + "/"
                }else{
                    fechaFomateada += elemento_formateado
                }
                
            })
            return fechaFomateada
        }, 
        insertarCeroHora(hour) {
            var hourArray = hour.split(":");
            var horaFormateada = ''; 
            hourArray.forEach((element,index) => {
                var elemento_formateado = '';
                if(parseInt(element, 10)  < 10){
                    elemento_formateado =  "0"+ element.toString()
                }else{
                    elemento_formateado =  element
                }
                if(index < hourArray.length - 1){
                    horaFormateada += elemento_formateado + ":"
                }else{
                    horaFormateada += elemento_formateado
                }
            })
            return horaFormateada
        }, 
    },
}