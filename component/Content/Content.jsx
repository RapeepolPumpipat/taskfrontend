import Banner from "../Banner/Banner";
import Card from "../Card/Card";
import "./Content.css";
import { FaPencilAlt } from "react-icons/fa";

export default function Content({ todos, setTodos, banner, showBanner }) {
  return (
    <article className="content__wrapper bg-slate-100">
      <Banner banner={banner}/>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <Card key={todo.id} todo={todo} setTodos={setTodos} showBanner={showBanner}/>
        ))
      ) : (
        <div className="text-xl text-slate-500 empty_text flex flex-row items-center gap-x-2">
          <FaPencilAlt />
          Let’s note some amazing tasks.
        </div>
      )}
    </article>
  );
}
