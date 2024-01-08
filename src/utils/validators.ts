const regValidate: { [key: string]: RegExp } = {
  login: /^[A-Za-z][A-Za-z0-9_-]{2,19}$/,
  names: /^[A-Za-zА-ЯЁа-яё][A-Za-zА-ЯЁа-яё-]*$/,
  email: /^[A-Za-z0-9]+([_\.-][A-Za-z0-9]+)*@[A-Za-z0-9]+([_\.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/,
  password: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
  phone: /^\+?\d{10,15}$/,
  message: /.+/
};

function validate(type: string, value: string) {
  if (!regValidate[`${type}`].test(value)) {
    return 'Ошибка валидации';
  }
  return false;
}

export const login = (value: string) => {
  return validate('login', value);
};
export const password = (value: string) => {
  return validate('password', value);
};
export const email = (value: string) => {
  return validate('email', value);
};
export const names = (value: string) => {
  return validate('names', value);
};
export const phone = (value: string) => {
  return validate('phone', value);
};
export const message = (value: string) => {
  if (!regValidate[`message`].test(value)) {
    return undefined;
  }
  return false;
};
