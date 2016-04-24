import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'link': validator('presence', true),
  'notes': validator('length', { max: 140 })
});

export default Ember.Component.extend(Validations, {
  flashMessages: Ember.inject.service(),
  rating: 0,
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
      if (!tags.includes(tag)) {
        tags.pushObject(tag);
      } else {
        //TODO: translate
        this.get('flashMessages').info('Skipping repeated tag');
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
    updateRate(params) {
      this.set('rating', params.rating);
    }
  }
});
