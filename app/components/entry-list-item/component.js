import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  filters: Ember.inject.service(),

  actions: {
    del() {
      this.attrs.del(this.get('entry'));
    }
  }
});
