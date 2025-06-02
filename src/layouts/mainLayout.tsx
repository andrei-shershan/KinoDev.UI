import { Layout, Spin } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import '../styles/index.css';
import { LoadingOutlined } from '@ant-design/icons';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import Menu from "../components/menu";
import { PORTALS_TYPES } from "../constants/portalTypes";
import { useApplicationContext } from "../state-management/providers/AdminContextProvider";

import './index.css';
import { getMenuItems } from "../utils/menu";
import { FooterMessage } from "../components/footer/FooterMessage";
import { useInternalApiClient } from "../hooks/useInternalApiClient";
import { URLS } from "../constants/urls";
import { PortalSettings } from "../models/portal-settings";
import { ENDPOINTS } from "../constants/endpoints";
import { APPLICATION_ACTIONS_CONSTS } from "../state-management/action-constants/application";
import useIsMobile from "../hooks/useIsMobile";
import { classNameAdjusted } from "../utils/class-names";

interface MainLayoutProps extends PropsWithChildren {
  portalType?: PORTALS_TYPES;
}

const MainLayout: FC<MainLayoutProps> = ({ children, portalType = PORTALS_TYPES.CLIENT }) => {

  const { state, dispatch } = useApplicationContext();
  const { fetchGet } = useInternalApiClient();
  const isMobile = useIsMobile();

  useEffect(() => {
    const getPortalSettings = async () => {
      const response = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.PORTAL_SETTINGS}`);
      if (response.ok) {
        const data: PortalSettings = await response.json();
        dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_PORTAL_SETTINGS, payload: data });
      }
    }

    if (state.portalSettings === null) {
      getPortalSettings();
    }
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className={classNameAdjusted('main-layout-header', isMobile, 'mobile')}>
        <div className='main-layout-menu-wrapper'>
          <Menu menuItems={getMenuItems(portalType)} />
        </div>
      </Header>
      <Content className={classNameAdjusted('main-layout-content', isMobile, 'mobile')}>
        {children}
      </Content>
      <Footer>
        <FooterMessage />
      </Footer>
      <Spin spinning={state.spinning} fullscreen indicator={<LoadingOutlined />} size="large" />
    </Layout>
  );
}

export default MainLayout;