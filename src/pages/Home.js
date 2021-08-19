import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Insert from "../list/Insert";
import View from "../list/View";
import React, { useState, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { decode as base64_decode } from 'base-64';
import Modifica from '../list/Modifica';
import { Redirect } from 'react-router';
import { useLocation } from 'react-router';
import { InitStorage } from '../accessori/InitStorage';

function Home() {
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [logout, setLogout] = useState(false);
    let location = useLocation();

    useMemo(() => {
        setTimeout(() => {

            if (sessionStorage.getItem('us') !== null) {
                let dati = JSON.parse(base64_decode(sessionStorage.getItem('us')));
                setNome(dati[0].nome);
                setCognome(dati[0].cognome)
            }
        }, 2000)
    }, []);

    return (
        <><div className="d-flex flex-column justify-content-start" style={{ width: '70%' }}>
            <div className="d-flex flex-row justify-content-end">
                <button className="btn btn-danger" onClick={() => {
                    sessionStorage.clear();
                    localStorage.clear();
                    InitStorage();
                    setLogout(true);
                }
                }>Logout</button>
            </div>
            <h3 className="titolo">Bentornato {cognome + ' ' + nome}</h3>
            <br />
            <Tabs defaultActiveKey="modifica" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="modifica" title="Modifica/aggiorna">
                    <h1>Modifica/Aggiorna</h1>
                    <br />
                    <Modifica />
                </Tab>

                <Tab eventKey="insert" title="Insert">
                    <h1>Insert</h1>
                    <br />
                    <Insert />
                </Tab>
                <Tab eventKey="view" title="View">
                    <h1>View</h1>
                    <br />
                    <View />
                </Tab>
            </Tabs>
        </div>
            {logout && (<Redirect
                to={{
                    pathname: "/",
                    state: { from: location },
                    exact: true,
                    strict: true
                }}
            />)}

        </>
    );
}
export default Home;