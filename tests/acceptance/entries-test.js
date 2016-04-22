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

test('it adds a new entry', function(assert) {
  server.createList('entry', 2);
  visit('/entries/new');
  fillIn(testSelector('link'), 'http://fake.com');
  triggerEvent(testSelector('link'), 'input');
  click(testSelector('save-btn'));

  andThen(function() {
    assert.equal(currentURL(), '/entries');
    let context = find(testSelector('entries')).children().first();
    assert.equal(find(testSelector('entry-link'), context).text(), 'http://fake.com');
    //TODO: translate
    assert.equal(find(testSelector('ribbon'), context).text(), 'New');
    assert.equal(find(testSelector('flash-msg')).text(), 'Entry added');
  });
});

test('it edits an entry', function(assert) {
  server.createList('entry', 2);
  let entry = server.create('entry', { link: 'http://aa.com', archived: false});
  visit(`/entries/entry/${entry.id}/edit`);
  fillIn(testSelector('link'), 'http://bb.com');
  triggerEvent(testSelector('link'), 'input');
  click(testSelector('save-btn'));

  andThen(function() {
    assert.equal(currentURL(), '/entries');
    let context = find(testSelector('entries')).children().first();
    assert.equal(find(testSelector('entry-link'), context).text(), 'http://bb.com');
    //TODO: translate
    assert.equal(find(testSelector('ribbon'), context).text(), 'Last modified');
    assert.equal(find(testSelector('flash-msg')).text(), 'Entry changes were saved');
  });
});

/* TODO: this test fits better in the entry-form component test
test('it shows a flash message when adding the same tag in an entry-form', function(assert) {
  visit('/entries');
  click(testSelector('toggle-archived'));

  andThen(function() {
    assert.equal(currentURL(), '/entries');
    assert.equal(find(testSelector('entries')).children().length, 1);
  });
});
*/
