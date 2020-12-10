export const initialProps = () => ({
  details: {
    default: `There is nothing remarkable about the [name]`
  },
  descriptions: {
    default: "It's a [name]! Better describe it!"
  }
});

export const initialActs = {
  examine: ({ me }) => me.props.details[me.ennumKey],
  describe: ({ me }) => me.props.descriptions[me.ennumKey],
  help: () => "The following actions can be used on the [name]: [actions]"
};

export const initialErrs = {
  noThingSimple: ({ me, data }) => `There is no '${data.actOn || data.noun}' in the ${me.name}.`,
  noAction: ({ data }) =>
    `The '${data.action}' action is not available for the [name].`,
  noNoun: () => "Commands should have at least a single noun.",
  multiMatch: ({ me, data }) => {
    if (me.isPlayer === true) {
      return `There is more than one '${data.noun}' in the inventory, please specify which: ${data.things.map(i => `'${i.name}'`).join(', ')}.`
    }
    if (data.all === true) {
      return `There is more than one '${data.noun}' in the ${me.name} and inventory, please specify which: ${data.things.map(i => `'${i.name}'`).join(', ')}.`
    }
    return `There is more than one '${data.noun}' in the [name], please specify which: ${data.things.map(i => `'${i.name}'`).join(', ')}.`
  }
};

export const initialSubs = {
  "[name]": ({ me }) => me.name,
  "[noun]": ({ me }) => me.noun,
  "[fullname]": ({ me }) => me.fullname,
  "[actions]": ({ me }) => me.actionList.join(", ").replace(/, ([^,]*)$/, " and $1")
};
