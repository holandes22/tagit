import Ember from 'ember';
import lodash from 'lodash';

export default Ember.Controller.extend({
  filters: Ember.inject.service(),

  flashMessages: Ember.inject.service(),

  entry: Ember.computed('model.{link,notes,archived,rating,tags}', function() {
    return this.get('model').toJSON();
  }),

  handleSaved() {
    //TODO: translate
    this.set('filters.lastEntry', this.get('model.id'));
    this.set('filters.lastEntryLabel', 'Last modified');
    this.get('flashMessages').positive('Entry changes were saved');
    this.transitionToRoute('entries');
  },

  actions: {
    save(properties) {
      let model = this.get('model');
      if (lodash.isEqual(model.toJSON(), properties)) {
        // Do not send an unnecessary PATCH request if no changes
        this.handleSaved();
      } else {
        model.setProperties(properties);
        this.model.save().then(() => {
          this.handleSaved();
        });
      }
    }
  }
});
