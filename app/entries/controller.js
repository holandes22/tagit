import Ember from 'ember';

export default Ember.Controller.extend({
  filters: Ember.inject.service(),

  flashMessages: Ember.inject.service(),

  showArchived: true,

  actions: {
    clearHighlight() {
      this.set('filters.lastEntry', null);
    },
    delEntry(entryId) {
      let entry = this.get('store').peekRecord('entry', entryId);
      //TODO translate
      entry.destroyRecord().then(() => {
        this.get('flashMessages').positive('Entry deleted');
      });
    }
  }
});
