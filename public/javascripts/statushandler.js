fetch('/status')
  .then(response => response.json())
  .then(data => {
    // Update the DOM with the fetched status data
    const status = document.getElementById('status');
    const drop = document.getElementById('statusdrop')
    status.style.fontWeight = 700;
    status.textContent = data.status.status;

    status.addEventListener('mouseover',function(){
        drop.style.display = "block";
    });

    drop.addEventListener('mouseover',function(){
        drop.style.display = "block";
    });

    drop.addEventListener('mouseleave',function(){
        drop.style.display = "none";
    });

    status.addEventListener('mouseleave',function(){
        drop.style.display = "none";
    })

    console.log(data)
  });

