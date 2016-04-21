import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'link': validator('presence', true),
  'notes': validator('length', { max: 140 })
});

export default Ember.Component.extend(Validations, {
  showInvalid: false,
  init() {
    this._super(...arguments);
    let entry = this.get('entry');
    if (entry && Object.keys(entry).length !== 0) {
      this.setProperties(entry);
      this.set('tags', entry.tags.slice());
    }

    if (!entry || !entry.tags) {
      this.set('tags', []);
    }
  },
  actions: {
    addTag(tag) {
      let tags = this.get('tags');
      //TODO: show flash message if tag already there
      if (!tags.includes(tag)) {
        tags.pushObject(tag);
      }
    },
    removeTag(tag) {
      this.get('tags').removeObject(tag);
    },
    save() {
      if (this.get('validations.isInvalid')) {
        this.set('showInvalid', true);
      } else {
        let link = this.get('link'),
            notes = this.get('notes'),
            archived = this.get('archived'),
            rating = this.get('rating'),
            tags = this.get('tags'),
            entry = { link, notes, archived, rating, tags };
        this.attrs.save(entry);
      }
    },
    rate(callback, value) {
      //TODO: this raises a deprecation warning. browse to entry.new to see it
      //and also during test runs
      //DEPRECATION: A property of <...> was modified inside the didInsertElement hook.
      this.set('rating', value);
    }
  }
});
