
//import Thing from './Thing'



class World {
  constructor() {
    this.activeLocationKey = null;
    this.playerCharacterKey = null;
    this.locations = [];
    this.characters = [];
    this.things = [];
    this.lexicon = {};
    this.preHook = () => { };
    this.postHook = () => { }
  }

  get player() {
    return this.getCharacter();
  }

  get inventory() {
    return this.getCharacterInventory();
  }

  get location() {
    return this.getLocation();
  }

  setLexicon(lexicon) {
    this.lexicon = { ...lexicon };
    return this;
  }

  setPlayer(key) {
    const character = this.getCharacter(key);
    if (!character) throw Error('Character not found.');
    this.playerCharacterKey = character.key;
  }

  setLocation(key) {
    const location = this.getLocation(key);
    if (!location) throw Error('Location not found.');
    this.activeLocationKey = location.key;
  }

  addLocation(thing) {
    thing.world = this;
    this.locations = [...this.locations, thing];
    if (!this.activeLocationKey && this.locations.length === 1) {
      this.activeLocationKey = thing.key;
    }
  }

  getLocation(key = this.activeLocationKey) {
    const location = this.locations.find(l => l.key === key);
    return location;
  }

  addCharacter(thing) {
    thing.world = this;
    this.characters = [...this.characters, thing];
    if (!this.playerCharacterKey && this.characters.length === 1) {
      this.playerCharacterKey = thing.key;
    }
  }

  getCharacter(key = this.playerCharacterKey) {
    const character = this.characters.find(c => c.key === key);
    return character;
  }

  // getCharacterInventory(key = this.playerCharacterKey) {
  //   const character = this.getCharacter(key);
  //   return character ? character.things : [];
  // }

  command(str, lexicon) {
    this.preHook(this);
    const location = this.getLocation();
    const lAttempt = location.tryAnd(str, lexicon || this.lexicon);
    const player = this.getCharacter();
    const pAttempt = player.tryAnd(str, lexicon || this.lexicon);
    this.postHook(this);
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