import {
    checkLogin
} from './loginCheck.js';

document.addEventListener('DOMContentLoaded', () => {
    checkLogin();
});
const frame1 = document.getElementById("frame1")
const frame2 = document.getElementById("frame2")
const frame3 = document.getElementById("frame3")
const frame4 = document.getElementById("frame4")
const frame5 = document.getElementById("frame5")
const frame6 = document.getElementById("frame6")

frame1.contentDocument.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = frame1.getAttribute("src")
})
frame2.contentDocument.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = frame2.getAttribute("src")
})
frame3.contentDocument.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = frame3.getAttribute("src")
})
frame4.contentDocument.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = frame4.getAttribute("src")
})
frame5.contentDocument.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = frame5.getAttribute("src")
})
frame6.contentDocument.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = frame6.getAttribute("src")
})





//------background
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}


const backgroundImages = [
    'https://live.staticflickr.com/65535/53360059100_4d2c9d2252_b.jpg',
    'https://live.staticflickr.com/65535/53360526035_0e239fa940_b.jpg',
    'https://live.staticflickr.com/65535/53359612511_caccdb7de9_b.jpg',
    'https://live.staticflickr.com/65535/53358722222_5dbf280c44_b.jpg',
    'https://live.staticflickr.com/65535/53360059095_c52d3b5787_b.jpg',
    'https://live.staticflickr.com/65535/53361891119_617f0fbf86_b.jpg'

];


document.addEventListener('DOMContentLoaded', function () {
    const randomBackground = getRandomElement(backgroundImages);
    document.body.style.backgroundImage = `url('${randomBackground}')`
})