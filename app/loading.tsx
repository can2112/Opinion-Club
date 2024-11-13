import CartSk from "./components/skeleton/skeleton";

function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 px-4 md:px-[8%]">
      {Array(40)
        .fill(null)
        .map((_, index) => {
          return <CartSk key={index} />;
        })}
    </div>
  );
}
export default Loading;
