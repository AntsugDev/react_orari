import { Formik } from "formik"
import { Form } from "react-bootstrap";
import React, { useState, useMemo } from "react"
import { Service } from "../accessori/Service"
import { ListTipo, TableTipologica, insOre } from "../accessori/Params"
import { Button } from "react-bootstrap"
import Calendar from 'react-calendar';
import MyModal from "../accessori/Modal";

function Insert() {

    const [datiProgetto, setdatiProgetto] = useState([])
    const [datiTipoOre, setDatiTipoOre] = useState([])


    const [isCalled, setisCalled] = useState(false)

    const [calendar, onChangeCalendar] = useState(new Date())
    const [tipoOre, setTipoOre] = useState(null)

    const [titleMod, setTitleMod] = useState("")
    const [testoMod, setTestoMod] = useState("")
    const [isScaduta, setIsScaduta] = useState(false)
    const [color, setColor] = useState(undefined)

    const insertRecord = (values, { resetForm }) => {
        let data = calendar.toLocaleDateString('it-IT');
        let progetto = values.progetti;
        let tipo_ore = tipoOre;
        let ore = values.ore
        let user = sessionStorage.getItem('id');
        let p = insOre(null, progetto, tipo_ore, data, ore, user);
        if (user !== null && tipoOre !== '') {
            Service(p).then(response => {
                if (response.status === 200) {
                    setTitleMod(response.data.ESITO === 'OK' ? 'Esito!' : 'Errore!');
                    setTestoMod(response.data.MSG);
                    setIsScaduta(true);
                    setColor(response.data.ESITO === 'OK' ? undefined : 1)
                    resetForm();
                }
                else {
                    setTitleMod('Errore!');
                    setTestoMod(response.status + ' - ' + response.statusText);
                    setIsScaduta(true);
                    setColor(1);
                }
            }).catch(e => {
                setTitleMod('Error');
                setTestoMod(e.ErrorMessage);
                setIsScaduta(true);
                setColor(1);
            });
        }
    }
    useMemo(() => {
        if (!isCalled) {
            Service(ListTipo()).then(response => {
                if (response.status === 200 && response.data.ESITO === 'OK') {
                    let data = response.data
                    if (data.ESITO === 'OK') {
                        Array.from(data.DATI).forEach((el) => {
                            let id = (el.id_or_tipo)
                            let name = el.codice
                            Service(TableTipologica(id)).then(response => {
                                if (response.status === 200 && response.data.ESITO === 'OK') {
                                    let dati = response.data.DATI
                                    // eslint-disable-next-line default-case
                                    switch (name) {
                                        case 'PROGETTI': setdatiProgetto(dati); break
                                        case 'TIPO_ORE': setDatiTipoOre(dati); break
                                    }
                                    setisCalled(true)
                                }
                            }).catch(e => console.log('Eccezzione list inset', e))
                        })
                    }
                }
            }).catch(e => {
                console.log('Error call tipologica', e)
            })
        }
    }, [isCalled])

    return (
        <><Formik initialValues={{ progetti: '', tipo_ore: '', calendar: '', ore: '' }}
            onSubmit={(values) => insertRecord(values)}

        >
            {({
                handleSubmit, handleChange, values, touched, errors,
            }) => (
                <>
                    <Form
                        className="borderForm" onSubmit={handleSubmit}>
                        <Form.Label htmlFor="progetti">Progetti</Form.Label><select
                            onChange={handleChange}
                            className="form-control" id="progetti" name="progetti">
                            <option value="">[Seleziona un progetto]</option>
                            {datiProgetto.length > 0 && datiProgetto.map((val, idx) => {
                                return <option key={idx} value={val.id_or_tipologica}>{val.descrizione}</option>;

                            })}
                        </select>
                        <div style={{ height: '2vw' }}></div>
                        <Form.Label htmlFor="tipo_ore">Tipo Di Ore</Form.Label><select
                            onChange={(values) => {
                                let valore = values.target.value;
                                setTipoOre(valore);
                                Service(TableTipologica(4)).then(response => {
                                    if (response.status === 200 && response.data.ESITO === 'OK') {
                                        let data = response.data.DATI;
                                        const codice = data.find(ele => ele.id_or_tipologica === valore);
                                        // eslint-disable-next-line default-case
                                        switch (codice.descrizione) {
                                            case 'FERIE':
                                            case 'PERMESSI':
                                            case 'MALATTIA':
                                            case 'FESTIVITA':
                                                document.getElementById('ore').setAttribute('max', 8);
                                                break;
                                        }
                                    }
                                })
                            }}
                            isvalid={touched.tipo_ore && !errors.tipo_ore}
                            className="form-control" id="tipo_ore" name="tipo_ore">
                            <option value="">[Seleziona tipologia ore]</option>
                            {datiTipoOre.length > 0 && datiTipoOre.map((val, idx) => {
                                return <option key={idx} value={val.id_or_tipologica}>{val.descrizione}</option>;

                            })}
                        </select>
                        <Form.Control.Feedback>Campo Obbligatorio!</Form.Control.Feedback>
                        <div style={{ height: '2vw' }}></div>
                        <Form.Label htmlFor="calendar">Calendario</Form.Label>
                        <Calendar name="calendar" id="calendar"
                            locale="it-IT"
                            onClickDay={onChangeCalendar}
                            />
                        <div style={{ height: '2vw' }}></div>
                        <Form.Label htmlFor="ore">Ore</Form.Label>
                        <Form.Control type="number"
                            onChange={handleChange}
                            isvalid={touched.ore && !errors.ore}
                            className="form-control" id="ore" name="ore" />
                        <div style={{ height: '2vw' }}></div>

                        <Button variant="success" type="submit">Crea</Button>
                    </Form>

                </>
            )}

        </Formik><MyModal onHide={() => setIsScaduta(false)} title={titleMod} testo={testoMod} show={isScaduta} save={false} color={color}/></>

    );
}
export default Insert;