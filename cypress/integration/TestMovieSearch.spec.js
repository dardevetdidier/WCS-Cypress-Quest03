/// <reference types="Cypress" />


describe("Search Movies TasteDive API suite tests", () => {
    let movies = require('../fixtures/movieData')
    const apiKey = Cypress.env('API_KEY')

    it('Should return status 200', () => {
        cy.movieSearchTasteDive(movies[0].query, movies[0].type, movies[0].limit, apiKey)
            .then(response => {
                expect(response.status).to.eql(200)
            })
    })

    it("Response should have valid schema", () => {
        for (let i=0; i<movies.length; i++) {
            cy.movieSearchTasteDive(movies[i].query, movies[i].type, movies[i].limit, apiKey)
            .then(response => {
                expect(response.body).to.have.property('Similar');
                expect(response.body.Similar).to.have.property('Info').to.be.an("array");
                expect(response.body.Similar).to.have.property('Results').to.be.an("array");

                let resultsArray = response.body.Similar.Results;
                resultsArray.forEach(element => {
                    expect(element).to.have.property('Name').to.be.a("string");
                    expect(element).to.have.property('Type').to.be.a("string");
                })
            })
        }
        
    })

    it("Should be movie type", () => {
        for (let i=0; i<movies.length; i++){
            cy.movieSearchTasteDive(movies[i].query, movies[i].type, movies[i].limit, apiKey)
            .then(response => {
                let resultsArray = response.body.Similar.Results;
                resultsArray.forEach(element => {
                    expect(element.Type).to.equal(movies[i].type);
                })
            })
        }
        
    })

    it('Should have number of results equal max to limit', () => {
        cy.movieSearchTasteDive(movies[0].query, movies[0].type, movies[0].limit, apiKey)
            .then(response => {
                expect(response.body.Similar.Results.length).to.be.at.most(movies[0].limit)
            })
    })
})