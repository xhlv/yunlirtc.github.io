/**
 * @license
 * yunli-vjs-player-yunli.js 0.0.37 <https://yunlizhihui.com>
 * Copyright Yunlizhihui, Inc. <https://yunlizhihui.com>
 * Available under Apache License Version 2.0
 */

 (function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(
        require('react'),
        require('video.js'),
        require('@yl/vjs-player-sdk/dist/yunli-vjs-skin.css')
      ))
    : typeof define === 'function' && define.amd
    ? define([
        'react',
        'video.js',
        '@yl/vjs-player-sdk/dist/yunli-vjs-skin.css'
      ], factory)
    : ((global = global || self),
      (global.YunliVjsPlayerWithApi = factory(global.React, global.videojs)));
})(this, function (React, videojs) {
  'use strict';

  React =
    React && Object.prototype.hasOwnProperty.call(React, 'default')
      ? React['default']
      : React;
  videojs =
    videojs && Object.prototype.hasOwnProperty.call(videojs, 'default')
      ? videojs['default']
      : videojs;

  var commonjsGlobal =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
      ? self
      : {};

  function unwrapExports(x) {
    return x &&
      x.__esModule &&
      Object.prototype.hasOwnProperty.call(x, 'default')
      ? x['default']
      : x;
  }

  function createCommonjsModule(fn, module) {
    return (
      (module = { exports: {} }), fn(module, module.exports), module.exports
    );
  }

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () {
      return this;
    })() ||
    Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return (
      Object.defineProperty({}, 1, {
        get: function () {
          return 7;
        }
      })[1] != 7
    );
  });

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG =
    getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f = NASHORN_BUG
    ? function propertyIsEnumerable(V) {
        var descriptor = getOwnPropertyDescriptor(this, V);
        return !!descriptor && descriptor.enumerable;
      }
    : $propertyIsEnumerable;

  var objectPropertyIsEnumerable = {
    f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  })
    ? function (it) {
        return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
      }
    : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings

  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var path = {};

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2
      ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : (path[namespace] && path[namespace][method]) ||
          (global_1[namespace] && global_1[namespace][method]);
  };

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var process = global_1.process;
  var Deno = global_1.Deno;
  var versions = (process && process.versions) || (Deno && Deno.version);
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] < 4 ? 1 : match[0] + match[1];
  } else if (engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  /* eslint-disable es/no-symbol -- required for testing */

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol =
    !!Object.getOwnPropertySymbols &&
    !fails(function () {
      var symbol = Symbol();
      // Chrome 38 Symbol has incorrect toString conversion
      // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
      return (
        !String(symbol) ||
        !(Object(symbol) instanceof Symbol) ||
        // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        (!Symbol.sham && engineV8Version && engineV8Version < 41)
      );
    });

  /* eslint-disable es/no-symbol -- required for testing */

  var useSymbolAsUid =
    nativeSymbol && !Symbol.sham && typeof Symbol.iterator == 'symbol';

  var isSymbol = useSymbolAsUid
    ? function (it) {
        return typeof it == 'symbol';
      }
    : function (it) {
        var $Symbol = getBuiltIn('Symbol');
        return typeof $Symbol == 'function' && Object(it) instanceof $Symbol;
      };

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive = function (input, pref) {
    var fn, val;
    if (
      pref === 'string' &&
      typeof (fn = input.toString) == 'function' &&
      !isObject((val = fn.call(input)))
    )
      return val;
    if (
      typeof (fn = input.valueOf) == 'function' &&
      !isObject((val = fn.call(input)))
    )
      return val;
    if (
      pref !== 'string' &&
      typeof (fn = input.toString) == 'function' &&
      !isObject((val = fn.call(input)))
    )
      return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var isPure = true;

  var setGlobal = function (key, value) {
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty(global_1, key, {
        value: value,
        configurable: true,
        writable: true
      });
    } catch (error) {
      global_1[key] = value;
    }
    return value;
  };

  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store;

  var shared = createCommonjsModule(function (module) {
    (module.exports = function (key, value) {
      return (
        sharedStore[key] ||
        (sharedStore[key] = value !== undefined ? value : {})
      );
    })('versions', []).push({
      version: '3.16.3',
      mode: 'pure',
      copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
    });
  });

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has =
    Object.hasOwn ||
    function hasOwn(it, key) {
      return hasOwnProperty.call(toObject(it), key);
    };

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return (
      'Symbol(' +
      String(key === undefined ? '' : key) +
      ')_' +
      (++id + postfix).toString(36)
    );
  };

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global_1.Symbol;
  var createWellKnownSymbol = useSymbolAsUid
    ? Symbol$1
    : (Symbol$1 && Symbol$1.withoutSetter) || uid;

  var wellKnownSymbol = function (name) {
    if (
      !has(WellKnownSymbolsStore, name) ||
      !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')
    ) {
      if (nativeSymbol && has(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
      }
    }
    return WellKnownSymbolsStore[name];
  };

  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive = function (input, pref) {
    if (!isObject(input) || isSymbol(input)) return input;
    var exoticToPrim = input[TO_PRIMITIVE];
    var result;
    if (exoticToPrim !== undefined) {
      if (pref === undefined) pref = 'default';
      result = exoticToPrim.call(input, pref);
      if (!isObject(result) || isSymbol(result)) return result;
      throw TypeError("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : String(key);
  };

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine =
    !descriptors &&
    !fails(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
      return (
        Object.defineProperty(documentCreateElement('div'), 'a', {
          get: function () {
            return 7;
          }
        }).a != 7
      );
    });

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$1 = descriptors
    ? $getOwnPropertyDescriptor
    : function getOwnPropertyDescriptor(O, P) {
        O = toIndexedObject(O);
        P = toPropertyKey(P);
        if (ie8DomDefine)
          try {
            return $getOwnPropertyDescriptor(O, P);
          } catch (error) {
            /* empty */
          }
        if (has(O, P))
          return createPropertyDescriptor(
            !objectPropertyIsEnumerable.f.call(O, P),
            O[P]
          );
      };

  var objectGetOwnPropertyDescriptor = {
    f: f$1
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL
      ? true
      : value == NATIVE
      ? false
      : typeof detection == 'function'
      ? fails(detection)
      : !!detection;
  };

  var normalize = (isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  });

  var data = (isForced.data = {});
  var NATIVE = (isForced.NATIVE = 'N');
  var POLYFILL = (isForced.POLYFILL = 'P');

  var isForced_1 = isForced;

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    }
    return it;
  };

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0:
        return function () {
          return fn.call(that);
        };
      case 1:
        return function (a) {
          return fn.call(that, a);
        };
      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    }
    return it;
  };

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f$2 = descriptors
    ? $defineProperty
    : function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPropertyKey(P);
        anObject(Attributes);
        if (ie8DomDefine)
          try {
            return $defineProperty(O, P, Attributes);
          } catch (error) {
            /* empty */
          }
        if ('get' in Attributes || 'set' in Attributes)
          throw TypeError('Accessors not supported');
        if ('value' in Attributes) O[P] = Attributes.value;
        return O;
      };

  var objectDefineProperty = {
    f: f$2
  };

  var createNonEnumerableProperty = descriptors
    ? function (object, key, value) {
        return objectDefineProperty.f(
          object,
          key,
          createPropertyDescriptor(1, value)
        );
      }
    : function (object, key, value) {
        object[key] = value;
        return object;
      };

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;

  var wrapConstructor = function (NativeConstructor) {
    var Wrapper = function (a, b, c) {
      if (this instanceof NativeConstructor) {
        switch (arguments.length) {
          case 0:
            return new NativeConstructor();
          case 1:
            return new NativeConstructor(a);
          case 2:
            return new NativeConstructor(a, b);
        }
        return new NativeConstructor(a, b, c);
      }
      return NativeConstructor.apply(this, arguments);
    };
    Wrapper.prototype = NativeConstructor.prototype;
    return Wrapper;
  };

  /*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var PROTO = options.proto;

    var nativeSource = GLOBAL
      ? global_1
      : STATIC
      ? global_1[TARGET]
      : (global_1[TARGET] || {}).prototype;

    var target = GLOBAL
      ? path
      : path[TARGET] || createNonEnumerableProperty(path, TARGET, {})[TARGET];
    var targetPrototype = target.prototype;

    var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
    var key,
      sourceProperty,
      targetProperty,
      nativeProperty,
      resultProperty,
      descriptor;

    for (key in source) {
      FORCED = isForced_1(
        GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key,
        options.forced
      );
      // contains in native
      USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);

      targetProperty = target[key];

      if (USE_NATIVE)
        if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor$1(nativeSource, key);
          nativeProperty = descriptor && descriptor.value;
        } else nativeProperty = nativeSource[key];

      // export native or implementation
      sourceProperty =
        USE_NATIVE && nativeProperty ? nativeProperty : source[key];

      if (USE_NATIVE && typeof targetProperty === typeof sourceProperty)
        continue;

      // bind timers to global for call from export context
      if (options.bind && USE_NATIVE)
        resultProperty = functionBindContext(sourceProperty, global_1);
      // wrap global constructors for prevent changs in this version
      else if (options.wrap && USE_NATIVE)
        resultProperty = wrapConstructor(sourceProperty);
      // make static versions for prototype methods
      else if (PROTO && typeof sourceProperty == 'function')
        resultProperty = functionBindContext(Function.call, sourceProperty);
      // default case
      else resultProperty = sourceProperty;

      // add a flag to not completely full polyfills
      if (
        options.sham ||
        (sourceProperty && sourceProperty.sham) ||
        (targetProperty && targetProperty.sham)
      ) {
        createNonEnumerableProperty(resultProperty, 'sham', true);
      }

      createNonEnumerableProperty(target, key, resultProperty);

      if (PROTO) {
        VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
        if (!has(path, VIRTUAL_PROTOTYPE)) {
          createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
        }
        // export virtual prototype methods
        createNonEnumerableProperty(
          path[VIRTUAL_PROTOTYPE],
          key,
          sourceProperty
        );
        // export real prototype methods
        if (options.real && targetPrototype && !targetPrototype[key]) {
          createNonEnumerableProperty(targetPrototype, key, sourceProperty);
        }
      }
    }
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN((argument = +argument))
      ? 0
      : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1fffffffffffff) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el)
        while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare -- NaN check
          if (value != value) return true;
          // Array#indexOf ignores holes, Array#includes - not
        }
      else
        for (; length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el)
            return IS_INCLUDES || index || 0;
        }
      return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };

  var hiddenKeys = {};

  var indexOf = arrayIncludes.indexOf;

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i)
      if (has(O, (key = names[i++]))) {
        ~indexOf(result, key) || result.push(key);
      }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys =
    Object.keys ||
    function keys(O) {
      return objectKeysInternal(O, enumBugKeys);
    };

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties = descriptors
    ? Object.defineProperties
    : function defineProperties(O, Properties) {
        anObject(O);
        var keys = objectKeys(Properties);
        var length = keys.length;
        var index = 0;
        var key;
        while (length > index)
          objectDefineProperty.f(O, (key = keys[index++]), Properties[key]);
        return O;
      };

  var html = getBuiltIn('document', 'documentElement');

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  /* global ActiveXObject -- old IE, WSH */

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey('IE_PROTO');

  var EmptyConstructor = function () {
    /* empty */
  };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) {
      /* ignore */
    }
    NullProtoObject =
      typeof document != 'undefined'
        ? document.domain && activeXDocument
          ? NullProtoObjectViaActiveX(activeXDocument) // old IE
          : NullProtoObjectViaIFrame()
        : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate =
    Object.create ||
    function create(O, Properties) {
      var result;
      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO] = O;
      } else result = NullProtoObject();
      return Properties === undefined
        ? result
        : objectDefineProperties(result, Properties);
    };

  var slice = [].slice;
  var factories = {};

  var construct = function (C, argsLength, args) {
    if (!(argsLength in factories)) {
      for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
      // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
      factories[argsLength] = Function(
        'C,a',
        'return new C(' + list.join(',') + ')'
      );
    }
    return factories[argsLength](C, args);
  };

  // `Function.prototype.bind` method implementation
  // https://tc39.es/ecma262/#sec-function.prototype.bind
  var functionBind =
    Function.bind ||
    function bind(that /* , ...args */) {
      var fn = aFunction$1(this);
      var partArgs = slice.call(arguments, 1);
      var boundFunction = function bound(/* args... */) {
        var args = partArgs.concat(slice.call(arguments));
        return this instanceof boundFunction
          ? construct(fn, args.length, args)
          : fn.apply(that, args);
      };
      if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
      return boundFunction;
    };

  var nativeConstruct = getBuiltIn('Reflect', 'construct');

  // `Reflect.construct` method
  // https://tc39.es/ecma262/#sec-reflect.construct
  // MS Edge supports only 2 arguments and argumentsList argument is optional
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
  var NEW_TARGET_BUG = fails(function () {
    function F() {
      /* empty */
    }
    return !(
      nativeConstruct(
        function () {
          /* empty */
        },
        [],
        F
      ) instanceof F
    );
  });
  var ARGS_BUG = !fails(function () {
    nativeConstruct(function () {
      /* empty */
    });
  });
  var FORCED = NEW_TARGET_BUG || ARGS_BUG;

  _export(
    { target: 'Reflect', stat: true, forced: FORCED, sham: FORCED },
    {
      construct: function construct(Target, args /* , newTarget */) {
        aFunction$1(Target);
        anObject(args);
        var newTarget =
          arguments.length < 3 ? Target : aFunction$1(arguments[2]);
        if (ARGS_BUG && !NEW_TARGET_BUG)
          return nativeConstruct(Target, args, newTarget);
        if (Target == newTarget) {
          // w/o altered newTarget, optimization for 0-4 arguments
          switch (args.length) {
            case 0:
              return new Target();
            case 1:
              return new Target(args[0]);
            case 2:
              return new Target(args[0], args[1]);
            case 3:
              return new Target(args[0], args[1], args[2]);
            case 4:
              return new Target(args[0], args[1], args[2], args[3]);
          }
          // w/o altered newTarget, lot of arguments case
          var $args = [null];
          $args.push.apply($args, args);
          return new (functionBind.apply(Target, $args))();
        }
        // with altered newTarget, not support built-in constructors
        var proto = newTarget.prototype;
        var instance = objectCreate(isObject(proto) ? proto : Object.prototype);
        var result = Function.apply.call(Target, instance, args);
        return isObject(result) ? result : instance;
      }
    }
  );

  var construct$1 = path.Reflect.construct;

  var construct$2 = construct$1;

  var construct$3 = construct$2;

  var FAILS_ON_PRIMITIVES = fails(function () {
    objectKeys(1);
  });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  _export(
    { target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES },
    {
      keys: function keys(it) {
        return objectKeys(toObject(it));
      }
    }
  );

  var keys$1 = path.Object.keys;

  var keys$2 = keys$1;

  var keys$3 = keys$2;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray =
    Array.isArray ||
    function isArray(arg) {
      return classofRaw(arg) == 'Array';
    };

  var toString_1 = function (argument) {
    if (isSymbol(argument))
      throw TypeError('Cannot convert a Symbol value to a string');
    return String(argument);
  };

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  var f$3 =
    Object.getOwnPropertyNames ||
    function getOwnPropertyNames(O) {
      return objectKeysInternal(O, hiddenKeys$1);
    };

  var objectGetOwnPropertyNames = {
    f: f$3
  };

  /* eslint-disable es/no-object-getownpropertynames -- safe */

  var $getOwnPropertyNames = objectGetOwnPropertyNames.f;

  var toString$1 = {}.toString;

  var windowNames =
    typeof window == 'object' && window && Object.getOwnPropertyNames
      ? Object.getOwnPropertyNames(window)
      : [];

  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames(it);
    } catch (error) {
      return windowNames.slice();
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var f$4 = function getOwnPropertyNames(it) {
    return windowNames && toString$1.call(it) == '[object Window]'
      ? getWindowNames(it)
      : $getOwnPropertyNames(toIndexedObject(it));
  };

  var objectGetOwnPropertyNamesExternal = {
    f: f$4
  };

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  var f$5 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
    f: f$5
  };

  var redefine = function (target, key, value, options) {
    if (options && options.enumerable) target[key] = value;
    else createNonEnumerableProperty(target, key, value);
  };

  var f$6 = wellKnownSymbol;

  var wellKnownSymbolWrapped = {
    f: f$6
  };

  var defineProperty = objectDefineProperty.f;

  var defineWellKnownSymbol = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!has(Symbol, NAME))
      defineProperty(Symbol, NAME, {
        value: wellKnownSymbolWrapped.f(NAME)
      });
  };

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var test = {};

  test[TO_STRING_TAG] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS =
    classofRaw(
      (function () {
        return arguments;
      })()
    ) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) {
      /* empty */
    }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = toStringTagSupport
    ? classofRaw
    : function (it) {
        var O, tag, result;
        return it === undefined
          ? 'Undefined'
          : it === null
          ? 'Null'
          : // @@toStringTag case
          typeof (tag = tryGet((O = Object(it)), TO_STRING_TAG$1)) == 'string'
          ? tag
          : // builtinTag case
          CORRECT_ARGUMENTS
          ? classofRaw(O)
          : // ES3 arguments fallback
          (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function'
          ? 'Arguments'
          : result;
      };

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = toStringTagSupport
    ? {}.toString
    : function toString() {
        return '[object ' + classof(this) + ']';
      };

  var defineProperty$1 = objectDefineProperty.f;

  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

  var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
    if (it) {
      var target = STATIC ? it : it.prototype;
      if (!has(target, TO_STRING_TAG$2)) {
        defineProperty$1(target, TO_STRING_TAG$2, {
          configurable: true,
          value: TAG
        });
      }
      if (SET_METHOD && !toStringTagSupport) {
        createNonEnumerableProperty(target, 'toString', objectToString);
      }
    }
  };

  var functionToString = Function.toString;

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof sharedStore.inspectSource != 'function') {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap = global_1.WeakMap;

  var nativeWeakMap =
    typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap$1 = global_1.WeakMap;
  var set, get, has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      }
      return state;
    };
  };

  if (nativeWeakMap || sharedStore.state) {
    var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
    var wmget = store$1.get;
    var wmhas = store$1.has;
    var wmset = store$1.set;
    set = function (it, metadata) {
      if (wmhas.call(store$1, it))
        throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset.call(store$1, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store$1, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store$1, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      if (has(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var SPECIES = wellKnownSymbol('species');

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor = function (originalArray) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype)))
        C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    }
    return C === undefined ? Array : C;
  };

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(
      length === 0 ? 0 : length
    );
  };

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod$1 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP
        ? create($this, length)
        : IS_FILTER || IS_FILTER_REJECT
        ? create($this, 0)
        : undefined;
      var value, result;
      for (; length > index; index++)
        if (NO_HOLES || index in self) {
          value = self[index];
          result = boundFunction(value, index, O);
          if (TYPE) {
            if (IS_MAP) target[index] = result;
            // map
            else if (result)
              switch (TYPE) {
                case 3:
                  return true; // some
                case 5:
                  return value; // find
                case 6:
                  return index; // findIndex
                case 2:
                  push.call(target, value); // filter
              }
            else
              switch (TYPE) {
                case 4:
                  return false; // every
                case 7:
                  push.call(target, value); // filterReject
              }
          }
        }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$1(7)
  };

  var $forEach = arrayIteration.forEach;

  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE$1 = 'prototype';
  var TO_PRIMITIVE$1 = wellKnownSymbol('toPrimitive');
  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE$1];
  var $Symbol = global_1.Symbol;
  var $stringify = getBuiltIn('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var nativeDefineProperty = objectDefineProperty.f;
  var nativeGetOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = objectPropertyIsEnumerable.f;
  var AllSymbols = shared('symbols');
  var ObjectPrototypeSymbols = shared('op-symbols');
  var StringToSymbolRegistry = shared('string-to-symbol-registry');
  var SymbolToStringRegistry = shared('symbol-to-string-registry');
  var WellKnownSymbolsStore$1 = shared('wks');
  var QObject = global_1.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER =
    !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDescriptor =
    descriptors &&
    fails(function () {
      return (
        objectCreate(
          nativeDefineProperty({}, 'a', {
            get: function () {
              return nativeDefineProperty(this, 'a', { value: 7 }).a;
            }
          })
        ).a != 7
      );
    })
      ? function (O, P, Attributes) {
          var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(
            ObjectPrototype,
            P
          );
          if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
          nativeDefineProperty(O, P, Attributes);
          if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
            nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
          }
        }
      : nativeDefineProperty;

  var wrap = function (tag, description) {
    var symbol = (AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]));
    setInternalState(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!descriptors) symbol.description = description;
    return symbol;
  };

  var $defineProperty$1 = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype)
      $defineProperty$1(ObjectPrototypeSymbols, P, Attributes);
    anObject(O);
    var key = toPropertyKey(P);
    anObject(Attributes);
    if (has(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!has(O, HIDDEN))
          nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = objectCreate(Attributes, {
          enumerable: createPropertyDescriptor(0, false)
        });
      }
      return setSymbolDescriptor(O, key, Attributes);
    }
    return nativeDefineProperty(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject(O);
    var properties = toIndexedObject(Properties);
    var keys = objectKeys(properties).concat(
      $getOwnPropertySymbols(properties)
    );
    $forEach(keys, function (key) {
      if (!descriptors || $propertyIsEnumerable$1.call(properties, key))
        $defineProperty$1(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined
      ? objectCreate(O)
      : $defineProperties(objectCreate(O), Properties);
  };

  var $propertyIsEnumerable$1 = function propertyIsEnumerable(V) {
    var P = toPropertyKey(V);
    var enumerable = nativePropertyIsEnumerable.call(this, P);
    if (
      this === ObjectPrototype &&
      has(AllSymbols, P) &&
      !has(ObjectPrototypeSymbols, P)
    )
      return false;
    return enumerable ||
      !has(this, P) ||
      !has(AllSymbols, P) ||
      (has(this, HIDDEN) && this[HIDDEN][P])
      ? enumerable
      : true;
  };

  var $getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject(O);
    var key = toPropertyKey(P);
    if (
      it === ObjectPrototype &&
      has(AllSymbols, key) &&
      !has(ObjectPrototypeSymbols, key)
    )
      return;
    var descriptor = nativeGetOwnPropertyDescriptor(it, key);
    if (
      descriptor &&
      has(AllSymbols, key) &&
      !(has(it, HIDDEN) && it[HIDDEN][key])
    ) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };

  var $getOwnPropertyNames$1 = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(
      IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O)
    );
    var result = [];
    $forEach(names, function (key) {
      if (
        has(AllSymbols, key) &&
        (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))
      ) {
        result.push(AllSymbols[key]);
      }
    });
    return result;
  };

  // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor
  if (!nativeSymbol) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol)
        throw TypeError('Symbol is not a constructor');
      var description =
        !arguments.length || arguments[0] === undefined
          ? undefined
          : toString_1(arguments[0]);
      var tag = uid(description);
      var setter = function (value) {
        if (this === ObjectPrototype)
          setter.call(ObjectPrototypeSymbols, value);
        if (has(this, HIDDEN) && has(this[HIDDEN], tag))
          this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
      };
      if (descriptors && USE_SETTER)
        setSymbolDescriptor(ObjectPrototype, tag, {
          configurable: true,
          set: setter
        });
      return wrap(tag, description);
    };

    redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
      return getInternalState(this).tag;
    });

    redefine($Symbol, 'withoutSetter', function (description) {
      return wrap(uid(description), description);
    });

    objectPropertyIsEnumerable.f = $propertyIsEnumerable$1;
    objectDefineProperty.f = $defineProperty$1;
    objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor$1;
    objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames$1;
    objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

    wellKnownSymbolWrapped.f = function (name) {
      return wrap(wellKnownSymbol(name), name);
    };

    if (descriptors) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty($Symbol[PROTOTYPE$1], 'description', {
        configurable: true,
        get: function description() {
          return getInternalState(this).description;
        }
      });
    }
  }

  _export(
    { global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol },
    {
      Symbol: $Symbol
    }
  );

  $forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
    defineWellKnownSymbol(name);
  });

  _export(
    { target: SYMBOL, stat: true, forced: !nativeSymbol },
    {
      // `Symbol.for` method
      // https://tc39.es/ecma262/#sec-symbol.for
      for: function (key) {
        var string = toString_1(key);
        if (has(StringToSymbolRegistry, string))
          return StringToSymbolRegistry[string];
        var symbol = $Symbol(string);
        StringToSymbolRegistry[string] = symbol;
        SymbolToStringRegistry[symbol] = string;
        return symbol;
      },
      // `Symbol.keyFor` method
      // https://tc39.es/ecma262/#sec-symbol.keyfor
      keyFor: function keyFor(sym) {
        if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
        if (has(SymbolToStringRegistry, sym))
          return SymbolToStringRegistry[sym];
      },
      useSetter: function () {
        USE_SETTER = true;
      },
      useSimple: function () {
        USE_SETTER = false;
      }
    }
  );

  _export(
    { target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors },
    {
      // `Object.create` method
      // https://tc39.es/ecma262/#sec-object.create
      create: $create,
      // `Object.defineProperty` method
      // https://tc39.es/ecma262/#sec-object.defineproperty
      defineProperty: $defineProperty$1,
      // `Object.defineProperties` method
      // https://tc39.es/ecma262/#sec-object.defineproperties
      defineProperties: $defineProperties,
      // `Object.getOwnPropertyDescriptor` method
      // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
      getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1
    }
  );

  _export(
    { target: 'Object', stat: true, forced: !nativeSymbol },
    {
      // `Object.getOwnPropertyNames` method
      // https://tc39.es/ecma262/#sec-object.getownpropertynames
      getOwnPropertyNames: $getOwnPropertyNames$1,
      // `Object.getOwnPropertySymbols` method
      // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
      getOwnPropertySymbols: $getOwnPropertySymbols
    }
  );

  // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  _export(
    {
      target: 'Object',
      stat: true,
      forced: fails(function () {
        objectGetOwnPropertySymbols.f(1);
      })
    },
    {
      getOwnPropertySymbols: function getOwnPropertySymbols(it) {
        return objectGetOwnPropertySymbols.f(toObject(it));
      }
    }
  );

  // `JSON.stringify` method behavior with symbols
  // https://tc39.es/ecma262/#sec-json.stringify
  if ($stringify) {
    var FORCED_JSON_STRINGIFY =
      !nativeSymbol ||
      fails(function () {
        var symbol = $Symbol();
        // MS Edge converts symbol values to JSON as {}
        return (
          $stringify([symbol]) != '[null]' ||
          // WebKit converts symbol values to JSON as null
          $stringify({ a: symbol }) != '{}' ||
          // V8 throws on boxed symbols
          $stringify(Object(symbol)) != '{}'
        );
      });

    _export(
      { target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY },
      {
        // eslint-disable-next-line no-unused-vars -- required for `.length`
        stringify: function stringify(it, replacer, space) {
          var args = [it];
          var index = 1;
          var $replacer;
          while (arguments.length > index) args.push(arguments[index++]);
          $replacer = replacer;
          if ((!isObject(replacer) && it === undefined) || isSymbol(it)) return; // IE8 returns string on undefined
          if (!isArray(replacer))
            replacer = function (key, value) {
              if (typeof $replacer == 'function')
                value = $replacer.call(this, key, value);
              if (!isSymbol(value)) return value;
            };
          args[1] = replacer;
          return $stringify.apply(null, args);
        }
      }
    );
  }

  // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
  if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE$1]) {
    createNonEnumerableProperty(
      $Symbol[PROTOTYPE$1],
      TO_PRIMITIVE$1,
      $Symbol[PROTOTYPE$1].valueOf
    );
  }
  // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
  setToStringTag($Symbol, SYMBOL);

  hiddenKeys[HIDDEN] = true;

  var getOwnPropertySymbols = path.Object.getOwnPropertySymbols;

  var getOwnPropertySymbols$1 = getOwnPropertySymbols;

  var getOwnPropertySymbols$2 = getOwnPropertySymbols$1;

  var SPECIES$1 = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return (
      engineV8Version >= 51 ||
      !fails(function () {
        var array = [];
        var constructor = (array.constructor = {});
        constructor[SPECIES$1] = function () {
          return { foo: 1 };
        };
        return array[METHOD_NAME](Boolean).foo !== 1;
      })
    );
  };

  var $filter = arrayIteration.filter;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  _export(
    { target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT },
    {
      filter: function filter(callbackfn /* , thisArg */) {
        return $filter(
          this,
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined
        );
      }
    }
  );

  var entryVirtual = function (CONSTRUCTOR) {
    return path[CONSTRUCTOR + 'Prototype'];
  };

  var filter = entryVirtual('Array').filter;

  var ArrayPrototype = Array.prototype;

  var filter_1 = function (it) {
    var own = it.filter;
    return it === ArrayPrototype ||
      (it instanceof Array && own === ArrayPrototype.filter)
      ? filter
      : own;
  };

  var filter$1 = filter_1;

  var filter$2 = filter$1;

  var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;

  var FAILS_ON_PRIMITIVES$1 = fails(function () {
    nativeGetOwnPropertyDescriptor$1(1);
  });
  var FORCED$1 = !descriptors || FAILS_ON_PRIMITIVES$1;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  _export(
    { target: 'Object', stat: true, forced: FORCED$1, sham: !descriptors },
    {
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
        return nativeGetOwnPropertyDescriptor$1(toIndexedObject(it), key);
      }
    }
  );

  var getOwnPropertyDescriptor_1 = createCommonjsModule(function (module) {
    var Object = path.Object;

    var getOwnPropertyDescriptor = (module.exports = function getOwnPropertyDescriptor(
      it,
      key
    ) {
      return Object.getOwnPropertyDescriptor(it, key);
    });

    if (Object.getOwnPropertyDescriptor.sham)
      getOwnPropertyDescriptor.sham = true;
  });

  var getOwnPropertyDescriptor$2 = getOwnPropertyDescriptor_1;

  var getOwnPropertyDescriptor$3 = getOwnPropertyDescriptor$2;

  var iterators = {};

  var correctPrototypeGetter = !fails(function () {
    function F() {
      /* empty */
    }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO$1 = sharedKey('IE_PROTO');
  var ObjectPrototype$1 = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = correctPrototypeGetter
    ? Object.getPrototypeOf
    : function (O) {
        O = toObject(O);
        if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
        if (typeof O.constructor == 'function' && O instanceof O.constructor) {
          return O.constructor.prototype;
        }
        return O instanceof Object ? ObjectPrototype$1 : null;
      };

  var ITERATOR = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS = false;

  var returnThis = function () {
    return this;
  };

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(
        objectGetPrototypeOf(arrayIterator)
      );
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
        IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE =
    IteratorPrototype == undefined ||
    fails(function () {
      var test = {};
      // FF44- legacy iterators case
      return IteratorPrototype[ITERATOR].call(test) !== test;
    });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (NEW_ITERATOR_PROTOTYPE && !has(IteratorPrototype, ITERATOR)) {
    createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

  var returnThis$1 = function () {
    return this;
  };

  var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
      next: createPropertyDescriptor(1, next)
    });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var aPossiblePrototype = function (it) {
    if (!isObject(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    }
    return it;
  };

  /* eslint-disable no-proto -- safe */

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf =
    Object.setPrototypeOf ||
    ('__proto__' in {}
      ? (function () {
          var CORRECT_SETTER = false;
          var test = {};
          var setter;
          try {
            // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
            setter = Object.getOwnPropertyDescriptor(
              Object.prototype,
              '__proto__'
            ).set;
            setter.call(test, []);
            CORRECT_SETTER = test instanceof Array;
          } catch (error) {
            /* empty */
          }
          return function setPrototypeOf(O, proto) {
            anObject(O);
            aPossiblePrototype(proto);
            if (CORRECT_SETTER) setter.call(O, proto);
            else O.__proto__ = proto;
            return O;
          };
        })()
      : undefined);

  var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis$2 = function () {
    return this;
  };

  var defineIterator = function (
    Iterable,
    NAME,
    IteratorConstructor,
    next,
    DEFAULT,
    IS_SET,
    FORCED
  ) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype)
        return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS:
          return function keys() {
            return new IteratorConstructor(this, KIND);
          };
        case VALUES:
          return function values() {
            return new IteratorConstructor(this, KIND);
          };
        case ENTRIES:
          return function entries() {
            return new IteratorConstructor(this, KIND);
          };
      }
      return function () {
        return new IteratorConstructor(this);
      };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator =
      IterablePrototype[ITERATOR$1] ||
      IterablePrototype['@@iterator'] ||
      (DEFAULT && IterablePrototype[DEFAULT]);
    var defaultIterator =
      (!BUGGY_SAFARI_ITERATORS$1 && nativeIterator) ||
      getIterationMethod(DEFAULT);
    var anyNativeIterator =
      NAME == 'Array'
        ? IterablePrototype.entries || nativeIterator
        : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(
        anyNativeIterator.call(new Iterable())
      );
      if (
        IteratorPrototype$2 !== Object.prototype &&
        CurrentIteratorPrototype.next
      ) {
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
        iterators[TO_STRING_TAG] = returnThis$2;
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() {
        return nativeIterator.call(this);
      };
    }

    // define iterator
    if (FORCED && IterablePrototype[ITERATOR$1] !== defaultIterator) {
      createNonEnumerableProperty(
        IterablePrototype,
        ITERATOR$1,
        defaultIterator
      );
    }
    iterators[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED)
        for (KEY in methods) {
          if (
            BUGGY_SAFARI_ITERATORS$1 ||
            INCORRECT_VALUES_NAME ||
            !(KEY in IterablePrototype)
          ) {
            redefine(IterablePrototype, KEY, methods[KEY]);
          }
        }
      else
        _export(
          {
            target: NAME,
            proto: true,
            forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME
          },
          methods
        );
    }

    return methods;
  };

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$1 = internalState.set;
  var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator(
    Array,
    'Array',
    function (iterated, kind) {
      setInternalState$1(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated), // target
        index: 0, // next index
        kind: kind // kind
      });
      // `%ArrayIteratorPrototype%.next` method
      // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
    },
    function () {
      var state = getInternalState$1(this);
      var target = state.target;
      var kind = state.kind;
      var index = state.index++;
      if (!target || index >= target.length) {
        state.target = undefined;
        return { value: undefined, done: true };
      }
      if (kind == 'keys') return { value: index, done: false };
      if (kind == 'values') return { value: target[index], done: false };
      return { value: [index, target[index]], done: false };
    },
    'values'
  );

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  iterators.Arguments = iterators.Array;

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

  for (var COLLECTION_NAME in domIterables) {
    var Collection = global_1[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    if (
      CollectionPrototype &&
      classof(CollectionPrototype) !== TO_STRING_TAG$3
    ) {
      createNonEnumerableProperty(
        CollectionPrototype,
        TO_STRING_TAG$3,
        COLLECTION_NAME
      );
    }
    iterators[COLLECTION_NAME] = iterators.Array;
  }

  var arrayMethodIsStrict = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return (
      !!method &&
      fails(function () {
        // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
        method.call(
          null,
          argument ||
            function () {
              throw 1;
            },
          1
        );
      })
    );
  };

  var $forEach$1 = arrayIteration.forEach;

  var STRICT_METHOD = arrayMethodIsStrict('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD
    ? function forEach(callbackfn /* , thisArg */) {
        return $forEach$1(
          this,
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined
        );
        // eslint-disable-next-line es/no-array-prototype-foreach -- safe
      }
    : [].forEach;

  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  _export(
    { target: 'Array', proto: true, forced: [].forEach != arrayForEach },
    {
      forEach: arrayForEach
    }
  );

  var forEach = entryVirtual('Array').forEach;

  var forEach$1 = forEach;

  var ArrayPrototype$1 = Array.prototype;

  var DOMIterables = {
    DOMTokenList: true,
    NodeList: true
  };

  var forEach_1 = function (it) {
    var own = it.forEach;
    return it === ArrayPrototype$1 ||
      (it instanceof Array && own === ArrayPrototype$1.forEach) ||
      // eslint-disable-next-line no-prototype-builtins -- safe
      DOMIterables.hasOwnProperty(classof(it))
      ? forEach$1
      : own;
  };

  var forEach$2 = forEach_1;

  // all object keys, includes non-enumerable and symbols
  var ownKeys =
    getBuiltIn('Reflect', 'ownKeys') ||
    function ownKeys(it) {
      var keys = objectGetOwnPropertyNames.f(anObject(it));
      var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
      return getOwnPropertySymbols
        ? keys.concat(getOwnPropertySymbols(it))
        : keys;
    };

  var createProperty = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object)
      objectDefineProperty.f(
        object,
        propertyKey,
        createPropertyDescriptor(0, value)
      );
    else object[propertyKey] = value;
  };

  // `Object.getOwnPropertyDescriptors` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  _export(
    { target: 'Object', stat: true, sham: !descriptors },
    {
      getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
        var O = toIndexedObject(object);
        var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
        var keys = ownKeys(O);
        var result = {};
        var index = 0;
        var key, descriptor;
        while (keys.length > index) {
          descriptor = getOwnPropertyDescriptor(O, (key = keys[index++]));
          if (descriptor !== undefined) createProperty(result, key, descriptor);
        }
        return result;
      }
    }
  );

  var getOwnPropertyDescriptors = path.Object.getOwnPropertyDescriptors;

  var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors;

  var getOwnPropertyDescriptors$2 = getOwnPropertyDescriptors$1;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  _export(
    { target: 'Object', stat: true, forced: !descriptors, sham: !descriptors },
    {
      defineProperties: objectDefineProperties
    }
  );

  var defineProperties_1 = createCommonjsModule(function (module) {
    var Object = path.Object;

    var defineProperties = (module.exports = function defineProperties(T, D) {
      return Object.defineProperties(T, D);
    });

    if (Object.defineProperties.sham) defineProperties.sham = true;
  });

  var defineProperties = defineProperties_1;

  var defineProperties$1 = defineProperties;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  _export(
    { target: 'Object', stat: true, forced: !descriptors, sham: !descriptors },
    {
      defineProperty: objectDefineProperty.f
    }
  );

  var defineProperty_1 = createCommonjsModule(function (module) {
    var Object = path.Object;

    var defineProperty = (module.exports = function defineProperty(
      it,
      key,
      desc
    ) {
      return Object.defineProperty(it, key, desc);
    });

    if (Object.defineProperty.sham) defineProperty.sham = true;
  });

  var defineProperty$2 = defineProperty_1;

  var defineProperty$3 = defineProperty$2;

  // eslint-disable-next-line es/no-object-assign -- safe
  var $assign = Object.assign;
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  var defineProperty$4 = Object.defineProperty;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  var objectAssign =
    !$assign ||
    fails(function () {
      // should have correct order of operations (Edge bug)
      if (
        descriptors &&
        $assign(
          { b: 1 },
          $assign(
            defineProperty$4({}, 'a', {
              enumerable: true,
              get: function () {
                defineProperty$4(this, 'b', {
                  value: 3,
                  enumerable: false
                });
              }
            }),
            { b: 2 }
          )
        ).b !== 1
      )
        return true;
      // should work with symbols and should have deterministic property order (V8 bug)
      var A = {};
      var B = {};
      // eslint-disable-next-line es/no-symbol -- safe
      var symbol = Symbol();
      var alphabet = 'abcdefghijklmnopqrst';
      A[symbol] = 7;
      alphabet.split('').forEach(function (chr) {
        B[chr] = chr;
      });
      return (
        $assign({}, A)[symbol] != 7 ||
        objectKeys($assign({}, B)).join('') != alphabet
      );
    })
      ? function assign(target, source) {
          // eslint-disable-line no-unused-vars -- required for `.length`
          var T = toObject(target);
          var argumentsLength = arguments.length;
          var index = 1;
          var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
          var propertyIsEnumerable = objectPropertyIsEnumerable.f;
          while (argumentsLength > index) {
            var S = indexedObject(arguments[index++]);
            var keys = getOwnPropertySymbols
              ? objectKeys(S).concat(getOwnPropertySymbols(S))
              : objectKeys(S);
            var length = keys.length;
            var j = 0;
            var key;
            while (length > j) {
              key = keys[j++];
              if (!descriptors || propertyIsEnumerable.call(S, key))
                T[key] = S[key];
            }
          }
          return T;
        }
      : $assign;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  // eslint-disable-next-line es/no-object-assign -- required for testing
  _export(
    { target: 'Object', stat: true, forced: Object.assign !== objectAssign },
    {
      assign: objectAssign
    }
  );

  var assign = path.Object.assign;

  var assign$1 = assign;

  var assign$2 = assign$1;

  var assign$3 = assign$2;

  var _extends_1 = createCommonjsModule(function (module) {
    function _extends() {
      module.exports = _extends =
        assign$3 ||
        function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

      (module.exports['default'] = module.exports),
        (module.exports.__esModule = true);
      return _extends.apply(this, arguments);
    }

    module.exports = _extends;
    (module.exports['default'] = module.exports),
      (module.exports.__esModule = true);
  });

  var _extends = unwrapExports(_extends_1);

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var ArrayPrototype$2 = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return (
      it !== undefined &&
      (iterators.Array === it || ArrayPrototype$2[ITERATOR$2] === it)
    );
  };

  var ITERATOR$3 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined)
      return it[ITERATOR$3] || it['@@iterator'] || iterators[classof(it)];
  };

  var iteratorClose = function (iterator) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) {
      return anObject(returnMethod.call(iterator)).value;
    }
  };

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = functionBindContext(
      unboundFunction,
      that,
      1 + AS_ENTRIES + INTERRUPTED
    );
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject(value);
        return INTERRUPTED
          ? fn(value[0], value[1], stop)
          : fn(value[0], value[1]);
      }
      return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn != 'function')
        throw TypeError('Target is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (
          index = 0, length = toLength(iterable.length);
          length > index;
          index++
        ) {
          result = callFn(iterable[index]);
          if (result && result instanceof Result) return result;
        }
        return new Result(false);
      }
      iterator = iterFn.call(iterable);
    }

    next = iterator.next;
    while (!(step = next.call(iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator);
        throw error;
      }
      if (typeof result == 'object' && result && result instanceof Result)
        return result;
    }
    return new Result(false);
  };

  var $AggregateError = function AggregateError(errors, message) {
    var that = this;
    if (!(that instanceof $AggregateError))
      return new $AggregateError(errors, message);
    if (objectSetPrototypeOf) {
      // eslint-disable-next-line unicorn/error-message -- expected
      that = objectSetPrototypeOf(
        new Error(undefined),
        objectGetPrototypeOf(that)
      );
    }
    if (message !== undefined)
      createNonEnumerableProperty(that, 'message', toString_1(message));
    var errorsArray = [];
    iterate(errors, errorsArray.push, { that: errorsArray });
    createNonEnumerableProperty(that, 'errors', errorsArray);
    return that;
  };

  $AggregateError.prototype = objectCreate(Error.prototype, {
    constructor: createPropertyDescriptor(5, $AggregateError),
    message: createPropertyDescriptor(5, ''),
    name: createPropertyDescriptor(5, 'AggregateError')
  });

  // `AggregateError` constructor
  // https://tc39.es/ecma262/#sec-aggregate-error-constructor
  _export(
    { global: true },
    {
      AggregateError: $AggregateError
    }
  );

  var nativePromiseConstructor = global_1.Promise;

  var redefineAll = function (target, src, options) {
    for (var key in src) {
      if (options && options.unsafe && target[key]) target[key] = src[key];
      else redefine(target, key, src[key], options);
    }
    return target;
  };

  var SPECIES$2 = wellKnownSymbol('species');

  var setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = objectDefineProperty.f;

    if (descriptors && Constructor && !Constructor[SPECIES$2]) {
      defineProperty(Constructor, SPECIES$2, {
        configurable: true,
        get: function () {
          return this;
        }
      });
    }
  };

  var anInstance = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    }
    return it;
  };

  var ITERATOR$4 = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      return: function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$4] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () {
      throw 2;
    });
  } catch (error) {
    /* empty */
  }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$4] = function () {
        return {
          next: function () {
            return { done: (ITERATION_SUPPORT = true) };
          }
        };
      };
      exec(object);
    } catch (error) {
      /* empty */
    }
    return ITERATION_SUPPORT;
  };

  var SPECIES$3 = wellKnownSymbol('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || (S = anObject(C)[SPECIES$3]) == undefined
      ? defaultConstructor
      : aFunction$1(S);
  };

  var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(engineUserAgent);

  var engineIsNode = classofRaw(global_1.process) == 'process';

  var set$1 = global_1.setImmediate;
  var clear = global_1.clearImmediate;
  var process$1 = global_1.process;
  var MessageChannel = global_1.MessageChannel;
  var Dispatch = global_1.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var location, defer, channel, port;

  try {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    location = global_1.location;
  } catch (error) {
    /* empty */
  }

  var run = function (id) {
    // eslint-disable-next-line no-prototype-builtins -- safe
    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var listener = function (event) {
    run(event.data);
  };

  var post = function (id) {
    // old engines have not location.origin
    global_1.postMessage(String(id), location.protocol + '//' + location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set$1 || !clear) {
    set$1 = function setImmediate(fn) {
      var args = [];
      var argumentsLength = arguments.length;
      var i = 1;
      while (argumentsLength > i) args.push(arguments[i++]);
      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func -- spec requirement
        (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (engineIsNode) {
      defer = function (id) {
        process$1.nextTick(runner(id));
      };
      // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
      // Browsers with MessageChannel, includes WebWorkers
      // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !engineIsIos) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = functionBindContext(port.postMessage, port, 1);
      // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      global_1.addEventListener &&
      typeof postMessage == 'function' &&
      !global_1.importScripts &&
      location &&
      location.protocol !== 'file:' &&
      !fails(post)
    ) {
      defer = post;
      global_1.addEventListener('message', listener, false);
      // IE8-
    } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
      defer = function (id) {
        html.appendChild(documentCreateElement('script'))[
          ONREADYSTATECHANGE
        ] = function () {
          html.removeChild(this);
          run(id);
        };
      };
      // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task = {
    set: set$1,
    clear: clear
  };

  var engineIsIosPebble =
    /ipad|iphone|ipod/i.test(engineUserAgent) && global_1.Pebble !== undefined;

  var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(engineUserAgent);

  var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor.f;
  var macrotask = task.set;

  var MutationObserver =
    global_1.MutationObserver || global_1.WebKitMutationObserver;
  var document$2 = global_1.document;
  var process$2 = global_1.process;
  var Promise$1 = global_1.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor$4(
    global_1,
    'queueMicrotask'
  );
  var queueMicrotask =
    queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

  var flush, head, last, notify, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (engineIsNode && (parent = process$2.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (error) {
          if (head) notify();
          else last = undefined;
          throw error;
        }
      }
      last = undefined;
      if (parent) parent.enter();
    };

    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
    if (
      !engineIsIos &&
      !engineIsNode &&
      !engineIsWebosWebkit &&
      MutationObserver &&
      document$2
    ) {
      toggle = true;
      node = document$2.createTextNode('');
      new MutationObserver(flush).observe(node, { characterData: true });
      notify = function () {
        node.data = toggle = !toggle;
      };
      // environments with maybe non-completely correct, but existent Promise
    } else if (!engineIsIosPebble && Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined);
      // workaround of WebKit ~ iOS Safari 10.1 bug
      promise.constructor = Promise$1;
      then = promise.then;
      notify = function () {
        then.call(promise, flush);
      };
      // Node.js without promises
    } else if (engineIsNode) {
      notify = function () {
        process$2.nextTick(flush);
      };
      // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout
    } else {
      notify = function () {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(global_1, flush);
      };
    }
  }

  var microtask =
    queueMicrotask ||
    function (fn) {
      var task = { fn: fn, next: undefined };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify();
      }
      last = task;
    };

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined)
        throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aFunction$1(resolve);
    this.reject = aFunction$1(reject);
  };

  // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability
  var f$7 = function (C) {
    return new PromiseCapability(C);
  };

  var newPromiseCapability = {
    f: f$7
  };

  var promiseResolve = function (C, x) {
    anObject(C);
    if (isObject(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var hostReportErrors = function (a, b) {
    var console = global_1.console;
    if (console && console.error) {
      arguments.length === 1 ? console.error(a) : console.error(a, b);
    }
  };

  var perform = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  var engineIsBrowser = typeof window == 'object';

  var task$1 = task.set;

  var SPECIES$4 = wellKnownSymbol('species');
  var PROMISE = 'Promise';
  var getInternalState$2 = internalState.get;
  var setInternalState$2 = internalState.set;
  var getInternalPromiseState = internalState.getterFor(PROMISE);
  var NativePromisePrototype =
    nativePromiseConstructor && nativePromiseConstructor.prototype;
  var PromiseConstructor = nativePromiseConstructor;
  var PromiseConstructorPrototype = NativePromisePrototype;
  var TypeError$1 = global_1.TypeError;
  var document$3 = global_1.document;
  var process$3 = global_1.process;
  var newPromiseCapability$1 = newPromiseCapability.f;
  var newGenericPromiseCapability = newPromiseCapability$1;
  var DISPATCH_EVENT = !!(
    document$3 &&
    document$3.createEvent &&
    global_1.dispatchEvent
  );
  var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;
  var SUBCLASSING = false;
  var Internal, OwnPromiseCapability, PromiseWrapper;

  var FORCED$2 = isForced_1(PROMISE, function () {
    var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
    var GLOBAL_CORE_JS_PROMISE =
      PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (!GLOBAL_CORE_JS_PROMISE && engineV8Version === 66) return true;
    // We need Promise#finally in the pure version for preventing prototype pollution
    if (!PromiseConstructorPrototype['finally']) return true;
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (engineV8Version >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE))
      return false;
    // Detect correctness of subclassing with @@species support
    var promise = new PromiseConstructor(function (resolve) {
      resolve(1);
    });
    var FakePromise = function (exec) {
      exec(
        function () {
          /* empty */
        },
        function () {
          /* empty */
        }
      );
    };
    var constructor = (promise.constructor = {});
    constructor[SPECIES$4] = FakePromise;
    SUBCLASSING =
      promise.then(function () {
        /* empty */
      }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (
      !GLOBAL_CORE_JS_PROMISE && engineIsBrowser && !NATIVE_REJECTION_EVENT
    );
  });

  var INCORRECT_ITERATION =
    FORCED$2 ||
    !checkCorrectnessOfIteration(function (iterable) {
      PromiseConstructor.all(iterable)['catch'](function () {
        /* empty */
      });
    });

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
  };

  var notify$1 = function (state, isReject) {
    if (state.notified) return;
    state.notified = true;
    var chain = state.reactions;
    microtask(function () {
      var value = state.value;
      var ok = state.state == FULFILLED;
      var index = 0;
      // variable length - can't use forEach
      while (chain.length > index) {
        var reaction = chain[index++];
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;
        try {
          if (handler) {
            if (!ok) {
              if (state.rejection === UNHANDLED) onHandleUnhandled(state);
              state.rejection = HANDLED;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value); // can throw
              if (domain) {
                domain.exit();
                exited = true;
              }
            }
            if (result === reaction.promise) {
              reject(TypeError$1('Promise-chain cycle'));
            } else if ((then = isThenable(result))) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (error) {
          if (domain && !exited) domain.exit();
          reject(error);
        }
      }
      state.reactions = [];
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
      event = document$3.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      global_1.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_REJECTION_EVENT && (handler = global_1['on' + name]))
      handler(event);
    else if (name === UNHANDLED_REJECTION)
      hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    task$1.call(global_1, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform(function () {
          if (engineIsNode) {
            process$3.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection =
          engineIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    task$1.call(global_1, function () {
      var promise = state.facade;
      if (engineIsNode) {
        process$3.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind = function (fn, state, unwrap) {
    return function (value) {
      fn(state, value, unwrap);
    };
  };

  var internalReject = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify$1(state, true);
  };

  var internalResolve = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (state.facade === value)
        throw TypeError$1("Promise can't be resolved itself");
      var then = isThenable(value);
      if (then) {
        microtask(function () {
          var wrapper = { done: false };
          try {
            then.call(
              value,
              bind(internalResolve, wrapper, state),
              bind(internalReject, wrapper, state)
            );
          } catch (error) {
            internalReject(wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify$1(state, false);
      }
    } catch (error) {
      internalReject({ done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED$2) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance(this, PromiseConstructor, PROMISE);
      aFunction$1(executor);
      Internal.call(this);
      var state = getInternalState$2(this);
      try {
        executor(bind(internalResolve, state), bind(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };
    PromiseConstructorPrototype = PromiseConstructor.prototype;
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
      setInternalState$2(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: [],
        rejection: false,
        state: PENDING,
        value: undefined
      });
    };
    Internal.prototype = redefineAll(PromiseConstructorPrototype, {
      // `Promise.prototype.then` method
      // https://tc39.es/ecma262/#sec-promise.prototype.then
      then: function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reaction = newPromiseCapability$1(
          speciesConstructor(this, PromiseConstructor)
        );
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = engineIsNode ? process$3.domain : undefined;
        state.parent = true;
        state.reactions.push(reaction);
        if (state.state != PENDING) notify$1(state, false);
        return reaction.promise;
      },
      // `Promise.prototype.catch` method
      // https://tc39.es/ecma262/#sec-promise.prototype.catch
      catch: function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalState$2(promise);
      this.promise = promise;
      this.resolve = bind(internalResolve, state);
      this.reject = bind(internalReject, state);
    };
    newPromiseCapability.f = newPromiseCapability$1 = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };
  }

  _export(
    { global: true, wrap: true, forced: FORCED$2 },
    {
      Promise: PromiseConstructor
    }
  );

  setToStringTag(PromiseConstructor, PROMISE, false, true);
  setSpecies(PROMISE);

  PromiseWrapper = getBuiltIn(PROMISE);

  // statics
  _export(
    { target: PROMISE, stat: true, forced: FORCED$2 },
    {
      // `Promise.reject` method
      // https://tc39.es/ecma262/#sec-promise.reject
      reject: function reject(r) {
        var capability = newPromiseCapability$1(this);
        capability.reject.call(undefined, r);
        return capability.promise;
      }
    }
  );

  _export(
    { target: PROMISE, stat: true, forced: isPure },
    {
      // `Promise.resolve` method
      // https://tc39.es/ecma262/#sec-promise.resolve
      resolve: function resolve(x) {
        return promiseResolve(
          this === PromiseWrapper ? PromiseConstructor : this,
          x
        );
      }
    }
  );

  _export(
    { target: PROMISE, stat: true, forced: INCORRECT_ITERATION },
    {
      // `Promise.all` method
      // https://tc39.es/ecma262/#sec-promise.all
      all: function all(iterable) {
        var C = this;
        var capability = newPromiseCapability$1(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aFunction$1(C.resolve);
          var values = [];
          var counter = 0;
          var remaining = 1;
          iterate(iterable, function (promise) {
            var index = counter++;
            var alreadyCalled = false;
            values.push(undefined);
            remaining++;
            $promiseResolve.call(C, promise).then(function (value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              values[index] = value;
              --remaining || resolve(values);
            }, reject);
          });
          --remaining || resolve(values);
        });
        if (result.error) reject(result.value);
        return capability.promise;
      },
      // `Promise.race` method
      // https://tc39.es/ecma262/#sec-promise.race
      race: function race(iterable) {
        var C = this;
        var capability = newPromiseCapability$1(C);
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aFunction$1(C.resolve);
          iterate(iterable, function (promise) {
            $promiseResolve.call(C, promise).then(capability.resolve, reject);
          });
        });
        if (result.error) reject(result.value);
        return capability.promise;
      }
    }
  );

  // `Promise.allSettled` method
  // https://tc39.es/ecma262/#sec-promise.allsettled
  _export(
    { target: 'Promise', stat: true },
    {
      allSettled: function allSettled(iterable) {
        var C = this;
        var capability = newPromiseCapability.f(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
          var promiseResolve = aFunction$1(C.resolve);
          var values = [];
          var counter = 0;
          var remaining = 1;
          iterate(iterable, function (promise) {
            var index = counter++;
            var alreadyCalled = false;
            values.push(undefined);
            remaining++;
            promiseResolve.call(C, promise).then(
              function (value) {
                if (alreadyCalled) return;
                alreadyCalled = true;
                values[index] = { status: 'fulfilled', value: value };
                --remaining || resolve(values);
              },
              function (error) {
                if (alreadyCalled) return;
                alreadyCalled = true;
                values[index] = { status: 'rejected', reason: error };
                --remaining || resolve(values);
              }
            );
          });
          --remaining || resolve(values);
        });
        if (result.error) reject(result.value);
        return capability.promise;
      }
    }
  );

  var PROMISE_ANY_ERROR = 'No one promise resolved';

  // `Promise.any` method
  // https://tc39.es/ecma262/#sec-promise.any
  _export(
    { target: 'Promise', stat: true },
    {
      any: function any(iterable) {
        var C = this;
        var capability = newPromiseCapability.f(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
          var promiseResolve = aFunction$1(C.resolve);
          var errors = [];
          var counter = 0;
          var remaining = 1;
          var alreadyResolved = false;
          iterate(iterable, function (promise) {
            var index = counter++;
            var alreadyRejected = false;
            errors.push(undefined);
            remaining++;
            promiseResolve.call(C, promise).then(
              function (value) {
                if (alreadyRejected || alreadyResolved) return;
                alreadyResolved = true;
                resolve(value);
              },
              function (error) {
                if (alreadyRejected || alreadyResolved) return;
                alreadyRejected = true;
                errors[index] = error;
                --remaining ||
                  reject(
                    new (getBuiltIn('AggregateError'))(
                      errors,
                      PROMISE_ANY_ERROR
                    )
                  );
              }
            );
          });
          --remaining ||
            reject(
              new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR)
            );
        });
        if (result.error) reject(result.value);
        return capability.promise;
      }
    }
  );

  // Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
  var NON_GENERIC =
    !!nativePromiseConstructor &&
    fails(function () {
      nativePromiseConstructor.prototype['finally'].call(
        {
          then: function () {
            /* empty */
          }
        },
        function () {
          /* empty */
        }
      );
    });

  // `Promise.prototype.finally` method
  // https://tc39.es/ecma262/#sec-promise.prototype.finally
  _export(
    { target: 'Promise', proto: true, real: true, forced: NON_GENERIC },
    {
      finally: function (onFinally) {
        var C = speciesConstructor(this, getBuiltIn('Promise'));
        var isFunction = typeof onFinally == 'function';
        return this.then(
          isFunction
            ? function (x) {
                return promiseResolve(C, onFinally()).then(function () {
                  return x;
                });
              }
            : onFinally,
          isFunction
            ? function (e) {
                return promiseResolve(C, onFinally()).then(function () {
                  throw e;
                });
              }
            : onFinally
        );
      }
    }
  );

  // `String.prototype.codePointAt` methods implementation
  var createMethod$2 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString_1(requireObjectCoercible($this));
      var position = toInteger(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size)
        return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xd800 ||
        first > 0xdbff ||
        position + 1 === size ||
        (second = S.charCodeAt(position + 1)) < 0xdc00 ||
        second > 0xdfff
        ? CONVERT_TO_STRING
          ? S.charAt(position)
          : first
        : CONVERT_TO_STRING
        ? S.slice(position, position + 2)
        : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$2(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$2(true)
  };

  var charAt = stringMultibyte.charAt;

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$3 = internalState.set;
  var getInternalState$3 = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(
    String,
    'String',
    function (iterated) {
      setInternalState$3(this, {
        type: STRING_ITERATOR,
        string: toString_1(iterated),
        index: 0
      });
      // `%StringIteratorPrototype%.next` method
      // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
    },
    function next() {
      var state = getInternalState$3(this);
      var string = state.string;
      var index = state.index;
      var point;
      if (index >= string.length) return { value: undefined, done: true };
      point = charAt(string, index);
      state.index += point.length;
      return { value: point, done: false };
    }
  );

  var promise$1 = path.Promise;

  var promise$2 = promise$1;

  // `Promise.try` method
  // https://github.com/tc39/proposal-promise-try
  _export(
    { target: 'Promise', stat: true },
    {
      try: function (callbackfn) {
        var promiseCapability = newPromiseCapability.f(this);
        var result = perform(callbackfn);
        (result.error ? promiseCapability.reject : promiseCapability.resolve)(
          result.value
        );
        return promiseCapability.promise;
      }
    }
  );

  // TODO: Remove from `core-js@4`

  var promise$3 = promise$2;

  var promise$4 = promise$3;

  var asyncToGenerator = createCommonjsModule(function (module) {
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }

      if (info.done) {
        resolve(value);
      } else {
        promise$4.resolve(value).then(_next, _throw);
      }
    }

    function _asyncToGenerator(fn) {
      return function () {
        var self = this,
          args = arguments;
        return new promise$4(function (resolve, reject) {
          var gen = fn.apply(self, args);

          function _next(value) {
            asyncGeneratorStep(
              gen,
              resolve,
              reject,
              _next,
              _throw,
              'next',
              value
            );
          }

          function _throw(err) {
            asyncGeneratorStep(
              gen,
              resolve,
              reject,
              _next,
              _throw,
              'throw',
              err
            );
          }

          _next(undefined);
        });
      };
    }

    module.exports = _asyncToGenerator;
    (module.exports['default'] = module.exports),
      (module.exports.__esModule = true);
  });

  var _asyncToGenerator = unwrapExports(asyncToGenerator);

  var classCallCheck = createCommonjsModule(function (module) {
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    module.exports = _classCallCheck;
    (module.exports['default'] = module.exports),
      (module.exports.__esModule = true);
  });

  var _classCallCheck = unwrapExports(classCallCheck);

  var defineProperty$5 = defineProperty$2;

  var defineProperty$6 = defineProperty$5;

  var createClass = createCommonjsModule(function (module) {
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;

        defineProperty$6(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    module.exports = _createClass;
    (module.exports['default'] = module.exports),
      (module.exports.__esModule = true);
  });

  var _createClass = unwrapExports(createClass);

  var assertThisInitialized = createCommonjsModule(function (module) {
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }

      return self;
    }

    module.exports = _assertThisInitialized;
    (module.exports['default'] = module.exports),
      (module.exports.__esModule = true);
  });

  var _assertThisInitialized = unwrapExports(assertThisInitialized);

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  _export(
    { target: 'Object', stat: true, sham: !descriptors },
    {
      create: objectCreate
    }
  );

  var Object$1 = path.Object;

  var create = function create(P, D) {
    return Object$1.create(P, D);
  };

  var create$1 = create;

  var create$2 = create$1;

  var create$3 = create$2;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  _export(
    { target: 'Object', stat: true },
    {
      setPrototypeOf: objectSetPrototypeOf
    }
  );

  var setPrototypeOf = path.Object.setPrototypeOf;

  var setPrototypeOf$1 = setPrototypeOf;

  var setPrototypeOf$2 = setPrototypeOf$1;

  var setPrototypeOf$3 = setPrototypeOf$2;

  var setPrototypeOf$4 = createCommonjsModule(function (module) {
    function _setPrototypeOf(o, p) {
      module.exports = _setPrototypeOf =
        setPrototypeOf$3 ||
        function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };

      (module.exports['default'] = module.exports),
        (module.exports.__esModule = true);
      return _setPrototypeOf(o, p);
    }

    module.exports = _setPrototypeOf;
    (module.exports['default'] = module.exports),
      (module.exports.__esModule = true);
  });

  unwrapExports(setPrototypeOf$4);

  var inherits = createCommonjsModule(function (module) {
    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError(
          'Super expression must either be null or a function'
        );
      }

      subClass.prototype = create$3(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      if (superClass) setPrototypeOf$4(subClass, superClass);
    }

    module.exports = _inherits;
    (module.exports['default'] = module.exports),
      (module.exports.__esModule = true);
  });

  var _inherits = unwrapExports(inherits);

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1fffffffffffff;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT =
    engineV8Version >= 51 ||
    !fails(function () {
      var array = [];
      array[IS_CONCAT_SPREADABLE] = false;
      return array.concat()[0] !== array;
    });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED$3 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export(
    { target: 'Array', proto: true, forced: FORCED$3 },
    {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      concat: function concat(arg) {
        var O = toObject(this);
        var A = arraySpeciesCreate(O, 0);
        var n = 0;
        var i, k, length, len, E;
        for (i = -1, length = arguments.length; i < length; i++) {
          E = i === -1 ? O : arguments[i];
          if (isConcatSpreadable(E)) {
            len = toLength(E.length);
            if (n + len > MAX_SAFE_INTEGER)
              throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
            for (k = 0; k < len; k++, n++)
              if (k in E) createProperty(A, n, E[k]);
          } else {
            if (n >= MAX_SAFE_INTEGER)
              throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
            createProperty(A, n++, E);
          }
        }
        A.length = n;
        return A;
      }
    }
  );

  // `Symbol.asyncIterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.asynciterator
  defineWellKnownSymbol('asyncIterator');

  // `Symbol.hasInstance` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.hasinstance
  defineWellKnownSymbol('hasInstance');

  // `Symbol.isConcatSpreadable` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
  defineWellKnownSymbol('isConcatSpreadable');

  // `Symbol.iterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.iterator
  defineWellKnownSymbol('iterator');

  // `Symbol.match` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.match
  defineWellKnownSymbol('match');

  // `Symbol.matchAll` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.matchall
  defineWellKnownSymbol('matchAll');

  // `Symbol.replace` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.replace
  defineWellKnownSymbol('replace');

  // `Symbol.search` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.search
  defineWellKnownSymbol('search');

  // `Symbol.species` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.species
  defineWellKnownSymbol('species');

  // `Symbol.split` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.split
  defineWellKnownSymbol('split');

  // `Symbol.toPrimitive` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.toprimitive
  defineWellKnownSymbol('toPrimitive');

  // `Symbol.toStringTag` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.tostringtag
  defineWellKnownSymbol('toStringTag');

  // `Symbol.unscopables` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.unscopables
  defineWellKnownSymbol('unscopables');

  // JSON[@@toStringTag] property
  // https://tc39.es/ecma262/#sec-json-@@tostringtag
  setToStringTag(global_1.JSON, 'JSON', true);

  var symbol = path.Symbol;

  var symbol$1 = symbol;

  // `Symbol.asyncDispose` well-known symbol
  // https://github.com/tc39/proposal-using-statement
  defineWellKnownSymbol('asyncDispose');

  // `Symbol.dispose` well-known symbol
  // https://github.com/tc39/proposal-using-statement
  defineWellKnownSymbol('dispose');

  // `Symbol.matcher` well-known symbol
  // https://github.com/tc39/proposal-pattern-matching
  defineWellKnownSymbol('matcher');

  // `Symbol.metadata` well-known symbol
  // https://github.com/tc39/proposal-decorators
  defineWellKnownSymbol('metadata');

  // `Symbol.observable` well-known symbol
  // https://github.com/tc39/proposal-observable
  defineWellKnownSymbol('observable');

  // TODO: remove from `core-js@4`

  // `Symbol.patternMatch` well-known symbol
  // https://github.com/tc39/proposal-pattern-matching
  defineWellKnownSymbol('patternMatch');

  // TODO: remove from `core-js@4`

  defineWellKnownSymbol('replaceAll');

  // TODO: Remove from `core-js@4`

  // TODO: Remove from `core-js@4`

  var symbol$2 = symbol$1;

  var symbol$3 = symbol$2;

  var iterator = wellKnownSymbolWrapped.f('iterator');

  var iterator$1 = iterator;

  var iterator$2 = iterator$1;

  var iterator$3 = iterator$2;

  var _typeof_1 = createCommonjsModule(function (module) {
    function _typeof(obj) {
      '@babel/helpers - typeof';

      if (typeof symbol$3 === 'function' && typeof iterator$3 === 'symbol') {
        module.exports = _typeof = function _typeof(obj) {
          return typeof obj;
        };

        (module.exports['default'] = module.exports),
          (module.exports.__esModule = true);
      } else {
        module.exports = _typeof = function _typeof(obj) {
          return obj &&
            typeof symbol$3 === 'function' &&
            obj.constructor === symbol$3 &&
            obj !== symbol$3.prototype
            ? 'symbol'
            : typeof obj;
        };

        (module.exports['default'] = module.exports),
          (module.exports.__esModule = true);
      }

      return _typeof(obj);
    }

    module.exports = _typeof;
    (module.exports['default'] = module.exports),
      (module.exports.__esModule = true);
  });

  var _typeof2 = unwrapExports(_typeof_1);

  var possibleConstructorReturn = createCommonjsModule(function (module) {
    var _typeof = _typeof_1['default'];

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError(
          'Derived constructors may only return object or undefined'
        );
      }

      return assertThisInitialized(self);
    }

    module.exports = _possibleConstructorReturn;
    (module.exports['default'] = module.exports),
      (module.exports.__esModule = true);
  });

  var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

  var FAILS_ON_PRIMITIVES$2 = fails(function () {
    objectGetPrototypeOf(1);
  });

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  _export(
    {
      target: 'Object',
      stat: true,
      forced: FAILS_ON_PRIMITIVES$2,
      sham: !correctPrototypeGetter
    },
    {
      getPrototypeOf: function getPrototypeOf(it) {
        return objectGetPrototypeOf(toObject(it));
      }
    }
  );

  var getPrototypeOf = path.Object.getPrototypeOf;

  var getPrototypeOf$1 = getPrototypeOf;

  var getPrototypeOf$2 = getPrototypeOf$1;

  var getPrototypeOf$3 = getPrototypeOf$2;

  var getPrototypeOf$4 = createCommonjsModule(function (module) {
    function _getPrototypeOf(o) {
      module.exports = _getPrototypeOf = setPrototypeOf$3
        ? getPrototypeOf$3
        : function _getPrototypeOf(o) {
            return o.__proto__ || getPrototypeOf$3(o);
          };
      (module.exports['default'] = module.exports),
        (module.exports.__esModule = true);
      return _getPrototypeOf(o);
    }

    module.exports = _getPrototypeOf;
    (module.exports['default'] = module.exports),
      (module.exports.__esModule = true);
  });

  var _getPrototypeOf = unwrapExports(getPrototypeOf$4);

  var defineProperty$7 = createCommonjsModule(function (module) {
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        defineProperty$6(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    module.exports = _defineProperty;
    (module.exports['default'] = module.exports),
      (module.exports.__esModule = true);
  });

  var _defineProperty = unwrapExports(defineProperty$7);

  var runtime_1 = createCommonjsModule(function (module) {
    /**
     * Copyright (c) 2014-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */

    var runtime = (function (exports) {
      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined$1; // More compressible than void 0.
      var $Symbol = typeof Symbol === 'function' ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || '@@iterator';
      var asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator';
      var toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';

      function define(obj, key, value) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
        return obj[key];
      }
      try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, '');
      } catch (err) {
        define = function (obj, key, value) {
          return (obj[key] = value);
        };
      }

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator =
          outerFn && outerFn.prototype instanceof Generator
            ? outerFn
            : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);

        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        generator._invoke = makeInvokeMethod(innerFn, self, context);

        return generator;
      }
      exports.wrap = wrap;

      // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.
      function tryCatch(fn, obj, arg) {
        try {
          return { type: 'normal', arg: fn.call(obj, arg) };
        } catch (err) {
          return { type: 'throw', arg: err };
        }
      }

      var GenStateSuspendedStart = 'suspendedStart';
      var GenStateSuspendedYield = 'suspendedYield';
      var GenStateExecuting = 'executing';
      var GenStateCompleted = 'completed';

      // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.
      var ContinueSentinel = {};

      // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}

      // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.
      var IteratorPrototype = {};
      define(IteratorPrototype, iteratorSymbol, function () {
        return this;
      });

      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      if (
        NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
      ) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(
        IteratorPrototype
      ));
      GeneratorFunction.prototype = GeneratorFunctionPrototype;
      define(Gp, 'constructor', GeneratorFunctionPrototype);
      define(GeneratorFunctionPrototype, 'constructor', GeneratorFunction);
      GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, 'GeneratorFunction');

      // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.
      function defineIteratorMethods(prototype) {
        ['next', 'throw', 'return'].forEach(function (method) {
          define(prototype, method, function (arg) {
            return this._invoke(method, arg);
          });
        });
      }

      exports.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === 'function' && genFun.constructor;
        return ctor
          ? ctor === GeneratorFunction ||
              // For the native GeneratorFunction constructor, the best we can
              // do is to check its .name property.
              (ctor.displayName || ctor.name) === 'GeneratorFunction'
          : false;
      };

      exports.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          define(genFun, toStringTagSymbol, 'GeneratorFunction');
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
      };

      // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.
      exports.awrap = function (arg) {
        return { __await: arg };
      };

      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if (record.type === 'throw') {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;
            if (
              value &&
              typeof value === 'object' &&
              hasOwn.call(value, '__await')
            ) {
              return PromiseImpl.resolve(value.__await).then(
                function (value) {
                  invoke('next', value, resolve, reject);
                },
                function (err) {
                  invoke('throw', err, resolve, reject);
                }
              );
            }

            return PromiseImpl.resolve(value).then(
              function (unwrapped) {
                // When a yielded Promise is resolved, its final value becomes
                // the .value of the Promise<{value,done}> result for the
                // current iteration.
                result.value = unwrapped;
                resolve(result);
              },
              function (error) {
                // If a rejected Promise was yielded, throw the rejection back
                // into the async generator function so it can be handled there.
                return invoke('throw', error, resolve, reject);
              }
            );
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return (previousPromise =
            // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise
              ? previousPromise.then(
                  callInvokeWithMethodAndArg,
                  // Avoid propagating failures to Promises returned by later
                  // invocations of the iterator.
                  callInvokeWithMethodAndArg
                )
              : callInvokeWithMethodAndArg());
        }

        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);
      define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
        return this;
      });
      exports.AsyncIterator = AsyncIterator;

      // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.
      exports.async = function (
        innerFn,
        outerFn,
        self,
        tryLocsList,
        PromiseImpl
      ) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;

        var iter = new AsyncIterator(
          wrap(innerFn, outerFn, self, tryLocsList),
          PromiseImpl
        );

        return exports.isGeneratorFunction(outerFn)
          ? iter // If outerFn is a generator, return the full iterator.
          : iter.next().then(function (result) {
              return result.done ? result.value : iter.next();
            });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;

        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error('Generator is already running');
          }

          if (state === GenStateCompleted) {
            if (method === 'throw') {
              throw arg;
            }

            // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === 'next') {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === 'throw') {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === 'return') {
              context.abrupt('return', context.arg);
            }

            state = GenStateExecuting;

            var record = tryCatch(innerFn, self, context);
            if (record.type === 'normal') {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === 'throw') {
              state = GenStateCompleted;
              // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.
              context.method = 'throw';
              context.arg = record.arg;
            }
          }
        };
      }

      // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.
      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];
        if (method === undefined$1) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === 'throw') {
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (delegate.iterator['return']) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = 'return';
              context.arg = undefined$1;
              maybeInvokeDelegate(delegate, context);

              if (context.method === 'throw') {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = 'throw';
            context.arg = new TypeError(
              "The iterator does not provide a 'throw' method"
            );
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === 'throw') {
          context.method = 'throw';
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (!info) {
          context.method = 'throw';
          context.arg = new TypeError('iterator result is not an object');
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value;

          // Resume execution at the desired location (see delegateYield).
          context.next = delegate.nextLoc;

          // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.
          if (context.method !== 'return') {
            context.method = 'next';
            context.arg = undefined$1;
          }
        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        }

        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
      }

      // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.
      defineIteratorMethods(Gp);

      define(Gp, toStringTagSymbol, 'Generator');

      // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.
      define(Gp, iteratorSymbol, function () {
        return this;
      });

      define(Gp, 'toString', function () {
        return '[object Generator]';
      });

      function pushTryEntry(locs) {
        var entry = { tryLoc: locs[0] };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = 'normal';
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{ tryLoc: 'root' }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      exports.keys = function (object) {
        var keys = [];
        for (var key in object) {
          keys.push(key);
        }
        keys.reverse();

        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
          while (keys.length) {
            var key = keys.pop();
            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          }

          // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.
          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === 'function') {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1,
              next = function next() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next.value = iterable[i];
                    next.done = false;
                    return next;
                  }
                }

                next.value = undefined$1;
                next.done = true;

                return next;
              };

            return (next.next = next);
          }
        }

        // Return an iterator with no values.
        return { next: doneResult };
      }
      exports.values = values;

      function doneResult() {
        return { value: undefined$1, done: true };
      }

      Context.prototype = {
        constructor: Context,

        reset: function (skipTempReset) {
          this.prev = 0;
          this.next = 0;
          // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.
          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;

          this.method = 'next';
          this.arg = undefined$1;

          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (
                name.charAt(0) === 't' &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))
              ) {
                this[name] = undefined$1;
              }
            }
          }
        },

        stop: function () {
          this.done = true;

          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;
          if (rootRecord.type === 'throw') {
            throw rootRecord.arg;
          }

          return this.rval;
        },

        dispatchException: function (exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;
          function handle(loc, caught) {
            record.type = 'throw';
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = 'next';
              context.arg = undefined$1;
            }

            return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === 'root') {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle('end');
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, 'catchLoc');
              var hasFinally = hasOwn.call(entry, 'finallyLoc');

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error('try statement without catch or finally');
              }
            }
          }
        },

        abrupt: function (type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (
              entry.tryLoc <= this.prev &&
              hasOwn.call(entry, 'finallyLoc') &&
              this.prev < entry.finallyLoc
            ) {
              var finallyEntry = entry;
              break;
            }
          }

          if (
            finallyEntry &&
            (type === 'break' || type === 'continue') &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc
          ) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = 'next';
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },

        complete: function (record, afterLoc) {
          if (record.type === 'throw') {
            throw record.arg;
          }

          if (record.type === 'break' || record.type === 'continue') {
            this.next = record.arg;
          } else if (record.type === 'return') {
            this.rval = this.arg = record.arg;
            this.method = 'return';
            this.next = 'end';
          } else if (record.type === 'normal' && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },

        finish: function (finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },

        catch: function (tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if (record.type === 'throw') {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }

          // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.
          throw new Error('illegal catch attempt');
        },

        delegateYield: function (iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };

          if (this.method === 'next') {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined$1;
          }

          return ContinueSentinel;
        }
      };

      // Regardless of whether this script is executing as a CommonJS module
      // or not, return the runtime object so that we can declare the variable
      // regeneratorRuntime in the outer scope, which allows this module to be
      // injected easily by `bin/regenerator --include-runtime script.js`.
      return exports;
    })(
      // If this script is executing as a CommonJS module, use module.exports
      // as the regeneratorRuntime namespace. Otherwise create a new empty
      // object. Either way, the resulting object will be used to initialize
      // the regeneratorRuntime variable at the top of this file.
      module.exports
    );

    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      // This module should not be running in strict mode, so the above
      // assignment should always work unless something is misconfigured. Just
      // in case runtime.js accidentally runs in strict mode, in modern engines
      // we can explicitly access globalThis. In older engines we can escape
      // strict mode using a global Function call. This could conceivably fail
      // if a Content Security Policy forbids using Function, but in that case
      // the proper solution is to fix the accidental strict mode problem. If
      // you've misconfigured your bundler to force strict mode and applied a
      // CSP to forbid Function, and you're not willing to fix either of those
      // problems, please detail your unique predicament in a GitHub issue.
      if (typeof globalThis === 'object') {
        globalThis.regeneratorRuntime = runtime;
      } else {
        Function('r', 'regeneratorRuntime = r')(runtime);
      }
    }
  });

  var regenerator = runtime_1;

  // `Function.prototype.bind` method
  // https://tc39.es/ecma262/#sec-function.prototype.bind
  _export(
    { target: 'Function', proto: true },
    {
      bind: functionBind
    }
  );

  var bind$1 = entryVirtual('Function').bind;

  var FunctionPrototype = Function.prototype;

  var bind_1 = function (it) {
    var own = it.bind;
    return it === FunctionPrototype ||
      (it instanceof Function && own === FunctionPrototype.bind)
      ? bind$1
      : own;
  };

  var bind$2 = bind_1;

  var bind$3 = bind$2;

  var slice$1 = [].slice;
  var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check

  var wrap$1 = function (scheduler) {
    return function (handler, timeout /* , ...arguments */) {
      var boundArgs = arguments.length > 2;
      var args = boundArgs ? slice$1.call(arguments, 2) : undefined;
      return scheduler(
        boundArgs
          ? function () {
              // eslint-disable-next-line no-new-func -- spec requirement
              (typeof handler == 'function'
                ? handler
                : Function(handler)
              ).apply(this, args);
            }
          : handler,
        timeout
      );
    };
  };

  // ie9- setTimeout & setInterval additional parameters fix
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
  _export(
    { global: true, bind: true, forced: MSIE },
    {
      // `setTimeout` method
      // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
      setTimeout: wrap$1(global_1.setTimeout),
      // `setInterval` method
      // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
      setInterval: wrap$1(global_1.setInterval)
    }
  );

  var setTimeout$1 = path.setTimeout;

  var setTimeout$2 = setTimeout$1;

  var $stringify$1 = getBuiltIn('JSON', 'stringify');
  var re = /[\uD800-\uDFFF]/g;
  var low = /^[\uD800-\uDBFF]$/;
  var hi = /^[\uDC00-\uDFFF]$/;

  var fix = function (match, offset, string) {
    var prev = string.charAt(offset - 1);
    var next = string.charAt(offset + 1);
    if (
      (low.test(match) && !hi.test(next)) ||
      (hi.test(match) && !low.test(prev))
    ) {
      return '\\u' + match.charCodeAt(0).toString(16);
    }
    return match;
  };

  var FORCED$4 = fails(function () {
    return (
      $stringify$1('\uDF06\uD834') !== '"\\udf06\\ud834"' ||
      $stringify$1('\uDEAD') !== '"\\udead"'
    );
  });

  if ($stringify$1) {
    // `JSON.stringify` method
    // https://tc39.es/ecma262/#sec-json.stringify
    // https://github.com/tc39/proposal-well-formed-stringify
    _export(
      { target: 'JSON', stat: true, forced: FORCED$4 },
      {
        // eslint-disable-next-line no-unused-vars -- required for `.length`
        stringify: function stringify(it, replacer, space) {
          var result = $stringify$1.apply(null, arguments);
          return typeof result == 'string' ? result.replace(re, fix) : result;
        }
      }
    );
  }

  // eslint-disable-next-line es/no-json -- safe
  if (!path.JSON) path.JSON = { stringify: JSON.stringify };

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  var stringify = function stringify(it, replacer, space) {
    return path.JSON.stringify.apply(null, arguments);
  };

  var stringify$1 = stringify;

  var stringify$2 = stringify$1;

  var promise$5 = promise$2;

  // a string of all valid unicode whitespaces
  var whitespaces =
    '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var whitespace = '[' + whitespaces + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$3 = function (TYPE) {
    return function ($this) {
      var string = toString_1(requireObjectCoercible($this));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod$3(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$3(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$3(3)
  };

  var trim = stringTrim.trim;

  var $parseFloat = global_1.parseFloat;
  var FORCED$5 = 1 / $parseFloat(whitespaces + '-0') !== -Infinity;

  // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  var numberParseFloat = FORCED$5
    ? function parseFloat(string) {
        var trimmedString = trim(toString_1(string));
        var result = $parseFloat(trimmedString);
        return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
      }
    : $parseFloat;

  // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  _export(
    { global: true, forced: parseFloat != numberParseFloat },
    {
      parseFloat: numberParseFloat
    }
  );

  var _parseFloat = path.parseFloat;

  var _parseFloat$1 = _parseFloat;

  var _parseFloat$2 = _parseFloat$1;

  var MATCH = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return (
      isObject(it) &&
      ((isRegExp = it[MATCH]) !== undefined
        ? !!isRegExp
        : classofRaw(it) == 'RegExp')
    );
  };

  var notARegexp = function (it) {
    if (isRegexp(it)) {
      throw TypeError("The method doesn't accept regular expressions");
    }
    return it;
  };

  var MATCH$1 = wellKnownSymbol('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH$1] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) {
        /* empty */
      }
    }
    return false;
  };

  // eslint-disable-next-line es/no-string-prototype-startswith -- safe
  var $startsWith = ''.startsWith;
  var min$2 = Math.min;

  var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('startsWith');

  // `String.prototype.startsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.startswith
  _export(
    { target: 'String', proto: true, forced: !CORRECT_IS_REGEXP_LOGIC },
    {
      startsWith: function startsWith(searchString /* , position = 0 */) {
        var that = toString_1(requireObjectCoercible(this));
        notARegexp(searchString);
        var index = toLength(
          min$2(arguments.length > 1 ? arguments[1] : undefined, that.length)
        );
        var search = toString_1(searchString);
        return $startsWith
          ? $startsWith.call(that, search, index)
          : that.slice(index, index + search.length) === search;
      }
    }
  );

  var startsWith = entryVirtual('String').startsWith;

  var StringPrototype = String.prototype;

  var startsWith_1 = function (it) {
    var own = it.startsWith;
    return typeof it === 'string' ||
      it === StringPrototype ||
      (it instanceof String && own === StringPrototype.startsWith)
      ? startsWith
      : own;
  };

  var startsWith$1 = startsWith_1;

  var startsWith$2 = startsWith$1;

  var assign$4 = assign$1;

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('slice');

  var SPECIES$5 = wellKnownSymbol('species');
  var nativeSlice = [].slice;
  var max$1 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  _export(
    { target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 },
    {
      slice: function slice(start, end) {
        var O = toIndexedObject(this);
        var length = toLength(O.length);
        var k = toAbsoluteIndex(start, length);
        var fin = toAbsoluteIndex(end === undefined ? length : end, length);
        // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
        var Constructor, result, n;
        if (isArray(O)) {
          Constructor = O.constructor;
          // cross-realm fallback
          if (
            typeof Constructor == 'function' &&
            (Constructor === Array || isArray(Constructor.prototype))
          ) {
            Constructor = undefined;
          } else if (isObject(Constructor)) {
            Constructor = Constructor[SPECIES$5];
            if (Constructor === null) Constructor = undefined;
          }
          if (Constructor === Array || Constructor === undefined) {
            return nativeSlice.call(O, k, fin);
          }
        }
        result = new (Constructor === undefined ? Array : Constructor)(
          max$1(fin - k, 0)
        );
        for (n = 0; k < fin; k++, n++)
          if (k in O) createProperty(result, n, O[k]);
        result.length = n;
        return result;
      }
    }
  );

  var slice$2 = entryVirtual('Array').slice;

  var ArrayPrototype$3 = Array.prototype;

  var slice_1 = function (it) {
    var own = it.slice;
    return it === ArrayPrototype$3 ||
      (it instanceof Array && own === ArrayPrototype$3.slice)
      ? slice$2
      : own;
  };

  var slice$3 = slice_1;

  var slice$4 = slice$3;

  var symbol$4 = symbol$1;

  var iterator$4 = iterator$1;

  // `Array.isArray` method
  // https://tc39.es/ecma262/#sec-array.isarray
  _export(
    { target: 'Array', stat: true },
    {
      isArray: isArray
    }
  );

  var isArray$1 = path.Array.isArray;

  var isArray$2 = isArray$1;

  var isArray$3 = isArray$2;

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('splice');

  var max$2 = Math.max;
  var min$3 = Math.min;
  var MAX_SAFE_INTEGER$1 = 0x1fffffffffffff;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  _export(
    { target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 },
    {
      splice: function splice(start, deleteCount /* , ...items */) {
        var O = toObject(this);
        var len = toLength(O.length);
        var actualStart = toAbsoluteIndex(start, len);
        var argumentsLength = arguments.length;
        var insertCount, actualDeleteCount, A, k, from, to;
        if (argumentsLength === 0) {
          insertCount = actualDeleteCount = 0;
        } else if (argumentsLength === 1) {
          insertCount = 0;
          actualDeleteCount = len - actualStart;
        } else {
          insertCount = argumentsLength - 2;
          actualDeleteCount = min$3(
            max$2(toInteger(deleteCount), 0),
            len - actualStart
          );
        }
        if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
          throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
        }
        A = arraySpeciesCreate(O, actualDeleteCount);
        for (k = 0; k < actualDeleteCount; k++) {
          from = actualStart + k;
          if (from in O) createProperty(A, k, O[from]);
        }
        A.length = actualDeleteCount;
        if (insertCount < actualDeleteCount) {
          for (k = actualStart; k < len - actualDeleteCount; k++) {
            from = k + actualDeleteCount;
            to = k + insertCount;
            if (from in O) O[to] = O[from];
            else delete O[to];
          }
          for (k = len; k > len - actualDeleteCount + insertCount; k--)
            delete O[k - 1];
        } else if (insertCount > actualDeleteCount) {
          for (k = len - actualDeleteCount; k > actualStart; k--) {
            from = k + actualDeleteCount - 1;
            to = k + insertCount - 1;
            if (from in O) O[to] = O[from];
            else delete O[to];
          }
        }
        for (k = 0; k < insertCount; k++) {
          O[k + actualStart] = arguments[k + 2];
        }
        O.length = len - actualDeleteCount + insertCount;
        return A;
      }
    }
  );

  var splice = entryVirtual('Array').splice;

  var ArrayPrototype$4 = Array.prototype;

  var splice_1 = function (it) {
    var own = it.splice;
    return it === ArrayPrototype$4 ||
      (it instanceof Array && own === ArrayPrototype$4.splice)
      ? splice
      : own;
  };

  var splice$1 = splice_1;

  var splice$2 = splice$1;

  /* eslint-disable es/no-array-prototype-indexof -- required for testing */

  var $indexOf = arrayIncludes.indexOf;

  var nativeIndexOf = [].indexOf;

  var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
  var STRICT_METHOD$1 = arrayMethodIsStrict('indexOf');

  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  _export(
    { target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$1 },
    {
      indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
        return NEGATIVE_ZERO
          ? // convert -0 to +0
            nativeIndexOf.apply(this, arguments) || 0
          : $indexOf(
              this,
              searchElement,
              arguments.length > 1 ? arguments[1] : undefined
            );
      }
    }
  );

  var indexOf$1 = entryVirtual('Array').indexOf;

  var ArrayPrototype$5 = Array.prototype;

  var indexOf_1 = function (it) {
    var own = it.indexOf;
    return it === ArrayPrototype$5 ||
      (it instanceof Array && own === ArrayPrototype$5.indexOf)
      ? indexOf$1
      : own;
  };

  var indexOf$2 = indexOf_1;

  var indexOf$3 = indexOf$2;

  var concat = entryVirtual('Array').concat;

  var ArrayPrototype$6 = Array.prototype;

  var concat_1 = function (it) {
    var own = it.concat;
    return it === ArrayPrototype$6 ||
      (it instanceof Array && own === ArrayPrototype$6.concat)
      ? concat
      : own;
  };

  var concat$1 = concat_1;

  var concat$2 = concat$1;

  var keys$4 = entryVirtual('Array').keys;

  var keys$5 = keys$4;

  var ArrayPrototype$7 = Array.prototype;

  var DOMIterables$1 = {
    DOMTokenList: true,
    NodeList: true
  };

  var keys_1 = function (it) {
    var own = it.keys;
    return it === ArrayPrototype$7 ||
      (it instanceof Array && own === ArrayPrototype$7.keys) ||
      // eslint-disable-next-line no-prototype-builtins -- safe
      DOMIterables$1.hasOwnProperty(classof(it))
      ? keys$5
      : own;
  };

  var keys$6 = keys_1;

  var create$4 = create$1;

  var getOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;

  // eslint-disable-next-line es/no-object-getownpropertynames -- required for testing
  var FAILS_ON_PRIMITIVES$3 = fails(function () {
    return !Object.getOwnPropertyNames(1);
  });

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  _export(
    { target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$3 },
    {
      getOwnPropertyNames: getOwnPropertyNames
    }
  );

  var Object$2 = path.Object;

  var getOwnPropertyNames$1 = function getOwnPropertyNames(it) {
    return Object$2.getOwnPropertyNames(it);
  };

  var getOwnPropertyNames$2 = getOwnPropertyNames$1;

  var getOwnPropertyNames$3 = getOwnPropertyNames$2;

  var getPrototypeOf$5 = getPrototypeOf$1;

  var setPrototypeOf$5 = setPrototypeOf$1;

  var entries = entryVirtual('Array').entries;

  var entries$1 = entries;

  var ArrayPrototype$8 = Array.prototype;

  var DOMIterables$2 = {
    DOMTokenList: true,
    NodeList: true
  };

  var entries_1 = function (it) {
    var own = it.entries;
    return it === ArrayPrototype$8 ||
      (it instanceof Array && own === ArrayPrototype$8.entries) ||
      // eslint-disable-next-line no-prototype-builtins -- safe
      DOMIterables$2.hasOwnProperty(classof(it))
      ? entries$1
      : own;
  };

  var entries$2 = entries_1;

  var non = '\u200B\u0085\u180E';

  // check that a method works with the correct list
  // of whitespaces and has a correct name
  var stringTrimForced = function (METHOD_NAME) {
    return fails(function () {
      return (
        !!whitespaces[METHOD_NAME]() ||
        non[METHOD_NAME]() != non ||
        whitespaces[METHOD_NAME].name !== METHOD_NAME
      );
    });
  };

  var $trim = stringTrim.trim;

  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  _export(
    { target: 'String', proto: true, forced: stringTrimForced('trim') },
    {
      trim: function trim() {
        return $trim(this);
      }
    }
  );

  var trim$1 = entryVirtual('String').trim;

  var StringPrototype$1 = String.prototype;

  var trim_1 = function (it) {
    var own = it.trim;
    return typeof it === 'string' ||
      it === StringPrototype$1 ||
      (it instanceof String && own === StringPrototype$1.trim)
      ? trim$1
      : own;
  };

  var trim$2 = trim_1;

  var trim$3 = trim$2;

  var $map = arrayIteration.map;

  var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  _export(
    { target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 },
    {
      map: function map(callbackfn /* , thisArg */) {
        return $map(
          this,
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined
        );
      }
    }
  );

  var map = entryVirtual('Array').map;

  var ArrayPrototype$9 = Array.prototype;

  var map_1 = function (it) {
    var own = it.map;
    return it === ArrayPrototype$9 ||
      (it instanceof Array && own === ArrayPrototype$9.map)
      ? map
      : own;
  };

  var map$1 = map_1;

  var map$2 = map$1;

  var $every = arrayIteration.every;

  var STRICT_METHOD$2 = arrayMethodIsStrict('every');

  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  _export(
    { target: 'Array', proto: true, forced: !STRICT_METHOD$2 },
    {
      every: function every(callbackfn /* , thisArg */) {
        return $every(
          this,
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined
        );
      }
    }
  );

  var every = entryVirtual('Array').every;

  var ArrayPrototype$a = Array.prototype;

  var every_1 = function (it) {
    var own = it.every;
    return it === ArrayPrototype$a ||
      (it instanceof Array && own === ArrayPrototype$a.every)
      ? every
      : own;
  };

  var every$1 = every_1;

  var every$2 = every$1;

  var freezing = !fails(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var internalMetadata = createCommonjsModule(function (module) {
    var defineProperty = objectDefineProperty.f;

    var REQUIRED = false;
    var METADATA = uid('meta');
    var id = 0;

    // eslint-disable-next-line es/no-object-isextensible -- safe
    var isExtensible =
      Object.isExtensible ||
      function () {
        return true;
      };

    var setMetadata = function (it) {
      defineProperty(it, METADATA, {
        value: {
          objectID: 'O' + id++, // object ID
          weakData: {} // weak collections IDs
        }
      });
    };

    var fastKey = function (it, create) {
      // return a primitive with prefix
      if (!isObject(it))
        return typeof it == 'symbol'
          ? it
          : (typeof it == 'string' ? 'S' : 'P') + it;
      if (!has(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return 'F';
        // not necessary to add metadata
        if (!create) return 'E';
        // add missing metadata
        setMetadata(it);
        // return object ID
      }
      return it[METADATA].objectID;
    };

    var getWeakData = function (it, create) {
      if (!has(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true;
        // not necessary to add metadata
        if (!create) return false;
        // add missing metadata
        setMetadata(it);
        // return the store of weak collections IDs
      }
      return it[METADATA].weakData;
    };

    // add metadata on freeze-family methods calling
    var onFreeze = function (it) {
      if (freezing && REQUIRED && isExtensible(it) && !has(it, METADATA))
        setMetadata(it);
      return it;
    };

    var enable = function () {
      meta.enable = function () {
        /* empty */
      };
      REQUIRED = true;
      var getOwnPropertyNames = objectGetOwnPropertyNames.f;
      var splice = [].splice;
      var test = {};
      test[METADATA] = 1;

      // prevent exposing of metadata key
      if (getOwnPropertyNames(test).length) {
        objectGetOwnPropertyNames.f = function (it) {
          var result = getOwnPropertyNames(it);
          for (var i = 0, length = result.length; i < length; i++) {
            if (result[i] === METADATA) {
              splice.call(result, i, 1);
              break;
            }
          }
          return result;
        };

        _export(
          { target: 'Object', stat: true, forced: true },
          {
            getOwnPropertyNames: objectGetOwnPropertyNamesExternal.f
          }
        );
      }
    };

    var meta = (module.exports = {
      enable: enable,
      fastKey: fastKey,
      getWeakData: getWeakData,
      onFreeze: onFreeze
    });

    hiddenKeys[METADATA] = true;
  });
  var internalMetadata_1 = internalMetadata.enable;
  var internalMetadata_2 = internalMetadata.fastKey;
  var internalMetadata_3 = internalMetadata.getWeakData;
  var internalMetadata_4 = internalMetadata.onFreeze;

  var onFreeze = internalMetadata.onFreeze;

  // eslint-disable-next-line es/no-object-freeze -- safe
  var $freeze = Object.freeze;
  var FAILS_ON_PRIMITIVES$4 = fails(function () {
    $freeze(1);
  });

  // `Object.freeze` method
  // https://tc39.es/ecma262/#sec-object.freeze
  _export(
    {
      target: 'Object',
      stat: true,
      forced: FAILS_ON_PRIMITIVES$4,
      sham: !freezing
    },
    {
      freeze: function freeze(it) {
        return $freeze && isObject(it) ? $freeze(onFreeze(it)) : it;
      }
    }
  );

  var freeze = path.Object.freeze;

  var freeze$1 = freeze;

  var freeze$2 = freeze$1;

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod$4 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aFunction$1(callbackfn);
      var O = toObject(that);
      var self = indexedObject(O);
      var length = toLength(O.length);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2)
        while (true) {
          if (index in self) {
            memo = self[index];
            index += i;
            break;
          }
          index += i;
          if (IS_RIGHT ? index < 0 : length <= index) {
            throw TypeError('Reduce of empty array with no initial value');
          }
        }
      for (; IS_RIGHT ? index >= 0 : length > index; index += i)
        if (index in self) {
          memo = callbackfn(memo, self[index], index, O);
        }
      return memo;
    };
  };

  var arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod$4(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$4(true)
  };

  var $reduce = arrayReduce.left;

  var STRICT_METHOD$3 = arrayMethodIsStrict('reduce');
  // Chrome 80-82 has a critical bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
  var CHROME_BUG =
    !engineIsNode && engineV8Version > 79 && engineV8Version < 83;

  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  _export(
    { target: 'Array', proto: true, forced: !STRICT_METHOD$3 || CHROME_BUG },
    {
      reduce: function reduce(callbackfn /* , initialValue */) {
        return $reduce(
          this,
          callbackfn,
          arguments.length,
          arguments.length > 1 ? arguments[1] : undefined
        );
      }
    }
  );

  var reduce = entryVirtual('Array').reduce;

  var ArrayPrototype$b = Array.prototype;

  var reduce_1 = function (it) {
    var own = it.reduce;
    return it === ArrayPrototype$b ||
      (it instanceof Array && own === ArrayPrototype$b.reduce)
      ? reduce
      : own;
  };

  var reduce$1 = reduce_1;

  var reduce$2 = reduce$1;

  var ITERATOR$5 = wellKnownSymbol('iterator');

  var nativeUrl = !fails(function () {
    var url = new URL('b?a=1&b=2&c=3', 'http://a');
    var searchParams = url.searchParams;
    var result = '';
    url.pathname = 'c%20d';
    searchParams.forEach(function (value, key) {
      searchParams['delete']('b');
      result += key + value;
    });
    return (
      (isPure && !url.toJSON) ||
      !searchParams.sort ||
      url.href !== 'http://a/c%20d?a=1&c=3' ||
      searchParams.get('c') !== '3' ||
      String(new URLSearchParams('?a=1')) !== 'a=1' ||
      !searchParams[ITERATOR$5] ||
      // throws in Edge
      new URL('https://a@b').username !== 'a' ||
      new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b' ||
      // not punycoded in Edge
      new URL('http://тест').host !== 'xn--e1aybc' ||
      // not escaped in Chrome 62-
      new URL('http://a#б').hash !== '#%D0%B1' ||
      // fails in Chrome 66-
      result !== 'a1c3' ||
      // throws in Safari
      new URL('http://x', undefined).host !== 'x'
    );
  });

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
  };

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(
    arrayLike /* , mapfn = undefined, thisArg = undefined */
  ) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    if (mapping)
      mapfn = functionBindContext(
        mapfn,
        argumentsLength > 2 ? arguments[2] : undefined,
        2
      );
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (
      iteratorMethod != undefined &&
      !(C == Array && isArrayIteratorMethod(iteratorMethod))
    ) {
      iterator = iteratorMethod.call(O);
      next = iterator.next;
      result = new C();
      for (; !(step = next.call(iterator)).done; index++) {
        value = mapping
          ? callWithSafeIterationClosing(
              iterator,
              mapfn,
              [step.value, index],
              true
            )
          : step.value;
        createProperty(result, index, value);
      }
    } else {
      length = toLength(O.length);
      result = new C(length);
      for (; length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  // based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
  var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
  var base = 36;
  var tMin = 1;
  var tMax = 26;
  var skew = 38;
  var damp = 700;
  var initialBias = 72;
  var initialN = 128; // 0x80
  var delimiter = '-'; // '\x2D'
  var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
  var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
  var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
  var baseMinusTMin = base - tMin;
  var floor$1 = Math.floor;
  var stringFromCharCode = String.fromCharCode;

  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   */
  var ucs2decode = function (string) {
    var output = [];
    var counter = 0;
    var length = string.length;
    while (counter < length) {
      var value = string.charCodeAt(counter++);
      if (value >= 0xd800 && value <= 0xdbff && counter < length) {
        // It's a high surrogate, and there is a next character.
        var extra = string.charCodeAt(counter++);
        if ((extra & 0xfc00) == 0xdc00) {
          // Low surrogate.
          output.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
        } else {
          // It's an unmatched surrogate; only append this code unit, in case the
          // next code unit is the high surrogate of a surrogate pair.
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  };

  /**
   * Converts a digit/integer into a basic code point.
   */
  var digitToBasic = function (digit) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26);
  };

  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   */
  var adapt = function (delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor$1(delta / damp) : delta >> 1;
    delta += floor$1(delta / numPoints);
    for (; delta > (baseMinusTMin * tMax) >> 1; k += base) {
      delta = floor$1(delta / baseMinusTMin);
    }
    return floor$1(k + ((baseMinusTMin + 1) * delta) / (delta + skew));
  };

  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   */
  // eslint-disable-next-line max-statements -- TODO
  var encode = function (input) {
    var output = [];

    // Convert the input in UCS-2 to an array of Unicode code points.
    input = ucs2decode(input);

    // Cache the length.
    var inputLength = input.length;

    // Initialize the state.
    var n = initialN;
    var delta = 0;
    var bias = initialBias;
    var i, currentValue;

    // Handle the basic code points.
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }

    var basicLength = output.length; // number of basic code points.
    var handledCPCount = basicLength; // number of code points that have been handled;

    // Finish the basic string with a delimiter unless it's empty.
    if (basicLength) {
      output.push(delimiter);
    }

    // Main encoding loop:
    while (handledCPCount < inputLength) {
      // All non-basic code points < n have been handled already. Find the next larger one:
      var m = maxInt;
      for (i = 0; i < input.length; i++) {
        currentValue = input[i];
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }

      // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
      var handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor$1((maxInt - delta) / handledCPCountPlusOne)) {
        throw RangeError(OVERFLOW_ERROR);
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (i = 0; i < input.length; i++) {
        currentValue = input[i];
        if (currentValue < n && ++delta > maxInt) {
          throw RangeError(OVERFLOW_ERROR);
        }
        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer.
          var q = delta;
          for (var k = base /* no condition */; ; k += base) {
            var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (q < t) break;
            var qMinusT = q - t;
            var baseMinusT = base - t;
            output.push(
              stringFromCharCode(digitToBasic(t + (qMinusT % baseMinusT)))
            );
            q = floor$1(qMinusT / baseMinusT);
          }

          output.push(stringFromCharCode(digitToBasic(q)));
          bias = adapt(
            delta,
            handledCPCountPlusOne,
            handledCPCount == basicLength
          );
          delta = 0;
          ++handledCPCount;
        }
      }

      ++delta;
      ++n;
    }
    return output.join('');
  };

  var stringPunycodeToAscii = function (input) {
    var encoded = [];
    var labels = input
      .toLowerCase()
      .replace(regexSeparators, '\u002E')
      .split('.');
    var i, label;
    for (i = 0; i < labels.length; i++) {
      label = labels[i];
      encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
    }
    return encoded.join('.');
  };

  var getIterator = function (it) {
    var iteratorMethod = getIteratorMethod(it);
    if (typeof iteratorMethod != 'function') {
      throw TypeError(String(it) + ' is not iterable');
    }
    return anObject(iteratorMethod.call(it));
  };

  // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

  var nativeFetch = getBuiltIn('fetch');
  var NativeRequest = getBuiltIn('Request');
  var RequestPrototype = NativeRequest && NativeRequest.prototype;
  var Headers = getBuiltIn('Headers');
  var ITERATOR$6 = wellKnownSymbol('iterator');
  var URL_SEARCH_PARAMS = 'URLSearchParams';
  var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
  var setInternalState$4 = internalState.set;
  var getInternalParamsState = internalState.getterFor(URL_SEARCH_PARAMS);
  var getInternalIteratorState = internalState.getterFor(
    URL_SEARCH_PARAMS_ITERATOR
  );

  var plus = /\+/g;
  var sequences = Array(4);

  var percentSequence = function (bytes) {
    return (
      sequences[bytes - 1] ||
      (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'))
    );
  };

  var percentDecode = function (sequence) {
    try {
      return decodeURIComponent(sequence);
    } catch (error) {
      return sequence;
    }
  };

  var deserialize = function (it) {
    var result = it.replace(plus, ' ');
    var bytes = 4;
    try {
      return decodeURIComponent(result);
    } catch (error) {
      while (bytes) {
        result = result.replace(percentSequence(bytes--), percentDecode);
      }
      return result;
    }
  };

  var find = /[!'()~]|%20/g;

  var replace = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+'
  };

  var replacer = function (match) {
    return replace[match];
  };

  var serialize = function (it) {
    return encodeURIComponent(it).replace(find, replacer);
  };

  var parseSearchParams = function (result, query) {
    if (query) {
      var attributes = query.split('&');
      var index = 0;
      var attribute, entry;
      while (index < attributes.length) {
        attribute = attributes[index++];
        if (attribute.length) {
          entry = attribute.split('=');
          result.push({
            key: deserialize(entry.shift()),
            value: deserialize(entry.join('='))
          });
        }
      }
    }
  };

  var updateSearchParams = function (query) {
    this.entries.length = 0;
    parseSearchParams(this.entries, query);
  };

  var validateArgumentsLength = function (passed, required) {
    if (passed < required) throw TypeError('Not enough arguments');
  };

  var URLSearchParamsIterator = createIteratorConstructor(
    function Iterator(params, kind) {
      setInternalState$4(this, {
        type: URL_SEARCH_PARAMS_ITERATOR,
        iterator: getIterator(getInternalParamsState(params).entries),
        kind: kind
      });
    },
    'Iterator',
    function next() {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var step = state.iterator.next();
      var entry = step.value;
      if (!step.done) {
        step.value =
          kind === 'keys'
            ? entry.key
            : kind === 'values'
            ? entry.value
            : [entry.key, entry.value];
      }
      return step;
    }
  );

  // `URLSearchParams` constructor
  // https://url.spec.whatwg.org/#interface-urlsearchparams
  var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
    anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
    var init = arguments.length > 0 ? arguments[0] : undefined;
    var that = this;
    var entries = [];
    var iteratorMethod,
      iterator,
      next,
      step,
      entryIterator,
      entryNext,
      first,
      second,
      key;

    setInternalState$4(that, {
      type: URL_SEARCH_PARAMS,
      entries: entries,
      updateURL: function () {
        /* empty */
      },
      updateSearchParams: updateSearchParams
    });

    if (init !== undefined) {
      if (isObject(init)) {
        iteratorMethod = getIteratorMethod(init);
        if (typeof iteratorMethod === 'function') {
          iterator = iteratorMethod.call(init);
          next = iterator.next;
          while (!(step = next.call(iterator)).done) {
            entryIterator = getIterator(anObject(step.value));
            entryNext = entryIterator.next;
            if (
              (first = entryNext.call(entryIterator)).done ||
              (second = entryNext.call(entryIterator)).done ||
              !entryNext.call(entryIterator).done
            )
              throw TypeError('Expected sequence with length 2');
            entries.push({
              key: toString_1(first.value),
              value: toString_1(second.value)
            });
          }
        } else {
          for (key in init) {
            if (has(init, key)) {
              entries.push({ key: key, value: toString_1(init[key]) });
            }
          }
        }
      } else {
        parseSearchParams(
          entries,
          typeof init === 'string'
            ? init.charAt(0) === '?'
              ? init.slice(1)
              : init
            : toString_1(init)
        );
      }
    }
  };

  var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

  redefineAll(
    URLSearchParamsPrototype,
    {
      // `URLSearchParams.prototype.append` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-append
      append: function append(name, value) {
        validateArgumentsLength(arguments.length, 2);
        var state = getInternalParamsState(this);
        state.entries.push({ key: toString_1(name), value: toString_1(value) });
        state.updateURL();
      },
      // `URLSearchParams.prototype.delete` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
      delete: function (name) {
        validateArgumentsLength(arguments.length, 1);
        var state = getInternalParamsState(this);
        var entries = state.entries;
        var key = toString_1(name);
        var index = 0;
        while (index < entries.length) {
          if (entries[index].key === key) entries.splice(index, 1);
          else index++;
        }
        state.updateURL();
      },
      // `URLSearchParams.prototype.get` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-get
      get: function get(name) {
        validateArgumentsLength(arguments.length, 1);
        var entries = getInternalParamsState(this).entries;
        var key = toString_1(name);
        var index = 0;
        for (; index < entries.length; index++) {
          if (entries[index].key === key) return entries[index].value;
        }
        return null;
      },
      // `URLSearchParams.prototype.getAll` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
      getAll: function getAll(name) {
        validateArgumentsLength(arguments.length, 1);
        var entries = getInternalParamsState(this).entries;
        var key = toString_1(name);
        var result = [];
        var index = 0;
        for (; index < entries.length; index++) {
          if (entries[index].key === key) result.push(entries[index].value);
        }
        return result;
      },
      // `URLSearchParams.prototype.has` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-has
      has: function has(name) {
        validateArgumentsLength(arguments.length, 1);
        var entries = getInternalParamsState(this).entries;
        var key = toString_1(name);
        var index = 0;
        while (index < entries.length) {
          if (entries[index++].key === key) return true;
        }
        return false;
      },
      // `URLSearchParams.prototype.set` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-set
      set: function set(name, value) {
        validateArgumentsLength(arguments.length, 1);
        var state = getInternalParamsState(this);
        var entries = state.entries;
        var found = false;
        var key = toString_1(name);
        var val = toString_1(value);
        var index = 0;
        var entry;
        for (; index < entries.length; index++) {
          entry = entries[index];
          if (entry.key === key) {
            if (found) entries.splice(index--, 1);
            else {
              found = true;
              entry.value = val;
            }
          }
        }
        if (!found) entries.push({ key: key, value: val });
        state.updateURL();
      },
      // `URLSearchParams.prototype.sort` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
      sort: function sort() {
        var state = getInternalParamsState(this);
        var entries = state.entries;
        // Array#sort is not stable in some engines
        var slice = entries.slice();
        var entry, entriesIndex, sliceIndex;
        entries.length = 0;
        for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
          entry = slice[sliceIndex];
          for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
            if (entries[entriesIndex].key > entry.key) {
              entries.splice(entriesIndex, 0, entry);
              break;
            }
          }
          if (entriesIndex === sliceIndex) entries.push(entry);
        }
        state.updateURL();
      },
      // `URLSearchParams.prototype.forEach` method
      forEach: function forEach(callback /* , thisArg */) {
        var entries = getInternalParamsState(this).entries;
        var boundFunction = functionBindContext(
          callback,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        );
        var index = 0;
        var entry;
        while (index < entries.length) {
          entry = entries[index++];
          boundFunction(entry.value, entry.key, this);
        }
      },
      // `URLSearchParams.prototype.keys` method
      keys: function keys() {
        return new URLSearchParamsIterator(this, 'keys');
      },
      // `URLSearchParams.prototype.values` method
      values: function values() {
        return new URLSearchParamsIterator(this, 'values');
      },
      // `URLSearchParams.prototype.entries` method
      entries: function entries() {
        return new URLSearchParamsIterator(this, 'entries');
      }
    },
    { enumerable: true }
  );

  // `URLSearchParams.prototype[@@iterator]` method
  redefine(
    URLSearchParamsPrototype,
    ITERATOR$6,
    URLSearchParamsPrototype.entries
  );

  // `URLSearchParams.prototype.toString` method
  // https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
  redefine(
    URLSearchParamsPrototype,
    'toString',
    function toString() {
      var entries = getInternalParamsState(this).entries;
      var result = [];
      var index = 0;
      var entry;
      while (index < entries.length) {
        entry = entries[index++];
        result.push(serialize(entry.key) + '=' + serialize(entry.value));
      }
      return result.join('&');
    },
    { enumerable: true }
  );

  setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

  _export(
    { global: true, forced: !nativeUrl },
    {
      URLSearchParams: URLSearchParamsConstructor
    }
  );

  // Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
  if (!nativeUrl && typeof Headers == 'function') {
    var wrapRequestOptions = function (init) {
      if (isObject(init)) {
        var body = init.body;
        var headers;
        if (classof(body) === URL_SEARCH_PARAMS) {
          headers = init.headers ? new Headers(init.headers) : new Headers();
          if (!headers.has('content-type')) {
            headers.set(
              'content-type',
              'application/x-www-form-urlencoded;charset=UTF-8'
            );
          }
          return objectCreate(init, {
            body: createPropertyDescriptor(0, String(body)),
            headers: createPropertyDescriptor(0, headers)
          });
        }
      }
      return init;
    };

    if (typeof nativeFetch == 'function') {
      _export(
        { global: true, enumerable: true, forced: true },
        {
          fetch: function fetch(input /* , init */) {
            return nativeFetch(
              input,
              arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {}
            );
          }
        }
      );
    }

    if (typeof NativeRequest == 'function') {
      var RequestConstructor = function Request(input /* , init */) {
        anInstance(this, RequestConstructor, 'Request');
        return new NativeRequest(
          input,
          arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {}
        );
      };

      RequestPrototype.constructor = RequestConstructor;
      RequestConstructor.prototype = RequestPrototype;

      _export(
        { global: true, forced: true },
        {
          Request: RequestConstructor
        }
      );
    }
  }

  var web_urlSearchParams = {
    URLSearchParams: URLSearchParamsConstructor,
    getState: getInternalParamsState
  };

  // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

  var codeAt = stringMultibyte.codeAt;

  var NativeURL = global_1.URL;
  var URLSearchParams$1 = web_urlSearchParams.URLSearchParams;
  var getInternalSearchParamsState = web_urlSearchParams.getState;
  var setInternalState$5 = internalState.set;
  var getInternalURLState = internalState.getterFor('URL');
  var floor$2 = Math.floor;
  var pow = Math.pow;

  var INVALID_AUTHORITY = 'Invalid authority';
  var INVALID_SCHEME = 'Invalid scheme';
  var INVALID_HOST = 'Invalid host';
  var INVALID_PORT = 'Invalid port';

  var ALPHA = /[A-Za-z]/;
  // eslint-disable-next-line regexp/no-obscure-range -- safe
  var ALPHANUMERIC = /[\d+-.A-Za-z]/;
  var DIGIT = /\d/;
  var HEX_START = /^0x/i;
  var OCT = /^[0-7]+$/;
  var DEC = /^\d+$/;
  var HEX = /^[\dA-Fa-f]+$/;
  /* eslint-disable no-control-regex -- safe */
  var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
  var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
  var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
  var TAB_AND_NEW_LINE = /[\t\n\r]/g;
  /* eslint-enable no-control-regex -- safe */
  var EOF;

  var parseHost = function (url, input) {
    var result, codePoints, index;
    if (input.charAt(0) == '[') {
      if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
      result = parseIPv6(input.slice(1, -1));
      if (!result) return INVALID_HOST;
      url.host = result;
      // opaque host
    } else if (!isSpecial(url)) {
      if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input))
        return INVALID_HOST;
      result = '';
      codePoints = arrayFrom(input);
      for (index = 0; index < codePoints.length; index++) {
        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
      }
      url.host = result;
    } else {
      input = stringPunycodeToAscii(input);
      if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
      result = parseIPv4(input);
      if (result === null) return INVALID_HOST;
      url.host = result;
    }
  };

  var parseIPv4 = function (input) {
    var parts = input.split('.');
    var partsLength, numbers, index, part, radix, number, ipv4;
    if (parts.length && parts[parts.length - 1] == '') {
      parts.pop();
    }
    partsLength = parts.length;
    if (partsLength > 4) return input;
    numbers = [];
    for (index = 0; index < partsLength; index++) {
      part = parts[index];
      if (part == '') return input;
      radix = 10;
      if (part.length > 1 && part.charAt(0) == '0') {
        radix = HEX_START.test(part) ? 16 : 8;
        part = part.slice(radix == 8 ? 1 : 2);
      }
      if (part === '') {
        number = 0;
      } else {
        if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part))
          return input;
        number = parseInt(part, radix);
      }
      numbers.push(number);
    }
    for (index = 0; index < partsLength; index++) {
      number = numbers[index];
      if (index == partsLength - 1) {
        if (number >= pow(256, 5 - partsLength)) return null;
      } else if (number > 255) return null;
    }
    ipv4 = numbers.pop();
    for (index = 0; index < numbers.length; index++) {
      ipv4 += numbers[index] * pow(256, 3 - index);
    }
    return ipv4;
  };

  // eslint-disable-next-line max-statements -- TODO
  var parseIPv6 = function (input) {
    var address = [0, 0, 0, 0, 0, 0, 0, 0];
    var pieceIndex = 0;
    var compress = null;
    var pointer = 0;
    var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

    var char = function () {
      return input.charAt(pointer);
    };

    if (char() == ':') {
      if (input.charAt(1) != ':') return;
      pointer += 2;
      pieceIndex++;
      compress = pieceIndex;
    }
    while (char()) {
      if (pieceIndex == 8) return;
      if (char() == ':') {
        if (compress !== null) return;
        pointer++;
        pieceIndex++;
        compress = pieceIndex;
        continue;
      }
      value = length = 0;
      while (length < 4 && HEX.test(char())) {
        value = value * 16 + parseInt(char(), 16);
        pointer++;
        length++;
      }
      if (char() == '.') {
        if (length == 0) return;
        pointer -= length;
        if (pieceIndex > 6) return;
        numbersSeen = 0;
        while (char()) {
          ipv4Piece = null;
          if (numbersSeen > 0) {
            if (char() == '.' && numbersSeen < 4) pointer++;
            else return;
          }
          if (!DIGIT.test(char())) return;
          while (DIGIT.test(char())) {
            number = parseInt(char(), 10);
            if (ipv4Piece === null) ipv4Piece = number;
            else if (ipv4Piece == 0) return;
            else ipv4Piece = ipv4Piece * 10 + number;
            if (ipv4Piece > 255) return;
            pointer++;
          }
          address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
          numbersSeen++;
          if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
        }
        if (numbersSeen != 4) return;
        break;
      } else if (char() == ':') {
        pointer++;
        if (!char()) return;
      } else if (char()) return;
      address[pieceIndex++] = value;
    }
    if (compress !== null) {
      swaps = pieceIndex - compress;
      pieceIndex = 7;
      while (pieceIndex != 0 && swaps > 0) {
        swap = address[pieceIndex];
        address[pieceIndex--] = address[compress + swaps - 1];
        address[compress + --swaps] = swap;
      }
    } else if (pieceIndex != 8) return;
    return address;
  };

  var findLongestZeroSequence = function (ipv6) {
    var maxIndex = null;
    var maxLength = 1;
    var currStart = null;
    var currLength = 0;
    var index = 0;
    for (; index < 8; index++) {
      if (ipv6[index] !== 0) {
        if (currLength > maxLength) {
          maxIndex = currStart;
          maxLength = currLength;
        }
        currStart = null;
        currLength = 0;
      } else {
        if (currStart === null) currStart = index;
        ++currLength;
      }
    }
    if (currLength > maxLength) {
      maxIndex = currStart;
      maxLength = currLength;
    }
    return maxIndex;
  };

  var serializeHost = function (host) {
    var result, index, compress, ignore0;
    // ipv4
    if (typeof host == 'number') {
      result = [];
      for (index = 0; index < 4; index++) {
        result.unshift(host % 256);
        host = floor$2(host / 256);
      }
      return result.join('.');
      // ipv6
    } else if (typeof host == 'object') {
      result = '';
      compress = findLongestZeroSequence(host);
      for (index = 0; index < 8; index++) {
        if (ignore0 && host[index] === 0) continue;
        if (ignore0) ignore0 = false;
        if (compress === index) {
          result += index ? ':' : '::';
          ignore0 = true;
        } else {
          result += host[index].toString(16);
          if (index < 7) result += ':';
        }
      }
      return '[' + result + ']';
    }
    return host;
  };

  var C0ControlPercentEncodeSet = {};
  var fragmentPercentEncodeSet = objectAssign({}, C0ControlPercentEncodeSet, {
    ' ': 1,
    '"': 1,
    '<': 1,
    '>': 1,
    '`': 1
  });
  var pathPercentEncodeSet = objectAssign({}, fragmentPercentEncodeSet, {
    '#': 1,
    '?': 1,
    '{': 1,
    '}': 1
  });
  var userinfoPercentEncodeSet = objectAssign({}, pathPercentEncodeSet, {
    '/': 1,
    ':': 1,
    ';': 1,
    '=': 1,
    '@': 1,
    '[': 1,
    '\\': 1,
    ']': 1,
    '^': 1,
    '|': 1
  });

  var percentEncode = function (char, set) {
    var code = codeAt(char, 0);
    return code > 0x20 && code < 0x7f && !has(set, char)
      ? char
      : encodeURIComponent(char);
  };

  var specialSchemes = {
    ftp: 21,
    file: null,
    http: 80,
    https: 443,
    ws: 80,
    wss: 443
  };

  var isSpecial = function (url) {
    return has(specialSchemes, url.scheme);
  };

  var includesCredentials = function (url) {
    return url.username != '' || url.password != '';
  };

  var cannotHaveUsernamePasswordPort = function (url) {
    return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
  };

  var isWindowsDriveLetter = function (string, normalized) {
    var second;
    return (
      string.length == 2 &&
      ALPHA.test(string.charAt(0)) &&
      ((second = string.charAt(1)) == ':' || (!normalized && second == '|'))
    );
  };

  var startsWithWindowsDriveLetter = function (string) {
    var third;
    return (
      string.length > 1 &&
      isWindowsDriveLetter(string.slice(0, 2)) &&
      (string.length == 2 ||
        (third = string.charAt(2)) === '/' ||
        third === '\\' ||
        third === '?' ||
        third === '#')
    );
  };

  var shortenURLsPath = function (url) {
    var path = url.path;
    var pathSize = path.length;
    if (
      pathSize &&
      (url.scheme != 'file' ||
        pathSize != 1 ||
        !isWindowsDriveLetter(path[0], true))
    ) {
      path.pop();
    }
  };

  var isSingleDot = function (segment) {
    return segment === '.' || segment.toLowerCase() === '%2e';
  };

  var isDoubleDot = function (segment) {
    segment = segment.toLowerCase();
    return (
      segment === '..' ||
      segment === '%2e.' ||
      segment === '.%2e' ||
      segment === '%2e%2e'
    );
  };

  // States:
  var SCHEME_START = {};
  var SCHEME = {};
  var NO_SCHEME = {};
  var SPECIAL_RELATIVE_OR_AUTHORITY = {};
  var PATH_OR_AUTHORITY = {};
  var RELATIVE = {};
  var RELATIVE_SLASH = {};
  var SPECIAL_AUTHORITY_SLASHES = {};
  var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
  var AUTHORITY = {};
  var HOST = {};
  var HOSTNAME = {};
  var PORT = {};
  var FILE = {};
  var FILE_SLASH = {};
  var FILE_HOST = {};
  var PATH_START = {};
  var PATH = {};
  var CANNOT_BE_A_BASE_URL_PATH = {};
  var QUERY = {};
  var FRAGMENT = {};

  // eslint-disable-next-line max-statements -- TODO
  var parseURL = function (url, input, stateOverride, base) {
    var state = stateOverride || SCHEME_START;
    var pointer = 0;
    var buffer = '';
    var seenAt = false;
    var seenBracket = false;
    var seenPasswordToken = false;
    var codePoints, char, bufferCodePoints, failure;

    if (!stateOverride) {
      url.scheme = '';
      url.username = '';
      url.password = '';
      url.host = null;
      url.port = null;
      url.path = [];
      url.query = null;
      url.fragment = null;
      url.cannotBeABaseURL = false;
      input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
    }

    input = input.replace(TAB_AND_NEW_LINE, '');

    codePoints = arrayFrom(input);

    while (pointer <= codePoints.length) {
      char = codePoints[pointer];
      switch (state) {
        case SCHEME_START:
          if (char && ALPHA.test(char)) {
            buffer += char.toLowerCase();
            state = SCHEME;
          } else if (!stateOverride) {
            state = NO_SCHEME;
            continue;
          } else return INVALID_SCHEME;
          break;

        case SCHEME:
          if (
            char &&
            (ALPHANUMERIC.test(char) ||
              char == '+' ||
              char == '-' ||
              char == '.')
          ) {
            buffer += char.toLowerCase();
          } else if (char == ':') {
            if (
              stateOverride &&
              (isSpecial(url) != has(specialSchemes, buffer) ||
                (buffer == 'file' &&
                  (includesCredentials(url) || url.port !== null)) ||
                (url.scheme == 'file' && !url.host))
            )
              return;
            url.scheme = buffer;
            if (stateOverride) {
              if (isSpecial(url) && specialSchemes[url.scheme] == url.port)
                url.port = null;
              return;
            }
            buffer = '';
            if (url.scheme == 'file') {
              state = FILE;
            } else if (isSpecial(url) && base && base.scheme == url.scheme) {
              state = SPECIAL_RELATIVE_OR_AUTHORITY;
            } else if (isSpecial(url)) {
              state = SPECIAL_AUTHORITY_SLASHES;
            } else if (codePoints[pointer + 1] == '/') {
              state = PATH_OR_AUTHORITY;
              pointer++;
            } else {
              url.cannotBeABaseURL = true;
              url.path.push('');
              state = CANNOT_BE_A_BASE_URL_PATH;
            }
          } else if (!stateOverride) {
            buffer = '';
            state = NO_SCHEME;
            pointer = 0;
            continue;
          } else return INVALID_SCHEME;
          break;

        case NO_SCHEME:
          if (!base || (base.cannotBeABaseURL && char != '#'))
            return INVALID_SCHEME;
          if (base.cannotBeABaseURL && char == '#') {
            url.scheme = base.scheme;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            url.cannotBeABaseURL = true;
            state = FRAGMENT;
            break;
          }
          state = base.scheme == 'file' ? FILE : RELATIVE;
          continue;

        case SPECIAL_RELATIVE_OR_AUTHORITY:
          if (char == '/' && codePoints[pointer + 1] == '/') {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            pointer++;
          } else {
            state = RELATIVE;
            continue;
          }
          break;

        case PATH_OR_AUTHORITY:
          if (char == '/') {
            state = AUTHORITY;
            break;
          } else {
            state = PATH;
            continue;
          }

        case RELATIVE:
          url.scheme = base.scheme;
          if (char == EOF) {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '/' || (char == '\\' && isSpecial(url))) {
            state = RELATIVE_SLASH;
          } else if (char == '?') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = base.path.slice();
            url.path.pop();
            state = PATH;
            continue;
          }
          break;

        case RELATIVE_SLASH:
          if (isSpecial(url) && (char == '/' || char == '\\')) {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          } else if (char == '/') {
            state = AUTHORITY;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            state = PATH;
            continue;
          }
          break;

        case SPECIAL_AUTHORITY_SLASHES:
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
          pointer++;
          break;

        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
          if (char != '/' && char != '\\') {
            state = AUTHORITY;
            continue;
          }
          break;

        case AUTHORITY:
          if (char == '@') {
            if (seenAt) buffer = '%40' + buffer;
            seenAt = true;
            bufferCodePoints = arrayFrom(buffer);
            for (var i = 0; i < bufferCodePoints.length; i++) {
              var codePoint = bufferCodePoints[i];
              if (codePoint == ':' && !seenPasswordToken) {
                seenPasswordToken = true;
                continue;
              }
              var encodedCodePoints = percentEncode(
                codePoint,
                userinfoPercentEncodeSet
              );
              if (seenPasswordToken) url.password += encodedCodePoints;
              else url.username += encodedCodePoints;
            }
            buffer = '';
          } else if (
            char == EOF ||
            char == '/' ||
            char == '?' ||
            char == '#' ||
            (char == '\\' && isSpecial(url))
          ) {
            if (seenAt && buffer == '') return INVALID_AUTHORITY;
            pointer -= arrayFrom(buffer).length + 1;
            buffer = '';
            state = HOST;
          } else buffer += char;
          break;

        case HOST:
        case HOSTNAME:
          if (stateOverride && url.scheme == 'file') {
            state = FILE_HOST;
            continue;
          } else if (char == ':' && !seenBracket) {
            if (buffer == '') return INVALID_HOST;
            failure = parseHost(url, buffer);
            if (failure) return failure;
            buffer = '';
            state = PORT;
            if (stateOverride == HOSTNAME) return;
          } else if (
            char == EOF ||
            char == '/' ||
            char == '?' ||
            char == '#' ||
            (char == '\\' && isSpecial(url))
          ) {
            if (isSpecial(url) && buffer == '') return INVALID_HOST;
            if (
              stateOverride &&
              buffer == '' &&
              (includesCredentials(url) || url.port !== null)
            )
              return;
            failure = parseHost(url, buffer);
            if (failure) return failure;
            buffer = '';
            state = PATH_START;
            if (stateOverride) return;
            continue;
          } else {
            if (char == '[') seenBracket = true;
            else if (char == ']') seenBracket = false;
            buffer += char;
          }
          break;

        case PORT:
          if (DIGIT.test(char)) {
            buffer += char;
          } else if (
            char == EOF ||
            char == '/' ||
            char == '?' ||
            char == '#' ||
            (char == '\\' && isSpecial(url)) ||
            stateOverride
          ) {
            if (buffer != '') {
              var port = parseInt(buffer, 10);
              if (port > 0xffff) return INVALID_PORT;
              url.port =
                isSpecial(url) && port === specialSchemes[url.scheme]
                  ? null
                  : port;
              buffer = '';
            }
            if (stateOverride) return;
            state = PATH_START;
            continue;
          } else return INVALID_PORT;
          break;

        case FILE:
          url.scheme = 'file';
          if (char == '/' || char == '\\') state = FILE_SLASH;
          else if (base && base.scheme == 'file') {
            if (char == EOF) {
              url.host = base.host;
              url.path = base.path.slice();
              url.query = base.query;
            } else if (char == '?') {
              url.host = base.host;
              url.path = base.path.slice();
              url.query = '';
              state = QUERY;
            } else if (char == '#') {
              url.host = base.host;
              url.path = base.path.slice();
              url.query = base.query;
              url.fragment = '';
              state = FRAGMENT;
            } else {
              if (
                !startsWithWindowsDriveLetter(
                  codePoints.slice(pointer).join('')
                )
              ) {
                url.host = base.host;
                url.path = base.path.slice();
                shortenURLsPath(url);
              }
              state = PATH;
              continue;
            }
          } else {
            state = PATH;
            continue;
          }
          break;

        case FILE_SLASH:
          if (char == '/' || char == '\\') {
            state = FILE_HOST;
            break;
          }
          if (
            base &&
            base.scheme == 'file' &&
            !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))
          ) {
            if (isWindowsDriveLetter(base.path[0], true))
              url.path.push(base.path[0]);
            else url.host = base.host;
          }
          state = PATH;
          continue;

        case FILE_HOST:
          if (
            char == EOF ||
            char == '/' ||
            char == '\\' ||
            char == '?' ||
            char == '#'
          ) {
            if (!stateOverride && isWindowsDriveLetter(buffer)) {
              state = PATH;
            } else if (buffer == '') {
              url.host = '';
              if (stateOverride) return;
              state = PATH_START;
            } else {
              failure = parseHost(url, buffer);
              if (failure) return failure;
              if (url.host == 'localhost') url.host = '';
              if (stateOverride) return;
              buffer = '';
              state = PATH_START;
            }
            continue;
          } else buffer += char;
          break;

        case PATH_START:
          if (isSpecial(url)) {
            state = PATH;
            if (char != '/' && char != '\\') continue;
          } else if (!stateOverride && char == '?') {
            url.query = '';
            state = QUERY;
          } else if (!stateOverride && char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (char != EOF) {
            state = PATH;
            if (char != '/') continue;
          }
          break;

        case PATH:
          if (
            char == EOF ||
            char == '/' ||
            (char == '\\' && isSpecial(url)) ||
            (!stateOverride && (char == '?' || char == '#'))
          ) {
            if (isDoubleDot(buffer)) {
              shortenURLsPath(url);
              if (char != '/' && !(char == '\\' && isSpecial(url))) {
                url.path.push('');
              }
            } else if (isSingleDot(buffer)) {
              if (char != '/' && !(char == '\\' && isSpecial(url))) {
                url.path.push('');
              }
            } else {
              if (
                url.scheme == 'file' &&
                !url.path.length &&
                isWindowsDriveLetter(buffer)
              ) {
                if (url.host) url.host = '';
                buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
              }
              url.path.push(buffer);
            }
            buffer = '';
            if (
              url.scheme == 'file' &&
              (char == EOF || char == '?' || char == '#')
            ) {
              while (url.path.length > 1 && url.path[0] === '') {
                url.path.shift();
              }
            }
            if (char == '?') {
              url.query = '';
              state = QUERY;
            } else if (char == '#') {
              url.fragment = '';
              state = FRAGMENT;
            }
          } else {
            buffer += percentEncode(char, pathPercentEncodeSet);
          }
          break;

        case CANNOT_BE_A_BASE_URL_PATH:
          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (char != EOF) {
            url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
          }
          break;

        case QUERY:
          if (!stateOverride && char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (char != EOF) {
            if (char == "'" && isSpecial(url)) url.query += '%27';
            else if (char == '#') url.query += '%23';
            else url.query += percentEncode(char, C0ControlPercentEncodeSet);
          }
          break;

        case FRAGMENT:
          if (char != EOF)
            url.fragment += percentEncode(char, fragmentPercentEncodeSet);
          break;
      }

      pointer++;
    }
  };

  // `URL` constructor
  // https://url.spec.whatwg.org/#url-class
  var URLConstructor = function URL(url /* , base */) {
    var that = anInstance(this, URLConstructor, 'URL');
    var base = arguments.length > 1 ? arguments[1] : undefined;
    var urlString = toString_1(url);
    var state = setInternalState$5(that, { type: 'URL' });
    var baseState, failure;
    if (base !== undefined) {
      if (base instanceof URLConstructor) baseState = getInternalURLState(base);
      else {
        failure = parseURL((baseState = {}), toString_1(base));
        if (failure) throw TypeError(failure);
      }
    }
    failure = parseURL(state, urlString, null, baseState);
    if (failure) throw TypeError(failure);
    var searchParams = (state.searchParams = new URLSearchParams$1());
    var searchParamsState = getInternalSearchParamsState(searchParams);
    searchParamsState.updateSearchParams(state.query);
    searchParamsState.updateURL = function () {
      state.query = String(searchParams) || null;
    };
    if (!descriptors) {
      that.href = serializeURL.call(that);
      that.origin = getOrigin.call(that);
      that.protocol = getProtocol.call(that);
      that.username = getUsername.call(that);
      that.password = getPassword.call(that);
      that.host = getHost.call(that);
      that.hostname = getHostname.call(that);
      that.port = getPort.call(that);
      that.pathname = getPathname.call(that);
      that.search = getSearch.call(that);
      that.searchParams = getSearchParams.call(that);
      that.hash = getHash.call(that);
    }
  };

  var URLPrototype = URLConstructor.prototype;

  var serializeURL = function () {
    var url = getInternalURLState(this);
    var scheme = url.scheme;
    var username = url.username;
    var password = url.password;
    var host = url.host;
    var port = url.port;
    var path = url.path;
    var query = url.query;
    var fragment = url.fragment;
    var output = scheme + ':';
    if (host !== null) {
      output += '//';
      if (includesCredentials(url)) {
        output += username + (password ? ':' + password : '') + '@';
      }
      output += serializeHost(host);
      if (port !== null) output += ':' + port;
    } else if (scheme == 'file') output += '//';
    output += url.cannotBeABaseURL
      ? path[0]
      : path.length
      ? '/' + path.join('/')
      : '';
    if (query !== null) output += '?' + query;
    if (fragment !== null) output += '#' + fragment;
    return output;
  };

  var getOrigin = function () {
    var url = getInternalURLState(this);
    var scheme = url.scheme;
    var port = url.port;
    if (scheme == 'blob')
      try {
        return new URLConstructor(scheme.path[0]).origin;
      } catch (error) {
        return 'null';
      }
    if (scheme == 'file' || !isSpecial(url)) return 'null';
    return (
      scheme +
      '://' +
      serializeHost(url.host) +
      (port !== null ? ':' + port : '')
    );
  };

  var getProtocol = function () {
    return getInternalURLState(this).scheme + ':';
  };

  var getUsername = function () {
    return getInternalURLState(this).username;
  };

  var getPassword = function () {
    return getInternalURLState(this).password;
  };

  var getHost = function () {
    var url = getInternalURLState(this);
    var host = url.host;
    var port = url.port;
    return host === null
      ? ''
      : port === null
      ? serializeHost(host)
      : serializeHost(host) + ':' + port;
  };

  var getHostname = function () {
    var host = getInternalURLState(this).host;
    return host === null ? '' : serializeHost(host);
  };

  var getPort = function () {
    var port = getInternalURLState(this).port;
    return port === null ? '' : String(port);
  };

  var getPathname = function () {
    var url = getInternalURLState(this);
    var path = url.path;
    return url.cannotBeABaseURL
      ? path[0]
      : path.length
      ? '/' + path.join('/')
      : '';
  };

  var getSearch = function () {
    var query = getInternalURLState(this).query;
    return query ? '?' + query : '';
  };

  var getSearchParams = function () {
    return getInternalURLState(this).searchParams;
  };

  var getHash = function () {
    var fragment = getInternalURLState(this).fragment;
    return fragment ? '#' + fragment : '';
  };

  var accessorDescriptor = function (getter, setter) {
    return { get: getter, set: setter, configurable: true, enumerable: true };
  };

  if (descriptors) {
    objectDefineProperties(URLPrototype, {
      // `URL.prototype.href` accessors pair
      // https://url.spec.whatwg.org/#dom-url-href
      href: accessorDescriptor(serializeURL, function (href) {
        var url = getInternalURLState(this);
        var urlString = toString_1(href);
        var failure = parseURL(url, urlString);
        if (failure) throw TypeError(failure);
        getInternalSearchParamsState(url.searchParams).updateSearchParams(
          url.query
        );
      }),
      // `URL.prototype.origin` getter
      // https://url.spec.whatwg.org/#dom-url-origin
      origin: accessorDescriptor(getOrigin),
      // `URL.prototype.protocol` accessors pair
      // https://url.spec.whatwg.org/#dom-url-protocol
      protocol: accessorDescriptor(getProtocol, function (protocol) {
        var url = getInternalURLState(this);
        parseURL(url, toString_1(protocol) + ':', SCHEME_START);
      }),
      // `URL.prototype.username` accessors pair
      // https://url.spec.whatwg.org/#dom-url-username
      username: accessorDescriptor(getUsername, function (username) {
        var url = getInternalURLState(this);
        var codePoints = arrayFrom(toString_1(username));
        if (cannotHaveUsernamePasswordPort(url)) return;
        url.username = '';
        for (var i = 0; i < codePoints.length; i++) {
          url.username += percentEncode(
            codePoints[i],
            userinfoPercentEncodeSet
          );
        }
      }),
      // `URL.prototype.password` accessors pair
      // https://url.spec.whatwg.org/#dom-url-password
      password: accessorDescriptor(getPassword, function (password) {
        var url = getInternalURLState(this);
        var codePoints = arrayFrom(toString_1(password));
        if (cannotHaveUsernamePasswordPort(url)) return;
        url.password = '';
        for (var i = 0; i < codePoints.length; i++) {
          url.password += percentEncode(
            codePoints[i],
            userinfoPercentEncodeSet
          );
        }
      }),
      // `URL.prototype.host` accessors pair
      // https://url.spec.whatwg.org/#dom-url-host
      host: accessorDescriptor(getHost, function (host) {
        var url = getInternalURLState(this);
        if (url.cannotBeABaseURL) return;
        parseURL(url, toString_1(host), HOST);
      }),
      // `URL.prototype.hostname` accessors pair
      // https://url.spec.whatwg.org/#dom-url-hostname
      hostname: accessorDescriptor(getHostname, function (hostname) {
        var url = getInternalURLState(this);
        if (url.cannotBeABaseURL) return;
        parseURL(url, toString_1(hostname), HOSTNAME);
      }),
      // `URL.prototype.port` accessors pair
      // https://url.spec.whatwg.org/#dom-url-port
      port: accessorDescriptor(getPort, function (port) {
        var url = getInternalURLState(this);
        if (cannotHaveUsernamePasswordPort(url)) return;
        port = toString_1(port);
        if (port == '') url.port = null;
        else parseURL(url, port, PORT);
      }),
      // `URL.prototype.pathname` accessors pair
      // https://url.spec.whatwg.org/#dom-url-pathname
      pathname: accessorDescriptor(getPathname, function (pathname) {
        var url = getInternalURLState(this);
        if (url.cannotBeABaseURL) return;
        url.path = [];
        parseURL(url, toString_1(pathname), PATH_START);
      }),
      // `URL.prototype.search` accessors pair
      // https://url.spec.whatwg.org/#dom-url-search
      search: accessorDescriptor(getSearch, function (search) {
        var url = getInternalURLState(this);
        search = toString_1(search);
        if (search == '') {
          url.query = null;
        } else {
          if ('?' == search.charAt(0)) search = search.slice(1);
          url.query = '';
          parseURL(url, search, QUERY);
        }
        getInternalSearchParamsState(url.searchParams).updateSearchParams(
          url.query
        );
      }),
      // `URL.prototype.searchParams` getter
      // https://url.spec.whatwg.org/#dom-url-searchparams
      searchParams: accessorDescriptor(getSearchParams),
      // `URL.prototype.hash` accessors pair
      // https://url.spec.whatwg.org/#dom-url-hash
      hash: accessorDescriptor(getHash, function (hash) {
        var url = getInternalURLState(this);
        hash = toString_1(hash);
        if (hash == '') {
          url.fragment = null;
          return;
        }
        if ('#' == hash.charAt(0)) hash = hash.slice(1);
        url.fragment = '';
        parseURL(url, hash, FRAGMENT);
      })
    });
  }

  // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson
  redefine(
    URLPrototype,
    'toJSON',
    function toJSON() {
      return serializeURL.call(this);
    },
    { enumerable: true }
  );

  // `URL.prototype.toString` method
  // https://url.spec.whatwg.org/#URL-stringification-behavior
  redefine(
    URLPrototype,
    'toString',
    function toString() {
      return serializeURL.call(this);
    },
    { enumerable: true }
  );

  if (NativeURL) {
    var nativeCreateObjectURL = NativeURL.createObjectURL;
    var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
    // `URL.createObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    if (nativeCreateObjectURL)
      redefine(
        URLConstructor,
        'createObjectURL',
        function createObjectURL(blob) {
          return nativeCreateObjectURL.apply(NativeURL, arguments);
        }
      );
    // `URL.revokeObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    if (nativeRevokeObjectURL)
      redefine(
        URLConstructor,
        'revokeObjectURL',
        function revokeObjectURL(url) {
          return nativeRevokeObjectURL.apply(NativeURL, arguments);
        }
      );
  }

  setToStringTag(URLConstructor, 'URL');

  _export(
    { global: true, forced: !nativeUrl, sham: !descriptors },
    {
      URL: URLConstructor
    }
  );

  var url = path.URL;

  var url$1 = url;

  var url$2 = url$1;

  // TODO: use something more complex like timsort?
  var floor$3 = Math.floor;

  var mergeSort = function (array, comparefn) {
    var length = array.length;
    var middle = floor$3(length / 2);
    return length < 8
      ? insertionSort(array, comparefn)
      : merge(
          mergeSort(array.slice(0, middle), comparefn),
          mergeSort(array.slice(middle), comparefn),
          comparefn
        );
  };

  var insertionSort = function (array, comparefn) {
    var length = array.length;
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    }
    return array;
  };

  var merge = function (left, right, comparefn) {
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;
    var result = [];

    while (lindex < llength || rindex < rlength) {
      if (lindex < llength && rindex < rlength) {
        result.push(
          comparefn(left[lindex], right[rindex]) <= 0
            ? left[lindex++]
            : right[rindex++]
        );
      } else {
        result.push(lindex < llength ? left[lindex++] : right[rindex++]);
      }
    }
    return result;
  };

  var arraySort = mergeSort;

  var firefox = engineUserAgent.match(/firefox\/(\d+)/i);

  var engineFfVersion = !!firefox && +firefox[1];

  var engineIsIeOrEdge = /MSIE|Trident/.test(engineUserAgent);

  var webkit = engineUserAgent.match(/AppleWebKit\/(\d+)\./);

  var engineWebkitVersion = !!webkit && +webkit[1];

  var test$1 = [];
  var nativeSort = test$1.sort;

  // IE8-
  var FAILS_ON_UNDEFINED = fails(function () {
    test$1.sort(undefined);
  });
  // V8 bug
  var FAILS_ON_NULL = fails(function () {
    test$1.sort(null);
  });
  // Old WebKit
  var STRICT_METHOD$4 = arrayMethodIsStrict('sort');

  var STABLE_SORT = !fails(function () {
    // feature detection can be too slow, so check engines versions
    if (engineV8Version) return engineV8Version < 70;
    if (engineFfVersion && engineFfVersion > 3) return;
    if (engineIsIeOrEdge) return true;
    if (engineWebkitVersion) return engineWebkitVersion < 603;

    var result = '';
    var code, chr, value, index;

    // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
    for (code = 65; code < 76; code++) {
      chr = String.fromCharCode(code);

      switch (code) {
        case 66:
        case 69:
        case 70:
        case 72:
          value = 3;
          break;
        case 68:
        case 71:
          value = 4;
          break;
        default:
          value = 2;
      }

      for (index = 0; index < 47; index++) {
        test$1.push({ k: chr + index, v: value });
      }
    }

    test$1.sort(function (a, b) {
      return b.v - a.v;
    });

    for (index = 0; index < test$1.length; index++) {
      chr = test$1[index].k.charAt(0);
      if (result.charAt(result.length - 1) !== chr) result += chr;
    }

    return result !== 'DGBEFHACIJK';
  });

  var FORCED$6 =
    FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$4 || !STABLE_SORT;

  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (y === undefined) return -1;
      if (x === undefined) return 1;
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      return toString_1(x) > toString_1(y) ? 1 : -1;
    };
  };

  // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort
  _export(
    { target: 'Array', proto: true, forced: FORCED$6 },
    {
      sort: function sort(comparefn) {
        if (comparefn !== undefined) aFunction$1(comparefn);

        var array = toObject(this);

        if (STABLE_SORT)
          return comparefn === undefined
            ? nativeSort.call(array)
            : nativeSort.call(array, comparefn);

        var items = [];
        var arrayLength = toLength(array.length);
        var itemsLength, index;

        for (index = 0; index < arrayLength; index++) {
          if (index in array) items.push(array[index]);
        }

        items = arraySort(items, getSortCompare(comparefn));
        itemsLength = items.length;
        index = 0;

        while (index < itemsLength) array[index] = items[index++];
        while (index < arrayLength) delete array[index++];

        return array;
      }
    }
  );

  var sort = entryVirtual('Array').sort;

  var ArrayPrototype$c = Array.prototype;

  var sort_1 = function (it) {
    var own = it.sort;
    return it === ArrayPrototype$c ||
      (it instanceof Array && own === ArrayPrototype$c.sort)
      ? sort
      : own;
  };

  var sort$1 = sort_1;

  var sort$2 = sort$1;

  var urlSearchParams = path.URLSearchParams;

  var urlSearchParams$1 = urlSearchParams;

  var urlSearchParams$2 = urlSearchParams$1;

  var trim$4 = stringTrim.trim;

  var $parseInt = global_1.parseInt;
  var hex = /^[+-]?0[Xx]/;
  var FORCED$7 =
    $parseInt(whitespaces + '08') !== 8 ||
    $parseInt(whitespaces + '0x16') !== 22;

  // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix
  var numberParseInt = FORCED$7
    ? function parseInt(string, radix) {
        var S = trim$4(toString_1(string));
        return $parseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
      }
    : $parseInt;

  // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix
  _export(
    { global: true, forced: parseInt != numberParseInt },
    {
      parseInt: numberParseInt
    }
  );

  var _parseInt = path.parseInt;

  var _parseInt$1 = _parseInt;

  var _parseInt$2 = _parseInt$1;

  var _context5;
  var commonjsGlobal$1 =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
      ? self
      : {};

  function unwrapExports$1(x) {
    return x &&
      x.__esModule &&
      Object.prototype.hasOwnProperty.call(x, 'default')
      ? x['default']
      : x;
  }

  function createCommonjsModule$1(fn, module) {
    return (
      (module = {
        exports: {}
      }),
      fn(module, module.exports),
      module.exports
    );
  }

  function getCjsExportFromNamespace(n) {
    return (n && n['default']) || n;
  }

  var check$1 = function check(it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028

  var global_1$1 = // eslint-disable-next-line es/no-global-this -- safe
    check$1(
      (typeof globalThis === 'undefined'
        ? 'undefined'
        : _typeof2(globalThis)) == 'object' && globalThis
    ) ||
    check$1(
      (typeof window === 'undefined' ? 'undefined' : _typeof2(window)) ==
        'object' && window
    ) || // eslint-disable-next-line no-restricted-globals -- safe
    check$1(
      (typeof self === 'undefined' ? 'undefined' : _typeof2(self)) ==
        'object' && self
    ) ||
    check$1(_typeof2(commonjsGlobal$1) == 'object' && commonjsGlobal$1) || // eslint-disable-next-line no-new-func -- fallback
    (function () {
      return this;
    })() ||
    Function('return this')();

  var fails$1 = function fails(exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  }; // Detect IE8's incomplete defineProperty implementation

  var descriptors$1 = !fails$1(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return (
      defineProperty$3({}, 1, {
        get: function get() {
          return 7;
        }
      })[1] != 7
    );
  });
  var $propertyIsEnumerable$2 = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var getOwnPropertyDescriptor$5 = getOwnPropertyDescriptor$3; // Nashorn ~ JDK8 bug

  var NASHORN_BUG$1 =
    getOwnPropertyDescriptor$5 &&
    !$propertyIsEnumerable$2.call(
      {
        1: 2
      },
      1
    ); // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

  var f$8 = NASHORN_BUG$1
    ? function propertyIsEnumerable(V) {
        var descriptor = getOwnPropertyDescriptor$5(this, V);
        return !!descriptor && descriptor.enumerable;
      }
    : $propertyIsEnumerable$2;
  var objectPropertyIsEnumerable$1 = {
    f: f$8
  };

  var createPropertyDescriptor$1 = function createPropertyDescriptor(
    bitmap,
    value
  ) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString$2 = {}.toString;

  var classofRaw$1 = function classofRaw(it) {
    var _context4;

    return slice$4((_context4 = toString$2.call(it))).call(_context4, 8, -1);
  };

  var split$1 = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

  var indexedObject$1 = fails$1(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  })
    ? function (it) {
        return classofRaw$1(it) == 'String' ? split$1.call(it, '') : Object(it);
      }
    : Object; // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible

  var requireObjectCoercible$1 = function requireObjectCoercible(it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  }; // toObject with fallback for non-array-like ES3 strings

  var toIndexedObject$1 = function toIndexedObject(it) {
    return indexedObject$1(requireObjectCoercible$1(it));
  };

  var isObject$1 = function isObject(it) {
    return _typeof2(it) === 'object' ? it !== null : typeof it === 'function';
  };

  var path$1 = {};

  var aFunction$2 = function aFunction(variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn$1 = function getBuiltIn(namespace, method) {
    return arguments.length < 2
      ? aFunction$2(path$1[namespace]) || aFunction$2(global_1$1[namespace])
      : (path$1[namespace] && path$1[namespace][method]) ||
          (global_1$1[namespace] && global_1$1[namespace][method]);
  };

  var engineUserAgent$1 = getBuiltIn$1('navigator', 'userAgent') || '';
  var process$4 = global_1$1.process;
  var Deno$1 = global_1$1.Deno;
  var versions$1 =
    (process$4 && process$4.versions) || (Deno$1 && Deno$1.version);
  var v8$1 = versions$1 && versions$1.v8;
  var match$1, version$1;

  if (v8$1) {
    match$1 = v8$1.split('.');
    version$1 = match$1[0] < 4 ? 1 : match$1[0] + match$1[1];
  } else if (engineUserAgent$1) {
    match$1 = engineUserAgent$1.match(/Edge\/(\d+)/);

    if (!match$1 || match$1[1] >= 74) {
      match$1 = engineUserAgent$1.match(/Chrome\/(\d+)/);
      if (match$1) version$1 = match$1[1];
    }
  }

  var engineV8Version$1 = version$1 && +version$1;
  /* eslint-disable es/no-symbol -- required for testing */
  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

  var nativeSymbol$1 =
    !!getOwnPropertySymbols$2 &&
    !fails$1(function () {
      var symbol = symbol$4(); // Chrome 38 Symbol has incorrect toString conversion
      // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

      return (
        !String(symbol) ||
        !(Object(symbol) instanceof symbol$4) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        (!symbol$4.sham && engineV8Version$1 && engineV8Version$1 < 41)
      );
    });
  /* eslint-disable es/no-symbol -- required for testing */

  var useSymbolAsUid$1 =
    nativeSymbol$1 && !symbol$4.sham && _typeof2(iterator$4) == 'symbol';
  var isSymbol$1 = useSymbolAsUid$1
    ? function (it) {
        return _typeof2(it) == 'symbol';
      }
    : function (it) {
        var $Symbol = getBuiltIn$1('Symbol');
        return typeof $Symbol == 'function' && Object(it) instanceof $Symbol;
      }; // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive

  var ordinaryToPrimitive$1 = function ordinaryToPrimitive(input, pref) {
    var fn, val;
    if (
      pref === 'string' &&
      typeof (fn = input.toString) == 'function' &&
      !isObject$1((val = fn.call(input)))
    )
      return val;
    if (
      typeof (fn = input.valueOf) == 'function' &&
      !isObject$1((val = fn.call(input)))
    )
      return val;
    if (
      pref !== 'string' &&
      typeof (fn = input.toString) == 'function' &&
      !isObject$1((val = fn.call(input)))
    )
      return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var isPure$1 = true;

  var setGlobal$1 = function setGlobal(key, value) {
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      defineProperty$3(global_1$1, key, {
        value: value,
        configurable: true,
        writable: true
      });
    } catch (error) {
      global_1$1[key] = value;
    }

    return value;
  };

  var SHARED$1 = '__core-js_shared__';
  var store$2 = global_1$1[SHARED$1] || setGlobal$1(SHARED$1, {});
  var sharedStore$1 = store$2;
  var shared$1 = createCommonjsModule$1(function (module) {
    (module.exports = function (key, value) {
      return (
        sharedStore$1[key] ||
        (sharedStore$1[key] = value !== undefined ? value : {})
      );
    })('versions', []).push({
      version: '3.16.3',
      mode: 'pure',
      copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
    });
  }); // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject

  var toObject$1 = function toObject(argument) {
    return Object(requireObjectCoercible$1(argument));
  };

  var hasOwnProperty$1 = {}.hasOwnProperty;

  var has$2 =
    Object.hasOwn ||
    function hasOwn(it, key) {
      return hasOwnProperty$1.call(toObject$1(it), key);
    };

  var id$1 = 0;
  var postfix$1 = Math.random();

  var uid$1 = function uid(key) {
    return (
      'Symbol(' +
      String(key === undefined ? '' : key) +
      ')_' +
      (++id$1 + postfix$1).toString(36)
    );
  };

  var WellKnownSymbolsStore$2 = shared$1('wks');
  var Symbol$1$1 = global_1$1.Symbol;
  var createWellKnownSymbol$1 = useSymbolAsUid$1
    ? Symbol$1$1
    : (Symbol$1$1 && Symbol$1$1.withoutSetter) || uid$1;

  var wellKnownSymbol$1 = function wellKnownSymbol(name) {
    if (
      !has$2(WellKnownSymbolsStore$2, name) ||
      !(nativeSymbol$1 || typeof WellKnownSymbolsStore$2[name] == 'string')
    ) {
      if (nativeSymbol$1 && has$2(Symbol$1$1, name)) {
        WellKnownSymbolsStore$2[name] = Symbol$1$1[name];
      } else {
        WellKnownSymbolsStore$2[name] = createWellKnownSymbol$1(
          'Symbol.' + name
        );
      }
    }

    return WellKnownSymbolsStore$2[name];
  };

  var TO_PRIMITIVE$2 = wellKnownSymbol$1('toPrimitive'); // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive

  var toPrimitive$1 = function toPrimitive(input, pref) {
    if (!isObject$1(input) || isSymbol$1(input)) return input;
    var exoticToPrim = input[TO_PRIMITIVE$2];
    var result;

    if (exoticToPrim !== undefined) {
      if (pref === undefined) pref = 'default';
      result = exoticToPrim.call(input, pref);
      if (!isObject$1(result) || isSymbol$1(result)) return result;
      throw TypeError("Can't convert object to primitive value");
    }

    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive$1(input, pref);
  }; // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey

  var toPropertyKey$1 = function toPropertyKey(argument) {
    var key = toPrimitive$1(argument, 'string');
    return isSymbol$1(key) ? key : String(key);
  };

  var document$1$1 = global_1$1.document; // typeof document.createElement is 'object' in old IE

  var EXISTS$1 =
    isObject$1(document$1$1) && isObject$1(document$1$1.createElement);

  var documentCreateElement$1 = function documentCreateElement(it) {
    return EXISTS$1 ? document$1$1.createElement(it) : {};
  }; // Thank's IE8 for his funny defineProperty

  var ie8DomDefine$1 =
    !descriptors$1 &&
    !fails$1(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
      return (
        defineProperty$3(documentCreateElement$1('div'), 'a', {
          get: function get() {
            return 7;
          }
        }).a != 7
      );
    }); // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var $getOwnPropertyDescriptor$2 = getOwnPropertyDescriptor$3; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

  var f$1$1 = descriptors$1
    ? $getOwnPropertyDescriptor$2
    : function getOwnPropertyDescriptor(O, P) {
        O = toIndexedObject$1(O);
        P = toPropertyKey$1(P);
        if (ie8DomDefine$1)
          try {
            return $getOwnPropertyDescriptor$2(O, P);
          } catch (error) {
            /* empty */
          }
        if (has$2(O, P))
          return createPropertyDescriptor$1(
            !objectPropertyIsEnumerable$1.f.call(O, P),
            O[P]
          );
      };
  var objectGetOwnPropertyDescriptor$1 = {
    f: f$1$1
  };
  var replacement$1 = /#|\.prototype\./;

  var isForced$1 = function isForced(feature, detection) {
    var value = data$1[normalize$1(feature)];
    return value == POLYFILL$1
      ? true
      : value == NATIVE$1
      ? false
      : typeof detection == 'function'
      ? fails$1(detection)
      : !!detection;
  };

  var normalize$1 = (isForced$1.normalize = function (string) {
    return String(string).replace(replacement$1, '.').toLowerCase();
  });

  var data$1 = (isForced$1.data = {});
  var NATIVE$1 = (isForced$1.NATIVE = 'N');
  var POLYFILL$1 = (isForced$1.POLYFILL = 'P');
  var isForced_1$1 = isForced$1;

  var aFunction$1$1 = function aFunction$1(it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    }

    return it;
  }; // optional / simple context binding

  var functionBindContext$1 = function functionBindContext(fn, that, length) {
    aFunction$1$1(fn);
    if (that === undefined) return fn;

    switch (length) {
      case 0:
        return function () {
          return fn.call(that);
        };

      case 1:
        return function (a) {
          return fn.call(that, a);
        };

      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };

      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }

    return function () {
      return fn.apply(that, arguments);
    };
  };

  var anObject$1 = function anObject(it) {
    if (!isObject$1(it)) {
      throw TypeError(String(it) + ' is not an object');
    }

    return it;
  }; // eslint-disable-next-line es/no-object-defineproperty -- safe

  var $defineProperty$2 = defineProperty$3; // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty

  var f$2$1 = descriptors$1
    ? $defineProperty$2
    : function defineProperty(O, P, Attributes) {
        anObject$1(O);
        P = toPropertyKey$1(P);
        anObject$1(Attributes);
        if (ie8DomDefine$1)
          try {
            return $defineProperty$2(O, P, Attributes);
          } catch (error) {
            /* empty */
          }
        if ('get' in Attributes || 'set' in Attributes)
          throw TypeError('Accessors not supported');
        if ('value' in Attributes) O[P] = Attributes.value;
        return O;
      };
  var objectDefineProperty$1 = {
    f: f$2$1
  };
  var createNonEnumerableProperty$1 = descriptors$1
    ? function (object, key, value) {
        return objectDefineProperty$1.f(
          object,
          key,
          createPropertyDescriptor$1(1, value)
        );
      }
    : function (object, key, value) {
        object[key] = value;
        return object;
      };
  var getOwnPropertyDescriptor$1$1 = objectGetOwnPropertyDescriptor$1.f;

  var wrapConstructor$1 = function wrapConstructor(NativeConstructor) {
    var Wrapper = function Wrapper(a, b, c) {
      if (this instanceof NativeConstructor) {
        switch (arguments.length) {
          case 0:
            return new NativeConstructor();

          case 1:
            return new NativeConstructor(a);

          case 2:
            return new NativeConstructor(a, b);
        }

        return new NativeConstructor(a, b, c);
      }

      return NativeConstructor.apply(this, arguments);
    };

    Wrapper.prototype = NativeConstructor.prototype;
    return Wrapper;
  };
  /*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/

  var _export$1 = function _export(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var PROTO = options.proto;
    var nativeSource = GLOBAL
      ? global_1$1
      : STATIC
      ? global_1$1[TARGET]
      : (global_1$1[TARGET] || {}).prototype;
    var target = GLOBAL
      ? path$1
      : path$1[TARGET] ||
        createNonEnumerableProperty$1(path$1, TARGET, {})[TARGET];
    var targetPrototype = target.prototype;
    var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
    var key,
      sourceProperty,
      targetProperty,
      nativeProperty,
      resultProperty,
      descriptor;

    for (key in source) {
      FORCED = isForced_1$1(
        GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key,
        options.forced
      ); // contains in native

      USE_NATIVE = !FORCED && nativeSource && has$2(nativeSource, key);
      targetProperty = target[key];
      if (USE_NATIVE)
        if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor$1$1(nativeSource, key);
          nativeProperty = descriptor && descriptor.value;
        } else nativeProperty = nativeSource[key]; // export native or implementation

      sourceProperty =
        USE_NATIVE && nativeProperty ? nativeProperty : source[key];
      if (USE_NATIVE && _typeof2(targetProperty) === _typeof2(sourceProperty))
        continue; // bind timers to global for call from export context

      if (bind$3(options) && USE_NATIVE)
        resultProperty = functionBindContext$1(sourceProperty, global_1$1);
      // wrap global constructors for prevent changs in this version
      else if (options.wrap && USE_NATIVE)
        resultProperty = wrapConstructor$1(sourceProperty);
      // make static versions for prototype methods
      else if (PROTO && typeof sourceProperty == 'function')
        resultProperty = functionBindContext$1(Function.call, sourceProperty);
      // default case
      else resultProperty = sourceProperty; // add a flag to not completely full polyfills

      if (
        options.sham ||
        (sourceProperty && sourceProperty.sham) ||
        (targetProperty && targetProperty.sham)
      ) {
        createNonEnumerableProperty$1(resultProperty, 'sham', true);
      }

      createNonEnumerableProperty$1(target, key, resultProperty);

      if (PROTO) {
        VIRTUAL_PROTOTYPE = TARGET + 'Prototype';

        if (!has$2(path$1, VIRTUAL_PROTOTYPE)) {
          createNonEnumerableProperty$1(path$1, VIRTUAL_PROTOTYPE, {});
        } // export virtual prototype methods

        createNonEnumerableProperty$1(
          path$1[VIRTUAL_PROTOTYPE],
          key,
          sourceProperty
        ); // export real prototype methods

        if (options.real && targetPrototype && !targetPrototype[key]) {
          createNonEnumerableProperty$1(targetPrototype, key, sourceProperty);
        }
      }
    }
  };

  var ceil$1 = Math.ceil;
  var floor$4 = Math.floor; // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger

  var toInteger$1 = function toInteger(argument) {
    return isNaN((argument = +argument))
      ? 0
      : (argument > 0 ? floor$4 : ceil$1)(argument);
  };

  var max$3 = Math.max;
  var min$4 = Math.min; // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

  var toAbsoluteIndex$1 = function toAbsoluteIndex(index, length) {
    var integer = toInteger$1(index);
    return integer < 0 ? max$3(integer + length, 0) : min$4(integer, length);
  };

  var min$1$1 = Math.min; // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength

  var toLength$1 = function toLength(argument) {
    return argument > 0 ? min$1$1(toInteger$1(argument), 0x1fffffffffffff) : 0; // 2 ** 53 - 1 == 9007199254740991
  }; // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe

  var isArray$4 =
    isArray$3 ||
    function isArray(arg) {
      return classofRaw$1(arg) == 'Array';
    };

  var SPECIES$6 = wellKnownSymbol$1('species'); // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesConstructor$1 = function arraySpeciesConstructor(
    originalArray
  ) {
    var C;

    if (isArray$4(originalArray)) {
      C = originalArray.constructor; // cross-realm fallback

      if (typeof C == 'function' && (C === Array || isArray$4(C.prototype)))
        C = undefined;
      else if (isObject$1(C)) {
        C = C[SPECIES$6];
        if (C === null) C = undefined;
      }
    }

    return C === undefined ? Array : C;
  }; // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesCreate$1 = function arraySpeciesCreate(
    originalArray,
    length
  ) {
    return new (arraySpeciesConstructor$1(originalArray))(
      length === 0 ? 0 : length
    );
  };

  var createProperty$1 = function createProperty(object, key, value) {
    var propertyKey = toPropertyKey$1(key);
    if (propertyKey in object)
      objectDefineProperty$1.f(
        object,
        propertyKey,
        createPropertyDescriptor$1(0, value)
      );
    else object[propertyKey] = value;
  };

  var SPECIES$1$1 = wellKnownSymbol$1('species');

  var arrayMethodHasSpeciesSupport$1 = function arrayMethodHasSpeciesSupport(
    METHOD_NAME
  ) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return (
      engineV8Version$1 >= 51 ||
      !fails$1(function () {
        var array = [];
        var constructor = (array.constructor = {});

        constructor[SPECIES$1$1] = function () {
          return {
            foo: 1
          };
        };

        return array[METHOD_NAME](Boolean).foo !== 1;
      })
    );
  };

  var HAS_SPECIES_SUPPORT$4 = arrayMethodHasSpeciesSupport$1('splice');
  var max$1$1 = Math.max;
  var min$2$1 = Math.min;
  var MAX_SAFE_INTEGER$2 = 0x1fffffffffffff;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED$1 = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species

  _export$1(
    {
      target: 'Array',
      proto: true,
      forced: !HAS_SPECIES_SUPPORT$4
    },
    {
      splice: function splice(
        start,
        deleteCount
        /* , ...items */
      ) {
        var O = toObject$1(this);
        var len = toLength$1(O.length);
        var actualStart = toAbsoluteIndex$1(start, len);
        var argumentsLength = arguments.length;
        var insertCount, actualDeleteCount, A, k, from, to;

        if (argumentsLength === 0) {
          insertCount = actualDeleteCount = 0;
        } else if (argumentsLength === 1) {
          insertCount = 0;
          actualDeleteCount = len - actualStart;
        } else {
          insertCount = argumentsLength - 2;
          actualDeleteCount = min$2$1(
            max$1$1(toInteger$1(deleteCount), 0),
            len - actualStart
          );
        }

        if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$2) {
          throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED$1);
        }

        A = arraySpeciesCreate$1(O, actualDeleteCount);

        for (k = 0; k < actualDeleteCount; k++) {
          from = actualStart + k;
          if (from in O) createProperty$1(A, k, O[from]);
        }

        A.length = actualDeleteCount;

        if (insertCount < actualDeleteCount) {
          for (k = actualStart; k < len - actualDeleteCount; k++) {
            from = k + actualDeleteCount;
            to = k + insertCount;
            if (from in O) O[to] = O[from];
            else delete O[to];
          }

          for (k = len; k > len - actualDeleteCount + insertCount; k--) {
            delete O[k - 1];
          }
        } else if (insertCount > actualDeleteCount) {
          for (k = len - actualDeleteCount; k > actualStart; k--) {
            from = k + actualDeleteCount - 1;
            to = k + insertCount - 1;
            if (from in O) O[to] = O[from];
            else delete O[to];
          }
        }

        for (k = 0; k < insertCount; k++) {
          O[k + actualStart] = arguments[k + 2];
        }

        O.length = len - actualDeleteCount + insertCount;
        return A;
      }
    }
  );

  var entryVirtual$1 = function entryVirtual(CONSTRUCTOR) {
    return path$1[CONSTRUCTOR + 'Prototype'];
  };

  var splice$3 = splice$2(entryVirtual$1('Array'));

  var ArrayPrototype$d = Array.prototype;

  var splice_1$1 = function splice_1(it) {
    var own = splice$2(it);

    return it === ArrayPrototype$d ||
      (it instanceof Array && own === splice$2(ArrayPrototype$d))
      ? splice$3
      : own;
  };

  var splice$1$1 = splice_1$1;
  var splice$2$1 = splice$1$1;

  var slice$5 = slice$4([]);

  var MSIE$1 = /MSIE .\./.test(engineUserAgent$1); // <- dirty ie9- check

  var wrap$2 = function wrap(scheduler) {
    return function (
      handler,
      timeout
      /* , ...arguments */
    ) {
      var boundArgs = arguments.length > 2;
      var args = boundArgs ? slice$5.call(arguments, 2) : undefined;
      return scheduler(
        boundArgs
          ? function () {
              // eslint-disable-next-line no-new-func -- spec requirement
              (typeof handler == 'function'
                ? handler
                : Function(handler)
              ).apply(this, args);
            }
          : handler,
        timeout
      );
    };
  }; // ie9- setTimeout & setInterval additional parameters fix
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers

  _export$1(
    {
      global: true,
      bind: true,
      forced: MSIE$1
    },
    {
      // `setTimeout` method
      // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
      setTimeout: wrap$2(global_1$1.setTimeout),
      // `setInterval` method
      // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
      setInterval: wrap$2(global_1$1.setInterval)
    }
  );

  var setTimeout$3 = path$1.setTimeout;
  var setTimeout$1$1 = setTimeout$3; // `Array.prototype.{ indexOf, includes }` methods implementation

  var createMethod$5 = function createMethod(IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$1($this);
      var length = toLength$1(O.length);
      var index = toAbsoluteIndex$1(fromIndex, length);
      var value; // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check

      if (IS_INCLUDES && el != el)
        while (length > index) {
          value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

          if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
        }
      else
        for (; length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el)
            return IS_INCLUDES || index || 0;
        }
      return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes$1 = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$5(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$5(false)
  };

  var arrayMethodIsStrict$1 = function arrayMethodIsStrict(
    METHOD_NAME,
    argument
  ) {
    var method = [][METHOD_NAME];
    return (
      !!method &&
      fails$1(function () {
        // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
        method.call(
          null,
          argument ||
            function () {
              throw 1;
            },
          1
        );
      })
    );
  };
  /* eslint-disable es/no-array-prototype-indexof -- required for testing */

  var $indexOf$1 = indexOf$3(arrayIncludes$1);

  var nativeIndexOf$1 = indexOf$3([]);

  var NEGATIVE_ZERO$1 =
    !!nativeIndexOf$1 &&
    1 / indexOf$3((_context5 = [1])).call(_context5, 1, -0) < 0;
  var STRICT_METHOD$5 = arrayMethodIsStrict$1('indexOf'); // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof

  _export$1(
    {
      target: 'Array',
      proto: true,
      forced: NEGATIVE_ZERO$1 || !STRICT_METHOD$5
    },
    {
      indexOf: function indexOf(
        searchElement
        /* , fromIndex = 0 */
      ) {
        return NEGATIVE_ZERO$1 // convert -0 to +0
          ? nativeIndexOf$1.apply(this, arguments) || 0
          : $indexOf$1(
              this,
              searchElement,
              arguments.length > 1 ? arguments[1] : undefined
            );
      }
    }
  );

  var indexOf$4 = indexOf$3(entryVirtual$1('Array'));

  var ArrayPrototype$1$1 = Array.prototype;

  var indexOf_1$1 = function indexOf_1(it) {
    var own = indexOf$3(it);

    return it === ArrayPrototype$1$1 ||
      (it instanceof Array && own === indexOf$3(ArrayPrototype$1$1))
      ? indexOf$4
      : own;
  };

  var indexOf$1$1 = indexOf_1$1;
  var indexOf$2$1 = indexOf$1$1;
  var Play = '播放';
  var Pause = '暂停';
  var Duration = '时长';
  var LIVE = '直播';
  var Loaded = '加载完成';
  var Progress = '进度';
  var Fullscreen = '全屏';
  var Mute = '静音';
  var Unmute = '取消静音';
  var Subtitles = '字幕';
  var Captions = '内嵌字幕';
  var Chapters = '节目段落';
  var Descriptions = '描述';
  var Close = '关闭';
  var Replay = '重新播放';
  var Text = '文字';
  var White = '白';
  var Black = '黑';
  var Red = '红';
  var Green = '绿';
  var Blue = '蓝';
  var Yellow = '黄';
  var Magenta = '紫红';
  var Cyan = '青';
  var Background = '背景';
  var Window = '窗口';
  var Transparent = '透明';
  var Opaque = '不透明';
  var None = '无';
  var Raised = '浮雕';
  var Depressed = '压低';
  var Uniform = '均匀';
  var Dropshadow = '下阴影';
  var Casual = '舒适';
  var Script = '手写体';
  var Reset = '重置';
  var Done = '完成';
  var Snap = '截屏';
  var Record = '录制';
  var lang = {
    Play: Play,
    Pause: Pause,
    'Current Time': '当前时间',
    Duration: Duration,
    'Remaining Time': '剩余时间',
    'Stream Type': '媒体流类型',
    LIVE: LIVE,
    Loaded: Loaded,
    Progress: Progress,
    Fullscreen: Fullscreen,
    'Picture-in-Picture': '画中画',
    'Exit Picture-in-Picture': '退出画中画',
    'Non-Fullscreen': '退出全屏',
    Mute: Mute,
    Unmute: Unmute,
    'Playback Rate': '播放速度',
    Subtitles: Subtitles,
    'subtitles off': '关闭字幕',
    Captions: Captions,
    'captions off': '关闭内嵌字幕',
    Chapters: Chapters,
    'Close Modal Dialog': '关闭弹窗',
    Descriptions: Descriptions,
    'descriptions off': '关闭描述',
    'Audio Track': '音轨',
    'You aborted the media playback': '视频播放被终止',
    'A network error caused the media download to fail part-way.':
      '网络错误导致视频下载中途失败。',
    'The media could not be loaded, either because the server or network failed or because the format is not supported.':
      '视频因格式不支持或者服务器或网络的问题无法加载。',
    'The media playback was aborted due to a corruption problem or because the media used features your browser did not support.':
      '由于视频文件损坏或是该视频使用了你的浏览器不支持的功能，播放终止。',
    'No compatible source was found for this media.':
      '无法找到此视频兼容的源。',
    'The media is encrypted and we do not have the keys to decrypt it.':
      '视频已加密，无法解密。',
    'Play Video': '播放视频',
    Close: Close,
    'Modal Window': '弹窗',
    'This is a modal window': '这是一个弹窗',
    'This modal can be closed by pressing the Escape key or activating the close button.':
      '可以按ESC按键或启用关闭按钮来关闭此弹窗。',
    ', opens captions settings dialog': ', 开启标题设置弹窗',
    ', opens subtitles settings dialog': ', 开启字幕设置弹窗',
    ', opens descriptions settings dialog': ', 开启描述设置弹窗',
    ', selected': ', 选择',
    'captions settings': '字幕设定',
    'Audio Player': '音频播放器',
    'Video Player': '视频播放器',
    Replay: Replay,
    'Progress Bar': '进度条',
    'Volume Level': '音量',
    'subtitles settings': '字幕设定',
    'descriptions settings': '描述设定',
    Text: Text,
    White: White,
    Black: Black,
    Red: Red,
    Green: Green,
    Blue: Blue,
    Yellow: Yellow,
    Magenta: Magenta,
    Cyan: Cyan,
    Background: Background,
    Window: Window,
    Transparent: Transparent,
    'Semi-Transparent': '半透明',
    Opaque: Opaque,
    'Font Size': '字体尺寸',
    'Text Edge Style': '字体边缘样式',
    None: None,
    Raised: Raised,
    Depressed: Depressed,
    Uniform: Uniform,
    Dropshadow: Dropshadow,
    'Font Family': '字体库',
    'Proportional Sans-Serif': '比例无细体',
    'Monospace Sans-Serif': '单间隔无细体',
    'Proportional Serif': '比例细体',
    'Monospace Serif': '单间隔细体',
    Casual: Casual,
    Script: Script,
    'Small Caps': '小型大写字体',
    Reset: Reset,
    'restore all settings to the default values': '恢复全部设定至预设值',
    Done: Done,
    'Caption Settings Dialog': '字幕设定窗口',
    'Beginning of dialog window. Escape will cancel and close the window.':
      '打开对话窗口。Escape键将取消并关闭对话窗口',
    'End of dialog window.': '结束对话窗口',
    'Seek to live, currently behind live': '尝试直播，当前为延时播放',
    'Seek to live, currently playing live': '尝试直播，当前为实时播放',
    'progress bar timing: currentTime={1} duration={2}': '{1}/{2}',
    '{1} is loading.': '正在加载 {1}。',
    Snap: Snap,
    Record: Record,
    'Non-Record': '停止录制'
  };

  function initMixin(YunliVjsPlayer) {
    YunliVjsPlayer.prototype._init = function (el, options, readyCallback) {
      //videojs对象
      if (!videojs) {
        throw new Error('本组件依赖videojs库，请先引入。');
      }

      if (
        options.yunliMode === 'history' &&
        !options.duration &&
        options.beginTime &&
        options.endTime
      ) {
        var beginTime = new Date(options.beginTime).getTime();
        var endTime = new Date(options.endTime).getTime();
        console.log('beginTime', beginTime, endTime);

        if (isNaN(beginTime) || isNaN(endTime)) {
          throw new Error('beginTime或者endTime格式错误');
        } else {
          options.duration = Math.floor((endTime - beginTime) / 1000);

          if (isNaN(options.duration) || options.duration < 0) {
            throw new Error('beginTime或者endTime格式错误');
          }
        }
      }

      this.options_ = options || {};
      this.el_ = el;
      this.readyCallback_ = readyCallback; //重试次数

      this.retryTime = 0; //最多重试次数

      this.maxRetryTime = options.maxRetryTime || 3; //是否自动重试

      this.autoRetry =
        options.autoRety !== undefined ? options.autoRetry : true; //加载中重试前等待时间

      this.waitingInterval = options.waitingInterval || 5000;
      this.waitingTimer = null;
      this._keepAliveTimer = null;
      this._keepAliveInterval = options.keepAliveInterval || 15000; //心跳保活默认开启

      this.keepAlive = options.keepAlive || true; //是否播放状态

      this.isPlaying = false; //处理源的格式

      if (this.options_.sources) {
        this.options_.sources = this._parseSource(this.options_.sources);
      }

      this.setEnv();
      this.setOptions(options); //实例化videojs播放器

      this.initPlayer(readyCallback);
      return this.player_;
    };

    YunliVjsPlayer.prototype.setEnv = function () {
      var _this = this; // 添加语言

      this.addLang();

      this._addSnapButton(); //添加录制功能

      if (this.options_.record) {
        this._addRecordButton();
      }

      var onLineHandler = function onLineHandler(e) {
        console.log(e, "you're online");

        if (_this.player_) {
          _this.player_.error(null);

          _this.src(_this.options_.sources);

          _this.player_.play();
        }
      };

      var offLineHandler = function offLineHandler(e) {
        console.log(e, "you're offline");

        if (_this.player_) {
          _this.errorHandler('offline');
        }
      };

      window.addEventListener('online', onLineHandler);
      window.addEventListener('offline', offLineHandler);

      if (!navigator.onLine) {
        offLineHandler(null);
      }
    };

    YunliVjsPlayer.prototype.addLang = function () {
      // 添加语言
      videojs.addLanguage('zh-CN', lang);
    };

    YunliVjsPlayer.prototype.setOptions = function () {
      var opt =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var controlBarList = [
        'playToggle',
        'currentTimeDisplay',
        'timeDivider',
        'durationDisplay',
        'progressControl',
        'liveDisplay',
        'seekToLive',
        'customControlSpacer',
        'recordButton',
        'snapButton',
        'playbackRateMenuButton',
        'chaptersButton',
        'descriptionsButton',
        'volumePanel',
        'subsCapsButton',
        'audioTrackButton',
        'fullscreenToggle'
      ]; // 是否支持画中画模式

      if ('exitPictureInPicture' in document) {
        splice$2$1(controlBarList).call(
          controlBarList,
          controlBarList.length - 1,
          0,
          'pictureInPictureToggle'
        );
      }

      var options = {
        language: 'zh-CN',
        controls: true,
        autoplay: false,
        techOrder: ['html5', 'flvjs', 'flash'],
        record: false,
        snap: {
          autoSave: true
        },
        controlBar: {
          children: controlBarList,
          volumePanel: {
            inline: false,
            vertical: true
          }
        },
        flash: {
          swf: './lib/video-js.swf'
        }
      }; //直播

      if (opt.yunliMode === 'live') {
        splice$2$1(controlBarList).call(controlBarList, 4, 1);
        options.controlBar.timeDivider = false;
        options.controlBar.durationDisplay = false;
      } else {
        options.playbackRates = ['0.25', '0.5', '1', '2', '4', '8', '16'];
      }

      options = videojs.mergeOptions(options, opt);
      this.options_ = options;
      return options;
    };

    YunliVjsPlayer.prototype.initPlayer = function () {
      var this_ = this;
      this.player_ = videojs(this.el_, this.options_, function (p) {
        this_.replaceEvents();
        this_.replaceSpinner();
        console.log('ccccccfill', this_.options_, this_.player_);

        if (this_.options_.fillScreen && this_.player_ && this_.player_.el_) {
          console.log('ccccccfill');
          this_.player_.el_.querySelector('video').style.objectFit = 'fill';
        }

        if (this_.options_.yunliMode === 'history' && this_.options_.duration) {
          this_.replaceControlBarEvent();
        } // player reader callback

        if (
          this_.readyCallback_ &&
          typeof this_.readyCallback_ === 'function'
        ) {
          this_.readyCallback_(p);
        }

        if (
          (this_.options_.yunliMode === 'live' ||
            this_.options_.yunliMode === 'history') &&
          this_.keepAlive
        ) {
          this_._keepAlive();
        }
      });
      this.player_.on('error', function (err) {
        var _context;

        var error = this_.player_.error();
        console.log('on error', error);
        setTimeout$1$1(function () {
          var _this_$player_, _this_$player_$el_, _this_$player_$el_$cl;

          (_this_$player_ = this_.player_) === null || _this_$player_ === void 0
            ? void 0
            : (_this_$player_$el_ = _this_$player_.el_) === null ||
              _this_$player_$el_ === void 0
            ? void 0
            : (_this_$player_$el_$cl = _this_$player_$el_.classList) === null ||
              _this_$player_$el_$cl === void 0
            ? void 0
            : _this_$player_$el_$cl.remove('vjs-loading-data');
        }, 100);

        if (
          error &&
          indexOf$2$1(
            (_context = [
              'timeout',
              'offline',
              'notfound',
              'shutdown',
              'neterror'
            ])
          ).call(_context, error.message) > -1
        ) {
          //if(this_.onError && typeof this_.onError === 'function'){
          this_.onError.call(this_, error); //}

          return;
        }

        if (!navigator.onLine) {
          this_.errorHandler('offline');
          return;
        }

        if (error && error.code === 4) {
          this_.errorHandler('notfound');
        } else if (error && error.code) {
          this_.errorHandler('shutdown');
        }
      });
      return this.player_;
    };
  }

  var hiddenKeys$2 = {};

  var indexOf$3$1 = indexOf$3(arrayIncludes$1);

  var objectKeysInternal$1 = function objectKeysInternal(object, names) {
    var O = toIndexedObject$1(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) {
      !has$2(hiddenKeys$2, key) && has$2(O, key) && result.push(key);
    } // Don't enum bug & hidden keys

    while (names.length > i) {
      if (has$2(O, (key = names[i++]))) {
        ~indexOf$3$1(result, key) || result.push(key);
      }
    }

    return result;
  }; // IE8- don't enum bug keys

  var enumBugKeys$1 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ]; // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe

  var objectKeys$1 =
    keys$3 ||
    function keys(O) {
      return objectKeysInternal$1(O, enumBugKeys$1);
    }; // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe

  var f$3$1 = getOwnPropertySymbols$2;
  var objectGetOwnPropertySymbols$1 = {
    f: f$3$1
  }; // eslint-disable-next-line es/no-object-assign -- safe

  var $assign$1 = assign$4; // eslint-disable-next-line es/no-object-defineproperty -- required for testing

  var defineProperty$8 = defineProperty$3; // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign

  var objectAssign$1 =
    !$assign$1 ||
    fails$1(function () {
      var _context6;

      // should have correct order of operations (Edge bug)
      if (
        descriptors$1 &&
        $assign$1(
          {
            b: 1
          },
          $assign$1(
            defineProperty$8({}, 'a', {
              enumerable: true,
              get: function get() {
                defineProperty$8(this, 'b', {
                  value: 3,
                  enumerable: false
                });
              }
            }),
            {
              b: 2
            }
          )
        ).b !== 1
      )
        return true; // should work with symbols and should have deterministic property order (V8 bug)

      var A = {};
      var B = {}; // eslint-disable-next-line es/no-symbol -- safe

      var symbol = symbol$4();

      var alphabet = 'abcdefghijklmnopqrst';
      A[symbol] = 7;

      forEach$2((_context6 = alphabet.split(''))).call(
        _context6,
        function (chr) {
          B[chr] = chr;
        }
      );

      return (
        $assign$1({}, A)[symbol] != 7 ||
        objectKeys$1($assign$1({}, B)).join('') != alphabet
      );
    })
      ? function assign(target, source) {
          // eslint-disable-line no-unused-vars -- required for `.length`
          var T = toObject$1(target);
          var argumentsLength = arguments.length;
          var index = 1;
          var getOwnPropertySymbols = objectGetOwnPropertySymbols$1.f;
          var propertyIsEnumerable = objectPropertyIsEnumerable$1.f;

          while (argumentsLength > index) {
            var _context7;

            var S = indexedObject$1(arguments[index++]);
            var keys = getOwnPropertySymbols
              ? concat$2((_context7 = objectKeys$1(S))).call(
                  _context7,
                  getOwnPropertySymbols(S)
                )
              : objectKeys$1(S);
            var length = keys.length;
            var j = 0;
            var key;

            while (length > j) {
              key = keys[j++];
              if (!descriptors$1 || propertyIsEnumerable.call(S, key))
                T[key] = S[key];
            }
          }

          return T;
        }
      : $assign$1; // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  // eslint-disable-next-line es/no-object-assign -- required for testing

  _export$1(
    {
      target: 'Object',
      stat: true,
      forced: assign$4 !== objectAssign$1
    },
    {
      assign: objectAssign$1
    }
  );

  var assign$5 = path$1.Object.assign;
  var assign$1$1 = assign$5;
  var assign$2$1 = assign$1$1;
  var IS_CONCAT_SPREADABLE$1 = wellKnownSymbol$1('isConcatSpreadable');
  var MAX_SAFE_INTEGER$1$1 = 0x1fffffffffffff;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED$1 = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679

  var IS_CONCAT_SPREADABLE_SUPPORT$1 =
    engineV8Version$1 >= 51 ||
    !fails$1(function () {
      var array = [];
      array[IS_CONCAT_SPREADABLE$1] = false;
      return concat$2(array).call(array)[0] !== array;
    });
  var SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('concat');

  var isConcatSpreadable$1 = function isConcatSpreadable(O) {
    if (!isObject$1(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE$1];
    return spreadable !== undefined ? !!spreadable : isArray$4(O);
  };

  var FORCED$8 = !IS_CONCAT_SPREADABLE_SUPPORT$1 || !SPECIES_SUPPORT$1; // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species

  _export$1(
    {
      target: 'Array',
      proto: true,
      forced: FORCED$8
    },
    {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      concat: function concat(arg) {
        var O = toObject$1(this);
        var A = arraySpeciesCreate$1(O, 0);
        var n = 0;
        var i, k, length, len, E;

        for (i = -1, length = arguments.length; i < length; i++) {
          E = i === -1 ? O : arguments[i];

          if (isConcatSpreadable$1(E)) {
            len = toLength$1(E.length);
            if (n + len > MAX_SAFE_INTEGER$1$1)
              throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED$1);

            for (k = 0; k < len; k++, n++) {
              if (k in E) createProperty$1(A, n, E[k]);
            }
          } else {
            if (n >= MAX_SAFE_INTEGER$1$1)
              throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED$1);
            createProperty$1(A, n++, E);
          }
        }

        A.length = n;
        return A;
      }
    }
  );

  var concat$3 = concat$2(entryVirtual$1('Array'));

  var ArrayPrototype$2$1 = Array.prototype;

  var concat_1$1 = function concat_1(it) {
    var own = concat$2(it);

    return it === ArrayPrototype$2$1 ||
      (it instanceof Array && own === concat$2(ArrayPrototype$2$1))
      ? concat$3
      : own;
  };

  var concat$1$1 = concat_1$1;
  var concat$2$1 = concat$1$1;
  /**
   * Returns whether an object is `Promise`-like (i.e. has a `then` method).
   *
   * @param  {Object}  value
   *         An object that may or may not be `Promise`-like.
   *
   * @return {boolean}
   *         Whether or not the object is `Promise`-like.
   */

  function isPromise(value) {
    return (
      value !== undefined && value !== null && typeof value.then === 'function'
    );
  }
  /**
   * Silence a Promise-like object.
   *
   * This is useful for avoiding non-harmful, but potentially confusing "uncaught
   * play promise" rejection error messages.
   *
   * @param  {Object} value
   *         An object that may or may not be `Promise`-like.
   */

  function silencePromise(value) {
    if (isPromise(value)) {
      value.then(null, function (e) {});
    }
  }
  /**
   * @file format-time.js
   * @module format-time
   */

  /**
   * Format seconds as a time string, H:MM:SS or M:SS. Supplying a guide (in
   * seconds) will force a number of leading zeros to cover the length of the
   * guide.
   *
   * @private
   * @param  {number} seconds
   *         Number of seconds to be turned into a string
   *
   * @param  {number} guide
   *         Number (in seconds) to model the string after
   *
   * @return {string}
   *         Time formatted as H:MM:SS or M:SS
   */

  var defaultImplementation = function defaultImplementation(seconds, guide) {
    seconds = seconds < 0 ? 0 : seconds;
    var s = Math.floor(seconds % 60);
    var m = Math.floor((seconds / 60) % 60);
    var h = Math.floor(seconds / 3600);
    var gm = Math.floor((guide / 60) % 60);
    var gh = Math.floor(guide / 3600); // handle invalid times

    if (isNaN(seconds) || seconds === Infinity) {
      // '-' is false for all relational operators (e.g. <, >=) so this setting
      // will add the minimum number of fields specified by the guide
      h = m = s = '-';
    } // Check if we need to show hours

    h = h > 0 || gh > 0 ? h + ':' : ''; // If hours are showing, we may need to add a leading zero.
    // Always show at least one digit of minutes.

    m = ((h || gm >= 10) && m < 10 ? '0' + m : m) + ':'; // Check if leading zero is need for seconds

    s = s < 10 ? '0' + s : s;
    return h + m + s;
  }; // Internal pointer to the current implementation.

  var implementation = defaultImplementation;
  /**
   * Delegates to either the default time formatting function or a custom
   * function supplied via `setFormatTime`.
   *
   * Formats seconds as a time string (H:MM:SS or M:SS). Supplying a
   * guide (in seconds) will force a number of leading zeros to cover the
   * length of the guide.
   *
   * @static
   * @example  formatTime(125, 600) === "02:05"
   * @param    {number} seconds
   *           Number of seconds to be turned into a string
   *
   * @param    {number} guide
   *           Number (in seconds) to model the string after
   *
   * @return   {string}
   *           Time formatted as H:MM:SS or M:SS
   */

  function formatTime(seconds) {
    var guide =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : seconds;
    return implementation(seconds, guide);
  }

  function eventsMixin(YunliVjsPlayer) {
    YunliVjsPlayer.prototype.errorHandler = function (type) {
      var player = this.player_;
      window.clearTimeout(this.waitingTimer);

      if (type !== 'timeout' && this.autoRetry) {
        this._handleWaiting.call(this);
      }

      silencePromise(player.pause());
      var typeTips = {
        timeout: '连接超时',
        offline: '无网络',
        shutdown: '视频中断',
        notfound: '视频未找到',
        neterror: '网络错误'
      };

      if (this.options_.errorTexts) {
        typeTips = assign$2$1({}, typeTips, this.options_.errorTexts);
      }

      var vjsModalContent = this.player_.el_.querySelector(
        '.vjs-modal-dialog-content'
      );
      player.error(type);

      if (vjsModalContent) {
        if (this.retryTime < this.maxRetryTime) {
          vjsModalContent.innerHTML =
            '\n          <div class="vjs-loading-spinner" dir="ltr">\n            <i class="yl-spin-dot-item"></i>\n            <i class="yl-spin-dot-item"></i>\n            <i class="yl-spin-dot-item"></i>\n            <i class="yl-spin-dot-item"></i>\n          </div>';
        } else {
          var _context;

          vjsModalContent.innerHTML = concat$2$1(
            (_context = '\n        <div class="vjs-yunli-error">\n          <div class="vjs-yunli-'.concat(
              type,
              '"></div>\n          <div class="vjs-yunli-tip">'
            ))
          ).call(_context, typeTips[type], '</div>\n        </div>\n      ');
        }
      }
    }; // 替换loading图标

    YunliVjsPlayer.prototype.replaceSpinner = function () {
      var el = (this.player_.el_ || document).querySelector(
        '.vjs-loading-spinner'
      );
      el.innerHTML = '';

      for (var i = 0; i < 4; i++) {
        var it = document.createElement('i');
        it.classList.add('yl-spin-dot-item');
        el.appendChild(it);
      }
    };

    YunliVjsPlayer.prototype._handleWaiting = function () {
      var _this = this;

      if (this.options_.eventMode === 'monitor') {
        return;
      }

      console.log(
        'retry',
        this.retryTime,
        this.player_.id_,
        this.waitingTimer,
        this
      );

      if (this.waitingTimer) {
        window.clearTimeout(this.waitingTimer);
      }

      if (this.retryTime < this.maxRetryTime) {
        //silencePromise(this.player_.play())
        this.waitingTimer = setTimeout$1$1(function () {
          if (!_this.player_.paused() && _this.isPlaying) {
            return;
          }

          console.log(
            'retry in timeout',
            _this.player_.id_,
            _this.waitingTimer
          ); //let sources = this.player_.currentSources()
          //sources = sources.length === 0 ? this.player_.options_.sources : sources

          if (_this.player_.techName_ === 'Flash') {
            _this.player_.reset();
          }

          if (_this.player_.techName_ !== 'Flash') {
            _this.src(_this.options_.sources);
          }

          if (_this.player_.techName_ === 'Flash') {
            _this.player_.play();
          }
          /*
	        try{
	          if (this.options_.sources[0].src !== this.player_.currentSources()[0].src) {
	             console.log('retry in timeout',this.options_.sources, this.player_.currentSources())
	             this.src(this.options_.sources)
	          } else {
	           this.player_.play()
	          }
	        } catch(err){
	         console.log('err', err)
	        }
	        */
          //this.player_.play()

          _this._handleWaiting.call(_this);

          _this.retryTime += 1;
        }, this.waitingInterval);
      } else {
        //超时
        this.errorHandler('timeout');
      }
    };

    YunliVjsPlayer.prototype.replaceEvents = function () {
      var _this3 = this;

      console.log('bindEvent');
      var _this$options_ = this.options_,
        duration = _this$options_.duration,
        eventMode = _this$options_.eventMode,
        yunliMode = _this$options_.yunliMode;
      var player_ = this.player_;
      var this_ = this;

      if (eventMode === 'monitor') {
        return;
      } //回放模式

      if (yunliMode === 'history' && duration) {
        //当前播放时间
        var _currentTime = function _currentTime(seconds) {
          //console.log('currentTIme', seconds, this)
          if (typeof seconds !== 'undefined') {
            console.log('currentTIme ii', seconds, this);

            if (seconds < 0) {
              seconds = 0;
            }

            if (
              !this.isReady_ ||
              this.changingSrc_ ||
              !this.tech_ ||
              !this.tech_.isReady_
            ) {
              this.cache_.initTime = seconds;
              this.off('canplay', this.applyInitTime_);
              this.one('canplay', this.applyInitTime_);
              return;
            }

            this.techCall_('setCurrentTime', seconds);
            this.cache_.initTime = seconds;
            this.cache_.currentTime = seconds;
            this_.ylJumpTime = seconds;
            return;
          } // cache last currentTime and return. default to 0 seconds
          //
          // Caching the currentTime is meant to prevent a massive amount of reads on the tech's
          // currentTime when scrubbing, but may not provide much performance benefit afterall.
          // Should be tested. Also something has to read the actual current time or the cache will
          // never get updated.

          this.cache_.currentTime = this.techGet_('currentTime') || 0;
          return this.cache_.currentTime;
        }; //设置进度条

        player_.duration = function () {
          return duration;
        };

        player_.currentTime = _currentTime;

        player_.tech_.setCurrentTime = function (time) {
          console.log('tech set currentTime', time, this); //this.lastSeekTarget_ = time

          if (this.el_.vjs_setProperty) {
            this.el_.vjs_setProperty('currentTime', time);
          }
        };

        player_.controlBar.currentTimeDisplay.updateTextNode_ = function () {
          var _this2 = this;

          var time =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : 0;

          if (this_.isJumping) {
            time = this_.ylJumpTime || 0;
          } else {
            time = time + (this_.ylJumpTime || 0);
          }

          time = formatTime(time);

          if (this.formattedTime_ === time) {
            return;
          }

          this.formattedTime_ = time;
          this.requestAnimationFrame(function () {
            if (!_this2.contentEl_) {
              return;
            }

            var oldNode = _this2.textNode_;
            _this2.textNode_ = document.createTextNode(_this2.formattedTime_);

            if (!_this2.textNode_) {
              return;
            }

            if (oldNode) {
              _this2.contentEl_.replaceChild(_this2.textNode_, oldNode);
            } else {
              _this2.contentEl_.appendChild(_this2.textNode_);
            }
          });
        };

        player_.on('play', function () {
          this_.isJumping = false; //clearTimeout(this_.waitingTimer)

          console.log('play', player_.id_, this_.options_.sources);

          if (this_.waitingTimer) {
            window.clearTimeout(this_.waitingTimer);
          }

          setTimeout$1$1(function () {
            player_.el_.classList.remove('vjs-loading-data');
          }, 200);
        }); //播放倍率

        player_.on('ratechange', function (e) {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }

          console.log('ratechange', e, _this3.player_.playbackRate()); //

          _this3._changePlayRate();
        });
        player_.on('timeupdate', function (e) {
          var currentTime = player_.currentTime();
          var duration = player_.duration() || 0;

          if (player_.options_.yunliMode === 'history') {
            if (this_.isJumping) {
              currentTime = this_.ylJumpTime || 0;
            } else {
              currentTime += this_.ylJumpTime || 0;
            }
          }

          if (currentTime > duration) {
            //时间超过时长，强制关闭
            player_.reset();
            this_.ylJumpTime = 0;
            this_.ylReset = true;

            if (this_.onEnd && typeof this_.onEnd === 'function') {
              this_.onEnd.call(this_);
            }

            if (player_.options_.loop) {
              /*
	            let sources = player_.currentSources()
	            if(sources.length === 0){
	              sources = this_.options_.sources
	            }
	            this_.src(sources)
	            */
              this_._refetchPlay();
            } else {
              setTimeout$1$1(function () {
                player_.el_.classList.add('vjs-paused');
                player_.pause();
              }, 500);
            }
          } //console.log('timeupdate', player_.currentTime())
        });

        player_.bigPlayButton.el_.onclick = function () {
          //console.log('play onclick', this_.ylReset)
          if (this_.ylReset) {
            this_.ylReset = false;
            var func = this_.options_.beforeRetry || this_.beforeRetry;

            if (func) {
              func.call(this_, this_);
            } else {
              this_.src(this_.options_.sources);
            }
          }
        };
      } //player_.scrubbing(true)
      // 点击错误界面，重新尝试播放

      player_.errorDisplay.el_.onclick = function (e) {
        if (e) {
          e.preventDefault();
        }

        this_.src(this_.options_.sources || player_.currentSources());
      };

      player_.on('waiting', function (e) {
        console.log(
          'waiting',
          player_.el_.classList.contains('vjs-loading-data')
        );
        _this3.isPlaying = false; // 离线

        if (!navigator.onLine) {
          this_.errorHandler('offline');
          return;
        }

        window.clearTimeout(this_.waitingTimer);

        this_._handleWaiting.call(this_);

        if (!player_.el_.classList.contains('vjs-loading-data')) {
          player_.el_.classList.add('vjs-loading-data');
        }
      });
      player_.on('loadstart', function (e) {
        console.log('load start', player_.id_, this_.waitingTimer);
        window.clearTimeout(this_.waitingTimer);

        if (this_.player_.techName_ === 'Flash') {
          this_._handleWaiting.call(this_);
        }

        if (!player_.el_.classList.contains('vjs-loading-data')) {
          player_.el_.classList.add('vjs-loading-data');
        }
      });
      player_.on('loadeddata', function (e) {
        console.log('loaded data', player_.id_, this_.waitingTimer);
        window.clearTimeout(this_.waitingTimer);
        setTimeout$1$1(function () {
          player_.el_.classList.remove('vjs-loading-data');
        }, 20);
      }); //数据加载成功，清除定时器

      player_.on('playing', function (e) {
        console.log('playing', player_.id_, this_.options_.sources);
        _this3.isPlaying = true;
        this_.retryTime = 0;
        window.clearTimeout(this_.waitingTimer);
        setTimeout$1$1(function () {
          player_.el_.classList.remove('vjs-loading-data');
        }, 20);
      });
      player_.on('ended', function () {
        if (this_.onEnd && typeof this_.onEnd === 'function') {
          this_.onEnd.call(this_);
        }
      });
    };
  }

  var FAILS_ON_PRIMITIVES$5 = fails$1(function () {
    objectKeys$1(1);
  }); // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys

  _export$1(
    {
      target: 'Object',
      stat: true,
      forced: FAILS_ON_PRIMITIVES$5
    },
    {
      keys: function keys(it) {
        return objectKeys$1(toObject$1(it));
      }
    }
  );

  var keys$7 = keys$6(path$1.Object);

  var keys$1$1 = keys$7;
  var keys$2$1 = keys$1$1;

  var toString_1$1 = function toString_1(argument) {
    if (isSymbol$1(argument))
      throw TypeError('Cannot convert a Symbol value to a string');
    return String(argument);
  }; // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe

  var objectDefineProperties$1 = descriptors$1
    ? defineProperties$1
    : function defineProperties(O, Properties) {
        anObject$1(O);
        var keys = objectKeys$1(Properties);
        var length = keys.length;
        var index = 0;
        var key;

        while (length > index) {
          objectDefineProperty$1.f(O, (key = keys[index++]), Properties[key]);
        }

        return O;
      };
  var html$1 = getBuiltIn$1('document', 'documentElement');
  var keys$3$1 = shared$1('keys');

  var sharedKey$1 = function sharedKey(key) {
    return keys$3$1[key] || (keys$3$1[key] = uid$1(key));
  };
  /* global ActiveXObject -- old IE, WSH */

  var GT$1 = '>';
  var LT$1 = '<';
  var PROTOTYPE$2 = 'prototype';
  var SCRIPT$1 = 'script';
  var IE_PROTO$2 = sharedKey$1('IE_PROTO');

  var EmptyConstructor$1 = function EmptyConstructor() {
    /* empty */
  };

  var scriptTag$1 = function scriptTag(content) {
    return LT$1 + SCRIPT$1 + GT$1 + content + LT$1 + '/' + SCRIPT$1 + GT$1;
  }; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype

  var NullProtoObjectViaActiveX$1 = function NullProtoObjectViaActiveX(
    activeXDocument
  ) {
    activeXDocument.write(scriptTag$1(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak

    return temp;
  }; // Create object with fake `null` prototype: use iframe Object with cleared prototype

  var NullProtoObjectViaIFrame$1 = function NullProtoObjectViaIFrame() {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement$1('iframe');
    var JS = 'java' + SCRIPT$1 + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html$1.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag$1('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  }; // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug

  var activeXDocument$1;

  var _NullProtoObject = function NullProtoObject() {
    try {
      activeXDocument$1 = new ActiveXObject('htmlfile');
    } catch (error) {
      /* ignore */
    }

    _NullProtoObject =
      typeof document != 'undefined'
        ? document.domain && activeXDocument$1
          ? NullProtoObjectViaActiveX$1(activeXDocument$1) // old IE
          : NullProtoObjectViaIFrame$1()
        : NullProtoObjectViaActiveX$1(activeXDocument$1); // WSH

    var length = enumBugKeys$1.length;

    while (length--) {
      delete _NullProtoObject[PROTOTYPE$2][enumBugKeys$1[length]];
    }

    return _NullProtoObject();
  };

  hiddenKeys$2[IE_PROTO$2] = true; // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create

  var objectCreate$1 =
    create$4 ||
    function create(O, Properties) {
      var result;

      if (O !== null) {
        EmptyConstructor$1[PROTOTYPE$2] = anObject$1(O);
        result = new EmptyConstructor$1();
        EmptyConstructor$1[PROTOTYPE$2] = null; // add "__proto__" for Object.getPrototypeOf polyfill

        result[IE_PROTO$2] = O;
      } else result = _NullProtoObject();

      return Properties === undefined
        ? result
        : objectDefineProperties$1(result, Properties);
    };

  var hiddenKeys$1$1 = concat$2(enumBugKeys$1).call(
    enumBugKeys$1,
    'length',
    'prototype'
  ); // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe

  var f$4$1 =
    getOwnPropertyNames$3 ||
    function getOwnPropertyNames(O) {
      return objectKeysInternal$1(O, hiddenKeys$1$1);
    };

  var objectGetOwnPropertyNames$1 = {
    f: f$4$1
  };
  /* eslint-disable es/no-object-getownpropertynames -- safe */

  var $getOwnPropertyNames$2 = objectGetOwnPropertyNames$1.f;
  var toString$1$1 = {}.toString;
  var windowNames$1 =
    (typeof window === 'undefined' ? 'undefined' : _typeof2(window)) ==
      'object' &&
    window &&
    getOwnPropertyNames$3
      ? getOwnPropertyNames$3(window)
      : [];

  var getWindowNames$1 = function getWindowNames(it) {
    try {
      return $getOwnPropertyNames$2(it);
    } catch (error) {
      return slice$4(windowNames$1).call(windowNames$1);
    }
  }; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

  var f$5$1 = function getOwnPropertyNames(it) {
    return windowNames$1 && toString$1$1.call(it) == '[object Window]'
      ? getWindowNames$1(it)
      : $getOwnPropertyNames$2(toIndexedObject$1(it));
  };

  var objectGetOwnPropertyNamesExternal$1 = {
    f: f$5$1
  };

  var redefine$1 = function redefine(target, key, value, options) {
    if (options && options.enumerable) target[key] = value;
    else createNonEnumerableProperty$1(target, key, value);
  };

  var f$6$1 = wellKnownSymbol$1;
  var wellKnownSymbolWrapped$1 = {
    f: f$6$1
  };
  var defineProperty$1$1 = objectDefineProperty$1.f;

  var defineWellKnownSymbol$1 = function defineWellKnownSymbol(NAME) {
    var _Symbol2 = path$1.Symbol || (path$1.Symbol = {});

    if (!has$2(_Symbol2, NAME))
      defineProperty$1$1(_Symbol2, NAME, {
        value: wellKnownSymbolWrapped$1.f(NAME)
      });
  };

  var TO_STRING_TAG$4 = wellKnownSymbol$1('toStringTag');
  var test$2 = {};
  test$2[TO_STRING_TAG$4] = 'z';
  var toStringTagSupport$1 = String(test$2) === '[object z]';
  var TO_STRING_TAG$1$1 = wellKnownSymbol$1('toStringTag'); // ES3 wrong here

  var CORRECT_ARGUMENTS$1 =
    classofRaw$1(
      (function () {
        return arguments;
      })()
    ) == 'Arguments'; // fallback for IE11 Script Access Denied error

  var tryGet$1 = function tryGet(it, key) {
    try {
      return it[key];
    } catch (error) {
      /* empty */
    }
  }; // getting tag from ES6+ `Object.prototype.toString`

  var classof$1 = toStringTagSupport$1
    ? classofRaw$1
    : function (it) {
        var O, tag, result;
        return it === undefined
          ? 'Undefined'
          : it === null
          ? 'Null' // @@toStringTag case
          : typeof (tag = tryGet$1((O = Object(it)), TO_STRING_TAG$1$1)) ==
            'string'
          ? tag // builtinTag case
          : CORRECT_ARGUMENTS$1
          ? classofRaw$1(O) // ES3 arguments fallback
          : (result = classofRaw$1(O)) == 'Object' &&
            typeof O.callee == 'function'
          ? 'Arguments'
          : result;
      }; // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring

  var objectToString$1 = toStringTagSupport$1
    ? {}.toString
    : function toString() {
        return '[object ' + classof$1(this) + ']';
      };
  var defineProperty$2$1 = objectDefineProperty$1.f;
  var TO_STRING_TAG$2$1 = wellKnownSymbol$1('toStringTag');

  var setToStringTag$1 = function setToStringTag(it, TAG, STATIC, SET_METHOD) {
    if (it) {
      var target = STATIC ? it : it.prototype;

      if (!has$2(target, TO_STRING_TAG$2$1)) {
        defineProperty$2$1(target, TO_STRING_TAG$2$1, {
          configurable: true,
          value: TAG
        });
      }

      if (SET_METHOD && !toStringTagSupport$1) {
        createNonEnumerableProperty$1(target, 'toString', objectToString$1);
      }
    }
  };

  var functionToString$1 = Function.toString; // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

  if (typeof sharedStore$1.inspectSource != 'function') {
    sharedStore$1.inspectSource = function (it) {
      return functionToString$1.call(it);
    };
  }

  var inspectSource$1 = sharedStore$1.inspectSource;
  var WeakMap$2 = global_1$1.WeakMap;
  var nativeWeakMap$1 =
    typeof WeakMap$2 === 'function' &&
    /native code/.test(inspectSource$1(WeakMap$2));
  var OBJECT_ALREADY_INITIALIZED$1 = 'Object already initialized';
  var WeakMap$1$1 = global_1$1.WeakMap;
  var set$2, get$1, has$1$1;

  var enforce$1 = function enforce(it) {
    return has$1$1(it) ? get$1(it) : set$2(it, {});
  };

  var getterFor$1 = function getterFor(TYPE) {
    return function (it) {
      var state;

      if (!isObject$1(it) || (state = get$1(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (nativeWeakMap$1 || sharedStore$1.state) {
    var store$1$1 =
      sharedStore$1.state || (sharedStore$1.state = new WeakMap$1$1());
    var wmget$1 = store$1$1.get;
    var wmhas$1 = store$1$1.has;
    var wmset$1 = store$1$1.set;

    set$2 = function set(it, metadata) {
      if (wmhas$1.call(store$1$1, it))
        throw new TypeError(OBJECT_ALREADY_INITIALIZED$1);
      metadata.facade = it;
      wmset$1.call(store$1$1, it, metadata);
      return metadata;
    };

    get$1 = function get(it) {
      return wmget$1.call(store$1$1, it) || {};
    };

    has$1$1 = function has$1(it) {
      return wmhas$1.call(store$1$1, it);
    };
  } else {
    var STATE$1 = sharedKey$1('state');
    hiddenKeys$2[STATE$1] = true;

    set$2 = function set(it, metadata) {
      if (has$2(it, STATE$1)) throw new TypeError(OBJECT_ALREADY_INITIALIZED$1);
      metadata.facade = it;
      createNonEnumerableProperty$1(it, STATE$1, metadata);
      return metadata;
    };

    get$1 = function get(it) {
      return has$2(it, STATE$1) ? it[STATE$1] : {};
    };

    has$1$1 = function has$1(it) {
      return has$2(it, STATE$1);
    };
  }

  var internalState$1 = {
    set: set$2,
    get: get$1,
    has: has$1$1,
    enforce: enforce$1,
    getterFor: getterFor$1
  };
  var push$1 = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation

  var createMethod$1$1 = function createMethod$1(TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$1($this);
      var self = indexedObject$1(O);
      var boundFunction = functionBindContext$1(callbackfn, that, 3);
      var length = toLength$1(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$1;
      var target = IS_MAP
        ? create($this, length)
        : IS_FILTER || IS_FILTER_REJECT
        ? create($this, 0)
        : undefined;
      var value, result;

      for (; length > index; index++) {
        if (NO_HOLES || index in self) {
          value = self[index];
          result = boundFunction(value, index, O);

          if (TYPE) {
            if (IS_MAP) target[index] = result;
            // map
            else if (result)
              switch (TYPE) {
                case 3:
                  return true;
                // some

                case 5:
                  return value;
                // find

                case 6:
                  return index;
                // findIndex

                case 2:
                  push$1.call(target, value);
                // filter
              }
            else
              switch (TYPE) {
                case 4:
                  return false;
                // every

                case 7:
                  push$1.call(target, value);
                // filterReject
              }
          }
        }
      }

      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration$1 = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1$1(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$1$1(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$1$1(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$1$1(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$1$1(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$1$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1$1(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$1$1(7)
  };

  var $forEach$2 = forEach$2(arrayIteration$1);

  var HIDDEN$1 = sharedKey$1('hidden');
  var SYMBOL$1 = 'Symbol';
  var PROTOTYPE$1$1 = 'prototype';
  var TO_PRIMITIVE$1$1 = wellKnownSymbol$1('toPrimitive');
  var setInternalState$6 = internalState$1.set;
  var getInternalState$4 = internalState$1.getterFor(SYMBOL$1);
  var ObjectPrototype$2 = Object[PROTOTYPE$1$1];
  var $Symbol$1 = global_1$1.Symbol;
  var $stringify$2 = getBuiltIn$1('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor$1.f;
  var nativeDefineProperty$1 = objectDefineProperty$1.f;
  var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal$1.f;
  var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable$1.f;
  var AllSymbols$1 = shared$1('symbols');
  var ObjectPrototypeSymbols$1 = shared$1('op-symbols');
  var StringToSymbolRegistry$1 = shared$1('string-to-symbol-registry');
  var SymbolToStringRegistry$1 = shared$1('symbol-to-string-registry');
  var WellKnownSymbolsStore$1$1 = shared$1('wks');
  var QObject$1 = global_1$1.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

  var USE_SETTER$1 =
    !QObject$1 ||
    !QObject$1[PROTOTYPE$1$1] ||
    !QObject$1[PROTOTYPE$1$1].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

  var setSymbolDescriptor$1 =
    descriptors$1 &&
    fails$1(function () {
      return (
        objectCreate$1(
          nativeDefineProperty$1({}, 'a', {
            get: function get() {
              return nativeDefineProperty$1(this, 'a', {
                value: 7
              }).a;
            }
          })
        ).a != 7
      );
    })
      ? function (O, P, Attributes) {
          var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$2(
            ObjectPrototype$2,
            P
          );
          if (ObjectPrototypeDescriptor) delete ObjectPrototype$2[P];
          nativeDefineProperty$1(O, P, Attributes);

          if (ObjectPrototypeDescriptor && O !== ObjectPrototype$2) {
            nativeDefineProperty$1(
              ObjectPrototype$2,
              P,
              ObjectPrototypeDescriptor
            );
          }
        }
      : nativeDefineProperty$1;

  var wrap$1$1 = function wrap$1(tag, description) {
    var symbol = (AllSymbols$1[tag] = objectCreate$1($Symbol$1[PROTOTYPE$1$1]));
    setInternalState$6(symbol, {
      type: SYMBOL$1,
      tag: tag,
      description: description
    });
    if (!descriptors$1) symbol.description = description;
    return symbol;
  };

  var $defineProperty$1$1 = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype$2)
      $defineProperty$1$1(ObjectPrototypeSymbols$1, P, Attributes);
    anObject$1(O);
    var key = toPropertyKey$1(P);
    anObject$1(Attributes);

    if (has$2(AllSymbols$1, key)) {
      if (!Attributes.enumerable) {
        if (!has$2(O, HIDDEN$1))
          nativeDefineProperty$1(
            O,
            HIDDEN$1,
            createPropertyDescriptor$1(1, {})
          );
        O[HIDDEN$1][key] = true;
      } else {
        if (has$2(O, HIDDEN$1) && O[HIDDEN$1][key]) O[HIDDEN$1][key] = false;
        Attributes = objectCreate$1(Attributes, {
          enumerable: createPropertyDescriptor$1(0, false)
        });
      }

      return setSymbolDescriptor$1(O, key, Attributes);
    }

    return nativeDefineProperty$1(O, key, Attributes);
  };

  var $defineProperties$1 = function defineProperties(O, Properties) {
    var _context8;

    anObject$1(O);
    var properties = toIndexedObject$1(Properties);

    var keys = concat$2((_context8 = objectKeys$1(properties))).call(
      _context8,
      $getOwnPropertySymbols$1(properties)
    );

    $forEach$2(keys, function (key) {
      if (!descriptors$1 || $propertyIsEnumerable$1$1.call(properties, key))
        $defineProperty$1$1(O, key, properties[key]);
    });
    return O;
  };

  var $create$1 = function create(O, Properties) {
    return Properties === undefined
      ? objectCreate$1(O)
      : $defineProperties$1(objectCreate$1(O), Properties);
  };

  var $propertyIsEnumerable$1$1 = function propertyIsEnumerable(V) {
    var P = toPropertyKey$1(V);
    var enumerable = nativePropertyIsEnumerable$1.call(this, P);
    if (
      this === ObjectPrototype$2 &&
      has$2(AllSymbols$1, P) &&
      !has$2(ObjectPrototypeSymbols$1, P)
    )
      return false;
    return enumerable ||
      !has$2(this, P) ||
      !has$2(AllSymbols$1, P) ||
      (has$2(this, HIDDEN$1) && this[HIDDEN$1][P])
      ? enumerable
      : true;
  };

  var $getOwnPropertyDescriptor$1$1 = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject$1(O);
    var key = toPropertyKey$1(P);
    if (
      it === ObjectPrototype$2 &&
      has$2(AllSymbols$1, key) &&
      !has$2(ObjectPrototypeSymbols$1, key)
    )
      return;
    var descriptor = nativeGetOwnPropertyDescriptor$2(it, key);

    if (
      descriptor &&
      has$2(AllSymbols$1, key) &&
      !(has$2(it, HIDDEN$1) && it[HIDDEN$1][key])
    ) {
      descriptor.enumerable = true;
    }

    return descriptor;
  };

  var $getOwnPropertyNames$1$1 = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames$1(toIndexedObject$1(O));
    var result = [];
    $forEach$2(names, function (key) {
      if (!has$2(AllSymbols$1, key) && !has$2(hiddenKeys$2, key))
        result.push(key);
    });
    return result;
  };

  var $getOwnPropertySymbols$1 = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$2;
    var names = nativeGetOwnPropertyNames$1(
      IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols$1 : toIndexedObject$1(O)
    );
    var result = [];
    $forEach$2(names, function (key) {
      if (
        has$2(AllSymbols$1, key) &&
        (!IS_OBJECT_PROTOTYPE || has$2(ObjectPrototype$2, key))
      ) {
        result.push(AllSymbols$1[key]);
      }
    });
    return result;
  }; // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor

  if (!nativeSymbol$1) {
    $Symbol$1 = function _Symbol3() {
      if (this instanceof $Symbol$1)
        throw TypeError('Symbol is not a constructor');
      var description =
        !arguments.length || arguments[0] === undefined
          ? undefined
          : toString_1$1(arguments[0]);
      var tag = uid$1(description);

      var setter = function setter(value) {
        if (this === ObjectPrototype$2)
          setter.call(ObjectPrototypeSymbols$1, value);
        if (has$2(this, HIDDEN$1) && has$2(this[HIDDEN$1], tag))
          this[HIDDEN$1][tag] = false;
        setSymbolDescriptor$1(this, tag, createPropertyDescriptor$1(1, value));
      };

      if (descriptors$1 && USE_SETTER$1)
        setSymbolDescriptor$1(ObjectPrototype$2, tag, {
          configurable: true,
          set: setter
        });
      return wrap$1$1(tag, description);
    };

    redefine$1($Symbol$1[PROTOTYPE$1$1], 'toString', function toString() {
      return getInternalState$4(this).tag;
    });
    redefine$1($Symbol$1, 'withoutSetter', function (description) {
      return wrap$1$1(uid$1(description), description);
    });
    objectPropertyIsEnumerable$1.f = $propertyIsEnumerable$1$1;
    objectDefineProperty$1.f = $defineProperty$1$1;
    objectGetOwnPropertyDescriptor$1.f = $getOwnPropertyDescriptor$1$1;
    objectGetOwnPropertyNames$1.f = objectGetOwnPropertyNamesExternal$1.f = $getOwnPropertyNames$1$1;
    objectGetOwnPropertySymbols$1.f = $getOwnPropertySymbols$1;

    wellKnownSymbolWrapped$1.f = function (name) {
      return wrap$1$1(wellKnownSymbol$1(name), name);
    };

    if (descriptors$1) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty$1($Symbol$1[PROTOTYPE$1$1], 'description', {
        configurable: true,
        get: function description() {
          return getInternalState$4(this).description;
        }
      });
    }
  }

  _export$1(
    {
      global: true,
      wrap: true,
      forced: !nativeSymbol$1,
      sham: !nativeSymbol$1
    },
    {
      Symbol: $Symbol$1
    }
  );

  $forEach$2(objectKeys$1(WellKnownSymbolsStore$1$1), function (name) {
    defineWellKnownSymbol$1(name);
  });

  _export$1(
    {
      target: SYMBOL$1,
      stat: true,
      forced: !nativeSymbol$1
    },
    {
      // `Symbol.for` method
      // https://tc39.es/ecma262/#sec-symbol.for
      for: function _for(key) {
        var string = toString_1$1(key);
        if (has$2(StringToSymbolRegistry$1, string))
          return StringToSymbolRegistry$1[string];
        var symbol = $Symbol$1(string);
        StringToSymbolRegistry$1[string] = symbol;
        SymbolToStringRegistry$1[symbol] = string;
        return symbol;
      },
      // `Symbol.keyFor` method
      // https://tc39.es/ecma262/#sec-symbol.keyfor
      keyFor: function keyFor(sym) {
        if (!isSymbol$1(sym)) throw TypeError(sym + ' is not a symbol');
        if (has$2(SymbolToStringRegistry$1, sym))
          return SymbolToStringRegistry$1[sym];
      },
      useSetter: function useSetter() {
        USE_SETTER$1 = true;
      },
      useSimple: function useSimple() {
        USE_SETTER$1 = false;
      }
    }
  );

  _export$1(
    {
      target: 'Object',
      stat: true,
      forced: !nativeSymbol$1,
      sham: !descriptors$1
    },
    {
      // `Object.create` method
      // https://tc39.es/ecma262/#sec-object.create
      create: $create$1,
      // `Object.defineProperty` method
      // https://tc39.es/ecma262/#sec-object.defineproperty
      defineProperty: $defineProperty$1$1,
      // `Object.defineProperties` method
      // https://tc39.es/ecma262/#sec-object.defineproperties
      defineProperties: $defineProperties$1,
      // `Object.getOwnPropertyDescriptor` method
      // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
      getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1$1
    }
  );

  _export$1(
    {
      target: 'Object',
      stat: true,
      forced: !nativeSymbol$1
    },
    {
      // `Object.getOwnPropertyNames` method
      // https://tc39.es/ecma262/#sec-object.getownpropertynames
      getOwnPropertyNames: $getOwnPropertyNames$1$1,
      // `Object.getOwnPropertySymbols` method
      // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
      getOwnPropertySymbols: $getOwnPropertySymbols$1
    }
  ); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443

  _export$1(
    {
      target: 'Object',
      stat: true,
      forced: fails$1(function () {
        objectGetOwnPropertySymbols$1.f(1);
      })
    },
    {
      getOwnPropertySymbols: function getOwnPropertySymbols(it) {
        return objectGetOwnPropertySymbols$1.f(toObject$1(it));
      }
    }
  ); // `JSON.stringify` method behavior with symbols
  // https://tc39.es/ecma262/#sec-json.stringify

  if ($stringify$2) {
    var FORCED_JSON_STRINGIFY$1 =
      !nativeSymbol$1 ||
      fails$1(function () {
        var symbol = $Symbol$1(); // MS Edge converts symbol values to JSON as {}

        return (
          $stringify$2([symbol]) != '[null]' || // WebKit converts symbol values to JSON as null
          $stringify$2({
            a: symbol
          }) != '{}' || // V8 throws on boxed symbols
          $stringify$2(Object(symbol)) != '{}'
        );
      });

    _export$1(
      {
        target: 'JSON',
        stat: true,
        forced: FORCED_JSON_STRINGIFY$1
      },
      {
        // eslint-disable-next-line no-unused-vars -- required for `.length`
        stringify: function stringify(it, replacer, space) {
          var args = [it];
          var index = 1;
          var $replacer;

          while (arguments.length > index) {
            args.push(arguments[index++]);
          }

          $replacer = replacer;
          if ((!isObject$1(replacer) && it === undefined) || isSymbol$1(it))
            return; // IE8 returns string on undefined

          if (!isArray$4(replacer))
            replacer = function replacer(key, value) {
              if (typeof $replacer == 'function')
                value = $replacer.call(this, key, value);
              if (!isSymbol$1(value)) return value;
            };
          args[1] = replacer;
          return $stringify$2.apply(null, args);
        }
      }
    );
  } // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive

  if (!$Symbol$1[PROTOTYPE$1$1][TO_PRIMITIVE$1$1]) {
    createNonEnumerableProperty$1(
      $Symbol$1[PROTOTYPE$1$1],
      TO_PRIMITIVE$1$1,
      $Symbol$1[PROTOTYPE$1$1].valueOf
    );
  } // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag

  setToStringTag$1($Symbol$1, SYMBOL$1);
  hiddenKeys$2[HIDDEN$1] = true;
  var getOwnPropertySymbols$3 = path$1.Object.getOwnPropertySymbols;
  var getOwnPropertySymbols$1$1 = getOwnPropertySymbols$3;
  var getOwnPropertySymbols$2$1 = getOwnPropertySymbols$1$1;

  var $filter$1 = filter$2(arrayIteration$1);

  var HAS_SPECIES_SUPPORT$1$1 = arrayMethodHasSpeciesSupport$1('filter'); // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species

  _export$1(
    {
      target: 'Array',
      proto: true,
      forced: !HAS_SPECIES_SUPPORT$1$1
    },
    {
      filter: function filter(
        callbackfn
        /* , thisArg */
      ) {
        return $filter$1(
          this,
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined
        );
      }
    }
  );

  var filter$3 = filter$2(entryVirtual$1('Array'));

  var ArrayPrototype$3$1 = Array.prototype;

  var filter_1$1 = function filter_1(it) {
    var own = filter$2(it);

    return it === ArrayPrototype$3$1 ||
      (it instanceof Array && own === filter$2(ArrayPrototype$3$1))
      ? filter$3
      : own;
  };

  var filter$1$1 = filter_1$1;
  var filter$2$1 = filter$1$1;
  var nativeGetOwnPropertyDescriptor$1$1 = objectGetOwnPropertyDescriptor$1.f;
  var FAILS_ON_PRIMITIVES$1$1 = fails$1(function () {
    nativeGetOwnPropertyDescriptor$1$1(1);
  });
  var FORCED$1$1 = !descriptors$1 || FAILS_ON_PRIMITIVES$1$1; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

  _export$1(
    {
      target: 'Object',
      stat: true,
      forced: FORCED$1$1,
      sham: !descriptors$1
    },
    {
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
        return nativeGetOwnPropertyDescriptor$1$1(toIndexedObject$1(it), key);
      }
    }
  );

  var getOwnPropertyDescriptor_1$1 = createCommonjsModule$1(function (module) {
    var Object = path$1.Object;

    var getOwnPropertyDescriptor = (module.exports = function getOwnPropertyDescriptor(
      it,
      key
    ) {
      return Object.getOwnPropertyDescriptor(it, key);
    });

    if (Object.getOwnPropertyDescriptor.sham)
      getOwnPropertyDescriptor.sham = true;
  });
  var getOwnPropertyDescriptor$2$1 = getOwnPropertyDescriptor_1$1;
  var getOwnPropertyDescriptor$3$1 = getOwnPropertyDescriptor$2$1;
  var iterators$1 = {};
  var correctPrototypeGetter$1 = !fails$1(function () {
    function F() {
      /* empty */
    }

    F.prototype.constructor = null; // eslint-disable-next-line es/no-object-getprototypeof -- required for testing

    return getPrototypeOf$5(new F()) !== F.prototype;
  });
  var IE_PROTO$1$1 = sharedKey$1('IE_PROTO');
  var ObjectPrototype$1$1 = Object.prototype; // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe

  var objectGetPrototypeOf$1 = correctPrototypeGetter$1
    ? getPrototypeOf$5
    : function (O) {
        O = toObject$1(O);
        if (has$2(O, IE_PROTO$1$1)) return O[IE_PROTO$1$1];

        if (typeof O.constructor == 'function' && O instanceof O.constructor) {
          return O.constructor.prototype;
        }

        return O instanceof Object ? ObjectPrototype$1$1 : null;
      };
  var ITERATOR$7 = wellKnownSymbol$1('iterator');
  var BUGGY_SAFARI_ITERATORS$2 = false;

  var returnThis$3 = function returnThis() {
    return this;
  }; // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object

  var IteratorPrototype$3, PrototypeOfArrayIteratorPrototype$1, arrayIterator$1;
  /* eslint-disable es/no-array-prototype-keys -- safe */

  if (keys$6([])) {
    var _context9;

    arrayIterator$1 = keys$6((_context9 = [])).call(_context9); // Safari 8 has buggy iterators w/o `next`

    if (!('next' in arrayIterator$1)) BUGGY_SAFARI_ITERATORS$2 = true;
    else {
      PrototypeOfArrayIteratorPrototype$1 = objectGetPrototypeOf$1(
        objectGetPrototypeOf$1(arrayIterator$1)
      );
      if (PrototypeOfArrayIteratorPrototype$1 !== Object.prototype)
        IteratorPrototype$3 = PrototypeOfArrayIteratorPrototype$1;
    }
  }

  var NEW_ITERATOR_PROTOTYPE$1 =
    IteratorPrototype$3 == undefined ||
    fails$1(function () {
      var test = {}; // FF44- legacy iterators case

      return IteratorPrototype$3[ITERATOR$7].call(test) !== test;
    });
  if (NEW_ITERATOR_PROTOTYPE$1) IteratorPrototype$3 = {}; // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator

  if (NEW_ITERATOR_PROTOTYPE$1 && !has$2(IteratorPrototype$3, ITERATOR$7)) {
    createNonEnumerableProperty$1(
      IteratorPrototype$3,
      ITERATOR$7,
      returnThis$3
    );
  }

  var iteratorsCore$1 = {
    IteratorPrototype: IteratorPrototype$3,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$2
  };
  var IteratorPrototype$1$1 = iteratorsCore$1.IteratorPrototype;

  var returnThis$1$1 = function returnThis$1() {
    return this;
  };

  var createIteratorConstructor$1 = function createIteratorConstructor(
    IteratorConstructor,
    NAME,
    next
  ) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate$1(IteratorPrototype$1$1, {
      next: createPropertyDescriptor$1(1, next)
    });
    setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false, true);
    iterators$1[TO_STRING_TAG] = returnThis$1$1;
    return IteratorConstructor;
  };

  var aPossiblePrototype$1 = function aPossiblePrototype(it) {
    if (!isObject$1(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    }

    return it;
  };
  /* eslint-disable no-proto -- safe */
  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe

  var objectSetPrototypeOf$1 =
    setPrototypeOf$5 ||
    ('__proto__' in {}
      ? (function () {
          var CORRECT_SETTER = false;
          var test = {};
          var setter;

          try {
            // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
            setter = getOwnPropertyDescriptor$3(Object.prototype, '__proto__')
              .set;
            setter.call(test, []);
            CORRECT_SETTER = test instanceof Array;
          } catch (error) {
            /* empty */
          }

          return function setPrototypeOf(O, proto) {
            anObject$1(O);
            aPossiblePrototype$1(proto);
            if (CORRECT_SETTER) setter.call(O, proto);
            else O.__proto__ = proto;
            return O;
          };
        })()
      : undefined);
  var IteratorPrototype$2$1 = iteratorsCore$1.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS$1$1 = iteratorsCore$1.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1$1 = wellKnownSymbol$1('iterator');
  var KEYS$1 = 'keys';
  var VALUES$1 = 'values';
  var ENTRIES$1 = 'entries';

  var returnThis$2$1 = function returnThis$2() {
    return this;
  };

  var defineIterator$1 = function defineIterator(
    Iterable,
    NAME,
    IteratorConstructor,
    next,
    DEFAULT,
    IS_SET,
    FORCED
  ) {
    createIteratorConstructor$1(IteratorConstructor, NAME, next);

    var getIterationMethod = function getIterationMethod(KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS$1$1 && KIND in IterablePrototype)
        return IterablePrototype[KIND];

      switch (KIND) {
        case KEYS$1:
          return function keys() {
            return new IteratorConstructor(this, KIND);
          };

        case VALUES$1:
          return function values() {
            return new IteratorConstructor(this, KIND);
          };

        case ENTRIES$1:
          return function entries() {
            return new IteratorConstructor(this, KIND);
          };
      }

      return function () {
        return new IteratorConstructor(this);
      };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator =
      IterablePrototype[ITERATOR$1$1] ||
      IterablePrototype['@@iterator'] ||
      (DEFAULT && IterablePrototype[DEFAULT]);
    var defaultIterator =
      (!BUGGY_SAFARI_ITERATORS$1$1 && nativeIterator) ||
      getIterationMethod(DEFAULT);
    var anyNativeIterator =
      NAME == 'Array'
        ? entries$2(IterablePrototype) || nativeIterator
        : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY; // fix native

    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf$1(
        anyNativeIterator.call(new Iterable())
      );

      if (
        IteratorPrototype$2$1 !== Object.prototype &&
        CurrentIteratorPrototype.next
      ) {
        // Set @@toStringTag to native iterators
        setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
        iterators$1[TO_STRING_TAG] = returnThis$2$1;
      }
    } // fix Array.prototype.{ values, @@iterator }.name in V8 / FF

    if (
      DEFAULT == VALUES$1 &&
      nativeIterator &&
      nativeIterator.name !== VALUES$1
    ) {
      INCORRECT_VALUES_NAME = true;

      defaultIterator = function values() {
        return nativeIterator.call(this);
      };
    } // define iterator

    if (FORCED && IterablePrototype[ITERATOR$1$1] !== defaultIterator) {
      createNonEnumerableProperty$1(
        IterablePrototype,
        ITERATOR$1$1,
        defaultIterator
      );
    }

    iterators$1[NAME] = defaultIterator; // export additional methods

    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES$1),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS$1),
        entries: getIterationMethod(ENTRIES$1)
      };
      if (FORCED)
        for (KEY in methods) {
          if (
            BUGGY_SAFARI_ITERATORS$1$1 ||
            INCORRECT_VALUES_NAME ||
            !(KEY in IterablePrototype)
          ) {
            redefine$1(IterablePrototype, KEY, methods[KEY]);
          }
        }
      else
        _export$1(
          {
            target: NAME,
            proto: true,
            forced: BUGGY_SAFARI_ITERATORS$1$1 || INCORRECT_VALUES_NAME
          },
          methods
        );
    }

    return methods;
  };

  var ARRAY_ITERATOR$1 = 'Array Iterator';
  var setInternalState$1$1 = internalState$1.set;
  var getInternalState$1$1 = internalState$1.getterFor(ARRAY_ITERATOR$1); // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator

  var es_array_iterator$1 = defineIterator$1(
    Array,
    'Array',
    function (iterated, kind) {
      setInternalState$1$1(this, {
        type: ARRAY_ITERATOR$1,
        target: toIndexedObject$1(iterated),
        // target
        index: 0,
        // next index
        kind: kind // kind
      }); // `%ArrayIteratorPrototype%.next` method
      // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
    },
    function () {
      var state = getInternalState$1$1(this);
      var target = state.target;
      var kind = state.kind;
      var index = state.index++;

      if (!target || index >= target.length) {
        state.target = undefined;
        return {
          value: undefined,
          done: true
        };
      }

      if (kind == 'keys')
        return {
          value: index,
          done: false
        };
      if (kind == 'values')
        return {
          value: target[index],
          done: false
        };
      return {
        value: [index, target[index]],
        done: false
      };
    },
    'values'
  ); // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject

  iterators$1.Arguments = iterators$1.Array; // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods

  var domIterables$1 = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };
  var TO_STRING_TAG$3$1 = wellKnownSymbol$1('toStringTag');

  for (var COLLECTION_NAME$1 in domIterables$1) {
    var Collection$1 = global_1$1[COLLECTION_NAME$1];
    var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;

    if (
      CollectionPrototype$1 &&
      classof$1(CollectionPrototype$1) !== TO_STRING_TAG$3$1
    ) {
      createNonEnumerableProperty$1(
        CollectionPrototype$1,
        TO_STRING_TAG$3$1,
        COLLECTION_NAME$1
      );
    }

    iterators$1[COLLECTION_NAME$1] = iterators$1.Array;
  }

  var $forEach$1$1 = forEach$2(arrayIteration$1);

  var STRICT_METHOD$1$1 = arrayMethodIsStrict$1('forEach'); // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach

  var arrayForEach$1 = !STRICT_METHOD$1$1
    ? function forEach(
        callbackfn
        /* , thisArg */
      ) {
        return $forEach$1$1(
          this,
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined
        ); // eslint-disable-next-line es/no-array-prototype-foreach -- safe
      }
    : forEach$2([]); // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe

  _export$1(
    {
      target: 'Array',
      proto: true,
      forced: forEach$2([]) != arrayForEach$1
    },
    {
      forEach: arrayForEach$1
    }
  );

  var forEach$3 = forEach$2(entryVirtual$1('Array'));

  var forEach$1$1 = forEach$3;
  var ArrayPrototype$4$1 = Array.prototype;
  var DOMIterables$3 = {
    DOMTokenList: true,
    NodeList: true
  };

  var forEach_1$1 = function forEach_1(it) {
    var own = forEach$2(it);

    return it === ArrayPrototype$4$1 ||
      (it instanceof Array && own === forEach$2(ArrayPrototype$4$1)) || // eslint-disable-next-line no-prototype-builtins -- safe
      DOMIterables$3.hasOwnProperty(classof$1(it))
      ? forEach$1$1
      : own;
  };

  var forEach$2$1 = forEach_1$1; // all object keys, includes non-enumerable and symbols

  var ownKeys$1 =
    getBuiltIn$1('Reflect', 'ownKeys') ||
    function ownKeys(it) {
      var keys = objectGetOwnPropertyNames$1.f(anObject$1(it));
      var getOwnPropertySymbols = objectGetOwnPropertySymbols$1.f;
      return getOwnPropertySymbols
        ? concat$2(keys).call(keys, getOwnPropertySymbols(it))
        : keys;
    }; // `Object.getOwnPropertyDescriptors` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors

  _export$1(
    {
      target: 'Object',
      stat: true,
      sham: !descriptors$1
    },
    {
      getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
        var O = toIndexedObject$1(object);
        var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor$1.f;
        var keys = ownKeys$1(O);
        var result = {};
        var index = 0;
        var key, descriptor;

        while (keys.length > index) {
          descriptor = getOwnPropertyDescriptor(O, (key = keys[index++]));
          if (descriptor !== undefined)
            createProperty$1(result, key, descriptor);
        }

        return result;
      }
    }
  );

  var getOwnPropertyDescriptors$3 = path$1.Object.getOwnPropertyDescriptors;
  var getOwnPropertyDescriptors$1$1 = getOwnPropertyDescriptors$3;
  var getOwnPropertyDescriptors$2$1 = getOwnPropertyDescriptors$1$1; // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties

  _export$1(
    {
      target: 'Object',
      stat: true,
      forced: !descriptors$1,
      sham: !descriptors$1
    },
    {
      defineProperties: objectDefineProperties$1
    }
  );

  var defineProperties_1$1 = createCommonjsModule$1(function (module) {
    var Object = path$1.Object;

    var defineProperties = (module.exports = function defineProperties(T, D) {
      return Object.defineProperties(T, D);
    });

    if (Object.defineProperties.sham) defineProperties.sham = true;
  });
  var defineProperties$2 = defineProperties_1$1;
  var defineProperties$1$1 = defineProperties$2; // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty

  _export$1(
    {
      target: 'Object',
      stat: true,
      forced: !descriptors$1,
      sham: !descriptors$1
    },
    {
      defineProperty: objectDefineProperty$1.f
    }
  );

  var defineProperty_1$1 = createCommonjsModule$1(function (module) {
    var Object = path$1.Object;

    var defineProperty = (module.exports = function defineProperty(
      it,
      key,
      desc
    ) {
      return Object.defineProperty(it, key, desc);
    });

    if (Object.defineProperty.sham) defineProperty.sham = true;
  });
  var defineProperty$3$1 = defineProperty_1$1;
  var defineProperty$4$1 = defineProperty$3$1;
  var defineProperty$5$1 = defineProperty$3$1;
  var defineProperty$6$1 = defineProperty$5$1;
  var defineProperty$7$1 = createCommonjsModule$1(function (module) {
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        defineProperty$6$1(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    module.exports = _defineProperty;
    (module.exports['default'] = module.exports),
      (module.exports.__esModule = true);
  });

  var _defineProperty$1 = unwrapExports$1(defineProperty$7$1);

  var $stringify$1$1 = getBuiltIn$1('JSON', 'stringify');
  var re$1 = /[\uD800-\uDFFF]/g;
  var low$1 = /^[\uD800-\uDBFF]$/;
  var hi$1 = /^[\uDC00-\uDFFF]$/;

  var fix$1 = function fix(match, offset, string) {
    var prev = string.charAt(offset - 1);
    var next = string.charAt(offset + 1);

    if (
      (low$1.test(match) && !hi$1.test(next)) ||
      (hi$1.test(match) && !low$1.test(prev))
    ) {
      return '\\u' + match.charCodeAt(0).toString(16);
    }

    return match;
  };

  var FORCED$2$1 = fails$1(function () {
    return (
      $stringify$1$1('\uDF06\uD834') !== '"\\udf06\\ud834"' ||
      $stringify$1$1('\uDEAD') !== '"\\udead"'
    );
  });

  if ($stringify$1$1) {
    // `JSON.stringify` method
    // https://tc39.es/ecma262/#sec-json.stringify
    // https://github.com/tc39/proposal-well-formed-stringify
    _export$1(
      {
        target: 'JSON',
        stat: true,
        forced: FORCED$2$1
      },
      {
        // eslint-disable-next-line no-unused-vars -- required for `.length`
        stringify: function stringify(it, replacer, space) {
          var result = $stringify$1$1.apply(null, arguments);
          return typeof result == 'string'
            ? result.replace(re$1, fix$1)
            : result;
        }
      }
    );
  } // eslint-disable-next-line es/no-json -- safe

  if (!path$1.JSON)
    path$1.JSON = {
      stringify: stringify$2
    }; // eslint-disable-next-line no-unused-vars -- required for `.length`

  var stringify$3 = function stringify(it, replacer, space) {
    return path$1.JSON.stringify.apply(null, arguments);
  };

  var stringify$1$1 = stringify$3;
  var stringify$2$1 = stringify$1$1; // a string of all valid unicode whitespaces

  var whitespaces$1 =
    '\t\n\x0B\f\r \xA0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
  var whitespace$1 = '[' + whitespaces$1 + ']';
  var ltrim$1 = RegExp('^' + whitespace$1 + whitespace$1 + '*');
  var rtrim$1 = RegExp(whitespace$1 + whitespace$1 + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

  var createMethod$2$1 = function createMethod$2(TYPE) {
    return function ($this) {
      var string = toString_1$1(requireObjectCoercible$1($this));
      if (TYPE & 1) string = string.replace(ltrim$1, '');
      if (TYPE & 2) string = string.replace(rtrim$1, '');
      return string;
    };
  };

  var stringTrim$1 = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod$2$1(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$2$1(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$2$1(3)
  };
  var non$1 = '\u200B\x85\u180E'; // check that a method works with the correct list
  // of whitespaces and has a correct name

  var stringTrimForced$1 = function stringTrimForced(METHOD_NAME) {
    return fails$1(function () {
      return (
        !!whitespaces$1[METHOD_NAME]() ||
        non$1[METHOD_NAME]() != non$1 ||
        whitespaces$1[METHOD_NAME].name !== METHOD_NAME
      );
    });
  };

  var $trim$1 = trim$3(stringTrim$1); // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim

  _export$1(
    {
      target: 'String',
      proto: true,
      forced: stringTrimForced$1('trim')
    },
    {
      trim: function trim() {
        return $trim$1(this);
      }
    }
  );

  var trim$5 = trim$3(entryVirtual$1('String'));

  var getOwnPropertyNames$4 = objectGetOwnPropertyNamesExternal$1.f; // eslint-disable-next-line es/no-object-getownpropertynames -- required for testing

  var FAILS_ON_PRIMITIVES$2$1 = fails$1(function () {
    return !getOwnPropertyNames$3(1);
  }); // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames

  _export$1(
    {
      target: 'Object',
      stat: true,
      forced: FAILS_ON_PRIMITIVES$2$1
    },
    {
      getOwnPropertyNames: getOwnPropertyNames$4
    }
  );

  var trim$1$1 = trim$3(stringTrim$1);

  var $parseFloat$1 = global_1$1.parseFloat;
  var FORCED$3$1 = 1 / $parseFloat$1(whitespaces$1 + '-0') !== -Infinity; // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string

  var numberParseFloat$1 = FORCED$3$1
    ? function parseFloat(string) {
        var trimmedString = trim$1$1(toString_1$1(string));
        var result = $parseFloat$1(trimmedString);
        return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
      }
    : $parseFloat$1; // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string

  _export$1(
    {
      global: true,
      forced: _parseFloat$2 != numberParseFloat$1
    },
    {
      parseFloat: numberParseFloat$1
    }
  );

  var _parseFloat$3 = path$1.parseFloat;
  var _parseFloat$1$1 = _parseFloat$3;
  var _parseFloat$2$1 = _parseFloat$1$1;

  var $map$1 = map$2(arrayIteration$1);

  var HAS_SPECIES_SUPPORT$2$1 = arrayMethodHasSpeciesSupport$1('map'); // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species

  _export$1(
    {
      target: 'Array',
      proto: true,
      forced: !HAS_SPECIES_SUPPORT$2$1
    },
    {
      map: function map(
        callbackfn
        /* , thisArg */
      ) {
        return $map$1(
          this,
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined
        );
      }
    }
  );

  var map$3 = map$2(entryVirtual$1('Array')); // `Array.isArray` method
  // https://tc39.es/ecma262/#sec-array.isarray

  _export$1(
    {
      target: 'Array',
      stat: true
    },
    {
      isArray: isArray$4
    }
  );

  var isArray$1$1 = path$1.Array.isArray;
  var isArray$2$1 = isArray$1$1;
  var isArray$3$1 = isArray$2$1;

  var slice$1$1 = slice$4(Array.prototype);

  var domWalk = iterativelyWalk;

  function iterativelyWalk(nodes, cb) {
    if (!('length' in nodes)) {
      nodes = [nodes];
    }

    nodes = slice$1$1.call(nodes);

    while (nodes.length) {
      var node = nodes.shift(),
        ret = cb(node);

      if (ret) {
        return ret;
      }

      if (node.childNodes && node.childNodes.length) {
        var _context10;

        nodes = concat$2((_context10 = slice$1$1.call(node.childNodes))).call(
          _context10,
          nodes
        );
      }
    }
  }

  var domComment = Comment;

  function Comment(data, owner) {
    if (!(this instanceof Comment)) {
      return new Comment(data, owner);
    }

    this.data = data;
    this.nodeValue = data;
    this.length = data.length;
    this.ownerDocument = owner || null;
  }

  Comment.prototype.nodeType = 8;
  Comment.prototype.nodeName = '#comment';

  Comment.prototype.toString = function _Comment_toString() {
    return '[object Comment]';
  };

  var domText = DOMText;

  function DOMText(value, owner) {
    if (!(this instanceof DOMText)) {
      return new DOMText(value);
    }

    this.data = value || '';
    this.length = this.data.length;
    this.ownerDocument = owner || null;
  }

  DOMText.prototype.type = 'DOMTextNode';
  DOMText.prototype.nodeType = 3;
  DOMText.prototype.nodeName = '#text';

  DOMText.prototype.toString = function _Text_toString() {
    return this.data;
  };

  DOMText.prototype.replaceData = function replaceData(index, length, value) {
    var current = this.data;
    var left = current.substring(0, index);
    var right = current.substring(index + length, current.length);
    this.data = left + value + right;
    this.length = this.data.length;
  };

  var dispatchEvent_1 = dispatchEvent$1;

  function dispatchEvent$1(ev) {
    var elem = this;
    var type = ev.type;

    if (!ev.target) {
      ev.target = elem;
    }

    if (!elem.listeners) {
      elem.listeners = {};
    }

    var listeners = elem.listeners[type];

    if (listeners) {
      return forEach$2(listeners).call(listeners, function (listener) {
        ev.currentTarget = elem;

        if (typeof listener === 'function') {
          listener(ev);
        } else {
          listener.handleEvent(ev);
        }
      });
    }

    if (elem.parentNode) {
      elem.parentNode.dispatchEvent(ev);
    }
  }

  var addEventListener_1 = addEventListener;

  function addEventListener(type, listener) {
    var _context11;

    var elem = this;

    if (!elem.listeners) {
      elem.listeners = {};
    }

    if (!elem.listeners[type]) {
      elem.listeners[type] = [];
    }

    if (
      indexOf$3((_context11 = elem.listeners[type])).call(
        _context11,
        listener
      ) === -1
    ) {
      elem.listeners[type].push(listener);
    }
  }

  var removeEventListener_1 = removeEventListener;

  function removeEventListener(type, listener) {
    var elem = this;

    if (!elem.listeners) {
      return;
    }

    if (!elem.listeners[type]) {
      return;
    }

    var list = elem.listeners[type];

    var index = indexOf$3(list).call(list, listener);

    if (index !== -1) {
      splice$2(list).call(list, index, 1);
    }
  }

  var serialize$1 = serializeNode;
  var voidElements = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'menuitem',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ];

  function serializeNode(node) {
    switch (node.nodeType) {
      case 3:
        return escapeText(node.data);

      case 8:
        return '<!--' + node.data + '-->';

      default:
        return serializeElement(node);
    }
  }

  function serializeElement(elem) {
    var strings = [];
    var tagname = elem.tagName;

    if (elem.namespaceURI === 'http://www.w3.org/1999/xhtml') {
      tagname = tagname.toLowerCase();
    }

    strings.push('<' + tagname + properties(elem) + datasetify(elem));

    if (indexOf$3(voidElements).call(voidElements, tagname) > -1) {
      strings.push(' />');
    } else {
      strings.push('>');

      if (elem.childNodes.length) {
        var _context12;

        strings.push.apply(
          strings,
          map$2((_context12 = elem.childNodes)).call(_context12, serializeNode)
        );
      } else if (elem.textContent || elem.innerText) {
        strings.push(escapeText(elem.textContent || elem.innerText));
      } else if (elem.innerHTML) {
        strings.push(elem.innerHTML);
      }

      strings.push('</' + tagname + '>');
    }

    return strings.join('');
  }

  function isProperty(elem, key) {
    var type = _typeof2(elem[key]);

    if (key === 'style' && keys$3(elem.style).length > 0) {
      return true;
    }

    return (
      elem.hasOwnProperty(key) &&
      (type === 'string' || type === 'boolean' || type === 'number') &&
      key !== 'nodeName' &&
      key !== 'className' &&
      key !== 'tagName' &&
      key !== 'textContent' &&
      key !== 'innerText' &&
      key !== 'namespaceURI' &&
      key !== 'innerHTML'
    );
  }

  function stylify(styles) {
    var _context13;

    if (typeof styles === 'string') return styles;
    var attr = '';

    forEach$2((_context13 = keys$3(styles))).call(_context13, function (key) {
      var value = styles[key];
      key = key.replace(/[A-Z]/g, function (c) {
        return '-' + c.toLowerCase();
      });
      attr += key + ':' + value + ';';
    });

    return attr;
  }

  function datasetify(elem) {
    var ds = elem.dataset;
    var props = [];

    for (var key in ds) {
      props.push({
        name: 'data-' + key,
        value: ds[key]
      });
    }

    return props.length ? stringify$3$1(props) : '';
  }

  function stringify$3$1(list) {
    var attributes = [];

    forEach$2(list).call(list, function (tuple) {
      var name = tuple.name;
      var value = tuple.value;

      if (name === 'style') {
        value = stylify(value);
      }

      attributes.push(name + '=' + '"' + escapeAttributeValue(value) + '"');
    });

    return attributes.length ? ' ' + attributes.join(' ') : '';
  }

  function properties(elem) {
    var props = [];

    for (var key in elem) {
      if (isProperty(elem, key)) {
        props.push({
          name: key,
          value: elem[key]
        });
      }
    }

    for (var ns in elem._attributes) {
      for (var attribute in elem._attributes[ns]) {
        var prop = elem._attributes[ns][attribute];
        var name = (prop.prefix ? prop.prefix + ':' : '') + attribute;
        props.push({
          name: name,
          value: prop.value
        });
      }
    }

    if (elem.className) {
      props.push({
        name: 'class',
        value: elem.className
      });
    }

    return props.length ? stringify$3$1(props) : '';
  }

  function escapeText(s) {
    var str = '';

    if (typeof s === 'string') {
      str = s;
    } else if (s) {
      str = s.toString();
    }

    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function escapeAttributeValue(str) {
    return escapeText(str).replace(/"/g, '&quot;');
  }

  var htmlns = 'http://www.w3.org/1999/xhtml';
  var domElement = DOMElement;

  function DOMElement(tagName, owner, namespace) {
    if (!(this instanceof DOMElement)) {
      return new DOMElement(tagName);
    }

    var ns = namespace === undefined ? htmlns : namespace || null;
    this.tagName = ns === htmlns ? String(tagName).toUpperCase() : tagName;
    this.nodeName = this.tagName;
    this.className = '';
    this.dataset = {};
    this.childNodes = [];
    this.parentNode = null;
    this.style = {};
    this.ownerDocument = owner || null;
    this.namespaceURI = ns;
    this._attributes = {};

    if (this.tagName === 'INPUT') {
      this.type = 'text';
    }
  }

  DOMElement.prototype.type = 'DOMElement';
  DOMElement.prototype.nodeType = 1;

  DOMElement.prototype.appendChild = function _Element_appendChild(child) {
    if (child.parentNode) {
      child.parentNode.removeChild(child);
    }

    this.childNodes.push(child);
    child.parentNode = this;
    return child;
  };

  DOMElement.prototype.replaceChild = function _Element_replaceChild(
    elem,
    needle
  ) {
    var _context14;

    // TODO: Throw NotFoundError if needle.parentNode !== this
    if (elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }

    var index = indexOf$3((_context14 = this.childNodes)).call(
      _context14,
      needle
    );

    needle.parentNode = null;
    this.childNodes[index] = elem;
    elem.parentNode = this;
    return needle;
  };

  DOMElement.prototype.removeChild = function _Element_removeChild(elem) {
    var _context15, _context16;

    // TODO: Throw NotFoundError if elem.parentNode !== this
    var index = indexOf$3((_context15 = this.childNodes)).call(
      _context15,
      elem
    );

    splice$2((_context16 = this.childNodes)).call(_context16, index, 1);

    elem.parentNode = null;
    return elem;
  };

  DOMElement.prototype.insertBefore = function _Element_insertBefore(
    elem,
    needle
  ) {
    var _context17;

    // TODO: Throw NotFoundError if referenceElement is a dom node
    // and parentNode !== this
    if (elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }

    var index =
      needle === null || needle === undefined
        ? -1
        : indexOf$3((_context17 = this.childNodes)).call(_context17, needle);

    if (index > -1) {
      var _context18;

      splice$2((_context18 = this.childNodes)).call(_context18, index, 0, elem);
    } else {
      this.childNodes.push(elem);
    }

    elem.parentNode = this;
    return elem;
  };

  DOMElement.prototype.setAttributeNS = function _Element_setAttributeNS(
    namespace,
    name,
    value
  ) {
    var prefix = null;
    var localName = name;

    var colonPosition = indexOf$3(name).call(name, ':');

    if (colonPosition > -1) {
      prefix = name.substr(0, colonPosition);
      localName = name.substr(colonPosition + 1);
    }

    if (this.tagName === 'INPUT' && name === 'type') {
      this.type = value;
    } else {
      var attributes =
        this._attributes[namespace] || (this._attributes[namespace] = {});
      attributes[localName] = {
        value: value,
        prefix: prefix
      };
    }
  };

  DOMElement.prototype.getAttributeNS = function _Element_getAttributeNS(
    namespace,
    name
  ) {
    var attributes = this._attributes[namespace];
    var value = attributes && attributes[name] && attributes[name].value;

    if (this.tagName === 'INPUT' && name === 'type') {
      return this.type;
    }

    if (typeof value !== 'string') {
      return null;
    }

    return value;
  };

  DOMElement.prototype.removeAttributeNS = function _Element_removeAttributeNS(
    namespace,
    name
  ) {
    var attributes = this._attributes[namespace];

    if (attributes) {
      delete attributes[name];
    }
  };

  DOMElement.prototype.hasAttributeNS = function _Element_hasAttributeNS(
    namespace,
    name
  ) {
    var attributes = this._attributes[namespace];
    return !!attributes && name in attributes;
  };

  DOMElement.prototype.setAttribute = function _Element_setAttribute(
    name,
    value
  ) {
    return this.setAttributeNS(null, name, value);
  };

  DOMElement.prototype.getAttribute = function _Element_getAttribute(name) {
    return this.getAttributeNS(null, name);
  };

  DOMElement.prototype.removeAttribute = function _Element_removeAttribute(
    name
  ) {
    return this.removeAttributeNS(null, name);
  };

  DOMElement.prototype.hasAttribute = function _Element_hasAttribute(name) {
    return this.hasAttributeNS(null, name);
  };

  DOMElement.prototype.removeEventListener = removeEventListener_1;
  DOMElement.prototype.addEventListener = addEventListener_1;
  DOMElement.prototype.dispatchEvent = dispatchEvent_1; // Un-implemented

  DOMElement.prototype.focus = function _Element_focus() {
    return void 0;
  };

  DOMElement.prototype.toString = function _Element_toString() {
    return serialize$1(this);
  };

  DOMElement.prototype.getElementsByClassName = function _Element_getElementsByClassName(
    classNames
  ) {
    var classes = classNames.split(' ');
    var elems = [];
    domWalk(this, function (node) {
      if (node.nodeType === 1) {
        var nodeClassName = node.className || '';
        var nodeClasses = nodeClassName.split(' ');

        if (
          every$2(classes).call(classes, function (item) {
            return indexOf$3(nodeClasses).call(nodeClasses, item) !== -1;
          })
        ) {
          elems.push(node);
        }
      }
    });
    return elems;
  };

  DOMElement.prototype.getElementsByTagName = function _Element_getElementsByTagName(
    tagName
  ) {
    tagName = tagName.toLowerCase();
    var elems = [];
    domWalk(this.childNodes, function (node) {
      if (
        node.nodeType === 1 &&
        (tagName === '*' || node.tagName.toLowerCase() === tagName)
      ) {
        elems.push(node);
      }
    });
    return elems;
  };

  DOMElement.prototype.contains = function _Element_contains(element) {
    return (
      domWalk(this, function (node) {
        return element === node;
      }) || false
    );
  };

  var domFragment = DocumentFragment;

  function DocumentFragment(owner) {
    if (!(this instanceof DocumentFragment)) {
      return new DocumentFragment();
    }

    this.childNodes = [];
    this.parentNode = null;
    this.ownerDocument = owner || null;
  }

  DocumentFragment.prototype.type = 'DocumentFragment';
  DocumentFragment.prototype.nodeType = 11;
  DocumentFragment.prototype.nodeName = '#document-fragment';
  DocumentFragment.prototype.appendChild = domElement.prototype.appendChild;
  DocumentFragment.prototype.replaceChild = domElement.prototype.replaceChild;
  DocumentFragment.prototype.removeChild = domElement.prototype.removeChild;

  DocumentFragment.prototype.toString = function _DocumentFragment_toString() {
    var _context19;

    return map$2((_context19 = this.childNodes))
      .call(_context19, function (node) {
        return String(node);
      })
      .join('');
  };

  var event = Event;

  function Event(family) {}

  Event.prototype.initEvent = function _Event_initEvent(
    type,
    bubbles,
    cancelable
  ) {
    this.type = type;
    this.bubbles = bubbles;
    this.cancelable = cancelable;
  };

  Event.prototype.preventDefault = function _Event_preventDefault() {};

  var document$2$1 = Document;

  function Document() {
    if (!(this instanceof Document)) {
      return new Document();
    }

    this.head = this.createElement('head');
    this.body = this.createElement('body');
    this.documentElement = this.createElement('html');
    this.documentElement.appendChild(this.head);
    this.documentElement.appendChild(this.body);
    this.childNodes = [this.documentElement];
    this.nodeType = 9;
  }

  var proto = Document.prototype;

  proto.createTextNode = function createTextNode(value) {
    return new domText(value, this);
  };

  proto.createElementNS = function createElementNS(namespace, tagName) {
    var ns = namespace === null ? null : String(namespace);
    return new domElement(tagName, this, ns);
  };

  proto.createElement = function createElement(tagName) {
    return new domElement(tagName, this);
  };

  proto.createDocumentFragment = function createDocumentFragment() {
    return new domFragment(this);
  };

  proto.createEvent = function createEvent(family) {
    return new event(family);
  };

  proto.createComment = function createComment(data) {
    return new domComment(data, this);
  };

  proto.getElementById = function getElementById(id) {
    id = String(id);
    var result = domWalk(this.childNodes, function (node) {
      if (String(node.id) === id) {
        return node;
      }
    });
    return result || null;
  };

  proto.getElementsByClassName = domElement.prototype.getElementsByClassName;
  proto.getElementsByTagName = domElement.prototype.getElementsByTagName;
  proto.contains = domElement.prototype.contains;
  proto.removeEventListener = removeEventListener_1;
  proto.addEventListener = addEventListener_1;
  proto.dispatchEvent = dispatchEvent_1;
  var minDocument = new document$2$1();
  var topLevel =
    typeof commonjsGlobal$1 !== 'undefined'
      ? commonjsGlobal$1
      : typeof window !== 'undefined'
      ? window
      : {};
  var doccy;

  if (typeof document !== 'undefined') {
    doccy = document;
  } else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
      doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDocument;
    }
  }

  var win;

  if (typeof window !== 'undefined') {
    win = window;
  } else if (typeof commonjsGlobal$1 !== 'undefined') {
    win = commonjsGlobal$1;
  } else if (typeof self !== 'undefined') {
    win = self;
  } else {
    win = {};
  }

  var window_1 = win; // This is the private tracking variable for the logging history.

  var history = [];
  /**
   * Log messages to the console and history based on the type of message
   *
   * @private
   * @param  {string} type
   *         The name of the console method to use.
   *
   * @param  {Array} args
   *         The arguments to be passed to the matching console method.
   */

  var LogByTypeFactory = function LogByTypeFactory(name, log) {
    return function (type, level, args) {
      var lvl = log.levels[level];
      var lvlRegExp = new RegExp('^('.concat(lvl, ')$'));

      if (type !== 'log') {
        // Add the type to the front of the message when it's not "log".
        args.unshift(type.toUpperCase() + ':');
      } // Add console prefix after adding to history.

      args.unshift(name + ':'); // Add a clone of the args at this point to history.

      if (history) {
        var _context;

        history.push(concat$2$1((_context = [])).call(_context, args)); // only store 1000 history entries

        var splice = history.length - 1000;
        splice$2$1(history).call(history, 0, splice > 0 ? splice : 0);
      } // If there's no console then don't try to output messages, but they will
      // still be stored in history.

      if (!window_1.console) {
        return;
      } // Was setting these once outside of this function, but containing them
      // in the function makes it easier to test cases where console doesn't exist
      // when the module is executed.

      var fn = window_1.console[type];

      if (!fn && type === 'debug') {
        // Certain browsers don't have support for console.debug. For those, we
        // should default to the closest comparable log.
        fn = window_1.console.info || window_1.console.log;
      } // Bail out if there's no console or if this type is not allowed by the
      // current logging level.

      if (!fn || !lvl || !lvlRegExp.test(type)) {
        return;
      }

      fn[isArray$3$1(args) ? 'apply' : 'call'](window_1.console, args);
    };
  };

  function createLogger(name) {
    // This is the private tracking variable for logging level.
    var level = 'info'; // the curried logByType bound to the specific log and history

    var logByType;
    /**
     * Logs plain debug messages. Similar to `console.log`.
     *
     * Due to [limitations](https://github.com/jsdoc3/jsdoc/issues/955#issuecomment-313829149)
     * of our JSDoc template, we cannot properly document this as both a function
     * and a namespace, so its function signature is documented here.
     *
     * #### Arguments
     * ##### *args
     * Mixed[]
     *
     * Any combination of values that could be passed to `console.log()`.
     *
     * #### Return Value
     *
     * `undefined`
     *
     * @namespace
     * @param    {Mixed[]} args
     *           One or more messages or objects that should be logged.
     */

    var log = function log() {
      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      logByType('log', level, args);
    }; // This is the logByType helper that the logging methods below use

    logByType = LogByTypeFactory(name, log);
    /**
     * Create a new sublogger which chains the old name to the new name.
     *
     * For example, doing `videojs.log.createLogger('player')` and then using that logger will log the following:
     * ```js
     *  mylogger('foo');
     *  // > VIDEOJS: player: foo
     * ```
     *
     * @param {string} name
     *        The name to add call the new logger
     * @return {Object}
     */

    log.createLogger = function (subname) {
      return createLogger(name + ': ' + subname);
    };
    /**
     * Enumeration of available logging levels, where the keys are the level names
     * and the values are `|`-separated strings containing logging methods allowed
     * in that logging level. These strings are used to create a regular expression
     * matching the function name being called.
     *
     * Levels provided by Video.js are:
     *
     * - `off`: Matches no calls. Any value that can be cast to `false` will have
     *   this effect. The most restrictive.
     * - `all`: Matches only Video.js-provided functions (`debug`, `log`,
     *   `log.warn`, and `log.error`).
     * - `debug`: Matches `log.debug`, `log`, `log.warn`, and `log.error` calls.
     * - `info` (default): Matches `log`, `log.warn`, and `log.error` calls.
     * - `warn`: Matches `log.warn` and `log.error` calls.
     * - `error`: Matches only `log.error` calls.
     *
     * @type {Object}
     */

    log.levels = {
      all: 'debug|log|warn|error',
      off: '',
      debug: 'debug|log|warn|error',
      info: 'log|warn|error',
      warn: 'warn|error',
      error: 'error',
      DEFAULT: level
    };
    /**
     * Get or set the current logging level.
     *
     * If a string matching a key from {@link module:log.levels} is provided, acts
     * as a setter.
     *
     * @param  {string} [lvl]
     *         Pass a valid level to set a new logging level.
     *
     * @return {string}
     *         The current logging level.
     */

    log.level = function (lvl) {
      if (typeof lvl === 'string') {
        if (!log.levels.hasOwnProperty(lvl)) {
          throw new Error('"'.concat(lvl, '" in not a valid log level'));
        }

        level = lvl;
      }

      return level;
    };
    /**
     * Returns an array containing everything that has been logged to the history.
     *
     * This array is a shallow clone of the internal history record. However, its
     * contents are _not_ cloned; so, mutating objects inside this array will
     * mutate them in history.
     *
     * @return {Array}
     */

    log.history = function () {
      var _context2;

      return history
        ? concat$2$1((_context2 = [])).call(_context2, history)
        : [];
    };
    /**
     * Allows you to filter the history by the given logger name
     *
     * @param {string} fname
     *        The name to filter by
     *
     * @return {Array}
     *         The filtered list to return
     */

    log.history.filter = function (fname) {
      var _context3;

      return filter$2$1((_context3 = history || [])).call(
        _context3,
        function (historyItem) {
          // if the first item in each historyItem includes `fname`, then it's a match
          return new RegExp('.*'.concat(fname, '.*')).test(historyItem[0]);
        }
      );
    };
    /**
     * Clears the internal history tracking, but does not prevent further history
     * tracking.
     */

    log.history.clear = function () {
      if (history) {
        history.length = 0;
      }
    };
    /**
     * Disable history tracking if it is currently enabled.
     */

    log.history.disable = function () {
      if (history !== null) {
        history.length = 0;
        history = null;
      }
    };
    /**
     * Enable history tracking if it is currently disabled.
     */

    log.history.enable = function () {
      if (history === null) {
        history = [];
      }
    };
    /**
     * Logs error messages. Similar to `console.error`.
     *
     * @param {Mixed[]} args
     *        One or more messages or objects that should be logged as an error
     */

    log.error = function () {
      for (
        var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        args[_key2] = arguments[_key2];
      }

      return logByType('error', level, args);
    };
    /**
     * Logs warning messages. Similar to `console.warn`.
     *
     * @param {Mixed[]} args
     *        One or more messages or objects that should be logged as a warning.
     */

    log.warn = function () {
      for (
        var _len3 = arguments.length, args = new Array(_len3), _key3 = 0;
        _key3 < _len3;
        _key3++
      ) {
        args[_key3] = arguments[_key3];
      }

      return logByType('warn', level, args);
    };
    /**
     * Logs debug messages. Similar to `console.debug`, but may also act as a comparable
     * log if `console.debug` is not available
     *
     * @param {Mixed[]} args
     *        One or more messages or objects that should be logged as debug.
     */

    log.debug = function () {
      for (
        var _len4 = arguments.length, args = new Array(_len4), _key4 = 0;
        _key4 < _len4;
        _key4++
      ) {
        args[_key4] = arguments[_key4];
      }

      return logByType('debug', level, args);
    };

    return log;
  }
  /**
   * @file log.js
   * @module log
   */

  var log = createLogger('VIDEOJS'); // empty

  var es_object_toString = /*#__PURE__*/ freeze$2({
    __proto__: null
  }); // `Symbol.asyncIterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.asynciterator

  defineWellKnownSymbol$1('asyncIterator'); // empty

  var es_symbol_description = /*#__PURE__*/ freeze$2({
    __proto__: null
  }); // `Symbol.hasInstance` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.hasinstance

  defineWellKnownSymbol$1('hasInstance'); // `Symbol.isConcatSpreadable` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.isconcatspreadable

  defineWellKnownSymbol$1('isConcatSpreadable'); // `Symbol.iterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.iterator

  defineWellKnownSymbol$1('iterator'); // `Symbol.match` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.match

  defineWellKnownSymbol$1('match'); // `Symbol.matchAll` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.matchall

  defineWellKnownSymbol$1('matchAll'); // `Symbol.replace` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.replace

  defineWellKnownSymbol$1('replace'); // `Symbol.search` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.search

  defineWellKnownSymbol$1('search'); // `Symbol.species` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.species

  defineWellKnownSymbol$1('species'); // `Symbol.split` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.split

  defineWellKnownSymbol$1('split'); // `Symbol.toPrimitive` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.toprimitive

  defineWellKnownSymbol$1('toPrimitive'); // `Symbol.toStringTag` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.tostringtag

  defineWellKnownSymbol$1('toStringTag'); // `Symbol.unscopables` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.unscopables

  defineWellKnownSymbol$1('unscopables'); // JSON[@@toStringTag] property
  // https://tc39.es/ecma262/#sec-json-@@tostringtag

  setToStringTag$1(global_1$1.JSON, 'JSON', true); // empty

  var es_math_toStringTag = /*#__PURE__*/ freeze$2({
    __proto__: null
  }); // empty

  var es_reflect_toStringTag = /*#__PURE__*/ freeze$2({
    __proto__: null
  });

  getCjsExportFromNamespace(es_object_toString);
  getCjsExportFromNamespace(es_symbol_description);
  getCjsExportFromNamespace(es_math_toStringTag);
  getCjsExportFromNamespace(es_reflect_toStringTag);
  var symbol$5 = path$1.Symbol;
  var symbol$1$1 = symbol$5; // `Symbol.asyncDispose` well-known symbol
  // https://github.com/tc39/proposal-using-statement

  defineWellKnownSymbol$1('asyncDispose'); // `Symbol.dispose` well-known symbol
  // https://github.com/tc39/proposal-using-statement

  defineWellKnownSymbol$1('dispose'); // `Symbol.matcher` well-known symbol
  // https://github.com/tc39/proposal-pattern-matching

  defineWellKnownSymbol$1('matcher'); // `Symbol.metadata` well-known symbol
  // https://github.com/tc39/proposal-decorators

  defineWellKnownSymbol$1('metadata'); // `Symbol.observable` well-known symbol
  // https://github.com/tc39/proposal-observable

  defineWellKnownSymbol$1('observable'); // TODO: remove from `core-js@4`
  // `Symbol.patternMatch` well-known symbol
  // https://github.com/tc39/proposal-pattern-matching

  defineWellKnownSymbol$1('patternMatch'); // TODO: remove from `core-js@4`

  defineWellKnownSymbol$1('replaceAll'); // TODO: Remove from `core-js@4`
  // TODO: Remove from `core-js@4`

  var symbol$2$1 = symbol$1$1;
  var symbol$3$1 = symbol$2$1; // `String.prototype.codePointAt` methods implementation

  var createMethod$3$1 = function createMethod$3(CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString_1$1(requireObjectCoercible$1($this));
      var position = toInteger$1(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size)
        return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xd800 ||
        first > 0xdbff ||
        position + 1 === size ||
        (second = S.charCodeAt(position + 1)) < 0xdc00 ||
        second > 0xdfff
        ? CONVERT_TO_STRING
          ? S.charAt(position)
          : first
        : CONVERT_TO_STRING
        ? slice$4(S).call(S, position, position + 2)
        : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
    };
  };

  var stringMultibyte$1 = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$3$1(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$3$1(true)
  };
  var charAt$1 = stringMultibyte$1.charAt;
  var STRING_ITERATOR$1 = 'String Iterator';
  var setInternalState$2$1 = internalState$1.set;
  var getInternalState$2$1 = internalState$1.getterFor(STRING_ITERATOR$1); // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator

  defineIterator$1(
    String,
    'String',
    function (iterated) {
      setInternalState$2$1(this, {
        type: STRING_ITERATOR$1,
        string: toString_1$1(iterated),
        index: 0
      }); // `%StringIteratorPrototype%.next` method
      // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
    },
    function next() {
      var state = getInternalState$2$1(this);
      var string = state.string;
      var index = state.index;
      var point;
      if (index >= string.length)
        return {
          value: undefined,
          done: true
        };
      point = charAt$1(string, index);
      state.index += point.length;
      return {
        value: point,
        done: false
      };
    }
  );
  var iterator$5 = wellKnownSymbolWrapped$1.f('iterator');
  var iterator$1$1 = iterator$5;
  var iterator$2$1 = iterator$1$1;
  var iterator$3$1 = iterator$2$1;

  var _typeof_1$1 = createCommonjsModule$1(function (module) {
    function _typeof(obj) {
      '@babel/helpers - typeof';

      if (
        typeof symbol$3$1 === 'function' &&
        typeof iterator$3$1 === 'symbol'
      ) {
        module.exports = _typeof = function _typeof(obj) {
          return typeof obj;
        };

        (module.exports['default'] = module.exports),
          (module.exports.__esModule = true);
      } else {
        module.exports = _typeof = function _typeof(obj) {
          return obj &&
            typeof symbol$3$1 === 'function' &&
            obj.constructor === symbol$3$1 &&
            obj !== symbol$3$1.prototype
            ? 'symbol'
            : typeof obj;
        };

        (module.exports['default'] = module.exports),
          (module.exports.__esModule = true);
      }

      return _typeof(obj);
    }

    module.exports = _typeof;
    (module.exports['default'] = module.exports),
      (module.exports.__esModule = true);
  });

  unwrapExports$1(_typeof_1$1); // `Array.prototype.{ reduce, reduceRight }` methods implementation

  var createMethod$4$1 = function createMethod$4(IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aFunction$1$1(callbackfn);
      var O = toObject$1(that);
      var self = indexedObject$1(O);
      var length = toLength$1(O.length);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2)
        while (true) {
          if (index in self) {
            memo = self[index];
            index += i;
            break;
          }

          index += i;

          if (IS_RIGHT ? index < 0 : length <= index) {
            throw TypeError('Reduce of empty array with no initial value');
          }
        }

      for (; IS_RIGHT ? index >= 0 : length > index; index += i) {
        if (index in self) {
          memo = callbackfn(memo, self[index], index, O);
        }
      }

      return memo;
    };
  };

  var arrayReduce$1 = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod$4$1(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$4$1(true)
  };
  var engineIsNode$1 = classofRaw$1(global_1$1.process) == 'process';
  var $reduce$1 = arrayReduce$1.left;
  var STRICT_METHOD$2$1 = arrayMethodIsStrict$1('reduce'); // Chrome 80-82 has a critical bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

  var CHROME_BUG$1 =
    !engineIsNode$1 && engineV8Version$1 > 79 && engineV8Version$1 < 83; // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce

  _export$1(
    {
      target: 'Array',
      proto: true,
      forced: !STRICT_METHOD$2$1 || CHROME_BUG$1
    },
    {
      reduce: function reduce(
        callbackfn
        /* , initialValue */
      ) {
        return $reduce$1(
          this,
          callbackfn,
          arguments.length,
          arguments.length > 1 ? arguments[1] : undefined
        );
      }
    }
  );

  var reduce$3 = reduce$2(entryVirtual$1('Array'));
  /**
   * Check if an event was a single left click.
   *
   * @param  {EventTarget~Event} event
   *         Event object.
   *
   * @return {boolean}
   *         Will be `true` if a single left click, `false` otherwise.
   */

  function isSingleLeftClick(event) {
    // Note: if you create something draggable, be sure to
    // call it on both `mousedown` and `mousemove` event,
    // otherwise `mousedown` should be enough for a button
    if (event.button === undefined && event.buttons === undefined) {
      // Why do we need `buttons` ?
      // Because, middle mouse sometimes have this:
      // e.button === 0 and e.buttons === 4
      // Furthermore, we want to prevent combination click, something like
      // HOLD middlemouse then left click, that would be
      // e.button === 0, e.buttons === 5
      // just `button` is not gonna work
      // Alright, then what this block does ?
      // this is for chrome `simulate mobile devices`
      // I want to support this as well
      return true;
    }

    if (event.button === 0 && event.buttons === undefined) {
      // Touch screen, sometimes on some specific device, `buttons`
      // doesn't have anything (safari on ios, blackberry...)
      return true;
    } // `mouseup` event on a single left click has
    // `button` and `buttons` equal to 0

    if (event.type === 'mouseup' && event.button === 0 && event.buttons === 0) {
      return true;
    }

    if (event.button !== 0 || event.buttons !== 1) {
      // This is the reason we have those if else block above
      // if any special case we can catch and let it slide
      // we do it above, when get to here, this definitely
      // is-not-left-click
      return false;
    }

    return true;
  }

  function startWith(str, startStr) {
    var reg = new RegExp('^'.concat(startStr));
    return reg.test(str);
  }

  function contains(str, containStr) {
    var reg = new RegExp(''.concat(containStr));
    return reg.test(str);
  }

  function getSourceType(url) {
    var types = {
      m3u8: 'application/x-mpegURL',
      mp4: 'video/mp4',
      flv: 'video/x-flv',
      rtmp: 'rtmp/flv'
    };
    var type = '';

    if (contains(url, '.m3u8')) {
      type = types['m3u8'];
    }

    if (contains(url, '.mp4')) {
      type = types['mp4'];
    }

    if (contains(url, '.flv')) {
      type = types['flv'];
    }

    if (contains(url, 'rtmp')) {
      type = types['rtmp'];
    }

    return type;
  }

  function ownKeys$1$1(object, enumerableOnly) {
    var keys = keys$2$1(object);

    if (getOwnPropertySymbols$2$1) {
      var symbols = getOwnPropertySymbols$2$1(object);

      if (enumerableOnly) {
        symbols = filter$2$1(symbols).call(symbols, function (sym) {
          return getOwnPropertyDescriptor$3$1(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        var _context;

        forEach$2$1((_context = ownKeys$1$1(Object(source), true))).call(
          _context,
          function (key) {
            _defineProperty$1(target, key, source[key]);
          }
        );
      } else if (getOwnPropertyDescriptors$2$1) {
        defineProperties$1$1(target, getOwnPropertyDescriptors$2$1(source));
      } else {
        var _context2;

        forEach$2$1((_context2 = ownKeys$1$1(Object(source)))).call(
          _context2,
          function (key) {
            defineProperty$4$1(
              target,
              key,
              getOwnPropertyDescriptor$3$1(source, key)
            );
          }
        );
      }
    }

    return target;
  }

  var dfApiSettings = {
    getRealplayUrl: {
      url: '/ylv/v1/realplay/${channelID}',
      method: 'POST'
    },
    getHistoryUrl: {
      url: '/ylv/v1/history/${channelID}',
      method: 'POST'
    },
    realplayKeepAlive: {
      url: '/ylv/v1/realplay/${sessionID}',
      method: 'PUT'
    },
    changePlayRate: {
      url: '/ylv/v1/history/${sessionID}',
      method: 'PUT'
    },
    jumpPlayTime: {
      url: '/ylv/v1/history/${sessionID}',
      method: 'PUT'
    },
    stopRealPlay: {
      url: '/ylv/v1/realplay/${sessionID}',
      method: 'DELETE'
    },
    stopHistory: {
      url: '/ylv/v1/history/${sessionID}',
      method: 'DELETE'
    }
  };
  /**
   *  跟云粒视频后台绑定的一些设置，回放使用hls视频流，
   *  拖动、倍速播放由后台接口控制
   *
   * @param YunliVjsPlayer 云粒播放器实例
   *
   */

  function yunliMixin(YunliVjsPlayer) {
    /**
     * @description: 支持接口地址可配置，根据类型获取接口地址
     * url中的参数仅支持${sessionID}和${channelID}两个，
     * 分别对应options中的channelID和source中的sessionID（接口中获取）
     *
     *
     * @param {string} type
     * realplayKeepAlive:
     * changePlayRate:
     * jumpPlayTime:
     * stopVideoPlay:
     *
     * @return {string} apiUrl
     */
    YunliVjsPlayer.prototype.getApiUrl = function (type) {
      var apiSettings = this.options_.apiSettings || dfApiSettings;
      var channelID = this.options_.channelID;
      var sources = this.options_.sources || this.player_.sources;

      if (sources && sources.length > 0 && sources[0].sessionID) {
        var sessionID = sources[0].sessionID;
        var apiUrl = Object.assign({}, apiSettings[type]);
        apiUrl.url = apiUrl.url.replace(/\$\{sessionID\}/g, sessionID);

        if (channelID) {
          apiUrl.url = apiUrl.url.replace(/\$\{channelID\}/g, channelID);
        }

        if (startWith(apiUrl.url, '/')) {
          apiUrl.url = this.options_.yunliApiRoot + apiUrl.url;
        }

        return apiUrl;
      }
    };
    /**
     * 实时视频保活
     */

    YunliVjsPlayer.prototype._keepAlive = function () {
      var _this = this;

      if (this._keepAliveTimer) {
        window.clearTimeout(this._keepAliveTimer);
      }

      var playUrlType = 'realplayKeepAlive';
      this._keepAliveTimer = setTimeout$1$1(function () {
        var sources = _this.options_.sources || _this.player_.sources;

        try {
          if (sources && sources.length > 0 && sources[0].sessionID) {
            var _this$options_, _this$options_$xhr;

            var sessionID = sources[0].sessionID;

            var api = _this.getApiUrl(playUrlType);

            var opt = _objectSpread(
              {
                // method: 'PUT',
                // url: `${this.options_.yunliApiRoot}/ylv/v1/realplay/${sessionID}`,
                withCredentials: true,
                json: true,
                headers: {
                  Accept: 'application/json'
                },
                body: {
                  sessionID: sessionID
                }
              },
              api
            );

            var this_ = _this; // 调用xhr中的beforeFetch钩子

            if (
              (_this$options_ = _this.options_) !== null &&
              _this$options_ !== void 0 &&
              (_this$options_$xhr = _this$options_.xhr) !== null &&
              _this$options_$xhr !== void 0 &&
              _this$options_$xhr.beforeFetch
            ) {
              opt = _this.options_.xhr.beforeFetch.call(
                _this,
                opt,
                playUrlType
              );
            }

            videojs.xhr(opt, function (error, resp) {
              var _this_$options_, _this_$options_$xhr;

              console.log('keepalive', error, resp); // 调用xhr中的afterFetch钩子

              if (
                (_this_$options_ = this_.options_) !== null &&
                _this_$options_ !== void 0 &&
                (_this_$options_$xhr = _this_$options_.xhr) !== null &&
                _this_$options_$xhr !== void 0 &&
                _this_$options_$xhr.afterFetch
              ) {
                resp = this_.options_.xhr.afterFetch.call(
                  this_,
                  resp,
                  playUrlType
                );
              }
              /*
	            if((error || resp.body.code !== 0) && sources[0].channelID){
	              this_._retryPlay.call(this_, sources[0].channelID)
	            }
	            */

              if (error || resp.statusCode !== 200) {
                console.log('keepalive error trigger');
                this_.player_.trigger('keepAliveError');
              } else {
              }

              this_._keepAlive();
            });
          }
        } catch (err) {
          console.error(err);
        }
      }, this._keepAliveInterval);
    };
    /**
     * 从新获取播放地址后播放
     * 主要场景是历史视频完成后，再次播放需要重新请求播放地址和sessionId
     */

    YunliVjsPlayer.prototype._refetchPlay = function (channelID) {
      var _this$options_2, _this$options_2$xhr;

      channelID = channelID || this.options_.channelID;

      if (this.isRetryingRequest) {
        return;
      }

      this.isRetryingRequest = true;
      var param = {
        channelID: channelID,
        outputType: this.options_.outputType
      };
      var playRate = this.options_.playRate || 1;

      if (playRate) {
        param.speed = playRate;
      }

      var playType = 'realplay';

      if (this.options_.yunliMode === 'history') {
        playType = 'history';
        param.beginTime = this.options_.beginTime;
        param.endTime = this.options_.endTime;
      }

      var playUrlType =
        playType === 'realplay' ? 'getRealplayUrl' : 'getHistoryUrl';
      var api = this.getApiUrl(playUrlType);

      var opt = _objectSpread(
        {
          // method: 'POST',
          // url: `${this.options_.yunliApiRoot}/ylv/v1/${playType}/${channelID}`,
          withCredentials: true,
          json: true,
          headers: {
            Accept: 'application/json'
          },
          body: param
        },
        api
      );

      var this_ = this; // 调用xhr中的beforeFetch钩子

      if (
        (_this$options_2 = this.options_) !== null &&
        _this$options_2 !== void 0 &&
        (_this$options_2$xhr = _this$options_2.xhr) !== null &&
        _this$options_2$xhr !== void 0 &&
        _this$options_2$xhr.beforeFetch
      ) {
        opt = this.options_.xhr.beforeFetch.call(this, opt, playUrlType);
      }

      videojs.xhr(opt, function (error, resp) {
        var _this_$options_2, _this_$options_2$xhr; // 调用xhr中的afterFetch钩子

        if (
          (_this_$options_2 = this_.options_) !== null &&
          _this_$options_2 !== void 0 &&
          (_this_$options_2$xhr = _this_$options_2.xhr) !== null &&
          _this_$options_2$xhr !== void 0 &&
          _this_$options_2$xhr.afterFetch
        ) {
          resp = this_.options_.xhr.afterFetch.call(this_, resp, playUrlType);
        }

        console.log('keepalive retry', error, resp);
        this_.isRetryingRequest = false;
        var types = {
          hls: 'application/x-mpegURL',
          mp4: 'video/mp4',
          flv: 'video/x-flv',
          rtmp: 'rtmp/flv'
        };
        var source = {
          src: resp.body.result.outputUrl,
          type: types[this_.options_.outputType] || '',
          sessionID: resp.body.result.sessionID,
          channelID: channelID
        };
        this_.src(source);
      });
    };
    /**
     * 切换播放倍率,走后台播放接口控制视频播放
     * 只有yunliMode='history’且duration>0的时候有效
     */

    YunliVjsPlayer.prototype._changePlayRate = function () {
      var rate = this.player_.playbackRate() || 1; // 如果options传入了changePlayRate函数，替换现有函数

      if (this.options_.changePlayRate) {
        this.options_.changePlayRate.call(this, rate, this.player_);
        return;
      }

      try {
        var _this$options_3, _this$options_3$xhr;

        var params = {
          ctrlType: 'play',
          param: ''.concat(rate)
        };
        var playUrlType = 'changePlayRate';
        var api = this.getAPiUrl(playUrlType);

        var opt = _objectSpread(
          {
            // method: 'PUT',
            // url: `${this.options_.yunliApiRoot}/ylv/v1/history/${this.options_
            //   .sources[0].sessionID || ''}`,
            withCredentials: true,
            json: true,
            headers: {
              Accept: 'application/json'
            },
            body: params
          },
          api
        ); // 调用xhr中的beforeFetch钩子

        if (
          (_this$options_3 = this.options_) !== null &&
          _this$options_3 !== void 0 &&
          (_this$options_3$xhr = _this$options_3.xhr) !== null &&
          _this$options_3$xhr !== void 0 &&
          _this$options_3$xhr.beforeFetch
        ) {
          opt = this.options_.xhr.beforeFetch.call(this, opt, playUrlType);
        }

        var this_ = this;
        videojs.xhr(opt, function (resp) {
          var _this_$options_3, _this_$options_3$xhr;

          console.log('resp', resp); // 调用xhr中的afterFetch钩子

          if (
            (_this_$options_3 = this_.options_) !== null &&
            _this_$options_3 !== void 0 &&
            (_this_$options_3$xhr = _this_$options_3.xhr) !== null &&
            _this_$options_3$xhr !== void 0 &&
            _this_$options_3$xhr.afterFetch
          ) {
            resp = this_.options_.xhr.afterFetch.call(this_, resp, playUrlType);
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    /**
     * 视频跳转到指定时间
     * 只有yunliMode='history’且duration>0的时候有效
     */

    YunliVjsPlayer.prototype._jumpVideoTime = function (time) {
      //this.player_.pause()
      // 如果options传入了jumpVideoTime函数，替换现有函数
      if (this.options_.jumpVideoTime) {
        this.options_.jumpVideoTime.call(this, time, this.player_);
        return;
      }

      try {
        var _this$options_4, _this$options_4$xhr;

        var params = {
          ctrlType: 'jump',
          param: ''.concat(time || 1)
        };
        var playUrlType = 'jumpPlayTime';
        var api = this.getApiUrl(playUrlType);

        var opt = _objectSpread(
          {
            // method: 'PUT',
            // url: `${this.options_.yunliApiRoot}/ylv/v1/history/${this.options_
            //   .sources[0].sessionID || ''}`,
            withCredentials: true,
            headers: {
              Accept: 'application/json'
            },
            body: stringify$2$1(params)
          },
          api
        );

        console.log('jum in sdk', params);
        var this_ = this; //this_.player_.currentTime(time)
        // 调用xhr中的beforeFetch钩子

        if (
          (_this$options_4 = this.options_) !== null &&
          _this$options_4 !== void 0 &&
          (_this$options_4$xhr = _this$options_4.xhr) !== null &&
          _this$options_4$xhr !== void 0 &&
          _this$options_4$xhr.beforeFetch
        ) {
          opt = this.options_.xhr.beforeFetch.call(this, opt, playUrlType);
        }

        videojs.xhr(opt, function (err, resp) {
          var _this_$options_4, _this_$options_4$xhr;

          console.log('resp', err, resp, this_); // 调用xhr中的afterFetch钩子

          if (
            (_this_$options_4 = this_.options_) !== null &&
            _this_$options_4 !== void 0 &&
            (_this_$options_4$xhr = _this_$options_4.xhr) !== null &&
            _this_$options_4$xhr !== void 0 &&
            _this_$options_4$xhr.afterFetch
          ) {
            resp = this_.options_.xhr.afterFetch.call(this_, resp, playUrlType);
          }

          var data = JSON.parse(resp.body);

          if (data.code === 0) {
            this_.src(this_.options_.sources);
            this_.ylJumpTime = time;
            this_.player_.one('play', function () {
              //this_.player_.currentTime(time)
              //this_.updateBarAfterJump()
            });
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    /**
     * 调用停止视频播放接口
     */

    YunliVjsPlayer.prototype._destroyVideo = function () {
      var sources = this.options_.sources || this.player_.sources;

      try {
        if (sources && sources.length > 0 && sources[0].sessionID) {
          var _this$options_5, _this$options_5$xhr;

          var sessionID = sources[0].sessionID;
          var mode = this.options_.mode === 'history' ? 'history' : 'realplay';
          var playUrlType = mode === 'history' ? 'stopHistory' : 'stopRealPlay';
          var api = this.getApiUrl(playUrlType);

          var opt = _objectSpread(
            {
              // method: 'DELETE',
              // url: `${this.options_.yunliApiRoot}/ylv/v1/${mode}/${sessionID}`,
              withCredentials: true,
              json: true,
              headers: {
                Accept: 'application/json'
              }
            },
            api
          ); // 调用xhr中的beforeFetch钩子

          if (
            (_this$options_5 = this.options_) !== null &&
            _this$options_5 !== void 0 &&
            (_this$options_5$xhr = _this$options_5.xhr) !== null &&
            _this$options_5$xhr !== void 0 &&
            _this$options_5$xhr.beforeFetch
          ) {
            opt = this.options_.xhr.beforeFetch.call(this, opt, playUrlType);
          }

          var this_ = this;
          videojs.xhr(opt, function (resp) {
            var _this_$options_5, _this_$options_5$xhr; // 调用xhr中的afterFetch钩子

            if (
              (_this_$options_5 = this_.options_) !== null &&
              _this_$options_5 !== void 0 &&
              (_this_$options_5$xhr = _this_$options_5.xhr) !== null &&
              _this_$options_5$xhr !== void 0 &&
              _this_$options_5$xhr.afterFetch
            ) {
              resp = this_.options_.xhr.afterFetch.call(
                this_,
                resp,
                playUrlType
              );
            }

            console.log('resp', resp);
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    /**
     * 更改进度条的默认事件，包括拖动和点击
     * 只有yunliMode='history’且duration>0的时候有效
     */

    YunliVjsPlayer.prototype.replaceControlBarEvent = function () {
      //视频进度条
      var progressControl = this.player_.controlBar.getChild('progressControl'); //视频进度条的拖动条

      var seekBar = progressControl.getChild('seekBar'); //已播放进度条

      var playProgressBar_ = progressControl.seekBar.getChild(
        'playProgressBar'
      );
      console.log('progressControl ', progressControl, this);
      var this_ = this; //历史视频处理跳播后时间展示问题

      playProgressBar_.update = function (seekBarRect, seekBarPoint) {
        var timeTooltip = this.getChild('timeTooltip');

        if (!timeTooltip) {
          return;
        }

        var time = this.player_.scrubbing()
          ? this.player_.getCache().currentTime
          : this.player_.currentTime();

        if (this_.isJumping) {
          time = this_.ylJumpTime || 0;
        } else {
          time = time + (this_.ylJumpTime || 0);
        }

        timeTooltip.updateTime(seekBarRect, seekBarPoint, time);
      };

      seekBar.getCurrentTime_ = function () {
        var time = this.player_.scrubbing()
          ? this.player_.getCache().currentTime
          : this.player_.currentTime();

        if (this_.isJumping) {
          time = this_.ylJumpTime || 0;
        } else {
          time = time + (this_.ylJumpTime || 0);
        }

        return time;
      };

      seekBar.handleMouseMove = function (event) {
        if (!isSingleLeftClick(event)) {
          return;
        }

        this_.isJumping = true;
        console.log('handleMouseMove', event);
        var newTime;
        var distance = this.calculateDistance(event);
        var liveTracker = this.player_.liveTracker;

        if (!liveTracker || !liveTracker.isLive()) {
          newTime = distance * this.player_.duration(); // Don't let video end while scrubbing.

          if (newTime === this.player_.duration()) {
            newTime = newTime - 0.1;
          }

          this_.ylJumpTime = Math.floor(newTime);
          var duration = this.player_.duration();
          var percent = ((newTime / duration) * 100).toFixed(2);
          playProgressBar_.el_.style.width = ''.concat(percent, '%');
        } else {
          if (distance >= 0.99) {
            liveTracker.seekToLiveEdge();
            return;
          }

          var seekableStart = liveTracker.seekableStart();
          var seekableEnd = liveTracker.liveCurrentTime();
          newTime = seekableStart + distance * liveTracker.liveWindow(); // Don't let video end while scrubbing.

          if (newTime >= seekableEnd) {
            newTime = seekableEnd;
          } // Compensate for precision differences so that currentTime is not less
          // than seekable start

          if (newTime <= seekableStart) {
            newTime = seekableStart + 0.1;
          } // On android seekableEnd can be Infinity sometimes,
          // this will cause newTime to be Infinity, which is
          // not a valid currentTime.

          console.log('newtime', newTime);

          if (newTime === Infinity) {
            return;
          }

          this_.ylJumpTime = Math.floor(newTime);

          var _duration = this.player_.duration();

          var _percent = ((newTime / _duration) * 100).toFixed(2);

          playProgressBar_.el_.style.width = ''.concat(_percent, '%');
        }
      }; //鼠标点击事件

      seekBar.on('click', function (event) {
        console.log('click', this_.ylJumpTime);

        if (event) {
          event.stopPropagation();
        }

        this_.jumpVideoTime(this_.ylJumpTime);
      });
    };
  }
  /**
   * 截屏功能
   *
   * @param YunliVjsPlayer
   *
   * @param width number 截屏宽度 默认视频的宽度
   *
   * @param height number 截屏高度 默认视频的高度
   *
   */

  function snapMixin(YunliVjsPlayer) {
    YunliVjsPlayer.prototype._addSnapButton = function () {
      var this_ = this;
      var snapOptions = this.options_.snap || {
        autoSave: true
      };
      var Button = videojs.getComponent('Button');
      var snapButton = videojs.extend(Button, {
        constructor: function constructor() {
          Button.apply(this, arguments);
          this.controlText('Snap');
        },
        handleClick: function handleClick() {
          var base64 = this_.getSnapShot();

          if (snapOptions.autoSave) {
            this_.saveImage(base64);
          } //截屏成功

          this_.snapSuccess(base64);
        },
        buildCSSClass: function buildCSSClass() {
          return 'vjs-yunli-snap vjs-control vjs-button';
        }
      });
      videojs.registerComponent('snapButton', snapButton);
    };

    YunliVjsPlayer.prototype.getSnapShot = function () {
      var snapOptions = this.options_.snap || {};
      console.log('snap button click 111', this);
      var this_ = this;

      try {
        var video = this.player_.el_.getElementsByTagName('video');

        if (video) {
          console.log('video', video);
          video = video[0];
        }

        var w = snapOptions.width || video.videoWidth || video.offsetWidth;
        var h = snapOptions.height || video.videoHeight || video.offsetHeight;
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, w, h);
        var base64 = canvas.toDataURL('images/png');
        console.log('img', this_);
        return base64;
      } catch (e) {
        this_.snapError(e);
        return e;
      }
    };

    YunliVjsPlayer.prototype.saveImage = function (base64) {
      var link = document.createElement('a');
      link.href = base64;
      link.download = ''.concat(new Date().getTime(), '.jpg');
      link.click();
    }; //截屏成功

    YunliVjsPlayer.prototype.snapSuccess = function (base64) {
      console.log('11111', this.options_);
      var snapOptions = this.options_.snap || {};

      if (snapOptions.onSuccess) {
        snapOptions.onSuccess(base64);
      }
    }; //截屏失败

    YunliVjsPlayer.prototype.snapError = function (err) {
      console.log('1111', err);
      var snapOptions = this.options_.snap || {};

      if (snapOptions.onError) {
        snapOptions.onError(err);
      }
    };
  }

  var ITERATOR$2$1 = wellKnownSymbol$1('iterator');
  var nativeUrl$1 = !fails$1(function () {
    var url = new url$2('b?a=1&b=2&c=3', 'http://a');
    var searchParams = url.searchParams;
    var result = '';
    url.pathname = 'c%20d';

    forEach$2(searchParams).call(searchParams, function (value, key) {
      searchParams['delete']('b');
      result += key + value;
    });

    return (
      (isPure$1 && !url.toJSON) ||
      !sort$2(searchParams) ||
      url.href !== 'http://a/c%20d?a=1&c=3' ||
      searchParams.get('c') !== '3' ||
      String(new urlSearchParams$2('?a=1')) !== 'a=1' ||
      !searchParams[ITERATOR$2$1] || // throws in Edge
      new url$2('https://a@b').username !== 'a' ||
      new urlSearchParams$2(new urlSearchParams$2('a=b')).get('a') !== 'b' || // not punycoded in Edge
      new url$2('http://тест').host !== 'xn--e1aybc' || // not escaped in Chrome 62-
      new url$2('http://a#б').hash !== '#%D0%B1' || // fails in Chrome 66-
      result !== 'a1c3' || // throws in Safari
      new url$2('http://x', undefined).host !== 'x'
    );
  });

  var anInstance$1 = function anInstance(it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    }

    return it;
  };

  var iteratorClose$1 = function iteratorClose(iterator) {
    var returnMethod = iterator['return'];

    if (returnMethod !== undefined) {
      return anObject$1(returnMethod.call(iterator)).value;
    }
  }; // call something on iterator step with safe closing on error

  var callWithSafeIterationClosing$1 = function callWithSafeIterationClosing(
    iterator,
    fn,
    value,
    ENTRIES
  ) {
    try {
      return ENTRIES ? fn(anObject$1(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose$1(iterator);
      throw error;
    }
  };

  var ITERATOR$3$1 = wellKnownSymbol$1('iterator');
  var ArrayPrototype$5$1 = Array.prototype; // check on default Array iterator

  var isArrayIteratorMethod$1 = function isArrayIteratorMethod(it) {
    return (
      it !== undefined &&
      (iterators$1.Array === it || ArrayPrototype$5$1[ITERATOR$3$1] === it)
    );
  };

  var ITERATOR$4$1 = wellKnownSymbol$1('iterator');

  var getIteratorMethod$1 = function getIteratorMethod(it) {
    if (it != undefined)
      return it[ITERATOR$4$1] || it['@@iterator'] || iterators$1[classof$1(it)];
  }; // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from

  var arrayFrom$1 = function from(
    arrayLike
    /* , mapfn = undefined, thisArg = undefined */
  ) {
    var O = toObject$1(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod$1(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    if (mapping)
      mapfn = functionBindContext$1(
        mapfn,
        argumentsLength > 2 ? arguments[2] : undefined,
        2
      ); // if the target is not iterable or it's an array with the default iterator - use a simple case

    if (
      iteratorMethod != undefined &&
      !(C == Array && isArrayIteratorMethod$1(iteratorMethod))
    ) {
      iterator = iteratorMethod.call(O);
      next = iterator.next;
      result = new C();

      for (; !(step = next.call(iterator)).done; index++) {
        value = mapping
          ? callWithSafeIterationClosing$1(
              iterator,
              mapfn,
              [step.value, index],
              true
            )
          : step.value;
        createProperty$1(result, index, value);
      }
    } else {
      length = toLength$1(O.length);
      result = new C(length);

      for (; length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty$1(result, index, value);
      }
    }

    result.length = index;
    return result;
  }; // based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js

  var maxInt$1 = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

  var base$1 = 36;
  var tMin$1 = 1;
  var tMax$1 = 26;
  var skew$1 = 38;
  var damp$1 = 700;
  var initialBias$1 = 72;
  var initialN$1 = 128; // 0x80

  var delimiter$1 = '-'; // '\x2D'

  var regexNonASCII$1 = /[^\0-\u007E]/; // non-ASCII chars

  var regexSeparators$1 = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

  var OVERFLOW_ERROR$1 = 'Overflow: input needs wider integers to process';
  var baseMinusTMin$1 = base$1 - tMin$1;
  var floor$1$1 = Math.floor;
  var stringFromCharCode$1 = String.fromCharCode;
  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   */

  var ucs2decode$1 = function ucs2decode(string) {
    var output = [];
    var counter = 0;
    var length = string.length;

    while (counter < length) {
      var value = string.charCodeAt(counter++);

      if (value >= 0xd800 && value <= 0xdbff && counter < length) {
        // It's a high surrogate, and there is a next character.
        var extra = string.charCodeAt(counter++);

        if ((extra & 0xfc00) == 0xdc00) {
          // Low surrogate.
          output.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
        } else {
          // It's an unmatched surrogate; only append this code unit, in case the
          // next code unit is the high surrogate of a surrogate pair.
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }

    return output;
  };
  /**
   * Converts a digit/integer into a basic code point.
   */

  var digitToBasic$1 = function digitToBasic(digit) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26);
  };
  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   */

  var adapt$1 = function adapt(delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor$1$1(delta / damp$1) : delta >> 1;
    delta += floor$1$1(delta / numPoints);

    for (; delta > (baseMinusTMin$1 * tMax$1) >> 1; k += base$1) {
      delta = floor$1$1(delta / baseMinusTMin$1);
    }

    return floor$1$1(k + ((baseMinusTMin$1 + 1) * delta) / (delta + skew$1));
  };
  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   */
  // eslint-disable-next-line max-statements -- TODO

  var encode$1 = function encode(input) {
    var output = []; // Convert the input in UCS-2 to an array of Unicode code points.

    input = ucs2decode$1(input); // Cache the length.

    var inputLength = input.length; // Initialize the state.

    var n = initialN$1;
    var delta = 0;
    var bias = initialBias$1;
    var i, currentValue; // Handle the basic code points.

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];

      if (currentValue < 0x80) {
        output.push(stringFromCharCode$1(currentValue));
      }
    }

    var basicLength = output.length; // number of basic code points.

    var handledCPCount = basicLength; // number of code points that have been handled;
    // Finish the basic string with a delimiter unless it's empty.

    if (basicLength) {
      output.push(delimiter$1);
    } // Main encoding loop:

    while (handledCPCount < inputLength) {
      // All non-basic code points < n have been handled already. Find the next larger one:
      var m = maxInt$1;

      for (i = 0; i < input.length; i++) {
        currentValue = input[i];

        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.

      var handledCPCountPlusOne = handledCPCount + 1;

      if (m - n > floor$1$1((maxInt$1 - delta) / handledCPCountPlusOne)) {
        throw RangeError(OVERFLOW_ERROR$1);
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (i = 0; i < input.length; i++) {
        currentValue = input[i];

        if (currentValue < n && ++delta > maxInt$1) {
          throw RangeError(OVERFLOW_ERROR$1);
        }

        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer.
          var q = delta;

          for (var k = base$1; ; k += base$1) {
            var t = k <= bias ? tMin$1 : k >= bias + tMax$1 ? tMax$1 : k - bias;
            if (q < t) break;
            var qMinusT = q - t;
            var baseMinusT = base$1 - t;
            output.push(
              stringFromCharCode$1(digitToBasic$1(t + (qMinusT % baseMinusT)))
            );
            q = floor$1$1(qMinusT / baseMinusT);
          }

          output.push(stringFromCharCode$1(digitToBasic$1(q)));
          bias = adapt$1(
            delta,
            handledCPCountPlusOne,
            handledCPCount == basicLength
          );
          delta = 0;
          ++handledCPCount;
        }
      }

      ++delta;
      ++n;
    }

    return output.join('');
  };

  var stringPunycodeToAscii$1 = function stringPunycodeToAscii(input) {
    var encoded = [];
    var labels = input.toLowerCase().replace(regexSeparators$1, '.').split('.');
    var i, label;

    for (i = 0; i < labels.length; i++) {
      label = labels[i];
      encoded.push(
        regexNonASCII$1.test(label) ? 'xn--' + encode$1(label) : label
      );
    }

    return encoded.join('.');
  };

  var redefineAll$1 = function redefineAll(target, src, options) {
    for (var key in src) {
      if (options && options.unsafe && target[key]) target[key] = src[key];
      else redefine$1(target, key, src[key], options);
    }

    return target;
  };

  var getIterator$1 = function getIterator(it) {
    var iteratorMethod = getIteratorMethod$1(it);

    if (typeof iteratorMethod != 'function') {
      throw TypeError(String(it) + ' is not iterable');
    }

    return anObject$1(iteratorMethod.call(it));
  }; // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

  var nativeFetch$1 = getBuiltIn$1('fetch');
  var NativeRequest$1 = getBuiltIn$1('Request');
  var RequestPrototype$1 = NativeRequest$1 && NativeRequest$1.prototype;
  var Headers$1 = getBuiltIn$1('Headers');
  var ITERATOR$5$1 = wellKnownSymbol$1('iterator');
  var URL_SEARCH_PARAMS$1 = 'URLSearchParams';
  var URL_SEARCH_PARAMS_ITERATOR$1 = URL_SEARCH_PARAMS$1 + 'Iterator';
  var setInternalState$3$1 = internalState$1.set;
  var getInternalParamsState$1 = internalState$1.getterFor(URL_SEARCH_PARAMS$1);
  var getInternalIteratorState$1 = internalState$1.getterFor(
    URL_SEARCH_PARAMS_ITERATOR$1
  );
  var plus$1 = /\+/g;
  var sequences$1 = Array(4);

  var percentSequence$1 = function percentSequence(bytes) {
    return (
      sequences$1[bytes - 1] ||
      (sequences$1[bytes - 1] = RegExp(
        '((?:%[\\da-f]{2}){' + bytes + '})',
        'gi'
      ))
    );
  };

  var percentDecode$1 = function percentDecode(sequence) {
    try {
      return decodeURIComponent(sequence);
    } catch (error) {
      return sequence;
    }
  };

  var deserialize$1 = function deserialize(it) {
    var result = it.replace(plus$1, ' ');
    var bytes = 4;

    try {
      return decodeURIComponent(result);
    } catch (error) {
      while (bytes) {
        result = result.replace(percentSequence$1(bytes--), percentDecode$1);
      }

      return result;
    }
  };

  var find$1 = /[!'()~]|%20/g;
  var replace$1 = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+'
  };

  var replacer$1 = function replacer(match) {
    return replace$1[match];
  };

  var serialize$1$1 = function serialize$1(it) {
    return encodeURIComponent(it).replace(find$1, replacer$1);
  };

  var parseSearchParams$1 = function parseSearchParams(result, query) {
    if (query) {
      var attributes = query.split('&');
      var index = 0;
      var attribute, entry;

      while (index < attributes.length) {
        attribute = attributes[index++];

        if (attribute.length) {
          entry = attribute.split('=');
          result.push({
            key: deserialize$1(entry.shift()),
            value: deserialize$1(entry.join('='))
          });
        }
      }
    }
  };

  var updateSearchParams$1 = function updateSearchParams(query) {
    entries$2(this).length = 0;
    parseSearchParams$1(entries$2(this), query);
  };

  var validateArgumentsLength$1 = function validateArgumentsLength(
    passed,
    required
  ) {
    if (passed < required) throw TypeError('Not enough arguments');
  };

  var URLSearchParamsIterator$1 = createIteratorConstructor$1(
    function Iterator(params, kind) {
      setInternalState$3$1(this, {
        type: URL_SEARCH_PARAMS_ITERATOR$1,
        iterator: getIterator$1(entries$2(getInternalParamsState$1(params))),
        kind: kind
      });
    },
    'Iterator',
    function next() {
      var state = getInternalIteratorState$1(this);
      var kind = state.kind;
      var step = state.iterator.next();
      var entry = step.value;

      if (!step.done) {
        step.value =
          kind === 'keys'
            ? entry.key
            : kind === 'values'
            ? entry.value
            : [entry.key, entry.value];
      }

      return step;
    }
  ); // `URLSearchParams` constructor
  // https://url.spec.whatwg.org/#interface-urlsearchparams

  var URLSearchParamsConstructor$1 = function URLSearchParams() {
    anInstance$1(this, URLSearchParamsConstructor$1, URL_SEARCH_PARAMS$1);
    var init = arguments.length > 0 ? arguments[0] : undefined;
    var that = this;
    var entries = [];
    var iteratorMethod,
      iterator,
      next,
      step,
      entryIterator,
      entryNext,
      first,
      second,
      key;
    setInternalState$3$1(that, {
      type: URL_SEARCH_PARAMS$1,
      entries: entries,
      updateURL: function updateURL() {
        /* empty */
      },
      updateSearchParams: updateSearchParams$1
    });

    if (init !== undefined) {
      if (isObject$1(init)) {
        iteratorMethod = getIteratorMethod$1(init);

        if (typeof iteratorMethod === 'function') {
          iterator = iteratorMethod.call(init);
          next = iterator.next;

          while (!(step = next.call(iterator)).done) {
            entryIterator = getIterator$1(anObject$1(step.value));
            entryNext = entryIterator.next;
            if (
              (first = entryNext.call(entryIterator)).done ||
              (second = entryNext.call(entryIterator)).done ||
              !entryNext.call(entryIterator).done
            )
              throw TypeError('Expected sequence with length 2');
            entries.push({
              key: toString_1$1(first.value),
              value: toString_1$1(second.value)
            });
          }
        } else {
          for (key in init) {
            if (has$2(init, key)) {
              entries.push({
                key: key,
                value: toString_1$1(init[key])
              });
            }
          }
        }  
      } else {
        parseSearchParams$1(
          entries,
          typeof init === 'string'
            ? init.charAt(0) === '?'
              ? slice$4(init).call(init, 1)
              : init
            : toString_1$1(init)
        );
      }
    }
  };

  var URLSearchParamsPrototype$1 = URLSearchParamsConstructor$1.prototype;
  redefineAll$1(
    URLSearchParamsPrototype$1,
    {
      // `URLSearchParams.prototype.append` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-append
      append: function append(name, value) {
        validateArgumentsLength$1(arguments.length, 2);
        var state = getInternalParamsState$1(this);

        entries$2(state).push({
          key: toString_1$1(name),
          value: toString_1$1(value)
        });

        state.updateURL();
      },
      // `URLSearchParams.prototype.delete` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
      delete: function _delete(name) {
        validateArgumentsLength$1(arguments.length, 1);
        var state = getInternalParamsState$1(this);

        var entries = entries$2(state);

        var key = toString_1$1(name);
        var index = 0;

        while (index < entries.length) {
          if (entries[index].key === key)
            splice$2(entries).call(entries, index, 1);
          else index++;
        }

        state.updateURL();
      },
      // `URLSearchParams.prototype.get` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-get
      get: function get(name) {
        validateArgumentsLength$1(arguments.length, 1);

        var entries = entries$2(getInternalParamsState$1(this));

        var key = toString_1$1(name);
        var index = 0;

        for (; index < entries.length; index++) {
          if (entries[index].key === key) return entries[index].value;
        }

        return null;
      },
      // `URLSearchParams.prototype.getAll` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
      getAll: function getAll(name) {
        validateArgumentsLength$1(arguments.length, 1);

        var entries = entries$2(getInternalParamsState$1(this));

        var key = toString_1$1(name);
        var result = [];
        var index = 0;

        for (; index < entries.length; index++) {
          if (entries[index].key === key) result.push(entries[index].value);
        }

        return result;
      },
      // `URLSearchParams.prototype.has` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-has
      has: function has(name) {
        validateArgumentsLength$1(arguments.length, 1);

        var entries = entries$2(getInternalParamsState$1(this));

        var key = toString_1$1(name);
        var index = 0;

        while (index < entries.length) {
          if (entries[index++].key === key) return true;
        }

        return false;
      },
      // `URLSearchParams.prototype.set` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-set
      set: function set(name, value) {
        validateArgumentsLength$1(arguments.length, 1);
        var state = getInternalParamsState$1(this);

        var entries = entries$2(state);

        var found = false;
        var key = toString_1$1(name);
        var val = toString_1$1(value);
        var index = 0;
        var entry;

        for (; index < entries.length; index++) {
          entry = entries[index];

          if (entry.key === key) {
            if (found) splice$2(entries).call(entries, index--, 1);
            else {
              found = true;
              entry.value = val;
            }
          }
        }

        if (!found)
          entries.push({
            key: key,
            value: val
          });
        state.updateURL();
      },
      // `URLSearchParams.prototype.sort` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
      sort: function sort() {
        var state = getInternalParamsState$1(this);

        var entries = entries$2(state); // Array#sort is not stable in some engines

        var slice = slice$4(entries).call(entries);

        var entry, entriesIndex, sliceIndex;
        entries.length = 0;

        for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
          entry = slice[sliceIndex];

          for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
            if (entries[entriesIndex].key > entry.key) {
              splice$2(entries).call(entries, entriesIndex, 0, entry);

              break;
            }
          }

          if (entriesIndex === sliceIndex) entries.push(entry);
        }

        state.updateURL();
      },
      // `URLSearchParams.prototype.forEach` method
      forEach: function forEach(
        callback
        /* , thisArg */
      ) {
        var entries = entries$2(getInternalParamsState$1(this));

        var boundFunction = functionBindContext$1(
          callback,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        );
        var index = 0;
        var entry;

        while (index < entries.length) {
          entry = entries[index++];
          boundFunction(entry.value, entry.key, this);
        }
      },
      // `URLSearchParams.prototype.keys` method
      keys: function keys() {
        return new URLSearchParamsIterator$1(this, 'keys');
      },
      // `URLSearchParams.prototype.values` method
      values: function values() {
        return new URLSearchParamsIterator$1(this, 'values');
      },
      // `URLSearchParams.prototype.entries` method
      entries: function entries() {
        return new URLSearchParamsIterator$1(this, 'entries');
      }
    },
    {
      enumerable: true
    }
  ); // `URLSearchParams.prototype[@@iterator]` method

  redefine$1(
    URLSearchParamsPrototype$1,
    ITERATOR$5$1,
    entries$2(URLSearchParamsPrototype$1)
  ); // `URLSearchParams.prototype.toString` method
  // https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior

  redefine$1(
    URLSearchParamsPrototype$1,
    'toString',
    function toString() {
      var entries = entries$2(getInternalParamsState$1(this));

      var result = [];
      var index = 0;
      var entry;

      while (index < entries.length) {
        entry = entries[index++];
        result.push(
          serialize$1$1(entry.key) + '=' + serialize$1$1(entry.value)
        );
      }

      return result.join('&');
    },
    {
      enumerable: true
    }
  );
  setToStringTag$1(URLSearchParamsConstructor$1, URL_SEARCH_PARAMS$1);

  _export$1(
    {
      global: true,
      forced: !nativeUrl$1
    },
    {
      URLSearchParams: URLSearchParamsConstructor$1
    }
  ); // Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`

  if (!nativeUrl$1 && typeof Headers$1 == 'function') {
    var wrapRequestOptions$1 = function wrapRequestOptions(init) {
      if (isObject$1(init)) {
        var body = init.body;
        var headers;

        if (classof$1(body) === URL_SEARCH_PARAMS$1) {
          headers = init.headers
            ? new Headers$1(init.headers)
            : new Headers$1();

          if (!headers.has('content-type')) {
            headers.set(
              'content-type',
              'application/x-www-form-urlencoded;charset=UTF-8'
            );
          }

          return objectCreate$1(init, {
            body: createPropertyDescriptor$1(0, String(body)),
            headers: createPropertyDescriptor$1(0, headers)
          });
        }
      }

      return init;
    };

    if (typeof nativeFetch$1 == 'function') {
      _export$1(
        {
          global: true,
          enumerable: true,
          forced: true
        },
        {
          fetch: function fetch(
            input
            /* , init */
          ) {
            return nativeFetch$1(
              input,
              arguments.length > 1 ? wrapRequestOptions$1(arguments[1]) : {}
            );
          }
        }
      );
    }

    if (typeof NativeRequest$1 == 'function') {
      var RequestConstructor$1 = function Request(
        input
        /* , init */
      ) {
        anInstance$1(this, RequestConstructor$1, 'Request');
        return new NativeRequest$1(
          input,
          arguments.length > 1 ? wrapRequestOptions$1(arguments[1]) : {}
        );
      };

      RequestPrototype$1.constructor = RequestConstructor$1;
      RequestConstructor$1.prototype = RequestPrototype$1;

      _export$1(
        {
          global: true,
          forced: true
        },
        {
          Request: RequestConstructor$1
        }
      );
    }
  }

  var web_urlSearchParams$1 = {
    URLSearchParams: URLSearchParamsConstructor$1,
    getState: getInternalParamsState$1
  }; // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

  var codeAt$1 = stringMultibyte$1.codeAt;
  var NativeURL$1 = global_1$1.URL;
  var URLSearchParams$1$1 = web_urlSearchParams$1.URLSearchParams;
  var getInternalSearchParamsState$1 = web_urlSearchParams$1.getState;
  var setInternalState$4$1 = internalState$1.set;
  var getInternalURLState$1 = internalState$1.getterFor('URL');
  var floor$2$1 = Math.floor;
  var pow$1 = Math.pow;
  var INVALID_AUTHORITY$1 = 'Invalid authority';
  var INVALID_SCHEME$1 = 'Invalid scheme';
  var INVALID_HOST$1 = 'Invalid host';
  var INVALID_PORT$1 = 'Invalid port';
  var ALPHA$1 = /[A-Za-z]/; // eslint-disable-next-line regexp/no-obscure-range -- safe

  var ALPHANUMERIC$1 = /[\d+-.A-Za-z]/;
  var DIGIT$1 = /\d/;
  var HEX_START$1 = /^0x/i;
  var OCT$1 = /^[0-7]+$/;
  var DEC$1 = /^\d+$/;
  var HEX$1 = /^[\dA-Fa-f]+$/;
  /* eslint-disable no-control-regex -- safe */

  var FORBIDDEN_HOST_CODE_POINT$1 = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
  var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT$1 = /[\0\t\n\r #/:<>?@[\\\]^|]/;
  var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE$1 = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
  var TAB_AND_NEW_LINE$1 = /[\t\n\r]/g;
  /* eslint-enable no-control-regex -- safe */

  var EOF$1;

  var parseHost$1 = function parseHost(url, input) {
    var result, codePoints, index;

    if (input.charAt(0) == '[') {
      if (input.charAt(input.length - 1) != ']') return INVALID_HOST$1;
      result = parseIPv6$1(slice$4(input).call(input, 1, -1));
      if (!result) return INVALID_HOST$1;
      url.host = result; // opaque host
    } else if (!isSpecial$1(url)) {
      if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT$1.test(input))
        return INVALID_HOST$1;
      result = '';
      codePoints = arrayFrom$1(input);

      for (index = 0; index < codePoints.length; index++) {
        result += percentEncode$1(
          codePoints[index],
          C0ControlPercentEncodeSet$1
        );
      }

      url.host = result;
    } else {
      input = stringPunycodeToAscii$1(input);
      if (FORBIDDEN_HOST_CODE_POINT$1.test(input)) return INVALID_HOST$1;
      result = parseIPv4$1(input);
      if (result === null) return INVALID_HOST$1;
      url.host = result;
    }
  };

  var parseIPv4$1 = function parseIPv4(input) {
    var parts = input.split('.');
    var partsLength, numbers, index, part, radix, number, ipv4;

    if (parts.length && parts[parts.length - 1] == '') {
      parts.pop();
    }

    partsLength = parts.length;
    if (partsLength > 4) return input;
    numbers = [];

    for (index = 0; index < partsLength; index++) {
      part = parts[index];
      if (part == '') return input;
      radix = 10;

      if (part.length > 1 && part.charAt(0) == '0') {
        radix = HEX_START$1.test(part) ? 16 : 8;
        part = slice$4(part).call(part, radix == 8 ? 1 : 2);
      }

      if (part === '') {
        number = 0;
      } else {
        if (!(radix == 10 ? DEC$1 : radix == 8 ? OCT$1 : HEX$1).test(part))
          return input;
        number = _parseInt$2(part, radix);
      }

      numbers.push(number);
    }

    for (index = 0; index < partsLength; index++) {
      number = numbers[index];

      if (index == partsLength - 1) {
        if (number >= pow$1(256, 5 - partsLength)) return null;
      } else if (number > 255) return null;
    }

    ipv4 = numbers.pop();

    for (index = 0; index < numbers.length; index++) {
      ipv4 += numbers[index] * pow$1(256, 3 - index);
    }

    return ipv4;
  }; // eslint-disable-next-line max-statements -- TODO

  var parseIPv6$1 = function parseIPv6(input) {
    var address = [0, 0, 0, 0, 0, 0, 0, 0];
    var pieceIndex = 0;
    var compress = null;
    var pointer = 0;
    var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

    var _char = function _char() {
      return input.charAt(pointer);
    };

    if (_char() == ':') {
      if (input.charAt(1) != ':') return;
      pointer += 2;
      pieceIndex++;
      compress = pieceIndex;
    }

    while (_char()) {
      if (pieceIndex == 8) return;

      if (_char() == ':') {
        if (compress !== null) return;
        pointer++;
        pieceIndex++;
        compress = pieceIndex;
        continue;
      }

      value = length = 0;

      while (length < 4 && HEX$1.test(_char())) {
        value = value * 16 + _parseInt$2(_char(), 16);
        pointer++;
        length++;
      }

      if (_char() == '.') {
        if (length == 0) return;
        pointer -= length;
        if (pieceIndex > 6) return;
        numbersSeen = 0;

        while (_char()) {
          ipv4Piece = null;

          if (numbersSeen > 0) {
            if (_char() == '.' && numbersSeen < 4) pointer++;
            else return;
          }

          if (!DIGIT$1.test(_char())) return;

          while (DIGIT$1.test(_char())) {
            number = _parseInt$2(_char(), 10);
            if (ipv4Piece === null) ipv4Piece = number;
            else if (ipv4Piece == 0) return;
            else ipv4Piece = ipv4Piece * 10 + number;
            if (ipv4Piece > 255) return;
            pointer++;
          }

          address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
          numbersSeen++;
          if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
        }

        if (numbersSeen != 4) return;
        break;
      } else if (_char() == ':') {
        pointer++;
        if (!_char()) return;
      } else if (_char()) return;

      address[pieceIndex++] = value;
    }

    if (compress !== null) {
      swaps = pieceIndex - compress;
      pieceIndex = 7;

      while (pieceIndex != 0 && swaps > 0) {
        swap = address[pieceIndex];
        address[pieceIndex--] = address[compress + swaps - 1];
        address[compress + --swaps] = swap;
      }
    } else if (pieceIndex != 8) return;

    return address;
  };

  var findLongestZeroSequence$1 = function findLongestZeroSequence(ipv6) {
    var maxIndex = null;
    var maxLength = 1;
    var currStart = null;
    var currLength = 0;
    var index = 0;

    for (; index < 8; index++) {
      if (ipv6[index] !== 0) {
        if (currLength > maxLength) {
          maxIndex = currStart;
          maxLength = currLength;
        }

        currStart = null;
        currLength = 0;
      } else {
        if (currStart === null) currStart = index;
        ++currLength;
      }
    }

    if (currLength > maxLength) {
      maxIndex = currStart;
      maxLength = currLength;
    }

    return maxIndex;
  };

  var serializeHost$1 = function serializeHost(host) {
    var result, index, compress, ignore0; // ipv4

    if (typeof host == 'number') {
      result = [];

      for (index = 0; index < 4; index++) {
        result.unshift(host % 256);
        host = floor$2$1(host / 256);
      }

      return result.join('.'); // ipv6
    } else if (_typeof2(host) == 'object') {
      result = '';
      compress = findLongestZeroSequence$1(host);

      for (index = 0; index < 8; index++) {
        if (ignore0 && host[index] === 0) continue;
        if (ignore0) ignore0 = false;

        if (compress === index) {
          result += index ? ':' : '::';
          ignore0 = true;
        } else {
          result += host[index].toString(16);
          if (index < 7) result += ':';
        }
      }

      return '[' + result + ']';
    }

    return host;
  };

  var C0ControlPercentEncodeSet$1 = {};
  var fragmentPercentEncodeSet$1 = objectAssign$1(
    {},
    C0ControlPercentEncodeSet$1,
    {
      ' ': 1,
      '"': 1,
      '<': 1,
      '>': 1,
      '`': 1
    }
  );
  var pathPercentEncodeSet$1 = objectAssign$1({}, fragmentPercentEncodeSet$1, {
    '#': 1,
    '?': 1,
    '{': 1,
    '}': 1
  });
  var userinfoPercentEncodeSet$1 = objectAssign$1({}, pathPercentEncodeSet$1, {
    '/': 1,
    ':': 1,
    ';': 1,
    '=': 1,
    '@': 1,
    '[': 1,
    '\\': 1,
    ']': 1,
    '^': 1,
    '|': 1
  });

  var percentEncode$1 = function percentEncode(_char2, set) {
    var code = codeAt$1(_char2, 0);
    return code > 0x20 && code < 0x7f && !has$2(set, _char2)
      ? _char2
      : encodeURIComponent(_char2);
  };

  var specialSchemes$1 = {
    ftp: 21,
    file: null,
    http: 80,
    https: 443,
    ws: 80,
    wss: 443
  };

  var isSpecial$1 = function isSpecial(url) {
    return has$2(specialSchemes$1, url.scheme);
  };

  var includesCredentials$1 = function includesCredentials(url) {
    return url.username != '' || url.password != '';
  };

  var cannotHaveUsernamePasswordPort$1 = function cannotHaveUsernamePasswordPort(
    url
  ) {
    return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
  };

  var isWindowsDriveLetter$1 = function isWindowsDriveLetter(
    string,
    normalized
  ) {
    var second;
    return (
      string.length == 2 &&
      ALPHA$1.test(string.charAt(0)) &&
      ((second = string.charAt(1)) == ':' || (!normalized && second == '|'))
    );
  };

  var startsWithWindowsDriveLetter$1 = function startsWithWindowsDriveLetter(
    string
  ) {
    var third;
    return (
      string.length > 1 &&
      isWindowsDriveLetter$1(slice$4(string).call(string, 0, 2)) &&
      (string.length == 2 ||
        (third = string.charAt(2)) === '/' ||
        third === '\\' ||
        third === '?' ||
        third === '#')
    );
  };

  var shortenURLsPath$1 = function shortenURLsPath(url) {
    var path = url.path;
    var pathSize = path.length;

    if (
      pathSize &&
      (url.scheme != 'file' ||
        pathSize != 1 ||
        !isWindowsDriveLetter$1(path[0], true))
    ) {
      path.pop();
    }
  };

  var isSingleDot$1 = function isSingleDot(segment) {
    return segment === '.' || segment.toLowerCase() === '%2e';
  };

  var isDoubleDot$1 = function isDoubleDot(segment) {
    segment = segment.toLowerCase();
    return (
      segment === '..' ||
      segment === '%2e.' ||
      segment === '.%2e' ||
      segment === '%2e%2e'
    );
  }; // States:

  var SCHEME_START$1 = {};
  var SCHEME$1 = {};
  var NO_SCHEME$1 = {};
  var SPECIAL_RELATIVE_OR_AUTHORITY$1 = {};
  var PATH_OR_AUTHORITY$1 = {};
  var RELATIVE$1 = {};
  var RELATIVE_SLASH$1 = {};
  var SPECIAL_AUTHORITY_SLASHES$1 = {};
  var SPECIAL_AUTHORITY_IGNORE_SLASHES$1 = {};
  var AUTHORITY$1 = {};
  var HOST$1 = {};
  var HOSTNAME$1 = {};
  var PORT$1 = {};
  var FILE$1 = {};
  var FILE_SLASH$1 = {};
  var FILE_HOST$1 = {};
  var PATH_START$1 = {};
  var PATH$1 = {};
  var CANNOT_BE_A_BASE_URL_PATH$1 = {};
  var QUERY$1 = {};
  var FRAGMENT$1 = {}; // eslint-disable-next-line max-statements -- TODO

  var parseURL$1 = function parseURL(url, input, stateOverride, base) {
    var state = stateOverride || SCHEME_START$1;
    var pointer = 0;
    var buffer = '';
    var seenAt = false;
    var seenBracket = false;
    var seenPasswordToken = false;

    var codePoints, _char3, bufferCodePoints, failure;

    if (!stateOverride) {
      url.scheme = '';
      url.username = '';
      url.password = '';
      url.host = null;
      url.port = null;
      url.path = [];
      url.query = null;
      url.fragment = null;
      url.cannotBeABaseURL = false;
      input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE$1, '');
    }

    input = input.replace(TAB_AND_NEW_LINE$1, '');
    codePoints = arrayFrom$1(input);

    while (pointer <= codePoints.length) {
      _char3 = codePoints[pointer];

      switch (state) {
        case SCHEME_START$1:
          if (_char3 && ALPHA$1.test(_char3)) {
            buffer += _char3.toLowerCase();
            state = SCHEME$1;
          } else if (!stateOverride) {
            state = NO_SCHEME$1;
            continue;
          } else return INVALID_SCHEME$1;

          break;

        case SCHEME$1:
          if (
            _char3 &&
            (ALPHANUMERIC$1.test(_char3) ||
              _char3 == '+' ||
              _char3 == '-' ||
              _char3 == '.')
          ) {
            buffer += _char3.toLowerCase();
          } else if (_char3 == ':') {
            if (
              stateOverride &&
              (isSpecial$1(url) != has$2(specialSchemes$1, buffer) ||
                (buffer == 'file' &&
                  (includesCredentials$1(url) || url.port !== null)) ||
                (url.scheme == 'file' && !url.host))
            )
              return;
            url.scheme = buffer;

            if (stateOverride) {
              if (isSpecial$1(url) && specialSchemes$1[url.scheme] == url.port)
                url.port = null;
              return;
            }

            buffer = '';

            if (url.scheme == 'file') {
              state = FILE$1;
            } else if (isSpecial$1(url) && base && base.scheme == url.scheme) {
              state = SPECIAL_RELATIVE_OR_AUTHORITY$1;
            } else if (isSpecial$1(url)) {
              state = SPECIAL_AUTHORITY_SLASHES$1;
            } else if (codePoints[pointer + 1] == '/') {
              state = PATH_OR_AUTHORITY$1;
              pointer++;
            } else {
              url.cannotBeABaseURL = true;
              url.path.push('');
              state = CANNOT_BE_A_BASE_URL_PATH$1;
            }
          } else if (!stateOverride) {
            buffer = '';
            state = NO_SCHEME$1;
            pointer = 0;
            continue;
          } else return INVALID_SCHEME$1;

          break;

        case NO_SCHEME$1:
          if (!base || (base.cannotBeABaseURL && _char3 != '#'))
            return INVALID_SCHEME$1;

          if (base.cannotBeABaseURL && _char3 == '#') {
            var _context20;

            url.scheme = base.scheme;
            url.path = slice$4((_context20 = base.path)).call(_context20);
            url.query = base.query;
            url.fragment = '';
            url.cannotBeABaseURL = true;
            state = FRAGMENT$1;
            break;
          }

          state = base.scheme == 'file' ? FILE$1 : RELATIVE$1;
          continue;

        case SPECIAL_RELATIVE_OR_AUTHORITY$1:
          if (_char3 == '/' && codePoints[pointer + 1] == '/') {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES$1;
            pointer++;
          } else {
            state = RELATIVE$1;
            continue;
          }

          break;

        case PATH_OR_AUTHORITY$1:
          if (_char3 == '/') {
            state = AUTHORITY$1;
            break;
          } else {
            state = PATH$1;
            continue;
          }

        case RELATIVE$1:
          url.scheme = base.scheme;

          if (_char3 == EOF$1) {
            var _context21;

            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = slice$4((_context21 = base.path)).call(_context21);
            url.query = base.query;
          } else if (_char3 == '/' || (_char3 == '\\' && isSpecial$1(url))) {
            state = RELATIVE_SLASH$1;
          } else if (_char3 == '?') {
            var _context22;

            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = slice$4((_context22 = base.path)).call(_context22);
            url.query = '';
            state = QUERY$1;
          } else if (_char3 == '#') {
            var _context23;

            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = slice$4((_context23 = base.path)).call(_context23);
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT$1;
          } else {
            var _context24;

            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = slice$4((_context24 = base.path)).call(_context24);
            url.path.pop();
            state = PATH$1;
            continue;
          }

          break;

        case RELATIVE_SLASH$1:
          if (isSpecial$1(url) && (_char3 == '/' || _char3 == '\\')) {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES$1;
          } else if (_char3 == '/') {
            state = AUTHORITY$1;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            state = PATH$1;
            continue;
          }

          break;

        case SPECIAL_AUTHORITY_SLASHES$1:
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES$1;
          if (_char3 != '/' || buffer.charAt(pointer + 1) != '/') continue;
          pointer++;
          break;

        case SPECIAL_AUTHORITY_IGNORE_SLASHES$1:
          if (_char3 != '/' && _char3 != '\\') {
            state = AUTHORITY$1;
            continue;
          }

          break;

        case AUTHORITY$1:
          if (_char3 == '@') {
            if (seenAt) buffer = '%40' + buffer;
            seenAt = true;
            bufferCodePoints = arrayFrom$1(buffer);

            for (var i = 0; i < bufferCodePoints.length; i++) {
              var codePoint = bufferCodePoints[i];

              if (codePoint == ':' && !seenPasswordToken) {
                seenPasswordToken = true;
                continue;
              }

              var encodedCodePoints = percentEncode$1(
                codePoint,
                userinfoPercentEncodeSet$1
              );
              if (seenPasswordToken) url.password += encodedCodePoints;
              else url.username += encodedCodePoints;
            }

            buffer = '';
          } else if (
            _char3 == EOF$1 ||
            _char3 == '/' ||
            _char3 == '?' ||
            _char3 == '#' ||
            (_char3 == '\\' && isSpecial$1(url))
          ) {
            if (seenAt && buffer == '') return INVALID_AUTHORITY$1;
            pointer -= arrayFrom$1(buffer).length + 1;
            buffer = '';
            state = HOST$1;
          } else buffer += _char3;

          break;

        case HOST$1:
        case HOSTNAME$1:
          if (stateOverride && url.scheme == 'file') {
            state = FILE_HOST$1;
            continue;
          } else if (_char3 == ':' && !seenBracket) {
            if (buffer == '') return INVALID_HOST$1;
            failure = parseHost$1(url, buffer);
            if (failure) return failure;
            buffer = '';
            state = PORT$1;
            if (stateOverride == HOSTNAME$1) return;
          } else if (
            _char3 == EOF$1 ||
            _char3 == '/' ||
            _char3 == '?' ||
            _char3 == '#' ||
            (_char3 == '\\' && isSpecial$1(url))
          ) {
            if (isSpecial$1(url) && buffer == '') return INVALID_HOST$1;
            if (
              stateOverride &&
              buffer == '' &&
              (includesCredentials$1(url) || url.port !== null)
            )
              return;
            failure = parseHost$1(url, buffer);
            if (failure) return failure;
            buffer = '';
            state = PATH_START$1;
            if (stateOverride) return;
            continue;
          } else {
            if (_char3 == '[') seenBracket = true;
            else if (_char3 == ']') seenBracket = false;
            buffer += _char3;
          }

          break;

        case PORT$1:
          if (DIGIT$1.test(_char3)) {
            buffer += _char3;
          } else if (
            _char3 == EOF$1 ||
            _char3 == '/' ||
            _char3 == '?' ||
            _char3 == '#' ||
            (_char3 == '\\' && isSpecial$1(url)) ||
            stateOverride
          ) {
            if (buffer != '') {
              var port = _parseInt$2(buffer, 10);

              if (port > 0xffff) return INVALID_PORT$1;
              url.port =
                isSpecial$1(url) && port === specialSchemes$1[url.scheme]
                  ? null
                  : port;
              buffer = '';
            }

            if (stateOverride) return;
            state = PATH_START$1;
            continue;
          } else return INVALID_PORT$1;

          break;

        case FILE$1:
          url.scheme = 'file';
          if (_char3 == '/' || _char3 == '\\') state = FILE_SLASH$1;
          else if (base && base.scheme == 'file') {
            if (_char3 == EOF$1) {
              var _context25;

              url.host = base.host;
              url.path = slice$4((_context25 = base.path)).call(_context25);
              url.query = base.query;
            } else if (_char3 == '?') {
              var _context26;

              url.host = base.host;
              url.path = slice$4((_context26 = base.path)).call(_context26);
              url.query = '';
              state = QUERY$1;
            } else if (_char3 == '#') {
              var _context27;

              url.host = base.host;
              url.path = slice$4((_context27 = base.path)).call(_context27);
              url.query = base.query;
              url.fragment = '';
              state = FRAGMENT$1;
            } else {
              if (
                !startsWithWindowsDriveLetter$1(
                  slice$4(codePoints).call(codePoints, pointer).join('')
                )
              ) {
                var _context28;

                url.host = base.host;
                url.path = slice$4((_context28 = base.path)).call(_context28);
                shortenURLsPath$1(url);
              }

              state = PATH$1;
              continue;
            }
          } else {
            state = PATH$1;
            continue;
          }
          break;

        case FILE_SLASH$1:
          if (_char3 == '/' || _char3 == '\\') {
            state = FILE_HOST$1;
            break;
          }

          if (
            base &&
            base.scheme == 'file' &&
            !startsWithWindowsDriveLetter$1(
              slice$4(codePoints).call(codePoints, pointer).join('')
            )
          ) {
            if (isWindowsDriveLetter$1(base.path[0], true))
              url.path.push(base.path[0]);
            else url.host = base.host;
          }

          state = PATH$1;
          continue;

        case FILE_HOST$1:
          if (
            _char3 == EOF$1 ||
            _char3 == '/' ||
            _char3 == '\\' ||
            _char3 == '?' ||
            _char3 == '#'
          ) {
            if (!stateOverride && isWindowsDriveLetter$1(buffer)) {
              state = PATH$1;
            } else if (buffer == '') {
              url.host = '';
              if (stateOverride) return;
              state = PATH_START$1;
            } else {
              failure = parseHost$1(url, buffer);
              if (failure) return failure;
              if (url.host == 'localhost') url.host = '';
              if (stateOverride) return;
              buffer = '';
              state = PATH_START$1;
            }

            continue;
          } else buffer += _char3;

          break;

        case PATH_START$1:
          if (isSpecial$1(url)) {
            state = PATH$1;
            if (_char3 != '/' && _char3 != '\\') continue;
          } else if (!stateOverride && _char3 == '?') {
            url.query = '';
            state = QUERY$1;
          } else if (!stateOverride && _char3 == '#') {
            url.fragment = '';
            state = FRAGMENT$1;
          } else if (_char3 != EOF$1) {
            state = PATH$1;
            if (_char3 != '/') continue;
          }

          break;

        case PATH$1:
          if (
            _char3 == EOF$1 ||
            _char3 == '/' ||
            (_char3 == '\\' && isSpecial$1(url)) ||
            (!stateOverride && (_char3 == '?' || _char3 == '#'))
          ) {
            if (isDoubleDot$1(buffer)) {
              shortenURLsPath$1(url);

              if (_char3 != '/' && !(_char3 == '\\' && isSpecial$1(url))) {
                url.path.push('');
              }
            } else if (isSingleDot$1(buffer)) {
              if (_char3 != '/' && !(_char3 == '\\' && isSpecial$1(url))) {
                url.path.push('');
              }
            } else {
              if (
                url.scheme == 'file' &&
                !url.path.length &&
                isWindowsDriveLetter$1(buffer)
              ) {
                if (url.host) url.host = '';
                buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
              }

              url.path.push(buffer);
            }

            buffer = '';

            if (
              url.scheme == 'file' &&
              (_char3 == EOF$1 || _char3 == '?' || _char3 == '#')
            ) {
              while (url.path.length > 1 && url.path[0] === '') {
                url.path.shift();
              }
            }

            if (_char3 == '?') {
              url.query = '';
              state = QUERY$1;
            } else if (_char3 == '#') {
              url.fragment = '';
              state = FRAGMENT$1;
            }
          } else {
            buffer += percentEncode$1(_char3, pathPercentEncodeSet$1);
          }

          break;

        case CANNOT_BE_A_BASE_URL_PATH$1:
          if (_char3 == '?') {
            url.query = '';
            state = QUERY$1;
          } else if (_char3 == '#') {
            url.fragment = '';
            state = FRAGMENT$1;
          } else if (_char3 != EOF$1) {
            url.path[0] += percentEncode$1(_char3, C0ControlPercentEncodeSet$1);
          }

          break;

        case QUERY$1:
          if (!stateOverride && _char3 == '#') {
            url.fragment = '';
            state = FRAGMENT$1;
          } else if (_char3 != EOF$1) {
            if (_char3 == "'" && isSpecial$1(url)) url.query += '%27';
            else if (_char3 == '#') url.query += '%23';
            else
              url.query += percentEncode$1(_char3, C0ControlPercentEncodeSet$1);
          }

          break;

        case FRAGMENT$1:
          if (_char3 != EOF$1)
            url.fragment += percentEncode$1(_char3, fragmentPercentEncodeSet$1);
          break;
      }

      pointer++;
    }
  }; // `URL` constructor
  // https://url.spec.whatwg.org/#url-class

  var URLConstructor$1 = function URL(
    url
    /* , base */
  ) {
    var that = anInstance$1(this, URLConstructor$1, 'URL');
    var base = arguments.length > 1 ? arguments[1] : undefined;
    var urlString = toString_1$1(url);
    var state = setInternalState$4$1(that, {
      type: 'URL'
    });
    var baseState, failure;

    if (base !== undefined) {
      if (base instanceof URLConstructor$1)
        baseState = getInternalURLState$1(base);
      else {
        failure = parseURL$1((baseState = {}), toString_1$1(base));
        if (failure) throw TypeError(failure);
      }
    }

    failure = parseURL$1(state, urlString, null, baseState);
    if (failure) throw TypeError(failure);
    var searchParams = (state.searchParams = new URLSearchParams$1$1());
    var searchParamsState = getInternalSearchParamsState$1(searchParams);
    searchParamsState.updateSearchParams(state.query);

    searchParamsState.updateURL = function () {
      state.query = String(searchParams) || null;
    };

    if (!descriptors$1) {
      that.href = serializeURL$1.call(that);
      that.origin = getOrigin$1.call(that);
      that.protocol = getProtocol$1.call(that);
      that.username = getUsername$1.call(that);
      that.password = getPassword$1.call(that);
      that.host = getHost$1.call(that);
      that.hostname = getHostname$1.call(that);
      that.port = getPort$1.call(that);
      that.pathname = getPathname$1.call(that);
      that.search = getSearch$1.call(that);
      that.searchParams = getSearchParams$1.call(that);
      that.hash = getHash$1.call(that);
    }
  };

  var URLPrototype$1 = URLConstructor$1.prototype;

  var serializeURL$1 = function serializeURL() {
    var url = getInternalURLState$1(this);
    var scheme = url.scheme;
    var username = url.username;
    var password = url.password;
    var host = url.host;
    var port = url.port;
    var path = url.path;
    var query = url.query;
    var fragment = url.fragment;
    var output = scheme + ':';

    if (host !== null) {
      output += '//';

      if (includesCredentials$1(url)) {
        output += username + (password ? ':' + password : '') + '@';
      }

      output += serializeHost$1(host);
      if (port !== null) output += ':' + port;
    } else if (scheme == 'file') output += '//';

    output += url.cannotBeABaseURL
      ? path[0]
      : path.length
      ? '/' + path.join('/')
      : '';
    if (query !== null) output += '?' + query;
    if (fragment !== null) output += '#' + fragment;
    return output;
  };

  var getOrigin$1 = function getOrigin() {
    var url = getInternalURLState$1(this);
    var scheme = url.scheme;
    var port = url.port;
    if (scheme == 'blob')
      try {
        return new URLConstructor$1(scheme.path[0]).origin;
      } catch (error) {
        return 'null';
      }
    if (scheme == 'file' || !isSpecial$1(url)) return 'null';
    return (
      scheme +
      '://' +
      serializeHost$1(url.host) +
      (port !== null ? ':' + port : '')
    );
  };

  var getProtocol$1 = function getProtocol() {
    return getInternalURLState$1(this).scheme + ':';
  };

  var getUsername$1 = function getUsername() {
    return getInternalURLState$1(this).username;
  };

  var getPassword$1 = function getPassword() {
    return getInternalURLState$1(this).password;
  };

  var getHost$1 = function getHost() {
    var url = getInternalURLState$1(this);
    var host = url.host;
    var port = url.port;
    return host === null
      ? ''
      : port === null
      ? serializeHost$1(host)
      : serializeHost$1(host) + ':' + port;
  };

  var getHostname$1 = function getHostname() {
    var host = getInternalURLState$1(this).host;
    return host === null ? '' : serializeHost$1(host);
  };

  var getPort$1 = function getPort() {
    var port = getInternalURLState$1(this).port;
    return port === null ? '' : String(port);
  };

  var getPathname$1 = function getPathname() {
    var url = getInternalURLState$1(this);
    var path = url.path;
    return url.cannotBeABaseURL
      ? path[0]
      : path.length
      ? '/' + path.join('/')
      : '';
  };

  var getSearch$1 = function getSearch() {
    var query = getInternalURLState$1(this).query;
    return query ? '?' + query : '';
  };

  var getSearchParams$1 = function getSearchParams() {
    return getInternalURLState$1(this).searchParams;
  };

  var getHash$1 = function getHash() {
    var fragment = getInternalURLState$1(this).fragment;
    return fragment ? '#' + fragment : '';
  };

  var accessorDescriptor$1 = function accessorDescriptor(getter, setter) {
    return {
      get: getter,
      set: setter,
      configurable: true,
      enumerable: true
    };
  };

  if (descriptors$1) {
    objectDefineProperties$1(URLPrototype$1, {
      // `URL.prototype.href` accessors pair
      // https://url.spec.whatwg.org/#dom-url-href
      href: accessorDescriptor$1(serializeURL$1, function (href) {
        var url = getInternalURLState$1(this);
        var urlString = toString_1$1(href);
        var failure = parseURL$1(url, urlString);
        if (failure) throw TypeError(failure);
        getInternalSearchParamsState$1(url.searchParams).updateSearchParams(
          url.query
        );
      }),
      // `URL.prototype.origin` getter
      // https://url.spec.whatwg.org/#dom-url-origin
      origin: accessorDescriptor$1(getOrigin$1),
      // `URL.prototype.protocol` accessors pair
      // https://url.spec.whatwg.org/#dom-url-protocol
      protocol: accessorDescriptor$1(getProtocol$1, function (protocol) {
        var url = getInternalURLState$1(this);
        parseURL$1(url, toString_1$1(protocol) + ':', SCHEME_START$1);
      }),
      // `URL.prototype.username` accessors pair
      // https://url.spec.whatwg.org/#dom-url-username
      username: accessorDescriptor$1(getUsername$1, function (username) {
        var url = getInternalURLState$1(this);
        var codePoints = arrayFrom$1(toString_1$1(username));
        if (cannotHaveUsernamePasswordPort$1(url)) return;
        url.username = '';

        for (var i = 0; i < codePoints.length; i++) {
          url.username += percentEncode$1(
            codePoints[i],
            userinfoPercentEncodeSet$1
          );
        }
      }),
      // `URL.prototype.password` accessors pair
      // https://url.spec.whatwg.org/#dom-url-password
      password: accessorDescriptor$1(getPassword$1, function (password) {
        var url = getInternalURLState$1(this);
        var codePoints = arrayFrom$1(toString_1$1(password));
        if (cannotHaveUsernamePasswordPort$1(url)) return;
        url.password = '';

        for (var i = 0; i < codePoints.length; i++) {
          url.password += percentEncode$1(
            codePoints[i],
            userinfoPercentEncodeSet$1
          );
        }
      }),
      // `URL.prototype.host` accessors pair
      // https://url.spec.whatwg.org/#dom-url-host
      host: accessorDescriptor$1(getHost$1, function (host) {
        var url = getInternalURLState$1(this);
        if (url.cannotBeABaseURL) return;
        parseURL$1(url, toString_1$1(host), HOST$1);
      }),
      // `URL.prototype.hostname` accessors pair
      // https://url.spec.whatwg.org/#dom-url-hostname
      hostname: accessorDescriptor$1(getHostname$1, function (hostname) {
        var url = getInternalURLState$1(this);
        if (url.cannotBeABaseURL) return;
        parseURL$1(url, toString_1$1(hostname), HOSTNAME$1);
      }),
      // `URL.prototype.port` accessors pair
      // https://url.spec.whatwg.org/#dom-url-port
      port: accessorDescriptor$1(getPort$1, function (port) {
        var url = getInternalURLState$1(this);
        if (cannotHaveUsernamePasswordPort$1(url)) return;
        port = toString_1$1(port);
        if (port == '') url.port = null;
        else parseURL$1(url, port, PORT$1);
      }),
      // `URL.prototype.pathname` accessors pair
      // https://url.spec.whatwg.org/#dom-url-pathname
      pathname: accessorDescriptor$1(getPathname$1, function (pathname) {
        var url = getInternalURLState$1(this);
        if (url.cannotBeABaseURL) return;
        url.path = [];
        parseURL$1(url, toString_1$1(pathname), PATH_START$1);
      }),
      // `URL.prototype.search` accessors pair
      // https://url.spec.whatwg.org/#dom-url-search
      search: accessorDescriptor$1(getSearch$1, function (search) {
        var url = getInternalURLState$1(this);
        search = toString_1$1(search);

        if (search == '') {
          url.query = null;
        } else {
          if ('?' == search.charAt(0)) search = slice$4(search).call(search, 1);
          url.query = '';
          parseURL$1(url, search, QUERY$1);
        }

        getInternalSearchParamsState$1(url.searchParams).updateSearchParams(
          url.query
        );
      }),
      // `URL.prototype.searchParams` getter
      // https://url.spec.whatwg.org/#dom-url-searchparams
      searchParams: accessorDescriptor$1(getSearchParams$1),
      // `URL.prototype.hash` accessors pair
      // https://url.spec.whatwg.org/#dom-url-hash
      hash: accessorDescriptor$1(getHash$1, function (hash) {
        var url = getInternalURLState$1(this);
        hash = toString_1$1(hash);

        if (hash == '') {
          url.fragment = null;
          return;
        }

        if ('#' == hash.charAt(0)) hash = slice$4(hash).call(hash, 1);
        url.fragment = '';
        parseURL$1(url, hash, FRAGMENT$1);
      })
    });
  } // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson

  redefine$1(
    URLPrototype$1,
    'toJSON',
    function toJSON() {
      return serializeURL$1.call(this);
    },
    {
      enumerable: true
    }
  ); // `URL.prototype.toString` method
  // https://url.spec.whatwg.org/#URL-stringification-behavior

  redefine$1(
    URLPrototype$1,
    'toString',
    function toString() {
      return serializeURL$1.call(this);
    },
    {
      enumerable: true
    }
  );

  if (NativeURL$1) {
    var nativeCreateObjectURL$1 = NativeURL$1.createObjectURL;
    var nativeRevokeObjectURL$1 = NativeURL$1.revokeObjectURL; // `URL.createObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    // eslint-disable-next-line no-unused-vars -- required for `.length`

    if (nativeCreateObjectURL$1)
      redefine$1(
        URLConstructor$1,
        'createObjectURL',
        function createObjectURL(blob) {
          return nativeCreateObjectURL$1.apply(NativeURL$1, arguments);
        }
      ); // `URL.revokeObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
    // eslint-disable-next-line no-unused-vars -- required for `.length`

    if (nativeRevokeObjectURL$1)
      redefine$1(
        URLConstructor$1,
        'revokeObjectURL',
        function revokeObjectURL(url) {
          return nativeRevokeObjectURL$1.apply(NativeURL$1, arguments);
        }
      );
  }

  setToStringTag$1(URLConstructor$1, 'URL');

  _export$1(
    {
      global: true,
      forced: !nativeUrl$1,
      sham: !descriptors$1
    },
    {
      URL: URLConstructor$1
    }
  ); // empty

  var web_url_toJson = /*#__PURE__*/ freeze$2({
    __proto__: null
  });

  getCjsExportFromNamespace(web_url_toJson);
  var url$3 = path$1.URL;
  var url$1$1 = url$3;
  var url$2$1 = url$1$1;
  var _ref = window,
    MediaRecorder = _ref.MediaRecorder;
  var mediaRecorder;
  var recordedBlobs; //const mimeType = 'video/mp4 codecs="avc1.424028, mp4a.40.2"'

  var mimeType = 'video/webm';
  var fileName = 'test.webm';

  function handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  }

  function handlerError(e) {
    console.log('error', e);
  }

  function download() {
    var blob = new Blob(recordedBlobs, {
      type: mimeType
    });
    var url = url$2$1.createObjectURL(blob);
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout$1$1(function () {
      document.body.removeChild(a);
      url$2$1.revokeObjectURL(url);
    }, 100);
  } // The nested try blocks will be simplified when Chrome 47 moves to Stable

  function startRecording(stream) {
    var options = {
      mimeType: mimeType
    };
    recordedBlobs = [];

    try {
      mediaRecorder = new MediaRecorder(stream, options);
    } catch (e0) {
      console.log('Unable to create MediaRecorder with options Object: ', e0);

      try {
        options = {
          mimeType: 'video/webm,codecs=vp9'
        };
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e1) {
        console.log('Unable to create MediaRecorder with options Object: ', e1);

        try {
          options = 'video/vp8'; // Chrome 47

          mediaRecorder = new MediaRecorder(stream, options);
        } catch (e2) {
          console.error(
            '浏览器不支持MediaRecorder \n\n' +
              '请使用火狐浏览器29以上版本, 或者谷歌浏览器47以上版本。 '
          );
          console.error('Exception while creating MediaRecorder:', e2);
          return;
        }
      }
    }

    console.log(
      'Created MediaRecorder',
      mediaRecorder,
      'with options',
      options
    );
    mediaRecorder.onerror = handlerError;
    mediaRecorder.onstop = download;
    mediaRecorder.ondataavailable = handleDataAvailable;

    try {
      mediaRecorder.start(100); // collect 100ms of data
    } catch (e) {
      console.error('录制失败:', e.message);
    }

    console.log('MediaRecorder started', mediaRecorder);
  }

  function stopRecording() {
    mediaRecorder.stop();
    console.log('Recorded Blobs: ', recordedBlobs);
  }

  function recordMixin(YunliVjsPlayer) {
    var recordTime = 0;
    var recordTimer = null; //录像状态提示

    var recordFlag = document.createElement('div');
    recordFlag.innerHTML =
      '<div class="vjs-recording-text">REC:</div>\n    <div class="vjs-recording-count">00:00</div>\n    <div class="vjs-recording-dot"></div>';
    recordFlag.classList.add('vjs-recording-flag'); //控制按钮对象

    var recordBtn;
    /**
     * 控制条中添加录制按钮
     */

    YunliVjsPlayer.prototype._addRecordButton = function () {
      var this_ = this;
      this_.recording = false;
      var Button = videojs.getComponent('Button');
      recordBtn = videojs.extend(Button, {
        constructor: function constructor() {
          Button.apply(this, arguments);
          this.controlText('Record');
        },
        handleClick: function handleClick() {
          console.log('el', this.el_.querySelector('.vjs-control-text'));

          if (this_.recording) {
            this_.stopRecording();
          } else {
            this_.startRecording();
          }
        },
        buildCSSClass: function buildCSSClass() {
          return 'vjs-yunli-record vjs-control vjs-button';
        }
      });
      videojs.registerComponent('recordButton', recordBtn);
    };

    YunliVjsPlayer.prototype._updateRecordTime = function () {
      var _this = this;

      if (!this.recording) {
        clearTimeout(recordTimer);
        return;
      }

      recordTime += 200;
      recordFlag.querySelector('.vjs-recording-count').innerHTML = formatTime(
        recordTime / 1000
      );
      recordTimer = setTimeout$1$1(function () {
        _this._updateRecordTime();
      }, 200);
    };
    /**
     * 开始录像，仅支持保存为webm格式
     */

    YunliVjsPlayer.prototype.startRecording = function () {
      this.recording = true;

      this._updateRecordTime(); //获取video标签的视频流

      var stream = this.el_.captureStream();
      recordBtn.el_ && recordBtn.el_.classList.add('recording');
      recordBtn.el_ &&
        (recordBtn.el_.querySelector('.vjs-control-text').title = '录制');
      this.player_.el_.appendChild(recordFlag);
      startRecording(stream);
    };
    /**
     * 停止录像，同时弹出保存框
     */

    YunliVjsPlayer.prototype.stopRecording = function () {
      this.recording = false;
      recordTime = 0;
      recordBtn.el_ && recordBtn.el_.classList.remove('recording');
      recordBtn.el_ &&
        (recordBtn.el_.querySelector('.vjs-control-text').title = '停止录制');
      this.player_.el_.removeChild(recordFlag);
      stopRecording();
    };
  }

  var name = 'yl-vjs-player-sdk';
  var version$1$1 = '0.0.37';
  var keywords = ['videojs', '云粒', '视频播放器'];
  var description = '云粒 videojs 视频播放器 SDK';
  var uimodule = 'YunliVjsPlayer';
  var main = 'esm/index.js';
  var copyright = 'Copyright Yunlizhihui, Inc. <https://yunlizhihui.com>';
  var scripts = {
    start: 'rollup -c rollup/dev.js -w',
    build: 'rimraf dist && rimraf esm &&  rollup -c rollup/prod.js',
    postbuild: 'cp -f dist/* ../vjs-player-resources/src/libs/'
  };
  var author = 'yangyongjian';
  var license = 'ISC';
  var publishConfig = {
    access: 'public'
  };
  var files = ['package.json', 'dist', 'esm', 'LICENSE', 'README.md'];
  var peerDependencies = {
    'flv.js': '^1.5.0',
    'video.js': '^7.8.2',
    'videojs-flash': '^2.2.1',
    'videojs-flvjs': '^0.2.0',
    'videojs-swf': '^5.4.2'
  };
  var dependencies = {
    'flv.js': '^1.5.0',
    'video.js': '^7.8.2',
    'videojs-flash': '^2.2.1',
    'videojs-flvjs': '^0.2.0',
    'videojs-swf': '^5.4.2'
  };
  var devDependencies = {
    'node-sass': '^4.13.1',
    'postcss-url': '^8.0.0'
  };
  var pkg = {
    name: name,
    version: version$1$1,
    keywords: keywords,
    description: description,
    uimodule: uimodule,
    main: main,
    copyright: copyright,
    scripts: scripts,
    author: author,
    license: license,
    publishConfig: publishConfig,
    files: files,
    peerDependencies: peerDependencies,
    dependencies: dependencies,
    devDependencies: devDependencies
  };

  function lifecircleMixin(YunliVjsPlayer) {
    /**
     * 销毁videojs实例
     */
    YunliVjsPlayer.prototype.dispose = function () {
      console.log('dispose', this.waitingTimer, this._keepAliveTimer);

      if (this.waitingTimer) {
        window.clearTimeout(this.waitingTimer);
      }

      if (this._keepAliveTimer) {
        window.clearTimeout(this._keepAliveTimer);
      }

      console.log('dispose after', this.options_);

      if (this.options_.closeVideo) {
        this._destroyVideo && this._destroyVideo();
      }

      if (this.player_) {
        this.player_.dispose();
      }
    };
    /**
     * 重置videojs实例
     */

    YunliVjsPlayer.prototype.reset = function () {
      if (this.player_) {
        this.player_.reset();
      }
    };
    /**
     * 开始播放
     */

    YunliVjsPlayer.prototype.play = function () {
      if (this.player_) {
        this.player_.play();
      }
    };
    /**
     * 播放器暂停
     */

    YunliVjsPlayer.prototype.pause = function () {
      if (this.player_) {
        this.player_.pause();
      }
    };
    /**
     * 重新播放sources
     */

    YunliVjsPlayer.prototype.src = function (sources) {
      var _this = this;

      sources = this._parseSource(sources);
      console.log('handleupdate src', stringify$2$1(sources));
      this.options_.sources = sources;

      if (this.player_) {
        this.player_.src(sources);
        setTimeout$1$1(function () {
          if (
            _this.options_.playRate &&
            _parseFloat$2$1(_this.options_.playRate) !== 1
          ) {
            _this.changePlayRate(_this.options_.playRate);
          }
        }, 200);
      }
    };
    /**
     * 处理源的类型，
     * 统一转为[{ src: '', type: '' }]格式
     */

    YunliVjsPlayer.prototype._parseSource = function (sources) {
      //字符时默认为src，转成对象数组
      if (typeof sources === 'string') {
        sources = [
          {
            src: sources,
            type: getSourceType(sources)
          }
        ];
      } //不是数组转为数组

      if (!isArray$3$1(sources)) {
        sources = [sources];
      } //数组中的项为字符串时，转为对象
      //缺少type，补充type

      forEach$2$1(sources).call(sources, function (source, i) {
        if (typeof source === 'string') {
          sources[i] = {
            src: source,
            type: getSourceType(source)
          };
        } else if (source && source.src && !source.type) {
          source.type = getSourceType(source.src);
        }
      });
      return sources;
    };
    /**
     * 改变播放倍率
     */

    YunliVjsPlayer.prototype.changePlayRate = function (rate) {
      console.log('rate in', rate);

      if (this.player_) {
        this.playbackRate = rate;
        this.player_.playbackRate(rate); //this.player_.trigger('ratechange',rate)
      }
    };

    YunliVjsPlayer.prototype.jumpVideoTime = function (time) {
      console.log('tt', this);

      if (this.player_) {
        this._jumpVideoTime(time);
      }
    };

    YunliVjsPlayer.prototype.currentTime = function () {
      var currentTime = 0;

      if (this.player_) {
        currentTime += this.player_.currentTime();
      }

      if (this.ylJumpTime) {
        currentTime += this.ylJumpTime;
      }

      return currentTime;
    };

    YunliVjsPlayer.prototype.onError = function (error) {
      if (this.options_ && this.options_.onError) {
        this.options_.onError.call(this, error, this.player_);
      }
    };

    YunliVjsPlayer.prototype.onEnd = function () {
      if (this.options_ && this.options_.onEnd) {
        this.options_.onEnd.call(this, this.player_);
      }
    };
    /**
     * 获取videojs的实例对象
     */

    YunliVjsPlayer.prototype.getPlayer = function () {
      return this.player_;
    };

    var ver = function ver() {
      return pkg.version;
    };

    YunliVjsPlayer.prototype.VERSION = ver;
    YunliVjsPlayer.prototype.V = ver;
  }

  function YunliVjsPlayer(el, options, readyCallback) {
    if (typeof el === 'string') {
      el = document.getElementById(el);
    }

    this._init(el, options, readyCallback);
  }

  YunliVjsPlayer.prototype.version = pkg.version;
  initMixin(YunliVjsPlayer);
  snapMixin(YunliVjsPlayer);
  recordMixin(YunliVjsPlayer);
  eventsMixin(YunliVjsPlayer);
  yunliMixin(YunliVjsPlayer);
  lifecircleMixin(YunliVjsPlayer);

  function endWith(str, endStr) {
    var reg = new RegExp(''.concat(endStr, '$'));
    return reg.test(str);
  }
  function startWith$1(str, startStr) {
    var reg = new RegExp('^'.concat(startStr));
    return reg.test(str);
  }
  function getSourceType$1(url) {
    var types = {
      m3u8: 'application/x-mpegURL',
      mp4: 'video/mp4',
      flv: 'video/x-flv',
      rtmp: 'rtmp/flv'
    };
    var type = '';

    if (endWith(url, '.m3u8')) {
      type = types['m3u8'];
    }

    if (endWith(url, '.mp4')) {
      type = types['mp4'];
    }

    if (endWith(url, '.flv')) {
      type = types['flv'];
    }

    if (startWith$1(url, 'rtmp')) {
      type = types['rtmp'];
    }

    return type;
  }

  function ownKeys$2(object, enumerableOnly) {
    var keys = keys$3(object);
    if (getOwnPropertySymbols$2) {
      var symbols = getOwnPropertySymbols$2(object);
      if (enumerableOnly) {
        symbols = filter$2(symbols).call(symbols, function (sym) {
          return getOwnPropertyDescriptor$3(object, sym).enumerable;
        });
      }
      keys.push.apply(keys, symbols);
    }
    return keys;
  }

  function _objectSpread$1(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        var _context6;
        forEach$2((_context6 = ownKeys$2(Object(source), true))).call(
          _context6,
          function (key) {
            _defineProperty(target, key, source[key]);
          }
        );
      } else if (getOwnPropertyDescriptors$2) {
        defineProperties$1(target, getOwnPropertyDescriptors$2(source));
      } else {
        var _context7;
        forEach$2((_context7 = ownKeys$2(Object(source)))).call(
          _context7,
          function (key) {
            defineProperty$3(
              target,
              key,
              getOwnPropertyDescriptor$3(source, key)
            );
          }
        );
      }
    }
    return target;
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = construct$3(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === 'undefined' || !construct$3) return false;
    if (construct$3.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(construct$3(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  var dfApiSettings$1 = {
    getRealplayUrl: {
      url: '/ylv/v1/realplay/${channelID}',
      method: 'POST'
    },
    getHistoryUrl: {
      url: '/ylv/v1/history/${channelID}',
      method: 'POST'
    }
  };

  var YunliVjsPlayerWithApi = /*#__PURE__*/ (function (_React$Component) {
    _inherits(YunliVjsPlayerWithApi, _React$Component);

    var _super = _createSuper(YunliVjsPlayerWithApi);

    function YunliVjsPlayerWithApi(props) {
      var _context, _context2;

      var _this2;

      _classCallCheck(this, YunliVjsPlayerWithApi);

      _this2 = _super.call(this, props);

      _defineProperty(_assertThisInitialized(_this2), 'player', void 0);

      _defineProperty(_assertThisInitialized(_this2), 'videoNode', void 0);

      _defineProperty(_assertThisInitialized(_this2), 'container', void 0);

      _defineProperty(_assertThisInitialized(_this2), 'playerId', void 0);

      _defineProperty(_assertThisInitialized(_this2), 'retryTimer', void 0);

      _defineProperty(_assertThisInitialized(_this2), 'stopErrorTimer', void 0);

      _defineProperty(_assertThisInitialized(_this2), 'flashTimer', void 0);

      _this2.state = {
        playUrl: '',
        sessionID: '',
        channelID: _this2.props.channelID || '',
        streamType: _this2.props.yunliMode,
        beginTime: _this2.props.beginTime || '',
        endTime: _this2.props.endTime || '',
        error: '',
        source: null,
        isPlaying: false,
        //重新render
        isSetVideoError: false
      };
      _this2.player = {};
      _this2.keepRetry = bind$3((_context = _this2.keepRetry)).call(
        _context,
        _assertThisInitialized(_this2)
      );
      _this2.clickRetryPlay = bind$3((_context2 = _this2.clickRetryPlay)).call(
        _context2,
        _assertThisInitialized(_this2)
      );
      _this2.retryTimer = null;
      _this2.stopErrorTimer = null;
      _this2.flashTimer = null;
      return _this2;
    }

    _createClass(YunliVjsPlayerWithApi, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          // instantiate Video.js
          if (this.props.channelID || this.props.sources) {
            this.handleMount();
          } //30秒不能正常播放，提示视频错误

          this.stopAndShowError();
        } // destroy player on unmount
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          window.clearTimeout(this.retryTimer);
          window.clearTimeout(this.stopErrorTimer);
          window.clearTimeout(this.flashTimer);
          var _this$state = this.state,
            streamType = _this$state.streamType,
            sessionID = _this$state.sessionID;
          console.log('unmount 11', this.player);

          if (this.player) {
            this.player.dispose && this.player.dispose();
          }
          /* 切换为心跳保活，不用手动关闭
	      if (!this.props.useCache) {
	        this.stopSource({ streamType, sessionID })
	      }
	      */
        }
      },
      {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState, snapshot) {
          console.log('did update', prevProps, this.props);

          if (
            prevProps.channelID !== this.props.channelID ||
            prevProps.yunliMode !== this.props.yunliMode ||
            prevProps.streamType !== this.props.streamType ||
            prevProps.beginTime !== this.props.beginTime ||
            prevProps.endTime !== this.props.endTime
          ) {
            if (this.props.channelID) {
              this.handleUpdate({
                sessionID: this.state.sessionID,
                streamType: prevProps.streamType,
                preChannelID: prevProps.channelID
              });
            }
          }

          if (
            !this.props.yunliMode &&
            prevProps.sources !== this.props.sources
          ) {
            if (this.player.player_) {
              this.player.src(this.props.sources);
            } else {
              this.handleMount();
            }
          }
        }
      },
      {
        key: 'currentTime',
        value: function currentTime() {
          var currentTime = 0;

          if (
            this.player &&
            this.player.player_ &&
            !this.player.player_.paused() &&
            this.state.isPlaying
          ) {
            currentTime = this.player.currentTime();
          }

          return currentTime;
        }
      },
      {
        key: 'jumpVideoTime',
        value: function jumpVideoTime(time) {
          if (this.player && this.player.player_) {
            this.player.jumpVideoTime(time);
          }
        }
      },
      {
        key: 'stopAndShowError',
        value: function stopAndShowError() {
          var _this3 = this;

          if (this.stopErrorTimer) {
            clearTimeout(this.stopErrorTimer);
          }

          this.stopErrorTimer = setTimeout$2(function () {
            if (!_this3.player.player_) {
              return;
            }

            if (
              _this3.player.player_ &&
              _this3.player.player_.techName_ === 'Flash'
            ) {
              return;
            }

            if (!_this3.player.player_.paused() && _this3.state.isPlaying) {
              return;
            } else {
              _this3.player.player_ &&
                _this3.player.player_.error({
                  code: 4,
                  message: 'not found'
                });
            }
          }, 30000);
        }
      },
      {
        key: 'keepRetry',
        value: function keepRetry(source) {
          return;
        }
      },
      {
        key: 'replaceNode',
        value: function replaceNode() {
          var _this5 = this;

          if (!this.player.player_) {
            return;
          }

          this.player && this.player.dispose();

          if (this.container) {
            var videoEl = document.createElement('video');
            videoEl.className = 'vjs-yunli video-js vjs-default-skin';
            this.container.appendChild(videoEl);

            var opts = _objectSpread$1({}, this.props);

            opts.sources = [this.state.source];

            setTimeout$2(function () {
              _this5.player = new YunliVjsPlayer(videoEl, opts, function () {
                console.log('flv video rerender', this);
                this.play();
              });
            }, 200);
          }
        }
      },
      {
        key: 'clickRetryPlay',
        value: function clickRetryPlay() {
          this.handleUpdate({}, true);
          this.keepRetry();
        }
      },
      {
        key: 'flashRetry',
        value: function flashRetry() {
          var _this6 = this;

          if (this.flashTimer) {
            clearTimeout(this.flashTimer);
          }

          this.flashTimer = setTimeout$2(function () {
            if (!_this6.player.player_) {
              return;
            }

            if (!_this6.player.player_.paused() && _this6.state.isPlaying) {
              return;
            }

            _this6.clickRetryPlay();
          }, 20000);
        }
      },
      {
        key: 'showModal',
        value: function showModal() {
          var showTime =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : 5000;
          var el = document.querySelector('#yl_monitor_modal');

          if (el) {
            return;
          } else {
            el = document.createElement('div');
            el.id = 'yl_monitor_modal';
            el.setAttribute(
              'style',
              'position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.5);z-index:999;'
            );
            var container = document.createElement('div');
            container.className = 'ant-spin ant-spin-lg ant-spin-spinning';
            var spinner = document.createElement('div');
            spinner.className = 'ant-spin ant-spin-lg ant-spin-spinning';
            spinner.setAttribute(
              'style',
              'display: block;position: absolute;width: 50px;height: 50px;left:50%;top:50%;transform:transilate(-50%,-50%)'
            );
            var span = document.createElement('span');
            span.className = 'ant-spin-dot ant-spin-dot-spin';

            for (var i = 0; i < 4; i++) {
              var it = document.createElement('i');
              it.classList.add('ant-spin-dot-item');
              span.appendChild(it);
            }

            spinner.appendChild(span);
            el.appendChild(spinner);
            document.body.appendChild(el);

            setTimeout$2(function () {
              document.body.removeChild(el);
            }, showTime);
          }
        }
        /**
         * 处理播放器初始化
         */
      },
      {
        key: 'handleMount',
        value: (function () {
          var _handleMount = _asyncToGenerator(
            /*#__PURE__*/ regenerator.mark(function _callee() {
              var data, sources, a, s, opts;
              return regenerator.wrap(
                function _callee$(_context3) {
                  while (1) {
                    switch ((_context3.prev = _context3.next)) {
                      case 0:
                        console.log('handle mount', this.props);
                        data = {};
                        sources = null;

                        if (!(!this.props.yunliMode && this.props.sources)) {
                          _context3.next = 7;
                          break;
                        }

                        sources = this.props.sources;
                        _context3.next = 21;
                        break;

                      case 7:
                        _context3.prev = 7;
                        _context3.next = 10;
                        return this.fetchSource();

                      case 10:
                        data = _context3.sent;

                        if (!(this.props.yunliMode === 'history')) {
                          _context3.next = 15;
                          break;
                        }

                        _context3.next = 14;
                        return new promise$5(function (resolve) {
                          setTimeout$2(function () {
                            resolve('ok');
                          }, 8000);
                        });

                      case 14:
                        a = _context3.sent;
                        break;
                      case 15:
                        _context3.next = 20;
                        break;

                      case 17:
                        _context3.prev = 17;
                        _context3.t0 = _context3['catch'](7);

                        if (this.props.onError) {
                          this.props.onError(_context3.t0);
                        }
                      /*
	                this.setState({
	                  error: err.toString().indexOf('timeout') > -1 ? '请求超时' : '网络错误',
	                })
	                return
	                */
                      //this.player && this.player.errorHandler('neterror')

                      case 20:
                        if (data) {
                          s = this.getSouceByData(data);

                          if (s) {
                            sources = [s];
                          }
                        }
                      break;
                      case 21:
                        if (sources && sources.length > 0) {
                          opts = _objectSpread$1({}, this.props);
                          opts.sources = sources;
                          this.newPlayer(opts);
                        }
                      break;
                      case 22:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                },
                _callee,
                this,
                [[7, 17]]
              );
            })
          );

          function handleMount() {
            return _handleMount.apply(this, arguments);
          }

          return handleMount;
        })()
        /**
         * 处理返回结果
         * @param data
         */
      },
      {
        key: 'getSouceByData',
        value: function getSouceByData(data) {
          if (data.code === 0) {
            if (!data.result.outputUrl) {
              this.player.errorHandler && this.player.errorHandler('notfound');
              return null;
            }

            var outputUrl = data.result.outputUrl;

            if (this.props.toFlv) {
              outputUrl = outputUrl.replace(/m3u8$/, 'flv');
            }

            var source = {
              src: outputUrl,
              type: getSourceType$1(outputUrl),
              sessionID: data.result.sessionID,
              channelID: this.props.channelID
            };
            var channelID = this.props.channelID;

            if (this.props.useCache) {
              sessionStorage.setItem(channelID, stringify$2(source));
            }

            this.setState({
              error: '',
              channelID: channelID,
              source: source,
              playUrl: outputUrl,
              sessionID: data.result.sessionID
            });
            return source;
          } else {
            if (this.props.onError) {
              this.props.onError(data);
            }

            this.setState({
              error: data.msg
            });
          }
        }
        /**
         * 处理频道更新
         */
      },
      {
        key: 'handleUpdate',
        value: (function () {
          var _handleUpdate = _asyncToGenerator(
            /*#__PURE__*/ regenerator.mark(function _callee2(_ref) {
              var _this7 = this;

              var sessionID,
                streamType,
                preChannelID,
                isSecond,
                _this$props,
                channelID,
                playRate,
                source,
                data,
                opts,
                _args2 = arguments;

              return regenerator.wrap(
                function _callee2$(_context4) {
                  while (1) {
                    switch ((_context4.prev = _context4.next)) {
                      case 0:
                        (sessionID = _ref.sessionID),
                          (streamType = _ref.streamType),
                          (preChannelID = _ref.preChannelID);
                        isSecond =
                          _args2.length > 1 && _args2[1] !== undefined
                            ? _args2[1]
                            : false;
                        this.stopAndShowError();
                        (_this$props = this.props),
                          (channelID = _this$props.channelID),
                          (playRate = _this$props.playRate);
                        source = null; //sessionStorage中没有则删除之前的频道

                        /*
	                if (!this.props.useCache || (this.props.useCache && !sessionStorage.getItem(preChannelID))) {
	                  const rs = await this.stopSource({ sessionID, streamType })
	                }
	                */

                        if (this.props.useCache && !isSecond) {
                          source = sessionStorage.getItem(channelID);
                        }

                        if (!(isSecond && this.props.yunliMode === 'history')) {
                          _context4.next = 10;
                          break;
                        }

                        this.player.src && this.player.src([this.state.source]);
                        this.keepRetry(source, 8000);
                        return _context4.abrupt('return');

                      case 10:
                        data = {};
                        console.log('handleupdate before', stringify$2(source));

                        if (!source) {
                          _context4.next = 17;
                          break;
                        }

                        source = JSON.parse(source);
                        this.setState({
                          source: source
                        });
                        _context4.next = 28;
                        break;

                      case 17:
                        _context4.prev = 17;
                        _context4.next = 20;
                        return this.fetchSource();

                      case 20:
                        data = _context4.sent;
                        _context4.next = 27;
                        break;

                      case 23:
                        _context4.prev = 23;
                        _context4.t0 = _context4['catch'](17);

                        /*
	                this.setState({
	                  error: err.toString().indexOf('timeout') > -1 ? '请求超时' : '网络错误',
	                })
	                return
	                */
                        if (this.props.onError) {
                          this.props.onError(_context4.t0);
                        }

                        this.player.errorHandler &&
                          this.player.errorHandler('neterror');
                        break;
                      case 27:
                        if (data) {
                          source = this.getSouceByData(data);
                        }
                        break;
                      case 28:
                        if (!(this.player && this.player.player_)) {
                          _context4.next = 43;
                          break;
                        }

                        if (!(this.props.eventMode === 'monitor')) {
                          _context4.next = 39;
                          break;
                        }

                        if (!isSecond) {
                          _context4.next = 35;
                          break;
                        }

                        if (
                          this.player.player_ &&
                          this.player.player_.techName_ === 'Flash'
                        ) {
                          this.player.replaceNode();
                        }

                        this.player.src && this.player.src([source]);
                        this.keepRetry(source, 8000);
                        return _context4.abrupt('return');

                      case 35:
                        if (this.props.globalModal) {
                          this.showModal(5000);
                        }

                        setTimeout$2(function () {
                          console.log('playing aa', _this7.player);

                          if (
                            _this7.player.player_ &&
                            _this7.player.player_.techName_ === 'Flash'
                          ) {
                            _this7.replaceNode();

                            console.log('after playing', stringify$2(source));
                          }

                          _this7.player.src && _this7.player.src([source]);

                          _this7.keepRetry(source, 8000);
                        }, 5000);

                        _context4.next = 41;
                        break;

                      case 39:
                        if (
                          this.player.player_ &&
                          this.player.player_.techName_ === 'Flash'
                        ) {
                          this.replaceNode();
                          console.log('after playing', stringify$2(source));
                        } else if (
                          this.player.player_ &&
                          this.player.player_.techName_ === 'Flvjs'
                        ) {
                          this.player.reset && this.player.reset();
                        }

                        this.player.src && this.player.src([source]);
                        break;
                      case 41:
                        _context4.next = 46;
                        break;

                      case 43:
                        opts = _objectSpread$1({}, this.props);
                        opts.sources = [source];
                        this.newPlayer(opts);
                        break;
                      case 46:
                        //改变播放器倍率
                        if (
                          this.player &&
                          playRate &&
                          !isNaN(_parseFloat$2(playRate))
                        ) {
                          console.log('will change playrate');
                          this.player.changePlayRate(_parseFloat$2(playRate));
                        }
                        break;
                      case 47:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                },
                _callee2,
                this,
                [[17, 23]]
              );
            })
          );

          function handleUpdate(_x) {
            return _handleUpdate.apply(this, arguments);
          }

          return handleUpdate;
        })()
        /**
         * @description: 支持接口地址可配置，根据类型获取接口地址
         * url中的参数仅支持${sessionID}和${channelID}两个，
         * 分别对应options中的channelID和source中的sessionID（接口中获取）
         *
         *
         * @param {string} type
         * realplayKeepAlive:
         * changePlayRate:
         * jumpPlayTime:
         * stopVideoPlay:
         *
         * @return {string} apiUrl
         */
      },
      {
        key: 'getApiUrl',
        value: function getApiUrl(type) {
          var _context5;

          var apiSettings = this.props.apiSettings || dfApiSettings$1;
          var channelID = this.props.channelID;
          var apiUrl = JSON.parse(JSON.stringify(apiSettings[type]));
          if (channelID) {
            apiUrl.url = apiUrl.url.replace(/\$\{channelID\}/g, channelID);
          }

          if (startsWith$2((_context5 = apiUrl.url)).call(_context5, '/')) {
            apiUrl.url = this.props.yunliApiRoot + apiUrl.url;
          }

          return apiUrl;
        }
        /**
         * 获取播放地址
         */
      },
      {
        key: 'fetchSource',
        value: function fetchSource() {
          var _this$props2 = this.props,
            _this$props2$yunliApi = _this$props2.yunliApiRoot,
            beginTime = _this$props2.beginTime,
            endTime = _this$props2.endTime,
            _this$props2$timeout = _this$props2.timeout,
            timeout =
              _this$props2$timeout === void 0 ? 8000 : _this$props2$timeout,
            channelID = _this$props2.channelID,
            yunliMode = _this$props2.yunliMode,
            _this$props2$outputTy = _this$props2.outputType,
            outputType =
              _this$props2$outputTy === void 0 ? 'rtmp' : _this$props2$outputTy,
            playRate = _this$props2.playRate,
            xhr = _this$props2.xhr,
            afterFetchUrl = _this$props2.afterFetchUrl;
          this.setState({
            error: null
          }); //const { channelID, streamType } = this.state

          if (!channelID) {
            console.warn('channelID不能为空'); //this.setState({ error: 'channelID不能为空' })

            return;
          }

          var streamType = yunliMode || 'live';
          var params = {
            channelID: channelID,
            outputType: outputType
          };
          var type = 'realplay';

          if (streamType === 'history') {
            type = 'history';
            params = assign$4(params, {
              beginTime: beginTime,
              endTime: endTime
            });

            if (playRate && !isNaN(_parseFloat$2(playRate))) {
              params.speed = _parseFloat$2(playRate);
            }
          }

          var apiPlayType =
            type === 'realplay' ? 'getRealplayUrl' : 'getHistoryUrl';
          var api = this.getApiUrl(apiPlayType);

          var opt = _objectSpread$1(
            {
              // method: 'POST',
              // url: `${yunliApiRoot}/ylv/v1/${type}/${channelID}`,
              json: true,
              headers: {
                'Content-Type': 'application/json'
              },
              data: params,
              timeout: timeout
            },
            api
          );

          if (xhr && xhr.withCredentials) {
            opt.withCredentials = true;
          }

          if (xhr && xhr.headers) {
            opt.headers = assign$4(opt.headers, xhr.headers);
          }

          if (xhr && xhr.beforeFetch) {
            opt = xhr.beforeFetch(opt, apiPlayType);
          }

          return new promise$5(function (resolve, reject) {
            videojs.xhr(opt, function (err, resp) {
              console.log('resp', resp);

              if (xhr.afterFetch) {
                resp = xhr.afterFetch(resp, apiPlayType);
              }

              if (err) {
                reject(err);
              } else {
                var dt = resp.body;

                if (afterFetchUrl && typeof afterFetchUrl === 'function') {
                  dt = afterFetchUrl(dt);
                }

                resolve(dt);
              }
            });
          });
        }
      },
      {
        key: 'newPlayer',
        value: function newPlayer(opts) {
          console.log('new player');
          var this_ = this;
          this.player = new YunliVjsPlayer(this.videoNode, opts, function (p) {
            console.log('init player', p); //改变播放器倍率

            var playRate = this_.props.playRate;

            if (this_.player && playRate && !isNaN(_parseFloat$2(playRate))) {
              console.log('will change playrate');
              this_.player.changePlayRate(_parseFloat$2(playRate));
            }

            this_.keepRetry(null, 2000);

            if (opts.autoplay) {
              console.log('autoplay play', this);
              this_.player.play();
            }

            this_.player.player_.on('waiting', function () {
              if (
                this.player.player_ &&
                this.player.player_.techName_ === 'Flash'
              ) {
                this.flashRetry();
                return;
              }

              this_.setState({
                isPlaying: false
              });
            });
            this_.player.player_.on('playing', function () {
              this_.setState({
                isPlaying: true
              });
            }); //拦截到错误，添加click事件

            this_.player.player_.on('error', function () {
              this_.setState({
                isSetVideoError: !this.state.isSetVideoError
              });
            });
            this_.player.player_.on('keepAliveError', function () {
              console.log('keepalive error'); //this_.handleUpdate({}, false)
            });
            this_.player.player_.on('play', function () {
              console.log('keepalive play');
            });
          });

          if (this_.props.onError && this.player.player_) {
            this_.player.player_.on('error', function (err) {
              this_.props.onError(err, this_.player);
            });
          }
        } // wrap the player in a div with a `data-vjs-player` attribute
        // so videojs won't create additional wrapper in the DOM
        // see https://github.com/videojs/video.js/pull/3856
      },
      {
        key: 'render',
        value: function render() {
          var _this8 = this;

          console.log('render api', this);
          var _this$props3 = this.props,
            _this$props3$height = _this$props3.height,
            height =
              _this$props3$height === void 0 ? '100%' : _this$props3$height,
            _this$props3$width = _this$props3.width,
            width = _this$props3$width === void 0 ? '100%' : _this$props3$width;
          var error = this.state.error;
          var contStyle = {
            height: height,
            width: width,
            backgroundColor: '#000',
            position: 'relative'
          };
          var errStyle = {
            color: '#fff',
            textAlign: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: -1,
            transform: 'translate(-50%, -50%)'
          };
          var maskProps = {
            onDoubleClick: function onDoubleClick() {
              return (
                _this8.props.doubleClickHandler &&
                _this8.props.doubleClickHandler()
              );
            }
          };

          if (this.player.player_ && this.player.player_.error()) {
            maskProps.onClick = function () {
              _this8.clickRetryPlay();
            };
          }

          return /*#__PURE__*/ React.createElement(
            'div',
            {
              ref: function ref(el) {
                return (_this8.container = el);
              },
              style: contStyle
            },
            /*#__PURE__*/ React.createElement('video', {
              ref: function ref(node) {
                return (_this8.videoNode = node);
              },
              className: 'vjs-yunli video-js vjs-default-skin',
              'data-session': this.state.sessionID,
              'data-id': this.state.channelID
            }),
            /*#__PURE__*/ React.createElement(
              'div',
              _extends(
                {
                  className: 'video-mask'
                },
                maskProps
              )
            ),
            error
              ? /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    style: errStyle
                  },
                  error
                )
              : null
          );
        }
      }
    ]);

    return YunliVjsPlayerWithApi;
  })(React.Component);

  return YunliVjsPlayerWithApi;
});
