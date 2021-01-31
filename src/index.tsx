import React from 'react'
import ReactDOM from 'react-dom'
import { initServiceWorker } from 'worker/client'
import App from 'components/App'
import { initAuthorization } from 'hooks'
import 'styles/global.scss'

initServiceWorker()
initAuthorization()

ReactDOM.render(<App />, document.getElementById('app'))
