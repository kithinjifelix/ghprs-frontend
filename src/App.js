import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";
import './styles/reduction.scss';
import { PrivateRoute } from "./PrivateRoute"

const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const HomePage = React.lazy(() => import('pages/HomePage'));
const TemplateUploadPage = React.lazy(() => import('pages/TemplateUploadPage'));
const TemplateInitializationPage = React.lazy(() => import('pages/TemplateInitializationPage'));
const DataTypePage = React.lazy(() => import('pages/DataTypePage'));
const TemplateDownloadPage = React.lazy(() => import('pages/TemplateDownloadPage'));
const UsersPage = React.lazy(() => import('pages/UsersPage'));
const OrganizationsPage = React.lazy(() => import('pages/OrganizationsPage'));
const RegisterPage = React.lazy(() => import('pages/RegisterPage'));
const ReviewUploadsPage = React.lazy(() => import('pages/ReviewUploadsPage'));
const ReviewDetailsPage = React.lazy(() => import('pages/ReviewDetailsPage'));
const SubmissionsPage = React.lazy(() => import('pages/SubmissionsPage'));
const LinksPage = React.lazy(() => import('pages/LinksPage'));
const AddLinksPage = React.lazy(() => import('pages/AddLinkPage'));
const AddOrganizationPage = React.lazy(() => import('pages/AddOrganizationPage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename={getBasename()}>
          <GAListener>
            <Switch>
              <LayoutRoute
                exact
                path="/login"
                layout={EmptyLayout}
                component={props => (
                  <AuthPage {...props} authState={STATE_LOGIN} />
                )}
              />
              <LayoutRoute
                exact
                path="/signup"
                layout={EmptyLayout}
                component={props => (
                  <AuthPage {...props} authState={STATE_SIGNUP} />
                )}
              />

              <MainLayout breakpoint={this.props.breakpoint}>
                <React.Suspense fallback={<PageSpinner />}>
                  <PrivateRoute exact path="/" component={HomePage} />
                  <PrivateRoute exact path="/dashboard" component={DashboardPage} />
                  <PrivateRoute exact path="/upload-Template" component={TemplateUploadPage} />
                  <PrivateRoute exact path="/initialize-Template" roles={['Administrator']} component={TemplateInitializationPage} />
                  <PrivateRoute exact path="/configure" roles={['Administrator']} component={DataTypePage} />
                  <PrivateRoute exact path="/configure/:id" roles={['Administrator']} component={DataTypePage} />
                  <PrivateRoute exact path="/download-Template" component={TemplateDownloadPage} />
                  <PrivateRoute exact path="/users" roles={['Administrator']} component={UsersPage} />
                  <PrivateRoute exact path="/organizations" roles={['Administrator']} component={OrganizationsPage} />
                  <PrivateRoute exact path="/register" roles={['Administrator']} component={RegisterPage} />
                  <PrivateRoute exact path="/review" roles={['Administrator']} component={ReviewUploadsPage} />
                  <PrivateRoute exact path="/review-details/:id" roles={['Administrator']} component={ReviewDetailsPage} />
                  <PrivateRoute exact path="/submissions" roles={['User']} component={SubmissionsPage} />
                  <PrivateRoute exact path="/links" roles={['Administrator']} component={LinksPage} />
                  <PrivateRoute exact path="/link" roles={['Administrator']} component={AddLinksPage} />
                  <PrivateRoute exact path="/link/:id" roles={['Administrator']} component={AddLinksPage} />
                  <PrivateRoute exact path="/organization" roles={['Administrator']} component={AddOrganizationPage} />
                  <PrivateRoute exact path="/organization/:id" roles={['Administrator']} component={AddOrganizationPage} />
                  <PrivateRoute exact path="/profile/:id" roles={['Administrator']} component={RegisterPage} />
                </React.Suspense>
              </MainLayout>
              <Redirect to="/" />
            </Switch>
          </GAListener>
        </BrowserRouter>
      </Provider>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
