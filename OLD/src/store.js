import { reactive } from 'vue';
import { atmospheres } from './sound';

const store = {
  debug: true,
  app: null,
  state: reactive({
    response: 'Command responses will display here when submitted.',
    more: false,
    view: true
  }),
  atmospheres,
  scenes: {
    'small office': {
      bg: require("@/assets/jordan-grimmer-office2.jpg"),
      atmosphere: 'dark'
    },
    hallway: {
      bg: require("@/assets/resirealistic4flat2.jpg"),
      atmosphere: 'anxiety'
    }
  },
  playAtmosphere(key = this.game.activeLocationKey) {
    const scene = this.scenes[key];
    if (scene.atmosphere) this.atmospheres.crossFade(scene.atmosphere);
  },

  actionButton({ key, noun, name = false, action = 'help', label = false }) {
    return `<button class="button small" data-key="${key}" data-noun="${noun}" data-name="${name}" data-action="${action}">
    ${label || name}
    </button>`;
  },
  singleCommand(attempt) {
    const { original } = attempt;
    if (original.toLowerCase() === 'view') this.state.view = !this.state.view;
    if (original.toLowerCase() === 'more') this.state.more = !this.state.more;
    if (original.toLowerCase() === 'clear') this.state.response = '';
  },
  replaceActions(attempt) {
    const { res, actOnThings } = attempt;
    const { key, noun, name, actionList } = actOnThings[0];
    let response = res();
    if (actOnThings.length === 1) {
      actionList.map(i => {
        const rgx = new RegExp("\\b" + i + "\\b")
        response = response.replace(rgx, this.actionButton({ key, noun, name, action: i, label: i }))
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
  handleSoundEffects({ locationAttempt = {}, playerAttempt = {} }) {
    const err = locationAttempt.type === 'error' && playerAttempt.type === 'error';
    if (err) return console.log(err);

    // need to code to find the correct action and item sound

    //console.log({ locationAttempt, playerAttempt })
  }
};

export default store;
