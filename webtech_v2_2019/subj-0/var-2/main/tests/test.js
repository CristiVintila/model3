// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

// Configure chai
chai.use(chaiHttp);
chai.use(require('chai-json-schema'));
chai.should();

let schema = {
    title: 'Product schema',
    type: 'object',
    required: ['name', 'description', 'sizes', 'inventory'],
    properties: {
        name: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        sizes: {
            type: 'array',
            minItems: 3,
            items: {
                type: 'number'
            }
        },
        inventory: {
            type: 'array',
            minItems: 2,
            items: {
                type: 'object',
                required: ['supplierName', 'quantity', 'aquisitionPrice'],
                properties: {
                    supplierName: {
                        type: 'string'
                    },
                    quantity: {
                        type: 'number'
                    },
                    aquisitionPrice: {
                        type: 'number'
                    },
                }
            }
        }
    }
}

describe("JSON", () => {
    describe("GET /product.json", () => {
        it('should return a valid json', (done) => {
            chai.request(app)
                 .get('/product.json')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     chai.assert.jsonSchema(res.body, schema)
                     done();
                  });
        })
    })
});