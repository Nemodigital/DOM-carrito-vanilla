// caso 1
// insertar un elemento a una lista
// capturamos la lista
const lista = document.getElementById('lista')
// creamos el elemento li
const li = document.createElement('li')
// agregamos el texto 
li.textContent = 'primer elemento'

// como ya lo tenemos en javascript, ahora lo agregamos al documento
lista.appendChild(li)


// caso 2
// insertar el contenido de un array a una lista
const arrayElement = ['primer elemento', 'segundo elemento', 'tercer elemento']
    arrayElement.forEach(item => {
    // console.log(item)
    const li = document.createElement('li')
    li.textContent = item
    // como ya lo tenemos en javascript, ahora lo agregamos al documento
    lista.appendChild(li)
        
})


// caso 3
// insertar el contenido de un array a una lista con html
// suele ocasionar problemas por el reflow
const lista_html = document.getElementById('lista-html')

const arrayElement2 = ['primer elemento', 'segundo elemento', 'tercer elemento']

arrayElement2.forEach(item => {
    lista_html.innerHTML += `<li>${item}</li>`
})
