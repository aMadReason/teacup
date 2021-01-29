import nlp from 'compromise';

export const event = (prefab, options = {}, term) => {
  const data = { detail: { prefab, options, term } };
  const event = new CustomEvent('tea-event', data, false);
  document.dispatchEvent(event);
  const action = nlp(term).verbs().toPastTense().text();
  return prefab.sub(`${action || 'used'} [name]`);
}

export const take = (prefab, options = {}, term) => {
  const player = prefab.world.player;
  const parent = prefab.parent;
  parent.removeThing(prefab.key);
  player.addThing(prefab);
  const res = prefab.sub(`Taken [name] from ${parent.name}`);
  event(prefab, options, term);
  return res;
}

export const drop = (prefab, options, term) => {
  const player = prefab.world.player;
  const location = prefab.world.location;
  player.removeThing(prefab.key);
  location.addThing(prefab);
  const res = prefab.sub(`Taken [name] from ${parent.name}`);
  event(prefab, options, term);
  return res;
}

export const goTo = (prefab, options, term) => {
  const world = prefab.world;
  const loc = world.getLocation(options.goTo);
  if (!loc) return 'Unknown location';
  world.setLocation(loc.key);
  const res = prefab.sub(`Moved to ${loc.name}`);
  event(prefab, options, term);
  return res;
}

export const toggleStateKey = (prefab, options, term) => {
  const { on, off } = options
  let key = prefab.stateKey
  key = key === on ? off : on;

  prefab.stateKey = key;

  const res = prefab.sub(`Turned [name] ${key}`);
  event(prefab, {}, term);
  return res;
}




export default {
  event,
  take,
  drop,
  goTo,
  toggleStateKey
}