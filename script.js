/* "Calculadora" proyecto a futuro
let name = prompt("Ingresa tu nombre")
console.log("Hola " +name+ " esta es una sencilla calculadora en la que podras calcular en base a kms recorridos el precio a pagar")

let xpers = prompt("Cuantas personas viajaran?")

if (xpers > 1) {
    let divxpers = prompt("Queres dividir este viaje entre los integrantes del viaje si/no")
}

let cantdeviajes = 0

let generacionDeGNC = prompt("Eliga su generacion de gnc, g1=Generacion 1; g2=Generacion 2; g3=Generacion3")

let kms = prompt("Indique la cantidad de Kms a recorrer")

let generacionDeGNCelegida = [
    {generacion: "g1", mt3xkm: 0.9},
    {generacion: "g2", mt3xkm: 0.85},
    {generacion: "g3", mt3xkm: 0.7}
]

console.log(generacionDeGNCelegida.filter(generacion => generacionDeGNCelegida === generacion)) */ 

let productos = [
    {
        id: 8,
        nombre: "MOBIL SUPER 20W-50",
        precio: 1200,
        stock: 20,
        descripcion: "Aceite mineral multiviscoso para automoviles de alto kilometraje.",
        imgUrl: "../images/aceites/aceite1.png",
    },
    {
        id: 12,
        nombre: "MOBIL SUPER 10W-30",
        precio: 1000,
        stock: 33,
        descripcion: "Aceite multiviscoso para los que buscan mas ahorro y ademas calidad.",
        imgUrl: "../images/aceites/aceite2.png",
    },
    {
        id: 55,
        nombre: "MOBIL SUPER 15W-40 SEMISINTETICO",
        precio: 750,
        stock: 90,
        descripcion: "Aceite semisintetico multiviscoso para la proteccion del motor.",
        imgUrl: "../images/aceites/aceite3.png",
    },
    {
        id: 23,
        nombre: "MOBIL SUPER 10W-40 SEMISINTETICO",
        precio: 800,
        stock: 40,
        descripcion: "Aceite semisintetico que funciona en condiciones severas.",
        imgUrl: "../images/aceites/aceite4.png",
    },

]


let containerProductos = document.getElementById("containerProductos")
let carrito = document.getElementById("carrito")

renderizarProductos(productos)

function renderizarProductos(arrayProductos) {
    containerProductos.innerHTML= ``
    for (const producto of productos) {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "col-lg-3 col-md-6 col-sm-12 producto"
        
        tarjetaProducto.id = producto.id
    
        tarjetaProducto.innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src=${producto.imgUrl} class="img-fluid rounded-start imgprod" alt="Aceite 20-5">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body text-start">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text"><small class="text-muted">Aceite lubricante</small></p>
                            <p class="card-text">$${producto.precio}</p>
                            <p class="card-text"><small class="text-muted">Quedan ${producto.stock} u.</small></p>
                            <div class="text-end"><button class="btnCarrito" id=${producto.id} >Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        containerProductos.append(tarjetaProducto)
        
        let botones = document.getElementsByClassName("btnCarrito")
        for (const btn of botones) {
            btn.addEventListener("click", agregarCarrito)  
        }
        
    }
}

function agregarCarrito(e) {
   console.dir(e.target)
   let productoCarrito = productos.find(producto => producto.id== e.target.id)
   carrito.innerHTML += `
   <h3>${productoCarrito.nombre} $${productoCarrito.precio}</h3>
   `
}

