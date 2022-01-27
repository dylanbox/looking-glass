import { Text, View } from '@nodegui/react-nodegui';
import { format } from 'date-fns/esm';
import React from 'react';
import PropTypes from 'prop-types';
import fonts from '../fonts';

/**
 * A clock component with the seconds or minutes and time of day stacked
 *
 * @param {object} props props
 * @param {Date} props.datetime The datetime to display
 * @param {number} props.scale The scale ex 1.0 = 100%
 * @param {string} props.formatLarge
 * The time format to show large, to the left of the stacked display
 * @param {string} props.formatTop The time format to show on top of the stacked display
 * @param {string} props.formatBottom The time format to show on bottom of the stacked display
 */
function StackedTime({
  datetime,
  scale,
  formatLarge,
  formatTop,
  formatBottom,
  color,
}) {
  const stylesheet = `
    #stacked-time {
      flex-direction: row;
      align-items: 'center';
    }
    
    #stacked-time--large {
      font-family: '${fonts.BioRhymeExtraBold}';
      font-weight: 800;
      color: ${color};
      font-size: ${60 * scale}px;
      qproperty-alignment: AlignRight, AlignVCenter;
    }
    
    #stacked-time--stacked-wrapper {
      padding-left: ${5 * scale};
      margin-top: ${5 * scale};
    }
    
    #stacked-time--top,
    #stacked-time--bottom {
      color: ${color};
      font-family: '${fonts.JosefinSans}';
      font-weight: 300;
      font-size: ${24 * scale}px;
    }
    #stacked-time--top {
      qproperty-alignment: AlignLeft, AlignBottom;
    }
    #stacked-time--bottom {
      qproperty-alignment: AlignLeft, AlignTop;
    }
  `;

  return (
    <View id="stacked-time" styleSheet={stylesheet}>
      <Text id="stacked-time--large">{format(datetime, formatLarge)}</Text>
      <View id="stacked-time--stacked-wrapper">
        <Text id="stacked-time--top">{format(datetime, formatTop)}</Text>
        <Text id="stacked-time--bottom">{format(datetime, formatBottom)}</Text>
      </View>
    </View>
  );
}

StackedTime.propTypes = {
  datetime: PropTypes.instanceOf(Date),
  scale: PropTypes.number,
  color: PropTypes.string,
  formatLarge: PropTypes.string,
  formatTop: PropTypes.string,
  formatBottom: PropTypes.string,
};

StackedTime.defaultProps = {
  datetime: new Date(),
  scale: 1,
  color: '#FFFFFF',
  formatLarge: 'hh:mm',
  formatTop: 'ss',
  formatBottom: 'a',
};

export default StackedTime;
