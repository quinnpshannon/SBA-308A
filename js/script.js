import { fetchRoster } from "./roster.js";
import { ascendCounts, ascendNames } from "./farming.js";
const charName = document.getElementById('charName');
const vision = document.getElementById('vision');
const weapon = document.getElementById('weapon');
const picture = document.getElementById('photoBox');
const title = document.getElementById('title');
const desc = document.getElementById('desc');
const charaDrop = document.getElementById('dropper');
const ascDrop = document.getElementById('ascendLevel');
const ascBox = document.getElementById('ascMatBox');
const levelBox = document.getElementById('charLvl');

// Lets see if we can give it some data
const roster = await fetchRoster(charaDrop);
populateCard(charaDrop.value);
//OK, we got the data, Time to put it to use.
function dropperEvent(event){
    populateCard(event.target.value);
    (ascDrop.value != '') ? populateAscend(ascDrop.value) : clearAscend();
    // populateAscend(ascDrop.value);
}
function ascEvent(event){
    // if(event.target.value != '') populateAscend(event.target.value);
    (ascDrop.value != '') ? populateAscend(event.target.value) : clearAscend();
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
    title.innerText = `Affiliation: ${pcObj.affiliation}`
    desc.innerText = `Description: ${pcObj.description}`
    title.nextElementSibling.innerText = `Gender: ${pcObj.gender}`
    title.nextElementSibling.nextElementSibling.innerText = `Birthday: ${birthdayTransform(pcObj.birthday)}`
    picture.setAttribute('src','./img/'+pcObj.ID+'.png');
    levelBox.value = pcObj.level;
    charName.parentElement.parentElement.style.background=`var(--${pcObj.vision})`;
    levelBox.style.background=`var(--${pcObj.vision})`;
    
}
//Nice, we made a dropdown. Now let's use the dropdown... to make data? Make a Card?
function populateAscend(ascID){
    const chara = roster.find(pc => pc.ID === charaDrop.value);
    const names = ascendNames(ascID, chara);
    const counts = ascendCounts(ascID, chara);
    clearAscend();
    for(const element in counts){
        if(names[element]!=undefined && counts[element]>0) {
            const input = document.createElement('input');
            input.setAttribute('type','number');
            input.setAttribute('min',0);
            input.setAttribute('max',counts[element]);
            input.style.width='3em';
            input.value = 0
            const label = document.createElement('label');
            label.innerText=`${names[element]} (${counts[element]}): `;
            label.appendChild(input);
            ascBox.appendChild(label);
        }
    }
}
function clearAscend(){
    while (ascBox.lastElementChild){
        ascBox.lastElementChild.remove();
    }
}
function birthdayTransform(string){
    return string.split('-')[1]+"/"+string.split('-')[2]
}
charaDrop.addEventListener('change', dropperEvent);
ascDrop.addEventListener('change', ascEvent);
levelBox.addEventListener('change',levelEvent);