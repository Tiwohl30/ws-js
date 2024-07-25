
urlCreate = 'https://remsystem.net/Estudiantes/registrar'

headersCreate = {
    'Content-Type': `multipart/form-data; boundary=----WebKitFormBoundaryGWxTMPswMpwduu2n`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Origin': 'https://remsystem.net',
    'Referer': 'https://remsystem.net/Estudiantes',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'es-419,es;q=0.9',
    'Cookie': 'PHPSESSID=9mh1ndjjqsq4e6eild9fhcs7ah'
}

module.exports = {
    urlCreate,
    headersCreate
}