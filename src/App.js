import './assets/styles/slick.css';
import './assets/styles/slick-theme.css';
import './assets/styles/style.css';
import './assets/styles/base.css';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '@/routers';
import { DefaultLayout } from '@/components/Layout';
import { getStatusLogin } from '@/components/CartList/cartListSlice';

function App() {
    const LoggedIn = useSelector(getStatusLogin) || sessionStorage.getItem('isLogin');
    return (
        <Router>
            <Routes>
                { !LoggedIn ? 
                    (publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })
                ) : (
                    (privateRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })
                ))}
            </Routes>
        </Router>
    );
}

export default App;
