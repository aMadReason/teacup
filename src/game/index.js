import World from '../tea/World';
import Thing from '../tea/Thing';

const office = new Thing({
  noun: 'office',
  fullname: 'small office'
});

const bin = new Thing({
  noun: 'bin'
});

office.p.descriptions.default =
  'The [noun] is small but sparse, populated only with a set of old, cluttered shelves, a thread-bare computer chair, a nondescript desk with drawers and a waste paper bin. The room itself is dimly illuminated with by sick combination of blue monitor light and a buzzing floursecent from an old tube light mounted above the desk.';
bin.p.descriptions.default =
  'An aged, red-wire waste paper [noun] overflowing with paper sits under the desk.';

office.addThing(bin);



const hallway = new Thing({
  noun: 'hall',
  fullname: 'hallway'
});

const door1 = new Thing({
  noun: 'door',
  fullname: 'hallway door'
});

hallway.addThing(door1);
const locations = [office, hallway];


const appleRed = new Thing({
  noun: 'apple',
  fullname: 'red apple'
});
const appleGreen = new Thing({
  noun: 'apple',
  fullname: 'green apple'
});
const appleYellow = new Thing({
  noun: 'apple',
  fullname: 'yellow apple'
});
const hat = new Thing({
  noun: 'hat',
  fullname: 'hat'
});
const player = new Thing({ key: 'player', noun: 'player' });
office.addThing(appleYellow)
player.addThing(appleRed).addThing(appleGreen).addThing(hat);
const characters = [player];


const game = new World({ locations, characters }).setPlayer('player');



export default game;