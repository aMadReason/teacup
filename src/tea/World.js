
//import Thing from './Thing'



class World {
  constructor(options) {
    const {
      activeLocationKey = false,
      playerCharacterKey = false,
      locations = [],
      characters = []
    } = options;

    this.activeLocationKey = activeLocationKey;
    this.playerCharacterKey = playerCharacterKey;
    this.locations = locations;
    this.characters = characters;

    if (activeLocationKey === false && locations.length > 0) {
      this.activeLocationKey = locations[0].key;
    }

    if (playerCharacterKey === false && characters.length > 0) {
      this.playerCharacterKey = characters[0].key;
    }

  }

  get player() {
    return this.characters.find(i => i.isPlayer === true);
  }

  setPlayer(key) {
    const current = this.getCharacter();
    const toBe = this.getCharacter({ key });
    if (!toBe) throw Error('Character not found.');
    this.characters.forEach(c => c.isPlayer = false);
    toBe.isPlayer = true;
    this.playerCharacterKey = toBe ? toBe.key : current.key;
    return this;
  }

  add(type, thing) {
    if (!['character', 'locations'].includes(type)) return;
    this[type].push(thing);
    return this;
  }
  getLocation({ name, key } = { name: false, key: this.activeLocationKey }) {
    const location = this.locations.find(l => {
      return l.key === key || l.name === name
    });
    return location;
  }
  getCharacter({ name, key } = { name: false, key: this.playerCharacterKey }) {
    const character = this.characters.find(c => {
      return c.key === key || c.name === name
    });
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