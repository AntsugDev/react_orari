import axios from "axios"


export const Service = async (params, history, location) => {
    const url = process.env.REACT_APP_SERVER;
    try {
        let time = new Date().getTime();
        let tm = sessionStorage.getItem('tm');
        let diffTime = ((Math.floor(parseInt(tm) - time) / 1000) * 5)
        if (sessionStorage.getItem('tk') !== null && diffTime < 5000) {
            return await axios.request({
                url: url,
                method: 'POST',
                data: params,
                headers:{
                    tk :sessionStorage.getItem('tk'),
                    tm: time
                }
            });
        } else {
            sessionStorage.clear();
            let { from } = location.state || { from: { pathname: "/" } };
            history.replace(from);
            localStorage.setItem('sessScaduta',1);
            return null;
        }
    } catch (exception) {
        alert(exception);
    }

}
