(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['@wazo/sdk'] = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var base64 = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	    module.exports = factory(global);
	}((
	    typeof self !== 'undefined' ? self
	        : typeof window !== 'undefined' ? window
	        : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal
	: commonjsGlobal
	), function(global) {
	    // existing version for noConflict()
	    var _Base64 = global.Base64;
	    var version = "2.4.9";
	    // if node.js and NOT React Native, we use Buffer
	    var buffer;
	    if (module.exports) {
	        try {
	            buffer = eval("require('buffer').Buffer");
	        } catch (err) {
	            buffer = undefined;
	        }
	    }
	    // constants
	    var b64chars
	        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	    var b64tab = function(bin) {
	        var t = {};
	        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
	        return t;
	    }(b64chars);
	    var fromCharCode = String.fromCharCode;
	    // encoder stuff
	    var cb_utob = function(c) {
	        if (c.length < 2) {
	            var cc = c.charCodeAt(0);
	            return cc < 0x80 ? c
	                : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
	                                + fromCharCode(0x80 | (cc & 0x3f)))
	                : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
	                   + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
	                   + fromCharCode(0x80 | ( cc         & 0x3f)));
	        } else {
	            var cc = 0x10000
	                + (c.charCodeAt(0) - 0xD800) * 0x400
	                + (c.charCodeAt(1) - 0xDC00);
	            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
	                    + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
	                    + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
	                    + fromCharCode(0x80 | ( cc         & 0x3f)));
	        }
	    };
	    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
	    var utob = function(u) {
	        return u.replace(re_utob, cb_utob);
	    };
	    var cb_encode = function(ccc) {
	        var padlen = [0, 2, 1][ccc.length % 3],
	        ord = ccc.charCodeAt(0) << 16
	            | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
	            | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
	        chars = [
	            b64chars.charAt( ord >>> 18),
	            b64chars.charAt((ord >>> 12) & 63),
	            padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
	            padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
	        ];
	        return chars.join('');
	    };
	    var btoa = global.btoa ? function(b) {
	        return global.btoa(b);
	    } : function(b) {
	        return b.replace(/[\s\S]{1,3}/g, cb_encode);
	    };
	    var _encode = buffer ?
	        buffer.from && Uint8Array && buffer.from !== Uint8Array.from
	        ? function (u) {
	            return (u.constructor === buffer.constructor ? u : buffer.from(u))
	                .toString('base64')
	        }
	        :  function (u) {
	            return (u.constructor === buffer.constructor ? u : new  buffer(u))
	                .toString('base64')
	        }
	        : function (u) { return btoa(utob(u)) }
	    ;
	    var encode = function(u, urisafe) {
	        return !urisafe
	            ? _encode(String(u))
	            : _encode(String(u)).replace(/[+\/]/g, function(m0) {
	                return m0 == '+' ? '-' : '_';
	            }).replace(/=/g, '');
	    };
	    var encodeURI = function(u) { return encode(u, true) };
	    // decoder stuff
	    var re_btou = new RegExp([
	        '[\xC0-\xDF][\x80-\xBF]',
	        '[\xE0-\xEF][\x80-\xBF]{2}',
	        '[\xF0-\xF7][\x80-\xBF]{3}'
	    ].join('|'), 'g');
	    var cb_btou = function(cccc) {
	        switch(cccc.length) {
	        case 4:
	            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
	                |    ((0x3f & cccc.charCodeAt(1)) << 12)
	                |    ((0x3f & cccc.charCodeAt(2)) <<  6)
	                |     (0x3f & cccc.charCodeAt(3)),
	            offset = cp - 0x10000;
	            return (fromCharCode((offset  >>> 10) + 0xD800)
	                    + fromCharCode((offset & 0x3FF) + 0xDC00));
	        case 3:
	            return fromCharCode(
	                ((0x0f & cccc.charCodeAt(0)) << 12)
	                    | ((0x3f & cccc.charCodeAt(1)) << 6)
	                    |  (0x3f & cccc.charCodeAt(2))
	            );
	        default:
	            return  fromCharCode(
	                ((0x1f & cccc.charCodeAt(0)) << 6)
	                    |  (0x3f & cccc.charCodeAt(1))
	            );
	        }
	    };
	    var btou = function(b) {
	        return b.replace(re_btou, cb_btou);
	    };
	    var cb_decode = function(cccc) {
	        var len = cccc.length,
	        padlen = len % 4,
	        n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
	            | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
	            | (len > 2 ? b64tab[cccc.charAt(2)] <<  6 : 0)
	            | (len > 3 ? b64tab[cccc.charAt(3)]       : 0),
	        chars = [
	            fromCharCode( n >>> 16),
	            fromCharCode((n >>>  8) & 0xff),
	            fromCharCode( n         & 0xff)
	        ];
	        chars.length -= [0, 0, 2, 1][padlen];
	        return chars.join('');
	    };
	    var atob = global.atob ? function(a) {
	        return global.atob(a);
	    } : function(a){
	        return a.replace(/[\s\S]{1,4}/g, cb_decode);
	    };
	    var _decode = buffer ?
	        buffer.from && Uint8Array && buffer.from !== Uint8Array.from
	        ? function(a) {
	            return (a.constructor === buffer.constructor
	                    ? a : buffer.from(a, 'base64')).toString();
	        }
	        : function(a) {
	            return (a.constructor === buffer.constructor
	                    ? a : new buffer(a, 'base64')).toString();
	        }
	        : function(a) { return btou(atob(a)) };
	    var decode = function(a){
	        return _decode(
	            String(a).replace(/[-_]/g, function(m0) { return m0 == '-' ? '+' : '/' })
	                .replace(/[^A-Za-z0-9\+\/]/g, '')
	        );
	    };
	    var noConflict = function() {
	        var Base64 = global.Base64;
	        global.Base64 = _Base64;
	        return Base64;
	    };
	    // export Base64
	    global.Base64 = {
	        VERSION: version,
	        atob: atob,
	        btoa: btoa,
	        fromBase64: decode,
	        toBase64: encode,
	        utob: utob,
	        encode: encode,
	        encodeURI: encodeURI,
	        btou: btou,
	        decode: decode,
	        noConflict: noConflict,
	        __buffer__: buffer
	    };
	    // if ES5 is available, make Base64.extendString() available
	    if (typeof Object.defineProperty === 'function') {
	        var noEnum = function(v){
	            return {value:v,enumerable:false,writable:true,configurable:true};
	        };
	        global.Base64.extendString = function () {
	            Object.defineProperty(
	                String.prototype, 'fromBase64', noEnum(function () {
	                    return decode(this)
	                }));
	            Object.defineProperty(
	                String.prototype, 'toBase64', noEnum(function (urisafe) {
	                    return encode(this, urisafe)
	                }));
	            Object.defineProperty(
	                String.prototype, 'toBase64URI', noEnum(function () {
	                    return encode(this, true)
	                }));
	        };
	    }
	    //
	    // export Base64 to the namespace
	    //
	    if (global['Meteor']) { // Meteor.js
	        Base64 = global.Base64;
	    }
	    // module.exports and AMD are mutually exclusive.
	    // module.exports has precedence.
	    if (module.exports) {
	        module.exports.Base64 = global.Base64;
	    }
	    // that's it!
	    return {Base64: global.Base64}
	}));
	});
	var base64_1 = base64.Base64;

	/*       */

	class BadResponse extends Error {
	  static fromResponse(error        , status        ) {
	    return new BadResponse(error.message, status, error.timestamp, error.error_id, error.details);
	  }

	  static fromText(response        , status        ) {
	    return new BadResponse(response, status);
	  }

	                  
	                 
	                     
	                   
	                   

	  constructor(
	    message        ,
	    status        ,
	    timestamp          = null,
	    errorId          = null,
	    details          = null
	  ) {
	    super(message);

	    this.timestamp = timestamp;
	    this.status = status;
	    this.errorId = errorId;
	    this.details = details;
	  }
	}

	/*       */

	class ServerError extends BadResponse {
	  static fromResponse(error        , status        ) {
	    return new ServerError(error.message, status, error.timestamp, error.error_id, error.details);
	  }

	  static fromText(response        , status        ) {
	    return new ServerError(response, status);
	  }
	}

	/*       */

	class Logger {
	  static hasDebug() {
	    return typeof process !== 'undefined' && (+process.env.DEBUG === 1 || process.env.DEBUG === 'true');
	  }

	  static logRequest(url        , { method, body, headers }        , response        ) {
	    if (!Logger.hasDebug()) {
	      return;
	    }

	    const { status } = response;

	    let curl = `${status} - curl ${method !== 'get' ? `-X ${method.toUpperCase()}` : ''}`;
	    Object.keys(headers).forEach(headerName => {
	      curl += ` -H '${headerName}: ${headers[headerName]}'`;
	    });

	    curl += ` ${url}`;

	    if (body) {
	      curl += ` -d '${body}'`;
	    }

	    console.info(curl);
	  }
	}

	/*       */
	                                             

	const methods = ['head', 'get', 'post', 'put', 'delete'];

	// Use a function here to be able to mock it in tests
	const realFetch = () => {
	  if (typeof document !== 'undefined') {
	    // Browser
	    return window.fetch;
	  }

	  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
	    // React native
	    return fetch;
	  }

	  // nodejs
	  // this package is disable for react-native in package.json because it requires nodejs modules
	  return require('node-fetch/lib/index');
	};

	class ApiRequester {
	                 
	                 

	                 
	                
	                 
	                
	                   

	  // eslint-disable-next-line
	  static successResponseParser(response        , isJson         ) {
	    return response.status === 204;
	  }

	  static defaultParser(response        ) {
	    return response.json().then((data        ) => data);
	  }

	  static getHeaders(header                  )         {
	    if (header instanceof Object) {
	      return header;
	    }

	    return {
	      'X-Auth-Token': header,
	      Accept: 'application/json',
	      'Content-Type': 'application/json'
	    };
	  }

	  static getQueryString(obj        )         {
	    return Object.keys(obj)
	      .filter(key => obj[key])
	      .map(key => `${key}=${encodeURIComponent(obj[key])}`)
	      .join('&');
	  }

	  static base64Encode(str        )         {
	    return typeof btoa !== 'undefined' ? btoa(str) : base64_1.encode(str);
	  }

	  // @see https://github.com/facebook/flow/issues/183#issuecomment-358607052
	  constructor({ server, agent = null }                                              ) {
	    this.server = server;
	    this.agent = agent;

	    methods.forEach(method => {
	      // $FlowFixMe
	      ApiRequester.prototype[method] = function sugar(...args) {
	        // Add method in arguments passed to `call`
	        args.splice(1, 0, method);

	        return this.call.call(this, ...args);
	      };
	    });
	  }

	  call(
	    path        ,
	    method         = 'get',
	    body          = null,
	    headers                    = null,
	    parse           = ApiRequester.defaultParser
	  )               {
	    const url = this.computeUrl(method, path, body);
	    const newBody = body && method !== 'get' ? JSON.stringify(body) : null;
	    const isHead = method === 'head';
	    const hasEmptyResponse = method === 'delete' || isHead;
	    const newParse = hasEmptyResponse ? ApiRequester.successResponseParser : parse;
	    const options = {
	      method,
	      body: newBody,
	      headers: headers ? ApiRequester.getHeaders(headers) : {},
	      agent: this.agent
	    };

	    return realFetch()(url, options).then(response => {
	      const contentType = response.headers.get('content-type') || '';
	      const isJson = contentType.indexOf('application/json') !== -1;

	      Logger.logRequest(url, options, response);

	      // Throw an error only if status >= 500
	      if ((isHead && response.status >= 500) || (!isHead && response.status >= 400)) {
	        const promise = isJson ? response.json() : response.text();
	        const exceptionClass = response.status >= 500 ? ServerError : BadResponse;

	        return promise.then(err => {
	          throw typeof err === 'string'
	            ? exceptionClass.fromText(err, response.status)
	            : exceptionClass.fromResponse(err, response.status);
	        });
	      }

	      return newParse(response, isJson);
	    });
	  }

	  computeUrl(method        , path        , body         )         {
	    const url = `${this.baseUrl}/${path}`;

	    return method === 'get' && body && Object.keys(body).length ? `${url}?${ApiRequester.getQueryString(body)}` : url;
	  }

	  get baseUrl()         {
	    return `https://${this.server}/api`;
	  }
	}

	//      

	var newFrom = (instance     , ToClass     ) => {
	  const args = {};
	  Object.getOwnPropertyNames(instance).forEach(prop => {
	    args[prop] = instance[prop];
	  });

	  return new ToClass(args);
	};

	//      

	                  
	                  
	                
	             
	                                              
	  

	                     
	                           
	                         
	                               
	            
	  

	                      
	             
	                              
	  

	class Line {
	             
	                               

	  static parse(plain              )       {
	    return new Line({
	      id: plain.id,
	      extensions: plain.extensions
	    });
	  }

	  static newFrom(profile      ) {
	    return newFrom(profile, Line);
	  }

	  constructor({ id, extensions }                = {}) {
	    this.id = id;
	    this.extensions = extensions;
	  }
	}

	//      

	                 
	                      
	                  
	  

	const FORWARD_KEYS = {
	  BUSY: 'busy',
	  NO_ANSWER: 'noanswer',
	  UNCONDITIONAL: 'unconditional'
	};

	                               
	                      
	                   
	             
	  

	class ForwardOption {
	                      
	                   
	              

	  static parse(plain          , key        )                {
	    return new ForwardOption({
	      destination: plain.destination || '',
	      enabled: plain.enabled,
	      key
	    });
	  }

	  static newFrom(profile               ) {
	    return newFrom(profile, ForwardOption);
	  }

	  constructor({ destination, enabled, key }                         = {}) {
	    this.destination = destination;
	    this.enabled = enabled;
	    this.key = key;
	  }

	  setDestination(number        )                {
	    this.destination = number;

	    return this;
	  }

	  is(other               ) {
	    return this.key === other.key;
	  }
	}

	//      

	const PRESENCE = {
	  AVAILABLE: 'available',
	  DO_NOT_DISTURB: 'donotdisturb',
	  DISCONNECTED: 'disconnected'
	};

	                        
	                                              
	                    
	                     
	                   
	                    
	               
	                
	               
	                                                                                                                    
	                              
	                           
	     
	             
	                   
	                    
	                   
	                
	             
	           
	                          
	                      
	      
	               
	                          
	                      
	      
	                    
	                          
	                      
	     
	    
	                               
	             
	          
	                      
	     
	   
	  

	                         
	             
	                    
	                   
	                
	                     
	                   
	                       
	                                 
	                         
	                   
	  

	class Profile {
	             
	                    
	                   
	                
	                     
	                   
	                       
	                                 
	                         
	                    

	  static parse(plain                 )          {
	    return new Profile({
	      id: plain.uuid,
	      firstName: plain.firstName || plain.firstname || '',
	      lastName: plain.lastName || plain.lastname || '',
	      email: plain.email,
	      lines: plain.lines.map(line => Line.parse(line)),
	      username: plain.username,
	      mobileNumber: plain.mobile_phone_number || '',
	      forwards: [
	        ForwardOption.parse(plain.forwards.unconditional, FORWARD_KEYS.UNCONDITIONAL),
	        ForwardOption.parse(plain.forwards.noanswer, FORWARD_KEYS.NO_ANSWER),
	        ForwardOption.parse(plain.forwards.busy, FORWARD_KEYS.BUSY)
	      ],
	      doNotDisturb: plain.services.dnd.enabled
	    });
	  }

	  static newFrom(profile         ) {
	    return newFrom(profile, Profile);
	  }

	  constructor({
	    id,
	    firstName,
	    lastName,
	    email,
	    lines,
	    username,
	    mobileNumber,
	    forwards,
	    doNotDisturb,
	    presence
	  }                   = {}) {
	    this.id = id;
	    this.firstName = firstName;
	    this.lastName = lastName;
	    this.email = email;
	    this.lines = lines;
	    this.username = username;
	    this.mobileNumber = mobileNumber;
	    this.forwards = forwards;
	    this.doNotDisturb = doNotDisturb;
	    this.presence = presence;
	  }

	  hasId(id        ) {
	    return id === this.id;
	  }

	  setMobileNumber(number        ) {
	    this.mobileNumber = number;

	    return this;
	  }

	  setForwardOption(forwardOption               ) {
	    const updatedForwardOptions = this.forwards.slice();
	    const index = updatedForwardOptions.findIndex(forward => forward.is(forwardOption));
	    updatedForwardOptions.splice(index, 1, forwardOption);

	    this.forwards = updatedForwardOptions;

	    return this;
	  }

	  setDoNotDisturb(enabled         ) {
	    this.doNotDisturb = enabled;

	    return this;
	  }

	  setPresence(presence        ) {
	    this.presence = presence;

	    return this;
	  }
	}

	//      

	                          
	                    
	                   
	                      
	                 
	                   
	                      
	                    
	               
	  

	                        
	                 
	                            
	              
	                    
	                    
	                      
	                        
	                      
	                           
	   
	  

	                         
	                               
	               
	                                
	                                 
	  

	                                
	             
	                     
	                    
	                  
	                 
	                      
	                    
	                   
	                
	                    
	                     
	                   
	  

	                         
	              
	                
	                
	                  
	                      
	                 
	                      
	                    
	                   
	                
	                      
	                     
	                    
	                  
	                    
	                  
	                      
	               
	  

	class Contact {
	              
	                
	                
	                  
	                      
	                 
	                      
	                    
	                   
	                
	                      
	                     
	                    
	                  
	                   
	                  
	                

	  static merge(oldContacts                , newContacts                )                 {
	    return newContacts.map(current => {
	      const old = oldContacts.find(contact => contact.is(current));

	      return typeof old !== 'undefined' ? current.merge(old) : current;
	    });
	  }

	  static parseMany(response                  )                 {
	    return response.results.map(r => Contact.parse(r, response.column_types));
	  }

	  static parse(plain                 , columns                )          {
	    return new Contact({
	      name: plain.column_values[columns.indexOf('name')],
	      number: plain.column_values[columns.indexOf('number')] || '',
	      favorited: plain.column_values[columns.indexOf('favorite')],
	      email: plain.column_values[columns.indexOf('email')] || '',
	      entreprise: plain.column_values[columns.indexOf('entreprise')] || '',
	      birthday: plain.column_values[columns.indexOf('birthday')] || '',
	      address: plain.column_values[columns.indexOf('address')] || '',
	      note: plain.column_values[columns.indexOf('note')] || '',
	      endpointId: plain.relations.endpoint_id,
	      personal: plain.column_values[columns.indexOf('personal')],
	      source: plain.source,
	      sourceId: plain.relations.source_entry_id,
	      uuid: plain.relations.user_uuid
	    });
	  }

	  static parseManyPersonal(results                                )                  {
	    return results.map(r => Contact.parsePersonal(r));
	  }

	  static parsePersonal(plain                         )           {
	    return new Contact({
	      name: `${plain.firstName || plain.firstname || ''} ${plain.lastName || plain.lastname || ''}`,
	      number: plain.number || '',
	      email: plain.email || '',
	      source: 'personal',
	      sourceId: plain.id,
	      entreprise: plain.entreprise || '',
	      birthday: plain.birthday || '',
	      address: plain.address || '',
	      note: plain.note || '',
	      favorited: false,
	      personal: true
	    });
	  }

	  static newFrom(profile         ) {
	    return newFrom(profile, Contact);
	  }

	  constructor({
	    id,
	    uuid,
	    name,
	    number,
	    email,
	    source,
	    sourceId,
	    entreprise,
	    birthday,
	    address,
	    note,
	    presence,
	    status,
	    endpointId,
	    personal
	  }                   = {}) {
	    this.id = id;
	    this.uuid = uuid;
	    this.name = name;
	    this.number = number;
	    this.email = email;
	    this.source = source;
	    this.sourceId = sourceId || '';
	    this.entreprise = entreprise;
	    this.birthday = birthday;
	    this.address = address;
	    this.note = note;
	    this.presence = presence;
	    this.status = status;
	    this.endpointId = endpointId;
	    this.personal = personal;
	  }

	  setFavorite(value         ) {
	    this.favorited = value;

	    return this;
	  }

	  is(other         )          {
	    return Boolean(other) && this.sourceId === other.sourceId && (this.uuid ? this.uuid === other.uuid : true);
	  }

	  hasId(id        )          {
	    return this.uuid === id;
	  }

	  hasNumber(number        )          {
	    return this.number === number;
	  }

	  hasEndpointId(endpointId        )          {
	    return this.endpointId === endpointId;
	  }

	  isAvailable()          {
	    return this.presence === 'available';
	  }

	  isDoNotDisturb()          {
	    return this.presence === 'donotdisturb';
	  }

	  isDisconnected()          {
	    return this.presence === 'disconnected';
	  }

	  merge(old         )          {
	    this.presence = old.presence;
	    this.status = old.status;

	    return this;
	  }

	  isIntern()          {
	    return !!this.uuid;
	  }

	  isCallable(session         )          {
	    return !!this.number && !!session && !session.is(this);
	  }

	  separateName()                                          {
	    if (!this.name) {
	      return {
	        firstName: '',
	        lastName: ''
	      };
	    }
	    const names = this.name.split(' ');
	    const firstName = names[0];
	    const lastName = names.slice(1).join(' ');

	    return {
	      firstName,
	      lastName
	    };
	  }
	}

	//      

	                 
	         
	                 
	                        
	                           
	                      
	                      
	                    
	                       
	                           
	                
	                       
	                 
	                        
	                           
	                            
	                      
	                                     
	                   
	     
	   
	  

	                         
	                
	               
	                   
	  

	class Session {
	                
	               
	                    

	  static parse(plain          )           {
	    return new Session({
	      token: plain.data.token,
	      uuid: plain.data.xivo_user_uuid
	    });
	  }

	  static newFrom(profile         ) {
	    return newFrom(profile, Session);
	  }

	  constructor({ token, uuid, profile }                   = {}) {
	    this.token = token;
	    this.uuid = uuid;
	    this.profile = profile;
	  }

	  is(contact         )          {
	    return Boolean(contact) && this.uuid === contact.uuid;
	  }

	  using(profile         )          {
	    this.profile = profile;

	    return this;
	  }

	  displayName()         {
	    return this.profile ? `${this.profile.firstName} ${this.profile.lastName}` : '';
	  }

	  primaryLine()        {
	    return this.profile ? this.profile.lines[0] : null;
	  }

	  primaryContext()          {
	    const line = this.primaryLine();

	    return line ? line.extensions[0].context : null;
	  }

	  primaryNumber()          {
	    const line = this.primaryLine();

	    return line ? line.extensions[0].exten : null;
	  }
	}

	/*       */

	const DEFAULT_BACKEND_USER = 'wazo_user';
	const DETAULT_EXPIRATION = 3600;

	var authMethods = (client              , baseUrl        ) => ({
	  checkToken(token       )                   {
	    return client.head(`${baseUrl}/token/${token}`, null, {});
	  },

	  authenticate(token       )                    {
	    return client.get(`${baseUrl}/token/${token}`, null, {}).then(response => Session.parse(response));
	  },

	  logIn(params                                                                             )                    {
	    const body = {
	      backend: params.backend || DEFAULT_BACKEND_USER,
	      expiration: params.expiration || DETAULT_EXPIRATION
	    };
	    const headers = {
	      Authorization: `Basic ${ApiRequester.base64Encode(`${params.username}:${params.password}`)}`,
	      'Content-Type': 'application/json'
	    };

	    return client.post(`${baseUrl}/token`, body, headers).then(response => Session.parse(response));
	  },

	  logOut(token       )                          {
	    return client.delete(`${baseUrl}/token/${token}`, null, {}, ApiRequester.successResponseParser);
	  },

	  updatePassword(token       , userUuid      , oldPassword        , newPassword        )                   {
	    const body = {
	      new_password: newPassword,
	      old_password: oldPassword
	    };

	    return client.put(`${baseUrl}/users/${userUuid}/password`, body, token, ApiRequester.successResponseParser);
	  },

	  sendDeviceToken(token       , userUuid      , deviceToken        ) {
	    const body = {
	      token: deviceToken
	    };

	    return client.post(`${baseUrl}/users/${userUuid}/external/mobile`, body, token);
	  },

	  removeDeviceToken(token       , userUuid      ) {
	    return client.delete(`${baseUrl}/users/${userUuid}/external/mobile`, null, token);
	  },

	  getUser(token       , userUuid      )                           {
	    return client.get(`${baseUrl}/users/${userUuid}`, null, token);
	  },

	  listTenants(token       )                               {
	    return client.get(`${baseUrl}/tenants`, null, token);
	  },

	  getTenant(token       , tenantUuid      )                             {
	    return client.get(`${baseUrl}/tenants/${tenantUuid}`, null, token);
	  },

	  createTenant(token       , name        )                                 {
	    return client.post(`${baseUrl}/tenants`, { name }, token);
	  },

	  deleteTenant(token       , uuid      )                                  {
	    return client.delete(`${baseUrl}/tenants/${uuid}`, null, token);
	  },

	  listUsers(token       )                             {
	    return client.get(`${baseUrl}/users`, null, token);
	  },

	  listGroups(token       )                              {
	    return client.get(`${baseUrl}/groups`, null, token);
	  },

	  listPolicies(token       )                                {
	    return client.get(`${baseUrl}/policies`, null, token);
	  }
	});

	/*       */
	                                                                                       

	var applicationMethods = (client              , baseUrl        ) => ({
	  answerCall(
	    token        ,
	    applicationUuid        ,
	    callId        ,
	    context        ,
	    exten        ,
	    autoanswer        
	  ) {
	    const url = `${baseUrl}/${applicationUuid}/nodes`;
	    const body = { calls: [{ id: callId }] };

	    return client.post(url, body, token, res => res.uuid).then(nodeUuid =>
	      client.post(`${url}/${nodeUuid}/calls`, { context, exten, autoanswer }, token).then(data => ({
	        nodeUuid,
	        data
	      }))
	    );
	  },

	  calls(token       , applicationUuid        ) {
	    return client.get(`${baseUrl}/${applicationUuid}/calls`, null, token);
	  },

	  hangupCall(token       , applicationUuid        , callId        ) {
	    const url = `${baseUrl}/${applicationUuid}/calls/${callId}`;

	    return client.delete(url, null, token);
	  },

	  playCall(token       , applicationUuid        , callId        , language        , uri        ) {
	    return client.post(`${baseUrl}/${applicationUuid}/calls/${callId}/play`, { language, uri }, token);
	  },

	  addCallNodes(token       , applicationUuid        , nodeUuid        , callId        )                   {
	    return client.put(`${baseUrl}/${applicationUuid}/nodes/${nodeUuid}/calls/${callId}`, null, token);
	  },

	  addNewCallNodes(
	    token       ,
	    applicationUuid        ,
	    nodeUuid        ,
	    context        ,
	    exten        ,
	    autoanswer        
	  ) {
	    const data = { context, exten, autoanswer };

	    return client.post(`${baseUrl}/${applicationUuid}/nodes/${nodeUuid}/calls`, data, token);
	  },

	  listCallsNodes(token       , applicationUuid        , nodeUuid        )                                 {
	    return client.get(`${baseUrl}/${applicationUuid}/nodes/${nodeUuid}`, null, token);
	  },

	  listNodes(token       , applicationUuid        )                             {
	    return client.get(`${baseUrl}/${applicationUuid}/nodes`, null, token);
	  },

	  removeNode(token       , applicationUuid        , nodeUuid        ) {
	    return client.delete(`${baseUrl}/${applicationUuid}/nodes/${nodeUuid}`, null, token);
	  },

	  removeCallNodes(token       , applicationUuid        , nodeUuid        , callId        ) {
	    return client.delete(`${baseUrl}/${applicationUuid}/nodes/${nodeUuid}/calls/${callId}`, null, token);
	  }
	});

	/*       */

	var confdMethods = (client              , baseUrl        ) => ({
	  listUsers(token       )                                  {
	    return client.get(`${baseUrl}/users`, null, token);
	  },

	  getUser(token       , userUuid        )                   {
	    return client.get(`${baseUrl}/users/${userUuid}`, null, token).then(response => Profile.parse(response));
	  },

	  updateUser(token       , userUuid        , profile         )                   {
	    const body = {
	      firstname: profile.firstName,
	      lastname: profile.lastName,
	      email: profile.email,
	      mobile_phone_number: profile.mobileNumber
	    };

	    return client.put(`${baseUrl}/users/${userUuid}`, body, token, ApiRequester.successResponseParser);
	  },

	  updateForwardOption(
	    token       ,
	    userUuid        ,
	    key        ,
	    destination        ,
	    enabled         
	  )                   {
	    const url = `${baseUrl}/users/${userUuid}/forwards/${key}`;
	    return client.put(url, { destination, enabled }, token, ApiRequester.successResponseParser);
	  },

	  updateDoNotDisturb(token       , userUuid      , enabled         )                   {
	    const url = `${baseUrl}/users/${userUuid}/services/dnd`;

	    return client.put(url, { enabled }, token, ApiRequester.successResponseParser);
	  },

	  // @TODO: type response
	  getUserLineSip(token       , userUuid        , lineId        ) {
	    return client.get(`${baseUrl}/users/${userUuid}/lines/${lineId}/associated/endpoints/sip`, null, token);
	  },

	  listApplications(token       )                                    {
	    const url = `${baseUrl}/applications?recurse=true`;

	    return client.get(url, null, token);
	  },

	  getSIP(token       , userUuid      , lineId        )                        {
	    return client.get(`${baseUrl}/users/${userUuid}/lines/${lineId}/associated/endpoints/sip`, null, token);
	  }
	});

	/*       */

	var accessdMethods = (client              , baseUrl        ) => ({
	  listSubscriptions(token        ) {
	    return client.get(`${baseUrl}/subscriptions?recurse=true`, null, token);
	  },
	  createSubscription(
	    token        ,
	    { tenantUuid, productSku, name, startDate, contractDate, autoRenew, term }        
	  ) {
	    const body = {
	      product_sku: productSku,
	      name,
	      start_date: startDate,
	      contract_date: contractDate,
	      auto_renew: autoRenew,
	      term
	    };

	    const headers         = {
	      'X-Auth-Token': token,
	      'Content-Type': 'application/json'
	    };
	    if (tenantUuid) {
	      headers['Wazo-Tenant'] = tenantUuid;
	    }

	    return client.post(`${baseUrl}/subscriptions`, body, headers);
	  },
	  getSubscription(token        , uuid        ) {
	    return client.get(`${baseUrl}/subscriptions/${uuid}`, null, token);
	  },
	  listAuthorizations(token        , subscriptionUuid        ) {
	    return client.get(`${baseUrl}/subscriptions/${subscriptionUuid}/authorizations`, null, token);
	  },
	  getAuthorization(token        , subscriptionUuid        , uuid        ) {
	    return client.get(`${baseUrl}/subscriptions/${subscriptionUuid}/authorizations/${uuid}`, null, token);
	  },
	  createAuthorization(token        , subscriptionUuid        , { startDate, term, service, rules, autoRenew }        ) {
	    const url = `${baseUrl}/subscriptions/${subscriptionUuid}/authorizations`;
	    const body = {
	      start_date: startDate,
	      term,
	      service,
	      rules,
	      auto_renew: autoRenew
	    };

	    return client.post(url, body, token);
	  }
	});

	//      

	                     
	               
	                                  
	                                
	                    
	              
	                             
	                          
	  

	                             
	             
	             
	                  
	                    
	                
	                     
	                  
	    
	           
	                     
	                  
	    
	               
	  

	                             
	              
	                    
	                     
	  

	                 
	                            
	  

	const uuid = () => {
	  const s4 = () =>
	    Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);

	  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
	};

	class ChatMessage {
	             
	             
	                  
	                    
	                
	                     
	                  
	    

	           
	                     
	                  
	    

	                

	  static parseMany(plain          )                     {
	    return plain.items.map(item => ChatMessage.parse(item));
	  }

	  static parse(plain              )              {
	    return new ChatMessage({
	      id: uuid(),
	      date: new Date(plain.date),
	      message: plain.msg,
	      direction: plain.direction,
	      destination: {
	        serverId: plain.destination_server_uuid,
	        userId: plain.destination_user_uuid
	      },
	      source: {
	        serverId: plain.source_server_uuid,
	        userId: plain.source_user_uuid
	      },
	      read: true
	    });
	  }

	  static parseMessageSent(plain                      )              {
	    return new ChatMessage({
	      id: uuid(),
	      date: new Date(),
	      message: plain.msg,
	      direction: 'sent',
	      destination: {
	        serverId: plain.to[0],
	        userId: plain.to[1]
	      },
	      source: {
	        serverId: plain.from[0],
	        userId: plain.from[1]
	      },
	      read: true
	    });
	  }

	  static parseMessageReceived(plain                      )              {
	    return new ChatMessage({
	      id: uuid(),
	      date: new Date(),
	      message: plain.msg,
	      direction: 'received',
	      destination: {
	        serverId: plain.to[0],
	        userId: plain.to[1]
	      },
	      source: {
	        serverId: plain.from[0],
	        userId: plain.from[1]
	      },
	      read: false
	    });
	  }

	  static newFrom(profile             ) {
	    return newFrom(profile, ChatMessage);
	  }

	  constructor({ id, date, message, direction, destination, source, read = true }                       = {}) {
	    this.id = id;
	    this.date = date;
	    this.message = message;
	    this.direction = direction;
	    this.destination = destination;
	    this.source = source;
	    this.read = read;
	  }

	  is(other             ) {
	    return this.id === other.id;
	  }

	  isIncoming() {
	    return this.direction === 'received';
	  }

	  acknowledge() {
	    this.read = true;

	    return this;
	  }

	  getTheOtherParty() {
	    if (this.direction === 'sent') {
	      return this.destination.userId;
	    }
	    return this.source.userId;
	  }
	}

	//      

	                        
	                         
	                        
	                   
	             
	                 
	                   
	  

	                 
	             
	               
	                 
	                  
	               
	                 
	                 
	                                    
	    
	  

	                           
	              
	              
	                    
	           
	                 
	                  
	    
	                   
	  

	class Voicemail {
	              
	              
	                    
	                   
	           
	                 
	                  
	    

	  static parse(plain                 )            {
	    return new Voicemail({
	      id: plain.id,
	      date: new Date(plain.timestamp),
	      duration: plain.duration * 1000,
	      caller: {
	        name: plain.caller_id_name,
	        number: plain.caller_id_num
	      },
	      unread: plain.folder ? plain.folder.type === 'new' : null
	    });
	  }

	  static parseMany(plain          )                   {
	    const plainUnread = plain.folders.filter(folder => folder.type === 'new')[0].messages;
	    const plainRead = plain.folders.filter(folder => folder.type === 'old')[0].messages;

	    const unread = plainUnread.map(message => Voicemail.parse(message)).map(voicemail => voicemail.makeAsUnRead());
	    const read = plainRead.map(message => Voicemail.parse(message)).map(voicemail => voicemail.acknowledge());

	    return [...unread, ...read];
	  }

	  static newFrom(profile           ) {
	    return newFrom(profile, Voicemail);
	  }

	  constructor({ id, date, duration, caller, unread }                     = {}) {
	    this.id = id;
	    this.date = date;
	    this.duration = duration;
	    this.caller = caller;
	    this.unread = unread;
	  }

	  is(other           )          {
	    return other && this.id === other.id;
	  }

	  acknowledge() {
	    this.unread = false;

	    return this;
	  }

	  makeAsUnRead() {
	    this.unread = true;

	    return this;
	  }

	  contains(query        )          {
	    if (!query) {
	      return true;
	    }

	    return this.caller.name.toUpperCase().includes(query.toUpperCase()) || this.caller.number.includes(query);
	  }
	}

	//      

	                     
	                  
	                              
	                                
	                 
	                        
	                  
	  

	                      
	             
	                     
	                       
	                  
	                 
	                    
	  

	class Call {
	             
	                     
	                       
	                  
	                 
	                     

	  static parseMany(plain                     )              {
	    return plain.map((plainCall              ) => Call.parse(plainCall));
	  }

	  static parse(plain              )       {
	    return new Call({
	      id: +plain.call_id,
	      calleeName: plain.peer_caller_id_name,
	      calleeNumber: plain.peer_caller_id_number,
	      onHold: plain.on_hold,
	      status: plain.status,
	      startingTime: new Date(plain.creation_time)
	    });
	  }

	  static newFrom(profile      ) {
	    return newFrom(profile, Call);
	  }

	  constructor({ id, calleeName, calleeNumber, onHold, status, startingTime }                = {}) {
	    this.id = id;
	    this.calleeName = calleeName;
	    this.calleeNumber = calleeNumber;
	    this.onHold = onHold;
	    this.status = status;
	    this.startingTime = startingTime;
	  }

	  getElapsedTimeInSeconds()         {
	    const now = Date.now();
	    return (now - this.startingTime) / 1000;
	  }

	  separateCalleeName()                                          {
	    const names = this.calleeName.split(' ');
	    const firstName = names[0];
	    const lastName = names.slice(1).join(' ');

	    return { firstName, lastName };
	  }

	  is(other      )          {
	    return this.id === other.id;
	  }

	  hasACalleeName()          {
	    return this.calleeName.length > 0;
	  }

	  hasNumber(number        )          {
	    return this.calleeNumber === number;
	  }

	  isUp()          {
	    return this.status === 'Up';
	  }

	  isDown()          {
	    return this.status === 'Down';
	  }

	  isRinging()          {
	    return this.isRingingIncoming() || this.isRingingOutgoing();
	  }

	  isRingingIncoming()          {
	    return this.status === 'Ringing';
	  }

	  isRingingOutgoing()          {
	    return this.status === 'Ring';
	  }

	  isFromTransfer()          {
	    return this.status === 'Down' || this.status === 'Ringing';
	  }

	  isOnHold()          {
	    return this.onHold;
	  }

	  putOnHold()       {
	    this.onHold = true;
	  }

	  resume()       {
	    this.onHold = false;
	  }
	}

	/*       */

	var ctidNgMethods = (client              , baseUrl        ) => ({
	  updatePresence(token       , presence        )                   {
	    return client.put(`${baseUrl}/users/me/presences`, { presence }, token, ApiRequester.successResponseParser);
	  },

	  listMessages(token       , participantUuid       , limit         )                              {
	    const query         = {};

	    if (participantUuid) {
	      query.participant_user_uuid = participantUuid;
	    }

	    if (limit) {
	      query.limit = limit;
	    }

	    return client.get(`${baseUrl}/users/me/chats`, query, token).then(response => ChatMessage.parseMany(response));
	  },

	  sendMessage(token       , alias        , msg        , toUserId        ) {
	    const body = { alias, msg, to: toUserId };

	    return client.post(`${baseUrl}/users/me/chats`, body, token, ApiRequester.successResponseParser);
	  },

	  makeCall(token       , extension        ) {
	    return client.post(`${baseUrl}/users/me/calls`, { from_mobile: true, extension }, token);
	  },

	  cancelCall(token       , callId        )                   {
	    return client.delete(`${baseUrl}/users/me/calls/${callId}`, null, token);
	  },

	  listCalls(token       )                       {
	    return client.get(`${baseUrl}/users/me/calls`, null, token).then(response => Call.parseMany(response.items));
	  },

	  relocateCall(token       , callId        , destination        , lineId         ) {
	    const body         = {
	      completions: ['answer'],
	      destination,
	      initiator_call: callId
	    };

	    if (lineId) {
	      body.location = { line_id: lineId };
	    }

	    return client.post(`${baseUrl}/users/me/relocates`, body, token);
	  },

	  listVoicemails(token       )                                           {
	    return client.get(`${baseUrl}/users/me/voicemails`, null, token).then(response => Voicemail.parseMany(response));
	  },

	  deleteVoicemail(token       , voicemailId        )                   {
	    return client.delete(`${baseUrl}/users/me/voicemails/messages/${voicemailId}`, null, token);
	  },

	  getPresence(token       , contactUuid      )                                                                      {
	    return client.get(`${baseUrl}/users/${contactUuid}/presences`, null, token);
	  },

	  getStatus(token       , lineUuid      ) {
	    return client.get(`${baseUrl}/lines/${lineUuid}/presences`, null, token);
	  }
	});

	/*       */
	                                                    

	const getContactPayload = (contact                      ) => ({
	  email: contact.email,
	  firstname: contact.firstName ? contact.firstName : '',
	  lastname: contact.lastName ? contact.lastName : '',
	  number: contact.phoneNumber ? contact.phoneNumber : '',
	  entreprise: contact.entreprise ? contact.entreprise : '',
	  birthday: contact.birthday ? contact.birthday : '',
	  address: contact.address ? contact.address : '',
	  note: contact.note ? contact.note : ''
	});

	var dirdMethods = (client              , baseUrl        ) => ({
	  search(token       , context        , term        )                          {
	    return client
	      .get(`${baseUrl}/directories/lookup/${context}`, { term }, token)
	      .then(response => Contact.parseMany(response));
	  },

	  listPersonalContacts(token       )                          {
	    return client.get(`${baseUrl}/personal`, null, token).then(response => Contact.parseManyPersonal(response.items));
	  },

	  addContact(token       , contact            )                   {
	    return client
	      .post(`${baseUrl}/personal`, getContactPayload(contact), token)
	      .then(response => Contact.parsePersonal(response));
	  },

	  editContact(token       , contact         )                   {
	    return client.put(`${baseUrl}/personal/${contact.sourceId || ''}`, getContactPayload(contact), token);
	  },

	  deleteContact(token       , contactUuid      ) {
	    return client.delete(`${baseUrl}/personal/${contactUuid}`, null, token);
	  },

	  listFavorites(token       , context        )                          {
	    return client
	      .get(`${baseUrl}/directories/favorites/${context}`, null, token)
	      .then(response => Contact.parseMany(response));
	  },

	  markAsFavorite(token       , source        , sourceId        )                   {
	    const url = `${baseUrl}/directories/favorites/${source}/${sourceId}`;

	    return client.put(url, null, token, ApiRequester.successResponseParser);
	  },

	  removeFavorite(token       , source        , sourceId        ) {
	    return client.delete(`${baseUrl}/directories/favorites/${source}/${sourceId}`, null, token);
	  }
	});

	//      

	                        
	                 
	                    
	                         
	                                
	                            
	                   
	              
	             
	                           
	                      
	               
	  

	                 
	                   
	                                
	               
	  

	                         
	               
	                    
	                          
	                        
	                
	                      
	                
	    
	           
	                      
	                
	    
	             
	                   
	              
	           
	  

	class CallLog {
	               
	                    
	                         
	                        
	                
	                      
	                
	    

	           
	                      
	                
	    

	             
	                   
	              
	            

	  static merge(current                , toMerge                )                  {
	    const onlyUnique = (value, index, self) => self.indexOf(value) === index;

	    const allLogs                 = current.concat(toMerge);
	    const onlyUniqueIds                = allLogs.map(c => c.id).filter(onlyUnique);

	    return onlyUniqueIds.map(id => allLogs.find(log => log.id === id));
	  }

	  static parseMany(plain          )                 {
	    return plain.items.map(item => CallLog.parse(item));
	  }

	  static parse(plain                 )          {
	    return new CallLog({
	      answer: new Date(plain.answer),
	      answered: plain.answered,
	      callDirection: plain.call_direction,
	      destination: {
	        extension: plain.destination_extension,
	        name: plain.destination_name || ''
	      },
	      source: {
	        extension: plain.source_extension,
	        name: plain.source_name
	      },
	      id: plain.id,
	      duration: (plain.duration || 0) * 1000, // duration is in seconds
	      start: new Date(plain.start),
	      end: new Date(plain.end)
	    });
	  }

	  static parseNew(plain                 , session         )          {
	    return new CallLog({
	      answer: new Date(plain.answer),
	      answered: plain.answered,
	      callDirection: plain.call_direction,
	      destination: {
	        extension: plain.destination_extension,
	        name: plain.destination_name || ''
	      },
	      source: {
	        extension: plain.source_extension,
	        name: plain.source_name
	      },
	      id: plain.id,
	      duration: (plain.duration || 0) * 1000, // duration is in seconds
	      start: new Date(plain.start),
	      end: new Date(plain.end),
	      // @TODO: FIXME add verification declined vs missed call
	      newMissedCall: plain.destination_extension === session.primaryNumber() && !plain.answered
	    });
	  }

	  static newFrom(profile         ) {
	    return newFrom(profile, CallLog);
	  }

	  constructor({
	    answer,
	    answered,
	    callDirection,
	    destination,
	    source,
	    id,
	    duration,
	    start,
	    end
	  }                   = {}) {
	    this.answer = answer;
	    this.answered = answered;
	    this.callDirection = callDirection;
	    this.destination = destination;
	    this.source = source;
	    this.id = id;
	    this.duration = duration;
	    this.start = start;
	    this.end = end;
	  }

	  isFromSameParty(other         , session         )          {
	    return this.theOtherParty(session).extension === other.theOtherParty(session).extension;
	  }

	  theOtherParty(session         )                                      {
	    if (this.source.extension === session.primaryNumber()) {
	      return this.destination;
	    }
	    return this.source;
	  }

	  isNewMissedCall()          {
	    return this.newMissedCall;
	  }

	  acknowledgeCall()          {
	    this.newMissedCall = false;

	    return this;
	  }

	  isAcknowledged()          {
	    return this.newMissedCall;
	  }

	  isAnOutgoingCall(session         )          {
	    return this.source.extension === session.primaryNumber() && this.answered;
	  }

	  isAMissedOutgoingCall(session         )          {
	    return this.source.extension === session.primaryNumber() && !this.answered;
	  }

	  isAnIncomingCall(session         )          {
	    return this.destination.extension === session.primaryNumber() && this.answered;
	  }

	  isADeclinedCall(session         )          {
	    return this.destination.extension === session.primaryNumber() && !this.answered;
	  }
	}

	/*       */

	var callLogdMethods = (client              , baseUrl        ) => ({
	  search(token       , search        , limit         = 5)                          {
	    return client
	      .get(`${baseUrl}/users/me/cdr`, { search, limit }, token)
	      .then(response => CallLog.parseMany(response));
	  },

	  listCallLogs(token       , offset        , limit         = 5)                          {
	    return client
	      .get(`${baseUrl}/users/me/cdr`, { offset, limit }, token)
	      .then(response => CallLog.parseMany(response));
	  },

	  listCallLogsFromDate(token       , from      , number        )                          {
	    return client
	      .get(`${baseUrl}/users/me/cdr`, { from: from.toISOString(), number }, token)
	      .then(response => CallLog.parseMany(response));
	  }
	});

	/*       */

	const AUTH_VERSION = '0.1';
	const APPLICATION_VERSION = '1.0';
	const CONFD_VERSION = '1.1';
	const ACCESSD_VERSION = '1.0';
	const CTIDNG_VERSION = '1.0';
	const DIRD_VERSION = '0.1';
	const CALL_LOGD_VERSION = '1.0';

	class ApiClient {
	                       
	               
	                      
	                
	                  
	                 
	               
	                   

	  // @see https://github.com/facebook/flow/issues/183#issuecomment-358607052
	  constructor({ server, agent = null }                                               ) {
	    this.updatePatemers({ server, agent });
	  }

	  initializeEndpoints()       {
	    this.auth = authMethods(this.client, `auth/${AUTH_VERSION}`);
	    this.application = applicationMethods(this.client, `ctid-ng/${APPLICATION_VERSION}/applications`);
	    this.confd = confdMethods(this.client, `confd/${CONFD_VERSION}`);
	    this.accessd = accessdMethods(this.client, `accessd/${ACCESSD_VERSION}`);
	    this.ctidNg = ctidNgMethods(this.client, `ctid-ng/${CTIDNG_VERSION}`);
	    this.dird = dirdMethods(this.client, `dird/${DIRD_VERSION}`);
	    this.callLogd = callLogdMethods(this.client, `call-logd/${CALL_LOGD_VERSION}`);
	  }

	  updatePatemers({ server, agent }                                    ) {
	    this.client = new ApiRequester({ server, agent });

	    this.initializeEndpoints();
	  }
	}

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */

	var logDisabled_ = true;
	var deprecationWarnings_ = true;

	/**
	 * Extract browser version out of the provided user agent string.
	 *
	 * @param {!string} uastring userAgent string.
	 * @param {!string} expr Regular expression used as match criteria.
	 * @param {!number} pos position in the version string to be returned.
	 * @return {!number} browser version.
	 */
	function extractVersion(uastring, expr, pos) {
	  var match = uastring.match(expr);
	  return match && match.length >= pos && parseInt(match[pos], 10);
	}

	// Wraps the peerconnection event eventNameToWrap in a function
	// which returns the modified event object (or false to prevent
	// the event).
	function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
	  if (!window.RTCPeerConnection) {
	    return;
	  }
	  var proto = window.RTCPeerConnection.prototype;
	  var nativeAddEventListener = proto.addEventListener;
	  proto.addEventListener = function(nativeEventName, cb) {
	    if (nativeEventName !== eventNameToWrap) {
	      return nativeAddEventListener.apply(this, arguments);
	    }
	    var wrappedCallback = function(e) {
	      var modifiedEvent = wrapper(e);
	      if (modifiedEvent) {
	        cb(modifiedEvent);
	      }
	    };
	    this._eventMap = this._eventMap || {};
	    this._eventMap[cb] = wrappedCallback;
	    return nativeAddEventListener.apply(this, [nativeEventName,
	      wrappedCallback]);
	  };

	  var nativeRemoveEventListener = proto.removeEventListener;
	  proto.removeEventListener = function(nativeEventName, cb) {
	    if (nativeEventName !== eventNameToWrap || !this._eventMap
	        || !this._eventMap[cb]) {
	      return nativeRemoveEventListener.apply(this, arguments);
	    }
	    var unwrappedCb = this._eventMap[cb];
	    delete this._eventMap[cb];
	    return nativeRemoveEventListener.apply(this, [nativeEventName,
	      unwrappedCb]);
	  };

	  Object.defineProperty(proto, 'on' + eventNameToWrap, {
	    get: function() {
	      return this['_on' + eventNameToWrap];
	    },
	    set: function(cb) {
	      if (this['_on' + eventNameToWrap]) {
	        this.removeEventListener(eventNameToWrap,
	            this['_on' + eventNameToWrap]);
	        delete this['_on' + eventNameToWrap];
	      }
	      if (cb) {
	        this.addEventListener(eventNameToWrap,
	            this['_on' + eventNameToWrap] = cb);
	      }
	    },
	    enumerable: true,
	    configurable: true
	  });
	}

	// Utility methods.
	var utils = {
	  extractVersion: extractVersion,
	  wrapPeerConnectionEvent: wrapPeerConnectionEvent,
	  disableLog: function(bool) {
	    if (typeof bool !== 'boolean') {
	      return new Error('Argument type: ' + typeof bool +
	          '. Please use a boolean.');
	    }
	    logDisabled_ = bool;
	    return (bool) ? 'adapter.js logging disabled' :
	        'adapter.js logging enabled';
	  },

	  /**
	   * Disable or enable deprecation warnings
	   * @param {!boolean} bool set to true to disable warnings.
	   */
	  disableWarnings: function(bool) {
	    if (typeof bool !== 'boolean') {
	      return new Error('Argument type: ' + typeof bool +
	          '. Please use a boolean.');
	    }
	    deprecationWarnings_ = !bool;
	    return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
	  },

	  log: function() {
	    if (typeof window === 'object') {
	      if (logDisabled_) {
	        return;
	      }
	      if (typeof console !== 'undefined' && typeof console.log === 'function') {
	        console.log.apply(console, arguments);
	      }
	    }
	  },

	  /**
	   * Shows a deprecation warning suggesting the modern and spec-compatible API.
	   */
	  deprecated: function(oldMethod, newMethod) {
	    if (!deprecationWarnings_) {
	      return;
	    }
	    console.warn(oldMethod + ' is deprecated, please use ' + newMethod +
	        ' instead.');
	  },

	  /**
	   * Browser detector.
	   *
	   * @return {object} result containing browser and version
	   *     properties.
	   */
	  detectBrowser: function(window) {
	    var navigator = window && window.navigator;

	    // Returned result object.
	    var result = {};
	    result.browser = null;
	    result.version = null;

	    // Fail early if it's not a browser
	    if (typeof window === 'undefined' || !window.navigator) {
	      result.browser = 'Not a browser.';
	      return result;
	    }

	    if (navigator.mozGetUserMedia) { // Firefox.
	      result.browser = 'firefox';
	      result.version = extractVersion(navigator.userAgent,
	          /Firefox\/(\d+)\./, 1);
	    } else if (navigator.webkitGetUserMedia) {
	      // Chrome, Chromium, Webview, Opera.
	      // Version matches Chrome/WebRTC version.
	      result.browser = 'chrome';
	      result.version = extractVersion(navigator.userAgent,
	          /Chrom(e|ium)\/(\d+)\./, 2);
	    } else if (navigator.mediaDevices &&
	        navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) { // Edge.
	      result.browser = 'edge';
	      result.version = extractVersion(navigator.userAgent,
	          /Edge\/(\d+).(\d+)$/, 2);
	    } else if (window.RTCPeerConnection &&
	        navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) { // Safari.
	      result.browser = 'safari';
	      result.version = extractVersion(navigator.userAgent,
	          /AppleWebKit\/(\d+)\./, 1);
	    } else { // Default fallthrough: not supported.
	      result.browser = 'Not a supported browser.';
	      return result;
	    }

	    return result;
	  }
	};

	var logging = utils.log;

	// Expose public methods.
	var getusermedia = function(window) {
	  var browserDetails = utils.detectBrowser(window);
	  var navigator = window && window.navigator;

	  var constraintsToChrome_ = function(c) {
	    if (typeof c !== 'object' || c.mandatory || c.optional) {
	      return c;
	    }
	    var cc = {};
	    Object.keys(c).forEach(function(key) {
	      if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
	        return;
	      }
	      var r = (typeof c[key] === 'object') ? c[key] : {ideal: c[key]};
	      if (r.exact !== undefined && typeof r.exact === 'number') {
	        r.min = r.max = r.exact;
	      }
	      var oldname_ = function(prefix, name) {
	        if (prefix) {
	          return prefix + name.charAt(0).toUpperCase() + name.slice(1);
	        }
	        return (name === 'deviceId') ? 'sourceId' : name;
	      };
	      if (r.ideal !== undefined) {
	        cc.optional = cc.optional || [];
	        var oc = {};
	        if (typeof r.ideal === 'number') {
	          oc[oldname_('min', key)] = r.ideal;
	          cc.optional.push(oc);
	          oc = {};
	          oc[oldname_('max', key)] = r.ideal;
	          cc.optional.push(oc);
	        } else {
	          oc[oldname_('', key)] = r.ideal;
	          cc.optional.push(oc);
	        }
	      }
	      if (r.exact !== undefined && typeof r.exact !== 'number') {
	        cc.mandatory = cc.mandatory || {};
	        cc.mandatory[oldname_('', key)] = r.exact;
	      } else {
	        ['min', 'max'].forEach(function(mix) {
	          if (r[mix] !== undefined) {
	            cc.mandatory = cc.mandatory || {};
	            cc.mandatory[oldname_(mix, key)] = r[mix];
	          }
	        });
	      }
	    });
	    if (c.advanced) {
	      cc.optional = (cc.optional || []).concat(c.advanced);
	    }
	    return cc;
	  };

	  var shimConstraints_ = function(constraints, func) {
	    if (browserDetails.version >= 61) {
	      return func(constraints);
	    }
	    constraints = JSON.parse(JSON.stringify(constraints));
	    if (constraints && typeof constraints.audio === 'object') {
	      var remap = function(obj, a, b) {
	        if (a in obj && !(b in obj)) {
	          obj[b] = obj[a];
	          delete obj[a];
	        }
	      };
	      constraints = JSON.parse(JSON.stringify(constraints));
	      remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
	      remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
	      constraints.audio = constraintsToChrome_(constraints.audio);
	    }
	    if (constraints && typeof constraints.video === 'object') {
	      // Shim facingMode for mobile & surface pro.
	      var face = constraints.video.facingMode;
	      face = face && ((typeof face === 'object') ? face : {ideal: face});
	      var getSupportedFacingModeLies = browserDetails.version < 66;

	      if ((face && (face.exact === 'user' || face.exact === 'environment' ||
	                    face.ideal === 'user' || face.ideal === 'environment')) &&
	          !(navigator.mediaDevices.getSupportedConstraints &&
	            navigator.mediaDevices.getSupportedConstraints().facingMode &&
	            !getSupportedFacingModeLies)) {
	        delete constraints.video.facingMode;
	        var matches;
	        if (face.exact === 'environment' || face.ideal === 'environment') {
	          matches = ['back', 'rear'];
	        } else if (face.exact === 'user' || face.ideal === 'user') {
	          matches = ['front'];
	        }
	        if (matches) {
	          // Look for matches in label, or use last cam for back (typical).
	          return navigator.mediaDevices.enumerateDevices()
	          .then(function(devices) {
	            devices = devices.filter(function(d) {
	              return d.kind === 'videoinput';
	            });
	            var dev = devices.find(function(d) {
	              return matches.some(function(match) {
	                return d.label.toLowerCase().indexOf(match) !== -1;
	              });
	            });
	            if (!dev && devices.length && matches.indexOf('back') !== -1) {
	              dev = devices[devices.length - 1]; // more likely the back cam
	            }
	            if (dev) {
	              constraints.video.deviceId = face.exact ? {exact: dev.deviceId} :
	                                                        {ideal: dev.deviceId};
	            }
	            constraints.video = constraintsToChrome_(constraints.video);
	            logging('chrome: ' + JSON.stringify(constraints));
	            return func(constraints);
	          });
	        }
	      }
	      constraints.video = constraintsToChrome_(constraints.video);
	    }
	    logging('chrome: ' + JSON.stringify(constraints));
	    return func(constraints);
	  };

	  var shimError_ = function(e) {
	    if (browserDetails.version >= 64) {
	      return e;
	    }
	    return {
	      name: {
	        PermissionDeniedError: 'NotAllowedError',
	        PermissionDismissedError: 'NotAllowedError',
	        InvalidStateError: 'NotAllowedError',
	        DevicesNotFoundError: 'NotFoundError',
	        ConstraintNotSatisfiedError: 'OverconstrainedError',
	        TrackStartError: 'NotReadableError',
	        MediaDeviceFailedDueToShutdown: 'NotAllowedError',
	        MediaDeviceKillSwitchOn: 'NotAllowedError',
	        TabCaptureError: 'AbortError',
	        ScreenCaptureError: 'AbortError',
	        DeviceCaptureError: 'AbortError'
	      }[e.name] || e.name,
	      message: e.message,
	      constraint: e.constraint || e.constraintName,
	      toString: function() {
	        return this.name + (this.message && ': ') + this.message;
	      }
	    };
	  };

	  var getUserMedia_ = function(constraints, onSuccess, onError) {
	    shimConstraints_(constraints, function(c) {
	      navigator.webkitGetUserMedia(c, onSuccess, function(e) {
	        if (onError) {
	          onError(shimError_(e));
	        }
	      });
	    });
	  };

	  navigator.getUserMedia = getUserMedia_;

	  // Returns the result of getUserMedia as a Promise.
	  var getUserMediaPromise_ = function(constraints) {
	    return new Promise(function(resolve, reject) {
	      navigator.getUserMedia(constraints, resolve, reject);
	    });
	  };

	  if (!navigator.mediaDevices) {
	    navigator.mediaDevices = {
	      getUserMedia: getUserMediaPromise_,
	      enumerateDevices: function() {
	        return new Promise(function(resolve) {
	          var kinds = {audio: 'audioinput', video: 'videoinput'};
	          return window.MediaStreamTrack.getSources(function(devices) {
	            resolve(devices.map(function(device) {
	              return {label: device.label,
	                kind: kinds[device.kind],
	                deviceId: device.id,
	                groupId: ''};
	            }));
	          });
	        });
	      },
	      getSupportedConstraints: function() {
	        return {
	          deviceId: true, echoCancellation: true, facingMode: true,
	          frameRate: true, height: true, width: true
	        };
	      }
	    };
	  }

	  // A shim for getUserMedia method on the mediaDevices object.
	  // TODO(KaptenJansson) remove once implemented in Chrome stable.
	  if (!navigator.mediaDevices.getUserMedia) {
	    navigator.mediaDevices.getUserMedia = function(constraints) {
	      return getUserMediaPromise_(constraints);
	    };
	  } else {
	    // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
	    // function which returns a Promise, it does not accept spec-style
	    // constraints.
	    var origGetUserMedia = navigator.mediaDevices.getUserMedia.
	        bind(navigator.mediaDevices);
	    navigator.mediaDevices.getUserMedia = function(cs) {
	      return shimConstraints_(cs, function(c) {
	        return origGetUserMedia(c).then(function(stream) {
	          if (c.audio && !stream.getAudioTracks().length ||
	              c.video && !stream.getVideoTracks().length) {
	            stream.getTracks().forEach(function(track) {
	              track.stop();
	            });
	            throw new DOMException('', 'NotFoundError');
	          }
	          return stream;
	        }, function(e) {
	          return Promise.reject(shimError_(e));
	        });
	      });
	    };
	  }

	  // Dummy devicechange event methods.
	  // TODO(KaptenJansson) remove once implemented in Chrome stable.
	  if (typeof navigator.mediaDevices.addEventListener === 'undefined') {
	    navigator.mediaDevices.addEventListener = function() {
	      logging('Dummy mediaDevices.addEventListener called.');
	    };
	  }
	  if (typeof navigator.mediaDevices.removeEventListener === 'undefined') {
	    navigator.mediaDevices.removeEventListener = function() {
	      logging('Dummy mediaDevices.removeEventListener called.');
	    };
	  }
	};

	var logging$1 = utils.log;

	/* iterates the stats graph recursively. */
	function walkStats(stats, base, resultSet) {
	  if (!base || resultSet.has(base.id)) {
	    return;
	  }
	  resultSet.set(base.id, base);
	  Object.keys(base).forEach(function(name) {
	    if (name.endsWith('Id')) {
	      walkStats(stats, stats.get(base[name]), resultSet);
	    } else if (name.endsWith('Ids')) {
	      base[name].forEach(function(id) {
	        walkStats(stats, stats.get(id), resultSet);
	      });
	    }
	  });
	}

	/* filter getStats for a sender/receiver track. */
	function filterStats(result, track, outbound) {
	  var streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
	  var filteredResult = new Map();
	  if (track === null) {
	    return filteredResult;
	  }
	  var trackStats = [];
	  result.forEach(function(value) {
	    if (value.type === 'track' &&
	        value.trackIdentifier === track.id) {
	      trackStats.push(value);
	    }
	  });
	  trackStats.forEach(function(trackStat) {
	    result.forEach(function(stats) {
	      if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
	        walkStats(result, stats, filteredResult);
	      }
	    });
	  });
	  return filteredResult;
	}

	var chrome_shim = {
	  shimGetUserMedia: getusermedia,
	  shimMediaStream: function(window) {
	    window.MediaStream = window.MediaStream || window.webkitMediaStream;
	  },

	  shimOnTrack: function(window) {
	    if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in
	        window.RTCPeerConnection.prototype)) {
	      Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
	        get: function() {
	          return this._ontrack;
	        },
	        set: function(f) {
	          if (this._ontrack) {
	            this.removeEventListener('track', this._ontrack);
	          }
	          this.addEventListener('track', this._ontrack = f);
	        },
	        enumerable: true,
	        configurable: true
	      });
	      var origSetRemoteDescription =
	          window.RTCPeerConnection.prototype.setRemoteDescription;
	      window.RTCPeerConnection.prototype.setRemoteDescription = function() {
	        var pc = this;
	        if (!pc._ontrackpoly) {
	          pc._ontrackpoly = function(e) {
	            // onaddstream does not fire when a track is added to an existing
	            // stream. But stream.onaddtrack is implemented so we use that.
	            e.stream.addEventListener('addtrack', function(te) {
	              var receiver;
	              if (window.RTCPeerConnection.prototype.getReceivers) {
	                receiver = pc.getReceivers().find(function(r) {
	                  return r.track && r.track.id === te.track.id;
	                });
	              } else {
	                receiver = {track: te.track};
	              }

	              var event = new Event('track');
	              event.track = te.track;
	              event.receiver = receiver;
	              event.transceiver = {receiver: receiver};
	              event.streams = [e.stream];
	              pc.dispatchEvent(event);
	            });
	            e.stream.getTracks().forEach(function(track) {
	              var receiver;
	              if (window.RTCPeerConnection.prototype.getReceivers) {
	                receiver = pc.getReceivers().find(function(r) {
	                  return r.track && r.track.id === track.id;
	                });
	              } else {
	                receiver = {track: track};
	              }
	              var event = new Event('track');
	              event.track = track;
	              event.receiver = receiver;
	              event.transceiver = {receiver: receiver};
	              event.streams = [e.stream];
	              pc.dispatchEvent(event);
	            });
	          };
	          pc.addEventListener('addstream', pc._ontrackpoly);
	        }
	        return origSetRemoteDescription.apply(pc, arguments);
	      };
	    } else {
	      // even if RTCRtpTransceiver is in window, it is only used and
	      // emitted in unified-plan. Unfortunately this means we need
	      // to unconditionally wrap the event.
	      utils.wrapPeerConnectionEvent(window, 'track', function(e) {
	        if (!e.transceiver) {
	          Object.defineProperty(e, 'transceiver',
	            {value: {receiver: e.receiver}});
	        }
	        return e;
	      });
	    }
	  },

	  shimGetSendersWithDtmf: function(window) {
	    // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
	    if (typeof window === 'object' && window.RTCPeerConnection &&
	        !('getSenders' in window.RTCPeerConnection.prototype) &&
	        'createDTMFSender' in window.RTCPeerConnection.prototype) {
	      var shimSenderWithDtmf = function(pc, track) {
	        return {
	          track: track,
	          get dtmf() {
	            if (this._dtmf === undefined) {
	              if (track.kind === 'audio') {
	                this._dtmf = pc.createDTMFSender(track);
	              } else {
	                this._dtmf = null;
	              }
	            }
	            return this._dtmf;
	          },
	          _pc: pc
	        };
	      };

	      // augment addTrack when getSenders is not available.
	      if (!window.RTCPeerConnection.prototype.getSenders) {
	        window.RTCPeerConnection.prototype.getSenders = function() {
	          this._senders = this._senders || [];
	          return this._senders.slice(); // return a copy of the internal state.
	        };
	        var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
	        window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
	          var pc = this;
	          var sender = origAddTrack.apply(pc, arguments);
	          if (!sender) {
	            sender = shimSenderWithDtmf(pc, track);
	            pc._senders.push(sender);
	          }
	          return sender;
	        };

	        var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
	        window.RTCPeerConnection.prototype.removeTrack = function(sender) {
	          var pc = this;
	          origRemoveTrack.apply(pc, arguments);
	          var idx = pc._senders.indexOf(sender);
	          if (idx !== -1) {
	            pc._senders.splice(idx, 1);
	          }
	        };
	      }
	      var origAddStream = window.RTCPeerConnection.prototype.addStream;
	      window.RTCPeerConnection.prototype.addStream = function(stream) {
	        var pc = this;
	        pc._senders = pc._senders || [];
	        origAddStream.apply(pc, [stream]);
	        stream.getTracks().forEach(function(track) {
	          pc._senders.push(shimSenderWithDtmf(pc, track));
	        });
	      };

	      var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
	      window.RTCPeerConnection.prototype.removeStream = function(stream) {
	        var pc = this;
	        pc._senders = pc._senders || [];
	        origRemoveStream.apply(pc, [stream]);

	        stream.getTracks().forEach(function(track) {
	          var sender = pc._senders.find(function(s) {
	            return s.track === track;
	          });
	          if (sender) {
	            pc._senders.splice(pc._senders.indexOf(sender), 1); // remove sender
	          }
	        });
	      };
	    } else if (typeof window === 'object' && window.RTCPeerConnection &&
	               'getSenders' in window.RTCPeerConnection.prototype &&
	               'createDTMFSender' in window.RTCPeerConnection.prototype &&
	               window.RTCRtpSender &&
	               !('dtmf' in window.RTCRtpSender.prototype)) {
	      var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
	      window.RTCPeerConnection.prototype.getSenders = function() {
	        var pc = this;
	        var senders = origGetSenders.apply(pc, []);
	        senders.forEach(function(sender) {
	          sender._pc = pc;
	        });
	        return senders;
	      };

	      Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
	        get: function() {
	          if (this._dtmf === undefined) {
	            if (this.track.kind === 'audio') {
	              this._dtmf = this._pc.createDTMFSender(this.track);
	            } else {
	              this._dtmf = null;
	            }
	          }
	          return this._dtmf;
	        }
	      });
	    }
	  },

	  shimSenderReceiverGetStats: function(window) {
	    if (!(typeof window === 'object' && window.RTCPeerConnection &&
	        window.RTCRtpSender && window.RTCRtpReceiver)) {
	      return;
	    }

	    // shim sender stats.
	    if (!('getStats' in window.RTCRtpSender.prototype)) {
	      var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
	      if (origGetSenders) {
	        window.RTCPeerConnection.prototype.getSenders = function() {
	          var pc = this;
	          var senders = origGetSenders.apply(pc, []);
	          senders.forEach(function(sender) {
	            sender._pc = pc;
	          });
	          return senders;
	        };
	      }

	      var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
	      if (origAddTrack) {
	        window.RTCPeerConnection.prototype.addTrack = function() {
	          var sender = origAddTrack.apply(this, arguments);
	          sender._pc = this;
	          return sender;
	        };
	      }
	      window.RTCRtpSender.prototype.getStats = function() {
	        var sender = this;
	        return this._pc.getStats().then(function(result) {
	          /* Note: this will include stats of all senders that
	           *   send a track with the same id as sender.track as
	           *   it is not possible to identify the RTCRtpSender.
	           */
	          return filterStats(result, sender.track, true);
	        });
	      };
	    }

	    // shim receiver stats.
	    if (!('getStats' in window.RTCRtpReceiver.prototype)) {
	      var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
	      if (origGetReceivers) {
	        window.RTCPeerConnection.prototype.getReceivers = function() {
	          var pc = this;
	          var receivers = origGetReceivers.apply(pc, []);
	          receivers.forEach(function(receiver) {
	            receiver._pc = pc;
	          });
	          return receivers;
	        };
	      }
	      utils.wrapPeerConnectionEvent(window, 'track', function(e) {
	        e.receiver._pc = e.srcElement;
	        return e;
	      });
	      window.RTCRtpReceiver.prototype.getStats = function() {
	        var receiver = this;
	        return this._pc.getStats().then(function(result) {
	          return filterStats(result, receiver.track, false);
	        });
	      };
	    }

	    if (!('getStats' in window.RTCRtpSender.prototype &&
	        'getStats' in window.RTCRtpReceiver.prototype)) {
	      return;
	    }

	    // shim RTCPeerConnection.getStats(track).
	    var origGetStats = window.RTCPeerConnection.prototype.getStats;
	    window.RTCPeerConnection.prototype.getStats = function() {
	      var pc = this;
	      if (arguments.length > 0 &&
	          arguments[0] instanceof window.MediaStreamTrack) {
	        var track = arguments[0];
	        var sender;
	        var receiver;
	        var err;
	        pc.getSenders().forEach(function(s) {
	          if (s.track === track) {
	            if (sender) {
	              err = true;
	            } else {
	              sender = s;
	            }
	          }
	        });
	        pc.getReceivers().forEach(function(r) {
	          if (r.track === track) {
	            if (receiver) {
	              err = true;
	            } else {
	              receiver = r;
	            }
	          }
	          return r.track === track;
	        });
	        if (err || (sender && receiver)) {
	          return Promise.reject(new DOMException(
	            'There are more than one sender or receiver for the track.',
	            'InvalidAccessError'));
	        } else if (sender) {
	          return sender.getStats();
	        } else if (receiver) {
	          return receiver.getStats();
	        }
	        return Promise.reject(new DOMException(
	          'There is no sender or receiver for the track.',
	          'InvalidAccessError'));
	      }
	      return origGetStats.apply(pc, arguments);
	    };
	  },

	  shimSourceObject: function(window) {
	    var URL = window && window.URL;

	    if (typeof window === 'object') {
	      if (window.HTMLMediaElement &&
	        !('srcObject' in window.HTMLMediaElement.prototype)) {
	        // Shim the srcObject property, once, when HTMLMediaElement is found.
	        Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
	          get: function() {
	            return this._srcObject;
	          },
	          set: function(stream) {
	            var self = this;
	            // Use _srcObject as a private property for this shim
	            this._srcObject = stream;
	            if (this.src) {
	              URL.revokeObjectURL(this.src);
	            }

	            if (!stream) {
	              this.src = '';
	              return undefined;
	            }
	            this.src = URL.createObjectURL(stream);
	            // We need to recreate the blob url when a track is added or
	            // removed. Doing it manually since we want to avoid a recursion.
	            stream.addEventListener('addtrack', function() {
	              if (self.src) {
	                URL.revokeObjectURL(self.src);
	              }
	              self.src = URL.createObjectURL(stream);
	            });
	            stream.addEventListener('removetrack', function() {
	              if (self.src) {
	                URL.revokeObjectURL(self.src);
	              }
	              self.src = URL.createObjectURL(stream);
	            });
	          }
	        });
	      }
	    }
	  },

	  shimAddTrackRemoveTrackWithNative: function(window) {
	    // shim addTrack/removeTrack with native variants in order to make
	    // the interactions with legacy getLocalStreams behave as in other browsers.
	    // Keeps a mapping stream.id => [stream, rtpsenders...]
	    window.RTCPeerConnection.prototype.getLocalStreams = function() {
	      var pc = this;
	      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
	      return Object.keys(this._shimmedLocalStreams).map(function(streamId) {
	        return pc._shimmedLocalStreams[streamId][0];
	      });
	    };

	    var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
	    window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
	      if (!stream) {
	        return origAddTrack.apply(this, arguments);
	      }
	      this._shimmedLocalStreams = this._shimmedLocalStreams || {};

	      var sender = origAddTrack.apply(this, arguments);
	      if (!this._shimmedLocalStreams[stream.id]) {
	        this._shimmedLocalStreams[stream.id] = [stream, sender];
	      } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
	        this._shimmedLocalStreams[stream.id].push(sender);
	      }
	      return sender;
	    };

	    var origAddStream = window.RTCPeerConnection.prototype.addStream;
	    window.RTCPeerConnection.prototype.addStream = function(stream) {
	      var pc = this;
	      this._shimmedLocalStreams = this._shimmedLocalStreams || {};

	      stream.getTracks().forEach(function(track) {
	        var alreadyExists = pc.getSenders().find(function(s) {
	          return s.track === track;
	        });
	        if (alreadyExists) {
	          throw new DOMException('Track already exists.',
	              'InvalidAccessError');
	        }
	      });
	      var existingSenders = pc.getSenders();
	      origAddStream.apply(this, arguments);
	      var newSenders = pc.getSenders().filter(function(newSender) {
	        return existingSenders.indexOf(newSender) === -1;
	      });
	      this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
	    };

	    var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
	    window.RTCPeerConnection.prototype.removeStream = function(stream) {
	      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
	      delete this._shimmedLocalStreams[stream.id];
	      return origRemoveStream.apply(this, arguments);
	    };

	    var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
	    window.RTCPeerConnection.prototype.removeTrack = function(sender) {
	      var pc = this;
	      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
	      if (sender) {
	        Object.keys(this._shimmedLocalStreams).forEach(function(streamId) {
	          var idx = pc._shimmedLocalStreams[streamId].indexOf(sender);
	          if (idx !== -1) {
	            pc._shimmedLocalStreams[streamId].splice(idx, 1);
	          }
	          if (pc._shimmedLocalStreams[streamId].length === 1) {
	            delete pc._shimmedLocalStreams[streamId];
	          }
	        });
	      }
	      return origRemoveTrack.apply(this, arguments);
	    };
	  },

	  shimAddTrackRemoveTrack: function(window) {
	    var browserDetails = utils.detectBrowser(window);
	    // shim addTrack and removeTrack.
	    if (window.RTCPeerConnection.prototype.addTrack &&
	        browserDetails.version >= 65) {
	      return this.shimAddTrackRemoveTrackWithNative(window);
	    }

	    // also shim pc.getLocalStreams when addTrack is shimmed
	    // to return the original streams.
	    var origGetLocalStreams = window.RTCPeerConnection.prototype
	        .getLocalStreams;
	    window.RTCPeerConnection.prototype.getLocalStreams = function() {
	      var pc = this;
	      var nativeStreams = origGetLocalStreams.apply(this);
	      pc._reverseStreams = pc._reverseStreams || {};
	      return nativeStreams.map(function(stream) {
	        return pc._reverseStreams[stream.id];
	      });
	    };

	    var origAddStream = window.RTCPeerConnection.prototype.addStream;
	    window.RTCPeerConnection.prototype.addStream = function(stream) {
	      var pc = this;
	      pc._streams = pc._streams || {};
	      pc._reverseStreams = pc._reverseStreams || {};

	      stream.getTracks().forEach(function(track) {
	        var alreadyExists = pc.getSenders().find(function(s) {
	          return s.track === track;
	        });
	        if (alreadyExists) {
	          throw new DOMException('Track already exists.',
	              'InvalidAccessError');
	        }
	      });
	      // Add identity mapping for consistency with addTrack.
	      // Unless this is being used with a stream from addTrack.
	      if (!pc._reverseStreams[stream.id]) {
	        var newStream = new window.MediaStream(stream.getTracks());
	        pc._streams[stream.id] = newStream;
	        pc._reverseStreams[newStream.id] = stream;
	        stream = newStream;
	      }
	      origAddStream.apply(pc, [stream]);
	    };

	    var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
	    window.RTCPeerConnection.prototype.removeStream = function(stream) {
	      var pc = this;
	      pc._streams = pc._streams || {};
	      pc._reverseStreams = pc._reverseStreams || {};

	      origRemoveStream.apply(pc, [(pc._streams[stream.id] || stream)]);
	      delete pc._reverseStreams[(pc._streams[stream.id] ?
	          pc._streams[stream.id].id : stream.id)];
	      delete pc._streams[stream.id];
	    };

	    window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
	      var pc = this;
	      if (pc.signalingState === 'closed') {
	        throw new DOMException(
	          'The RTCPeerConnection\'s signalingState is \'closed\'.',
	          'InvalidStateError');
	      }
	      var streams = [].slice.call(arguments, 1);
	      if (streams.length !== 1 ||
	          !streams[0].getTracks().find(function(t) {
	            return t === track;
	          })) {
	        // this is not fully correct but all we can manage without
	        // [[associated MediaStreams]] internal slot.
	        throw new DOMException(
	          'The adapter.js addTrack polyfill only supports a single ' +
	          ' stream which is associated with the specified track.',
	          'NotSupportedError');
	      }

	      var alreadyExists = pc.getSenders().find(function(s) {
	        return s.track === track;
	      });
	      if (alreadyExists) {
	        throw new DOMException('Track already exists.',
	            'InvalidAccessError');
	      }

	      pc._streams = pc._streams || {};
	      pc._reverseStreams = pc._reverseStreams || {};
	      var oldStream = pc._streams[stream.id];
	      if (oldStream) {
	        // this is using odd Chrome behaviour, use with caution:
	        // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
	        // Note: we rely on the high-level addTrack/dtmf shim to
	        // create the sender with a dtmf sender.
	        oldStream.addTrack(track);

	        // Trigger ONN async.
	        Promise.resolve().then(function() {
	          pc.dispatchEvent(new Event('negotiationneeded'));
	        });
	      } else {
	        var newStream = new window.MediaStream([track]);
	        pc._streams[stream.id] = newStream;
	        pc._reverseStreams[newStream.id] = stream;
	        pc.addStream(newStream);
	      }
	      return pc.getSenders().find(function(s) {
	        return s.track === track;
	      });
	    };

	    // replace the internal stream id with the external one and
	    // vice versa.
	    function replaceInternalStreamId(pc, description) {
	      var sdp = description.sdp;
	      Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
	        var externalStream = pc._reverseStreams[internalId];
	        var internalStream = pc._streams[externalStream.id];
	        sdp = sdp.replace(new RegExp(internalStream.id, 'g'),
	            externalStream.id);
	      });
	      return new RTCSessionDescription({
	        type: description.type,
	        sdp: sdp
	      });
	    }
	    function replaceExternalStreamId(pc, description) {
	      var sdp = description.sdp;
	      Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
	        var externalStream = pc._reverseStreams[internalId];
	        var internalStream = pc._streams[externalStream.id];
	        sdp = sdp.replace(new RegExp(externalStream.id, 'g'),
	            internalStream.id);
	      });
	      return new RTCSessionDescription({
	        type: description.type,
	        sdp: sdp
	      });
	    }
	    ['createOffer', 'createAnswer'].forEach(function(method) {
	      var nativeMethod = window.RTCPeerConnection.prototype[method];
	      window.RTCPeerConnection.prototype[method] = function() {
	        var pc = this;
	        var args = arguments;
	        var isLegacyCall = arguments.length &&
	            typeof arguments[0] === 'function';
	        if (isLegacyCall) {
	          return nativeMethod.apply(pc, [
	            function(description) {
	              var desc = replaceInternalStreamId(pc, description);
	              args[0].apply(null, [desc]);
	            },
	            function(err) {
	              if (args[1]) {
	                args[1].apply(null, err);
	              }
	            }, arguments[2]
	          ]);
	        }
	        return nativeMethod.apply(pc, arguments)
	        .then(function(description) {
	          return replaceInternalStreamId(pc, description);
	        });
	      };
	    });

	    var origSetLocalDescription =
	        window.RTCPeerConnection.prototype.setLocalDescription;
	    window.RTCPeerConnection.prototype.setLocalDescription = function() {
	      var pc = this;
	      if (!arguments.length || !arguments[0].type) {
	        return origSetLocalDescription.apply(pc, arguments);
	      }
	      arguments[0] = replaceExternalStreamId(pc, arguments[0]);
	      return origSetLocalDescription.apply(pc, arguments);
	    };

	    // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

	    var origLocalDescription = Object.getOwnPropertyDescriptor(
	        window.RTCPeerConnection.prototype, 'localDescription');
	    Object.defineProperty(window.RTCPeerConnection.prototype,
	        'localDescription', {
	          get: function() {
	            var pc = this;
	            var description = origLocalDescription.get.apply(this);
	            if (description.type === '') {
	              return description;
	            }
	            return replaceInternalStreamId(pc, description);
	          }
	        });

	    window.RTCPeerConnection.prototype.removeTrack = function(sender) {
	      var pc = this;
	      if (pc.signalingState === 'closed') {
	        throw new DOMException(
	          'The RTCPeerConnection\'s signalingState is \'closed\'.',
	          'InvalidStateError');
	      }
	      // We can not yet check for sender instanceof RTCRtpSender
	      // since we shim RTPSender. So we check if sender._pc is set.
	      if (!sender._pc) {
	        throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' +
	            'does not implement interface RTCRtpSender.', 'TypeError');
	      }
	      var isLocal = sender._pc === pc;
	      if (!isLocal) {
	        throw new DOMException('Sender was not created by this connection.',
	            'InvalidAccessError');
	      }

	      // Search for the native stream the senders track belongs to.
	      pc._streams = pc._streams || {};
	      var stream;
	      Object.keys(pc._streams).forEach(function(streamid) {
	        var hasTrack = pc._streams[streamid].getTracks().find(function(track) {
	          return sender.track === track;
	        });
	        if (hasTrack) {
	          stream = pc._streams[streamid];
	        }
	      });

	      if (stream) {
	        if (stream.getTracks().length === 1) {
	          // if this is the last track of the stream, remove the stream. This
	          // takes care of any shimmed _senders.
	          pc.removeStream(pc._reverseStreams[stream.id]);
	        } else {
	          // relying on the same odd chrome behaviour as above.
	          stream.removeTrack(sender.track);
	        }
	        pc.dispatchEvent(new Event('negotiationneeded'));
	      }
	    };
	  },

	  shimPeerConnection: function(window) {
	    var browserDetails = utils.detectBrowser(window);

	    // The RTCPeerConnection object.
	    if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
	      window.RTCPeerConnection = function(pcConfig, pcConstraints) {
	        // Translate iceTransportPolicy to iceTransports,
	        // see https://code.google.com/p/webrtc/issues/detail?id=4869
	        // this was fixed in M56 along with unprefixing RTCPeerConnection.
	        logging$1('PeerConnection');
	        if (pcConfig && pcConfig.iceTransportPolicy) {
	          pcConfig.iceTransports = pcConfig.iceTransportPolicy;
	        }

	        return new window.webkitRTCPeerConnection(pcConfig, pcConstraints);
	      };
	      window.RTCPeerConnection.prototype =
	          window.webkitRTCPeerConnection.prototype;
	      // wrap static methods. Currently just generateCertificate.
	      if (window.webkitRTCPeerConnection.generateCertificate) {
	        Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
	          get: function() {
	            return window.webkitRTCPeerConnection.generateCertificate;
	          }
	        });
	      }
	    }

	    var origGetStats = window.RTCPeerConnection.prototype.getStats;
	    window.RTCPeerConnection.prototype.getStats = function(selector,
	        successCallback, errorCallback) {
	      var pc = this;
	      var args = arguments;

	      // If selector is a function then we are in the old style stats so just
	      // pass back the original getStats format to avoid breaking old users.
	      if (arguments.length > 0 && typeof selector === 'function') {
	        return origGetStats.apply(this, arguments);
	      }

	      // When spec-style getStats is supported, return those when called with
	      // either no arguments or the selector argument is null.
	      if (origGetStats.length === 0 && (arguments.length === 0 ||
	          typeof arguments[0] !== 'function')) {
	        return origGetStats.apply(this, []);
	      }

	      var fixChromeStats_ = function(response) {
	        var standardReport = {};
	        var reports = response.result();
	        reports.forEach(function(report) {
	          var standardStats = {
	            id: report.id,
	            timestamp: report.timestamp,
	            type: {
	              localcandidate: 'local-candidate',
	              remotecandidate: 'remote-candidate'
	            }[report.type] || report.type
	          };
	          report.names().forEach(function(name) {
	            standardStats[name] = report.stat(name);
	          });
	          standardReport[standardStats.id] = standardStats;
	        });

	        return standardReport;
	      };

	      // shim getStats with maplike support
	      var makeMapStats = function(stats) {
	        return new Map(Object.keys(stats).map(function(key) {
	          return [key, stats[key]];
	        }));
	      };

	      if (arguments.length >= 2) {
	        var successCallbackWrapper_ = function(response) {
	          args[1](makeMapStats(fixChromeStats_(response)));
	        };

	        return origGetStats.apply(this, [successCallbackWrapper_,
	          arguments[0]]);
	      }

	      // promise-support
	      return new Promise(function(resolve, reject) {
	        origGetStats.apply(pc, [
	          function(response) {
	            resolve(makeMapStats(fixChromeStats_(response)));
	          }, reject]);
	      }).then(successCallback, errorCallback);
	    };

	    // add promise support -- natively available in Chrome 51
	    if (browserDetails.version < 51) {
	      ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
	          .forEach(function(method) {
	            var nativeMethod = window.RTCPeerConnection.prototype[method];
	            window.RTCPeerConnection.prototype[method] = function() {
	              var args = arguments;
	              var pc = this;
	              var promise = new Promise(function(resolve, reject) {
	                nativeMethod.apply(pc, [args[0], resolve, reject]);
	              });
	              if (args.length < 2) {
	                return promise;
	              }
	              return promise.then(function() {
	                args[1].apply(null, []);
	              },
	              function(err) {
	                if (args.length >= 3) {
	                  args[2].apply(null, [err]);
	                }
	              });
	            };
	          });
	    }

	    // promise support for createOffer and createAnswer. Available (without
	    // bugs) since M52: crbug/619289
	    if (browserDetails.version < 52) {
	      ['createOffer', 'createAnswer'].forEach(function(method) {
	        var nativeMethod = window.RTCPeerConnection.prototype[method];
	        window.RTCPeerConnection.prototype[method] = function() {
	          var pc = this;
	          if (arguments.length < 1 || (arguments.length === 1 &&
	              typeof arguments[0] === 'object')) {
	            var opts = arguments.length === 1 ? arguments[0] : undefined;
	            return new Promise(function(resolve, reject) {
	              nativeMethod.apply(pc, [resolve, reject, opts]);
	            });
	          }
	          return nativeMethod.apply(this, arguments);
	        };
	      });
	    }

	    // shim implicit creation of RTCSessionDescription/RTCIceCandidate
	    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
	        .forEach(function(method) {
	          var nativeMethod = window.RTCPeerConnection.prototype[method];
	          window.RTCPeerConnection.prototype[method] = function() {
	            arguments[0] = new ((method === 'addIceCandidate') ?
	                window.RTCIceCandidate :
	                window.RTCSessionDescription)(arguments[0]);
	            return nativeMethod.apply(this, arguments);
	          };
	        });

	    // support for addIceCandidate(null or undefined)
	    var nativeAddIceCandidate =
	        window.RTCPeerConnection.prototype.addIceCandidate;
	    window.RTCPeerConnection.prototype.addIceCandidate = function() {
	      if (!arguments[0]) {
	        if (arguments[1]) {
	          arguments[1].apply(null);
	        }
	        return Promise.resolve();
	      }
	      return nativeAddIceCandidate.apply(this, arguments);
	    };
	  },

	  fixNegotiationNeeded: function(window) {
	    utils.wrapPeerConnectionEvent(window, 'negotiationneeded', function(e) {
	      var pc = e.target;
	      if (pc.signalingState !== 'stable') {
	        return;
	      }
	      return e;
	    });
	  },

	  shimGetDisplayMedia: function(window, getSourceId) {
	    if ('getDisplayMedia' in window.navigator) {
	      return;
	    }
	    // getSourceId is a function that returns a promise resolving with
	    // the sourceId of the screen/window/tab to be shared.
	    if (typeof getSourceId !== 'function') {
	      console.error('shimGetDisplayMedia: getSourceId argument is not ' +
	          'a function');
	      return;
	    }
	    navigator.getDisplayMedia = function(constraints) {
	      return getSourceId(constraints)
	        .then(function(sourceId) {
	          var widthSpecified = constraints.video && constraints.video.width;
	          var heightSpecified = constraints.video && constraints.video.height;
	          var frameRateSpecified = constraints.video &&
	            constraints.video.frameRate;
	          constraints.video = {
	            mandatory: {
	              chromeMediaSource: 'desktop',
	              chromeMediaSourceId: sourceId,
	              maxFrameRate: frameRateSpecified || 3
	            }
	          };
	          if (widthSpecified) {
	            constraints.video.mandatory.maxWidth = widthSpecified;
	          }
	          if (heightSpecified) {
	            constraints.video.mandatory.maxHeight = heightSpecified;
	          }
	          return navigator.mediaDevices.getUserMedia(constraints);
	        });
	    };
	  }
	};

	// Edge does not like
	// 1) stun: filtered after 14393 unless ?transport=udp is present
	// 2) turn: that does not have all of turn:host:port?transport=udp
	// 3) turn: with ipv6 addresses
	// 4) turn: occurring muliple times
	var filtericeservers = function(iceServers, edgeVersion) {
	  var hasTurn = false;
	  iceServers = JSON.parse(JSON.stringify(iceServers));
	  return iceServers.filter(function(server) {
	    if (server && (server.urls || server.url)) {
	      var urls = server.urls || server.url;
	      if (server.url && !server.urls) {
	        utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
	      }
	      var isString = typeof urls === 'string';
	      if (isString) {
	        urls = [urls];
	      }
	      urls = urls.filter(function(url) {
	        var validTurn = url.indexOf('turn:') === 0 &&
	            url.indexOf('transport=udp') !== -1 &&
	            url.indexOf('turn:[') === -1 &&
	            !hasTurn;

	        if (validTurn) {
	          hasTurn = true;
	          return true;
	        }
	        return url.indexOf('stun:') === 0 && edgeVersion >= 14393 &&
	            url.indexOf('?transport=udp') === -1;
	      });

	      delete server.url;
	      server.urls = isString ? urls[0] : urls;
	      return !!urls.length;
	    }
	  });
	};

	var sdp = createCommonjsModule(function (module) {

	// SDP helpers.
	var SDPUtils = {};

	// Generate an alphanumeric identifier for cname or mids.
	// TODO: use UUIDs instead? https://gist.github.com/jed/982883
	SDPUtils.generateIdentifier = function() {
	  return Math.random().toString(36).substr(2, 10);
	};

	// The RTCP CNAME used by all peerconnections from the same JS.
	SDPUtils.localCName = SDPUtils.generateIdentifier();

	// Splits SDP into lines, dealing with both CRLF and LF.
	SDPUtils.splitLines = function(blob) {
	  return blob.trim().split('\n').map(function(line) {
	    return line.trim();
	  });
	};
	// Splits SDP into sessionpart and mediasections. Ensures CRLF.
	SDPUtils.splitSections = function(blob) {
	  var parts = blob.split('\nm=');
	  return parts.map(function(part, index) {
	    return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
	  });
	};

	// returns the session description.
	SDPUtils.getDescription = function(blob) {
	  var sections = SDPUtils.splitSections(blob);
	  return sections && sections[0];
	};

	// returns the individual media sections.
	SDPUtils.getMediaSections = function(blob) {
	  var sections = SDPUtils.splitSections(blob);
	  sections.shift();
	  return sections;
	};

	// Returns lines that start with a certain prefix.
	SDPUtils.matchPrefix = function(blob, prefix) {
	  return SDPUtils.splitLines(blob).filter(function(line) {
	    return line.indexOf(prefix) === 0;
	  });
	};

	// Parses an ICE candidate line. Sample input:
	// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
	// rport 55996"
	SDPUtils.parseCandidate = function(line) {
	  var parts;
	  // Parse both variants.
	  if (line.indexOf('a=candidate:') === 0) {
	    parts = line.substring(12).split(' ');
	  } else {
	    parts = line.substring(10).split(' ');
	  }

	  var candidate = {
	    foundation: parts[0],
	    component: parseInt(parts[1], 10),
	    protocol: parts[2].toLowerCase(),
	    priority: parseInt(parts[3], 10),
	    ip: parts[4],
	    address: parts[4], // address is an alias for ip.
	    port: parseInt(parts[5], 10),
	    // skip parts[6] == 'typ'
	    type: parts[7]
	  };

	  for (var i = 8; i < parts.length; i += 2) {
	    switch (parts[i]) {
	      case 'raddr':
	        candidate.relatedAddress = parts[i + 1];
	        break;
	      case 'rport':
	        candidate.relatedPort = parseInt(parts[i + 1], 10);
	        break;
	      case 'tcptype':
	        candidate.tcpType = parts[i + 1];
	        break;
	      case 'ufrag':
	        candidate.ufrag = parts[i + 1]; // for backward compability.
	        candidate.usernameFragment = parts[i + 1];
	        break;
	      default: // extension handling, in particular ufrag
	        candidate[parts[i]] = parts[i + 1];
	        break;
	    }
	  }
	  return candidate;
	};

	// Translates a candidate object into SDP candidate attribute.
	SDPUtils.writeCandidate = function(candidate) {
	  var sdp = [];
	  sdp.push(candidate.foundation);
	  sdp.push(candidate.component);
	  sdp.push(candidate.protocol.toUpperCase());
	  sdp.push(candidate.priority);
	  sdp.push(candidate.address || candidate.ip);
	  sdp.push(candidate.port);

	  var type = candidate.type;
	  sdp.push('typ');
	  sdp.push(type);
	  if (type !== 'host' && candidate.relatedAddress &&
	      candidate.relatedPort) {
	    sdp.push('raddr');
	    sdp.push(candidate.relatedAddress);
	    sdp.push('rport');
	    sdp.push(candidate.relatedPort);
	  }
	  if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
	    sdp.push('tcptype');
	    sdp.push(candidate.tcpType);
	  }
	  if (candidate.usernameFragment || candidate.ufrag) {
	    sdp.push('ufrag');
	    sdp.push(candidate.usernameFragment || candidate.ufrag);
	  }
	  return 'candidate:' + sdp.join(' ');
	};

	// Parses an ice-options line, returns an array of option tags.
	// a=ice-options:foo bar
	SDPUtils.parseIceOptions = function(line) {
	  return line.substr(14).split(' ');
	};

	// Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
	// a=rtpmap:111 opus/48000/2
	SDPUtils.parseRtpMap = function(line) {
	  var parts = line.substr(9).split(' ');
	  var parsed = {
	    payloadType: parseInt(parts.shift(), 10) // was: id
	  };

	  parts = parts[0].split('/');

	  parsed.name = parts[0];
	  parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
	  parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
	  // legacy alias, got renamed back to channels in ORTC.
	  parsed.numChannels = parsed.channels;
	  return parsed;
	};

	// Generate an a=rtpmap line from RTCRtpCodecCapability or
	// RTCRtpCodecParameters.
	SDPUtils.writeRtpMap = function(codec) {
	  var pt = codec.payloadType;
	  if (codec.preferredPayloadType !== undefined) {
	    pt = codec.preferredPayloadType;
	  }
	  var channels = codec.channels || codec.numChannels || 1;
	  return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
	      (channels !== 1 ? '/' + channels : '') + '\r\n';
	};

	// Parses an a=extmap line (headerextension from RFC 5285). Sample input:
	// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
	// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
	SDPUtils.parseExtmap = function(line) {
	  var parts = line.substr(9).split(' ');
	  return {
	    id: parseInt(parts[0], 10),
	    direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
	    uri: parts[1]
	  };
	};

	// Generates a=extmap line from RTCRtpHeaderExtensionParameters or
	// RTCRtpHeaderExtension.
	SDPUtils.writeExtmap = function(headerExtension) {
	  return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
	      (headerExtension.direction && headerExtension.direction !== 'sendrecv'
	          ? '/' + headerExtension.direction
	          : '') +
	      ' ' + headerExtension.uri + '\r\n';
	};

	// Parses an ftmp line, returns dictionary. Sample input:
	// a=fmtp:96 vbr=on;cng=on
	// Also deals with vbr=on; cng=on
	SDPUtils.parseFmtp = function(line) {
	  var parsed = {};
	  var kv;
	  var parts = line.substr(line.indexOf(' ') + 1).split(';');
	  for (var j = 0; j < parts.length; j++) {
	    kv = parts[j].trim().split('=');
	    parsed[kv[0].trim()] = kv[1];
	  }
	  return parsed;
	};

	// Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
	SDPUtils.writeFmtp = function(codec) {
	  var line = '';
	  var pt = codec.payloadType;
	  if (codec.preferredPayloadType !== undefined) {
	    pt = codec.preferredPayloadType;
	  }
	  if (codec.parameters && Object.keys(codec.parameters).length) {
	    var params = [];
	    Object.keys(codec.parameters).forEach(function(param) {
	      if (codec.parameters[param]) {
	        params.push(param + '=' + codec.parameters[param]);
	      } else {
	        params.push(param);
	      }
	    });
	    line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
	  }
	  return line;
	};

	// Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
	// a=rtcp-fb:98 nack rpsi
	SDPUtils.parseRtcpFb = function(line) {
	  var parts = line.substr(line.indexOf(' ') + 1).split(' ');
	  return {
	    type: parts.shift(),
	    parameter: parts.join(' ')
	  };
	};
	// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
	SDPUtils.writeRtcpFb = function(codec) {
	  var lines = '';
	  var pt = codec.payloadType;
	  if (codec.preferredPayloadType !== undefined) {
	    pt = codec.preferredPayloadType;
	  }
	  if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
	    // FIXME: special handling for trr-int?
	    codec.rtcpFeedback.forEach(function(fb) {
	      lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
	      (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
	          '\r\n';
	    });
	  }
	  return lines;
	};

	// Parses an RFC 5576 ssrc media attribute. Sample input:
	// a=ssrc:3735928559 cname:something
	SDPUtils.parseSsrcMedia = function(line) {
	  var sp = line.indexOf(' ');
	  var parts = {
	    ssrc: parseInt(line.substr(7, sp - 7), 10)
	  };
	  var colon = line.indexOf(':', sp);
	  if (colon > -1) {
	    parts.attribute = line.substr(sp + 1, colon - sp - 1);
	    parts.value = line.substr(colon + 1);
	  } else {
	    parts.attribute = line.substr(sp + 1);
	  }
	  return parts;
	};

	SDPUtils.parseSsrcGroup = function(line) {
	  var parts = line.substr(13).split(' ');
	  return {
	    semantics: parts.shift(),
	    ssrcs: parts.map(function(ssrc) {
	      return parseInt(ssrc, 10);
	    })
	  };
	};

	// Extracts the MID (RFC 5888) from a media section.
	// returns the MID or undefined if no mid line was found.
	SDPUtils.getMid = function(mediaSection) {
	  var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
	  if (mid) {
	    return mid.substr(6);
	  }
	};

	SDPUtils.parseFingerprint = function(line) {
	  var parts = line.substr(14).split(' ');
	  return {
	    algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
	    value: parts[1]
	  };
	};

	// Extracts DTLS parameters from SDP media section or sessionpart.
	// FIXME: for consistency with other functions this should only
	//   get the fingerprint line as input. See also getIceParameters.
	SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
	  var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
	      'a=fingerprint:');
	  // Note: a=setup line is ignored since we use the 'auto' role.
	  // Note2: 'algorithm' is not case sensitive except in Edge.
	  return {
	    role: 'auto',
	    fingerprints: lines.map(SDPUtils.parseFingerprint)
	  };
	};

	// Serializes DTLS parameters to SDP.
	SDPUtils.writeDtlsParameters = function(params, setupType) {
	  var sdp = 'a=setup:' + setupType + '\r\n';
	  params.fingerprints.forEach(function(fp) {
	    sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
	  });
	  return sdp;
	};
	// Parses ICE information from SDP media section or sessionpart.
	// FIXME: for consistency with other functions this should only
	//   get the ice-ufrag and ice-pwd lines as input.
	SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
	  var lines = SDPUtils.splitLines(mediaSection);
	  // Search in session part, too.
	  lines = lines.concat(SDPUtils.splitLines(sessionpart));
	  var iceParameters = {
	    usernameFragment: lines.filter(function(line) {
	      return line.indexOf('a=ice-ufrag:') === 0;
	    })[0].substr(12),
	    password: lines.filter(function(line) {
	      return line.indexOf('a=ice-pwd:') === 0;
	    })[0].substr(10)
	  };
	  return iceParameters;
	};

	// Serializes ICE parameters to SDP.
	SDPUtils.writeIceParameters = function(params) {
	  return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
	      'a=ice-pwd:' + params.password + '\r\n';
	};

	// Parses the SDP media section and returns RTCRtpParameters.
	SDPUtils.parseRtpParameters = function(mediaSection) {
	  var description = {
	    codecs: [],
	    headerExtensions: [],
	    fecMechanisms: [],
	    rtcp: []
	  };
	  var lines = SDPUtils.splitLines(mediaSection);
	  var mline = lines[0].split(' ');
	  for (var i = 3; i < mline.length; i++) { // find all codecs from mline[3..]
	    var pt = mline[i];
	    var rtpmapline = SDPUtils.matchPrefix(
	        mediaSection, 'a=rtpmap:' + pt + ' ')[0];
	    if (rtpmapline) {
	      var codec = SDPUtils.parseRtpMap(rtpmapline);
	      var fmtps = SDPUtils.matchPrefix(
	          mediaSection, 'a=fmtp:' + pt + ' ');
	      // Only the first a=fmtp:<pt> is considered.
	      codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
	      codec.rtcpFeedback = SDPUtils.matchPrefix(
	          mediaSection, 'a=rtcp-fb:' + pt + ' ')
	        .map(SDPUtils.parseRtcpFb);
	      description.codecs.push(codec);
	      // parse FEC mechanisms from rtpmap lines.
	      switch (codec.name.toUpperCase()) {
	        case 'RED':
	        case 'ULPFEC':
	          description.fecMechanisms.push(codec.name.toUpperCase());
	          break;
	        default: // only RED and ULPFEC are recognized as FEC mechanisms.
	          break;
	      }
	    }
	  }
	  SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
	    description.headerExtensions.push(SDPUtils.parseExtmap(line));
	  });
	  // FIXME: parse rtcp.
	  return description;
	};

	// Generates parts of the SDP media section describing the capabilities /
	// parameters.
	SDPUtils.writeRtpDescription = function(kind, caps) {
	  var sdp = '';

	  // Build the mline.
	  sdp += 'm=' + kind + ' ';
	  sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
	  sdp += ' UDP/TLS/RTP/SAVPF ';
	  sdp += caps.codecs.map(function(codec) {
	    if (codec.preferredPayloadType !== undefined) {
	      return codec.preferredPayloadType;
	    }
	    return codec.payloadType;
	  }).join(' ') + '\r\n';

	  sdp += 'c=IN IP4 0.0.0.0\r\n';
	  sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

	  // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
	  caps.codecs.forEach(function(codec) {
	    sdp += SDPUtils.writeRtpMap(codec);
	    sdp += SDPUtils.writeFmtp(codec);
	    sdp += SDPUtils.writeRtcpFb(codec);
	  });
	  var maxptime = 0;
	  caps.codecs.forEach(function(codec) {
	    if (codec.maxptime > maxptime) {
	      maxptime = codec.maxptime;
	    }
	  });
	  if (maxptime > 0) {
	    sdp += 'a=maxptime:' + maxptime + '\r\n';
	  }
	  sdp += 'a=rtcp-mux\r\n';

	  if (caps.headerExtensions) {
	    caps.headerExtensions.forEach(function(extension) {
	      sdp += SDPUtils.writeExtmap(extension);
	    });
	  }
	  // FIXME: write fecMechanisms.
	  return sdp;
	};

	// Parses the SDP media section and returns an array of
	// RTCRtpEncodingParameters.
	SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
	  var encodingParameters = [];
	  var description = SDPUtils.parseRtpParameters(mediaSection);
	  var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
	  var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

	  // filter a=ssrc:... cname:, ignore PlanB-msid
	  var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
	  .map(function(line) {
	    return SDPUtils.parseSsrcMedia(line);
	  })
	  .filter(function(parts) {
	    return parts.attribute === 'cname';
	  });
	  var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
	  var secondarySsrc;

	  var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
	  .map(function(line) {
	    var parts = line.substr(17).split(' ');
	    return parts.map(function(part) {
	      return parseInt(part, 10);
	    });
	  });
	  if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
	    secondarySsrc = flows[0][1];
	  }

	  description.codecs.forEach(function(codec) {
	    if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
	      var encParam = {
	        ssrc: primarySsrc,
	        codecPayloadType: parseInt(codec.parameters.apt, 10)
	      };
	      if (primarySsrc && secondarySsrc) {
	        encParam.rtx = {ssrc: secondarySsrc};
	      }
	      encodingParameters.push(encParam);
	      if (hasRed) {
	        encParam = JSON.parse(JSON.stringify(encParam));
	        encParam.fec = {
	          ssrc: primarySsrc,
	          mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
	        };
	        encodingParameters.push(encParam);
	      }
	    }
	  });
	  if (encodingParameters.length === 0 && primarySsrc) {
	    encodingParameters.push({
	      ssrc: primarySsrc
	    });
	  }

	  // we support both b=AS and b=TIAS but interpret AS as TIAS.
	  var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
	  if (bandwidth.length) {
	    if (bandwidth[0].indexOf('b=TIAS:') === 0) {
	      bandwidth = parseInt(bandwidth[0].substr(7), 10);
	    } else if (bandwidth[0].indexOf('b=AS:') === 0) {
	      // use formula from JSEP to convert b=AS to TIAS value.
	      bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95
	          - (50 * 40 * 8);
	    } else {
	      bandwidth = undefined;
	    }
	    encodingParameters.forEach(function(params) {
	      params.maxBitrate = bandwidth;
	    });
	  }
	  return encodingParameters;
	};

	// parses http://draft.ortc.org/#rtcrtcpparameters*
	SDPUtils.parseRtcpParameters = function(mediaSection) {
	  var rtcpParameters = {};

	  // Gets the first SSRC. Note tha with RTX there might be multiple
	  // SSRCs.
	  var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
	      .map(function(line) {
	        return SDPUtils.parseSsrcMedia(line);
	      })
	      .filter(function(obj) {
	        return obj.attribute === 'cname';
	      })[0];
	  if (remoteSsrc) {
	    rtcpParameters.cname = remoteSsrc.value;
	    rtcpParameters.ssrc = remoteSsrc.ssrc;
	  }

	  // Edge uses the compound attribute instead of reducedSize
	  // compound is !reducedSize
	  var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
	  rtcpParameters.reducedSize = rsize.length > 0;
	  rtcpParameters.compound = rsize.length === 0;

	  // parses the rtcp-mux attrіbute.
	  // Note that Edge does not support unmuxed RTCP.
	  var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
	  rtcpParameters.mux = mux.length > 0;

	  return rtcpParameters;
	};

	// parses either a=msid: or a=ssrc:... msid lines and returns
	// the id of the MediaStream and MediaStreamTrack.
	SDPUtils.parseMsid = function(mediaSection) {
	  var parts;
	  var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
	  if (spec.length === 1) {
	    parts = spec[0].substr(7).split(' ');
	    return {stream: parts[0], track: parts[1]};
	  }
	  var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
	  .map(function(line) {
	    return SDPUtils.parseSsrcMedia(line);
	  })
	  .filter(function(msidParts) {
	    return msidParts.attribute === 'msid';
	  });
	  if (planB.length > 0) {
	    parts = planB[0].value.split(' ');
	    return {stream: parts[0], track: parts[1]};
	  }
	};

	// Generate a session ID for SDP.
	// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
	// recommends using a cryptographically random +ve 64-bit value
	// but right now this should be acceptable and within the right range
	SDPUtils.generateSessionId = function() {
	  return Math.random().toString().substr(2, 21);
	};

	// Write boilder plate for start of SDP
	// sessId argument is optional - if not supplied it will
	// be generated randomly
	// sessVersion is optional and defaults to 2
	// sessUser is optional and defaults to 'thisisadapterortc'
	SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
	  var sessionId;
	  var version = sessVer !== undefined ? sessVer : 2;
	  if (sessId) {
	    sessionId = sessId;
	  } else {
	    sessionId = SDPUtils.generateSessionId();
	  }
	  var user = sessUser || 'thisisadapterortc';
	  // FIXME: sess-id should be an NTP timestamp.
	  return 'v=0\r\n' +
	      'o=' + user + ' ' + sessionId + ' ' + version +
	        ' IN IP4 127.0.0.1\r\n' +
	      's=-\r\n' +
	      't=0 0\r\n';
	};

	SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
	  var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

	  // Map ICE parameters (ufrag, pwd) to SDP.
	  sdp += SDPUtils.writeIceParameters(
	      transceiver.iceGatherer.getLocalParameters());

	  // Map DTLS parameters to SDP.
	  sdp += SDPUtils.writeDtlsParameters(
	      transceiver.dtlsTransport.getLocalParameters(),
	      type === 'offer' ? 'actpass' : 'active');

	  sdp += 'a=mid:' + transceiver.mid + '\r\n';

	  if (transceiver.direction) {
	    sdp += 'a=' + transceiver.direction + '\r\n';
	  } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
	    sdp += 'a=sendrecv\r\n';
	  } else if (transceiver.rtpSender) {
	    sdp += 'a=sendonly\r\n';
	  } else if (transceiver.rtpReceiver) {
	    sdp += 'a=recvonly\r\n';
	  } else {
	    sdp += 'a=inactive\r\n';
	  }

	  if (transceiver.rtpSender) {
	    // spec.
	    var msid = 'msid:' + stream.id + ' ' +
	        transceiver.rtpSender.track.id + '\r\n';
	    sdp += 'a=' + msid;

	    // for Chrome.
	    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
	        ' ' + msid;
	    if (transceiver.sendEncodingParameters[0].rtx) {
	      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
	          ' ' + msid;
	      sdp += 'a=ssrc-group:FID ' +
	          transceiver.sendEncodingParameters[0].ssrc + ' ' +
	          transceiver.sendEncodingParameters[0].rtx.ssrc +
	          '\r\n';
	    }
	  }
	  // FIXME: this should be written by writeRtpDescription.
	  sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
	      ' cname:' + SDPUtils.localCName + '\r\n';
	  if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
	    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
	        ' cname:' + SDPUtils.localCName + '\r\n';
	  }
	  return sdp;
	};

	// Gets the direction from the mediaSection or the sessionpart.
	SDPUtils.getDirection = function(mediaSection, sessionpart) {
	  // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
	  var lines = SDPUtils.splitLines(mediaSection);
	  for (var i = 0; i < lines.length; i++) {
	    switch (lines[i]) {
	      case 'a=sendrecv':
	      case 'a=sendonly':
	      case 'a=recvonly':
	      case 'a=inactive':
	        return lines[i].substr(2);
	      default:
	        // FIXME: What should happen here?
	    }
	  }
	  if (sessionpart) {
	    return SDPUtils.getDirection(sessionpart);
	  }
	  return 'sendrecv';
	};

	SDPUtils.getKind = function(mediaSection) {
	  var lines = SDPUtils.splitLines(mediaSection);
	  var mline = lines[0].split(' ');
	  return mline[0].substr(2);
	};

	SDPUtils.isRejected = function(mediaSection) {
	  return mediaSection.split(' ', 2)[1] === '0';
	};

	SDPUtils.parseMLine = function(mediaSection) {
	  var lines = SDPUtils.splitLines(mediaSection);
	  var parts = lines[0].substr(2).split(' ');
	  return {
	    kind: parts[0],
	    port: parseInt(parts[1], 10),
	    protocol: parts[2],
	    fmt: parts.slice(3).join(' ')
	  };
	};

	SDPUtils.parseOLine = function(mediaSection) {
	  var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
	  var parts = line.substr(2).split(' ');
	  return {
	    username: parts[0],
	    sessionId: parts[1],
	    sessionVersion: parseInt(parts[2], 10),
	    netType: parts[3],
	    addressType: parts[4],
	    address: parts[5]
	  };
	};

	// a very naive interpretation of a valid SDP.
	SDPUtils.isValidSDP = function(blob) {
	  if (typeof blob !== 'string' || blob.length === 0) {
	    return false;
	  }
	  var lines = SDPUtils.splitLines(blob);
	  for (var i = 0; i < lines.length; i++) {
	    if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
	      return false;
	    }
	    // TODO: check the modifier a bit more.
	  }
	  return true;
	};

	// Expose public methods.
	{
	  module.exports = SDPUtils;
	}
	});

	function fixStatsType(stat) {
	  return {
	    inboundrtp: 'inbound-rtp',
	    outboundrtp: 'outbound-rtp',
	    candidatepair: 'candidate-pair',
	    localcandidate: 'local-candidate',
	    remotecandidate: 'remote-candidate'
	  }[stat.type] || stat.type;
	}

	function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
	  var sdp$$1 = sdp.writeRtpDescription(transceiver.kind, caps);

	  // Map ICE parameters (ufrag, pwd) to SDP.
	  sdp$$1 += sdp.writeIceParameters(
	      transceiver.iceGatherer.getLocalParameters());

	  // Map DTLS parameters to SDP.
	  sdp$$1 += sdp.writeDtlsParameters(
	      transceiver.dtlsTransport.getLocalParameters(),
	      type === 'offer' ? 'actpass' : dtlsRole || 'active');

	  sdp$$1 += 'a=mid:' + transceiver.mid + '\r\n';

	  if (transceiver.rtpSender && transceiver.rtpReceiver) {
	    sdp$$1 += 'a=sendrecv\r\n';
	  } else if (transceiver.rtpSender) {
	    sdp$$1 += 'a=sendonly\r\n';
	  } else if (transceiver.rtpReceiver) {
	    sdp$$1 += 'a=recvonly\r\n';
	  } else {
	    sdp$$1 += 'a=inactive\r\n';
	  }

	  if (transceiver.rtpSender) {
	    var trackId = transceiver.rtpSender._initialTrackId ||
	        transceiver.rtpSender.track.id;
	    transceiver.rtpSender._initialTrackId = trackId;
	    // spec.
	    var msid = 'msid:' + (stream ? stream.id : '-') + ' ' +
	        trackId + '\r\n';
	    sdp$$1 += 'a=' + msid;
	    // for Chrome. Legacy should no longer be required.
	    sdp$$1 += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
	        ' ' + msid;

	    // RTX
	    if (transceiver.sendEncodingParameters[0].rtx) {
	      sdp$$1 += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
	          ' ' + msid;
	      sdp$$1 += 'a=ssrc-group:FID ' +
	          transceiver.sendEncodingParameters[0].ssrc + ' ' +
	          transceiver.sendEncodingParameters[0].rtx.ssrc +
	          '\r\n';
	    }
	  }
	  // FIXME: this should be written by writeRtpDescription.
	  sdp$$1 += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
	      ' cname:' + sdp.localCName + '\r\n';
	  if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
	    sdp$$1 += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
	        ' cname:' + sdp.localCName + '\r\n';
	  }
	  return sdp$$1;
	}

	// Edge does not like
	// 1) stun: filtered after 14393 unless ?transport=udp is present
	// 2) turn: that does not have all of turn:host:port?transport=udp
	// 3) turn: with ipv6 addresses
	// 4) turn: occurring muliple times
	function filterIceServers(iceServers, edgeVersion) {
	  var hasTurn = false;
	  iceServers = JSON.parse(JSON.stringify(iceServers));
	  return iceServers.filter(function(server) {
	    if (server && (server.urls || server.url)) {
	      var urls = server.urls || server.url;
	      if (server.url && !server.urls) {
	        console.warn('RTCIceServer.url is deprecated! Use urls instead.');
	      }
	      var isString = typeof urls === 'string';
	      if (isString) {
	        urls = [urls];
	      }
	      urls = urls.filter(function(url) {
	        var validTurn = url.indexOf('turn:') === 0 &&
	            url.indexOf('transport=udp') !== -1 &&
	            url.indexOf('turn:[') === -1 &&
	            !hasTurn;

	        if (validTurn) {
	          hasTurn = true;
	          return true;
	        }
	        return url.indexOf('stun:') === 0 && edgeVersion >= 14393 &&
	            url.indexOf('?transport=udp') === -1;
	      });

	      delete server.url;
	      server.urls = isString ? urls[0] : urls;
	      return !!urls.length;
	    }
	  });
	}

	// Determines the intersection of local and remote capabilities.
	function getCommonCapabilities(localCapabilities, remoteCapabilities) {
	  var commonCapabilities = {
	    codecs: [],
	    headerExtensions: [],
	    fecMechanisms: []
	  };

	  var findCodecByPayloadType = function(pt, codecs) {
	    pt = parseInt(pt, 10);
	    for (var i = 0; i < codecs.length; i++) {
	      if (codecs[i].payloadType === pt ||
	          codecs[i].preferredPayloadType === pt) {
	        return codecs[i];
	      }
	    }
	  };

	  var rtxCapabilityMatches = function(lRtx, rRtx, lCodecs, rCodecs) {
	    var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
	    var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
	    return lCodec && rCodec &&
	        lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
	  };

	  localCapabilities.codecs.forEach(function(lCodec) {
	    for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
	      var rCodec = remoteCapabilities.codecs[i];
	      if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() &&
	          lCodec.clockRate === rCodec.clockRate) {
	        if (lCodec.name.toLowerCase() === 'rtx' &&
	            lCodec.parameters && rCodec.parameters.apt) {
	          // for RTX we need to find the local rtx that has a apt
	          // which points to the same local codec as the remote one.
	          if (!rtxCapabilityMatches(lCodec, rCodec,
	              localCapabilities.codecs, remoteCapabilities.codecs)) {
	            continue;
	          }
	        }
	        rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
	        // number of channels is the highest common number of channels
	        rCodec.numChannels = Math.min(lCodec.numChannels,
	            rCodec.numChannels);
	        // push rCodec so we reply with offerer payload type
	        commonCapabilities.codecs.push(rCodec);

	        // determine common feedback mechanisms
	        rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function(fb) {
	          for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
	            if (lCodec.rtcpFeedback[j].type === fb.type &&
	                lCodec.rtcpFeedback[j].parameter === fb.parameter) {
	              return true;
	            }
	          }
	          return false;
	        });
	        // FIXME: also need to determine .parameters
	        //  see https://github.com/openpeer/ortc/issues/569
	        break;
	      }
	    }
	  });

	  localCapabilities.headerExtensions.forEach(function(lHeaderExtension) {
	    for (var i = 0; i < remoteCapabilities.headerExtensions.length;
	         i++) {
	      var rHeaderExtension = remoteCapabilities.headerExtensions[i];
	      if (lHeaderExtension.uri === rHeaderExtension.uri) {
	        commonCapabilities.headerExtensions.push(rHeaderExtension);
	        break;
	      }
	    }
	  });

	  // FIXME: fecMechanisms
	  return commonCapabilities;
	}

	// is action=setLocalDescription with type allowed in signalingState
	function isActionAllowedInSignalingState(action, type, signalingState) {
	  return {
	    offer: {
	      setLocalDescription: ['stable', 'have-local-offer'],
	      setRemoteDescription: ['stable', 'have-remote-offer']
	    },
	    answer: {
	      setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
	      setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
	    }
	  }[type][action].indexOf(signalingState) !== -1;
	}

	function maybeAddCandidate(iceTransport, candidate) {
	  // Edge's internal representation adds some fields therefore
	  // not all fieldѕ are taken into account.
	  var alreadyAdded = iceTransport.getRemoteCandidates()
	      .find(function(remoteCandidate) {
	        return candidate.foundation === remoteCandidate.foundation &&
	            candidate.ip === remoteCandidate.ip &&
	            candidate.port === remoteCandidate.port &&
	            candidate.priority === remoteCandidate.priority &&
	            candidate.protocol === remoteCandidate.protocol &&
	            candidate.type === remoteCandidate.type;
	      });
	  if (!alreadyAdded) {
	    iceTransport.addRemoteCandidate(candidate);
	  }
	  return !alreadyAdded;
	}


	function makeError(name, description) {
	  var e = new Error(description);
	  e.name = name;
	  // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
	  e.code = {
	    NotSupportedError: 9,
	    InvalidStateError: 11,
	    InvalidAccessError: 15,
	    TypeError: undefined,
	    OperationError: undefined
	  }[name];
	  return e;
	}

	var rtcpeerconnection = function(window, edgeVersion) {
	  // https://w3c.github.io/mediacapture-main/#mediastream
	  // Helper function to add the track to the stream and
	  // dispatch the event ourselves.
	  function addTrackToStreamAndFireEvent(track, stream) {
	    stream.addTrack(track);
	    stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack',
	        {track: track}));
	  }

	  function removeTrackFromStreamAndFireEvent(track, stream) {
	    stream.removeTrack(track);
	    stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack',
	        {track: track}));
	  }

	  function fireAddTrack(pc, track, receiver, streams) {
	    var trackEvent = new Event('track');
	    trackEvent.track = track;
	    trackEvent.receiver = receiver;
	    trackEvent.transceiver = {receiver: receiver};
	    trackEvent.streams = streams;
	    window.setTimeout(function() {
	      pc._dispatchEvent('track', trackEvent);
	    });
	  }

	  var RTCPeerConnection = function(config) {
	    var pc = this;

	    var _eventTarget = document.createDocumentFragment();
	    ['addEventListener', 'removeEventListener', 'dispatchEvent']
	        .forEach(function(method) {
	          pc[method] = _eventTarget[method].bind(_eventTarget);
	        });

	    this.canTrickleIceCandidates = null;

	    this.needNegotiation = false;

	    this.localStreams = [];
	    this.remoteStreams = [];

	    this._localDescription = null;
	    this._remoteDescription = null;

	    this.signalingState = 'stable';
	    this.iceConnectionState = 'new';
	    this.connectionState = 'new';
	    this.iceGatheringState = 'new';

	    config = JSON.parse(JSON.stringify(config || {}));

	    this.usingBundle = config.bundlePolicy === 'max-bundle';
	    if (config.rtcpMuxPolicy === 'negotiate') {
	      throw(makeError('NotSupportedError',
	          'rtcpMuxPolicy \'negotiate\' is not supported'));
	    } else if (!config.rtcpMuxPolicy) {
	      config.rtcpMuxPolicy = 'require';
	    }

	    switch (config.iceTransportPolicy) {
	      case 'all':
	      case 'relay':
	        break;
	      default:
	        config.iceTransportPolicy = 'all';
	        break;
	    }

	    switch (config.bundlePolicy) {
	      case 'balanced':
	      case 'max-compat':
	      case 'max-bundle':
	        break;
	      default:
	        config.bundlePolicy = 'balanced';
	        break;
	    }

	    config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);

	    this._iceGatherers = [];
	    if (config.iceCandidatePoolSize) {
	      for (var i = config.iceCandidatePoolSize; i > 0; i--) {
	        this._iceGatherers.push(new window.RTCIceGatherer({
	          iceServers: config.iceServers,
	          gatherPolicy: config.iceTransportPolicy
	        }));
	      }
	    } else {
	      config.iceCandidatePoolSize = 0;
	    }

	    this._config = config;

	    // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
	    // everything that is needed to describe a SDP m-line.
	    this.transceivers = [];

	    this._sdpSessionId = sdp.generateSessionId();
	    this._sdpSessionVersion = 0;

	    this._dtlsRole = undefined; // role for a=setup to use in answers.

	    this._isClosed = false;
	  };

	  Object.defineProperty(RTCPeerConnection.prototype, 'localDescription', {
	    configurable: true,
	    get: function() {
	      return this._localDescription;
	    }
	  });
	  Object.defineProperty(RTCPeerConnection.prototype, 'remoteDescription', {
	    configurable: true,
	    get: function() {
	      return this._remoteDescription;
	    }
	  });

	  // set up event handlers on prototype
	  RTCPeerConnection.prototype.onicecandidate = null;
	  RTCPeerConnection.prototype.onaddstream = null;
	  RTCPeerConnection.prototype.ontrack = null;
	  RTCPeerConnection.prototype.onremovestream = null;
	  RTCPeerConnection.prototype.onsignalingstatechange = null;
	  RTCPeerConnection.prototype.oniceconnectionstatechange = null;
	  RTCPeerConnection.prototype.onconnectionstatechange = null;
	  RTCPeerConnection.prototype.onicegatheringstatechange = null;
	  RTCPeerConnection.prototype.onnegotiationneeded = null;
	  RTCPeerConnection.prototype.ondatachannel = null;

	  RTCPeerConnection.prototype._dispatchEvent = function(name, event) {
	    if (this._isClosed) {
	      return;
	    }
	    this.dispatchEvent(event);
	    if (typeof this['on' + name] === 'function') {
	      this['on' + name](event);
	    }
	  };

	  RTCPeerConnection.prototype._emitGatheringStateChange = function() {
	    var event = new Event('icegatheringstatechange');
	    this._dispatchEvent('icegatheringstatechange', event);
	  };

	  RTCPeerConnection.prototype.getConfiguration = function() {
	    return this._config;
	  };

	  RTCPeerConnection.prototype.getLocalStreams = function() {
	    return this.localStreams;
	  };

	  RTCPeerConnection.prototype.getRemoteStreams = function() {
	    return this.remoteStreams;
	  };

	  // internal helper to create a transceiver object.
	  // (which is not yet the same as the WebRTC 1.0 transceiver)
	  RTCPeerConnection.prototype._createTransceiver = function(kind, doNotAdd) {
	    var hasBundleTransport = this.transceivers.length > 0;
	    var transceiver = {
	      track: null,
	      iceGatherer: null,
	      iceTransport: null,
	      dtlsTransport: null,
	      localCapabilities: null,
	      remoteCapabilities: null,
	      rtpSender: null,
	      rtpReceiver: null,
	      kind: kind,
	      mid: null,
	      sendEncodingParameters: null,
	      recvEncodingParameters: null,
	      stream: null,
	      associatedRemoteMediaStreams: [],
	      wantReceive: true
	    };
	    if (this.usingBundle && hasBundleTransport) {
	      transceiver.iceTransport = this.transceivers[0].iceTransport;
	      transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
	    } else {
	      var transports = this._createIceAndDtlsTransports();
	      transceiver.iceTransport = transports.iceTransport;
	      transceiver.dtlsTransport = transports.dtlsTransport;
	    }
	    if (!doNotAdd) {
	      this.transceivers.push(transceiver);
	    }
	    return transceiver;
	  };

	  RTCPeerConnection.prototype.addTrack = function(track, stream) {
	    if (this._isClosed) {
	      throw makeError('InvalidStateError',
	          'Attempted to call addTrack on a closed peerconnection.');
	    }

	    var alreadyExists = this.transceivers.find(function(s) {
	      return s.track === track;
	    });

	    if (alreadyExists) {
	      throw makeError('InvalidAccessError', 'Track already exists.');
	    }

	    var transceiver;
	    for (var i = 0; i < this.transceivers.length; i++) {
	      if (!this.transceivers[i].track &&
	          this.transceivers[i].kind === track.kind) {
	        transceiver = this.transceivers[i];
	      }
	    }
	    if (!transceiver) {
	      transceiver = this._createTransceiver(track.kind);
	    }

	    this._maybeFireNegotiationNeeded();

	    if (this.localStreams.indexOf(stream) === -1) {
	      this.localStreams.push(stream);
	    }

	    transceiver.track = track;
	    transceiver.stream = stream;
	    transceiver.rtpSender = new window.RTCRtpSender(track,
	        transceiver.dtlsTransport);
	    return transceiver.rtpSender;
	  };

	  RTCPeerConnection.prototype.addStream = function(stream) {
	    var pc = this;
	    if (edgeVersion >= 15025) {
	      stream.getTracks().forEach(function(track) {
	        pc.addTrack(track, stream);
	      });
	    } else {
	      // Clone is necessary for local demos mostly, attaching directly
	      // to two different senders does not work (build 10547).
	      // Fixed in 15025 (or earlier)
	      var clonedStream = stream.clone();
	      stream.getTracks().forEach(function(track, idx) {
	        var clonedTrack = clonedStream.getTracks()[idx];
	        track.addEventListener('enabled', function(event) {
	          clonedTrack.enabled = event.enabled;
	        });
	      });
	      clonedStream.getTracks().forEach(function(track) {
	        pc.addTrack(track, clonedStream);
	      });
	    }
	  };

	  RTCPeerConnection.prototype.removeTrack = function(sender) {
	    if (this._isClosed) {
	      throw makeError('InvalidStateError',
	          'Attempted to call removeTrack on a closed peerconnection.');
	    }

	    if (!(sender instanceof window.RTCRtpSender)) {
	      throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack ' +
	          'does not implement interface RTCRtpSender.');
	    }

	    var transceiver = this.transceivers.find(function(t) {
	      return t.rtpSender === sender;
	    });

	    if (!transceiver) {
	      throw makeError('InvalidAccessError',
	          'Sender was not created by this connection.');
	    }
	    var stream = transceiver.stream;

	    transceiver.rtpSender.stop();
	    transceiver.rtpSender = null;
	    transceiver.track = null;
	    transceiver.stream = null;

	    // remove the stream from the set of local streams
	    var localStreams = this.transceivers.map(function(t) {
	      return t.stream;
	    });
	    if (localStreams.indexOf(stream) === -1 &&
	        this.localStreams.indexOf(stream) > -1) {
	      this.localStreams.splice(this.localStreams.indexOf(stream), 1);
	    }

	    this._maybeFireNegotiationNeeded();
	  };

	  RTCPeerConnection.prototype.removeStream = function(stream) {
	    var pc = this;
	    stream.getTracks().forEach(function(track) {
	      var sender = pc.getSenders().find(function(s) {
	        return s.track === track;
	      });
	      if (sender) {
	        pc.removeTrack(sender);
	      }
	    });
	  };

	  RTCPeerConnection.prototype.getSenders = function() {
	    return this.transceivers.filter(function(transceiver) {
	      return !!transceiver.rtpSender;
	    })
	    .map(function(transceiver) {
	      return transceiver.rtpSender;
	    });
	  };

	  RTCPeerConnection.prototype.getReceivers = function() {
	    return this.transceivers.filter(function(transceiver) {
	      return !!transceiver.rtpReceiver;
	    })
	    .map(function(transceiver) {
	      return transceiver.rtpReceiver;
	    });
	  };


	  RTCPeerConnection.prototype._createIceGatherer = function(sdpMLineIndex,
	      usingBundle) {
	    var pc = this;
	    if (usingBundle && sdpMLineIndex > 0) {
	      return this.transceivers[0].iceGatherer;
	    } else if (this._iceGatherers.length) {
	      return this._iceGatherers.shift();
	    }
	    var iceGatherer = new window.RTCIceGatherer({
	      iceServers: this._config.iceServers,
	      gatherPolicy: this._config.iceTransportPolicy
	    });
	    Object.defineProperty(iceGatherer, 'state',
	        {value: 'new', writable: true}
	    );

	    this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
	    this.transceivers[sdpMLineIndex].bufferCandidates = function(event) {
	      var end = !event.candidate || Object.keys(event.candidate).length === 0;
	      // polyfill since RTCIceGatherer.state is not implemented in
	      // Edge 10547 yet.
	      iceGatherer.state = end ? 'completed' : 'gathering';
	      if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
	        pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
	      }
	    };
	    iceGatherer.addEventListener('localcandidate',
	      this.transceivers[sdpMLineIndex].bufferCandidates);
	    return iceGatherer;
	  };

	  // start gathering from an RTCIceGatherer.
	  RTCPeerConnection.prototype._gather = function(mid, sdpMLineIndex) {
	    var pc = this;
	    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
	    if (iceGatherer.onlocalcandidate) {
	      return;
	    }
	    var bufferedCandidateEvents =
	      this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
	    this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
	    iceGatherer.removeEventListener('localcandidate',
	      this.transceivers[sdpMLineIndex].bufferCandidates);
	    iceGatherer.onlocalcandidate = function(evt) {
	      if (pc.usingBundle && sdpMLineIndex > 0) {
	        // if we know that we use bundle we can drop candidates with
	        // ѕdpMLineIndex > 0. If we don't do this then our state gets
	        // confused since we dispose the extra ice gatherer.
	        return;
	      }
	      var event = new Event('icecandidate');
	      event.candidate = {sdpMid: mid, sdpMLineIndex: sdpMLineIndex};

	      var cand = evt.candidate;
	      // Edge emits an empty object for RTCIceCandidateComplete‥
	      var end = !cand || Object.keys(cand).length === 0;
	      if (end) {
	        // polyfill since RTCIceGatherer.state is not implemented in
	        // Edge 10547 yet.
	        if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
	          iceGatherer.state = 'completed';
	        }
	      } else {
	        if (iceGatherer.state === 'new') {
	          iceGatherer.state = 'gathering';
	        }
	        // RTCIceCandidate doesn't have a component, needs to be added
	        cand.component = 1;
	        // also the usernameFragment. TODO: update SDP to take both variants.
	        cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;

	        var serializedCandidate = sdp.writeCandidate(cand);
	        event.candidate = Object.assign(event.candidate,
	            sdp.parseCandidate(serializedCandidate));

	        event.candidate.candidate = serializedCandidate;
	        event.candidate.toJSON = function() {
	          return {
	            candidate: event.candidate.candidate,
	            sdpMid: event.candidate.sdpMid,
	            sdpMLineIndex: event.candidate.sdpMLineIndex,
	            usernameFragment: event.candidate.usernameFragment
	          };
	        };
	      }

	      // update local description.
	      var sections = sdp.getMediaSections(pc._localDescription.sdp);
	      if (!end) {
	        sections[event.candidate.sdpMLineIndex] +=
	            'a=' + event.candidate.candidate + '\r\n';
	      } else {
	        sections[event.candidate.sdpMLineIndex] +=
	            'a=end-of-candidates\r\n';
	      }
	      pc._localDescription.sdp =
	          sdp.getDescription(pc._localDescription.sdp) +
	          sections.join('');
	      var complete = pc.transceivers.every(function(transceiver) {
	        return transceiver.iceGatherer &&
	            transceiver.iceGatherer.state === 'completed';
	      });

	      if (pc.iceGatheringState !== 'gathering') {
	        pc.iceGatheringState = 'gathering';
	        pc._emitGatheringStateChange();
	      }

	      // Emit candidate. Also emit null candidate when all gatherers are
	      // complete.
	      if (!end) {
	        pc._dispatchEvent('icecandidate', event);
	      }
	      if (complete) {
	        pc._dispatchEvent('icecandidate', new Event('icecandidate'));
	        pc.iceGatheringState = 'complete';
	        pc._emitGatheringStateChange();
	      }
	    };

	    // emit already gathered candidates.
	    window.setTimeout(function() {
	      bufferedCandidateEvents.forEach(function(e) {
	        iceGatherer.onlocalcandidate(e);
	      });
	    }, 0);
	  };

	  // Create ICE transport and DTLS transport.
	  RTCPeerConnection.prototype._createIceAndDtlsTransports = function() {
	    var pc = this;
	    var iceTransport = new window.RTCIceTransport(null);
	    iceTransport.onicestatechange = function() {
	      pc._updateIceConnectionState();
	      pc._updateConnectionState();
	    };

	    var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
	    dtlsTransport.ondtlsstatechange = function() {
	      pc._updateConnectionState();
	    };
	    dtlsTransport.onerror = function() {
	      // onerror does not set state to failed by itself.
	      Object.defineProperty(dtlsTransport, 'state',
	          {value: 'failed', writable: true});
	      pc._updateConnectionState();
	    };

	    return {
	      iceTransport: iceTransport,
	      dtlsTransport: dtlsTransport
	    };
	  };

	  // Destroy ICE gatherer, ICE transport and DTLS transport.
	  // Without triggering the callbacks.
	  RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function(
	      sdpMLineIndex) {
	    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
	    if (iceGatherer) {
	      delete iceGatherer.onlocalcandidate;
	      delete this.transceivers[sdpMLineIndex].iceGatherer;
	    }
	    var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
	    if (iceTransport) {
	      delete iceTransport.onicestatechange;
	      delete this.transceivers[sdpMLineIndex].iceTransport;
	    }
	    var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
	    if (dtlsTransport) {
	      delete dtlsTransport.ondtlsstatechange;
	      delete dtlsTransport.onerror;
	      delete this.transceivers[sdpMLineIndex].dtlsTransport;
	    }
	  };

	  // Start the RTP Sender and Receiver for a transceiver.
	  RTCPeerConnection.prototype._transceive = function(transceiver,
	      send, recv) {
	    var params = getCommonCapabilities(transceiver.localCapabilities,
	        transceiver.remoteCapabilities);
	    if (send && transceiver.rtpSender) {
	      params.encodings = transceiver.sendEncodingParameters;
	      params.rtcp = {
	        cname: sdp.localCName,
	        compound: transceiver.rtcpParameters.compound
	      };
	      if (transceiver.recvEncodingParameters.length) {
	        params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
	      }
	      transceiver.rtpSender.send(params);
	    }
	    if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
	      // remove RTX field in Edge 14942
	      if (transceiver.kind === 'video'
	          && transceiver.recvEncodingParameters
	          && edgeVersion < 15019) {
	        transceiver.recvEncodingParameters.forEach(function(p) {
	          delete p.rtx;
	        });
	      }
	      if (transceiver.recvEncodingParameters.length) {
	        params.encodings = transceiver.recvEncodingParameters;
	      } else {
	        params.encodings = [{}];
	      }
	      params.rtcp = {
	        compound: transceiver.rtcpParameters.compound
	      };
	      if (transceiver.rtcpParameters.cname) {
	        params.rtcp.cname = transceiver.rtcpParameters.cname;
	      }
	      if (transceiver.sendEncodingParameters.length) {
	        params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
	      }
	      transceiver.rtpReceiver.receive(params);
	    }
	  };

	  RTCPeerConnection.prototype.setLocalDescription = function(description) {
	    var pc = this;

	    // Note: pranswer is not supported.
	    if (['offer', 'answer'].indexOf(description.type) === -1) {
	      return Promise.reject(makeError('TypeError',
	          'Unsupported type "' + description.type + '"'));
	    }

	    if (!isActionAllowedInSignalingState('setLocalDescription',
	        description.type, pc.signalingState) || pc._isClosed) {
	      return Promise.reject(makeError('InvalidStateError',
	          'Can not set local ' + description.type +
	          ' in state ' + pc.signalingState));
	    }

	    var sections;
	    var sessionpart;
	    if (description.type === 'offer') {
	      // VERY limited support for SDP munging. Limited to:
	      // * changing the order of codecs
	      sections = sdp.splitSections(description.sdp);
	      sessionpart = sections.shift();
	      sections.forEach(function(mediaSection, sdpMLineIndex) {
	        var caps = sdp.parseRtpParameters(mediaSection);
	        pc.transceivers[sdpMLineIndex].localCapabilities = caps;
	      });

	      pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
	        pc._gather(transceiver.mid, sdpMLineIndex);
	      });
	    } else if (description.type === 'answer') {
	      sections = sdp.splitSections(pc._remoteDescription.sdp);
	      sessionpart = sections.shift();
	      var isIceLite = sdp.matchPrefix(sessionpart,
	          'a=ice-lite').length > 0;
	      sections.forEach(function(mediaSection, sdpMLineIndex) {
	        var transceiver = pc.transceivers[sdpMLineIndex];
	        var iceGatherer = transceiver.iceGatherer;
	        var iceTransport = transceiver.iceTransport;
	        var dtlsTransport = transceiver.dtlsTransport;
	        var localCapabilities = transceiver.localCapabilities;
	        var remoteCapabilities = transceiver.remoteCapabilities;

	        // treat bundle-only as not-rejected.
	        var rejected = sdp.isRejected(mediaSection) &&
	            sdp.matchPrefix(mediaSection, 'a=bundle-only').length === 0;

	        if (!rejected && !transceiver.rejected) {
	          var remoteIceParameters = sdp.getIceParameters(
	              mediaSection, sessionpart);
	          var remoteDtlsParameters = sdp.getDtlsParameters(
	              mediaSection, sessionpart);
	          if (isIceLite) {
	            remoteDtlsParameters.role = 'server';
	          }

	          if (!pc.usingBundle || sdpMLineIndex === 0) {
	            pc._gather(transceiver.mid, sdpMLineIndex);
	            if (iceTransport.state === 'new') {
	              iceTransport.start(iceGatherer, remoteIceParameters,
	                  isIceLite ? 'controlling' : 'controlled');
	            }
	            if (dtlsTransport.state === 'new') {
	              dtlsTransport.start(remoteDtlsParameters);
	            }
	          }

	          // Calculate intersection of capabilities.
	          var params = getCommonCapabilities(localCapabilities,
	              remoteCapabilities);

	          // Start the RTCRtpSender. The RTCRtpReceiver for this
	          // transceiver has already been started in setRemoteDescription.
	          pc._transceive(transceiver,
	              params.codecs.length > 0,
	              false);
	        }
	      });
	    }

	    pc._localDescription = {
	      type: description.type,
	      sdp: description.sdp
	    };
	    if (description.type === 'offer') {
	      pc._updateSignalingState('have-local-offer');
	    } else {
	      pc._updateSignalingState('stable');
	    }

	    return Promise.resolve();
	  };

	  RTCPeerConnection.prototype.setRemoteDescription = function(description) {
	    var pc = this;

	    // Note: pranswer is not supported.
	    if (['offer', 'answer'].indexOf(description.type) === -1) {
	      return Promise.reject(makeError('TypeError',
	          'Unsupported type "' + description.type + '"'));
	    }

	    if (!isActionAllowedInSignalingState('setRemoteDescription',
	        description.type, pc.signalingState) || pc._isClosed) {
	      return Promise.reject(makeError('InvalidStateError',
	          'Can not set remote ' + description.type +
	          ' in state ' + pc.signalingState));
	    }

	    var streams = {};
	    pc.remoteStreams.forEach(function(stream) {
	      streams[stream.id] = stream;
	    });
	    var receiverList = [];
	    var sections = sdp.splitSections(description.sdp);
	    var sessionpart = sections.shift();
	    var isIceLite = sdp.matchPrefix(sessionpart,
	        'a=ice-lite').length > 0;
	    var usingBundle = sdp.matchPrefix(sessionpart,
	        'a=group:BUNDLE ').length > 0;
	    pc.usingBundle = usingBundle;
	    var iceOptions = sdp.matchPrefix(sessionpart,
	        'a=ice-options:')[0];
	    if (iceOptions) {
	      pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ')
	          .indexOf('trickle') >= 0;
	    } else {
	      pc.canTrickleIceCandidates = false;
	    }

	    sections.forEach(function(mediaSection, sdpMLineIndex) {
	      var lines = sdp.splitLines(mediaSection);
	      var kind = sdp.getKind(mediaSection);
	      // treat bundle-only as not-rejected.
	      var rejected = sdp.isRejected(mediaSection) &&
	          sdp.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
	      var protocol = lines[0].substr(2).split(' ')[2];

	      var direction = sdp.getDirection(mediaSection, sessionpart);
	      var remoteMsid = sdp.parseMsid(mediaSection);

	      var mid = sdp.getMid(mediaSection) || sdp.generateIdentifier();

	      // Reject datachannels which are not implemented yet.
	      if (rejected || (kind === 'application' && (protocol === 'DTLS/SCTP' ||
	          protocol === 'UDP/DTLS/SCTP'))) {
	        // TODO: this is dangerous in the case where a non-rejected m-line
	        //     becomes rejected.
	        pc.transceivers[sdpMLineIndex] = {
	          mid: mid,
	          kind: kind,
	          protocol: protocol,
	          rejected: true
	        };
	        return;
	      }

	      if (!rejected && pc.transceivers[sdpMLineIndex] &&
	          pc.transceivers[sdpMLineIndex].rejected) {
	        // recycle a rejected transceiver.
	        pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
	      }

	      var transceiver;
	      var iceGatherer;
	      var iceTransport;
	      var dtlsTransport;
	      var rtpReceiver;
	      var sendEncodingParameters;
	      var recvEncodingParameters;
	      var localCapabilities;

	      var track;
	      // FIXME: ensure the mediaSection has rtcp-mux set.
	      var remoteCapabilities = sdp.parseRtpParameters(mediaSection);
	      var remoteIceParameters;
	      var remoteDtlsParameters;
	      if (!rejected) {
	        remoteIceParameters = sdp.getIceParameters(mediaSection,
	            sessionpart);
	        remoteDtlsParameters = sdp.getDtlsParameters(mediaSection,
	            sessionpart);
	        remoteDtlsParameters.role = 'client';
	      }
	      recvEncodingParameters =
	          sdp.parseRtpEncodingParameters(mediaSection);

	      var rtcpParameters = sdp.parseRtcpParameters(mediaSection);

	      var isComplete = sdp.matchPrefix(mediaSection,
	          'a=end-of-candidates', sessionpart).length > 0;
	      var cands = sdp.matchPrefix(mediaSection, 'a=candidate:')
	          .map(function(cand) {
	            return sdp.parseCandidate(cand);
	          })
	          .filter(function(cand) {
	            return cand.component === 1;
	          });

	      // Check if we can use BUNDLE and dispose transports.
	      if ((description.type === 'offer' || description.type === 'answer') &&
	          !rejected && usingBundle && sdpMLineIndex > 0 &&
	          pc.transceivers[sdpMLineIndex]) {
	        pc._disposeIceAndDtlsTransports(sdpMLineIndex);
	        pc.transceivers[sdpMLineIndex].iceGatherer =
	            pc.transceivers[0].iceGatherer;
	        pc.transceivers[sdpMLineIndex].iceTransport =
	            pc.transceivers[0].iceTransport;
	        pc.transceivers[sdpMLineIndex].dtlsTransport =
	            pc.transceivers[0].dtlsTransport;
	        if (pc.transceivers[sdpMLineIndex].rtpSender) {
	          pc.transceivers[sdpMLineIndex].rtpSender.setTransport(
	              pc.transceivers[0].dtlsTransport);
	        }
	        if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
	          pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(
	              pc.transceivers[0].dtlsTransport);
	        }
	      }
	      if (description.type === 'offer' && !rejected) {
	        transceiver = pc.transceivers[sdpMLineIndex] ||
	            pc._createTransceiver(kind);
	        transceiver.mid = mid;

	        if (!transceiver.iceGatherer) {
	          transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
	              usingBundle);
	        }

	        if (cands.length && transceiver.iceTransport.state === 'new') {
	          if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
	            transceiver.iceTransport.setRemoteCandidates(cands);
	          } else {
	            cands.forEach(function(candidate) {
	              maybeAddCandidate(transceiver.iceTransport, candidate);
	            });
	          }
	        }

	        localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);

	        // filter RTX until additional stuff needed for RTX is implemented
	        // in adapter.js
	        if (edgeVersion < 15019) {
	          localCapabilities.codecs = localCapabilities.codecs.filter(
	              function(codec) {
	                return codec.name !== 'rtx';
	              });
	        }

	        sendEncodingParameters = transceiver.sendEncodingParameters || [{
	          ssrc: (2 * sdpMLineIndex + 2) * 1001
	        }];

	        // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
	        var isNewTrack = false;
	        if (direction === 'sendrecv' || direction === 'sendonly') {
	          isNewTrack = !transceiver.rtpReceiver;
	          rtpReceiver = transceiver.rtpReceiver ||
	              new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);

	          if (isNewTrack) {
	            var stream;
	            track = rtpReceiver.track;
	            // FIXME: does not work with Plan B.
	            if (remoteMsid && remoteMsid.stream === '-') ; else if (remoteMsid) {
	              if (!streams[remoteMsid.stream]) {
	                streams[remoteMsid.stream] = new window.MediaStream();
	                Object.defineProperty(streams[remoteMsid.stream], 'id', {
	                  get: function() {
	                    return remoteMsid.stream;
	                  }
	                });
	              }
	              Object.defineProperty(track, 'id', {
	                get: function() {
	                  return remoteMsid.track;
	                }
	              });
	              stream = streams[remoteMsid.stream];
	            } else {
	              if (!streams.default) {
	                streams.default = new window.MediaStream();
	              }
	              stream = streams.default;
	            }
	            if (stream) {
	              addTrackToStreamAndFireEvent(track, stream);
	              transceiver.associatedRemoteMediaStreams.push(stream);
	            }
	            receiverList.push([track, rtpReceiver, stream]);
	          }
	        } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
	          transceiver.associatedRemoteMediaStreams.forEach(function(s) {
	            var nativeTrack = s.getTracks().find(function(t) {
	              return t.id === transceiver.rtpReceiver.track.id;
	            });
	            if (nativeTrack) {
	              removeTrackFromStreamAndFireEvent(nativeTrack, s);
	            }
	          });
	          transceiver.associatedRemoteMediaStreams = [];
	        }

	        transceiver.localCapabilities = localCapabilities;
	        transceiver.remoteCapabilities = remoteCapabilities;
	        transceiver.rtpReceiver = rtpReceiver;
	        transceiver.rtcpParameters = rtcpParameters;
	        transceiver.sendEncodingParameters = sendEncodingParameters;
	        transceiver.recvEncodingParameters = recvEncodingParameters;

	        // Start the RTCRtpReceiver now. The RTPSender is started in
	        // setLocalDescription.
	        pc._transceive(pc.transceivers[sdpMLineIndex],
	            false,
	            isNewTrack);
	      } else if (description.type === 'answer' && !rejected) {
	        transceiver = pc.transceivers[sdpMLineIndex];
	        iceGatherer = transceiver.iceGatherer;
	        iceTransport = transceiver.iceTransport;
	        dtlsTransport = transceiver.dtlsTransport;
	        rtpReceiver = transceiver.rtpReceiver;
	        sendEncodingParameters = transceiver.sendEncodingParameters;
	        localCapabilities = transceiver.localCapabilities;

	        pc.transceivers[sdpMLineIndex].recvEncodingParameters =
	            recvEncodingParameters;
	        pc.transceivers[sdpMLineIndex].remoteCapabilities =
	            remoteCapabilities;
	        pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;

	        if (cands.length && iceTransport.state === 'new') {
	          if ((isIceLite || isComplete) &&
	              (!usingBundle || sdpMLineIndex === 0)) {
	            iceTransport.setRemoteCandidates(cands);
	          } else {
	            cands.forEach(function(candidate) {
	              maybeAddCandidate(transceiver.iceTransport, candidate);
	            });
	          }
	        }

	        if (!usingBundle || sdpMLineIndex === 0) {
	          if (iceTransport.state === 'new') {
	            iceTransport.start(iceGatherer, remoteIceParameters,
	                'controlling');
	          }
	          if (dtlsTransport.state === 'new') {
	            dtlsTransport.start(remoteDtlsParameters);
	          }
	        }

	        // If the offer contained RTX but the answer did not,
	        // remove RTX from sendEncodingParameters.
	        var commonCapabilities = getCommonCapabilities(
	          transceiver.localCapabilities,
	          transceiver.remoteCapabilities);

	        var hasRtx = commonCapabilities.codecs.filter(function(c) {
	          return c.name.toLowerCase() === 'rtx';
	        }).length;
	        if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
	          delete transceiver.sendEncodingParameters[0].rtx;
	        }

	        pc._transceive(transceiver,
	            direction === 'sendrecv' || direction === 'recvonly',
	            direction === 'sendrecv' || direction === 'sendonly');

	        // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
	        if (rtpReceiver &&
	            (direction === 'sendrecv' || direction === 'sendonly')) {
	          track = rtpReceiver.track;
	          if (remoteMsid) {
	            if (!streams[remoteMsid.stream]) {
	              streams[remoteMsid.stream] = new window.MediaStream();
	            }
	            addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
	            receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
	          } else {
	            if (!streams.default) {
	              streams.default = new window.MediaStream();
	            }
	            addTrackToStreamAndFireEvent(track, streams.default);
	            receiverList.push([track, rtpReceiver, streams.default]);
	          }
	        } else {
	          // FIXME: actually the receiver should be created later.
	          delete transceiver.rtpReceiver;
	        }
	      }
	    });

	    if (pc._dtlsRole === undefined) {
	      pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
	    }

	    pc._remoteDescription = {
	      type: description.type,
	      sdp: description.sdp
	    };
	    if (description.type === 'offer') {
	      pc._updateSignalingState('have-remote-offer');
	    } else {
	      pc._updateSignalingState('stable');
	    }
	    Object.keys(streams).forEach(function(sid) {
	      var stream = streams[sid];
	      if (stream.getTracks().length) {
	        if (pc.remoteStreams.indexOf(stream) === -1) {
	          pc.remoteStreams.push(stream);
	          var event = new Event('addstream');
	          event.stream = stream;
	          window.setTimeout(function() {
	            pc._dispatchEvent('addstream', event);
	          });
	        }

	        receiverList.forEach(function(item) {
	          var track = item[0];
	          var receiver = item[1];
	          if (stream.id !== item[2].id) {
	            return;
	          }
	          fireAddTrack(pc, track, receiver, [stream]);
	        });
	      }
	    });
	    receiverList.forEach(function(item) {
	      if (item[2]) {
	        return;
	      }
	      fireAddTrack(pc, item[0], item[1], []);
	    });

	    // check whether addIceCandidate({}) was called within four seconds after
	    // setRemoteDescription.
	    window.setTimeout(function() {
	      if (!(pc && pc.transceivers)) {
	        return;
	      }
	      pc.transceivers.forEach(function(transceiver) {
	        if (transceiver.iceTransport &&
	            transceiver.iceTransport.state === 'new' &&
	            transceiver.iceTransport.getRemoteCandidates().length > 0) {
	          console.warn('Timeout for addRemoteCandidate. Consider sending ' +
	              'an end-of-candidates notification');
	          transceiver.iceTransport.addRemoteCandidate({});
	        }
	      });
	    }, 4000);

	    return Promise.resolve();
	  };

	  RTCPeerConnection.prototype.close = function() {
	    this.transceivers.forEach(function(transceiver) {
	      /* not yet
	      if (transceiver.iceGatherer) {
	        transceiver.iceGatherer.close();
	      }
	      */
	      if (transceiver.iceTransport) {
	        transceiver.iceTransport.stop();
	      }
	      if (transceiver.dtlsTransport) {
	        transceiver.dtlsTransport.stop();
	      }
	      if (transceiver.rtpSender) {
	        transceiver.rtpSender.stop();
	      }
	      if (transceiver.rtpReceiver) {
	        transceiver.rtpReceiver.stop();
	      }
	    });
	    // FIXME: clean up tracks, local streams, remote streams, etc
	    this._isClosed = true;
	    this._updateSignalingState('closed');
	  };

	  // Update the signaling state.
	  RTCPeerConnection.prototype._updateSignalingState = function(newState) {
	    this.signalingState = newState;
	    var event = new Event('signalingstatechange');
	    this._dispatchEvent('signalingstatechange', event);
	  };

	  // Determine whether to fire the negotiationneeded event.
	  RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
	    var pc = this;
	    if (this.signalingState !== 'stable' || this.needNegotiation === true) {
	      return;
	    }
	    this.needNegotiation = true;
	    window.setTimeout(function() {
	      if (pc.needNegotiation) {
	        pc.needNegotiation = false;
	        var event = new Event('negotiationneeded');
	        pc._dispatchEvent('negotiationneeded', event);
	      }
	    }, 0);
	  };

	  // Update the ice connection state.
	  RTCPeerConnection.prototype._updateIceConnectionState = function() {
	    var newState;
	    var states = {
	      'new': 0,
	      closed: 0,
	      checking: 0,
	      connected: 0,
	      completed: 0,
	      disconnected: 0,
	      failed: 0
	    };
	    this.transceivers.forEach(function(transceiver) {
	      states[transceiver.iceTransport.state]++;
	    });

	    newState = 'new';
	    if (states.failed > 0) {
	      newState = 'failed';
	    } else if (states.checking > 0) {
	      newState = 'checking';
	    } else if (states.disconnected > 0) {
	      newState = 'disconnected';
	    } else if (states.new > 0) {
	      newState = 'new';
	    } else if (states.connected > 0) {
	      newState = 'connected';
	    } else if (states.completed > 0) {
	      newState = 'completed';
	    }

	    if (newState !== this.iceConnectionState) {
	      this.iceConnectionState = newState;
	      var event = new Event('iceconnectionstatechange');
	      this._dispatchEvent('iceconnectionstatechange', event);
	    }
	  };

	  // Update the connection state.
	  RTCPeerConnection.prototype._updateConnectionState = function() {
	    var newState;
	    var states = {
	      'new': 0,
	      closed: 0,
	      connecting: 0,
	      connected: 0,
	      completed: 0,
	      disconnected: 0,
	      failed: 0
	    };
	    this.transceivers.forEach(function(transceiver) {
	      states[transceiver.iceTransport.state]++;
	      states[transceiver.dtlsTransport.state]++;
	    });
	    // ICETransport.completed and connected are the same for this purpose.
	    states.connected += states.completed;

	    newState = 'new';
	    if (states.failed > 0) {
	      newState = 'failed';
	    } else if (states.connecting > 0) {
	      newState = 'connecting';
	    } else if (states.disconnected > 0) {
	      newState = 'disconnected';
	    } else if (states.new > 0) {
	      newState = 'new';
	    } else if (states.connected > 0) {
	      newState = 'connected';
	    }

	    if (newState !== this.connectionState) {
	      this.connectionState = newState;
	      var event = new Event('connectionstatechange');
	      this._dispatchEvent('connectionstatechange', event);
	    }
	  };

	  RTCPeerConnection.prototype.createOffer = function() {
	    var pc = this;

	    if (pc._isClosed) {
	      return Promise.reject(makeError('InvalidStateError',
	          'Can not call createOffer after close'));
	    }

	    var numAudioTracks = pc.transceivers.filter(function(t) {
	      return t.kind === 'audio';
	    }).length;
	    var numVideoTracks = pc.transceivers.filter(function(t) {
	      return t.kind === 'video';
	    }).length;

	    // Determine number of audio and video tracks we need to send/recv.
	    var offerOptions = arguments[0];
	    if (offerOptions) {
	      // Reject Chrome legacy constraints.
	      if (offerOptions.mandatory || offerOptions.optional) {
	        throw new TypeError(
	            'Legacy mandatory/optional constraints not supported.');
	      }
	      if (offerOptions.offerToReceiveAudio !== undefined) {
	        if (offerOptions.offerToReceiveAudio === true) {
	          numAudioTracks = 1;
	        } else if (offerOptions.offerToReceiveAudio === false) {
	          numAudioTracks = 0;
	        } else {
	          numAudioTracks = offerOptions.offerToReceiveAudio;
	        }
	      }
	      if (offerOptions.offerToReceiveVideo !== undefined) {
	        if (offerOptions.offerToReceiveVideo === true) {
	          numVideoTracks = 1;
	        } else if (offerOptions.offerToReceiveVideo === false) {
	          numVideoTracks = 0;
	        } else {
	          numVideoTracks = offerOptions.offerToReceiveVideo;
	        }
	      }
	    }

	    pc.transceivers.forEach(function(transceiver) {
	      if (transceiver.kind === 'audio') {
	        numAudioTracks--;
	        if (numAudioTracks < 0) {
	          transceiver.wantReceive = false;
	        }
	      } else if (transceiver.kind === 'video') {
	        numVideoTracks--;
	        if (numVideoTracks < 0) {
	          transceiver.wantReceive = false;
	        }
	      }
	    });

	    // Create M-lines for recvonly streams.
	    while (numAudioTracks > 0 || numVideoTracks > 0) {
	      if (numAudioTracks > 0) {
	        pc._createTransceiver('audio');
	        numAudioTracks--;
	      }
	      if (numVideoTracks > 0) {
	        pc._createTransceiver('video');
	        numVideoTracks--;
	      }
	    }

	    var sdp$$1 = sdp.writeSessionBoilerplate(pc._sdpSessionId,
	        pc._sdpSessionVersion++);
	    pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
	      // For each track, create an ice gatherer, ice transport,
	      // dtls transport, potentially rtpsender and rtpreceiver.
	      var track = transceiver.track;
	      var kind = transceiver.kind;
	      var mid = transceiver.mid || sdp.generateIdentifier();
	      transceiver.mid = mid;

	      if (!transceiver.iceGatherer) {
	        transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
	            pc.usingBundle);
	      }

	      var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
	      // filter RTX until additional stuff needed for RTX is implemented
	      // in adapter.js
	      if (edgeVersion < 15019) {
	        localCapabilities.codecs = localCapabilities.codecs.filter(
	            function(codec) {
	              return codec.name !== 'rtx';
	            });
	      }
	      localCapabilities.codecs.forEach(function(codec) {
	        // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
	        // by adding level-asymmetry-allowed=1
	        if (codec.name === 'H264' &&
	            codec.parameters['level-asymmetry-allowed'] === undefined) {
	          codec.parameters['level-asymmetry-allowed'] = '1';
	        }

	        // for subsequent offers, we might have to re-use the payload
	        // type of the last offer.
	        if (transceiver.remoteCapabilities &&
	            transceiver.remoteCapabilities.codecs) {
	          transceiver.remoteCapabilities.codecs.forEach(function(remoteCodec) {
	            if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() &&
	                codec.clockRate === remoteCodec.clockRate) {
	              codec.preferredPayloadType = remoteCodec.payloadType;
	            }
	          });
	        }
	      });
	      localCapabilities.headerExtensions.forEach(function(hdrExt) {
	        var remoteExtensions = transceiver.remoteCapabilities &&
	            transceiver.remoteCapabilities.headerExtensions || [];
	        remoteExtensions.forEach(function(rHdrExt) {
	          if (hdrExt.uri === rHdrExt.uri) {
	            hdrExt.id = rHdrExt.id;
	          }
	        });
	      });

	      // generate an ssrc now, to be used later in rtpSender.send
	      var sendEncodingParameters = transceiver.sendEncodingParameters || [{
	        ssrc: (2 * sdpMLineIndex + 1) * 1001
	      }];
	      if (track) {
	        // add RTX
	        if (edgeVersion >= 15019 && kind === 'video' &&
	            !sendEncodingParameters[0].rtx) {
	          sendEncodingParameters[0].rtx = {
	            ssrc: sendEncodingParameters[0].ssrc + 1
	          };
	        }
	      }

	      if (transceiver.wantReceive) {
	        transceiver.rtpReceiver = new window.RTCRtpReceiver(
	            transceiver.dtlsTransport, kind);
	      }

	      transceiver.localCapabilities = localCapabilities;
	      transceiver.sendEncodingParameters = sendEncodingParameters;
	    });

	    // always offer BUNDLE and dispose on return if not supported.
	    if (pc._config.bundlePolicy !== 'max-compat') {
	      sdp$$1 += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
	        return t.mid;
	      }).join(' ') + '\r\n';
	    }
	    sdp$$1 += 'a=ice-options:trickle\r\n';

	    pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
	      sdp$$1 += writeMediaSection(transceiver, transceiver.localCapabilities,
	          'offer', transceiver.stream, pc._dtlsRole);
	      sdp$$1 += 'a=rtcp-rsize\r\n';

	      if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' &&
	          (sdpMLineIndex === 0 || !pc.usingBundle)) {
	        transceiver.iceGatherer.getLocalCandidates().forEach(function(cand) {
	          cand.component = 1;
	          sdp$$1 += 'a=' + sdp.writeCandidate(cand) + '\r\n';
	        });

	        if (transceiver.iceGatherer.state === 'completed') {
	          sdp$$1 += 'a=end-of-candidates\r\n';
	        }
	      }
	    });

	    var desc = new window.RTCSessionDescription({
	      type: 'offer',
	      sdp: sdp$$1
	    });
	    return Promise.resolve(desc);
	  };

	  RTCPeerConnection.prototype.createAnswer = function() {
	    var pc = this;

	    if (pc._isClosed) {
	      return Promise.reject(makeError('InvalidStateError',
	          'Can not call createAnswer after close'));
	    }

	    if (!(pc.signalingState === 'have-remote-offer' ||
	        pc.signalingState === 'have-local-pranswer')) {
	      return Promise.reject(makeError('InvalidStateError',
	          'Can not call createAnswer in signalingState ' + pc.signalingState));
	    }

	    var sdp$$1 = sdp.writeSessionBoilerplate(pc._sdpSessionId,
	        pc._sdpSessionVersion++);
	    if (pc.usingBundle) {
	      sdp$$1 += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
	        return t.mid;
	      }).join(' ') + '\r\n';
	    }
	    sdp$$1 += 'a=ice-options:trickle\r\n';

	    var mediaSectionsInOffer = sdp.getMediaSections(
	        pc._remoteDescription.sdp).length;
	    pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
	      if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
	        return;
	      }
	      if (transceiver.rejected) {
	        if (transceiver.kind === 'application') {
	          if (transceiver.protocol === 'DTLS/SCTP') { // legacy fmt
	            sdp$$1 += 'm=application 0 DTLS/SCTP 5000\r\n';
	          } else {
	            sdp$$1 += 'm=application 0 ' + transceiver.protocol +
	                ' webrtc-datachannel\r\n';
	          }
	        } else if (transceiver.kind === 'audio') {
	          sdp$$1 += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\n' +
	              'a=rtpmap:0 PCMU/8000\r\n';
	        } else if (transceiver.kind === 'video') {
	          sdp$$1 += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\n' +
	              'a=rtpmap:120 VP8/90000\r\n';
	        }
	        sdp$$1 += 'c=IN IP4 0.0.0.0\r\n' +
	            'a=inactive\r\n' +
	            'a=mid:' + transceiver.mid + '\r\n';
	        return;
	      }

	      // FIXME: look at direction.
	      if (transceiver.stream) {
	        var localTrack;
	        if (transceiver.kind === 'audio') {
	          localTrack = transceiver.stream.getAudioTracks()[0];
	        } else if (transceiver.kind === 'video') {
	          localTrack = transceiver.stream.getVideoTracks()[0];
	        }
	        if (localTrack) {
	          // add RTX
	          if (edgeVersion >= 15019 && transceiver.kind === 'video' &&
	              !transceiver.sendEncodingParameters[0].rtx) {
	            transceiver.sendEncodingParameters[0].rtx = {
	              ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
	            };
	          }
	        }
	      }

	      // Calculate intersection of capabilities.
	      var commonCapabilities = getCommonCapabilities(
	          transceiver.localCapabilities,
	          transceiver.remoteCapabilities);

	      var hasRtx = commonCapabilities.codecs.filter(function(c) {
	        return c.name.toLowerCase() === 'rtx';
	      }).length;
	      if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
	        delete transceiver.sendEncodingParameters[0].rtx;
	      }

	      sdp$$1 += writeMediaSection(transceiver, commonCapabilities,
	          'answer', transceiver.stream, pc._dtlsRole);
	      if (transceiver.rtcpParameters &&
	          transceiver.rtcpParameters.reducedSize) {
	        sdp$$1 += 'a=rtcp-rsize\r\n';
	      }
	    });

	    var desc = new window.RTCSessionDescription({
	      type: 'answer',
	      sdp: sdp$$1
	    });
	    return Promise.resolve(desc);
	  };

	  RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
	    var pc = this;
	    var sections;
	    if (candidate && !(candidate.sdpMLineIndex !== undefined ||
	        candidate.sdpMid)) {
	      return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
	    }

	    // TODO: needs to go into ops queue.
	    return new Promise(function(resolve, reject) {
	      if (!pc._remoteDescription) {
	        return reject(makeError('InvalidStateError',
	            'Can not add ICE candidate without a remote description'));
	      } else if (!candidate || candidate.candidate === '') {
	        for (var j = 0; j < pc.transceivers.length; j++) {
	          if (pc.transceivers[j].rejected) {
	            continue;
	          }
	          pc.transceivers[j].iceTransport.addRemoteCandidate({});
	          sections = sdp.getMediaSections(pc._remoteDescription.sdp);
	          sections[j] += 'a=end-of-candidates\r\n';
	          pc._remoteDescription.sdp =
	              sdp.getDescription(pc._remoteDescription.sdp) +
	              sections.join('');
	          if (pc.usingBundle) {
	            break;
	          }
	        }
	      } else {
	        var sdpMLineIndex = candidate.sdpMLineIndex;
	        if (candidate.sdpMid) {
	          for (var i = 0; i < pc.transceivers.length; i++) {
	            if (pc.transceivers[i].mid === candidate.sdpMid) {
	              sdpMLineIndex = i;
	              break;
	            }
	          }
	        }
	        var transceiver = pc.transceivers[sdpMLineIndex];
	        if (transceiver) {
	          if (transceiver.rejected) {
	            return resolve();
	          }
	          var cand = Object.keys(candidate.candidate).length > 0 ?
	              sdp.parseCandidate(candidate.candidate) : {};
	          // Ignore Chrome's invalid candidates since Edge does not like them.
	          if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
	            return resolve();
	          }
	          // Ignore RTCP candidates, we assume RTCP-MUX.
	          if (cand.component && cand.component !== 1) {
	            return resolve();
	          }
	          // when using bundle, avoid adding candidates to the wrong
	          // ice transport. And avoid adding candidates added in the SDP.
	          if (sdpMLineIndex === 0 || (sdpMLineIndex > 0 &&
	              transceiver.iceTransport !== pc.transceivers[0].iceTransport)) {
	            if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
	              return reject(makeError('OperationError',
	                  'Can not add ICE candidate'));
	            }
	          }

	          // update the remoteDescription.
	          var candidateString = candidate.candidate.trim();
	          if (candidateString.indexOf('a=') === 0) {
	            candidateString = candidateString.substr(2);
	          }
	          sections = sdp.getMediaSections(pc._remoteDescription.sdp);
	          sections[sdpMLineIndex] += 'a=' +
	              (cand.type ? candidateString : 'end-of-candidates')
	              + '\r\n';
	          pc._remoteDescription.sdp =
	              sdp.getDescription(pc._remoteDescription.sdp) +
	              sections.join('');
	        } else {
	          return reject(makeError('OperationError',
	              'Can not add ICE candidate'));
	        }
	      }
	      resolve();
	    });
	  };

	  RTCPeerConnection.prototype.getStats = function(selector) {
	    if (selector && selector instanceof window.MediaStreamTrack) {
	      var senderOrReceiver = null;
	      this.transceivers.forEach(function(transceiver) {
	        if (transceiver.rtpSender &&
	            transceiver.rtpSender.track === selector) {
	          senderOrReceiver = transceiver.rtpSender;
	        } else if (transceiver.rtpReceiver &&
	            transceiver.rtpReceiver.track === selector) {
	          senderOrReceiver = transceiver.rtpReceiver;
	        }
	      });
	      if (!senderOrReceiver) {
	        throw makeError('InvalidAccessError', 'Invalid selector.');
	      }
	      return senderOrReceiver.getStats();
	    }

	    var promises = [];
	    this.transceivers.forEach(function(transceiver) {
	      ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport',
	          'dtlsTransport'].forEach(function(method) {
	            if (transceiver[method]) {
	              promises.push(transceiver[method].getStats());
	            }
	          });
	    });
	    return Promise.all(promises).then(function(allStats) {
	      var results = new Map();
	      allStats.forEach(function(stats) {
	        stats.forEach(function(stat) {
	          results.set(stat.id, stat);
	        });
	      });
	      return results;
	    });
	  };

	  // fix low-level stat names and return Map instead of object.
	  var ortcObjects = ['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer',
	    'RTCIceTransport', 'RTCDtlsTransport'];
	  ortcObjects.forEach(function(ortcObjectName) {
	    var obj = window[ortcObjectName];
	    if (obj && obj.prototype && obj.prototype.getStats) {
	      var nativeGetstats = obj.prototype.getStats;
	      obj.prototype.getStats = function() {
	        return nativeGetstats.apply(this)
	        .then(function(nativeStats) {
	          var mapStats = new Map();
	          Object.keys(nativeStats).forEach(function(id) {
	            nativeStats[id].type = fixStatsType(nativeStats[id]);
	            mapStats.set(id, nativeStats[id]);
	          });
	          return mapStats;
	        });
	      };
	    }
	  });

	  // legacy callback shims. Should be moved to adapter.js some days.
	  var methods = ['createOffer', 'createAnswer'];
	  methods.forEach(function(method) {
	    var nativeMethod = RTCPeerConnection.prototype[method];
	    RTCPeerConnection.prototype[method] = function() {
	      var args = arguments;
	      if (typeof args[0] === 'function' ||
	          typeof args[1] === 'function') { // legacy
	        return nativeMethod.apply(this, [arguments[2]])
	        .then(function(description) {
	          if (typeof args[0] === 'function') {
	            args[0].apply(null, [description]);
	          }
	        }, function(error) {
	          if (typeof args[1] === 'function') {
	            args[1].apply(null, [error]);
	          }
	        });
	      }
	      return nativeMethod.apply(this, arguments);
	    };
	  });

	  methods = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'];
	  methods.forEach(function(method) {
	    var nativeMethod = RTCPeerConnection.prototype[method];
	    RTCPeerConnection.prototype[method] = function() {
	      var args = arguments;
	      if (typeof args[1] === 'function' ||
	          typeof args[2] === 'function') { // legacy
	        return nativeMethod.apply(this, arguments)
	        .then(function() {
	          if (typeof args[1] === 'function') {
	            args[1].apply(null);
	          }
	        }, function(error) {
	          if (typeof args[2] === 'function') {
	            args[2].apply(null, [error]);
	          }
	        });
	      }
	      return nativeMethod.apply(this, arguments);
	    };
	  });

	  // getStats is special. It doesn't have a spec legacy method yet we support
	  // getStats(something, cb) without error callbacks.
	  ['getStats'].forEach(function(method) {
	    var nativeMethod = RTCPeerConnection.prototype[method];
	    RTCPeerConnection.prototype[method] = function() {
	      var args = arguments;
	      if (typeof args[1] === 'function') {
	        return nativeMethod.apply(this, arguments)
	        .then(function() {
	          if (typeof args[1] === 'function') {
	            args[1].apply(null);
	          }
	        });
	      }
	      return nativeMethod.apply(this, arguments);
	    };
	  });

	  return RTCPeerConnection;
	};

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */

	// Expose public methods.
	var getusermedia$1 = function(window) {
	  var navigator = window && window.navigator;

	  var shimError_ = function(e) {
	    return {
	      name: {PermissionDeniedError: 'NotAllowedError'}[e.name] || e.name,
	      message: e.message,
	      constraint: e.constraint,
	      toString: function() {
	        return this.name;
	      }
	    };
	  };

	  // getUserMedia error shim.
	  var origGetUserMedia = navigator.mediaDevices.getUserMedia.
	      bind(navigator.mediaDevices);
	  navigator.mediaDevices.getUserMedia = function(c) {
	    return origGetUserMedia(c).catch(function(e) {
	      return Promise.reject(shimError_(e));
	    });
	  };
	};

	var edge_shim = {
	  shimGetUserMedia: getusermedia$1,
	  shimPeerConnection: function(window) {
	    var browserDetails = utils.detectBrowser(window);

	    if (window.RTCIceGatherer) {
	      if (!window.RTCIceCandidate) {
	        window.RTCIceCandidate = function(args) {
	          return args;
	        };
	      }
	      if (!window.RTCSessionDescription) {
	        window.RTCSessionDescription = function(args) {
	          return args;
	        };
	      }
	      // this adds an additional event listener to MediaStrackTrack that signals
	      // when a tracks enabled property was changed. Workaround for a bug in
	      // addStream, see below. No longer required in 15025+
	      if (browserDetails.version < 15025) {
	        var origMSTEnabled = Object.getOwnPropertyDescriptor(
	            window.MediaStreamTrack.prototype, 'enabled');
	        Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
	          set: function(value) {
	            origMSTEnabled.set.call(this, value);
	            var ev = new Event('enabled');
	            ev.enabled = value;
	            this.dispatchEvent(ev);
	          }
	        });
	      }
	    }

	    // ORTC defines the DTMF sender a bit different.
	    // https://github.com/w3c/ortc/issues/714
	    if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
	      Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
	        get: function() {
	          if (this._dtmf === undefined) {
	            if (this.track.kind === 'audio') {
	              this._dtmf = new window.RTCDtmfSender(this);
	            } else if (this.track.kind === 'video') {
	              this._dtmf = null;
	            }
	          }
	          return this._dtmf;
	        }
	      });
	    }
	    // Edge currently only implements the RTCDtmfSender, not the
	    // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
	    if (window.RTCDtmfSender && !window.RTCDTMFSender) {
	      window.RTCDTMFSender = window.RTCDtmfSender;
	    }

	    var RTCPeerConnectionShim = rtcpeerconnection(window,
	        browserDetails.version);
	    window.RTCPeerConnection = function(config) {
	      if (config && config.iceServers) {
	        config.iceServers = filtericeservers(config.iceServers);
	      }
	      return new RTCPeerConnectionShim(config);
	    };
	    window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
	  },
	  shimReplaceTrack: function(window) {
	    // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
	    if (window.RTCRtpSender &&
	        !('replaceTrack' in window.RTCRtpSender.prototype)) {
	      window.RTCRtpSender.prototype.replaceTrack =
	          window.RTCRtpSender.prototype.setTrack;
	    }
	  }
	};

	var logging$2 = utils.log;

	// Expose public methods.
	var getusermedia$2 = function(window) {
	  var browserDetails = utils.detectBrowser(window);
	  var navigator = window && window.navigator;
	  var MediaStreamTrack = window && window.MediaStreamTrack;

	  var shimError_ = function(e) {
	    return {
	      name: {
	        InternalError: 'NotReadableError',
	        NotSupportedError: 'TypeError',
	        PermissionDeniedError: 'NotAllowedError',
	        SecurityError: 'NotAllowedError'
	      }[e.name] || e.name,
	      message: {
	        'The operation is insecure.': 'The request is not allowed by the ' +
	        'user agent or the platform in the current context.'
	      }[e.message] || e.message,
	      constraint: e.constraint,
	      toString: function() {
	        return this.name + (this.message && ': ') + this.message;
	      }
	    };
	  };

	  // getUserMedia constraints shim.
	  var getUserMedia_ = function(constraints, onSuccess, onError) {
	    var constraintsToFF37_ = function(c) {
	      if (typeof c !== 'object' || c.require) {
	        return c;
	      }
	      var require = [];
	      Object.keys(c).forEach(function(key) {
	        if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
	          return;
	        }
	        var r = c[key] = (typeof c[key] === 'object') ?
	            c[key] : {ideal: c[key]};
	        if (r.min !== undefined ||
	            r.max !== undefined || r.exact !== undefined) {
	          require.push(key);
	        }
	        if (r.exact !== undefined) {
	          if (typeof r.exact === 'number') {
	            r. min = r.max = r.exact;
	          } else {
	            c[key] = r.exact;
	          }
	          delete r.exact;
	        }
	        if (r.ideal !== undefined) {
	          c.advanced = c.advanced || [];
	          var oc = {};
	          if (typeof r.ideal === 'number') {
	            oc[key] = {min: r.ideal, max: r.ideal};
	          } else {
	            oc[key] = r.ideal;
	          }
	          c.advanced.push(oc);
	          delete r.ideal;
	          if (!Object.keys(r).length) {
	            delete c[key];
	          }
	        }
	      });
	      if (require.length) {
	        c.require = require;
	      }
	      return c;
	    };
	    constraints = JSON.parse(JSON.stringify(constraints));
	    if (browserDetails.version < 38) {
	      logging$2('spec: ' + JSON.stringify(constraints));
	      if (constraints.audio) {
	        constraints.audio = constraintsToFF37_(constraints.audio);
	      }
	      if (constraints.video) {
	        constraints.video = constraintsToFF37_(constraints.video);
	      }
	      logging$2('ff37: ' + JSON.stringify(constraints));
	    }
	    return navigator.mozGetUserMedia(constraints, onSuccess, function(e) {
	      onError(shimError_(e));
	    });
	  };

	  // Returns the result of getUserMedia as a Promise.
	  var getUserMediaPromise_ = function(constraints) {
	    return new Promise(function(resolve, reject) {
	      getUserMedia_(constraints, resolve, reject);
	    });
	  };

	  // Shim for mediaDevices on older versions.
	  if (!navigator.mediaDevices) {
	    navigator.mediaDevices = {getUserMedia: getUserMediaPromise_,
	      addEventListener: function() { },
	      removeEventListener: function() { }
	    };
	  }
	  navigator.mediaDevices.enumerateDevices =
	      navigator.mediaDevices.enumerateDevices || function() {
	        return new Promise(function(resolve) {
	          var infos = [
	            {kind: 'audioinput', deviceId: 'default', label: '', groupId: ''},
	            {kind: 'videoinput', deviceId: 'default', label: '', groupId: ''}
	          ];
	          resolve(infos);
	        });
	      };

	  if (browserDetails.version < 41) {
	    // Work around http://bugzil.la/1169665
	    var orgEnumerateDevices =
	        navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
	    navigator.mediaDevices.enumerateDevices = function() {
	      return orgEnumerateDevices().then(undefined, function(e) {
	        if (e.name === 'NotFoundError') {
	          return [];
	        }
	        throw e;
	      });
	    };
	  }
	  if (browserDetails.version < 49) {
	    var origGetUserMedia = navigator.mediaDevices.getUserMedia.
	        bind(navigator.mediaDevices);
	    navigator.mediaDevices.getUserMedia = function(c) {
	      return origGetUserMedia(c).then(function(stream) {
	        // Work around https://bugzil.la/802326
	        if (c.audio && !stream.getAudioTracks().length ||
	            c.video && !stream.getVideoTracks().length) {
	          stream.getTracks().forEach(function(track) {
	            track.stop();
	          });
	          throw new DOMException('The object can not be found here.',
	                                 'NotFoundError');
	        }
	        return stream;
	      }, function(e) {
	        return Promise.reject(shimError_(e));
	      });
	    };
	  }
	  if (!(browserDetails.version > 55 &&
	      'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
	    var remap = function(obj, a, b) {
	      if (a in obj && !(b in obj)) {
	        obj[b] = obj[a];
	        delete obj[a];
	      }
	    };

	    var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.
	        bind(navigator.mediaDevices);
	    navigator.mediaDevices.getUserMedia = function(c) {
	      if (typeof c === 'object' && typeof c.audio === 'object') {
	        c = JSON.parse(JSON.stringify(c));
	        remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
	        remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
	      }
	      return nativeGetUserMedia(c);
	    };

	    if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
	      var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
	      MediaStreamTrack.prototype.getSettings = function() {
	        var obj = nativeGetSettings.apply(this, arguments);
	        remap(obj, 'mozAutoGainControl', 'autoGainControl');
	        remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
	        return obj;
	      };
	    }

	    if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
	      var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
	      MediaStreamTrack.prototype.applyConstraints = function(c) {
	        if (this.kind === 'audio' && typeof c === 'object') {
	          c = JSON.parse(JSON.stringify(c));
	          remap(c, 'autoGainControl', 'mozAutoGainControl');
	          remap(c, 'noiseSuppression', 'mozNoiseSuppression');
	        }
	        return nativeApplyConstraints.apply(this, [c]);
	      };
	    }
	  }
	  navigator.getUserMedia = function(constraints, onSuccess, onError) {
	    if (browserDetails.version < 44) {
	      return getUserMedia_(constraints, onSuccess, onError);
	    }
	    // Replace Firefox 44+'s deprecation warning with unprefixed version.
	    utils.deprecated('navigator.getUserMedia',
	        'navigator.mediaDevices.getUserMedia');
	    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
	  };
	};

	var firefox_shim = {
	  shimGetUserMedia: getusermedia$2,
	  shimOnTrack: function(window) {
	    if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in
	        window.RTCPeerConnection.prototype)) {
	      Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
	        get: function() {
	          return this._ontrack;
	        },
	        set: function(f) {
	          if (this._ontrack) {
	            this.removeEventListener('track', this._ontrack);
	            this.removeEventListener('addstream', this._ontrackpoly);
	          }
	          this.addEventListener('track', this._ontrack = f);
	          this.addEventListener('addstream', this._ontrackpoly = function(e) {
	            e.stream.getTracks().forEach(function(track) {
	              var event = new Event('track');
	              event.track = track;
	              event.receiver = {track: track};
	              event.transceiver = {receiver: event.receiver};
	              event.streams = [e.stream];
	              this.dispatchEvent(event);
	            }.bind(this));
	          }.bind(this));
	        },
	        enumerable: true,
	        configurable: true
	      });
	    }
	    if (typeof window === 'object' && window.RTCTrackEvent &&
	        ('receiver' in window.RTCTrackEvent.prototype) &&
	        !('transceiver' in window.RTCTrackEvent.prototype)) {
	      Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
	        get: function() {
	          return {receiver: this.receiver};
	        }
	      });
	    }
	  },

	  shimSourceObject: function(window) {
	    // Firefox has supported mozSrcObject since FF22, unprefixed in 42.
	    if (typeof window === 'object') {
	      if (window.HTMLMediaElement &&
	        !('srcObject' in window.HTMLMediaElement.prototype)) {
	        // Shim the srcObject property, once, when HTMLMediaElement is found.
	        Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
	          get: function() {
	            return this.mozSrcObject;
	          },
	          set: function(stream) {
	            this.mozSrcObject = stream;
	          }
	        });
	      }
	    }
	  },

	  shimPeerConnection: function(window) {
	    var browserDetails = utils.detectBrowser(window);

	    if (typeof window !== 'object' || !(window.RTCPeerConnection ||
	        window.mozRTCPeerConnection)) {
	      return; // probably media.peerconnection.enabled=false in about:config
	    }
	    // The RTCPeerConnection object.
	    if (!window.RTCPeerConnection) {
	      window.RTCPeerConnection = function(pcConfig, pcConstraints) {
	        if (browserDetails.version < 38) {
	          // .urls is not supported in FF < 38.
	          // create RTCIceServers with a single url.
	          if (pcConfig && pcConfig.iceServers) {
	            var newIceServers = [];
	            for (var i = 0; i < pcConfig.iceServers.length; i++) {
	              var server = pcConfig.iceServers[i];
	              if (server.hasOwnProperty('urls')) {
	                for (var j = 0; j < server.urls.length; j++) {
	                  var newServer = {
	                    url: server.urls[j]
	                  };
	                  if (server.urls[j].indexOf('turn') === 0) {
	                    newServer.username = server.username;
	                    newServer.credential = server.credential;
	                  }
	                  newIceServers.push(newServer);
	                }
	              } else {
	                newIceServers.push(pcConfig.iceServers[i]);
	              }
	            }
	            pcConfig.iceServers = newIceServers;
	          }
	        }
	        return new window.mozRTCPeerConnection(pcConfig, pcConstraints);
	      };
	      window.RTCPeerConnection.prototype =
	          window.mozRTCPeerConnection.prototype;

	      // wrap static methods. Currently just generateCertificate.
	      if (window.mozRTCPeerConnection.generateCertificate) {
	        Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
	          get: function() {
	            return window.mozRTCPeerConnection.generateCertificate;
	          }
	        });
	      }

	      window.RTCSessionDescription = window.mozRTCSessionDescription;
	      window.RTCIceCandidate = window.mozRTCIceCandidate;
	    }

	    // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
	    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
	        .forEach(function(method) {
	          var nativeMethod = window.RTCPeerConnection.prototype[method];
	          window.RTCPeerConnection.prototype[method] = function() {
	            arguments[0] = new ((method === 'addIceCandidate') ?
	                window.RTCIceCandidate :
	                window.RTCSessionDescription)(arguments[0]);
	            return nativeMethod.apply(this, arguments);
	          };
	        });

	    // support for addIceCandidate(null or undefined)
	    var nativeAddIceCandidate =
	        window.RTCPeerConnection.prototype.addIceCandidate;
	    window.RTCPeerConnection.prototype.addIceCandidate = function() {
	      if (!arguments[0]) {
	        if (arguments[1]) {
	          arguments[1].apply(null);
	        }
	        return Promise.resolve();
	      }
	      return nativeAddIceCandidate.apply(this, arguments);
	    };

	    // shim getStats with maplike support
	    var makeMapStats = function(stats) {
	      var map = new Map();
	      Object.keys(stats).forEach(function(key) {
	        map.set(key, stats[key]);
	        map[key] = stats[key];
	      });
	      return map;
	    };

	    var modernStatsTypes = {
	      inboundrtp: 'inbound-rtp',
	      outboundrtp: 'outbound-rtp',
	      candidatepair: 'candidate-pair',
	      localcandidate: 'local-candidate',
	      remotecandidate: 'remote-candidate'
	    };

	    var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
	    window.RTCPeerConnection.prototype.getStats = function(
	      selector,
	      onSucc,
	      onErr
	    ) {
	      return nativeGetStats.apply(this, [selector || null])
	        .then(function(stats) {
	          if (browserDetails.version < 48) {
	            stats = makeMapStats(stats);
	          }
	          if (browserDetails.version < 53 && !onSucc) {
	            // Shim only promise getStats with spec-hyphens in type names
	            // Leave callback version alone; misc old uses of forEach before Map
	            try {
	              stats.forEach(function(stat) {
	                stat.type = modernStatsTypes[stat.type] || stat.type;
	              });
	            } catch (e) {
	              if (e.name !== 'TypeError') {
	                throw e;
	              }
	              // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
	              stats.forEach(function(stat, i) {
	                stats.set(i, Object.assign({}, stat, {
	                  type: modernStatsTypes[stat.type] || stat.type
	                }));
	              });
	            }
	          }
	          return stats;
	        })
	        .then(onSucc, onErr);
	    };
	  },

	  shimSenderGetStats: function(window) {
	    if (!(typeof window === 'object' && window.RTCPeerConnection &&
	        window.RTCRtpSender)) {
	      return;
	    }
	    if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
	      return;
	    }
	    var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
	    if (origGetSenders) {
	      window.RTCPeerConnection.prototype.getSenders = function() {
	        var pc = this;
	        var senders = origGetSenders.apply(pc, []);
	        senders.forEach(function(sender) {
	          sender._pc = pc;
	        });
	        return senders;
	      };
	    }

	    var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
	    if (origAddTrack) {
	      window.RTCPeerConnection.prototype.addTrack = function() {
	        var sender = origAddTrack.apply(this, arguments);
	        sender._pc = this;
	        return sender;
	      };
	    }
	    window.RTCRtpSender.prototype.getStats = function() {
	      return this.track ? this._pc.getStats(this.track) :
	          Promise.resolve(new Map());
	    };
	  },

	  shimReceiverGetStats: function(window) {
	    if (!(typeof window === 'object' && window.RTCPeerConnection &&
	        window.RTCRtpSender)) {
	      return;
	    }
	    if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
	      return;
	    }
	    var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
	    if (origGetReceivers) {
	      window.RTCPeerConnection.prototype.getReceivers = function() {
	        var pc = this;
	        var receivers = origGetReceivers.apply(pc, []);
	        receivers.forEach(function(receiver) {
	          receiver._pc = pc;
	        });
	        return receivers;
	      };
	    }
	    utils.wrapPeerConnectionEvent(window, 'track', function(e) {
	      e.receiver._pc = e.srcElement;
	      return e;
	    });
	    window.RTCRtpReceiver.prototype.getStats = function() {
	      return this._pc.getStats(this.track);
	    };
	  },

	  shimRemoveStream: function(window) {
	    if (!window.RTCPeerConnection ||
	        'removeStream' in window.RTCPeerConnection.prototype) {
	      return;
	    }
	    window.RTCPeerConnection.prototype.removeStream = function(stream) {
	      var pc = this;
	      utils.deprecated('removeStream', 'removeTrack');
	      this.getSenders().forEach(function(sender) {
	        if (sender.track && stream.getTracks().indexOf(sender.track) !== -1) {
	          pc.removeTrack(sender);
	        }
	      });
	    };
	  },

	  shimRTCDataChannel: function(window) {
	    // rename DataChannel to RTCDataChannel (native fix in FF60):
	    // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
	    if (window.DataChannel && !window.RTCDataChannel) {
	      window.RTCDataChannel = window.DataChannel;
	    }
	  },

	  shimGetDisplayMedia: function(window, preferredMediaSource) {
	    if ('getDisplayMedia' in window.navigator) {
	      return;
	    }
	    navigator.getDisplayMedia = function(constraints) {
	      if (!(constraints && constraints.video)) {
	        var err = new DOMException('getDisplayMedia without video ' +
	            'constraints is undefined');
	        err.name = 'NotFoundError';
	        // from https://heycam.github.io/webidl/#idl-DOMException-error-names
	        err.code = 8;
	        return Promise.reject(err);
	      }
	      if (constraints.video === true) {
	        constraints.video = {mediaSource: preferredMediaSource};
	      } else {
	        constraints.video.mediaSource = preferredMediaSource;
	      }
	      return navigator.mediaDevices.getUserMedia(constraints);
	    };
	  }
	};

	var safari_shim = {
	  shimLocalStreamsAPI: function(window) {
	    if (typeof window !== 'object' || !window.RTCPeerConnection) {
	      return;
	    }
	    if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
	      window.RTCPeerConnection.prototype.getLocalStreams = function() {
	        if (!this._localStreams) {
	          this._localStreams = [];
	        }
	        return this._localStreams;
	      };
	    }
	    if (!('getStreamById' in window.RTCPeerConnection.prototype)) {
	      window.RTCPeerConnection.prototype.getStreamById = function(id) {
	        var result = null;
	        if (this._localStreams) {
	          this._localStreams.forEach(function(stream) {
	            if (stream.id === id) {
	              result = stream;
	            }
	          });
	        }
	        if (this._remoteStreams) {
	          this._remoteStreams.forEach(function(stream) {
	            if (stream.id === id) {
	              result = stream;
	            }
	          });
	        }
	        return result;
	      };
	    }
	    if (!('addStream' in window.RTCPeerConnection.prototype)) {
	      var _addTrack = window.RTCPeerConnection.prototype.addTrack;
	      window.RTCPeerConnection.prototype.addStream = function(stream) {
	        if (!this._localStreams) {
	          this._localStreams = [];
	        }
	        if (this._localStreams.indexOf(stream) === -1) {
	          this._localStreams.push(stream);
	        }
	        var pc = this;
	        stream.getTracks().forEach(function(track) {
	          _addTrack.call(pc, track, stream);
	        });
	      };

	      window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
	        if (stream) {
	          if (!this._localStreams) {
	            this._localStreams = [stream];
	          } else if (this._localStreams.indexOf(stream) === -1) {
	            this._localStreams.push(stream);
	          }
	        }
	        return _addTrack.call(this, track, stream);
	      };
	    }
	    if (!('removeStream' in window.RTCPeerConnection.prototype)) {
	      window.RTCPeerConnection.prototype.removeStream = function(stream) {
	        if (!this._localStreams) {
	          this._localStreams = [];
	        }
	        var index = this._localStreams.indexOf(stream);
	        if (index === -1) {
	          return;
	        }
	        this._localStreams.splice(index, 1);
	        var pc = this;
	        var tracks = stream.getTracks();
	        this.getSenders().forEach(function(sender) {
	          if (tracks.indexOf(sender.track) !== -1) {
	            pc.removeTrack(sender);
	          }
	        });
	      };
	    }
	  },
	  shimRemoteStreamsAPI: function(window) {
	    if (typeof window !== 'object' || !window.RTCPeerConnection) {
	      return;
	    }
	    if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
	      window.RTCPeerConnection.prototype.getRemoteStreams = function() {
	        return this._remoteStreams ? this._remoteStreams : [];
	      };
	    }
	    if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
	      Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
	        get: function() {
	          return this._onaddstream;
	        },
	        set: function(f) {
	          if (this._onaddstream) {
	            this.removeEventListener('addstream', this._onaddstream);
	          }
	          this.addEventListener('addstream', this._onaddstream = f);
	        }
	      });
	      var origSetRemoteDescription =
	          window.RTCPeerConnection.prototype.setRemoteDescription;
	      window.RTCPeerConnection.prototype.setRemoteDescription = function() {
	        var pc = this;
	        if (!this._onaddstreampoly) {
	          this.addEventListener('track', this._onaddstreampoly = function(e) {
	            e.streams.forEach(function(stream) {
	              if (!pc._remoteStreams) {
	                pc._remoteStreams = [];
	              }
	              if (pc._remoteStreams.indexOf(stream) >= 0) {
	                return;
	              }
	              pc._remoteStreams.push(stream);
	              var event = new Event('addstream');
	              event.stream = stream;
	              pc.dispatchEvent(event);
	            });
	          });
	        }
	        return origSetRemoteDescription.apply(pc, arguments);
	      };
	    }
	  },
	  shimCallbacksAPI: function(window) {
	    if (typeof window !== 'object' || !window.RTCPeerConnection) {
	      return;
	    }
	    var prototype = window.RTCPeerConnection.prototype;
	    var createOffer = prototype.createOffer;
	    var createAnswer = prototype.createAnswer;
	    var setLocalDescription = prototype.setLocalDescription;
	    var setRemoteDescription = prototype.setRemoteDescription;
	    var addIceCandidate = prototype.addIceCandidate;

	    prototype.createOffer = function(successCallback, failureCallback) {
	      var options = (arguments.length >= 2) ? arguments[2] : arguments[0];
	      var promise = createOffer.apply(this, [options]);
	      if (!failureCallback) {
	        return promise;
	      }
	      promise.then(successCallback, failureCallback);
	      return Promise.resolve();
	    };

	    prototype.createAnswer = function(successCallback, failureCallback) {
	      var options = (arguments.length >= 2) ? arguments[2] : arguments[0];
	      var promise = createAnswer.apply(this, [options]);
	      if (!failureCallback) {
	        return promise;
	      }
	      promise.then(successCallback, failureCallback);
	      return Promise.resolve();
	    };

	    var withCallback = function(description, successCallback, failureCallback) {
	      var promise = setLocalDescription.apply(this, [description]);
	      if (!failureCallback) {
	        return promise;
	      }
	      promise.then(successCallback, failureCallback);
	      return Promise.resolve();
	    };
	    prototype.setLocalDescription = withCallback;

	    withCallback = function(description, successCallback, failureCallback) {
	      var promise = setRemoteDescription.apply(this, [description]);
	      if (!failureCallback) {
	        return promise;
	      }
	      promise.then(successCallback, failureCallback);
	      return Promise.resolve();
	    };
	    prototype.setRemoteDescription = withCallback;

	    withCallback = function(candidate, successCallback, failureCallback) {
	      var promise = addIceCandidate.apply(this, [candidate]);
	      if (!failureCallback) {
	        return promise;
	      }
	      promise.then(successCallback, failureCallback);
	      return Promise.resolve();
	    };
	    prototype.addIceCandidate = withCallback;
	  },
	  shimGetUserMedia: function(window) {
	    var navigator = window && window.navigator;

	    if (!navigator.getUserMedia) {
	      if (navigator.webkitGetUserMedia) {
	        navigator.getUserMedia = navigator.webkitGetUserMedia.bind(navigator);
	      } else if (navigator.mediaDevices &&
	          navigator.mediaDevices.getUserMedia) {
	        navigator.getUserMedia = function(constraints, cb, errcb) {
	          navigator.mediaDevices.getUserMedia(constraints)
	          .then(cb, errcb);
	        }.bind(navigator);
	      }
	    }
	  },
	  shimRTCIceServerUrls: function(window) {
	    // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
	    var OrigPeerConnection = window.RTCPeerConnection;
	    window.RTCPeerConnection = function(pcConfig, pcConstraints) {
	      if (pcConfig && pcConfig.iceServers) {
	        var newIceServers = [];
	        for (var i = 0; i < pcConfig.iceServers.length; i++) {
	          var server = pcConfig.iceServers[i];
	          if (!server.hasOwnProperty('urls') &&
	              server.hasOwnProperty('url')) {
	            utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
	            server = JSON.parse(JSON.stringify(server));
	            server.urls = server.url;
	            delete server.url;
	            newIceServers.push(server);
	          } else {
	            newIceServers.push(pcConfig.iceServers[i]);
	          }
	        }
	        pcConfig.iceServers = newIceServers;
	      }
	      return new OrigPeerConnection(pcConfig, pcConstraints);
	    };
	    window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
	    // wrap static methods. Currently just generateCertificate.
	    if ('generateCertificate' in window.RTCPeerConnection) {
	      Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
	        get: function() {
	          return OrigPeerConnection.generateCertificate;
	        }
	      });
	    }
	  },
	  shimTrackEventTransceiver: function(window) {
	    // Add event.transceiver member over deprecated event.receiver
	    if (typeof window === 'object' && window.RTCPeerConnection &&
	        ('receiver' in window.RTCTrackEvent.prototype) &&
	        // can't check 'transceiver' in window.RTCTrackEvent.prototype, as it is
	        // defined for some reason even when window.RTCTransceiver is not.
	        !window.RTCTransceiver) {
	      Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
	        get: function() {
	          return {receiver: this.receiver};
	        }
	      });
	    }
	  },

	  shimCreateOfferLegacy: function(window) {
	    var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
	    window.RTCPeerConnection.prototype.createOffer = function(offerOptions) {
	      var pc = this;
	      if (offerOptions) {
	        if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
	          // support bit values
	          offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
	        }
	        var audioTransceiver = pc.getTransceivers().find(function(transceiver) {
	          return transceiver.sender.track &&
	              transceiver.sender.track.kind === 'audio';
	        });
	        if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
	          if (audioTransceiver.direction === 'sendrecv') {
	            if (audioTransceiver.setDirection) {
	              audioTransceiver.setDirection('sendonly');
	            } else {
	              audioTransceiver.direction = 'sendonly';
	            }
	          } else if (audioTransceiver.direction === 'recvonly') {
	            if (audioTransceiver.setDirection) {
	              audioTransceiver.setDirection('inactive');
	            } else {
	              audioTransceiver.direction = 'inactive';
	            }
	          }
	        } else if (offerOptions.offerToReceiveAudio === true &&
	            !audioTransceiver) {
	          pc.addTransceiver('audio');
	        }


	        if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
	          // support bit values
	          offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
	        }
	        var videoTransceiver = pc.getTransceivers().find(function(transceiver) {
	          return transceiver.sender.track &&
	              transceiver.sender.track.kind === 'video';
	        });
	        if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
	          if (videoTransceiver.direction === 'sendrecv') {
	            videoTransceiver.setDirection('sendonly');
	          } else if (videoTransceiver.direction === 'recvonly') {
	            videoTransceiver.setDirection('inactive');
	          }
	        } else if (offerOptions.offerToReceiveVideo === true &&
	            !videoTransceiver) {
	          pc.addTransceiver('video');
	        }
	      }
	      return origCreateOffer.apply(pc, arguments);
	    };
	  }
	};

	var common_shim = {
	  shimRTCIceCandidate: function(window) {
	    // foundation is arbitrarily chosen as an indicator for full support for
	    // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
	    if (!window.RTCIceCandidate || (window.RTCIceCandidate && 'foundation' in
	        window.RTCIceCandidate.prototype)) {
	      return;
	    }

	    var NativeRTCIceCandidate = window.RTCIceCandidate;
	    window.RTCIceCandidate = function(args) {
	      // Remove the a= which shouldn't be part of the candidate string.
	      if (typeof args === 'object' && args.candidate &&
	          args.candidate.indexOf('a=') === 0) {
	        args = JSON.parse(JSON.stringify(args));
	        args.candidate = args.candidate.substr(2);
	      }

	      if (args.candidate && args.candidate.length) {
	        // Augment the native candidate with the parsed fields.
	        var nativeCandidate = new NativeRTCIceCandidate(args);
	        var parsedCandidate = sdp.parseCandidate(args.candidate);
	        var augmentedCandidate = Object.assign(nativeCandidate,
	            parsedCandidate);

	        // Add a serializer that does not serialize the extra attributes.
	        augmentedCandidate.toJSON = function() {
	          return {
	            candidate: augmentedCandidate.candidate,
	            sdpMid: augmentedCandidate.sdpMid,
	            sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
	            usernameFragment: augmentedCandidate.usernameFragment,
	          };
	        };
	        return augmentedCandidate;
	      }
	      return new NativeRTCIceCandidate(args);
	    };
	    window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

	    // Hook up the augmented candidate in onicecandidate and
	    // addEventListener('icecandidate', ...)
	    utils.wrapPeerConnectionEvent(window, 'icecandidate', function(e) {
	      if (e.candidate) {
	        Object.defineProperty(e, 'candidate', {
	          value: new window.RTCIceCandidate(e.candidate),
	          writable: 'false'
	        });
	      }
	      return e;
	    });
	  },

	  // shimCreateObjectURL must be called before shimSourceObject to avoid loop.

	  shimCreateObjectURL: function(window) {
	    var URL = window && window.URL;

	    if (!(typeof window === 'object' && window.HTMLMediaElement &&
	          'srcObject' in window.HTMLMediaElement.prototype &&
	        URL.createObjectURL && URL.revokeObjectURL)) {
	      // Only shim CreateObjectURL using srcObject if srcObject exists.
	      return undefined;
	    }

	    var nativeCreateObjectURL = URL.createObjectURL.bind(URL);
	    var nativeRevokeObjectURL = URL.revokeObjectURL.bind(URL);
	    var streams = new Map(), newId = 0;

	    URL.createObjectURL = function(stream) {
	      if ('getTracks' in stream) {
	        var url = 'polyblob:' + (++newId);
	        streams.set(url, stream);
	        utils.deprecated('URL.createObjectURL(stream)',
	            'elem.srcObject = stream');
	        return url;
	      }
	      return nativeCreateObjectURL(stream);
	    };
	    URL.revokeObjectURL = function(url) {
	      nativeRevokeObjectURL(url);
	      streams.delete(url);
	    };

	    var dsc = Object.getOwnPropertyDescriptor(window.HTMLMediaElement.prototype,
	                                              'src');
	    Object.defineProperty(window.HTMLMediaElement.prototype, 'src', {
	      get: function() {
	        return dsc.get.apply(this);
	      },
	      set: function(url) {
	        this.srcObject = streams.get(url) || null;
	        return dsc.set.apply(this, [url]);
	      }
	    });

	    var nativeSetAttribute = window.HTMLMediaElement.prototype.setAttribute;
	    window.HTMLMediaElement.prototype.setAttribute = function() {
	      if (arguments.length === 2 &&
	          ('' + arguments[0]).toLowerCase() === 'src') {
	        this.srcObject = streams.get(arguments[1]) || null;
	      }
	      return nativeSetAttribute.apply(this, arguments);
	    };
	  },

	  shimMaxMessageSize: function(window) {
	    if (window.RTCSctpTransport || !window.RTCPeerConnection) {
	      return;
	    }
	    var browserDetails = utils.detectBrowser(window);

	    if (!('sctp' in window.RTCPeerConnection.prototype)) {
	      Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
	        get: function() {
	          return typeof this._sctp === 'undefined' ? null : this._sctp;
	        }
	      });
	    }

	    var sctpInDescription = function(description) {
	      var sections = sdp.splitSections(description.sdp);
	      sections.shift();
	      return sections.some(function(mediaSection) {
	        var mLine = sdp.parseMLine(mediaSection);
	        return mLine && mLine.kind === 'application'
	            && mLine.protocol.indexOf('SCTP') !== -1;
	      });
	    };

	    var getRemoteFirefoxVersion = function(description) {
	      // TODO: Is there a better solution for detecting Firefox?
	      var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
	      if (match === null || match.length < 2) {
	        return -1;
	      }
	      var version = parseInt(match[1], 10);
	      // Test for NaN (yes, this is ugly)
	      return version !== version ? -1 : version;
	    };

	    var getCanSendMaxMessageSize = function(remoteIsFirefox) {
	      // Every implementation we know can send at least 64 KiB.
	      // Note: Although Chrome is technically able to send up to 256 KiB, the
	      //       data does not reach the other peer reliably.
	      //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
	      var canSendMaxMessageSize = 65536;
	      if (browserDetails.browser === 'firefox') {
	        if (browserDetails.version < 57) {
	          if (remoteIsFirefox === -1) {
	            // FF < 57 will send in 16 KiB chunks using the deprecated PPID
	            // fragmentation.
	            canSendMaxMessageSize = 16384;
	          } else {
	            // However, other FF (and RAWRTC) can reassemble PPID-fragmented
	            // messages. Thus, supporting ~2 GiB when sending.
	            canSendMaxMessageSize = 2147483637;
	          }
	        } else if (browserDetails.version < 60) {
	          // Currently, all FF >= 57 will reset the remote maximum message size
	          // to the default value when a data channel is created at a later
	          // stage. :(
	          // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
	          canSendMaxMessageSize =
	            browserDetails.version === 57 ? 65535 : 65536;
	        } else {
	          // FF >= 60 supports sending ~2 GiB
	          canSendMaxMessageSize = 2147483637;
	        }
	      }
	      return canSendMaxMessageSize;
	    };

	    var getMaxMessageSize = function(description, remoteIsFirefox) {
	      // Note: 65536 bytes is the default value from the SDP spec. Also,
	      //       every implementation we know supports receiving 65536 bytes.
	      var maxMessageSize = 65536;

	      // FF 57 has a slightly incorrect default remote max message size, so
	      // we need to adjust it here to avoid a failure when sending.
	      // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
	      if (browserDetails.browser === 'firefox'
	           && browserDetails.version === 57) {
	        maxMessageSize = 65535;
	      }

	      var match = sdp.matchPrefix(description.sdp, 'a=max-message-size:');
	      if (match.length > 0) {
	        maxMessageSize = parseInt(match[0].substr(19), 10);
	      } else if (browserDetails.browser === 'firefox' &&
	                  remoteIsFirefox !== -1) {
	        // If the maximum message size is not present in the remote SDP and
	        // both local and remote are Firefox, the remote peer can receive
	        // ~2 GiB.
	        maxMessageSize = 2147483637;
	      }
	      return maxMessageSize;
	    };

	    var origSetRemoteDescription =
	        window.RTCPeerConnection.prototype.setRemoteDescription;
	    window.RTCPeerConnection.prototype.setRemoteDescription = function() {
	      var pc = this;
	      pc._sctp = null;

	      if (sctpInDescription(arguments[0])) {
	        // Check if the remote is FF.
	        var isFirefox = getRemoteFirefoxVersion(arguments[0]);

	        // Get the maximum message size the local peer is capable of sending
	        var canSendMMS = getCanSendMaxMessageSize(isFirefox);

	        // Get the maximum message size of the remote peer.
	        var remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

	        // Determine final maximum message size
	        var maxMessageSize;
	        if (canSendMMS === 0 && remoteMMS === 0) {
	          maxMessageSize = Number.POSITIVE_INFINITY;
	        } else if (canSendMMS === 0 || remoteMMS === 0) {
	          maxMessageSize = Math.max(canSendMMS, remoteMMS);
	        } else {
	          maxMessageSize = Math.min(canSendMMS, remoteMMS);
	        }

	        // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
	        // attribute.
	        var sctp = {};
	        Object.defineProperty(sctp, 'maxMessageSize', {
	          get: function() {
	            return maxMessageSize;
	          }
	        });
	        pc._sctp = sctp;
	      }

	      return origSetRemoteDescription.apply(pc, arguments);
	    };
	  },

	  shimSendThrowTypeError: function(window) {
	    if (!(window.RTCPeerConnection &&
	        'createDataChannel' in window.RTCPeerConnection.prototype)) {
	      return;
	    }

	    // Note: Although Firefox >= 57 has a native implementation, the maximum
	    //       message size can be reset for all data channels at a later stage.
	    //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

	    function wrapDcSend(dc, pc) {
	      var origDataChannelSend = dc.send;
	      dc.send = function() {
	        var data = arguments[0];
	        var length = data.length || data.size || data.byteLength;
	        if (dc.readyState === 'open' &&
	            pc.sctp && length > pc.sctp.maxMessageSize) {
	          throw new TypeError('Message too large (can send a maximum of ' +
	            pc.sctp.maxMessageSize + ' bytes)');
	        }
	        return origDataChannelSend.apply(dc, arguments);
	      };
	    }
	    var origCreateDataChannel =
	      window.RTCPeerConnection.prototype.createDataChannel;
	    window.RTCPeerConnection.prototype.createDataChannel = function() {
	      var pc = this;
	      var dataChannel = origCreateDataChannel.apply(pc, arguments);
	      wrapDcSend(dataChannel, pc);
	      return dataChannel;
	    };
	    utils.wrapPeerConnectionEvent(window, 'datachannel', function(e) {
	      wrapDcSend(e.channel, e.target);
	      return e;
	    });
	  }
	};

	// Shimming starts here.
	var adapter_factory = function(dependencies, opts) {
	  var window = dependencies && dependencies.window;

	  var options = {
	    shimChrome: true,
	    shimFirefox: true,
	    shimEdge: true,
	    shimSafari: true,
	  };

	  for (var key in opts) {
	    if (hasOwnProperty.call(opts, key)) {
	      options[key] = opts[key];
	    }
	  }

	  // Utils.
	  var logging = utils.log;
	  var browserDetails = utils.detectBrowser(window);

	  // Uncomment the line below if you want logging to occur, including logging
	  // for the switch statement below. Can also be turned on in the browser via
	  // adapter.disableLog(false), but then logging from the switch statement below
	  // will not appear.
	  // require('./utils').disableLog(false);

	  // Browser shims.
	  var chromeShim = chrome_shim || null;
	  var edgeShim = edge_shim || null;
	  var firefoxShim = firefox_shim || null;
	  var safariShim = safari_shim || null;
	  var commonShim = common_shim || null;

	  // Export to the adapter global object visible in the browser.
	  var adapter = {
	    browserDetails: browserDetails,
	    commonShim: commonShim,
	    extractVersion: utils.extractVersion,
	    disableLog: utils.disableLog,
	    disableWarnings: utils.disableWarnings
	  };

	  // Shim browser if found.
	  switch (browserDetails.browser) {
	    case 'chrome':
	      if (!chromeShim || !chromeShim.shimPeerConnection ||
	          !options.shimChrome) {
	        logging('Chrome shim is not included in this adapter release.');
	        return adapter;
	      }
	      logging('adapter.js shimming chrome.');
	      // Export to the adapter global object visible in the browser.
	      adapter.browserShim = chromeShim;
	      commonShim.shimCreateObjectURL(window);

	      chromeShim.shimGetUserMedia(window);
	      chromeShim.shimMediaStream(window);
	      chromeShim.shimSourceObject(window);
	      chromeShim.shimPeerConnection(window);
	      chromeShim.shimOnTrack(window);
	      chromeShim.shimAddTrackRemoveTrack(window);
	      chromeShim.shimGetSendersWithDtmf(window);
	      chromeShim.shimSenderReceiverGetStats(window);
	      chromeShim.fixNegotiationNeeded(window);

	      commonShim.shimRTCIceCandidate(window);
	      commonShim.shimMaxMessageSize(window);
	      commonShim.shimSendThrowTypeError(window);
	      break;
	    case 'firefox':
	      if (!firefoxShim || !firefoxShim.shimPeerConnection ||
	          !options.shimFirefox) {
	        logging('Firefox shim is not included in this adapter release.');
	        return adapter;
	      }
	      logging('adapter.js shimming firefox.');
	      // Export to the adapter global object visible in the browser.
	      adapter.browserShim = firefoxShim;
	      commonShim.shimCreateObjectURL(window);

	      firefoxShim.shimGetUserMedia(window);
	      firefoxShim.shimSourceObject(window);
	      firefoxShim.shimPeerConnection(window);
	      firefoxShim.shimOnTrack(window);
	      firefoxShim.shimRemoveStream(window);
	      firefoxShim.shimSenderGetStats(window);
	      firefoxShim.shimReceiverGetStats(window);
	      firefoxShim.shimRTCDataChannel(window);

	      commonShim.shimRTCIceCandidate(window);
	      commonShim.shimMaxMessageSize(window);
	      commonShim.shimSendThrowTypeError(window);
	      break;
	    case 'edge':
	      if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
	        logging('MS edge shim is not included in this adapter release.');
	        return adapter;
	      }
	      logging('adapter.js shimming edge.');
	      // Export to the adapter global object visible in the browser.
	      adapter.browserShim = edgeShim;
	      commonShim.shimCreateObjectURL(window);

	      edgeShim.shimGetUserMedia(window);
	      edgeShim.shimPeerConnection(window);
	      edgeShim.shimReplaceTrack(window);

	      // the edge shim implements the full RTCIceCandidate object.

	      commonShim.shimMaxMessageSize(window);
	      commonShim.shimSendThrowTypeError(window);
	      break;
	    case 'safari':
	      if (!safariShim || !options.shimSafari) {
	        logging('Safari shim is not included in this adapter release.');
	        return adapter;
	      }
	      logging('adapter.js shimming safari.');
	      // Export to the adapter global object visible in the browser.
	      adapter.browserShim = safariShim;
	      commonShim.shimCreateObjectURL(window);

	      safariShim.shimRTCIceServerUrls(window);
	      safariShim.shimCreateOfferLegacy(window);
	      safariShim.shimCallbacksAPI(window);
	      safariShim.shimLocalStreamsAPI(window);
	      safariShim.shimRemoteStreamsAPI(window);
	      safariShim.shimTrackEventTransceiver(window);
	      safariShim.shimGetUserMedia(window);

	      commonShim.shimRTCIceCandidate(window);
	      commonShim.shimMaxMessageSize(window);
	      commonShim.shimSendThrowTypeError(window);
	      break;
	    default:
	      logging('Unsupported browser!');
	      break;
	  }

	  return adapter;
	};

	var adapter_core = adapter_factory({window: commonjsGlobal.window});

	var sip0_11_1 = createCommonjsModule(function (module, exports) {
	/*!
	 * 
	 *  SIP version 0.11.1
	 *  Copyright (c) 2014-2018 Junction Networks, Inc <http://www.onsip.com>
	 *  Homepage: https://sipjs.com
	 *  License: https://sipjs.com/license/
	 * 
	 * 
	 *  ~~~SIP.js contains substantial portions of JsSIP under the following license~~~
	 *  Homepage: http://jssip.net
	 *  Copyright (c) 2012-2013 José Luis Millán - Versatica <http://www.versatica.com>
	 * 
	 *  Permission is hereby granted, free of charge, to any person obtaining
	 *  a copy of this software and associated documentation files (the
	 *  "Software"), to deal in the Software without restriction, including
	 *  without limitation the rights to use, copy, modify, merge, publish,
	 *  distribute, sublicense, and/or sell copies of the Software, and to
	 *  permit persons to whom the Software is furnished to do so, subject to
	 *  the following conditions:
	 * 
	 *  The above copyright notice and this permission notice shall be
	 *  included in all copies or substantial portions of the Software.
	 * 
	 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	 *  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	 *  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	 *  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	 *  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	 *  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	 *  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	 * 
	 *  ~~~ end JsSIP license ~~~
	 * 
	 * 
	 * 
	 * 
	 */
	(function webpackUniversalModuleDefinition(root, factory) {
		module.exports = factory();
	})(commonjsGlobal, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId]) {
	/******/ 			return installedModules[moduleId].exports;
	/******/ 		}
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			i: moduleId,
	/******/ 			l: false,
	/******/ 			exports: {}
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.l = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// define getter function for harmony exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
	/******/ 		if(!__webpack_require__.o(exports, name)) {
	/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
	/******/ 		}
	/******/ 	};
	/******/
	/******/ 	// define __esModule on exports
	/******/ 	__webpack_require__.r = function(exports) {
	/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
	/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	/******/ 		}
	/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
	/******/ 	};
	/******/
	/******/ 	// create a fake namespace object
	/******/ 	// mode & 1: value is a module id, require it
	/******/ 	// mode & 2: merge all properties of value into the ns
	/******/ 	// mode & 4: return value when already ns object
	/******/ 	// mode & 8|1: behave like require
	/******/ 	__webpack_require__.t = function(value, mode) {
	/******/ 		if(mode & 1) value = __webpack_require__(value);
	/******/ 		if(mode & 8) return value;
	/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
	/******/ 		var ns = Object.create(null);
	/******/ 		__webpack_require__.r(ns);
	/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
	/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
	/******/ 		return ns;
	/******/ 	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
	/******/ 		var getter = module && module.__esModule ?
	/******/ 			function getDefault() { return module['default']; } :
	/******/ 			function getModuleExports() { return module; };
	/******/ 		__webpack_require__.d(getter, 'a', getter);
	/******/ 		return getter;
	/******/ 	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports, __webpack_require__) {


	module.exports = __webpack_require__(1)(__webpack_require__(40));

	/***/ }),
	/* 1 */
	/***/ (function(module, exports, __webpack_require__) {
	/**
	 * @name SIP
	 * @namespace
	 */


	module.exports = function (environment) {

	  var pkg = __webpack_require__(2),
	      version = pkg.version,
	      title = pkg.title;

	  var SIP = Object.defineProperties({}, {
	    version: {
	      get: function get() {
	        return version;
	      }
	    },
	    name: {
	      get: function get() {
	        return title;
	      }
	    }
	  });

	  __webpack_require__(3)(SIP, environment);
	  SIP.LoggerFactory = __webpack_require__(4)(environment.console);
	  SIP.EventEmitter = __webpack_require__(5)();
	  SIP.C = __webpack_require__(7)(SIP.name, SIP.version);
	  SIP.Exceptions = __webpack_require__(8);
	  SIP.Timers = __webpack_require__(9)(environment.timers);
	  SIP.Transport = __webpack_require__(10)(SIP);
	  __webpack_require__(11)(SIP);
	  __webpack_require__(12)(SIP);
	  __webpack_require__(13)(SIP);
	  __webpack_require__(14)(SIP);
	  __webpack_require__(15)(SIP);
	  __webpack_require__(16)(SIP);
	  __webpack_require__(18)(SIP);
	  __webpack_require__(19)(SIP);
	  SIP.SessionDescriptionHandler = __webpack_require__(20)(SIP.EventEmitter);
	  __webpack_require__(21)(SIP);
	  __webpack_require__(22)(SIP);
	  __webpack_require__(23)(SIP);
	  __webpack_require__(25)(SIP);
	  __webpack_require__(26)(SIP);
	  __webpack_require__(27)(SIP, environment);
	  __webpack_require__(32)(SIP);
	  SIP.DigestAuthentication = __webpack_require__(33)(SIP.Utils);
	  SIP.Grammar = __webpack_require__(36)(SIP);
	  SIP.Web = {
	    Modifiers: __webpack_require__(38)(SIP),
	    Simple: __webpack_require__(39)(SIP)
	  };

	  return SIP;
	};

	/***/ }),
	/* 2 */
	/***/ (function(module) {

	module.exports = {"name":"sip.js","title":"SIP.js","description":"A simple, intuitive, and powerful JavaScript signaling library","version":"0.11.1","main":"dist/sip.min.js","browser":{"./src/environment.js":"./src/environment_browser.js"},"homepage":"https://sipjs.com","author":"OnSIP <developer@onsip.com> (https://sipjs.com/aboutus/)","contributors":[{"url":"https://github.com/onsip/SIP.js/blob/master/THANKS.md"}],"repository":{"type":"git","url":"https://github.com/onsip/SIP.js.git"},"keywords":["sip","websocket","webrtc","library","javascript"],"devDependencies":{"babel-core":"^6.26.0","babel-loader":"^7.1.2","babel-preset-env":"^1.6.1","eslint":"^4.9.0","jasmine":"^3.1.0","karma":"^2.0.2","karma-cli":"^1.0.1","karma-jasmine":"^1.1.0","karma-jasmine-html-reporter":"^1.1.0","karma-mocha-reporter":"^2.2.5","karma-phantomjs-launcher":"^1.0.4","karma-webpack":"^3.0.0","pegjs":"^0.10.0","pegjs-loader":"^0.5.4","phantomjs-polyfill-object-assign":"0.0.2","uglifyjs-webpack-plugin":"^1.2.5","webpack":"^4.8.3","webpack-cli":"^2.1.3"},"engines":{"node":">=6.0"},"license":"MIT","scripts":{"prebuild":"eslint src/*.js src/**/*.js","build-dev":"webpack --progress --env.buildType dev","build-prod":"webpack --progress --env.buildType prod","copy-dist-files":"cp dist/sip.js dist/sip-$npm_package_version.js && cp dist/sip.min.js  dist/sip-$npm_package_version.min.js","build":"npm run build-dev && npm run build-prod && npm run copy-dist-files","browserTest":"sleep 2 && open http://0.0.0.0:9876/debug.html & karma start --reporters kjhtml --no-single-run","commandLineTest":"karma start --reporters mocha --browsers PhantomJS --single-run","buildAndTest":"npm run build && npm run commandLineTest","buildAndBrowserTest":"npm run build && npm run browserTest"},"dependencies":{"crypto-js":"^3.1.9-1"},"optionalDependencies":{"promiscuous":"^0.6.0"}};

	/***/ }),
	/* 3 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview Utils
	 */

	module.exports = function (SIP, environment) {
	  var Utils;

	  Utils = {

	    Promise: environment.Promise,

	    defer: function defer() {
	      var deferred = {};
	      deferred.promise = new Utils.Promise(function (resolve, reject) {
	        deferred.resolve = resolve;
	        deferred.reject = reject;
	      });
	      return deferred;
	    },

	    reducePromises: function reducePromises(arr, val) {
	      return arr.reduce(function (acc, fn) {
	        acc = acc.then(fn);
	        return acc;
	      }, SIP.Utils.Promise.resolve(val));
	    },

	    augment: function augment(object, constructor, args, override) {
	      var idx, proto;

	      // Add public properties from constructor's prototype onto object
	      proto = constructor.prototype;
	      for (idx in proto) {
	        if (override || object[idx] === undefined) {
	          object[idx] = proto[idx];
	        }
	      }

	      // Construct the object as though it were just created by constructor
	      constructor.apply(object, args);
	    },

	    defaultOptions: function defaultOptions(_defaultOptions, overridingOptions) {
	      _defaultOptions = _defaultOptions || {};
	      overridingOptions = overridingOptions || {};
	      return Object.assign({}, _defaultOptions, overridingOptions);
	    },

	    optionsOverride: function optionsOverride(options, winner, loser, isDeprecated, logger, defaultValue) {
	      if (isDeprecated && options[loser]) {
	        logger.warn(loser + ' is deprecated, please use ' + winner + ' instead');
	      }

	      if (options[winner] && options[loser]) {
	        logger.warn(winner + ' overriding ' + loser);
	      }

	      options[winner] = options[winner] || options[loser] || defaultValue;
	    },

	    str_utf8_length: function str_utf8_length(string) {
	      return encodeURIComponent(string).replace(/%[A-F\d]{2}/g, 'U').length;
	    },

	    generateFakeSDP: function generateFakeSDP(body) {
	      if (!body) {
	        return;
	      }

	      var start = body.indexOf('o=');
	      var end = body.indexOf('\r\n', start);

	      return 'v=0\r\n' + body.slice(start, end) + '\r\ns=-\r\nt=0 0\r\nc=IN IP4 0.0.0.0';
	    },

	    isFunction: function isFunction(fn) {
	      if (fn !== undefined) {
	        return Object.prototype.toString.call(fn) === '[object Function]';
	      } else {
	        return false;
	      }
	    },

	    isDecimal: function isDecimal(num) {
	      return !isNaN(num) && parseFloat(num) === parseInt(num, 10);
	    },

	    createRandomToken: function createRandomToken(size, base) {
	      var i,
	          r,
	          token = '';

	      base = base || 32;

	      for (i = 0; i < size; i++) {
	        r = Math.random() * base | 0;
	        token += r.toString(base);
	      }

	      return token;
	    },

	    newTag: function newTag() {
	      return SIP.Utils.createRandomToken(SIP.UA.C.TAG_LENGTH);
	    },

	    // http://stackoverflow.com/users/109538/broofa
	    newUUID: function newUUID() {
	      var UUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	        var r = Math.random() * 16 | 0,
	            v = c === 'x' ? r : r & 0x3 | 0x8;
	        return v.toString(16);
	      });

	      return UUID;
	    },

	    hostType: function hostType(host) {
	      if (!host) {
	        return;
	      } else {
	        host = SIP.Grammar.parse(host, 'host');
	        if (host !== -1) {
	          return host.host_type;
	        }
	      }
	    },

	    /**
	    * Normalize SIP URI.
	    * NOTE: It does not allow a SIP URI without username.
	    * Accepts 'sip', 'sips' and 'tel' URIs and convert them into 'sip'.
	    * Detects the domain part (if given) and properly hex-escapes the user portion.
	    * If the user portion has only 'tel' number symbols the user portion is clean of 'tel' visual separators.
	    * @private
	    * @param {String} target
	    * @param {String} [domain]
	    */
	    normalizeTarget: function normalizeTarget(target, domain) {
	      var uri, target_array, target_user, target_domain;

	      // If no target is given then raise an error.
	      if (!target) {
	        return;
	        // If a SIP.URI instance is given then return it.
	      } else if (target instanceof SIP.URI) {
	        return target;

	        // If a string is given split it by '@':
	        // - Last fragment is the desired domain.
	        // - Otherwise append the given domain argument.
	      } else if (typeof target === 'string') {
	        target_array = target.split('@');

	        switch (target_array.length) {
	          case 1:
	            if (!domain) {
	              return;
	            }
	            target_user = target;
	            target_domain = domain;
	            break;
	          case 2:
	            target_user = target_array[0];
	            target_domain = target_array[1];
	            break;
	          default:
	            target_user = target_array.slice(0, target_array.length - 1).join('@');
	            target_domain = target_array[target_array.length - 1];
	        }

	        // Remove the URI scheme (if present).
	        target_user = target_user.replace(/^(sips?|tel):/i, '');

	        // Remove 'tel' visual separators if the user portion just contains 'tel' number symbols.
	        if (/^[\-\.\(\)]*\+?[0-9\-\.\(\)]+$/.test(target_user)) {
	          target_user = target_user.replace(/[\-\.\(\)]/g, '');
	        }

	        // Build the complete SIP URI.
	        target = SIP.C.SIP + ':' + SIP.Utils.escapeUser(target_user) + '@' + target_domain;
	        // Finally parse the resulting URI.
	        uri = SIP.URI.parse(target);

	        return uri;
	      } else {
	        return;
	      }
	    },

	    /**
	    * Hex-escape a SIP URI user.
	    * @private
	    * @param {String} user
	    */
	    escapeUser: function escapeUser(user) {
	      // Don't hex-escape ':' (%3A), '+' (%2B), '?' (%3F"), '/' (%2F).
	      return encodeURIComponent(decodeURIComponent(user)).replace(/%3A/ig, ':').replace(/%2B/ig, '+').replace(/%3F/ig, '?').replace(/%2F/ig, '/');
	    },

	    headerize: function headerize(string) {
	      var exceptions = {
	        'Call-Id': 'Call-ID',
	        'Cseq': 'CSeq',
	        'Min-Se': 'Min-SE',
	        'Rack': 'RAck',
	        'Rseq': 'RSeq',
	        'Www-Authenticate': 'WWW-Authenticate'
	      },
	          name = string.toLowerCase().replace(/_/g, '-').split('-'),
	          hname = '',
	          parts = name.length,
	          part;

	      for (part = 0; part < parts; part++) {
	        if (part !== 0) {
	          hname += '-';
	        }
	        hname += name[part].charAt(0).toUpperCase() + name[part].substring(1);
	      }
	      if (exceptions[hname]) {
	        hname = exceptions[hname];
	      }
	      return hname;
	    },

	    sipErrorCause: function sipErrorCause(status_code) {
	      var cause;

	      for (cause in SIP.C.SIP_ERROR_CAUSES) {
	        if (SIP.C.SIP_ERROR_CAUSES[cause].indexOf(status_code) !== -1) {
	          return SIP.C.causes[cause];
	        }
	      }

	      return SIP.C.causes.SIP_FAILURE_CODE;
	    },

	    getReasonPhrase: function getReasonPhrase(code, specific) {
	      return specific || SIP.C.REASON_PHRASE[code] || '';
	    },

	    getReasonHeaderValue: function getReasonHeaderValue(code, reason) {
	      reason = SIP.Utils.getReasonPhrase(code, reason);
	      return 'SIP;cause=' + code + ';text="' + reason + '"';
	    },

	    getCancelReason: function getCancelReason(code, reason) {
	      if (code && code < 200 || code > 699) {
	        throw new TypeError('Invalid status_code: ' + code);
	      } else if (code) {
	        return SIP.Utils.getReasonHeaderValue(code, reason);
	      }
	    },

	    buildStatusLine: function buildStatusLine(code, reason) {
	      code = code || null;
	      reason = reason || null;

	      // Validate code and reason values
	      if (!code || code < 100 || code > 699) {
	        throw new TypeError('Invalid status_code: ' + code);
	      } else if (reason && typeof reason !== 'string' && !(reason instanceof String)) {
	        throw new TypeError('Invalid reason_phrase: ' + reason);
	      }

	      reason = Utils.getReasonPhrase(code, reason);

	      return 'SIP/2.0 ' + code + ' ' + reason + '\r\n';
	    },

	    /**
	    * Generate a random Test-Net IP (http://tools.ietf.org/html/rfc5735)
	    * @private
	    */
	    getRandomTestNetIP: function getRandomTestNetIP() {
	      function getOctet(from, to) {
	        return Math.floor(Math.random() * (to - from + 1) + from);
	      }
	      return '192.0.2.' + getOctet(1, 254);
	    }
	  };

	  SIP.Utils = Utils;
	};

	/***/ }),
	/* 4 */
	/***/ (function(module, exports, __webpack_require__) {


	var levels = {
	  'error': 0,
	  'warn': 1,
	  'log': 2,
	  'debug': 3
	};

	module.exports = function (console) {

	  var LoggerFactory = function LoggerFactory() {
	    var logger,
	        level = 2,
	        builtinEnabled = true,
	        connector = null;

	    this.loggers = {};

	    logger = this.getLogger('sip.loggerfactory');

	    Object.defineProperties(this, {
	      builtinEnabled: {
	        get: function get() {
	          return builtinEnabled;
	        },
	        set: function set(value) {
	          if (typeof value === 'boolean') {
	            builtinEnabled = value;
	          } else {
	            logger.error('invalid "builtinEnabled" parameter value: ' + JSON.stringify(value));
	          }
	        }
	      },

	      level: {
	        get: function get() {
	          return level;
	        },
	        set: function set(value) {
	          if (value >= 0 && value <= 3) {
	            level = value;
	          } else if (value > 3) {
	            level = 3;
	          } else if (levels.hasOwnProperty(value)) {
	            level = levels[value];
	          } else {
	            logger.error('invalid "level" parameter value: ' + JSON.stringify(value));
	          }
	        }
	      },

	      connector: {
	        get: function get() {
	          return connector;
	        },
	        set: function set(value) {
	          if (value === null || value === "" || value === undefined) {
	            connector = null;
	          } else if (typeof value === 'function') {
	            connector = value;
	          } else {
	            logger.error('invalid "connector" parameter value: ' + JSON.stringify(value));
	          }
	        }
	      }
	    });
	  };

	  LoggerFactory.prototype.print = function (target, category, label, content) {
	    if (typeof content === 'string') {
	      var prefix = [new Date(), category];
	      if (label) {
	        prefix.push(label);
	      }
	      content = prefix.concat(content).join(' | ');
	    }
	    target.call(console, content);
	  };

	  function Logger(logger, category, label) {
	    this.logger = logger;
	    this.category = category;
	    this.label = label;
	  }

	  Object.keys(levels).forEach(function (targetName) {
	    Logger.prototype[targetName] = function (content) {
	      this.logger[targetName](this.category, this.label, content);
	    };

	    LoggerFactory.prototype[targetName] = function (category, label, content) {
	      if (this.level >= levels[targetName]) {
	        if (this.builtinEnabled) {
	          this.print(console[targetName], category, label, content);
	        }

	        if (this.connector) {
	          this.connector(targetName, category, label, content);
	        }
	      }
	    };
	  });

	  LoggerFactory.prototype.getLogger = function (category, label) {
	    var logger;

	    if (label && this.level === 3) {
	      return new Logger(this, category, label);
	    } else if (this.loggers[category]) {
	      return this.loggers[category];
	    } else {
	      logger = new Logger(this, category);
	      this.loggers[category] = logger;
	      return logger;
	    }
	  };

	  return LoggerFactory;
	};

	/***/ }),
	/* 5 */
	/***/ (function(module, exports, __webpack_require__) {


	var NodeEventEmitter = __webpack_require__(6).EventEmitter;

	module.exports = function () {

	  // Don't use `new SIP.EventEmitter()` for inheriting.
	  // Use Object.create(SIP.EventEmitter.prototoype);
	  function EventEmitter() {
	    NodeEventEmitter.call(this);
	  }

	  EventEmitter.prototype = Object.create(NodeEventEmitter.prototype, {
	    constructor: {
	      value: EventEmitter,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });

	  return EventEmitter;
	};

	/***/ }),
	/* 6 */
	/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


	/***/ }),
	/* 7 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview SIP Constants
	 */

	/**
	 * SIP Constants.
	 * @augments SIP
	 */

	module.exports = function (name, version) {
	  return {
	    USER_AGENT: name + '/' + version,

	    // SIP scheme
	    SIP: 'sip',
	    SIPS: 'sips',

	    // End and Failure causes
	    causes: {
	      // Generic error causes
	      CONNECTION_ERROR: 'Connection Error',
	      REQUEST_TIMEOUT: 'Request Timeout',
	      SIP_FAILURE_CODE: 'SIP Failure Code',
	      INTERNAL_ERROR: 'Internal Error',

	      // SIP error causes
	      BUSY: 'Busy',
	      REJECTED: 'Rejected',
	      REDIRECTED: 'Redirected',
	      UNAVAILABLE: 'Unavailable',
	      NOT_FOUND: 'Not Found',
	      ADDRESS_INCOMPLETE: 'Address Incomplete',
	      INCOMPATIBLE_SDP: 'Incompatible SDP',
	      AUTHENTICATION_ERROR: 'Authentication Error',
	      DIALOG_ERROR: 'Dialog Error',

	      // Session error causes
	      WEBRTC_NOT_SUPPORTED: 'WebRTC Not Supported',
	      WEBRTC_ERROR: 'WebRTC Error',
	      CANCELED: 'Canceled',
	      NO_ANSWER: 'No Answer',
	      EXPIRES: 'Expires',
	      NO_ACK: 'No ACK',
	      NO_PRACK: 'No PRACK',
	      USER_DENIED_MEDIA_ACCESS: 'User Denied Media Access',
	      BAD_MEDIA_DESCRIPTION: 'Bad Media Description',
	      RTP_TIMEOUT: 'RTP Timeout'
	    },

	    supported: {
	      UNSUPPORTED: 'none',
	      SUPPORTED: 'supported',
	      REQUIRED: 'required'
	    },

	    SIP_ERROR_CAUSES: {
	      REDIRECTED: [300, 301, 302, 305, 380],
	      BUSY: [486, 600],
	      REJECTED: [403, 603],
	      NOT_FOUND: [404, 604],
	      UNAVAILABLE: [480, 410, 408, 430],
	      ADDRESS_INCOMPLETE: [484],
	      INCOMPATIBLE_SDP: [488, 606],
	      AUTHENTICATION_ERROR: [401, 407]
	    },

	    // SIP Methods
	    ACK: 'ACK',
	    BYE: 'BYE',
	    CANCEL: 'CANCEL',
	    INFO: 'INFO',
	    INVITE: 'INVITE',
	    MESSAGE: 'MESSAGE',
	    NOTIFY: 'NOTIFY',
	    OPTIONS: 'OPTIONS',
	    REGISTER: 'REGISTER',
	    UPDATE: 'UPDATE',
	    SUBSCRIBE: 'SUBSCRIBE',
	    PUBLISH: 'PUBLISH',
	    REFER: 'REFER',
	    PRACK: 'PRACK',

	    /* SIP Response Reasons
	     * DOC: http://www.iana.org/assignments/sip-parameters
	     * Copied from https://github.com/versatica/OverSIP/blob/master/lib/oversip/sip/constants.rb#L7
	     */
	    REASON_PHRASE: {
	      100: 'Trying',
	      180: 'Ringing',
	      181: 'Call Is Being Forwarded',
	      182: 'Queued',
	      183: 'Session Progress',
	      199: 'Early Dialog Terminated', // draft-ietf-sipcore-199
	      200: 'OK',
	      202: 'Accepted', // RFC 3265
	      204: 'No Notification', //RFC 5839
	      300: 'Multiple Choices',
	      301: 'Moved Permanently',
	      302: 'Moved Temporarily',
	      305: 'Use Proxy',
	      380: 'Alternative Service',
	      400: 'Bad Request',
	      401: 'Unauthorized',
	      402: 'Payment Required',
	      403: 'Forbidden',
	      404: 'Not Found',
	      405: 'Method Not Allowed',
	      406: 'Not Acceptable',
	      407: 'Proxy Authentication Required',
	      408: 'Request Timeout',
	      410: 'Gone',
	      412: 'Conditional Request Failed', // RFC 3903
	      413: 'Request Entity Too Large',
	      414: 'Request-URI Too Long',
	      415: 'Unsupported Media Type',
	      416: 'Unsupported URI Scheme',
	      417: 'Unknown Resource-Priority', // RFC 4412
	      420: 'Bad Extension',
	      421: 'Extension Required',
	      422: 'Session Interval Too Small', // RFC 4028
	      423: 'Interval Too Brief',
	      428: 'Use Identity Header', // RFC 4474
	      429: 'Provide Referrer Identity', // RFC 3892
	      430: 'Flow Failed', // RFC 5626
	      433: 'Anonymity Disallowed', // RFC 5079
	      436: 'Bad Identity-Info', // RFC 4474
	      437: 'Unsupported Certificate', // RFC 4744
	      438: 'Invalid Identity Header', // RFC 4744
	      439: 'First Hop Lacks Outbound Support', // RFC 5626
	      440: 'Max-Breadth Exceeded', // RFC 5393
	      469: 'Bad Info Package', // draft-ietf-sipcore-info-events
	      470: 'Consent Needed', // RFC 5360
	      478: 'Unresolvable Destination', // Custom code copied from Kamailio.
	      480: 'Temporarily Unavailable',
	      481: 'Call/Transaction Does Not Exist',
	      482: 'Loop Detected',
	      483: 'Too Many Hops',
	      484: 'Address Incomplete',
	      485: 'Ambiguous',
	      486: 'Busy Here',
	      487: 'Request Terminated',
	      488: 'Not Acceptable Here',
	      489: 'Bad Event', // RFC 3265
	      491: 'Request Pending',
	      493: 'Undecipherable',
	      494: 'Security Agreement Required', // RFC 3329
	      500: 'Internal Server Error',
	      501: 'Not Implemented',
	      502: 'Bad Gateway',
	      503: 'Service Unavailable',
	      504: 'Server Time-out',
	      505: 'Version Not Supported',
	      513: 'Message Too Large',
	      580: 'Precondition Failure', // RFC 3312
	      600: 'Busy Everywhere',
	      603: 'Decline',
	      604: 'Does Not Exist Anywhere',
	      606: 'Not Acceptable'
	    },

	    /* SIP Option Tags
	     * DOC: http://www.iana.org/assignments/sip-parameters/sip-parameters.xhtml#sip-parameters-4
	     */
	    OPTION_TAGS: {
	      '100rel': true, // RFC 3262
	      199: true, // RFC 6228
	      answermode: true, // RFC 5373
	      'early-session': true, // RFC 3959
	      eventlist: true, // RFC 4662
	      explicitsub: true, // RFC-ietf-sipcore-refer-explicit-subscription-03
	      'from-change': true, // RFC 4916
	      'geolocation-http': true, // RFC 6442
	      'geolocation-sip': true, // RFC 6442
	      gin: true, // RFC 6140
	      gruu: true, // RFC 5627
	      histinfo: true, // RFC 7044
	      ice: true, // RFC 5768
	      join: true, // RFC 3911
	      'multiple-refer': true, // RFC 5368
	      norefersub: true, // RFC 4488
	      nosub: true, // RFC-ietf-sipcore-refer-explicit-subscription-03
	      outbound: true, // RFC 5626
	      path: true, // RFC 3327
	      policy: true, // RFC 6794
	      precondition: true, // RFC 3312
	      pref: true, // RFC 3840
	      privacy: true, // RFC 3323
	      'recipient-list-invite': true, // RFC 5366
	      'recipient-list-message': true, // RFC 5365
	      'recipient-list-subscribe': true, // RFC 5367
	      replaces: true, // RFC 3891
	      'resource-priority': true, // RFC 4412
	      'sdp-anat': true, // RFC 4092
	      'sec-agree': true, // RFC 3329
	      tdialog: true, // RFC 4538
	      timer: true, // RFC 4028
	      uui: true // RFC 7433
	    },

	    dtmfType: {
	      INFO: 'info',
	      RTP: 'rtp'
	    }
	  };
	};

	/***/ }),
	/* 8 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview Exceptions
	 */

	/**
	 * SIP Exceptions.
	 * @augments SIP
	 */

	module.exports = {
	  ConfigurationError: function () {
	    var exception = function exception(parameter, value) {
	      this.code = 1;
	      this.name = 'CONFIGURATION_ERROR';
	      this.parameter = parameter;
	      this.value = value;
	      this.message = !this.value ? 'Missing parameter: ' + this.parameter : 'Invalid value ' + JSON.stringify(this.value) + ' for parameter "' + this.parameter + '"';
	    };
	    exception.prototype = new Error();
	    return exception;
	  }(),

	  InvalidStateError: function () {
	    var exception = function exception(status) {
	      this.code = 2;
	      this.name = 'INVALID_STATE_ERROR';
	      this.status = status;
	      this.message = 'Invalid status: ' + status;
	    };
	    exception.prototype = new Error();
	    return exception;
	  }(),

	  NotSupportedError: function () {
	    var exception = function exception(message) {
	      this.code = 3;
	      this.name = 'NOT_SUPPORTED_ERROR';
	      this.message = message;
	    };
	    exception.prototype = new Error();
	    return exception;
	  }(),

	  GetDescriptionError: function () {
	    var exception = function exception(message) {
	      this.code = 4;
	      this.name = 'GET_DESCRIPTION_ERROR';
	      this.message = message;
	    };
	    exception.prototype = new Error();
	    return exception;
	  }(),

	  RenegotiationError: function () {
	    var exception = function exception(message) {
	      this.code = 5;
	      this.name = 'RENEGOTIATION_ERROR';
	      this.message = message;
	    };
	    exception.prototype = new Error();
	    return exception;
	  }(),

	  MethodParameterError: function () {
	    var exception = function exception(method, parameter, value) {
	      this.code = 6;
	      this.name = 'METHOD_PARAMETER_ERROR';
	      this.method = method;
	      this.parameter = parameter;
	      this.value = value;
	      this.message = !this.value ? 'Missing parameter: ' + this.parameter : 'Invalid value ' + JSON.stringify(this.value) + ' for parameter "' + this.parameter + '"';
	    };
	    exception.prototype = new Error();
	    return exception;
	  }(),

	  TransportError: function () {
	    var exception = function exception(message) {
	      this.code = 7;
	      this.name = 'TRANSPORT_ERROR';
	      this.message = message;
	    };
	    exception.prototype = new Error();
	    return exception;
	  }()
	};

	/***/ }),
	/* 9 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview SIP TIMERS
	 */

	/**
	 * @augments SIP
	 */

	var T1 = 500,
	    T2 = 4000,
	    T4 = 5000;
	module.exports = function (timers) {
	  var Timers = {
	    T1: T1,
	    T2: T2,
	    T4: T4,
	    TIMER_B: 64 * T1,
	    TIMER_D: 0 * T1,
	    TIMER_F: 64 * T1,
	    TIMER_H: 64 * T1,
	    TIMER_I: 0 * T1,
	    TIMER_J: 0 * T1,
	    TIMER_K: 0 * T4,
	    TIMER_L: 64 * T1,
	    TIMER_M: 64 * T1,
	    TIMER_N: 64 * T1,
	    PROVISIONAL_RESPONSE_INTERVAL: 60000 // See RFC 3261 Section 13.3.1.1
	  };

	  ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'].forEach(function (name) {
	    // can't just use timers[name].bind(timers) since it bypasses jasmine's
	    // clock-mocking
	    Timers[name] = function () {
	      return timers[name].apply(timers, arguments);
	    };
	  });

	  return Timers;
	};

	/***/ }),
	/* 10 */
	/***/ (function(module, exports, __webpack_require__) {

	/* eslint-disable */
	/**
	 * @fileoverview Transport
	 */

	/* Transport
	 * @class Abstract transport layer parent class
	 * @param {Logger} logger
	 * @param {Object} [options]
	 */

	module.exports = function (SIP) {
	  var Transport = function Transport(logger, options) {};

	  Transport.prototype = Object.create(SIP.EventEmitter.prototype, {

	    /**
	    * Returns the promise designated by the child layer then emits a connected event. Automatically emits an event upon resolution, unless overrideEvent is set. If you override the event in this fashion, you should emit it in your implementation of connectPromise
	    * @param {Object} [options]
	    * @returns {Promise}
	    */
	    connect: { writable: true, value: function connect(options) {
	        options = options || {};
	        return this.connectPromise(options).then(function (data) {
	          !data.overrideEvent && this.emit('connected');
	        }.bind(this));
	      } },

	    /**
	    * Called by connect, must return a promise
	    * promise must resolve to an object. object supports 1 parameter: overrideEvent - Boolean
	    * @abstract
	    * @private
	    * @param {Object} [options]
	    * @returns {Promise}
	    */
	    connectPromise: { writable: true, value: function connectPromise(options) {} },

	    /**
	    * Returns true if the transport is connected
	    * @abstract
	    * @returns {Boolean}
	    */
	    isConnected: { writable: true, value: function isConnected() {} },

	    /**
	    * Sends a message then emits a 'messageSent' event. Automatically emits an event upon resolution, unless data.overrideEvent is set. If you override the event in this fashion, you should emit it in your implementation of sendPromise
	    * @param {SIP.OutgoingRequest|String} msg
	    * @param {Object} options
	    * @returns {Promise}
	    */
	    send: { writable: true, value: function send(msg, options) {
	        options = options || {};
	        return this.sendPromise(msg).then(function (data) {
	          !data.overrideEvent && this.emit('messageSent', data.msg);
	        }.bind(this));
	      } },

	    /**
	    * Called by send, must return a promise
	    * promise must resolve to an object. object supports 2 parameters: msg - string (mandatory) and overrideEvent - Boolean (optional)
	    * @abstract
	    * @private
	    * @param {SIP.OutgoingRequest|String} msg
	    * @param {Object} [options]
	    * @returns {Promise}
	    */
	    sendPromise: { writable: true, value: function sendPromise(msg, options) {} },

	    /**
	    * To be called when a message is received
	    * @abstract
	    * @param {Event} e
	    */
	    onMessage: { writable: true, value: function onMessage(e) {} },

	    /**
	    * Returns the promise designated by the child layer then emits a disconnected event. Automatically emits an event upon resolution, unless overrideEvent is set. If you override the event in this fashion, you should emit it in your implementation of disconnectPromise
	    * @param {Object} [options]
	    * @returns {Promise}
	    */
	    disconnect: { writable: true, value: function disconnect(options) {
	        options = options || {};
	        return this.disconnectPromise(options).then(function (data) {
	          !data.overrideEvent && this.emit('disconnected');
	        }.bind(this));
	      } },

	    /**
	    * Called by disconnect, must return a promise
	    * promise must resolve to an object. object supports 1 parameter: overrideEvent - Boolean
	    * @abstract
	    * @private
	    * @param {Object} [options]
	    * @returns {Promise}
	    */
	    disconnectPromise: { writable: true, value: function disconnectPromise(options) {} },

	    afterConnected: { writable: true, value: function afterConnected(callback) {
	        if (this.isConnected()) {
	          callback();
	        } else {
	          this.once('connected', callback);
	        }
	      } },

	    /**
	     * Returns a promise which resolves once the UA is connected. DEPRECATION WARNING: just use afterConnected()
	     * @returns {Promise}
	     */
	    waitForConnected: { writable: true, value: function waitForConnected() {
	        console.warn("DEPRECATION WARNING Transport.waitForConnected(): use afterConnected() instead");
	        return new SIP.Utils.Promise(function (resolve) {
	          this.afterConnected(resolve);
	        }.bind(this));
	      } }
	  });

	  return Transport;
	};

	/***/ }),
	/* 11 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview SIP Message Parser
	 */

	/**
	 * Extract and parse every header of a SIP message.
	 * @augments SIP
	 * @namespace
	 */

	module.exports = function (SIP) {
	  var Parser;

	  function getHeader(data, headerStart) {
	    var
	    // 'start' position of the header.
	    start = headerStart,

	    // 'end' position of the header.
	    end = 0,

	    // 'partial end' position of the header.
	    partialEnd = 0;

	    //End of message.
	    if (data.substring(start, start + 2).match(/(^\r\n)/)) {
	      return -2;
	    }

	    while (end === 0) {
	      // Partial End of Header.
	      partialEnd = data.indexOf('\r\n', start);

	      // 'indexOf' returns -1 if the value to be found never occurs.
	      if (partialEnd === -1) {
	        return partialEnd;
	      }

	      if (!data.substring(partialEnd + 2, partialEnd + 4).match(/(^\r\n)/) && data.charAt(partialEnd + 2).match(/(^\s+)/)) {
	        // Not the end of the message. Continue from the next position.
	        start = partialEnd + 2;
	      } else {
	        end = partialEnd;
	      }
	    }

	    return end;
	  }

	  function parseHeader(message, data, headerStart, headerEnd) {
	    var header,
	        idx,
	        length,
	        parsed,
	        hcolonIndex = data.indexOf(':', headerStart),
	        headerName = data.substring(headerStart, hcolonIndex).trim(),
	        headerValue = data.substring(hcolonIndex + 1, headerEnd).trim();

	    // If header-field is well-known, parse it.
	    switch (headerName.toLowerCase()) {
	      case 'via':
	      case 'v':
	        message.addHeader('via', headerValue);
	        if (message.getHeaders('via').length === 1) {
	          parsed = message.parseHeader('Via');
	          if (parsed) {
	            message.via = parsed;
	            message.via_branch = parsed.branch;
	          }
	        } else {
	          parsed = 0;
	        }
	        break;
	      case 'from':
	      case 'f':
	        message.setHeader('from', headerValue);
	        parsed = message.parseHeader('from');
	        if (parsed) {
	          message.from = parsed;
	          message.from_tag = parsed.getParam('tag');
	        }
	        break;
	      case 'to':
	      case 't':
	        message.setHeader('to', headerValue);
	        parsed = message.parseHeader('to');
	        if (parsed) {
	          message.to = parsed;
	          message.to_tag = parsed.getParam('tag');
	        }
	        break;
	      case 'record-route':
	        parsed = SIP.Grammar.parse(headerValue, 'Record_Route');

	        if (parsed === -1) {
	          parsed = undefined;
	          break;
	        }

	        length = parsed.length;
	        for (idx = 0; idx < length; idx++) {
	          header = parsed[idx];
	          message.addHeader('record-route', headerValue.substring(header.position, header.offset));
	          message.headers['Record-Route'][message.getHeaders('record-route').length - 1].parsed = header.parsed;
	        }
	        break;
	      case 'call-id':
	      case 'i':
	        message.setHeader('call-id', headerValue);
	        parsed = message.parseHeader('call-id');
	        if (parsed) {
	          message.call_id = headerValue;
	        }
	        break;
	      case 'contact':
	      case 'm':
	        parsed = SIP.Grammar.parse(headerValue, 'Contact');

	        if (parsed === -1) {
	          parsed = undefined;
	          break;
	        }

	        length = parsed.length;
	        for (idx = 0; idx < length; idx++) {
	          header = parsed[idx];
	          message.addHeader('contact', headerValue.substring(header.position, header.offset));
	          message.headers['Contact'][message.getHeaders('contact').length - 1].parsed = header.parsed;
	        }
	        break;
	      case 'content-length':
	      case 'l':
	        message.setHeader('content-length', headerValue);
	        parsed = message.parseHeader('content-length');
	        break;
	      case 'content-type':
	      case 'c':
	        message.setHeader('content-type', headerValue);
	        parsed = message.parseHeader('content-type');
	        break;
	      case 'cseq':
	        message.setHeader('cseq', headerValue);
	        parsed = message.parseHeader('cseq');
	        if (parsed) {
	          message.cseq = parsed.value;
	        }
	        if (message instanceof SIP.IncomingResponse) {
	          message.method = parsed.method;
	        }
	        break;
	      case 'max-forwards':
	        message.setHeader('max-forwards', headerValue);
	        parsed = message.parseHeader('max-forwards');
	        break;
	      case 'www-authenticate':
	        message.setHeader('www-authenticate', headerValue);
	        parsed = message.parseHeader('www-authenticate');
	        break;
	      case 'proxy-authenticate':
	        message.setHeader('proxy-authenticate', headerValue);
	        parsed = message.parseHeader('proxy-authenticate');
	        break;
	      case 'refer-to':
	      case 'r':
	        message.setHeader('refer-to', headerValue);
	        parsed = message.parseHeader('refer-to');
	        if (parsed) {
	          message.refer_to = parsed;
	        }
	        break;
	      default:
	        // Do not parse this header.
	        message.setHeader(headerName, headerValue);
	        parsed = 0;
	    }

	    if (parsed === undefined) {
	      return {
	        error: 'error parsing header "' + headerName + '"'
	      };
	    } else {
	      return true;
	    }
	  }

	  /** Parse SIP Message
	   * @function
	   * @param {String} message SIP message.
	   * @param {Object} logger object.
	   * @returns {SIP.IncomingRequest|SIP.IncomingResponse|undefined}
	   */
	  Parser = {};
	  Parser.parseMessage = function (data, ua) {
	    var message,
	        firstLine,
	        contentLength,
	        bodyStart,
	        parsed,
	        headerStart = 0,
	        headerEnd = data.indexOf('\r\n'),
	        logger = ua.getLogger('sip.parser');

	    if (headerEnd === -1) {
	      logger.warn('no CRLF found, not a SIP message, discarded');
	      return;
	    }

	    // Parse first line. Check if it is a Request or a Reply.
	    firstLine = data.substring(0, headerEnd);
	    parsed = SIP.Grammar.parse(firstLine, 'Request_Response');

	    if (parsed === -1) {
	      logger.warn('error parsing first line of SIP message: "' + firstLine + '"');
	      return;
	    } else if (!parsed.status_code) {
	      message = new SIP.IncomingRequest(ua);
	      message.method = parsed.method;
	      message.ruri = parsed.uri;
	    } else {
	      message = new SIP.IncomingResponse(ua);
	      message.status_code = parsed.status_code;
	      message.reason_phrase = parsed.reason_phrase;
	    }

	    message.data = data;
	    headerStart = headerEnd + 2;

	    /* Loop over every line in data. Detect the end of each header and parse
	    * it or simply add to the headers collection.
	    */
	    while (true) {
	      headerEnd = getHeader(data, headerStart);

	      // The SIP message has normally finished.
	      if (headerEnd === -2) {
	        bodyStart = headerStart + 2;
	        break;
	      }
	      // data.indexOf returned -1 due to a malformed message.
	      else if (headerEnd === -1) {
	          logger.error('malformed message');
	          return;
	        }

	      parsed = parseHeader(message, data, headerStart, headerEnd);

	      if (parsed !== true) {
	        logger.error(parsed.error);
	        return;
	      }

	      headerStart = headerEnd + 2;
	    }

	    /* RFC3261 18.3.
	     * If there are additional bytes in the transport packet
	     * beyond the end of the body, they MUST be discarded.
	     */
	    if (message.hasHeader('content-length')) {
	      contentLength = message.getHeader('content-length');
	      message.body = data.substr(bodyStart, contentLength);
	    } else {
	      message.body = data.substring(bodyStart);
	    }

	    return message;
	  };

	  SIP.Parser = Parser;
	};

	/***/ }),
	/* 12 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview SIP Message
	 */

	module.exports = function (SIP) {
	  var OutgoingRequest, IncomingMessage, IncomingRequest, IncomingResponse;

	  function getSupportedHeader(request) {
	    var allowUnregistered = request.ua.configuration.hackAllowUnregisteredOptionTags;
	    var optionTags = [];
	    var optionTagSet = {};

	    if (request.method === SIP.C.REGISTER) {
	      optionTags.push('path', 'gruu');
	    } else if (request.method === SIP.C.INVITE && (request.ua.contact.pub_gruu || request.ua.contact.temp_gruu)) {
	      optionTags.push('gruu');
	    }

	    if (request.ua.configuration.rel100 === SIP.C.supported.SUPPORTED) {
	      optionTags.push('100rel');
	    }
	    if (request.ua.configuration.replaces === SIP.C.supported.SUPPORTED) {
	      optionTags.push('replaces');
	    }

	    optionTags.push('outbound');

	    optionTags = optionTags.concat(request.ua.configuration.extraSupported);

	    optionTags = optionTags.filter(function (optionTag) {
	      var registered = SIP.C.OPTION_TAGS[optionTag];
	      var unique = !optionTagSet[optionTag];
	      optionTagSet[optionTag] = true;
	      return (registered || allowUnregistered) && unique;
	    });

	    return 'Supported: ' + optionTags.join(', ') + '\r\n';
	  }

	  /**
	   * @augments SIP
	   * @class Class for outgoing SIP request.
	   * @param {String} method request method
	   * @param {String} ruri request uri
	   * @param {SIP.UA} ua
	   * @param {Object} params parameters that will have priority over ua.configuration parameters:
	   * <br>
	   *  - cseq, call_id, from_tag, from_uri, from_displayName, to_uri, to_tag, route_set
	   * @param {Object} [headers] extra headers
	   * @param {String} [body]
	   */
	  OutgoingRequest = function OutgoingRequest(method, ruri, ua, params, extraHeaders, body) {
	    var to, from, call_id, cseq, to_uri, from_uri;

	    params = params || {};

	    // Mandatory parameters check
	    if (!method || !ruri || !ua) {
	      return null;
	    }

	    this.logger = ua.getLogger('sip.sipmessage');
	    this.ua = ua;
	    this.headers = {};
	    this.method = method;
	    this.ruri = ruri;
	    this.body = body;
	    this.extraHeaders = (extraHeaders || []).slice();
	    this.statusCode = params.status_code;
	    this.reasonPhrase = params.reason_phrase;

	    // Fill the Common SIP Request Headers

	    // Route
	    if (params.route_set) {
	      this.setHeader('route', params.route_set);
	    } else if (ua.configuration.usePreloadedRoute) {
	      this.setHeader('route', ua.transport.server.sip_uri);
	    }

	    // Via
	    // Empty Via header. Will be filled by the client transaction.
	    this.setHeader('via', '');

	    // Max-Forwards
	    this.setHeader('max-forwards', SIP.UA.C.MAX_FORWARDS);

	    // To
	    to_uri = params.to_uri || ruri;
	    to = params.to_displayName || params.to_displayName === 0 ? '"' + params.to_displayName + '" ' : '';
	    to += '<' + (to_uri && to_uri.toRaw ? to_uri.toRaw() : to_uri) + '>';
	    to += params.to_tag ? ';tag=' + params.to_tag : '';
	    this.to = new SIP.NameAddrHeader.parse(to);
	    this.setHeader('to', to);

	    // From
	    from_uri = params.from_uri || ua.configuration.uri;
	    if (params.from_displayName || params.from_displayName === 0) {
	      from = '"' + params.from_displayName + '" ';
	    } else if (ua.configuration.displayName) {
	      from = '"' + ua.configuration.displayName + '" ';
	    } else {
	      from = '';
	    }
	    from += '<' + (from_uri && from_uri.toRaw ? from_uri.toRaw() : from_uri) + '>;tag=';
	    from += params.from_tag || SIP.Utils.newTag();
	    this.from = new SIP.NameAddrHeader.parse(from);
	    this.setHeader('from', from);

	    // Call-ID
	    call_id = params.call_id || ua.configuration.sipjsId + SIP.Utils.createRandomToken(15);
	    this.call_id = call_id;
	    this.setHeader('call-id', call_id);

	    // CSeq
	    cseq = params.cseq || Math.floor(Math.random() * 10000);
	    this.cseq = cseq;
	    this.setHeader('cseq', cseq + ' ' + method);
	  };

	  OutgoingRequest.prototype = {
	    /**
	     * Replace the the given header by the given value.
	     * @param {String} name header name
	     * @param {String | Array} value header value
	     */
	    setHeader: function setHeader(name, value) {
	      this.headers[SIP.Utils.headerize(name)] = value instanceof Array ? value : [value];
	    },

	    /**
	     * Get the value of the given header name at the given position.
	     * @param {String} name header name
	     * @returns {String|undefined} Returns the specified header, undefined if header doesn't exist.
	     */
	    getHeader: function getHeader(name) {
	      var regexp,
	          idx,
	          length = this.extraHeaders.length,
	          header = this.headers[SIP.Utils.headerize(name)];

	      if (header) {
	        if (header[0]) {
	          return header[0];
	        }
	      } else {
	        regexp = new RegExp('^\\s*' + name + '\\s*:', 'i');
	        for (idx = 0; idx < length; idx++) {
	          header = this.extraHeaders[idx];
	          if (regexp.test(header)) {
	            return header.substring(header.indexOf(':') + 1).trim();
	          }
	        }
	      }

	      return;
	    },

	    /**
	     * Get the header/s of the given name.
	     * @param {String} name header name
	     * @returns {Array} Array with all the headers of the specified name.
	     */
	    getHeaders: function getHeaders(name) {
	      var idx,
	          length,
	          regexp,
	          header = this.headers[SIP.Utils.headerize(name)],
	          result = [];

	      if (header) {
	        length = header.length;
	        for (idx = 0; idx < length; idx++) {
	          result.push(header[idx]);
	        }
	        return result;
	      } else {
	        length = this.extraHeaders.length;
	        regexp = new RegExp('^\\s*' + name + '\\s*:', 'i');
	        for (idx = 0; idx < length; idx++) {
	          header = this.extraHeaders[idx];
	          if (regexp.test(header)) {
	            result.push(header.substring(header.indexOf(':') + 1).trim());
	          }
	        }
	        return result;
	      }
	    },

	    /**
	     * Verify the existence of the given header.
	     * @param {String} name header name
	     * @returns {boolean} true if header with given name exists, false otherwise
	     */
	    hasHeader: function hasHeader(name) {
	      var regexp,
	          idx,
	          length = this.extraHeaders.length;

	      if (this.headers[SIP.Utils.headerize(name)]) {
	        return true;
	      } else {
	        regexp = new RegExp('^\\s*' + name + '\\s*:', 'i');
	        for (idx = 0; idx < length; idx++) {
	          if (regexp.test(this.extraHeaders[idx])) {
	            return true;
	          }
	        }
	      }

	      return false;
	    },

	    toString: function toString() {
	      var msg = '',
	          header,
	          length,
	          idx;

	      msg += this.method + ' ' + (this.ruri.toRaw ? this.ruri.toRaw() : this.ruri) + ' SIP/2.0\r\n';

	      for (header in this.headers) {
	        length = this.headers[header].length;
	        for (idx = 0; idx < length; idx++) {
	          msg += header + ': ' + this.headers[header][idx] + '\r\n';
	        }
	      }

	      length = this.extraHeaders.length;
	      for (idx = 0; idx < length; idx++) {
	        msg += this.extraHeaders[idx].trim() + '\r\n';
	      }

	      msg += getSupportedHeader(this);
	      msg += 'User-Agent: ' + this.ua.configuration.userAgentString + '\r\n';

	      if (this.body) {
	        if (typeof this.body === 'string') {
	          length = SIP.Utils.str_utf8_length(this.body);
	          msg += 'Content-Length: ' + length + '\r\n\r\n';
	          msg += this.body;
	        } else {
	          if (this.body.body && this.body.contentType) {
	            length = SIP.Utils.str_utf8_length(this.body.body);
	            msg += 'Content-Type: ' + this.body.contentType + '\r\n';
	            msg += 'Content-Length: ' + length + '\r\n\r\n';
	            msg += this.body.body;
	          } else {
	            msg += 'Content-Length: ' + 0 + '\r\n\r\n';
	          }
	        }
	      } else {
	        msg += 'Content-Length: ' + 0 + '\r\n\r\n';
	      }

	      return msg;
	    }
	  };

	  /**
	   * @augments SIP
	   * @class Class for incoming SIP message.
	   */
	  IncomingMessage = function IncomingMessage() {
	    this.data = null;
	    this.headers = null;
	    this.method = null;
	    this.via = null;
	    this.via_branch = null;
	    this.call_id = null;
	    this.cseq = null;
	    this.from = null;
	    this.from_tag = null;
	    this.to = null;
	    this.to_tag = null;
	    this.body = null;
	  };

	  IncomingMessage.prototype = {
	    /**
	    * Insert a header of the given name and value into the last position of the
	    * header array.
	    * @param {String} name header name
	    * @param {String} value header value
	    */
	    addHeader: function addHeader(name, value) {
	      var header = { raw: value };

	      name = SIP.Utils.headerize(name);

	      if (this.headers[name]) {
	        this.headers[name].push(header);
	      } else {
	        this.headers[name] = [header];
	      }
	    },

	    /**
	     * Get the value of the given header name at the given position.
	     * @param {String} name header name
	     * @returns {String|undefined} Returns the specified header, null if header doesn't exist.
	     */
	    getHeader: function getHeader(name) {
	      var header = this.headers[SIP.Utils.headerize(name)];

	      if (header) {
	        if (header[0]) {
	          return header[0].raw;
	        }
	      } else {
	        return;
	      }
	    },

	    /**
	     * Get the header/s of the given name.
	     * @param {String} name header name
	     * @returns {Array} Array with all the headers of the specified name.
	     */
	    getHeaders: function getHeaders(name) {
	      var idx,
	          length,
	          header = this.headers[SIP.Utils.headerize(name)],
	          result = [];

	      if (!header) {
	        return [];
	      }

	      length = header.length;
	      for (idx = 0; idx < length; idx++) {
	        result.push(header[idx].raw);
	      }

	      return result;
	    },

	    /**
	     * Verify the existence of the given header.
	     * @param {String} name header name
	     * @returns {boolean} true if header with given name exists, false otherwise
	     */
	    hasHeader: function hasHeader(name) {
	      return this.headers[SIP.Utils.headerize(name)] ? true : false;
	    },

	    /**
	    * Parse the given header on the given index.
	    * @param {String} name header name
	    * @param {Number} [idx=0] header index
	    * @returns {Object|undefined} Parsed header object, undefined if the header is not present or in case of a parsing error.
	    */
	    parseHeader: function parseHeader(name, idx) {
	      var header, value, parsed;

	      name = SIP.Utils.headerize(name);

	      idx = idx || 0;

	      if (!this.headers[name]) {
	        this.logger.log('header "' + name + '" not present');
	        return;
	      } else if (idx >= this.headers[name].length) {
	        this.logger.log('not so many "' + name + '" headers present');
	        return;
	      }

	      header = this.headers[name][idx];
	      value = header.raw;

	      if (header.parsed) {
	        return header.parsed;
	      }

	      //substitute '-' by '_' for grammar rule matching.
	      parsed = SIP.Grammar.parse(value, name.replace(/-/g, '_'));

	      if (parsed === -1) {
	        this.headers[name].splice(idx, 1); //delete from headers
	        this.logger.warn('error parsing "' + name + '" header field with value "' + value + '"');
	        return;
	      } else {
	        header.parsed = parsed;
	        return parsed;
	      }
	    },

	    /**
	     * Message Header attribute selector. Alias of parseHeader.
	     * @param {String} name header name
	     * @param {Number} [idx=0] header index
	     * @returns {Object|undefined} Parsed header object, undefined if the header is not present or in case of a parsing error.
	     *
	     * @example
	     * message.s('via',3).port
	     */
	    s: function s(name, idx) {
	      return this.parseHeader(name, idx);
	    },

	    /**
	    * Replace the value of the given header by the value.
	    * @param {String} name header name
	    * @param {String} value header value
	    */
	    setHeader: function setHeader(name, value) {
	      var header = { raw: value };
	      this.headers[SIP.Utils.headerize(name)] = [header];
	    },

	    toString: function toString() {
	      return this.data;
	    }
	  };

	  /**
	   * @augments IncomingMessage
	   * @class Class for incoming SIP request.
	   */
	  IncomingRequest = function IncomingRequest(ua) {
	    this.logger = ua.getLogger('sip.sipmessage');
	    this.ua = ua;
	    this.headers = {};
	    this.ruri = null;
	    this.transport = null;
	    this.server_transaction = null;
	  };
	  IncomingRequest.prototype = new IncomingMessage();

	  /**
	  * Stateful reply.
	  * @param {Number} code status code
	  * @param {String} reason reason phrase
	  * @param {Object} headers extra headers
	  * @param {String} body body
	  * @param {Function} [onSuccess] onSuccess callback
	  * @param {Function} [onFailure] onFailure callback
	  */
	  // TODO: Get rid of callbacks and make promise based
	  IncomingRequest.prototype.reply = function (code, reason, extraHeaders, body, onSuccess, onFailure) {
	    var rr,
	        vias,
	        length,
	        idx,
	        response,
	        to = this.getHeader('To'),
	        r = 0,
	        v = 0;

	    response = SIP.Utils.buildStatusLine(code, reason);
	    extraHeaders = (extraHeaders || []).slice();

	    if (this.method === SIP.C.INVITE && code > 100 && code <= 200) {
	      rr = this.getHeaders('record-route');
	      length = rr.length;

	      for (r; r < length; r++) {
	        response += 'Record-Route: ' + rr[r] + '\r\n';
	      }
	    }

	    vias = this.getHeaders('via');
	    length = vias.length;

	    for (v; v < length; v++) {
	      response += 'Via: ' + vias[v] + '\r\n';
	    }

	    if (!this.to_tag && code > 100) {
	      to += ';tag=' + SIP.Utils.newTag();
	    } else if (this.to_tag && !this.s('to').hasParam('tag')) {
	      to += ';tag=' + this.to_tag;
	    }

	    response += 'To: ' + to + '\r\n';
	    response += 'From: ' + this.getHeader('From') + '\r\n';
	    response += 'Call-ID: ' + this.call_id + '\r\n';
	    response += 'CSeq: ' + this.cseq + ' ' + this.method + '\r\n';

	    length = extraHeaders.length;
	    for (idx = 0; idx < length; idx++) {
	      response += extraHeaders[idx].trim() + '\r\n';
	    }

	    response += getSupportedHeader(this);
	    response += 'User-Agent: ' + this.ua.configuration.userAgentString + '\r\n';

	    if (body) {
	      if (typeof body === 'string') {
	        length = SIP.Utils.str_utf8_length(body);
	        response += 'Content-Type: application/sdp\r\n';
	        response += 'Content-Length: ' + length + '\r\n\r\n';
	        response += body;
	      } else {
	        if (body.body && body.contentType) {
	          length = SIP.Utils.str_utf8_length(body.body);
	          response += 'Content-Type: ' + body.contentType + '\r\n';
	          response += 'Content-Length: ' + length + '\r\n\r\n';
	          response += body.body;
	        } else {
	          response += 'Content-Length: ' + 0 + '\r\n\r\n';
	        }
	      }
	    } else {
	      response += 'Content-Length: ' + 0 + '\r\n\r\n';
	    }

	    this.server_transaction.receiveResponse(code, response).then(onSuccess, onFailure);

	    return response;
	  };

	  /**
	  * Stateless reply.
	  * @param {Number} code status code
	  * @param {String} reason reason phrase
	  */
	  IncomingRequest.prototype.reply_sl = function (code, reason) {
	    var to,
	        response,
	        v = 0,
	        vias = this.getHeaders('via'),
	        length = vias.length;

	    response = SIP.Utils.buildStatusLine(code, reason);

	    for (v; v < length; v++) {
	      response += 'Via: ' + vias[v] + '\r\n';
	    }

	    to = this.getHeader('To');

	    if (!this.to_tag && code > 100) {
	      to += ';tag=' + SIP.Utils.newTag();
	    } else if (this.to_tag && !this.s('to').hasParam('tag')) {
	      to += ';tag=' + this.to_tag;
	    }

	    response += 'To: ' + to + '\r\n';
	    response += 'From: ' + this.getHeader('From') + '\r\n';
	    response += 'Call-ID: ' + this.call_id + '\r\n';
	    response += 'CSeq: ' + this.cseq + ' ' + this.method + '\r\n';
	    response += 'User-Agent: ' + this.ua.configuration.userAgentString + '\r\n';
	    response += 'Content-Length: ' + 0 + '\r\n\r\n';

	    this.transport.send(response);
	  };

	  /**
	   * @augments IncomingMessage
	   * @class Class for incoming SIP response.
	   */
	  IncomingResponse = function IncomingResponse(ua) {
	    this.logger = ua.getLogger('sip.sipmessage');
	    this.headers = {};
	    this.status_code = null;
	    this.reason_phrase = null;
	  };
	  IncomingResponse.prototype = new IncomingMessage();

	  SIP.OutgoingRequest = OutgoingRequest;
	  SIP.IncomingRequest = IncomingRequest;
	  SIP.IncomingResponse = IncomingResponse;
	};

	/***/ }),
	/* 13 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview SIP URI
	 */

	/**
	 * @augments SIP
	 * @class Class creating a SIP URI.
	 *
	 * @param {String} [scheme]
	 * @param {String} [user]
	 * @param {String} host
	 * @param {String} [port]
	 * @param {Object} [parameters]
	 * @param {Object} [headers]
	 *
	 */

	module.exports = function (SIP) {
	  var URI;

	  URI = function URI(scheme, user, host, port, parameters, headers) {
	    var param, header, raw, normal;

	    // Checks
	    if (!host) {
	      throw new TypeError('missing or invalid "host" parameter');
	    }

	    // Initialize parameters
	    scheme = scheme || SIP.C.SIP;
	    this.parameters = {};
	    this.headers = {};

	    for (param in parameters) {
	      this.setParam(param, parameters[param]);
	    }

	    for (header in headers) {
	      this.setHeader(header, headers[header]);
	    }

	    // Raw URI
	    raw = {
	      scheme: scheme,
	      user: user,
	      host: host,
	      port: port
	    };

	    // Normalized URI
	    normal = {
	      scheme: scheme.toLowerCase(),
	      user: user,
	      host: host.toLowerCase(),
	      port: port
	    };

	    Object.defineProperties(this, {
	      _normal: {
	        get: function get() {
	          return normal;
	        }
	      },

	      _raw: {
	        get: function get() {
	          return raw;
	        }
	      },

	      scheme: {
	        get: function get() {
	          return normal.scheme;
	        },
	        set: function set(value) {
	          raw.scheme = value;
	          normal.scheme = value.toLowerCase();
	        }
	      },

	      user: {
	        get: function get() {
	          return normal.user;
	        },
	        set: function set(value) {
	          normal.user = raw.user = value;
	        }
	      },

	      host: {
	        get: function get() {
	          return normal.host;
	        },
	        set: function set(value) {
	          raw.host = value;
	          normal.host = value.toLowerCase();
	        }
	      },

	      aor: {
	        get: function get() {
	          return normal.user + '@' + normal.host;
	        }
	      },

	      port: {
	        get: function get() {
	          return normal.port;
	        },
	        set: function set(value) {
	          normal.port = raw.port = value === 0 ? value : parseInt(value, 10) || null;
	        }
	      }
	    });
	  };

	  URI.prototype = {
	    setParam: function setParam(key, value) {
	      if (key) {
	        this.parameters[key.toLowerCase()] = typeof value === 'undefined' || value === null ? null : value.toString().toLowerCase();
	      }
	    },

	    getParam: function getParam(key) {
	      if (key) {
	        return this.parameters[key.toLowerCase()];
	      }
	    },

	    hasParam: function hasParam(key) {
	      if (key) {
	        return this.parameters.hasOwnProperty(key.toLowerCase()) && true || false;
	      }
	    },

	    deleteParam: function deleteParam(parameter) {
	      var value;
	      parameter = parameter.toLowerCase();
	      if (this.parameters.hasOwnProperty(parameter)) {
	        value = this.parameters[parameter];
	        delete this.parameters[parameter];
	        return value;
	      }
	    },

	    clearParams: function clearParams() {
	      this.parameters = {};
	    },

	    setHeader: function setHeader(name, value) {
	      this.headers[SIP.Utils.headerize(name)] = value instanceof Array ? value : [value];
	    },

	    getHeader: function getHeader(name) {
	      if (name) {
	        return this.headers[SIP.Utils.headerize(name)];
	      }
	    },

	    hasHeader: function hasHeader(name) {
	      if (name) {
	        return this.headers.hasOwnProperty(SIP.Utils.headerize(name)) && true || false;
	      }
	    },

	    deleteHeader: function deleteHeader(header) {
	      var value;
	      header = SIP.Utils.headerize(header);
	      if (this.headers.hasOwnProperty(header)) {
	        value = this.headers[header];
	        delete this.headers[header];
	        return value;
	      }
	    },

	    clearHeaders: function clearHeaders() {
	      this.headers = {};
	    },

	    clone: function clone() {
	      return new URI(this._raw.scheme, this._raw.user, this._raw.host, this._raw.port, JSON.parse(JSON.stringify(this.parameters)), JSON.parse(JSON.stringify(this.headers)));
	    },

	    toRaw: function toRaw() {
	      return this._toString(this._raw);
	    },

	    toString: function toString() {
	      return this._toString(this._normal);
	    },

	    _toString: function _toString(uri) {
	      var header,
	          parameter,
	          idx,
	          uriString,
	          headers = [];

	      uriString = uri.scheme + ':';
	      // add slashes if it's not a sip(s) URI
	      if (!uri.scheme.toLowerCase().match("^sips?$")) {
	        uriString += "//";
	      }
	      if (uri.user) {
	        uriString += SIP.Utils.escapeUser(uri.user) + '@';
	      }
	      uriString += uri.host;
	      if (uri.port || uri.port === 0) {
	        uriString += ':' + uri.port;
	      }

	      for (parameter in this.parameters) {
	        uriString += ';' + parameter;

	        if (this.parameters[parameter] !== null) {
	          uriString += '=' + this.parameters[parameter];
	        }
	      }

	      for (header in this.headers) {
	        for (idx in this.headers[header]) {
	          headers.push(header + '=' + this.headers[header][idx]);
	        }
	      }

	      if (headers.length > 0) {
	        uriString += '?' + headers.join('&');
	      }

	      return uriString;
	    }
	  };

	  /**
	    * Parse the given string and returns a SIP.URI instance or undefined if
	    * it is an invalid URI.
	    * @public
	    * @param {String} uri
	    */
	  URI.parse = function (uri) {
	    uri = SIP.Grammar.parse(uri, 'SIP_URI');

	    if (uri !== -1) {
	      return uri;
	    } else {
	      return undefined;
	    }
	  };

	  SIP.URI = URI;
	};

	/***/ }),
	/* 14 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview SIP NameAddrHeader
	 */

	/**
	 * @augments SIP
	 * @class Class creating a Name Address SIP header.
	 *
	 * @param {SIP.URI} uri
	 * @param {String} [displayName]
	 * @param {Object} [parameters]
	 *
	 */

	module.exports = function (SIP) {
	  var NameAddrHeader;

	  NameAddrHeader = function NameAddrHeader(uri, displayName, parameters) {
	    var param;

	    // Checks
	    if (!uri || !(uri instanceof SIP.URI)) {
	      throw new TypeError('missing or invalid "uri" parameter');
	    }

	    // Initialize parameters
	    this.uri = uri;
	    this.parameters = {};

	    for (param in parameters) {
	      this.setParam(param, parameters[param]);
	    }

	    Object.defineProperties(this, {
	      friendlyName: {
	        get: function get() {
	          return this.displayName || uri.aor;
	        }
	      },

	      displayName: {
	        get: function get() {
	          return displayName;
	        },
	        set: function set(value) {
	          displayName = value === 0 ? '0' : value;
	        }
	      }
	    });
	  };
	  NameAddrHeader.prototype = {
	    setParam: function setParam(key, value) {
	      if (key) {
	        this.parameters[key.toLowerCase()] = typeof value === 'undefined' || value === null ? null : value.toString();
	      }
	    },
	    getParam: SIP.URI.prototype.getParam,
	    hasParam: SIP.URI.prototype.hasParam,
	    deleteParam: SIP.URI.prototype.deleteParam,
	    clearParams: SIP.URI.prototype.clearParams,

	    clone: function clone() {
	      return new NameAddrHeader(this.uri.clone(), this.displayName, JSON.parse(JSON.stringify(this.parameters)));
	    },

	    toString: function toString() {
	      var body, parameter;

	      body = this.displayName || this.displayName === 0 ? '"' + this.displayName + '" ' : '';
	      body += '<' + this.uri.toString() + '>';

	      for (parameter in this.parameters) {
	        body += ';' + parameter;

	        if (this.parameters[parameter] !== null) {
	          body += '=' + this.parameters[parameter];
	        }
	      }

	      return body;
	    }
	  };

	  /**
	    * Parse the given string and returns a SIP.NameAddrHeader instance or undefined if
	    * it is an invalid NameAddrHeader.
	    * @public
	    * @param {String} name_addr_header
	    */
	  NameAddrHeader.parse = function (name_addr_header) {
	    name_addr_header = SIP.Grammar.parse(name_addr_header, 'Name_Addr_Header');

	    if (name_addr_header !== -1) {
	      return name_addr_header;
	    } else {
	      return undefined;
	    }
	  };

	  SIP.NameAddrHeader = NameAddrHeader;
	};

	/***/ }),
	/* 15 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview SIP Transactions
	 */

	/**
	 * SIP Transactions module.
	 * @augments SIP
	 */

	module.exports = function (SIP) {
	  var C = {
	    // Transaction states
	    STATUS_TRYING: 1,
	    STATUS_PROCEEDING: 2,
	    STATUS_CALLING: 3,
	    STATUS_ACCEPTED: 4,
	    STATUS_COMPLETED: 5,
	    STATUS_TERMINATED: 6,
	    STATUS_CONFIRMED: 7,

	    // Transaction types
	    NON_INVITE_CLIENT: 'nict',
	    NON_INVITE_SERVER: 'nist',
	    INVITE_CLIENT: 'ict',
	    INVITE_SERVER: 'ist'
	  };

	  function buildViaHeader(request_sender, transport, id) {
	    var via;
	    via = 'SIP/2.0/' + (request_sender.ua.configuration.hackViaTcp ? 'TCP' : transport.server.scheme);
	    via += ' ' + request_sender.ua.configuration.viaHost + ';branch=' + id;
	    if (request_sender.ua.configuration.forceRport) {
	      via += ';rport';
	    }
	    return via;
	  }

	  /**
	  * @augments SIP.Transactions
	  * @class Non Invite Client Transaction
	  * @param {SIP.RequestSender} request_sender
	  * @param {SIP.OutgoingRequest} request
	  * @param {SIP.Transport} transport
	  */
	  var NonInviteClientTransaction = function NonInviteClientTransaction(request_sender, request, transport) {
	    var via;

	    this.type = C.NON_INVITE_CLIENT;
	    this.transport = transport;
	    this.id = 'z9hG4bK' + Math.floor(Math.random() * 10000000);
	    this.request_sender = request_sender;
	    this.request = request;

	    this.logger = request_sender.ua.getLogger('sip.transaction.nict', this.id);

	    via = buildViaHeader(request_sender, transport, this.id);
	    this.request.setHeader('via', via);

	    this.request_sender.ua.newTransaction(this);
	  };
	  NonInviteClientTransaction.prototype = Object.create(SIP.EventEmitter.prototype);

	  NonInviteClientTransaction.prototype.stateChanged = function (state) {
	    this.state = state;
	    this.emit('stateChanged');
	  };

	  NonInviteClientTransaction.prototype.send = function () {
	    var tr = this;

	    this.stateChanged(C.STATUS_TRYING);
	    this.F = SIP.Timers.setTimeout(tr.timer_F.bind(tr), SIP.Timers.TIMER_F);

	    this.transport.send(this.request).catch(function () {
	      this.onTransportError();
	    }.bind(this));
	  };

	  NonInviteClientTransaction.prototype.onTransportError = function () {
	    this.logger.log('transport error occurred, deleting non-INVITE client transaction ' + this.id);
	    SIP.Timers.clearTimeout(this.F);
	    SIP.Timers.clearTimeout(this.K);
	    this.stateChanged(C.STATUS_TERMINATED);
	    this.request_sender.ua.destroyTransaction(this);
	    this.request_sender.onTransportError();
	  };

	  NonInviteClientTransaction.prototype.timer_F = function () {
	    this.logger.debug('Timer F expired for non-INVITE client transaction ' + this.id);
	    this.stateChanged(C.STATUS_TERMINATED);
	    this.request_sender.ua.destroyTransaction(this);
	    this.request_sender.onRequestTimeout();
	  };

	  NonInviteClientTransaction.prototype.timer_K = function () {
	    this.stateChanged(C.STATUS_TERMINATED);
	    this.request_sender.ua.destroyTransaction(this);
	  };

	  NonInviteClientTransaction.prototype.receiveResponse = function (response) {
	    var tr = this,
	        status_code = response.status_code;

	    if (status_code < 200) {
	      switch (this.state) {
	        case C.STATUS_TRYING:
	        case C.STATUS_PROCEEDING:
	          this.stateChanged(C.STATUS_PROCEEDING);
	          this.request_sender.receiveResponse(response);
	          break;
	      }
	    } else {
	      switch (this.state) {
	        case C.STATUS_TRYING:
	        case C.STATUS_PROCEEDING:
	          this.stateChanged(C.STATUS_COMPLETED);
	          SIP.Timers.clearTimeout(this.F);

	          if (status_code === 408) {
	            this.request_sender.onRequestTimeout();
	          } else {
	            this.request_sender.receiveResponse(response);
	          }

	          this.K = SIP.Timers.setTimeout(tr.timer_K.bind(tr), SIP.Timers.TIMER_K);
	          break;
	        case C.STATUS_COMPLETED:
	          break;
	      }
	    }
	  };

	  /**
	  * @augments SIP.Transactions
	  * @class Invite Client Transaction
	  * @param {SIP.RequestSender} request_sender
	  * @param {SIP.OutgoingRequest} request
	  * @param {SIP.Transport} transport
	  */
	  var InviteClientTransaction = function InviteClientTransaction(request_sender, request, transport) {
	    var via,
	        tr = this;

	    this.type = C.INVITE_CLIENT;
	    this.transport = transport;
	    this.id = 'z9hG4bK' + Math.floor(Math.random() * 10000000);
	    this.request_sender = request_sender;
	    this.request = request;

	    this.logger = request_sender.ua.getLogger('sip.transaction.ict', this.id);

	    via = buildViaHeader(request_sender, transport, this.id);
	    this.request.setHeader('via', via);

	    this.request_sender.ua.newTransaction(this);

	    // Add the cancel property to the request.
	    //Will be called from the request instance, not the transaction itself.
	    this.request.cancel = function (reason, extraHeaders) {
	      extraHeaders = (extraHeaders || []).slice();
	      var length = extraHeaders.length;
	      var extraHeadersString = null;
	      for (var idx = 0; idx < length; idx++) {
	        extraHeadersString = (extraHeadersString || '') + extraHeaders[idx].trim() + '\r\n';
	      }

	      tr.cancel_request(tr, reason, extraHeadersString);
	    };
	  };
	  InviteClientTransaction.prototype = Object.create(SIP.EventEmitter.prototype);

	  InviteClientTransaction.prototype.stateChanged = function (state) {
	    this.state = state;
	    this.emit('stateChanged');
	  };

	  InviteClientTransaction.prototype.send = function () {
	    var tr = this;
	    this.stateChanged(C.STATUS_CALLING);
	    this.B = SIP.Timers.setTimeout(tr.timer_B.bind(tr), SIP.Timers.TIMER_B);

	    this.transport.send(this.request).catch(function () {
	      this.onTransportError();
	    }.bind(this));
	  };

	  InviteClientTransaction.prototype.onTransportError = function () {
	    this.logger.log('transport error occurred, deleting INVITE client transaction ' + this.id);
	    SIP.Timers.clearTimeout(this.B);
	    SIP.Timers.clearTimeout(this.D);
	    SIP.Timers.clearTimeout(this.M);
	    this.stateChanged(C.STATUS_TERMINATED);
	    this.request_sender.ua.destroyTransaction(this);

	    if (this.state !== C.STATUS_ACCEPTED) {
	      this.request_sender.onTransportError();
	    }
	  };

	  // RFC 6026 7.2
	  InviteClientTransaction.prototype.timer_M = function () {
	    this.logger.debug('Timer M expired for INVITE client transaction ' + this.id);

	    if (this.state === C.STATUS_ACCEPTED) {
	      SIP.Timers.clearTimeout(this.B);
	      this.stateChanged(C.STATUS_TERMINATED);
	      this.request_sender.ua.destroyTransaction(this);
	    }
	  };

	  // RFC 3261 17.1.1
	  InviteClientTransaction.prototype.timer_B = function () {
	    this.logger.debug('Timer B expired for INVITE client transaction ' + this.id);
	    if (this.state === C.STATUS_CALLING) {
	      this.stateChanged(C.STATUS_TERMINATED);
	      this.request_sender.ua.destroyTransaction(this);
	      this.request_sender.onRequestTimeout();
	    }
	  };

	  InviteClientTransaction.prototype.timer_D = function () {
	    this.logger.debug('Timer D expired for INVITE client transaction ' + this.id);
	    SIP.Timers.clearTimeout(this.B);
	    this.stateChanged(C.STATUS_TERMINATED);
	    this.request_sender.ua.destroyTransaction(this);
	  };

	  InviteClientTransaction.prototype.sendACK = function (options) {
	    // TODO: Move PRACK stuff into the transaction layer. That is really where it should be

	    var self = this,
	        ruri;
	    options = options || {};

	    if (this.response.getHeader('contact')) {
	      ruri = this.response.parseHeader('contact').uri;
	    } else {
	      ruri = this.request.ruri;
	    }
	    var ack = new SIP.OutgoingRequest("ACK", ruri, this.request.ua, {
	      cseq: this.response.cseq,
	      call_id: this.response.call_id,
	      from_uri: this.response.from.uri,
	      from_tag: this.response.from_tag,
	      to_uri: this.response.to.uri,
	      to_tag: this.response.to_tag,
	      route_set: this.response.getHeaders('record-route').reverse()
	    }, options.extraHeaders || [], options.body);

	    this.ackSender = new SIP.RequestSender({
	      request: ack,
	      onRequestTimeout: this.request_sender.applicant.applicant ? this.request_sender.applicant.applicant.onRequestTimeout : function () {
	        self.logger.warn("ACK Request timed out");
	      },
	      onTransportError: this.request_sender.applicant.applicant ? this.request_sender.applicant.applicant.onRequestTransportError : function () {
	        self.logger.warn("ACK Request had a transport error");
	      },
	      receiveResponse: options.receiveResponse || function () {
	        self.logger.warn("Received a response to an ACK which was unexpected. Dropping Response.");
	      }
	    }, this.request.ua).send();

	    return ack;
	  };

	  InviteClientTransaction.prototype.cancel_request = function (tr, reason, extraHeaders) {
	    var request = tr.request;

	    this.cancel = SIP.C.CANCEL + ' ' + request.ruri + ' SIP/2.0\r\n';
	    this.cancel += 'Via: ' + request.headers['Via'].toString() + '\r\n';

	    if (this.request.headers['Route']) {
	      this.cancel += 'Route: ' + request.headers['Route'].toString() + '\r\n';
	    }

	    this.cancel += 'To: ' + request.headers['To'].toString() + '\r\n';
	    this.cancel += 'From: ' + request.headers['From'].toString() + '\r\n';
	    this.cancel += 'Call-ID: ' + request.headers['Call-ID'].toString() + '\r\n';
	    this.cancel += 'Max-Forwards: ' + SIP.UA.C.MAX_FORWARDS + '\r\n';
	    this.cancel += 'CSeq: ' + request.headers['CSeq'].toString().split(' ')[0] + ' CANCEL\r\n';

	    if (reason) {
	      this.cancel += 'Reason: ' + reason + '\r\n';
	    }

	    if (extraHeaders) {
	      this.cancel += extraHeaders;
	    }

	    this.cancel += 'Content-Length: 0\r\n\r\n';

	    // Send only if a provisional response (>100) has been received.
	    if (this.state === C.STATUS_PROCEEDING) {
	      this.transport.send(this.cancel);
	    }
	  };

	  InviteClientTransaction.prototype.receiveResponse = function (response) {
	    var tr = this,
	        status_code = response.status_code;

	    // This may create a circular dependency...
	    response.transaction = this;

	    if (this.response && this.response.status_code === response.status_code && this.response.cseq === response.cseq) {
	      this.logger.debug("ICT Received a retransmission for cseq: " + response.cseq);
	      if (this.ackSender) {
	        this.ackSender.send();
	      }
	      return;
	    }
	    this.response = response;

	    if (status_code >= 100 && status_code <= 199) {
	      switch (this.state) {
	        case C.STATUS_CALLING:
	          this.stateChanged(C.STATUS_PROCEEDING);
	          this.request_sender.receiveResponse(response);
	          if (this.cancel) {
	            this.transport.send(this.cancel);
	          }
	          break;
	        case C.STATUS_PROCEEDING:
	          this.request_sender.receiveResponse(response);
	          break;
	      }
	    } else if (status_code >= 200 && status_code <= 299) {
	      switch (this.state) {
	        case C.STATUS_CALLING:
	        case C.STATUS_PROCEEDING:
	          this.stateChanged(C.STATUS_ACCEPTED);
	          this.M = SIP.Timers.setTimeout(tr.timer_M.bind(tr), SIP.Timers.TIMER_M);
	          this.request_sender.receiveResponse(response);
	          break;
	        case C.STATUS_ACCEPTED:
	          this.request_sender.receiveResponse(response);
	          break;
	      }
	    } else if (status_code >= 300 && status_code <= 699) {
	      switch (this.state) {
	        case C.STATUS_CALLING:
	        case C.STATUS_PROCEEDING:
	          this.stateChanged(C.STATUS_COMPLETED);
	          this.sendACK();
	          this.request_sender.receiveResponse(response);
	          break;
	        case C.STATUS_COMPLETED:
	          this.sendACK();
	          break;
	      }
	    }
	  };

	  /**
	   * @augments SIP.Transactions
	   * @class ACK Client Transaction
	   * @param {SIP.RequestSender} request_sender
	   * @param {SIP.OutgoingRequest} request
	   * @param {SIP.Transport} transport
	   */
	  var AckClientTransaction = function AckClientTransaction(request_sender, request, transport) {
	    var via;

	    this.transport = transport;
	    this.id = 'z9hG4bK' + Math.floor(Math.random() * 10000000);
	    this.request_sender = request_sender;
	    this.request = request;

	    this.logger = request_sender.ua.getLogger('sip.transaction.nict', this.id);

	    via = buildViaHeader(request_sender, transport, this.id);
	    this.request.setHeader('via', via);
	  };
	  AckClientTransaction.prototype = Object.create(SIP.EventEmitter.prototype);

	  AckClientTransaction.prototype.send = function () {
	    this.transport.send(this.request).catch(function () {
	      this.onTransportError();
	    }.bind(this));
	  };

	  AckClientTransaction.prototype.onTransportError = function () {
	    this.logger.log('transport error occurred, for an ACK client transaction ' + this.id);
	    this.request_sender.onTransportError();
	  };

	  /**
	  * @augments SIP.Transactions
	  * @class Non Invite Server Transaction
	  * @param {SIP.IncomingRequest} request
	  * @param {SIP.UA} ua
	  */
	  var NonInviteServerTransaction = function NonInviteServerTransaction(request, ua) {
	    this.type = C.NON_INVITE_SERVER;
	    this.id = request.via_branch;
	    this.request = request;
	    this.transport = ua.transport;
	    this.ua = ua;
	    this.last_response = '';
	    request.server_transaction = this;

	    this.logger = ua.getLogger('sip.transaction.nist', this.id);

	    this.state = C.STATUS_TRYING;

	    ua.newTransaction(this);
	  };
	  NonInviteServerTransaction.prototype = Object.create(SIP.EventEmitter.prototype);

	  NonInviteServerTransaction.prototype.stateChanged = function (state) {
	    this.state = state;
	    this.emit('stateChanged');
	  };

	  NonInviteServerTransaction.prototype.timer_J = function () {
	    this.logger.debug('Timer J expired for non-INVITE server transaction ' + this.id);
	    this.stateChanged(C.STATUS_TERMINATED);
	    this.ua.destroyTransaction(this);
	  };

	  NonInviteServerTransaction.prototype.onTransportError = function () {
	    if (!this.transportError) {
	      this.transportError = true;

	      this.logger.log('transport error occurred, deleting non-INVITE server transaction ' + this.id);

	      SIP.Timers.clearTimeout(this.J);
	      this.stateChanged(C.STATUS_TERMINATED);
	      this.ua.destroyTransaction(this);
	    }
	  };

	  NonInviteServerTransaction.prototype.receiveResponse = function (status_code, response) {
	    var tr = this;
	    var deferred = SIP.Utils.defer();

	    if (status_code === 100) {
	      /* RFC 4320 4.1
	       * 'A SIP element MUST NOT
	       * send any provisional response with a
	       * Status-Code other than 100 to a non-INVITE request.'
	       */
	      switch (this.state) {
	        case C.STATUS_TRYING:
	          this.stateChanged(C.STATUS_PROCEEDING);
	          this.transport.send(response).catch(function () {
	            this.onTransportError();
	          }.bind(this));
	          break;
	        case C.STATUS_PROCEEDING:
	          this.last_response = response;
	          this.transport.send(response).then(function () {
	            deferred.resolve();
	          }).catch(function () {
	            this.onTransportError();
	            deferred.reject();
	          }.bind(this));
	          break;
	      }
	    } else if (status_code >= 200 && status_code <= 699) {
	      switch (this.state) {
	        case C.STATUS_TRYING:
	        case C.STATUS_PROCEEDING:
	          this.stateChanged(C.STATUS_COMPLETED);
	          this.last_response = response;
	          this.J = SIP.Timers.setTimeout(tr.timer_J.bind(tr), SIP.Timers.TIMER_J);
	          this.transport.send(response).then(function () {
	            deferred.resolve();
	          }).catch(function () {
	            this.onTransportError();
	            deferred.reject();
	          }.bind(this));
	          break;
	        case C.STATUS_COMPLETED:
	          break;
	      }
	    }

	    return deferred.promise;
	  };

	  /**
	  * @augments SIP.Transactions
	  * @class Invite Server Transaction
	  * @param {SIP.IncomingRequest} request
	  * @param {SIP.UA} ua
	  */
	  var InviteServerTransaction = function InviteServerTransaction(request, ua) {
	    this.type = C.INVITE_SERVER;
	    this.id = request.via_branch;
	    this.request = request;
	    this.transport = ua.transport;
	    this.ua = ua;
	    this.last_response = '';
	    request.server_transaction = this;

	    this.logger = ua.getLogger('sip.transaction.ist', this.id);

	    this.state = C.STATUS_PROCEEDING;

	    ua.newTransaction(this);

	    this.resendProvisionalTimer = null;

	    request.reply(100);
	  };
	  InviteServerTransaction.prototype = Object.create(SIP.EventEmitter.prototype);

	  InviteServerTransaction.prototype.stateChanged = function (state) {
	    this.state = state;
	    this.emit('stateChanged');
	  };

	  InviteServerTransaction.prototype.timer_H = function () {
	    this.logger.debug('Timer H expired for INVITE server transaction ' + this.id);

	    if (this.state === C.STATUS_COMPLETED) {
	      this.logger.warn('transactions', 'ACK for INVITE server transaction was never received, call will be terminated');
	    }

	    this.stateChanged(C.STATUS_TERMINATED);
	    this.ua.destroyTransaction(this);
	  };

	  InviteServerTransaction.prototype.timer_I = function () {
	    this.stateChanged(C.STATUS_TERMINATED);
	    this.ua.destroyTransaction(this);
	  };

	  // RFC 6026 7.1
	  InviteServerTransaction.prototype.timer_L = function () {
	    this.logger.debug('Timer L expired for INVITE server transaction ' + this.id);

	    if (this.state === C.STATUS_ACCEPTED) {
	      this.stateChanged(C.STATUS_TERMINATED);
	      this.ua.destroyTransaction(this);
	    }
	  };

	  InviteServerTransaction.prototype.onTransportError = function () {
	    if (!this.transportError) {
	      this.transportError = true;

	      this.logger.log('transport error occurred, deleting INVITE server transaction ' + this.id);

	      if (this.resendProvisionalTimer !== null) {
	        SIP.Timers.clearInterval(this.resendProvisionalTimer);
	        this.resendProvisionalTimer = null;
	      }

	      SIP.Timers.clearTimeout(this.L);
	      SIP.Timers.clearTimeout(this.H);
	      SIP.Timers.clearTimeout(this.I);

	      this.stateChanged(C.STATUS_TERMINATED);
	      this.ua.destroyTransaction(this);
	    }
	  };

	  InviteServerTransaction.prototype.resend_provisional = function () {
	    this.transport.send(this.request).catch(function () {
	      this.onTransportError();
	    }.bind(this));
	  };

	  // INVITE Server Transaction RFC 3261 17.2.1
	  InviteServerTransaction.prototype.receiveResponse = function (status_code, response) {
	    var tr = this;
	    var deferred = SIP.Utils.defer();

	    if (status_code >= 100 && status_code <= 199) {
	      switch (this.state) {
	        case C.STATUS_PROCEEDING:
	          this.transport.send(response).catch(function () {
	            this.onTransportError();
	          }.bind(this));
	          this.last_response = response;
	          break;
	      }
	    }

	    if (status_code > 100 && status_code <= 199 && this.state === C.STATUS_PROCEEDING) {
	      // Trigger the resendProvisionalTimer only for the first non 100 provisional response.
	      if (this.resendProvisionalTimer === null) {
	        this.resendProvisionalTimer = SIP.Timers.setInterval(tr.resend_provisional.bind(tr), SIP.Timers.PROVISIONAL_RESPONSE_INTERVAL);
	      }
	    } else if (status_code >= 200 && status_code <= 299) {
	      switch (this.state) {
	        case C.STATUS_PROCEEDING:
	          this.stateChanged(C.STATUS_ACCEPTED);
	          this.last_response = response;
	          this.L = SIP.Timers.setTimeout(tr.timer_L.bind(tr), SIP.Timers.TIMER_L);

	          if (this.resendProvisionalTimer !== null) {
	            SIP.Timers.clearInterval(this.resendProvisionalTimer);
	            this.resendProvisionalTimer = null;
	          }
	        /* falls through */
	        case C.STATUS_ACCEPTED:
	          // Note that this point will be reached for proceeding tr.state also.
	          this.transport.send(response).then(function () {
	            deferred.resolve();
	          }).catch(function (error) {
	            this.logger.error(error);
	            this.onTransportError();
	            deferred.reject();
	          }.bind(this));
	          break;
	      }
	    } else if (status_code >= 300 && status_code <= 699) {
	      switch (this.state) {
	        case C.STATUS_PROCEEDING:
	          if (this.resendProvisionalTimer !== null) {
	            SIP.Timers.clearInterval(this.resendProvisionalTimer);
	            this.resendProvisionalTimer = null;
	          }
	          this.transport.send(response).then(function () {
	            this.stateChanged(C.STATUS_COMPLETED);
	            this.H = SIP.Timers.setTimeout(tr.timer_H.bind(tr), SIP.Timers.TIMER_H);
	            deferred.resolve();
	          }.bind(this)).catch(function (error) {
	            this.logger.error(error);
	            this.onTransportError();
	            deferred.reject();
	          }.bind(this));
	          break;
	      }
	    }

	    return deferred.promise;
	  };

	  /**
	   * @function
	   * @param {SIP.UA} ua
	   * @param {SIP.IncomingRequest} request
	   *
	   * @return {boolean}
	   * INVITE:
	   *  _true_ if retransmission
	   *  _false_ new request
	   *
	   * ACK:
	   *  _true_  ACK to non2xx response
	   *  _false_ ACK must be passed to TU (accepted state)
	   *          ACK to 2xx response
	   *
	   * CANCEL:
	   *  _true_  no matching invite transaction
	   *  _false_ matching invite transaction and no final response sent
	   *
	   * OTHER:
	   *  _true_  retransmission
	   *  _false_ new request
	   */
	  var checkTransaction = function checkTransaction(ua, request) {
	    var tr;

	    switch (request.method) {
	      case SIP.C.INVITE:
	        tr = ua.transactions.ist[request.via_branch];
	        if (tr) {
	          switch (tr.state) {
	            case C.STATUS_PROCEEDING:
	              tr.transport.send(tr.last_response);
	              break;

	            // RFC 6026 7.1 Invite retransmission
	            //received while in C.STATUS_ACCEPTED state. Absorb it.
	            case C.STATUS_ACCEPTED:
	              break;
	          }
	          return true;
	        }
	        break;
	      case SIP.C.ACK:
	        tr = ua.transactions.ist[request.via_branch];

	        // RFC 6026 7.1
	        if (tr) {
	          if (tr.state === C.STATUS_ACCEPTED) {
	            return false;
	          } else if (tr.state === C.STATUS_COMPLETED) {
	            tr.stateChanged(C.STATUS_CONFIRMED);
	            tr.I = SIP.Timers.setTimeout(tr.timer_I.bind(tr), SIP.Timers.TIMER_I);
	            return true;
	          }
	        }

	        // ACK to 2XX Response.
	        else {
	            return false;
	          }
	        break;
	      case SIP.C.CANCEL:
	        tr = ua.transactions.ist[request.via_branch];
	        if (tr) {
	          request.reply_sl(200);
	          if (tr.state === C.STATUS_PROCEEDING) {
	            return false;
	          } else {
	            return true;
	          }
	        } else {
	          request.reply_sl(481);
	          return true;
	        }
	      default:

	        // Non-INVITE Server Transaction RFC 3261 17.2.2
	        tr = ua.transactions.nist[request.via_branch];
	        if (tr) {
	          switch (tr.state) {
	            case C.STATUS_TRYING:
	              break;
	            case C.STATUS_PROCEEDING:
	            case C.STATUS_COMPLETED:
	              tr.transport.send(tr.last_response);
	              break;
	          }
	          return true;
	        }
	        break;
	    }
	  };

	  SIP.Transactions = {
	    C: C,
	    checkTransaction: checkTransaction,
	    NonInviteClientTransaction: NonInviteClientTransaction,
	    InviteClientTransaction: InviteClientTransaction,
	    AckClientTransaction: AckClientTransaction,
	    NonInviteServerTransaction: NonInviteServerTransaction,
	    InviteServerTransaction: InviteServerTransaction
	  };
	};

	/***/ }),
	/* 16 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview SIP Dialog
	 */

	/**
	 * @augments SIP
	 * @class Class creating a SIP dialog.
	 * @param {SIP.RTCSession} owner
	 * @param {SIP.IncomingRequest|SIP.IncomingResponse} message
	 * @param {Enum} type UAC / UAS
	 * @param {Enum} state SIP.Dialog.C.STATUS_EARLY / SIP.Dialog.C.STATUS_CONFIRMED
	 */

	module.exports = function (SIP) {

	  var RequestSender = __webpack_require__(17)(SIP);

	  var Dialog,
	      C = {
	    // Dialog states
	    STATUS_EARLY: 1,
	    STATUS_CONFIRMED: 2
	  };

	  // RFC 3261 12.1
	  Dialog = function Dialog(owner, message, type, state) {
	    var contact;

	    this.uac_pending_reply = false;
	    this.uas_pending_reply = false;

	    if (!message.hasHeader('contact')) {
	      return {
	        error: 'unable to create a Dialog without Contact header field'
	      };
	    }

	    if (message instanceof SIP.IncomingResponse) {
	      state = message.status_code < 200 ? C.STATUS_EARLY : C.STATUS_CONFIRMED;
	    } else {
	      // Create confirmed dialog if state is not defined
	      state = state || C.STATUS_CONFIRMED;
	    }

	    contact = message.parseHeader('contact');

	    // RFC 3261 12.1.1
	    if (type === 'UAS') {
	      this.id = {
	        call_id: message.call_id,
	        local_tag: message.to_tag,
	        remote_tag: message.from_tag,
	        toString: function toString() {
	          return this.call_id + this.local_tag + this.remote_tag;
	        }
	      };
	      this.state = state;
	      this.remote_seqnum = message.cseq;
	      this.local_uri = message.parseHeader('to').uri;
	      this.remote_uri = message.parseHeader('from').uri;
	      this.remote_target = contact.uri;
	      this.route_set = message.getHeaders('record-route');
	      this.invite_seqnum = message.cseq;
	      this.local_seqnum = message.cseq;
	    }
	    // RFC 3261 12.1.2
	    else if (type === 'UAC') {
	        this.id = {
	          call_id: message.call_id,
	          local_tag: message.from_tag,
	          remote_tag: message.to_tag,
	          toString: function toString() {
	            return this.call_id + this.local_tag + this.remote_tag;
	          }
	        };
	        this.state = state;
	        this.invite_seqnum = message.cseq;
	        this.local_seqnum = message.cseq;
	        this.local_uri = message.parseHeader('from').uri;
	        this.pracked = [];
	        this.remote_uri = message.parseHeader('to').uri;
	        this.remote_target = contact.uri;
	        this.route_set = message.getHeaders('record-route').reverse();
	      }

	    this.logger = owner.ua.getLogger('sip.dialog', this.id.toString());
	    this.owner = owner;
	    owner.ua.dialogs[this.id.toString()] = this;
	    this.logger.log('new ' + type + ' dialog created with status ' + (this.state === C.STATUS_EARLY ? 'EARLY' : 'CONFIRMED'));
	    owner.emit('dialog', this);
	  };

	  Dialog.prototype = {
	    /**
	     * @param {SIP.IncomingMessage} message
	     * @param {Enum} UAC/UAS
	     */
	    update: function update(message, type) {
	      this.state = C.STATUS_CONFIRMED;

	      this.logger.log('dialog ' + this.id.toString() + '  changed to CONFIRMED state');

	      if (type === 'UAC') {
	        // RFC 3261 13.2.2.4
	        this.route_set = message.getHeaders('record-route').reverse();
	      }
	    },

	    terminate: function terminate() {
	      this.logger.log('dialog ' + this.id.toString() + ' deleted');
	      if (this.sessionDescriptionHandler && this.state !== C.STATUS_CONFIRMED) {
	        // TODO: This should call .close() on the handler when implemented
	        this.sessionDescriptionHandler.close();
	      }
	      delete this.owner.ua.dialogs[this.id.toString()];
	    },

	    /**
	    * @param {String} method request method
	    * @param {Object} extraHeaders extra headers
	    * @returns {SIP.OutgoingRequest}
	    */

	    // RFC 3261 12.2.1.1
	    createRequest: function createRequest(method, extraHeaders, body) {
	      var cseq, request;
	      extraHeaders = (extraHeaders || []).slice();

	      if (!this.local_seqnum) {
	        this.local_seqnum = Math.floor(Math.random() * 10000);
	      }

	      cseq = method === SIP.C.CANCEL || method === SIP.C.ACK ? this.invite_seqnum : this.local_seqnum += 1;

	      request = new SIP.OutgoingRequest(method, this.remote_target, this.owner.ua, {
	        'cseq': cseq,
	        'call_id': this.id.call_id,
	        'from_uri': this.local_uri,
	        'from_tag': this.id.local_tag,
	        'to_uri': this.remote_uri,
	        'to_tag': this.id.remote_tag,
	        'route_set': this.route_set
	      }, extraHeaders, body);

	      request.dialog = this;

	      return request;
	    },

	    /**
	    * @param {SIP.IncomingRequest} request
	    * @returns {Boolean}
	    */

	    // RFC 3261 12.2.2
	    checkInDialogRequest: function checkInDialogRequest(request) {
	      var self = this;

	      if (!this.remote_seqnum) {
	        this.remote_seqnum = request.cseq;
	      } else if (request.cseq < this.remote_seqnum) {
	        //Do not try to reply to an ACK request.
	        if (request.method !== SIP.C.ACK) {
	          request.reply(500);
	        }
	        if (request.cseq === this.invite_seqnum) {
	          return true;
	        }
	        return false;
	      }

	      switch (request.method) {
	        // RFC3261 14.2 Modifying an Existing Session -UAS BEHAVIOR-
	        case SIP.C.INVITE:
	          if (this.uac_pending_reply === true) {
	            request.reply(491);
	          } else if (this.uas_pending_reply === true && request.cseq > this.remote_seqnum) {
	            var retryAfter = (Math.random() * 10 | 0) + 1;
	            request.reply(500, null, ['Retry-After:' + retryAfter]);
	            this.remote_seqnum = request.cseq;
	            return false;
	          } else {
	            this.uas_pending_reply = true;
	            request.server_transaction.on('stateChanged', function stateChanged() {
	              if (this.state === SIP.Transactions.C.STATUS_ACCEPTED || this.state === SIP.Transactions.C.STATUS_COMPLETED || this.state === SIP.Transactions.C.STATUS_TERMINATED) {

	                this.removeListener('stateChanged', stateChanged);
	                self.uas_pending_reply = false;
	              }
	            });
	          }

	          // RFC3261 12.2.2 Replace the dialog`s remote target URI if the request is accepted
	          if (request.hasHeader('contact')) {
	            request.server_transaction.on('stateChanged', function () {
	              if (this.state === SIP.Transactions.C.STATUS_ACCEPTED) {
	                self.remote_target = request.parseHeader('contact').uri;
	              }
	            });
	          }
	          break;
	        case SIP.C.NOTIFY:
	          // RFC6665 3.2 Replace the dialog`s remote target URI if the request is accepted
	          if (request.hasHeader('contact')) {
	            request.server_transaction.on('stateChanged', function () {
	              if (this.state === SIP.Transactions.C.STATUS_COMPLETED) {
	                self.remote_target = request.parseHeader('contact').uri;
	              }
	            });
	          }
	          break;
	      }

	      if (request.cseq > this.remote_seqnum) {
	        this.remote_seqnum = request.cseq;
	      }

	      return true;
	    },

	    sendRequest: function sendRequest(applicant, method, options) {
	      options = options || {};

	      var extraHeaders = (options.extraHeaders || []).slice();

	      var body = null;
	      if (options.body) {
	        if (options.body.body) {
	          body = options.body;
	        } else {
	          body = {};
	          body.body = options.body;
	          if (options.contentType) {
	            body.contentType = options.contentType;
	          }
	        }
	      }

	      var request = this.createRequest(method, extraHeaders, body),
	          request_sender = new RequestSender(this, applicant, request);

	      request_sender.send();

	      return request;
	    },

	    /**
	    * @param {SIP.IncomingRequest} request
	    */
	    receiveRequest: function receiveRequest(request) {
	      //Check in-dialog request
	      if (!this.checkInDialogRequest(request)) {
	        return;
	      }

	      this.owner.receiveRequest(request);
	    }
	  };

	  Dialog.C = C;
	  SIP.Dialog = Dialog;
	};

	/***/ }),
	/* 17 */
	/***/ (function(module, exports, __webpack_require__) {


	/**
	 * @fileoverview In-Dialog Request Sender
	 */

	/**
	 * @augments SIP.Dialog
	 * @class Class creating an In-dialog request sender.
	 * @param {SIP.Dialog} dialog
	 * @param {Object} applicant
	 * @param {SIP.OutgoingRequest} request
	 */
	/**
	 * @fileoverview in-Dialog Request Sender
	 */

	module.exports = function (SIP) {
	  var RequestSender;

	  RequestSender = function RequestSender(dialog, applicant, request) {

	    this.dialog = dialog;
	    this.applicant = applicant;
	    this.request = request;

	    // RFC3261 14.1 Modifying an Existing Session. UAC Behavior.
	    this.reattempt = false;
	    this.reattemptTimer = null;
	  };

	  RequestSender.prototype = {
	    send: function send() {
	      var self = this,
	          request_sender = new SIP.RequestSender(this, this.dialog.owner.ua);

	      request_sender.send();

	      // RFC3261 14.2 Modifying an Existing Session -UAC BEHAVIOR-
	      if (this.request.method === SIP.C.INVITE && request_sender.clientTransaction.state !== SIP.Transactions.C.STATUS_TERMINATED) {
	        this.dialog.uac_pending_reply = true;
	        request_sender.clientTransaction.on('stateChanged', function stateChanged() {
	          if (this.state === SIP.Transactions.C.STATUS_ACCEPTED || this.state === SIP.Transactions.C.STATUS_COMPLETED || this.state === SIP.Transactions.C.STATUS_TERMINATED) {

	            this.removeListener('stateChanged', stateChanged);
	            self.dialog.uac_pending_reply = false;
	          }
	        });
	      }
	    },

	    onRequestTimeout: function onRequestTimeout() {
	      this.applicant.onRequestTimeout();
	    },

	    onTransportError: function onTransportError() {
	      this.applicant.onTransportError();
	    },

	    receiveResponse: function receiveResponse(response) {
	      var self = this;

	      // RFC3261 12.2.1.2 408 or 481 is received for a request within a dialog.
	      if (response.status_code === 408 || response.status_code === 481) {
	        this.applicant.onDialogError(response);
	      } else if (response.method === SIP.C.INVITE && response.status_code === 491) {
	        if (this.reattempt) {
	          this.applicant.receiveResponse(response);
	        } else {
	          this.request.cseq.value = this.dialog.local_seqnum += 1;
	          this.reattemptTimer = SIP.Timers.setTimeout(function () {
	            if (self.applicant.owner.status !== SIP.Session.C.STATUS_TERMINATED) {
	              self.reattempt = true;
	              self.request_sender.send();
	            }
	          }, this.getReattemptTimeout());
	        }
	      } else {
	        this.applicant.receiveResponse(response);
	      }
	    }
	  };

	  return RequestSender;
	};

	/***/ }),
	/* 18 */
	/***/ (function(module, exports, __webpack_require__) {


	/**
	 * @fileoverview Request Sender
	 */

	/**
	 * @augments SIP
	 * @class Class creating a request sender.
	 * @param {Object} applicant
	 * @param {SIP.UA} ua
	 */

	module.exports = function (SIP) {
	  var RequestSender;

	  RequestSender = function RequestSender(applicant, ua) {
	    this.logger = ua.getLogger('sip.requestsender');
	    this.ua = ua;
	    this.applicant = applicant;
	    this.method = applicant.request.method;
	    this.request = applicant.request;
	    this.credentials = null;
	    this.challenged = false;
	    this.staled = false;

	    // If ua is in closing process or even closed just allow sending Bye and ACK
	    if (ua.status === SIP.UA.C.STATUS_USER_CLOSED && (this.method !== SIP.C.BYE || this.method !== SIP.C.ACK)) {
	      this.onTransportError();
	    }
	  };

	  /**
	  * Create the client transaction and send the message.
	  */
	  RequestSender.prototype = {
	    send: function send() {
	      switch (this.method) {
	        case "INVITE":
	          this.clientTransaction = new SIP.Transactions.InviteClientTransaction(this, this.request, this.ua.transport);
	          break;
	        case "ACK":
	          this.clientTransaction = new SIP.Transactions.AckClientTransaction(this, this.request, this.ua.transport);
	          break;
	        default:
	          this.clientTransaction = new SIP.Transactions.NonInviteClientTransaction(this, this.request, this.ua.transport);
	      }
	      this.clientTransaction.send();

	      return this.clientTransaction;
	    },

	    /**
	    * Callback fired when receiving a request timeout error from the client transaction.
	    * To be re-defined by the applicant.
	    * @event
	    */
	    onRequestTimeout: function onRequestTimeout() {
	      this.applicant.onRequestTimeout();
	    },

	    /**
	    * Callback fired when receiving a transport error from the client transaction.
	    * To be re-defined by the applicant.
	    * @event
	    */
	    onTransportError: function onTransportError() {
	      this.applicant.onTransportError();
	    },

	    /**
	    * Called from client transaction when receiving a correct response to the request.
	    * Authenticate request if needed or pass the response back to the applicant.
	    * @param {SIP.IncomingResponse} response
	    */
	    receiveResponse: function receiveResponse(response) {
	      var cseq,
	          challenge,
	          authorization_header_name,
	          status_code = response.status_code;

	      /*
	      * Authentication
	      * Authenticate once. _challenged_ flag used to avoid infinite authentications.
	      */
	      if (status_code === 401 || status_code === 407) {

	        // Get and parse the appropriate WWW-Authenticate or Proxy-Authenticate header.
	        if (response.status_code === 401) {
	          challenge = response.parseHeader('www-authenticate');
	          authorization_header_name = 'authorization';
	        } else {
	          challenge = response.parseHeader('proxy-authenticate');
	          authorization_header_name = 'proxy-authorization';
	        }

	        // Verify it seems a valid challenge.
	        if (!challenge) {
	          this.logger.warn(response.status_code + ' with wrong or missing challenge, cannot authenticate');
	          this.applicant.receiveResponse(response);
	          return;
	        }

	        if (!this.challenged || !this.staled && challenge.stale === true) {
	          if (!this.credentials) {
	            this.credentials = this.ua.configuration.authenticationFactory(this.ua);
	          }

	          // Verify that the challenge is really valid.
	          if (!this.credentials.authenticate(this.request, challenge)) {
	            this.applicant.receiveResponse(response);
	            return;
	          }
	          this.challenged = true;

	          if (challenge.stale) {
	            this.staled = true;
	          }

	          if (response.method === SIP.C.REGISTER) {
	            cseq = this.applicant.cseq += 1;
	          } else if (this.request.dialog) {
	            cseq = this.request.dialog.local_seqnum += 1;
	          } else {
	            cseq = this.request.cseq + 1;
	            this.request.cseq = cseq;
	          }
	          this.request.setHeader('cseq', cseq + ' ' + this.method);

	          this.request.setHeader(authorization_header_name, this.credentials.toString());
	          this.send();
	        } else {
	          this.applicant.receiveResponse(response);
	        }
	      } else {
	        this.applicant.receiveResponse(response);
	      }
	    }
	  };

	  SIP.RequestSender = RequestSender;
	};

	/***/ }),
	/* 19 */
	/***/ (function(module, exports, __webpack_require__) {


	module.exports = function (SIP) {

	  var RegisterContext;

	  RegisterContext = function RegisterContext(ua) {
	    var params = {},
	        regId = 1;

	    this.registrar = ua.configuration.registrarServer;
	    this.expires = ua.configuration.registerExpires;

	    // Contact header
	    this.contact = ua.contact.toString();

	    {
	      this.contact += ';reg-id=' + regId;
	      this.contact += ';+sip.instance="<urn:uuid:' + ua.configuration.instanceId + '>"';
	    }

	    // Call-ID and CSeq values RFC3261 10.2
	    this.call_id = SIP.Utils.createRandomToken(22);
	    this.cseq = Math.floor(Math.random() * 10000);

	    this.to_uri = ua.configuration.uri;

	    params.to_uri = this.to_uri;
	    params.to_displayName = ua.configuration.displayName;
	    params.call_id = this.call_id;
	    params.cseq = this.cseq;

	    // Extends ClientContext
	    SIP.Utils.augment(this, SIP.ClientContext, [ua, 'REGISTER', this.registrar, { params: params }]);

	    this.registrationTimer = null;
	    this.registrationExpiredTimer = null;

	    // Set status
	    this.registered = false;

	    this.logger = ua.getLogger('sip.registercontext');
	    ua.on('transportCreated', function (transport) {
	      transport.on('disconnected', this.onTransportDisconnected.bind(this));
	    }.bind(this));
	  };

	  RegisterContext.prototype = Object.create({}, {
	    register: { writable: true, value: function register(options) {
	        var self = this,
	            extraHeaders;

	        // Handle Options
	        this.options = options || {};
	        extraHeaders = (this.options.extraHeaders || []).slice();
	        extraHeaders.push('Contact: ' + this.contact + ';expires=' + this.expires);
	        extraHeaders.push('Allow: ' + SIP.UA.C.ALLOWED_METHODS.toString());

	        // Save original extraHeaders to be used in .close
	        this.closeHeaders = this.options.closeWithHeaders ? (this.options.extraHeaders || []).slice() : [];

	        this.receiveResponse = function (response) {
	          var contact,
	              expires,
	              contacts = response.getHeaders('contact').length,
	              cause;

	          // Discard responses to older REGISTER/un-REGISTER requests.
	          if (response.cseq !== this.cseq) {
	            return;
	          }

	          // Clear registration timer
	          if (this.registrationTimer !== null) {
	            SIP.Timers.clearTimeout(this.registrationTimer);
	            this.registrationTimer = null;
	          }

	          switch (true) {
	            case /^1[0-9]{2}$/.test(response.status_code):
	              this.emit('progress', response);
	              break;
	            case /^2[0-9]{2}$/.test(response.status_code):
	              this.emit('accepted', response);

	              if (response.hasHeader('expires')) {
	                expires = response.getHeader('expires');
	              }

	              if (this.registrationExpiredTimer !== null) {
	                SIP.Timers.clearTimeout(this.registrationExpiredTimer);
	                this.registrationExpiredTimer = null;
	              }

	              // Search the Contact pointing to us and update the expires value accordingly.
	              if (!contacts) {
	                this.logger.warn('no Contact header in response to REGISTER, response ignored');
	                break;
	              }

	              while (contacts--) {
	                contact = response.parseHeader('contact', contacts);
	                if (contact.uri.user === this.ua.contact.uri.user) {
	                  expires = contact.getParam('expires');
	                  break;
	                } else {
	                  contact = null;
	                }
	              }

	              if (!contact) {
	                this.logger.warn('no Contact header pointing to us, response ignored');
	                break;
	              }

	              if (!expires) {
	                expires = this.expires;
	              }

	              // Re-Register before the expiration interval has elapsed.
	              // For that, decrease the expires value. ie: 3 seconds
	              this.registrationTimer = SIP.Timers.setTimeout(function () {
	                self.registrationTimer = null;
	                self.register(self.options);
	              }, expires * 1000 - 3000);
	              this.registrationExpiredTimer = SIP.Timers.setTimeout(function () {
	                self.logger.warn('registration expired');
	                if (self.registered) {
	                  self.unregistered(null, SIP.C.causes.EXPIRES);
	                }
	              }, expires * 1000);

	              //Save gruu values
	              if (contact.hasParam('temp-gruu')) {
	                this.ua.contact.temp_gruu = SIP.URI.parse(contact.getParam('temp-gruu').replace(/"/g, ''));
	              }
	              if (contact.hasParam('pub-gruu')) {
	                this.ua.contact.pub_gruu = SIP.URI.parse(contact.getParam('pub-gruu').replace(/"/g, ''));
	              }

	              this.registered = true;
	              this.emit('registered', response || null);
	              break;
	            // Interval too brief RFC3261 10.2.8
	            case /^423$/.test(response.status_code):
	              if (response.hasHeader('min-expires')) {
	                // Increase our registration interval to the suggested minimum
	                this.expires = response.getHeader('min-expires');
	                // Attempt the registration again immediately
	                this.register(this.options);
	              } else {
	                //This response MUST contain a Min-Expires header field
	                this.logger.warn('423 response received for REGISTER without Min-Expires');
	                this.registrationFailure(response, SIP.C.causes.SIP_FAILURE_CODE);
	              }
	              break;
	            default:
	              cause = SIP.Utils.sipErrorCause(response.status_code);
	              this.registrationFailure(response, cause);
	          }
	        };

	        this.onRequestTimeout = function () {
	          this.registrationFailure(null, SIP.C.causes.REQUEST_TIMEOUT);
	        };

	        this.onTransportError = function () {
	          this.registrationFailure(null, SIP.C.causes.CONNECTION_ERROR);
	        };

	        this.cseq++;
	        this.request.cseq = this.cseq;
	        this.request.setHeader('cseq', this.cseq + ' REGISTER');
	        this.request.extraHeaders = extraHeaders;
	        this.send();
	      } },

	    registrationFailure: { writable: true, value: function registrationFailure(response, cause) {
	        this.emit('failed', response || null, cause || null);
	      } },

	    onTransportDisconnected: { writable: true, value: function onTransportDisconnected() {
	        this.registered_before = this.registered;
	        if (this.registrationTimer !== null) {
	          SIP.Timers.clearTimeout(this.registrationTimer);
	          this.registrationTimer = null;
	        }

	        if (this.registrationExpiredTimer !== null) {
	          SIP.Timers.clearTimeout(this.registrationExpiredTimer);
	          this.registrationExpiredTimer = null;
	        }

	        if (this.registered) {
	          this.unregistered(null, SIP.C.causes.CONNECTION_ERROR);
	        }
	      } },

	    onTransportConnected: { writable: true, value: function onTransportConnected() {
	        this.register(this.options);
	      } },

	    close: { writable: true, value: function close() {
	        var options = {
	          all: false,
	          extraHeaders: this.closeHeaders
	        };

	        this.registered_before = this.registered;
	        if (this.registered) {
	          this.unregister(options);
	        }
	      } },

	    unregister: { writable: true, value: function unregister(options) {
	        var extraHeaders;

	        options = options || {};

	        if (!this.registered && !options.all) {
	          this.logger.warn('Already unregistered, but sending an unregister anyways.');
	        }

	        extraHeaders = (options.extraHeaders || []).slice();

	        this.registered = false;

	        // Clear the registration timer.
	        if (this.registrationTimer !== null) {
	          SIP.Timers.clearTimeout(this.registrationTimer);
	          this.registrationTimer = null;
	        }

	        if (options.all) {
	          extraHeaders.push('Contact: *');
	          extraHeaders.push('Expires: 0');
	        } else {
	          extraHeaders.push('Contact: ' + this.contact + ';expires=0');
	        }

	        this.receiveResponse = function (response) {
	          var cause;

	          switch (true) {
	            case /^1[0-9]{2}$/.test(response.status_code):
	              this.emit('progress', response);
	              break;
	            case /^2[0-9]{2}$/.test(response.status_code):
	              this.emit('accepted', response);
	              if (this.registrationExpiredTimer !== null) {
	                SIP.Timers.clearTimeout(this.registrationExpiredTimer);
	                this.registrationExpiredTimer = null;
	              }
	              this.unregistered(response);
	              break;
	            default:
	              cause = SIP.Utils.sipErrorCause(response.status_code);
	              this.unregistered(response, cause);
	          }
	        };

	        this.onRequestTimeout = function () {
	          // Not actually unregistered...
	          //this.unregistered(null, SIP.C.causes.REQUEST_TIMEOUT);
	        };

	        this.cseq++;
	        this.request.cseq = this.cseq;
	        this.request.setHeader('cseq', this.cseq + ' REGISTER');
	        this.request.extraHeaders = extraHeaders;

	        this.send();
	      } },

	    unregistered: { writable: true, value: function unregistered(response, cause) {
	        this.registered = false;
	        this.emit('unregistered', response || null, cause || null);
	      } }

	  });

	  SIP.RegisterContext = RegisterContext;
	};

	/***/ }),
	/* 20 */
	/***/ (function(module, exports, __webpack_require__) {

	/* eslint-disable */
	/**
	 * @fileoverview SessionDescriptionHandler
	 */

	/* SessionDescriptionHandler
	 * @class PeerConnection helper Class.
	 * @param {SIP.Session} session
	 * @param {Object} [options]
	 */

	module.exports = function (EventEmitter) {
	  var SessionDescriptionHandler = function SessionDescriptionHandler() {};

	  SessionDescriptionHandler.prototype = Object.create(EventEmitter.prototype, {

	    /**
	     * Destructor
	     */
	    close: { value: function close() {} },

	    /**
	     * Gets the local description from the underlying media implementation
	     * @param {Object} [options] Options object to be used by getDescription
	     * @param {Array} [modifiers] Array with one time use description modifiers
	     * @returns {Promise} Promise that resolves with the local description to be used for the session
	     */
	    getDescription: { value: function getDescription(options, modifiers) {} },

	    /**
	     * Check if the Session Description Handler can handle the Content-Type described by a SIP Message
	     * @param {String} contentType The content type that is in the SIP Message
	     * @returns {boolean}
	     */
	    hasDescription: { value: function hasSessionDescription(contentType) {} },

	    /**
	     * The modifier that should be used when the session would like to place the call on hold
	     * @param {String} [sdp] The description that will be modified
	     * @returns {Promise} Promise that resolves with modified SDP
	     */
	    holdModifier: { value: function holdModifier(sdp) {} },

	    /**
	     * Set the remote description to the underlying media implementation
	     * @param {String} sessionDescription The description provided by a SIP message to be set on the media implementation
	     * @param {Object} [options] Options object to be used by setDescription
	     * @param {Array} [modifiers] Array with one time use description modifiers
	     * @returns {Promise} Promise that resolves once the description is set
	     */
	    setDescription: { value: function setDescription(sessionDescription, options, modifiers) {} },

	    /**
	     * Send DTMF via RTP (RFC 4733)
	     * @param {String} tones A string containing DTMF digits
	     * @param {Object} [options] Options object to be used by sendDtmf
	     * @returns {boolean} true if DTMF send is successful, false otherwise
	     */
	    sendDtmf: { value: function sendDtmf(tones, options) {} },

	    /**
	    * Get the direction of the session description
	    * @returns {String} direction of the description
	    */
	    getDirection: { value: function getDirection() {} }
	  });

	  return SessionDescriptionHandler;
	};

	/***/ }),
	/* 21 */
	/***/ (function(module, exports, __webpack_require__) {


	module.exports = function (SIP) {
	  var ClientContext;

	  ClientContext = function ClientContext(ua, method, target, options) {
	    var originalTarget = target;

	    // Validate arguments
	    if (target === undefined) {
	      throw new TypeError('Not enough arguments');
	    }

	    this.ua = ua;
	    this.logger = ua.getLogger('sip.clientcontext');
	    this.method = method;
	    target = ua.normalizeTarget(target);
	    if (!target) {
	      throw new TypeError('Invalid target: ' + originalTarget);
	    }

	    /* Options
	     * - extraHeaders
	     * - params
	     * - contentType
	     * - body
	     */
	    options = Object.create(options || Object.prototype);
	    options.extraHeaders = (options.extraHeaders || []).slice();

	    // Build the request
	    this.request = new SIP.OutgoingRequest(this.method, target, this.ua, options.params, options.extraHeaders);
	    if (options.body) {
	      this.body = {};
	      this.body.body = options.body;
	      if (options.contentType) {
	        this.body.contentType = options.contentType;
	      }
	      this.request.body = this.body;
	    }

	    /* Set other properties from the request */
	    this.localIdentity = this.request.from;
	    this.remoteIdentity = this.request.to;

	    this.data = {};
	  };
	  ClientContext.prototype = Object.create(SIP.EventEmitter.prototype);

	  ClientContext.prototype.send = function () {
	    new SIP.RequestSender(this, this.ua).send();
	    return this;
	  };

	  ClientContext.prototype.cancel = function (options) {
	    options = options || {};

	    options.extraHeaders = (options.extraHeaders || []).slice();

	    var cancel_reason = SIP.Utils.getCancelReason(options.status_code, options.reason_phrase);
	    this.request.cancel(cancel_reason, options.extraHeaders);

	    this.emit('cancel');
	  };

	  ClientContext.prototype.receiveResponse = function (response) {
	    var cause = SIP.Utils.getReasonPhrase(response.status_code);

	    switch (true) {
	      case /^1[0-9]{2}$/.test(response.status_code):
	        this.emit('progress', response, cause);
	        break;

	      case /^2[0-9]{2}$/.test(response.status_code):
	        if (this.ua.applicants[this]) {
	          delete this.ua.applicants[this];
	        }
	        this.emit('accepted', response, cause);
	        break;

	      default:
	        if (this.ua.applicants[this]) {
	          delete this.ua.applicants[this];
	        }
	        this.emit('rejected', response, cause);
	        this.emit('failed', response, cause);
	        break;
	    }
	  };

	  ClientContext.prototype.onRequestTimeout = function () {
	    this.emit('failed', null, SIP.C.causes.REQUEST_TIMEOUT);
	  };

	  ClientContext.prototype.onTransportError = function () {
	    this.emit('failed', null, SIP.C.causes.CONNECTION_ERROR);
	  };

	  SIP.ClientContext = ClientContext;
	};

	/***/ }),
	/* 22 */
	/***/ (function(module, exports, __webpack_require__) {


	module.exports = function (SIP) {
	  var ServerContext;

	  ServerContext = function ServerContext(ua, request) {
	    this.ua = ua;
	    this.logger = ua.getLogger('sip.servercontext');
	    this.request = request;
	    if (request.method === SIP.C.INVITE) {
	      this.transaction = new SIP.Transactions.InviteServerTransaction(request, ua);
	    } else {
	      this.transaction = new SIP.Transactions.NonInviteServerTransaction(request, ua);
	    }

	    if (request.body) {
	      this.body = request.body;
	    }
	    if (request.hasHeader('Content-Type')) {
	      this.contentType = request.getHeader('Content-Type');
	    }
	    this.method = request.method;

	    this.data = {};

	    this.localIdentity = request.to;
	    this.remoteIdentity = request.from;
	    if (request.hasHeader('P-Asserted-Identity')) {
	      this.assertedIdentity = new SIP.NameAddrHeader.parse(request.getHeader('P-Asserted-Identity'));
	    }
	  };

	  ServerContext.prototype = Object.create(SIP.EventEmitter.prototype);

	  ServerContext.prototype.progress = function (options) {
	    options = Object.create(options || Object.prototype);
	    options.statusCode || (options.statusCode = 180);
	    options.minCode = 100;
	    options.maxCode = 199;
	    options.events = ['progress'];
	    return this.reply(options);
	  };

	  ServerContext.prototype.accept = function (options) {
	    options = Object.create(options || Object.prototype);
	    options.statusCode || (options.statusCode = 200);
	    options.minCode = 200;
	    options.maxCode = 299;
	    options.events = ['accepted'];
	    return this.reply(options);
	  };

	  ServerContext.prototype.reject = function (options) {
	    options = Object.create(options || Object.prototype);
	    options.statusCode || (options.statusCode = 480);
	    options.minCode = 300;
	    options.maxCode = 699;
	    options.events = ['rejected', 'failed'];
	    return this.reply(options);
	  };

	  ServerContext.prototype.reply = function (options) {
	    options = options || {}; // This is okay, so long as we treat options as read-only in this method
	    var statusCode = options.statusCode || 100,
	        minCode = options.minCode || 100,
	        maxCode = options.maxCode || 699,
	        reasonPhrase = SIP.Utils.getReasonPhrase(statusCode, options.reasonPhrase),
	        extraHeaders = options.extraHeaders || [],
	        body = options.body,
	        events = options.events || [],
	        response;

	    if (statusCode < minCode || statusCode > maxCode) {
	      throw new TypeError('Invalid statusCode: ' + statusCode);
	    }
	    response = this.request.reply(statusCode, reasonPhrase, extraHeaders, body);
	    events.forEach(function (event) {
	      this.emit(event, response, reasonPhrase);
	    }, this);

	    return this;
	  };

	  ServerContext.prototype.onRequestTimeout = function () {
	    this.emit('failed', null, SIP.C.causes.REQUEST_TIMEOUT);
	  };

	  ServerContext.prototype.onTransportError = function () {
	    this.emit('failed', null, SIP.C.causes.CONNECTION_ERROR);
	  };

	  SIP.ServerContext = ServerContext;
	};

	/***/ }),
	/* 23 */
	/***/ (function(module, exports, __webpack_require__) {


	module.exports = function (SIP) {

	  var DTMF = __webpack_require__(24)(SIP);

	  var Session,
	      InviteServerContext,
	      InviteClientContext,
	      ReferServerContext,
	      ReferClientContext,
	      C = {
	    //Session states
	    STATUS_NULL: 0,
	    STATUS_INVITE_SENT: 1,
	    STATUS_1XX_RECEIVED: 2,
	    STATUS_INVITE_RECEIVED: 3,
	    STATUS_WAITING_FOR_ANSWER: 4,
	    STATUS_ANSWERED: 5,
	    STATUS_WAITING_FOR_PRACK: 6,
	    STATUS_WAITING_FOR_ACK: 7,
	    STATUS_CANCELED: 8,
	    STATUS_TERMINATED: 9,
	    STATUS_ANSWERED_WAITING_FOR_PRACK: 10,
	    STATUS_EARLY_MEDIA: 11,
	    STATUS_CONFIRMED: 12
	  };

	  /*
	   * @param {function returning SIP.sessionDescriptionHandler} [sessionDescriptionHandlerFactory]
	   *        (See the documentation for the sessionDescriptionHandlerFactory argument of the UA constructor.)
	   */
	  Session = function Session(sessionDescriptionHandlerFactory) {
	    this.status = C.STATUS_NULL;
	    this.dialog = null;
	    this.pendingReinvite = false;
	    this.earlyDialogs = {};
	    if (!sessionDescriptionHandlerFactory) {
	      throw new SIP.Exceptions.SessionDescriptionHandlerMissing('A session description handler is required for the session to function');
	    }
	    this.sessionDescriptionHandlerFactory = sessionDescriptionHandlerFactory;

	    this.hasOffer = false;
	    this.hasAnswer = false;

	    // Session Timers
	    this.timers = {
	      ackTimer: null,
	      expiresTimer: null,
	      invite2xxTimer: null,
	      userNoAnswerTimer: null,
	      rel1xxTimer: null,
	      prackTimer: null
	    };

	    // Session info
	    this.startTime = null;
	    this.endTime = null;
	    this.tones = null;

	    // Hold state
	    this.local_hold = false;

	    this.early_sdp = null;
	    this.rel100 = SIP.C.supported.UNSUPPORTED;
	  };

	  Session.prototype = {
	    dtmf: function dtmf(tones, options) {
	      var dtmfs = [],
	          self = this,
	          dtmfType = this.ua.configuration.dtmfType;

	      options = options || {};

	      if (tones === undefined) {
	        throw new TypeError('Not enough arguments');
	      }

	      // Check Session Status
	      if (this.status !== C.STATUS_CONFIRMED && this.status !== C.STATUS_WAITING_FOR_ACK) {
	        throw new SIP.Exceptions.InvalidStateError(this.status);
	      }

	      // Check tones
	      if (typeof tones !== 'string' && typeof tones !== 'number' || !tones.toString().match(/^[0-9A-D#*,]+$/i)) {
	        throw new TypeError('Invalid tones: ' + tones);
	      }

	      var sendDTMF = function sendDTMF() {
	        var dtmf, timeout;

	        if (self.status === C.STATUS_TERMINATED || !self.tones || self.tones.length === 0) {
	          // Stop sending DTMF
	          self.tones = null;
	          return this;
	        }

	        dtmf = self.tones.shift();

	        {
	          dtmf.on('failed', function () {
	            self.tones = null;
	          });
	          dtmf.send(options);
	          timeout = dtmf.duration + dtmf.interToneGap;
	        }

	        // Set timeout for the next tone
	        SIP.Timers.setTimeout(sendDTMF, timeout);
	      };

	      tones = tones.toString();
	      if (dtmfType === SIP.C.dtmfType.RTP) {
	        var sent = this.sessionDescriptionHandler.sendDtmf(tones, options);
	        if (!sent) {
	          this.logger.warn("Attempt to use dtmfType 'RTP' has failed, falling back to INFO packet method");
	          dtmfType = SIP.C.dtmfType.INFO;
	        }
	      }
	      if (dtmfType === SIP.C.dtmfType.INFO) {
	        tones = tones.split('');
	        while (tones.length > 0) {
	          dtmfs.push(new DTMF(this, tones.shift(), options));
	        }

	        if (this.tones) {
	          // Tones are already queued, just add to the queue
	          this.tones = this.tones.concat(dtmfs);
	          return this;
	        }
	        this.tones = dtmfs;
	        sendDTMF();
	      }
	      return this;
	    },

	    bye: function bye(options) {
	      options = Object.create(options || Object.prototype);
	      var statusCode = options.statusCode;

	      // Check Session Status
	      if (this.status === C.STATUS_TERMINATED) {
	        this.logger.error('Error: Attempted to send BYE in a terminated session.');
	        return this;
	      }

	      this.logger.log('terminating Session');

	      if (statusCode && (statusCode < 200 || statusCode >= 700)) {
	        throw new TypeError('Invalid statusCode: ' + statusCode);
	      }

	      options.receiveResponse = function () {};

	      return this.sendRequest(SIP.C.BYE, options).terminated();
	    },

	    refer: function refer(target, options) {
	      options = options || {};

	      // Check Session Status
	      if (this.status !== C.STATUS_CONFIRMED) {
	        throw new SIP.Exceptions.InvalidStateError(this.status);
	      }

	      this.referContext = new SIP.ReferClientContext(this.ua, this, target, options);

	      this.emit('referRequested', this.referContext);

	      this.referContext.refer(options);
	    },

	    sendRequest: function sendRequest(method, options) {
	      options = options || {};
	      var self = this;

	      var request = new SIP.OutgoingRequest(method, this.dialog.remote_target, this.ua, {
	        cseq: options.cseq || (this.dialog.local_seqnum += 1),
	        call_id: this.dialog.id.call_id,
	        from_uri: this.dialog.local_uri,
	        from_tag: this.dialog.id.local_tag,
	        to_uri: this.dialog.remote_uri,
	        to_tag: this.dialog.id.remote_tag,
	        route_set: this.dialog.route_set,
	        statusCode: options.statusCode,
	        reasonPhrase: options.reasonPhrase
	      }, options.extraHeaders || [], options.body);

	      new SIP.RequestSender({
	        request: request,
	        onRequestTimeout: function onRequestTimeout() {
	          self.onRequestTimeout();
	        },
	        onTransportError: function onTransportError() {
	          self.onTransportError();
	        },
	        receiveResponse: options.receiveResponse || function (response) {
	          self.receiveNonInviteResponse(response);
	        }
	      }, this.ua).send();

	      // Emit the request event
	      this.emit(method.toLowerCase(), request);

	      return this;
	    },

	    close: function close() {
	      var idx;

	      if (this.status === C.STATUS_TERMINATED) {
	        return this;
	      }

	      this.logger.log('closing INVITE session ' + this.id);

	      // 1st Step. Terminate media.
	      if (this.sessionDescriptionHandler) {
	        this.sessionDescriptionHandler.close();
	      }

	      // 2nd Step. Terminate signaling.

	      // Clear session timers
	      for (idx in this.timers) {
	        SIP.Timers.clearTimeout(this.timers[idx]);
	      }

	      // Terminate dialogs

	      // Terminate confirmed dialog
	      if (this.dialog) {
	        this.dialog.terminate();
	        delete this.dialog;
	      }

	      // Terminate early dialogs
	      for (idx in this.earlyDialogs) {
	        this.earlyDialogs[idx].terminate();
	        delete this.earlyDialogs[idx];
	      }

	      this.status = C.STATUS_TERMINATED;
	      this.ua.transport.removeListener("transportError", this.errorListener);

	      delete this.ua.sessions[this.id];

	      return this;
	    },

	    createDialog: function createDialog(message, type, early) {
	      var dialog,
	          early_dialog,
	          local_tag = message[type === 'UAS' ? 'to_tag' : 'from_tag'],
	          remote_tag = message[type === 'UAS' ? 'from_tag' : 'to_tag'],
	          id = message.call_id + local_tag + remote_tag;

	      early_dialog = this.earlyDialogs[id];

	      // Early Dialog
	      if (early) {
	        if (early_dialog) {
	          return true;
	        } else {
	          early_dialog = new SIP.Dialog(this, message, type, SIP.Dialog.C.STATUS_EARLY);

	          // Dialog has been successfully created.
	          if (early_dialog.error) {
	            this.logger.error(early_dialog.error);
	            this.failed(message, SIP.C.causes.INTERNAL_ERROR);
	            return false;
	          } else {
	            this.earlyDialogs[id] = early_dialog;
	            return true;
	          }
	        }
	      }
	      // Confirmed Dialog
	      else {
	          // In case the dialog is in _early_ state, update it
	          if (early_dialog) {
	            early_dialog.update(message, type);
	            this.dialog = early_dialog;
	            delete this.earlyDialogs[id];
	            for (var dia in this.earlyDialogs) {
	              this.earlyDialogs[dia].terminate();
	              delete this.earlyDialogs[dia];
	            }
	            return true;
	          }

	          // Otherwise, create a _confirmed_ dialog
	          dialog = new SIP.Dialog(this, message, type);

	          if (dialog.error) {
	            this.logger.error(dialog.error);
	            this.failed(message, SIP.C.causes.INTERNAL_ERROR);
	            return false;
	          } else {
	            this.to_tag = message.to_tag;
	            this.dialog = dialog;
	            return true;
	          }
	        }
	    },

	    /**
	     * Hold
	     */
	    hold: function hold(options, modifiers) {

	      if (this.status !== C.STATUS_WAITING_FOR_ACK && this.status !== C.STATUS_CONFIRMED) {
	        throw new SIP.Exceptions.InvalidStateError(this.status);
	      }

	      if (this.local_hold) {
	        this.logger.log('Session is already on hold, cannot put it on hold again');
	        return;
	      }

	      options = options || {};
	      options.modifiers = modifiers || [];
	      options.modifiers.push(this.sessionDescriptionHandler.holdModifier);

	      this.local_hold = true;

	      this.sendReinvite(options);
	    },

	    /**
	     * Unhold
	     */
	    unhold: function unhold(options, modifiers) {

	      if (this.status !== C.STATUS_WAITING_FOR_ACK && this.status !== C.STATUS_CONFIRMED) {
	        throw new SIP.Exceptions.InvalidStateError(this.status);
	      }

	      if (!this.local_hold) {
	        this.logger.log('Session is not on hold, cannot unhold it');
	        return;
	      }

	      options = options || {};

	      if (modifiers) {
	        options.modifiers = modifiers;
	      }

	      this.local_hold = false;

	      this.sendReinvite(options);
	    },

	    reinvite: function reinvite(options, modifiers) {
	      options = options || {};

	      if (modifiers) {
	        options.modifiers = modifiers;
	      }

	      return this.sendReinvite(options);
	    },

	    /**
	     * In dialog INVITE Reception
	     * @private
	     */
	    receiveReinvite: function receiveReinvite(request) {
	      var self = this,
	          promise;
	      // TODO: Should probably check state of the session

	      self.emit('reinvite', this);

	      if (request.hasHeader('P-Asserted-Identity')) {
	        this.assertedIdentity = new SIP.NameAddrHeader.parse(request.getHeader('P-Asserted-Identity'));
	      }

	      // Invite w/o SDP
	      if (request.getHeader('Content-Length') === '0' && !request.getHeader('Content-Type')) {
	        promise = this.sessionDescriptionHandler.getDescription(this.sessionDescriptionHandlerOptions, this.modifiers);

	        // Invite w/ SDP
	      } else if (this.sessionDescriptionHandler.hasDescription(request.getHeader('Content-Type'))) {
	        promise = this.sessionDescriptionHandler.setDescription(request.body, this.sessionDescriptionHandlerOptions, this.modifiers).then(this.sessionDescriptionHandler.getDescription.bind(this.sessionDescriptionHandler, this.sessionDescriptionHandlerOptions, this.modifiers));

	        // Bad Packet (should never get hit)
	      } else {
	        request.reply(415);
	        this.emit('reinviteFailed', self);
	        return;
	      }

	      this.receiveRequest = function (request) {
	        if (request.method === SIP.C.ACK && this.status === C.STATUS_WAITING_FOR_ACK) {
	          if (this.sessionDescriptionHandler.hasDescription(request.getHeader('Content-Type'))) {
	            this.hasAnswer = true;
	            this.sessionDescriptionHandler.setDescription(request.body, this.sessionDescriptionHandlerOptions, this.modifiers).then(function () {
	              SIP.Timers.clearTimeout(this.timers.ackTimer);
	              SIP.Timers.clearTimeout(this.timers.invite2xxTimer);
	              this.status = C.STATUS_CONFIRMED;

	              this.emit('confirmed', request);
	            }.bind(this));
	          } else {
	            SIP.Timers.clearTimeout(this.timers.ackTimer);
	            SIP.Timers.clearTimeout(this.timers.invite2xxTimer);
	            this.status = C.STATUS_CONFIRMED;

	            this.emit('confirmed', request);
	          }
	        } else {
	          SIP.Session.prototype.receiveRequest.apply(this, [request]);
	        }
	      }.bind(this);

	      promise.catch(function onFailure(e) {
	        var statusCode;
	        if (e instanceof SIP.Exceptions.GetDescriptionError) {
	          statusCode = 500;
	        } else if (e instanceof SIP.Exceptions.RenegotiationError) {
	          self.emit('renegotiationError', e);
	          self.logger.warn(e);
	          statusCode = 488;
	        } else {
	          self.logger.error(e);
	          statusCode = 488;
	        }
	        request.reply(statusCode);
	        self.emit('reinviteFailed', self);
	      }).then(function (description) {
	        var extraHeaders = ['Contact: ' + self.contact];
	        request.reply(200, null, extraHeaders, description, function () {
	          self.status = C.STATUS_WAITING_FOR_ACK;

	          self.setACKTimer();
	          self.emit('reinviteAccepted', self);
	        });
	      });
	    },

	    sendReinvite: function sendReinvite(options) {
	      if (this.pendingReinvite) {
	        this.logger.warn('Reinvite in progress. Please wait until complete, then try again.');
	        return;
	      }
	      this.pendingReinvite = true;
	      options = options || {};
	      options.modifiers = options.modifiers || [];

	      var self = this,
	          extraHeaders = (options.extraHeaders || []).slice();

	      extraHeaders.push('Contact: ' + this.contact);
	      extraHeaders.push('Allow: ' + SIP.UA.C.ALLOWED_METHODS.toString());

	      this.sessionDescriptionHandler.getDescription(options.sessionDescriptionHandlerOptions, options.modifiers).then(function (description) {
	        self.sendRequest(SIP.C.INVITE, {
	          extraHeaders: extraHeaders,
	          body: description,
	          receiveResponse: self.receiveReinviteResponse.bind(self)
	        });
	      }).catch(function onFailure(e) {
	        if (e instanceof SIP.Exceptions.RenegotiationError) {
	          self.pendingReinvite = false;
	          self.emit('renegotiationError', e);
	          self.logger.warn('Renegotiation Error');
	          self.logger.warn(e);
	          return;
	        }
	        self.logger.error('sessionDescriptionHandler error');
	        self.logger.error(e);
	      });
	    },

	    receiveRequest: function receiveRequest(request) {
	      switch (request.method) {
	        case SIP.C.BYE:
	          request.reply(200);
	          if (this.status === C.STATUS_CONFIRMED) {
	            this.emit('bye', request);
	            this.terminated(request, SIP.C.causes.BYE);
	          }
	          break;
	        case SIP.C.INVITE:
	          if (this.status === C.STATUS_CONFIRMED) {
	            this.logger.log('re-INVITE received');
	            this.receiveReinvite(request);
	          }
	          break;
	        case SIP.C.INFO:
	          if (this.status === C.STATUS_CONFIRMED || this.status === C.STATUS_WAITING_FOR_ACK) {
	            if (this.onInfo) {
	              return this.onInfo(request);
	            }

	            var body,
	                tone,
	                duration,
	                contentType = request.getHeader('content-type'),
	                reg_tone = /^(Signal\s*?=\s*?)([0-9A-D#*]{1})(\s)?.*/,
	                reg_duration = /^(Duration\s?=\s?)([0-9]{1,4})(\s)?.*/;

	            if (contentType) {
	              if (contentType.match(/^application\/dtmf-relay/i)) {
	                if (request.body) {
	                  body = request.body.split('\r\n', 2);
	                  if (body.length === 2) {
	                    if (reg_tone.test(body[0])) {
	                      tone = body[0].replace(reg_tone, "$2");
	                    }
	                    if (reg_duration.test(body[1])) {
	                      duration = parseInt(body[1].replace(reg_duration, "$2"), 10);
	                    }
	                  }
	                }

	                new DTMF(this, tone, { duration: duration }).init_incoming(request);
	              } else {
	                request.reply(415, null, ["Accept: application/dtmf-relay"]);
	              }
	            }
	          }
	          break;
	        case SIP.C.REFER:
	          if (this.status === C.STATUS_CONFIRMED) {
	            this.logger.log('REFER received');
	            this.referContext = new SIP.ReferServerContext(this.ua, request);
	            var hasReferListener = this.listeners('referRequested').length;
	            if (hasReferListener) {
	              this.emit('referRequested', this.referContext);
	            } else {
	              this.logger.log('No referRequested listeners, automatically accepting and following the refer');
	              var options = { followRefer: true };
	              if (this.passedOptions) {
	                options.inviteOptions = this.passedOptions;
	              }
	              this.referContext.accept(options, this.modifiers);
	            }
	          }
	          break;
	        case SIP.C.NOTIFY:
	          if (this.referContext && this.referContext instanceof SIP.ReferClientContext && request.hasHeader('event') && /^refer(;.*)?$/.test(request.getHeader('event'))) {
	            this.referContext.receiveNotify(request);
	            return;
	          }
	          request.reply(200, 'OK');
	          this.emit('notify', request);
	          break;
	      }
	    },

	    /**
	     * Reception of Response for in-dialog INVITE
	     * @private
	     */
	    receiveReinviteResponse: function receiveReinviteResponse(response) {
	      var self = this;

	      if (this.status === C.STATUS_TERMINATED) {
	        return;
	      }

	      switch (true) {
	        case /^1[0-9]{2}$/.test(response.status_code):
	          break;
	        case /^2[0-9]{2}$/.test(response.status_code):
	          this.status = C.STATUS_CONFIRMED;

	          // 17.1.1.1 - For each final response that is received at the client transaction, the client transaction sends an ACK,
	          this.emit("ack", response.transaction.sendACK());
	          this.pendingReinvite = false;
	          // TODO: All of these timers should move into the Transaction layer
	          SIP.Timers.clearTimeout(self.timers.invite2xxTimer);
	          if (!this.sessionDescriptionHandler.hasDescription(response.getHeader('Content-Type'))) {
	            this.logger.error('2XX response received to re-invite but did not have a description');
	            this.emit('reinviteFailed', self);
	            this.emit('renegotiationError', new SIP.Exceptions.RenegotiationError('2XX response received to re-invite but did not have a description'));
	            break;
	          }

	          this.sessionDescriptionHandler.setDescription(response.body, this.sessionDescriptionHandlerOptions, this.modifiers).catch(function onFailure(e) {
	            self.logger.error('Could not set the description in 2XX response');
	            self.logger.error(e);
	            self.emit('reinviteFailed', self);
	            self.emit('renegotiationError', e);
	            self.sendRequest(SIP.C.BYE, {
	              extraHeaders: ['Reason: ' + SIP.Utils.getReasonHeaderValue(488, 'Not Acceptable Here')]
	            });
	            self.terminated(null, SIP.C.causes.INCOMPATIBLE_SDP);
	          }).then(function () {
	            self.emit('reinviteAccepted', self);
	          });
	          break;
	        default:
	          this.pendingReinvite = false;
	          this.logger.log('Received a non 1XX or 2XX response to a re-invite');
	          this.emit('reinviteFailed', self);
	          this.emit('renegotiationError', new SIP.Exceptions.RenegotiationError('Invalid response to a re-invite'));
	      }
	    },

	    acceptAndTerminate: function acceptAndTerminate(response, status_code, reason_phrase) {
	      var extraHeaders = [];

	      if (status_code) {
	        extraHeaders.push('Reason: ' + SIP.Utils.getReasonHeaderValue(status_code, reason_phrase));
	      }

	      // An error on dialog creation will fire 'failed' event
	      if (this.dialog || this.createDialog(response, 'UAC')) {
	        this.emit("ack", response.transaction.sendACK());
	        this.sendRequest(SIP.C.BYE, {
	          extraHeaders: extraHeaders
	        });
	      }

	      return this;
	    },

	    /**
	     * RFC3261 13.3.1.4
	     * Response retransmissions cannot be accomplished by transaction layer
	     *  since it is destroyed when receiving the first 2xx answer
	     */
	    setInvite2xxTimer: function setInvite2xxTimer(request, description) {
	      var self = this,
	          timeout = SIP.Timers.T1;

	      this.timers.invite2xxTimer = SIP.Timers.setTimeout(function invite2xxRetransmission() {
	        if (self.status !== C.STATUS_WAITING_FOR_ACK) {
	          return;
	        }

	        self.logger.log('no ACK received, attempting to retransmit OK');

	        var extraHeaders = ['Contact: ' + self.contact];

	        request.reply(200, null, extraHeaders, description);

	        timeout = Math.min(timeout * 2, SIP.Timers.T2);

	        self.timers.invite2xxTimer = SIP.Timers.setTimeout(invite2xxRetransmission, timeout);
	      }, timeout);
	    },

	    /**
	     * RFC3261 14.2
	     * If a UAS generates a 2xx response and never receives an ACK,
	     *  it SHOULD generate a BYE to terminate the dialog.
	     */
	    setACKTimer: function setACKTimer() {
	      var self = this;

	      this.timers.ackTimer = SIP.Timers.setTimeout(function () {
	        if (self.status === C.STATUS_WAITING_FOR_ACK) {
	          self.logger.log('no ACK received for an extended period of time, terminating the call');
	          SIP.Timers.clearTimeout(self.timers.invite2xxTimer);
	          self.sendRequest(SIP.C.BYE);
	          self.terminated(null, SIP.C.causes.NO_ACK);
	        }
	      }, SIP.Timers.TIMER_H);
	    },

	    /*
	     * @private
	     */
	    onTransportError: function onTransportError() {
	      if (this.status !== C.STATUS_CONFIRMED && this.status !== C.STATUS_TERMINATED) {
	        this.failed(null, SIP.C.causes.CONNECTION_ERROR);
	      }
	    },

	    onRequestTimeout: function onRequestTimeout() {
	      if (this.status === C.STATUS_CONFIRMED) {
	        this.terminated(null, SIP.C.causes.REQUEST_TIMEOUT);
	      } else if (this.status !== C.STATUS_TERMINATED) {
	        this.failed(null, SIP.C.causes.REQUEST_TIMEOUT);
	        this.terminated(null, SIP.C.causes.REQUEST_TIMEOUT);
	      }
	    },

	    onDialogError: function onDialogError(response) {
	      if (this.status === C.STATUS_CONFIRMED) {
	        this.terminated(response, SIP.C.causes.DIALOG_ERROR);
	      } else if (this.status !== C.STATUS_TERMINATED) {
	        this.failed(response, SIP.C.causes.DIALOG_ERROR);
	        this.terminated(response, SIP.C.causes.DIALOG_ERROR);
	      }
	    },

	    /**
	     * @private
	     */

	    failed: function failed(response, cause) {
	      if (this.status === C.STATUS_TERMINATED) {
	        return this;
	      }
	      this.emit('failed', response || null, cause || null);
	      return this;
	    },

	    rejected: function rejected(response, cause) {
	      this.emit('rejected', response || null, cause || null);
	      return this;
	    },

	    canceled: function canceled() {
	      if (this.sessionDescriptionHandler) {
	        this.sessionDescriptionHandler.close();
	      }
	      this.emit('cancel');
	      return this;
	    },

	    accepted: function accepted(response, cause) {
	      cause = SIP.Utils.getReasonPhrase(response && response.status_code, cause);

	      this.startTime = new Date();

	      if (this.replacee) {
	        this.replacee.emit('replaced', this);
	        this.replacee.terminate();
	      }
	      this.emit('accepted', response, cause);
	      return this;
	    },

	    terminated: function terminated(message, cause) {
	      if (this.status === C.STATUS_TERMINATED) {
	        return this;
	      }

	      this.endTime = new Date();

	      this.close();
	      this.emit('terminated', message || null, cause || null);
	      return this;
	    },

	    connecting: function connecting(request) {
	      this.emit('connecting', { request: request });
	      return this;
	    }
	  };

	  Session.C = C;
	  SIP.Session = Session;

	  InviteServerContext = function InviteServerContext(ua, request) {
	    var expires,
	        self = this,
	        contentType = request.getHeader('Content-Type'),
	        contentDisp = request.parseHeader('Content-Disposition');

	    SIP.Utils.augment(this, SIP.ServerContext, [ua, request]);
	    SIP.Utils.augment(this, SIP.Session, [ua.configuration.sessionDescriptionHandlerFactory]);

	    if (contentDisp && contentDisp.type === 'render') {
	      this.renderbody = request.body;
	      this.rendertype = contentType;
	    }

	    this.status = C.STATUS_INVITE_RECEIVED;
	    this.from_tag = request.from_tag;
	    this.id = request.call_id + this.from_tag;
	    this.request = request;
	    this.contact = this.ua.contact.toString();

	    this.receiveNonInviteResponse = function () {}; // intentional no-op

	    this.logger = ua.getLogger('sip.inviteservercontext', this.id);

	    //Save the session into the ua sessions collection.
	    this.ua.sessions[this.id] = this;

	    //Get the Expires header value if exists
	    if (request.hasHeader('expires')) {
	      expires = request.getHeader('expires') * 1000;
	    }

	    //Set 100rel if necessary
	    function set100rel(h, c) {
	      if (request.hasHeader(h) && request.getHeader(h).toLowerCase().indexOf('100rel') >= 0) {
	        self.rel100 = c;
	      }
	    }
	    set100rel('require', SIP.C.supported.REQUIRED);
	    set100rel('supported', SIP.C.supported.SUPPORTED);

	    /* Set the to_tag before
	     * replying a response code that will create a dialog.
	     */
	    request.to_tag = SIP.Utils.newTag();

	    // An error on dialog creation will fire 'failed' event
	    if (!this.createDialog(request, 'UAS', true)) {
	      request.reply(500, 'Missing Contact header field');
	      return;
	    }

	    var options = { extraHeaders: ['Contact: ' + self.contact] };

	    if (self.rel100 !== SIP.C.supported.REQUIRED) {
	      self.progress(options);
	    }
	    self.status = C.STATUS_WAITING_FOR_ANSWER;

	    // Set userNoAnswerTimer
	    self.timers.userNoAnswerTimer = SIP.Timers.setTimeout(function () {
	      request.reply(408);
	      self.failed(request, SIP.C.causes.NO_ANSWER);
	      self.terminated(request, SIP.C.causes.NO_ANSWER);
	    }, self.ua.configuration.noAnswerTimeout);

	    /* Set expiresTimer
	     * RFC3261 13.3.1
	     */
	    if (expires) {
	      self.timers.expiresTimer = SIP.Timers.setTimeout(function () {
	        if (self.status === C.STATUS_WAITING_FOR_ANSWER) {
	          request.reply(487);
	          self.failed(request, SIP.C.causes.EXPIRES);
	          self.terminated(request, SIP.C.causes.EXPIRES);
	        }
	      }, expires);
	    }

	    this.errorListener = this.onTransportError.bind(this);
	    ua.transport.on('transportError', this.errorListener);
	  };

	  InviteServerContext.prototype = Object.create({}, {
	    reject: { writable: true, value: function value(options) {
	        // Check Session Status
	        if (this.status === C.STATUS_TERMINATED) {
	          throw new SIP.Exceptions.InvalidStateError(this.status);
	        }

	        this.logger.log('rejecting RTCSession');

	        SIP.ServerContext.prototype.reject.call(this, options);
	        return this.terminated();
	      } },

	    terminate: { writable: true, value: function value(options) {
	        options = options || {};

	        var extraHeaders = (options.extraHeaders || []).slice(),
	            body = options.body,
	            dialog,
	            self = this;

	        if (this.status === C.STATUS_WAITING_FOR_ACK && this.request.server_transaction.state !== SIP.Transactions.C.STATUS_TERMINATED) {
	          dialog = this.dialog;

	          this.receiveRequest = function (request) {
	            if (request.method === SIP.C.ACK) {
	              this.sendRequest(SIP.C.BYE, {
	                extraHeaders: extraHeaders,
	                body: body
	              });
	              dialog.terminate();
	            }
	          };

	          this.request.server_transaction.on('stateChanged', function () {
	            if (this.state === SIP.Transactions.C.STATUS_TERMINATED && this.dialog) {
	              this.request = new SIP.OutgoingRequest(SIP.C.BYE, this.dialog.remote_target, this.ua, {
	                'cseq': this.dialog.local_seqnum += 1,
	                'call_id': this.dialog.id.call_id,
	                'from_uri': this.dialog.local_uri,
	                'from_tag': this.dialog.id.local_tag,
	                'to_uri': this.dialog.remote_uri,
	                'to_tag': this.dialog.id.remote_tag,
	                'route_set': this.dialog.route_set
	              }, extraHeaders, body);

	              new SIP.RequestSender({
	                request: this.request,
	                onRequestTimeout: function onRequestTimeout() {
	                  self.onRequestTimeout();
	                },
	                onTransportError: function onTransportError() {
	                  self.onTransportError();
	                },
	                receiveResponse: function receiveResponse() {
	                  return;
	                }
	              }, this.ua).send();
	              dialog.terminate();
	            }
	          });

	          this.emit('bye', this.request);
	          this.terminated();

	          // Restore the dialog into 'this' in order to be able to send the in-dialog BYE :-)
	          this.dialog = dialog;

	          // Restore the dialog into 'ua' so the ACK can reach 'this' session
	          this.ua.dialogs[dialog.id.toString()] = dialog;
	        } else if (this.status === C.STATUS_CONFIRMED) {
	          this.bye(options);
	        } else {
	          this.reject(options);
	        }

	        return this;
	      } },

	    /*
	     * @param {Object} [options.sessionDescriptionHandlerOptions] gets passed to SIP.SessionDescriptionHandler.getDescription as options
	     */
	    progress: { writable: true, value: function value(options) {
	        options = options || {};
	        var statusCode = options.statusCode || 180,
	            reasonPhrase = options.reasonPhrase,
	            extraHeaders = (options.extraHeaders || []).slice(),
	            body = options.body,
	            response;

	        if (statusCode < 100 || statusCode > 199) {
	          throw new TypeError('Invalid statusCode: ' + statusCode);
	        }

	        if (this.isCanceled || this.status === C.STATUS_TERMINATED) {
	          return this;
	        }

	        function do100rel() {
	          /* jshint validthis: true */
	          statusCode = options.statusCode || 183;

	          // Set status and add extra headers
	          this.status = C.STATUS_WAITING_FOR_PRACK;
	          extraHeaders.push('Contact: ' + this.contact);
	          extraHeaders.push('Require: 100rel');
	          extraHeaders.push('RSeq: ' + Math.floor(Math.random() * 10000));

	          // Get the session description to add to preaccept with
	          this.sessionDescriptionHandler.getDescription(options.sessionDescriptionHandlerOptions, options.modifiers).then(function onSuccess(description) {
	            if (this.isCanceled || this.status === C.STATUS_TERMINATED) {
	              return;
	            }

	            this.early_sdp = description.body;
	            this[this.hasOffer ? 'hasAnswer' : 'hasOffer'] = true;

	            // Retransmit until we get a response or we time out (see prackTimer below)
	            var timeout = SIP.Timers.T1;
	            this.timers.rel1xxTimer = SIP.Timers.setTimeout(function rel1xxRetransmission() {
	              this.request.reply(statusCode, null, extraHeaders, description);
	              timeout *= 2;
	              this.timers.rel1xxTimer = SIP.Timers.setTimeout(rel1xxRetransmission.bind(this), timeout);
	            }.bind(this), timeout);

	            // Timeout and reject INVITE if no response
	            this.timers.prackTimer = SIP.Timers.setTimeout(function () {
	              if (this.status !== C.STATUS_WAITING_FOR_PRACK) {
	                return;
	              }

	              this.logger.log('no PRACK received, rejecting the call');
	              SIP.Timers.clearTimeout(this.timers.rel1xxTimer);
	              this.request.reply(504);
	              this.terminated(null, SIP.C.causes.NO_PRACK);
	            }.bind(this), SIP.Timers.T1 * 64);

	            // Send the initial response
	            response = this.request.reply(statusCode, reasonPhrase, extraHeaders, description);
	            this.emit('progress', response, reasonPhrase);
	          }.bind(this), function onFailure() {
	            this.request.reply(480);
	            this.failed(null, SIP.C.causes.WEBRTC_ERROR);
	            this.terminated(null, SIP.C.causes.WEBRTC_ERROR);
	          }.bind(this));
	        } // end do100rel

	        function normalReply() {
	          /* jshint validthis:true */
	          response = this.request.reply(statusCode, reasonPhrase, extraHeaders, body);
	          this.emit('progress', response, reasonPhrase);
	        }

	        if (options.statusCode !== 100 && (this.rel100 === SIP.C.supported.REQUIRED || this.rel100 === SIP.C.supported.SUPPORTED && options.rel100 || this.rel100 === SIP.C.supported.SUPPORTED && this.ua.configuration.rel100 === SIP.C.supported.REQUIRED)) {
	          this.sessionDescriptionHandler = this.setupSessionDescriptionHandler();
	          this.emit('SessionDescriptionHandler-created', this.sessionDescriptionHandler);
	          if (this.sessionDescriptionHandler.hasDescription(this.request.getHeader('Content-Type'))) {
	            this.hasOffer = true;
	            this.sessionDescriptionHandler.setDescription(this.request.body, options.sessionDescriptionHandlerOptions, options.modifiers).then(do100rel.apply(this)).catch(function onFailure(e) {
	              this.logger.warn('invalid description');
	              this.logger.warn(e);
	              this.failed(null, SIP.C.causes.WEBRTC_ERROR);
	              this.terminated(null, SIP.C.causes.WEBRTC_ERROR);
	            }.bind(this));
	          } else {
	            do100rel.apply(this);
	          }
	        } else {
	          normalReply.apply(this);
	        }
	        return this;
	      } },

	    /*
	     * @param {Object} [options.sessionDescriptionHandlerOptions] gets passed to SIP.SessionDescriptionHandler.getDescription as options
	     */
	    accept: { writable: true, value: function value(options) {
	        options = options || {};

	        this.onInfo = options.onInfo;

	        var self = this,
	            request = this.request,
	            extraHeaders = (options.extraHeaders || []).slice(),
	            descriptionCreationSucceeded = function descriptionCreationSucceeded(description) {
	          var response,

	          // run for reply success callback
	          replySucceeded = function replySucceeded() {
	            self.status = C.STATUS_WAITING_FOR_ACK;

	            self.setInvite2xxTimer(request, description);
	            self.setACKTimer();
	          },


	          // run for reply failure callback
	          replyFailed = function replyFailed() {
	            self.failed(null, SIP.C.causes.CONNECTION_ERROR);
	            self.terminated(null, SIP.C.causes.CONNECTION_ERROR);
	          };

	          extraHeaders.push('Contact: ' + self.contact);
	          extraHeaders.push('Allow: ' + SIP.UA.C.ALLOWED_METHODS.toString());

	          if (!self.hasOffer) {
	            self.hasOffer = true;
	          } else {
	            self.hasAnswer = true;
	          }
	          response = request.reply(200, null, extraHeaders, description, replySucceeded, replyFailed);
	          if (self.status !== C.STATUS_TERMINATED) {
	            // Didn't fail
	            self.accepted(response, SIP.Utils.getReasonPhrase(200));
	          }
	        },
	            descriptionCreationFailed = function descriptionCreationFailed() {
	          // TODO: This should check the actual error and make sure it is an
	          //        "expected" error. Otherwise it should throw.
	          if (self.status === C.STATUS_TERMINATED) {
	            return;
	          }
	          self.request.reply(480);
	          self.failed(null, SIP.C.causes.WEBRTC_ERROR);
	          self.terminated(null, SIP.C.causes.WEBRTC_ERROR);
	        };

	        // Check Session Status
	        if (this.status === C.STATUS_WAITING_FOR_PRACK) {
	          this.status = C.STATUS_ANSWERED_WAITING_FOR_PRACK;
	          return this;
	        } else if (this.status === C.STATUS_WAITING_FOR_ANSWER) {
	          this.status = C.STATUS_ANSWERED;
	        } else if (this.status !== C.STATUS_EARLY_MEDIA) {
	          throw new SIP.Exceptions.InvalidStateError(this.status);
	        }

	        // An error on dialog creation will fire 'failed' event
	        if (!this.createDialog(request, 'UAS')) {
	          request.reply(500, 'Missing Contact header field');
	          return this;
	        }

	        SIP.Timers.clearTimeout(this.timers.userNoAnswerTimer);

	        if (this.status === C.STATUS_EARLY_MEDIA) {
	          descriptionCreationSucceeded({});
	        } else {
	          this.sessionDescriptionHandler = this.setupSessionDescriptionHandler();
	          this.emit('SessionDescriptionHandler-created', this.sessionDescriptionHandler);
	          if (this.request.getHeader('Content-Length') === '0' && !this.request.getHeader('Content-Type')) {
	            this.sessionDescriptionHandler.getDescription(options.sessionDescriptionHandlerOptions, options.modifiers).catch(descriptionCreationFailed).then(descriptionCreationSucceeded);
	          } else if (this.sessionDescriptionHandler.hasDescription(this.request.getHeader('Content-Type'))) {
	            this.hasOffer = true;
	            this.sessionDescriptionHandler.setDescription(this.request.body, options.sessionDescriptionHandlerOptions, options.modifiers).then(function () {
	              return this.sessionDescriptionHandler.getDescription(options.sessionDescriptionHandlerOptions, options.modifiers);
	            }.bind(this)).catch(descriptionCreationFailed).then(descriptionCreationSucceeded);
	          } else {
	            this.request.reply(415);
	            // TODO: Events
	            return;
	          }
	        }

	        return this;
	      } },

	    receiveRequest: { writable: true, value: function value(request) {

	        // ISC RECEIVE REQUEST

	        function confirmSession() {
	          /* jshint validthis:true */
	          var contentType, contentDisp;

	          SIP.Timers.clearTimeout(this.timers.ackTimer);
	          SIP.Timers.clearTimeout(this.timers.invite2xxTimer);
	          this.status = C.STATUS_CONFIRMED;

	          contentType = request.getHeader('Content-Type');
	          contentDisp = request.getHeader('Content-Disposition');

	          if (contentDisp && contentDisp.type === 'render') {
	            this.renderbody = request.body;
	            this.rendertype = contentType;
	          }

	          this.emit('confirmed', request);
	        }

	        switch (request.method) {
	          case SIP.C.CANCEL:
	            /* RFC3261 15 States that a UAS may have accepted an invitation while a CANCEL
	             * was in progress and that the UAC MAY continue with the session established by
	             * any 2xx response, or MAY terminate with BYE. SIP does continue with the
	             * established session. So the CANCEL is processed only if the session is not yet
	             * established.
	             */

	            /*
	             * Terminate the whole session in case the user didn't accept (or yet to send the answer) nor reject the
	             *request opening the session.
	             */
	            if (this.status === C.STATUS_WAITING_FOR_ANSWER || this.status === C.STATUS_WAITING_FOR_PRACK || this.status === C.STATUS_ANSWERED_WAITING_FOR_PRACK || this.status === C.STATUS_EARLY_MEDIA || this.status === C.STATUS_ANSWERED) {

	              this.status = C.STATUS_CANCELED;
	              this.request.reply(487);
	              this.canceled(request);
	              this.rejected(request, SIP.C.causes.CANCELED);
	              this.failed(request, SIP.C.causes.CANCELED);
	              this.terminated(request, SIP.C.causes.CANCELED);
	            }
	            break;
	          case SIP.C.ACK:
	            if (this.status === C.STATUS_WAITING_FOR_ACK) {
	              if (this.sessionDescriptionHandler.hasDescription(request.getHeader('Content-Type'))) {
	                // ACK contains answer to an INVITE w/o SDP negotiation
	                this.hasAnswer = true;
	                this.sessionDescriptionHandler.setDescription(request.body, this.sessionDescriptionHandlerOptions, this.modifiers).then(
	                // TODO: Catch then .then
	                confirmSession.bind(this), function onFailure(e) {
	                  this.logger.warn(e);
	                  this.terminate({
	                    statusCode: '488',
	                    reasonPhrase: 'Bad Media Description'
	                  });
	                  this.failed(request, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	                  this.terminated(request, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	                }.bind(this));
	              } else {
	                confirmSession.apply(this);
	              }
	            }
	            break;
	          case SIP.C.PRACK:
	            if (this.status === C.STATUS_WAITING_FOR_PRACK || this.status === C.STATUS_ANSWERED_WAITING_FOR_PRACK) {
	              if (!this.hasAnswer) {
	                this.sessionDescriptionHandler = this.setupSessionDescriptionHandler();
	                this.emit('SessionDescriptionHandler-created', this.sessionDescriptionHandler);
	                if (this.sessionDescriptionHandler.hasDescription(request.getHeader('Content-Type'))) {
	                  this.hasAnswer = true;
	                  this.sessionDescriptionHandler.setDescription(request.body, this.sessionDescriptionHandlerOptions, this.modifiers).then(function onSuccess() {
	                    SIP.Timers.clearTimeout(this.timers.rel1xxTimer);
	                    SIP.Timers.clearTimeout(this.timers.prackTimer);
	                    request.reply(200);
	                    if (this.status === C.STATUS_ANSWERED_WAITING_FOR_PRACK) {
	                      this.status = C.STATUS_EARLY_MEDIA;
	                      this.accept();
	                    }
	                    this.status = C.STATUS_EARLY_MEDIA;
	                  }.bind(this), function onFailure(e) {
	                    this.logger.warn(e);
	                    this.terminate({
	                      statusCode: '488',
	                      reasonPhrase: 'Bad Media Description'
	                    });
	                    this.failed(request, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	                    this.terminated(request, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	                  }.bind(this));
	                } else {
	                  this.terminate({
	                    statusCode: '488',
	                    reasonPhrase: 'Bad Media Description'
	                  });
	                  this.failed(request, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	                  this.terminated(request, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	                }
	              } else {
	                SIP.Timers.clearTimeout(this.timers.rel1xxTimer);
	                SIP.Timers.clearTimeout(this.timers.prackTimer);
	                request.reply(200);

	                if (this.status === C.STATUS_ANSWERED_WAITING_FOR_PRACK) {
	                  this.status = C.STATUS_EARLY_MEDIA;
	                  this.accept();
	                }
	                this.status = C.STATUS_EARLY_MEDIA;
	              }
	            } else if (this.status === C.STATUS_EARLY_MEDIA) {
	              request.reply(200);
	            }
	            break;
	          default:
	            Session.prototype.receiveRequest.apply(this, [request]);
	            break;
	        }
	      } },

	    // Internal Function to setup the handler consistently
	    setupSessionDescriptionHandler: { writable: true, value: function value() {
	        if (this.sessionDescriptionHandler) {
	          return this.sessionDescriptionHandler;
	        }
	        return this.sessionDescriptionHandlerFactory(this, this.ua.configuration.sessionDescriptionHandlerFactoryOptions);
	      } },

	    onTransportError: { writable: true, value: function value() {
	        if (this.status !== C.STATUS_CONFIRMED && this.status !== C.STATUS_TERMINATED) {
	          this.failed(null, SIP.C.causes.CONNECTION_ERROR);
	        }
	      } },

	    onRequestTimeout: { writable: true, value: function value() {
	        if (this.status === C.STATUS_CONFIRMED) {
	          this.terminated(null, SIP.C.causes.REQUEST_TIMEOUT);
	        } else if (this.status !== C.STATUS_TERMINATED) {
	          this.failed(null, SIP.C.causes.REQUEST_TIMEOUT);
	          this.terminated(null, SIP.C.causes.REQUEST_TIMEOUT);
	        }
	      } }

	  });

	  SIP.InviteServerContext = InviteServerContext;

	  InviteClientContext = function InviteClientContext(ua, target, options, modifiers) {
	    options = options || {};
	    this.passedOptions = options; // Save for later to use with refer
	    options.params = Object.create(options.params || Object.prototype);

	    var extraHeaders = (options.extraHeaders || []).slice(),
	        sessionDescriptionHandlerFactory = ua.configuration.sessionDescriptionHandlerFactory;

	    this.sessionDescriptionHandlerFactoryOptions = ua.configuration.sessionDescriptionHandlerFactoryOptions || {};
	    this.sessionDescriptionHandlerOptions = options.sessionDescriptionHandlerOptions || {};
	    this.modifiers = modifiers;

	    this.inviteWithoutSdp = options.inviteWithoutSdp || false;

	    // Set anonymous property
	    this.anonymous = options.anonymous || false;

	    // Custom data to be sent either in INVITE or in ACK
	    this.renderbody = options.renderbody || null;
	    this.rendertype = options.rendertype || 'text/plain';

	    // Session parameter initialization
	    this.from_tag = SIP.Utils.newTag();
	    options.params.from_tag = this.from_tag;

	    /* Do not add ;ob in initial forming dialog requests if the registration over
	     *  the current connection got a GRUU URI.
	     */
	    this.contact = ua.contact.toString({
	      anonymous: this.anonymous,
	      outbound: this.anonymous ? !ua.contact.temp_gruu : !ua.contact.pub_gruu
	    });

	    if (this.anonymous) {
	      options.params.from_displayName = 'Anonymous';
	      options.params.from_uri = 'sip:anonymous@anonymous.invalid';

	      extraHeaders.push('P-Preferred-Identity: ' + ua.configuration.uri.toString());
	      extraHeaders.push('Privacy: id');
	    }
	    extraHeaders.push('Contact: ' + this.contact);
	    extraHeaders.push('Allow: ' + SIP.UA.C.ALLOWED_METHODS.toString());
	    if (this.inviteWithoutSdp && this.renderbody) {
	      extraHeaders.push('Content-Type: ' + this.rendertype);
	      extraHeaders.push('Content-Disposition: render;handling=optional');
	    }

	    if (ua.configuration.rel100 === SIP.C.supported.REQUIRED) {
	      extraHeaders.push('Require: 100rel');
	    }
	    if (ua.configuration.replaces === SIP.C.supported.REQUIRED) {
	      extraHeaders.push('Require: replaces');
	    }

	    options.extraHeaders = extraHeaders;

	    SIP.Utils.augment(this, SIP.ClientContext, [ua, SIP.C.INVITE, target, options]);
	    SIP.Utils.augment(this, SIP.Session, [sessionDescriptionHandlerFactory]);

	    // Check Session Status
	    if (this.status !== C.STATUS_NULL) {
	      throw new SIP.Exceptions.InvalidStateError(this.status);
	    }

	    // OutgoingSession specific parameters
	    this.isCanceled = false;
	    this.received_100 = false;

	    this.method = SIP.C.INVITE;

	    this.receiveNonInviteResponse = this.receiveResponse;
	    this.receiveResponse = this.receiveInviteResponse;

	    this.logger = ua.getLogger('sip.inviteclientcontext');

	    ua.applicants[this] = this;

	    this.id = this.request.call_id + this.from_tag;

	    this.onInfo = options.onInfo;

	    this.errorListener = this.onTransportError.bind(this);
	    ua.transport.on('transportError', this.errorListener);
	  };

	  InviteClientContext.prototype = Object.create({}, {
	    invite: { writable: true, value: function value() {
	        var self = this;

	        //Save the session into the ua sessions collection.
	        //Note: placing in constructor breaks call to request.cancel on close... User does not need this anyway
	        this.ua.sessions[this.id] = this;

	        if (this.inviteWithoutSdp) {
	          //just send an invite with no sdp...
	          this.request.body = self.renderbody;
	          this.status = C.STATUS_INVITE_SENT;
	          this.send();
	        } else {
	          //Initialize Media Session
	          this.sessionDescriptionHandler = this.sessionDescriptionHandlerFactory(this, this.sessionDescriptionHandlerFactoryOptions);
	          this.emit('SessionDescriptionHandler-created', this.sessionDescriptionHandler);

	          this.sessionDescriptionHandler.getDescription(this.sessionDescriptionHandlerOptions, this.modifiers).then(function onSuccess(description) {
	            if (self.isCanceled || self.status === C.STATUS_TERMINATED) {
	              return;
	            }
	            self.hasOffer = true;
	            self.request.body = description;
	            self.status = C.STATUS_INVITE_SENT;
	            self.send();
	          }, function onFailure() {
	            if (self.status === C.STATUS_TERMINATED) {
	              return;
	            }
	            self.failed(null, SIP.C.causes.WEBRTC_ERROR);
	            self.terminated(null, SIP.C.causes.WEBRTC_ERROR);
	          });
	        }

	        return this;
	      } },

	    receiveInviteResponse: { writable: true, value: function value(response) {
	        var cause,
	            session = this,
	            id = response.call_id + response.from_tag + response.to_tag,
	            extraHeaders = [],
	            options = {};

	        if (this.status === C.STATUS_TERMINATED || response.method !== SIP.C.INVITE) {
	          return;
	        }

	        if (this.dialog && response.status_code >= 200 && response.status_code <= 299) {
	          if (id !== this.dialog.id.toString()) {
	            if (!this.createDialog(response, 'UAC', true)) {
	              return;
	            }
	            this.emit("ack", response.transaction.sendACK({ body: SIP.Utils.generateFakeSDP(response.body) }));
	            this.earlyDialogs[id].sendRequest(this, SIP.C.BYE);

	            /* NOTE: This fails because the forking proxy does not recognize that an unanswerable
	             * leg (due to peerConnection limitations) has been answered first. If your forking
	             * proxy does not hang up all unanswered branches on the first branch answered, remove this.
	             */
	            if (this.status !== C.STATUS_CONFIRMED) {
	              this.failed(response, SIP.C.causes.WEBRTC_ERROR);
	              this.terminated(response, SIP.C.causes.WEBRTC_ERROR);
	            }
	            return;
	          } else if (this.status === C.STATUS_CONFIRMED) {
	            this.emit("ack", response.transaction.sendACK());
	            return;
	          } else if (!this.hasAnswer) {
	            // invite w/o sdp is waiting for callback
	            //an invite with sdp must go on, and hasAnswer is true
	            return;
	          }
	        }

	        if (this.dialog && response.status_code < 200) {
	          /*
	            Early media has been set up with at least one other different branch,
	            but a final 2xx response hasn't been received
	          */
	          if (this.dialog.pracked.indexOf(response.getHeader('rseq')) !== -1 || this.dialog.pracked[this.dialog.pracked.length - 1] >= response.getHeader('rseq') && this.dialog.pracked.length > 0) {
	            return;
	          }

	          if (!this.earlyDialogs[id] && !this.createDialog(response, 'UAC', true)) {
	            return;
	          }

	          if (this.earlyDialogs[id].pracked.indexOf(response.getHeader('rseq')) !== -1 || this.earlyDialogs[id].pracked[this.earlyDialogs[id].pracked.length - 1] >= response.getHeader('rseq') && this.earlyDialogs[id].pracked.length > 0) {
	            return;
	          }

	          extraHeaders.push('RAck: ' + response.getHeader('rseq') + ' ' + response.getHeader('cseq'));
	          this.earlyDialogs[id].pracked.push(response.getHeader('rseq'));

	          this.earlyDialogs[id].sendRequest(this, SIP.C.PRACK, {
	            extraHeaders: extraHeaders,
	            body: SIP.Utils.generateFakeSDP(response.body)
	          });
	          return;
	        }

	        // Proceed to cancellation if the user requested.
	        if (this.isCanceled) {
	          if (response.status_code >= 100 && response.status_code < 200) {
	            this.request.cancel(this.cancelReason, extraHeaders);
	            this.canceled(null);
	          } else if (response.status_code >= 200 && response.status_code < 299) {
	            this.acceptAndTerminate(response);
	            this.emit('bye', this.request);
	          } else if (response.status_code >= 300) {
	            cause = SIP.C.REASON_PHRASE[response.status_code] || SIP.C.causes.CANCELED;
	            this.rejected(response, cause);
	            this.failed(response, cause);
	            this.terminated(response, cause);
	          }
	          return;
	        }

	        switch (true) {
	          case /^100$/.test(response.status_code):
	            this.received_100 = true;
	            this.emit('progress', response);
	            break;
	          case /^1[0-9]{2}$/.test(response.status_code):
	            // Do nothing with 1xx responses without To tag.
	            if (!response.to_tag) {
	              this.logger.warn('1xx response received without to tag');
	              break;
	            }

	            // Create Early Dialog if 1XX comes with contact
	            if (response.hasHeader('contact')) {
	              // An error on dialog creation will fire 'failed' event
	              if (!this.createDialog(response, 'UAC', true)) {
	                break;
	              }
	            }

	            this.status = C.STATUS_1XX_RECEIVED;

	            if (response.hasHeader('P-Asserted-Identity')) {
	              this.assertedIdentity = new SIP.NameAddrHeader.parse(response.getHeader('P-Asserted-Identity'));
	            }

	            if (response.hasHeader('require') && response.getHeader('require').indexOf('100rel') !== -1) {

	              // Do nothing if this.dialog is already confirmed
	              if (this.dialog || !this.earlyDialogs[id]) {
	                break;
	              }

	              if (this.earlyDialogs[id].pracked.indexOf(response.getHeader('rseq')) !== -1 || this.earlyDialogs[id].pracked[this.earlyDialogs[id].pracked.length - 1] >= response.getHeader('rseq') && this.earlyDialogs[id].pracked.length > 0) {
	                return;
	              }
	              // TODO: This may be broken. It may have to be on the early dialog
	              this.sessionDescriptionHandler = this.sessionDescriptionHandlerFactory(this, this.sessionDescriptionHandlerFactoryOptions);
	              this.emit('SessionDescriptionHandler-created', this.sessionDescriptionHandler);
	              if (!this.sessionDescriptionHandler.hasDescription(response.getHeader('Content-Type'))) {
	                extraHeaders.push('RAck: ' + response.getHeader('rseq') + ' ' + response.getHeader('cseq'));
	                this.earlyDialogs[id].pracked.push(response.getHeader('rseq'));
	                this.earlyDialogs[id].sendRequest(this, SIP.C.PRACK, {
	                  extraHeaders: extraHeaders
	                });
	                this.emit('progress', response);
	              } else if (this.hasOffer) {
	                if (!this.createDialog(response, 'UAC')) {
	                  break;
	                }
	                this.hasAnswer = true;
	                this.dialog.pracked.push(response.getHeader('rseq'));

	                this.sessionDescriptionHandler.setDescription(response.body, this.sessionDescriptionHandlerOptions, this.modifiers).then(function onSuccess() {
	                  extraHeaders.push('RAck: ' + response.getHeader('rseq') + ' ' + response.getHeader('cseq'));

	                  session.sendRequest(SIP.C.PRACK, {
	                    extraHeaders: extraHeaders,
	                    receiveResponse: function receiveResponse() {}
	                  });
	                  session.status = C.STATUS_EARLY_MEDIA;
	                  session.emit('progress', response);
	                }, function onFailure(e) {
	                  session.logger.warn(e);
	                  session.acceptAndTerminate(response, 488, 'Not Acceptable Here');
	                  session.failed(response, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	                });
	              } else {
	                var earlyDialog = this.earlyDialogs[id];
	                var earlyMedia = earlyDialog.sessionDescriptionHandler = this.sessionDescriptionHandlerFactory(this, this.sessionDescriptionHandlerFactoryOptions);
	                this.emit('SessionDescriptionHandler-created', earlyMedia);

	                earlyDialog.pracked.push(response.getHeader('rseq'));

	                earlyMedia.setDescription(response.body, session.sessionDescriptionHandlerOptions, session.modifers).then(earlyMedia.getDescription.bind(earlyMedia, session.sessionDescriptionHandlerOptions, session.modifiers)).then(function onSuccess(description) {
	                  extraHeaders.push('RAck: ' + response.getHeader('rseq') + ' ' + response.getHeader('cseq'));
	                  earlyDialog.sendRequest(session, SIP.C.PRACK, {
	                    extraHeaders: extraHeaders,
	                    body: description
	                  });
	                  session.status = C.STATUS_EARLY_MEDIA;
	                  session.emit('progress', response);
	                }).catch(function onFailure(e) {
	                  if (e instanceof SIP.Exceptions.GetDescriptionError) {
	                    earlyDialog.pracked.push(response.getHeader('rseq'));
	                    if (session.status === C.STATUS_TERMINATED) {
	                      return;
	                    }
	                    session.failed(null, SIP.C.causes.WEBRTC_ERROR);
	                    session.terminated(null, SIP.C.causes.WEBRTC_ERROR);
	                  } else {
	                    earlyDialog.pracked.splice(earlyDialog.pracked.indexOf(response.getHeader('rseq')), 1);
	                    // Could not set remote description
	                    session.logger.warn('invalid description');
	                    session.logger.warn(e);
	                  }
	                });
	              }
	            } else {
	              this.emit('progress', response);
	            }
	            break;
	          case /^2[0-9]{2}$/.test(response.status_code):
	            var cseq = this.request.cseq + ' ' + this.request.method;
	            if (cseq !== response.getHeader('cseq')) {
	              break;
	            }

	            if (response.hasHeader('P-Asserted-Identity')) {
	              this.assertedIdentity = new SIP.NameAddrHeader.parse(response.getHeader('P-Asserted-Identity'));
	            }

	            if (this.status === C.STATUS_EARLY_MEDIA && this.dialog) {
	              this.status = C.STATUS_CONFIRMED;
	              options = {};
	              if (this.renderbody) {
	                extraHeaders.push('Content-Type: ' + this.rendertype);
	                options.extraHeaders = extraHeaders;
	                options.body = this.renderbody;
	              }
	              this.emit("ack", response.transaction.sendACK(options));
	              this.accepted(response);
	              break;
	            }
	            // Do nothing if this.dialog is already confirmed
	            if (this.dialog) {
	              break;
	            }

	            // This is an invite without sdp
	            if (!this.hasOffer) {
	              if (this.earlyDialogs[id] && this.earlyDialogs[id].sessionDescriptionHandler) {
	                //REVISIT
	                this.hasOffer = true;
	                this.hasAnswer = true;
	                this.sessionDescriptionHandler = this.earlyDialogs[id].sessionDescriptionHandler;
	                if (!this.createDialog(response, 'UAC')) {
	                  break;
	                }
	                this.status = C.STATUS_CONFIRMED;
	                this.emit("ack", response.transaction.sendACK());

	                this.accepted(response);
	              } else {
	                this.sessionDescriptionHandler = this.sessionDescriptionHandlerFactory(this, this.sessionDescriptionHandlerFactoryOptions);
	                this.emit('SessionDescriptionHandler-created', this.sessionDescriptionHandler);

	                if (!this.sessionDescriptionHandler.hasDescription(response.getHeader('Content-Type'))) {
	                  this.acceptAndTerminate(response, 400, 'Missing session description');
	                  this.failed(response, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	                  break;
	                }
	                if (!this.createDialog(response, 'UAC')) {
	                  break;
	                }
	                this.hasOffer = true;
	                this.sessionDescriptionHandler.setDescription(response.body, this.sessionDescriptionHandlerOptions, this.modifiers).then(this.sessionDescriptionHandler.getDescription.bind(this.sessionDescriptionHandler, this.sessionDescriptionHandlerOptions, this.modifiers)).then(function onSuccess(description) {
	                  //var localMedia;
	                  if (session.isCanceled || session.status === C.STATUS_TERMINATED) {
	                    return;
	                  }

	                  session.status = C.STATUS_CONFIRMED;
	                  session.hasAnswer = true;

	                  session.emit("ack", response.transaction.sendACK({ body: description }));
	                  session.accepted(response);
	                }).catch(function onFailure(e) {
	                  if (e instanceof SIP.Exceptions.GetDescriptionError) {
	                    // TODO do something here
	                    session.logger.warn("there was a problem");
	                  } else {
	                    session.logger.warn('invalid description');
	                    session.logger.warn(e);
	                    session.acceptAndTerminate(response, 488, 'Invalid session description');
	                    session.failed(response, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	                  }
	                });
	              }
	            } else if (this.hasAnswer) {
	              if (this.renderbody) {
	                extraHeaders.push('Content-Type: ' + session.rendertype);
	                options.extraHeaders = extraHeaders;
	                options.body = this.renderbody;
	              }
	              this.emit("ack", response.transaction.sendACK(options));
	            } else {
	              if (!this.sessionDescriptionHandler.hasDescription(response.getHeader('Content-Type'))) {
	                this.acceptAndTerminate(response, 400, 'Missing session description');
	                this.failed(response, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	                break;
	              }
	              if (!this.createDialog(response, 'UAC')) {
	                break;
	              }
	              this.hasAnswer = true;
	              this.sessionDescriptionHandler.setDescription(response.body, this.sessionDescriptionHandlerOptions, this.modifiers).then(function onSuccess() {
	                var options = {};
	                session.status = C.STATUS_CONFIRMED;
	                if (session.renderbody) {
	                  extraHeaders.push('Content-Type: ' + session.rendertype);
	                  options.extraHeaders = extraHeaders;
	                  options.body = session.renderbody;
	                }
	                session.emit("ack", response.transaction.sendACK(options));
	                session.accepted(response);
	              }, function onFailure(e) {
	                session.logger.warn(e);
	                session.acceptAndTerminate(response, 488, 'Not Acceptable Here');
	                session.failed(response, SIP.C.causes.BAD_MEDIA_DESCRIPTION);
	              });
	            }
	            break;
	          default:
	            cause = SIP.Utils.sipErrorCause(response.status_code);
	            this.rejected(response, cause);
	            this.failed(response, cause);
	            this.terminated(response, cause);
	        }
	      } },

	    cancel: { writable: true, value: function value(options) {
	        options = options || {};

	        options.extraHeaders = (options.extraHeaders || []).slice();

	        // Check Session Status
	        if (this.status === C.STATUS_TERMINATED || this.status === C.STATUS_CONFIRMED) {
	          throw new SIP.Exceptions.InvalidStateError(this.status);
	        }

	        this.logger.log('canceling RTCSession');

	        var cancel_reason = SIP.Utils.getCancelReason(options.status_code, options.reason_phrase);

	        // Check Session Status
	        if (this.status === C.STATUS_NULL || this.status === C.STATUS_INVITE_SENT && !this.received_100) {
	          this.isCanceled = true;
	          this.cancelReason = cancel_reason;
	        } else if (this.status === C.STATUS_INVITE_SENT || this.status === C.STATUS_1XX_RECEIVED || this.status === C.STATUS_EARLY_MEDIA) {
	          this.request.cancel(cancel_reason, options.extraHeaders);
	        }

	        return this.canceled();
	      } },

	    terminate: { writable: true, value: function value(options) {
	        if (this.status === C.STATUS_TERMINATED) {
	          return this;
	        }

	        if (this.status === C.STATUS_WAITING_FOR_ACK || this.status === C.STATUS_CONFIRMED) {
	          this.bye(options);
	        } else {
	          this.cancel(options);
	        }

	        return this;
	      } },

	    receiveRequest: { writable: true, value: function value(request) {
	        // ICC RECEIVE REQUEST

	        // Reject CANCELs
	        if (request.method === SIP.C.CANCEL) ;

	        if (request.method === SIP.C.ACK && this.status === C.STATUS_WAITING_FOR_ACK) {

	          SIP.Timers.clearTimeout(this.timers.ackTimer);
	          SIP.Timers.clearTimeout(this.timers.invite2xxTimer);
	          this.status = C.STATUS_CONFIRMED;

	          this.accepted();
	        }

	        return Session.prototype.receiveRequest.apply(this, [request]);
	      } },

	    onTransportError: { writable: true, value: function value() {
	        if (this.status !== C.STATUS_CONFIRMED && this.status !== C.STATUS_TERMINATED) {
	          this.failed(null, SIP.C.causes.CONNECTION_ERROR);
	        }
	      } },

	    onRequestTimeout: { writable: true, value: function value() {
	        if (this.status === C.STATUS_CONFIRMED) {
	          this.terminated(null, SIP.C.causes.REQUEST_TIMEOUT);
	        } else if (this.status !== C.STATUS_TERMINATED) {
	          this.failed(null, SIP.C.causes.REQUEST_TIMEOUT);
	          this.terminated(null, SIP.C.causes.REQUEST_TIMEOUT);
	        }
	      } }

	  });

	  SIP.InviteClientContext = InviteClientContext;

	  ReferClientContext = function ReferClientContext(ua, applicant, target, options) {
	    this.options = options || {};
	    this.extraHeaders = (this.options.extraHeaders || []).slice();

	    if (ua === undefined || applicant === undefined || target === undefined) {
	      throw new TypeError('Not enough arguments');
	    }

	    SIP.Utils.augment(this, SIP.ClientContext, [ua, SIP.C.REFER, applicant.remoteIdentity.uri.toString(), options]);

	    this.applicant = applicant;

	    var withReplaces = target instanceof SIP.InviteServerContext || target instanceof SIP.InviteClientContext;
	    if (withReplaces) {
	      // Attended Transfer
	      // All of these fields should be defined based on the check above
	      this.target = '"' + target.remoteIdentity.friendlyName + '" ' + '<' + target.dialog.remote_target.toString() + '?Replaces=' + target.dialog.id.call_id + '%3Bto-tag%3D' + target.dialog.id.remote_tag + '%3Bfrom-tag%3D' + target.dialog.id.local_tag + '>';
	    } else {
	      // Blind Transfer
	      // Refer-To: <sip:bob@example.com>
	      try {
	        this.target = SIP.Grammar.parse(target, 'Refer_To').uri || target;
	      } catch (e) {
	        this.logger.debug(".refer() cannot parse Refer_To from", target);
	        this.logger.debug("...falling through to normalizeTarget()");
	      }

	      // Check target validity
	      this.target = this.ua.normalizeTarget(this.target);
	      if (!this.target) {
	        throw new TypeError('Invalid target: ' + target);
	      }
	    }

	    if (this.ua) {
	      this.extraHeaders.push('Referred-By: <' + this.ua.configuration.uri + '>');
	    }
	    // TODO: Check that this is correct isc/icc
	    this.extraHeaders.push('Contact: ' + applicant.contact);
	    this.extraHeaders.push('Allow: ' + SIP.UA.C.ALLOWED_METHODS.toString());
	    this.extraHeaders.push('Refer-To: ' + this.target);

	    this.errorListener = this.onTransportError.bind(this);
	    ua.transport.on('transportError', this.errorListener);
	  };

	  ReferClientContext.prototype = Object.create({}, {

	    refer: { writable: true, value: function value(options) {
	        options = options || {};

	        var extraHeaders = (this.extraHeaders || []).slice();
	        if (options.extraHeaders) {
	          extraHeaders.concat(options.extraHeaders);
	        }

	        this.applicant.sendRequest(SIP.C.REFER, {
	          extraHeaders: this.extraHeaders,
	          receiveResponse: function (response) {
	            if (/^1[0-9]{2}$/.test(response.status_code)) {
	              this.emit('referRequestProgress', this);
	            } else if (/^2[0-9]{2}$/.test(response.status_code)) {
	              this.emit('referRequestAccepted', this);
	            } else if (/^[4-6][0-9]{2}$/.test(response.status_code)) {
	              this.emit('referRequestRejected', this);
	            }
	            if (options.receiveResponse) {
	              options.receiveResponse(response);
	            }
	          }.bind(this)
	        });
	        return this;
	      } },

	    receiveNotify: { writable: true, value: function value(request) {
	        // If we can correctly handle this, then we need to send a 200 OK!
	        if (request.hasHeader('Content-Type') && request.getHeader('Content-Type').search(/^message\/sipfrag/) !== -1) {
	          var messageBody = SIP.Grammar.parse(request.body, 'sipfrag');
	          if (messageBody === -1) {
	            request.reply(489, 'Bad Event');
	            return;
	          }
	          switch (true) {
	            case /^1[0-9]{2}$/.test(messageBody.status_code):
	              this.emit('referProgress', this);
	              break;
	            case /^2[0-9]{2}$/.test(messageBody.status_code):
	              this.emit('referAccepted', this);
	              if (!this.options.activeAfterTransfer && this.applicant.terminate) {
	                this.applicant.terminate();
	              }
	              break;
	            default:
	              this.emit('referRejected', this);
	              break;
	          }
	          request.reply(200);
	          this.emit('notify', request);
	          return;
	        }
	        request.reply(489, 'Bad Event');
	      } }
	  });

	  SIP.ReferClientContext = ReferClientContext;

	  ReferServerContext = function ReferServerContext(ua, request) {
	    SIP.Utils.augment(this, SIP.ServerContext, [ua, request]);

	    this.ua = ua;

	    this.status = C.STATUS_INVITE_RECEIVED;
	    this.from_tag = request.from_tag;
	    this.id = request.call_id + this.from_tag;
	    this.request = request;
	    this.contact = this.ua.contact.toString();

	    this.logger = ua.getLogger('sip.referservercontext', this.id);

	    // RFC 3515 2.4.1
	    if (!this.request.hasHeader('refer-to')) {
	      this.logger.warn('Invalid REFER packet. A refer-to header is required. Rejecting refer.');
	      this.reject();
	      return;
	    }

	    this.referTo = this.request.parseHeader('refer-to');

	    // TODO: Must set expiration timer and send 202 if there is no response by then

	    this.referredSession = this.ua.findSession(request);

	    // Needed to send the NOTIFY's
	    this.cseq = Math.floor(Math.random() * 10000);
	    this.call_id = this.request.call_id;
	    this.from_uri = this.request.to.uri;
	    this.from_tag = this.request.to.parameters.tag;
	    this.remote_target = this.request.headers.Contact[0].parsed.uri;
	    this.to_uri = this.request.from.uri;
	    this.to_tag = this.request.from_tag;
	    this.route_set = this.request.getHeaders('record-route');

	    this.receiveNonInviteResponse = function () {};

	    if (this.request.hasHeader('referred-by')) {
	      this.referredBy = this.request.getHeader('referred-by');
	    }

	    if (this.referTo.uri.hasHeader('replaces')) {
	      this.replaces = this.referTo.uri.getHeader('replaces');
	    }

	    this.errorListener = this.onTransportError.bind(this);
	    ua.transport.on('transportError', this.errorListener);

	    this.status = C.STATUS_WAITING_FOR_ANSWER;
	  };

	  ReferServerContext.prototype = Object.create({}, {

	    progress: { writable: true, value: function value() {
	        if (this.status !== C.STATUS_WAITING_FOR_ANSWER) {
	          throw new SIP.Exceptions.InvalidStateError(this.status);
	        }
	        this.request.reply(100);
	      } },

	    reject: { writable: true, value: function value(options) {
	        if (this.status === C.STATUS_TERMINATED) {
	          throw new SIP.Exceptions.InvalidStateError(this.status);
	        }
	        this.logger.log('Rejecting refer');
	        this.status = C.STATUS_TERMINATED;
	        SIP.ServerContext.prototype.reject.call(this, options);
	        this.emit('referRequestRejected', this);
	      } },

	    accept: { writable: true, value: function value(options, modifiers) {
	        options = options || {};

	        if (this.status === C.STATUS_WAITING_FOR_ANSWER) {
	          this.status = C.STATUS_ANSWERED;
	        } else {
	          throw new SIP.Exceptions.InvalidStateError(this.status);
	        }

	        this.request.reply(202, 'Accepted');
	        this.emit('referRequestAccepted', this);

	        if (options.followRefer) {
	          this.logger.log('Accepted refer, attempting to automatically follow it');

	          var target = this.referTo.uri;
	          if (!target.scheme.match("^sips?$")) {
	            this.logger.error('SIP.js can only automatically follow SIP refer target');
	            this.reject();
	            return;
	          }

	          var inviteOptions = options.inviteOptions || {};
	          var extraHeaders = (inviteOptions.extraHeaders || []).slice();
	          if (this.replaces) {
	            // decodeURIComponent is a holdover from 2c086eb4. Not sure that it is actually necessary
	            extraHeaders.push('Replaces: ' + decodeURIComponent(this.replaces));
	          }

	          if (this.referredBy) {
	            extraHeaders.push('Referred-By: ' + this.referredBy);
	          }

	          inviteOptions.extraHeaders = extraHeaders;

	          target.clearHeaders();

	          this.targetSession = this.ua.invite(target, inviteOptions, modifiers);

	          this.emit('referInviteSent', this);

	          this.targetSession.once('progress', function () {
	            this.sendNotify('SIP/2.0 100 Trying');
	            this.emit('referProgress', this);
	            if (this.referredSession) {
	              this.referredSession.emit('referProgress', this);
	            }
	          }.bind(this));
	          this.targetSession.once('accepted', function () {
	            this.logger.log('Successfully followed the refer');
	            this.sendNotify('SIP/2.0 200 OK');
	            this.emit('referAccepted', this);
	            if (this.referredSession) {
	              this.referredSession.emit('referAccepted', this);
	            }
	          }.bind(this));

	          var referFailed = function referFailed(response) {
	            if (this.status === C.STATUS_TERMINATED) {
	              return; // No throw here because it is possible this gets called multiple times
	            }
	            this.logger.log('Refer was not successful. Resuming session');
	            if (response && response.status_code === 429) {
	              this.logger.log('Alerting referrer that identity is required.');
	              this.sendNotify('SIP/2.0 429 Provide Referrer Identity');
	              return;
	            }
	            this.sendNotify('SIP/2.0 603 Declined');
	            // Must change the status after sending the final Notify or it will not send due to check
	            this.status = C.STATUS_TERMINATED;
	            this.emit('referRejected', this);
	            if (this.referredSession) {
	              this.referredSession.emit('referRejected');
	            }
	          };

	          this.targetSession.once('rejected', referFailed.bind(this));
	          this.targetSession.once('failed', referFailed.bind(this));
	        } else {
	          this.logger.log('Accepted refer, but did not automatically follow it');
	          this.sendNotify('SIP/2.0 200 OK');
	          this.emit('referAccepted', this);
	          if (this.referredSession) {
	            this.referredSession.emit('referAccepted', this);
	          }
	        }
	      } },

	    sendNotify: { writable: true, value: function value(body) {
	        if (this.status !== C.STATUS_ANSWERED) {
	          throw new SIP.Exceptions.InvalidStateError(this.status);
	        }
	        if (SIP.Grammar.parse(body, 'sipfrag') === -1) {
	          throw new Error('sipfrag body is required to send notify for refer');
	        }

	        var request = new SIP.OutgoingRequest(SIP.C.NOTIFY, this.remote_target, this.ua, {
	          cseq: this.cseq += 1, // randomly generated then incremented on each additional notify
	          call_id: this.call_id, // refer call_id
	          from_uri: this.from_uri,
	          from_tag: this.from_tag,
	          to_uri: this.to_uri,
	          to_tag: this.to_tag,
	          route_set: this.route_set
	        }, ['Event: refer', 'Subscription-State: terminated', 'Content-Type: message/sipfrag'], body);

	        new SIP.RequestSender({
	          request: request,
	          onRequestTimeout: function onRequestTimeout() {
	            return;
	          },
	          onTransportError: function onTransportError() {
	            return;
	          },
	          receiveResponse: function receiveResponse() {
	            return;
	          }
	        }, this.ua).send();
	      } }
	  });

	  SIP.ReferServerContext = ReferServerContext;
	};

	/***/ }),
	/* 24 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview DTMF
	 */

	/**
	 * @class DTMF
	 * @param {SIP.Session} session
	 */

	module.exports = function (SIP) {

	  var _DTMF,
	      C = {
	    MIN_DURATION: 70,
	    MAX_DURATION: 6000,
	    DEFAULT_DURATION: 100,
	    MIN_INTER_TONE_GAP: 50,
	    DEFAULT_INTER_TONE_GAP: 500
	  };

	  _DTMF = function DTMF(session, tone, options) {
	    var duration, interToneGap;

	    if (tone === undefined) {
	      throw new TypeError('Not enough arguments');
	    }

	    this.logger = session.ua.getLogger('sip.invitecontext.dtmf', session.id);
	    this.owner = session;
	    this.direction = null;

	    options = options || {};
	    duration = options.duration || null;
	    interToneGap = options.interToneGap || null;

	    // Check tone type
	    if (typeof tone === 'string') {
	      tone = tone.toUpperCase();
	    } else if (typeof tone === 'number') {
	      tone = tone.toString();
	    } else {
	      throw new TypeError('Invalid tone: ' + tone);
	    }

	    // Check tone value
	    if (!tone.match(/^[0-9A-D#*]$/)) {
	      throw new TypeError('Invalid tone: ' + tone);
	    } else {
	      this.tone = tone;
	    }

	    // Check duration
	    if (duration && !SIP.Utils.isDecimal(duration)) {
	      throw new TypeError('Invalid tone duration: ' + duration);
	    } else if (!duration) {
	      duration = _DTMF.C.DEFAULT_DURATION;
	    } else if (duration < _DTMF.C.MIN_DURATION) {
	      this.logger.warn('"duration" value is lower than the minimum allowed, setting it to ' + _DTMF.C.MIN_DURATION + ' milliseconds');
	      duration = _DTMF.C.MIN_DURATION;
	    } else if (duration > _DTMF.C.MAX_DURATION) {
	      this.logger.warn('"duration" value is greater than the maximum allowed, setting it to ' + _DTMF.C.MAX_DURATION + ' milliseconds');
	      duration = _DTMF.C.MAX_DURATION;
	    } else {
	      duration = Math.abs(duration);
	    }
	    this.duration = duration;

	    // Check interToneGap
	    if (interToneGap && !SIP.Utils.isDecimal(interToneGap)) {
	      throw new TypeError('Invalid interToneGap: ' + interToneGap);
	    } else if (!interToneGap) {
	      interToneGap = _DTMF.C.DEFAULT_INTER_TONE_GAP;
	    } else if (interToneGap < _DTMF.C.MIN_INTER_TONE_GAP) {
	      this.logger.warn('"interToneGap" value is lower than the minimum allowed, setting it to ' + _DTMF.C.MIN_INTER_TONE_GAP + ' milliseconds');
	      interToneGap = _DTMF.C.MIN_INTER_TONE_GAP;
	    } else {
	      interToneGap = Math.abs(interToneGap);
	    }
	    this.interToneGap = interToneGap;
	  };
	  _DTMF.prototype = Object.create(SIP.EventEmitter.prototype);

	  _DTMF.prototype.send = function (options) {
	    var extraHeaders,
	        body = {};

	    this.direction = 'outgoing';

	    // Check RTCSession Status
	    if (this.owner.status !== SIP.Session.C.STATUS_CONFIRMED && this.owner.status !== SIP.Session.C.STATUS_WAITING_FOR_ACK) {
	      throw new SIP.Exceptions.InvalidStateError(this.owner.status);
	    }

	    // Get DTMF options
	    options = options || {};
	    extraHeaders = options.extraHeaders ? options.extraHeaders.slice() : [];

	    body.contentType = 'application/dtmf-relay';

	    body.body = "Signal= " + this.tone + "\r\n";
	    body.body += "Duration= " + this.duration;

	    this.request = this.owner.dialog.sendRequest(this, SIP.C.INFO, {
	      extraHeaders: extraHeaders,
	      body: body
	    });

	    this.owner.emit('dtmf', this.request, this);
	  };

	  /**
	   * @private
	   */
	  _DTMF.prototype.receiveResponse = function (response) {
	    var cause;

	    switch (true) {
	      case /^1[0-9]{2}$/.test(response.status_code):
	        // Ignore provisional responses.
	        break;

	      case /^2[0-9]{2}$/.test(response.status_code):
	        this.emit('succeeded', {
	          originator: 'remote',
	          response: response
	        });
	        break;

	      default:
	        cause = SIP.Utils.sipErrorCause(response.status_code);
	        this.emit('failed', response, cause);
	        break;
	    }
	  };

	  /**
	   * @private
	   */
	  _DTMF.prototype.onRequestTimeout = function () {
	    this.emit('failed', null, SIP.C.causes.REQUEST_TIMEOUT);
	    this.owner.onRequestTimeout();
	  };

	  /**
	   * @private
	   */
	  _DTMF.prototype.onTransportError = function () {
	    this.emit('failed', null, SIP.C.causes.CONNECTION_ERROR);
	    this.owner.onTransportError();
	  };

	  /**
	   * @private
	   */
	  _DTMF.prototype.onDialogError = function (response) {
	    this.emit('failed', response, SIP.C.causes.DIALOG_ERROR);
	    this.owner.onDialogError(response);
	  };

	  /**
	   * @private
	   */
	  _DTMF.prototype.init_incoming = function (request) {
	    this.direction = 'incoming';
	    this.request = request;

	    request.reply(200);

	    if (!this.tone || !this.duration) {
	      this.logger.warn('invalid INFO DTMF received, discarded');
	    } else {
	      this.owner.emit('dtmf', request, this);
	    }
	  };

	  _DTMF.C = C;
	  return _DTMF;
	};

	/***/ }),
	/* 25 */
	/***/ (function(module, exports, __webpack_require__) {


	/**
	 * @fileoverview SIP Subscriber (SIP-Specific Event Notifications RFC6665)
	 */

	/**
	 * @augments SIP
	 * @class Class creating a SIP Subscription.
	 */

	module.exports = function (SIP) {
	  SIP.Subscription = function (ua, target, event, options) {
	    options = Object.create(options || Object.prototype);
	    this.extraHeaders = options.extraHeaders = (options.extraHeaders || []).slice();

	    this.id = null;
	    this.state = 'init';

	    if (!event) {
	      throw new TypeError('Event necessary to create a subscription.');
	    } else {
	      //TODO: check for valid events here probably make a list in SIP.C; or leave it up to app to check?
	      //The check may need to/should probably occur on the other side,
	      this.event = event;
	    }

	    if (typeof options.expires !== 'number') {
	      ua.logger.warn('expires must be a number. Using default of 3600.');
	      this.expires = 3600;
	    } else {
	      this.expires = options.expires;
	    }
	    this.requestedExpires = this.expires;

	    options.extraHeaders.push('Event: ' + this.event);
	    options.extraHeaders.push('Expires: ' + this.expires);

	    if (options.body) {
	      this.body = options.body;
	    }

	    this.contact = ua.contact.toString();

	    options.extraHeaders.push('Contact: ' + this.contact);
	    options.extraHeaders.push('Allow: ' + SIP.UA.C.ALLOWED_METHODS.toString());

	    SIP.Utils.augment(this, SIP.ClientContext, [ua, SIP.C.SUBSCRIBE, target, options]);

	    this.logger = ua.getLogger('sip.subscription');

	    this.dialog = null;
	    this.timers = { N: null, sub_duration: null };
	    this.errorCodes = [404, 405, 410, 416, 480, 481, 482, 483, 484, 485, 489, 501, 604];
	  };

	  SIP.Subscription.prototype = {
	    subscribe: function subscribe() {
	      var sub = this;

	      //these states point to an existing subscription, no subscribe is necessary
	      if (this.state === 'active') {
	        this.refresh();
	        return this;
	      } else if (this.state === 'notify_wait') {
	        return this;
	      }

	      SIP.Timers.clearTimeout(this.timers.sub_duration);
	      SIP.Timers.clearTimeout(this.timers.N);
	      this.timers.N = SIP.Timers.setTimeout(sub.timer_fire.bind(sub), SIP.Timers.TIMER_N);

	      this.ua.earlySubscriptions[this.request.call_id + this.request.from.parameters.tag + this.event] = this;

	      this.send();

	      this.state = 'notify_wait';

	      return this;
	    },

	    refresh: function refresh() {
	      if (this.state === 'terminated' || this.state === 'pending' || this.state === 'notify_wait') {
	        return;
	      }

	      this.dialog.sendRequest(this, SIP.C.SUBSCRIBE, {
	        extraHeaders: this.extraHeaders,
	        body: this.body
	      });
	    },

	    receiveResponse: function receiveResponse(response) {
	      var expires,
	          sub = this,
	          cause = SIP.Utils.getReasonPhrase(response.status_code);

	      if (this.state === 'notify_wait' && response.status_code >= 300 || this.state !== 'notify_wait' && this.errorCodes.indexOf(response.status_code) !== -1) {
	        this.failed(response, null);
	      } else if (/^2[0-9]{2}$/.test(response.status_code)) {
	        this.emit('accepted', response, cause);
	        //As we don't support RFC 5839 or other extensions where the NOTIFY is optional, timer N will not be cleared
	        //SIP.Timers.clearTimeout(this.timers.N);

	        expires = response.getHeader('Expires');

	        if (expires && expires <= this.requestedExpires) {
	          // Preserve new expires value for subsequent requests
	          this.expires = expires;
	          this.timers.sub_duration = SIP.Timers.setTimeout(sub.refresh.bind(sub), expires * 900);
	        } else {
	          if (!expires) {
	            this.logger.warn('Expires header missing in a 200-class response to SUBSCRIBE');
	            this.failed(response, SIP.C.EXPIRES_HEADER_MISSING);
	          } else {
	            this.logger.warn('Expires header in a 200-class response to SUBSCRIBE with a higher value than the one in the request');
	            this.failed(response, SIP.C.INVALID_EXPIRES_HEADER);
	          }
	        }
	      } else if (response.statusCode > 300) {
	        this.emit('failed', response, cause);
	        this.emit('rejected', response, cause);
	      }
	    },

	    unsubscribe: function unsubscribe() {
	      var extraHeaders = [],
	          sub = this;

	      this.state = 'terminated';

	      extraHeaders.push('Event: ' + this.event);
	      extraHeaders.push('Expires: 0');

	      extraHeaders.push('Contact: ' + this.contact);
	      extraHeaders.push('Allow: ' + SIP.UA.C.ALLOWED_METHODS.toString());

	      //makes sure expires isn't set, and other typical resubscribe behavior
	      this.receiveResponse = function () {};

	      this.dialog.sendRequest(this, this.method, {
	        extraHeaders: extraHeaders,
	        body: this.body
	      });

	      SIP.Timers.clearTimeout(this.timers.sub_duration);
	      SIP.Timers.clearTimeout(this.timers.N);
	      this.timers.N = SIP.Timers.setTimeout(sub.timer_fire.bind(sub), SIP.Timers.TIMER_N);
	    },

	    /**
	    * @private
	    */
	    timer_fire: function timer_fire() {
	      if (this.state === 'terminated') {
	        this.terminateDialog();
	        SIP.Timers.clearTimeout(this.timers.N);
	        SIP.Timers.clearTimeout(this.timers.sub_duration);

	        delete this.ua.subscriptions[this.id];
	      } else if (this.state === 'notify_wait' || this.state === 'pending') {
	        this.close();
	      } else {
	        this.refresh();
	      }
	    },

	    /**
	    * @private
	    */
	    close: function close() {
	      if (this.state === 'notify_wait') {
	        this.state = 'terminated';
	        SIP.Timers.clearTimeout(this.timers.N);
	        SIP.Timers.clearTimeout(this.timers.sub_duration);
	        this.receiveResponse = function () {};

	        delete this.ua.earlySubscriptions[this.request.call_id + this.request.from.parameters.tag + this.event];
	      } else if (this.state !== 'terminated') {
	        this.unsubscribe();
	      }
	    },

	    /**
	    * @private
	    */
	    createConfirmedDialog: function createConfirmedDialog(message, type) {
	      var dialog;

	      this.terminateDialog();
	      dialog = new SIP.Dialog(this, message, type);
	      dialog.invite_seqnum = this.request.cseq;
	      dialog.local_seqnum = this.request.cseq;

	      if (!dialog.error) {
	        this.dialog = dialog;
	        return true;
	      }
	      // Dialog not created due to an error
	      else {
	          return false;
	        }
	    },

	    /**
	    * @private
	    */
	    terminateDialog: function terminateDialog() {
	      if (this.dialog) {
	        delete this.ua.subscriptions[this.id];
	        this.dialog.terminate();
	        delete this.dialog;
	      }
	    },

	    /**
	    * @private
	    */
	    receiveRequest: function receiveRequest(request) {
	      var sub_state,
	          sub = this;

	      function setExpiresTimeout() {
	        if (sub_state.expires) {
	          SIP.Timers.clearTimeout(sub.timers.sub_duration);
	          sub_state.expires = Math.min(sub.expires, Math.max(sub_state.expires, 0));
	          sub.timers.sub_duration = SIP.Timers.setTimeout(sub.refresh.bind(sub), sub_state.expires * 900);
	        }
	      }

	      if (!this.matchEvent(request)) {
	        //checks event and subscription_state headers
	        request.reply(489);
	        return;
	      }

	      if (!this.dialog) {
	        if (this.createConfirmedDialog(request, 'UAS')) {
	          this.id = this.dialog.id.toString();
	          delete this.ua.earlySubscriptions[this.request.call_id + this.request.from.parameters.tag + this.event];
	          this.ua.subscriptions[this.id] = this;
	          // UPDATE ROUTE SET TO BE BACKWARDS COMPATIBLE?
	        }
	      }

	      sub_state = request.parseHeader('Subscription-State');

	      request.reply(200, SIP.C.REASON_200);

	      SIP.Timers.clearTimeout(this.timers.N);

	      this.emit('notify', { request: request });

	      // if we've set state to terminated, no further processing should take place
	      // and we are only interested in cleaning up after the appropriate NOTIFY
	      if (this.state === 'terminated') {
	        if (sub_state.state === 'terminated') {
	          this.terminateDialog();
	          SIP.Timers.clearTimeout(this.timers.N);
	          SIP.Timers.clearTimeout(this.timers.sub_duration);

	          delete this.ua.subscriptions[this.id];
	        }
	        return;
	      }

	      switch (sub_state.state) {
	        case 'active':
	          this.state = 'active';
	          setExpiresTimeout();
	          break;
	        case 'pending':
	          if (this.state === 'notify_wait') {
	            setExpiresTimeout();
	          }
	          this.state = 'pending';
	          break;
	        case 'terminated':
	          SIP.Timers.clearTimeout(this.timers.sub_duration);
	          if (sub_state.reason) {
	            this.logger.log('terminating subscription with reason ' + sub_state.reason);
	            switch (sub_state.reason) {
	              case 'deactivated':
	              case 'timeout':
	                this.subscribe();
	                return;
	              case 'probation':
	              case 'giveup':
	                if (sub_state.params && sub_state.params['retry-after']) {
	                  this.timers.sub_duration = SIP.Timers.setTimeout(sub.subscribe.bind(sub), sub_state.params['retry-after']);
	                } else {
	                  this.subscribe();
	                }
	                return;
	              case 'rejected':
	              case 'noresource':
	              case 'invariant':
	                break;
	            }
	          }
	          this.close();
	          break;
	      }
	    },

	    failed: function failed(response, cause) {
	      this.close();
	      this.emit('failed', response, cause);
	      this.emit('rejected', response, cause);
	      return this;
	    },

	    onDialogError: function onDialogError(response) {
	      this.failed(response, SIP.C.causes.DIALOG_ERROR);
	    },

	    /**
	    * @private
	    */
	    matchEvent: function matchEvent(request) {
	      var event;

	      // Check mandatory header Event
	      if (!request.hasHeader('Event')) {
	        this.logger.warn('missing Event header');
	        return false;
	      }
	      // Check mandatory header Subscription-State
	      if (!request.hasHeader('Subscription-State')) {
	        this.logger.warn('missing Subscription-State header');
	        return false;
	      }

	      // Check whether the event in NOTIFY matches the event in SUBSCRIBE
	      event = request.parseHeader('event').event;

	      if (this.event !== event) {
	        this.logger.warn('event match failed');
	        request.reply(481, 'Event Match Failed');
	        return false;
	      } else {
	        return true;
	      }
	    }
	  };
	};

	/***/ }),
	/* 26 */
	/***/ (function(module, exports, __webpack_require__) {


	/**
	 * @fileoverview SIP Publish (SIP Extension for Event State Publication RFC3903)
	 */

	/**
	 * @augments SIP
	 * @class Class creating a SIP PublishContext.
	 */

	module.exports = function (SIP) {

	  var PublishContext;

	  PublishContext = function PublishContext(ua, target, event, options) {
	    this.options = options = options || {};
	    this.options.extraHeaders = (options.extraHeaders || []).slice();
	    this.options.contentType = options.contentType || 'text/plain';

	    if (typeof options.expires !== 'number' || options.expires % 1 !== 0) {
	      this.options.expires = 3600;
	    } else {
	      this.options.expires = Number(options.expires);
	    }

	    if (typeof options.unpublishOnClose !== "boolean") {
	      this.options.unpublishOnClose = true;
	    } else {
	      this.options.unpublishOnClose = options.unpublishOnClose;
	    }

	    if (target === undefined || target === null || target === '') {
	      throw new SIP.Exceptions.MethodParameterError('Publish', 'Target', target);
	    } else {
	      this.target = ua.normalizeTarget(target);
	    }

	    if (event === undefined || event === null || event === '') {
	      throw new SIP.Exceptions.MethodParameterError('Publish', 'Event', event);
	    } else {
	      this.event = event;
	    }

	    // Call parent constructor
	    SIP.ClientContext.call(this, ua, SIP.C.PUBLISH, this.target, this.options);

	    this.logger = this.ua.getLogger('sip.publish');

	    this.pubRequestBody = null;
	    this.pubRequestExpires = this.options.expires;
	    this.pubRequestEtag = null;

	    this.publish_refresh_timer = null;

	    ua.on('transportCreated', function (transport) {
	      transport.on('transportError', this.onTransportError.bind(this));
	    }.bind(this));
	  };

	  // Extend ClientContext
	  PublishContext.prototype = Object.create(SIP.ClientContext.prototype);

	  // Restore the class constructor
	  PublishContext.prototype.constructor = PublishContext;

	  /**
	   * Publish
	   *
	   * @param {string} Event body to publish, optional
	   *
	   */
	  PublishContext.prototype.publish = function (body) {
	    // Clean up before the run
	    this.request = null;
	    SIP.Timers.clearTimeout(this.publish_refresh_timer);

	    if (body !== undefined && body !== null && body !== '') {
	      // is Inital or Modify request
	      this.options.body = body;
	      this.pubRequestBody = this.options.body;

	      if (this.pubRequestExpires === 0) {
	        // This is Initial request after unpublish
	        this.pubRequestExpires = this.options.expires;
	        this.pubRequestEtag = null;
	      }

	      if (!this.ua.publishers[this.target.toString() + ':' + this.event]) {
	        this.ua.publishers[this.target.toString() + ':' + this.event] = this;
	      }
	    } else {
	      // This is Refresh request
	      this.pubRequestBody = null;

	      if (this.pubRequestEtag === null) {
	        //Request not valid
	        throw new SIP.Exceptions.MethodParameterError('Publish', 'Body', body);
	      }

	      if (this.pubRequestExpires === 0) {
	        //Request not valid
	        throw new SIP.Exceptions.MethodParameterError('Publish', 'Expire', this.pubRequestExpires);
	      }
	    }

	    this.sendPublishRequest();
	  };

	  /**
	   * Unpublish
	   *
	   */
	  PublishContext.prototype.unpublish = function () {
	    // Clean up before the run
	    this.request = null;
	    SIP.Timers.clearTimeout(this.publish_refresh_timer);

	    this.pubRequestBody = null;
	    this.pubRequestExpires = 0;

	    if (this.pubRequestEtag !== null) {
	      this.sendPublishRequest();
	    }
	  };

	  /**
	   * Close
	   *
	   */
	  PublishContext.prototype.close = function () {
	    // Send unpublish, if requested
	    if (this.options.unpublishOnClose) {
	      this.unpublish();
	    } else {
	      this.request = null;
	      SIP.Timers.clearTimeout(this.publish_refresh_timer);

	      this.pubRequestBody = null;
	      this.pubRequestExpires = 0;
	      this.pubRequestEtag = null;
	    }

	    if (this.ua.publishers[this.target.toString() + ':' + this.event]) {
	      delete this.ua.publishers[this.target.toString() + ':' + this.event];
	    }
	  };

	  /**
	   * @private
	   *
	   */
	  PublishContext.prototype.sendPublishRequest = function () {
	    var reqOptions;

	    reqOptions = Object.create(this.options || Object.prototype);
	    reqOptions.extraHeaders = (this.options.extraHeaders || []).slice();

	    reqOptions.extraHeaders.push('Event: ' + this.event);
	    reqOptions.extraHeaders.push('Expires: ' + this.pubRequestExpires);

	    if (this.pubRequestEtag !== null) {
	      reqOptions.extraHeaders.push('SIP-If-Match: ' + this.pubRequestEtag);
	    }

	    this.request = new SIP.OutgoingRequest(SIP.C.PUBLISH, this.target, this.ua, this.options.params, reqOptions.extraHeaders);

	    if (this.pubRequestBody !== null) {
	      this.request.body = {};
	      this.request.body.body = this.pubRequestBody;
	      this.request.body.contentType = this.options.contentType;
	    }

	    this.send();
	  };

	  /**
	   * @private
	   *
	   */
	  PublishContext.prototype.receiveResponse = function (response) {
	    var expires,
	        minExpires,
	        cause = SIP.Utils.getReasonPhrase(response.status_code);

	    switch (true) {
	      case /^1[0-9]{2}$/.test(response.status_code):
	        this.emit('progress', response, cause);
	        break;

	      case /^2[0-9]{2}$/.test(response.status_code):
	        // Set SIP-Etag
	        if (response.hasHeader('SIP-ETag')) {
	          this.pubRequestEtag = response.getHeader('SIP-ETag');
	        } else {
	          this.logger.warn('SIP-ETag header missing in a 200-class response to PUBLISH');
	        }

	        // Update Expire
	        if (response.hasHeader('Expires')) {
	          expires = Number(response.getHeader('Expires'));
	          if (typeof expires === 'number' && expires >= 0 && expires <= this.pubRequestExpires) {
	            this.pubRequestExpires = expires;
	          } else {
	            this.logger.warn('Bad Expires header in a 200-class response to PUBLISH');
	          }
	        } else {
	          this.logger.warn('Expires header missing in a 200-class response to PUBLISH');
	        }

	        if (this.pubRequestExpires !== 0) {
	          // Schedule refresh
	          this.publish_refresh_timer = SIP.Timers.setTimeout(this.publish.bind(this), this.pubRequestExpires * 900);
	          this.emit('published', response, cause);
	        } else {
	          this.emit('unpublished', response, cause);
	        }

	        break;

	      case /^412$/.test(response.status_code):
	        // 412 code means no matching ETag - possibly the PUBLISH expired
	        // Resubmit as new request, if the current request is not a "remove"

	        if (this.pubRequestEtag !== null && this.pubRequestExpires !== 0) {
	          this.logger.warn('412 response to PUBLISH, recovering');
	          this.pubRequestEtag = null;
	          this.emit('progress', response, cause);
	          this.publish(this.options.body);
	        } else {
	          this.logger.warn('412 response to PUBLISH, recovery failed');
	          this.pubRequestExpires = 0;
	          this.emit('failed', response, cause);
	          this.emit('unpublished', response, cause);
	        }

	        break;

	      case /^423$/.test(response.status_code):
	        // 423 code means we need to adjust the Expires interval up
	        if (this.pubRequestExpires !== 0 && response.hasHeader('Min-Expires')) {
	          minExpires = Number(response.getHeader('Min-Expires'));
	          if (typeof minExpires === 'number' || minExpires > this.pubRequestExpires) {
	            this.logger.warn('423 code in response to PUBLISH, adjusting the Expires value and trying to recover');
	            this.pubRequestExpires = minExpires;
	            this.emit('progress', response, cause);
	            this.publish(this.options.body);
	          } else {
	            this.logger.warn('Bad 423 response Min-Expires header received for PUBLISH');
	            this.pubRequestExpires = 0;
	            this.emit('failed', response, cause);
	            this.emit('unpublished', response, cause);
	          }
	        } else {
	          this.logger.warn('423 response to PUBLISH, recovery failed');
	          this.pubRequestExpires = 0;
	          this.emit('failed', response, cause);
	          this.emit('unpublished', response, cause);
	        }

	        break;

	      default:
	        this.pubRequestExpires = 0;
	        this.emit('failed', response, cause);
	        this.emit('unpublished', response, cause);

	        break;
	    }

	    // Do the cleanup
	    if (this.pubRequestExpires === 0) {
	      SIP.Timers.clearTimeout(this.publish_refresh_timer);

	      this.pubRequestBody = null;
	      this.pubRequestEtag = null;
	    }
	  };

	  PublishContext.prototype.onRequestTimeout = function () {
	    SIP.ClientContext.prototype.onRequestTimeout.call(this);
	    this.emit('unpublished', null, SIP.C.causes.REQUEST_TIMEOUT);
	  };

	  PublishContext.prototype.onTransportError = function () {
	    SIP.ClientContext.prototype.onTransportError.call(this);
	    this.emit('unpublished', null, SIP.C.causes.CONNECTION_ERROR);
	  };

	  SIP.PublishContext = PublishContext;
	};

	/***/ }),
	/* 27 */
	/***/ (function(module, exports, __webpack_require__) {
	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * @augments SIP
	 * @class Class creating a SIP User Agent.
	 * @param {function returning SIP.sessionDescriptionHandler} [configuration.sessionDescriptionHandlerFactory]
	 *        A function will be invoked by each of the UA's Sessions to build the sessionDescriptionHandler for that Session.
	 *        If no (or a falsy) value is provided, each Session will use a default (WebRTC) sessionDescriptionHandler.
	 *
	 * @param {Object} [configuration.media] gets passed to SIP.sessionDescriptionHandler.getDescription as mediaHint
	 */

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	module.exports = function (SIP, environment) {
	  var UA,
	      C = {
	    // UA status codes
	    STATUS_INIT: 0,
	    STATUS_STARTING: 1,
	    STATUS_READY: 2,
	    STATUS_USER_CLOSED: 3,
	    STATUS_NOT_READY: 4,

	    // UA error codes
	    CONFIGURATION_ERROR: 1,
	    NETWORK_ERROR: 2,

	    ALLOWED_METHODS: ['ACK', 'CANCEL', 'INVITE', 'MESSAGE', 'BYE', 'OPTIONS', 'INFO', 'NOTIFY', 'REFER'],

	    ACCEPTED_BODY_TYPES: ['application/sdp', 'application/dtmf-relay'],

	    MAX_FORWARDS: 70,
	    TAG_LENGTH: 10
	  };

	  UA = function UA(configuration) {
	    var self = this;

	    // Helper function for forwarding events
	    function selfEmit(type) {
	      //registrationFailed handler is invoked with two arguments. Allow event handlers to be invoked with a variable no. of arguments
	      return self.emit.bind(self, type);
	    }

	    // Set Accepted Body Types
	    C.ACCEPTED_BODY_TYPES = C.ACCEPTED_BODY_TYPES.toString();

	    this.log = new SIP.LoggerFactory();
	    this.logger = this.getLogger('sip.ua');

	    this.cache = {
	      credentials: {}
	    };

	    this.configuration = {};
	    this.dialogs = {};

	    //User actions outside any session/dialog (MESSAGE)
	    this.applicants = {};

	    this.data = {};
	    this.sessions = {};
	    this.subscriptions = {};
	    this.earlySubscriptions = {};
	    this.publishers = {};
	    this.transport = null;
	    this.contact = null;
	    this.status = C.STATUS_INIT;
	    this.error = null;
	    this.transactions = {
	      nist: {},
	      nict: {},
	      ist: {},
	      ict: {}
	    };

	    Object.defineProperties(this, {
	      transactionsCount: {
	        get: function get() {
	          var type,
	              transactions = ['nist', 'nict', 'ist', 'ict'],
	              count = 0;

	          for (type in transactions) {
	            count += Object.keys(this.transactions[transactions[type]]).length;
	          }

	          return count;
	        }
	      },

	      nictTransactionsCount: {
	        get: function get() {
	          return Object.keys(this.transactions['nict']).length;
	        }
	      },

	      nistTransactionsCount: {
	        get: function get() {
	          return Object.keys(this.transactions['nist']).length;
	        }
	      },

	      ictTransactionsCount: {
	        get: function get() {
	          return Object.keys(this.transactions['ict']).length;
	        }
	      },

	      istTransactionsCount: {
	        get: function get() {
	          return Object.keys(this.transactions['ist']).length;
	        }
	      }
	    });

	    /**
	     * Load configuration
	     *
	     * @throws {SIP.Exceptions.ConfigurationError}
	     * @throws {TypeError}
	     */

	    if (configuration === undefined) {
	      configuration = {};
	    } else if (typeof configuration === 'string' || configuration instanceof String) {
	      configuration = {
	        uri: configuration
	      };
	    }

	    // Apply log configuration if present
	    if (configuration.log) {
	      if (configuration.log.hasOwnProperty('builtinEnabled')) {
	        this.log.builtinEnabled = configuration.log.builtinEnabled;
	      }

	      if (configuration.log.hasOwnProperty('level')) {
	        this.log.level = configuration.log.level;
	      }

	      if (configuration.log.hasOwnProperty('connector')) {
	        this.log.connector = configuration.log.connector;
	      }
	    }

	    try {
	      this.loadConfig(configuration);
	    } catch (e) {
	      this.status = C.STATUS_NOT_READY;
	      this.error = C.CONFIGURATION_ERROR;
	      throw e;
	    }

	    // Initialize registerContext
	    this.registerContext = new SIP.RegisterContext(this);
	    this.registerContext.on('failed', selfEmit('registrationFailed'));
	    this.registerContext.on('registered', selfEmit('registered'));
	    this.registerContext.on('unregistered', selfEmit('unregistered'));

	    if (this.configuration.autostart) {
	      this.start();
	    }
	  };
	  UA.prototype = Object.create(SIP.EventEmitter.prototype);

	  //=================
	  //  High Level API
	  //=================

	  UA.prototype.register = function (options) {
	    this.configuration.register = true;
	    this.registerContext.register(options);

	    return this;
	  };

	  /**
	   * Unregister.
	   *
	   * @param {Boolean} [all] unregister all user bindings.
	   *
	   */
	  UA.prototype.unregister = function (options) {
	    this.configuration.register = false;

	    var context = this.registerContext;
	    this.transport.afterConnected(context.unregister.bind(context, options));

	    return this;
	  };

	  UA.prototype.isRegistered = function () {
	    return this.registerContext.registered;
	  };

	  /**
	   * Make an outgoing call.
	   *
	   * @param {String} target
	   * @param {Object} views
	   * @param {Object} [options.media] gets passed to SIP.sessionDescriptionHandler.getDescription as mediaHint
	   *
	   * @throws {TypeError}
	   *
	   */
	  UA.prototype.invite = function (target, options, modifiers) {
	    var context = new SIP.InviteClientContext(this, target, options, modifiers);
	    // Delay sending actual invite until the next 'tick' if we are already
	    // connected, so that API consumers can register to events fired by the
	    // the session.
	    this.transport.afterConnected(function () {
	      context.invite();
	      this.emit('inviteSent', context);
	    }.bind(this));
	    return context;
	  };

	  UA.prototype.subscribe = function (target, event, options) {
	    var sub = new SIP.Subscription(this, target, event, options);

	    this.transport.afterConnected(sub.subscribe.bind(sub));
	    return sub;
	  };

	  /**
	   * Send PUBLISH Event State Publication (RFC3903)
	   *
	   * @param {String} target
	   * @param {String} event
	   * @param {String} body
	   * @param {Object} [options]
	   *
	   * @throws {SIP.Exceptions.MethodParameterError}
	   *
	   */
	  UA.prototype.publish = function (target, event, body, options) {
	    var pub = new SIP.PublishContext(this, target, event, options);

	    this.transport.afterConnected(pub.publish.bind(pub, body));
	    return pub;
	  };

	  /**
	   * Send a message.
	   *
	   * @param {String} target
	   * @param {String} body
	   * @param {Object} [options]
	   *
	   * @throws {TypeError}
	   *
	   */
	  UA.prototype.message = function (target, body, options) {
	    if (body === undefined) {
	      throw new TypeError('Not enough arguments');
	    }

	    // There is no Message module, so it is okay that the UA handles defaults here.
	    options = Object.create(options || Object.prototype);
	    options.contentType || (options.contentType = 'text/plain');
	    options.body = body;

	    return this.request(SIP.C.MESSAGE, target, options);
	  };

	  UA.prototype.request = function (method, target, options) {
	    var req = new SIP.ClientContext(this, method, target, options);

	    this.transport.afterConnected(req.send.bind(req));
	    return req;
	  };

	  /**
	   * Gracefully close.
	   *
	   */
	  UA.prototype.stop = function () {
	    var session,
	        subscription,
	        applicant,
	        publisher,
	        ua = this;

	    function transactionsListener() {
	      if (ua.nistTransactionsCount === 0 && ua.nictTransactionsCount === 0) {
	        ua.removeListener('transactionDestroyed', transactionsListener);
	        ua.transport.disconnect();
	      }
	    }

	    this.logger.log('user requested closure...');

	    if (this.status === C.STATUS_USER_CLOSED) {
	      this.logger.warn('UA already closed');
	      return this;
	    }

	    // Close registerContext
	    this.logger.log('closing registerContext');
	    this.registerContext.close();

	    // Run  _terminate_ on every Session
	    for (session in this.sessions) {
	      this.logger.log('closing session ' + session);
	      this.sessions[session].terminate();
	    }

	    //Run _close_ on every confirmed Subscription
	    for (subscription in this.subscriptions) {
	      this.logger.log('unsubscribing from subscription ' + subscription);
	      this.subscriptions[subscription].close();
	    }

	    //Run _close_ on every early Subscription
	    for (subscription in this.earlySubscriptions) {
	      this.logger.log('unsubscribing from early subscription ' + subscription);
	      this.earlySubscriptions[subscription].close();
	    }

	    //Run _close_ on every Publisher
	    for (publisher in this.publishers) {
	      this.logger.log('unpublish ' + publisher);
	      this.publishers[publisher].close();
	    }

	    // Run  _close_ on every applicant
	    for (applicant in this.applicants) {
	      this.applicants[applicant].close();
	    }

	    this.status = C.STATUS_USER_CLOSED;

	    /*
	     * If the remaining transactions are all INVITE transactions, there is no need to
	     * wait anymore because every session has already been closed by this method.
	     * - locally originated sessions where terminated (CANCEL or BYE)
	     * - remotely originated sessions where rejected (4XX) or terminated (BYE)
	     * Remaining INVITE transactions belong tho sessions that where answered. This are in
	     * 'accepted' state due to timers 'L' and 'M' defined in [RFC 6026]
	     */
	    if (this.nistTransactionsCount === 0 && this.nictTransactionsCount === 0) {
	      this.transport.disconnect();
	    } else {
	      this.on('transactionDestroyed', transactionsListener);
	    }

	    if (typeof environment.removeEventListener === 'function') {
	      // Google Chrome Packaged Apps don't allow 'unload' listeners:
	      // unload is not available in packaged apps
	      if (!(global.chrome && global.chrome.app && global.chrome.app.runtime)) {
	        environment.removeEventListener('unload', this.environListener);
	      }
	    }

	    return this;
	  };

	  /**
	   * Connect to the WS server if status = STATUS_INIT.
	   * Resume UA after being closed.
	   *
	   */
	  UA.prototype.start = function () {
	    // var server;

	    this.logger.log('user requested startup...');
	    if (this.status === C.STATUS_INIT) {
	      this.status = C.STATUS_STARTING;
	      if (!this.configuration.transportConstructor) {
	        throw new SIP.Exceptions.TransportError("Transport constructor not set");
	      }
	      this.transport = new this.configuration.transportConstructor(this.getLogger('sip.transport'), this.configuration.transportOptions);
	      this.setTransportListeners();
	      this.emit('transportCreated', this.transport);
	      this.transport.connect();
	    } else if (this.status === C.STATUS_USER_CLOSED) {
	      this.logger.log('resuming');
	      this.status = C.STATUS_READY;
	      this.transport.connect();
	    } else if (this.status === C.STATUS_STARTING) {
	      this.logger.log('UA is in STARTING status, not opening new connection');
	    } else if (this.status === C.STATUS_READY) {
	      this.logger.log('UA is in READY status, not resuming');
	    } else {
	      this.logger.error('Connection is down. Auto-Recovery system is trying to connect');
	    }

	    if (this.configuration.autostop && typeof environment.addEventListener === 'function') {
	      // Google Chrome Packaged Apps don't allow 'unload' listeners:
	      // unload is not available in packaged apps
	      if (!(global.chrome && global.chrome.app && global.chrome.app.runtime)) {
	        this.environListener = this.stop.bind(this);
	        environment.addEventListener('unload', this.environListener);
	      }
	    }

	    return this;
	  };

	  /**
	   * Normalize a string into a valid SIP request URI
	   *
	   * @param {String} target
	   *
	   * @returns {SIP.URI|undefined}
	   */
	  UA.prototype.normalizeTarget = function (target) {
	    return SIP.Utils.normalizeTarget(target, this.configuration.hostportParams);
	  };

	  //===============================
	  //  Private (For internal use)
	  //===============================

	  UA.prototype.saveCredentials = function (credentials) {
	    this.cache.credentials[credentials.realm] = this.cache.credentials[credentials.realm] || {};
	    this.cache.credentials[credentials.realm][credentials.uri] = credentials;

	    return this;
	  };

	  UA.prototype.getCredentials = function (request) {
	    var realm, credentials;

	    realm = request.ruri.host;

	    if (this.cache.credentials[realm] && this.cache.credentials[realm][request.ruri]) {
	      credentials = this.cache.credentials[realm][request.ruri];
	      credentials.method = request.method;
	    }

	    return credentials;
	  };

	  UA.prototype.getLogger = function (category, label) {
	    return this.log.getLogger(category, label);
	  };

	  //==============================
	  // Event Handlers
	  //==============================


	  UA.prototype.onTransportError = function () {
	    if (this.status === C.STATUS_USER_CLOSED) {
	      return;
	    }

	    if (!this.error || this.error !== C.NETWORK_ERROR) {
	      this.status = C.STATUS_NOT_READY;
	      this.error = C.NETWORK_ERROR;
	    }
	  };

	  /**
	   * Helper function. Sets transport listeners
	   * @private
	   */
	  UA.prototype.setTransportListeners = function () {
	    this.transport.on('connected', this.onTransportConnected.bind(this));
	    this.transport.on('message', this.onTransportReceiveMsg.bind(this));
	    this.transport.on('transportError', this.onTransportError.bind(this));
	  };

	  /**
	   * Transport connection event.
	   * @private
	   * @event
	   * @param {SIP.Transport} transport.
	   */
	  UA.prototype.onTransportConnected = function () {
	    if (this.configuration.register) {
	      this.configuration.authenticationFactory.initialize().then(function () {
	        this.registerContext.onTransportConnected();
	      }.bind(this));
	    }
	  };

	  /**
	   * Transport message receipt event.
	   * @private
	   * @event
	   * @param {String} message
	   */

	  UA.prototype.onTransportReceiveMsg = function (message) {
	    var transaction;
	    message = SIP.Parser.parseMessage(message, this);

	    if (this.status === SIP.UA.C.STATUS_USER_CLOSED && message instanceof SIP.IncomingRequest) {
	      this.logger.warn('UA received message when status = USER_CLOSED - aborting');
	      return;
	    }
	    // Do some sanity check
	    if (SIP.sanityCheck(message, this, this.transport)) {
	      if (message instanceof SIP.IncomingRequest) {
	        message.transport = this.transport;
	        this.receiveRequest(message);
	      } else if (message instanceof SIP.IncomingResponse) {
	        /* Unike stated in 18.1.2, if a response does not match
	        * any transaction, it is discarded here and no passed to the core
	        * in order to be discarded there.
	        */
	        switch (message.method) {
	          case SIP.C.INVITE:
	            transaction = this.transactions.ict[message.via_branch];
	            if (transaction) {
	              transaction.receiveResponse(message);
	            }
	            break;
	          case SIP.C.ACK:
	            // Just in case ;-)
	            break;
	          default:
	            transaction = this.transactions.nict[message.via_branch];
	            if (transaction) {
	              transaction.receiveResponse(message);
	            }
	            break;
	        }
	      }
	    }
	  };

	  /**
	   * new Transaction
	   * @private
	   * @param {SIP.Transaction} transaction.
	   */
	  UA.prototype.newTransaction = function (transaction) {
	    this.transactions[transaction.type][transaction.id] = transaction;
	    this.emit('newTransaction', { transaction: transaction });
	  };

	  /**
	   * destroy Transaction
	   * @private
	   * @param {SIP.Transaction} transaction.
	   */
	  UA.prototype.destroyTransaction = function (transaction) {
	    delete this.transactions[transaction.type][transaction.id];
	    this.emit('transactionDestroyed', {
	      transaction: transaction
	    });
	  };

	  //=========================
	  // receiveRequest
	  //=========================

	  /**
	   * Request reception
	   * @private
	   * @param {SIP.IncomingRequest} request.
	   */
	  UA.prototype.receiveRequest = function (request) {
	    var dialog,
	        session,
	        message,
	        earlySubscription,
	        method = request.method,
	        replaces,
	        replacedDialog,
	        self = this;

	    function ruriMatches(uri) {
	      return uri && uri.user === request.ruri.user;
	    }

	    // Check that request URI points to us
	    if (!(ruriMatches(this.configuration.uri) || ruriMatches(this.contact.uri) || ruriMatches(this.contact.pub_gruu) || ruriMatches(this.contact.temp_gruu))) {
	      this.logger.warn('Request-URI does not point to us');
	      if (request.method !== SIP.C.ACK) {
	        request.reply_sl(404);
	      }
	      return;
	    }

	    // Check request URI scheme
	    if (request.ruri.scheme === SIP.C.SIPS) {
	      request.reply_sl(416);
	      return;
	    }

	    // Check transaction
	    if (SIP.Transactions.checkTransaction(this, request)) {
	      return;
	    }

	    /* RFC3261 12.2.2
	     * Requests that do not change in any way the state of a dialog may be
	     * received within a dialog (for example, an OPTIONS request).
	     * They are processed as if they had been received outside the dialog.
	     */
	    if (method === SIP.C.OPTIONS) {
	      new SIP.Transactions.NonInviteServerTransaction(request, this);
	      request.reply(200, null, ['Allow: ' + SIP.UA.C.ALLOWED_METHODS.toString(), 'Accept: ' + C.ACCEPTED_BODY_TYPES]);
	    } else if (method === SIP.C.MESSAGE) {
	      message = new SIP.ServerContext(this, request);
	      message.body = request.body;
	      message.content_type = request.getHeader('Content-Type') || 'text/plain';

	      request.reply(200, null);
	      this.emit('message', message);
	    } else if (method !== SIP.C.INVITE && method !== SIP.C.ACK) {
	      // Let those methods pass through to normal processing for now.
	      new SIP.ServerContext(this, request);
	    }

	    // Initial Request
	    if (!request.to_tag) {
	      switch (method) {
	        case SIP.C.INVITE:
	          replaces = this.configuration.replaces !== SIP.C.supported.UNSUPPORTED && request.parseHeader('replaces');

	          if (replaces) {
	            replacedDialog = this.dialogs[replaces.call_id + replaces.replaces_to_tag + replaces.replaces_from_tag];

	            if (!replacedDialog) {
	              //Replaced header without a matching dialog, reject
	              request.reply_sl(481, null);
	              return;
	            } else if (replacedDialog.owner.status === SIP.Session.C.STATUS_TERMINATED) {
	              request.reply_sl(603, null);
	              return;
	            } else if (replacedDialog.state === SIP.Dialog.C.STATUS_CONFIRMED && replaces.early_only) {
	              request.reply_sl(486, null);
	              return;
	            }
	          }

	          session = new SIP.InviteServerContext(this, request);
	          session.replacee = replacedDialog && replacedDialog.owner;
	          self.emit('invite', session);
	          break;
	        case SIP.C.BYE:
	          // Out of dialog BYE received
	          request.reply(481);
	          break;
	        case SIP.C.CANCEL:
	          session = this.findSession(request);
	          if (session) {
	            session.receiveRequest(request);
	          } else {
	            this.logger.warn('received CANCEL request for a non existent session');
	          }
	          break;
	        case SIP.C.ACK:
	          /* Absorb it.
	           * ACK request without a corresponding Invite Transaction
	           * and without To tag.
	           */
	          break;
	        case SIP.C.NOTIFY:
	          if (this.configuration.allowLegacyNotifications && this.listeners('notify').length > 0) {
	            request.reply(200, null);
	            self.emit('notify', { request: request });
	          } else {
	            request.reply(481, 'Subscription does not exist');
	          }
	          break;
	        case SIP.C.REFER:
	          this.logger.log('Received an out of dialog refer');
	          if (this.configuration.allowOutOfDialogRefers) {
	            this.logger.log('Allow out of dialog refers is enabled on the UA');
	            var referContext = new SIP.ReferServerContext(this, request);
	            var hasReferListener = this.listeners('outOfDialogReferRequested').length;
	            if (hasReferListener) {
	              this.emit('outOfDialogReferRequested', referContext);
	            } else {
	              this.logger.log('No outOfDialogReferRequest listeners, automatically accepting and following the out of dialog refer');
	              referContext.accept({ followRefer: true });
	            }
	            break;
	          }
	          request.reply(405);
	          break;
	        default:
	          request.reply(405);
	          break;
	      }
	    }
	    // In-dialog request
	    else {
	        dialog = this.findDialog(request);

	        if (dialog) {
	          if (method === SIP.C.INVITE) {
	            new SIP.Transactions.InviteServerTransaction(request, this);
	          }
	          dialog.receiveRequest(request);
	        } else if (method === SIP.C.NOTIFY) {
	          session = this.findSession(request);
	          earlySubscription = this.findEarlySubscription(request);
	          if (session) {
	            session.receiveRequest(request);
	          } else if (earlySubscription) {
	            earlySubscription.receiveRequest(request);
	          } else {
	            this.logger.warn('received NOTIFY request for a non existent session or subscription');
	            request.reply(481, 'Subscription does not exist');
	          }
	        }
	        /* RFC3261 12.2.2
	         * Request with to tag, but no matching dialog found.
	         * Exception: ACK for an Invite request for which a dialog has not
	         * been created.
	         */
	        else {
	            if (method !== SIP.C.ACK) {
	              request.reply(481);
	            }
	          }
	      }
	  };

	  //=================
	  // Utils
	  //=================

	  /**
	   * Get the session to which the request belongs to, if any.
	   * @private
	   * @param {SIP.IncomingRequest} request.
	   * @returns {SIP.OutgoingSession|SIP.IncomingSession|null}
	   */
	  UA.prototype.findSession = function (request) {
	    return this.sessions[request.call_id + request.from_tag] || this.sessions[request.call_id + request.to_tag] || null;
	  };

	  /**
	   * Get the dialog to which the request belongs to, if any.
	   * @private
	   * @param {SIP.IncomingRequest}
	   * @returns {SIP.Dialog|null}
	   */
	  UA.prototype.findDialog = function (request) {
	    return this.dialogs[request.call_id + request.from_tag + request.to_tag] || this.dialogs[request.call_id + request.to_tag + request.from_tag] || null;
	  };

	  /**
	   * Get the subscription which has not been confirmed to which the request belongs to, if any
	   * @private
	   * @param {SIP.IncomingRequest}
	   * @returns {SIP.Subscription|null}
	   */
	  UA.prototype.findEarlySubscription = function (request) {
	    return this.earlySubscriptions[request.call_id + request.to_tag + request.getHeader('event')] || null;
	  };

	  function checkAuthenticationFactory(authenticationFactory) {
	    if (!(authenticationFactory instanceof Function)) {
	      return;
	    }
	    if (!authenticationFactory.initialize) {
	      authenticationFactory.initialize = function initialize() {
	        return SIP.Utils.Promise.resolve();
	      };
	    }
	    return authenticationFactory;
	  }

	  /**
	   * Configuration load.
	   * @private
	   * returns {Boolean}
	   */
	  UA.prototype.loadConfig = function (configuration) {
	    // Settings and default values
	    var parameter,
	        value,
	        checked_value,
	        hostportParams,
	        registrarServer,
	        settings = {
	      /* Host address
	      * Value to be set in Via sent_by and host part of Contact FQDN
	      */
	      viaHost: SIP.Utils.createRandomToken(12) + '.invalid',

	      uri: new SIP.URI('sip', 'anonymous.' + SIP.Utils.createRandomToken(6), 'anonymous.invalid', null, null),

	      //Custom Configuration Settings
	      custom: {},

	      //Display name
	      displayName: '',

	      // Password
	      password: null,

	      // Registration parameters
	      registerExpires: 600,
	      register: true,
	      registrarServer: null,

	      // Transport related parameters
	      transportConstructor: __webpack_require__(29)(SIP),
	      transportOptions: {},

	      //string to be inserted into User-Agent request header
	      userAgentString: SIP.C.USER_AGENT,

	      // Session parameters
	      noAnswerTimeout: 60,

	      // Hacks
	      hackViaTcp: false,
	      hackIpInContact: false,
	      hackWssInTransport: false,
	      hackAllowUnregisteredOptionTags: false,

	      // Session Description Handler Options
	      sessionDescriptionHandlerFactoryOptions: {
	        constraints: {},
	        peerConnectionOptions: {}
	      },

	      contactName: SIP.Utils.createRandomToken(8), // user name in user part
	      contactTransport: 'ws',
	      forceRport: false,

	      //autostarting
	      autostart: true,
	      autostop: true,

	      //Reliable Provisional Responses
	      rel100: SIP.C.supported.UNSUPPORTED,

	      // DTMF type: 'info' or 'rtp' (RFC 4733)
	      // RTP Payload Spec: https://tools.ietf.org/html/rfc4733
	      // WebRTC Audio Spec: https://tools.ietf.org/html/rfc7874
	      dtmfType: SIP.C.dtmfType.INFO,

	      // Replaces header (RFC 3891)
	      // http://tools.ietf.org/html/rfc3891
	      replaces: SIP.C.supported.UNSUPPORTED,

	      sessionDescriptionHandlerFactory: __webpack_require__(30)(SIP).defaultFactory,

	      authenticationFactory: checkAuthenticationFactory(function authenticationFactory(ua) {
	        return new SIP.DigestAuthentication(ua);
	      }),

	      allowLegacyNotifications: false,

	      allowOutOfDialogRefers: false
	    };

	    // Pre-Configuration
	    function aliasUnderscored(parameter, logger) {
	      var underscored = parameter.replace(/([a-z][A-Z])/g, function (m) {
	        return m[0] + '_' + m[1].toLowerCase();
	      });

	      if (parameter === underscored) {
	        return;
	      }

	      var hasParameter = configuration.hasOwnProperty(parameter);
	      if (configuration.hasOwnProperty(underscored)) {
	        logger.warn(underscored + ' is deprecated, please use ' + parameter);
	        if (hasParameter) {
	          logger.warn(parameter + ' overriding ' + underscored);
	        }
	      }

	      configuration[parameter] = hasParameter ? configuration[parameter] : configuration[underscored];
	    }

	    var configCheck = this.getConfigurationCheck();

	    // Check Mandatory parameters
	    for (parameter in configCheck.mandatory) {
	      aliasUnderscored(parameter, this.logger);
	      if (!configuration.hasOwnProperty(parameter)) {
	        throw new SIP.Exceptions.ConfigurationError(parameter);
	      } else {
	        value = configuration[parameter];
	        checked_value = configCheck.mandatory[parameter](value);
	        if (checked_value !== undefined) {
	          settings[parameter] = checked_value;
	        } else {
	          throw new SIP.Exceptions.ConfigurationError(parameter, value);
	        }
	      }
	    }

	    // Check Optional parameters
	    for (parameter in configCheck.optional) {
	      aliasUnderscored(parameter, this.logger);
	      if (configuration.hasOwnProperty(parameter)) {
	        value = configuration[parameter];

	        // If the parameter value is an empty array, but shouldn't be, apply its default value.
	        if (value instanceof Array && value.length === 0) {
	          continue;
	        }

	        // If the parameter value is null, empty string, or undefined then apply its default value.
	        if (value === null || value === "" || value === undefined) {
	          continue;
	        }
	        // If it's a number with NaN value then also apply its default value.
	        // NOTE: JS does not allow "value === NaN", the following does the work:
	        else if (typeof value === 'number' && isNaN(value)) {
	            continue;
	          }

	        checked_value = configCheck.optional[parameter](value);
	        if (checked_value !== undefined) {
	          settings[parameter] = checked_value;
	        } else {
	          throw new SIP.Exceptions.ConfigurationError(parameter, value);
	        }
	      }
	    }

	    // Post Configuration Process

	    // Allow passing 0 number as displayName.
	    if (settings.displayName === 0) {
	      settings.displayName = '0';
	    }

	    // Instance-id for GRUU
	    if (!settings.instanceId) {
	      settings.instanceId = SIP.Utils.newUUID();
	    }

	    // sipjsId instance parameter. Static random tag of length 5
	    settings.sipjsId = SIP.Utils.createRandomToken(5);

	    // String containing settings.uri without scheme and user.
	    hostportParams = settings.uri.clone();
	    hostportParams.user = null;
	    settings.hostportParams = hostportParams.toRaw().replace(/^sip:/i, '');

	    /* Check whether authorizationUser is explicitly defined.
	     * Take 'settings.uri.user' value if not.
	     */
	    if (!settings.authorizationUser) {
	      settings.authorizationUser = settings.uri.user;
	    }

	    /* If no 'registrarServer' is set use the 'uri' value without user portion. */
	    if (!settings.registrarServer) {
	      registrarServer = settings.uri.clone();
	      registrarServer.user = null;
	      settings.registrarServer = registrarServer;
	    }

	    // User noAnswerTimeout
	    settings.noAnswerTimeout = settings.noAnswerTimeout * 1000;

	    // Via Host
	    if (settings.hackIpInContact) {
	      if (typeof settings.hackIpInContact === 'boolean') {
	        settings.viaHost = SIP.Utils.getRandomTestNetIP();
	      } else if (typeof settings.hackIpInContact === 'string') {
	        settings.viaHost = settings.hackIpInContact;
	      }
	    }

	    // Contact transport parameter
	    if (settings.hackWssInTransport) {
	      settings.contactTransport = 'wss';
	    }

	    this.contact = {
	      pub_gruu: null,
	      temp_gruu: null,
	      uri: new SIP.URI('sip', settings.contactName, settings.viaHost, null, { transport: settings.contactTransport }),
	      toString: function toString(options) {
	        options = options || {};

	        var anonymous = options.anonymous || null,
	            outbound = options.outbound || null,
	            contact = '<';

	        if (anonymous) {
	          contact += (this.temp_gruu || 'sip:anonymous@anonymous.invalid;transport=' + settings.contactTransport).toString();
	        } else {
	          contact += (this.pub_gruu || this.uri).toString();
	        }

	        if (outbound) {
	          contact += ';ob';
	        }

	        contact += '>';

	        return contact;
	      }
	    };

	    var skeleton = {};
	    // Fill the value of the configuration_skeleton
	    for (parameter in settings) {
	      skeleton[parameter] = settings[parameter];
	    }

	    Object.assign(this.configuration, skeleton);

	    this.logger.log('configuration parameters after validation:');
	    for (parameter in settings) {
	      switch (parameter) {
	        case 'uri':
	        case 'registrarServer':
	        case 'sessionDescriptionHandlerFactory':
	          this.logger.log('· ' + parameter + ': ' + settings[parameter]);
	          break;
	        case 'password':
	          this.logger.log('· ' + parameter + ': ' + 'NOT SHOWN');
	          break;
	        case 'transportConstructor':
	          this.logger.log('· ' + parameter + ': ' + settings[parameter].name);
	          break;
	        default:
	          this.logger.log('· ' + parameter + ': ' + JSON.stringify(settings[parameter]));
	      }
	    }

	    return;
	  };

	  /**
	   * Configuration checker.
	   * @private
	   * @return {Boolean}
	   */
	  UA.prototype.getConfigurationCheck = function () {
	    return {
	      mandatory: {},

	      optional: {

	        uri: function uri(_uri) {
	          var parsed;

	          if (!/^sip:/i.test(_uri)) {
	            _uri = SIP.C.SIP + ':' + _uri;
	          }
	          parsed = SIP.URI.parse(_uri);

	          if (!parsed) {
	            return;
	          } else if (!parsed.user) {
	            return;
	          } else {
	            return parsed;
	          }
	        },

	        transportConstructor: function transportConstructor(_transportConstructor) {
	          if ((typeof _transportConstructor === 'undefined' ? 'undefined' : _typeof(_transportConstructor)) === Function) {
	            return _transportConstructor;
	          }
	        },

	        transportOptions: function transportOptions(_transportOptions) {
	          if ((typeof _transportOptions === 'undefined' ? 'undefined' : _typeof(_transportOptions)) === 'object') {
	            return _transportOptions;
	          }
	        },

	        authorizationUser: function authorizationUser(_authorizationUser) {
	          if (SIP.Grammar.parse('"' + _authorizationUser + '"', 'quoted_string') === -1) {
	            return;
	          } else {
	            return _authorizationUser;
	          }
	        },

	        displayName: function displayName(_displayName) {
	          if (SIP.Grammar.parse('"' + _displayName + '"', 'displayName') === -1) {
	            return;
	          } else {
	            return _displayName;
	          }
	        },

	        dtmfType: function dtmfType(_dtmfType) {
	          switch (_dtmfType) {
	            case SIP.C.dtmfType.RTP:
	              return SIP.C.dtmfType.RTP;
	            case SIP.C.dtmfType.INFO:
	            // Fall through
	            default:
	              return SIP.C.dtmfType.INFO;
	          }
	        },

	        hackViaTcp: function hackViaTcp(_hackViaTcp) {
	          if (typeof _hackViaTcp === 'boolean') {
	            return _hackViaTcp;
	          }
	        },

	        hackIpInContact: function hackIpInContact(_hackIpInContact) {
	          if (typeof _hackIpInContact === 'boolean') {
	            return _hackIpInContact;
	          } else if (typeof _hackIpInContact === 'string' && SIP.Grammar.parse(_hackIpInContact, 'host') !== -1) {
	            return _hackIpInContact;
	          }
	        },

	        hackWssInTransport: function hackWssInTransport(_hackWssInTransport) {
	          if (typeof _hackWssInTransport === 'boolean') {
	            return _hackWssInTransport;
	          }
	        },

	        hackAllowUnregisteredOptionTags: function hackAllowUnregisteredOptionTags(_hackAllowUnregisteredOptionTags) {
	          if (typeof _hackAllowUnregisteredOptionTags === 'boolean') {
	            return _hackAllowUnregisteredOptionTags;
	          }
	        },

	        contactTransport: function contactTransport(_contactTransport) {
	          if (typeof _contactTransport === 'string') {
	            return _contactTransport;
	          }
	        },

	        forceRport: function forceRport(_forceRport) {
	          if (typeof _forceRport === 'boolean') {
	            return _forceRport;
	          }
	        },

	        instanceId: function instanceId(_instanceId) {
	          if (typeof _instanceId !== 'string') {
	            return;
	          }

	          if (/^uuid:/i.test(_instanceId)) {
	            _instanceId = _instanceId.substr(5);
	          }

	          if (SIP.Grammar.parse(_instanceId, 'uuid') === -1) {
	            return;
	          } else {
	            return _instanceId;
	          }
	        },

	        noAnswerTimeout: function noAnswerTimeout(_noAnswerTimeout) {
	          var value;
	          if (SIP.Utils.isDecimal(_noAnswerTimeout)) {
	            value = Number(_noAnswerTimeout);
	            if (value > 0) {
	              return value;
	            }
	          }
	        },

	        password: function password(_password) {
	          return String(_password);
	        },

	        rel100: function rel100(_rel) {
	          if (_rel === SIP.C.supported.REQUIRED) {
	            return SIP.C.supported.REQUIRED;
	          } else if (_rel === SIP.C.supported.SUPPORTED) {
	            return SIP.C.supported.SUPPORTED;
	          } else {
	            return SIP.C.supported.UNSUPPORTED;
	          }
	        },

	        replaces: function replaces(_replaces) {
	          if (_replaces === SIP.C.supported.REQUIRED) {
	            return SIP.C.supported.REQUIRED;
	          } else if (_replaces === SIP.C.supported.SUPPORTED) {
	            return SIP.C.supported.SUPPORTED;
	          } else {
	            return SIP.C.supported.UNSUPPORTED;
	          }
	        },

	        register: function register(_register) {
	          if (typeof _register === 'boolean') {
	            return _register;
	          }
	        },

	        registerExpires: function registerExpires(_registerExpires) {
	          var value;
	          if (SIP.Utils.isDecimal(_registerExpires)) {
	            value = Number(_registerExpires);
	            if (value > 0) {
	              return value;
	            }
	          }
	        },

	        registrarServer: function registrarServer(_registrarServer) {
	          var parsed;

	          if (typeof _registrarServer !== 'string') {
	            return;
	          }

	          if (!/^sip:/i.test(_registrarServer)) {
	            _registrarServer = SIP.C.SIP + ':' + _registrarServer;
	          }
	          parsed = SIP.URI.parse(_registrarServer);

	          if (!parsed) {
	            return;
	          } else if (parsed.user) {
	            return;
	          } else {
	            return parsed;
	          }
	        },

	        userAgentString: function userAgentString(_userAgentString) {
	          if (typeof _userAgentString === 'string') {
	            return _userAgentString;
	          }
	        },

	        autostart: function autostart(_autostart) {
	          if (typeof _autostart === 'boolean') {
	            return _autostart;
	          }
	        },

	        autostop: function autostop(_autostop) {
	          if (typeof _autostop === 'boolean') {
	            return _autostop;
	          }
	        },

	        sessionDescriptionHandlerFactory: function sessionDescriptionHandlerFactory(_sessionDescriptionHandlerFactory) {
	          if (_sessionDescriptionHandlerFactory instanceof Function) {
	            return _sessionDescriptionHandlerFactory;
	          }
	        },

	        sessionDescriptionHandlerFactoryOptions: function sessionDescriptionHandlerFactoryOptions(options) {
	          if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	            return options;
	          }
	        },

	        authenticationFactory: checkAuthenticationFactory,

	        allowLegacyNotifications: function allowLegacyNotifications(_allowLegacyNotifications) {
	          if (typeof _allowLegacyNotifications === 'boolean') {
	            return _allowLegacyNotifications;
	          }
	        },

	        custom: function custom(_custom) {
	          if ((typeof _custom === 'undefined' ? 'undefined' : _typeof(_custom)) === 'object') {
	            return _custom;
	          }
	        },

	        contactName: function contactName(_contactName) {
	          if (typeof _contactName === 'string') {
	            return _contactName;
	          }
	        }
	      }
	    };
	  };

	  UA.C = C;
	  SIP.UA = UA;
	};
	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(28)));

	/***/ }),
	/* 28 */
	/***/ (function(module, exports) {

	var g;

	// This works in non-strict mode
	g = (function() {
		return this;
	})();

	try {
		// This works if eval is allowed (see CSP)
		g = g || Function("return this")() || (0, eval)("this");
	} catch (e) {
		// This works if the window reference is available
		if (typeof window === "object") g = window;
	}

	// g can still be undefined, but nothing to do about it...
	// We return undefined, instead of nothing here, so it's
	// easier to handle this case. if(!global) { ...}

	module.exports = g;


	/***/ }),
	/* 29 */
	/***/ (function(module, exports, __webpack_require__) {
	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * @fileoverview Transport
	 */

	/**
	 * @augments SIP
	 * @class Transport
	 * @param {Object} options
	 */

	module.exports = function (SIP) {
	  var Transport,
	      C = {
	    // Transport status codes
	    STATUS_CONNECTING: 0,
	    STATUS_OPEN: 1,
	    STATUS_CLOSING: 2,
	    STATUS_CLOSED: 3
	  };

	  var WebSocket = (global.window || global).WebSocket;

	  /**
	   * Compute an amount of time in seconds to wait before sending another
	   * keep-alive.
	   * @returns {Number}
	   */
	  function computeKeepAliveTimeout(upperBound) {
	    var lowerBound = upperBound * 0.8;
	    return 1000 * (Math.random() * (upperBound - lowerBound) + lowerBound);
	  }

	  Transport = function Transport(logger, options) {
	    options = SIP.Utils.defaultOptions({}, options);
	    this.logger = logger;

	    this.ws = null;
	    this.server = null;

	    this.connectionPromise = null;
	    this.connectDeferredResolve = null;
	    this.connectionTimeout = null;

	    this.disconnectionPromise = null;
	    this.disconnectDeferredResolve = null;

	    this.boundOnOpen = null;
	    this.boundOnMessage = null;
	    this.boundOnClose = null;

	    this.reconnectionAttempts = 0;
	    this.reconnectTimer = null;

	    // Keep alive
	    this.keepAliveInterval = null;
	    this.keepAliveDebounceTimeout = null;

	    this.status = C.STATUS_CONNECTING;

	    this.configuration = {};

	    this.loadConfig(options);
	  };

	  Transport.prototype = Object.create(SIP.Transport.prototype, {

	    /**
	    *
	    * @returns {Boolean}
	    */
	    isConnected: { writable: true, value: function isConnected() {
	        return this.status === C.STATUS_OPEN;
	      } },

	    /**
	     * Send a message.
	     * @param {SIP.OutgoingRequest|String} msg
	     * @param {Object} [options]
	     * @returns {Promise}
	     */
	    sendPromise: { writable: true, value: function sendPromise(msg, options) {
	        options = options || {};
	        if (!this.statusAssert(C.STATUS_OPEN, options.force)) {
	          this.onError('unable to send message - WebSocket not open');
	          return SIP.Utils.Promise.reject();
	        }

	        var message = msg.toString();

	        if (this.ws) {
	          if (this.configuration.traceSip === true) {
	            this.logger.log('sending WebSocket message:\n\n' + message + '\n');
	          }
	          this.ws.send(message);
	          return SIP.Utils.Promise.resolve({ msg: message });
	        } else {
	          this.onError('unable to send message - WebSocket does not exist');
	          return SIP.Utils.Promise.reject();
	        }
	      } },

	    /**
	    * Disconnect socket.
	    */
	    disconnectPromise: { writable: true, value: function disconnectPromise(options) {
	        if (this.disconnectionPromise) {
	          return this.disconnectionPromise;
	        }
	        options = options || {};
	        if (!this.statusTransition(C.STATUS_CLOSING, options.force)) {
	          return SIP.Utils.Promise.reject('Failed status transition - attempted to disconnect a socket that was not open');
	        }
	        this.disconnectionPromise = new SIP.Utils.Promise(function (resolve, reject) {
	          this.disconnectDeferredResolve = resolve;

	          if (this.reconnectTimer) {
	            SIP.Timers.clearTimeout(this.reconnectTimer);
	            this.reconnectTimer = null;
	          }

	          if (this.ws) {
	            this.stopSendingKeepAlives();

	            this.logger.log('closing WebSocket ' + this.server.ws_uri);
	            this.ws.close(options.code, options.reason);
	          } else {
	            reject('Attempted to disconnect but the websocket doesn\'t exist');
	          }
	        }.bind(this));

	        return this.disconnectionPromise;
	      } },

	    /**
	    * Connect socket.
	    */
	    connectPromise: { writable: true, value: function connectPromise(options) {
	        if (this.connectionPromise) {
	          return this.connectionPromise;
	        }
	        options = options || {};
	        this.server = this.server || this.getNextWsServer(options.force);

	        this.connectionPromise = new SIP.Utils.Promise(function (resolve, reject) {

	          if ((this.status === C.STATUS_OPEN || this.status === C.STATUS_CLOSING) && !options.force) {
	            this.logger.warn('WebSocket ' + this.server.ws_uri + ' is already connected');
	            reject('Failed status check - attempted to open a connection but already open/closing');
	            return;
	          }

	          this.connectDeferredResolve = resolve;

	          this.status = C.STATUS_CONNECTING;
	          this.logger.log('connecting to WebSocket ' + this.server.ws_uri);
	          this.disposeWs();
	          try {
	            this.ws = new WebSocket(this.server.ws_uri, 'sip');
	          } catch (e) {
	            this.ws = null;
	            this.status = C.STATUS_CLOSED; // force status to closed in error case
	            this.onError('error connecting to WebSocket ' + this.server.ws_uri + ':' + e);
	            reject('Failed to create a websocket');
	            return;
	          }

	          if (!this.ws) {
	            reject('Unexpected instance websocket not set');
	            return;
	          }

	          this.connectionTimeout = SIP.Timers.setTimeout(function () {
	            this.onError('took too long to connect - exceeded time set in configuration.connectionTimeout: ' + this.configuration.connectionTimeout + 's');
	          }.bind(this), this.configuration.connectionTimeout * 1000);

	          this.boundOnOpen = this.onOpen.bind(this);
	          this.boundOnMessage = this.onMessage.bind(this);
	          this.boundOnClose = this.onClose.bind(this);
	          this.ws.addEventListener('open', this.boundOnOpen);
	          this.ws.addEventListener('message', this.boundOnMessage);
	          this.ws.addEventListener('close', this.boundOnClose);
	        }.bind(this));

	        return this.connectionPromise;
	      } },

	    // Transport Event Handlers

	    /**
	    * @event
	    * @param {event} e
	    */
	    onOpen: { writable: true, value: function onOpen() {
	        this.status = C.STATUS_OPEN; // quietly force status to open
	        this.emit('connected');
	        SIP.Timers.clearTimeout(this.connectionTimeout);

	        this.logger.log('WebSocket ' + this.server.ws_uri + ' connected');

	        // Clear reconnectTimer since we are not disconnected
	        if (this.reconnectTimer !== null) {
	          SIP.Timers.clearTimeout(this.reconnectTimer);
	          this.reconnectTimer = null;
	        }
	        // Reset reconnectionAttempts
	        this.reconnectionAttempts = 0;

	        // Reset disconnection promise so we can disconnect from a fresh state
	        this.disconnectionPromise = null;
	        this.disconnectDeferredResolve = null;

	        // Start sending keep-alives
	        this.startSendingKeepAlives();

	        if (this.connectDeferredResolve) {
	          this.connectDeferredResolve({ overrideEvent: true });
	        } else {
	          this.logger.warn('Unexpected websocket.onOpen with no connectDeferredResolve');
	        }
	      } },

	    /**
	    * @event
	    * @param {event} e
	    */
	    onClose: { writable: true, value: function onClose(e) {
	        this.logger.log('WebSocket disconnected (code: ' + e.code + (e.reason ? '| reason: ' + e.reason : '') + ')');
	        this.emit('disconnected', { code: e.code, reason: e.reason });

	        if (this.status !== C.STATUS_CLOSING) {
	          this.logger.warn('WebSocket abrupt disconnection');
	          this.emit('transportError');
	        }

	        this.stopSendingKeepAlives();

	        // Clean up connection variables so we can connect again from a fresh state
	        SIP.Timers.clearTimeout(this.connectionTimeout);
	        this.connectionTimeout = null;
	        this.connectionPromise = null;
	        this.connectDeferredResolve = null;

	        // Check whether the user requested to close.
	        if (this.disconnectDeferredResolve) {
	          this.disconnectDeferredResolve({ overrideEvent: true });
	          this.statusTransition(C.STATUS_CLOSED);
	          this.disconnectDeferredResolve = null;
	          return;
	        }
	        this.status = C.STATUS_CLOSED; // quietly force status to closed
	        this.reconnect();
	      } },

	    /**
	    * Removes event listeners and clears the instance ws
	    * @private
	    * @param {event} e
	    */
	    disposeWs: { writable: true, value: function disposeWs() {
	        if (this.ws) {
	          this.ws.removeEventListener('open', this.boundOnOpen);
	          this.ws.removeEventListener('message', this.boundOnMessage);
	          this.ws.removeEventListener('close', this.boundOnClose);
	          this.boundOnOpen = null;
	          this.boundOnMessage = null;
	          this.boundOnClose = null;
	          this.ws = null;
	        }
	      } },

	    /**
	    * @event
	    * @param {event} e
	    */
	    onMessage: { writable: true, value: function onMessage(e) {
	        var data = e.data;
	        // CRLF Keep Alive response from server. Clear our keep alive timeout.
	        if (data === '\r\n') {
	          this.clearKeepAliveTimeout();

	          if (this.configuration.traceSip === true) {
	            this.logger.log('received WebSocket message with CRLF Keep Alive response');
	          }
	          return;
	        } else if (!data) {
	          this.logger.warn('received empty message, message discarded');
	          return;
	        }

	        // WebSocket binary message.
	        else if (typeof data !== 'string') {
	            try {
	              data = String.fromCharCode.apply(null, new Uint8Array(data));
	            } catch (err) {
	              this.logger.warn('received WebSocket binary message failed to be converted into string, message discarded');
	              return;
	            }

	            if (this.configuration.traceSip === true) {
	              this.logger.log('received WebSocket binary message:\n\n' + data + '\n');
	            }
	          }

	          // WebSocket text message.
	          else {
	              if (this.configuration.traceSip === true) {
	                this.logger.log('received WebSocket text message:\n\n' + data + '\n');
	              }
	            }

	        this.emit('message', data);
	      } },

	    /**
	    * @event
	    * @param {event} e
	    */
	    onError: { writable: true, value: function onError(e) {
	        this.logger.warn('Transport error: ' + e);
	        this.emit('transportError');
	      } },

	    /**
	    * Reconnection attempt logic.
	    * @private
	    */
	    reconnect: { writable: true, value: function reconnect() {
	        if (this.reconnectionAttempts > 0) {
	          this.logger.log('Reconnection attempt ' + this.reconnectionAttempts + ' failed');
	        }

	        if (this.noAvailableServers()) {
	          this.logger.warn('no available ws servers left - going to closed state');
	          this.status = C.STATUS_CLOSED;
	          this.resetServerErrorStatus();
	          return;
	        }

	        if (this.isConnected()) {
	          this.logger.warn('attempted to reconnect while connected - forcing disconnect');
	          this.disconnect({ force: true });
	        }

	        this.reconnectionAttempts += 1;

	        if (this.reconnectionAttempts > this.configuration.maxReconnectionAttempts) {
	          this.logger.warn('maximum reconnection attempts for WebSocket ' + this.server.ws_uri);
	          this.logger.log('transport ' + this.server.ws_uri + ' failed | connection state set to \'error\'');
	          this.server.isError = true;
	          this.emit('transportError');
	          this.server = this.getNextWsServer();
	          this.reconnectionAttempts = 0;
	          this.reconnect();
	        } else {
	          this.logger.log('trying to reconnect to WebSocket ' + this.server.ws_uri + ' (reconnection attempt ' + this.reconnectionAttempts + ')');
	          this.reconnectTimer = SIP.Timers.setTimeout(function () {
	            this.connect();
	            this.reconnectTimer = null;
	          }.bind(this), this.reconnectionAttempts === 1 ? 0 : this.configuration.reconnectionTimeout * 1000);
	        }
	      } },

	    /**
	    * Resets the error state of all servers in the configuration
	    */
	    resetServerErrorStatus: { writable: true, value: function resetServerErrorStatus() {
	        var idx,
	            length = this.configuration.wsServers.length;
	        for (idx = 0; idx < length; idx++) {
	          this.configuration.wsServers[idx].isError = false;
	        }
	      } },

	    /**
	    * Retrieve the next server to which connect.
	    * @private
	    * @param {Boolean} force allows bypass of server error status checking
	    * @returns {Object} wsServer
	    */
	    getNextWsServer: { writable: true, value: function getNextWsServer(force) {
	        if (this.noAvailableServers()) {
	          this.logger.warn('attempted to get next ws server but there are no available ws servers left');
	          return;
	        }
	        // Order servers by weight
	        var idx,
	            length,
	            wsServer,
	            candidates = [];

	        length = this.configuration.wsServers.length;
	        for (idx = 0; idx < length; idx++) {
	          wsServer = this.configuration.wsServers[idx];

	          if (wsServer.isError && !force) {
	            continue;
	          } else if (candidates.length === 0) {
	            candidates.push(wsServer);
	          } else if (wsServer.weight > candidates[0].weight) {
	            candidates = [wsServer];
	          } else if (wsServer.weight === candidates[0].weight) {
	            candidates.push(wsServer);
	          }
	        }

	        idx = Math.floor(Math.random() * candidates.length);

	        return candidates[idx];
	      } },

	    /**
	    * Checks all configuration servers, returns true if all of them have isError: true and false otherwise
	    * @private
	    * @returns {Boolean}
	    */
	    noAvailableServers: { writable: true, value: function noAvailableServers() {
	        var server;
	        for (server in this.configuration.wsServers) {
	          if (!this.configuration.wsServers[server].isError) {
	            return false;
	          }
	        }
	        return true;
	      } },

	    //==============================
	    // KeepAlive Stuff
	    //==============================

	    /**
	     * Send a keep-alive (a double-CRLF sequence).
	     * @private
	     * @returns {Boolean}
	     */
	    sendKeepAlive: { writable: true, value: function sendKeepAlive() {
	        if (this.keepAliveDebounceTimeout) {
	          // We already have an outstanding keep alive, do not send another.
	          return;
	        }

	        this.keepAliveDebounceTimeout = SIP.Timers.setTimeout(function () {
	          this.emit('keepAliveDebounceTimeout');
	        }.bind(this), this.configuration.keepAliveDebounce * 1000);

	        return this.send('\r\n\r\n');
	      } },

	    clearKeepAliveTimeout: { writable: true, value: function clearKeepAliveTimeout() {
	        SIP.Timers.clearTimeout(this.keepAliveDebounceTimeout);
	        this.keepAliveDebounceTimeout = null;
	      } },

	    /**
	     * Start sending keep-alives.
	     * @private
	     */
	    startSendingKeepAlives: { writable: true, value: function startSendingKeepAlives() {
	        if (this.configuration.keepAliveInterval && !this.keepAliveInterval) {
	          this.keepAliveInterval = SIP.Timers.setInterval(function () {
	            this.sendKeepAlive();
	            this.startSendingKeepAlives();
	          }.bind(this), computeKeepAliveTimeout(this.configuration.keepAliveInterval));
	        }
	      } },

	    /**
	     * Stop sending keep-alives.
	     * @private
	     */
	    stopSendingKeepAlives: { writable: true, value: function stopSendingKeepAlives() {
	        SIP.Timers.clearInterval(this.keepAliveInterval);
	        SIP.Timers.clearTimeout(this.keepAliveDebounceTimeout);
	        this.keepAliveInterval = null;
	        this.keepAliveDebounceTimeout = null;
	      } },

	    //==============================
	    // Status Stuff
	    //==============================

	    /**
	    * Checks given status against instance current status. Returns true if they match
	    * @private
	    * @param {Number} status
	    * @param {Boolean} [force]
	    * @returns {Boolean}
	    */
	    statusAssert: { writable: true, value: function statusAssert(status, force) {
	        if (status === this.status) {
	          return true;
	        } else {
	          if (force) {
	            this.logger.warn('Attempted to assert ' + Object.keys(C)[this.status] + ' as ' + Object.keys(C)[status] + '- continuing with option: \'force\'');
	            return true;
	          } else {
	            this.logger.warn('Tried to assert ' + Object.keys(C)[status] + ' but is currently ' + Object.keys(C)[this.status]);
	            return false;
	          }
	        }
	      } },

	    /**
	    * Transitions the status. Checks for legal transition via assertion beforehand
	    * @private
	    * @param {Number} status
	    * @param {Boolean} [force]
	    * @returns {Boolean}
	    */
	    statusTransition: { writable: true, value: function statusTransition(status, force) {
	        this.logger.log('Attempting to transition status from ' + Object.keys(C)[this.status] + ' to ' + Object.keys(C)[status]);
	        if (status === C.STATUS_OPEN && this.statusAssert(C.STATUS_CONNECTING, force) || status === C.STATUS_CLOSING && this.statusAssert(C.STATUS_OPEN, force) || status === C.STATUS_CLOSED && this.statusAssert(C.STATUS_CLOSING, force)) {
	          this.status = status;
	          return true;
	        } else {
	          this.logger.warn('Status transition failed - result: no-op - reason: either gave an nonexistent status or attempted illegal transition');
	          return false;
	        }
	      } },

	    //==============================
	    // Configuration Handling
	    //==============================

	    /**
	     * Configuration load.
	     * @private
	     * returns {Boolean}
	     */
	    loadConfig: { writable: true, value: function loadConfig(configuration) {
	        var parameter,
	            value,
	            checked_value,
	            settings = {
	          wsServers: [{
	            scheme: 'WSS',
	            sip_uri: '<sip:edge.sip.onsip.com;transport=ws;lr>',
	            weight: 0,
	            ws_uri: 'wss://edge.sip.onsip.com',
	            isError: false
	          }],

	          connectionTimeout: 5,

	          maxReconnectionAttempts: 3,
	          reconnectionTimeout: 4,

	          keepAliveInterval: 0,
	          keepAliveDebounce: 10,

	          // Logging
	          traceSip: false
	        };

	        // Pre-Configuration
	        function aliasUnderscored(parameter, logger) {
	          var underscored = parameter.replace(/([a-z][A-Z])/g, function (m) {
	            return m[0] + '_' + m[1].toLowerCase();
	          });

	          if (parameter === underscored) {
	            return;
	          }

	          var hasParameter = configuration.hasOwnProperty(parameter);
	          if (configuration.hasOwnProperty(underscored)) {
	            logger.warn(underscored + ' is deprecated, please use ' + parameter);
	            if (hasParameter) {
	              logger.warn(parameter + ' overriding ' + underscored);
	            }
	          }

	          configuration[parameter] = hasParameter ? configuration[parameter] : configuration[underscored];
	        }

	        var configCheck = this.getConfigurationCheck();

	        // Check Mandatory parameters
	        for (parameter in configCheck.mandatory) {
	          aliasUnderscored(parameter, this.logger);
	          if (!configuration.hasOwnProperty(parameter)) {
	            throw new SIP.Exceptions.ConfigurationError(parameter);
	          } else {
	            value = configuration[parameter];
	            checked_value = configCheck.mandatory[parameter](value);
	            if (checked_value !== undefined) {
	              settings[parameter] = checked_value;
	            } else {
	              throw new SIP.Exceptions.ConfigurationError(parameter, value);
	            }
	          }
	        }

	        // Check Optional parameters
	        for (parameter in configCheck.optional) {
	          aliasUnderscored(parameter, this.logger);
	          if (configuration.hasOwnProperty(parameter)) {
	            value = configuration[parameter];

	            // If the parameter value is an empty array, but shouldn't be, apply its default value.
	            if (value instanceof Array && value.length === 0) {
	              continue;
	            }

	            // If the parameter value is null, empty string, or undefined then apply its default value.
	            if (value === null || value === '' || value === undefined) {
	              continue;
	            }
	            // If it's a number with NaN value then also apply its default value.
	            // NOTE: JS does not allow "value === NaN", the following does the work:
	            else if (typeof value === 'number' && isNaN(value)) {
	                continue;
	              }

	            checked_value = configCheck.optional[parameter](value);
	            if (checked_value !== undefined) {
	              settings[parameter] = checked_value;
	            } else {
	              throw new SIP.Exceptions.ConfigurationError(parameter, value);
	            }
	          }
	        }

	        var skeleton = {};
	        // Fill the value of the configuration_skeleton
	        for (parameter in settings) {
	          skeleton[parameter] = {
	            value: settings[parameter]
	          };
	        }

	        Object.defineProperties(this.configuration, skeleton);

	        this.logger.log('configuration parameters after validation:');
	        for (parameter in settings) {
	          this.logger.log('· ' + parameter + ': ' + JSON.stringify(settings[parameter]));
	        }

	        return;
	      } },

	    /**
	     * Configuration checker.
	     * @private
	     * @return {Boolean}
	     */
	    getConfigurationCheck: { writable: true, value: function getConfigurationCheck() {
	        return {
	          mandatory: {},

	          optional: {

	            //Note: this function used to call 'this.logger.error' but calling 'this' with anything here is invalid
	            wsServers: function wsServers(_wsServers) {
	              var idx, length, url;

	              /* Allow defining wsServers parameter as:
	               *  String: "host"
	               *  Array of Strings: ["host1", "host2"]
	               *  Array of Objects: [{ws_uri:"host1", weight:1}, {ws_uri:"host2", weight:0}]
	               *  Array of Objects and Strings: [{ws_uri:"host1"}, "host2"]
	               */
	              if (typeof _wsServers === 'string') {
	                _wsServers = [{ ws_uri: _wsServers }];
	              } else if (_wsServers instanceof Array) {
	                length = _wsServers.length;
	                for (idx = 0; idx < length; idx++) {
	                  if (typeof _wsServers[idx] === 'string') {
	                    _wsServers[idx] = { ws_uri: _wsServers[idx] };
	                  }
	                }
	              } else {
	                return;
	              }

	              if (_wsServers.length === 0) {
	                return false;
	              }

	              length = _wsServers.length;
	              for (idx = 0; idx < length; idx++) {
	                if (!_wsServers[idx].ws_uri) {
	                  return;
	                }
	                if (_wsServers[idx].weight && !Number(_wsServers[idx].weight)) {
	                  return;
	                }

	                url = SIP.Grammar.parse(_wsServers[idx].ws_uri, 'absoluteURI');

	                if (url === -1) {
	                  return;
	                } else if (['wss', 'ws', 'udp'].indexOf(url.scheme) < 0) {
	                  return;
	                } else {
	                  _wsServers[idx].sip_uri = '<sip:' + url.host + (url.port ? ':' + url.port : '') + ';transport=' + url.scheme.replace(/^wss$/i, 'ws') + ';lr>';

	                  if (!_wsServers[idx].weight) {
	                    _wsServers[idx].weight = 0;
	                  }

	                  _wsServers[idx].isError = false;
	                  _wsServers[idx].scheme = url.scheme.toUpperCase();
	                }
	              }
	              return _wsServers;
	            },

	            keepAliveInterval: function keepAliveInterval(_keepAliveInterval) {
	              var value;
	              if (SIP.Utils.isDecimal(_keepAliveInterval)) {
	                value = Number(_keepAliveInterval);
	                if (value > 0) {
	                  return value;
	                }
	              }
	            },

	            keepAliveDebounce: function keepAliveDebounce(_keepAliveDebounce) {
	              var value;
	              if (SIP.Utils.isDecimal(_keepAliveDebounce)) {
	                value = Number(_keepAliveDebounce);
	                if (value > 0) {
	                  return value;
	                }
	              }
	            },

	            traceSip: function traceSip(_traceSip) {
	              if (typeof _traceSip === 'boolean') {
	                return _traceSip;
	              }
	            },

	            connectionTimeout: function connectionTimeout(_connectionTimeout) {
	              var value;
	              if (SIP.Utils.isDecimal(_connectionTimeout)) {
	                value = Number(_connectionTimeout);
	                if (value > 0) {
	                  return value;
	                }
	              }
	            },

	            maxReconnectionAttempts: function maxReconnectionAttempts(_maxReconnectionAttempts) {
	              var value;
	              if (SIP.Utils.isDecimal(_maxReconnectionAttempts)) {
	                value = Number(_maxReconnectionAttempts);
	                if (value >= 0) {
	                  return value;
	                }
	              }
	            },

	            reconnectionTimeout: function reconnectionTimeout(_reconnectionTimeout) {
	              var value;
	              if (SIP.Utils.isDecimal(_reconnectionTimeout)) {
	                value = Number(_reconnectionTimeout);
	                if (value > 0) {
	                  return value;
	                }
	              }
	            }

	          }
	        };
	      } }
	  });

	  Transport.C = C;
	  SIP.Web.Transport = Transport;
	  return Transport;
	};
	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(28)));

	/***/ }),
	/* 30 */
	/***/ (function(module, exports, __webpack_require__) {
	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * @fileoverview SessionDescriptionHandler
	 */

	/* SessionDescriptionHandler
	 * @class PeerConnection helper Class.
	 * @param {SIP.Session} session
	 * @param {Object} [options]
	 */

	module.exports = function (SIP) {

	  // Constructor
	  var SessionDescriptionHandler = function SessionDescriptionHandler(logger, observer, options) {
	    // TODO: Validate the options
	    this.options = options || {};

	    this.logger = logger;
	    this.observer = observer;
	    this.dtmfSender = null;

	    this.shouldAcquireMedia = true;

	    this.CONTENT_TYPE = 'application/sdp';

	    this.C = {};
	    this.C.DIRECTION = {
	      NULL: null,
	      SENDRECV: "sendrecv",
	      SENDONLY: "sendonly",
	      RECVONLY: "recvonly",
	      INACTIVE: "inactive"
	    };

	    this.logger.log('SessionDescriptionHandlerOptions: ' + JSON.stringify(this.options));

	    this.direction = this.C.DIRECTION.NULL;

	    this.modifiers = this.options.modifiers || [];
	    if (!Array.isArray(this.modifiers)) {
	      this.modifiers = [this.modifiers];
	    }

	    var environment = global.window || global;
	    this.WebRTC = {
	      MediaStream: environment.MediaStream,
	      getUserMedia: environment.navigator.mediaDevices.getUserMedia.bind(environment.navigator.mediaDevices),
	      RTCPeerConnection: environment.RTCPeerConnection,
	      RTCSessionDescription: environment.RTCSessionDescription
	    };

	    this.iceGatheringDeferred = null;
	    this.iceGatheringTimeout = false;
	    this.iceGatheringTimer = null;

	    this.initPeerConnection(this.options.peerConnectionOptions);

	    this.constraints = this.checkAndDefaultConstraints(this.options.constraints);
	  };

	  /**
	   * @param {SIP.Session} session
	   * @param {Object} [options]
	   */

	  SessionDescriptionHandler.defaultFactory = function defaultFactory(session, options) {
	    var logger = session.ua.getLogger('sip.invitecontext.sessionDescriptionHandler', session.id);
	    var SessionDescriptionHandlerObserver = __webpack_require__(31);
	    var observer = new SessionDescriptionHandlerObserver(session, options);
	    return new SessionDescriptionHandler(logger, observer, options);
	  };

	  SessionDescriptionHandler.prototype = Object.create(SIP.SessionDescriptionHandler.prototype, {
	    // Functions the sesssion can use

	    /**
	     * Destructor
	     */
	    close: { writable: true, value: function value() {
	        this.logger.log('closing PeerConnection');
	        // have to check signalingState since this.close() gets called multiple times
	        if (this.peerConnection && this.peerConnection.signalingState !== 'closed') {
	          if (this.peerConnection.getSenders) {
	            this.peerConnection.getSenders().forEach(function (sender) {
	              if (sender.track) {
	                sender.track.stop();
	              }
	            });
	          } else {
	            this.logger.warn('Using getLocalStreams which is deprecated');
	            this.peerConnection.getLocalStreams().forEach(function (stream) {
	              stream.getTracks().forEach(function (track) {
	                track.stop();
	              });
	            });
	          }
	          if (this.peerConnection.getReceivers) {
	            this.peerConnection.getReceivers().forEach(function (receiver) {
	              if (receiver.track) {
	                receiver.track.stop();
	              }
	            });
	          } else {
	            this.logger.warn('Using getRemoteStreams which is deprecated');
	            this.peerConnection.getRemoteStreams().forEach(function (stream) {
	              stream.getTracks().forEach(function (track) {
	                track.stop();
	              });
	            });
	          }
	          this.resetIceGatheringComplete();
	          this.peerConnection.close();
	        }
	      } },

	    /**
	     * Gets the local description from the underlying media implementation
	     * @param {Object} [options] Options object to be used by getDescription
	     * @param {MediaStreamConstraints} [options.constraints] MediaStreamConstraints https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints
	     * @param {Object} [options.peerConnectionOptions] If this is set it will recreate the peer connection with the new options
	     * @param {Array} [modifiers] Array with one time use description modifiers
	     * @returns {Promise} Promise that resolves with the local description to be used for the session
	     */
	    getDescription: { writable: true, value: function value(options, modifiers) {
	        options = options || {};
	        if (options.peerConnectionOptions) {
	          this.initPeerConnection(options.peerConnectionOptions);
	        }

	        // Merge passed constraints with saved constraints and save
	        var newConstraints = Object.assign({}, this.constraints, options.constraints);
	        newConstraints = this.checkAndDefaultConstraints(newConstraints);
	        if (JSON.stringify(newConstraints) !== JSON.stringify(this.constraints)) {
	          this.constraints = newConstraints;
	          this.shouldAcquireMedia = true;
	        }

	        modifiers = modifiers || [];
	        if (!Array.isArray(modifiers)) {
	          modifiers = [modifiers];
	        }
	        modifiers = modifiers.concat(this.modifiers);

	        return SIP.Utils.Promise.resolve().then(function () {
	          if (this.shouldAcquireMedia) {
	            return this.acquire(this.constraints).then(function () {
	              this.shouldAcquireMedia = false;
	            }.bind(this));
	          }
	        }.bind(this)).then(function () {
	          return this.createOfferOrAnswer(options.RTCOfferOptions, modifiers);
	        }.bind(this)).then(function (sdp) {
	          return {
	            body: sdp,
	            contentType: this.CONTENT_TYPE
	          };
	        }.bind(this));
	      } },

	    /**
	     * Check if the Session Description Handler can handle the Content-Type described by a SIP Message
	     * @param {String} contentType The content type that is in the SIP Message
	     * @returns {boolean}
	     */
	    hasDescription: { writable: true, value: function hasDescription(contentType) {
	        return contentType === this.CONTENT_TYPE;
	      } },

	    /**
	     * The modifier that should be used when the session would like to place the call on hold
	     * @param {String} [sdp] The description that will be modified
	     * @returns {Promise} Promise that resolves with modified SDP
	     */
	    holdModifier: { writable: true, value: function holdModifier(description) {
	        if (!/a=(sendrecv|sendonly|recvonly|inactive)/.test(description.sdp)) {
	          description.sdp = description.sdp.replace(/(m=[^\r]*\r\n)/g, '$1a=sendonly\r\n');
	        } else {
	          description.sdp = description.sdp.replace(/a=sendrecv\r\n/g, 'a=sendonly\r\n');
	          description.sdp = description.sdp.replace(/a=recvonly\r\n/g, 'a=inactive\r\n');
	        }
	        return SIP.Utils.Promise.resolve(description);
	      } },

	    /**
	     * Set the remote description to the underlying media implementation
	     * @param {String} sessionDescription The description provided by a SIP message to be set on the media implementation
	     * @param {Object} [options] Options object to be used by getDescription
	     * @param {MediaStreamConstraints} [options.constraints] MediaStreamConstraints https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints
	     * @param {Object} [options.peerConnectionOptions] If this is set it will recreate the peer connection with the new options
	     * @param {Array} [modifiers] Array with one time use description modifiers
	     * @returns {Promise} Promise that resolves once the description is set
	     */
	    setDescription: { writable: true, value: function setDescription(sessionDescription, options, modifiers) {
	        var self = this;

	        options = options || {};
	        if (options.peerConnectionOptions) {
	          this.initPeerConnection(options.peerConnectionOptions);
	        }

	        modifiers = modifiers || [];
	        if (!Array.isArray(modifiers)) {
	          modifiers = [modifiers];
	        }
	        modifiers = modifiers.concat(this.modifiers);

	        var description = {
	          type: this.hasOffer('local') ? 'answer' : 'offer',
	          sdp: sessionDescription
	        };

	        return SIP.Utils.Promise.resolve().then(function () {
	          if (this.shouldAcquireMedia) {
	            return this.acquire(this.constrains).then(function () {
	              this.shouldAcquireMedia = false;
	            }.bind(this));
	          }
	        }.bind(this)).then(function () {
	          return SIP.Utils.reducePromises(modifiers, description);
	        }).catch(function modifierError(e) {
	          self.logger.error("The modifiers did not resolve successfully");
	          self.logger.error(e);
	          throw e;
	        }).then(function (modifiedDescription) {
	          self.emit('setDescription', modifiedDescription);
	          return self.peerConnection.setRemoteDescription(new self.WebRTC.RTCSessionDescription(modifiedDescription));
	        }).catch(function setRemoteDescriptionError(e) {
	          self.logger.error(e);
	          self.emit('peerConnection-setRemoteDescriptionFailed', e);
	          throw e;
	        }).then(function setRemoteDescriptionSuccess() {
	          if (self.peerConnection.getReceivers) {
	            self.emit('setRemoteDescription', self.peerConnection.getReceivers());
	          } else {
	            self.emit('setRemoteDescription', self.peerConnection.getRemoteStreams());
	          }
	          self.emit('confirmed', self);
	        });
	      } },

	    /**
	     * Send DTMF via RTP (RFC 4733)
	     * @param {String} tones A string containing DTMF digits
	     * @param {Object} [options] Options object to be used by sendDtmf
	     * @returns {boolean} true if DTMF send is successful, false otherwise
	     */
	    sendDtmf: { writable: true, value: function sendDtmf(tones, options) {
	        if (!this.dtmfSender && this.hasBrowserGetSenderSupport()) {
	          var senders = this.peerConnection.getSenders();
	          if (senders.length > 0) {
	            this.dtmfSender = senders[0].dtmf;
	          }
	        }
	        if (!this.dtmfSender && this.hasBrowserTrackSupport()) {
	          var streams = this.peerConnection.getLocalStreams();
	          if (streams.length > 0) {
	            var audioTracks = streams[0].getAudioTracks();
	            if (audioTracks.length > 0) {
	              this.dtmfSender = this.peerConnection.createDTMFSender(audioTracks[0]);
	            }
	          }
	        }
	        if (!this.dtmfSender) {
	          return false;
	        }
	        try {
	          this.dtmfSender.insertDTMF(tones, options.duration, options.interToneGap);
	        } catch (e) {
	          if (e.type === "InvalidStateError" || e.type === "InvalidCharacterError") {
	            this.logger.error(e);
	            return false;
	          } else {
	            throw e;
	          }
	        }
	        this.logger.log('DTMF sent via RTP: ' + tones.toString());
	        return true;
	      } },

	    getDirection: { writable: true, value: function getDirection() {
	        return this.direction;
	      } },

	    // Internal functions
	    createOfferOrAnswer: { writable: true, value: function createOfferOrAnswer(RTCOfferOptions, modifiers) {
	        var self = this;
	        var methodName;
	        var pc = this.peerConnection;

	        RTCOfferOptions = RTCOfferOptions || {};

	        methodName = self.hasOffer('remote') ? 'createAnswer' : 'createOffer';

	        return pc[methodName](RTCOfferOptions).catch(function methodError(e) {
	          self.emit('peerConnection-' + methodName + 'Failed', e);
	          throw e;
	        }).then(function (sdp) {
	          return SIP.Utils.reducePromises(modifiers, self.createRTCSessionDescriptionInit(sdp));
	        }).then(function (sdp) {
	          self.resetIceGatheringComplete();
	          return pc.setLocalDescription(sdp);
	        }).catch(function localDescError(e) {
	          self.emit('peerConnection-SetLocalDescriptionFailed', e);
	          throw e;
	        }).then(function onSetLocalDescriptionSuccess() {
	          return self.waitForIceGatheringComplete();
	        }).then(function readySuccess() {
	          var localDescription = self.createRTCSessionDescriptionInit(self.peerConnection.localDescription);
	          return SIP.Utils.reducePromises(modifiers, localDescription);
	        }).then(function (localDescription) {
	          self.emit('getDescription', localDescription);
	          self.setDirection(localDescription.sdp);
	          return localDescription.sdp;
	        }).catch(function createOfferOrAnswerError(e) {
	          self.logger.error(e);
	          // TODO: Not sure if this is correct
	          throw new SIP.Exceptions.GetDescriptionError(e);
	        });
	      } },

	    // Creates an RTCSessionDescriptionInit from an RTCSessionDescription
	    createRTCSessionDescriptionInit: { writable: true, value: function createRTCSessionDescriptionInit(RTCSessionDescription) {
	        return {
	          type: RTCSessionDescription.type,
	          sdp: RTCSessionDescription.sdp
	        };
	      } },

	    addDefaultIceCheckingTimeout: { writable: true, value: function addDefaultIceCheckingTimeout(peerConnectionOptions) {
	        if (peerConnectionOptions.iceCheckingTimeout === undefined) {
	          peerConnectionOptions.iceCheckingTimeout = 5000;
	        }
	        return peerConnectionOptions;
	      } },

	    addDefaultIceServers: { writable: true, value: function addDefaultIceServers(rtcConfiguration) {
	        if (!rtcConfiguration.iceServers) {
	          rtcConfiguration.iceServers = [{ urls: 'stun:stun.l.google.com:19302' }];
	        }
	        return rtcConfiguration;
	      } },

	    checkAndDefaultConstraints: { writable: true, value: function checkAndDefaultConstraints(constraints) {
	        var defaultConstraints = { audio: true, video: true };
	        constraints = constraints || defaultConstraints;
	        // Empty object check
	        if (Object.keys(constraints).length === 0 && constraints.constructor === Object) {
	          return defaultConstraints;
	        }
	        return constraints;
	      } },

	    hasBrowserTrackSupport: { writable: true, value: function hasBrowserTrackSupport() {
	        return Boolean(this.peerConnection.addTrack);
	      } },

	    hasBrowserGetSenderSupport: { writable: true, value: function hasBrowserGetSenderSupport() {
	        return Boolean(this.peerConnection.getSenders);
	      } },

	    initPeerConnection: { writable: true, value: function initPeerConnection(options) {
	        var self = this;
	        options = options || {};
	        options = this.addDefaultIceCheckingTimeout(options);
	        options.rtcConfiguration = options.rtcConfiguration || {};
	        options.rtcConfiguration = this.addDefaultIceServers(options.rtcConfiguration);

	        this.logger.log('initPeerConnection');

	        if (this.peerConnection) {
	          this.logger.log('Already have a peer connection for this session. Tearing down.');
	          this.resetIceGatheringComplete();
	          this.peerConnection.close();
	        }

	        this.peerConnection = new this.WebRTC.RTCPeerConnection(options.rtcConfiguration);

	        this.logger.log('New peer connection created');

	        if ('ontrack' in this.peerConnection) {
	          this.peerConnection.addEventListener('track', function (e) {
	            self.logger.log('track added');
	            self.observer.trackAdded();
	            self.emit('addTrack', e);
	          });
	        } else {
	          this.logger.warn('Using onaddstream which is deprecated');
	          this.peerConnection.onaddstream = function (e) {
	            self.logger.log('stream added');
	            self.emit('addStream', e);
	          };
	        }

	        this.peerConnection.onicecandidate = function (e) {
	          self.emit('iceCandidate', e);
	          if (e.candidate) {
	            self.logger.log('ICE candidate received: ' + (e.candidate.candidate === null ? null : e.candidate.candidate.trim()));
	          }
	        };

	        this.peerConnection.onicegatheringstatechange = function () {
	          self.logger.log('RTCIceGatheringState changed: ' + this.iceGatheringState);
	          switch (this.iceGatheringState) {
	            case 'gathering':
	              self.emit('iceGathering', this);
	              if (!self.iceGatheringTimer && options.iceCheckingTimeout) {
	                self.iceGatheringTimeout = false;
	                self.iceGatheringTimer = SIP.Timers.setTimeout(function () {
	                  self.logger.log('RTCIceChecking Timeout Triggered after ' + options.iceCheckingTimeout + ' milliseconds');
	                  self.iceGatheringTimeout = true;
	                  self.triggerIceGatheringComplete();
	                }, options.iceCheckingTimeout);
	              }
	              break;
	            case 'complete':
	              self.triggerIceGatheringComplete();
	              break;
	          }
	        };

	        this.peerConnection.oniceconnectionstatechange = function () {
	          //need e for commented out case
	          var stateEvent;

	          switch (this.iceConnectionState) {
	            case 'new':
	              stateEvent = 'iceConnection';
	              break;
	            case 'checking':
	              stateEvent = 'iceConnectionChecking';
	              break;
	            case 'connected':
	              stateEvent = 'iceConnectionConnected';
	              break;
	            case 'completed':
	              stateEvent = 'iceConnectionCompleted';
	              break;
	            case 'failed':
	              stateEvent = 'iceConnectionFailed';
	              break;
	            case 'disconnected':
	              stateEvent = 'iceConnectionDisconnected';
	              break;
	            case 'closed':
	              stateEvent = 'iceConnectionClosed';
	              break;
	            default:
	              self.logger.warn('Unknown iceConnection state:', this.iceConnectionState);
	              return;
	          }
	          self.emit(stateEvent, this);
	        };
	      } },

	    acquire: { writable: true, value: function acquire(constraints) {
	        // Default audio & video to true
	        constraints = this.checkAndDefaultConstraints(constraints);

	        return new SIP.Utils.Promise(function (resolve, reject) {
	          /*
	           * Make the call asynchronous, so that ICCs have a chance
	           * to define callbacks to `userMediaRequest`
	           */
	          this.logger.log('acquiring local media');
	          this.emit('userMediaRequest', constraints);

	          if (constraints.audio || constraints.video) {
	            this.WebRTC.getUserMedia(constraints).then(function (streams) {
	              this.observer.trackAdded();
	              this.emit('userMedia', streams);
	              resolve(streams);
	            }.bind(this)).catch(function (e) {
	              this.emit('userMediaFailed', e);
	              reject(e);
	            }.bind(this));
	          } else {
	            // Local streams were explicitly excluded.
	            resolve([]);
	          }
	        }.bind(this)).catch(function acquireFailed(err) {
	          this.logger.error('unable to acquire streams');
	          this.logger.error(err);
	          return SIP.Utils.Promise.reject(err);
	        }.bind(this)).then(function acquireSucceeded(streams) {
	          this.logger.log('acquired local media streams');
	          try {
	            // Remove old tracks
	            if (this.peerConnection.removeTrack) {
	              this.peerConnection.getSenders().forEach(function (sender) {
	                this.peerConnection.removeTrack(sender);
	              });
	            }
	            return streams;
	          } catch (e) {
	            return SIP.Utils.Promise.reject(e);
	          }
	        }.bind(this)).catch(function removeStreamsFailed(err) {
	          this.logger.error('error removing streams');
	          this.logger.error(err);
	          return SIP.Utils.Promise.reject(err);
	        }.bind(this)).then(function addStreams(streams) {
	          try {
	            streams = [].concat(streams);
	            streams.forEach(function (stream) {
	              if (this.peerConnection.addTrack) {
	                stream.getTracks().forEach(function (track) {
	                  this.peerConnection.addTrack(track, stream);
	                }, this);
	              } else {
	                // Chrome 59 does not support addTrack
	                this.peerConnection.addStream(stream);
	              }
	            }, this);
	          } catch (e) {
	            return SIP.Utils.Promise.reject(e);
	          }
	          return SIP.Utils.Promise.resolve();
	        }.bind(this)).catch(function addStreamsFailed(err) {
	          this.logger.error('error adding stream');
	          this.logger.error(err);
	          return SIP.Utils.Promise.reject(err);
	        }.bind(this));
	      } },

	    hasOffer: { writable: true, value: function hasOffer(where) {
	        var offerState = 'have-' + where + '-offer';
	        return this.peerConnection.signalingState === offerState;
	      } },

	    // ICE gathering state handling

	    isIceGatheringComplete: { writable: true, value: function isIceGatheringComplete() {
	        return this.peerConnection.iceGatheringState === 'complete' || this.iceGatheringTimeout;
	      } },

	    resetIceGatheringComplete: { writable: true, value: function resetIceGatheringComplete() {
	        this.iceGatheringTimeout = false;

	        if (this.iceGatheringTimer) {
	          SIP.Timers.clearTimeout(this.iceGatheringTimer);
	          this.iceGatheringTimer = null;
	        }

	        if (this.iceGatheringDeferred) {
	          this.iceGatheringDeferred.reject();
	          this.iceGatheringDeferred = null;
	        }
	      } },

	    setDirection: { writable: true, value: function setDirection(sdp) {
	        var match = sdp.match(/a=(sendrecv|sendonly|recvonly|inactive)/);
	        if (match === null) {
	          this.direction = this.C.DIRECTION.NULL;
	          this.observer.directionChanged();
	          return;
	        }
	        var direction = match[1];
	        switch (direction) {
	          case this.C.DIRECTION.SENDRECV:
	          case this.C.DIRECTION.SENDONLY:
	          case this.C.DIRECTION.RECVONLY:
	          case this.C.DIRECTION.INACTIVE:
	            this.direction = direction;
	            break;
	          default:
	            this.direction = this.C.DIRECTION.NULL;
	            break;
	        }
	        this.observer.directionChanged();
	      } },

	    triggerIceGatheringComplete: { writable: true, value: function triggerIceGatheringComplete() {
	        if (this.isIceGatheringComplete()) {
	          this.emit('iceGatheringComplete', this);

	          if (this.iceGatheringTimer) {
	            SIP.Timers.clearTimeout(this.iceGatheringTimer);
	            this.iceGatheringTimer = null;
	          }

	          if (this.iceGatheringDeferred) {
	            this.iceGatheringDeferred.resolve();
	            this.iceGatheringDeferred = null;
	          }
	        }
	      } },

	    waitForIceGatheringComplete: { writable: true, value: function waitForIceGatheringComplete() {
	        if (this.isIceGatheringComplete()) {
	          return SIP.Utils.Promise.resolve();
	        } else if (!this.isIceGatheringDeferred) {
	          this.iceGatheringDeferred = SIP.Utils.defer();
	        }
	        return this.iceGatheringDeferred.promise;
	      } }
	  });

	  return SessionDescriptionHandler;
	};
	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(28)));

	/***/ }),
	/* 31 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview SessionDescriptionHandlerObserver
	 */

	/* SessionDescriptionHandlerObserver
	 * @class SessionDescriptionHandler Observer Class.
	 * @param {SIP.Session} session
	 * @param {Object} [options]
	 */

	// Constructor

	var SessionDescriptionHandlerObserver = function SessionDescriptionHandlerObserver(session, options) {
	  this.session = session || {};
	  this.options = options || {};
	};

	SessionDescriptionHandlerObserver.prototype = {
	  trackAdded: function trackAdded() {
	    this.session.emit('trackAdded');
	  },

	  directionChanged: function directionChanged() {
	    this.session.emit('directionChanged');
	  }
	};

	module.exports = SessionDescriptionHandlerObserver;

	/***/ }),
	/* 32 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview Incoming SIP Message Sanity Check
	 */

	/**
	 * SIP message sanity check.
	 * @augments SIP
	 * @function
	 * @param {SIP.IncomingMessage} message
	 * @param {SIP.UA} ua
	 * @param {SIP.Transport} transport
	 * @returns {Boolean}
	 */

	module.exports = function (SIP) {
	  var sanityCheck,
	      requests = [],
	      responses = [],
	      all = [];

	  // Reply
	  function reply(status_code, message, transport) {
	    var to,
	        response = SIP.Utils.buildStatusLine(status_code),
	        vias = message.getHeaders('via'),
	        length = vias.length,
	        idx = 0;

	    for (idx; idx < length; idx++) {
	      response += "Via: " + vias[idx] + "\r\n";
	    }

	    to = message.getHeader('To');

	    if (!message.to_tag) {
	      to += ';tag=' + SIP.Utils.newTag();
	    }

	    response += "To: " + to + "\r\n";
	    response += "From: " + message.getHeader('From') + "\r\n";
	    response += "Call-ID: " + message.call_id + "\r\n";
	    response += "CSeq: " + message.cseq + " " + message.method + "\r\n";
	    response += "\r\n";

	    transport.send(response);
	  }

	  /*
	   * Sanity Check for incoming Messages
	   *
	   * Requests:
	   *  - _rfc3261_8_2_2_1_ Receive a Request with a non supported URI scheme
	   *  - _rfc3261_16_3_4_ Receive a Request already sent by us
	   *   Does not look at via sent-by but at sipjsId, which is inserted as
	   *   a prefix in all initial requests generated by the ua
	   *  - _rfc3261_18_3_request_ Body Content-Length
	   *  - _rfc3261_8_2_2_2_ Merged Requests
	   *
	   * Responses:
	   *  - _rfc3261_8_1_3_3_ Multiple Via headers
	   *  - _rfc3261_18_1_2_ sent-by mismatch
	   *  - _rfc3261_18_3_response_ Body Content-Length
	   *
	   * All:
	   *  - Minimum headers in a SIP message
	   */

	  // Sanity Check functions for requests
	  function rfc3261_8_2_2_1(message, ua, transport) {
	    if (!message.ruri || message.ruri.scheme !== 'sip') {
	      reply(416, message, transport);
	      return false;
	    }
	  }

	  function rfc3261_16_3_4(message, ua, transport) {
	    if (!message.to_tag) {
	      if (message.call_id.substr(0, 5) === ua.configuration.sipjsId) {
	        reply(482, message, transport);
	        return false;
	      }
	    }
	  }

	  function rfc3261_18_3_request(message, ua, transport) {
	    var len = SIP.Utils.str_utf8_length(message.body),
	        contentLength = message.getHeader('content-length');

	    if (len < contentLength) {
	      reply(400, message, transport);
	      return false;
	    }
	  }

	  function rfc3261_8_2_2_2(message, ua, transport) {
	    var tr,
	        idx,
	        fromTag = message.from_tag,
	        call_id = message.call_id,
	        cseq = message.cseq;

	    if (!message.to_tag) {
	      if (message.method === SIP.C.INVITE) {
	        tr = ua.transactions.ist[message.via_branch];
	        if (tr) {
	          return;
	        } else {
	          for (idx in ua.transactions.ist) {
	            tr = ua.transactions.ist[idx];
	            if (tr.request.from_tag === fromTag && tr.request.call_id === call_id && tr.request.cseq === cseq) {
	              reply(482, message, transport);
	              return false;
	            }
	          }
	        }
	      } else {
	        tr = ua.transactions.nist[message.via_branch];
	        if (tr) {
	          return;
	        } else {
	          for (idx in ua.transactions.nist) {
	            tr = ua.transactions.nist[idx];
	            if (tr.request.from_tag === fromTag && tr.request.call_id === call_id && tr.request.cseq === cseq) {
	              reply(482, message, transport);
	              return false;
	            }
	          }
	        }
	      }
	    }
	  }

	  // Sanity Check functions for responses
	  function rfc3261_8_1_3_3(message, ua) {
	    if (message.getHeaders('via').length > 1) {
	      ua.getLogger('sip.sanitycheck').warn('More than one Via header field present in the response. Dropping the response');
	      return false;
	    }
	  }

	  function rfc3261_18_1_2(message, ua) {
	    var viaHost = ua.configuration.viaHost;
	    if (message.via.host !== viaHost || message.via.port !== undefined) {
	      ua.getLogger('sip.sanitycheck').warn('Via sent-by in the response does not match UA Via host value. Dropping the response');
	      return false;
	    }
	  }

	  function rfc3261_18_3_response(message, ua) {
	    var len = SIP.Utils.str_utf8_length(message.body),
	        contentLength = message.getHeader('content-length');

	    if (len < contentLength) {
	      ua.getLogger('sip.sanitycheck').warn('Message body length is lower than the value in Content-Length header field. Dropping the response');
	      return false;
	    }
	  }

	  // Sanity Check functions for requests and responses
	  function minimumHeaders(message, ua) {
	    var mandatoryHeaders = ['from', 'to', 'call_id', 'cseq', 'via'],
	        idx = mandatoryHeaders.length;

	    while (idx--) {
	      if (!message.hasHeader(mandatoryHeaders[idx])) {
	        ua.getLogger('sip.sanitycheck').warn('Missing mandatory header field : ' + mandatoryHeaders[idx] + '. Dropping the response');
	        return false;
	      }
	    }
	  }

	  requests.push(rfc3261_8_2_2_1);
	  requests.push(rfc3261_16_3_4);
	  requests.push(rfc3261_18_3_request);
	  requests.push(rfc3261_8_2_2_2);

	  responses.push(rfc3261_8_1_3_3);
	  responses.push(rfc3261_18_1_2);
	  responses.push(rfc3261_18_3_response);

	  all.push(minimumHeaders);

	  sanityCheck = function sanityCheck(message, ua, transport) {
	    var len, pass;

	    len = all.length;
	    while (len--) {
	      pass = all[len](message, ua, transport);
	      if (pass === false) {
	        return false;
	      }
	    }

	    if (message instanceof SIP.IncomingRequest) {
	      len = requests.length;
	      while (len--) {
	        pass = requests[len](message, ua, transport);
	        if (pass === false) {
	          return false;
	        }
	      }
	    } else if (message instanceof SIP.IncomingResponse) {
	      len = responses.length;
	      while (len--) {
	        pass = responses[len](message, ua, transport);
	        if (pass === false) {
	          return false;
	        }
	      }
	    }

	    //Everything is OK
	    return true;
	  };

	  SIP.sanityCheck = sanityCheck;
	};

	/***/ }),
	/* 33 */
	/***/ (function(module, exports, __webpack_require__) {


	var md5 = __webpack_require__(34);

	/**
	 * @fileoverview SIP Digest Authentication
	 */

	/**
	 * SIP Digest Authentication.
	 * @augments SIP.
	 * @function Digest Authentication
	 * @param {SIP.UA} ua
	 */
	module.exports = function (Utils) {
	  var DigestAuthentication;

	  DigestAuthentication = function DigestAuthentication(ua) {
	    this.logger = ua.getLogger('sipjs.digestauthentication');
	    this.username = ua.configuration.authorizationUser;
	    this.password = ua.configuration.password;
	    this.cnonce = null;
	    this.nc = 0;
	    this.ncHex = '00000000';
	    this.response = null;
	  };

	  /**
	  * Performs Digest authentication given a SIP request and the challenge
	  * received in a response to that request.
	  * Returns true if credentials were successfully generated, false otherwise.
	  *
	  * @param {SIP.OutgoingRequest} request
	  * @param {Object} challenge
	  */
	  DigestAuthentication.prototype.authenticate = function (request, challenge) {
	    // Inspect and validate the challenge.

	    this.algorithm = challenge.algorithm;
	    this.realm = challenge.realm;
	    this.nonce = challenge.nonce;
	    this.opaque = challenge.opaque;
	    this.stale = challenge.stale;

	    if (this.algorithm) {
	      if (this.algorithm !== 'MD5') {
	        this.logger.warn('challenge with Digest algorithm different than "MD5", authentication aborted');
	        return false;
	      }
	    } else {
	      this.algorithm = 'MD5';
	    }

	    if (!this.realm) {
	      this.logger.warn('challenge without Digest realm, authentication aborted');
	      return false;
	    }

	    if (!this.nonce) {
	      this.logger.warn('challenge without Digest nonce, authentication aborted');
	      return false;
	    }

	    // 'qop' can contain a list of values (Array). Let's choose just one.
	    if (challenge.qop) {
	      if (challenge.qop.indexOf('auth') > -1) {
	        this.qop = 'auth';
	      } else if (challenge.qop.indexOf('auth-int') > -1) {
	        this.qop = 'auth-int';
	      } else {
	        // Otherwise 'qop' is present but does not contain 'auth' or 'auth-int', so abort here.
	        this.logger.warn('challenge without Digest qop different than "auth" or "auth-int", authentication aborted');
	        return false;
	      }
	    } else {
	      this.qop = null;
	    }

	    // Fill other attributes.

	    this.method = request.method;
	    this.uri = request.ruri;
	    this.cnonce = Utils.createRandomToken(12);
	    this.nc += 1;
	    this.updateNcHex();

	    // nc-value = 8LHEX. Max value = 'FFFFFFFF'.
	    if (this.nc === 4294967296) {
	      this.nc = 1;
	      this.ncHex = '00000001';
	    }

	    // Calculate the Digest "response" value.
	    this.calculateResponse();

	    return true;
	  };

	  /**
	  * Generate Digest 'response' value.
	  * @private
	  */
	  DigestAuthentication.prototype.calculateResponse = function () {
	    var ha1, ha2;

	    // HA1 = MD5(A1) = MD5(username:realm:password)
	    ha1 = md5(this.username + ":" + this.realm + ":" + this.password);

	    if (this.qop === 'auth') {
	      // HA2 = MD5(A2) = MD5(method:digestURI)
	      ha2 = md5(this.method + ":" + this.uri);
	      // response = MD5(HA1:nonce:nonceCount:credentialsNonce:qop:HA2)
	      this.response = md5(ha1 + ":" + this.nonce + ":" + this.ncHex + ":" + this.cnonce + ":auth:" + ha2);
	    } else if (this.qop === 'auth-int') {
	      // HA2 = MD5(A2) = MD5(method:digestURI:MD5(entityBody))
	      ha2 = md5(this.method + ":" + this.uri + ":" + md5(this.body ? this.body : ""));
	      // response = MD5(HA1:nonce:nonceCount:credentialsNonce:qop:HA2)
	      this.response = md5(ha1 + ":" + this.nonce + ":" + this.ncHex + ":" + this.cnonce + ":auth-int:" + ha2);
	    } else if (this.qop === null) {
	      // HA2 = MD5(A2) = MD5(method:digestURI)
	      ha2 = md5(this.method + ":" + this.uri);
	      // response = MD5(HA1:nonce:HA2)
	      this.response = md5(ha1 + ":" + this.nonce + ":" + ha2);
	    }
	  };

	  /**
	  * Return the Proxy-Authorization or WWW-Authorization header value.
	  */
	  DigestAuthentication.prototype.toString = function () {
	    var auth_params = [];

	    if (!this.response) {
	      throw new Error('response field does not exist, cannot generate Authorization header');
	    }

	    auth_params.push('algorithm=' + this.algorithm);
	    auth_params.push('username="' + this.username + '"');
	    auth_params.push('realm="' + this.realm + '"');
	    auth_params.push('nonce="' + this.nonce + '"');
	    auth_params.push('uri="' + this.uri + '"');
	    auth_params.push('response="' + this.response + '"');
	    if (this.opaque) {
	      auth_params.push('opaque="' + this.opaque + '"');
	    }
	    if (this.qop) {
	      auth_params.push('qop=' + this.qop);
	      auth_params.push('cnonce="' + this.cnonce + '"');
	      auth_params.push('nc=' + this.ncHex);
	    }

	    return 'Digest ' + auth_params.join(', ');
	  };

	  /**
	  * Generate the 'nc' value as required by Digest in this.ncHex by reading this.nc.
	  * @private
	  */
	  DigestAuthentication.prototype.updateNcHex = function () {
	    var hex = Number(this.nc).toString(16);
	    this.ncHex = '00000000'.substr(0, 8 - hex.length) + hex;
	  };

	  return DigestAuthentication;
	};

	/***/ }),
	/* 34 */
	/***/ (function(module, exports, __webpack_require__) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(__webpack_require__(35));
		}
	}(this, function (CryptoJS) {

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Constants table
		    var T = [];

		    // Compute constants
		    (function () {
		        for (var i = 0; i < 64; i++) {
		            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
		        }
		    }());

		    /**
		     * MD5 hash algorithm.
		     */
		    var MD5 = C_algo.MD5 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0x67452301, 0xefcdab89,
		                0x98badcfe, 0x10325476
		            ]);
		        },

		        _doProcessBlock: function (M, offset) {
		            // Swap endian
		            for (var i = 0; i < 16; i++) {
		                // Shortcuts
		                var offset_i = offset + i;
		                var M_offset_i = M[offset_i];

		                M[offset_i] = (
		                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
		                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
		                );
		            }

		            // Shortcuts
		            var H = this._hash.words;

		            var M_offset_0  = M[offset + 0];
		            var M_offset_1  = M[offset + 1];
		            var M_offset_2  = M[offset + 2];
		            var M_offset_3  = M[offset + 3];
		            var M_offset_4  = M[offset + 4];
		            var M_offset_5  = M[offset + 5];
		            var M_offset_6  = M[offset + 6];
		            var M_offset_7  = M[offset + 7];
		            var M_offset_8  = M[offset + 8];
		            var M_offset_9  = M[offset + 9];
		            var M_offset_10 = M[offset + 10];
		            var M_offset_11 = M[offset + 11];
		            var M_offset_12 = M[offset + 12];
		            var M_offset_13 = M[offset + 13];
		            var M_offset_14 = M[offset + 14];
		            var M_offset_15 = M[offset + 15];

		            // Working varialbes
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];

		            // Computation
		            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
		            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
		            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
		            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
		            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
		            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
		            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
		            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
		            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
		            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
		            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
		            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
		            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
		            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
		            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
		            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

		            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
		            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
		            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
		            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
		            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
		            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
		            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
		            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
		            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
		            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
		            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
		            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
		            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
		            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
		            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
		            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

		            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
		            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
		            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
		            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
		            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
		            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
		            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
		            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
		            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
		            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
		            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
		            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
		            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
		            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
		            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
		            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

		            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
		            d = II(d, a, b, c, M_offset_7,  10, T[49]);
		            c = II(c, d, a, b, M_offset_14, 15, T[50]);
		            b = II(b, c, d, a, M_offset_5,  21, T[51]);
		            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
		            d = II(d, a, b, c, M_offset_3,  10, T[53]);
		            c = II(c, d, a, b, M_offset_10, 15, T[54]);
		            b = II(b, c, d, a, M_offset_1,  21, T[55]);
		            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
		            d = II(d, a, b, c, M_offset_15, 10, T[57]);
		            c = II(c, d, a, b, M_offset_6,  15, T[58]);
		            b = II(b, c, d, a, M_offset_13, 21, T[59]);
		            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
		            d = II(d, a, b, c, M_offset_11, 10, T[61]);
		            c = II(c, d, a, b, M_offset_2,  15, T[62]);
		            b = II(b, c, d, a, M_offset_9,  21, T[63]);

		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

		            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
		            var nBitsTotalL = nBitsTotal;
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
		                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
		            );
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
		                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
		            );

		            data.sigBytes = (dataWords.length + 1) * 4;

		            // Hash final blocks
		            this._process();

		            // Shortcuts
		            var hash = this._hash;
		            var H = hash.words;

		            // Swap endian
		            for (var i = 0; i < 4; i++) {
		                // Shortcut
		                var H_i = H[i];

		                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
		                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		            }

		            // Return final computed hash
		            return hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });

		    function FF(a, b, c, d, x, s, t) {
		        var n = a + ((b & c) | (~b & d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function GG(a, b, c, d, x, s, t) {
		        var n = a + ((b & d) | (c & ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function HH(a, b, c, d, x, s, t) {
		        var n = a + (b ^ c ^ d) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function II(a, b, c, d, x, s, t) {
		        var n = a + (c ^ (b | ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.MD5('message');
		     *     var hash = CryptoJS.MD5(wordArray);
		     */
		    C.MD5 = Hasher._createHelper(MD5);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacMD5(message, key);
		     */
		    C.HmacMD5 = Hasher._createHmacHelper(MD5);
		}(Math));


		return CryptoJS.MD5;

	}));

	/***/ }),
	/* 35 */
	/***/ (function(module, exports, __webpack_require__) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory();
		}
	}(this, function () {

		/**
		 * CryptoJS core components.
		 */
		var CryptoJS = CryptoJS || (function (Math, undefined) {
		    /*
		     * Local polyfil of Object.create
		     */
		    var create = Object.create || (function () {
		        function F() {}
		        return function (obj) {
		            var subtype;

		            F.prototype = obj;

		            subtype = new F();

		            F.prototype = null;

		            return subtype;
		        };
		    }());

		    /**
		     * CryptoJS namespace.
		     */
		    var C = {};

		    /**
		     * Library namespace.
		     */
		    var C_lib = C.lib = {};

		    /**
		     * Base object for prototypal inheritance.
		     */
		    var Base = C_lib.Base = (function () {


		        return {
		            /**
		             * Creates a new object that inherits from this object.
		             *
		             * @param {Object} overrides Properties to copy into the new object.
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         field: 'value',
		             *
		             *         method: function () {
		             *         }
		             *     });
		             */
		            extend: function (overrides) {
		                // Spawn
		                var subtype = create(this);

		                // Augment
		                if (overrides) {
		                    subtype.mixIn(overrides);
		                }

		                // Create default initializer
		                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
		                    subtype.init = function () {
		                        subtype.$super.init.apply(this, arguments);
		                    };
		                }

		                // Initializer's prototype is the subtype object
		                subtype.init.prototype = subtype;

		                // Reference supertype
		                subtype.$super = this;

		                return subtype;
		            },

		            /**
		             * Extends this object and runs the init method.
		             * Arguments to create() will be passed to init().
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var instance = MyType.create();
		             */
		            create: function () {
		                var instance = this.extend();
		                instance.init.apply(instance, arguments);

		                return instance;
		            },

		            /**
		             * Initializes a newly created object.
		             * Override this method to add some logic when your objects are created.
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         init: function () {
		             *             // ...
		             *         }
		             *     });
		             */
		            init: function () {
		            },

		            /**
		             * Copies properties into this object.
		             *
		             * @param {Object} properties The properties to mix in.
		             *
		             * @example
		             *
		             *     MyType.mixIn({
		             *         field: 'value'
		             *     });
		             */
		            mixIn: function (properties) {
		                for (var propertyName in properties) {
		                    if (properties.hasOwnProperty(propertyName)) {
		                        this[propertyName] = properties[propertyName];
		                    }
		                }

		                // IE won't copy toString using the loop above
		                if (properties.hasOwnProperty('toString')) {
		                    this.toString = properties.toString;
		                }
		            },

		            /**
		             * Creates a copy of this object.
		             *
		             * @return {Object} The clone.
		             *
		             * @example
		             *
		             *     var clone = instance.clone();
		             */
		            clone: function () {
		                return this.init.prototype.extend(this);
		            }
		        };
		    }());

		    /**
		     * An array of 32-bit words.
		     *
		     * @property {Array} words The array of 32-bit words.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    var WordArray = C_lib.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of 32-bit words.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.create();
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];

		            if (sigBytes != undefined) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 4;
		            }
		        },

		        /**
		         * Converts this word array to a string.
		         *
		         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
		         *
		         * @return {string} The stringified word array.
		         *
		         * @example
		         *
		         *     var string = wordArray + '';
		         *     var string = wordArray.toString();
		         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
		         */
		        toString: function (encoder) {
		            return (encoder || Hex).stringify(this);
		        },

		        /**
		         * Concatenates a word array to this word array.
		         *
		         * @param {WordArray} wordArray The word array to append.
		         *
		         * @return {WordArray} This word array.
		         *
		         * @example
		         *
		         *     wordArray1.concat(wordArray2);
		         */
		        concat: function (wordArray) {
		            // Shortcuts
		            var thisWords = this.words;
		            var thatWords = wordArray.words;
		            var thisSigBytes = this.sigBytes;
		            var thatSigBytes = wordArray.sigBytes;

		            // Clamp excess bits
		            this.clamp();

		            // Concat
		            if (thisSigBytes % 4) {
		                // Copy one byte at a time
		                for (var i = 0; i < thatSigBytes; i++) {
		                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
		                }
		            } else {
		                // Copy one word at a time
		                for (var i = 0; i < thatSigBytes; i += 4) {
		                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
		                }
		            }
		            this.sigBytes += thatSigBytes;

		            // Chainable
		            return this;
		        },

		        /**
		         * Removes insignificant bits.
		         *
		         * @example
		         *
		         *     wordArray.clamp();
		         */
		        clamp: function () {
		            // Shortcuts
		            var words = this.words;
		            var sigBytes = this.sigBytes;

		            // Clamp
		            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
		            words.length = Math.ceil(sigBytes / 4);
		        },

		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = wordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone.words = this.words.slice(0);

		            return clone;
		        },

		        /**
		         * Creates a word array filled with random bytes.
		         *
		         * @param {number} nBytes The number of random bytes to generate.
		         *
		         * @return {WordArray} The random word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.random(16);
		         */
		        random: function (nBytes) {
		            var words = [];

		            var r = (function (m_w) {
		                var m_w = m_w;
		                var m_z = 0x3ade68b1;
		                var mask = 0xffffffff;

		                return function () {
		                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
		                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
		                    var result = ((m_z << 0x10) + m_w) & mask;
		                    result /= 0x100000000;
		                    result += 0.5;
		                    return result * (Math.random() > .5 ? 1 : -1);
		                }
		            });

		            for (var i = 0, rcache; i < nBytes; i += 4) {
		                var _r = r((rcache || Math.random()) * 0x100000000);

		                rcache = _r() * 0x3ade67b7;
		                words.push((_r() * 0x100000000) | 0);
		            }

		            return new WordArray.init(words, nBytes);
		        }
		    });

		    /**
		     * Encoder namespace.
		     */
		    var C_enc = C.enc = {};

		    /**
		     * Hex encoding strategy.
		     */
		    var Hex = C_enc.Hex = {
		        /**
		         * Converts a word array to a hex string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The hex string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var hexChars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                hexChars.push((bite >>> 4).toString(16));
		                hexChars.push((bite & 0x0f).toString(16));
		            }

		            return hexChars.join('');
		        },

		        /**
		         * Converts a hex string to a word array.
		         *
		         * @param {string} hexStr The hex string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
		         */
		        parse: function (hexStr) {
		            // Shortcut
		            var hexStrLength = hexStr.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < hexStrLength; i += 2) {
		                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
		            }

		            return new WordArray.init(words, hexStrLength / 2);
		        }
		    };

		    /**
		     * Latin1 encoding strategy.
		     */
		    var Latin1 = C_enc.Latin1 = {
		        /**
		         * Converts a word array to a Latin1 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Latin1 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var latin1Chars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                latin1Chars.push(String.fromCharCode(bite));
		            }

		            return latin1Chars.join('');
		        },

		        /**
		         * Converts a Latin1 string to a word array.
		         *
		         * @param {string} latin1Str The Latin1 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
		         */
		        parse: function (latin1Str) {
		            // Shortcut
		            var latin1StrLength = latin1Str.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < latin1StrLength; i++) {
		                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
		            }

		            return new WordArray.init(words, latin1StrLength);
		        }
		    };

		    /**
		     * UTF-8 encoding strategy.
		     */
		    var Utf8 = C_enc.Utf8 = {
		        /**
		         * Converts a word array to a UTF-8 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-8 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            try {
		                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
		            } catch (e) {
		                throw new Error('Malformed UTF-8 data');
		            }
		        },

		        /**
		         * Converts a UTF-8 string to a word array.
		         *
		         * @param {string} utf8Str The UTF-8 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
		         */
		        parse: function (utf8Str) {
		            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
		        }
		    };

		    /**
		     * Abstract buffered block algorithm template.
		     *
		     * The property blockSize must be implemented in a concrete subtype.
		     *
		     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
		     */
		    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
		        /**
		         * Resets this block algorithm's data buffer to its initial state.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm.reset();
		         */
		        reset: function () {
		            // Initial values
		            this._data = new WordArray.init();
		            this._nDataBytes = 0;
		        },

		        /**
		         * Adds new data to this block algorithm's buffer.
		         *
		         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm._append('data');
		         *     bufferedBlockAlgorithm._append(wordArray);
		         */
		        _append: function (data) {
		            // Convert string to WordArray, else assume WordArray already
		            if (typeof data == 'string') {
		                data = Utf8.parse(data);
		            }

		            // Append
		            this._data.concat(data);
		            this._nDataBytes += data.sigBytes;
		        },

		        /**
		         * Processes available data blocks.
		         *
		         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
		         *
		         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
		         *
		         * @return {WordArray} The processed data.
		         *
		         * @example
		         *
		         *     var processedData = bufferedBlockAlgorithm._process();
		         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
		         */
		        _process: function (doFlush) {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            var dataSigBytes = data.sigBytes;
		            var blockSize = this.blockSize;
		            var blockSizeBytes = blockSize * 4;

		            // Count blocks ready
		            var nBlocksReady = dataSigBytes / blockSizeBytes;
		            if (doFlush) {
		                // Round up to include partial blocks
		                nBlocksReady = Math.ceil(nBlocksReady);
		            } else {
		                // Round down to include only full blocks,
		                // less the number of blocks that must remain in the buffer
		                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
		            }

		            // Count words ready
		            var nWordsReady = nBlocksReady * blockSize;

		            // Count bytes ready
		            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

		            // Process blocks
		            if (nWordsReady) {
		                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
		                    // Perform concrete-algorithm logic
		                    this._doProcessBlock(dataWords, offset);
		                }

		                // Remove processed words
		                var processedWords = dataWords.splice(0, nWordsReady);
		                data.sigBytes -= nBytesReady;
		            }

		            // Return processed words
		            return new WordArray.init(processedWords, nBytesReady);
		        },

		        /**
		         * Creates a copy of this object.
		         *
		         * @return {Object} The clone.
		         *
		         * @example
		         *
		         *     var clone = bufferedBlockAlgorithm.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone._data = this._data.clone();

		            return clone;
		        },

		        _minBufferSize: 0
		    });

		    /**
		     * Abstract hasher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
		     */
		    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
		        /**
		         * Configuration options.
		         */
		        cfg: Base.extend(),

		        /**
		         * Initializes a newly created hasher.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
		         *
		         * @example
		         *
		         *     var hasher = CryptoJS.algo.SHA256.create();
		         */
		        init: function (cfg) {
		            // Apply config defaults
		            this.cfg = this.cfg.extend(cfg);

		            // Set initial values
		            this.reset();
		        },

		        /**
		         * Resets this hasher to its initial state.
		         *
		         * @example
		         *
		         *     hasher.reset();
		         */
		        reset: function () {
		            // Reset data buffer
		            BufferedBlockAlgorithm.reset.call(this);

		            // Perform concrete-hasher logic
		            this._doReset();
		        },

		        /**
		         * Updates this hasher with a message.
		         *
		         * @param {WordArray|string} messageUpdate The message to append.
		         *
		         * @return {Hasher} This hasher.
		         *
		         * @example
		         *
		         *     hasher.update('message');
		         *     hasher.update(wordArray);
		         */
		        update: function (messageUpdate) {
		            // Append
		            this._append(messageUpdate);

		            // Update the hash
		            this._process();

		            // Chainable
		            return this;
		        },

		        /**
		         * Finalizes the hash computation.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} messageUpdate (Optional) A final message update.
		         *
		         * @return {WordArray} The hash.
		         *
		         * @example
		         *
		         *     var hash = hasher.finalize();
		         *     var hash = hasher.finalize('message');
		         *     var hash = hasher.finalize(wordArray);
		         */
		        finalize: function (messageUpdate) {
		            // Final message update
		            if (messageUpdate) {
		                this._append(messageUpdate);
		            }

		            // Perform concrete-hasher logic
		            var hash = this._doFinalize();

		            return hash;
		        },

		        blockSize: 512/32,

		        /**
		         * Creates a shortcut function to a hasher's object interface.
		         *
		         * @param {Hasher} hasher The hasher to create a helper for.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
		         */
		        _createHelper: function (hasher) {
		            return function (message, cfg) {
		                return new hasher.init(cfg).finalize(message);
		            };
		        },

		        /**
		         * Creates a shortcut function to the HMAC's object interface.
		         *
		         * @param {Hasher} hasher The hasher to use in this HMAC helper.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
		         */
		        _createHmacHelper: function (hasher) {
		            return function (message, key) {
		                return new C_algo.HMAC.init(hasher, key).finalize(message);
		            };
		        }
		    });

		    /**
		     * Algorithm namespace.
		     */
		    var C_algo = C.algo = {};

		    return C;
		}(Math));


		return CryptoJS;

	}));

	/***/ }),
	/* 36 */
	/***/ (function(module, exports, __webpack_require__) {


	var Grammar = __webpack_require__(37);

	module.exports = function (SIP) {

	  return {
	    parse: function parseCustom(input, startRule) {
	      var options = { startRule: startRule, SIP: SIP };
	      try {
	        Grammar.parse(input, options);
	      } catch (e) {
	        options.data = -1;
	      }
	      return options.data;
	    }
	  };
	};

	/***/ }),
	/* 37 */
	/***/ (function(module, exports, __webpack_require__) {
	/*
	 * Generated by PEG.js 0.10.0.
	 *
	 * http://pegjs.org/
	 */



	function peg$subclass(child, parent) {
	  function ctor() { this.constructor = child; }
	  ctor.prototype = parent.prototype;
	  child.prototype = new ctor();
	}

	function peg$SyntaxError(message, expected, found, location) {
	  this.message  = message;
	  this.expected = expected;
	  this.found    = found;
	  this.location = location;
	  this.name     = "SyntaxError";

	  if (typeof Error.captureStackTrace === "function") {
	    Error.captureStackTrace(this, peg$SyntaxError);
	  }
	}

	peg$subclass(peg$SyntaxError, Error);

	peg$SyntaxError.buildMessage = function(expected, found) {
	  var DESCRIBE_EXPECTATION_FNS = {
	        literal: function(expectation) {
	          return "\"" + literalEscape(expectation.text) + "\"";
	        },

	        "class": function(expectation) {
	          var escapedParts = "",
	              i;

	          for (i = 0; i < expectation.parts.length; i++) {
	            escapedParts += expectation.parts[i] instanceof Array
	              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
	              : classEscape(expectation.parts[i]);
	          }

	          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
	        },

	        any: function(expectation) {
	          return "any character";
	        },

	        end: function(expectation) {
	          return "end of input";
	        },

	        other: function(expectation) {
	          return expectation.description;
	        }
	      };

	  function hex(ch) {
	    return ch.charCodeAt(0).toString(16).toUpperCase();
	  }

	  function literalEscape(s) {
	    return s
	      .replace(/\\/g, '\\\\')
	      .replace(/"/g,  '\\"')
	      .replace(/\0/g, '\\0')
	      .replace(/\t/g, '\\t')
	      .replace(/\n/g, '\\n')
	      .replace(/\r/g, '\\r')
	      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
	      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
	  }

	  function classEscape(s) {
	    return s
	      .replace(/\\/g, '\\\\')
	      .replace(/\]/g, '\\]')
	      .replace(/\^/g, '\\^')
	      .replace(/-/g,  '\\-')
	      .replace(/\0/g, '\\0')
	      .replace(/\t/g, '\\t')
	      .replace(/\n/g, '\\n')
	      .replace(/\r/g, '\\r')
	      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
	      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
	  }

	  function describeExpectation(expectation) {
	    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
	  }

	  function describeExpected(expected) {
	    var descriptions = new Array(expected.length),
	        i, j;

	    for (i = 0; i < expected.length; i++) {
	      descriptions[i] = describeExpectation(expected[i]);
	    }

	    descriptions.sort();

	    if (descriptions.length > 0) {
	      for (i = 1, j = 1; i < descriptions.length; i++) {
	        if (descriptions[i - 1] !== descriptions[i]) {
	          descriptions[j] = descriptions[i];
	          j++;
	        }
	      }
	      descriptions.length = j;
	    }

	    switch (descriptions.length) {
	      case 1:
	        return descriptions[0];

	      case 2:
	        return descriptions[0] + " or " + descriptions[1];

	      default:
	        return descriptions.slice(0, -1).join(", ")
	          + ", or "
	          + descriptions[descriptions.length - 1];
	    }
	  }

	  function describeFound(found) {
	    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
	  }

	  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
	};

	function peg$parse(input, options) {
	  options = options !== void 0 ? options : {};

	  var peg$FAILED = {},

	      peg$startRuleIndices = { Contact: 119, Name_Addr_Header: 156, Record_Route: 176, Request_Response: 81, SIP_URI: 45, Subscription_State: 186, Supported: 191, Require: 182, Via: 194, absoluteURI: 84, Call_ID: 118, Content_Disposition: 130, Content_Length: 135, Content_Type: 136, CSeq: 146, displayName: 122, Event: 149, From: 151, host: 52, Max_Forwards: 154, Min_SE: 213, Proxy_Authenticate: 157, quoted_string: 40, Refer_To: 178, Replaces: 179, Session_Expires: 210, stun_URI: 217, To: 192, turn_URI: 223, uuid: 226, WWW_Authenticate: 209, challenge: 158, sipfrag: 230, Referred_By: 231 },
	      peg$startRuleIndex   = 119,

	      peg$consts = [
	        "\r\n",
	        peg$literalExpectation("\r\n", false),
	        /^[0-9]/,
	        peg$classExpectation([["0", "9"]], false, false),
	        /^[a-zA-Z]/,
	        peg$classExpectation([["a", "z"], ["A", "Z"]], false, false),
	        /^[0-9a-fA-F]/,
	        peg$classExpectation([["0", "9"], ["a", "f"], ["A", "F"]], false, false),
	        /^[\0-\xFF]/,
	        peg$classExpectation([["\0", "\xFF"]], false, false),
	        /^["]/,
	        peg$classExpectation(["\""], false, false),
	        " ",
	        peg$literalExpectation(" ", false),
	        "\t",
	        peg$literalExpectation("\t", false),
	        /^[a-zA-Z0-9]/,
	        peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"]], false, false),
	        ";",
	        peg$literalExpectation(";", false),
	        "/",
	        peg$literalExpectation("/", false),
	        "?",
	        peg$literalExpectation("?", false),
	        ":",
	        peg$literalExpectation(":", false),
	        "@",
	        peg$literalExpectation("@", false),
	        "&",
	        peg$literalExpectation("&", false),
	        "=",
	        peg$literalExpectation("=", false),
	        "+",
	        peg$literalExpectation("+", false),
	        "$",
	        peg$literalExpectation("$", false),
	        ",",
	        peg$literalExpectation(",", false),
	        "-",
	        peg$literalExpectation("-", false),
	        "_",
	        peg$literalExpectation("_", false),
	        ".",
	        peg$literalExpectation(".", false),
	        "!",
	        peg$literalExpectation("!", false),
	        "~",
	        peg$literalExpectation("~", false),
	        "*",
	        peg$literalExpectation("*", false),
	        "'",
	        peg$literalExpectation("'", false),
	        "(",
	        peg$literalExpectation("(", false),
	        ")",
	        peg$literalExpectation(")", false),
	        "%",
	        peg$literalExpectation("%", false),
	        function() {return " "; },
	        function() {return ':'; },
	        /^[!-~]/,
	        peg$classExpectation([["!", "~"]], false, false),
	        /^[\x80-\uFFFF]/,
	        peg$classExpectation([["\x80", "\uFFFF"]], false, false),
	        /^[\x80-\xBF]/,
	        peg$classExpectation([["\x80", "\xBF"]], false, false),
	        /^[a-f]/,
	        peg$classExpectation([["a", "f"]], false, false),
	        "`",
	        peg$literalExpectation("`", false),
	        "<",
	        peg$literalExpectation("<", false),
	        ">",
	        peg$literalExpectation(">", false),
	        "\\",
	        peg$literalExpectation("\\", false),
	        "[",
	        peg$literalExpectation("[", false),
	        "]",
	        peg$literalExpectation("]", false),
	        "{",
	        peg$literalExpectation("{", false),
	        "}",
	        peg$literalExpectation("}", false),
	        function() {return "*"; },
	        function() {return "/"; },
	        function() {return "="; },
	        function() {return "("; },
	        function() {return ")"; },
	        function() {return ">"; },
	        function() {return "<"; },
	        function() {return ","; },
	        function() {return ";"; },
	        function() {return ":"; },
	        function() {return "\""; },
	        /^[!-']/,
	        peg$classExpectation([["!", "'"]], false, false),
	        /^[*-[]/,
	        peg$classExpectation([["*", "["]], false, false),
	        /^[\]-~]/,
	        peg$classExpectation([["]", "~"]], false, false),
	        function(contents) {
	                                return contents; },
	        /^[#-[]/,
	        peg$classExpectation([["#", "["]], false, false),
	        /^[\0-\t]/,
	        peg$classExpectation([["\0", "\t"]], false, false),
	        /^[\x0B-\f]/,
	        peg$classExpectation([["\x0B", "\f"]], false, false),
	        /^[\x0E-\x7F]/,
	        peg$classExpectation([["\x0E", "\x7F"]], false, false),
	        function() {
	                                options.data.uri = new options.SIP.URI(options.data.scheme, options.data.user, options.data.host, options.data.port);
	                                delete options.data.scheme;
	                                delete options.data.user;
	                                delete options.data.host;
	                                delete options.data.host_type;
	                                delete options.data.port;
	                              },
	        function() {
	                                options.data.uri = new options.SIP.URI(options.data.scheme, options.data.user, options.data.host, options.data.port, options.data.uri_params, options.data.uri_headers);
	                                delete options.data.scheme;
	                                delete options.data.user;
	                                delete options.data.host;
	                                delete options.data.host_type;
	                                delete options.data.port;
	                                delete options.data.uri_params;

	                                if (options.startRule === 'SIP_URI') { options.data = options.data.uri;}
	                              },
	        "sips",
	        peg$literalExpectation("sips", true),
	        "sip",
	        peg$literalExpectation("sip", true),
	        function(uri_scheme) {
	                            options.data.scheme = uri_scheme; },
	        function() {
	                            options.data.user = decodeURIComponent(text().slice(0, -1));},
	        function() {
	                            options.data.password = text(); },
	        function() {
	                            options.data.host = text();
	                            return options.data.host; },
	        function() {
	                          options.data.host_type = 'domain';
	                          return text(); },
	        /^[a-zA-Z0-9_\-]/,
	        peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "_", "-"], false, false),
	        /^[a-zA-Z0-9\-]/,
	        peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "-"], false, false),
	        function() {
	                            options.data.host_type = 'IPv6';
	                            return text(); },
	        "::",
	        peg$literalExpectation("::", false),
	        function() {
	                          options.data.host_type = 'IPv6';
	                          return text(); },
	        function() {
	                            options.data.host_type = 'IPv4';
	                            return text(); },
	        "25",
	        peg$literalExpectation("25", false),
	        /^[0-5]/,
	        peg$classExpectation([["0", "5"]], false, false),
	        "2",
	        peg$literalExpectation("2", false),
	        /^[0-4]/,
	        peg$classExpectation([["0", "4"]], false, false),
	        "1",
	        peg$literalExpectation("1", false),
	        /^[1-9]/,
	        peg$classExpectation([["1", "9"]], false, false),
	        function(port) {
	                            port = parseInt(port.join(''));
	                            options.data.port = port;
	                            return port; },
	        "transport=",
	        peg$literalExpectation("transport=", true),
	        "udp",
	        peg$literalExpectation("udp", true),
	        "tcp",
	        peg$literalExpectation("tcp", true),
	        "sctp",
	        peg$literalExpectation("sctp", true),
	        "tls",
	        peg$literalExpectation("tls", true),
	        function(transport) {
	                              if(!options.data.uri_params) options.data.uri_params={};
	                              options.data.uri_params['transport'] = transport.toLowerCase(); },
	        "user=",
	        peg$literalExpectation("user=", true),
	        "phone",
	        peg$literalExpectation("phone", true),
	        "ip",
	        peg$literalExpectation("ip", true),
	        function(user) {
	                              if(!options.data.uri_params) options.data.uri_params={};
	                              options.data.uri_params['user'] = user.toLowerCase(); },
	        "method=",
	        peg$literalExpectation("method=", true),
	        function(method) {
	                              if(!options.data.uri_params) options.data.uri_params={};
	                              options.data.uri_params['method'] = method; },
	        "ttl=",
	        peg$literalExpectation("ttl=", true),
	        function(ttl) {
	                              if(!options.data.params) options.data.params={};
	                              options.data.params['ttl'] = ttl; },
	        "maddr=",
	        peg$literalExpectation("maddr=", true),
	        function(maddr) {
	                              if(!options.data.uri_params) options.data.uri_params={};
	                              options.data.uri_params['maddr'] = maddr; },
	        "lr",
	        peg$literalExpectation("lr", true),
	        function() {
	                              if(!options.data.uri_params) options.data.uri_params={};
	                              options.data.uri_params['lr'] = undefined; },
	        function(param, value) {
	                              if(!options.data.uri_params) options.data.uri_params = {};
	                              if (value === null){
	                                value = undefined;
	                              }
	                              else {
	                                value = value[1];
	                              }
	                              options.data.uri_params[param.toLowerCase()] = value && value.toLowerCase();},
	        function(hname, hvalue) {
	                              hname = hname.join('').toLowerCase();
	                              hvalue = hvalue.join('');
	                              if(!options.data.uri_headers) options.data.uri_headers = {};
	                              if (!options.data.uri_headers[hname]) {
	                                options.data.uri_headers[hname] = [hvalue];
	                              } else {
	                                options.data.uri_headers[hname].push(hvalue);
	                              }},
	        function() {
	                              // lots of tests fail if this isn't guarded...
	                              if (options.startRule === 'Refer_To') {
	                                options.data.uri = new options.SIP.URI(options.data.scheme, options.data.user, options.data.host, options.data.port, options.data.uri_params, options.data.uri_headers);
	                                delete options.data.scheme;
	                                delete options.data.user;
	                                delete options.data.host;
	                                delete options.data.host_type;
	                                delete options.data.port;
	                                delete options.data.uri_params;
	                              }
	                            },
	        "//",
	        peg$literalExpectation("//", false),
	        function() {
	                            options.data.scheme= text(); },
	        peg$literalExpectation("SIP", true),
	        function() {
	                            options.data.sip_version = text(); },
	        "INVITE",
	        peg$literalExpectation("INVITE", false),
	        "ACK",
	        peg$literalExpectation("ACK", false),
	        "VXACH",
	        peg$literalExpectation("VXACH", false),
	        "OPTIONS",
	        peg$literalExpectation("OPTIONS", false),
	        "BYE",
	        peg$literalExpectation("BYE", false),
	        "CANCEL",
	        peg$literalExpectation("CANCEL", false),
	        "REGISTER",
	        peg$literalExpectation("REGISTER", false),
	        "SUBSCRIBE",
	        peg$literalExpectation("SUBSCRIBE", false),
	        "NOTIFY",
	        peg$literalExpectation("NOTIFY", false),
	        "REFER",
	        peg$literalExpectation("REFER", false),
	        "PUBLISH",
	        peg$literalExpectation("PUBLISH", false),
	        function() {

	                            options.data.method = text();
	                            return options.data.method; },
	        function(status_code) {
	                          options.data.status_code = parseInt(status_code.join('')); },
	        function() {
	                          options.data.reason_phrase = text(); },
	        function() {
	                      options.data = text(); },
	        function() {
	                                var idx, length;
	                                length = options.data.multi_header.length;
	                                for (idx = 0; idx < length; idx++) {
	                                  if (options.data.multi_header[idx].parsed === null) {
	                                    options.data = null;
	                                    break;
	                                  }
	                                }
	                                if (options.data !== null) {
	                                  options.data = options.data.multi_header;
	                                } else {
	                                  options.data = -1;
	                                }},
	        function() {
	                                var header;
	                                if(!options.data.multi_header) options.data.multi_header = [];
	                                try {
	                                  header = new options.SIP.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
	                                  delete options.data.uri;
	                                  delete options.data.displayName;
	                                  delete options.data.params;
	                                } catch(e) {
	                                  header = null;
	                                }
	                                options.data.multi_header.push( { 'position': peg$currPos,
	                                                          'offset': location().start.offset,
	                                                          'parsed': header
	                                                        });},
	        function(displayName) {
	                                displayName = text().trim();
	                                if (displayName[0] === '\"') {
	                                  displayName = displayName.substring(1, displayName.length-1);
	                                }
	                                options.data.displayName = displayName; },
	        "q",
	        peg$literalExpectation("q", true),
	        function(q) {
	                                if(!options.data.params) options.data.params = {};
	                                options.data.params['q'] = q; },
	        "expires",
	        peg$literalExpectation("expires", true),
	        function(expires) {
	                                if(!options.data.params) options.data.params = {};
	                                options.data.params['expires'] = expires; },
	        function(delta_seconds) {
	                                return parseInt(delta_seconds.join('')); },
	        "0",
	        peg$literalExpectation("0", false),
	        function() {
	                                return parseFloat(text()); },
	        function(param, value) {
	                                if(!options.data.params) options.data.params = {};
	                                if (value === null){
	                                  value = undefined;
	                                }
	                                else {
	                                  value = value[1];
	                                }
	                                options.data.params[param.toLowerCase()] = value;},
	        "render",
	        peg$literalExpectation("render", true),
	        "session",
	        peg$literalExpectation("session", true),
	        "icon",
	        peg$literalExpectation("icon", true),
	        "alert",
	        peg$literalExpectation("alert", true),
	        function() {
	                                    if (options.startRule === 'Content_Disposition') {
	                                      options.data.type = text().toLowerCase();
	                                    }
	                                  },
	        "handling",
	        peg$literalExpectation("handling", true),
	        "optional",
	        peg$literalExpectation("optional", true),
	        "required",
	        peg$literalExpectation("required", true),
	        function(length) {
	                                options.data = parseInt(length.join('')); },
	        function() {
	                                options.data = text(); },
	        "text",
	        peg$literalExpectation("text", true),
	        "image",
	        peg$literalExpectation("image", true),
	        "audio",
	        peg$literalExpectation("audio", true),
	        "video",
	        peg$literalExpectation("video", true),
	        "application",
	        peg$literalExpectation("application", true),
	        "message",
	        peg$literalExpectation("message", true),
	        "multipart",
	        peg$literalExpectation("multipart", true),
	        "x-",
	        peg$literalExpectation("x-", true),
	        function(cseq_value) {
	                          options.data.value=parseInt(cseq_value.join('')); },
	        function(expires) {options.data = expires; },
	        function(event_type) {
	                               options.data.event = event_type.toLowerCase(); },
	        function() {
	                        var tag = options.data.tag;
	                          options.data = new options.SIP.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
	                          if (tag) {options.data.setParam('tag',tag);}
	                        },
	        "tag",
	        peg$literalExpectation("tag", true),
	        function(tag) {options.data.tag = tag; },
	        function(forwards) {
	                          options.data = parseInt(forwards.join('')); },
	        function(min_expires) {options.data = min_expires; },
	        function() {
	                                options.data = new options.SIP.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
	                              },
	        "digest",
	        peg$literalExpectation("Digest", true),
	        "realm",
	        peg$literalExpectation("realm", true),
	        function(realm) { options.data.realm = realm; },
	        "domain",
	        peg$literalExpectation("domain", true),
	        "nonce",
	        peg$literalExpectation("nonce", true),
	        function(nonce) { options.data.nonce=nonce; },
	        "opaque",
	        peg$literalExpectation("opaque", true),
	        function(opaque) { options.data.opaque=opaque; },
	        "stale",
	        peg$literalExpectation("stale", true),
	        "true",
	        peg$literalExpectation("true", true),
	        function() { options.data.stale=true; },
	        "false",
	        peg$literalExpectation("false", true),
	        function() { options.data.stale=false; },
	        "algorithm",
	        peg$literalExpectation("algorithm", true),
	        "md5",
	        peg$literalExpectation("MD5", true),
	        "md5-sess",
	        peg$literalExpectation("MD5-sess", true),
	        function(algorithm) {
	                              options.data.algorithm=algorithm.toUpperCase(); },
	        "qop",
	        peg$literalExpectation("qop", true),
	        "auth-int",
	        peg$literalExpectation("auth-int", true),
	        "auth",
	        peg$literalExpectation("auth", true),
	        function(qop_value) {
	                                options.data.qop || (options.data.qop=[]);
	                                options.data.qop.push(qop_value.toLowerCase()); },
	        function(rack_value) {
	                          options.data.value=parseInt(rack_value.join('')); },
	        function() {
	                          var idx, length;
	                          length = options.data.multi_header.length;
	                          for (idx = 0; idx < length; idx++) {
	                            if (options.data.multi_header[idx].parsed === null) {
	                              options.data = null;
	                              break;
	                            }
	                          }
	                          if (options.data !== null) {
	                            options.data = options.data.multi_header;
	                          } else {
	                            options.data = -1;
	                          }},
	        function() {
	                          var header;
	                          if(!options.data.multi_header) options.data.multi_header = [];
	                          try {
	                            header = new options.SIP.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
	                            delete options.data.uri;
	                            delete options.data.displayName;
	                            delete options.data.params;
	                          } catch(e) {
	                            header = null;
	                          }
	                          options.data.multi_header.push( { 'position': peg$currPos,
	                                                    'offset': location().start.offset,
	                                                    'parsed': header
	                                                  });},
	        function() {
	                      options.data = new options.SIP.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
	                    },
	        function() {
	                              if (!(options.data.replaces_from_tag && options.data.replaces_to_tag)) {
	                                options.data = -1;
	                              }
	                            },
	        function() {
	                              options.data = {
	                                call_id: options.data
	                              };
	                            },
	        "from-tag",
	        peg$literalExpectation("from-tag", true),
	        function(from_tag) {
	                              options.data.replaces_from_tag = from_tag;
	                            },
	        "to-tag",
	        peg$literalExpectation("to-tag", true),
	        function(to_tag) {
	                              options.data.replaces_to_tag = to_tag;
	                            },
	        "early-only",
	        peg$literalExpectation("early-only", true),
	        function() {
	                              options.data.early_only = true;
	                            },
	        function(head, r) {return r;},
	        function(head, tail) { return list(head, tail); },
	        function(value) {
	                        if (options.startRule === 'Require') {
	                          options.data = value || [];
	                        }
	                      },
	        function(rseq_value) {
	                          options.data.value=parseInt(rseq_value.join('')); },
	        "active",
	        peg$literalExpectation("active", true),
	        "pending",
	        peg$literalExpectation("pending", true),
	        "terminated",
	        peg$literalExpectation("terminated", true),
	        function() {
	                                options.data.state = text(); },
	        "reason",
	        peg$literalExpectation("reason", true),
	        function(reason) {
	                                if (typeof reason !== 'undefined') options.data.reason = reason; },
	        function(expires) {
	                                if (typeof expires !== 'undefined') options.data.expires = expires; },
	        "retry_after",
	        peg$literalExpectation("retry_after", true),
	        function(retry_after) {
	                                if (typeof retry_after !== 'undefined') options.data.retry_after = retry_after; },
	        "deactivated",
	        peg$literalExpectation("deactivated", true),
	        "probation",
	        peg$literalExpectation("probation", true),
	        "rejected",
	        peg$literalExpectation("rejected", true),
	        "timeout",
	        peg$literalExpectation("timeout", true),
	        "giveup",
	        peg$literalExpectation("giveup", true),
	        "noresource",
	        peg$literalExpectation("noresource", true),
	        "invariant",
	        peg$literalExpectation("invariant", true),
	        function(value) {
	                        if (options.startRule === 'Supported') {
	                          options.data = value || [];
	                        }
	                      },
	        function() {
	                      var tag = options.data.tag;
	                        options.data = new options.SIP.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
	                        if (tag) {options.data.setParam('tag',tag);}
	                      },
	        "ttl",
	        peg$literalExpectation("ttl", true),
	        function(via_ttl_value) {
	                              options.data.ttl = via_ttl_value; },
	        "maddr",
	        peg$literalExpectation("maddr", true),
	        function(via_maddr) {
	                              options.data.maddr = via_maddr; },
	        "received",
	        peg$literalExpectation("received", true),
	        function(via_received) {
	                              options.data.received = via_received; },
	        "branch",
	        peg$literalExpectation("branch", true),
	        function(via_branch) {
	                              options.data.branch = via_branch; },
	        "rport",
	        peg$literalExpectation("rport", true),
	        function() {
	                              if(typeof response_port !== 'undefined')
	                                options.data.rport = response_port.join(''); },
	        function(via_protocol) {
	                              options.data.protocol = via_protocol; },
	        peg$literalExpectation("UDP", true),
	        peg$literalExpectation("TCP", true),
	        peg$literalExpectation("TLS", true),
	        peg$literalExpectation("SCTP", true),
	        function(via_transport) {
	                              options.data.transport = via_transport; },
	        function() {
	                              options.data.host = text(); },
	        function(via_sent_by_port) {
	                              options.data.port = parseInt(via_sent_by_port.join('')); },
	        function(ttl) {
	                              return parseInt(ttl.join('')); },
	        function(deltaSeconds) {
	                              if (options.startRule === 'Session_Expires') {
	                                options.data.deltaSeconds = deltaSeconds;
	                              }
	                            },
	        "refresher",
	        peg$literalExpectation("refresher", false),
	        "uas",
	        peg$literalExpectation("uas", false),
	        "uac",
	        peg$literalExpectation("uac", false),
	        function(endpoint) {
	                              if (options.startRule === 'Session_Expires') {
	                                options.data.refresher = endpoint;
	                              }
	                            },
	        function(deltaSeconds) {
	                              if (options.startRule === 'Min_SE') {
	                                options.data = deltaSeconds;
	                              }
	                            },
	        "stuns",
	        peg$literalExpectation("stuns", true),
	        "stun",
	        peg$literalExpectation("stun", true),
	        function(scheme) {
	                              options.data.scheme = scheme; },
	        function(host) {
	                              options.data.host = host; },
	        "?transport=",
	        peg$literalExpectation("?transport=", false),
	        "turns",
	        peg$literalExpectation("turns", true),
	        "turn",
	        peg$literalExpectation("turn", true),
	        function() {
	                              options.data.transport = transport; },
	        function() {
	                          options.data = text(); },
	        "Referred-By",
	        peg$literalExpectation("Referred-By", false),
	        "b",
	        peg$literalExpectation("b", false),
	        "cid",
	        peg$literalExpectation("cid", false)
	      ],

	      peg$bytecode = [
	        peg$decode("2 \"\"6 7!"),
	        peg$decode("4\"\"\"5!7#"),
	        peg$decode("4$\"\"5!7%"),
	        peg$decode("4&\"\"5!7'"),
	        peg$decode(";'.# &;("),
	        peg$decode("4(\"\"5!7)"),
	        peg$decode("4*\"\"5!7+"),
	        peg$decode("2,\"\"6,7-"),
	        peg$decode("2.\"\"6.7/"),
	        peg$decode("40\"\"5!71"),
	        peg$decode("22\"\"6273.\x89 &24\"\"6475.} &26\"\"6677.q &28\"\"6879.e &2:\"\"6:7;.Y &2<\"\"6<7=.M &2>\"\"6>7?.A &2@\"\"6@7A.5 &2B\"\"6B7C.) &2D\"\"6D7E"),
	        peg$decode(";).# &;,"),
	        peg$decode("2F\"\"6F7G.} &2H\"\"6H7I.q &2J\"\"6J7K.e &2L\"\"6L7M.Y &2N\"\"6N7O.M &2P\"\"6P7Q.A &2R\"\"6R7S.5 &2T\"\"6T7U.) &2V\"\"6V7W"),
	        peg$decode("%%2X\"\"6X7Y/5#;#/,$;#/#$+#)(#'#(\"'#&'#/\"!&,)"),
	        peg$decode("%%$;$0#*;$&/,#; /#$+\")(\"'#&'#.\" &\"/=#$;$/&#0#*;$&&&#/'$8\":Z\" )(\"'#&'#"),
	        peg$decode(";..\" &\""),
	        peg$decode("%$;'.# &;(0)*;'.# &;(&/?#28\"\"6879/0$;//'$8#:[# )(#'#(\"'#&'#"),
	        peg$decode("%%$;2/&#0#*;2&&&#/g#$%$;.0#*;.&/,#;2/#$+\")(\"'#&'#0=*%$;.0#*;.&/,#;2/#$+\")(\"'#&'#&/#$+\")(\"'#&'#/\"!&,)"),
	        peg$decode("4\\\"\"5!7].# &;3"),
	        peg$decode("4^\"\"5!7_"),
	        peg$decode("4`\"\"5!7a"),
	        peg$decode(";!.) &4b\"\"5!7c"),
	        peg$decode("%$;).\x95 &2F\"\"6F7G.\x89 &2J\"\"6J7K.} &2L\"\"6L7M.q &2X\"\"6X7Y.e &2P\"\"6P7Q.Y &2H\"\"6H7I.M &2@\"\"6@7A.A &2d\"\"6d7e.5 &2R\"\"6R7S.) &2N\"\"6N7O/\x9E#0\x9B*;).\x95 &2F\"\"6F7G.\x89 &2J\"\"6J7K.} &2L\"\"6L7M.q &2X\"\"6X7Y.e &2P\"\"6P7Q.Y &2H\"\"6H7I.M &2@\"\"6@7A.A &2d\"\"6d7e.5 &2R\"\"6R7S.) &2N\"\"6N7O&&&#/\"!&,)"),
	        peg$decode("%$;).\x89 &2F\"\"6F7G.} &2L\"\"6L7M.q &2X\"\"6X7Y.e &2P\"\"6P7Q.Y &2H\"\"6H7I.M &2@\"\"6@7A.A &2d\"\"6d7e.5 &2R\"\"6R7S.) &2N\"\"6N7O/\x92#0\x8F*;).\x89 &2F\"\"6F7G.} &2L\"\"6L7M.q &2X\"\"6X7Y.e &2P\"\"6P7Q.Y &2H\"\"6H7I.M &2@\"\"6@7A.A &2d\"\"6d7e.5 &2R\"\"6R7S.) &2N\"\"6N7O&&&#/\"!&,)"),
	        peg$decode("2T\"\"6T7U.\xE3 &2V\"\"6V7W.\xD7 &2f\"\"6f7g.\xCB &2h\"\"6h7i.\xBF &2:\"\"6:7;.\xB3 &2D\"\"6D7E.\xA7 &22\"\"6273.\x9B &28\"\"6879.\x8F &2j\"\"6j7k.\x83 &;&.} &24\"\"6475.q &2l\"\"6l7m.e &2n\"\"6n7o.Y &26\"\"6677.M &2>\"\"6>7?.A &2p\"\"6p7q.5 &2r\"\"6r7s.) &;'.# &;("),
	        peg$decode("%$;).\u012B &2F\"\"6F7G.\u011F &2J\"\"6J7K.\u0113 &2L\"\"6L7M.\u0107 &2X\"\"6X7Y.\xFB &2P\"\"6P7Q.\xEF &2H\"\"6H7I.\xE3 &2@\"\"6@7A.\xD7 &2d\"\"6d7e.\xCB &2R\"\"6R7S.\xBF &2N\"\"6N7O.\xB3 &2T\"\"6T7U.\xA7 &2V\"\"6V7W.\x9B &2f\"\"6f7g.\x8F &2h\"\"6h7i.\x83 &28\"\"6879.w &2j\"\"6j7k.k &;&.e &24\"\"6475.Y &2l\"\"6l7m.M &2n\"\"6n7o.A &26\"\"6677.5 &2p\"\"6p7q.) &2r\"\"6r7s/\u0134#0\u0131*;).\u012B &2F\"\"6F7G.\u011F &2J\"\"6J7K.\u0113 &2L\"\"6L7M.\u0107 &2X\"\"6X7Y.\xFB &2P\"\"6P7Q.\xEF &2H\"\"6H7I.\xE3 &2@\"\"6@7A.\xD7 &2d\"\"6d7e.\xCB &2R\"\"6R7S.\xBF &2N\"\"6N7O.\xB3 &2T\"\"6T7U.\xA7 &2V\"\"6V7W.\x9B &2f\"\"6f7g.\x8F &2h\"\"6h7i.\x83 &28\"\"6879.w &2j\"\"6j7k.k &;&.e &24\"\"6475.Y &2l\"\"6l7m.M &2n\"\"6n7o.A &26\"\"6677.5 &2p\"\"6p7q.) &2r\"\"6r7s&&&#/\"!&,)"),
	        peg$decode("%;//?#2P\"\"6P7Q/0$;//'$8#:t# )(#'#(\"'#&'#"),
	        peg$decode("%;//?#24\"\"6475/0$;//'$8#:u# )(#'#(\"'#&'#"),
	        peg$decode("%;//?#2>\"\"6>7?/0$;//'$8#:v# )(#'#(\"'#&'#"),
	        peg$decode("%;//?#2T\"\"6T7U/0$;//'$8#:w# )(#'#(\"'#&'#"),
	        peg$decode("%;//?#2V\"\"6V7W/0$;//'$8#:x# )(#'#(\"'#&'#"),
	        peg$decode("%2h\"\"6h7i/0#;//'$8\":y\" )(\"'#&'#"),
	        peg$decode("%;//6#2f\"\"6f7g/'$8\":z\" )(\"'#&'#"),
	        peg$decode("%;//?#2D\"\"6D7E/0$;//'$8#:{# )(#'#(\"'#&'#"),
	        peg$decode("%;//?#22\"\"6273/0$;//'$8#:|# )(#'#(\"'#&'#"),
	        peg$decode("%;//?#28\"\"6879/0$;//'$8#:}# )(#'#(\"'#&'#"),
	        peg$decode("%;//0#;&/'$8\":~\" )(\"'#&'#"),
	        peg$decode("%;&/0#;//'$8\":~\" )(\"'#&'#"),
	        peg$decode("%;=/T#$;G.) &;K.# &;F0/*;G.) &;K.# &;F&/,$;>/#$+#)(#'#(\"'#&'#"),
	        peg$decode("4\x7F\"\"5!7\x80.A &4\x81\"\"5!7\x82.5 &4\x83\"\"5!7\x84.) &;3.# &;."),
	        peg$decode("%%;//Q#;&/H$$;J.# &;K0)*;J.# &;K&/,$;&/#$+$)($'#(#'#(\"'#&'#/\"!&,)"),
	        peg$decode("%;//]#;&/T$%$;J.# &;K0)*;J.# &;K&/\"!&,)/1$;&/($8$:\x85$!!)($'#(#'#(\"'#&'#"),
	        peg$decode(";..G &2L\"\"6L7M.; &4\x86\"\"5!7\x87./ &4\x83\"\"5!7\x84.# &;3"),
	        peg$decode("%2j\"\"6j7k/J#4\x88\"\"5!7\x89.5 &4\x8A\"\"5!7\x8B.) &4\x8C\"\"5!7\x8D/#$+\")(\"'#&'#"),
	        peg$decode("%;N/M#28\"\"6879/>$;O.\" &\"/0$;S/'$8$:\x8E$ )($'#(#'#(\"'#&'#"),
	        peg$decode("%;N/d#28\"\"6879/U$;O.\" &\"/G$;S/>$;_/5$;l.\" &\"/'$8&:\x8F& )(&'#(%'#($'#(#'#(\"'#&'#"),
	        peg$decode("%3\x90\"\"5$7\x91.) &3\x92\"\"5#7\x93/' 8!:\x94!! )"),
	        peg$decode("%;P/]#%28\"\"6879/,#;R/#$+\")(\"'#&'#.\" &\"/6$2:\"\"6:7;/'$8#:\x95# )(#'#(\"'#&'#"),
	        peg$decode("$;+.) &;-.# &;Q/2#0/*;+.) &;-.# &;Q&&&#"),
	        peg$decode("2<\"\"6<7=.q &2>\"\"6>7?.e &2@\"\"6@7A.Y &2B\"\"6B7C.M &2D\"\"6D7E.A &22\"\"6273.5 &26\"\"6677.) &24\"\"6475"),
	        peg$decode("%$;+._ &;-.Y &2<\"\"6<7=.M &2>\"\"6>7?.A &2@\"\"6@7A.5 &2B\"\"6B7C.) &2D\"\"6D7E0e*;+._ &;-.Y &2<\"\"6<7=.M &2>\"\"6>7?.A &2@\"\"6@7A.5 &2B\"\"6B7C.) &2D\"\"6D7E&/& 8!:\x96! )"),
	        peg$decode("%;T/J#%28\"\"6879/,#;^/#$+\")(\"'#&'#.\" &\"/#$+\")(\"'#&'#"),
	        peg$decode("%;U.) &;\\.# &;X/& 8!:\x97! )"),
	        peg$decode("%$%;V/2#2J\"\"6J7K/#$+\")(\"'#&'#0<*%;V/2#2J\"\"6J7K/#$+\")(\"'#&'#&/D#;W/;$2J\"\"6J7K.\" &\"/'$8#:\x98# )(#'#(\"'#&'#"),
	        peg$decode("$4\x99\"\"5!7\x9A/,#0)*4\x99\"\"5!7\x9A&&&#"),
	        peg$decode("%4$\"\"5!7%/?#$4\x9B\"\"5!7\x9C0)*4\x9B\"\"5!7\x9C&/#$+\")(\"'#&'#"),
	        peg$decode("%2l\"\"6l7m/?#;Y/6$2n\"\"6n7o/'$8#:\x9D# )(#'#(\"'#&'#"),
	        peg$decode("%%;Z/\xB3#28\"\"6879/\xA4$;Z/\x9B$28\"\"6879/\x8C$;Z/\x83$28\"\"6879/t$;Z/k$28\"\"6879/\\$;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$+-)(-'#(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u0790 &%2\x9E\"\"6\x9E7\x9F/\xA4#;Z/\x9B$28\"\"6879/\x8C$;Z/\x83$28\"\"6879/t$;Z/k$28\"\"6879/\\$;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$+,)(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u06F9 &%2\x9E\"\"6\x9E7\x9F/\x8C#;Z/\x83$28\"\"6879/t$;Z/k$28\"\"6879/\\$;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$+*)(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u067A &%2\x9E\"\"6\x9E7\x9F/t#;Z/k$28\"\"6879/\\$;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$+()(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u0613 &%2\x9E\"\"6\x9E7\x9F/\\#;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$+&)(&'#(%'#($'#(#'#(\"'#&'#.\u05C4 &%2\x9E\"\"6\x9E7\x9F/D#;Z/;$28\"\"6879/,$;[/#$+$)($'#(#'#(\"'#&'#.\u058D &%2\x9E\"\"6\x9E7\x9F/,#;[/#$+\")(\"'#&'#.\u056E &%2\x9E\"\"6\x9E7\x9F/,#;Z/#$+\")(\"'#&'#.\u054F &%;Z/\x9B#2\x9E\"\"6\x9E7\x9F/\x8C$;Z/\x83$28\"\"6879/t$;Z/k$28\"\"6879/\\$;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$++)(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u04C7 &%;Z/\xAA#%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\x83$2\x9E\"\"6\x9E7\x9F/t$;Z/k$28\"\"6879/\\$;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$+*)(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u0430 &%;Z/\xB9#%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\x92$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/k$2\x9E\"\"6\x9E7\x9F/\\$;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$+))()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u038A &%;Z/\xC8#%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\xA1$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/z$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/S$2\x9E\"\"6\x9E7\x9F/D$;Z/;$28\"\"6879/,$;[/#$+()(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u02D5 &%;Z/\xD7#%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\xB0$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\x89$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/b$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/;$2\x9E\"\"6\x9E7\x9F/,$;[/#$+')(''#(&'#(%'#($'#(#'#(\"'#&'#.\u0211 &%;Z/\xFE#%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\xD7$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\xB0$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\x89$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/b$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/;$2\x9E\"\"6\x9E7\x9F/,$;Z/#$+()(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u0126 &%;Z/\u011C#%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\xF5$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\xCE$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\xA7$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\x80$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/Y$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/2$2\x9E\"\"6\x9E7\x9F/#$+()(('#(''#(&'#(%'#($'#(#'#(\"'#&'#/& 8!:\xA0! )"),
	        peg$decode("%;#/M#;#.\" &\"/?$;#.\" &\"/1$;#.\" &\"/#$+$)($'#(#'#(\"'#&'#"),
	        peg$decode("%;Z/;#28\"\"6879/,$;Z/#$+#)(#'#(\"'#&'#.# &;\\"),
	        peg$decode("%;]/o#2J\"\"6J7K/`$;]/W$2J\"\"6J7K/H$;]/?$2J\"\"6J7K/0$;]/'$8':\xA1' )(''#(&'#(%'#($'#(#'#(\"'#&'#"),
	        peg$decode("%2\xA2\"\"6\xA27\xA3/2#4\xA4\"\"5!7\xA5/#$+\")(\"'#&'#.\x98 &%2\xA6\"\"6\xA67\xA7/;#4\xA8\"\"5!7\xA9/,$;!/#$+#)(#'#(\"'#&'#.j &%2\xAA\"\"6\xAA7\xAB/5#;!/,$;!/#$+#)(#'#(\"'#&'#.B &%4\xAC\"\"5!7\xAD/,#;!/#$+\")(\"'#&'#.# &;!"),
	        peg$decode("%%;!.\" &\"/[#;!.\" &\"/M$;!.\" &\"/?$;!.\" &\"/1$;!.\" &\"/#$+%)(%'#($'#(#'#(\"'#&'#/' 8!:\xAE!! )"),
	        peg$decode("$%22\"\"6273/,#;`/#$+\")(\"'#&'#0<*%22\"\"6273/,#;`/#$+\")(\"'#&'#&"),
	        peg$decode(";a.A &;b.; &;c.5 &;d./ &;e.) &;f.# &;g"),
	        peg$decode("%3\xAF\"\"5*7\xB0/a#3\xB1\"\"5#7\xB2.G &3\xB3\"\"5#7\xB4.; &3\xB5\"\"5$7\xB6./ &3\xB7\"\"5#7\xB8.# &;6/($8\":\xB9\"! )(\"'#&'#"),
	        peg$decode("%3\xBA\"\"5%7\xBB/I#3\xBC\"\"5%7\xBD./ &3\xBE\"\"5\"7\xBF.# &;6/($8\":\xC0\"! )(\"'#&'#"),
	        peg$decode("%3\xC1\"\"5'7\xC2/1#;\x90/($8\":\xC3\"! )(\"'#&'#"),
	        peg$decode("%3\xC4\"\"5$7\xC5/1#;\xF0/($8\":\xC6\"! )(\"'#&'#"),
	        peg$decode("%3\xC7\"\"5&7\xC8/1#;T/($8\":\xC9\"! )(\"'#&'#"),
	        peg$decode("%3\xCA\"\"5\"7\xCB/N#%2>\"\"6>7?/,#;6/#$+\")(\"'#&'#.\" &\"/'$8\":\xCC\" )(\"'#&'#"),
	        peg$decode("%;h/P#%2>\"\"6>7?/,#;i/#$+\")(\"'#&'#.\" &\"/)$8\":\xCD\"\"! )(\"'#&'#"),
	        peg$decode("%$;j/&#0#*;j&&&#/\"!&,)"),
	        peg$decode("%$;j/&#0#*;j&&&#/\"!&,)"),
	        peg$decode(";k.) &;+.# &;-"),
	        peg$decode("2l\"\"6l7m.e &2n\"\"6n7o.Y &24\"\"6475.M &28\"\"6879.A &2<\"\"6<7=.5 &2@\"\"6@7A.) &2B\"\"6B7C"),
	        peg$decode("%26\"\"6677/n#;m/e$$%2<\"\"6<7=/,#;m/#$+\")(\"'#&'#0<*%2<\"\"6<7=/,#;m/#$+\")(\"'#&'#&/#$+#)(#'#(\"'#&'#"),
	        peg$decode("%;n/A#2>\"\"6>7?/2$;o/)$8#:\xCE#\"\" )(#'#(\"'#&'#"),
	        peg$decode("$;p.) &;+.# &;-/2#0/*;p.) &;+.# &;-&&&#"),
	        peg$decode("$;p.) &;+.# &;-0/*;p.) &;+.# &;-&"),
	        peg$decode("2l\"\"6l7m.e &2n\"\"6n7o.Y &24\"\"6475.M &26\"\"6677.A &28\"\"6879.5 &2@\"\"6@7A.) &2B\"\"6B7C"),
	        peg$decode(";\x91.# &;r"),
	        peg$decode("%;\x90/G#;'/>$;s/5$;'/,$;\x84/#$+%)(%'#($'#(#'#(\"'#&'#"),
	        peg$decode(";M.# &;t"),
	        peg$decode("%;\x7F/E#28\"\"6879/6$;u.# &;x/'$8#:\xCF# )(#'#(\"'#&'#"),
	        peg$decode("%;v.# &;w/J#%26\"\"6677/,#;\x83/#$+\")(\"'#&'#.\" &\"/#$+\")(\"'#&'#"),
	        peg$decode("%2\xD0\"\"6\xD07\xD1/:#;\x80/1$;w.\" &\"/#$+#)(#'#(\"'#&'#"),
	        peg$decode("%24\"\"6475/,#;{/#$+\")(\"'#&'#"),
	        peg$decode("%;z/3#$;y0#*;y&/#$+\")(\"'#&'#"),
	        peg$decode(";*.) &;+.# &;-"),
	        peg$decode(";+.\x8F &;-.\x89 &22\"\"6273.} &26\"\"6677.q &28\"\"6879.e &2:\"\"6:7;.Y &2<\"\"6<7=.M &2>\"\"6>7?.A &2@\"\"6@7A.5 &2B\"\"6B7C.) &2D\"\"6D7E"),
	        peg$decode("%;|/e#$%24\"\"6475/,#;|/#$+\")(\"'#&'#0<*%24\"\"6475/,#;|/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
	        peg$decode("%$;~0#*;~&/e#$%22\"\"6273/,#;}/#$+\")(\"'#&'#0<*%22\"\"6273/,#;}/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
	        peg$decode("$;~0#*;~&"),
	        peg$decode(";+.w &;-.q &28\"\"6879.e &2:\"\"6:7;.Y &2<\"\"6<7=.M &2>\"\"6>7?.A &2@\"\"6@7A.5 &2B\"\"6B7C.) &2D\"\"6D7E"),
	        peg$decode("%%;\"/\x87#$;\".G &;!.A &2@\"\"6@7A.5 &2F\"\"6F7G.) &2J\"\"6J7K0M*;\".G &;!.A &2@\"\"6@7A.5 &2F\"\"6F7G.) &2J\"\"6J7K&/#$+\")(\"'#&'#/& 8!:\xD2! )"),
	        peg$decode(";\x81.# &;\x82"),
	        peg$decode("%%;O/2#2:\"\"6:7;/#$+\")(\"'#&'#.\" &\"/,#;S/#$+\")(\"'#&'#.\" &\""),
	        peg$decode("$;+.\x83 &;-.} &2B\"\"6B7C.q &2D\"\"6D7E.e &22\"\"6273.Y &28\"\"6879.M &2:\"\"6:7;.A &2<\"\"6<7=.5 &2>\"\"6>7?.) &2@\"\"6@7A/\x8C#0\x89*;+.\x83 &;-.} &2B\"\"6B7C.q &2D\"\"6D7E.e &22\"\"6273.Y &28\"\"6879.M &2:\"\"6:7;.A &2<\"\"6<7=.5 &2>\"\"6>7?.) &2@\"\"6@7A&&&#"),
	        peg$decode("$;y0#*;y&"),
	        peg$decode("%3\x92\"\"5#7\xD3/q#24\"\"6475/b$$;!/&#0#*;!&&&#/L$2J\"\"6J7K/=$$;!/&#0#*;!&&&#/'$8%:\xD4% )(%'#($'#(#'#(\"'#&'#"),
	        peg$decode("2\xD5\"\"6\xD57\xD6"),
	        peg$decode("2\xD7\"\"6\xD77\xD8"),
	        peg$decode("2\xD9\"\"6\xD97\xDA"),
	        peg$decode("2\xDB\"\"6\xDB7\xDC"),
	        peg$decode("2\xDD\"\"6\xDD7\xDE"),
	        peg$decode("2\xDF\"\"6\xDF7\xE0"),
	        peg$decode("2\xE1\"\"6\xE17\xE2"),
	        peg$decode("2\xE3\"\"6\xE37\xE4"),
	        peg$decode("2\xE5\"\"6\xE57\xE6"),
	        peg$decode("2\xE7\"\"6\xE77\xE8"),
	        peg$decode("2\xE9\"\"6\xE97\xEA"),
	        peg$decode("%;\x85.Y &;\x86.S &;\x88.M &;\x89.G &;\x8A.A &;\x8B.; &;\x8C.5 &;\x8F./ &;\x8D.) &;\x8E.# &;6/& 8!:\xEB! )"),
	        peg$decode("%;\x84/G#;'/>$;\x92/5$;'/,$;\x94/#$+%)(%'#($'#(#'#(\"'#&'#"),
	        peg$decode("%;\x93/' 8!:\xEC!! )"),
	        peg$decode("%;!/5#;!/,$;!/#$+#)(#'#(\"'#&'#"),
	        peg$decode("%$;*.A &;+.; &;-.5 &;3./ &;4.) &;'.# &;(0G*;*.A &;+.; &;-.5 &;3./ &;4.) &;'.# &;(&/& 8!:\xED! )"),
	        peg$decode("%;\xB6/Y#$%;A/,#;\xB6/#$+\")(\"'#&'#06*%;A/,#;\xB6/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
	        peg$decode("%;9/N#%2:\"\"6:7;/,#;9/#$+\")(\"'#&'#.\" &\"/'$8\":\xEE\" )(\"'#&'#"),
	        peg$decode("%;:.c &%;\x98/Y#$%;A/,#;\x98/#$+\")(\"'#&'#06*%;A/,#;\x98/#$+\")(\"'#&'#&/#$+\")(\"'#&'#/& 8!:\xEF! )"),
	        peg$decode("%;L.# &;\x99/]#$%;B/,#;\x9B/#$+\")(\"'#&'#06*%;B/,#;\x9B/#$+\")(\"'#&'#&/'$8\":\xF0\" )(\"'#&'#"),
	        peg$decode("%;\x9A.\" &\"/>#;@/5$;M/,$;?/#$+$)($'#(#'#(\"'#&'#"),
	        peg$decode("%%;6/Y#$%;./,#;6/#$+\")(\"'#&'#06*%;./,#;6/#$+\")(\"'#&'#&/#$+\")(\"'#&'#.# &;H/' 8!:\xF1!! )"),
	        peg$decode(";\x9C.) &;\x9D.# &;\xA0"),
	        peg$decode("%3\xF2\"\"5!7\xF3/:#;</1$;\x9F/($8#:\xF4#! )(#'#(\"'#&'#"),
	        peg$decode("%3\xF5\"\"5'7\xF6/:#;</1$;\x9E/($8#:\xF7#! )(#'#(\"'#&'#"),
	        peg$decode("%$;!/&#0#*;!&&&#/' 8!:\xF8!! )"),
	        peg$decode("%2\xF9\"\"6\xF97\xFA/o#%2J\"\"6J7K/M#;!.\" &\"/?$;!.\" &\"/1$;!.\" &\"/#$+$)($'#(#'#(\"'#&'#.\" &\"/'$8\":\xFB\" )(\"'#&'#"),
	        peg$decode("%;6/J#%;</,#;\xA1/#$+\")(\"'#&'#.\" &\"/)$8\":\xFC\"\"! )(\"'#&'#"),
	        peg$decode(";6.) &;T.# &;H"),
	        peg$decode("%;\xA3/Y#$%;B/,#;\xA4/#$+\")(\"'#&'#06*%;B/,#;\xA4/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
	        peg$decode("%3\xFD\"\"5&7\xFE.G &3\xFF\"\"5'7\u0100.; &3\u0101\"\"5$7\u0102./ &3\u0103\"\"5%7\u0104.# &;6/& 8!:\u0105! )"),
	        peg$decode(";\xA5.# &;\xA0"),
	        peg$decode("%3\u0106\"\"5(7\u0107/M#;</D$3\u0108\"\"5(7\u0109./ &3\u010A\"\"5(7\u010B.# &;6/#$+#)(#'#(\"'#&'#"),
	        peg$decode("%;6/Y#$%;A/,#;6/#$+\")(\"'#&'#06*%;A/,#;6/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
	        peg$decode("%$;!/&#0#*;!&&&#/' 8!:\u010C!! )"),
	        peg$decode("%;\xA9/& 8!:\u010D! )"),
	        peg$decode("%;\xAA/k#;;/b$;\xAF/Y$$%;B/,#;\xB0/#$+\")(\"'#&'#06*%;B/,#;\xB0/#$+\")(\"'#&'#&/#$+$)($'#(#'#(\"'#&'#"),
	        peg$decode(";\xAB.# &;\xAC"),
	        peg$decode("3\u010E\"\"5$7\u010F.S &3\u0110\"\"5%7\u0111.G &3\u0112\"\"5%7\u0113.; &3\u0114\"\"5%7\u0115./ &3\u0116\"\"5+7\u0117.# &;\xAD"),
	        peg$decode("3\u0118\"\"5'7\u0119./ &3\u011A\"\"5)7\u011B.# &;\xAD"),
	        peg$decode(";6.# &;\xAE"),
	        peg$decode("%3\u011C\"\"5\"7\u011D/,#;6/#$+\")(\"'#&'#"),
	        peg$decode(";\xAD.# &;6"),
	        peg$decode("%;6/5#;</,$;\xB1/#$+#)(#'#(\"'#&'#"),
	        peg$decode(";6.# &;H"),
	        peg$decode("%;\xB3/5#;./,$;\x90/#$+#)(#'#(\"'#&'#"),
	        peg$decode("%$;!/&#0#*;!&&&#/' 8!:\u011E!! )"),
	        peg$decode("%;\x9E/' 8!:\u011F!! )"),
	        peg$decode("%;\xB6/^#$%;B/,#;\xA0/#$+\")(\"'#&'#06*%;B/,#;\xA0/#$+\")(\"'#&'#&/($8\":\u0120\"!!)(\"'#&'#"),
	        peg$decode("%%;7/e#$%2J\"\"6J7K/,#;7/#$+\")(\"'#&'#0<*%2J\"\"6J7K/,#;7/#$+\")(\"'#&'#&/#$+\")(\"'#&'#/\"!&,)"),
	        peg$decode("%;L.# &;\x99/]#$%;B/,#;\xB8/#$+\")(\"'#&'#06*%;B/,#;\xB8/#$+\")(\"'#&'#&/'$8\":\u0121\" )(\"'#&'#"),
	        peg$decode(";\xB9.# &;\xA0"),
	        peg$decode("%3\u0122\"\"5#7\u0123/:#;</1$;6/($8#:\u0124#! )(#'#(\"'#&'#"),
	        peg$decode("%$;!/&#0#*;!&&&#/' 8!:\u0125!! )"),
	        peg$decode("%;\x9E/' 8!:\u0126!! )"),
	        peg$decode("%$;\x9A0#*;\x9A&/x#;@/o$;M/f$;?/]$$%;B/,#;\xA0/#$+\")(\"'#&'#06*%;B/,#;\xA0/#$+\")(\"'#&'#&/'$8%:\u0127% )(%'#($'#(#'#(\"'#&'#"),
	        peg$decode(";\xBE"),
	        peg$decode("%3\u0128\"\"5&7\u0129/k#;./b$;\xC1/Y$$%;A/,#;\xC1/#$+\")(\"'#&'#06*%;A/,#;\xC1/#$+\")(\"'#&'#&/#$+$)($'#(#'#(\"'#&'#.# &;\xBF"),
	        peg$decode("%;6/k#;./b$;\xC0/Y$$%;A/,#;\xC0/#$+\")(\"'#&'#06*%;A/,#;\xC0/#$+\")(\"'#&'#&/#$+$)($'#(#'#(\"'#&'#"),
	        peg$decode("%;6/;#;</2$;6.# &;H/#$+#)(#'#(\"'#&'#"),
	        peg$decode(";\xC2.G &;\xC4.A &;\xC6.; &;\xC8.5 &;\xC9./ &;\xCA.) &;\xCB.# &;\xC0"),
	        peg$decode("%3\u012A\"\"5%7\u012B/5#;</,$;\xC3/#$+#)(#'#(\"'#&'#"),
	        peg$decode("%;I/' 8!:\u012C!! )"),
	        peg$decode("%3\u012D\"\"5&7\u012E/\x97#;</\x8E$;D/\x85$;\xC5/|$$%$;'/&#0#*;'&&&#/,#;\xC5/#$+\")(\"'#&'#0C*%$;'/&#0#*;'&&&#/,#;\xC5/#$+\")(\"'#&'#&/,$;E/#$+&)(&'#(%'#($'#(#'#(\"'#&'#"),
	        peg$decode(";t.# &;w"),
	        peg$decode("%3\u012F\"\"5%7\u0130/5#;</,$;\xC7/#$+#)(#'#(\"'#&'#"),
	        peg$decode("%;I/' 8!:\u0131!! )"),
	        peg$decode("%3\u0132\"\"5&7\u0133/:#;</1$;I/($8#:\u0134#! )(#'#(\"'#&'#"),
	        peg$decode("%3\u0135\"\"5%7\u0136/]#;</T$%3\u0137\"\"5$7\u0138/& 8!:\u0139! ).4 &%3\u013A\"\"5%7\u013B/& 8!:\u013C! )/#$+#)(#'#(\"'#&'#"),
	        peg$decode("%3\u013D\"\"5)7\u013E/R#;</I$3\u013F\"\"5#7\u0140./ &3\u0141\"\"5(7\u0142.# &;6/($8#:\u0143#! )(#'#(\"'#&'#"),
	        peg$decode("%3\u0144\"\"5#7\u0145/\x93#;</\x8A$;D/\x81$%;\xCC/e#$%2D\"\"6D7E/,#;\xCC/#$+\")(\"'#&'#0<*%2D\"\"6D7E/,#;\xCC/#$+\")(\"'#&'#&/#$+\")(\"'#&'#/,$;E/#$+%)(%'#($'#(#'#(\"'#&'#"),
	        peg$decode("%3\u0146\"\"5(7\u0147./ &3\u0148\"\"5$7\u0149.# &;6/' 8!:\u014A!! )"),
	        peg$decode("%;6/Y#$%;A/,#;6/#$+\")(\"'#&'#06*%;A/,#;6/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
	        peg$decode("%;\xCF/G#;./>$;\xCF/5$;./,$;\x90/#$+%)(%'#($'#(#'#(\"'#&'#"),
	        peg$decode("%$;!/&#0#*;!&&&#/' 8!:\u014B!! )"),
	        peg$decode("%;\xD1/]#$%;A/,#;\xD1/#$+\")(\"'#&'#06*%;A/,#;\xD1/#$+\")(\"'#&'#&/'$8\":\u014C\" )(\"'#&'#"),
	        peg$decode("%;\x99/]#$%;B/,#;\xA0/#$+\")(\"'#&'#06*%;B/,#;\xA0/#$+\")(\"'#&'#&/'$8\":\u014D\" )(\"'#&'#"),
	        peg$decode("%;L.O &;\x99.I &%;@.\" &\"/:#;t/1$;?.\" &\"/#$+#)(#'#(\"'#&'#/]#$%;B/,#;\xA0/#$+\")(\"'#&'#06*%;B/,#;\xA0/#$+\")(\"'#&'#&/'$8\":\u014E\" )(\"'#&'#"),
	        peg$decode("%;\xD4/]#$%;B/,#;\xD5/#$+\")(\"'#&'#06*%;B/,#;\xD5/#$+\")(\"'#&'#&/'$8\":\u014F\" )(\"'#&'#"),
	        peg$decode("%;\x96/& 8!:\u0150! )"),
	        peg$decode("%3\u0151\"\"5(7\u0152/:#;</1$;6/($8#:\u0153#! )(#'#(\"'#&'#.g &%3\u0154\"\"5&7\u0155/:#;</1$;6/($8#:\u0156#! )(#'#(\"'#&'#.: &%3\u0157\"\"5*7\u0158/& 8!:\u0159! ).# &;\xA0"),
	        peg$decode("%%;6/k#$%;A/2#;6/)$8\":\u015A\"\"$ )(\"'#&'#0<*%;A/2#;6/)$8\":\u015A\"\"$ )(\"'#&'#&/)$8\":\u015B\"\"! )(\"'#&'#.\" &\"/' 8!:\u015C!! )"),
	        peg$decode("%;\xD8/Y#$%;A/,#;\xD8/#$+\")(\"'#&'#06*%;A/,#;\xD8/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
	        peg$decode("%;\x99/Y#$%;B/,#;\xA0/#$+\")(\"'#&'#06*%;B/,#;\xA0/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
	        peg$decode("%$;!/&#0#*;!&&&#/' 8!:\u015D!! )"),
	        peg$decode("%;\xDB/Y#$%;B/,#;\xDC/#$+\")(\"'#&'#06*%;B/,#;\xDC/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
	        peg$decode("%3\u015E\"\"5&7\u015F.; &3\u0160\"\"5'7\u0161./ &3\u0162\"\"5*7\u0163.# &;6/& 8!:\u0164! )"),
	        peg$decode("%3\u0165\"\"5&7\u0166/:#;</1$;\xDD/($8#:\u0167#! )(#'#(\"'#&'#.} &%3\xF5\"\"5'7\xF6/:#;</1$;\x9E/($8#:\u0168#! )(#'#(\"'#&'#.P &%3\u0169\"\"5+7\u016A/:#;</1$;\x9E/($8#:\u016B#! )(#'#(\"'#&'#.# &;\xA0"),
	        peg$decode("3\u016C\"\"5+7\u016D.k &3\u016E\"\"5)7\u016F._ &3\u0170\"\"5(7\u0171.S &3\u0172\"\"5'7\u0173.G &3\u0174\"\"5&7\u0175.; &3\u0176\"\"5*7\u0177./ &3\u0178\"\"5)7\u0179.# &;6"),
	        peg$decode(";1.\" &\""),
	        peg$decode("%%;6/k#$%;A/2#;6/)$8\":\u015A\"\"$ )(\"'#&'#0<*%;A/2#;6/)$8\":\u015A\"\"$ )(\"'#&'#&/)$8\":\u015B\"\"! )(\"'#&'#.\" &\"/' 8!:\u017A!! )"),
	        peg$decode("%;L.# &;\x99/]#$%;B/,#;\xE1/#$+\")(\"'#&'#06*%;B/,#;\xE1/#$+\")(\"'#&'#&/'$8\":\u017B\" )(\"'#&'#"),
	        peg$decode(";\xB9.# &;\xA0"),
	        peg$decode("%;\xE3/Y#$%;A/,#;\xE3/#$+\")(\"'#&'#06*%;A/,#;\xE3/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
	        peg$decode("%;\xEA/k#;./b$;\xED/Y$$%;B/,#;\xE4/#$+\")(\"'#&'#06*%;B/,#;\xE4/#$+\")(\"'#&'#&/#$+$)($'#(#'#(\"'#&'#"),
	        peg$decode(";\xE5.; &;\xE6.5 &;\xE7./ &;\xE8.) &;\xE9.# &;\xA0"),
	        peg$decode("%3\u017C\"\"5#7\u017D/:#;</1$;\xF0/($8#:\u017E#! )(#'#(\"'#&'#"),
	        peg$decode("%3\u017F\"\"5%7\u0180/:#;</1$;T/($8#:\u0181#! )(#'#(\"'#&'#"),
	        peg$decode("%3\u0182\"\"5(7\u0183/@#;</7$;\\.# &;Y/($8#:\u0184#! )(#'#(\"'#&'#"),
	        peg$decode("%3\u0185\"\"5&7\u0186/:#;</1$;6/($8#:\u0187#! )(#'#(\"'#&'#"),
	        peg$decode("%3\u0188\"\"5%7\u0189/O#%;</3#$;!0#*;!&/#$+\")(\"'#&'#.\" &\"/'$8\":\u018A\" )(\"'#&'#"),
	        peg$decode("%;\xEB/G#;;/>$;6/5$;;/,$;\xEC/#$+%)(%'#($'#(#'#(\"'#&'#"),
	        peg$decode("%3\x92\"\"5#7\xD3.# &;6/' 8!:\u018B!! )"),
	        peg$decode("%3\xB1\"\"5#7\u018C.G &3\xB3\"\"5#7\u018D.; &3\xB7\"\"5#7\u018E./ &3\xB5\"\"5$7\u018F.# &;6/' 8!:\u0190!! )"),
	        peg$decode("%;\xEE/D#%;C/,#;\xEF/#$+\")(\"'#&'#.\" &\"/#$+\")(\"'#&'#"),
	        peg$decode("%;U.) &;\\.# &;X/& 8!:\u0191! )"),
	        peg$decode("%%;!.\" &\"/[#;!.\" &\"/M$;!.\" &\"/?$;!.\" &\"/1$;!.\" &\"/#$+%)(%'#($'#(#'#(\"'#&'#/' 8!:\u0192!! )"),
	        peg$decode("%%;!/?#;!.\" &\"/1$;!.\" &\"/#$+#)(#'#(\"'#&'#/' 8!:\u0193!! )"),
	        peg$decode(";\xBE"),
	        peg$decode("%;\x9E/^#$%;B/,#;\xF3/#$+\")(\"'#&'#06*%;B/,#;\xF3/#$+\")(\"'#&'#&/($8\":\u0194\"!!)(\"'#&'#"),
	        peg$decode(";\xF4.# &;\xA0"),
	        peg$decode("%2\u0195\"\"6\u01957\u0196/L#;</C$2\u0197\"\"6\u01977\u0198.) &2\u0199\"\"6\u01997\u019A/($8#:\u019B#! )(#'#(\"'#&'#"),
	        peg$decode("%;\x9E/^#$%;B/,#;\xA0/#$+\")(\"'#&'#06*%;B/,#;\xA0/#$+\")(\"'#&'#&/($8\":\u019C\"!!)(\"'#&'#"),
	        peg$decode("%;6/5#;0/,$;\xF7/#$+#)(#'#(\"'#&'#"),
	        peg$decode("$;2.) &;4.# &;.0/*;2.) &;4.# &;.&"),
	        peg$decode("$;%0#*;%&"),
	        peg$decode("%;\xFA/;#28\"\"6879/,$;\xFB/#$+#)(#'#(\"'#&'#"),
	        peg$decode("%3\u019D\"\"5%7\u019E.) &3\u019F\"\"5$7\u01A0/' 8!:\u01A1!! )"),
	        peg$decode("%;\xFC/J#%28\"\"6879/,#;^/#$+\")(\"'#&'#.\" &\"/#$+\")(\"'#&'#"),
	        peg$decode("%;\\.) &;X.# &;\x82/' 8!:\u01A2!! )"),
	        peg$decode(";\".S &;!.M &2F\"\"6F7G.A &2J\"\"6J7K.5 &2H\"\"6H7I.) &2N\"\"6N7O"),
	        peg$decode("2L\"\"6L7M.\x95 &2B\"\"6B7C.\x89 &2<\"\"6<7=.} &2R\"\"6R7S.q &2T\"\"6T7U.e &2V\"\"6V7W.Y &2P\"\"6P7Q.M &2@\"\"6@7A.A &2D\"\"6D7E.5 &22\"\"6273.) &2>\"\"6>7?"),
	        peg$decode("%;\u0100/b#28\"\"6879/S$;\xFB/J$%2\u01A3\"\"6\u01A37\u01A4/,#;\xEC/#$+\")(\"'#&'#.\" &\"/#$+$)($'#(#'#(\"'#&'#"),
	        peg$decode("%3\u01A5\"\"5%7\u01A6.) &3\u01A7\"\"5$7\u01A8/' 8!:\u01A1!! )"),
	        peg$decode("%;\xEC/O#3\xB1\"\"5#7\xB2.6 &3\xB3\"\"5#7\xB4.* &$;+0#*;+&/'$8\":\u01A9\" )(\"'#&'#"),
	        peg$decode("%;\u0104/\x87#2F\"\"6F7G/x$;\u0103/o$2F\"\"6F7G/`$;\u0103/W$2F\"\"6F7G/H$;\u0103/?$2F\"\"6F7G/0$;\u0105/'$8):\u01AA) )()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#"),
	        peg$decode("%;#/>#;#/5$;#/,$;#/#$+$)($'#(#'#(\"'#&'#"),
	        peg$decode("%;\u0103/,#;\u0103/#$+\")(\"'#&'#"),
	        peg$decode("%;\u0103/5#;\u0103/,$;\u0103/#$+#)(#'#(\"'#&'#"),
	        peg$decode("%;\x84/U#;'/L$;\x92/C$;'/:$;\x90/1$; .\" &\"/#$+&)(&'#(%'#($'#(#'#(\"'#&'#"),
	        peg$decode("%2\u01AB\"\"6\u01AB7\u01AC.) &2\u01AD\"\"6\u01AD7\u01AE/w#;0/n$;\u0108/e$$%;B/2#;\u0109.# &;\xA0/#$+\")(\"'#&'#0<*%;B/2#;\u0109.# &;\xA0/#$+\")(\"'#&'#&/#$+$)($'#(#'#(\"'#&'#"),
	        peg$decode(";\x99.# &;L"),
	        peg$decode("%2\u01AF\"\"6\u01AF7\u01B0/5#;</,$;\u010A/#$+#)(#'#(\"'#&'#"),
	        peg$decode("%;D/S#;,/J$2:\"\"6:7;/;$;,.# &;T/,$;E/#$+%)(%'#($'#(#'#(\"'#&'#")
	      ],

	      peg$currPos          = 0,
	      peg$savedPos         = 0,
	      peg$posDetailsCache  = [{ line: 1, column: 1 }],
	      peg$maxFailPos       = 0,
	      peg$maxFailExpected  = [],
	      peg$silentFails      = 0,

	      peg$result;

	  if ("startRule" in options) {
	    if (!(options.startRule in peg$startRuleIndices)) {
	      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
	    }

	    peg$startRuleIndex = peg$startRuleIndices[options.startRule];
	  }

	  function text() {
	    return input.substring(peg$savedPos, peg$currPos);
	  }

	  function location() {
	    return peg$computeLocation(peg$savedPos, peg$currPos);
	  }

	  function peg$literalExpectation(text, ignoreCase) {
	    return { type: "literal", text: text, ignoreCase: ignoreCase };
	  }

	  function peg$classExpectation(parts, inverted, ignoreCase) {
	    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
	  }

	  function peg$endExpectation() {
	    return { type: "end" };
	  }

	  function peg$computePosDetails(pos) {
	    var details = peg$posDetailsCache[pos], p;

	    if (details) {
	      return details;
	    } else {
	      p = pos - 1;
	      while (!peg$posDetailsCache[p]) {
	        p--;
	      }

	      details = peg$posDetailsCache[p];
	      details = {
	        line:   details.line,
	        column: details.column
	      };

	      while (p < pos) {
	        if (input.charCodeAt(p) === 10) {
	          details.line++;
	          details.column = 1;
	        } else {
	          details.column++;
	        }

	        p++;
	      }

	      peg$posDetailsCache[pos] = details;
	      return details;
	    }
	  }

	  function peg$computeLocation(startPos, endPos) {
	    var startPosDetails = peg$computePosDetails(startPos),
	        endPosDetails   = peg$computePosDetails(endPos);

	    return {
	      start: {
	        offset: startPos,
	        line:   startPosDetails.line,
	        column: startPosDetails.column
	      },
	      end: {
	        offset: endPos,
	        line:   endPosDetails.line,
	        column: endPosDetails.column
	      }
	    };
	  }

	  function peg$fail(expected) {
	    if (peg$currPos < peg$maxFailPos) { return; }

	    if (peg$currPos > peg$maxFailPos) {
	      peg$maxFailPos = peg$currPos;
	      peg$maxFailExpected = [];
	    }

	    peg$maxFailExpected.push(expected);
	  }

	  function peg$buildStructuredError(expected, found, location) {
	    return new peg$SyntaxError(
	      peg$SyntaxError.buildMessage(expected, found),
	      expected,
	      found,
	      location
	    );
	  }

	  function peg$decode(s) {
	    var bc = new Array(s.length), i;

	    for (i = 0; i < s.length; i++) {
	      bc[i] = s.charCodeAt(i) - 32;
	    }

	    return bc;
	  }

	  function peg$parseRule(index) {
	    var bc    = peg$bytecode[index],
	        ip    = 0,
	        ips   = [],
	        end   = bc.length,
	        ends  = [],
	        stack = [],
	        params, i;

	    while (true) {
	      while (ip < end) {
	        switch (bc[ip]) {
	          case 0:
	            stack.push(peg$consts[bc[ip + 1]]);
	            ip += 2;
	            break;

	          case 1:
	            stack.push(void 0);
	            ip++;
	            break;

	          case 2:
	            stack.push(null);
	            ip++;
	            break;

	          case 3:
	            stack.push(peg$FAILED);
	            ip++;
	            break;

	          case 4:
	            stack.push([]);
	            ip++;
	            break;

	          case 5:
	            stack.push(peg$currPos);
	            ip++;
	            break;

	          case 6:
	            stack.pop();
	            ip++;
	            break;

	          case 7:
	            peg$currPos = stack.pop();
	            ip++;
	            break;

	          case 8:
	            stack.length -= bc[ip + 1];
	            ip += 2;
	            break;

	          case 9:
	            stack.splice(-2, 1);
	            ip++;
	            break;

	          case 10:
	            stack[stack.length - 2].push(stack.pop());
	            ip++;
	            break;

	          case 11:
	            stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));
	            ip += 2;
	            break;

	          case 12:
	            stack.push(input.substring(stack.pop(), peg$currPos));
	            ip++;
	            break;

	          case 13:
	            ends.push(end);
	            ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

	            if (stack[stack.length - 1]) {
	              end = ip + 3 + bc[ip + 1];
	              ip += 3;
	            } else {
	              end = ip + 3 + bc[ip + 1] + bc[ip + 2];
	              ip += 3 + bc[ip + 1];
	            }

	            break;

	          case 14:
	            ends.push(end);
	            ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

	            if (stack[stack.length - 1] === peg$FAILED) {
	              end = ip + 3 + bc[ip + 1];
	              ip += 3;
	            } else {
	              end = ip + 3 + bc[ip + 1] + bc[ip + 2];
	              ip += 3 + bc[ip + 1];
	            }

	            break;

	          case 15:
	            ends.push(end);
	            ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

	            if (stack[stack.length - 1] !== peg$FAILED) {
	              end = ip + 3 + bc[ip + 1];
	              ip += 3;
	            } else {
	              end = ip + 3 + bc[ip + 1] + bc[ip + 2];
	              ip += 3 + bc[ip + 1];
	            }

	            break;

	          case 16:
	            if (stack[stack.length - 1] !== peg$FAILED) {
	              ends.push(end);
	              ips.push(ip);

	              end = ip + 2 + bc[ip + 1];
	              ip += 2;
	            } else {
	              ip += 2 + bc[ip + 1];
	            }

	            break;

	          case 17:
	            ends.push(end);
	            ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

	            if (input.length > peg$currPos) {
	              end = ip + 3 + bc[ip + 1];
	              ip += 3;
	            } else {
	              end = ip + 3 + bc[ip + 1] + bc[ip + 2];
	              ip += 3 + bc[ip + 1];
	            }

	            break;

	          case 18:
	            ends.push(end);
	            ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

	            if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length) === peg$consts[bc[ip + 1]]) {
	              end = ip + 4 + bc[ip + 2];
	              ip += 4;
	            } else {
	              end = ip + 4 + bc[ip + 2] + bc[ip + 3];
	              ip += 4 + bc[ip + 2];
	            }

	            break;

	          case 19:
	            ends.push(end);
	            ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

	            if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length).toLowerCase() === peg$consts[bc[ip + 1]]) {
	              end = ip + 4 + bc[ip + 2];
	              ip += 4;
	            } else {
	              end = ip + 4 + bc[ip + 2] + bc[ip + 3];
	              ip += 4 + bc[ip + 2];
	            }

	            break;

	          case 20:
	            ends.push(end);
	            ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

	            if (peg$consts[bc[ip + 1]].test(input.charAt(peg$currPos))) {
	              end = ip + 4 + bc[ip + 2];
	              ip += 4;
	            } else {
	              end = ip + 4 + bc[ip + 2] + bc[ip + 3];
	              ip += 4 + bc[ip + 2];
	            }

	            break;

	          case 21:
	            stack.push(input.substr(peg$currPos, bc[ip + 1]));
	            peg$currPos += bc[ip + 1];
	            ip += 2;
	            break;

	          case 22:
	            stack.push(peg$consts[bc[ip + 1]]);
	            peg$currPos += peg$consts[bc[ip + 1]].length;
	            ip += 2;
	            break;

	          case 23:
	            stack.push(peg$FAILED);
	            if (peg$silentFails === 0) {
	              peg$fail(peg$consts[bc[ip + 1]]);
	            }
	            ip += 2;
	            break;

	          case 24:
	            peg$savedPos = stack[stack.length - 1 - bc[ip + 1]];
	            ip += 2;
	            break;

	          case 25:
	            peg$savedPos = peg$currPos;
	            ip++;
	            break;

	          case 26:
	            params = bc.slice(ip + 4, ip + 4 + bc[ip + 3]);
	            for (i = 0; i < bc[ip + 3]; i++) {
	              params[i] = stack[stack.length - 1 - params[i]];
	            }

	            stack.splice(
	              stack.length - bc[ip + 2],
	              bc[ip + 2],
	              peg$consts[bc[ip + 1]].apply(null, params)
	            );

	            ip += 4 + bc[ip + 3];
	            break;

	          case 27:
	            stack.push(peg$parseRule(bc[ip + 1]));
	            ip += 2;
	            break;

	          case 28:
	            peg$silentFails++;
	            ip++;
	            break;

	          case 29:
	            peg$silentFails--;
	            ip++;
	            break;

	          default:
	            throw new Error("Invalid opcode: " + bc[ip] + ".");
	        }
	      }

	      if (ends.length > 0) {
	        end = ends.pop();
	        ip = ips.pop();
	      } else {
	        break;
	      }
	    }

	    return stack[0];
	  }


	    options.data = {}; // Object to which header attributes will be assigned during parsing

	    function list (head, tail) {
	      return [head].concat(tail);
	    }


	  peg$result = peg$parseRule(peg$startRuleIndex);

	  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
	    return peg$result;
	  } else {
	    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
	      peg$fail(peg$endExpectation());
	    }

	    throw peg$buildStructuredError(
	      peg$maxFailExpected,
	      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
	      peg$maxFailPos < input.length
	        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
	        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
	    );
	  }
	}

	module.exports = {
	  SyntaxError: peg$SyntaxError,
	  parse:       peg$parse
	};


	/***/ }),
	/* 38 */
	/***/ (function(module, exports, __webpack_require__) {
	/**
	 * @name SIP
	 * @namespace
	 */


	module.exports = function (SIP) {
	  var Modifiers;

	  function stripPayload(sdp, payload) {
	    var i;
	    var media_descs = [];
	    var current_media_desc;

	    var lines = sdp.split(/\r\n/);

	    for (i = 0; i < lines.length;) {
	      var line = lines[i];
	      if (/^m=(?:audio|video)/.test(line)) {
	        current_media_desc = {
	          index: i,
	          stripped: []
	        };
	        media_descs.push(current_media_desc);
	      } else if (current_media_desc) {
	        var rtpmap = /^a=rtpmap:(\d+) ([^/]+)\//.exec(line);
	        if (rtpmap && payload === rtpmap[2]) {
	          lines.splice(i, 1);
	          current_media_desc.stripped.push(rtpmap[1]);
	          continue; // Don't increment 'i'
	        }
	      }

	      i++;
	    }

	    for (i = 0; i < media_descs.length; i++) {
	      var mline = lines[media_descs[i].index].split(' ');

	      // Ignore the first 3 parameters of the mline. The codec information is after that
	      for (var j = 3; j < mline.length;) {
	        if (media_descs[i].stripped.indexOf(mline[j]) !== -1) {
	          mline.splice(j, 1);
	          continue;
	        }
	        j++;
	      }

	      lines[media_descs[i].index] = mline.join(' ');
	    }

	    return lines.join('\r\n');
	  }

	  Modifiers = {
	    stripTcpCandidates: function stripTcpCandidates(description) {
	      description.sdp = description.sdp.replace(/^a=candidate:\d+ \d+ tcp .*?\r\n/img, "");
	      return SIP.Utils.Promise.resolve(description);
	    },

	    stripTelephoneEvent: function stripTelephoneEvent(description) {
	      description.sdp = stripPayload(description.sdp, 'telephone-event');
	      return SIP.Utils.Promise.resolve(description);
	    },

	    cleanJitsiSdpImageattr: function cleanJitsiSdpImageattr(description) {
	      description.sdp = description.sdp.replace(/^(a=imageattr:.*?)(x|y)=\[0-/gm, "$1$2=[1:");
	      return SIP.Utils.Promise.resolve(description);
	    },

	    stripG722: function stripG722(description) {
	      description.sdp = stripPayload(description.sdp, 'G722');
	      return SIP.Utils.Promise.resolve(description);
	    },

	    stripRtpPayload: function stripRtpPayload(payload) {
	      return function (description) {
	        description.sdp = stripPayload(description.sdp, payload);
	        return SIP.Utils.Promise.resolve(description);
	      };
	    }
	  };

	  return Modifiers;
	};

	/***/ }),
	/* 39 */
	/***/ (function(module, exports, __webpack_require__) {
	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * @fileoverview Simple
	 */

	/* Simple
	 * @class Simple
	 */

	module.exports = function (SIP) {

	  var C = {
	    STATUS_NULL: 0,
	    STATUS_NEW: 1,
	    STATUS_CONNECTING: 2,
	    STATUS_CONNECTED: 3,
	    STATUS_COMPLETED: 4
	  };

	  /*
	   * @param {Object} options
	   */
	  var Simple = function Simple(options) {
	    /*
	     *  {
	     *    media: {
	     *      remote: {
	     *        audio: <DOM element>,
	     *        video: <DOM element>
	     *      },
	     *      local: {
	     *        video: <DOM element>
	     *      }
	     *    },
	     *    ua: {
	     *       <UA Configuration Options>
	     *    }
	     *  }
	     */

	    if (options.media.remote.video) {
	      this.video = true;
	    } else {
	      this.video = false;
	    }

	    if (options.media.remote.audio) {
	      this.audio = true;
	    } else {
	      this.audio = false;
	    }

	    if (!this.audio && !this.video) {
	      // Need to do at least audio or video
	      // Error
	      throw new Error('At least one remote audio or video element is required for Simple.');
	    }

	    this.options = options;

	    // https://stackoverflow.com/questions/7944460/detect-safari-browser
	    var browserUa = global.navigator.userAgent.toLowerCase();
	    var isSafari = false;
	    if (browserUa.indexOf('safari') > -1 && browserUa.indexOf('chrome') < 0) {
	      isSafari = true;
	    }
	    var sessionDescriptionHandlerFactoryOptions = {};
	    if (isSafari) {
	      sessionDescriptionHandlerFactoryOptions.modifiers = [SIP.Web.Modifiers.stripG722];
	    }

	    if (!this.options.ua.uri) {
	      this.anonymous = true;
	    }

	    this.ua = new SIP.UA({
	      // User Configurable Options
	      uri: this.options.ua.uri,
	      authorizationUser: this.options.ua.authorizationUser,
	      password: this.options.ua.password,
	      displayName: this.options.ua.displayName,
	      // Undocumented "Advanced" Options
	      userAgentString: this.options.ua.userAgentString,
	      // Fixed Options
	      register: true,
	      sessionDescriptionHandlerFactoryOptions: sessionDescriptionHandlerFactoryOptions,
	      transportOptions: { wsServers: this.options.ua.wsServers }
	    });

	    this.state = C.STATUS_NULL;

	    this.logger = this.ua.getLogger('sip.simple');

	    this.ua.on('registered', function () {
	      this.emit('registered', this.ua);
	    }.bind(this));

	    this.ua.on('unregistered', function () {
	      this.emit('unregistered', this.ua);
	    }.bind(this));

	    this.ua.on('failed', function () {
	      this.emit('unregistered', this.ua);
	    }.bind(this));

	    this.ua.on('invite', function (session) {
	      // If there is already an active session reject the incoming session
	      if (this.state !== C.STATUS_NULL && this.state !== C.STATUS_COMPLETED) {
	        this.logger.warn('Rejecting incoming call. Simple only supports 1 call at a time');
	        session.reject();
	        return;
	      }
	      this.session = session;
	      this.setupSession();
	      this.emit('ringing', this.session);
	    }.bind(this));

	    this.ua.on('message', function (message) {
	      this.emit('message', message);
	    }.bind(this));

	    return this;
	  };

	  Simple.prototype = Object.create(SIP.EventEmitter.prototype);
	  Simple.C = C;

	  // Public

	  Simple.prototype.call = function (destination) {
	    if (!this.ua || !this.checkRegistration()) {
	      this.logger.warn('A registered UA is required for calling');
	      return;
	    }
	    if (this.state !== C.STATUS_NULL && this.state !== C.STATUS_COMPLETED) {
	      this.logger.warn('Cannot make more than a single call with Simple');
	      return;
	    }
	    // Safari hack, because you cannot call .play() from a non user action
	    if (this.options.media.remote.audio) {
	      this.options.media.remote.audio.autoplay = true;
	    }
	    if (this.options.media.remote.video) {
	      this.options.media.remote.video.autoplay = true;
	    }
	    if (this.options.media.local && this.options.media.local.video) {
	      this.options.media.local.video.autoplay = true;
	      this.options.media.local.video.volume = 0;
	    }
	    this.session = this.ua.invite(destination, {
	      sessionDescriptionHandlerOptions: {
	        constraints: {
	          audio: this.audio,
	          video: this.video
	        }
	      }
	    });
	    this.setupSession();

	    return this.session;
	  };

	  Simple.prototype.answer = function () {
	    if (this.state !== C.STATUS_NEW && this.state !== C.STATUS_CONNECTING) {
	      this.logger.warn('No call to answer');
	      return;
	    }
	    // Safari hack, because you cannot call .play() from a non user action
	    if (this.options.media.remote.audio) {
	      this.options.media.remote.audio.autoplay = true;
	    }
	    if (this.options.media.remote.video) {
	      this.options.media.remote.video.autoplay = true;
	    }
	    return this.session.accept({
	      sessionDescriptionHandlerOptions: {
	        constraints: {
	          audio: this.audio,
	          video: this.video
	        }
	      }
	    });
	    // emit call is active
	  };

	  Simple.prototype.reject = function () {
	    if (this.state !== C.STATUS_NEW && this.state !== C.STATUS_CONNECTING) {
	      this.logger.warn('Call is already answered');
	      return;
	    }
	    return this.session.reject();
	  };

	  Simple.prototype.hangup = function () {
	    if (this.state !== C.STATUS_CONNECTED && this.state !== C.STATUS_CONNECTING && this.state !== C.STATUS_NEW) {
	      this.logger.warn('No active call to hang up on');
	      return;
	    }
	    if (this.state !== C.STATUS_CONNECTED) {
	      return this.session.cancel();
	    } else {
	      return this.session.bye();
	    }
	  };

	  Simple.prototype.hold = function () {
	    if (this.state !== C.STATUS_CONNECTED || this.session.local_hold) {
	      this.logger.warn('Cannot put call on hold');
	      return;
	    }
	    this.mute();
	    this.logger.log('Placing session on hold');
	    return this.session.hold();
	  };

	  Simple.prototype.unhold = function () {
	    if (this.state !== C.STATUS_CONNECTED || !this.session.local_hold) {
	      this.logger.warn('Cannot unhold a call that is not on hold');
	      return;
	    }
	    this.unmute();
	    this.logger.log('Placing call off hold');
	    return this.session.unhold();
	  };

	  Simple.prototype.mute = function () {
	    if (this.state !== C.STATUS_CONNECTED) {
	      this.logger.warn('An acitve call is required to mute audio');
	      return;
	    }
	    this.logger.log('Muting Audio');
	    this.toggleMute(true);
	    this.emit('mute', this);
	  };

	  Simple.prototype.unmute = function () {
	    if (this.state !== C.STATUS_CONNECTED) {
	      this.logger.warn('An active call is required to unmute audio');
	      return;
	    }
	    this.logger.log('Unmuting Audio');
	    this.toggleMute(false);
	    this.emit('unmute', this);
	  };

	  Simple.prototype.sendDTMF = function (tone) {
	    if (this.state !== C.STATUS_CONNECTED) {
	      this.logger.warn('An active call is required to send a DTMF tone');
	      return;
	    }
	    this.logger.log('Sending DTMF tone: ' + tone);
	    this.session.dtmf(tone);
	  };

	  Simple.prototype.message = function (destination, message) {
	    if (!this.ua || !this.checkRegistration()) {
	      this.logger.warn('A registered UA is required to send a message');
	      return;
	    }
	    if (!destination || !message) {
	      this.logger.warn('A destination and message are required to send a message');
	      return;
	    }
	    this.ua.message(destination, message);
	  };

	  // Private Helpers

	  Simple.prototype.checkRegistration = function () {
	    return this.anonymous || this.ua && this.ua.isRegistered();
	  };

	  Simple.prototype.setupRemoteMedia = function () {
	    // If there is a video track, it will attach the video and audio to the same element
	    var pc = this.session.sessionDescriptionHandler.peerConnection;
	    var remoteStream;

	    if (pc.getReceivers) {
	      remoteStream = new global.window.MediaStream();
	      pc.getReceivers().forEach(function (receiver) {
	        var track = receiver.track;
	        if (track) {
	          remoteStream.addTrack(track);
	        }
	      });
	    } else {
	      remoteStream = pc.getRemoteStreams()[0];
	    }
	    if (this.video) {
	      this.options.media.remote.video.srcObject = remoteStream;
	      this.options.media.remote.video.play().catch(function () {
	        this.logger.log('play was rejected');
	      }.bind(this));
	    } else if (this.audio) {
	      this.options.media.remote.audio.srcObject = remoteStream;
	      this.options.media.remote.audio.play().catch(function () {
	        this.logger.log('play was rejected');
	      }.bind(this));
	    }
	  };

	  Simple.prototype.setupLocalMedia = function () {
	    if (this.video && this.options.media.local && this.options.media.local.video) {
	      var pc = this.session.sessionDescriptionHandler.peerConnection;
	      var localStream;
	      if (pc.getSenders) {
	        localStream = new global.window.MediaStream();
	        pc.getSenders().forEach(function (sender) {
	          var track = sender.track;
	          if (track && track.kind === 'video') {
	            localStream.addTrack(track);
	          }
	        });
	      } else {
	        localStream = pc.getLocalStreams()[0];
	      }
	      this.options.media.local.video.srcObject = localStream;
	      this.options.media.local.video.volume = 0;
	      this.options.media.local.video.play();
	    }
	  };

	  Simple.prototype.cleanupMedia = function () {
	    if (this.video) {
	      this.options.media.remote.video.srcObject = null;
	      this.options.media.remote.video.pause();
	      if (this.options.media.local && this.options.media.local.video) {
	        this.options.media.local.video.srcObject = null;
	        this.options.media.local.video.pause();
	      }
	    }
	    if (this.audio) {
	      this.options.media.remote.audio.srcObject = null;
	      this.options.media.remote.audio.pause();
	    }
	  };

	  Simple.prototype.setupSession = function () {
	    this.state = C.STATUS_NEW;
	    this.emit('new', this.session);

	    this.session.on('progress', this.onProgress.bind(this));
	    this.session.on('accepted', this.onAccepted.bind(this));
	    this.session.on('rejected', this.onEnded.bind(this));
	    this.session.on('failed', this.onFailed.bind(this));
	    this.session.on('terminated', this.onEnded.bind(this));
	  };

	  Simple.prototype.destroyMedia = function () {
	    this.session.sessionDescriptionHandler.close();
	  };

	  Simple.prototype.toggleMute = function (mute) {
	    var pc = this.session.sessionDescriptionHandler.peerConnection;
	    if (pc.getSenders) {
	      pc.getSenders().forEach(function (sender) {
	        if (sender.track) {
	          sender.track.enabled = !mute;
	        }
	      });
	    } else {
	      pc.getLocalStreams().forEach(function (stream) {
	        stream.getAudioTracks().forEach(function (track) {
	          track.enabled = !mute;
	        });
	        stream.getVideoTracks().forEach(function (track) {
	          track.enabled = !mute;
	        });
	      });
	    }
	  };

	  Simple.prototype.onAccepted = function () {
	    this.state = C.STATUS_CONNECTED;
	    this.emit('connected', this.session);

	    this.setupLocalMedia();
	    this.setupRemoteMedia();
	    this.session.sessionDescriptionHandler.on('addTrack', function () {
	      this.logger.log('A track has been added, triggering new remoteMedia setup');
	      this.setupRemoteMedia();
	    }.bind(this));

	    this.session.sessionDescriptionHandler.on('addStream', function () {
	      this.logger.log('A stream has been added, trigger new remoteMedia setup');
	      this.setupRemoteMedia();
	    }.bind(this));

	    this.session.on('hold', function () {
	      this.emit('hold', this.session);
	    }.bind(this));
	    this.session.on('unhold', function () {
	      this.emit('unhold', this.session);
	    }.bind(this));
	    this.session.on('dtmf', function (tone) {
	      this.emit('dtmf', tone);
	    }.bind(this));
	    this.session.on('bye', this.onEnded.bind(this));
	  };

	  Simple.prototype.onProgress = function () {
	    this.state = C.STATUS_CONNECTING;
	    this.emit('connecting', this.session);
	  };

	  Simple.prototype.onFailed = function () {
	    this.onEnded();
	  };

	  Simple.prototype.onEnded = function () {
	    this.state = C.STATUS_COMPLETED;
	    this.emit('ended', this.session);
	    this.cleanupMedia();
	  };

	  return Simple;
	};
	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(28)));

	/***/ }),
	/* 40 */
	/***/ (function(module, exports, __webpack_require__) {
	/* WEBPACK VAR INJECTION */(function(global) {

	var toplevel = global.window || global;

	function getPrefixedProperty(object, name) {
	  if (object == null) {
	    return;
	  }
	  var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
	  var prefixedNames = [name, 'webkit' + capitalizedName, 'moz' + capitalizedName];
	  for (var i in prefixedNames) {
	    var property = object[prefixedNames[i]];
	    if (property) {
	      return property.bind(object);
	    }
	  }
	}

	module.exports = {
	  WebSocket: toplevel.WebSocket,
	  Transport: __webpack_require__(10),
	  open: toplevel.open,
	  Promise: toplevel.Promise,
	  timers: toplevel,

	  // Console is not defined in ECMAScript, so just in case...
	  console: toplevel.console || {
	    debug: function debug() {},
	    log: function log() {},
	    warn: function warn() {},
	    error: function error() {}
	  },

	  addEventListener: getPrefixedProperty(toplevel, 'addEventListener'),
	  removeEventListener: getPrefixedProperty(toplevel, 'removeEventListener')
	};
	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(28)));

	/***/ })
	/******/ ]);
	});
	});

	var SIP = unwrapExports(sip0_11_1);

	/**
	 * @fileoverview SessionDescriptionHandlerObserver
	 */

	 /* SessionDescriptionHandlerObserver
	  * @class SessionDescriptionHandler Observer Class.
	  * @param {SIP.Session} session
	  * @param {Object} [options]
	  */

	// Constructor
	var SessionDescriptionHandlerObserver = function(session, options) {
	  this.session = session || {};
	  this.options = options || {};
	};

	SessionDescriptionHandlerObserver.prototype = {
	  trackAdded: function() {
	    this.session.emit('trackAdded');
	  },

	  directionChanged: function() {
	    this.session.emit('directionChanged');
	  },
	};

	var SessionDescriptionHandlerObserver_1 = SessionDescriptionHandlerObserver;

	/**
	 * @fileoverview SessionDescriptionHandler
	 */

	 /* SessionDescriptionHandler
	  * @class PeerConnection helper Class.
	  * @param {SIP.Session} session
	  * @param {Object} [options]
	  */
	var SessionDescriptionHandler = function (SIP) {

	// Constructor
	var SessionDescriptionHandler = function(logger, observer, options) {
	  // TODO: Validate the options
	  this.options = options || {};

	  this.logger = logger;
	  this.observer = observer;
	  this.dtmfSender = null;

	  this.shouldAcquireMedia = true;

	  this.CONTENT_TYPE = 'application/sdp';

	  this.C = {};
	  this.C.DIRECTION = {
	    NULL:     null,
	    SENDRECV: "sendrecv",
	    SENDONLY: "sendonly",
	    RECVONLY: "recvonly",
	    INACTIVE: "inactive"
	  };

	  this.logger.log('SessionDescriptionHandlerOptions: ' + JSON.stringify(this.options));

	  this.direction = this.C.DIRECTION.NULL;

	  this.modifiers = this.options.modifiers || [];
	  if (!Array.isArray(this.modifiers)) {
	    this.modifiers = [this.modifiers];
	  }

	  var environment = commonjsGlobal.window || commonjsGlobal;
	  this.WebRTC = {
	    MediaStream           : environment.MediaStream,
	    getUserMedia          : environment.navigator.mediaDevices.getUserMedia.bind(environment.navigator.mediaDevices),
	    RTCPeerConnection     : environment.RTCPeerConnection,
	    RTCSessionDescription : environment.RTCSessionDescription
	  };

	  this.iceGatheringDeferred = null;
	  this.iceGatheringTimeout = false;
	  this.iceGatheringTimer = null;

	  this.initPeerConnection(this.options.peerConnectionOptions);

	  this.constraints = this.checkAndDefaultConstraints(this.options.constraints);
	};

	/**
	 * @param {SIP.Session} session
	 * @param {Object} [options]
	 */

	SessionDescriptionHandler.defaultFactory = function defaultFactory (session, options) {
	  var logger = session.ua.getLogger('sip.invitecontext.sessionDescriptionHandler', session.id);
	  var SessionDescriptionHandlerObserver = SessionDescriptionHandlerObserver_1;
	  var observer = new SessionDescriptionHandlerObserver(session, options);
	  return new SessionDescriptionHandler(logger, observer, options);
	};

	SessionDescriptionHandler.prototype = Object.create(SIP.SessionDescriptionHandler.prototype, {
	  // Functions the sesssion can use

	  /**
	   * Destructor
	   */
	  close: {writable: true, value: function () {
	    this.logger.log('closing PeerConnection');
	    // have to check signalingState since this.close() gets called multiple times
	    if(this.peerConnection && this.peerConnection.signalingState !== 'closed') {
	      if (this.peerConnection.getSenders) {
	        this.peerConnection.getSenders().forEach(function(sender) {
	          if (sender.track) {
	            sender.track.stop();
	          }
	        });
	      } else {
	        this.logger.warn('Using getLocalStreams which is deprecated');
	        this.peerConnection.getLocalStreams().forEach(function(stream) {
	          stream.getTracks().forEach(function(track) {
	            track.stop();
	          });
	        });
	      }
	      if (this.peerConnection.getReceivers) {
	        this.peerConnection.getReceivers().forEach(function(receiver) {
	          if (receiver.track) {
	            receiver.track.stop();
	          }
	        });
	      } else {
	        this.logger.warn('Using getRemoteStreams which is deprecated');
	        this.peerConnection.getRemoteStreams().forEach(function(stream) {
	          stream.getTracks().forEach(function(track) {
	            track.stop();
	          });
	        });
	      }
	      this.resetIceGatheringComplete();
	      this.peerConnection.close();
	    }
	  }},

	  /**
	   * Gets the local description from the underlying media implementation
	   * @param {Object} [options] Options object to be used by getDescription
	   * @param {MediaStreamConstraints} [options.constraints] MediaStreamConstraints https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints
	   * @param {Object} [options.peerConnectionOptions] If this is set it will recreate the peer connection with the new options
	   * @param {Array} [modifiers] Array with one time use description modifiers
	   * @returns {Promise} Promise that resolves with the local description to be used for the session
	   */
	  getDescription: {writable: true, value: function (options, modifiers) {
	    options = options || {};
	    if (options.peerConnectionOptions) {
	      this.initPeerConnection(options.peerConnectionOptions);
	    }

	    // Merge passed constraints with saved constraints and save
	    var newConstraints = Object.assign({}, this.constraints, options.constraints);
	    newConstraints = this.checkAndDefaultConstraints(newConstraints);
	    if (JSON.stringify(newConstraints) !== JSON.stringify(this.constraints)) {
	        this.constraints = newConstraints;
	        this.shouldAcquireMedia = true;
	    }

	    modifiers = modifiers || [];
	    if (!Array.isArray(modifiers)) {
	      modifiers = [modifiers];
	    }
	    modifiers = modifiers.concat(this.modifiers);

	    return SIP.Utils.Promise.resolve()
	    .then(function() {
	      if (this.shouldAcquireMedia) {
	        return this.acquire(this.constraints).then(function() {
	          this.shouldAcquireMedia = false;
	        }.bind(this));
	      }
	    }.bind(this))
	    .then(function() {
	      return this.createOfferOrAnswer(options.RTCOfferOptions, modifiers);
	    }.bind(this))
	    .then(function(sdp) {
	      return {
	        body: sdp,
	        contentType: this.CONTENT_TYPE
	      };
	    }.bind(this));
	  }},

	  /**
	   * Check if the Session Description Handler can handle the Content-Type described by a SIP Message
	   * @param {String} contentType The content type that is in the SIP Message
	   * @returns {boolean}
	   */
	  hasDescription: {writable: true, value: function hasDescription (contentType) {
	    return contentType === this.CONTENT_TYPE;
	  }},

	  /**
	   * The modifier that should be used when the session would like to place the call on hold
	   * @param {String} [sdp] The description that will be modified
	   * @returns {Promise} Promise that resolves with modified SDP
	   */
	  holdModifier: {writable: true, value: function holdModifier (description) {
	    if (!(/a=(sendrecv|sendonly|recvonly|inactive)/).test(description.sdp)) {
	      description.sdp = description.sdp.replace(/(m=[^\r]*\r\n)/g, '$1a=sendonly\r\n');
	    } else {
	      description.sdp = description.sdp.replace(/a=sendrecv\r\n/g, 'a=sendonly\r\n');
	      description.sdp = description.sdp.replace(/a=recvonly\r\n/g, 'a=inactive\r\n');
	    }
	    return SIP.Utils.Promise.resolve(description);
	  }},

	  /**
	   * Set the remote description to the underlying media implementation
	   * @param {String} sessionDescription The description provided by a SIP message to be set on the media implementation
	   * @param {Object} [options] Options object to be used by getDescription
	   * @param {MediaStreamConstraints} [options.constraints] MediaStreamConstraints https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints
	   * @param {Object} [options.peerConnectionOptions] If this is set it will recreate the peer connection with the new options
	   * @param {Array} [modifiers] Array with one time use description modifiers
	   * @returns {Promise} Promise that resolves once the description is set
	   */
	  setDescription: {writable:true, value: function setDescription (sessionDescription, options, modifiers) {
	    var self = this;

	    options = options || {};
	    if (options.peerConnectionOptions) {
	      this.initPeerConnection(options.peerConnectionOptions);
	    }

	    modifiers = modifiers || [];
	    if (!Array.isArray(modifiers)) {
	      modifiers = [modifiers];
	    }
	    modifiers = modifiers.concat(this.modifiers);

	    var description = {
	      type: this.hasOffer('local') ? 'answer' : 'offer',
	      sdp: sessionDescription
	    };

	    return SIP.Utils.Promise.resolve()
	    .then(function() {
	      if (this.shouldAcquireMedia) {
	        return this.acquire(this.constrains).then(function() {
	          this.shouldAcquireMedia = false;
	        }.bind(this));
	      }
	    }.bind(this))
	    .then(function() {
	      return SIP.Utils.reducePromises(modifiers, description);
	    })
	    .catch(function modifierError(e) {
	      self.logger.error("The modifiers did not resolve successfully");
	      self.logger.error(e);
	      throw e;
	    })
	    .then(function(modifiedDescription) {
	      self.emit('setDescription', modifiedDescription);
	      return self.peerConnection.setRemoteDescription(new self.WebRTC.RTCSessionDescription(modifiedDescription));
	    })
	    .catch(function setRemoteDescriptionError(e) {
	      self.logger.error(e);
	      self.emit('peerConnection-setRemoteDescriptionFailed', e);
	      throw e;
	    })
	    .then(function setRemoteDescriptionSuccess() {
	      if (self.peerConnection.getReceivers) {
	        self.emit('setRemoteDescription', self.peerConnection.getReceivers());
	      } else {
	        self.emit('setRemoteDescription', self.peerConnection.getRemoteStreams());
	      }
	      self.emit('confirmed', self);
	    });
	  }},

	  /**
	   * Send DTMF via RTP (RFC 4733)
	   * @param {String} tones A string containing DTMF digits
	   * @param {Object} [options] Options object to be used by sendDtmf
	   * @returns {boolean} true if DTMF send is successful, false otherwise
	   */
	  sendDtmf: {writable: true, value: function sendDtmf (tones, options) {
	    if (!this.dtmfSender && this.hasBrowserGetSenderSupport()) {
	      var senders = this.peerConnection.getSenders();
	      if (senders.length > 0) {
	        this.dtmfSender = senders[0].dtmf;
	      }
	    }
	    if (!this.dtmfSender && this.hasBrowserTrackSupport()) {
	      var streams = this.peerConnection.getLocalStreams();
	      if (streams.length > 0) {
	        var audioTracks = streams[0].getAudioTracks();
	        if (audioTracks.length > 0) {
	          this.dtmfSender = this.peerConnection.createDTMFSender(audioTracks[0]);
	        }
	      }
	    }
	    if (!this.dtmfSender) {
	      return false;
	    }
	    try {
	      this.dtmfSender.insertDTMF(tones, options.duration, options.interToneGap);
	    }
	    catch (e) {
	      if (e.type ===  "InvalidStateError" || e.type ===  "InvalidCharacterError") {
	        this.logger.error(e);
	        return false;
	      } else {
	        throw e;
	      }
	    }
	    this.logger.log('DTMF sent via RTP: ' + tones.toString());
	    return true;
	  }},

	  getDirection: {writable: true, value: function getDirection() {
	    return this.direction;
	  }},

	  // Internal functions
	  createOfferOrAnswer: {writable: true, value: function createOfferOrAnswer (RTCOfferOptions, modifiers) {
	    var self = this;
	    var methodName;
	    var pc = this.peerConnection;

	    RTCOfferOptions = RTCOfferOptions || {};

	    methodName = self.hasOffer('remote') ? 'createAnswer' : 'createOffer';

	    return pc[methodName](RTCOfferOptions)
	      .catch(function methodError(e) {
	        self.emit('peerConnection-' + methodName + 'Failed', e);
	        throw e;
	      })
	      .then(function(sdp) {
	        return SIP.Utils.reducePromises(modifiers, self.createRTCSessionDescriptionInit(sdp));
	      })
	      .then(function(sdp) {
	        self.resetIceGatheringComplete();
	        return pc.setLocalDescription(sdp);
	      })
	      .catch(function localDescError(e) {
	        self.emit('peerConnection-SetLocalDescriptionFailed', e);
	        throw e;
	      })
	      .then(function onSetLocalDescriptionSuccess() {
	        return self.waitForIceGatheringComplete();
	      })
	      .then(function readySuccess() {
	        var localDescription = self.createRTCSessionDescriptionInit(self.peerConnection.localDescription);
	        return SIP.Utils.reducePromises(modifiers, localDescription);
	      })
	      .then(function(localDescription) {
	        self.emit('getDescription', localDescription);
	        self.setDirection(localDescription.sdp);
	        return localDescription.sdp;
	      })
	      .catch(function createOfferOrAnswerError (e) {
	        self.logger.error(e);
	        // TODO: Not sure if this is correct
	        throw new SIP.Exceptions.GetDescriptionError(e);
	      });
	  }},

	  // Creates an RTCSessionDescriptionInit from an RTCSessionDescription
	  createRTCSessionDescriptionInit: {writable: true, value: function createRTCSessionDescriptionInit(RTCSessionDescription) {
	    return {
	      type: RTCSessionDescription.type,
	      sdp: RTCSessionDescription.sdp
	    };
	  }},

	  addDefaultIceCheckingTimeout: {writable: true, value: function addDefaultIceCheckingTimeout (peerConnectionOptions) {
	    if (peerConnectionOptions.iceCheckingTimeout === undefined) {
	      peerConnectionOptions.iceCheckingTimeout = 5000;
	    }
	    return peerConnectionOptions;
	  }},

	  addDefaultIceServers: {writable: true, value: function addDefaultIceServers (rtcConfiguration) {
	    if (!rtcConfiguration.iceServers) {
	      rtcConfiguration.iceServers = [{urls: 'stun:stun.l.google.com:19302'}];
	    }
	    return rtcConfiguration;
	  }},

	  checkAndDefaultConstraints: {writable: true, value: function checkAndDefaultConstraints (constraints) {
	    var defaultConstraints = {audio: true, video: true};
	    constraints = constraints || defaultConstraints;
	    // Empty object check
	    if (Object.keys(constraints).length === 0 && constraints.constructor === Object) {
	      return defaultConstraints;
	    }
	    return constraints;
	  }},

	  hasBrowserTrackSupport: {writable: true, value: function hasBrowserTrackSupport () {
	    return Boolean(this.peerConnection.addTrack);
	  }},

	  hasBrowserGetSenderSupport: {writable: true, value: function hasBrowserGetSenderSupport () {
	    return Boolean(this.peerConnection.getSenders);
	  }},

	  initPeerConnection: {writable: true, value: function initPeerConnection(options) {
	    var self = this;
	    options = options || {};
	    options = this.addDefaultIceCheckingTimeout(options);
	    options.rtcConfiguration = options.rtcConfiguration || {};
	    options.rtcConfiguration = this.addDefaultIceServers(options.rtcConfiguration);

	    this.logger.log('initPeerConnection');

	    if (this.peerConnection) {
	      this.logger.log('Already have a peer connection for this session. Tearing down.');
	      this.resetIceGatheringComplete();
	      this.peerConnection.close();
	    }

	    this.peerConnection = new this.WebRTC.RTCPeerConnection(options.rtcConfiguration);

	    this.logger.log('New peer connection created');

	    if ('ontrack' in this.peerConnection) {
	      this.peerConnection.addEventListener('track', function(e) {
	        self.logger.log('track added');
	        self.observer.trackAdded();
	        self.emit('addTrack', e);
	      });
	    } else {
	      this.logger.warn('Using onaddstream which is deprecated');
	      this.peerConnection.onaddstream = function(e) {
	        self.logger.log('stream added');
	        self.emit('addStream', e);
	      };
	    }

	    this.peerConnection.onicecandidate = function(e) {
	      self.emit('iceCandidate', e);
	      if (e.candidate) {
	        self.logger.log('ICE candidate received: '+ (e.candidate.candidate === null ? null : e.candidate.candidate.trim()));
	      }
	    };

	    this.peerConnection.onicegatheringstatechange = function () {
	      self.logger.log('RTCIceGatheringState changed: ' + this.iceGatheringState);
	      switch (this.iceGatheringState) {
	      case 'gathering':
	        self.emit('iceGathering', this);
	        if (!self.iceGatheringTimer && options.iceCheckingTimeout) {
	          self.iceGatheringTimeout = false;
	          self.iceGatheringTimer = SIP.Timers.setTimeout(function() {
	            self.logger.log('RTCIceChecking Timeout Triggered after ' + options.iceCheckingTimeout + ' milliseconds');
	            self.iceGatheringTimeout = true;
	            self.triggerIceGatheringComplete();
	          }, options.iceCheckingTimeout);
	        }
	        break;
	      case 'complete':
	        self.triggerIceGatheringComplete();
	        break;
	      }
	    };

	    this.peerConnection.oniceconnectionstatechange = function() {  //need e for commented out case
	      var stateEvent;

	      switch (this.iceConnectionState) {
	      case 'new':
	        stateEvent = 'iceConnection';
	        break;
	      case 'checking':
	        stateEvent = 'iceConnectionChecking';
	        break;
	      case 'connected':
	        stateEvent = 'iceConnectionConnected';
	        break;
	      case 'completed':
	        stateEvent = 'iceConnectionCompleted';
	        break;
	      case 'failed':
	        stateEvent = 'iceConnectionFailed';
	        break;
	      case 'disconnected':
	        stateEvent = 'iceConnectionDisconnected';
	        break;
	      case 'closed':
	        stateEvent = 'iceConnectionClosed';
	        break;
	      default:
	        self.logger.warn('Unknown iceConnection state:', this.iceConnectionState);
	        return;
	      }
	      self.emit(stateEvent, this);
	    };
	  }},

	  acquire: {writable: true, value: function acquire (constraints) {
	    // Default audio & video to true
	    constraints = this.checkAndDefaultConstraints(constraints);

	    return new SIP.Utils.Promise(function(resolve, reject) {
	      /*
	       * Make the call asynchronous, so that ICCs have a chance
	       * to define callbacks to `userMediaRequest`
	       */
	      this.logger.log('acquiring local media');
	      this.emit('userMediaRequest', constraints);

	      if (constraints.audio || constraints.video) {
	        this.WebRTC.getUserMedia(constraints)
	        .then(function(streams) {
	          this.observer.trackAdded();
	          this.emit('userMedia', streams);
	          resolve(streams);
	        }.bind(this)).catch(function(e) {
	          this.emit('userMediaFailed', e);
	          reject(e);
	        }.bind(this));
	      } else {
	        // Local streams were explicitly excluded.
	        resolve([]);
	      }
	    }.bind(this))
	    .catch(function acquireFailed(err) {
	      this.logger.error('unable to acquire streams');
	      this.logger.error(err);
	      return SIP.Utils.Promise.reject(err);
	    }.bind(this))
	    .then(function acquireSucceeded(streams) {
	      this.logger.log('acquired local media streams');
	      try {
	        // Remove old tracks
	        if (this.peerConnection.removeTrack) {
	          this.peerConnection.getSenders().forEach(function (sender) {
	            this.peerConnection.removeTrack(sender);
	          });
	        }
	        return streams;
	      } catch(e) {
	        return SIP.Utils.Promise.reject(e);
	      }
	    }.bind(this))
	    .catch(function removeStreamsFailed(err) {
	      this.logger.error('error removing streams');
	      this.logger.error(err);
	      return SIP.Utils.Promise.reject(err);
	    }.bind(this))
	    .then(function addStreams(streams) {
	      try {
	        streams = [].concat(streams);
	        streams.forEach(function (stream) {
	          if (this.peerConnection.addTrack) {
	            stream.getTracks().forEach(function (track) {
	              this.peerConnection.addTrack(track, stream);
	            }, this);
	          } else {
	            // Chrome 59 does not support addTrack
	            this.peerConnection.addStream(stream);
	          }
	        }, this);
	      } catch(e) {
	        return SIP.Utils.Promise.reject(e);
	      }
	      return SIP.Utils.Promise.resolve();
	    }.bind(this))
	    .catch(function addStreamsFailed(err) {
	      this.logger.error('error adding stream');
	      this.logger.error(err);
	      return SIP.Utils.Promise.reject(err);
	    }.bind(this));
	  }},

	  hasOffer: {writable: true, value: function hasOffer (where) {
	    var offerState = 'have-' + where + '-offer';
	    return this.peerConnection.signalingState === offerState;
	  }},

	  // ICE gathering state handling

	  isIceGatheringComplete: {writable: true, value: function isIceGatheringComplete() {
	    return this.peerConnection.iceGatheringState === 'complete' || this.iceGatheringTimeout;
	  }},

	  resetIceGatheringComplete: {writable: true, value: function resetIceGatheringComplete() {
	    this.iceGatheringTimeout = false;

	    if (this.iceGatheringTimer) {
	      SIP.Timers.clearTimeout(this.iceGatheringTimer);
	      this.iceGatheringTimer = null;
	    }

	    if (this.iceGatheringDeferred) {
	      this.iceGatheringDeferred.reject();
	      this.iceGatheringDeferred = null;
	    }
	  }},

	  setDirection: {writable: true, value: function setDirection(sdp) {
	    var match = sdp.match(/a=(sendrecv|sendonly|recvonly|inactive)/);
	    if (match === null) {
	      this.direction = this.C.DIRECTION.NULL;
	      this.observer.directionChanged();
	      return;
	    }
	    var direction = match[1];
	    switch (direction) {
	      case this.C.DIRECTION.SENDRECV:
	      case this.C.DIRECTION.SENDONLY:
	      case this.C.DIRECTION.RECVONLY:
	      case this.C.DIRECTION.INACTIVE:
	        this.direction = direction;
	        break;
	      default:
	        this.direction = this.C.DIRECTION.NULL;
	        break;
	    }
	    this.observer.directionChanged();
	  }},

	  triggerIceGatheringComplete: {writable: true, value: function triggerIceGatheringComplete() {
	    if (this.isIceGatheringComplete()) {
	      this.emit('iceGatheringComplete', this);

	      if (this.iceGatheringTimer) {
	        SIP.Timers.clearTimeout(this.iceGatheringTimer);
	        this.iceGatheringTimer = null;
	      }

	      if (this.iceGatheringDeferred) {
	        this.iceGatheringDeferred.resolve();
	        this.iceGatheringDeferred = null;
	      }
	    }
	  }},

	  waitForIceGatheringComplete: {writable: true, value: function waitForIceGatheringComplete() {
	    if (this.isIceGatheringComplete()) {
	      return SIP.Utils.Promise.resolve();
	    } else if (!this.isIceGatheringDeferred) {
	      this.iceGatheringDeferred = SIP.Utils.defer();
	    }
	    return this.iceGatheringDeferred.promise;
	  }}
	});

	return SessionDescriptionHandler;
	};

	//      

	class CallbacksHandler {
	                    

	  constructor() {
	    this.callbacks = {};
	  }

	  on(event        , callback          ) {
	    this.callbacks[event] = callback;
	  }

	  // trigger callback registered with .on('name', ...)
	  triggerCallback(eventName        , ...args            ) {
	    // Add event name at last argument, so we can know the event name if we do on('*', ...)
	    args.push(eventName);

	    if (this.callbacks['*']) {
	      this.callbacks['*'].apply(undefined, args);
	    }

	    if (!(eventName in this.callbacks)) {
	      return null;
	    }

	    return this.callbacks[eventName].apply(undefined, args);
	  }
	}

	/* eslint-disable */

	/* SessionDescriptionHandler
	 * @class PeerConnection helper Class.
	 * @param {SIP.Session} session
	 * @param {Object} [options]
	 */
	var MobileSessionDescriptionHandler = SIP => {
	  // Constructor
	  function MobileSessionDescriptionHandler(logger, observer, options) {
	    // TODO: Validate the options
	    this.options = options || {};

	    this.logger = logger;
	    this.observer = observer;
	    this.dtmfSender = null;

	    this.shouldAcquireMedia = true;

	    this.CONTENT_TYPE = 'application/sdp';

	    this.C = {};
	    this.C.DIRECTION = {
	      NULL: null,
	      SENDRECV: 'sendrecv',
	      SENDONLY: 'sendonly',
	      RECVONLY: 'recvonly',
	      INACTIVE: 'inactive'
	    };

	    this.logger.log(`SessionDescriptionHandlerOptions: ${JSON.stringify(this.options)}`);

	    this.direction = this.C.DIRECTION.NULL;

	    this.modifiers = this.options.modifiers || [];
	    if (!Array.isArray(this.modifiers)) {
	      this.modifiers = [this.modifiers];
	    }

	    const environment = global.window || global;
	    this.WebRTC = {
	      MediaStream: environment.MediaStream,
	      getUserMedia: environment.navigator.mediaDevices.getUserMedia.bind(environment.navigator.mediaDevices),
	      RTCPeerConnection: environment.RTCPeerConnection,
	      RTCSessionDescription: environment.RTCSessionDescription
	    };

	    this.iceGatheringDeferred = null;
	    this.iceGatheringTimeout = false;
	    this.iceGatheringTimer = null;

	    this.initPeerConnection(this.options.peerConnectionOptions);

	    this.constraints = this.checkAndDefaultConstraints(this.options.constraints);
	  }

	  /**
	   * @param {SIP.Session} session
	   * @param {Object} [options]
	   */

	  MobileSessionDescriptionHandler.defaultFactory = function defaultFactory(session, options) {
	    const logger = session.ua.getLogger('sip.invitecontext.sessionDescriptionHandler', session.id);
	    const observer = new SessionDescriptionHandlerObserver_1(session, options);

	    return new MobileSessionDescriptionHandler(logger, observer, options);
	  };

	  MobileSessionDescriptionHandler.prototype = Object.create(SessionDescriptionHandler(SIP).prototype, {
	    // Functions the sesssion can use

	    /**
	     * Destructor
	     */
	    close: {
	      writable: true,
	      value: function() {
	        this.logger.log('closing PeerConnection');
	        // have to check signalingState since this.close() gets called multiple times
	        if (this.peerConnection && this.peerConnection.signalingState !== 'closed') {
	          if (this.peerConnection.getSenders) {
	            this.peerConnection.getSenders().forEach(function(sender) {
	              if (sender.track) {
	                sender.track.stop();
	              }
	            });
	          } else {
	            this.logger.warn('Using getLocalStreams which is deprecated');
	            this.peerConnection.getLocalStreams().forEach(function(stream) {
	              stream.getTracks().forEach(function(track) {
	                track.stop();
	              });
	            });
	          }
	          if (this.peerConnection.getReceivers) {
	            this.peerConnection.getReceivers().forEach(function(receiver) {
	              if (receiver.track) {
	                receiver.track.stop();
	              }
	            });
	          } else {
	            this.logger.warn('Using getRemoteStreams which is deprecated');
	            this.peerConnection.getRemoteStreams().forEach(function(stream) {
	              stream.getTracks().forEach(function(track) {
	                track.stop();
	              });
	            });
	          }
	          this.resetIceGatheringComplete();
	          this.peerConnection.close();
	        }
	      }
	    },

	    /**
	     * Gets the local description from the underlying media implementation
	     * @param {Object} [options] Options object to be used by getDescription
	     * @param {MediaStreamConstraints} [options.constraints] MediaStreamConstraints https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints
	     * @param {Object} [options.peerConnectionOptions] If this is set it will recreate the peer connection with the new options
	     * @param {Array} [modifiers] Array with one time use description modifiers
	     * @returns {Promise} Promise that resolves with the local description to be used for the session
	     */
	    getDescription: {
	      writable: true,
	      value: function(options, modifiers) {
	        options = options || {};
	        if (options.peerConnectionOptions) {
	          this.initPeerConnection(options.peerConnectionOptions);
	        }

	        // Merge passed constraints with saved constraints and save
	        var newConstraints = Object.assign({}, this.constraints, options.constraints);
	        newConstraints = this.checkAndDefaultConstraints(newConstraints);

	        modifiers = modifiers || [];
	        if (!Array.isArray(modifiers)) {
	          modifiers = [modifiers];
	        }
	        modifiers = modifiers.concat(this.modifiers);

	        return SIP.Utils.Promise.resolve()
	          .then(
	            function() {
	              if (this.shouldAcquireMedia) {
	                return this.acquire(this.constraints).then(
	                  function() {
	                    this.shouldAcquireMedia = false;
	                  }.bind(this)
	                );
	              }
	            }.bind(this)
	          )
	          .then(
	            function() {
	              return this.createOfferOrAnswer(options.RTCOfferOptions, modifiers);
	            }.bind(this)
	          )
	          .then(
	            function(sdp) {
	              return {
	                body: sdp,
	                contentType: this.CONTENT_TYPE
	              };
	            }.bind(this)
	          );
	      }
	    },

	    /**
	     * Check if the Session Description Handler can handle the Content-Type described by a SIP Message
	     * @param {String} contentType The content type that is in the SIP Message
	     * @returns {boolean}
	     */
	    hasDescription: {
	      writable: true,
	      value: function hasDescription(contentType) {
	        return contentType === this.CONTENT_TYPE;
	      }
	    },

	    /**
	     * The modifier that should be used when the session would like to place the call on hold
	     * @param {String} [sdp] The description that will be modified
	     * @returns {Promise} Promise that resolves with modified SDP
	     */
	    holdModifier: {
	      writable: true,
	      value: function holdModifier(description) {
	        if (!/a=(sendrecv|sendonly|recvonly|inactive)/.test(description.sdp)) {
	          description.sdp = description.sdp.replace(/(m=[^\r]*\r\n)/g, '$1a=sendonly\r\n');
	        } else {
	          description.sdp = description.sdp.replace(/a=sendrecv\r\n/g, 'a=sendonly\r\n');
	          description.sdp = description.sdp.replace(/a=recvonly\r\n/g, 'a=inactive\r\n');
	        }
	        return SIP.Utils.Promise.resolve(description);
	      }
	    },

	    /**
	     * Set the remote description to the underlying media implementation
	     * @param {String} sessionDescription The description provided by a SIP message to be set on the media implementation
	     * @param {Object} [options] Options object to be used by getDescription
	     * @param {MediaStreamConstraints} [options.constraints] MediaStreamConstraints https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints
	     * @param {Object} [options.peerConnectionOptions] If this is set it will recreate the peer connection with the new options
	     * @param {Array} [modifiers] Array with one time use description modifiers
	     * @returns {Promise} Promise that resolves once the description is set
	     */
	    setDescription: {
	      writable: true,
	      value: function setDescription(sessionDescription, options, modifiers) {
	        var self = this;
	        const type = this.hasOffer('local') ? 'answer' : 'offer';

	        options = options || {};
	        if (options.peerConnectionOptions) {
	          this.initPeerConnection(options.peerConnectionOptions);
	        }

	        modifiers = modifiers || [];
	        if (!Array.isArray(modifiers)) {
	          modifiers = [modifiers];
	        }
	        modifiers = modifiers.concat(this.modifiers);

	        // Fix to allow incoming calls in iOS devices
	        // @see https://github.com/oney/react-native-webrtc/issues/293
	        if (sessionDescription.indexOf('BUNDLE audio') === -1 && type === 'offer') {
	          sessionDescription = sessionDescription.replace('\r\nm=audio', '\r\na=group:BUNDLE audio\r\nm=audio');
	        }

	        var description = {
	          type,
	          sdp: sessionDescription
	        };

	        return SIP.Utils.Promise.resolve()
	          .then(
	            function() {
	              if (this.shouldAcquireMedia) {
	                return this.acquire(this.constraints).then(
	                  function() {
	                    this.shouldAcquireMedia = false;
	                  }.bind(this)
	                );
	              }
	            }.bind(this)
	          )
	          .then(function() {
	            return SIP.Utils.reducePromises(modifiers, description);
	          })
	          .catch(function modifierError(e) {
	            self.logger.error('The modifiers did not resolve successfully');
	            self.logger.error(e);
	            throw e;
	          })
	          .then(function(modifiedDescription) {
	            self.emit('setDescription', description);
	            return self.peerConnection.setRemoteDescription(new self.WebRTC.RTCSessionDescription(modifiedDescription));
	          })
	          .catch(function setRemoteDescriptionError(e) {
	            self.logger.error(e);
	            self.emit('peerConnection-setRemoteDescriptionFailed', e);
	            throw e;
	          })
	          .then(function setRemoteDescriptionSuccess() {
	            if (self.peerConnection.getReceivers) {
	              self.emit('setRemoteDescription', self.peerConnection.getReceivers());
	            } else {
	              self.emit('setRemoteDescription', self.peerConnection.getRemoteStreams());
	            }
	            self.emit('confirmed', self);
	          });
	      }
	    },

	    getDirection: {
	      writable: true,
	      value: function getDirection() {
	        return this.direction;
	      }
	    },

	    // Internal functions
	    createOfferOrAnswer: {
	      writable: true,
	      value: function createOfferOrAnswer(RTCOfferOptions, modifiers) {
	        var self = this;
	        var methodName;
	        var pc = this.peerConnection;

	        RTCOfferOptions = RTCOfferOptions || {};

	        methodName = self.hasOffer('remote') ? 'createAnswer' : 'createOffer';

	        return pc[methodName](RTCOfferOptions)
	          .catch(function methodError(e) {
	            self.emit('peerConnection-' + methodName + 'Failed', e);
	            throw e;
	          })
	          .then(function(sdp) {
	            return SIP.Utils.reducePromises(modifiers, self.createRTCSessionDescriptionInit(sdp));
	          })
	          .then(function(sdp) {
	            self.resetIceGatheringComplete();
	            return pc.setLocalDescription(new self.WebRTC.RTCSessionDescription(sdp));
	          })
	          .catch(function localDescError(e) {
	            self.emit('peerConnection-SetLocalDescriptionFailed', e);
	            throw e;
	          })
	          .then(function onSetLocalDescriptionSuccess() {
	            return self.waitForIceGatheringComplete();
	          })
	          .then(function readySuccess() {
	            var localDescription = self.createRTCSessionDescriptionInit(self.peerConnection.localDescription);
	            return SIP.Utils.reducePromises(modifiers, localDescription);
	          })
	          .then(function(localDescription) {
	            self.emit('getDescription', localDescription);
	            self.setDirection(localDescription.sdp);
	            return localDescription.sdp;
	          })
	          .catch(function createOfferOrAnswerError(e) {
	            self.logger.error(e);
	            // TODO: Not sure if this is correct
	            throw new SIP.Exceptions.GetDescriptionError(e);
	          });
	      }
	    },

	    // Creates an RTCSessionDescriptionInit from an RTCSessionDescription
	    createRTCSessionDescriptionInit: {
	      writable: true,
	      value: function createRTCSessionDescriptionInit(RTCSessionDescription) {
	        return new this.WebRTC.RTCSessionDescription({
	          type: RTCSessionDescription.type,
	          sdp: RTCSessionDescription.sdp
	        });
	      }
	    },

	    addDefaultIceCheckingTimeout: {
	      writable: true,
	      value: function addDefaultIceCheckingTimeout(peerConnectionOptions) {
	        if (peerConnectionOptions.iceCheckingTimeout === undefined) {
	          peerConnectionOptions.iceCheckingTimeout = 5000;
	        }
	        return peerConnectionOptions;
	      }
	    },

	    checkAndDefaultConstraints: {
	      writable: true,
	      value: function checkAndDefaultConstraints(constraints) {
	        var defaultConstraints = { audio: true, video: true };
	        constraints = constraints || defaultConstraints;
	        // Empty object check
	        if (Object.keys(constraints).length === 0 && constraints.constructor === Object) {
	          return defaultConstraints;
	        }
	        return constraints;
	      }
	    },

	    initPeerConnection: {
	      writable: true,
	      value: function initPeerConnection(options) {
	        var self = this;
	        options = options || {};
	        options = this.addDefaultIceCheckingTimeout(options);
	        options.rtcConfiguration = options.rtcConfiguration || {};
	        options.rtcConfiguration = this.addDefaultIceServers(options.rtcConfiguration);

	        this.logger.log('initPeerConnection');

	        if (this.peerConnection) {
	          this.logger.log('Already have a peer connection for this session. Tearing down.');
	          this.resetIceGatheringComplete();
	          this.peerConnection.close();
	        }

	        this.peerConnection = new this.WebRTC.RTCPeerConnection(options.rtcConfiguration);

	        this.logger.log('New peer connection created');

	        if ('ontrack' in this.peerConnection) {
	          this.peerConnection.addEventListener('track', function(e) {
	            self.logger.log('track added');
	            self.observer.trackAdded();
	            self.emit('addTrack', e);
	          });
	        } else {
	          this.logger.warn('Using onaddstream which is deprecated');
	          this.peerConnection.onaddstream = function(e) {
	            self.logger.log('stream added');
	            self.emit('addStream', e);
	          };
	        }

	        this.peerConnection.onicecandidate = function(e) {
	          self.emit('iceCandidate', e);
	          if (e.candidate) {
	            self.logger.log(
	              'ICE candidate received: ' + (e.candidate.candidate === null ? null : e.candidate.candidate.trim())
	            );
	          }
	        };

	        this.peerConnection.onnegotiationneeded = function(e) {
	          console.log('onnegotiationneeded', e);
	        };

	        this.peerConnection.onicegatheringstatechange = function() {
	          self.logger.log('RTCIceGatheringState changed: ' + this.iceGatheringState);
	          switch (this.iceGatheringState) {
	            case 'gathering':
	              self.emit('iceGathering', this);
	              if (!self.iceGatheringTimer && options.iceCheckingTimeout) {
	                self.iceGatheringTimeout = false;
	                self.iceGatheringTimer = SIP.Timers.setTimeout(function() {
	                  self.logger.log(
	                    'RTCIceChecking Timeout Triggered after ' + options.iceCheckingTimeout + ' milliseconds'
	                  );
	                  self.iceGatheringTimeout = true;
	                  self.triggerIceGatheringComplete();
	                }, options.iceCheckingTimeout);
	              }
	              break;
	            case 'complete':
	              self.triggerIceGatheringComplete();
	              break;
	          }
	        };

	        this.peerConnection.oniceconnectionstatechange = function() {
	          //need e for commented out case
	          var stateEvent;

	          switch (this.iceConnectionState) {
	            case 'new':
	              stateEvent = 'iceConnection';
	              break;
	            case 'checking':
	              stateEvent = 'iceConnectionChecking';
	              break;
	            case 'connected':
	              stateEvent = 'iceConnectionConnected';
	              break;
	            case 'completed':
	              stateEvent = 'iceConnectionCompleted';
	              break;
	            case 'failed':
	              stateEvent = 'iceConnectionFailed';
	              break;
	            case 'disconnected':
	              stateEvent = 'iceConnectionDisconnected';
	              break;
	            case 'closed':
	              stateEvent = 'iceConnectionClosed';
	              break;
	            default:
	              self.logger.warn('Unknown iceConnection state:', this.iceConnectionState);
	              return;
	          }
	          self.emit(stateEvent, this);
	        };
	      }
	    },

	    acquire: {
	      writable: true,
	      value: function acquire(constraints) {
	        // Default audio & video to true
	        constraints = this.checkAndDefaultConstraints(constraints);

	        return new SIP.Utils.Promise(
	          function(resolve, reject) {
	            /*
	             * Make the call asynchronous, so that ICCs have a chance
	             * to define callbacks to `userMediaRequest`
	             */
	            this.logger.log('acquiring local media');
	            this.emit('userMediaRequest', constraints);

	            if (constraints.audio || constraints.video) {
	              // Avoid exception on immutable object
	              this.WebRTC.getUserMedia({...constraints})
	                .then(
	                  function(streams) {
	                    this.observer.trackAdded();
	                    this.emit('userMedia', streams);
	                    resolve(streams);
	                  }.bind(this)
	                )
	                .catch(
	                  function(e) {
	                    this.emit('userMediaFailed', e);
	                    reject(e);
	                  }.bind(this)
	                );
	            } else {
	              // Local streams were explicitly excluded.
	              resolve([]);
	            }
	          }.bind(this)
	        )
	          .catch(
	            function acquireFailed(err) {
	              this.logger.error('unable to acquire streams');
	              this.logger.error(err);
	              return SIP.Utils.Promise.reject(err);
	            }.bind(this)
	          )
	          .then(
	            function acquireSucceeded(streams) {
	              this.logger.log('acquired local media streams');
	              try {
	                // Remove old tracks
	                if (this.peerConnection.removeTrack) {
	                  this.peerConnection.getSenders().forEach(function(sender) {
	                    this.peerConnection.removeTrack(sender);
	                  });
	                }
	                return streams;
	              } catch (e) {
	                return SIP.Utils.Promise.reject(e);
	              }
	            }.bind(this)
	          )
	          .catch(
	            function removeStreamsFailed(err) {
	              this.logger.error('error removing streams');
	              this.logger.error(err);
	              return SIP.Utils.Promise.reject(err);
	            }.bind(this)
	          )
	          .then(
	            function addStreams(streams) {
	              try {
	                streams = [].concat(streams);
	                streams.forEach(function(stream) {
	                  if (this.peerConnection.addTrack) {
	                    stream.getTracks().forEach(function(track) {
	                      this.peerConnection.addTrack(track, stream);
	                    }, this);
	                  } else {
	                    // Chrome 59 does not support addTrack
	                    this.peerConnection.addStream(stream);
	                  }
	                }, this);
	              } catch (e) {
	                return SIP.Utils.Promise.reject(e);
	              }
	              return SIP.Utils.Promise.resolve();
	            }.bind(this)
	          )
	          .catch(
	            function addStreamsFailed(err) {
	              this.logger.error('error adding stream');
	              this.logger.error(err);
	              return SIP.Utils.Promise.reject(err);
	            }.bind(this)
	          );
	      }
	    },

	    hasOffer: {
	      writable: true,
	      value: function hasOffer(where) {
	        var offerState = 'have-' + where + '-offer';

	        return this.peerConnection.signalingState === offerState;
	      }
	    },

	    // ICE gathering state handling

	    isIceGatheringComplete: {
	      writable: true,
	      value: function isIceGatheringComplete() {
	        return this.peerConnection.iceGatheringState === 'complete' || this.iceGatheringTimeout;
	      }
	    },

	    resetIceGatheringComplete: {
	      writable: true,
	      value: function resetIceGatheringComplete() {
	        this.iceGatheringTimeout = false;

	        if (this.iceGatheringTimer) {
	          SIP.Timers.clearTimeout(this.iceGatheringTimer);
	          this.iceGatheringTimer = null;
	        }

	        if (this.iceGatheringDeferred) {
	          this.iceGatheringDeferred.reject();
	          this.iceGatheringDeferred = null;
	        }
	      }
	    },

	    setDirection: {
	      writable: true,
	      value: function setDirection(sdp) {
	        var match = sdp.match(/a=(sendrecv|sendonly|recvonly|inactive)/);
	        if (match === null) {
	          this.direction = this.C.DIRECTION.NULL;
	          this.observer.directionChanged();
	          return;
	        }
	        var direction = match[1];
	        switch (direction) {
	          case this.C.DIRECTION.SENDRECV:
	          case this.C.DIRECTION.SENDONLY:
	          case this.C.DIRECTION.RECVONLY:
	          case this.C.DIRECTION.INACTIVE:
	            this.direction = direction;
	            break;
	          default:
	            this.direction = this.C.DIRECTION.NULL;
	            break;
	        }
	        this.observer.directionChanged();
	      }
	    },

	    triggerIceGatheringComplete: {
	      writable: true,
	      value: function triggerIceGatheringComplete() {
	        if (this.isIceGatheringComplete()) {
	          this.emit('iceGatheringComplete', this);

	          if (this.iceGatheringTimer) {
	            SIP.Timers.clearTimeout(this.iceGatheringTimer);
	            this.iceGatheringTimer = null;
	          }

	          if (this.iceGatheringDeferred) {
	            this.iceGatheringDeferred.resolve();
	            this.iceGatheringDeferred = null;
	          }
	        }
	      }
	    },

	    waitForIceGatheringComplete: {
	      writable: true,
	      value: function waitForIceGatheringComplete() {
	        if (this.isIceGatheringComplete()) {
	          return SIP.Utils.Promise.resolve();
	        } else if (!this.isIceGatheringDeferred) {
	          this.iceGatheringDeferred = SIP.Utils.defer();
	        }
	        return this.iceGatheringDeferred.promise;
	      }
	    }
	  });

	  return MobileSessionDescriptionHandler;
	};

	//      

	const states = ['STATUS_NULL', 'STATUS_NEW', 'STATUS_CONNECTING', 'STATUS_CONNECTED', 'STATUS_COMPLETED'];
	const events = [
	  'connected',
	  'disconnected',
	  'registered',
	  'unregistered',
	  'registrationFailed',
	  'invite',
	  'inviteSent',
	  'transportCreated',
	  'newTransaction',
	  'transactionDestroyed',
	  'notify',
	  'outOfDialogReferRequested',
	  'message'
	];

	                    
	                          
	                          
	                               
	  

	                     
	                      
	               
	                
	                            
	                   
	                     
	              
	  

	// @see https://github.com/onsip/SIP.js/blob/master/src/Web/Simple.js
	class WebRTCClient {
	                       
	                    
	                                     
	                          
	                          
	                                 

	  static isAPrivateIp(ip        )          {
	    const regex = /^(?:10|127|172\.(?:1[6-9]|2[0-9]|3[01])|192\.168)\..*/;
	    return regex.exec(ip) == null;
	  }

	  static getIceServers(ip        )                                 {
	    if (WebRTCClient.isAPrivateIp(ip)) {
	      return [
	        {
	          urls: [
	            'stun:stun.l.google.com:19302',
	            'stun:stun1.l.google.com:19302',
	            'stun:stun2.l.google.com:19302',
	            'stun:stun3.l.google.com:19302',
	            'stun:stun4.l.google.com:19302'
	          ]
	        }
	      ];
	    }
	    return [];
	  }

	  constructor(config              ) {
	    this.config = config;
	    this.callbacksHandler = new CallbacksHandler();

	    this.configureMedia(config.media);
	    this.userAgent = this.createUserAgent();
	  }

	  configureMedia(media             ) {
	    this.audio = media.audio;
	    this.video = media.video;
	    this.localVideo = media.localVideo;
	  }

	  createUserAgent()         {
	    const webRTCConfiguration = this._createWebRTCConfiguration();
	    const userAgent = new SIP.UA(webRTCConfiguration);

	    events
	      .filter(eventName => eventName !== 'invite')
	      .forEach(eventName => {
	        userAgent.on(eventName, event => {
	          this.callbacksHandler.triggerCallback(eventName, event);
	        });
	      });

	    // Particular case for `invite` event
	    userAgent.on('invite', (session                               ) => {
	      this._setupSession(session);

	      this.callbacksHandler.triggerCallback('invite', session);
	    });
	    return userAgent;
	  }

	  on(event        , callback          ) {
	    this.callbacksHandler.on(event, callback);
	  }

	  call(number        )                                {
	    // Safari hack, because you cannot call .play() from a non user action
	    if (this.audio && this._isWeb()) {
	      this.audio.autoplay = true;
	    }
	    if (this.video && this._isWeb()) {
	      this.video.autoplay = true;
	    }
	    if (this.localVideo && this._isWeb()) {
	      this.localVideo.autoplay = true;
	      this.localVideo.volume = 0;
	    }

	    const session = this.userAgent.invite(number, this._getMediaConfiguration());
	    this._fixLocalDescription(session);

	    this._setupSession(session);

	    return session;
	  }

	  answer(session                               ) {
	    // Safari hack, because you cannot call .play() from a non user action
	    if (this.audio && this._isWeb()) {
	      this.audio.autoplay = true;
	    }
	    if (this.video && this._isWeb()) {
	      this.video.autoplay = true;
	    }

	    return session.accept(this._getMediaConfiguration());
	  }

	  hangup(session                               ) {
	    if (session.hasAnswer && session.bye) {
	      return session.bye();
	    }

	    if (!session.hasAnswer && session.cancel) {
	      return session.cancel();
	    }

	    if (session.reject) {
	      return session.reject();
	    }

	    return null;
	  }

	  reject(session                               ) {
	    return session.reject();
	  }

	  mute(session                               ) {
	    this._toggleMute(session, true);
	  }

	  unmute(session                               ) {
	    this._toggleMute(session, false);
	  }

	  hold(session                               ) {
	    this.mute(session);

	    return session.hold();
	  }

	  unhold(session                               ) {
	    this.unmute(session);

	    return session.unhold();
	  }

	  sendDTMF(session                               , tone        ) {
	    return session.dtmf(tone);
	  }

	  message(destination        , message        ) {
	    return this.userAgent.message(destination, message);
	  }

	  transfert(session                               , target        ) {
	    this.hold(session);

	    setTimeout(() => {
	      session.refer(target);
	      this.hangup(session);
	    }, 50);
	  }

	  getState() {
	    return states[this.userAgent.state];
	  }

	  close() {
	    this._cleanupMedia();

	    this.userAgent.transport.disconnect();

	    return this.userAgent.stop();
	  }

	  _isWeb() {
	    return typeof this.audio === 'object' || typeof this.video === 'object';
	  }

	  _hasAudio() {
	    return !!this.audio;
	  }

	  _hasVideo() {
	    return !!this.video;
	  }

	  _hasLocalVideo() {
	    return !!this.localVideo;
	  }

	  _fixLocalDescription(session                               ) {
	    if (!session.sessionDescriptionHandler) {
	      return;
	    }

	    const pc = session.sessionDescriptionHandler.peerConnection;
	    let count = 0;
	    let fixed = false;

	    pc.onicecandidate = () => {
	      if (count > 0 && !fixed) {
	        fixed = true;
	        pc.createOffer().then(offer => pc.setLocalDescription(offer));
	      }
	      count += 1;
	    };
	  }

	  _createWebRTCConfiguration() {
	    return {
	      authorizationUser: this.config.authorizationUser,
	      displayName: this.config.displayName,
	      hackIpInContact: true,
	      hackWssInTransport: true,
	      log: this.config.log || { builtinEnabled: false },
	      password: this.config.password,
	      uri: `${this.config.authorizationUser}@${this.config.host}`,
	      transportOptions: {
	        traceSip: false,
	        wsServers: `wss://${this.config.host}:${this.config.port || 443}/api/asterisk/ws`
	      },
	      sessionDescriptionHandlerFactory: (session                               , options        ) =>
	        this._isWeb()
	          ? SessionDescriptionHandler(SIP).defaultFactory(session, options)
	          : MobileSessionDescriptionHandler(SIP).defaultFactory(session, options),
	      sessionDescriptionHandlerFactoryOptions: {
	        constraints: {
	          audio: this._hasAudio(),
	          video: this._hasVideo()
	        },
	        peerConnectionOptions: {
	          iceCheckingTimeout: 5000,
	          rtcConfiguration: {
	            rtcpMuxPolicy: 'require',
	            bundlePolicy: 'balanced',
	            iceServers: WebRTCClient.getIceServers(this.config.host),
	            mandatory: {
	              OfferToReceiveAudio: this._hasAudio(),
	              OfferToReceiveVideo: this._hasVideo()
	            }
	          }
	        }
	      }
	    };
	  }

	  _getMediaConfiguration() {
	    return {
	      sessionDescriptionHandlerOptions: {
	        constraints: {
	          audio: this._hasAudio(),
	          video: this._hasVideo()
	        },
	        RTCOfferOptions: {
	          mandatory: {
	            OfferToReceiveAudio: this._hasAudio(),
	            OfferToReceiveVideo: this._hasVideo()
	          }
	        }
	      }
	    };
	  }

	  _setupSession(session                               ) {
	    session.on('accepted', () => this._onAccepted(session));
	  }

	  _onAccepted(session                               ) {
	    this._setupLocalMedia(session);
	    this._setupRemoteMedia(session);

	    session.sessionDescriptionHandler.on('addTrack', () => {
	      this._setupRemoteMedia(session);
	    });

	    session.sessionDescriptionHandler.on('addStream', () => {
	      this._setupRemoteMedia(session);
	    });

	    this.callbacksHandler.triggerCallback('accepted', session);
	  }

	  _setupRemoteMedia(session                               ) {
	    // If there is a video track, it will attach the video and audio to the same element
	    const pc = session.sessionDescriptionHandler.peerConnection;
	    let remoteStream;

	    if (pc.getReceivers) {
	      remoteStream = typeof global !== 'undefined' ? new global.window.MediaStream() : new window.MediaStream();
	      pc.getReceivers().forEach(receiver => {
	        const { track } = receiver;
	        if (track) {
	          remoteStream.addTrack(track);
	        }
	      });
	    } else {
	      [remoteStream] = pc.getRemoteStreams();
	    }

	    if (this._hasVideo() && this._isWeb()) {
	      this.video.srcObject = remoteStream;
	      this.video.play();
	    } else if (this._hasAudio() && this._isWeb()) {
	      this.audio.srcObject = remoteStream;
	      this.audio.play();
	    }
	  }

	  _setupLocalMedia(session                               ) {
	    if (!this.localVideo) {
	      return;
	    }

	    const pc = session.sessionDescriptionHandler.peerConnection;
	    let localStream;

	    if (pc.getSenders) {
	      localStream = typeof global !== 'undefined' ? new global.window.MediaStream() : new window.MediaStream();
	      pc.getSenders().forEach(sender => {
	        const { track } = sender;
	        if (track && track.kind === 'video') {
	          localStream.addTrack(track);
	        }
	      });
	    } else {
	      [localStream] = pc.getLocalStreams();
	    }

	    this.localVideo.srcObject = localStream;
	    this.localVideo.volume = 0;
	    this.localVideo.play();
	  }

	  _cleanupMedia() {
	    if (this.video && this._isWeb()) {
	      this.video.srcObject = null;
	      this.video.pause();

	      if (this.localVideo) {
	        this.localVideo.srcObject = null;
	        this.localVideo.pause();
	      }
	    }

	    if (this.audio && this._isWeb()) {
	      this.audio.srcObject = null;
	      this.audio.pause();
	    }
	  }

	  _toggleMute(session                               , mute         ) {
	    const pc = session.sessionDescriptionHandler.peerConnection;

	    if (pc.getSenders) {
	      pc.getSenders().forEach(sender => {
	        if (sender.track) {
	          // eslint-disable-next-line
	          sender.track.enabled = !mute;
	        }
	      });
	    } else {
	      pc.getLocalStreams().forEach(stream => {
	        stream.getAudioTracks().forEach(track => {
	          // eslint-disable-next-line
	          track.enabled = !mute;
	        });
	        stream.getVideoTracks().forEach(track => {
	          // eslint-disable-next-line
	          track.enabled = !mute;
	        });
	      });
	    }
	  }
	}

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};

	function __extends(d, b) {
	    extendStatics(d, b);
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	var Event$1 = /** @class */ (function () {
	    function Event(type, target) {
	        this.target = target;
	        this.type = type;
	    }
	    return Event;
	}());
	var ErrorEvent = /** @class */ (function (_super) {
	    __extends(ErrorEvent, _super);
	    function ErrorEvent(error, target) {
	        var _this = _super.call(this, 'error', target) || this;
	        _this.message = error.message;
	        _this.error = error;
	        return _this;
	    }
	    return ErrorEvent;
	}(Event$1));
	var CloseEvent = /** @class */ (function (_super) {
	    __extends(CloseEvent, _super);
	    function CloseEvent(code, reason, target) {
	        if (code === void 0) { code = 1000; }
	        if (reason === void 0) { reason = ''; }
	        var _this = _super.call(this, 'close', target) || this;
	        _this.wasClean = true;
	        _this.code = code;
	        _this.reason = reason;
	        return _this;
	    }
	    return CloseEvent;
	}(Event$1));

	/*!
	 * Reconnecting WebSocket
	 * by Pedro Ladaria <pedro.ladaria@gmail.com>
	 * https://github.com/pladaria/reconnecting-websocket
	 * License MIT
	 */
	var getGlobalWebSocket = function () {
	    if (typeof WebSocket !== 'undefined') {
	        // @ts-ignore
	        return WebSocket;
	    }
	};
	/**
	 * Returns true if given argument looks like a WebSocket class
	 */
	var isWebSocket = function (w) { return typeof w === 'function' && w.CLOSING === 2; };
	var DEFAULT = {
	    maxReconnectionDelay: 10000,
	    minReconnectionDelay: 1000 + Math.random() * 4000,
	    minUptime: 5000,
	    reconnectionDelayGrowFactor: 1.3,
	    connectionTimeout: 4000,
	    maxRetries: Infinity,
	    debug: false,
	};
	var ReconnectingWebSocket = /** @class */ (function () {
	    function ReconnectingWebSocket(url, protocols, options) {
	        if (options === void 0) { options = {}; }
	        var _this = this;
	        this._listeners = {
	            error: [],
	            message: [],
	            open: [],
	            close: [],
	        };
	        this._retryCount = -1;
	        this._shouldReconnect = true;
	        this._connectLock = false;
	        this._binaryType = 'blob';
	        this._closeCalled = false;
	        this._messageQueue = [];
	        /**
	         * An event listener to be called when the WebSocket connection's readyState changes to CLOSED
	         */
	        this.onclose = undefined;
	        /**
	         * An event listener to be called when an error occurs
	         */
	        this.onerror = undefined;
	        /**
	         * An event listener to be called when a message is received from the server
	         */
	        this.onmessage = undefined;
	        /**
	         * An event listener to be called when the WebSocket connection's readyState changes to OPEN;
	         * this indicates that the connection is ready to send and receive data
	         */
	        this.onopen = undefined;
	        this._handleOpen = function (event) {
	            _this._debug('open event');
	            var _a = _this._options.minUptime, minUptime = _a === void 0 ? DEFAULT.minUptime : _a;
	            clearTimeout(_this._connectTimeout);
	            _this._uptimeTimeout = setTimeout(function () { return _this._acceptOpen(); }, minUptime);
	            // @ts-ignore
	            _this._ws.binaryType = _this._binaryType;
	            // send enqueued messages (messages sent before websocket open event)
	            _this._messageQueue.forEach(function (message) { return _this._ws.send(message); });
	            _this._messageQueue = [];
	            if (_this.onopen) {
	                _this.onopen(event);
	            }
	            _this._listeners.open.forEach(function (listener) { return _this._callEventListener(event, listener); });
	        };
	        this._handleMessage = function (event) {
	            _this._debug('message event');
	            if (_this.onmessage) {
	                _this.onmessage(event);
	            }
	            _this._listeners.message.forEach(function (listener) { return _this._callEventListener(event, listener); });
	        };
	        this._handleError = function (event) {
	            _this._debug('error event', event.message);
	            _this._disconnect(undefined, event.message === 'TIMEOUT' ? 'timeout' : undefined);
	            if (_this.onerror) {
	                _this.onerror(event);
	            }
	            _this._debug('exec error listeners');
	            _this._listeners.error.forEach(function (listener) { return _this._callEventListener(event, listener); });
	            _this._connect();
	        };
	        this._handleClose = function (event) {
	            _this._debug('close event');
	            _this._clearTimeouts();
	            if (_this._shouldReconnect) {
	                _this._connect();
	            }
	            if (_this.onclose) {
	                _this.onclose(event);
	            }
	            _this._listeners.close.forEach(function (listener) { return _this._callEventListener(event, listener); });
	        };
	        this._url = url;
	        this._protocols = protocols;
	        this._options = options;
	        this._connect();
	    }
	    Object.defineProperty(ReconnectingWebSocket, "CONNECTING", {
	        get: function () {
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ReconnectingWebSocket, "OPEN", {
	        get: function () {
	            return 1;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ReconnectingWebSocket, "CLOSING", {
	        get: function () {
	            return 2;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ReconnectingWebSocket, "CLOSED", {
	        get: function () {
	            return 3;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ReconnectingWebSocket.prototype, "CONNECTING", {
	        get: function () {
	            return ReconnectingWebSocket.CONNECTING;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ReconnectingWebSocket.prototype, "OPEN", {
	        get: function () {
	            return ReconnectingWebSocket.OPEN;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ReconnectingWebSocket.prototype, "CLOSING", {
	        get: function () {
	            return ReconnectingWebSocket.CLOSING;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ReconnectingWebSocket.prototype, "CLOSED", {
	        get: function () {
	            return ReconnectingWebSocket.CLOSED;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ReconnectingWebSocket.prototype, "binaryType", {
	        get: function () {
	            return this._ws ? this._ws.binaryType : this._binaryType;
	        },
	        set: function (value) {
	            this._binaryType = value;
	            if (this._ws) {
	                // @ts-ignore
	                this._ws.binaryType = value;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ReconnectingWebSocket.prototype, "retryCount", {
	        /**
	         * Returns the number or connection retries
	         */
	        get: function () {
	            return Math.max(this._retryCount, 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ReconnectingWebSocket.prototype, "bufferedAmount", {
	        /**
	         * The number of bytes of data that have been queued using calls to send() but not yet
	         * transmitted to the network. This value resets to zero once all queued data has been sent.
	         * This value does not reset to zero when the connection is closed; if you keep calling send(),
	         * this will continue to climb. Read only
	         */
	        get: function () {
	            var bytes = this._messageQueue.reduce(function (acc, message) {
	                if (typeof message === 'string') {
	                    acc += message.length; // not byte size
	                }
	                else if (message instanceof Blob) {
	                    acc += message.size;
	                }
	                else {
	                    acc += message.byteLength;
	                }
	                return acc;
	            }, 0);
	            return bytes + (this._ws ? this._ws.bufferedAmount : 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ReconnectingWebSocket.prototype, "extensions", {
	        /**
	         * The extensions selected by the server. This is currently only the empty string or a list of
	         * extensions as negotiated by the connection
	         */
	        get: function () {
	            return this._ws ? this._ws.extensions : '';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ReconnectingWebSocket.prototype, "protocol", {
	        /**
	         * A string indicating the name of the sub-protocol the server selected;
	         * this will be one of the strings specified in the protocols parameter when creating the
	         * WebSocket object
	         */
	        get: function () {
	            return this._ws ? this._ws.protocol : '';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ReconnectingWebSocket.prototype, "readyState", {
	        /**
	         * The current state of the connection; this is one of the Ready state constants
	         */
	        get: function () {
	            return this._ws ? this._ws.readyState : ReconnectingWebSocket.CONNECTING;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ReconnectingWebSocket.prototype, "url", {
	        /**
	         * The URL as resolved by the constructor
	         */
	        get: function () {
	            return this._ws ? this._ws.url : '';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Closes the WebSocket connection or connection attempt, if any. If the connection is already
	     * CLOSED, this method does nothing
	     */
	    ReconnectingWebSocket.prototype.close = function (code, reason) {
	        if (code === void 0) { code = 1000; }
	        this._closeCalled = true;
	        this._shouldReconnect = false;
	        this._clearTimeouts();
	        if (!this._ws) {
	            this._debug('close enqueued: no ws instance');
	            return;
	        }
	        if (this._ws.readyState === this.CLOSED) {
	            this._debug('close: already closed');
	            return;
	        }
	        this._ws.close(code, reason);
	    };
	    /**
	     * Closes the WebSocket connection or connection attempt and connects again.
	     * Resets retry counter;
	     */
	    ReconnectingWebSocket.prototype.reconnect = function (code, reason) {
	        this._shouldReconnect = true;
	        this._closeCalled = false;
	        this._retryCount = -1;
	        if (!this._ws || this._ws.readyState === this.CLOSED) {
	            this._connect();
	        }
	        else {
	            this._disconnect(code, reason);
	            this._connect();
	        }
	    };
	    /**
	     * Enqueue specified data to be transmitted to the server over the WebSocket connection
	     */
	    ReconnectingWebSocket.prototype.send = function (data) {
	        if (this._ws && this._ws.readyState === this.OPEN) {
	            this._debug('send', data);
	            this._ws.send(data);
	        }
	        else {
	            this._debug('enqueue', data);
	            this._messageQueue.push(data);
	        }
	    };
	    /**
	     * Register an event handler of a specific event type
	     */
	    ReconnectingWebSocket.prototype.addEventListener = function (type, listener) {
	        if (this._listeners[type]) {
	            // @ts-ignore
	            this._listeners[type].push(listener);
	        }
	    };
	    /**
	     * Removes an event listener
	     */
	    ReconnectingWebSocket.prototype.removeEventListener = function (type, listener) {
	        if (this._listeners[type]) {
	            // @ts-ignore
	            this._listeners[type] = this._listeners[type].filter(function (l) { return l !== listener; });
	        }
	    };
	    ReconnectingWebSocket.prototype._debug = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (this._options.debug) {
	            // not using spread because compiled version uses Symbols
	            // tslint:disable-next-line
	            console.log.apply(console, ['RWS>'].concat(args));
	        }
	    };
	    ReconnectingWebSocket.prototype._getNextDelay = function () {
	        var _a = this._options, _b = _a.reconnectionDelayGrowFactor, reconnectionDelayGrowFactor = _b === void 0 ? DEFAULT.reconnectionDelayGrowFactor : _b, _c = _a.minReconnectionDelay, minReconnectionDelay = _c === void 0 ? DEFAULT.minReconnectionDelay : _c, _d = _a.maxReconnectionDelay, maxReconnectionDelay = _d === void 0 ? DEFAULT.maxReconnectionDelay : _d;
	        var delay = minReconnectionDelay;
	        if (this._retryCount > 0) {
	            delay =
	                minReconnectionDelay * Math.pow(reconnectionDelayGrowFactor, this._retryCount - 1);
	            if (delay > maxReconnectionDelay) {
	                delay = maxReconnectionDelay;
	            }
	        }
	        this._debug('next delay', delay);
	        return delay;
	    };
	    ReconnectingWebSocket.prototype._wait = function () {
	        var _this = this;
	        return new Promise(function (resolve) {
	            setTimeout(resolve, _this._getNextDelay());
	        });
	    };
	    ReconnectingWebSocket.prototype._getNextUrl = function (urlProvider) {
	        if (typeof urlProvider === 'string') {
	            return Promise.resolve(urlProvider);
	        }
	        if (typeof urlProvider === 'function') {
	            var url = urlProvider();
	            if (typeof url === 'string') {
	                return Promise.resolve(url);
	            }
	            if (url.then) {
	                return url;
	            }
	        }
	        throw Error('Invalid URL');
	    };
	    ReconnectingWebSocket.prototype._connect = function () {
	        var _this = this;
	        if (this._connectLock || !this._shouldReconnect) {
	            return;
	        }
	        this._connectLock = true;
	        var _a = this._options, _b = _a.maxRetries, maxRetries = _b === void 0 ? DEFAULT.maxRetries : _b, _c = _a.connectionTimeout, connectionTimeout = _c === void 0 ? DEFAULT.connectionTimeout : _c, _d = _a.WebSocket, WebSocket = _d === void 0 ? getGlobalWebSocket() : _d;
	        if (this._retryCount >= maxRetries) {
	            this._debug('max retries reached', this._retryCount, '>=', maxRetries);
	            return;
	        }
	        this._retryCount++;
	        this._debug('connect', this._retryCount);
	        this._removeListeners();
	        if (!isWebSocket(WebSocket)) {
	            throw Error('No valid WebSocket class provided');
	        }
	        this._wait()
	            .then(function () { return _this._getNextUrl(_this._url); })
	            .then(function (url) {
	            // close could be called before creating the ws
	            if (_this._closeCalled) {
	                _this._connectLock = false;
	                return;
	            }
	            _this._debug('connect', { url: url, protocols: _this._protocols });
	            _this._ws = _this._protocols
	                ? new WebSocket(url, _this._protocols)
	                : new WebSocket(url);
	            // @ts-ignore
	            _this._ws.binaryType = _this._binaryType;
	            _this._connectLock = false;
	            _this._addListeners();
	            _this._connectTimeout = setTimeout(function () { return _this._handleTimeout(); }, connectionTimeout);
	        });
	    };
	    ReconnectingWebSocket.prototype._handleTimeout = function () {
	        this._debug('timeout event');
	        this._handleError(new ErrorEvent(Error('TIMEOUT'), this));
	    };
	    ReconnectingWebSocket.prototype._disconnect = function (code, reason) {
	        if (code === void 0) { code = 1000; }
	        this._clearTimeouts();
	        if (!this._ws) {
	            return;
	        }
	        this._removeListeners();
	        try {
	            this._ws.close(code, reason);
	            this._handleClose(new CloseEvent(code, reason, this));
	        }
	        catch (error) {
	            // ignore
	        }
	    };
	    ReconnectingWebSocket.prototype._acceptOpen = function () {
	        this._debug('accept open');
	        this._retryCount = 0;
	    };
	    ReconnectingWebSocket.prototype._callEventListener = function (event, listener) {
	        if ('handleEvent' in listener) {
	            // @ts-ignore
	            listener.handleEvent(event);
	        }
	        else {
	            // @ts-ignore
	            listener(event);
	        }
	    };
	    ReconnectingWebSocket.prototype._removeListeners = function () {
	        if (!this._ws) {
	            return;
	        }
	        this._debug('removeListeners');
	        this._ws.removeEventListener('open', this._handleOpen);
	        this._ws.removeEventListener('close', this._handleClose);
	        this._ws.removeEventListener('message', this._handleMessage);
	        // @ts-ignore
	        this._ws.removeEventListener('error', this._handleError);
	    };
	    ReconnectingWebSocket.prototype._addListeners = function () {
	        if (!this._ws) {
	            return;
	        }
	        this._debug('addListeners');
	        this._ws.addEventListener('open', this._handleOpen);
	        this._ws.addEventListener('close', this._handleClose);
	        this._ws.addEventListener('message', this._handleMessage);
	        // @ts-ignore
	        this._ws.addEventListener('error', this._handleError);
	    };
	    ReconnectingWebSocket.prototype._clearTimeouts = function () {
	        clearTimeout(this._connectTimeout);
	        clearTimeout(this._uptimeTimeout);
	    };
	    return ReconnectingWebSocket;
	}());

	//      

	                                 
	               
	                
	                       
	  

	class WebSocketClient {
	                       
	               
	                
	                        
	                                     
	                  
	                                 

	  /**
	   *
	   * @param host
	   * @param token
	   * @param events
	   * @param options @see https://github.com/pladaria/reconnecting-websocket#available-options
	   */
	  constructor({ host, token, events = [] }                          , options         = {}) {
	    this.initialized = false;
	    this.callbacksHandler = new CallbacksHandler();

	    this.socket = null;
	    this.host = host;
	    this.token = token;
	    this.events = events;
	    this.options = options;
	  }

	  connect() {
	    this.socket = new ReconnectingWebSocket(`wss://${this.host}/api/websocketd/?token=${this.token}`, [], this.options);
	    if (this.options.binaryType) {
	      this.socket.binaryType = this.options.binaryType;
	    }

	    this.socket.onmessage = (event              ) => {
	      const message = JSON.parse(typeof event.data === 'string' ? event.data : '{}');

	      if (!this.initialized) {
	        this.handleMessage(message, this.socket);
	      } else {
	        this.callbacksHandler.triggerCallback(message.name, message);
	      }
	    };

	    this.socket.onclose = e => {
	      switch (e.code) {
	        case 4002:
	          break;
	        case 4003:
	          break;
	        default:
	      }
	    };
	  }

	  close()       {
	    if (!this.socket) {
	      return;
	    }

	    this.socket.close();
	  }

	  on(event        , callback          ) {
	    this.callbacksHandler.on(event, callback);
	  }

	  handleMessage(message        , sock                       ) {
	    switch (message.op) {
	      case 'init':
	        this.events.forEach(event => {
	          const op = {
	            op: 'subscribe',
	            data: { event_name: event }
	          };

	          sock.send(JSON.stringify(op));
	        });

	        sock.send(JSON.stringify({ op: 'start' }));
	        break;
	      case 'subscribe':
	        break;
	      case 'start':
	        this.initialized = true;
	        break;
	      default:
	        this.callbacksHandler.triggerCallback('message', message);
	    }
	  }
	}

	var COUNTRIES = {
	  BELGIUM: 'BE',
	  CANADA: 'CA',
	  FRANCE: 'FR',
	  GERMANY: 'DE',
	  ITALY: 'IT',
	  PORTUGAL: 'PT',
	  SPAIN: 'ES',
	  SWITZERLAND: 'CH',
	  UNITED_KINGDOM: 'GB',
	  UNITED_STATES: 'US'
	};

	//      

	                                   
	                 
	                    
	  

	                                     
	                 
	                    
	  

	class NotificationOptions {
	                 
	                     

	  static parse(plain                            )                      {
	    if (!plain) {
	      return new NotificationOptions({ sound: true, vibration: true });
	    }

	    return new NotificationOptions({
	      sound: plain.sound,
	      vibration: plain.vibration
	    });
	  }

	  static newFrom(profile                     ) {
	    return newFrom(profile, NotificationOptions);
	  }

	  constructor({ sound = true, vibration = true }                               = {}) {
	    this.sound = sound;
	    this.vibration = vibration;
	  }

	  setSound(sound         )                      {
	    this.sound = sound;

	    return this;
	  }

	  setVibration(vibration         )                      {
	    this.vibration = vibration;

	    return this;
	  }

	  enable() {
	    this.vibration = true;
	    this.sound = true;

	    return this;
	  }

	  disable() {
	    this.vibration = false;
	    this.sound = false;

	    return this;
	  }

	  isEnabled() {
	    return this.sound || this.vibration;
	  }
	}

	//      
	/* eslint-disable */

	                                     

	class DebugPhone                  {
	  makeCall(number        ) {
	    console.info('DebugPhone - calling: ${number}');
	  }

	  acceptCall() {
	    console.info('DebugPhone - Accept call');
	  }

	  mute() {
	    console.info('DebugPhone - Mute phone');
	  }

	  unmute() {
	    console.info('DebugPhone - Unmute phone');
	  }

	  hold() {
	    console.info('DebugPhone - Put on hold');
	  }

	  unhold() {
	    console.info('DebugPhone - Put on unhold');
	  }

	  transfer(target        ) {
	    console.info(`DebugPhone - Transferring to ${target}`);
	  }

	  sendKey(key        ) {
	    console.info('DebugPhone - sending: ${key}');
	  }

	  putOnSpeaker() {
	    console.info('DebugPhone - Put on speaker');
	  }

	  putOffSpeaker() {
	    console.info('DebugPhone - Put off speaker');
	  }

	  endCall() {
	    console.info('DebugPhone - Hang up');
	  }

	  onConnectionMade() {
	    console.info('DebugPhone - Connection made');
	  }

	  close() {
	    console.info('DebugPhone - Close');
	  }
	}

	//      
	/* eslint-disable */

	                                       

	class DebugDevice                   {
	  connectToCall() {
	    console.info('DebugDevice - Connected to call');
	  }

	  disconnectFromCall() {
	    console.info('DebugDevice - Disconnected from call');
	  }

	  ringback() {
	    console.info('DebugDevice - Ringback');
	  }

	  stopRingback() {
	    console.info('DebugDevice - Stop ringback');
	  }

	  playRingtone() {
	    console.info('DebugDevice - Play ringtone');
	  }

	  stopRingtone() {
	    console.info('DebugDevice - Stop ringtone');
	  }

	  mute() {
	    console.info('DebugDevice - Mute');
	  }

	  unmute() {
	    console.info('DebugDevice - Unmute');
	  }

	  putOnSpeaker() {
	    console.info('DebugDevice - Put on speaker');
	  }

	  putOffSpeaker() {
	    console.info('DebugDevice - Put off speaker');
	  }
	}

	//      

	                                        
	                              
	                                                          
	                                

	var index = {
	  WazoApiClient: ApiClient,
	  WazoWebRTCClient: WebRTCClient,
	  WazoWebSocketClient: WebSocketClient,
	  BadResponse,
	  ServerError,
	  Call,
	  CallLog,
	  ChatMessage,
	  Contact,
	  COUNTRIES,
	  ForwardOption,
	  Line,
	  NotificationOptions,
	  Profile,
	  Session,
	  Voicemail,
	  DebugPhone,
	  DebugDevice,
	  PRESENCE,
	  FORWARD_KEYS
	};

	return index;

})));
//# sourceMappingURL=wazo-sdk.js.map
