import Thing from '../Thing';

import { take } from '../actions'

const item = (world, { key, noun, fullname, description, descriptions, detail }) => {
  const prefab = new Thing({ key, noun, fullname });
  prefab.p.descriptions = { ...descriptions, default: description || descriptions.default };
  prefab.p.details.default = detail;

  prefab.addAction('take', () => take(prefab));
  prefab.addAction('pick', () => take(prefab));

  return prefab;
}

export default item;