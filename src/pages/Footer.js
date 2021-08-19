export const Footer = () => {
    const version = ' Version: 1.0.0';
    const author = 'Author: AntSugDevelopment83';
    return (
        <div style={{ flexDirection: 'row', width: '100%' }}>
            <span className="d-flex justify-content-start align-items-start" style={{marginLeft:'1vw'}}>
                {version}
            </span>
            <span className="d-flex justify-content-end align-items-end" style={{marginRight:'1vw'}}>
                {
                    author
                }
            </span>
        </div>
    );
}
export default Footer;