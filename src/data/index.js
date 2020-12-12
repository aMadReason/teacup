import World from '../tea/World';

import player from './characters/player';
import office from './office';

const game = new World();
game.addCharacter(player(game));

game.addLocation(office);

export default game;