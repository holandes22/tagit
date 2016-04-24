import Ember from 'ember';

export default Ember.Route.extend({
  filters: Ember.inject.service(),

  model() {
    return this.store.findAll('entry');
  },

  actions: {
    willTransition() {
      this.set('filters.lastEntry', null);
      this.get('flashMessages').clearMessages();
      return true;
    }
  }
});
