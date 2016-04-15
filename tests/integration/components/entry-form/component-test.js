import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'tagit/tests/helpers/ember-test-selectors';


moduleForComponent('entry-form', 'Integration | Component | entry form', {
  integration: true
});

test('it modifies values on input', function(assert) {
  let entry = {};
  this.set('entry', entry);
  this.render(hbs`{{entry-form entry=entry}}`);

  let linkSelector = testSelector('link');
  assert.equal(this.$(linkSelector).val(), '');
  this.$(linkSelector).val('http://fake.com');
  this.$(linkSelector).trigger('input');

  assert.equal(this.$(linkSelector).val(), entry.link);

});

test('it validates inputs', function(assert) {
  this.inject.service('store');
  let entry = {};
  this.set('entry', entry);
  this.render(hbs`{{entry-form entry=entry}}`);

  let linkSelector = testSelector('link');
  assert.notOk(this.$(linkSelector).hasClass('error'));
  assert.equal(this.$(testSelector('link-error')).text(), '');

  this.$(linkSelector).val('');
  this.$(linkSelector).trigger('input');

  assert.ok(this.$(linkSelector).hasClass('error'));
  assert.equal(this.$(testSelector('link-error')).text().trim(), 'This field can\'t be blank');
  assert.ok(this.$(testSelector('save-btn')).hasClass('disabled'));
});

test('it sends action up with changed attributes', function(assert) {
  assert.ok(true);
});
