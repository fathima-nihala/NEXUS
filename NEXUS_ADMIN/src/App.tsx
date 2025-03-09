import { Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultLayout from './Layout/DefaultLayout';


function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<DefaultLayout />}>
        {/* Nested Routes */}
        {/* <Route
          index
          element={
            <>
              <PageTitle title="Games Corner" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="calendar"
          element={
            <>
              <PageTitle title="Calendar | Games Corner" />
              <Calendar />
            </>
          }
        /> */}
      </Route>
    </Routes>
  );
}

export default App;
