/*Funcion para esconder el header*/
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");

window.addEventListener("scroll", () => {

  const footerTop = footer.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  // Cuando el footer aparece en pantalla
  if (footerTop < windowHeight) {

    header.style.transform = "translateY(-100%)";

  } else {

    header.style.transform = "translateY(0)";
  }
});
/*Funcion para carousel*/
const images = document.querySelectorAll(".carousel-container img");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let current = 0;

function showImage(index) {
  images.forEach(img => img.classList.remove("active"));
  images[index].classList.add("active");
}

function nextImage() {
  current++;

  if (current >= images.length) {
    current = 0;
  }

  showImage(current);
}

function prevImage() {
  current--;

  if (current < 0) {
    current = images.length - 1;
  }

  showImage(current);
}

nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Cambio automático cada 3 segundos
setInterval(nextImage, 3000);

/**Funcion para logIn-singIn flotante con modal */
const btnLogin = document.getElementById("btnLogin");
const btnRegistro = document.getElementById("btnRegistro");
const overlay = document.getElementById("overlay");
const cerrarBtn = document.getElementById("cerrarBtn");
const formLogin = document.getElementById("formLogin");
const formRegistro = document.getElementById("formRegistro");
const irARegistro = document.getElementById("irARegistro")
const irALogin = document.getElementById("irALogin");

const botones = document.getElementById("botonera");
const mIngreso = document.getElementById("mensajeBienvenida");

function limpiarInputs(form) {
  form.querySelectorAll("input").forEach(input => {
    input.value = "";
  });
}

function mostrarFormulario(form) {
  //limpiamos formulario antes de cargar
  limpiarInputs(formLogin);
  limpiarInputs(formRegistro);

  overlay.classList.add("activo");
  formLogin.classList.remove("activo");
  formRegistro.classList.remove("activo");
  form.classList.add("activo");
}

btnLogin.addEventListener("click", () => mostrarFormulario(formLogin));
btnRegistro.addEventListener("click", () => mostrarFormulario(formRegistro));
irALogin.addEventListener("click", () => mostrarFormulario(formLogin));
irARegistro.addEventListener("click", () => mostrarFormulario(formRegistro));
cerrarBtn.addEventListener("click", () => {
  overlay.classList.remove("activo");
});

const toast = document.getElementById("mensajeToast");

function mostrarMensaje(texto, tipo = "sucecess") {
  toast.textContent = texto;
  toast.className = "toast";

  if (tipo === "error") toast.classList.add("error");

  setTimeout(() => toast.classList.add("mostrar"), 10);

  setTimeout(() => {
    toast.classList.remove("mostrar");
  }, 3000);
}

//guardar en localStorage
formRegistro.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault(); //no recarga la pagina

  const inputs = formRegistro.querySelectorAll("input");
  const usuario = {
    nombre: inputs[0].value,
    email: inputs[1].value,
    password: inputs[2].value
  };

  if (usuario.nombre && usuario.email && usuario.password) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
    mostrarMensaje("Registro guardado con éxito");
    setTimeout(() => {
      formRegistro.classList.add("oculto");
      formLogin.classList.remove("oculto");
      formRegistro.classList.remove("activo");
      formLogin.classList.add("activo");
    }, 1000);//Este bloque del setTimeOut alterna al formLogin una vez registrado
  } else {
    mostrarMensaje("Completá todos los campos", "error");
  }
});

formLogin.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();

  const inputs = formLogin.querySelectorAll("input");
  const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

  if (usuarioGuardado &&
    inputs[0].value === usuarioGuardado.email &&
    inputs[1].value === usuarioGuardado.password) {
    mostrarMensaje("Ingresaste con éxito");
    setTimeout(() => overlay.classList.remove("activo"), 1000);

    mIngreso.classList.remove("oculto");
    botones.classList.add("oculto");

    mIngreso.innerHTML = `<p class="bienvenida">BIENVENIDO ${usuarioGuardado.nombre}</p>`;

    // === Botón carrito ===
    const btnCarrito = document.createElement("button");
    btnCarrito.classList.add("carro");
    btnCarrito.addEventListener("click", mostrarCarrito);

    const imgCarrito = document.createElement("img");
    imgCarrito.src = "./archivo/carrito-ico.webp";
    imgCarrito.alt = "Carrito";
    imgCarrito.classList.add("img-carro");

    const contador = document.createElement("span");
    contador.id = "contador-carrito";
    contador.classList.add("contador-badge");

    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = totalItems;

    btnCarrito.appendChild(imgCarrito);
    btnCarrito.appendChild(contador);

    // === Botón salir ===
    const btnSalir = document.createElement("button");
    btnSalir.classList.add("salida");
    btnSalir.addEventListener("click", salir);

    const imgSalir = document.createElement("img");
    imgSalir.src = "./archivo/salida.png";
    imgSalir.alt = "Salir";
    imgSalir.classList.add("img-salir");

    // ESTE TE FALTABA
    btnSalir.appendChild(imgSalir);

    // === Contenedor para ambos botones ===
    const grupoBotones = document.createElement("div");
    grupoBotones.classList.add("grupo-botones");

    grupoBotones.appendChild(btnCarrito);
    grupoBotones.appendChild(btnSalir);

    // Agregar debajo del texto de bienvenida
    mIngreso.appendChild(grupoBotones);
    const productoPendiente = localStorage.getItem("productoPendiente");
    if (productoPendiente) {
      agregarAlCarrito(parseInt(productoPendiente));
      localStorage.removeItem("productoPendiente");
    }
  } else {
    mostrarMensaje("Email o contraseña incorrectos", "error");
  }
});

//verificamos si usuario está logueado
function usuarioLogueado() {
  return localStorage.getItem("usuario") !== null;
}

//script para cargar fotos en div
let productos = [];

fetch('./json/imagenes.json')
  .then(response => response.json())
  .then(data => {

    Object.keys(data).forEach(nombreGrupo => {
      productos = productos.concat(data[nombreGrupo]);
      cargarGrupo(data[nombreGrupo], nombreGrupo);
    });

  });

function cargarGrupo(grupo, contenedorId) {

  const contenedor = document.getElementById(contenedorId);

  grupo.forEach(item => {

    const card = document.createElement('div');

    card.classList.add('card');

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="${item.imagen}" alt="${item.titulo}">
          <h3>${item.titulo} - $${item.precio}</h3>
        </div>

        <div class="card-back">
          <p>${item.descripcion}</p>
          <button onclick="verificarLoginYComprar(${item.id})">Comprar</button>
        </div>
      </div>
    `;

    contenedor.appendChild(card);

  });
}

function verificarLoginYComprar(idProducto) {
  if (usuarioLogueado()) {
    agregarAlCarrito(idProducto);
  } else {
    mostrarMensaje("Tenes que iniciar sesión para comprar", "error");

    overlay.classList.add("activo");
    formRegistro.classList.add("oculto");
    formLogin.classList.remove("oculto");

    localStorage.setItem("productoPendiente", idProducto);
  }
}

/*Seccion carrito*/
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* agregamos al carrito */
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id == id);
  if (!producto) return;

  const itemEnCarrito = carrito.find(item => item.id == id);

  if (itemEnCarrito) {
    itemEnCarrito.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarMensaje(`${producto.titulo} agregado al carrito`);
  actualizarContadorCarrito();
}

function mostrarCarrito() {
  document.getElementById("overlay-carrito").classList.add("activo");

  const divCarrito = document.getElementById("carrito");
  divCarrito.innerHTML = "";
  const btnCerrar = document.createElement("button");
  btnCerrar.textContent = "Cerrar";
  btnCerrar.classList.add("btn-cerrar-modal");
  btnCerrar.addEventListener("click", cerrarCarrito);

  divCarrito.appendChild(btnCerrar);

  if (carrito.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("carrito-vacio-txt");
    mensaje.textContent = "Carrito vacío";

    divCarrito.appendChild(mensaje);
    return;
  }

  let total = 0;

  carrito.forEach(item => {
    total += item.precio * item.cantidad;

    // 1. Crear el contenedor del producto
    const divItem = document.createElement("div");
    divItem.classList.add("item-carrito");

    // 2. Insertar la estructura básica sin los eventos onchange/onclick
    divItem.innerHTML = `
      <img src="${item.imagen || './archivo/placeholder.png'}" width="50" alt="${item.titulo || 'Producto'}">

      <button class="btn-eliminar">X</button>
      <p>${item.titulo}</p>
      <input type="number" class="input-cantidad" value="${item.cantidad}" min="1">
      <p>$${item.precio * item.cantidad}</p>      
    `;

    // 3. Buscar el input dentro de este div y asignarle el evento de forma segura
    const inputCantidad = divItem.querySelector(".input-cantidad");
    inputCantidad.addEventListener("change", (e) => {
      cambiarCantidad(item.id, e.target.value);
      // cambiarCantidad(item.id, parseInt(e.target.value));
    });

    // 4. Buscar el botón eliminar y asignarle su evento
    const btnEliminar = divItem.querySelector(".btn-eliminar");
    btnEliminar.addEventListener("click", () => {
      eliminarDelCarrito(item.id);
    });

    // 5. Meter el producto terminado dentro del carrito principal
    divCarrito.appendChild(divItem);
  });

  const divTotal = document.createElement("div");
  divTotal.classList.add("total-carrito");
  divTotal.innerHTML = `<h3>Total: $${total}</h3>`;
  divCarrito.appendChild(divTotal);

  const divPago = document.createElement("div");
  divPago.classList.add("forma-pago");

  divPago.innerHTML = `
    <h3>Forma de pago</h3>

    <label>
        <input type="radio" name="pago" value="efectivo" checked>
        Efectivo
    </label><br>

    <label>
        <input type="radio" name="pago" value="debito">
        Tarjeta de débito
    </label><br>

    <label>
        <input type="radio" name="pago" value="credito">
        Tarjeta de crédito
    </label><br>

    <label>
        <input type="radio" name="pago" value="transferencia">
        Transferencia
    </label>
  `;

  divCarrito.appendChild(divPago);

  const btnComprar = document.createElement("button");
  btnComprar.textContent = "Finalizar compra";
  btnComprar.classList.add("btn-comprar");

  btnComprar.addEventListener("click", finalizarCompra);

  divCarrito.appendChild(btnComprar);

  function finalizarCompra() {
    const formaPago = document.querySelector(
      'input[name="pago"]:checked'
    ).value;

    console.log("Forma de pago:", formaPago);
    cerrarCarrito();
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarContadorCarrito();
  }
}


function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  mostrarCarrito();
}

function cambiarCantidad(id, nuevaCantidad) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;
  item.cantidad = parseInt(nuevaCantidad);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  mostrarCarrito();
}

function actualizarContadorCarrito() {
  const elementoContador = document.getElementById("contador-carrito");

  if (elementoContador) {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    elementoContador.textContent = totalItems;
  }
}

function cerrarCarrito() {
  console.log("cerrar carrito");
  document.getElementById("overlay-carrito").classList.remove("activo");
}

function salir() {
  localStorage.removeItem("usuario");
  localStorage.removeItem("carrito");
  carrito = [];

  mIngreso.classList.add("oculto");
  botones.classList.remove("oculto");

  mostrarMensaje("Sesión cerrada");
}