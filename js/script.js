import { fetchRoster } from "./roster.js";
import { ascendCounts, ascendNames } from "./farming.js";
const charName = document.getElementById('charName');
const vision = document.getElementById('vision');
const weapon = document.getElementById('weapon');
const picture = document.getElementById('photoBox');
const charaDrop = document.getElementById('dropper');
const ascDrop = document.getElementById('ascendLevel');
const ascBox = document.getElementById('ascMatBox');
const roster = await fetchRoster(charaDrop);
const levelBox = document.getElementById('charLvl');

// Lets see if we can give it some data


populateCard(dropper.value);
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
    charName.parentElement.parentElement.style.background=`var(--${pcObj.vision})`;
    levelBox.style.background=`var(--${pcObj.vision})`;
    
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

charaDrop.addEventListener('change', dropperEvent);
ascDrop.addEventListener('change', ascEvent);
levelBox.addEventListener('change',levelEvent);