import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  newTag: [
    validator('presence', true),
    validator('length', { max: 25 }),
  ]
});

export default Ember.Component.extend(Validations, {
  tagName: '',
  newTag: null,
  init() {
    this._super(...arguments);
    if (!this.get('tags')) {
      this.set('tags', []);
    }
  },
  actions: {
    add() {
      this.set('showValidations', true);
      if (this.get('validations.isValid')) {
        let newTag = this.get('newTag').dasherize(),
            tags = this.get('tags');
        if (!tags.includes(newTag)) {
          tags.pushObject(newTag);
        }
        this.set('newTag', null);
        this.set('showValidations', false);
      }
    },
    remove(tag) {
      this.get('tags').removeObject(tag);
    }
  }
});
