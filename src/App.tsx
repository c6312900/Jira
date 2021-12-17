import './App.css';
import { useAuth } from 'context/auth-context';
//  import { AuthenticatedApp } from 'authenticated-app';
//  import { UnauthenticatedApp } from 'unauthenticated-app';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageLoading, FullyPageErrorFallBack } from 'components/lib';
import { lazy, Suspense } from 'react';
// import {ProjectListScreen} from './screens/project-list';
// import { TsReactTest } from "try-use-array";
// import { LoginScreen } from "screens/login";

const AuthenticatedApp = lazy(() => import('authenticated-app'))
const UnauthenticatedApp = lazy(() => import('unauthenticated-app'))

function App() {
 
  const {user} = useAuth();

  return (
    <div className="App">
        <ErrorBoundary fallbackRender={FullyPageErrorFallBack}>
          <Suspense fallback={<FullPageLoading/>}>
            {user? <AuthenticatedApp/> : <UnauthenticatedApp/>}
          </Suspense>         
        </ErrorBoundary>
          {/* <LoginScreen /> */}
          {/* <ProjectListScreen/> */}
          {/* <TsReactTest /> */}
        
    </div>
  );
}

export default App;
