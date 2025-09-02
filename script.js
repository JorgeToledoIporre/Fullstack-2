// ===================================
// DATOS DE PRODUCTOS
// ===================================
const productos = [
    {codigo: 'TC001', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.'},
    {codigo: 'TC002', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Frutas', precio: 50000, descripcion: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla.'},
    {codigo: 'TT001', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Vainilla', precio: 40000, descripcion: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce.'},
    {codigo: 'TT002', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Manjar', precio: 42000, descripcion: 'Torta tradicional chilena con manjar y nueces, un deleite para los sabores dulces.'},
    {codigo: 'PI001', categoria: 'Postres Individuales', nombre: 'Mousse de Chocolate', precio: 5000, descripcion: 'Postre individual cremoso y suave, hecho con chocolate de alta calidad.'},
    {codigo: 'PI002', categoria: 'Postres Individuales', nombre: 'Tiramisú Clásico', precio: 5500, descripcion: 'Un postre italiano individual con capas de café, mascarpone y cacao.'},
    {codigo: 'PSA001', categoria: 'Productos Sin Azúcar', nombre: 'Torta Sin Azúcar de Naranja', precio: 48000, descripcion: 'Torta ligera y deliciosa, endulzada naturalmente, ideal para opciones saludables.'},
    {codigo: 'PSA002', categoria: 'Productos Sin Azúcar', nombre: 'Cheesecake Sin Azúcar', precio: 47000, descripcion: 'Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.'},
    {codigo: 'PT001', categoria: 'Pastelería Tradicional', nombre: 'Empanada de Manzana', precio: 3000, descripcion: 'Pastelería tradicional rellena de manzanas especiadas.'},
    {codigo: 'PT002', categoria: 'Pastelería Tradicional', nombre: 'Tarta de Santiago', precio: 6000, descripcion: 'Tradicional tarta española hecha con almendras, azúcar, y huevos.'},
    {codigo: 'PG001', categoria: 'Productos Sin Gluten', nombre: 'Brownie Sin Gluten', precio: 4000, descripcion: 'Rico y denso, este brownie es perfecto para quienes evitan el gluten.'},
    {codigo: 'PG002', categoria: 'Productos Sin Gluten', nombre: 'Pan Sin Gluten', precio: 3500, descripcion: 'Suave y esponjoso, ideal para sándwiches o acompañar comidas.'},
    {codigo: 'PV001', categoria: 'Productos Vegana', nombre: 'Torta Vegana de Chocolate', precio: 50000, descripcion: 'Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal.'},
    {codigo: 'PV002', categoria: 'Productos Vegana', nombre: 'Galletas Veganas de Avena', precio: 4500, descripcion: 'Crujientes y sabrosas, estas galletas son una excelente opción saludable.'},
    {codigo: 'TE001', categoria: 'Tortas Especiales', nombre: 'Torta Especial de Cumpleaños', precio: 55000, descripcion: 'Diseñada especialmente para celebraciones, personalizable con decoraciones únicas.'},
    {codigo: 'TE002', categoria: 'Tortas Especiales', nombre: 'Torta Especial de Boda', precio: 60000, descripcion: 'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención.'}
];

// ===================================
// VARIABLES GLOBALES
// ===================================
let carrito = [];
let usuarioRegistrado = null;

// ===================================
// UTILIDADES BÁSICAS
// ===================================
const formatPrice = (price) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);

const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    if (hoy.getMonth() < nacimiento.getMonth() || (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
};

const esEmailDuoc = (email) => email.toLowerCase().includes('@duocuc.cl');

const esCumpleanos = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    return hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() === nacimiento.getDate();
};

// ===================================
// RENDERIZADO DE PRODUCTOS (Simplificado)
// ===================================
function renderizarProductos(productosAMostrar = productos) {
    const container = document.getElementById('productosContainer');
    if (!container) return;
    
    container.innerHTML = productosAMostrar.map(producto => `
        <div class="col-lg-4 col-md-6 mb-4" data-category="${producto.categoria}">
            <div class="card h-100">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text flex-grow-1">${producto.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="product-price">${formatPrice(producto.precio)}</span>
                        <span class="badge bg-secondary">${producto.categoria}</span>
                    </div>
                    <button class="btn btn-primary" onclick="agregarAlCarrito('${producto.codigo}')">
                        <i class="fas fa-cart-plus me-2"></i>Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===================================
// SISTEMA DE CARRITO (Simplificado)
// ===================================
function agregarAlCarrito(codigo) {
    const producto = productos.find(p => p.codigo === codigo);
    if (!producto) return;

    const itemExistente = carrito.find(item => item.codigo === codigo);
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    actualizarCarrito();
    mostrarToast(`${producto.nombre} agregado al carrito`, 'success');
}

function eliminarDelCarrito(codigo) {
    carrito = carrito.filter(item => item.codigo !== codigo);
    actualizarCarrito();
}

function actualizarCantidad(codigo, nuevaCantidad) {
    const item = carrito.find(item => item.codigo === codigo);
    if (item && nuevaCantidad > 0) {
        item.cantidad = nuevaCantidad;
        actualizarCarrito();
    } else if (nuevaCantidad <= 0) {
        eliminarDelCarrito(codigo);
    }
}

function actualizarCarrito() {
    const cartCounter = document.getElementById('cartCounter');
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    const checkoutBtn = document.getElementById('checkoutBtn');

    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    let totalPrice = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    // Aplicar descuentos
    let descuentoAplicado = 0;
    if (usuarioRegistrado?.edad >= 50) descuentoAplicado = 0.5;
    else if (usuarioRegistrado?.codigoDescuento === 'FELICES50') descuentoAplicado = 0.1;

    const totalFinal = totalPrice * (1 - descuentoAplicado);

    // Actualizar contador (usando Bootstrap badge)
    cartCounter.textContent = totalItems;
    cartCounter.classList.toggle('d-none', totalItems === 0);

    // Actualizar contenido
    if (carrito.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="fas fa-shopping-cart fa-3x mb-3"></i>
                <p>Tu carrito está vacío</p>
            </div>`;
        document.getElementById('cartTotal').classList.add('d-none');
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = carrito.map(item => `
            <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${item.nombre}</h6>
                    <small class="text-muted">${formatPrice(item.precio)} c/u</small>
                </div>
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-outline-secondary" onclick="actualizarCantidad('${item.codigo}', ${item.cantidad - 1})">-</button>
                    <span class="btn btn-sm btn-outline-secondary disabled">${item.cantidad}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="actualizarCantidad('${item.codigo}', ${item.cantidad + 1})">+</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito('${item.codigo}')"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');

        document.getElementById('cartTotal').classList.remove('d-none');
        totalAmount.innerHTML = `
            ${descuentoAplicado > 0 ? `
                <div class="d-flex justify-content-between"><span>Subtotal:</span><span>${formatPrice(totalPrice)}</span></div>
                <div class="d-flex justify-content-between text-success"><span>Descuento:</span><span>-${formatPrice(totalPrice * descuentoAplicado)}</span></div>
                <hr>` : ''}
            <div class="d-flex justify-content-between"><strong>Total: <span>${formatPrice(totalFinal)}</span></strong></div>
        `;
        checkoutBtn.disabled = false;
    }
}

// ===================================
// NOTIFICACIONES (Bootstrap Toast)
// ===================================
function mostrarToast(mensaje, tipo = 'success') {
    // Crear container si no existe
    let toastContainer = document.querySelector('.toast-container') || 
        Object.assign(document.createElement('div'), {className: 'toast-container position-fixed bottom-0 end-0 p-3'});
    
    if (!document.querySelector('.toast-container')) document.body.appendChild(toastContainer);

    // Crear toast usando Bootstrap
    const toastElement = Object.assign(document.createElement('div'), {
        className: `toast align-items-center text-bg-${tipo} border-0`,
        innerHTML: `
            <div class="d-flex">
                <div class="toast-body"><i class="fas fa-check-circle me-2"></i>${mensaje}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>`
    });

    toastContainer.appendChild(toastElement);
    new bootstrap.Toast(toastElement).show();
    
    // Auto-remove
    toastElement.addEventListener('hidden.bs.toast', () => toastElement.remove());
}

// ===================================
// FORMULARIOS (Bootstrap Validation)
// ===================================
function initializeForms() {
    // Bootstrap validation automática
    document.querySelectorAll('.needs-validation').forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            event.stopPropagation();
            
            if (form.checkValidity()) {
                if (form.id === 'registroForm') procesarRegistro();
                else if (form.id === 'contactoForm') procesarContacto();
            }
            
            form.classList.add('was-validated');
        });
    });
}

function procesarRegistro() {
    const datos = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        codigoDescuento: document.getElementById('codigoDescuento').value.toUpperCase()
    };

    const edad = calcularEdad(datos.fechaNacimiento);
    const esDuoc = esEmailDuoc(datos.email);
    const esCumple = esCumpleanos(datos.fechaNacimiento);

    usuarioRegistrado = { ...datos, edad, esDuoc, esCumple };

    // Mostrar beneficios usando Bootstrap Alert
    let beneficios = [];
    if (edad >= 50) beneficios.push('🎂 50% descuento por mayor de 50 años');
    if (datos.codigoDescuento === 'FELICES50') beneficios.push('🎉 10% descuento código FELICES50');
    if (esDuoc && esCumple) beneficios.push('🎓 ¡Torta gratis por cumpleaños!');
    else if (esDuoc) beneficios.push('🎓 Torta gratis en tu cumpleaños');

    document.getElementById('mensajeExito').innerHTML = `
        ¡Bienvenido/a ${datos.nombre}!
        ${beneficios.length ? '<br><br><strong>Beneficios:</strong><br>• ' + beneficios.join('<br>• ') : ''}
    `;
    
    document.getElementById('registroExito').classList.remove('d-none');
    document.getElementById('registroForm').reset();
    document.getElementById('registroForm').classList.remove('was-validated');
    
    actualizarCarrito();
    mostrarToast('¡Registro exitoso!');
}

function procesarContacto() {
    mostrarToast('¡Mensaje enviado exitosamente!');
    document.getElementById('contactoForm').reset();
    document.getElementById('contactoForm').classList.remove('was-validated');
}

// ===================================
// FILTROS (Simplificado)
// ===================================
function initializeFiltros() {
    // Filtros por categoría usando data attributes
    document.querySelectorAll('[data-category]').forEach(btn => {
        btn.addEventListener('click', function() {
            // Bootstrap button group active state
            document.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.category;
            const filtrados = category === 'all' ? productos : productos.filter(p => p.categoria === category);
            renderizarProductos(filtrados);
        });
    });

    // Búsqueda simple
    document.getElementById('searchProduct')?.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        const filtrados = productos.filter(p => 
            p.nombre.toLowerCase().includes(term) || 
            p.descripcion.toLowerCase().includes(term)
        );
        renderizarProductos(filtrados);
    });
}

// ===================================
// CHECKOUT (Simplificado)
// ===================================
function procesarCheckout() {
    if (carrito.length === 0) return;

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const descuento = usuarioRegistrado?.edad >= 50 ? 0.5 : usuarioRegistrado?.codigoDescuento === 'FELICES50' ? 0.1 : 0;
    const totalFinal = total * (1 - descuento);

    // Usar Bootstrap Modal o Alert nativo del navegador
    const mensaje = `
        🛒 PEDIDO CONFIRMADO
        
        Total: ${formatPrice(totalFinal)}
        ${descuento > 0 ? `Descuento aplicado: ${descuento * 100}%` : ''}
        
        ¡Gracias por tu compra!
        Te contactaremos pronto.
    `;

    if (confirm(mensaje)) {
        carrito = [];
        actualizarCarrito();
        bootstrap.Modal.getInstance(document.getElementById('cartModal'))?.hide();
        mostrarToast('¡Pedido confirmado!');
    }
}

// ===================================
// SMOOTH SCROLLING (Nativo)
// ===================================
function scrollToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

// ===================================
// INICIALIZACIÓN (Simplificada)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    initializeForms();
    initializeFiltros();
    
    // Event listener para checkout
    document.getElementById('checkoutBtn')?.addEventListener('click', procesarCheckout);
    
    // Smooth scrolling para enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            scrollToSection(anchor.getAttribute('href').substring(1));
        });
    });

    console.log('🍰 Pastelería 1000 Sabores - Versión simplificada cargada');
});

// ===================================
// FUNCIONES GLOBALES
// ===================================
window.scrollToSection = scrollToSection;
window.agregarAlCarrito = agregarAlCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;
window.actualizarCantidad = actualizarCantidad;