import { put } from 'redux-saga/effects'

import { loadDataUASuccess } from '../actions'

function * getUA (axios) {
  const res = yield axios.get('http://httpbin.org/user-agent')
  yield put(loadDataUASuccess(res.data['user-agent']))
}

export default getUA
