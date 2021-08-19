
export const sessionStore = (user, pass) => {
    const encode = (user + '_' + pass).toString();
    if (localStorage.getItem('e')) localStorage.removeItem('e');
    localStorage.setItem('e', encode);
}

export const extraxctSession = () => {
    if (localStorage.getItem('e') !== '') {
        return (localStorage.getItem('e'));
    } else {
        return null;
    }

}
