import Ember from 'ember';

export default Ember.Controller.extend({
  filters: Ember.inject.service(),

  actions: {
    save(entry) {
      let model = this.store.createRecord('entry', entry);
      model.save().then(() => {
        this.set('filters.lastEntry', model.id);
        //TODO: translate
        this.set('filters.lastEntryLabel', 'New');
        this.transitionToRoute('entries');
      });
    }
  }
});
