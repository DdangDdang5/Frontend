// export const setCookie = (name, value, exp = 1) => {
//   let date = new Date();
//   date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
//   //  let date = Date(exp);
//   document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
//   console.log(document.cookie);
// };

// export const getCookie = (name) => {
//   // console.log(document.cookie);
//   // let value = "; " + document.cookie;
//   // console.log(value);
//   // let parts = value.split("; " + name + "=");
//   // console.log(parts);
//   // if (parts.length === 2) {
//   //   return parts.pop().split(";").shift();
//   // }

//   let value = document.cookie.split(";");
//   let parts = value[0].split(name + "=");

//   return parts[parts.length - 1];
// };

export const setCookie = function (name, value, exp) {
  var date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
};

export const getCookie = function (name) {
  var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
};

export const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};
