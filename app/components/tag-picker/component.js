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
  actions: {
    add() {
      this.set('showValidations', true);
      if (this.get('validations.isValid')) {
        let newTag = this.get('newTag').dasherize();
        this.attrs.add(newTag);
        this.set('newTag', null);
        this.set('showValidations', false);
      }
    },
    remove(tag) {
      this.attrs.remove(tag);
    }
  }
});
