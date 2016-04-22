import { test } from 'qunit';
import moduleForAcceptance from 'tagit/tests/helpers/module-for-acceptance';
import testSelector from 'tagit/tests/helpers/ember-test-selectors';

moduleForAcceptance('Acceptance | entries');

test('visiting /entries lists all entries', function(assert) {
  server.createList('entry', 3);
  visit('/entries');

  andThen(function() {
    assert.equal(currentURL(), '/entries');
    assert.equal(find(testSelector('entries')).children().length, 3);
  });
});

test('it toggles archived entries', function(assert) {
  server.create('entry', { archived: true });
  server.create('entry', { archived: true });
  server.create('entry', { archived: false});
  visit('/entries');
  click(testSelector('toggle-archived'));

  andThen(function() {
    assert.equal(currentURL(), '/entries');
    assert.equal(find(testSelector('entries')).children().length, 1);
  });
});
