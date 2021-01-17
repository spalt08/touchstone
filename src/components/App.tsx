import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as pages from 'components/pages'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/oauth' component={pages.OAuthCallback} />
        <Route exact path='/' component={pages.BenchmarkEditPage} />
      </Switch>
    </BrowserRouter>
  )
}
