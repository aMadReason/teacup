import Thing from '../Thing';

import actions from '../actions'

const defaultActs = [
  { terms: ['flip'], act: 'toggleStateKey' },
];

export default function lightSwitch(thingProps, options, acts = defaultActs) {
  const prefab = new Thing({ ...thingProps, stateKey: 'on' });

  prefab.p.descriptions = {
    on: `The [name] is on`,
    off: `The [name] is off`,
    ...thingProps.descriptions
  }

  prefab.p.details = {
    on: `It's a simple switch, you can probably turn it on and off`,
    off: `It's a simple switch, you can probably turn it on and off`,
    ...prefab.p.descriptions
  }

  acts.map(a => {
    a.terms.map(term => {
      const ops = { on: 'on', off: 'off' };
      prefab.addAction(term, () => actions[a.act](prefab, ops, term));
    })
  });
  return prefab;
}
