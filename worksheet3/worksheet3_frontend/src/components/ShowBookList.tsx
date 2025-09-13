import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BookCard from './BookCard';
import { Book } from './Book';

function ShowBookList() {
  const [books, setBooks] = useState<[Book?]>([]);

  useEffect(() => {
    fetch('http://localhost:8082/api/books')
      .then((res) => {
        return res.json();
      })
      .then((books) => {
        setBooks(books);
      })
      .catch((err) => {
        console.log('来自ShowBookList的错误: ' + err);
      });
  }, []);

  const bookList =
    books.length === 0
      ? '没有书籍记录！'
      : books.map((book, k) => <BookCard book={book} key={k} />);

  return (
    <div className='ShowBookList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>书籍列表</h2>
          </div>

          <div className='col-md-11'>
            <Link
              href='/create-book'
              className='btn btn-outline-warning float-right'
            >
              + 添加新书籍
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className='list'>{bookList}</div>
      </div>
    </div>
  );
}

export default ShowBookList;