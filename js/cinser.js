/* ============================================================
   cinser.js — helpers compartidos de Explorar (dir, grup)
   ============================================================ */

const DECADAS = ['1920','1930','1940','1950','1960','1970','1980','1990','2000','2010','2020'];

/* Tipos de entrada que se pueden explorar */
const TIPOS = {
    dir:  { campo: 'dir',  icono: '🎬', menu: 'Directores' },
    grup: { campo: 'grup', icono: '🗂️', menu: 'Grupos' },
};

/* Un campo puede ser texto o array: siempre devolvemos array limpio */
function toList(v) {
    if (Array.isArray(v)) return v.map(x => String(x).trim()).filter(Boolean);
    return v ? [String(v).trim()].filter(Boolean) : [];
}

const alfa = (a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' });

/* Carga todo el catálogo: altas (json) y bajas (json_bajas) */
async function cargarPelis() {
    const get = carpeta => Promise.all(DECADAS.map(d =>
        fetch(`${carpeta}/${d}.json`).then(r => r.json()).catch(() => []))).then(x => x.flat());
    const [altas, bajas] = await Promise.all([get('json'), get('json_bajas')]);
    return { altas, bajas, todos: altas.concat(bajas) };
}

/* Del más nuevo al más antiguo (y por título si empatan) */
const porAnyoDesc = (a, b) => ((b.anyo || 0) - (a.anyo || 0)) || alfa(a.tit || '', b.tit || '');
