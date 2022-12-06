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
        tipo: "aceite lubricante",
        descripcion: "Aceite mineral multiviscoso para automoviles de alto kilometraje.",
        imgUrl: "../images/aceites/aceite1.png",
    },
    {
        id: 12,
        nombre: "MOBIL SUPER 10W-30",
        precio: 1000,
        stock: 33,
        tipo: "aceite lubricante",
        descripcion: "Aceite multiviscoso para los que buscan mas ahorro y ademas calidad.",
        imgUrl: "../images/aceites/aceite2.png",
    },
    {
        id: 55,
        nombre: "MOBIL SUPER 15W-40 SEMISINTETICO",
        precio: 750,
        stock: 90,
        tipo: "aceite lubricante",
        descripcion: "Aceite semisintetico multiviscoso para la proteccion del motor.",
        imgUrl: "../images/aceites/aceite3.png",
    },
    {
        id: 23,
        nombre: "MOBIL SUPER 10W-40 SEMISINTETICO",
        precio: 800,
        stock: 4,
        tipo: "aceite lubricante",
        descripcion: "Aceite semisintetico que funciona en condiciones severas.",
        imgUrl: "../images/aceites/aceite4.png",
    },

]


let containerProductos = document.getElementById("containerProductos")
let carrito = document.getElementById("carrito")
let arrayCarrito = []

let comprar = document.getElementById("comprar")
comprar.onclick = () => {
    localStorage.clear()
    carrito.innerHTML= ""
}

if (localStorage.getItem("carrito")) {
    arrayCarrito = JSON.parse(localStorage.getItem("carrito"))
}

rederizarCarrito()
renderizarProductos(productos)

function renderizarProductos(arrayProductos) {
    containerProductos.innerHTML= ``
    for (const producto of arrayProductos) {
        let tarjetaProducto = document.createElement("div")
        
        if (producto.stock <5) {
            tarjetaProducto.className = "col-lg-3 col-md-6 col-sm-12 productoPocoStock"
        } else {
            tarjetaProducto.className = "col-lg-3 col-md-6 col-sm-12 producto"
        }
        
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
                            <p class="card-text"><small class="text-muted">${producto.tipo}</small></p>
                            <p class="card-text">$${producto.precio}</p>
                            <p class="card-text">${producto.descripcion}</p>
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

let input = document.getElementById("input")
input.addEventListener("input", fnBuscar)

function fnBuscar() {
    let filterProductos = productos.filter(producto => producto.nombre.includes(input.value))
    renderizarProductos(filterProductos)
    console.log(filterProductos)
}

function agregarCarrito(e) {
    
   console.dir(e.target)
   let productoCarrito = productos.find(producto => producto.id== e.target.id)
   let productoAgregado = arrayCarrito.findIndex(producto => producto.id== e.target.id)
   if (productoAgregado != -1) {
    arrayCarrito[productoAgregado] = {
        id: arrayCarrito[productoAgregado].id, nombre: arrayCarrito[productoAgregado].nombre, imgUrl: arrayCarrito[productoAgregado].imgUrl, precio: arrayCarrito[productoAgregado].precio, unidades: arrayCarrito[productoAgregado].unidades + 1, subtotal: arrayCarrito[productoAgregado].precio * (arrayCarrito[productoAgregado].unidades +1),
    }
   } else {
    arrayCarrito.push({
        id: productoCarrito.id, nombre: productoCarrito.nombre,imgUrl: productoCarrito.imgUrl, precio: productoCarrito.precio, unidades: 1, subtotal: productoCarrito.precio ,
       })
   }

   let carritoJSON = JSON.stringify(arrayCarrito)
   localStorage.setItem("carrito", carritoJSON)

   rederizarCarrito()
}

function rederizarCarrito(){
    carrito.innerHTML = `<div class="col-md-3"><h3>Producto</h3></div>
    <div class="col-md-3"><h3>Precio</h3></div>
    <div class="col-md-3"><h3>Cantidad</h3></div>
    <div class="col-md-3"><h3>Subtotal</h3></div>`
    for (const itemCarrito of arrayCarrito) {
        carrito.innerHTML += `
        <div class="col-md-3"><h5>${itemCarrito.imgUrl}${itemCarrito.nombre}</h5></div>
        <div class="col-md-3"><h3>$${itemCarrito.precio}</h3></div>
        <div class="col-md-3"><h3>${itemCarrito.unidades}</h3></div>
        <div class="col-md-3"><h3>${itemCarrito.subtotal}</h3></div>
        ` 
    }
    
}

