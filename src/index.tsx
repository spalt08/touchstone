import React from 'react'
import ReactDOM from 'react-dom'
import { initServiceWorker } from 'worker/client'
import App from 'components/App'

initServiceWorker()

ReactDOM.render(<App />, document.getElementById('app'))
