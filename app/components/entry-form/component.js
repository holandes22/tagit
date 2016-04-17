import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'entry.link': validator('presence', true),
  'entry.notes': validator('length', { max: 140 }),
  'entry.ranking': validator('number', {
    allowString: true,
    integer: true,
    positive: true,
    lte: 5
  })
});

export default Ember.Component.extend(Validations, {
  showInvalid: false,
  actions: {
    save() {
      if (this.get('validations.isInvalid')) {
        this.set('showInvalid', true);
      } else {
        this.attrs.save(this.get('entry'));
      }
    }
  }
});
