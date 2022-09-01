import { useReducer } from "react";

const initialState = {
  showPrecio: true,
  showSubcategorias: false,
  showTipos: false,
  subcategorias: [],
  tipos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CONDICION_MOSTRAR_PRECIO": {
      return {
        ...state,
        showPrecio: action.payload,
      };
    }
    case "MOSTRAR_PRECIO": {
      return {
        ...state,
        showPrecio: true,
      };
    }
    case "NO_MOSTRAR_PRECIO": {
      return {
        ...state,
        showPrecio: false,
      };
    }
    case "SET_SUBCATEGORIAS": {
      return {
        ...state,
        subcategorias: action.payload,
        showSubcategorias: true,
      };
    }
    case "UNSET_SUBCATEGORIAS": {
      return {
        ...state,
        subcategorias: [],
        showSubcategorias: false,
      };
    }
    case "SET_TIPOS": {
      return {
        ...state,
        tipos: action.payload,
        showTipos: true,
      };
    }
    case "UNSET_TIPOS": {
      return {
        ...state,
        tipos: [],
        showTipos: false,
      };
    }

    default:
      return state;
  }
};

export const useDatosCondicionales = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch];
};
