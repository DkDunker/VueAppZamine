// shims/view.js
import { ObservableArray as _ObservableArray, Utils, View as _View } from '@nativescript/core';

// Export exepected properties
export {
  backgroundColorProperty,
  CoercibleProperty,
  colorProperty,
  CSSProperty,
  CSSType,
  fontInternalProperty,
  fontSizeProperty,
  Length,
  letterSpacingProperty,
  makeParser,
  makeValidator,
  paddingBottomProperty,
  paddingLeftProperty,
  paddingRightProperty,
  paddingTopProperty,
  Property,
  textAlignmentProperty,
  textDecorationProperty,
  textTransformProperty,
} from '@nativescript/core';

export const layout = Utils.layout;

// Wrap ES7 classes from Nativescript to be extendable from ES2015 prototypes

// Proxy the original ObservableArray
export const ObservableArray = new Proxy(_ObservableArray, {
  apply(target, thisArg, args) {
    // Create a dummy constructor to bind the `thisArg` prototype to
    function TempHelperConstructor() {
      //
    }

    // Override the prototype with the actual class that we want
    TempHelperConstructor.prototype = thisArg;

    // Reflect.construct allows us to call the class constructor without the `new` keyword
    // And enables us to change the `this` context
    return Reflect.construct(target, args, TempHelperConstructor);
  },
});

// Proxy the original View class
export const View = new Proxy(_View, {
  apply(target, thisArg, args) {
    function TempHelperConstructor() {
      //
    }

    TempHelperConstructor.prototype = thisArg;

    return Reflect.construct(target, args, TempHelperConstructor);
  },
});