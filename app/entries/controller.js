import Ember from 'ember';

export default Ember.Controller.extend({
  filters: Ember.inject.service(),

  showArchived: true,

  actions: {
    clearHighlight() {
      this.set('filters.lastEntry', null);
    }
  }
});
