import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  actions: {
    del() {
      this.attrs.del(this.get('entry'));
    }
  }
});
