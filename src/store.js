import { reactive } from 'vue';
import data from './data';
import { Howl } from 'howler';


class HowlerChannel {
  constructor(options) {
    const initial = { volume: 1.0, preload: true, autoplay: false, muted: false, rate: 1.0, fadeDuration: 2000 }
    this.options = { ...initial, ...options };
    this.tracks = {};
  }
  addTrack(key, options = {}) {
    const track = new Howl({ ...this.options, ...options });
    track.playing = false;

    track.on('end', () => {
      track.pos(0);
      track.playing = false;
    });

    track.on('stop', () => {
      track.pos(0);
      track.playing = false;
    });

    track.on('play', () => track.playing = true);

    this.tracks[key] = track;
    return this;
  }
  getTrack(key) {
    return this.tracks[key];
  }
  play(key) {
    const track = this.getTrack(key);
    if (track) {
      track.pos(0).play();
    }
  }
  fadeIn(key, duration = this.options.fadeDuration) {
    const track = this.getTrack(key);
    if (track && !track.playing) {
      this.play(key)
      track.fade(0, this.options.volume, duration);
    }
  }
  fadeOut(key, duration = this.options.fadeDuration) {
    const track = this.getTrack(key);
    if (track && track.playing) {
      track.fade(this.options.volume, 0, duration);
    }
  }
  crossFade(toKey) {
    const playing = Object.keys(this.tracks).filter(i => this.tracks[i].playing && i !== toKey);
    const to = this.getTrack(toKey);
    playing.map(i => this.fadeOut(i));
    if (to) this.fadeIn(toKey);
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

const atmospheres = new HowlerChannel({ volume: .3 });
atmospheres.addTrack('dark', { src: require("@/assets/atmosphere/very-low-note-by-kevin-macleod-from-filmmusic-io.mp3"), loop: true })
atmospheres.addTrack('anxiety', { src: require("@/assets/atmosphere/anxiety-by-kevin-macleod-from-filmmusic-io.mp3") })

const effects = new HowlerChannel({ volume: .3 });
effects.addTrack('pickup', { src: require("@/assets/kenny_rpg/handleSmallLeather2.ogg") })

const store = {
  debug: true,
  game: reactive(data),
  state: reactive({
    playerThings: data.player.things,
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

    console.log({ locationAttempt, playerAttempt })
  },
  command(str) {
    const location = this.getLocation();
    const attempt = this.game.command(str);
    const { lAttempt, pAttempt } = attempt;

    if (!str && !lAttempt && !pAttempt) return null;

    const lThings = lAttempt.actOnThings; // location attempt
    const pThings = pAttempt.actOnThings; // player attempt

    this.handleSoundEffects({ locationAttempt: lAttempt, playerAttempt: pAttempt })

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
