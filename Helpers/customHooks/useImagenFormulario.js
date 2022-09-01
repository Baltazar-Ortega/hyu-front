import { useReducer } from "react";

const rutaLogoHorizontal = "/images/logo_horizontal.jpg";

const initialState = {
  file: null,
  pathPreview: rutaLogoHorizontal,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ESTADO_INICIAL":
      return {
        ...state,
        pathPreview: rutaLogoHorizontal,
        file: null,
      };
      break;
    case "MOSTRAR_Y_PERSISTIR_IMAGEN_SUBIDA":
      return {
        ...state,
        pathPreview: action.objectUrl,
        file: action.file,
      };
      break;
    default:
      return state;
  }
};

export const useImagenFormulario = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch];
};
