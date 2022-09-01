import { useReducer } from "react";

const initialStateFeedback = {
  openDialog: false,
  openBackdrop: false,
  openSuccesSnackbar: false,
  openWarningSnackbar: false,
  openErrorSnackbar: false,
  openErrorEditadoSnackbar: false,
  openDeletedSuccessSnackbar: false,
};

const feedbackReducer = (state, action) => {
  switch (action.type) {
    case "ABRIR_BACKDROP": {
      return {
        ...state,
        openBackdrop: true,
      };
    }
    case "CERRAR_BACKDROP": {
      return {
        ...state,
        openBackdrop: false,
      };
    }
    case "TOGGLE_BACKDROP": {
      return {
        ...state,
        openBackdrop: !state.openBackdrop,
      };
    }
    case "EDITADO_SATISFACTORIO": {
      return {
        ...state,
        openSuccesSnackbar: true,
      };
    }
    case "CERRAR_EDITADO_SATISFACTORIO": {
      return {
        ...state,
        openSuccesSnackbar: false,
      };
    }
    case "MOSTRAR_WARNING": {
      return {
        ...state,
        openWarningSnackbar: true,
      };
    }
    case "CERRAR_WARNING": {
      return {
        ...state,
        openWarningSnackbar: false,
      };
    }
    case "MOSTRAR_ERROR_EDITADO": {
      return {
        ...state,
        openErrorEditadoSnackbar: true,
      };
    }
    case "CERRAR_ERROR_EDITADO": {
      return {
        ...state,
        openErrorEditadoSnackbar: false,
      };
    }
    case "MOSTRAR_ERROR": {
      return {
        ...state,
        openErrorSnackbar: true,
      };
    }
    case "CERRAR_ERROR": {
      return {
        ...state,
        openErrorSnackbar: false,
      };
    }
    case "ABRIR_CONFIRMAR_ELIMINACION": {
      return {
        ...state,
        openDialog: true,
      };
    }
    case "CERRAR_CONFIRMAR_ELIMINACION": {
      return {
        ...state,
        openDialog: false,
      };
    }
    case "ELEMENTO_ELIMINADO": {
      return {
        ...state,
        openDeletedSuccessSnackbar: true,
      };
    }
    case "CERRAR_ELEMENTO_ELIMINADO": {
      return {
        ...state,
        openDeletedSuccessSnackbar: false,
      };
    }

    default:
      return state;
  }
};

export const useFeedbackEditar = () => {
  const [state, dispatch] = useReducer(feedbackReducer, initialStateFeedback);

  return [state, dispatch];
};
