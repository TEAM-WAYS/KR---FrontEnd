









//------background
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}


const backgroundImages = [
    'https://live.staticflickr.com/65535/53360059100_4d2c9d2252_b.jpg',
    'https://live.staticflickr.com/65535/53360526035_0e239fa940_b.jpg',
    'https://live.staticflickr.com/65535/53359612511_caccdb7de9_b.jpg',
    'https://live.staticflickr.com/65535/53358722222_5dbf280c44_b.jpg',
    'https://live.staticflickr.com/65535/53360059095_c52d3b5787_b.jpg'

];


document.addEventListener('DOMContentLoaded', function () {
    const randomBackground = getRandomElement(backgroundImages);
    document.body.style.backgroundImage = `url('${randomBackground}')`
})