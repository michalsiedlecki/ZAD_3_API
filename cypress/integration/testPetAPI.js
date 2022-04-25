/// reference types="cypress" />

describe('Tests for Pet API', function(){

    it('Add a new pet to the store', function() {
        cy.fixture('requestPostAddPet').then( function(requestPost){
            cy.request('POST', '/pet', requestPost).then(function(response) {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id', requestPost.id)
                expect(response.body).to.have.deep.property('category', requestPost.category)
                expect(response.body).to.have.property('name', requestPost.name)
                expect(response.body).to.have.deep.property('tags', requestPost.tags)
                expect(response.body).to.have.property('status', requestPost.status)

            })
        })
    })

    it('Find pet by ID', function() {
        cy.fixture('requestPostAddPet').then( function(requestPost){
            cy.request('GET', '/pet/' + requestPost.id, requestPost).then(function(response) {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id', requestPost.id)
                expect(response.body).to.have.deep.property('category', requestPost.category)
                expect(response.body).to.have.property('name', requestPost.name)
                expect(response.body).to.have.deep.property('tags', requestPost.tags)
                expect(response.body).to.have.property('status', requestPost.status)
            })
        })
    })
    
    // it('Update an existing pet', function() {
    //     cy.fixture('requestPostAddPet').then( function(requestPost){
    //         var newName = 'Piesio'
    //         requestPost.name = newName
    //         cy.request('PUT', '/pet').then(function(response) {
    //             expect(response.status).to.eq(200)
    //             expect(response.body).to.have.property('id', requestPost.id)
    //             expect(response.body).to.have.deep.property('category', requestPost.category)
    //             expect(response.body).to.have.property('name', requestPost.name)
    //             expect(response.body).to.have.deep.property('tags', requestPost.tags)
    //             expect(response.body).to.have.property('status', requestPost.status)
    //             cy.request('GET', '/pet/' + requestPost.id, requestPost).then(function(response) {
    //                 expect(response.status).to.eq(200)
    //                 expect(response.body).to.have.property('name', requestPost.name)
    //             })
    //         })
    //     })
    // })

    it('Updates a pet in the store with form data', function() {
        cy.fixture('requestPostAddPet').then( function(requestPost){
            var newName = 'Koteł'
            requestPost.name = newName
            cy.request('POST', '/pet', requestPost).then(function(response) {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id', requestPost.id)
                expect(response.body).to.have.deep.property('category', requestPost.category)
                expect(response.body).to.have.property('name', requestPost.name)
                expect(response.body).to.have.deep.property('tags', requestPost.tags)
                expect(response.body).to.have.property('status', requestPost.status)
                cy.request('GET', '/pet/' + requestPost.id, requestPost).then(function(response) {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('name', requestPost.name)
                })
            })
        })
    })

    it('Delete a pet', function() {
        cy.fixture('requestPostAddPet').then( function(requestPost){
            cy.request('DELETE', '/pet/' + requestPost.id, requestPost).then(function(response) {
                expect(response.status).to.eq(200)
            })
        })
    })
})
