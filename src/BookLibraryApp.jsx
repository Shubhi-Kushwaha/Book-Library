import React, { useState, useEffect } from 'react';
import { Search, Book, User, ShoppingBag, X, Plus, Minus, Check, Trash2, Info, BookOpen, Tag, Copy, Ban, Undo } from 'lucide-react';

const BookLibraryApp = () => {
  // Sample book data with 3 default books
  const [books] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      total_copies: 5,
      available_copies: 3,
      description: "A classic American novel set in the Jazz Age, following the mysterious Jay Gatsby and his obsession with Daisy Buchanan. This masterpiece explores themes of wealth, love, idealism, and moral decay in America during the Roaring Twenties.",
      isbn: "978-0-7432-7356-5",
      published_year: 1925,
      cover_color: "from-emerald-400 to-cyan-400"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      total_copies: 4,
      available_copies: 0,
      description: "A gripping tale of racial injustice and childhood innocence in the American South during the 1930s. Through the eyes of Scout Finch, this powerful story explores themes of morality, prejudice, and the loss of innocence.",
      isbn: "978-0-06-112008-4",
      published_year: 1960,
      cover_color: "from-orange-400 to-rose-400"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      genre: "Science Fiction",
      total_copies: 6,
      available_copies: 2,
      description: "A dystopian social science fiction novel about totalitarian control and surveillance. Set in a world where Big Brother watches everything, this prophetic work explores themes of government control, truth, and individual freedom.",
      isbn: "978-0-452-28423-4",
      published_year: 1949,
      cover_color: "from-purple-400 to-pink-400"
    }
  ]);

  const [filteredBooks, setFilteredBooks] = useState(books);
  const [myBag, setMyBag] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showBagModal, setShowBagModal] = useState(false);
  const [notification, setNotification] = useState(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  const currentUser = { id: 1, name: "John Doe", role: "user" };
  useEffect(() => {
    window.myBagCount = myBag.length;
    window.dispatchEvent(new Event("bag-updated"));
  }, [myBag]);

  // Apply filters when filter values change
  useEffect(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = !genreFilter || book.genre === genreFilter;
      const matchesAvailability = !availabilityFilter || 
        (availabilityFilter === 'available' && book.available_copies > 0) ||
        (availabilityFilter === 'unavailable' && book.available_copies === 0);

      return matchesSearch && matchesGenre && matchesAvailability;
    });
    setFilteredBooks(filtered);
  }, [searchTerm, genreFilter, availabilityFilter, books]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const isBookInBag = (bookId) => {
    return myBag.some(book => book.id === bookId);
  };

  const isBookBorrowed = (bookId) => {
    return borrowedBooks.some(book => book.id === bookId);
  };

  const addToBag = (bookId) => {
    const book = books.find(b => b.id === bookId);
    if (book && !isBookInBag(bookId)) {
      setMyBag([...myBag, book]);
      showNotification(`"${book.title}" added to your bag!`);
    }
  };

  const removeFromBag = (bookId) => {
    const book = books.find(b => b.id === bookId);
    setMyBag(myBag.filter(b => b.id !== bookId));
    showNotification(`"${book.title}" removed from your bag!`, 'info');
  };

  const borrowBookDirectly = (bookId) => {
    const book = books.find(b => b.id === bookId);
    if (book && book.available_copies > 0) {
      book.available_copies--;
      setBorrowedBooks([...borrowedBooks, {...book, borrow_date: new Date()}]);
      showNotification(`"${book.title}" borrowed successfully!`);
      setShowBookModal(false);
    }
  };

  const returnBook = (bookId) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      book.available_copies++;
      setBorrowedBooks(borrowedBooks.filter(b => b.id !== bookId));
      showNotification(`"${book.title}" returned successfully!`);
    }
  };

  const borrowAllBooks = () => {
    const availableBooks = myBag.filter(book => book.available_copies > 0);
    availableBooks.forEach(book => {
      book.available_copies--;
      setBorrowedBooks(prev => [...prev, {...book, borrow_date: new Date()}]);
    });
    setMyBag([]);
    setShowBagModal(false);
    showNotification(`${availableBooks.length} books borrowed successfully!`);
  };

  const clearBag = () => {
    setMyBag([]);
    showNotification('Bag cleared!', 'info');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setGenreFilter('');
    setAvailabilityFilter('');
  };

  const openBookDetail = (book) => {
    setSelectedBook(book);
    setShowBookModal(true);
  };

  const genres = ['Fiction', 'Science Fiction', 'Non-Fiction', 'Romance', 'Mystery', 'Fantasy', 'Biography', 'History'];

  return (
    <div
  className="min-h-screen relative overflow-x-hidden"
  style={{
    background:
      "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 8%, #3a3020 18%, #4a4028 28%, #5a5030 40%, #6a6038 55%, #7a7040 70%, #8a8048 80%, #2a2a2a 90%, #000000 100%)",
  }}
>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white ${
          notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`}>
          {notification.message}
        </div>
      )}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow">
    <div className="text-3xl font-bold text-black mb-2">{books.length}</div>
    <div className="text-gray-600">Total Books</div>
  </div>
  <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow">
    <div className="text-3xl font-bold text-black mb-2">
      {books.filter(b => b.available_copies > 0).length}
    </div>
    <div className="text-gray-600">Available Books</div>
  </div>
  <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow">
    <div className="text-3xl font-bold text-black mb-2">{borrowedBooks.length}</div>
    <div className="text-gray-600">My Borrowed</div>
  </div>
  <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow">
    <div className="text-3xl font-bold text-black mb-2">{myBag.length}</div>
    <div className="text-gray-600">In My Bag</div>
  </div>
</div>


        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-white font-semibold mb-2">Search Books</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Genre</label>
              <select
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="" className="bg-gray-800">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre} className="bg-gray-800">{genre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Availability</label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="" className="bg-gray-800">All Books</option>
                <option value="available" className="bg-gray-800">Available Only</option>
                <option value="unavailable" className="bg-gray-800">Unavailable Only</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <X className="h-5 w-5" />
                <span>Clear Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Search className="mx-auto h-16 w-16 text-white/30 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No books found</h3>
              <p className="text-white/70">Try adjusting your search criteria</p>
            </div>
          ) : (
            filteredBooks.map(book => (
              <div key={book.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
                {/* Book Cover */}
                <div className={`h-48 bg-gradient-to-br ${book.cover_color} relative flex items-center justify-center cursor-pointer`}
                     onClick={() => openBookDetail(book)}>
                  <BookOpen className="h-16 w-16 text-white/80" />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white p-2 rounded text-sm text-center">
                    {book.title}
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2 cursor-pointer hover:text-gray-700" 
                      onClick={() => openBookDetail(book)}>
                    {book.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{book.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4" />
                      <span>{book.genre}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Copy className="h-4 w-4" />
                      <span className={book.available_copies > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                        {book.available_copies}/{book.total_copies} available
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openBookDetail(book)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-1"
                    >
                      <Info className="h-4 w-4" />
                      <span>Details</span>
                    </button>
                    
                    {book.available_copies > 0 && !isBookInBag(book.id) && !isBookBorrowed(book.id) ? (
                      <button
                        onClick={() => addToBag(book.id)}
                        className="flex-1 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add to Bag</span>
                      </button>
                    ) : book.available_copies === 0 ? (
                      <button
                        disabled
                        className="flex-1 bg-gray-300 text-gray-500 px-4 py-2 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center space-x-1"
                      >
                        <Ban className="h-4 w-4" />
                        <span>Unavailable</span>
                      </button>
                    ) : isBookInBag(book.id) ? (
                      <button
                        onClick={() => removeFromBag(book.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-1"
                      >
                        <Minus className="h-4 w-4" />
                        <span>Remove</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => returnBook(book.id)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-1"
                      >
                        <Undo className="h-4 w-4" />
                        <span>Return</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Book Detail Modal */}
      {showBookModal && selectedBook && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-black">{selectedBook.title}</h2>
                <button
                  onClick={() => setShowBookModal(false)}
                  className="text-gray-500 hover:text-black"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-3 mb-6 text-black">
                <div><strong>Author:</strong> {selectedBook.author}</div>
                <div><strong>Genre:</strong> {selectedBook.genre}</div>
                <div><strong>ISBN:</strong> {selectedBook.isbn}</div>
                <div><strong>Published:</strong> {selectedBook.published_year}</div>
                <div>
                  <strong>Availability:</strong> 
                  <span className={selectedBook.available_copies > 0 ? 'text-green-600 font-semibold ml-2' : 'text-red-600 font-semibold ml-2'}>
                    {selectedBook.available_copies}/{selectedBook.total_copies} copies available
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-black mb-2">Description:</h4>
                <p className="text-gray-600 leading-relaxed">{selectedBook.description}</p>
              </div>

              <div className="flex justify-center space-x-4">
                {selectedBook.available_copies > 0 && !isBookInBag(selectedBook.id) && !isBookBorrowed(selectedBook.id) ? (
                  <>
                    <button
                      onClick={() => {
                        addToBag(selectedBook.id);
                        setShowBookModal(false);
                      }}
                      className="bg-gray-100 hover:bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Add to Bag</span>
                    </button>
                    <button
                      onClick={() => borrowBookDirectly(selectedBook.id)}
                      className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Book className="h-5 w-5" />
                      <span>Borrow Now</span>
                    </button>
                  </>
                ) : selectedBook.available_copies === 0 ? (
                  <button
                    disabled
                    className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-semibold cursor-not-allowed flex items-center space-x-2"
                  >
                    <Ban className="h-5 w-5" />
                    <span>Currently Unavailable</span>
                  </button>
                ) : isBookInBag(selectedBook.id) ? (
                  <button
                    onClick={() => {
                      removeFromBag(selectedBook.id);
                      setShowBookModal(false);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Minus className="h-5 w-5" />
                    <span>Remove from Bag</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      returnBook(selectedBook.id);
                      setShowBookModal(false);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Undo className="h-5 w-5" />
                    <span>Return Book</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* My Bag Modal */}
      {showBagModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black flex items-center space-x-2">
                  <ShoppingBag className="h-6 w-6" />
                  <span>My Bag</span>
                </h2>
                <button
                  onClick={() => setShowBagModal(false)}
                  className="text-gray-500 hover:text-black"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {myBag.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-black mb-2">Your bag is empty</h3>
                  <p className="text-gray-600">Add some books to your bag to borrow them later!</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {myBag.map(book => (
                      <div key={book.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-black">{book.title}</h4>
                          <p className="text-gray-600">by {book.author} • {book.genre}</p>
                          <p className="text-sm text-gray-500">Available: {book.available_copies}/{book.total_copies} copies</p>
                        </div>
                        <button
                          onClick={() => removeFromBag(book.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-1"
                        >
                          <Minus className="h-4 w-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={borrowAllBooks}
                      className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Check className="h-5 w-5" />
                      <span>Borrow All Books</span>
                    </button>
                    <button
                      onClick={clearBag}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span>Clear Bag</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookLibraryApp;