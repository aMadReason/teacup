import Thing from '../tea/Thing';

const office = new Thing({ noun: 'office', fullname: 'small office' });

office.p.descriptions.default =
  'The [noun] is small but sparse, populated only with a set of old, cluttered shelves, a thread-bare computer chair, a nondescript desk with drawers and a waste paper bin. The room itself is dimly illuminated with by sick combination of blue monitor light and a buzzing fluorescent from an old tube light mounted above the desk.';

const bin = new Thing({ noun: 'bin' });
bin.p.descriptions.default = 'An aged, red-wire waste paper [noun] overflowing with paper sits under the desk.';

office.addThing(bin);

export default office;
