import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import React, { useState } from 'react'
import { Redirect, useLocation, useHistory } from "react-router-dom"
import { MyModal } from "../accessori/Modal"
import { Service } from "../accessori/Service"
import { Enter, Register } from "../accessori/Params"
// eslint-disable-next-line no-unused-vars
import { encode as base64_encode } from 'base-64'
import { Wait } from "../accessori/Wait"

function Login() {
    const location = useLocation()
    // eslint-disable-next-line no-undef
    const history = useHistory()

    const [esito, setEsito] = useState(false)
    const [isScaduta, setIsScaduta] = useState(false)

    const [titleMod, setTitleMod] = useState("")
    const [testoMod, setTestoMod] = useState("")
    const[color,setColor] = useState(undefined)

    const [register, setRegister] = useState(false)


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [nome, setNome] = useState("")
    const [cognome, setCognome] = useState("")

    const [loading,setLoading] = useState(false);

    const resetForm = () => {
        setUsername("")
        setPassword("")
        setNome("")
        setCognome("")
    }

    


    const submitLogin = async (values, state) => {
     
        if (state === 'enter') {
            setLoading(true);
            Service(Enter(values.username, values.password), history, location).then(response => {
                let title = ''
                let testo = ''
                let esito = ''
                if (response.status === 200) {
                    setTitleMod('')
                    setTestoMod('')
                    setIsScaduta(false)
                    resetForm()
                    setTimeout(() => {
                        setEsito(true)
                        sessionStorage.setItem('us', base64_encode(JSON.stringify(response.data.DATI)))
                        sessionStorage.setItem('ac',base64_encode(response.data.DATI[0].user_id+response.data.DATI[0].user_pass))
                        sessionStorage.setItem('id',response.data.DATI[0].id_account)
                    }
                        , 1000)
                        

                } else {
                    title = 'Errore!'
                    testo = response.status + ' - ' + response.statusText
                    esito = false
                    setTitleMod(title)
                    setTestoMod(testo)
                    setIsScaduta(esito)
                    setColor(1)
                }


            }).catch(e => {
                setTitleMod('Error')
                setTestoMod(e.ErrorMessage)
                setIsScaduta(false)
                setColor(1)
            })
            setLoading(true);
        } else {
            setLoading(true);
            Service(Register(values.usernameReg, values.passwordReg, values.first, values.second), history, location).then(response => {
                let title = ''
                let testo = ''
                let esito = ''
                let color = '';
                if (response.status === 200) {
                    title = response.data.ESITO === 'OK' ? 'Registrazione!' : 'Errore!'
                    testo = response.data.MSG
                    esito = response.data.ESITO === 'OK' ? true : false
                    resetForm()

                } else {
                    title = 'Errore!'
                    testo = response.status + ' - ' + response.statusText
                    esito = false
                    color =1;
                }
                setTitleMod(title)
                setTestoMod(testo)
                setIsScaduta(esito)
                setColor(color)
            }).catch(e => {
                setTitleMod('Error')
                setTestoMod(e.ErrorMessage)
                setIsScaduta(true)
            })
            setLoading(false);
        }
    }


    const render = () => {
        if (register) {
            return (<><Wait loading={loading}/><Formik
                initialValues={{ usernameReg: '', passwordReg: '', first: '', second: '' }}
                validationSchema={Yup.object({
                    usernameReg: Yup.string().required('Campo Obbligatorio'),
                    passwordReg: Yup.string().required('Campo Obbligatorio').max('15', 'Massimo caratteri 15'),
                    first: Yup.string().required('Campo Obbligatorio'),
                    second: Yup.string().required('Campo Obbligatorio')
                })}
                onSubmit={(values) => submitLogin(values, 'register')}
            >
                <Form>
                    <label htmlFor="usernameReg">Usernaname</label>
                    <Field as="input" name="usernameReg" type="text" className="form-control" value={username} />
                    <div className="error">
                        <ErrorMessage className="error" name="usernameReg" />
                    </div>
                    <br />
                    <label htmlFor="passwordReg">Password</label>
                    <Field as="input" name="passwordReg" type="password" className="form-control" value={password} />
                    <div className="error">
                        <ErrorMessage className="error" name="passwordReg" />
                    </div>
                    <br />
                    <label htmlFor="nome">Nome</label>
                    <Field as="input" name="first" type="text" className="form-control" value={nome} />
                    <div className="error">
                        <ErrorMessage className="error" name="first" />
                    </div>
                    <br />
                    <label htmlFor="cognome">Cognome</label>
                    <Field as="input" name="second" type="text" className="form-control" value={cognome} />
                    <div className="error">
                        <ErrorMessage className="error" name="second" />
                    </div>
                    <br />
                    <button type="button" className="btn btn-success" onClick={() => {
                        setRegister(false)
                        resetForm()
                    }
                    }>
                        Back Login
                    </button>
                    <button type="submit" className="btn btn-info" style={{ marginLeft: '1vw' }} >
                        Register
                    </button>
                </Form>
            </Formik>
                <MyModal title={titleMod} testo={testoMod} show={isScaduta} save={false}  color={color}/>
            </>)
        } else {
            return (<><Wait loading={loading}/><Formik
                initialValues={{ username: 'root', password: '123qwe..' }}
                validationSchema={Yup.object({
                    username: Yup.string().required('Campo Obbligatorio').max('15', 'Massimo caratteri 15'),
                    password: Yup.string().required('Campo Obbligatorio')
                })}
                onSubmit={(values) => submitLogin(values, 'enter')}
            >
                <Form>
                    <label htmlFor="username">Usernaname</label>
                    <Field as="input" name="username" type="text" className="form-control" />
                    <div className="error">
                        <ErrorMessage className="error" name="username" />
                    </div>
                    <br />
                    <label htmlFor="password">Password</label>
                    <Field as="input" name="password" type="password" className="form-control" />
                    <div className="error">
                        <ErrorMessage className="error" name="password" />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-success">
                        Enter
                    </button>
                    <button type="button" className="btn btn-info" style={{ marginLeft: '1vw' }} onClick={() => {
                        setRegister(true)
                        resetForm()
                    }
                    }>
                        Register
                    </button>
                    {esito && <>
                        . <Redirect
                            to={{
                                pathname: "/home",
                                state: { from: location },
                                exact: true,
                                strict: true
                            }} />
                    </>}

                </Form>
            </Formik>
                <MyModal title={titleMod} testo={testoMod} show={isScaduta} save={false} color={color}/>
            </>)
        }

    }
    return render()

}
export default Login;