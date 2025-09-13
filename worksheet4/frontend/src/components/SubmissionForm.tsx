import React from "react";
import { useForm } from "react-hook-form"; // 导入react-hook-form核心方法

export default function SubmissionForm() {
  // 初始化react-hook-form
  const { register, handleSubmit } = useForm();

  // 表单提交处理函数（将数据转为JSON字符串）
  const onSubmit = (data: any) => JSON.stringify(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 文章标题输入框（通过register注册表单字段） */}
      <input {...register("title")} placeholder="标题" />
      <p>
        {/* 作者输入框 */}
        <input {...register("authors")} placeholder="作者" />
      </p>
      <p>
        {/* 来源输入框 */}
        <input {...register("source")} placeholder="来源" />
      </p>
      <p>
        {/* 发表年份输入框 */}
        <input {...register("pubyear")} placeholder="发表年份" />
      </p>
      <p>
        {/* DOI输入框 */}
        <input {...register("doi")} placeholder="DOI" />
      </p>

      {/* 关联讨论下拉选择框（选项为软件工程实践） */}
      <select {...register("linked_discussion")}>
        <option value="">选择软件工程实践...</option>
        <option value="TDD">测试驱动开发（TDD）</option>
        <option value="Mob Programming">群体编程（Mob Programming）</option>
      </select>
      {/* 提交按钮 */}
      <input type="submit" />
    </form>
  );
}