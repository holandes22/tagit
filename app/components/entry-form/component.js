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
  showInvalid: Ember.computed('entry.{link,notes,ranking}', function() {
    return Object.keys(this.get('entry')).length !== 0;
  }),

  actions: {
    save() {
      this.attrs.save(this.get('entry'));
    }
  }
});
