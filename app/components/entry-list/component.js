import Ember from 'ember';

export default Ember.Component.extend({
  filters: Ember.inject.service(),
  showArchived: true,
  sortBy: 'rating:desc',
  actions: {
    del(entryId) {
      this.attrs.del(entryId);
    }
  }
});
