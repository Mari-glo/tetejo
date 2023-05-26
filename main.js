/**mi tiendita te te jo **/


//guardar en localstorage
//modificar las cantidades
//pinkmode para Nacho
//finalizar compra
//aplicar descuentos

class Tejido {
  constructor(id, nombre, valor, img) {
    this.id = id;
    this.nombre = nombre;
    this.valor = valor;
    this.img = img;
    this.cantidad = 1;
  }
}
const amongus = new Tejido(1, "Among Us", 5000, "./img/prod_amongus.jpg");
const babyyoda = new Tejido(2, "Baby Yoda", 7000, "./img/prod_babyyoda.jpg");
const cartera = new Tejido(3, "Carterita tejida", 9500, "./img/prod_carterita.jpg");
const charmander = new Tejido(4, "Charmander", 8990, "./img/prod_charmander.jpg");
const kirby = new Tejido(5, "kirby", 7500, "./img/prod_kirby.jpg");
const merida = new Tejido(6, "Mérida", 19000, "./img/prod_merida.jpg");
const mickey = new Tejido(7, "Mickey Abstracto", 5500, "./img/prod_mickey.jpg");
const nube = new Tejido(8, "Nubecitas", 4000, "./img/prod_nube.jpg");
const pokebola = new Tejido(9, "Pokebolas", 4500, "./img/prod_pokebolas.jpg");
const pulpo = new Tejido(10, "Pulpito de apego", 8500, "./img/prod_pulpitos.jpg");

//crear un array con todos los productos

const tejidos = [amongus, babyyoda, cartera, charmander, kirby, merida, mickey, nube, pokebola, pulpo];

//crear el array del canasto de compras

let canasto = [];

//mostrar los productos

const canastoTejidos = document.getElementById("canastoTejidos");
const mostrarTejidos = () => {
  tejidos.forEach((tejido) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
                    <div class="card">
                    <img src="${tejido.img}" class="card-img-top imgTejidos" alt="${tejido.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${tejido.nombre}</h5>
                        <p class="card-text">$${tejido.valor} CLP</p>
                        <button id="agregar${tejido.id}" class= "btn botonCreado"> Agregar al canasto </button>
                    </div>
                    </div>`;
    canastoTejidos.appendChild(card);

    //agregar productos al canasto:

    const agregar = document.getElementById(`agregar${tejido.id}`);
    agregar.addEventListener("click", () => {
      agregarAlCanasto(tejido.id);
    });
  });
};
mostrarTejidos();

//función que agrega productos al canasto

const agregarAlCanasto = (id) => {
  const tejidoEnCanasto = canasto.find((tejido) => tejido.id === id);
  if (tejidoEnCanasto) {
    tejidoEnCanasto.cantidad++;
  } else {
    const tejido = tejidos.find((tejido) => tejido.id === id);
    canasto.push(tejido);
  }
  calcularTotal();
};

//mostrar el canasto de compra:

const contenedorCanasto = document.getElementById("contenedorCanasto");
const verCanasto = document.getElementById("verCanasto");

verCanasto.addEventListener("click", () => {
  mostrarCanasto();
});
const mostrarCanasto = () => {
  contenedorCanasto.innerHTML = "";
  canasto.forEach((tejido) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
                    <div class="card">
                    <img src="${tejido.img}" class="card-img-top imgTejidos" alt="${tejido.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${tejido.nombre}</h5>
                        <p class="card-text">$${tejido.valor} CLP</p>
                        <p class="card-text">${tejido.cantidad}</p>
                        <button id="eliminar${tejido.id}" class= "btn botonCreado"> Eliminar </button>
                        <button id="aumentar${tejido.id}" class= "btn botonCreado"> + </button>
                        <button id="disminuir${tejido.id}" class= "btn botonCreado"> - </button>
                    </div>
                    </div>`;
    contenedorCanasto.appendChild(card);

    //eliminar productos del carrito

    const eliminar= document.getElementById(`eliminar${tejido.id}`);
    eliminar.addEventListener("click",()=>{
        eliminarDelCanasto(tejido.id);
    })

    //aumentar y disminuir cantidad:
    const aumentar = document.getElementById(`aumentar${tejido.id}`);
    aumentar.addEventListener("click", () => {
        tejido.cantidad++;
        mostrarCanasto();
    })
    const disminuir = document.getElementById(`disminuir${tejido.id}`);
    disminuir.addEventListener("click", () => {
        tejido.cantidad--;
        mostrarCanasto();
    })

    calcularTotal ();
  });
};
const eliminarDelCanasto=(id)=>{
    const tejido = canasto.find(tejido => tejido.id ===id);
    const indice = canasto.indexOf(tejido);
    canasto.splice(indice, 1)
    mostrarCanasto();
}

//calcular el total de la compra:

const total = document.getElementById("total");
const calcularTotal = () => {
    let totalCompra = 0;
    canasto.forEach (tejido => {
        totalCompra += tejido.valor * tejido.cantidad;
    })
    total.innerHTML= `$${totalCompra} CLP`;
}

//vaciar el canasto de compra

const vaciarCanasto = document.getElementById("vaciarCanasto");
vaciarCanasto.addEventListener("click", () => {
    eliminarTodo();
})
const eliminarTodo =() => {
    canasto = [];
    mostrarCanasto();
}

