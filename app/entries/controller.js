import Ember from 'ember';
import lodash from 'lodash';

// TODO: move to services/components/route-actions to remove this controller
export default Ember.Controller.extend({
  filters: Ember.inject.service(),

  flashMessages: Ember.inject.service(),

  showArchived: true,

  allTags: Ember.computed('model', function() {
    let entries = this.get('model'),
        tags = [];
    entries.forEach((entry) => {
      tags.push(entry.get('tags'));
    });
    return Array.from(new Set(lodash.flattenDeep(tags)));
  }),

  actions: {
    clearHighlight() {
      window.console.log('here');
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
