// Haha, but whtat if we threw out that API because it is old?
// const photoBox = document.getElementById('boxHome');
// const picture = photoBox.firstElementChild.firstElementChild.firstElementChild
// const nametag = photoBox.firstElementChild.lastElementChild.firstElementChild
// const charaDrop = document.getElementById('dropper');
const charaURL = 'https://genshin-app-api.herokuapp.com/api/characters';
const hashLocal = [];
async function getRoster(){
    const characters = await fetch(charaURL, {mode:'no-cors'});
    console.log(characters.json());
    // const init = await characters.json();
    // init.forEach(pc => {
        // roster.push(pc)
    // })
    // populateInformation();
}
getRoster();
//OK, we got the data, Time to put it to use.
function populateInformation(){
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
    const pcObj = roster.find(pc => pc.name === event.target.value);
    nametag.innerText = pcObj.name;
    nametag.nextElementSibling.innerText = `Vision: ${pcObj.vision}`
    nametag.nextElementSibling.nextElementSibling.innerText = `Weapon: ${pcObj.weapon}`
    picture.setAttribute('src','./img/0000.png');
    nametag.parentElement.style.background=`var(--${pcObj.vision})`;
    console.log(event.target.value);
}
//Nice, we made a dropdown. Now let's use the dropdown... to make data? Make a Card?
// charaDrop.addEventListener('change', populateCard);