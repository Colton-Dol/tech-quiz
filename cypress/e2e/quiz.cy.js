describe('User Journey', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:3001/');
    })
    // Should visit the home page
    it('A user can visit the home page', () => {
        cy.visit('http://127.0.0.1:3001/');
    });
    // When start button is clicked, the quiz begins
    it('A user can click the start button to begin the quiz', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('h2');
    })
    // When an answers is chosen, the next question is presented
    it('When a user answers a question, they get another question', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('h2').as('question');
        cy.get('button').contains('1').click();
        cy.get('h2').should('not.have.text', '@question');
    })
    // When all questions are answered, the final score appears
    it('A user can see their score after answering every question', () => {
        cy.get('button').contains('Start Quiz').click();
        for (let i = 1; i <= 10; i++) {
            cy.get('button').contains('1').click();
        }
        cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
    })
    // When take new quiz is clicked, a new quiz begins
    it('A user can click the Take New Quiz button to start another quiz', () => {
        cy.get('button').contains('Start Quiz').click();
        for (let i = 1; i <= 10; i++) {
            cy.get('button').contains('1').click();
        }
        cy.get('button').contains('Take New Quiz').click();
        cy.get('h2').should('not.have.text', 'Quiz Completed');
    })
})