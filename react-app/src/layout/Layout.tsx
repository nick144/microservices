import React from 'react';
import Header from './Header';
const Layout = (props: any) => {
    const {children} = props;
    return (
        <div className="Layout">
            <Header />
            {children}
        </div>
    );
};
export default Layout;
