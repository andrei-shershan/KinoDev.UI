import { Layout, Spin } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import '../styles/index.css';
import { LoadingOutlined } from '@ant-design/icons';
import { FC, PropsWithChildren } from 'react';
import Menu from "../components/Menu";
import useIsMobile from "../hooks/useIsMobile";
import { ROUTES } from "../constants/routes";
import { PORTALS_TYPES } from "../constants/portalTypes";
import { useApplicationContext } from "../state-management/providers/AdminContextProvider";

const clientMenuItems = [
  {
    key: '/',
    label: 'KinoDev',
    path: '/',
  },
  {
    key: `/${ROUTES.SHOWING}`,
    label: 'Now in Cinema',
    path: `/${ROUTES.SHOWING}`,
  },
  {
    key: `/${ROUTES.OUR_CINEMA}`,
    label: 'Our Cinema',
    path: `/${ROUTES.OUR_CINEMA}`,
  },
  {
    key: `/${ROUTES.ABOUT}`,
    label: 'About',
    path: `/${ROUTES.ABOUT}`,
  },
  {
    key: `/${ROUTES.TICKETS}`,
    label: 'Tickets',
    path: `/${ROUTES.TICKETS}`,
  },
];

const adminMenuItems = [
  {
    key: '/admin-portal',
    label: 'KinoDev Admin',
    path: '/admin-portal',
  },
  {
    key: `/${ROUTES.ADMIN_PORTAL.MOVIES}`,
    label: 'Movies',
    path: `/${ROUTES.ADMIN_PORTAL.MOVIES}`,
  },
  {
    key: `/${ROUTES.ADMIN_PORTAL.SHOWTIMES}`,
    label: 'Showtimes',
    path: `/${ROUTES.ADMIN_PORTAL.SHOWTIMES}`,
  },
  {
    key: `/${ROUTES.ADMIN_PORTAL.HALLS}`,
    label: 'Halls',
    path: `/${ROUTES.ADMIN_PORTAL.HALLS}`,
  },
  {
    key: `/${ROUTES.ADMIN_PORTAL.USERS}`,
    label: 'Users',
    path: `/${ROUTES.ADMIN_PORTAL.USERS}`,
  },
];

interface MainLayoutProps extends PropsWithChildren {
  portalType?: PORTALS_TYPES;
}

const getMenuItems = (portalType: PORTALS_TYPES) => {
  switch (portalType) {
    case PORTALS_TYPES.CLIENT:
      return clientMenuItems;
    case PORTALS_TYPES.ADMIN:
      return adminMenuItems;
    default:
      return [];
  }
}

const MainLayout: FC<MainLayoutProps> = ({ children, portalType = PORTALS_TYPES.CLIENT }) => {
  const { state } = useApplicationContext();
  const isMobile = useIsMobile();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%',
        position: isMobile ? 'fixed' : 'static',
        top: isMobile ? 0 : 'auto',
        left: isMobile ? 0 : 'auto',
        right: isMobile ? 0 : 'auto',
        zIndex: 99
      }}>
        <div style={{ maxWidth: '700px', width: '100%', margin: '0 auto' }}>
          <Menu menuItems={getMenuItems(portalType)} />
        </div>
      </Header>
      <Content style={{
        minWidth: "400px",
        maxWidth: "700px",
        flex: "1 0 auto",
        backgroundColor: "white",
        margin: "0 auto",
        width: "100%",
        paddingTop: isMobile ? '64px' : '0' // Add padding only on mobile
      }}>
        {children}
      </Content>
      <Footer>
        {portalType === PORTALS_TYPES.CLIENT ? 'CLIENT PORTAL FOOTER' : 'ADMIN PORTAL FOOTER'}
      </Footer>
      <Spin spinning={state.spinning} fullscreen indicator={<LoadingOutlined />} size="large" />
    </Layout>
  );
}

export default MainLayout;