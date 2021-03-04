// fragment soluciona el reflow
// seleccionamos el elemento
const lista = document.getElementById('lista');

// array
const arrayItem = ["item 1", "item 2", "item 3"];

// creamos el fragment y así guardamos toda la estructura html
const fragment = document.createDocumentFragment();

// hacemos el ciclo forEach
arrayItem.forEach(item => {
    // creamos el li
    const li = document.createElement('li');
    // insertamos el array
    li.textContent = item;
    // guardamos los items en fragment
    // insertamos el nodo anterior. o sea, devuelve el primer hijo del nodeo en el arbol
    const childNode = fragment.firstChild;

    fragment.insertBefore(li, childNode);
})
// pintamos el fragment en la página
lista.appendChild(fragment);
