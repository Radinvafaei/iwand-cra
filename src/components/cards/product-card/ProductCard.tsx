'use client';

import type {FC} from 'react';
import { MediaCard, Text } from '@shopify/polaris';
import type {ProductCardProps} from './interface';

const ProductCard: FC<ProductCardProps> = ({
  title,
  styleName,
  imageUrl,
  price,
  onClick,
}) => {
  return (
    <div
      style={{
        maxWidth: '146px',
        maxHeight: '200px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <MediaCard
        portrait
        title={title}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        description={
          <>
            <Text variant="bodyMd" as="span" tone="subdued">
              {styleName}
            </Text>
            <Text variant="headingMd" as="span" fontWeight="semibold">
              {price}
            </Text>
          </>
        }
      >
        <img
          alt={styleName}
          width={146}
          height={180}
          style={{
            objectFit: 'cover',
            alignItems: 'center',
          }}
          src={imageUrl}
        />
      </MediaCard>
    </div>
  );
};

export default ProductCard;
