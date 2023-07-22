class Contacto {
    constructor(id, numero) {
      this.id = id;
      this.numero = numero;
      this.siguiente = null;
    }
  }
  
  class ListaContactos {
    constructor() {
      this.cabeza = null;
    }
  
    agregar(contacto) {
      if (this.cabeza === null || contacto.id < this.cabeza.id) {
        contacto.siguiente = this.cabeza;
        this.cabeza = contacto;
      } else {
        let actual = this.cabeza;
        while (actual.siguiente !== null && actual.siguiente.id < contacto.id) {
          actual = actual.siguiente;
        }
        contacto.siguiente = actual.siguiente;
        actual.siguiente = contacto;
      }
    }
  
    listar() {
      let actual = this.cabeza;
      const tbody = document.querySelector("#tabla-contactos tbody");
      tbody.innerHTML = "";
  
      while (actual !== null) {
        const fila = document.createElement("tr");
        const columnaId = document.createElement("td");
        const columnaNumero = document.createElement("td");
        const columnaAcciones = document.createElement("td");
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", function() {
          eliminarContacto(actual.id);
        });
        const botonActualizar = document.createElement("button");
        botonActualizar.textContent = "Actualizar";
        botonActualizar.addEventListener("click", function() {
          document.querySelector("#id-actualizar").value = actual.id;
          document.querySelector("#numero-actualizar").value = actual.numero;
        });
        columnaId.textContent = actual.id;
        columnaNumero.textContent = actual.numero;
        columnaAcciones.appendChild(botonEliminar);
        columnaAcciones.appendChild(botonActualizar);
        fila.appendChild(columnaId);
        fila.appendChild(columnaNumero);
        fila.appendChild(columnaAcciones);
        tbody.appendChild(fila);
        actual = actual.siguiente;
      }
    }
  }
  
  const listaContactos = new ListaContactos();
  
  function actualizarTabla() {
    listaContactos.listar();
  }
  
  const formularioAgregar = document.querySelector("#formulario-contactos");
  formularioAgregar.addEventListener("submit", function(evento) {
    evento.preventDefault();
    const idContacto = document.querySelector("#id-contacto").value;
    const numeroContacto = document.querySelector("#numero-contacto").value;
    const contacto = new Contacto(idContacto, numeroContacto);
    listaContactos.agregar(contacto);
    actualizarTabla();
    formularioAgregar.reset();
  });
  
  function eliminarContacto(id) {
    let actual = listaContactos.cabeza;
    let anterior = null;
  
    while (actual !== null && actual.id !== id) {
      anterior = actual;
      actual = actual.siguiente;
    }
    if (actual !== null) {
      if (anterior === null) {
        listaContactos.cabeza = actual.siguiente;
      } else {
        anterior.siguiente = actual.siguiente;
      }
      actualizarTabla();
    }
  }
  
  function buscar() {
    const id = document.querySelector("#id-actualizar").value;
    const contacto = buscarContacto(id);
    if (contacto !== null) {
      document.querySelector("#numero-actualizar").value = contacto.numero;
    } else {
      alert("Contacto no encontrado.");
    }
  }
  
  function actualizar() {
    const id = document.querySelector("#id-actualizar").value;
    const numero = document.querySelector("#numero-actualizar").value;
    actualizarContacto(id, numero);
    document.querySelector("#formulario-actualizar").reset();
  }
  
  function buscarContacto(id) {
    let actual = listaContactos.cabeza;
    while (actual !== null && actual.id !== id) {
      actual = actual.siguiente;
    }
    return actual;
  }
  
  function actualizarContacto(id, numero) {
    const contacto = buscarContacto(id);
    if (contacto !== null) {
      contacto.numero = numero;
      actualizarTabla();
    } else {
      alert("Contacto no encontrado.");
    }
  }
  
