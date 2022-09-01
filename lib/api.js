// console.log("Ambiente: ", process.env.NODE_ENV)
// const API_URL = process.env.NODE_ENV === 'production' ? process.env.BACKEND_API_URL_PROD : process.env.BACKEND_API_URL_LOCAL;
const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BACKEND_API_URL_LOCAL
    : process.env.NEXT_PUBLIC_BACKEND_API_URL_PROD;

async function fetchAPI(query, { variables } = {}) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // console.log("API URL", API_URL)
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getCategoriasGeneralesUriLabel() {
  const data = await fetchAPI(`
      {
        categorias_generales {
          uri_label
        }
      }
    `);
  return data?.categorias_generales;
}

export async function getAllCategoriasGenerales() {
  const data = await fetchAPI(`
      {
        categorias_generales {
          _id
          label
          uri_label
          has_subcategorias
        }
      }
    `);
  return data?.categorias_generales;
}

export async function getAllSubcategorias() {
  const data = await fetchAPI(`
      {
        subcategorias {
          _id
          _id_categoria_general
          label
          uri_label
          has_tipos
          _id_tipos
        }
      }
    `);
  return data?.subcategorias;
}

export async function getAllTipos() {
  const data = await fetchAPI(`
      {
        tipos {
          _id
          lista {
            valor
            label
          }
          _id_subcategoria
          _id_categoria_general
        }
      }
    `);
  return data?.tipos;
}

export async function getAllUnidadesDeMedida() {
  const data = await fetchAPI(`
  {
    unidades_de_medida {
      _id
      nombre
      nombre_singular
      nombre_plural
    }
  }
  `);
  return data?.unidades_de_medida;
}

export async function getAllOfertas() {
  const data = await fetchAPI(
    `
    {
      ofertas {
        _id
        titulo
        descripcion
        imagenUrl
        fecha_vencimiento
        precio
      }

    }
    `
  );
  return data?.ofertas;
}

export async function getAllDescargables() {
  const data = await fetchAPI(
    `
    {
      descargables {
        _id
        nombre
        archivo_url
        fecha_subido
        fecha_editado
      }
    }
    `
  );
  return data?.descargables;
}

export async function createOferta(datos) {
  const data = await fetchAPI(
    `
    mutation crearOferta($titulo: String!, $descripcion: String, 
      $imagenUrl: String,
      $fecha_vencimiento: String!, $precio: Float!) {
        createOferta(titulo: $titulo, 
          descripcion: $descripcion, 
          imagenUrl: $imagenUrl,
          fecha_vencimiento: $fecha_vencimiento,
          precio: $precio) {
            _id
            titulo
            descripcion
            imagenUrl
            fecha_vencimiento
            precio
          }
      }
    `,
    {
      variables: {
        titulo: datos.titulo,
        descripcion: datos.descripcion,
        imagenUrl: datos.imagenUrl,
        fecha_vencimiento: datos.fecha_vencimiento,
        precio: datos.precio,
      },
    }
  );
  return data?.createOferta;
}

export async function updateOferta(datos) {
  const data = await fetchAPI(
    `
    mutation editarOferta($_id_oferta: ID!, $titulo: String!, $descripcion: String, 
      $imagenUrl: String,
      $fecha_vencimiento: String!, $precio: Float!) {
        updateOferta(_id_oferta: $_id_oferta, 
          titulo: $titulo, 
          descripcion: $descripcion, 
          imagenUrl: $imagenUrl,
          fecha_vencimiento: $fecha_vencimiento,
          precio: $precio) {
            _id
            titulo
            descripcion
            imagenUrl
            fecha_vencimiento
            precio
          }
      }
    `,
    {
      variables: {
        _id_oferta: datos._id_oferta,
        titulo: datos.titulo,
        descripcion: datos.descripcion,
        imagenUrl: datos.imagenUrl,
        fecha_vencimiento: datos.fecha_vencimiento,
        precio: datos.precio,
      },
    }
  );
  return data?.updateOferta;
}

export async function deleteOferta(ofertaId) {
  const data = await fetchAPI(
    `
    mutation borrarOferta($_id_oferta: ID!) {
      deleteOferta(_id_oferta: $_id_oferta) {
        _id
        titulo
      }
    }
    `,
    {
      variables: {
        _id_oferta: ofertaId,
      },
    }
  );
  return data?.deleteOferta;
}

export async function createDescargable(datos) {
  const data = await fetchAPI(
    `
    mutation crearDescargable($nombre: String!, $archivo_url: String!, 
      $fecha_subido: String!, $fecha_editado: String!) {
        createDescargable(nombre: $nombre, archivo_url: $archivo_url, 
          fecha_subido: $fecha_subido, fecha_editado: $fecha_editado) {
            _id
            nombre
            archivo_url
            fecha_subido
            fecha_editado
          }
      }
  `,
    {
      variables: {
        nombre: datos.nombre,
        archivo_url: datos.archivo_url,
        fecha_subido: datos.fecha_subido,
        fecha_editado: datos.fecha_editado,
      },
    }
  );
  return data?.createDescargable;
}

export async function updateDescargable(datos) {
  const data = await fetchAPI(
    `
    mutation updateDescargable(
      $_id_descargable: ID!,
      $nombre: String!, $archivo_url: String!, 
      $fecha_subido: String!, $fecha_editado: String!) {
        updateDescargable(_id_descargable: $_id_descargable, 
          nombre: $nombre, archivo_url: $archivo_url, 
          fecha_subido: $fecha_subido, fecha_editado: $fecha_editado) {
            _id
            nombre
            archivo_url
            fecha_subido
            fecha_editado
          }
      }
  `,
    {
      variables: {
        _id_descargable: datos._id,
        nombre: datos.nombre,
        archivo_url: datos.archivo_url,
        fecha_subido: datos.fecha_subido,
        fecha_editado: datos.fecha_editado,
      },
    }
  );
  return data?.updateDescargable;
}

export async function deleteDescargable(descargableId) {
  const data = await fetchAPI(
    `
      mutation deleteDescargable($_id_descargable: ID!) {
        deleteDescargable(_id_descargable: $_id_descargable) {
          _id
          nombre
        }
      }
    `,
    {
      variables: {
        _id_descargable: descargableId,
      },
    }
  );

  return data?.deleteDescargable;
}

export async function getDescargablePorId(descargableId) {
  const data = await fetchAPI(
    `
    query getDescargablePorId($_id_descargable: ID!) {
      descargablePorId(_id_descargable: $_id_descargable) {
        _id
        nombre
        archivo_url
        fecha_subido
        fecha_editado
      }
    }
  `,
    {
      variables: {
        _id_descargable: descargableId,
      },
    }
  );

  return data?.descargablePorId;
}

export async function getAllProductos() {
  const data = await fetchAPI(`
      {
        productos {
          _id
          _id_categoria_general
          categoriaGeneral {
            _id
            label
            uri_label
          }
          nombre
          descripcion
          compra_minima
          unidadMedida {
            _id
            nombre
            nombre_singular
            nombre_plural
          }
          slug
          imagenUrl
          tipo
          mostrar_precio
          precio
          has_subcategoria
          _id_subcategoria
        }
      }
    `);
  return data?.productos;
}

export async function getAllProductosSlugs() {
  const data = await fetchAPI(`
      {
        productos {
          _id
          nombre
          slug
        }
      }
    `);
  return data?.productos;
}

export async function getProductoPorSlug(slug) {
  const data = await fetchAPI(
    `
      query getProductoPorSlug($slug: String!){
        productoPorSlug(slug: $slug) {
          _id
          _id_categoria_general
          categoriaGeneral {
            _id
            label
            uri_label
          }
          nombre
          descripcion
          compra_minima
          unidadMedida {
            _id
            nombre
            nombre_singular
            nombre_plural
          }
          imagenUrl
          slug
          tipo
          mostrar_precio
          precio
          has_subcategoria
          subcategoria {
            _id
            uri_label
            label
          }
        }
      }
      `,
    {
      variables: {
        slug: slug,
      },
    }
  );
  // console.log("Producto por slug: ", data.productoPorSlug);

  return data.productoPorSlug;
}

export async function createProducto(datos) {
  const data = await fetchAPI(
    `
    mutation crearProducto($_id_categoria_general: ID!, 
      $nombre: String!, $slug: String!, $imagenUrl: String, $descripcion: String!, 
      $compra_minima: Float!, $_id_unidad_de_medida: ID!, 
      $has_subcategoria: Boolean!, $_id_subcategoria: ID, $tipo: String, $mostrar_precio: Boolean!, $precio: Float!
      ) {
        createProducto(_id_categoria_general: $_id_categoria_general,
        nombre: $nombre, slug: $slug, imagenUrl: $imagenUrl, descripcion: $descripcion, 
        compra_minima: $compra_minima, _id_unidad_de_medida: $_id_unidad_de_medida, 
          has_subcategoria: $has_subcategoria, _id_subcategoria: $_id_subcategoria, 
          tipo: $tipo, mostrar_precio: $mostrar_precio, precio: $precio
        ) {
          
            _id
          nombre
          slug
          descripcion
          imagenUrl
          compra_minima
          unidadMedida {
            _id
            nombre
            nombre_singular
            nombre_plural
          }
          categoriaGeneral {
            _id
            label
            uri_label
          }
          subcategoria {
            _id
            label
            uri_label
          }
          tipo
          mostrar_precio
          precio  
        }
      }
    `,
    {
      variables: {
        _id_categoria_general: datos._id_categoria_general,
        nombre: datos.nombre,
        slug: datos.slug,
        imagenUrl: datos.imagenUrl,
        descripcion: datos.descripcion,
        compra_minima: datos.compra_minima,
        _id_unidad_de_medida: datos._id_unidad_de_medida,
        has_subcategoria: datos.has_subcategoria,
        _id_subcategoria: datos._id_subcategoria,
        tipo: datos.tipo,
        mostrar_precio: datos.mostrar_precio,
        precio: datos.precio,
      },
    }
  );
  // console.log("data.createProducto", data.createProducto)
  return data?.createProducto;
}

export async function updateProducto(datos) {
  const data = await fetchAPI(
    `
    mutation editarProducto($_id_producto: ID!, $_id_categoria_general: ID!, 
      $nombre: String!, $slug: String!, $imagenUrl: String, $descripcion: String!, 
      $compra_minima: Float!, $_id_unidad_de_medida: ID!, 
      $has_subcategoria: Boolean!, $_id_subcategoria: ID, $tipo: String, $mostrar_precio: Boolean!, $precio: Float!
      ) {
        updateProducto(_id_producto: $_id_producto, 
          _id_categoria_general: $_id_categoria_general,
        nombre: $nombre, slug: $slug, imagenUrl: $imagenUrl, descripcion: $descripcion,
        compra_minima: $compra_minima, _id_unidad_de_medida: $_id_unidad_de_medida, 
          has_subcategoria: $has_subcategoria, _id_subcategoria: $_id_subcategoria, 
          tipo: $tipo, mostrar_precio: $mostrar_precio, precio: $precio
        ) {
          _id
          nombre
          slug
          descripcion
          imagenUrl
          compra_minima
          unidadMedida {
            _id
            nombre
            nombre_singular
            nombre_plural
          }
          categoriaGeneral {
            _id
            label
            uri_label
          }
          subcategoria {
            _id
            label
            uri_label
          }
          tipo  
          mostrar_precio
          precio
        }
      }
    `,
    {
      variables: {
        _id_producto: datos._id_producto,

        _id_categoria_general: datos._id_categoria_general,
        nombre: datos.nombre,
        slug: datos.slug,
        imagenUrl: datos.imagenUrl,
        descripcion: datos.descripcion,
        compra_minima: datos.compra_minima,
        _id_unidad_de_medida: datos._id_unidad_de_medida,
        has_subcategoria: datos.has_subcategoria,
        _id_subcategoria: datos._id_subcategoria,
        tipo: datos.tipo,
        mostrar_precio: datos.mostrar_precio,
        precio: datos.precio,
      },
    }
  );
  return data?.updateProducto;
}

export async function deleteProducto(productoId) {
  const data = await fetchAPI(
    `
    mutation borrarProducto($_id_producto: ID!) {
      deleteProducto(_id_producto: $_id_producto) {
        _id
        nombre
      }
    }
    `,
    {
      variables: {
        _id_producto: productoId,
      },
    }
  );
  return data?.deleteProducto;
}
