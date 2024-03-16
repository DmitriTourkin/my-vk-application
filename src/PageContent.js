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
  CellButton
} from '@vkontakte/vkui';

import { useState, useEffect, useRef } from 'react';
import Component1 from './Component1';
import Component2 from './Component2';

export default function PageContent() {
  const [activePanel, setActivePanel] = useState('first-task');
  
  return (
    <View activePanel="first-task">
        <Panel id='first-task'>
          <PanelHeader>Нажми на кнопку, взберись на сопку!</PanelHeader>
          <Group>
            <div style={{ height: 200 }} />
            <CellButton onClick={() => setActivePanel('second-task')}>Go to panel 2</CellButton>
            <div style={{ height: 600 }} />
          </Group>
          <Component1/>
        </Panel>
        <Panel id='second-task'>
          <PanelHeader>Привет, а вот и форма!</PanelHeader>
          <PanelHeader>Нажми на кнопку, взберись на сопку!</PanelHeader>
          <Group>
            <div style={{ height: 200 }} />
            <CellButton onClick={() => setActivePanel('first-task')}>Go to panel 2</CellButton>
            <div style={{ height: 600 }} />
          </Group>
          <Component2/>
        </Panel>
      </View>
  )
}