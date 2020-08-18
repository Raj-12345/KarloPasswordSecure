

var brand=document.querySelector(".navbar-brand");
console.log("jsp  loaded");
console.log(brand);
console.log(brand.textContent);
function call(a) {
this.textContent="lala bhai";
console.log("function call  given "+a);

}

brand.addEventListener('click',call(2));

