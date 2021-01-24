export const take = (prefab) => {
  const player = prefab.world.player;
  const parent = prefab.parent;
  parent.removeThing(prefab.key);
  player.addThing(prefab);
  const res = prefab.sub(`Taken [name] from ${parent.name}`);
  return res;
}

export const drop = (prefab) => {
  const player = prefab.world.player;
  const location = prefab.world.location;
  player.removeThing(prefab.key);
  location.addThing(prefab);
  const res = prefab.sub(`Taken [name] from ${parent.name}`);
  return res;
}

export const goTo = (prefab, options) => {
  const world = prefab.world;
  const loc = world.getLocation(options.goTo);
  if (!loc) return 'Unknown location';
  world.setLocation(loc.key);
  return prefab.sub(`Moved to ${loc.name}`);
}

export default {
  take,
  drop,
  goTo
}