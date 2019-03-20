export const loadDataIPRequest = () => {
  return {
    type: 'LOAD_DATA_IP_REQUEST'
  }
}
export const loadDataIPSuccess = (data) => {
  return {
    type: 'LOAD_DATA_IP_SUCCESS',
    data
  }
}
export const loadDataIPFailure = () => {
  return {
    type: 'LOAD_DATA_IP_FAILURE'
  }
}

export const loadDataUARequest = () => {
  return {
    type: 'LOAD_DATA_UA_REQUEST'
  }
}
export const loadDataUASuccess = (data) => {
  return {
    type: 'LOAD_DATA_UA_SUCCESS',
    data
  }
}
export const loadDataUAFailure = () => {
  return {
    type: 'LOAD_DATA_UA_FAILURE'
  }
}
