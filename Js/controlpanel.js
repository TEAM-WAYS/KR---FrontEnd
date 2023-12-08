
//-----iframe control
const frame0 = document.getElementById("frame0")
const frame1 = document.getElementById("frame1")
const frame2 = document.getElementById("frame2")
const frame3 = document.getElementById("frame3")

frame0.contentDocument.addEventListener("dblclick",()=>{
    console.log("clicked")
    window.location.href = frame0.getAttribute("src")
})
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