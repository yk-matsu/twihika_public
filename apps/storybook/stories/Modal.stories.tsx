import {ComponentMeta} from '@storybook/react';

import {ScrollingSemiModal} from '@twihika/ui/Modal';
import {useRef} from 'react';
import {Button, useDisclosure} from '@chakra-ui/react';

export default {
  title: 'ScrollingSemiModal',
  component: ScrollingSemiModal,
} as ComponentMeta<typeof ScrollingSemiModal>;

export const Default = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const btnRef = useRef(null);
  return (
    <>
      <Button mt={3} ref={btnRef} onClick={onOpen}>
        Trigger modal
      </Button>
      <ScrollingSemiModal
        btnRef={btnRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};
