import {
  Box,
  Flex,
} from '@chakra-ui/react';
import {PropsWithChildren, useEffect, useState} from 'react';

export const FixedSearchHeader = (props: PropsWithChildren) => {

  const [isTriggered, setIsTriggered] = useState(false)
  useEffect(() => {
    const scrollTrigger = () => {
      if (window.pageYOffset > 40) {
        setIsTriggered(true);
      } else {
        setIsTriggered(false);
      }
    };
    window.addEventListener('scroll', scrollTrigger);
    return () => {
      window.removeEventListener('scroll', scrollTrigger);
    };
  });

  return (
    <>
      {isTriggered && (
        <Box position={'fixed'} top="0" left={"0"} right={"0"} zIndex={'100'}>
          <Flex
            bg={'#9DD6DF'}
            color={'white'}
            minH={'60px'}
            py={{base: 2}}
            px={{base: 4}}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={'gray.200'}
            textColor={'white'}
            align={'center'}
          >
            <Flex direction="row" w="100%" justifyContent={'flex-end'}>
              {props.children}
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};
