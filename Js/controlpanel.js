import {
    checkLogin
} from './loginCheck.js';

document.addEventListener('DOMContentLoaded', () => {
    checkLogin();
});
/*
const frame2 = document.getElementById("frame2")
const frame3 = document.getElementById("frame3")

frame2.contentDocument.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = frame2.getAttribute("src")
})
frame3.contentDocument.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = frame3.getAttribute("src")
})
 */

//------background
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}


const backgroundImages = [
    'https://live.staticflickr.com/65535/53361891119_617f0fbf86_b.jpg'

];


document.addEventListener('DOMContentLoaded', function () {
    const randomBackground = getRandomElement(backgroundImages);
    console.log('Setting background image..')
    document.body.style.backgroundImage = `url('${randomBackground}')`
})