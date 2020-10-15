import api from '../apis';

export const loginUser = (email, password) => async (dispatch) => {
  try{
    const response = await api.get('/login', { params: { email: email, password: password } });
    dispatch({ type: 'FETCH_USER', payload: response.data})
  }catch(error){
    if(error.response.status === 401){
      dispatch({type: 'FETCH_USER', payload: error.response.data})
    }
  } 
}

export const Logout = () => async (dispatch) => {
  dispatch({type: 'LOGOUT'});
};


export const fetchProducts = (access_token) => async (dispatch) => {
  try{
    const response = await api.get('/products', {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({ type: 'FETCH_PRODUCTS', payload: response.data})
  }catch(error){
      if(error.response.status === 401){
          dispatch({type: 'LOGOUT'});
      }
  }
}

export const addProduct = (formData, access_token) => async (dispatch) => {
  try{
    const response = await api.post(`/products`, formData, {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({ type: 'ADD_PRODUCT', payload: response.data})
  }catch(error){
      if(error.response.status === 401){
          dispatch({type: 'LOGOUT_USER'});
      }else if(error.response.status === 409){
        dispatch({type: 'ADD_PRODUCT', payload: error.response.data})
      }
  }
}

export const updateProduct = (id, formData, access_token ) => async (dispatch) => {
  try{
    const response = await api.put(`/products/${id}`, 
    formData, 
    {headers: {Authorization: `JWT ${access_token}`}});

    dispatch({ type: 'UPDATE_PRODUCT', payload: response.data})
  }catch(error){
    if(error.response.status === 401){
      dispatch({type: 'LOGOUT'})
    }else if(error.response.status === 409){
      dispatch({type: 'UPDATE_PRODUCT', payload: error.response.data})
    }
  } 
}

export const deleteProduct = (id, access_token) => async (dispatch) => {
  try{
    await api.delete(`/products/${id}`, {headers: {Authorization: `JWT ${access_token}`}});
  }catch(error){
      if(error.response.status === 401){
          dispatch({type: 'LOGOUT'});
      }
  }
}

export const fetchProduct = (id, access_token) => async (dispatch) => {
  try{
    const response = await api.get(`/products/${id}`, {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({ type: 'FETCH_PRODUCT', payload: response.data})
  }catch(error){
      if(error.response.status === 401){
          dispatch({type: 'LOGOUT_USER'});
      }else if(error.response.status === 404){
        dispatch({type: 'FETCH_PRODUCT', payload: error.response.data})
      }
  }
}








export const fetchCADExcel = (formData, access_token) => async (dispatch) => {
  try{
    const response = await api.post('/api/cad-excel/', formData, {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({ type: 'FETCH_CAD_EXCEL', payload: response.data})
  }catch(error){
      if(error.response.status === 401){
          dispatch({type: 'LOGOUT_USER'});
      }
  }
}


export const fetchSinglePdfData = (projectId, pdfName, access_token) => async (dispatch) => {
  try{
    const response = await api.post('/api/single-pdf-data/', {projectId: projectId, pdfName: pdfName}, {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({ type: 'FETCH_SINGLE_PDF_DATA', payload: response.data})
  }catch(error){
        if(error.response.status === 401){
            dispatch({type: 'LOGOUT_USER'});
        }else if(error.response.status === 404){
            dispatch({type: 'ERROR_MESSAGE_SINGLE_PDF', payload: error.response.data})
        }
  }
}

export const fetchSingleProjectDrawing = (projectId, drawingId, access_token) => async (dispatch) => {
  try{
    const response = await api.post('/api/project-drawing/', {projectId: projectId, drawingId: drawingId}, {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({ type: 'FETCH_SINGLE_PROJECT_ACTIVE_DRAWING', payload: response.data})
  }catch(error){
        if(error.response.status === 401){
            dispatch({type: 'LOGOUT_USER'});
        }
  }
}


export const uploadFile = (formData, access_token) => async (dispatch) => {
  try{
    const response = await api.post('/api/upload-file/', formData, {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({type: 'ERROR_MESSAGE_UPLOAD_FILE', payload: response.data}); 
  }catch(error){
        if(error.response.status === 401){
            dispatch({type: 'LOGOUT_USER'});
        }else if(error.response.status === 500){
            dispatch({type: 'ERROR_MESSAGE_UPLOAD_FILE', payload: error.response.data})
        }
  }
}

export const checkPdf = (formData, access_token) => async (dispatch) => {
  try{
    const response = await api.post('/api/check-pdf/', formData, {headers: {Authorization: `JWT ${access_token}`}}); 
    dispatch({ type: 'CHECK_PDF_MESSAGE', payload: response.data})
  }catch(error){
    if(error.response.status === 401){
        dispatch({type: 'LOGOUT_USER'});
    }
  }
}


export const archiveProject = (formData, access_token) => async (dispatch) => {
  try{
    await api.post('/api/archive-project/', formData, {headers: {Authorization: `JWT ${access_token}`}}); 
  }catch(error){
      if(error.response.status === 401){
          dispatch({type: 'LOGOUT_USER'});
      }
  }
}


export const processDrawings = (formData, access_token) => async (dispatch) => {
  try{
    const response = await api.post('/api/process-drawings/', formData, {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({ type: 'PROCESS_DRAWINGS', payload: response.data})
  }catch(error){
        if(error.response.status === 401){
            dispatch({type: 'LOGOUT_USER'});
        }
  }
}

export const updateProcessDrawings = (formData, access_token) => async (dispatch) => {
  try{
    const response = await api.post('/api/update-process-drawings/', formData, {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({ type: 'PROCESS_DRAWINGS', payload: response.data})
  }catch(error){
        if(error.response.status === 401){
            dispatch({type: 'LOGOUT_USER'});
        }
  }
}

export const applyCustomization = (formData, access_token) => async (dispatch) => {
  try{
    await api.post('/api/apply-customization/', formData, {headers: {Authorization: `JWT ${access_token}`}});
  }catch(error){
        if(error.response.status === 401){
            dispatch({type: 'LOGOUT_USER'});
        }
  }
}

export const fetchImage = (formData, access_token) => async (dispatch) => {
  try{
   const response = await api.post('/api/image/', formData, {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({ type: 'FETCH_BLOB_IMAGE', payload: response.data})
  }catch(error){
    if(error.response.status === 401){
        dispatch({type: 'LOGOUT_USER'});
    }
  }
}




export const updateUser = (formData, access_token) => async (dispatch) => {
  try{
    await api.post('/api/update-user/', formData, {headers: {Authorization: `JWT ${access_token}`}});
  }catch(error){
    if(error.response.status === 401){
        dispatch({type: 'LOGOUT_USER'});
    }
  }
}



export const createUser = (formData, access_token) => async (dispatch) => {
  try{
    const response = await api.post('/api/create-user/', formData, {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({ type: 'CREATE_USER_ERROR_MESSAGE', payload: response.data})
  }catch(error){
    if(error.response.status === 401){
        dispatch({type: 'LOGOUT_USER'});
    }
  }
}

export const deleteUser = (formData, access_token) => async (dispatch) => {
  try{
    const response = await api.post('/api/delete-user/', formData, {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({ type: 'DELETE_USER_MESSAGE', payload: response.data})
  }catch(error){
    if(error.response.status === 401){
        dispatch({type: 'LOGOUT_USER'});
    }
  }
}




export const fetchAllProjects = (access_token) => async (dispatch) => {
  try{
    const response = await api.get('/api/all-projects/', {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({ type: 'FETCH_ALL_PROJECTS', payload: response.data})
  }catch(error){
    if(error.response.status === 401){
        dispatch({type: 'LOGOUT_USER'});
    }
  }
}

export const fetchSingleProject = (formData, access_token) => async (dispatch) => {
  try{
    const response = await api.post('/api/fetch-project/', formData, {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({ type: 'FETCH_SINGLE_PROJECT_DATA', payload: response.data})
  }catch(error){
        if(error.response.status === 401){
            dispatch({type: 'LOGOUT_USER'});
        }else if(error.response.status === 404){
            dispatch({type: 'ERROR_MESSAGE_SINGLE_PROJECT', payload: error.response.data})
        }
  }
}


export const createProject = (formData, access_token) => async (dispatch) => {
  try{
    const response = await api.post('/api/create-project/', formData, {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({ type: 'CREATE_PROJECT_ERROR_MESSAGE', payload: response.data})
  }catch(error){
    if(error.response.status === 401){
        dispatch({type: 'LOGOUT_USER'});
    }
  }
}

export const deleteProject = (formData, access_token) => async (dispatch) => {
  try{
    const response = await api.post('/api/delete-project/', formData, {headers: {Authorization: `JWT ${access_token}`}});
    dispatch({ type: 'DELETE_PROJECT_MESSAGE', payload: response.data})
  }catch(error){
    if(error.response.status === 401){
        dispatch({type: 'LOGOUT_USER'});
    }
  }
}








// export const updateProjectBasicInfoData = (data) => async (dispatch) => {
//   dispatch({type: "UPDATE_PROJECT_BASIC_INFO_DATA", payload: data})
// }

// export const updateProjectLineTagData = (data) => async (dispatch) => {
//   dispatch({type: "UPDATE_PROJECT_LINE_TAG_DATA", payload: data});
// }

// export const updateProjectEquipmentTagData = (data) => async (dispatch) => {
//   dispatch({type: "UPDATE_PROJECT_EQUIPMENT_TAG_DATA", payload: data});
// }

// export const updateProjectValveTagData = (data) => async (dispatch) => {
//   dispatch({type: "UPDATE_PROJECT_VALVE_TAG_DATA", payload: data});
// }

// export const updateProjectSymbolInfoData = (data) => async (dispatch) => {
//   dispatch({type: 'UPDATE_PROJECT_SYMBOL_INFO_DATA', payload: data})
// }


// export const clearProjectSetup = () => async (dispatch) => {
//   dispatch({type: "CLEAR_PROJECT_SETUP", payload: {}})
// }