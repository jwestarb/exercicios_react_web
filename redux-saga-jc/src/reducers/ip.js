const INITIAL_STATE = {
  data: '',
  isFetching: false,
  error: false
}

const ip = (state = INITIAL_STATE, action) => {
  if (action.type === 'LOAD_DATA_IP_REQUEST') {
    return {
      data: '',
      isFetching: true,
      error: false
    }
  }
  if (action.type === 'LOAD_DATA_IP_SUCCESS') {
    return {
      data: action.data,
      isFetching: false,
      error: false
    }
  }
  if (action.type === 'LOAD_DATA_IP_FAILURE') {
    return {
      data: '',
      isFetching: false,
      error: true
    }
  }
  return state
}

export default ip
