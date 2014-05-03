/*
just hide install btn
*/
installbtn = document.querySelector(".install_extension");
for(var key in installbtn)
{
  target = installbtn[key];
  installbtn.style.display ="none";
}
