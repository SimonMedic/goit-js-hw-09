document.addEventListener("DOMContentLoaded",(function(){var t,e=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]");function d(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}e.addEventListener("click",(function(){e.disabled=!0,n.disabled=!1,t=setInterval(d,1e3)})),n.addEventListener("click",(function(){e.disabled=!1,n.disabled=!0,clearInterval(t)}))}));
//# sourceMappingURL=01-color-switcher.e8d92299.js.map
