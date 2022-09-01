export const cambiarDatosCondicionales = (action) => {
    switch(action.type) {
      case 'mostrar_precio': 
        if (JSON.parse(action.value)) {
          action.datosCondicionalesDispatch({type: 'MOSTRAR_PRECIO'})
          action.setDatos({
            ...(action.datos),
            mostrar_precio: true,
            precio: 0,
          });
        } else {
          action.datosCondicionalesDispatch({type: 'NO_MOSTRAR_PRECIO'})
          action.setDatos({
            ...(action.datos),
            mostrar_precio: false,
            precio: 0,
          });
        }
        break;
      
      case 'categoriaGeneralId': 
        const catGen = action.categoriasGenerales.find((el) => el._id === action.value);

        if (catGen.has_subcategorias) {
          const subcategoriasPorCatGen = action.subcategoriasApi.filter(
            (el) => el._id_categoria_general === action.value
          );
          action.datosCondicionalesDispatch({type: 'SET_SUBCATEGORIAS', payload: subcategoriasPorCatGen})
  
          if (subcategoriasPorCatGen[0].has_tipos) {
            const tiposDeSubcat = action.tiposApi.find(
              (el) => el._id === subcategoriasPorCatGen[0]._id_tipos
            );
            // console.log("tipos de la subcategoria escogida", tiposDeSubcat);
            action.datosCondicionalesDispatch({type: 'SET_TIPOS', payload: tiposDeSubcat.lista})
  
            action.setDatos({
              ...(action.datos),
              categoriaGeneralId: catGen._id,
              subcategoriaId: subcategoriasPorCatGen[0]._id,
              tipo: tiposDeSubcat.lista[0].valor,
            });
          } else {
            action.datosCondicionalesDispatch({type: 'UNSET_TIPOS'})
  
            action.setDatos({
              ...(action.datos),
              categoriaGeneralId: catGen._id,
              subcategoriaId: subcategoriasPorCatGen[0]._id,
            });
          }
        } else {
          // No hay subcategorias (y por lo tanto, no hay tipos)
          action.datosCondicionalesDispatch({type: 'UNSET_SUBCATEGORIAS'})
          action.datosCondicionalesDispatch({type: 'UNSET_TIPOS'})
  
          action.setDatos({
            ...(action.datos),
            categoriaGeneralId: catGen._id,
            subcategoriaId: "",
            tipo: "",
          });
        }
        break;
      
      case 'subcategoriaId': 
        const subCat = action.subcategoriasApi.find((el) => el._id === action.value);

        if (subCat.has_tipos) {
          const tiposDeSubcat = action.tiposApi.find(
            (el) => el._id === subCat._id_tipos
          );
          action.datosCondicionalesDispatch({
            type: "SET_TIPOS",
            payload: tiposDeSubcat.lista,
          });
  
          action.setDatos({
            ...(action.datos),
            subcategoriaId: subCat._id,
            tipo: tiposDeSubcat.lista[0].valor,
          });
        } else {
          action.datosCondicionalesDispatch({ type: "UNSET_TIPOS" });
  
          action.setDatos({
            ...(action.datos),
            subcategoriaId: subCat._id,
            tipo: "",
          });
        }
      
    }
  }