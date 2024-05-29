/* eslint-disable */
var ua = window.navigator.userAgent;
var msie = ua.indexOf('MSIE ');

if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
  document.body.classList.add('ie11');

  var style = document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = '/themes/custom/ike/dist/css/ie.css';
  document.getElementsByTagName('head')[0].appendChild(style);
}
