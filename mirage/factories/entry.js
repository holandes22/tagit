import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({

  link(i) { return `http:\/\/a${i}.com`; },
  notes(i) { return `some notes for ${i}`; },
  archived() { return faker.random.boolean(); },
  rating() {
    return faker.random.number({ min: 1, max: 5 });
  },
  tags() {
    let limit = faker.random.number({ min: 0, max: 5 });
    return faker.lorem.words(limit);
  }

});
