import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Book';
import Link from 'next/link';

function UpdateBookInfo() {
  const [book, setBook] = useState<Book>(DefaultEmptyBook);
  const id = useParams<{ id: string }>().id;
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:8082/api/books/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setBook(json);
      })
      .catch((err) => {
        console.log('来自UpdateBookInfo的错误: ' + err);
      });
  }, [id]);

  const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const textAreaOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch(`http://localhost:8082/api/books/${id}`, {
      method: 'PUT', 
      headers: {"Content-Type": "application/json"}, 
      body: JSON.stringify(book)
    })
      .then((res) => {
        router.push(`/show-book/${id}`);
      })
      .catch((err) => {
        console.log('来自UpdateBookInfo的错误: ' + err);
      });
  };

  return (
    <div className='UpdateBookInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link href='/' className='btn btn-outline-warning float-left'>
              查看书籍列表
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>编辑书籍</h1>
            <p className='lead text-center'>更新书籍信息</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='title'>标题</label>
              <input
                type='text'
                placeholder='书籍标题'
                name='title'
                className='form-control'
                value={book.title}
                onChange={inputOnChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='isbn'>ISBN</label>
              <input
                type='text'
                placeholder='ISBN'
                name='isbn'
                className='form-control'
                value={book.isbn}
                onChange={inputOnChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='author'>作者</label>
              <input
                type='text'
                placeholder='作者'
                name='author'
                className='form-control'
                value={book.author}
                onChange={inputOnChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='description'>描述</label>
              <textarea
                placeholder='书籍描述'
                name='description'
                className='form-control'
                value={book.description}
                onChange={textAreaOnChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='published_date'>出版日期</label>
              <input
                type='text'
                placeholder='出版日期'
                name='published_date'
                className='form-control'
                value={book.published_date?.toString()}
                onChange={inputOnChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='publisher'>出版商</label>
              <input
                type='text'
                placeholder='书籍出版商'
                name='publisher'
                className='form-control'
                value={book.publisher}
                onChange={inputOnChange}
              />
            </div>
            <br />

            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              更新书籍
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBookInfo;