import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from './component/GlobalStyle'
import Layout from './component/Layout'
import { Home } from './pages/home'
import { Login } from './pages/Login'
import { SignUp } from './pages/Signup'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App
