import { getImages } from "./images.js";
const photoBox = document.getElementById('boxHome');
const picture = photoBox.firstElementChild.firstElementChild.firstElementChild
const nametag = photoBox.firstElementChild.lastElementChild.firstElementChild
const charaDrop = document.getElementById('dropper');
const baseURL = 'https://genshin.jmp.blue/'
const roster = [];
// Let's make some stuff to populate
// const fragment = new DocumentFragment();
// for(let x=0;x<4;x++){
//     const div = document.createElement('div');
//     const img = document.createElement('img');
//     const dropdown = document.createElement('select');
//     const choose = document.createElement('option');
//     choose.setAttribute('value', '');
//     choose.textContent = 'Collection';
//     dropdown.appendChild(choose);
//     img.setAttribute('src','./images/0000.png');
//     img.setAttribute('height','188px');
//     img.style.marginBottom = '5px';
//     div.append(img);
//     div.append(dropdown);
//     fragment.append(div);
// }
// photoBox.firstElementChild.prepend(fragment);
// Lets see if we can give it some data

async function getRoster(){
    const fetchCharaID = await fetch(baseURL+'characters/');
    const initID = await fetchCharaID.json();
    const characters = await fetch(baseURL+'characters/all');
    const init = await characters.json();
    init.forEach(pc => {
        pc.ID = initID[init.indexOf(pc)];
        roster.push(pc);
    })
    populateInformation();
    getCommonMats();
    getBossMats();
    getTalentBoss();
    getTalentBooks();
    console.log(roster[0]);
}
async function getCommonMats(){
    const fetchMats = await fetch(baseURL+'materials/common-ascension/');
    const mats = await fetchMats.json();
    for(const material in mats) {
        if(mats[material].characters != undefined){
            for(const charaID of mats[material].characters){
                const rosID = roster.findIndex(c => c.ID === charaID);
                rosID >= 0 ? roster[rosID].commonMats = material : console.log(`No match for ${charaID} in common-ascension`);
            }
        }
    };
}
async function getBossMats(){
    const fetchMats = await fetch(baseURL+'materials/boss-material/');
    const mats = await fetchMats.json();
    for(const material in mats) {
        if(mats[material].characters != undefined){
            for(const charaID of mats[material].characters){
                const rosID = roster.findIndex(c => c.ID === charaID);
                rosID >= 0 ? roster[rosID].bossMats = material : console.log(`No match for ${charaID} in boss-material`);
            }
        }
    };
}
// async function getCharaMats(){
//     //Need to fix this one, It has a different key that it matches on.
//     //Actually, these are all based on element. Don't need to fix this at all.
//     const fetchMats = await fetch(baseURL+'materials/character-ascension/');
//     const mats = await fetchMats.json();
//     console.log(mats);
//     for(material in mats) {
//         if(mats[material].characters != undefined){
//             for(charaID of mats[material].characters){
//                 roster[roster.findIndex(c => c.ID === charaID)].charaMats = material;
//             }
//         }
//     };
// }
async function getTalentBoss(){
    const fetchMats = await fetch(baseURL+'materials/talent-boss/');
    const mats = await fetchMats.json();
    for(const material in mats) {
        if(mats[material].characters != undefined){
            for(const charaID of mats[material].characters){
                const rosID = roster.findIndex(c => c.ID === charaID);
                rosID >= 0 ? roster[rosID].talentBoss = material : console.log(`No match for ${charaID} in talent-boss`);
            }
        }
    };
}
async function getTalentBooks(){
    const fetchMats = await fetch(baseURL+'materials/talent-book/');
    const mats = await fetchMats.json();
    for(const material in mats) {
        if(mats[material].characters != undefined){
            for(const charaID of mats[material].characters){
                const rosID = roster.findIndex(c => c.ID === charaID);
                rosID >= 0 ? roster[rosID].talentBook = material : console.log(`No match for ${charaID} in talent-book`);
            }
        }
    };
}
getRoster();
//OK, we got the data, Time to put it to use.
function populateInformation(){
    roster.forEach(pc => {
        const option = document.createElement('option');
        let name = 'Traveler';
        pc.name === name ? pc.name+=` - ${pc.vision}` : pc.name = pc.name;
        option.setAttribute('value', pc.ID);
        option.textContent = pc.name;
        charaDrop.appendChild(option);
    });
}
function populateCard(event){
    const pcObj = roster.find(pc => pc.ID === event.target.value);
    nametag.innerText = pcObj.name;
    nametag.nextElementSibling.innerText = `Vision: ${pcObj.vision}`
    nametag.nextElementSibling.nextElementSibling.innerText = `Weapon: ${pcObj.weapon}`
    picture.setAttribute('src','./img/'+pcObj.ID+'.png');
    // picture.setAttribute('src',charaImg+pcObj.ID+'.png');
    //I am going to have to scrape the database to get images. This will be... complicated
    nametag.parentElement.style.background=`var(--${pcObj.vision})`;
}
//Nice, we made a dropdown. Now let's use the dropdown... to make data? Make a Card?
charaDrop.addEventListener('change', populateCard);