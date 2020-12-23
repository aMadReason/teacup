import { reactive } from 'vue';
import data from './data';
import { Howl } from 'howler';


class HowlerChannel {
  constructor(options) {
    const initial = { volume: 1.0, preload: true, autoplay: false, muted: false, rate: 1.0 }
    this.options = { ...initial, options };
    this.tracks = {};
  }
  addTrack(key, options = {}) {
    this.tracks[key] = new Howl({ ...this.options, ...options });
    return this;
  }
  getTrack(key) {
    return this.tracks[key];
  }
  play(key) {
    const track = this.getTrack(key);
    if (track) {
      track.play()
    }
  }
  updateTracks(options = {}) {
    const keys = Object.keys(this.tracks);
    const optionKeys = Object.keys({ ...this.options, ...options });
    keys.map(i => {
      const track = this.tracks[i];
      optionKeys.map(opt => track[opt] = options[opt])
    })
  }
  setVolume(volume) {
    this.volume = volume;
    this.updateTracks({ volume })
  }
}

const atmospheres = new HowlerChannel();
atmospheres.addTrack('dark', { volume: .2, src: require("@/assets/11-Dark fantasy Studio-Forensic (seamless).mp3") })

const store = {
  debug: true,
  game: reactive(data),
  state: reactive({
    overlayKey: 'start:one',
    response: 'Command responses will display here when submitted.',
    more: false,
    view: true,
    menu: false,
    overlay: true,
    triggerEl: null,
  }),
  atmospheres,
  scenes: {
    'small office': {
      bg: require("@/assets/jordan-grimmer-office2.jpg"),
      atmosphere: 'dark'
    },
    hallway: {
      bg: require("@/assets/resirealistic4flat2.jpg"),
      atmosphere: false
    }
  },
  playAtmosphere(key = this.game.activeLocationKey) {
    const scene = this.scenes[key];
    if (scene.atmosphere) {
      this.atmospheres.play(scene.atmosphere)
    }
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
  command(str) {
    const location = this.getLocation();
    const attempt = this.game.command(str);
    const { lAttempt, pAttempt } = attempt;

    if (!str && !lAttempt && !pAttempt) return null;

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
  }
};

export default store;
