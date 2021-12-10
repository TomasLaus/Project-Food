/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  id:'47cc1f55-e367-4860-a620-f3306234c556',
  name: 'Milanea a la napolitana',
  summary:"Es un plato muy sabroso"
};
const recipe2 = {  
  name:"Fideos",
  summary:"es una comida rica con manteca", 
  score:2,
  healthyness: 1 , 
  steps:"pasos",
  diets:["vegan"]
};
describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET recipes/:id', () => {
    it('should get 200', () =>
      agent.get('/recipes/47cc1f55-e367-4860-a620-f3306234c556').expect(200).timeout(10000)
    );
  });
  describe('GET /types', () => {
    it('should get 200', () =>
      agent.get('/types').expect(200).timeout(10000)
    );
  });
  describe('POST /recipe/', () => {
    it('should get 302 when created', () =>
      agent.post('/recipe')
      .send(recipe2).expect(200).timeout(10000)
    );
  });  
});
