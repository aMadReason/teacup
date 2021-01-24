import Thing from '../tea/Thing';

const bin = new Thing({ noun: 'bin' });
bin.p.descriptions.default = 'An aged, red-wire waste paper [name] overflowing with paper sits under the desk.';

const book1 = new Thing({ noun: 'book', fullname: 'fat book' });
book1.p.descriptions.default = 'A [name] so big you could bludgeon someone to death with it.';

const book2 = new Thing({ noun: 'book', fullname: 'blue book' });
book2.addAction('examine', () => 'There is a secret code in the cover, it reads "L33TZ"')
book2.p.descriptions.default = 'A [name] with a happy face on the cover.';

export {
  bin, book1, book2
}