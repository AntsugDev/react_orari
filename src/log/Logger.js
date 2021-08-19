import axios from "axios";

export const Logger = async (titolo, testo, ext) => {
    const params = {
        ACTION : 'CREATE_FILE',
        TESTO :testo,
        TITOLO: titolo,
        EXT: ext
    };
    const url = process.env.REACT_APP_LOGGER;
    console.log('url=>' + url);
    await axios.request(
        {
            url :url,
            method: 'GET',
            params :params,
            responseType:'json'
        }
        ).then((res) => {
        const data = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
        console.log('[' + data + ']', JSON.stringify(res));
    }).catch(error => console.log('LOG ERROR', error)).finally(res => console.log('FINALLY', JSON.stringify(res)));
}
export default Logger;