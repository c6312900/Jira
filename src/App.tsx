import './App.css';
import { useAuth } from 'context/auth-context';
import { AuthenticatedApp } from 'authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app';
import { ErrorBoundary } from 'components/error-boundary';
import { FullyPageErrorFallBack } from 'components/lib';
// import {ProjectListScreen} from './screens/project-list';
// import { TsReactTest } from "try-use-array";
// import { LoginScreen } from "screens/login";


function App() {
 
  const {user} = useAuth();

  return (
    <div className="App">
        <ErrorBoundary fallbackRender={FullyPageErrorFallBack}>
          {user? <AuthenticatedApp/> : <UnauthenticatedApp/>}
        </ErrorBoundary>
          {/* <LoginScreen /> */}
          {/* <ProjectListScreen/> */}
          {/* <TsReactTest /> */}
        
    </div>
  );
}

export default App;
