import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'tagit/tests/helpers/ember-test-selectors';


moduleForComponent('entry-form', 'Integration | Component | entry form', {
  integration: true
});

test('it validates inputs', function(assert) {
  let entry = {};
  this.set('entry', entry);
  this.render(hbs`{{entry-form entry=entry}}`);

  let linkSelector = testSelector('link');
  assert.notOk(this.$(linkSelector).hasClass('error'));
  assert.equal(this.$(testSelector('link-error')).text(), '');

  this.$(linkSelector).val('');
  this.$(testSelector('save-btn')).click();

  assert.ok(this.$(linkSelector).hasClass('error'));
  assert.equal(this.$(testSelector('link-error')).text().trim(), 'This field can\'t be blank');
});

test('it sends attributes up when creating', function(assert) {
  let link = 'http://fake.com';
  let save = function(entryToSave) {
    assert.equal(entryToSave.link, link);
  };
  this.set('actions', { save });
  this.render(hbs`{{entry-form save=(action 'save')}}`);

  assert.equal(this.$(testSelector('link-error')).text(), '');

  this.$(testSelector('link')).val(link);
  this.$(testSelector('save-btn')).click();
});

test('it sends action up with attributes', function(assert) {
  let entry = {
    link: 'http://fake.com',
    notes: 'fake',
    archived: true,
    ranking: 3,
    tags:[],
  };
  this.set('entry', entry);
  let save = function(entryToSave) {
    assert.equal(entryToSave.link, entry.link);
    assert.equal(entryToSave.notes, entry.notes);
    assert.equal(entryToSave.archived, entry.archived);
    assert.equal(entryToSave.ranking, entry.ranking);
    assert.equal(entryToSave.tags.length, entry.tags.length);
  };
  this.set('actions', { save });
  this.render(hbs`{{entry-form entry=entry save=(action 'save')}}`);

  this.$(testSelector('save-btn')).click();
});
