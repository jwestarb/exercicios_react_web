import { put } from 'redux-saga/effects'

import { loadDataIPSuccess } from '../actions'

function * getIP (axios) {
  const res = yield axios.get('http://httpbin.org/ip')
  yield put(loadDataIPSuccess(res.data.origin))
}

export default getIP
