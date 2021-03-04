// accedemos al div cards, al tbody items y al tr footer para poder manipulalrlos y pintarlos
const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');

// accedemos al template de los cards, template-footer y template-carrito. Content es para acceder a los elementos
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;

// creamos el fragment que es una memoria volatil. Sirve para todos los templates
const fragment = document.createDocumentFragment();

// Cuando le damos al botón comprar, creamos un objeto vacío para meter toda la información
let carrito = {};

// EVENTOS
// esperamos que se lea todo el documento
document.addEventListener('DOMContentLoaded', () => {
    fetchData();

    // una vez leida la página y si hay un carrito en la página , lo leemos de localStorage que lo hemos guardado más abajo
    if(localStorage.getItem('carrito')) {
        // si hay carrito, lo guardamos
        carrito = JSON.parse(localStorage.getItem('carrito'));
        // y pintamos el carrito
        pintarCarrito();
    }
});

// usamos eventDelegation para detectar el click en el botón. Una vez capturado el evento, lo pasamos a addCarrito
cards.addEventListener('click', e => {
    addCarrito(e);
}) 

// aquí detectamos los botones de sumar y restar productos. Y usamos event Delegation
items.addEventListener('click', e => { 
    btnAumentarDisminuir(e);
})


// leemos el json con fetch. Con Fetch traeríamos los datos de la base de datos
const fetchData = async () => {
    try {
        // leemos la API
        const res = await fetch('api.json');
        // guardamos la data
        const data = await res.json();
        // console.log(data);
        // pintamos las cards con la función pintarCards
        pintarCards(data);


    } catch (error) {
        // leemos el error
        console.log(error);
    }
}

// Tenemos que pintar las cards
const pintarCards = data => {
    // recorremos la data con forEach por que está en json
    data.forEach(producto => {
        // Traemos el título y lo pintamos con clone
        templateCard.querySelector('h5').textContent = producto.title;
        templateCard.querySelector('p').textContent = producto.precio;
        templateCard.querySelector('img').setAttribute('src', producto.thumbnailUrl);
        // cuando le demos al botón de comprar, el botón debe de traer el id del producto y para eso lo tenemos que traer con dataset
        templateCard.querySelector('.btn-dark').dataset.id = producto.id;


        // una vez traemos la información la pintamos con clone y para evitar el reflow usamos Fragment
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    // para que lo muestre por pantalla agregamos el fragment a cards
    cards.appendChild(fragment);
}



// función addCarrito. Esta función lo que hace es coger todo el div del producto seleccionado. Para pasarla a setCarrito
// Tenemos que detectar el botón con e.target.classList.contains('btn-dark')
const addCarrito = e => {
    // console.log(e.target);
    // console.log(e.target.classList.contains('btn-dark'));
    // si le hemos dado al botón, entonces lo agregamos al carrito
    if(e.target.classList.contains('btn-dark')) {
        // empujamos todos los elementos del producto a la función setCarrito
        setCarrito(e.target.parentElement);
    }
    // detenemos cualquier otro evento que se pueda generar en cards
    e.stopPropagation();
}


// creamos una función para manipular nuestro carrito.
// cuando le demos al botón comprar vamos a empujar a todos los elementos de dicho producto a este objeto
const setCarrito = objeto => {
    // console.log(objeto);
    // guardamos los datos en este objeto
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    // ahora tenemos que preguntar si el producto existe ya en el carrito por si ya lo hemos elegido y queremos aumentar la cantidad
    // es por si le damos más de una vez al botón comprar. Así aumenta la cantidad en uno.
    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    // empujamos al objeto producto al objeto carrito. Lo copiamos
    carrito[producto.id] = {...producto};
    // llamamos a la función pintarCarrito
    pintarCarrito();
}


// creamos la función para pintar el carrito
const pintarCarrito = () => {
    // para que no se repita lo elegido limpiamos el html
    items.innerHTML = '';
    // console.log(carrito);
    // tenemos que recorrer el objeto carrito y como es un objeto tenemos que utilizar Object.values para poder recorrerlo con forEach
    Object.values(carrito).forEach(producto => {
        // usamos el template de carrito y accedemos al th
        templateCarrito.querySelector('th').textContent = producto.id;
        // tenemos que acceder al primer td y está en la posición 0. y al segundo td que está en la posición 1.Usamos querySelectorAll por que hay más de un td.
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
        // accedemos al primer botón de agregar y al de restar
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;
        // accedemos al span para mostrar el total del precio
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad;

        // clonamos todo lo de arriba
        const clone = templateCarrito.cloneNode(true);
        // toca usar el fragment para el reflow
        fragment.appendChild(clone);
    })
    // pintamos el carrito
    items.appendChild(fragment);
    
    // llamamos a pintar footer
    pintarFooter();

    // guardamos el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// creamos la función pintarFooter
const pintarFooter = () => {
    // quitamos el texto Carrito vacío - comience a comprar! cuando compramos
    footer.innerHTML = '';
    // creamos un if para comprobar que el carrito lleva algo y si no lleva nada, entonces pintamos de nuevo el texto comience a comprar!
    if(Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        // tenemos que hacer que se salga de pintarFooter. Lo hacemos con un return
        return;
    }
     
    // tenemos que sumar todas las cantidades para mostrarlas en el footer y como es un objeto, volvemos a usar Object.values para que sea un array y usamos reduce() para ir acumulando las cantidades. acc es acumulador
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0);
    // hacemos lo mismo que con nCantidad. Acumulamos el precio de todo lo comprado
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0);
    
    // ahora tenemos que pintarlo en el template
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    // lo clonamos y fragment
    const clone = templateFooter.cloneNode(true);
    // toca usar el fragment para el reflow
    fragment.appendChild(clone);

    // pintamos el footer
    footer.appendChild(fragment);

    // para usar el botón de vaciar carrito podíamos hacerlo con event delegation, pero lo vamos a hacer con el id
    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click', () => {
        // para vaciar el carrito dejamos el objeto vacío
        carrito = {};
        // llamamos a pintarCarrito
        pintarCarrito();
    })
}

// detectamos los botones de agregar y restar productos. btnAccion lo detectamos arriba
const btnAumentarDisminuir = e => {
    // botón aumentar- si es el botón de aumentar
    if(e.target.classList.contains('btn-info')) {
        console.log(carrito[e.target.dataset.id]);
        // traemos el objeto y lo guardamos en producto
        const producto = carrito[e.target.dataset.id];
        // en el objeto producto le sumamos 1 a la cantidad que traiga.
        // esta linea la podemos sustituir por producto.cantidad++
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1; 
        // carrito en su indice va a ser una copia de producto
        carrito[e.target.dataset.id] = {...producto};
        // pintamos el carrito para que se vea en pantalla
        pintarCarrito();
    }

    // ahora el botón disminuir
    if(e.target.classList.contains('btn-danger')) {
        // console.log(carrito[e.target.dataset.id]);
        // traemos el objeto y lo guardamos en producto
        const producto = carrito[e.target.dataset.id];
        // en el objeto producto le sumamos 1 a la cantidad que traiga.
        // esta linea la podemos sustituir por producto.cantidad++
        producto.cantidad--; 

        // hay que tener en cuenta que si al eliminar se queda en cero, debemos de eliminar ese objeto
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id];
        } 

        // pintamos el carrito para que se vea en pantalla
        pintarCarrito();
    }

    // detenemos cualquier otro evento que se pueda generar
    e.stopPropagation();
}