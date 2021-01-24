
//import Thing from './Thing'

class World {
  constructor() {
    this.player = null;
    this.locations = [];
    this.location = null;
    this.characters = [];
    this.things = [];
    this.lexicon = {};
    this.preHook = () => { };
    this.postHook = () => { }
  }

  // get player() {
  //   return this.getCharacter();
  // }

  get inventory() {
    const player = this.getCharacter();
    return player.things;
  }

  // get location() {
  //   return this.getLocation();
  // }

  setLexicon(lexicon) {
    this.lexicon = { ...lexicon };
    return this;
  }

  setPlayer(key) {
    const character = this.getCharacter(key);
    if (!character) throw Error('Character not found.');
    this.player = character;
  }

  setLocation(key) {
    const location = this.getLocation(key);
    if (!location) throw Error(`Location with key "${key}" not found.`);
    this.location = location;
  }

  addLocation(thing) {
    thing.world = this;
    this.locations.push(thing);
    //this.locations = [...this.locations, thing];
    if (!this.location && this.locations.length === 1) {
      this.location = thing;
    }
  }

  getLocation(key = this.location.key) {
    const location = this.locations.find(l => l.key === key);
    return location;
  }

  addCharacter(thing) {
    thing.world = this;
    //this.characters = [...this.characters, thing];
    this.characters.push(thing)
    if (!this.player && this.characters.length === 1) {
      this.player = thing;
    }
  }

  getCharacter(key = this.player.key) {
    const character = this.characters.find(c => c.key === key);
    return character;
  }

  findThing(key) {
    const thing = this.things.find(i => key === i.key);
    const location = this.locations.find(i => key === i.key);
    return thing || location;
  }

  command(str, lexicon) {
    const location = this.getLocation();
    const lAttempt = location.tryAnd(str, lexicon || this.lexicon);
    const player = this.getCharacter();
    const pAttempt = player.tryAnd(str, lexicon || this.lexicon);

    return {
      lAttempt,
      pAttempt
    };

  }
}

export default World;