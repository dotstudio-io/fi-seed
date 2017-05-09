'use strict';

/**
 * Perform a very importat setup task
 */
function importantSetupTask(done) {
  console.log('Everything is ok, proceed.');
  done();
}

describe('SAVPA-PUBLIC TESTS SETUP', () => {
  it('should be ok...', (done) => {
    importantSetupTask(done);
  });
});