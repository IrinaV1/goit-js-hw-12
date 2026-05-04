import{a as u,S as p,i}from"./assets/vendor-73qhTu8_.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const d="55630526-f44120b4f4ecc6b1cd7cfb12b",f="https://pixabay.com/api/";function g(s,o){return u.get(f,{params:{key:d,q:s.trim(),image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(t=>t.data.hits)}const l=document.querySelector(".gallery"),c=document.querySelector(".loader"),m=new p(".gallery a",{captionsData:"alt",captionDelay:250});function h(s){const o=s.map(t=>`
      <li class="gallery-item">
        <a href="${t.largeImageURL}">
            <img class="gallery-image" src="${t.webformatURL}" alt="${t.tags}" />
        </a>

        <div class="info">
          <p>Likes<span>${t.likes}</span></p>
          <p>Views <span>${t.views}</span></p>
          <p>Comments <span>${t.comments}</span></p>
          <p>Downloads <span>${t.downloads}</span></p>
        </div>
      </li>
    `).join("");l.insertAdjacentHTML("beforeend",o),m.refresh()}function y(){l.innerHTML=""}function b(){c.style.display="block"}function w(){c.style.display="none"}const L=document.querySelector(".form");L.addEventListener("submit",S);function S(s){s.preventDefault(),y();const o=s.target.elements["search-text"].value.trim();o&&(b(),g(o).then(t=>{if(!t.length){i.show({titleColor:"white",position:"topRight",title:"Error",backgroundColor:"red",messageColor:"white",message:"Sorry, there are no images matching your search query. Please try again!"});return}h(t)}).catch(()=>{i.show({titleColor:"white",position:"topRight",title:"Error",backgroundColor:"red",messageColor:"white",message:"Something went wrong. Please try again later."})}).finally(()=>{s.target.reset(),w()}))}
//# sourceMappingURL=index.js.map
