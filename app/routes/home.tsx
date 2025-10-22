import { createLoader, parseAsInteger, useQueryStates } from "nuqs";
import type { Route } from "./+types/home";
import { useLoaderData } from "react-router";
import { useTransition } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const homeSearchParams = {
  counter: parseAsInteger.withDefault(0).withOptions({ shallow: false }),
};

const loadSearchParams = createLoader(homeSearchParams);

export const loader = async (args: Route.LoaderArgs) => {
  const { counter } = loadSearchParams(args.request.url);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { counter };
};

export default function Home() {
  const { counter: serverCounter } = useLoaderData();
  const [isLoading, startTransition] = useTransition();
  const [{ counter }, setSearchParams] = useQueryStates(homeSearchParams, {
    shallow: false,
    startTransition,
  });
  console.log({ isLoading, counter, serverCounter });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>Counter: {counter}</div>
      <div>Server Counter: {serverCounter}</div>
      {isLoading && <div>Loading...</div>}
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={() => setSearchParams({ counter: counter + 1 })}
      >
        Increment
      </button>
    </div>
  );
}
