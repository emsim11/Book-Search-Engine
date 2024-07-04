export const GetSavedBookIds = () => {
    const SavedBookIds = localStorage.getItem('Saved_Books')
    ? JSON.parse(localStorage.getItem('Saved_Books'))
    : [];
    return SavedBookIds;
};

export const SaveBookIds = (BookIds) => {
    if (BookIds.length) {
        localStorage.setItem('Saved_Books', JSON.stringify(BookIds));
    } else {
        localStorage.removeItem('Saved_Books');
    }
};

export const RemoveBookId = (BookId) => {
    const SavedBookIds = localStorage.getItem('Saved_Books')
    ? JSON.parse(localStorage.getItem('Saved_Books'))
    : null;
    if (!SavedBookIds) {
        return false;
    }

    const UpdatedSavedBookIds = SaveBookIds?.filter((SavedBookId) => SavedBookId !== BookId);
    localStorage.setItem('Saved_Books', JSON.stringify(UpdatedSavedBookIds));
    return true;
};