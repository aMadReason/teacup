import Thing from '../Thing';
import actions from './actions';

const defaultActs = [{ terms: ['use', 'open'], act: 'goTo' }];

export function door(thingProps, options, acts = defaultActs) {
  const prefab = new Thing(thingProps);




  acts.map(a => {
    a.terms.map(term => {
      //console.log(term, options)
      const action = actions[a.act];
      prefab.addAction(term, () => action(prefab, options));
    })
  });

  //console.log(prefab)

  return prefab;
}

export default door;




