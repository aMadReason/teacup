import cmdParser from "./CmdParser";
import {
  initialProps,
  initialActs,
  initialErrs,
  initialSubs
} from "./initials";

class Thing {
  constructor({
    key = null,
    noun = "",
    fullname = null,
    props = {},
    actions = {},
    things = [],
    stateKey = "default",
    subs = {},
    errs = {},
    world = false,
    parent = false
  }) {
    this.key = key || fullname || noun;
    this.noun = noun;
    this.fullname = fullname;
    this.props = { ...initialProps(), ...props };
    this.actions = { ...initialActs, ...actions };
    this.things = [...things];
    this.stateKey = stateKey;
    this.errs = { ...initialErrs, errs };
    this.subs = { ...initialSubs, ...subs };
    this.world = world;
    this.parent = parent;

  }

  get name() {
    return this.fullname || this.noun || this.key;
  }

  get actionList() {
    return [...Object.keys(this.actions)];
  }

  get thingList() {
    return this.things.map((i) => i.name);
  }

  get p() {
    return this.props;
  }

  get a() {
    return this.actions
  }

  get description() {
    return this.sub(this.props.descriptions[this.stateKey]);
  }

  get detail() {
    return this.sub(this.props.details[this.stateKey]);
  }

  /**
   * Substitutions used in props, actions and errors
   * @param {String} str 
   * @param {Object} subs 
   */
  sub(str, subs = this.subs) {
    if (typeof str !== "string") return null;
    Object.keys(subs).map((i) => (str = str.replace(i, subs[i]({ me: this }))));
    return str;
  }

  removeThing(key) {
    const thing = this.findThing(key);
    if (thing) {
      this.things = this.things.filter(i => i.key !== key);
    }
    return thing;
  }

  addThing(thing) {
    if (thing instanceof Thing === false) return null;
    thing.parent = this;

    if (this.world) {
      thing.world = this.world;
      const idx = this.world.things.findIndex(i => i.key === thing.key);
      if (idx > -1) {
        this.world.things[idx] = thing;
      } else {
        this.world.things.push(thing);
      }
    }

    this.things.push(thing);
    return this;
  }

  findThing(key) {
    return this.things.find(i => i.key === key)
  }

  findThings(word) {
    const things = [...this.things, this].filter((i) => {
      return [i.fullname, i.noun, i.key].includes(word);
    });
    return things;
  }

  getThings() {
    return this.things;
  }

  addAction(key, cb = () => { }) {
    this.actions[key] = cb;
  }

  getAction(key) {
    return this.actions[key];
  }

  callAction(key, data = {}) {
    const cb = this.actions[key];
    if (!cb) return this.errs.noAction({ data: { action: key } });
    if (typeof cb !== "function") return cb;
    const result = cb({ me: this, data });
    return result;
  }

  parse(command, lexicon = {}) {
    return cmdParser(command, lexicon);
  }

  tryAnd(command, lexicon = {}) {
    if (!command) return;
    const parsed = this.parse(command, lexicon);
    const { nouns, action, actOn, actWith, terms } = parsed;

    let type = "empty";
    let res = () => "unknown";

    if (terms && terms.length === 1) type = "single";
    if (actOn && action && !actWith) type = "simple";
    if (actOn && action && actWith) type = "complex";

    const actOnThings = actOn ? this.findThings(actOn) : false;
    const actWithThings = actWith ? this.findThings(actWith) : false;
    //const act = action ? this.findThings(action) : false;

    if (type === 'empty') {
      type = 'error';
      res = () => this.errs.empty();
    }

    if (type === "single") {
      const singleTxt = terms[0];
      const singleAct = this.getAction(singleTxt);
      res = () => this.errs.noAction(this, { action: singleTxt });
      if (singleAct) {
        res = () => this.callAction(singleTxt);
      }
    }

    if (type === "simple") {
      if (actOnThings && actOnThings.length === 0) {
        type = 'error';
        res = () => this.errs.noThingSimple({ me: this, data: { noun: nouns[0], actOn } });
      }
      if (actOnThings && actOnThings.length > 1) {
        type = 'error';
        res = () => this.errs.multiMatch({ me: this, data: { noun: nouns[0], things: actOnThings } })
      }
      if (actOnThings && actOnThings.length === 1) {
        res = () => actOnThings[0].callAction(action);
      }
    }

    const output = {
      res,
      type,
      actOnThings,
      actWithThings,
      //act,
      ...parsed
    }

    const event = new CustomEvent('build', { detail: { output } });
    window.dispatchEvent(event);

    return output;
  }
}

export default Thing;
