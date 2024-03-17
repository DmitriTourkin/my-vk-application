import {
  View,
  Panel,
  PanelHeader,
  Group,
  CellButton
} from '@vkontakte/vkui';

import { useState, useEffect, useRef } from 'react';

import VKFactsComponent from '../components/VKFactsComponent';
import VKFormGuessAge from '../forms/VKFormGuessAge';

const PageContent = () => {
  const [activePanel, setActivePanel] = useState('first-task');
  
  return (
    <View activePanel={activePanel}>
        <Panel id='first-task'>
          <PanelHeader>Профильное задание. Факты</PanelHeader>
          <Group>
            <CellButton onClick={() => setActivePanel('second-task')}>Ко второму заданию</CellButton>
          </Group>
          <VKFactsComponent/>
        </Panel>
        <Panel id='second-task'>
          <PanelHeader>Профильное задание. Форма</PanelHeader>
          <Group>
            <CellButton onClick={() => setActivePanel('first-task')}>К первому заданию</CellButton>
          </Group>
          <VKFormGuessAge/>
        </Panel>
      </View>
  );
};

export default PageContent;