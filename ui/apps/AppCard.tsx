import { Box, Heading, Icon, IconButton, Image, Link, LinkBox, LinkOverlay, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { MouseEvent } from 'react';
import React, { useCallback } from 'react';

import type { AppItemPreview } from 'types/client/apps';

import northEastIcon from 'icons/arrows/north-east.svg';
import starFilledIcon from 'icons/star_filled.svg';
import starOutlineIcon from 'icons/star_outline.svg';
import link from 'lib/link/link';
import notEmpty from 'lib/notEmpty';

import { APP_CATEGORIES } from './constants';

interface Props extends AppItemPreview {
  onInfoClick: (id: string) => void;
  isFavorite: boolean;
  onFavoriteClick: (id: string, isFavorite: boolean) => void;
}

const AppCard = ({ id,
  title,
  logo,
  shortDescription,
  categories,
  onInfoClick,
  isFavorite,
  onFavoriteClick,
}: Props) => {
  const categoriesLabel = categories.map(c => APP_CATEGORIES[c]).filter(notEmpty).join(', ');

  const handleInfoClick = useCallback((event: MouseEvent) => {
    event.preventDefault();
    onInfoClick(id);
  }, [ onInfoClick, id ]);

  const handleFavoriteClick = useCallback(() => {
    onFavoriteClick(id, isFavorite);
  }, [ onFavoriteClick, id, isFavorite ]);

  return (
    <LinkBox
      _hover={{
        boxShadow: 'md',
      }}
      _focusWithin={{
        boxShadow: 'md',
      }}
      borderRadius="md"
      height="100%"
      padding={{ base: 3, sm: '20px' }}
      border="1px"
      borderColor={ useColorModeValue('gray.200', 'gray.600') }
      role="group"
    >
      <Box
        display={{ base: 'grid', sm: 'block' }}
        gridTemplateColumns={{ base: '64px 1fr', sm: '1fr' }}
        gridTemplateRows={{ base: '20px 20px auto', sm: 'none' }}
        gridRowGap={{ base: 2, sm: 'none' }}
        gridColumnGap={{ base: 4, sm: 'none' }}
        height="100%"
      >
        <Box
          gridRow={{ base: '1 / 4', sm: 'auto' }}
          marginBottom={ 4 }
          w={{ base: '64px', sm: '96px' }}
          h={{ base: '64px', sm: '96px' }}
        >
          <Image
            borderRadius={ 8 }
            src={ logo }
            alt={ `${ title } app icon` }
          />
        </Box>

        <Heading
          gridColumn={{ base: 2, sm: 'auto' }}
          as="h3"
          marginBottom={ 2 }
          fontSize={{ base: 'sm', sm: 'lg' }}
          fontWeight="semibold"
        >
          <NextLink href={ link('app_index', { id: id }) } passHref>
            <LinkOverlay>
              { title }
            </LinkOverlay>
          </NextLink>
        </Heading>

        <Text
          marginBottom={ 2 }
          variant="secondary"
          fontSize="xs"
        >
          { categoriesLabel }
        </Text>

        <Text
          fontSize={{ base: 'xs', sm: 'sm' }}
          lineHeight="20px"
          noOfLines={ 4 }
        >
          { shortDescription }
        </Text>

        <Box
          position="absolute"
          right={{ base: 3, sm: '20px' }}
          bottom={{ base: 3, sm: '20px' }}
          paddingLeft={ 8 }
          bgGradient={ `linear(to-r, ${ useColorModeValue('whiteAlpha.50', 'blackAlpha.50') }, ${ useColorModeValue('white', 'black') } 20%)` }
        >
          <Link
            fontSize={{ base: 'xs', sm: 'sm' }}
            display="flex"
            alignItems="center"
            paddingRight={{ sm: 2 }}
            maxW="100%"
            overflow="hidden"
            href="#"
            onClick={ handleInfoClick }
          >
            More

            <Icon
              as={ northEastIcon }
              marginLeft={ 1 }
            />
          </Link>
        </Box>

        <IconButton
          display={{ base: 'block', sm: isFavorite ? 'block' : 'none' }}
          _groupHover={{ display: 'block' }}
          position="absolute"
          right={{ base: 3, sm: '10px' }}
          top={{ base: 3, sm: '14px' }}
          aria-label="Mark as favorite"
          title="Mark as favorite"
          variant="ghost"
          colorScheme="gray"
          w={ 9 }
          h={ 8 }
          onClick={ handleFavoriteClick }
          icon={ isFavorite ?
            <Icon as={ starFilledIcon } w={ 4 } h={ 4 } color="yellow.400"/> :
            <Icon as={ starOutlineIcon } w={ 4 } h={ 4 } color="gray.300"/>
          }
        />
      </Box>
    </LinkBox>
  );
};

export default React.memo(AppCard);
