import Thing from '../tea/Thing';

export const player = (world) => {
  const player = new Thing({ key: 'player', noun: 'player', world });
  const item = new Thing({ key: 'office-key', noun: 'metal key' });
  player.addThing(item);
  return player;
};