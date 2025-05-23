const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('GET /users', () => {
    it('should fetch all users excluding passwords', (done) => {
        chai.request(app)
            .get('/users')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');

                // Optional: Check if password field is excluded
                if (res.body.length > 0) {
                    expect(res.body[0]).to.not.have.property('password');
                }

                done();
            });
    });
});