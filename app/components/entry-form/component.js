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
            ranking = this.get('ranking'),
            tags = this.get('tags'),
            entry = { link, notes, archived, ranking, tags };
        this.attrs.save(entry);
      }
    },
    rate(callback, value) {
      //TODO: this raises, during tests a deprecation warning:
      //DEPRECATION: A property of <...> was modified inside the didInsertElement hook.
      this.set('ranking', value);
    }
  }
});
