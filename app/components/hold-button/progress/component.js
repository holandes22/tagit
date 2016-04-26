import Ember from 'ember';

export default Ember.Component.extend({
  style: Ember.computed('percent', function() {
    let percent = this.get('percent'),
        style = `transition-duration: 100ms; width: ${percent}%;`;
    return Ember.String.htmlSafe(style);
  }),
});
