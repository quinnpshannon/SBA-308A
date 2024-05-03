const photoBox = document.getElementById('boxHome');
const picture = photoBox.firstElementChild.firstElementChild.firstElementChild
const nametag = photoBox.firstElementChild.lastElementChild.firstElementChild
const charaDrop = document.getElementById('dropper');
const charaURL = 'https://genshin.jmp.blue/characters/';
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
async function getCharacter(){
    const characters = await fetch(charaURL+'all');
    const indiv = await characters.json();
    indiv.forEach(pc => {

    });
}
async function getRoster(){
    const characters = await fetch(charaURL+'all');
    const init = await characters.json();
    init.forEach(pc => {
        roster.push(pc)
    })
    populateInformation(roster);
}
getRoster();
//OK, we got the data, Time to put it to use.
function populateInformation(profile){
    roster.forEach(pc => {
        const option = document.createElement('option');
        let name = 'Traveler';
        pc.name === name ? pc.name+=` - ${pc.vision}` : pc.name = pc.name;
        option.setAttribute('value', pc.name);
        option.textContent = pc.name;
        charaDrop.appendChild(option);
    });
}
function populateCard(event){
    nametag.innerText = event.target.value;
    picture.setAttribute('src','./img/0000.png');
    photoBox.style.backgroundColor='red';
    console.log(event.target.value);
}
//Nice, we made a dropdown. Now let's use the dropdown... to make data? Make a Card?
charaDrop.addEventListener('change', populateCard);