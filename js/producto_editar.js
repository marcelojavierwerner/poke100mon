console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // producto_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        usuario:"",
        mail:"",
        pokemon:"",
        nivel:0,
        estado:"",
        imagen:"",
        url:'https://animusnovandi.pythonanywhere.com/productos/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.usuario = data.usuario;
                    this.imagen=data.imagen
                    this.mail = data.mail;
                    this.pokemon = data.pokemon;
                    this.nivel=data.nivel
                    this.estado = data.estado;                   
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let producto = {
                usuario:this.usuario,
                mail: this.mail,
                pokemon: this.pokemon,
                nivel: this.nivel,
                estado: this.estado,
                imagen:this.imagen
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./productos.html"; // navega a productos.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
