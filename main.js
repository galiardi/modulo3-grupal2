const esCarga = preguntar('Es carga familiar? (si/no)', validarSiNo);

if (esCarga === 'si') {
  const anoNacimiento = preguntar(
    'Año de nacimiento (ejemplo: 1990):',
    validarAno
  );
  const mesNacimiento = preguntar(
    'Mes de nacimiento (ejemplo: 8):',
    validarMes
  );

  const { añosPersona, mesesPersona } = obtenerEdad(
    anoNacimiento,
    mesNacimiento
  );

  const rangoEtario = obtenerRangoEtario(añosPersona);

  let recibeAsignacion;

  if (añosPersona < 18) {
    recibeAsignacion = true;
  } else {
    const tieneAutorizacionLegal = preguntar(
      'Tiene autorización legal? (si/no)',
      validarSiNo
    );
    if (tieneAutorizacionLegal === 'si') recibeAsignacion = true;
    if (tieneAutorizacionLegal === 'no') recibeAsignacion = false;
  }

  alert(
    `La persona es un ${rangoEtario}, carga familiar con ${añosPersona} ${
      añosPersona === 1 ? 'año' : 'años'
    } y ${mesesPersona} ${mesesPersona === 1 ? 'mes' : 'meses'}. ${
      recibeAsignacion
        ? 'Recibe asignación familiar.'
        : 'No recibe asignación familiar.'
    }`
  );
}

if (esCarga === 'no') {
  const anoIngreso = preguntar(
    'Año de ingreso a la empresa (ejemplo: 2000):',
    validarAno
  );
  const mesIngreso = preguntar(
    'Mes de ingreso a la empresa (ejemlo: 5):',
    validarMes
  );
  const { años, meses, mesesFaltantes } = obtenerTiempoEmpresa(
    anoIngreso,
    mesIngreso
  );

  alert(
    `La Persona es un trabajador activo con ${años} ${
      años === 1 ? 'año' : 'años'
    } y ${meses} ${
      meses === 1 ? 'mes' : 'meses'
    } en la organización y en ${mesesFaltantes} ${
      mesesFaltantes === 1 ? 'mes' : 'meses'
    } cumple ${años + 1} ${años + 1 === 1 ? 'año' : 'años'} en la organización.`
  );
}

function preguntar(pregunta, funcionDeValidacion) {
  let resultado = {};
  while (!resultado.respuesta) {
    if (resultado.advertencia) alert(resultado.advertencia);
    resultado = obtenerDato(pregunta, funcionDeValidacion);
  }
  return resultado.respuesta;
}

function obtenerDato(pregunta, funcionDeValidacion) {
  const respuesta = prompt(pregunta).trim().toLowerCase();
  const { esValida, advertencia } = funcionDeValidacion(respuesta);
  if (esValida) return { respuesta };
  return { advertencia };
}

function validarSiNo(resp) {
  if (resp === 'si' || resp === 'no') return { esValida: true };
  return { esValida: false, advertencia: 'Debe responder si o no' };
}

function validarMes(mes) {
  if (Number(mes) >= 1 && Number(mes) <= 12) return { esValida: true };
  return {
    esValida: false,
    advertencia: 'Debe ingresar un numero entre 1 y 12',
  };
}

function validarAno(ano) {
  if (Number(ano) <= new Date().getFullYear()) return { esValida: true };
  return { esValida: false, advertencia: 'Debe ingresar un año válido' };
}

function obtenerEdad(añoDeNacimiento, mesDeNacimiento) {
  const año = parseInt(añoDeNacimiento);
  const mes = parseInt(mesDeNacimiento);
  const fechaActual = new Date();
  const añoActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth() + 1;
  let añosPersona = añoActual - año;
  let mesesPersona = mesActual - mes;

  if (mesesPersona < 0) {
    añosPersona -= 1;
    mesesPersona = 12 + mesesPersona;
  }

  return { añosPersona, mesesPersona };
}

function obtenerRangoEtario(añosPersona) {
  if (añosPersona <= 0) return 'No nato';
  if (añosPersona < 2) return 'Infante';
  if (añosPersona < 12) return 'Niño';
  if (añosPersona < 18) return 'Adolescente';
  if (añosPersona < 65) return 'Adulto';
  if (añosPersona < 85) return 'Adulto mayor';
  return 'Años dorados';
}

function obtenerTiempoEmpresa(añoIngreso, mesIngreso) {
  const año = parseInt(añoIngreso);
  const mes = parseInt(mesIngreso);
  const fechaActual = new Date();
  const añoActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth() + 1;
  let años = añoActual - año;
  let meses = mesActual - mes;

  let mesesFaltantes;

  if (meses < 0) {
    años -= 1;
    mesesFaltantes = meses * -1;
    meses = 12 + meses;
  } else {
    mesesFaltantes = 12 - meses;
  }

  return { años, meses, mesesFaltantes };
}
