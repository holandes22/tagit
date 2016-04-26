import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  filters: Ember.inject.service(),

  linkIsValid: Ember.computed('entry.link', function() {
    let link = this.get('entry.link');
    if (link) {
      return link.startsWith('http://') || link.startsWith('https://');
    }
    return false;
  }),

  actions: {
    del() {
      this.attrs.del(this.get('entry.id'));
    }
  }
});
