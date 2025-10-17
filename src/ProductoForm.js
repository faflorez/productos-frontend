import React, { useEffect, useState } from 'react';

export default function ProductoForm({ onSubmit, productoEditando, cancelarEdicion }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');

  useEffect(() => {
    if (productoEditando) {
      setNombre(productoEditando.nombre);
      setPrecio(productoEditando.precio);
      setCantidad(productoEditando.cantidad);
    } else {
      setNombre('');
      setPrecio('');
      setCantidad('');
    }
  }, [productoEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || precio <= 0 || cantidad < 0) {
      alert('Verifica los campos. Todos son obligatorios.');
      return;
    }
    onSubmit({ nombre, precio: parseFloat(precio), cantidad: parseInt(cantidad) });
  };

  return (
    <div>
      <h5>{productoEditando ? 'Editar producto' : 'Nuevo producto'}</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Precio</label>
          <input
            type="number"
            className="form-control"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Cantidad</label>
          <input
            type="number"
            className="form-control"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit">
            {productoEditando ? 'Actualizar' : 'Crear'}
          </button>
          {productoEditando && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelarEdicion}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}