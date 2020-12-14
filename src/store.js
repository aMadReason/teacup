import { reactive } from 'vue';
import data from './data';

const store = {
  debug: true,
  game: reactive(data),
  state: reactive({
    response: 'Command responses will display here when submitted.',
    more: false,
    view: true,
    menu: false,
    triggerEl: null,
  }),
  bgs: {
    'small office': require("@/assets/jordan-grimmer-office2.jpg"),
    hallway: require("@/assets/resirealistic4flat2.jpg")
  },
  getLocation(key) {
    return this.game.getLocation(key || this.game.activeLocationKey);
  },
  getCharacter(key = this.game.playerCharacterKey) {
    return this.game.getCharacter(key);
  },
  getLocations() {
    return this.game.locations;
  },
  getInventory() {
    const player = this.getCharacter('player');
    return player ? player.things : [];
  },
  actionButton({ key, noun, name = false, action = 'help', label = false }) {
    return `<button class="button small" data-key="${key}" data-noun="${noun}" data-name="${name}" data-action="${action}">
    ${label || name}
    </button>`;
  },
  singleCommand(attempt) {
    const { original } = attempt;
    if (original.toLowerCase() === 'view') this.state.view = !this.state.view;
    if (original.toLowerCase() === 'menu') this.state.menu = !this.state.menu;
    if (original.toLowerCase() === 'more') this.state.more = !this.state.more;
    if (original.toLowerCase() === 'clear') this.state.response = '';
  },
  replaceActions(attempt) {
    const { res, actOnThings } = attempt;
    const { key, noun, name, actionList } = actOnThings[0];
    let response = res();
    if (actOnThings.length === 1) {
      actionList.map(i => {
        response = response.replace(i, this.actionButton({ key, noun, name, action: i, label: i }))
      });
    }
    return response;
  },
  replaceThings(attempt) {
    const { res, actOnThings } = attempt;
    let response = res();
    actOnThings.map(i => {
      response = response.replace(i.name, this.actionButton({
        key: i.key,
        noun: i.noun,
        name: i.name,
        action: 'help'
      }))
    });

    return response;
  },
  command(str) {
    const location = this.getLocation();
    const attempt = this.game.command(str);
    const { lAttempt, pAttempt } = attempt;

    const lThings = lAttempt.actOnThings;
    const pThings = pAttempt.actOnThings;

    if (lAttempt.type === 'single') {
      return this.singleCommand(lAttempt);
    }

    if (lThings.length > 0 && pThings.length > 0) {
      const things = [...lThings, ...pThings];
      return this.state.response = this.replaceThings({
        res: () => `There is more than one '${lThings[0].noun}' available in the ${location.name} and inventory, please specify; ${things.map(i => i.name).join(', ')}.`,
        actOnThings: things
      });
    }

    if (lThings.length === 1 && pThings.length === 0) {
      return this.state.response = this.replaceActions(lAttempt);
    }

    if (pThings.length === 1 && lThings.length === 0) {
      return this.state.response = this.replaceActions(pAttempt);
    }

    return this.state.response = this.replaceThings(lAttempt);
    // this.state.response = attempt.res();
    // switch (attempt.type) {
    //   case 'error':
    //     this.state.response = attempt.res();
    //     break;
    //   case 'simple':
    //     this.simpleCommand(attempt)
    //     break;
    //   case 'single':
    //     this.singleCommand(attempt)
    //     break;
    // }

  }
};

export default store;
