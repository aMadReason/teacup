import Thing from '../tea/Thing';
import { bin, book1, book2 } from './items';

import { door, item } from '../tea/prefabs';

export const office = (world) => {
  const location = new Thing({ noun: 'office', fullname: 'small office', world });

  location.p.descriptions.default =
    'The [name] is small but sparse, populated only with a set of old, cluttered shelves, a thread-bare computer chair, a nondescript desk with drawers and a waste paper bin. The room itself is dimly illuminated with by sick combination of blue monitor light and a buzzing fluorescent from an old tube light mounted above the desk.';

  location.addThing(bin);
  location.addThing(book1)
  location.addThing(book2);


  const metalDoor = door(world, {
    noun: 'door',
    fullname: 'metal door',
    description: 'There is an old [name] with a worn handle.',
    detail: 'It should be easy to open the [name].',
    goToKey: 'hallway'
  });
  location.addThing(metalDoor)

  const ball = item(world, {
    noun: 'ball',
    fullname: 'red ball',
    description: 'A small [name].'
    // detail: 'It should be easy to open the [name].',
  });
  location.addThing(ball);

  return location
};

export const hallway = (world) => {
  const location = new Thing({ noun: 'hallway', world });

  location.p.descriptions.default =
    'The [name] is in ruins. Fallen ceiling tiles rest on the ground near what appears to be blood stains and what appears to be something like claw gouges in the checkered floor. A light orange emergency light above the stains illuminates a simple potted plant that acts as a memorial for whatever atrocity occurred there. The walls are scarred and pockmarked both with age and possible combat. Down three steps is a dead-end, cracked walls, rubble and a fallen ceiling clustered together sealing away whatever secrets lay beyond. In the other direction is a stark pale light leading on and giant bloody claw rents across a pale grey wall of the path it leads to.  ';

  const metalDoor = door(world, {
    noun: 'door',
    fullname: 'metal door',
    description: 'There is an old [name] with a worn handle.',
    detail: 'It should be easy to open the [name].',
    goToKey: 'small office',
  });
  location.addThing(metalDoor);

  const corner = door(world, {
    noun: 'corner',
    description: 'A bright white light can be seen shining from around the [name].',
    detail: 'The light is clinically white, and seems at odds with the dingy lighting everywhere else.',
    goToKey: 'small office',
    actionWords: ['round', 'use', 'turn']
  });
  location.addThing(corner);

  return location
};