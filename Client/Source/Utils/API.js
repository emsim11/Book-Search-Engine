export const Me = (Token) => {
    return fetch('/API/Users/Me', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${Token}`,
        },
    });
};

export const CreateUser = (UserData) => {
    return fetch('/API/Users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(UserData),
    });
};

export const LoginUser = (UserData) => {
    return fetch('/API/Users/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(UserData),
    });
};

// Save Book Data For A Logged In User
export const SaveBook = (BookData, Token) => {
    return fetch('/API/Users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(BookData),
    });
};

// Remove Saved Book Data For A Logged In User
export const DeleteBook = (BookId, Token) => {
    return fetch(`/API/Users/Books/${BookId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${Token}`,
        },
    });
};

// Make Search To Google Books API
export const SearchGoogleBooks = (Query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${Query}`);
};