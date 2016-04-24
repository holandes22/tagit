import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';


export default Ember.Component.extend({
  remaining: 4,

  mouseUp() {
    this.set('remaining', 4);
    this.get('task').cancelAll();
  },

  task: task(function * () {
    let remaining = this.get('remaining');
    while(remaining > 0) {
      remaining = remaining - 1;
      this.set('remaining', remaining);
      yield timeout(500);
    }
    this.attrs.action();
  }).on('mouseDown').restartable()

});
