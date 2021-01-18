import Thing from './Thing';

// const door = (world, { key, noun, fullname, description, holdingKey, goToKey }) => {
//   const prefab = new Thing({ key, noun, fullname });
//   prefab.p.descriptions.default = description;
//   prefab.p.details = {
//     ...prefab.p.details,
//     locked: 'The [name] is locked. There is a keyhole under the handle.',
//     unlocked: 'The [name] is unlocked.'
//   };

//   const player = world.getCharacter();
//   const keyItem = player.things.find(i => i.key === holdingKey)

//   prefab.addAction('open', ({ me }) => {
//     if (!keyItem && me.stateKey === 'locked') return `The [name] needs a key.`;
//     if (keyItem && me.stateKey === 'locked') {
//       player.removeThing(keyItem.key);
//       prefab.stateKey = 'unlocked';
//       return 'The [name] is now unlocked.';
//     }

//     return 'The door is opened.'
//   });

//   prefab.stateKey = 'locked';
//   return prefab;
// };

const door = (world, { key, noun, fullname, description, descriptions, detail, goToKey, actionWords = ['open'] }) => {
  const prefab = new Thing({ key, noun, fullname });
  prefab.p.descriptions = { ...descriptions, default: description || descriptions.default };
  prefab.p.details.default = detail

  actionWords.map(word => {
    prefab.addAction(word, () => {
      const location = world.getLocation(goToKey);
      if (!location) return 'Unknown location';
      world.setLocation(location.key);
      return prefab.sub(`Moved to ${location.name}`);
    });
  });

  return prefab;
};


const item = (world, { key, noun, fullname, description, descriptions, detail }) => {
  const prefab = new Thing({ key, noun, fullname });
  prefab.p.descriptions = { ...descriptions, default: description || descriptions.default };
  prefab.p.details.default = detail;

  const take = () => {

    const player = prefab.world.player;
    const parent = prefab.parent;
    if (parent) parent.removeThing(prefab.key);
    if (player) player.addThing(prefab);
    return prefab.sub(`Taken [name] from ${parent.name}`);
  };
  prefab.addAction('take', take);
  prefab.addAction('pick', take);

  // const drop = () => {
  //   const location = prefab.world.getLocation();
  //   const player = prefab.world.player;
  //   if (player) player.removeThing(prefab.key);
  //   if (location) location.addThing(prefab);
  //   return prefab.sub(`Dropped [name] in ${location.name}`);
  // };
  // prefab.addAction('drop', drop);
  // prefab.addAction('leave', drop);

  return prefab;
}



export {
  door,
  item
}