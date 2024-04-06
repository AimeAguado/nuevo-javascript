const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
});
let carritojava = JSON.parse(localStorage.getItem('carrito')) || [];
let totalCompra = 0;

const carritoElement = document.getElementById('carrito');
const totalElement = document.getElementById('total');
const formulario = document.getElementById('formulario');
const agregarBtn = document.getElementById('agregarBtn');
const eliminarBtn = document.getElementById('eliminarBtn');

function actualizarTotal() {
    totalCompra = 0;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        totalCompra += parseFloat(checkbox.getAttribute('data-precio'));
    });
    totalElement.textContent = totalCompra;
}

agregarBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const nombre = checkbox.getAttribute('name');
        carritojava.push(nombre);
    });
    actualizarCarrito();
    guardarCarritoEnStorage();
});

function eliminarUltimoProducto() {
    carritojava.pop();
    actualizarCarrito();
    guardarCarritoEnStorage();
    actualizarTotal();
}

function actualizarCarrito() {
    carritoElement.innerHTML = ''; 
    carritojava.forEach(producto => {
        const productoElement = document.createElement('p');
        productoElement.textContent = producto;
        carritoElement.appendChild(productoElement);
    });
}

function guardarCarritoEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carritojava));
}

eliminarBtn.addEventListener('click', () => {
    if (carritojava.length > 0) {
        eliminarUltimoProducto();
        desmarcarCheckboxes();
    } else {
        console.log("El carrito está vacío.");
    }
});

function desmarcarCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    actualizarTotal();
}

actualizarCarrito();

actualizarTotal();

formulario.addEventListener('change', actualizarTotal);
const mensajeDiv = document.getElementById('mensaje');

function mostrarMensaje(mensaje) {
    mensajeDiv.textContent = mensaje;
}
mostrarMensaje('¡Bienvenido!');

console.clear();


const triggerErrorButton = document.getElementById('triggerError');
const errorMessageDiv = document.getElementById('errorMessage');

triggerErrorButton.addEventListener('click', () => {
    try {
        const resultado = 10 / 0;
    } catch (error) {
        
        mostrarError(error.message);
    } finally {
    
        console.log('Se ejecuta siempre, independientemente de si hay un error o no');
    }
});

function mostrarError(mensaje) {
    errorMessageDiv.textContent = mensaje;
    errorMessageDiv.classList.remove('hidden');
    errorMessageDiv.classList.add('error');
}
const productos = [];

const divs = document.querySelectorAll('form > div');

divs.forEach(div => {
    const input = div.querySelector('input[type="checkbox"]');
    const nombre = input.getAttribute('name');
    const precio = parseFloat(input.getAttribute('data-precio'));
    
    productos.push({ nombre, precio });
});

const productosJSON = JSON.stringify(productos, null, 2);


console.log(productosJSON);

fetch('productos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo de productos');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });
