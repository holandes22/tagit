import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';


export default Ember.Component.extend({
  percent: 100,

  delay: 100,

  mouseUp() {
    this.set('percent', 100);
    this.get('task').cancelAll();
  },

  task: task(function * () {
    let percent = this.get('percent'),
        delay = this.get('delay');
    while(percent > 0) {
      percent = percent - 5;
      this.set('percent', percent);
      yield timeout(delay);
    }
    this.attrs.action();
  }).on('mouseDown').restartable()

});
