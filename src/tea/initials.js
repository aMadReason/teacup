export const initialProps = () => ({
  details: {
    default: `There is nothing remarkable about the [name]`
  },
  descriptions: {
    default: "It's a [name]! Better describe it!"
  }
});

export const initialActs = {
  examine: ({ me }) => me.sub(me.p.details[me.stateKey] || me.p.details.default),
  describe: ({ me }) => me.sub(me.p.descriptions[me.stateKey] || me.p.descriptions.default),
  help: ({ me }) => `The following actions can be used on the ${me.name}: ${me.sub('[actions]')}`
};

export const initialErrs = {
  empty: () => `Please enter something`,
  noThingSimple: ({ me, data }) => `There is no '${data.actOn || data.noun}' in the ${me.name}.`,
  noAction: ({ me, data }) =>
    me.sub(`The '${data.action}' action is not available for the [name].`),
  noNoun: () => "Commands should have at least a single noun.",
  multiMatch: ({ data }) => {
    return `There is more than one '${data.noun}' available, please specify which: ${data.things.map(i => `'${i.name}'`).join(', ')}.`
  }
};

export const initialSubs = {
  "[name]": ({ me }) => me.name,
  "[noun]": ({ me }) => me.noun,
  "[fullname]": ({ me }) => me.fullname,
  "[actions]": ({ me }) => me.actionList.join(", ").replace(/, ([^,]*)$/, " and $1")
};
