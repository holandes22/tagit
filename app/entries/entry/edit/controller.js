import Ember from 'ember';

export default Ember.Controller.extend({
  entry: Ember.computed('model', function() {
    let model = this.get('model'),
        entry = model.toJSON();
    //TODO: toJSON does not apply transform to tags
    // so we need to to this manually, which sucks
    entry.tags = model.get('tags');
    return entry;
  }),

  actions: {
    save(properties) {
      let model = this.get('model');
      model.setProperties(properties);
      this.model.save().then(() => {
        this.transitionToRoute('entries.entry.show', model);
      });
    }
  }
});
