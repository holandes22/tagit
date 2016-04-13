import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    del() {
      this.attrs.del(this.get('entry'));
    }
  }
});
