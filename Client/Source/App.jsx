import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import SearchBooks from './Pages/SearchBooks';
import SavedBooks from './Pages/SavedBooks';
import Navbar from './Components/Navbar';

const HTTPLink = createHttpLink({
    uri: '/graphql',
});

const AuthLink = setContext((_, { headers }) => {

    // Retrieve Authentication Token From Local Storage If It Exists
    const Token = localStorage.getItem('Id_Token');

    // Return Headers To The Context So HTTPLink Can Read Them
    return {
        headers: {
            ...headers,
            Authorization: Token ? `Bearer ${Token}` : '',
        },
    };
});

// Set Up Client To Execute The `AuthLink` Middleware Prior To Making Request To GraphQL API 
const Client = new ApolloClient({
    link: AuthLink.concat(HTTPLink),
    cache: new InMemoryCache(),
});

const App = () => {
    return (
        <ApolloProvider client={Client}>
            <Router>
                <>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' element={<SearchBooks />} />
                        <Route exact path='/Saved' element={<SavedBooks />} />
                        <Route path='*' element={<h1 className='Error'>Wrong Page!</h1>} />
                    </Switch>
                </>
            </Router>
        </ApolloProvider>
    );
}

export default App;