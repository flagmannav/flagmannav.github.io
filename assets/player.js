(function(){
  var audio=new Audio(); audio.preload='none'; var cur=null;
  function row(el){while(el&&!el.classList.contains('trk'))el=el.parentElement;return el;}
  function stop(r){if(r){r.classList.remove('on');r.classList.remove('paused');}}
  document.addEventListener('click',function(ev){
    var b=ev.target.closest('.play'); var bar=ev.target.closest('.bar');
    if(b){var r=row(b);
      if(cur===r){ if(audio.paused){audio.play();r.classList.add('on');r.classList.remove('paused');} else {audio.pause();r.classList.remove('on');r.classList.add('paused');} return; }
      stop(cur); cur=r; audio.src=r.getAttribute('data-src'); audio.play(); r.classList.add('on'); return;}
    if(bar&&cur&&row(bar)===cur&&audio.duration){var rc=bar.getBoundingClientRect(); audio.currentTime=audio.duration*Math.min(1,Math.max(0,(ev.clientX-rc.left)/rc.width));}
  });
  audio.addEventListener('timeupdate',function(){ if(cur&&audio.duration){cur.querySelector('.fill').style.width=(audio.currentTime/audio.duration*100)+'%';} });
  audio.addEventListener('ended',function(){ var n=cur&&cur.nextElementSibling; stop(cur); cur=null; if(n&&n.classList.contains('trk')){n.querySelector('.play').click();} });
})();
