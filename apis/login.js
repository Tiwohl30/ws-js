


const usuario = 'remsystem';
const clave = '1Edwar20.77';

const url = 'https://remsystem.net/Usuarios/validar';
        
const headerss = {
            'Host': 'remsystem.net',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 OPR/111.0.0.0',
            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryA8EP9apAsnoHz8wn',
            'Accept': '*/*',
            'Origin': 'https://remsystem.net/',
            'Referer': 'https://remsystem.net/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'es-ES,es;q=0.9',
            'Cookie': 'PHPSESSID=9mh1ndjjqsq4e6eild9fhcs7ah',
        };

        
const postData = `------WebKitFormBoundaryA8EP9apAsnoHz8wn\nContent-Disposition: form-data; name="usuario"\n\n${usuario}\n------WebKitFormBoundaryA8EP9apAsnoHz8wn\nContent-Disposition: form-data; name="clave"\n\n${clave}\n------WebKitFormBoundaryA8EP9apAsnoHz8wn--`;

module.exports = {
    url,
    postData,
    headerss
}

