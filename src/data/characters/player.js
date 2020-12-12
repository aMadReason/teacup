import Thing from '../../tea/Thing';



export default (world) => {
  const player = new Thing({ key: 'player', noun: 'player', world });
  const item = new Thing({ key: 'item', noun: 'item' });
  player.addThing(item);
  return player;
};