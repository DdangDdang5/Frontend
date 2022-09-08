export const setCookie = (name, value, exp) => {
  // let date = new Date();
  // date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
   let date = Date(exp);
  document.cookie = `${name}=${value}; expires=${date}`;
};

export const getCookie = (name) => {
   // console.log(document.cookie);
  // let value = "; " + document.cookie;
   // console.log(value);
  // let parts = value.split("; " + name + "=");
   // console.log(parts);
  // if (parts.length === 2) {
  //   return parts.pop().split(";").shift();
  // }
   
   let value = document.cookie.split(';');
   let parts = value[0].split(name + '=');
   return parts[parts.length - 1];
};

export const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};