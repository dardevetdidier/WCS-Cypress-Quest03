describe("Search Movies TasteDive API suite tests", () => {
    let movie = require('../fixtures/movieData')
    const apiKey = `${Cypress.env('API_KEY')}`

    it('Should return status 200', () => {
        cy.movieSearchTasteDive(movie[0].query, movie[0].type, movie[0].limit, apiKey)
            .then(response => {
                expect(response.status).to.eql(200)
            })
    })

    it("Response should have valid schema", () => {
        cy.movieSearchTasteDive(movie[1].query, movie[1].type, movie[1].limit, apiKey)
            .then(response => {
                expect(response.body).to.have.property('Similar')
                expect(response.body.Similar).to.have.property('Info')
                expect(response.body.Similar).to.have.property('Results')

                let resultsArray = response.body.Similar.Results;
                resultsArray.forEach(element => {
                    expect(element).to.have.property('Name')
                    expect(element).to.have.property('Type')
                })
            })
    })

    it("Should be movie type", () => {
        cy.movieSearchTasteDive(movie[1].query, movie[1].type, movie[1].limit, apiKey)
            .then(response => {
                let resultsArray = response.body.Similar.Results;
                resultsArray.forEach(element => {
                    expect(element.Type).to.equal("movie");
                })
            })
    })

    it('Should have number of results equal max to limit', () => {
        cy.movieSearchTasteDive(movie[0].query, movie[0].type, movie[0].limit, apiKey)
            .then(response => {
                expect(response.body.Similar.Results.length).to.be.at.most(movie[0].limit)
            })
    })
})