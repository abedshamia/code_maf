import IncomingImages from './components/IncomingImages';
import Search from './components/Search';
import Providers from './providers';

function App() {
  return (
    <Providers>
      <Search />
      <IncomingImages />
    </Providers>

  );
}

export default App;
