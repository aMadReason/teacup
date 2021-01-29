import Thing from '../Thing';
import actions from '../actions';

const defaultActs = [{ terms: ['use'], act: 'event' }];

export function eventTrigger(thingProps, options, acts = defaultActs) {
  const prefab = new Thing(thingProps);

  acts.map(a => {
    a.terms.map(term => {
      const action = actions[a.act];
      prefab.addAction(term, () => action(prefab, options, term));
    })
  });

  return prefab;
}

export default eventTrigger;




