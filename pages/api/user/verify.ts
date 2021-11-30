/**
 * @fileoverview verifies the user
 *
 * When a user is created, a verification code is sent to their email.
 * This code must be entered to verify the user account before they can
 * use the app.
 * 
 * @method POST
 * @param {string} request.body.code - the verification code
 * @returns {Response} 200 - the user is verified or 400 - the code is invalid
 */