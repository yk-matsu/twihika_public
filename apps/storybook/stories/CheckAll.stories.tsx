import {ComponentMeta} from '@storybook/react';

import {useRef} from 'react';
import {Button, useDisclosure} from '@chakra-ui/react';
import { CheckAll } from './CheckAll';

export default {
  title: 'CheckAll',
  component: CheckAll,
} as ComponentMeta<typeof CheckAll>;

export const Default = () => {
  return (
    <>
      <CheckAll/>
    </>
  );
};
