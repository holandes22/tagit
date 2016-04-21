import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['active'],
  active: null,
  showArchived: true,
  actions: {
    clearActive() {
      this.set('active', null);
    }
  }
});
