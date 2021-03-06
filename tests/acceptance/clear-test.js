import { module, test } from 'qunit'
import { later } from '@ember/runloop'
import { setupPBAcceptanceTest, setupLoggedUser } from '../helpers/utils'
import { currentURL, visit } from '@ember/test-helpers'

module('Acceptance | clear', function (hooks) {
  setupPBAcceptanceTest(hooks)
  setupLoggedUser(hooks)

  test('should clear all storage data', async function (assert) {
    await visit('clear')
    let storage = this.owner.lookup('service:storage')
    assert.notOk(storage.getUser())
  })

  test('should redirect to home', async function (assert) {
    await visit('clear')
    later(() => assert.equal(currentURL(), '/libros'), 1000)
  })

})
