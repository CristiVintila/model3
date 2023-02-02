let assert = require('assert')

describe('distance', function(){
	let Widget = require('../app').Widget
	let decorate = require('../app').decorate
	it('creates a widget', function(){
		let w1 = new Widget('first widget', 10)
		assert.equal(w1.getDescription(), 'a first widget of size 10')
	})
	it('creates a widget and decorates it', function(){
		decorate(Widget)
		let w1 = new Widget('first widget', 10)
		assert.equal(w1.getDescription(), 'a first widget of size 10')
	})
	it('throws an exception', function(){
		decorate(Widget)
		let w1 = new Widget('first widget', 10)
		assert.throws(() => w1.enhance(null), {message : 'InvalidType'})
	})
	it('creates a widget and enhances it', function(){
		decorate(Widget)
		let w1 = new Widget('first widget', 10)
		w1.enhance(3)
		assert.equal(w1.getDescription(), 'a first widget of size 13')
	})
	it('enhances an existing widget', function(){
		let w1 = new Widget('first widget', 10)
		decorate(Widget)
		w1.enhance(4)
		assert.equal(w1.getDescription(), 'a first widget of size 14')	
	})
})