import World from '../tea/World';

import { player } from './characters';
import { office, hallway } from './locations';


const game = new World().setLexicon({ open: 'Verb', round: 'Verb', use: 'Verb', fat: 'Adjective' });
game.addCharacter(player(game));
game.addLocation(office(game));
game.addLocation(hallway(game));

console.log(game);

export default game;