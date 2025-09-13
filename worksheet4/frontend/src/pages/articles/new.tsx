import { FormEvent, useState } from "react";
import formStyles from "../../styles/Form.module.scss";

const NewDiscussion = () => {
  // 定义表单状态变量
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [summary, setSummary] = useState("");
  const [linkedDiscussion, setLinkedDiscussion] = useState("");

  // 表单提交处理函数
  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止表单默认提交行为

    // 在控制台打印提交的表单数据（JSON格式）
    console.log(
      JSON.stringify({
        title,
        authors,
        source,
        publication_year: pubYear,
        doi,
        summary,
        linked_discussion: linkedDiscussion,
      })
    );
  };

  // 作者数组的辅助方法
  const addAuthor = () => {
    setAuthors(authors.concat([""])); // 添加新的作者输入框
  };

  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index)); // 移除指定索引的作者输入框
  };

  const changeAuthor = (index: number, value: string) => {
    setAuthors(
      authors.map((oldValue, i) => {
        return index === i ? value : oldValue; // 更新指定索引的作者姓名
      })
    );
  };

  // 渲染表单
  return (
    <div className="container">
      <h1>新建文章</h1>
      <form className={formStyles.form} onSubmit={submitNewArticle}>
        {/* 文章标题输入框 */}
        <label htmlFor="title">标题：</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        {/* 作者输入区域（支持添加/删除多个作者） */}
        <label htmlFor="author">作者：</label>
        {authors.map((author, index) => {
          return (
            <div key={`author ${index}`} className={formStyles.arrayItem}>
              <input
                type="text"
                name="author"
                value={author}
                onChange={(event) => changeAuthor(index, event.target.value)}
                className={formStyles.formItem}
              />
              <button
                onClick={() => removeAuthor(index)}
                className={formStyles.buttonItem}
                style={{ marginLeft: "3rem" }}
                type="button" // 注意：类型为button，避免触发表单提交
              >
                -
              </button>
            </div>
          );
        })}
        <button
          onClick={() => addAuthor()}
          className={formStyles.buttonItem}
          style={{ marginLeft: "auto" }}
          type="button"
        >
          +
        </button>

        {/* 文章来源输入框 */}
        <label htmlFor="source">来源：</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="source"
          id="source"
          value={source}
          onChange={(event) => {
            setSource(event.target.value);
          }}
        />

        {/* 发表年份输入框 */}
        <label htmlFor="pubYear">发表年份：</label>
        <input
          className={formStyles.formItem}
          type="number"
          name="pubYear"
          id="pubYear"
          value={pubYear}
          onChange={(event) => {
            const val = event.target.value;
            if (val === "") {
              setPubYear(0);
            } else {
              setPubYear(parseInt(val)); // 将输入值转换为数字
            }
          }}
        />

        {/* DOI输入框 */}
        <label htmlFor="doi">DOI：</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="doi"
          id="doi"
          value={doi}
          onChange={(event) => {
            setDoi(event.target.value);
          }}
        />

        {/* 摘要文本框 */}
        <label htmlFor="summary">摘要：</label>
        <textarea
          className={formStyles.formTextArea}
          name="summary"
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
        />

        {/* 提交按钮 */}
        <button className={formStyles.formItem} type="submit">
          提交
        </button>
      </form>
    </div>
  );
};

export default NewDiscussion;