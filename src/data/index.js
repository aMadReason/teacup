import World from '../tea/World';

import { player } from './characters';
import { office, hallway } from './locations';


const game = new World().setLexicon({ open: 'Verb' });
game.addCharacter(player(game));
game.addLocation(office(game));
game.addLocation(hallway(game));


export default game;