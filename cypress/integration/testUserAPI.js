/// reference types="cypress" />
describe('Tests for USER API', function(){

    it('Create user', function() {
        cy.fixture('requestPostCreateUser').then( function(requestPost){
            cy.fixture('responsePostCreateUser').then( function(responsePost){
                cy.request('POST', '/user', requestPost)
                .then(function(response) {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('code', responsePost.code)
                    expect(response.body).to.have.property('type', responsePost.type)
                    expect(response.body).to.have.property('message', responsePost.message)
                })
            })
        })
    })

    it('Get user', function() {
        cy.fixture('responseGetUser').then( function(responsePost){
            cy.request('GET', '/user/' + responsePost.username).then(function(response) {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id', responsePost.id)
                expect(response.body).to.have.property('username', responsePost.username)
                expect(response.body).to.have.property('firstName', responsePost.firstName)
                expect(response.body).to.have.property('lastName', responsePost.lastName)
                expect(response.body).to.have.property('email', responsePost.email)
                expect(response.body).to.have.property('password', responsePost.password)
                expect(response.body).to.have.property('phone', responsePost.phone)
                expect(response.body).to.have.property('userStatus', responsePost.userStatus)
            })
        })
    })

    it('Logs user into the system', function() {
        cy.fixture('requestPostCreateUser').then( function(requestPost){
            cy.request('GET', '/user/login?username=' + requestPost.username + '&' + 'password=' + requestPost.password)
            .then(function(response) {
                expect(response.status).to.eq(200)
            })
        })
    })    

    it('Logs out current user', function() {
        cy.fixture('requestPostCreateUser').then( function(requestPost){
            cy.request('GET', '/user/logout')
            .then(function(response) {
                expect(response.status).to.eq(200)
            })
        })
    })

    it('Create user with array', function() {
        cy.fixture('requestPostCreateUserWithArray').then( function(requestPost){
            cy.fixture('responsePostCreateUserWithArray').then( function(responsePost){
                cy.request('POST', '/user/createWithArray', requestPost)
                .then(function(response) {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('code', responsePost.code)
                    expect(response.body).to.have.property('type', responsePost.type)
                    expect(response.body).to.have.property('message', responsePost.message)
                })
            })
        })
    })

    it('Create user with list', function() {
        cy.fixture('requestPostCreateUserWithArray').then( function(requestPost){
            cy.fixture('responsePostCreateUserWithArray').then( function(responsePost){
                cy.request('POST', '/user/createWithList', requestPost)
                .then(function(response) {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('code', responsePost.code)
                    expect(response.body).to.have.property('type', responsePost.type)
                    expect(response.body).to.have.property('message', responsePost.message)
                })
            })
        })
    })

    it('Update user', function() {
        cy.fixture('requestPostCreateUser').then( function(requestPost){
            cy.request('POST', '/user', requestPost).then(function(response) {
                expect(response.status).to.eq(200)
            })
                
            var newFirstName = 'Michal'
            var newEmail = 'misie@wp.pl'
            requestPost.firstName = newFirstName
            requestPost.email = newEmail

            cy.request('PUT', '/user/' + requestPost.username, requestPost)
            .then(function(response) {
                expect(response.status).to.eq(200)
            })

            cy.request('GET', '/user/' + requestPost.username).then(function(response) {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id', requestPost.id)
                expect(response.body).to.have.property('email', newEmail)
                expect(response.body).to.have.property('firstName', newFirstName)
            })
        })
    })

    it('Delete user', function() {
        cy.fixture('requestPostCreateUser').then( function(requestPost){
            cy.request('POST', '/user', requestPost).then(function(response) {
                expect(response.status).to.eq(200)
            })

            cy.request('DELETE', '/user/' + requestPost.username, requestPost).then(function(response) {
                expect(response.status).to.eq(200)
            })
        })
    })
})