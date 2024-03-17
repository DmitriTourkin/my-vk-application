import * as React from 'react';
import { usePlatform } from '@vkontakte/vkui'
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PageContent from '../pages/PageContent';

import { ConfigProvider, AdaptivityProvider } from '@vkontakte/vkui';

const AppVK = () => {
  const platform = usePlatform();
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
            <SplitCol autoSpaced>
              <PageContent/>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default AppVK;
