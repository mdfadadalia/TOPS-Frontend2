import Create from './componants/Create';
import Display from './componants/Display';
import Container from './componants/Container';
import MyContextProvider from './Context/MyContext';

const App = () => (
  <MyContextProvider>
    <Container>
      <Create />
      <Display />
    </Container>
  </MyContextProvider>
);

export default App;
