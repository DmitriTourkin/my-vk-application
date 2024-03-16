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
import PageContent from './PageContent';

const AppVK = () => {
  const platform = usePlatform();
  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <PageContent/>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default AppVK;
