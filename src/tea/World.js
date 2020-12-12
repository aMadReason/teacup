
//import Thing from './Thing'



class World {
  constructor() {
    this.activeLocationKey = null;
    this.playerCharacterKey = null;
    this.locations = [];
    this.characters = [];
  }

  get player() {
    return this.characters.find(i => i.key === this.playerCharacterKey);
  }

  setPlayer(key) {
    const toBe = this.getCharacter({ key });
    if (!toBe) throw Error('Character not found.');
    // this.characters.forEach(c => c.isPlayer = false);
    // toBe.isPlayer = true;
    this.playerCharacterKey = toBe.key;
  }

  addLocation(thing) {
    thing.world = this;
    this.locations.push(thing);
    if (!this.activeLocationKey && this.locations.length === 1) {
      this.activeLocationKey = thing.key;
    }
  }

  getLocation(key = this.activeLocationKey) {
    console.log(key)
    const location = this.locations.find(l => l.key === key);
    return location;
  }

  addCharacter(thing) {
    thing.world = this;
    this.characters.push(thing);
    if (!this.playerCharacterKey && this.characters.length === 1) {
      this.playerCharacterKey = thing.key;
    }
  }

  getCharacter(key = this.playerCharacterKey) {
    console.log(key)
    const character = this.characters.find(c => c.key === key);
    return character;
  }

  command(str) {

    const location = this.getLocation();
    const lAttempt = location.tryAnd(str);
    const player = this.getCharacter();
    const pAttempt = player.tryAnd(str);

    // const inLocation = lAttempt.actOnThings.length;
    // const onPlayer = pAttempt.actOnThings.length;


    // if (inLocation > 0 && onPlayer === 0) {
    //   return lAttempt;
    // }

    // if (inLocation === 0 && onPlayer > 0) {
    //   return pAttempt;
    // }

    // if (inLocation > 0 && onPlayer > 0) {
    //   const lLoc = lAttempt.actOnThings[0];
    //   lAttempt.res = () => {
    //     let msg = `There is more than one '${lLoc.noun}'. `;
    //     msg += `In the '${location.name}'; ${lAttempt.actOnThings.map(i => i.name).join(', ')}. `;
    //     msg += `In the inventory; ${pAttempt.actOnThings.map(i => i.name).join(", ")}`;
    //     lAttempt.actOnThings = [...lAttempt.actOnThings, ...pAttempt.actOnThings];
    //     return msg;
    //   }
    // }

    return {
      lAttempt,
      pAttempt
    };

  }
}

export default World;