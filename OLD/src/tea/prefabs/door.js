import Thing from '../Thing';

const door = (world, { key, noun, fullname, description, descriptions, detail, goToKey, actionWords = ['open'] }) => {
  const prefab = new Thing({ key, noun, fullname });
  prefab.p.descriptions = { ...descriptions, default: description || descriptions.default };
  prefab.p.details.default = detail

  actionWords.map(word => {
    prefab.addAction(word, () => {
      const location = world.getLocation(goToKey);
      if (!location) return 'Unknown location';
      world.setLocation(location.key);
      return prefab.sub(`Moved to ${location.name}`);
    });
  });

  return prefab;
};

export default door;