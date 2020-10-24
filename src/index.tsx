import React from 'react'
import ReactDOM from 'react-dom'
import { initServiceWorker } from 'worker/client'
import App from 'components/App'
import 'styles/global.scss'

initServiceWorker()

ReactDOM.render(<App />, document.getElementById('app'))
