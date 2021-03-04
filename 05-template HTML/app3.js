// seleccionamos el elemento
const lista = document.getElementById("lista-dinamica");
// array
const arrayItem = ["item 1", "item 2", "item 3"];
// creamos el fragment para evitar el reflow
const fragment = document.createDocumentFragment();
// seleccionamos el template
const template = document.querySelector("#template-li").content;

// creamos el forEach para recorrer el array
arrayItem.forEach((item) => {
    // seleccionamos el contenido del span para modificarlo
  template.querySelector("span").textContent = item;
//   clonamos el template
  const clone = template.cloneNode(true);
//   insertamos el clone al fragment
  fragment.appendChild(clone);
});

// empujamos o pintamos el fragment
lista.appendChild(fragment);