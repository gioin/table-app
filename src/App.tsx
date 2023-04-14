// import CustomTable from "./view/components/CustomTable";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PageWrapper from "./view/components/PageWrapper";
import ProjectAccess from "./view/pages/ProjectAccess";
import UserSetup from "./view/pages/UserSetup";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <PageWrapper title="Project Access">
                <ProjectAccess />
              </PageWrapper>
            }
          />
          <Route
            path="/user/:id"
            element={
              <PageWrapper title="User Setup">
                <UserSetup />
              </PageWrapper>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
