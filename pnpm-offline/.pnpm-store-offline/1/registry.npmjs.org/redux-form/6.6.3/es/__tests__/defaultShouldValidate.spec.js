import expect from 'expect';
import plain from '../structure/plain';
import immutable from '../structure/immutable';
import defaultShouldValidate from '../defaultShouldValidate';

describe('defaultShouldValidate', function () {

  it('should validate when initialRender is true', function () {
    expect(defaultShouldValidate({
      initialRender: true
    })).toBe(true);
  });

  var describeDefaultShouldValidate = function describeDefaultShouldValidate(structure) {
    var fromJS = structure.fromJS;


    it('should validate if values have changed', function () {
      expect(defaultShouldValidate({
        initialRender: false,
        structure: structure,
        values: fromJS({
          foo: 'fooInitial'
        }),
        nextProps: {
          values: fromJS({
            foo: 'fooChanged'
          })
        }
      }), true);
    });

    it('should not validate if values have not changed', function () {
      expect(defaultShouldValidate({
        initialRender: false,
        structure: structure,
        values: fromJS({
          foo: 'fooInitial'
        }),
        nextProps: {
          values: fromJS({
            foo: 'fooInitial'
          })
        }
      }), false);
    });
    it('should validate if field validator keys have changed', function () {
      expect(defaultShouldValidate({
        initialRender: false,
        structure: structure,
        values: fromJS({
          foo: 'fooValue'
        }),
        nextProps: {
          values: fromJS({
            foo: 'fooValue'
          })
        },
        lastFieldValidatorKeys: [],
        fieldValidatorKeys: ['foo']
      }), true);
    });

    it('should not validate if field validator keys have not changed', function () {
      expect(defaultShouldValidate({
        initialRender: false,
        structure: structure,
        values: fromJS({
          foo: 'fooInitial'
        }),
        nextProps: {
          values: fromJS({
            foo: 'fooInitial'
          })
        },
        lastFieldValidatorKeys: ['foo'],
        fieldValidatorKeys: ['foo']
      }), false);
    });
  };

  describeDefaultShouldValidate(plain);
  describeDefaultShouldValidate(immutable);
});