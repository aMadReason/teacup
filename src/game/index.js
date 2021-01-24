import World from '../tea/World';
import Thing from '../tea/Thing';

import { item, door } from '../tea/prefabs/index';

// set up game
const world = new World().setLexicon({ open: 'Verb', round: 'Verb', use: 'Verb', fat: 'Adjective', climb: "Verb" });
const player = new Thing({ world, key: 'player', noun: 'player' });

// locations
const office = new Thing({ world, key: 'office', noun: 'office', fullname: 'small office', description: "The [name] is small but sparse, populated only with a set of old, cluttered shelves, a thread-bare computer chair, a nondescript desk with drawers and a waste paper bin. The room itself is dimly illuminated with by sick combination of blue monitor light and a buzzing fluorescent from an old tube light mounted above the desk." });
const hallway = new Thing({ world, key: 'hallway', noun: 'hallway' });
const sewer = new Thing({ world, key: 'sewer', noun: 'sewer' });
const street = new Thing({ world, key: 'street', noun: 'street' });
const apartment = new Thing({ world, key: 'apartment', noun: 'apartment' });

// items
const ball = item({ world, noun: 'ball', fullname: 'red ball', description: 'A small [name].' })
const officeDoor = door({ world, noun: 'door', fullname: 'metal door', description: 'A heavy looking [name].' }, { goTo: 'hallway' })
const hallwayDoor = door({ world, noun: 'door', fullname: 'metal door', description: 'A heavy looking [name].' }, { goTo: 'office' })
const hallwayCorner = door(
  { world, noun: 'corner', fullname: 'corner', description: 'The [name] at the end of the hall.' },
  { goTo: 'sewer' },
  [{ terms: ['turn', 'use'], act: 'goTo' }]
)
const sewerExit = door(
  { world, noun: 'ladder', fullname: 'metal ladder', description: 'A [name] is bolted to the wall beside you leading up to an open man hole cover.' },
  { goTo: 'street' },
  [{ terms: ['climb', 'use'], act: 'goTo' }]
)
const apartmentEntrance = door(
  { world, noun: 'door', fullname: 'apartment door', description: 'An [name] stands overlook the street where you climbed out.', detail: 'There is a placard on the door reading "1128"' },
  { goTo: 'apartment' }
)

// add locations
world.addLocation(office);
world.addLocation(hallway);
world.addLocation(sewer);
world.addLocation(street);
world.addLocation(apartment);
world.setLocation('office');

// place items
office.addThing(ball);
office.addThing(officeDoor);
hallway.addThing(hallwayDoor);
hallway.addThing(hallwayCorner);
sewer.addThing(sewerExit);
street.addThing(apartmentEntrance);

// add characters
world.addCharacter(player);

// set player
world.setPlayer('player');



export default world;