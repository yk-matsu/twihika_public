import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';
import React from 'react';

export function ScrollingSemiModal(props: React.PropsWithChildren<{btnRef: React.MutableRefObject<null>, isOpen: boolean, onOpen: ()=>void, onClose: () => void,onSubmit: ()=>void} >) {

  return (
    <Drawer placement={"bottom"} onClose={props.onClose} isOpen={props.isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
        <DrawerBody>
          {props.children}
        </DrawerBody>
        <DrawerFooter>
            <Button onClick={props.onSubmit}>送信</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
