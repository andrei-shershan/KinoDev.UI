import { Layout, Spin } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import '../styles/index.css';
import { useApplicationContext } from "../context/ApplicationContext";
import { LoadingOutlined } from '@ant-design/icons';
import { FC, PropsWithChildren } from 'react';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { state } = useApplicationContext();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        MENU WILL BE THERE
      </Header>
      <Content style={{
        minWidth: "400px",
        maxWidth: "1000px",
        flex: "1 0 auto",
        backgroundColor: "white",
        margin: "0 auto",
        width: "100%"
      }}>
        {children}
      </Content>
      <Footer>
        FOOTER WILL BE THERE
      </Footer>
      <Spin spinning={state.spinning} fullscreen indicator={<LoadingOutlined />} size="large" />
    </Layout>
  );
}

export default MainLayout;