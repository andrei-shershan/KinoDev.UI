import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import '../styles/index.css';
import { FC, PropsWithChildren, useEffect } from 'react';
import Menu from "../components/menu";
import { PORTALS_TYPES } from "../constants/portalTypes";
import { useApplicationContext } from "../state-management/providers/AdminContextProvider";
import { getMenuItems } from "../utils/menu";
import { FooterMessage } from "../components/footer/FooterMessage";
import { useInternalApiClient } from "../hooks/useInternalApiClient";
import useIsMobile from "../hooks/useIsMobile";
import { classNameAdjusted } from "../utils/class-names";
import { Loading } from "../ui/Loading";
import { getPortalSettings } from "../api-calls/portal-settings";

import './index.css';

interface MainLayoutProps extends PropsWithChildren {
  portalType?: PORTALS_TYPES;
}

const MainLayout: FC<MainLayoutProps> = ({ children, portalType = PORTALS_TYPES.CLIENT }) => {

  const { state, dispatch } = useApplicationContext();
  const apiClient = useInternalApiClient();
  const isMobile = useIsMobile();
  useEffect(() => {
    if (!state.portalSettings) {
      getPortalSettings(apiClient, dispatch);
    }
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className={classNameAdjusted('main-layout-header', isMobile, 'mobile')}>
        <div className='main-layout-menu-wrapper'>
          <Menu menuItems={getMenuItems(portalType)} />
        </div>
      </Header>
      <Loading isLoading={state.spinning}>
        <Content className={classNameAdjusted('main-layout-content', isMobile, 'mobile')}>
          {children}
        </Content>
      </Loading>
      <Footer>
        <FooterMessage />
      </Footer>
    </Layout>
  );
}

export default MainLayout;