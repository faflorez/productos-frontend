import React, { useEffect, useState } from 'react';
import api from './api';
import ProductoForm from './ProductoForm';
import ProductoList from './ProductoList';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  // cargar lista de productos al iniciar
  const cargarProductos = async () => {
    try {
      const res = await api.get('/');
      setProductos(res.data);
    } catch (error) {
      console.error('Error al cargar productos', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // crear producto
  const crearProducto = async (producto) => {
    try {
      const res = await api.post('/', producto);
      setMensaje('Producto creado correctamente.');
      setProductos([...productos, res.data]);
    } catch (error) {
      console.error(error);
      alert('Error al crear producto');
    }
  };

  // actualizar producto
  const actualizarProducto = async (producto) => {
    try {
      const res = await api.put(`/${productoEditando.id}`, producto);
      setProductos(
        productos.map((p) => (p.id === productoEditando.id ? res.data : p))
      );
      setProductoEditando(null);
      setMensaje('Producto actualizado correctamente.');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar producto');
    }
  };

  // eliminar producto
  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Deseas eliminar este producto?')) return;
    try {
      await api.delete(`/${id}`);
      setProductos(productos.filter((p) => p.id !== id));
      setMensaje('Producto eliminado.');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar producto');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Gestión de Productos</h2>

      {mensaje && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {mensaje}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMensaje('')}
          ></button>
        </div>
      )}

      <div className="row">
        <div className="col-md-5">
          <ProductoForm
            onSubmit={productoEditando ? actualizarProducto : crearProducto}
            productoEditando={productoEditando}
            cancelarEdicion={() => setProductoEditando(null)}
          />
        </div>
        <div className="col-md-7">
          <ProductoList
            productos={productos}
            onEditar={(p) => setProductoEditando(p)}
            onEliminar={eliminarProducto}
          />
        </div>
      </div>
    </div>
  );
}
