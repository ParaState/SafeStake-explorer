import React from 'react';
import { useStores } from '~app/hooks/useStores';
import ApplicationStore from '~app/common/stores/Application.store';

type CopyIconProps = {
  width?: number,
  height?: number,
  style?: any
};

const CopyIcon = ({ width, height, style }: CopyIconProps) => {
  const stores = useStores();
  const applicationStore: ApplicationStore = stores.Application;
  const containerStyle = { cursor: 'pointer', ...style ?? {} };
  const imgSrc = `/images/copy${applicationStore.isDarkMode ? '-white' : ''}.svg`;
  const defaultIconSize = 24;

  return (
    <span style={containerStyle}>
      <img width={width ?? style?.width ?? defaultIconSize} height={height ?? style?.height ?? defaultIconSize} src={imgSrc} alt="Copy" />
    </span>
  );
};

export default CopyIcon;
