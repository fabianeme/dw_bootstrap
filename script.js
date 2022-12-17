fetch("../productos.json")
    .then (respuesta => respuesta.json())
    .then (productos => {

/* let input = document.getElementById("input")
input.addEventListener("input", fnBuscar)

function fnBuscar() {
    let filterProductos = productos.filter(producto => producto.nombre.includes(input.value))
    renderizarProductos(filterProductos)
    console.log(filterProductos)
} */


let containerProductos = document.getElementById("containerProductos")
let carrito = document.getElementById("carrito")
let arrayCarrito = []



/* if (localStorage.getItem("carrito")) {
    arrayCarrito = JSON.parse(localStorage.getItem("carrito"))
} */

renderizarProductos(productos)

function renderizarProductos(arrayProductos) {
    containerProductos.innerHTML= ``
    for (const producto of arrayProductos) {
        let tarjetaProducto = document.createElement("div")
        
        if (producto.stock <5) {
            tarjetaProducto.className = "col-lg-3 col-md-6 col-sm-12"
        } else {
            tarjetaProducto.className = "col-lg-3 col-md-6 col-sm-12"
        }
        
        tarjetaProducto.id = producto.id
    
        tarjetaProducto.innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src=${producto.imgUrl} class="img-fluid rounded-start imgprod">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body text-start">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text"><small class="text-muted">${producto.tipo}</small></p>
                            <p class="card-text">$${producto.precio}</p>
                            <p class="card-text">${producto.descripcion}</p>
                            <p class="card-text"><small class="text-muted">Quedan ${producto.stock} u.</small></p>
                            <div class="text-end"><button class="btn btnCarrito btn-primary producto" id=${producto.id} >Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        containerProductos.append(tarjetaProducto)
        
        let btnagregar = document.getElementsByClassName("btnCarrito")
        for (const btn of btnagregar) {
            btn.addEventListener("click", agregarCarrito)  
        }
        
    }
}

function agregarCarrito(e) {
   let productoCarrito = productos.find(producto => producto.id== e.target.id)
   let productoAgregado = arrayCarrito.findIndex(producto => producto.id== e.target.id)
   if (productoAgregado != -1) {
    arrayCarrito[productoAgregado] = {
        ...productoCarrito, unidades: arrayCarrito[productoAgregado].unidades + 1, subtotal: arrayCarrito[productoAgregado].precio * (arrayCarrito[productoAgregado].unidades +1),
    }
   } else {
    arrayCarrito.push({
        ...productoCarrito, unidades: 1, subtotal: productoCarrito.precio,
       })
   }

   let carritoJSON = JSON.stringify(arrayCarrito)
   sessionStorage.setItem("carrito", carritoJSON)
   
   
   Toastify({

    text: "Producto agregado al carrito!",
    
    duration: 1000
    
    }).showToast();

  

   rederizarCarrito()
   
}


function rederizarCarrito(){
    carrito.innerHTML = `
    <div class="container">
        <div class="row">
            <div class="col-6 text-center">
                <h7>Producto</h7>
            </div>
            <div class="col-3 text-center">
                <h6>Cantidad</h6>
            </div>
            <div class="col-3 text-center">
                <h6>Subtotal</h6>
            </div>
        </div>
    </div>
    `
    
    let precioTotal = arrayCarrito.reduce((acc, productoCarrito) => acc + productoCarrito.precio * productoCarrito.unidades, 0)
    let pagar = document.getElementById("pagar")
    pagar.innerHTML =`
    <div class="container seccion1">
        <div class="row">
            <div class="col-12 text-center">
                <h5>Tu compra</h5>
            </div>
        </div>
        <div class="row ">
            <div class="col-12 text-center">
             <h5>Total $${precioTotal}</h5>
            </div>
        </div>
        <div class="row text-center" id="comprar">
            <div class="col-12">
                <button type="button" class="btn btn-success btn-comprar">Comprar</button>
            </div>
        </div>
    </div>    
    `
   
    let comprar = document.getElementById("comprar")
    comprar.onclick = () => {
        sessionStorage.clear()
        carrito.innerHTML= ``
        pagar.innerHTML=``
        comprar.innerHTML=``
        Swal.fire(
            'Muy bien',
            'Compraste tu carrito!',
            'success'
          )
    }
    
    for (const itemCarrito of arrayCarrito) {
        carrito.innerHTML += `
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="card">
                        <div class="row g-0 seccion">
                            <div class="col-2">
                                <img src="${itemCarrito.imgUrl}" class="img-fluid rounded-start" style="max-width: 20px;">
                            </div>
                            <div class="col-4">
                                <h6>${itemCarrito.nombre}</h6>
                            </div>
                            <div class="col-3 text-center">
                            <span class="sumar"> + </span>
                            <h6>${itemCarrito.unidades}</h6>
                            <button type="button" class="btn btn-success btn-restar">-</button>
                            </div>
                            <div class="col-3 text-center">
                                <h6>$${itemCarrito.subtotal}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    `}
    
    
}


})

let restar = document.getElementsByClassName("btn-restar");
    restar.onclick = () =>  {
        if (itemCarrito.unidades !== 1) {
          itemCarrito.unidades--;
        }
        rederizarCarrito()
      }




let comprar = document.getElementsByClassName("btn-comprar")
    comprar.onclick = () => {
        localStorage.clear()
        carrito.innerHTML= ``
    }
    

    



   


