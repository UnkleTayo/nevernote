import { Redirect, Route, RouteProps, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from './component/GlobalStyle'
import Layout from './component/Layout'
import { Loading } from './component/Loading'
import { isAuthenticated, usePrepareApp } from './helper/auth'
import { Home } from './pages/home'
import { Login } from './pages/Login'
import { SignUp } from './pages/Signup'

function App() {
  const { isLoading } = usePrepareApp()

  if (isLoading) {
    return <Loading />
  }
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <AuthRoute path="/" component={Home} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

const AuthRoute = (props: RouteProps) => {
  if (isAuthenticated()) {
    return <Route {...props} />
  }

  return <Redirect to="/login" />
}
export default App
