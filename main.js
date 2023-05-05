const esCarga = preguntar('Es carga familiar? (si/no)', validarSiNo);

if (esCarga === 'si') {
  const anoNacimiento = preguntar(
    'Ano de nacimiento (ejemplo: 1990):',
    validarAno
  );
  const mesNacimiento = preguntar(
    'Mes de nacimiento (ejemplo: 8):',
    validarMes
  );

  // ...
  alert(`${anoNacimiento} ${mesNacimiento}`);
  // alert(`La persona es un Adulto Mayor, carga familiar con 66 años y 6 meses`);
}

if (esCarga === 'no') {
  const anoIngreso = preguntar(
    'Ano de ingreso a la empresa (ejemplo: 2000):',
    validarAno
  );
  const mesIngreso = preguntar(
    'Mes de ingreso a la empresa (ejemlo: 5):',
    validarMes
  );

  // ...
  alert(`${anoIngreso} ${mesIngreso}`);
  // alert(`La Persona es un trabajador activo con 2 años y 3 meses en la organización y en 9 meses cumple el próximo año`);
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
  return { esValida: false, advertencia: 'Debe ingresar un ano valido' };
}
