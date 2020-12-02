import Thing from '../tea/Thing';

const office = new Thing({
  noun: 'office',
  fullname: 'small office'
});

const bin = new Thing({
  noun: 'bin'
});

office.props.descriptions.default =
  'The [noun] is small but sparse, populated only with a set of old, cluttered shelves, a thread-bare computer chair, a nondescript desk with drawers and a waste paper bin. The room itself is dimly illuminated with by sick combination of blue monitor light and a buzzing floursecent from an old tube light mounted above the desk.';
bin.props.descriptions.default =
  'An aged, red-wire waste paper [noun] overflowing with paper sits under the desk.';

office.addThing(bin);
export default office;
