const ascend = [
    {
        id: '20',
        charaMats: 3,
        commonMats: 3,
        commonLvl: 1,
        bossMats: 0,
        eleMats: 1,
        eleLvl: 1,
    },
    {
        id: '40',
        charaMats: 10,
        commonMats: 15,
        commonLvl: 1,
        bossMats: 2,
        eleMats: 3,
        eleLvl: 2,
    },
    {
        id: '50',
        charaMats: 20,
        commonMats: 12,
        commonLvl: 2,
        bossMats: 4,
        eleMats: 6,
        eleLvl: 2,
    },
    {
        id: '60',
        charaMats: 30,
        commonMats: 18,
        commonLvl: 2,
        bossMats: 8,
        eleMats: 3,
        eleLvl: 3,
    },
    {
        id: '70',
        charaMats: 45,
        commonMats: 12,
        commonLvl: 3,
        bossMats: 12,
        eleMats: 6,
        eleLvl: 3,
    },
    {
        id: '80',
        charaMats: 60,
        commonMats: 24,
        commonLvl: 3,
        bossMats: 20,
        eleMats: 6,
        eleLvl: 4,
    }
];
const url = 'https://genshin.jmp.blue/';
const commonData = await collectData('materials/common-ascension/');
const bossData = await collectData('materials/boss-material');
const uniqueData = await collectData('materials/local-specialties/');
const eleData = await collectData('materials/character-ascension/');
export function ascendCounts (dropID, characterData) {
    const ascValues = ascend.find(c => c.id === dropID);
    const rtnObj = {};
    rtnObj.common = ascValues.commonMats;
    rtnObj.boss = ascValues.bossMats;
    rtnObj.unique = ascValues.charaMats;
    rtnObj.ele = ascValues.eleMats;
    return rtnObj;
}
export function ascendNames (dropID, characterData) {
    const ascValues = ascend.find(c => c.id === dropID);
    const rtnObj = {};
    rtnObj.common = commonSpecific(characterData.commonMats, ascValues.commonLvl);
    rtnObj.boss = bossSpecific(characterData.bossMats);
    rtnObj.unique = charaSpecific(characterData.charaMats);
    rtnObj.ele = eleSpecific(characterData.vision.toLowerCase(), ascValues.eleLvl)
    return rtnObj;
}
function commonSpecific (dropID, rarity) {
    if(Object.hasOwn(commonData, dropID)) return commonData[dropID].items[rarity-1].name;
}
function bossSpecific (dropID) {
    if(Object.hasOwn(bossData, dropID)) return bossData[dropID].name;
}
function charaSpecific (dropID, rarity) {
    for(const region in uniqueData){
        for(const id of uniqueData[region]){
            if(dropID === id.id) return id.name;
        }
    }
}
function eleSpecific (dropID, rar) {
    for(const gem in eleData[dropID]){
        if(rar+1 === eleData[dropID][gem].rarity) return eleData[dropID][gem].name;
    }
}
async function collectData(location) {
    const data = await fetch(url+location);
    const json = await data.json();
    return json;
}
