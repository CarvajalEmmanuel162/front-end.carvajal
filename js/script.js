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
btnRegistro.addEventListener("click", () =>mostrarFormulario(formRegistro));
irALogin.addEventListener("click", () => mostrarFormulario(formLogin));
irARegistro.addEventListener("click", () =>mostrarFormulario(formRegistro));
cerrarBtn.addEventListener("click", () => {
  overlay.classList.remove("activo");
});

const toast = document.getElementById("mensajeToast");

  function mostrarMensaje(texto, tipo = "sucecess") {
    toast.textContent = texto;
    toast.className = "toast";

    if(tipo==="error") toast.classList.add("error");

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

  if(usuario.nombre && usuario.email && usuario.password) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
    mostrarMensaje("Registro guardado con éxito");
    setTimeout(() => {
      formRegistro.classList.add("oculto");
      formLogin.classList.remove("oculto");
      formRegistro.classList.remove("activo");
      formLogin.classList.add("activo");
    },1000);//Este bloque del setTimeOut alterna al formLogin una vez registrado
  }else {
    mostrarMensaje("Completá todos los campos", "error");
  }
});

formLogin.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();

  const inputs = formLogin.querySelectorAll("input");
  const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

  if(usuarioGuardado && 
    inputs[0].value === usuarioGuardado.email && 
    inputs[1].value === usuarioGuardado.password) {
      mostrarMensaje("Ingresaste con éxito");
      setTimeout(() => overlay.classList.remove("activo"), 1000);
  }else {
    mostrarMensaje("Email o contraseña incorrectos", "error");
  }
});



//script para cargar fotos en div
fetch('./json/imagenes.json')
  .then(response => response.json())
  .then(data => {

    Object.keys(data).forEach(nombreGrupo => {
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
          <h3>${item.titulo}</h3>
        </div>

        <div class="card-back">
          <p>${item.descripcion}</p>
        </div>
      </div>
    `;

    contenedor.appendChild(card);

  });

}