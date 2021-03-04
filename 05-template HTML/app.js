// seleccionamos el elemento
const lista = document.querySelector('#lista');

// array
const arrayLista = ["item 1", "item 2", "item 3"];

// creamos el fragment para evitar el reflow
const fragment = document.createDocumentFragment();

// creamos el forEach para recorrer el array
arrayLista.forEach(item => {
    // creamos el elemento li
    const li = document.createElement('li');
    // creamos la clase list y la añadimos
    li.classList.add('list');
    // creamos el <b>
    const b = document.createElement('b');
    // insertamos Nombre
    b.textContent = 'Nombre: ';
    // metemos b dentro del li.. lo metemos más abajo para que estén todos los appendChildjuntos
    
    // creamos el elemento span
    const span = document.createElement('span');
    // creamos la clase del span
    span.classList.add('text-danger');
    // insertamos el texto.. como es dinámico ponemos item
    span.textContent = item;

    // metemos b dentro del li
    li.appendChild(b);
    // metemos span dentro del li
    li.appendChild(span);


    // agregamos el fragment por cada vuelta
    fragment.appendChild(li);

});

// una vez terminado el proceso agregamos el appendChild de fragment
lista.appendChild(fragment);


// este es el modelo que queremos crear

/* <li class="list">
  <b>Nombre: </b> <span class="text-danger">descripción...</span>
</li> */
