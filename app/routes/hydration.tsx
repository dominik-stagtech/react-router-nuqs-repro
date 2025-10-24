import { createLoader, parseAsInteger, useQueryStates } from "nuqs";
import { useId } from "react";
import type { Route } from "./+types/hydration";

const hydrationSearchParams = {
  counter: parseAsInteger.withDefault(0),
};

const loadSearchParams = createLoader(hydrationSearchParams);

export const loader = async (args: Route.LoaderArgs) => {
  return {
    counter: loadSearchParams(args.request.url).counter,
  };
};

export default function Hydration({
  loaderData: { counter: serverCounter },
}: Route.ComponentProps) {
  const [{ counter }, setSearchParams] = useQueryStates(hydrationSearchParams);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>Counter: {counter}</div>
      <div>Server Counter: {serverCounter}</div>
      <IncrementButton
        onClick={() => setSearchParams({ counter: counter + 1 })}
      />
    </div>
  );
}

const IncrementButton = ({ onClick }: { onClick: () => void }) => {
  const id = useId();
  return (
    <button
      id={id}
      className="bg-blue-500 text-white p-2 rounded-md"
      onClick={onClick}
    >
      Increment ({id})
    </button>
  );
};
