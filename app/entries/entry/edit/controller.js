import Ember from 'ember';

export default Ember.Controller.extend({
  filters: Ember.inject.service(),

  entry: Ember.computed('model.{link,notes,archived,rating,tags}', function() {
    return this.get('model').toJSON();
  }),

  actions: {
    save(properties) {
      let model = this.get('model');
      model.setProperties(properties);
      this.model.save().then(() => {
        this.set('filters.lastEntry', model.id);
        //TODO: translate
        this.set('filters.lastEntryLabel', 'Last modified');
        this.transitionToRoute('entries');
      });
    }
  }
});
