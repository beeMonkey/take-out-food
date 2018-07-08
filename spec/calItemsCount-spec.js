const main = require('../main/best-charge')
describe('Take out food', function () {

    it('should return the [{barcode,count}]', function() {
      let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
      let outputs = main.calItemsCount(inputs);
      let expected =[ { id: 'ITEM0001', count: '1' },
      { id: 'ITEM0013', count: '2' },
      { id: 'ITEM0022', count: '1' } ] 
      expect(outputs).toEqual(expected)
    });
  });