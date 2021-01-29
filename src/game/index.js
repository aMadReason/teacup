import World from '../tea/World';
import Thing from '../tea/Thing';

import { item, door, lightSwitch, eventTrigger } from '../tea/prefabs/index';

// set up game
const world = new World().setLexicon({
  open: 'Verb',
  round: 'Verb',
  use: 'Verb',
  fat: 'Adjective',
  climb: "Verb",
  upstair: "Adjective",
  front: "Adjective",
  light: 'Noun',
  switch: 'Noun',
  flip: 'Verb'
});
const player = new Thing({ world, key: 'player', noun: 'player' });

// locations
const office = new Thing({ world, key: 'office', noun: 'office', fullname: 'small office', description: "The [name] is small but sparse, populated only with a set of old, cluttered shelves, a thread-bare computer chair, a nondescript desk with drawers and a waste paper bin. The room itself is dimly illuminated with by sick combination of blue monitor light and a buzzing fluorescent from an old tube light mounted above the desk." });
const hallway = new Thing({ world, key: 'hallway', noun: 'hallway', description: "The [name] is in ruins. Fallen ceiling tiles rest on the ground near what appears to be blood stains and what appears to be something like claw gouges in the checkered floor. A light orange emergency light above the stains illuminates a simple potted plant that acts as a memorial for whatever atrocity occurred there. The walls are scarred and pockmarked both with age and possible combat. Down three steps is a dead-end, cracked walls, rubble and a fallen ceiling clustered together sealing away whatever secrets lay beyond. In the other direction is a stark pale light leading on and giant bloody claw rents across a pale grey wall of the path it leads to." });
const sewer = new Thing({ world, key: 'sewer', noun: 'sewer' });
const street = new Thing({ world, key: 'street', noun: 'street' });
const apartment = new Thing({ world, key: 'apartment', noun: 'apartment' });

// doors
const officeDoor = door({ world, noun: 'door', fullname: 'metal door', description: 'A heavy looking [name].' }, { goTo: 'hallway' })
const hallwayDoor = door({ world, noun: 'door', fullname: 'metal door', description: 'A heavy looking [name].' }, { goTo: 'office' })
const hallwayCorner = door(
  { world, noun: 'corner', fullname: 'corner', description: 'The [name] at the end of the hall.' },
  { goTo: 'sewer' },
  [{ terms: ['turn'], act: 'goTo' }]
)
const sewerCorner = door(
  { world, noun: 'corner', fullname: 'corner', description: 'The [name] behind you.' },
  { goTo: 'hallway' },
  [{ terms: ['turn'], act: 'goTo' }]
)
const sewerExit = door(
  { world, noun: 'ladder', fullname: 'metal ladder', description: 'A [name] is bolted to the wall beside you leading up to an open man hole cover.' },
  { goTo: 'street' },
  [{ terms: ['climb'], act: 'goTo' }]
)
const streetDoor = door(
  { world, noun: 'door', fullname: 'apartment door', description: 'An [name] stands overlook the street where you climbed out.', detail: 'There is a placard on the door reading "1128"' },
  { goTo: 'apartment' }
)
const streetExit = door(
  { world, noun: 'manhole', description: 'There is an [name] beside you.' },
  { goTo: 'sewer' }
)
const apartmentExit = door(
  { world, noun: 'door', fullname: "front door", description: 'The [name] is closed behind you.' },
  { goTo: 'street' }
);

// items
const computer = eventTrigger({ world, noun: 'computer', description: 'A [name].', detail: "it's locked" });
const ball = item({ world, noun: 'key', fullname: 'small key', description: 'A [name].' });
const hallwayLight = lightSwitch({
  world, noun: 'switch', fullname: 'light switch', descriptions: {
    on: "A simple [name]; it's on",
    off: "A simple [name]; it's off"
  }
});

// add locations
world.addLocation(office);
world.addLocation(hallway);
world.addLocation(sewer);
world.addLocation(street);
world.addLocation(apartment);
world.setLocation('office');

// add doors 
office.addThing(computer)
office.addThing(officeDoor);
hallway.addThing(hallwayCorner);
hallway.addThing(hallwayDoor);
sewer.addThing(sewerExit);
sewer.addThing(sewerCorner);
street.addThing(streetDoor);
street.addThing(streetExit);
apartment.addThing(apartmentExit)

// place items
office.addThing(ball);
hallway.addThing(hallwayLight)

// add characters
world.addCharacter(player);

// set player
world.setPlayer('player');



export default world;