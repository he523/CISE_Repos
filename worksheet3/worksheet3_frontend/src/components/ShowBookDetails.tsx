'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Book';
import Link from 'next/link';

function ShowBookDetails() {
  const [book, setBook] = useState<Book>(DefaultEmptyBook);

  const id = useParams<{ id: string }>().id;
  const navigate = useRouter();

  useEffect(() => {
    fetch(`http://localhost:8082/api/books/${id}`)
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        setBook(json);
      })
      .catch((err) => {
        console.log('来自ShowBookDetails的错误: ' + err);
      });
  }, [id]);

  const onDeleteClick = (id: string) => {
    fetch(`http://localhost:8082/api/books/${id}`, { method: 'DELETE' })
      .then((res) => {
        navigate.push('/');
      })
      .catch((err) => {
        console.log('来自ShowBookDetails_deleteClick的错误: ' + err);
      });
  };

  const BookItem = (
    <div>
      <table className='table table-hover table-dark table-striped table-bordered'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>标题</td>
            <td>{book.title}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>作者</td>
            <td>{book.author}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>ISBN</td>
            <td>{book.isbn}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>出版商</td>
            <td>{book.publisher}</td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td>出版日期</td>
            <td>{book.published_date?.toString()}</td>
          </tr>
          <tr>
            <th scope='row'>6</th>
            <td>描述</td>
            <td>{book.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='ShowBookDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link href='/' className='btn btn-outline-warning float-left'>
              查看书籍列表
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>书籍记录</h1>
            <p className='lead text-center'>查看书籍信息</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{BookItem}</div>
          <div className='col-md-6 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(book._id || "");
              }}
            >
              删除书籍
            </button>
          </div>
          <div className='col-md-6 m-auto'>
            <Link
              href={`/edit-book/${book._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              编辑书籍
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowBookDetails;