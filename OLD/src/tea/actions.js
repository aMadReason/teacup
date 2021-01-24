const take = (prefab) => {
  const player = prefab.world.player;
  const parent = prefab.parent;
  parent.removeThing(prefab.key);
  player.addThing(prefab);
  const res = prefab.sub(`Taken [name] from ${parent.name}`);
  return res;
}

export {
  take
}