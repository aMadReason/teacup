import { reactive } from 'vue';

import game from './game';

const store = {
  debug: true,
  state: reactive({
    game,
    response: 'Command responses will display here when submitted.',
    more: false,
    view: true,
    menu: false,
    triggerEl: null,
  }),
  bgs: {
    office: "bgs/jordan-grimmer-office2.jpg"
  },
  getLocation(key = this.state.game.activeLocationKey) {
    return this.state.game.getLocation({ key });
  },
  getCharacter(key) {
    return this.state.game.getCharacter({ key });
  },
  getLocations() {
    return this.state.game.locations;
  },
  getInventory() {
    const player = this.getCharacter();
    return player ? player.things : [];
  },
  actionButton({ key, noun, action = 'help', label = false }) {
    return `<button class="button small" data-key="${key}" data-noun="${noun}" data-action="${action}">
    ${label || noun}
    </button>`;
  },
  singleCommand(attempt) {
    const { text } = attempt;
    if (text.toLowerCase() === 'view') this.state.view = !this.state.view;
    if (text.toLowerCase() === 'menu') this.state.menu = !this.state.menu;
    if (text.toLowerCase() === 'more') this.state.more = !this.state.more;

  },
  simpleCommand(attempt) {
    const { res, actOnThing } = attempt;
    const { key, noun } = actOnThing;
    const actions = actOnThing.actionList;
    let response = res();
    actions.map(i => {
      response = response.replace(i, this.actionButton({ key, noun, action: i, label: i }))
    });
    this.state.response = response;
  },
  command(str) {
    const attempt = this.state.game.command(str);



    // const loc = this.getLocation();
    // const attempt = loc.tryAnd(str);
    console.log(attempt)

    this.state.response = attempt.res();

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
