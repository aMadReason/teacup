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

const door = (world, { key, noun, fullname, description, detail, goToKey }) => {
  const prefab = new Thing({ key, noun, fullname });
  prefab.p.descriptions.default = description;
  prefab.p.details.default = detail

  prefab.addAction('open', () => {
    const location = world.getLocation(goToKey);
    console.log({ goToKey, location, world });
    if (!location) return 'Unknown location';
    world.setLocation(location.key);
    console.log({ world })
    return prefab.sub(`Moved to ${location.name}`);
  });

  return prefab;
};



export {
  door
}