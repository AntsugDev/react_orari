/* eslint-disable no-const-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable default-case */
/* eslint-disable array-callback-return */
import { Service } from "../accessori/Service"
import { useState, useMemo } from "react"
import { DeleteTipologica, AggiornaTipologica, GlobalTipologiche, TableTipologica } from "../accessori/Params"
import MyModal from "../accessori/Modal"
import { Button, ButtonGroup, Table, FormControl, Form, ListGroup } from "react-bootstrap"
import { Redirect, useLocation } from "react-router"
import { Formik } from "formik"
import * as Yup from 'yup'

export function Modifica() {
    const location = useLocation()
    const [titleMod, setTitleMod] = useState("")
    const [testoMod, setTestoMod] = useState("")
    const [isScaduta, setIsScaduta] = useState(false)
    const[color,setColor] = useState(undefined)
    const [save, setSave] = useState(null)

    const [tipologica, setTipologica] = useState([])
    const [isCalled, setisCalled] = useState(false)
    const [viewTbl, setViewTbl] = useState(false)
    const [listTable, setListTable] = useState([])
    const [aggiungiTip, setAggiungiTip] = useState(false)



useMemo(() => {
    if (!isCalled) {
        Service(GlobalTipologiche()).then(response => {
            if (response.status === 200) {
                let data = response.data
                if (data.ESITO === 'OK') {
                    setTipologica(data.DATI)
                    setisCalled(true)
                } else {
                    setTitleMod('Errore!')
                    setTestoMod(data.MSG)
                    setIsScaduta(true)
                    setColor(1)
                }

            } else {
                setTitleMod('Errore!')
                setTestoMod(response.status + ' - ' + response.statusText)
                setIsScaduta(true)
                setColor(1)
            }
        }).catch(e => {
            setTitleMod('Error')
            setTestoMod(e.ErrorMessage)
            setIsScaduta(true)
            setColor(1)
        })
    }
}, [isCalled])



    const listTipologica = (values) => {
        const val = values.target.value
        Service(TableTipologica(val)).then(response => {
            if (response.status === 200) {
                let data = response.data
                if (data.ESITO === 'OK') {
                    setListTable(data.DATI)
                    setViewTbl(true)
                } else {
                    setTitleMod('Errore!')
                    setTestoMod(data.MSG)
                    setIsScaduta(true)
                    setColor(1)
                    setListTable([])
                    setViewTbl(false)
                    setSave(false)
                }

            } else {
                setTitleMod('Errore!')
                setTestoMod(response.status + ' - ' + response.statusText)
                setIsScaduta(true)
                setColor(1)
                setListTable([])
                setViewTbl(false)
                setSave(false)

            }
        }).catch(e => {
            setTitleMod('Error')
            setTestoMod(e.ErrorMessage)
            setIsScaduta(true)
            setListTable([])
            setColor(1)
            setViewTbl(false)
            setSave(false)

        })
    }



    const deleteTip = (id, tipologia) => {
        setisCalled(true)
        Service(DeleteTipologica(id)).then(response => {
            if (response.status === 200) {
                setTitleMod(response.data.ESITO === 'OK' ? 'Esito!' : 'Errore!')
                setTestoMod(response.data.MSG)
                setColor(response.data.ESITO === 'OK' ? undefined : 1)
                setIsScaduta(true)
                setViewTbl(false)
                listTipologica(tipologia)
            } else {
                setTitleMod('Errore!')
                setTestoMod(response.status + ' - ' + response.statusText)
                setIsScaduta(true)
                setListTable([])
                setViewTbl(false)
                setColor(1)
            }
        }).catch(e => {
            setTitleMod('Error')
            setTestoMod(e.ErrorMessage)
            setIsScaduta(true)
            setListTable([])
            setViewTbl(false)
            setColor(1)
        })


    }


    const updateTip = (id, desc, parametri, tipo, order) => {
        setisCalled(true)
        setTitleMod('Modifica')
        setIsScaduta(true)
        setSave(true)
        setTestoMod(
            <>
                <Formik initialValues={{ desc: '', parametri: '', order: '' }}
                    validationSchema={Yup.object({
                        desc: Yup.string().required(),
                    })}
                    onSubmit={(values) => {
                        setIsScaduta(false)
                        setSave(false)
                        let aggiorna = AggiornaTipologica(id, values.desc, values.parametri, tipo, values.order)

                        Service(aggiorna).then(response => {
                            if (response.status === 200) {
                                setTitleMod(response.data.ESITO === 'OK' ? 'Esito!' : 'Errore!')
                                setTestoMod(response.data.MSG)
                                setIsScaduta(true)
                                setListTable(false)
                                listTipologica(tipo)
                                setColor(response.data.ESITO === 'OK' ? undefined: 1)
                            } else {
                                setTitleMod('Errore!')
                                setTestoMod(response.status + ' - ' + response.statusText)
                                setIsScaduta(true)
                                setColor(1)
                            }
                        }).catch(e => {
                            setTitleMod('Error')
                            setTestoMod(e.ErrorMessage)
                            setIsScaduta(true)
                            setColor(1)
                        })
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                        <Form onSubmit={handleSubmit} >
                            <ListGroup horizontal>
                                <ListGroup.Item>DESCRIZIONE: {desc}</ListGroup.Item>
                                {parametri !== "" && <> 
                                <ListGroup.Item>PARAMETRI: {parametri}</ListGroup.Item>
                                </>
                                }
                                 {order !== "" && <> 
                                <ListGroup.Item>ORDER: {order}</ListGroup.Item>
                                </>
                                }
                            </ListGroup>
                            <div style={{ height: '2vw' }} ></div>
                            <> <Form.Label htmlFor="desc">Descrizione</Form.Label>
                                <FormControl
                                    name="desc" id="desc"
                                    onChange={handleChange}
                                    isvalid={touched.desc && !errors.desc}
                                />
                                <Form.Control.Feedback>Campo Obbligatorio!</Form.Control.Feedback>
                                <Form.Label htmlFor="parametri">Parametri</Form.Label>
                                <FormControl
                                    name="parametri" id="parametri"
                                    onChange={handleChange}
                                />
                                <Form.Label htmlFor="order">Order</Form.Label>
                                <FormControl
                                    name="order" id="order"
                                    onChange={handleChange}
                                /></>
                            <div style={{ height: '2vw' }} ></div>
                            <div className="d-flex flex-row-reverse justify-content-start">
                                <Button type="button" variant="primary" style={{ marginLeft: '1vw' }} onClick={() => setIsScaduta(false)} >Chiudi</Button>
                                <Button type="submit" variant="info" >Salva</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </>

        )

    }

    return (
        <>
            <div className="borderForm">
                <div className="d-flex flex-row-reverse justify-content-start">
                    <Button type="button" variant="success" onClick={() => {
                        setAggiungiTip(true)
                        setisCalled(true)
                        setViewTbl(false)
                    }}>Aggiungi</Button>
                </div>
                <div style={{ height: '3vw' }}></div>
                <label htmlFor="tipologica">Modifica Tipologica</label>
                <select label="Tipologica" name="tipologica" className="form-control" onChange={(values) => listTipologica(values)} >
                    <option value="">[Seleziona Tipologica]</option>
                    {tipologica.map((val, idx) => {
                        return <option key={idx} value={val.id_or_tipo}>{val.descrizione}</option>

                    })}
                </select>
                <div style={{ height: '3vw' }}></div>

                {viewTbl && <>

                    <div style={{ height: '1vw' }}></div>
                    <Table responsive bordered={true}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>DESCRIZIONE</th>
                                <th>PARAMETRI</th>
                                <th>ORDER</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listTable.length > 0 && listTable.map((ele,idx) => {
                                    return <tr key={idx}>
                                        <td>
                                            <ButtonGroup>
                                                <Button type="button" variant="danger" onClick={() => {
                                                    deleteTip(ele.id_or_tipologica, ele.id_or_tipo)
                                                }}>Delete</Button>
                                                <Button type="button" variant="warning" style={{ marginLeft: '1vw' }} onClick={() => {
                                                    updateTip(ele.id_or_tipologica, ele.descrizione, ele.parametri, ele.id_or_tipo, ele.order)
                                                }}>Update</Button>
                                            </ButtonGroup>
                                        </td>
                                        <td>{ele.descrizione}</td>
                                        <td>{ele.parametri}</td>
                                        <td>{ele.order}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </>
                }
                <div style={{ height: '3vw' }}></div>
                {aggiungiTip && <>
                    <Redirect
                        to={{
                            pathname: "/home/aggiungi",
                            state: { from: location },
                            exact: true,
                            strict: true
                        }}
                    />
                </>
                }
            </div>

            <MyModal onHide={() => setIsScaduta(false)} title={titleMod} testo={testoMod} show={isScaduta} save={save} color={color} /></>);
}
export default Modifica