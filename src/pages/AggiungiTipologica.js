import { Formik } from "formik"
import { Button, Form, FormControl } from "react-bootstrap"
import * as Yup from 'yup'
import { useState, useMemo } from "react"
import { Service } from "../accessori/Service"
import { GlobalTipologiche, InsTipologica } from "../accessori/Params"
import { Redirect, useLocation } from "react-router-dom";
import MyModal from "../accessori/Modal";


export function AggiungiTipologica() {

    const [isCalled, setisCalled] = useState(false)
    const [tipologica, setTipologica] = useState([])
    const [back, setBack] = useState(false)
    const [titleMod, setTitleMod] = useState("")
    const [testoMod, setTestoMod] = useState("")
    const [isScaduta, setIsScaduta] = useState(false)
    const [color, setColor] = useState(undefined)
    let location = useLocation();

    const addedTipologica = (values) => {
        let tipo = values.tipologica;
        let desc = values.descrizione;
        let params = values.parametri;
        let order = values.order;
        const p = InsTipologica(tipo, desc, params, order);
        Service(p).then(response => {
            if (response.status === 200) {
                if (response.data.ESITO === 'OK') {
                    setTitleMod(response.data.ESITO === 'OK' ? 'Esito!' : 'Errore!');
                    setTestoMod(response.data.MSG);
                    setIsScaduta(true);
                    setColor(response.data.ESITO === 'OK' ? undefined : 1)
                } else {
                    setTitleMod('Errore!');
                    setTestoMod(response.status + ' - ' + response.statusText);
                    setIsScaduta(true);
                    setColor(1);
                }
                setisCalled(true)
            }
        }).catch(e => {
            setTitleMod('Error');
            setTestoMod(e.ErrorMessage);
            setIsScaduta(true);
            setColor(1);

        })
    }

    useMemo(() => {
        if (!isCalled) {
            Service(GlobalTipologiche()).then(response => {
                if (response.status === 200 && response.data.ESITO === 'OK') {
                    let data = response.data
                    setTipologica(data.DATI)
                    setisCalled(true)
                }
            }).catch(e => {
                console.log('Error call tipologica', e)
            })
        }
    }, [isCalled])


    return (
        <>

            <div className="d-flex flex-column justify-content-center">
                <MyModal onHide={() => setIsScaduta(false)} title={titleMod} testo={testoMod} show={isScaduta} save={false} color={color}/>
                <h3>Crea una nuova tipologica</h3>
                <div style={{ height: '2vw' }}></div>
                <Formik initialValues={{ tipologica: '', descrizione: '', parametri: '', order: '' }}
                    validationSchema={Yup.object({
                        tipologica: Yup.string().required("Campo Obbligatorio"),
                        descrizione: Yup.string().required("Campo Obbligatorio"),
                    })}
                    onSubmit={(values) => addedTipologica(values)}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Label htmlFor="tipologica">Tipologica</Form.Label>
                            <select
                                onChange={handleChange}
                                isValid={touched.tipologica && !errors.tipologica}
                                className="form-control" id="tipologica" name="tipologica">
                                <option value="">[Seleziona un progetto]</option>
                                {tipologica.length > 0 && tipologica.map((val, idx) => {
                                    return <option key={idx} value={val.id_or_tipo}>{val.descrizione}</option>

                                })}
                            </select>
                            <Form.Control.Feedback>Campo Obbligatorio!</Form.Control.Feedback>
                            <div style={{ height: '2vw' }}></div>
                            <Form.Label htmlFor="descrizione">Descrizione</Form.Label>
                            <FormControl
                                name="descrizione" id="descrizione"
                                isValid={touched.descrizione && !errors.descrizione}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback>Campo Obbligatorio!</Form.Control.Feedback>
                            <div style={{ height: '2vw' }}></div>
                            <Form.Label htmlFor="parametri">Parametri</Form.Label>
                            <FormControl
                                name="parametri" id="parametri"
                                onChange={handleChange}
                            />
                            <Form.Label htmlFor="order">Order</Form.Label>
                            <FormControl
                                name="order" id="order"
                                onChange={handleChange}
                            />
                            <div style={{ height: '2vw' }}></div>
                            <Button type="submit" variant="success">Salva</Button>
                            <Button type="button" variant="info" style={{ width: '20%', marginLeft: '1vw' }} onClick={() => {
                                setBack(true)
                            }}>Back</Button>
                            {back && <>
                                . <Redirect
                                    to={{
                                        pathname: "/home",
                                        state: { from: location },
                                        exact: true,
                                        strict: true
                                    }} />
                            </>}
                        </Form>
                    )}

                </Formik></div></>

    )
}
export default AggiungiTipologica;