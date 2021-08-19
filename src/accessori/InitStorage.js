import cryptoRandomString from 'crypto-random-string';


export const InitStorage = () => {
    if (sessionStorage.getItem('tk') !== null)
        sessionStorage.clear();
    let random = cryptoRandomString('abcrde341528ujJKJOOODOD');
    sessionStorage.setItem('tk', random);
    sessionStorage.setItem('tm', new Date().getTime());
}

