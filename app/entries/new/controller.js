import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save(entry) {
      let model = this.store.createRecord('entry', entry);
      model.save().then(() => {
        this.transitionToRoute('entries.entry.show', model);
      });
    }
  }
});
