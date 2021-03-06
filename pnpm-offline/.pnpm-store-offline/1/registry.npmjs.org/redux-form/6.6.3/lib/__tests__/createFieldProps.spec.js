'use strict';

var _expect = require('expect');

var _createFieldProps = require('../createFieldProps');

var _createFieldProps2 = _interopRequireDefault(_createFieldProps);

var _plain = require('../structure/plain');

var _plain2 = _interopRequireDefault(_plain);

var _expectations = require('../structure/plain/expectations');

var _expectations2 = _interopRequireDefault(_expectations);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _expectations3 = require('../structure/immutable/expectations');

var _expectations4 = _interopRequireDefault(_expectations3);

var _addExpectations = require('./addExpectations');

var _addExpectations2 = _interopRequireDefault(_addExpectations);

var _tmp = require('tmp');

var _tmp2 = _interopRequireDefault(_tmp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var describeCreateFieldProps = function describeCreateFieldProps(name, structure, expect) {
  var empty = structure.empty,
      getIn = structure.getIn,
      fromJS = structure.fromJS,
      toJS = structure.toJS;


  describe(name, function () {
    it('should pass value through', function () {
      expect((0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', { value: 'hello' }).input.value).toBe('hello');
    });

    it('should pass dirty/pristine through', function () {
      expect((0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', { dirty: false, pristine: true }).meta.dirty).toBe(false);
      expect((0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', { dirty: false, pristine: true }).meta.pristine).toBe(true);
      expect((0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', { dirty: true, pristine: false }).meta.dirty).toBe(true);
      expect((0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', { dirty: true, pristine: false }).meta.pristine).toBe(false);
    });

    it('should provide onBlur', function () {
      var onBlur = (0, _expect.createSpy)();
      expect(onBlur).toNotHaveBeenCalled();
      var result = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', { value: 'bar', onBlur: onBlur });
      expect(result.input.onBlur).toBeA('function');
      expect(onBlur).toNotHaveBeenCalled();
      result.input.onBlur('rabbit');
      expect(onBlur).toHaveBeenCalled().toHaveBeenCalledWith('rabbit');
    });

    it('should provide onChange', function () {
      var onChange = (0, _expect.createSpy)();
      expect(onChange).toNotHaveBeenCalled();
      var result = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', { value: 'bar', onChange: onChange });
      expect(result.input.onChange).toBeA('function');
      expect(onChange).toNotHaveBeenCalled();
      result.input.onChange('rabbit');
      expect(onChange).toHaveBeenCalled().toHaveBeenCalledWith('rabbit');
    });

    it('should provide onFocus', function () {
      var onFocus = (0, _expect.createSpy)();
      expect(onFocus).toNotHaveBeenCalled();
      var result = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', { value: 'bar', onFocus: onFocus });
      expect(result.input.onFocus).toBeA('function');
      expect(onFocus).toNotHaveBeenCalled();
      result.input.onFocus('rabbit');
      expect(onFocus).toHaveBeenCalled();
    });

    it('should provide onDragStart', function () {
      var onDragStart = (0, _expect.createSpy)();
      var result = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', { value: 'bar', onDragStart: onDragStart });
      expect(result.input.onDragStart).toBeA('function');
    });

    it('should provide onDrop', function () {
      var onDrop = (0, _expect.createSpy)();
      var result = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', { value: 'bar', onDrop: onDrop });
      expect(result.input.onDrop).toBeA('function');
    });

    it('should read active from state', function () {
      var inactiveResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: empty
      });
      expect(inactiveResult.meta.active).toBe(false);
      var activeResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: fromJS({
          active: true
        })
      });
      expect(activeResult.meta.active).toBe(true);
    });

    it('should pass along submitting flag', function () {
      var notSubmittingResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar'
      });
      expect(notSubmittingResult.meta.submitting).toBe(false);
      var submittingResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        submitting: true
      });
      expect(submittingResult.meta.submitting).toBe(true);
    });

    it('should pass along submitFailed flag', function () {
      var notFailedResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar'
      });
      expect(notFailedResult.meta.submitFailed).toBe(false);
      var failedResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        submitFailed: true
      });
      expect(failedResult.meta.submitFailed).toBe(true);
    });

    it('should pass along all custom state props', function () {
      var pristineResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar'
      });
      expect(pristineResult.meta.customProp).toBe(undefined);
      var customResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: fromJS({
          customProp: 'my-custom-prop'
        })
      });
      expect(customResult.meta.customProp).toBe('my-custom-prop');
    });

    it('should not override canonical props with custom props', function () {
      var pristineResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar'
      });
      expect(pristineResult.meta.customProp).toBe(undefined);
      var customResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        submitting: true,
        state: fromJS({
          submitting: false
        })
      });
      expect(customResult.meta.submitting).toBe(true);
    });

    it('should read touched from state', function () {
      var untouchedResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: empty
      });
      expect(untouchedResult.meta.touched).toBe(false);
      var touchedResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: fromJS({
          touched: true
        })
      });
      expect(touchedResult.meta.touched).toBe(true);
    });

    it('should read visited from state', function () {
      var notVisitedResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: empty
      });
      expect(notVisitedResult.meta.visited).toBe(false);
      var visitedResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: fromJS({
          visited: true
        })
      });
      expect(visitedResult.meta.visited).toBe(true);
    });

    it('should read sync errors from prop', function () {
      var noErrorResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: empty
      });
      expect(noErrorResult.meta.error).toNotExist();
      expect(noErrorResult.meta.valid).toBe(true);
      expect(noErrorResult.meta.invalid).toBe(false);
      var errorResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: empty,
        syncError: 'This is an error'
      });
      expect(errorResult.meta.error).toBe('This is an error');
      expect(errorResult.meta.valid).toBe(false);
      expect(errorResult.meta.invalid).toBe(true);
    });

    it('should read sync warnings from prop', function () {
      var noWarningResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: empty
      });
      expect(noWarningResult.meta.warning).toNotExist();
      var warningResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: empty,
        syncWarning: 'This is an warning'
      });
      expect(warningResult.meta.warning).toBe('This is an warning');
    });

    it('should read async errors from state', function () {
      var noErrorResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: empty
      });
      expect(noErrorResult.meta.error).toNotExist();
      expect(noErrorResult.meta.valid).toBe(true);
      expect(noErrorResult.meta.invalid).toBe(false);
      var errorResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: empty,
        syncError: 'This is an error'
      });
      expect(errorResult.meta.error).toBe('This is an error');
      expect(errorResult.meta.valid).toBe(false);
      expect(errorResult.meta.invalid).toBe(true);
    });

    it('should read submit errors from state', function () {
      var noErrorResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: empty
      });
      expect(noErrorResult.meta.error).toNotExist();
      expect(noErrorResult.meta.valid).toBe(true);
      expect(noErrorResult.meta.invalid).toBe(false);
      var errorResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: empty,
        submitError: 'This is an error'
      });
      expect(errorResult.meta.error).toBe('This is an error');
      expect(errorResult.meta.valid).toBe(false);
      expect(errorResult.meta.invalid).toBe(true);
    });

    it('should prioritize sync errors over async or submit errors', function () {
      var noErrorResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: empty
      });
      expect(noErrorResult.meta.error).toNotExist();
      expect(noErrorResult.meta.valid).toBe(true);
      expect(noErrorResult.meta.invalid).toBe(false);
      var errorResult = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        asyncError: 'async error',
        submitError: 'submit error',
        syncError: 'sync error'
      });
      expect(errorResult.meta.error).toBe('sync error');
      expect(errorResult.meta.valid).toBe(false);
      expect(errorResult.meta.invalid).toBe(true);
    });

    it('should pass through other props', function () {
      var result = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: empty,
        someOtherProp: 'dog',
        className: 'my-class'
      });
      expect(result.initial).toNotExist();
      expect(result.state).toNotExist();
      expect(result.custom.someOtherProp).toBe('dog');
      expect(result.custom.className).toBe('my-class');
    });

    it('should pass through other props using props prop', function () {
      var result = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: empty,
        props: {
          someOtherProp: 'dog',
          className: 'my-class'
        }
      });
      expect(result.initial).toNotExist();
      expect(result.state).toNotExist();
      expect(result.custom.someOtherProp).toBe('dog');
      expect(result.custom.className).toBe('my-class');
    });

    it('should set checked for checkboxes', function () {
      expect((0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        state: empty,
        type: 'checkbox'
      }).input.checked).toBe(false);
      expect((0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: true,
        state: empty,
        type: 'checkbox'
      }).input.checked).toBe(true);
      expect((0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: false,
        state: empty,
        type: 'checkbox'
      }).input.checked).toBe(false);
    });

    it('should set checked for radio buttons', function () {
      expect((0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        state: empty,
        type: 'radio',
        _value: 'bar'
      }).input.checked).toBe(false);
      expect((0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'bar',
        state: empty,
        type: 'radio',
        _value: 'bar'
      }).input.checked).toBe(true);
      expect((0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: 'baz',
        state: empty,
        type: 'radio',
        _value: 'bar'
      }).input.checked).toBe(false);
    });

    it('should default value to [] for multi-selects', function () {
      expect((0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        state: empty,
        type: 'select-multiple'
      }).input.value).toBeA('array').toEqual([]);
    });

    it('should default value to undefined for file inputs', function () {
      expect((0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        state: empty,
        type: 'file'
      }).input.value).toEqual(undefined);
    });

    it('should update value to selected file for file inputs', function () {
      var tmpFile = _tmp2.default.fileSync();
      expect((0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        value: [tmpFile],
        state: empty,
        type: 'file'
      }).input.value).toEqual([tmpFile]);
    });

    it('should replace undefined value with empty string', function () {
      var result = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        state: empty
      });
      expect(result.input.value).toBe('');
    });

    it('should not format value when format prop is null', function () {
      var result = (0, _createFieldProps2.default)({ getIn: getIn, toJS: toJS }, 'foo', {
        state: empty,
        value: null,
        format: null
      });
      expect(result.input.value).toBe(null);
    });
  });
};

describeCreateFieldProps('createFieldProps.plain', _plain2.default, (0, _addExpectations2.default)(_expectations2.default));
describeCreateFieldProps('createFieldProps.immutable', _immutable2.default, (0, _addExpectations2.default)(_expectations4.default));