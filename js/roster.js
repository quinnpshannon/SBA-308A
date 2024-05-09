const baseURL = 'https://genshin.jmp.blue/';
export async function fetchRoster(charaDrop){
    const roster = [];
    const fetchCharaID = await fetch(baseURL+'characters/');
    const initID = await fetchCharaID.json();
    const characters = await fetch(baseURL+'characters/all');
    const init = await characters.json();
    init.forEach(pc => {
        pc.ID = initID[init.indexOf(pc)];
        pc.level = 1;
        roster.push(pc);
    })
    populateInformation(roster,charaDrop);
    getCommonMats(roster);
    getBossMats(roster);
    getTalentBoss(roster);
    getTalentBooks(roster);
    getCharaMats(roster);
    return roster;
}
async function getCommonMats(roster){
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
async function getBossMats(roster){
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
async function getCharaMats(roster){
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
async function getTalentBoss(roster){
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
async function getTalentBooks(roster){
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
function populateInformation(roster,charaDrop){
    roster.forEach(pc => {
        const option = document.createElement('option');
        let name = 'Traveler';
        pc.name === name ? pc.name+=` - ${pc.vision}` : pc.name = pc.name;
        option.setAttribute('value', pc.ID);
        option.textContent = pc.name;
        charaDrop.appendChild(option);
    });
}