// Carrito de compras
let carrito = [];

// Función para agregar producto al carrito
function agregarAlCarrito(productoId, cantidad = 1) {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;

    const productoEnCarrito = carrito.find(item => item.id === productoId);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
    } else {
        carrito.push({
            ...producto,
            cantidad: cantidad
        });
    }

    actualizarCarrito();
    mostrarNotificacion('Producto agregado al carrito');
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarCarrito();
}

// Función para actualizar cantidad de producto en el carrito
function actualizarCantidad(productoId, nuevaCantidad) {
    if (nuevaCantidad < 1) {
        eliminarDelCarrito(productoId);
        return;
    }

    const productoEnCarrito = carrito.find(item => item.id === productoId);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad = nuevaCantidad;
    }

    actualizarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    const contadorCarrito = document.getElementById('contador-carrito');
    const subtotalElement = document.getElementById('subtotal');
    const envioElement = document.getElementById('envio');
    const totalElement = document.getElementById('total');

    // Actualizar contador
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    contadorCarrito.textContent = totalItems;

    // Actualizar lista de productos en el carrito
    carritoItems.innerHTML = '';

    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p>Tu carrito está vacío</p>';
        subtotalElement.textContent = '0';
        envioElement.textContent = '0';
        totalElement.textContent = '0';
        return;
    }

    let subtotal = 0;

    carrito.forEach(item => {
        const itemTotal = item.precio * item.cantidad;
        subtotal += itemTotal;

        const itemHTML = `
            <div class="carrito-item">
                <div class="carrito-item-imagen">
                    <img src="${item.imagen}" alt="${item.nombre}">
                </div>
                <div class="carrito-item-info">
                    <h4>${item.nombre}</h4>
                    <p>$${item.precio} MXN</p>
                    <div class="carrito-item-cantidad">
                        <button class="disminuir" data-id="${item.id}">-</button>
                        <input type="number" value="${item.cantidad}" min="1" data-id="${item.id}">
                        <button class="aumentar" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="eliminar-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        carritoItems.innerHTML += itemHTML;
    });

    // Calcular envío (gratis para compras mayores a $1000)
    const envio = subtotal > 1000 ? 0 : 150;
    const total = subtotal + envio;

    subtotalElement.textContent = subtotal.toFixed(2);
    envioElement.textContent = envio.toFixed(2);
    totalElement.textContent = total.toFixed(2);

    // Agregar event listeners a los botones del carrito
    document.querySelectorAll('.disminuir').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const item = carrito.find(item => item.id === id);
            if (item) {
                actualizarCantidad(id, item.cantidad - 1);
            }
        });
    });

    document.querySelectorAll('.aumentar').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const item = carrito.find(item => item.id === id);
            if (item) {
                actualizarCantidad(id, item.cantidad + 1);
            }
        });
    });

    document.querySelectorAll('.carrito-item-cantidad input').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const nuevaCantidad = parseInt(e.target.value);
            if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
                actualizarCantidad(id, nuevaCantidad);
            }
        });
    });

    document.querySelectorAll('.eliminar-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            eliminarDelCarrito(id);
        });
    });
}

// Función para mostrar notificación
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #8b4513;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 3000;
        transition: opacity 0.3s;
    `;

    document.body.appendChild(notificacion);

    // Remover notificación después de 3 segundos
    setTimeout(() => {
        notificacion.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Inicializar funcionalidades del carrito
document.addEventListener('DOMContentLoaded', () => {
    // Agregar producto desde el modal
    document.getElementById('agregar-carrito-modal').addEventListener('click', () => {
        const productoId = parseInt(document.getElementById('modal-titulo').getAttribute('data-id'));
        const cantidad = parseInt(document.getElementById('cantidad').value) || 1;

        agregarAlCarrito(productoId, cantidad);
        document.getElementById('modal-producto').style.display = 'none';
    });

    // Proceder al pago
    document.getElementById('proceder-pago').addEventListener('click', () => {
        if (carrito.length === 0) {
            mostrarNotificacion('Agrega productos al carrito antes de proceder al pago');
            return;
        }

        // Desplazarse a la sección de pago
        document.getElementById('pago').scrollIntoView({ behavior: 'smooth' });
    });

    // Procesar formulario de pago
    document.getElementById('form-pago').addEventListener('submit', (e) => {
        e.preventDefault();

        // Validar formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;
        const tarjeta = document.getElementById('tarjeta').value;
        const vencimiento = document.getElementById('vencimiento').value;
        const cvv = document.getElementById('cvv').value;

        // Validaciones básicas
        if (!nombre || !email || !telefono || !direccion || !tarjeta || !vencimiento || !cvv) {
            mostrarNotificacion('Por favor, completa todos los campos');
            return;
        }

        // Simular procesamiento de pago
        mostrarNotificacion('Procesando pago...');

        setTimeout(() => {
            // Guardar venta en la base de datos (simulado)
            guardarVenta();

            // Mostrar mensaje de éxito
            mostrarNotificacion('¡Pago realizado con éxito! Tu pedido está en proceso.');

            // Limpiar carrito
            carrito = [];
            actualizarCarrito();

            // Reiniciar formulario
            document.getElementById('form-pago').reset();
        }, 2000);
    });

    // Reservar tours
    document.querySelectorAll('.reservar-tour').forEach(button => {
        button.addEventListener('click', (e) => {
            const tour = e.target.getAttribute('data-tour');
            mostrarNotificacion(`Tour ${tour} reservado. Te contactaremos para confirmar.`);
        });
    });

    // Enviar formulario de contacto
    document.getElementById('form-contacto').addEventListener('submit', (e) => {
        e.preventDefault();
        mostrarNotificacion('Mensaje enviado. Te contactaremos pronto.');
        document.getElementById('form-contacto').reset();
    });
});

// Función para guardar venta (simulación)
function guardarVenta() {
    // En una implementación real, aquí se enviarían los datos al servidor
    const venta = {
        fecha: new Date().toISOString(),
        productos: carrito,
        total: carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0)
    };

    console.log('Venta guardada:', venta);
    // Aquí iría la llamada AJAX para guardar en la base de datos
}