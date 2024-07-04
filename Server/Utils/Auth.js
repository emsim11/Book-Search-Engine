const JWT = require('jsonwebtoken');

// Set Token Secret & Expiration
const Secret = 'mysecretshhhhh';
const Expiration = '2h';

module.exports = {
    // Function For Authenticated Routes
    AuthMiddleware: function({ Req }) {
        // Allow Token To Be Sent Via Req.query Or headers
        let Token = Req.body.Token || Req.query.Token || Req.headers.authorization;

        // ['Bearer', '<TokenValue>']
        if (Req.headers.authorization) {
            Token = Token.split(' ').pop().trim();
        }

        // If No Token Is Passed, Return The Request
        if (!Token) {
            return Req;
        }

        // Verify Token And Get User Data
        try {
            const { data } = JWT.verify(Token, Secret, { maxAge: Expiration });
            Req.User = data;
        } catch {
            console.log('Invalid Token');
            // return Res.status(400).json({ message: 'Invalid Token!' });
        }
        // Return Request Object, Which Is Then Passed To The Resolvers As `Context`
        return Req;
    },
    SignToken: function ({ _id, Username, Email }) {
        const Payload = { _id, Username, Email };
        return JWT.sign({ data: Payload }, Secret, { expiresIn: Expiration });
    },
};