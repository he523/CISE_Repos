import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import data from "../../utils/dummydata";

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim: string;
  evidence: string;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "文章标题" },
    { key: "authors", label: "作者" },
    { key: "source", label: "来源" },
    { key: "pubyear", label: "发表年份" },
    { key: "doi", label: "数字对象标识符（DOI）" },
    { key: "claim", label: "主张" },
    { key: "evidence", label: "证据" },
  ];

  return (
    <div className="container">
      <h1>文章列表页</h1>
      <p>本页面包含文章表格：</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async (_) => {
  // 映射数据，确保所有文章的属性名一致
  const articles = data.map((article) => ({
    id: article.id ?? article._id, // 兼容id和_id两种属性名
    title: article.title,
    authors: article.authors,
    source: article.source,
    pubyear: article.pubyear,
    doi: article.doi,
    claim: article.claim,
    evidence: article.evidence,
  }));

  return {
    props: {
      articles,
    },
  };
};

export default Articles;