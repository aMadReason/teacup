import { reactive } from 'vue';
import { atmospheres, effects } from './sound';
import game from "./game";

const store = {
  debug: true,
  app: null,
  game: reactive(game),
  state: reactive({
    response: 'Command responses will display here when submitted.',
    more: false,
    view: true,
    lights: {
      hallway: true
    }
  }),
  atmospheres,
  scenes: {
    office: {
      bg: require("@/assets/jordan-grimmer-office2.jpg"),
      atmosphere: 'dark'
    },
    hallway: {
      bg: require("@/assets/jordan-grimmer-resirealistic4flat2.jpg"),
      atmosphere: 'anxiety'
    },
    sewer: {
      bg: require("@/assets/jordan-grimmer-sewer3fla23.jpg"),
      atmosphere: 'anxiety'
    },
    street: {
      bg: require("@/assets/jordan-grimmer-untitledress2.jpg"),
      atmosphere: 'anxiety'
    },
    apartment: {
      bg: require("@/assets/jordan-grimmer-untitledresinew3.jpg"),
      atmosphere: 'anxiety'
    }
  },
  singleCommand(attempt) {
    const { original } = attempt;
    if (original.toLowerCase() === 'view') this.state.view = !this.state.view;
    if (original.toLowerCase() === 'more') this.state.more = !this.state.more;
    if (original.toLowerCase() === 'clear') this.state.response = '';
  },
  playAtmosphere(key = this.state.game.location.key) {
    const scene = this.scenes[key];
    if (scene.atmosphere) this.atmospheres.crossFade(scene.atmosphere);
  },
  playSimpleSoundEffects(attempt) {
    //console.log(attempt);
    const { action, actOnThings } = attempt;
    const [first] = actOnThings;

    if (['take', 'pick', 'pickup'].includes(action)) {
      effects.play('pickup')
    }

    if (['open', 'use'].includes(action) && ['door'].includes(first.noun)) {
      effects.play('door')
    }

    // need to code to find the correct action and item sound
    //console.log({ locationAttempt, playerAttempt })
  },
  actionButton({ key, noun, name = false, action = 'help', label = false }) {
    return `<button class="button small" data-key="${key}" data-noun="${noun}" data-name="${name}" data-action="${action}">
    ${label || name}
    </button>`;
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
}

export default store;