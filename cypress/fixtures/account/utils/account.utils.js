const institution = require('../models/institution.json')

Cypress.Commands.add("auth", (username, password) => {
    cy.request({
        method: 'POST',
        url: '/auth',
        headers: { 'Content-Type': 'application/json' },
        body: { username: username, password: password }
    }).then(response => response.body.access_token)
})

Cypress.Commands.add("createInstitution", (state) => {
    cy.request({
        method: 'POST',
        url: '/institutions',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '.concat(state.accessTokenAdmin)
        },
        body: institution
    }).then(response => response.body)
})

Cypress.Commands.add("createEducator", function (educator, state) {
    cy.request({
        method: 'POST',
        url: '/educators',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '.concat(state.accessTokenAdmin)
        },
        body: educator
    }).then(response => response.body)
})

Cypress.Commands.add("createChild", (child, state) => {
    cy.request({
        method: 'POST',
        url: '/children',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '.concat(state.accessTokenAdmin)
        },
        body: child
    }).then(response => response.body)
})

Cypress.Commands.add("registerGroupFromEducador", (educator, children_group) => {
    cy.auth(educator.username, educator.password)
        .then((response) => {
            cy.request({
                method: 'POST',
                url: `/educators/${educator.id}/children/groups`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(response)
                },
                body: children_group
            }).then(response => response.body)
        })
})