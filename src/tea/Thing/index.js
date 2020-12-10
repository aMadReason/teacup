import cmdParser from "../CmdParser";
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
    ennumKey = "default",
    subs = {},
    errs = {},
    isPlayer = false,
  }) {
    this.key = key || fullname || noun;
    this.noun = noun;
    this.fullname = fullname;
    this.props = { ...initialProps(), ...props };
    this.actions = { ...initialActs, ...actions };
    this.things = [...things];
    this.ennumKey = ennumKey;
    this.errs = { ...initialErrs, errs };
    this.subs = { ...initialSubs, ...subs };
    this.isPlayer = isPlayer;
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

  addThing(thing) {
    if (thing instanceof Thing === false) return null;
    this.things.push(thing);
    return this;
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
    if (!cb) return this.sub(this.errs.noAction(this, { action: key }));
    if (typeof cb !== "function") return cb;
    const result = cb({ me: this, data });
    return this.sub(result);
  }

  parse(command) {
    return cmdParser(command);
  }

  tryAnd(command) {
    if (!command) return;
    const parsed = this.parse(command);
    const { nouns, action, actOn, actWith, terms } = parsed;

    let type = "empty";
    let res = () => "unknown";

    if (terms.length === 1) type = "single";
    if (actOn && action && !actWith) type = "simple";
    if (actOn && action && actWith) type = "complex";

    const actOnThings = actOn ? this.findThings(actOn) : false;
    const actWithThings = actWith ? this.findThings(actWith) : false;
    const act = action ? this.findThings(action) : false;

    if (type === "single") {
      const singleTxt = terms[0].text;
      const singleAct = this.getAction(singleTxt);
      res = () => this.sub(this.errs.noAction(this, { action: singleTxt }));
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
        res = () => this.sub(this.errs.multiMatch({ me: this, data: { noun: nouns[0], things: actOnThings } }))
      }
      if (actOnThings && actOnThings.length === 1) {
        res = () => actOnThings[0].callAction(action);
      }
    }

    return {
      res,
      type,
      actOnThings,
      actWithThings,
      act,
      ...parsed
    };
  }
}

export default Thing;
