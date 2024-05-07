import { getImages } from "./images.js";
import { ascendCounts, ascendNames } from "./farming.js";
const photoBox = document.getElementById('boxHome');
const charName = document.getElementById('charName');
const vision = document.getElementById('vision');
const weapon = document.getElementById('weapon');
const picture = photoBox.firstElementChild.firstElementChild.firstElementChild;
const charaDrop = document.getElementById('dropper');
const ascDrop = document.getElementById('ascendLevel');
const ascBox = document.getElementById('ascMatBox');
const baseURL = 'https://genshin.jmp.blue/';
const roster = [];
const levelBox = document.getElementById('charLvl');
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
        pc.level = 1;
        roster.push(pc);
    })
    populateInformation();
    getCommonMats();
    getBossMats();
    getTalentBoss();
    getTalentBooks();
    getCharaMats();
    populateCard(dropper.value);
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
async function getCharaMats(){
    //Need to fix this one, It has a different key that it matches on.
    //Actually, these are all based on element. Don't need to fix this at all.
    const fetchMats = await fetch(baseURL+'materials/local-specialties/');
    const regions = await fetchMats.json();
    for(const mats in regions){
        for(const material of regions[mats]) {
            if(material.characters != undefined){
                for(const charaID of material.characters){
                    roster[roster.findIndex(c => c.ID === charaID)].charaMats = material.id;
                }
            }
        };
    }
}
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
function dropperEvent(event){
    populateCard(event.target.value);
    if(ascDrop.value != '') populateAscend(ascDrop.value);
}
function ascEvent(event){
    if(event.target.value != '') populateAscend(event.target.value);
}
function levelEvent(event){
    setLevel(charaDrop.value,event.target.value)
}
function setLevel(charaID,level){
    const rosID = roster.find(c => c.ID === charaID);
    rosID.level = level;
}
function populateCard(charaID){
    const pcObj = roster.find(pc => pc.ID === charaID);
    charName.innerText = pcObj.name;
    vision.innerText = `Vision: ${pcObj.vision}`
    weapon.innerText = `Weapon: ${pcObj.weapon}`
    picture.setAttribute('src','./img/'+pcObj.ID+'.png');
    levelBox.value = pcObj.level;
    // picture.setAttribute('src',charaImg+pcObj.ID+'.png');
    //I am going to have to scrape the database to get images. This will be... complicated
    charName.parentElement.parentElement.style.background=`var(--${pcObj.vision})`;
}
//Nice, we made a dropdown. Now let's use the dropdown... to make data? Make a Card?
function populateAscend(ascID){
    const chara = roster.find(pc => pc.ID === charaDrop.value);
    const names = ascendNames(ascID, chara);
    const counts = ascendCounts(ascID, chara);
    while (ascBox.lastElementChild){
        ascBox.lastElementChild.remove();
    }
    for(const element in counts){
        const input = document.createElement('input');
        input.setAttribute('type','number');
        input.setAttribute('min',0);
        input.setAttribute('max',counts[element]);
        input.value = 0
        const label = document.createElement('label');
        label.innerText=`${names[element]} (${counts[element]}): `;
        label.appendChild(input);
        ascBox.appendChild(label);
    }
}

charaDrop.addEventListener('change', dropperEvent);
ascDrop.addEventListener('change', ascEvent);
levelBox.addEventListener('change',levelEvent);