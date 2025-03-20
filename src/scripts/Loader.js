export default function loaderFunciton(buttonSelector){
    const nuevoLoader = document.createElement("div");    
    nuevoLoader.classList.add("loaderButton");
    document.querySelector(buttonSelector).prepend(nuevoLoader);
}