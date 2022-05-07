import { Game } from './components/Game';

function App() {
  return (
    <div className="flex justify-center flex-auto">
      <div className="w-full max-w-lg flex flex-col">
        <header className='border-b-2 px-3 border-gray-200 flex'>
          <button
            className='mr-3 text-xl'
            type='button'
            onClick={() => {}}
          >
            Help
          </button>

          <h1 className='text-4x1 font-bold uppercase tracking-wide text-center my-1 flex-auto'>
            Flaggle
          </h1>

          <button
            className='mr-3 text-xl'
            type='button'
            onClick={() => {}}
          >
            Settings
          </button>

        </header>

        <Game/>

        <footer className='flex justify-center items-center mt-8 mb-4'>
          Flaggle
        </footer>

      </div>
    </div>
  );
}

export default App;
