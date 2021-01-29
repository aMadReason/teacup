import Thing from '../Thing';

import actions from '../actions'

const defaultActs = [
  { terms: ['take', 'pick up'], act: 'take' },
  { terms: ['drop', 'leave', 'discard'], act: 'drop' }
];

export default function item(thingProps, options, acts = defaultActs) {
  const prefab = new Thing(thingProps);
  acts.map(a => {
    a.terms.map(term => {
      prefab.addAction(term, () => actions[a.act](prefab, options, term));
    })
  });
  return prefab;
}
