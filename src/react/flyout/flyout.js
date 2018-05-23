import React from 'react';
import PropTypes from 'prop-types';
import {DefaultButton} from '../buttons';
import {Icon} from '../iconography';
import classnames from 'classnames';
import {Dialog} from '../dialogs';
import {Grid, FlexCol} from '../flex-grids'

export class Flyout extends React.PureComponent {
  static propTypes = {
    animationDuration: PropTypes.number,
    animationEasing: PropTypes.string,
    bodyClassName: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
    dialogClassName: PropTypes.string,
    header: PropTypes.any,
    headerClassName: PropTypes.string,
    iconSrc: PropTypes.string,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
    width: PropTypes.string
  };

  static defaultProps = {
    animationDuration: 200,
    animationEasing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    iconSrc: 'close'
  };

  componentDidMount() {
    require('../../css/flyout');
  }

  render() {
    const {dialogClassName, header, onHide, children, headerClassName, bodyClassName, iconSrc, ...props} = this.props;

    const mergedDialogClassNames = classnames(dialogClassName, 'pui-flyout-dialog');
    const dialogProps = {...props, hideOnBackdropClick: false, hideOnEscKeyDown: false, dialogClassName: mergedDialogClassNames, onHide};

    return (
      <Dialog {...dialogProps}>
        <Grid>
          <FlexCol fixed>
            <DefaultButton {...{
              className: 'pui-flyout-icon-btn',
              iconOnly: true,
              flat: true,
              onClick: onHide,
              icon: <Icon {...{src: iconSrc}}/>
            }}/>
          </FlexCol>
          <FlexCol className={classnames('pui-flyout-header grid', headerClassName)}>{header}</FlexCol>
        </Grid>
        <div className={classnames('pui-flyout-body', bodyClassName)}>{children}</div>
      </Dialog>
    );
  }
}