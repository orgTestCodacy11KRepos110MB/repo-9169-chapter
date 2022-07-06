declare namespace Cypress {
  interface Chainable {
    /**
     * Intercept GQL request
     * @param operationName Name of GQL operation to intercept
     */
    interceptGQL(operationName: string): void;

    /**
     * Get users of the chapter using GQL query
     * @param chapterId Id of the chapter
     */
    getChapterMembers(chapterId: number): Chainable<any>;

    /**
     * Get event users for event with eventId using GQL query
     * @param eventId Id of the event
     */
    getEventUsers(eventId: number): Chainable<any>;

    /**
     * Authenticate with JWT token
     * @param token JWT token for authorization. If not provided, Cypress.env.JWT token is used.
     */
    login(token?: string): void;

    /**
     * Register user using GQL query
     */
    register(firstName: string, lastName: string, email: string): void;

    /**
     * Register user using page UI
     */
    registerViaUI(firstName: string, lastName: string, email: string): void;

    /**
     * Wait until emails are received by mailhog
     * @param alias Name of the alias to reference emails by
     */
    waitUntilMail(alias: string): void;

    /**
     * Create event using GQL mutation
     * @param data Data of the event. Equivalent of CreateEventInputs for the Events resolver.
     */
    createEvent(data): Chainable<any>;

    /**
     * Delete event using GQL mutation
     * @param eventId Id of the event for deletion
     */
    deleteEvent(eventId: number): Chainable<any>;

    /**
     * Check if mail recipients are bcc
     * @param mail The sent mail of type Item(cypress-mailhog)
     */
    checkBcc(mail): Chainable<boolean>;

    /**
     * Create chapter using GQL mutation
     * @param data Data of the chapter. Equivalent of CreateChapterInputs for the Chapter resolver.
     */
    createChapter(data): Chainable<any>;

    /**
     * Update chapter using GQL mutation
     * @param chapterId Id of the chapter
     * @param data Data of the chapter. Equivalent of UpdateChapterInputs for the Chapter resolver.
     */
    updateChapter(chapterId: number, data): Chainable<any>;

    /**
     * Confirm rsvp of user with userId for the event with eventId
     * @param eventId Id of the event
     * @param userId Id of the user
     */
    confirmRsvp(eventId: number, userId: number): Chainable<any>;

    /**
     * Delete rsvp of user with userId for the event with eventId
     * @param eventId Id of the event
     * @param userId Id of the user
     */
    deleteRsvp(eventId: number, userId: number): Chainable<any>;

    /**
     * Rsvp to event with eventId and chapterId
     * @param eventId Id of the event
     * @param chapterId Id of the chapter
     * @param {object} [options={ withAuth: true }] Optional options object.
     */
    rsvpToEvent(
      { eventId, chapterId }: { eventId: number; chapterId: number },
      options?: { withAuth: true },
    ): Chainable<any>;

    /**
     * Auth request, with token of the logged in user, before sending it.
     * @param options Request options
     */
    authedRequest(options): Chainable<any>;
  }
}