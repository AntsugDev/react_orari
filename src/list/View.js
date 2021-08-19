/* eslint-disable array-callback-return */
import React, { useState, useMemo } from "react";
import { Service } from "../accessori/Service";
import { insOre, ListIns } from "../accessori/Params";
import { Table, Button } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";
import MyModal from "../accessori/Modal";
function View() {
    const [isService, setIsService] = useState(false)
    const [datiTable, setDatiTable] = useState([]);
    const [titleMod, setTitleMod] = useState("")
    const [testoMod, setTestoMod] = useState("")
    const [color, setColor] = useState(undefined)
    const [save, setSave] = useState(false)
    const [isScaduta, setIsScaduta] = useState(false)

    useMemo(() => {
        if (!isService) {
            Service(ListIns()).then(response => {
                if (response.status === 200 && response.data.ESITO === 'OK') {
                    let dati = response.data.DATI;
                    setDatiTable(dati);
                    setIsService(true);
                }
                else {
                    console.log('Error ListIns Response', response)
                }
            }).catch(e => console.log('Error ListIns', e))
        }
    }, [isService]);


    return (
        <><Table responsive>
            <thead>
                <tr>
                    <th></th>
                    <th>Progetto</th>
                    <th>Tipologia</th>
                    <th>Data</th>
                    <th>Ore</th>
                </tr>
            </thead>
            <tbody>
                {datiTable.map((el, idx) => {
                    return <tr key={idx}>
                        <td><FaTimesCircle type="button" alt="Delete Record" title="Delete Record" className="iconsFa" onClick={() => {
                            let user = sessionStorage.getItem('id');
                            if (user !== null) {
                                Service(insOre(el.id_or_insert, null, null, null, null, user)).then(response => {
                                    if (response.status === 200) {
                                        setTitleMod(response.data.ESITO === 'OK' ? 'Esito' : 'Errore')
                                        setTestoMod(() => {
                                            if (response.data.ESITO === 'OK') {
                                                return (
                                                    <><p>{response.data.MSG}</p><div style={{ height: '1vw' }}></div><div className="d-flex flex-row-reverse justify-content-start">
                                                        <Button variant="success" onClick={() => {
                                                            setIsService(false);
                                                        }}>Chiudi</Button>
                                                    </div></>
                                                )
                                            } else {
                                                return response.data.MSG;
                                            }
                                        }
                                        )
                                        setSave(response.data.ESITO === 'OK' ? true : false)
                                        setIsScaduta(true)
                                        setColor(response.data.ESITO === 'OK' ? undefined : 1)
                                    } else {
                                        setTitleMod('Errore')
                                        setTestoMod(response.status + ' ' + response.statusText)
                                        setIsScaduta(true)
                                        setColor(1)
                                    }
                                }).catch(e => {
                                    setTitleMod('Error')
                                    setTestoMod(e.ErrorMessage)
                                    setIsScaduta(true)
                                    setColor(1)
                                })
                            } else {
                                setTitleMod('Error')
                                setTestoMod('User in session is null!')
                                setIsScaduta(true)
                                setColor(1)
                            }
                        }} /></td>
                        <td>{el.progetto}</td>
                        <td>{el.tipologia}</td>
                        <td>{el.data}</td>
                        <td>{el.ore}</td>
                    </tr>;
                })}
            </tbody>
        </Table><MyModal onHide={() => setIsScaduta(false)} title={titleMod} testo={testoMod} show={isScaduta} save={save} color={color} /></>
    );
}
export default View;