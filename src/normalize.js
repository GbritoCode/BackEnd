/* eslint-disable eqeqeq */
export function normalizeCpf(value) {
  if (!value) return value;
  value = JSON.stringify(value);
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;
  if (cvLength < 4) return currentValue;
  if (cvLength < 7) { return `${currentValue.slice(0, 3)}.${currentValue.slice(3)}`; }
  if (cvLength < 10) {
    return `${currentValue.slice(0, 3)}.${currentValue.slice(
      3,
      6,
    )}.${currentValue.slice(6)}`;
  }

  return `${currentValue.slice(0, 3)}.${currentValue.slice(
    3,
    6,
  )}.${currentValue.slice(6, 9)}-${currentValue.slice(9, 11)}`;
}

export function normalizeFone(value) {
  if (!value) return value;
  value = JSON.stringify(value);
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;
  if (cvLength == 10) {
    return `(${currentValue.slice(0, 2)}) ${currentValue.slice(
      2,
      6,
    )} - ${currentValue.slice(6)}`;
  }

  if (cvLength == 11) {
    return `(${currentValue.slice(0, 2)}) ${currentValue.slice(
      2,
      7,
    )} - ${currentValue.slice(7)}`;
  }
}

export function normalizeCnpj(value) {
  if (!value) return value;
  value = JSON.stringify(value);
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;
  if (cvLength < 3) return currentValue;
  if (cvLength < 6) { return `${currentValue.slice(0, 2)}.${currentValue.slice(2)}`; }
  if (cvLength < 9) {
    return `${currentValue.slice(0, 2)}.${currentValue.slice(
      2,
      5,
    )}.${currentValue.slice(5)}`;
  }
  if (cvLength < 13) {
    return `${currentValue.slice(0, 2)}.${currentValue.slice(
      2,
      5,
    )}.${currentValue.slice(5, 8)}/${currentValue.slice(8)}`;
  }
  return `${currentValue.slice(0, 2)}.${currentValue.slice(
    2,
    5,
  )}.${currentValue.slice(5, 8)}/${currentValue.slice(
    8,
    12,
  )}-${currentValue.slice(12, 14)}`;
}

export function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj == '') return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj === '00000000000000'
    || cnpj === '11111111111111'
    || cnpj === '22222222222222'
    || cnpj === '33333333333333'
    || cnpj === '44444444444444'
    || cnpj === '55555555555555'
    || cnpj === '66666666666666'
    || cnpj === '77777777777777'
    || cnpj === '88888888888888'
    || cnpj === '99999999999999'
  ) { return false; }

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
}

export function normalizeCurrency(value) {
  value = JSON.stringify(value);
  let v = value.replace(/\D/g, '');
  v = `${(v / 100).toFixed(2)}`;
  v = v.replace('.', ',');
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
  v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
  return v;
}
export function normalizeCalcCurrency(value) {
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  let v = value.replace(/[.,]+/g, '');
  v = `${(v / 100).toFixed(2)}`;
  v = v.replace('.', ',');
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
  v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
  return v;
}

export function normalizeHrToMin(minsTotal) {
  const apontHr = `${Math.trunc(minsTotal / 60)}`;
  const apontMin = `0${Math.trunc(minsTotal % 60)}`.slice(-2);
  return `${apontHr}:${apontMin}`;
}
