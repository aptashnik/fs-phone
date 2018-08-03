const TestScenario = require('fs-base/TestScenario')
const wait = require('fs-base/Waiter')
const Phone = require('./Phone')


class BaseScenarioDataSet {
    constructor(controlID) {
        this.controlID = controlID;
    }
    toString() {
        return this.controlID;
    }
}

const alpabeticSymbolsDiscarded = new TestScenario('Alphabetical symbols are not allowed', controlID => {
    const cut = new Phone(controlID)
    cut.value = 'aaaaaaaaaaa'
    expect(
        wait(cut.isValid.bind(cut))
            .toBe(false)
            .forTime(3)
            .start()
    ).toBeFalsy()
}, BaseScenarioDataSet)


const partiallyFillIsAccepted = new TestScenario('Partially filled input passes validation', controlID => {
    const cut = new Phone(controlID)
    cut.value = '123'
    expect(
        wait(cut.isValid.bind(cut))
            .toBe(true)
            .forTime(3)
            .start()
    ).toBeTruthy()
}, BaseScenarioDataSet)

module.exports = { alpabeticSymbolsDiscarded, partiallyFillIsAccepted }