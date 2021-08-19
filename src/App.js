import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { useMemo, useState } from 'react'
import { InitStorage } from './accessori/InitStorage'
import AggiungiTipologica from './pages/AggiungiTipologica'
import MyModal from './accessori/Modal'
import {  Redirect } from 'react-router'
import { Button } from 'react-bootstrap'

function App() {
  InitStorage()
  const [scaduta, setIsScaduta] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useMemo(() => {
    let time = new Date().getTime();
    let tm = sessionStorage.getItem('tm');
    let diffTime = ((Math.floor(parseInt(tm) - time) / 1000) * 5)

    if (localStorage.getItem('sessScaduta') === 1 || diffTime > 5000) {
      setIsScaduta(true)
     
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scaduta])

  const testo = () => {
    return (
      <><h4>Sessione Scaduta</h4><div style={{ height: '1vw' }}></div><Button variant="danger" onClick={() => {
        sessionStorage.clear()
        localStorage.clear()
        InitStorage()
        setIsScaduta(false)
        setRedirect(true)
      } }>Chiudi</Button></>
    )
  }

  return (
    <><Router>
      <Switch>
        <Route exact path="/" component={Login}>
          <Login />
        </Route>
        <Route exact path="/home" component={Home}>
          <Home />
        </Route>
        <Route exact path="/home/aggiungi" component={AggiungiTipologica}>
          <AggiungiTipologica />
        </Route>
      </Switch>
    </Router>
      <MyModal title="Logout" testo={testo} show={scaduta} save={true}  color={1}/>
      {redirect && (<Redirect
        to={{
          pathname: "/",
          exact: true,
          strict: true
        }}
      />)}
    </>
  );
}

export default App;
