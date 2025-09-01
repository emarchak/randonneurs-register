global.___loader = {
  enqueue: jest.fn(),
}

// Polyfill TextEncoder and TextDecoder for Node.js test environment
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder
}
if (typeof TextDecoder === 'undefined') {
  global.TextDecoder = require('util').TextDecoder
}
