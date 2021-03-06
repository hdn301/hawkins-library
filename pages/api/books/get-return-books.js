/* Query for reading the books to be displayed on the return page.
 * When a user types in their email address, books associated with
 * the user through the cid in the checkoutOrders table will be
 * displayed.
 *
 * Queries use sql-template-strings library, which handles
 * implementation of parameterized queries.
 *
 * See https://www.npmjs.com/package/sql-template-strings.*/

const db = require('../../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  const queryForEmail = await db.query(escape`
    SELECT email
    FROM customers
    WHERE email = ${req.body.email}
  `)
  // User not found with the associated username
  if (queryForEmail.length === 0) {
    res.status(200).json({
      message: 'Email not found.',
      statusNo: 3,
      checkedOutBooks: [],
      numberOfBooks: 0,
      userEmail: req.body.email
    })
  }
  // If user found with associated username
  else {
    const checkedOutBooks = await db.query(escape`
      SELECT bookId, title, author, oid, imgUrl, email
      FROM books
      INNER JOIN checkoutOrders ON checkoutOrders.orderId = books.oid
      INNER JOIN customers ON customers.customerId = checkoutOrders.cid
      WHERE email = ${req.body.email}
    `)
    const numberOfBooks = checkedOutBooks.length
    res.status(200).json({
      message: `${numberOfBooks} book${numberOfBooks != 1 ? 's' : ''} found under ${
        req.body.email
      }`,
      statusNo: 0,
      checkedOutBooks,
      numberOfBooks,
      userEmail: req.body.email
    })
  }
}
