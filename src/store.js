import { reactive } from 'vue';

import locationOffice from './game/locationOffice';

const store = {
  debug: true,
  state: reactive({
    activeLocation: locationOffice.key,
    locations: [locationOffice],
    response: 'Command responses will display here when submitted.'
  }),
  getLocation(key = this.state.activeLocation) {
    return this.state.locations.find((i) => i.key === key);
  },
  actionButton({ key, noun, act = 'help', label = false }) {
    return `<button class="button small" data-key="${key}" data-noun="${noun}" data-action="${act}">
    ${label || noun}
    </button>`;
  },
  command(str) {
    this.state.setState({ response: str });
  }
};

export default store;
