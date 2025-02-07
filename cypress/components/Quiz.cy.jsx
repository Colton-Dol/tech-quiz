import React from "react";
import Quiz from '../../client/src/components/Quiz';

describe('<Quiz />', () => {
    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: '/api/questions/random'
        },
        {
            fixture: 'questions.json',
            statusCode: 200
        }).as('getRandomQuestion');
    });
    // The component should mount
    it('should render the component', () => {
        cy.mount(<Quiz />);
    });
    // The start quiz button should render
    it('should display the Start Quiz button', () => {
        cy.mount(<Quiz />);
        cy.get('button').should('contain', 'Start Quiz');
    });
    // The questions should render
    it('should render the question when quiz starts', () => {
        cy.mount(<Quiz />);
        cy.get('button').contains('Start Quiz').click();
        cy.wait('@getRandomQuestion');
        cy.get('h2').should('contain', 'What is the output of print(2 ** 3)?');
        cy.get('.mt-3').children().should('have.length', '4');
        cy.get('.mt-3').children().eq(0).children().eq(1).should('contain', '6');
        cy.get('.mt-3').children().eq(1).children().eq(1).should('contain', '8');
        cy.get('.mt-3').children().eq(2).children().eq(1).should('contain', '9');
        cy.get('.mt-3').children().eq(3).children().eq(1).should('contain', '12');
    });
    // When the quiz ends, score is viewable
    it('should render the score when the quiz ends', () => {
        cy.mount(<Quiz />);
        cy.get('button').contains('Start Quiz').click();
        cy.wait('@getRandomQuestion');
        for(let i = 1; i <= 10; i++) {
            cy.get('button').contains('1').click();
        }
        cy.get('.alert-success').should('be.visible').and('contain', 'Your score: 2/10');
    })
})