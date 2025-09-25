// Base de datos de productos
const productos = [
    {
        id: 1,
        nombre: "Mezcal Espadín Joven",
        categoria: "mezcales",
        imagen: "IMAGES/botellas2.jpg",  // 👈 AQUÍ
        descripcion: "Mezcal artesanal elaborado con agave Espadín...",
        sabor: "Ahumado con notas cítricas y herbales",
        cantidad: "750 ml",
        precio: 450
    },




    {
        id: 2,
        nombre: "Mezcal Tobalá Reposado",
        categoria: "reposados",
        imagen: "IMAGES/botellas2.jpg",
        descripcion: "Mezcal de agave Tobalá reposado en barrica de roble por 6 meses.",
        sabor: "Dulce con notas de vainilla y caramelo",
        cantidad: "750 ml",
        precio: 780
    },
    {
        id: 3,
        nombre: "Destilado de Cempasúchil",
        categoria: "destilados",
        imagen: "IMAGES/botellas2.jpg",
        descripcion: "Destilado artesanal con flor de cempasúchil, de aroma floral y sabor único.",
        sabor: "Floral con notas dulces y especiadas",
        cantidad: "500 ml",
        precio: 520
    },
    {
        id: 4,
        nombre: "Mezcal Curado de Mango",
        categoria: "curados",
        imagen: "IMAGES/botellas2.jpg",
        descripcion: "Mezcal artesanal infusionado con mango natural, perfecto para paladares dulces.",
        sabor: "Dulce con intenso sabor a mango maduro",
        cantidad: "750 ml",
        precio: 380
    },
    {
        id: 5,
        nombre: "Crema de Mezcal con Café",
        categoria: "cremas",
        imagen: "IMAGES/botellas2.jpg",
        descripcion: "Deliciosa crema de mezcal combinada con café oaxaqueño de altura.",
        sabor: "Cremoso con intenso sabor a café",
        cantidad: "500 ml",
        precio: 320
    },
    {
        id: 6,
        nombre: "Mezcal Avocado con Hierbas",
        categoria: "avocados",
        imagen: "IMAGES/botellas2.jpg",
        descripcion: "Mezcal avocado infusionado con hierbas de la región, ideal para cócteles.",
        sabor: "Herbal con notas cítricas y terrosas",
        cantidad: "750 ml",
        precio: 550
    },
    {
        id: 7,
        nombre: "Botella Coleccionable Edición Especial",
        categoria: "recuerdos",
        imagen: "IMAGES/botellas2.jpg",
        descripcion: "Botella de mezcal con diseño artesanal único, perfecta como regalo o recuerdo.",
        sabor: "Mezcal Espadín con notas ahumadas",
        cantidad: "750 ml",
        precio: 650
    },
    {
        id: 8,
        nombre: "Playera Mezcal Artesanal",
        categoria: "merch",
        imagen: "IMAGES/botellas2.jpg",
        descripcion: "Playera de algodón con diseño exclusivo de nuestra marca.",
        sabor: "N/A",
        cantidad: "Talla M",
        precio: 250
    },
    {
        id: 9,
        nombre: "Mezcal Coyote Silvestre",
        categoria: "mezcales",
        imagen: "IMAGES/botellas2.jpg",
        descripcion: "Mezcal de agave Coyote silvestre, de sabor intenso y complejo.",
        sabor: "Intenso con notas minerales y especiadas",
        cantidad: "750 ml",
        precio: 920
    },
    {
        id: 10,
        nombre: "Mezcal Madrecuixe Añejo",
        categoria: "reposados",
        imagen: "IMAGES/botellas2.jpg",
        descripcion: "Mezcal de agave Madrecuixe añejado por 1 año en barrica de roble.",
        sabor: "Complejo con notas de madera y frutos secos",
        cantidad: "750 ml",
        precio: 1100
    },

    {
        id: 11,
        nombre: "Mezcal Toabala Silvestre",
        categoria: "mezcales",
        imagen: "IMAGES/cremaM.jpg",
        descripcion: "Mezcal de agave Coyote silvestre, de sabor intenso y complejo.",
        sabor: "Intenso con notas minerales y especiadas",
        cantidad: "750 ml",
        precio: 920
    }
];

// Función para cargar productos en el catálogo
function cargarProductos(categoria = 'todos') {
    const grid = document.getElementById('productos-grid');
    grid.innerHTML = '';

    const productosFiltrados = categoria === 'todos'
        ? productos
        : productos.filter(producto => producto.categoria === categoria);

    productosFiltrados.forEach(producto => {
        const productoHTML = `
            <div class="producto-card" data-id="${producto.id}">
                <div class="producto-imagen">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p class="producto-precio">$${producto.precio} MXN</p>
                    <button class="btn-secondary ver-producto" data-id="${producto.id}">Ver Detalles</button>
                </div>
            </div>
        `;
        grid.innerHTML += productoHTML;
    });

    // Agregar event listeners a los botones de ver producto
    document.querySelectorAll('.ver-producto').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            abrirModalProducto(id);
        });
    });
}

// Función para abrir el modal del producto
function abrirModalProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    document.getElementById('modal-img').src = producto.imagen;
    document.getElementById('modal-img').alt = producto.nombre;
    document.getElementById('modal-titulo').textContent = producto.nombre;
    document.getElementById('modal-descripcion').textContent = producto.descripcion;
    document.getElementById('modal-sabor').textContent = producto.sabor;
    document.getElementById('modal-cantidad').textContent = producto.cantidad;
    document.getElementById('modal-precio').textContent = producto.precio;

    document.getElementById('modal-producto').style.display = 'block';
}

// Función para inicializar los filtros de categoría
function inicializarFiltros() {
    document.querySelectorAll('.categoria-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // Remover clase active de todos los botones
            document.querySelectorAll('.categoria-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Agregar clase active al botón clickeado
            e.target.classList.add('active');

            // Cargar productos de la categoría seleccionada
            const categoria = e.target.getAttribute('data-categoria');
            cargarProductos(categoria);
        });
    });
}

// Cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    inicializarFiltros();

    // Cerrar modal al hacer clic en la X
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('modal-producto').style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('modal-producto');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});