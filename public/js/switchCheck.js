let taxSwitch=document.getElementById("switchCheckDefault");
  taxSwitch.addEventListener("click",()=>{
    let taxInfos=document.getElementsByClassName("tax-info");
    for(taxInfo of taxInfos){
      if(taxInfo.style.display!="inline"){
        taxInfo.style.display="inline";
      }else{
        taxInfo.style.display="none";
      }
    }
  })