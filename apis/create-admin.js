
urlCreateAdmin = 'https://remsystem.net/Usuarios/registrar'

headersCreateAdmin = {
    'Content-Type': `multipart/form-data; boundary=----WebKitFormBoundaryanueaybjNBlvmMZf`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Origin': 'https://remsystem.net',
    'Referer': 'https://remsystem.net/Usuarios',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'es-419,es;q=0.9',
    'Cookie': 'PHPSESSID=0do6t4p00f49kaa0gv0trt24u6'
}

module.exports = {
    urlCreateAdmin,
    headersCreateAdmin
}