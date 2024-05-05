const imgJson = "https://api.wanderer.moe/game/genshin-impact/character-icons/"
const imgDB = [];
export async function getImages() {
    const images = await fetch(imgJson);
    const imgPath = await images.json();
    imgPath.images.forEach(img => {
        console.log(img.name);
        img.name.toLowerCase().includes('-side-') || img.name.toLowerCase().includes('_side_') ? console.log("bad!") : console.log("Good!");
    });
    console.log(imgPath.images);
}