import { getAllCategoriasGenerales, getAllProductos, getAllSubcategorias, getAllTipos, getAllProductosSlugs } from "./api";

export const getProductosPorCategoriaGeneralUriLabel = async (uriLabel) => {
  const allProductosApi = await getAllProductos();

  const categoriaGeneral = await getCategoriaGeneralPorUriLabel(uriLabel);

  // Filtrar productos por categoria general
  const productosApi = allProductosApi.filter((producto) => {
    return producto._id_categoria_general === categoriaGeneral._id;
  });

  return productosApi;
};

export const getCategoriaGeneralPorUriLabel = async (uriLabel) => {
  const allCategoriasGenerales = await getAllCategoriasGenerales();
  const categoriaGeneral = allCategoriasGenerales.find((el) => {
    return el.uri_label === uriLabel;
  });
  return categoriaGeneral;
};

export const getSubcategoriasYTiposDeCategoriaGeneral = async (catGenId) => {
  // Obtener subcategorias (que pertenezcan a esa categoriaGeneral) para mostrarlas en la UI
  const allSubcategorias = await getAllSubcategorias();
  const subcategorias = allSubcategorias.filter((subcategoria) => {
    return catGenId === subcategoria._id_categoria_general;
  });

  const allTipos = await getAllTipos();

  const subcategoriasConTipos = subcategorias.map((el) => {
    if (el.has_tipos) {
      // console.log("Label: ", el.label, el.tipos)
      const tipos = allTipos.find((tipo) => {
        return tipo._id_subcategoria === el._id;
      });
      return { subcategoria: el, tipos: tipos };
    } else {
      return { subcategoria: el, tipos: null };
    }
  });

  return subcategoriasConTipos;
};

export const createSlug = (nombre) => {
  let slug = nombre.toLowerCase().replace(/[\s||\/||\"||\']/g, "_")
  return slug
}

export const nombreTieneSlugDisponible = async (nombre, productoId) => {
  if (nombre === ""){
    return false
  }
  const todosSlugs = await getAllProductosSlugs();
  const slug = createSlug(nombre);
  // console.log("slug creado", slug)
  if (
    todosSlugs.find((el) => slug === el.slug && el._id !== productoId)
  ) {
    // console.log("Ese nombre ya está utilizado");
    return false;
  } else {
    // console.log("Si puedes usar ese nombre");
    return true;
  }
};

export const fechaDeEpochADate = (fechaEnEpoch) => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const fecha = new Date(parseInt(fechaEnEpoch));
  let fechaFormateada =
    fecha.getDate() +
    "/" +
    months[fecha.getMonth()] +
    "/" +
    fecha.getFullYear();
  return fechaFormateada;
};

export const locationCoordinates = { lat: 25.452473, lng: -100.9507 }

export const DEPLOY_HOOK_URL = "https://api.vercel.com/v1/integrations/deploy/QmXgcVU5RmcFAu999TnfX9aZbtFXKqtRTfYpNMZfL7hDLL/1K9BQvxQDt"
