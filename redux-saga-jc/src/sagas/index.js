import axios from 'axios'
import { all, takeEvery } from 'redux-saga/effects'

import getIP from './ipSagas'
import getUA from './uaSagas'

function * indexSaga () {
  yield all([
    takeEvery('LOAD_DATA_IP_REQUEST', getIP, axios),
    takeEvery('LOAD_DATA_UA_REQUEST', getUA, axios)
  ])
}

export default indexSaga
