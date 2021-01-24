import World from '../tea/World';
import Thing from '../tea/Thing';
import { office } from './locations';

const game = new World().setLexicon({ open: 'Verb', round: 'Verb', use: 'Verb', fat: 'Adjective' });
const player = new Thing({ key: 'player', noun: 'player', game });

game.addCharacter(player);
game.setPlayer(player.key);
game.addLocation(office(game));
// game.addLocation(hallway(game));

export default game;