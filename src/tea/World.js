
import Thing from './Thing'

class World extends Thing {
  constructor(options) {
    super(options);
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

    const inLocation = lAttempt.actOnThings.length;
    const onPlayer = pAttempt.actOnThings.length;


    if (inLocation > 0 && onPlayer === 0) {
      return lAttempt;
    }

    if (inLocation === 0 && onPlayer > 0) {
      return pAttempt;
    }

    if (inLocation > 0 && onPlayer > 0) {
      const fLoc = lAttempt.actOnThings[0]
      lAttempt.res = () => fLoc.errs.multiMatch({
        me: location,
        data: {
          all: true,
          noun: fLoc.noun,
          things: [...lAttempt.actOnThings, ...pAttempt.actOnThings]
        }
      })
    }

    // if (pAttempt.actOnThings.length > 1) {
    //   console.log(`Please specify what type of '${pAttempt.actOn}', the following are in the inventory; ${pAttempt.actOnThings.map(i => i.fullname).join(', ')}.`);
    // }

    console.log()
    return lAttempt;

  }
}

export default World;