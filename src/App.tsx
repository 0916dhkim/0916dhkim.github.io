function App() {
  const blogUrl = "https://dev.to/0916dhkim";

  return (
    <div className="h-screen flex flex-col items-center justify-center dark:bg-slate-800 dark:text-white">
      <p>
        <b>Hi there!</b>
      </p>
      <p>
        You can find my blog at{" "}
        <a className="text-cyan-400" href={blogUrl}>
          {blogUrl}
        </a>
      </p>
    </div>
  );
}

export default App;
