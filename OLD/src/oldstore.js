import { reactive } from 'vue';

import office from './game/office';

const store = {
  debug: true,
  state: reactive({
    activeLocationKey: office.key,
    locations: [office],
    response: 'Command responses will display here when submitted.',
    more: false,
    view: true,
    menu: false,
    triggerEl: null,
  }),
  getLocation(key = this.state.activeLocationKey) {
    return this.state.locations.find((i) => i.key === key);
  },
  actionButton({ key, noun, action = 'help', label = false }) {
    return `<button class="button small" data-key="${key}" data-noun="${noun}" data-action="${action}">
    ${label || noun}
    </button>`;
  },
  singleCommand(attempt) {
    const { text } = attempt;
    console.log(attempt)
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
    const loc = this.getLocation();
    const attempt = loc.tryAnd(str);
    //console.log(attempt)

    switch (attempt.type) {
      case 'simple':
        this.simpleCommand(attempt)
        break;
      case 'single':
        this.singleCommand(attempt)
        break;
    }

  }
};

export default store;
