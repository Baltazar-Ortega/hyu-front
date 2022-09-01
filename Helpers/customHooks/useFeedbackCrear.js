import {useReducer} from 'react'

const initialStateFeedback = {
    openBackdrop: false,
    openSuccesSnackbar: false,
    openWarningSnackbar: false,
    openErrorSnackbar: false
  }
  
  const feedbackReducer = (state, action) => {
    switch (action.type) {
      case 'ABRIR_BACKDROP': {
        return {
          ...state,
          openBackdrop: true
        }
  
      }
      case 'CERRAR_BACKDROP': {
        return {
          ...state,
          openBackdrop: false
        }
      }
      case 'TOGGLE_BACKDROP': {
          return {
              ...state,
              openBackdrop: !state.openBackdrop
          }
      }
      case 'AGREGADO_SATISFACTORIO': {
        return {
            ...state,
            openSuccesSnackbar: true
        }
      }
      case 'CERRAR_AGREGADO_SATISFACTORIO': {
          return {
              ...state, 
              openSuccesSnackbar: false
          }
      }
      case 'MOSTRAR_WARNING': {
          return {
              ...state,
              openWarningSnackbar: true
          }
      }
      case 'CERRAR_WARNING': {
          return {
              ...state,
              openWarningSnackbar: false
          }
      }
      case 'MOSTRAR_ERROR': {
        return {
            ...state,
            openErrorSnackbar: true
        }
    }
    case 'CERRAR_ERROR': {
      return {
            ...state,
            openErrorSnackbar: false
        }
    }
  
      default: return state
    }
  }

export const useFeedbackCrear = () => {
    const [state, dispatch] = useReducer(feedbackReducer, initialStateFeedback)

    return [state, dispatch]
}