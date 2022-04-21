/// reference types="cypress" />

describe('Tests for Store API', function(){

    it('Place and order for a pet', function() {
        cy.fixture('requestPostStoreOrder200').then( function(requestPost){
            cy.fixture('requestPostStoreOrder200').then( function(responsePost){
                cy.request('POST', '/store/order', requestPost)
                .then(function(response) {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('petId', responsePost.petId)
                    expect(response.body).to.have.property('quantity', responsePost.quantity)
                    expect(response.body).to.have.property('status', responsePost.status)
                    expect(response.body).to.have.property('complete', responsePost.complete)
                })
            })
        })
    })

    it('Find purchase order by ID', function() {
        cy.fixture('responseGetStoreOrder200').then( function(responsePost){
            cy.request('GET', '/store/order/' + responsePost.id).then(function(response) {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id', responsePost.id)
                expect(response.body).to.have.property('petId', responsePost.petId)
                expect(response.body).to.have.property('quantity', responsePost.quantity)
                expect(response.body).to.have.property('status', responsePost.status)
                expect(response.body).to.have.property('complete', responsePost.complete)
            })
        })
    })

    it('Delete purchase order by ID', function() {
        cy.fixture('requestPostStoreOrder200').then( function(requestPost){
            cy.fixture('requestPostStoreOrder200').then( function(responsePost){
                cy.request('POST', '/store/order', requestPost)
                .then(function(response) {
                    var id = response.body.id
                    cy.request('DELETE', '/store/order/' + id).then(function(responseDelete) {
                        expect(responseDelete.status).to.eq(200)
                    })
                })
            })
        })
    })

    it('Returns pet inventories by status', function() {
        cy.request('GET', '/store/inventory').then(function(response) {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('sold')
            expect(response.body).to.have.property('string')
            expect(response.body).to.have.property('available')
            expect(response.body).to.have.property('beschikbaar')
            expect(response.body).to.have.property('Available')
            expect(response.body).to.have.property('dead')
            expect(response.body).to.have.property('status')
        })
    })
})
